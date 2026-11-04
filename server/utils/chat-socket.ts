import type { Server as SocketIoServer, Socket } from "socket.io"
import jwt from "jsonwebtoken"
import mssql from "mssql"
import AWS from "aws-sdk"
/* ~~ alias kullaniliyor -- server/middleware/1.legacy-api.ts de
 * api/index.js dosyasini boyle cagiriyor. */
import { sohbetHaricMi } from "~~/api/sohbetHaric.js"
import { getDb } from "./db"

/*
 * Sirket ici birebir sohbet + online durumu -- SUNUCU TARAFI.
 *
 * Kaynak: Nuxt 2'deki api/server.js (origin/main, commit e6683283e ve
 * sonrasindaki 10 sohbet commit'i).
 *
 * =====================================================================
 * NEDEN DOSYA BIREBIR KOPYALANMADI -- MIMARI PILOTTA FARKLI
 * =====================================================================
 * Nuxt 2'de sohbet AYRI BIR PROCESS'teydi: api/server.js kendi express
 * + http sunucusunu kurup 3001 portunu dinliyor, kendi .env'ini
 * okuyor, kendi MSSQL havuzunu aciyordu. Bunun TEK sebebi
 * ecosystem.config.js'in Nuxt'u `cluster` + `instances: "max"` ile
 * calistirmasiydi: online listesi ve oda uyelikleri process
 * hafizasinda tutuldugu icin Nuxt'un icinde olsalar kullanicilar
 * farkli worker'lara dusup birbirini GORMEZDI (sticky session + Redis
 * adapter gerekirdi).
 *
 * Pilotta o kisit YOK: socket.io zaten Nitro'nun ICINDE, tek surecte
 * calisiyor (server/plugins/socket-io.ts) ve legacy Express API'si de
 * ayni surece gomulu. Dolayisiyla:
 *
 *   - ayri process YOK           -> "npm run socket" / pm2 girdisi yok
 *   - ayri port (3001) YOK       -> reverse proxy'de /socket.io yolunu
 *                                   baska yere yonlendirmek gerekmiyor
 *   - kendi .env okuyucusu YOK   -> Nitro process.env'i zaten dolu
 *                                   (db.ts de ayni kaynagi kullaniyor)
 *   - kendi MSSQL havuzu YOK     -> server/utils/db.ts'teki havuz
 *   - /health ucu YOK            -> arayuz kurulum durumunu zaten
 *                                   /api/chat/users'in dondurdugu
 *                                   `ready` ve `dosya` bayraklarindan
 *                                   ogreniyor; ayri bir uc eklemek
 *                                   ayni bilgiyi ikinci kez yayinlamak
 *                                   olurdu
 *
 * TEK SUREC KISITI DEVAM EDIYOR: online listesi bu surecin
 * hafizasinda. Ileride pm2 cluster / birden fazla ornek kullanilirsa
 * A ornegine bagli kullanici B ornegine baglıyı GORMEZ. Hata vermez,
 * sessizce eksik calisir. Cozum socket.io adapter'i (orn.
 * @socket.io/redis-adapter). Ayni kisit relay icin de gecerli ve
 * socket-io.ts'te de yazili.
 *
 * =====================================================================
 * KIMLIK DOGRULAMA -- RELAY'I BOZMAYACAK SEKILDE
 * =====================================================================
 * Istemci handshake'te Nuxt'un "token" cerezindeki JWT'yi gonderiyor
 * (app/stores/socket.ts). Dogrulanirsa socket.data.user dolar ve sohbet
 * + online durumu O SOKETE acilir.
 *
 * DOGRULANAMAYAN BAGLANTI REDDEDILMIYOR: pilotun socket'i ayni zamanda
 * liste tazeleme rolesi (card_list_update_on vb.) ve o yayinlar bugune
 * kadar kimlik dogrulamasi istemiyordu. Baglantiyi reddetmek calisan
 * bir ozelligi kirardi. Dogrulanmamis soket yalnizca role olarak
 * calisir; sohbet olaylarinin HEPSI `if (!user) return` ile korunuyor.
 * Role yayinlarinin da kapatilmasi ayri bir is.
 *
 * TOKEN 7 GUN GECERLI: bu surede hesap kapatilmis olabilir, bu yuzden
 * handshake'te KullaniciTB.Aktif de kontrol ediliyor -- kapatilmis
 * hesap elindeki token ile sohbete devam etmesin ve online gorunmesin.
 */

/* SohbetMesajTB.Mesaj ile ayni. */
const MESAJ_MAX_UZUNLUK = 4000

/* Kaza sonucu dongu veya kotu niyetli akisi sinirlar: 10 saniyede 20 mesaj. */
const MESAJ_PENCERE_MS = 10 * 1000
const MESAJ_PENCERE_LIMIT = 20

/*
 * Goruntu eki sinirlari. api/index.js ile AYNI degerler; ikisi de
 * istemciye guvenmez -- burada Spaces'teki nesnenin GERCEK boyutu ve
 * turu okunur.
 */
const DOSYA_MAX_BAYT = 5 * 1024 * 1024
const DOSYA_TURLERI = ["image/png", "image/jpeg", "image/webp"]

/* Veritabanina en fazla bu siklikla yazilir (bkz. aktiflikKaydet). */
const AKTIFLIK_YAZMA_ARALIK_MS = 60 * 1000

type ChatUser = { userId: number; username: string }

/* socket.data'ya eklenen alanlar. */
interface ChatSocketData {
  user: ChatUser | null
  mesajZamanlari: number[]
}
type ChatSocket = Socket & { data: ChatSocketData }

/* ---------------------------------------------------------------------
 * Kurulum durumu
 * ---------------------------------------------------------------------
 * Sohbet tablosu yoksa (api/sql/SohbetMesajTB.sql calistirilmadiysa)
 * sunucu AYAKTA KALIR: mesaj gonderimi hata dondurur, role yayinlari ve
 * online listesi calismaya devam eder. Bir kez olculup onbellege alinir.
 */
let kurulum: {
  sohbetTablosu: boolean
  aktiflikTablosu: boolean
  dosyaKolonu: boolean
} | null = null

async function kurulumOku() {
  if (kurulum) return kurulum

  try {
    const pool = await getDb()
    const sonuc = await pool.request().query<{
      mesaj: number
      aktiflik: number
      dosya: number
    }>(`
      select
        (select count(*) from sys.objects
          where object_id = object_id(N'[dbo].[SohbetMesajTB]') and type = N'U') as mesaj,
        (select count(*) from sys.objects
          where object_id = object_id(N'[dbo].[KullaniciAktiflikTB]') and type = N'U') as aktiflik,
        (select count(*) from sys.columns
          where object_id = object_id(N'[dbo].[SohbetMesajTB]') and name = N'DosyaKey') as dosya
    `)
    const satir = sonuc.recordset[0]
    kurulum = {
      sohbetTablosu: Number(satir?.mesaj) > 0,
      aktiflikTablosu: Number(satir?.aktiflik) > 0,
      dosyaKolonu: Number(satir?.dosya) > 0,
    }

    if (!kurulum.sohbetTablosu) {
      console.warn(
        "[sohbet] SohbetMesajTB yok -- mesajlasma kapali. " +
          "api/sql/SohbetMesajTB.sql calistirilmali.",
      )
    }
    if (!kurulum.aktiflikTablosu) {
      console.warn(
        "[sohbet] KullaniciAktiflikTB yok -- son gorulme tutulmayacak. " +
          "api/sql/KullaniciAktiflikTB.sql calistirilmali.",
      )
    }
    if (kurulum.sohbetTablosu && !kurulum.dosyaKolonu) {
      console.warn(
        "[sohbet] Goruntu eki kapali, kolonlar yok. " +
          "api/sql/SohbetMesajEk.sql calistirilmali.",
      )
    }
  } catch (err) {
    console.error("[sohbet] kurulum okunamadi:", err)
    kurulum = { sohbetTablosu: false, aktiflikTablosu: false, dosyaKolonu: false }
  }

  return kurulum
}

/* ---------------------------------------------------------------------
 * Dosya deposu (DigitalOcean Spaces)
 * ---------------------------------------------------------------------
 * Burada yalnizca DOGRULAMA yapilir. Yukleme istemciden DOGRUDAN
 * Spaces'e gider; imzayi api/index.js -> /chat/upload-url veriyor.
 * Ayarlar eksikse ek gonderme kapalidir, metin sohbeti calisir.
 */
const SPACES_BUCKET = process.env.DO_SPACES_BUCKET

let spacesS3: AWS.S3 | null = null
function spaces(): AWS.S3 | null {
  if (spacesS3) return spacesS3

  const { DO_SPACES_ENDPOINT, DO_SPACES_KEY, DO_SPACES_SECRET } = process.env
  if (!DO_SPACES_ENDPOINT || !DO_SPACES_KEY || !DO_SPACES_SECRET || !SPACES_BUCKET) {
    return null
  }

  spacesS3 = new AWS.S3({
    endpoint: new AWS.Endpoint(DO_SPACES_ENDPOINT) as unknown as string,
    accessKeyId: DO_SPACES_KEY,
    secretAccessKey: DO_SPACES_SECRET,
  })
  return spacesS3
}

/*
 * Istemci YALNIZCA anahtar bildirir; boyut/tur bilgisine GUVENILMEZ,
 * nesne Spaces'ten okunur (headObject). Boylece:
 *   - uydurma anahtarla kayit olusturulamaz,
 *   - baskasinin klasorundeki nesne kendi mesajina eklenemez (anahtar
 *     chat/<gonderenID>/ ile baslamak ZORUNDA),
 *   - imzayi alip buyuk dosya yukleyen biri sinirlari asamaz.
 */
async function dosyaEkiDogrula(
  userId: number,
  dosyaKey: unknown,
): Promise<{ key: string; tur: string; boyut: number } | { hata: string }> {
  const { dosyaKolonu } = await kurulumOku()
  const s3 = spaces()
  if (!dosyaKolonu || !s3) {
    return { hata: "Görüntü eki kurulumu tamamlanmamış." }
  }

  const key = String(dosyaKey ?? "").trim()
  const onEk = `chat/${userId}/`
  if (!key.startsWith(onEk) || key.includes("..") || key.length > 400) {
    return { hata: "Görüntü bulunamadı." }
  }

  try {
    const bilgi = await s3
      .headObject({ Bucket: SPACES_BUCKET as string, Key: key })
      .promise()

    const tur = String(bilgi.ContentType ?? "").toLowerCase()
    const boyut = Number(bilgi.ContentLength) || 0

    if (!DOSYA_TURLERI.includes(tur)) {
      return { hata: "Yalnızca PNG, JPEG ve WEBP gönderilebilir." }
    }
    if (boyut <= 0 || boyut > DOSYA_MAX_BAYT) {
      return { hata: "Görüntü çok büyük." }
    }
    return { key, tur, boyut }
  } catch (err) {
    /* Yukleme tamamlanmadan gonderilmis ya da anahtar hatali. */
    console.error("[sohbet] dosya eki dogrulama hatasi:", err)
    return { hata: "Görüntü bulunamadı." }
  }
}

/* ---------------------------------------------------------------------
 * Online durumu
 * ---------------------------------------------------------------------
 * Bir kullanicinin birden fazla sekmesi/cihazi olabilir, bu yuzden
 * kullanici basina SOKET KUMESI tutulur. Kullanici ancak SON soketi de
 * kapandiginda offline olur; aksi halde bir sekmeyi kapatan herkes
 * offline gorunurdu.
 */
const onlineKullanicilar = new Map<number, Set<string>>()

function onlineIdListesi(): number[] {
  return [...onlineKullanicilar.keys()]
}

/** Doner: bu ILK baglanti mi (yani kullanici simdi online oldu mu). */
function onlineEkle(userId: number, socketId: string): boolean {
  let kume = onlineKullanicilar.get(userId)
  if (!kume) {
    kume = new Set()
    onlineKullanicilar.set(userId, kume)
  }
  kume.add(socketId)
  return kume.size === 1
}

/** Doner: SON baglanti mi kapandi (yani kullanici simdi offline oldu mu). */
function onlineCikar(userId: number, socketId: string): boolean {
  const kume = onlineKullanicilar.get(userId)
  if (!kume) return false

  kume.delete(socketId)
  if (kume.size === 0) {
    onlineKullanicilar.delete(userId)
    return true
  }
  return false
}

/* ---------------------------------------------------------------------
 * Son aktiflik
 * ---------------------------------------------------------------------
 * Aktiflik = kullanicinin GERCEK etkilesimi. Istemci fare/klavye/
 * tekerlek/dokunma ve sekmeye geri donusde presence:ping gonderiyor
 * (app/layouts/default.vue). Yalnizca baglantinin acik olmasi aktiflik
 * SAYMAZ; boylece sekmeyi acik birakip giden kullanici "cevrimici"
 * degil "X dakika once aktif" gorunur.
 *
 * Hafizada anlik tutulur, veritabanina KISILMIS sekilde yazilir: her
 * ping'te yazmak gereksiz yuk olurdu. Baglanti kapanirken HER ZAMAN
 * yazilir ki sunucu yeniden baslasa da son deger kaybolmasin.
 */
const sonAktiflik = new Map<number, number>()
const sonYazim = new Map<number, number>()

async function aktiflikKaydet(userId: number, zorla: boolean) {
  const simdi = Date.now()
  sonAktiflik.set(userId, simdi)

  const { aktiflikTablosu } = await kurulumOku()
  if (!aktiflikTablosu) return

  const oncekiYazim = sonYazim.get(userId) ?? 0
  if (!zorla && simdi - oncekiYazim < AKTIFLIK_YAZMA_ARALIK_MS) return

  sonYazim.set(userId, simdi)

  try {
    const pool = await getDb()
    /*
     * getutcdate() -- getdate() DEGIL.
     *
     * SQL Server'in getdate()'i sunucunun YEREL saatini (GMT+3)
     * donduruyor, node-mssql ise datetime kolonlarini UTC kabul ederek
     * okuyor. Sonuc: yazilan her zaman 3 saat ILERI okunuyordu, yani
     * cevrimdisi kullanicilarin "son gorulmesi" GELECEKTE kalip her
     * zaman "az once" yazacakti. Sohbet tablolari ve kodu bu yuzden
     * getutcdate() kullaniyor (projenin geri kalani getdate()
     * kullanmaya devam ediyor; oradaki kolonlar cogunlukla `date`
     * tipinde oldugu icin kaydirma gorunmuyor).
     */
    await pool
      .request()
      .input("id", mssql.Int, userId)
      .query(`
        update KullaniciAktiflikTB set SonAktif = getutcdate() where KullaniciID = @id;
        if @@rowcount = 0
          insert into KullaniciAktiflikTB (KullaniciID, SonAktif) values (@id, getutcdate());
      `)
  } catch (err) {
    console.error("[sohbet] aktiflik kaydi hatasi:", err)
  }
}

/* Istemcilere gonderilen aktiflik haritasi: { userId: ISO tarih } */
function aktiflikHaritasi(): Record<number, string> {
  const harita: Record<number, string> = {}
  for (const [userId, zaman] of sonAktiflik.entries()) {
    harita[userId] = new Date(zaman).toISOString()
  }
  return harita
}

/*
 * Veritabanindaki son aktiflik degerleri hafizaya alinir; sunucu
 * yeniden baslatildiginda "son gorulme" bilgisi sifirlanmasin.
 */
async function aktiflikYukle() {
  const { aktiflikTablosu } = await kurulumOku()
  if (!aktiflikTablosu) return

  try {
    const pool = await getDb()
    const sonuc = await pool
      .request()
      .query<{ KullaniciID: number; SonAktif: Date }>(
        "select KullaniciID, SonAktif from KullaniciAktiflikTB",
      )

    for (const satir of sonuc.recordset) {
      const zaman = new Date(satir.SonAktif).getTime()
      if (!Number.isNaN(zaman)) sonAktiflik.set(Number(satir.KullaniciID), zaman)
    }
    console.info(
      `[sohbet] son aktiflik yuklendi: ${sonuc.recordset.length} kullanici`,
    )
  } catch (err) {
    console.error("[sohbet] aktiflik yukleme hatasi:", err)
  }
}

/* Kullanicinin TUM sekmelerine gonderim icin oda: "user:12" */
function kullaniciOdasi(userId: number): string {
  return `user:${userId}`
}

function mesajHiziAsildi(socket: ChatSocket): boolean {
  const simdi = Date.now()
  socket.data.mesajZamanlari = socket.data.mesajZamanlari.filter(
    (t) => simdi - t < MESAJ_PENCERE_MS,
  )
  if (socket.data.mesajZamanlari.length >= MESAJ_PENCERE_LIMIT) return true

  socket.data.mesajZamanlari.push(simdi)
  return false
}

/* ---------------------------------------------------------------------
 * Handshake dogrulamasi
 * --------------------------------------------------------------------- */
function kurHandshake(io: SocketIoServer) {
  io.use((socket, next) => {
    const s = socket as ChatSocket
    s.data.user = null
    s.data.mesajZamanlari = []

    const token = socket.handshake.auth?.token
    const secret = process.env.JWT_SECRET

    /* Token yoksa veya gizli anahtar tanimli degilse baglantiya IZIN
     * VERILIR: role yayinlari bugune kadar dogrulama istemiyordu
     * (gerekcesi dosya basindaki notta). */
    if (!token || !secret) return next()

    jwt.verify(
      String(token),
      secret,
      async (err: unknown, payload: unknown) => {
        const veri = payload as { userId?: number; username?: string } | undefined
        if (err || !veri?.userId) return next()

        const userId = Number(veri.userId)

        /*
         * Token 7 gun gecerli; bu surede hesap kapatilmis olabilir.
         * Kapatilmis hesap elindeki token ile sohbete devam etmesin ve
         * online gorunmesin.
         *
         * Veritabanina ulasilamiyorsa sohbet zaten calismaz (mesaj
         * kaydedilemez); o durumda token dogrulamasiyla yetinilir --
         * baglantiyi reddetmek role'yi de kirardi.
         */
        try {
          const pool = await getDb()
          const kontrol = await pool
            .request()
            .input("id", mssql.Int, userId)
            .query<{ Aktif: boolean }>(
              "select Aktif from KullaniciTB where ID = @id",
            )
          const satir = kontrol.recordset[0]
          if (!satir || !satir.Aktif) {
            console.warn(`[sohbet] kapatilmis hesap baglanti denemesi: ${userId}`)
            return next()
          }
        } catch (hata) {
          console.error("[sohbet] handshake kullanici kontrolu hatasi:", hata)
        }

        s.data.user = { userId, username: String(veri.username ?? "") }
        next()
      },
    )
  })
}

/* ---------------------------------------------------------------------
 * Baglanti basina sohbet davranisi
 * --------------------------------------------------------------------- */
function kurBaglanti(io: SocketIoServer, socket: ChatSocket) {
  const user = socket.data.user
  if (!user) return // dogrulanmamis soket: yalnizca role (socket-io.ts)

  socket.join(kullaniciOdasi(user.userId))

  const ilkBaglanti = onlineEkle(user.userId, socket.id)

  /* Baglanmak etkilesim sayilir: sayfayi acan kisi o an aktiftir. */
  void aktiflikKaydet(user.userId, true)

  /* Yeni gelen ONCE mevcut listeyi alir, SONRA digerleri haberdar edilir. */
  socket.emit("presence:list", {
    online: onlineIdListesi(),
    aktiflik: aktiflikHaritasi(),
  })

  if (ilkBaglanti) {
    socket.broadcast.emit("presence:update", {
      userId: user.userId,
      username: user.username,
      online: true,
      sonAktif: new Date().toISOString(),
    })
  }

  socket.on("presence:list", () => {
    socket.emit("presence:list", {
      online: onlineIdListesi(),
      aktiflik: aktiflikHaritasi(),
    })
  })

  /*
   * Istemci etkilesim bildirir. Istemci zaten kisitli araliklarla
   * gonderiyor (en fazla 45 saniyede bir); yine de sunucu tarafinda da
   * yazma kisitlanir.
   */
  socket.on("presence:ping", async () => {
    const onceki = sonYazim.get(user.userId) ?? 0
    await aktiflikKaydet(user.userId, false)

    /* YALNIZCA veritabanina yazildiysa (yani araliga girdiyse)
     * digerlerine haber verilir; her fare hareketinde yayin yapilmaz. */
    if ((sonYazim.get(user.userId) ?? 0) !== onceki) {
      socket.broadcast.emit("presence:activity", {
        userId: user.userId,
        sonAktif: new Date().toISOString(),
      })
    }
  })

  /* ---------------- Mesaj gonderme ---------------- */
  socket.on("chat:send", async (veri: Record<string, unknown>, cevap?: unknown) => {
    const bitir = (sonuc: unknown) => {
      if (typeof cevap === "function") (cevap as (s: unknown) => void)(sonuc)
    }

    const { sohbetTablosu } = await kurulumOku()
    if (!sohbetTablosu) {
      return bitir({ status: false, message: "Sohbet kurulumu tamamlanmamis." })
    }

    const aliciId = Number(veri?.aliciId)
    const mesaj = String(veri?.mesaj ?? "").trim()

    if (!aliciId || aliciId <= 0) {
      return bitir({ status: false, message: "Alici secilmedi." })
    }
    if (aliciId === user.userId) {
      return bitir({ status: false, message: "Kendinize mesaj gonderemezsiniz." })
    }
    /* Listede gorunmeyen hesaba mesaj da gonderilemez (api/sohbetHaric.js) */
    if (sohbetHaricMi(aliciId)) {
      return bitir({ status: false, message: "Bu hesapla sohbet edilemez." })
    }

    /*
     * Goruntu eki varsa metin ZORUNLU DEGIL (tek basina goruntu veya
     * goruntu + alt yazi). Ek, veritabanina yazilmadan once dogrulanir.
     */
    let ek: { key: string; tur: string; boyut: number; ad: string } | null = null
    if (veri?.dosyaKey) {
      const sonuc = await dosyaEkiDogrula(user.userId, veri.dosyaKey)
      if ("hata" in sonuc) return bitir({ status: false, message: sonuc.hata })

      ek = {
        ...sonuc,
        ad: String(veri?.dosyaAd ?? "goruntu.png").slice(0, 255),
      }
    }

    if (!mesaj && !ek) return bitir({ status: false, message: "Mesaj bos." })
    if (mesaj.length > MESAJ_MAX_UZUNLUK) {
      return bitir({
        status: false,
        message: `Mesaj en fazla ${MESAJ_MAX_UZUNLUK} karakter olabilir.`,
      })
    }

    /* Mesaj gondermek KESINLIKLE etkilesimdir. */
    void aktiflikKaydet(user.userId, false)

    if (mesajHiziAsildi(socket)) {
      return bitir({ status: false, message: "Çok hızlı mesaj gönderiyorsunuz." })
    }

    try {
      /*
       * HAVUZ DOGRUDAN KULLANILIYOR, dbQuery DEGIL: `Mesaj` yalnizca
       * goruntu gonderildiginde NULL yazilmak zorunda ve dbQuery
       * parametre tipini DEGERDEN cikariyor (`request.input(key, value)`).
       * null'dan tip cikarilamaz, mssql "Invalid type for parameter"
       * atar. Bu yuzden tipler burada ACIKCA veriliyor.
       */
      const pool = await getDb()
      const request = pool.request()
      request.input("GonderenID", mssql.Int, user.userId)
      request.input("AliciID", mssql.Int, aliciId)
      request.input(
        "Mesaj",
        mssql.NVarChar(MESAJ_MAX_UZUNLUK),
        mesaj ? mesaj : null,
      )

      const dosyaKolon = ek ? ", DosyaKey, DosyaTur, DosyaAd, DosyaBoyut" : ""
      const dosyaDeger = ek ? ", @DosyaKey, @DosyaTur, @DosyaAd, @DosyaBoyut" : ""
      if (ek) {
        request.input("DosyaKey", mssql.NVarChar(400), ek.key)
        request.input("DosyaTur", mssql.NVarChar(100), ek.tur)
        request.input("DosyaAd", mssql.NVarChar(255), ek.ad)
        request.input("DosyaBoyut", mssql.Int, ek.boyut)
      }

      /*
       * Alicinin GERCEK ve AKTIF bir kullanici oldugu ayni sorguda
       * dogrulaniyor; aksi halde istemciden gelen herhangi bir sayi ile
       * kayit olusabilirdi.
       */
      const sonuc = await request.query<{
        basarili: boolean
        ID: string | number
        GonderimTarihi: Date
      }>(`
        if not exists (select 1 from KullaniciTB where ID = @AliciID and Aktif = 1)
        begin
          select cast(0 as bit) as basarili, cast(null as bigint) as ID,
                 cast(null as datetime) as GonderimTarihi;
        end
        else
        begin
          insert into SohbetMesajTB (GonderenID, AliciID, Mesaj${dosyaKolon})
          output cast(1 as bit) as basarili, inserted.ID, inserted.GonderimTarihi
          values (@GonderenID, @AliciID, @Mesaj${dosyaDeger});
        end
      `)

      const satir = sonuc.recordset[0]
      if (!satir || !satir.basarili) {
        return bitir({ status: false, message: "Alici bulunamadi." })
      }

      /*
       * bigint ID'ler JSON'da sayi olarak tasinirsa buyuk degerlerde
       * hassasiyet kaybi olur; istemci zaten yalnizca karsilastirma
       * yapiyor, METIN olarak gonderiliyor. Bicim api/index.js
       * sohbetSatiri ile AYNI olmak ZORUNDA -- istemci iki kaynaktan
       * gelen mesaji ayni sekilde isliyor.
       */
      const paket = {
        ID: String(satir.ID),
        GonderenID: user.userId,
        GonderenAdi: user.username,
        AliciID: aliciId,
        Mesaj: mesaj || null,
        GonderimTarihi: satir.GonderimTarihi,
        OkunduTarihi: null,
        /* Anahtar istemciye VERILMEZ; goruntu korumali uctan acilir. */
        Dosya: ek
          ? {
              Tur: ek.tur,
              Ad: ek.ad,
              Boyut: ek.boyut,
              Url: `/api/chat/file/${satir.ID}`,
            }
          : null,
      }

      /* Aliciya VE gonderenin diger sekmelerine gonderilir. */
      io.to(kullaniciOdasi(aliciId)).emit("chat:message", paket)
      io.to(kullaniciOdasi(user.userId)).emit("chat:message", paket)

      bitir({ status: true, message: paket })
    } catch (err) {
      console.error("[sohbet] chat:send hatasi:", err)
      bitir({ status: false, message: "Mesaj kaydedilemedi." })
    }
  })

  /* ---------------- Okundu isaretleme ---------------- */
  socket.on("chat:read", async (veri: Record<string, unknown>, cevap?: unknown) => {
    const bitir = (sonuc: unknown) => {
      if (typeof cevap === "function") (cevap as (s: unknown) => void)(sonuc)
    }

    const { sohbetTablosu } = await kurulumOku()
    if (!sohbetTablosu) return bitir({ status: false })

    const karsiId = Number(veri?.karsiId)
    if (!karsiId || karsiId <= 0) return bitir({ status: false })

    void aktiflikKaydet(user.userId, false)

    try {
      const pool = await getDb()
      const sonuc = await pool
        .request()
        .input("AliciID", mssql.Int, user.userId)
        .input("GonderenID", mssql.Int, karsiId)
        .query(`
          update SohbetMesajTB set OkunduTarihi = getutcdate()
           where AliciID = @AliciID
             and GonderenID = @GonderenID
             and OkunduTarihi is null
        `)

      const adet = sonuc.rowsAffected[0] ?? 0
      if (adet > 0) {
        /* Gonderen, mesajlarinin okundugunu gorsun. */
        io.to(kullaniciOdasi(karsiId)).emit("chat:read", {
          okuyanId: user.userId,
          adet,
        })
      }
      bitir({ status: true, adet })
    } catch (err) {
      console.error("[sohbet] chat:read hatasi:", err)
      bitir({ status: false })
    }
  })

  socket.on("disconnect", () => {
    const sonBaglanti = onlineCikar(user.userId, socket.id)
    if (!sonBaglanti) return

    /*
     * Son baglanti kapanirken deger MUTLAKA yazilir (zorla=true):
     * sunucu yeniden baslasa da "son gorulme" korunur.
     */
    void aktiflikKaydet(user.userId, true)

    socket.broadcast.emit("presence:update", {
      userId: user.userId,
      username: user.username,
      online: false,
      sonAktif: new Date(sonAktiflik.get(user.userId) ?? Date.now()).toISOString(),
    })
  })
}

/*
 * server/plugins/socket-io.ts'ten BIR KEZ cagrilir (io kurulurken).
 */
export function installChat(io: SocketIoServer) {
  kurHandshake(io)

  io.on("connection", (socket) => kurBaglanti(io, socket as ChatSocket))

  /* Son gorulme degerleri hafizaya alinir. Beklenmiyor: veritabani
   * hazir olmasa bile socket ayakta kalmali. */
  void aktiflikYukle()

  console.info("[sohbet] socket katmani kuruldu")
}
