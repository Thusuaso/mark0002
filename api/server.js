/* ==========================================================================
   api/server.js - Socket sunucusu (port 3001)
   --------------------------------------------------------------------------
   Iki is yapar:
     1) Eski yayinlar: listeleri tazeleyen update_production / production_save
        / card_list_update event'leri. Davranis aynen korunur.
     2) Sirket ici birebir sohbet + online durumu.

   Calistirma:  npm run socket     (nuxt'tan bagimsiz, ayri process)

   NEDEN AYRI PROCESS: ecosystem.config.js Nuxt'u cluster + instances:'max'
   ile calistiriyor. Soketler Nuxt icinde olsa kullanicilar farkli worker'lara
   dusup birbirini gormezdi (sticky session + Redis adapter gerekirdi).
   Sohbet bu yuzden burada, tek process icinde durur; online listesi de bu
   process'in hafizasinda tutulur.

   KIMLIK DOGRULAMA: istemci handshake'te Nuxt'un "token" cookie'sindeki JWT'yi
   gonderir (bkz. store/modules/socket.js). Dogrulanirsa socket.data.user
   dolar. Sohbet ve online listesi YALNIZCA dogrulanmis soketlere aciktir.
   Eski yayin event'leri, mevcut davranisi bozmamak icin dogrulama istemez;
   veri tasimazlar, sadece "listeyi yenile" sinyalidir. Bunlarin da kapatilmasi
   ayri bir is olarak ele alinmalidir.
   ========================================================================== */
import express from "express";
import fs from "fs";
import path from "path";
import { createServer } from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import mssql from "mssql";
import { sohbetHaricMi } from "./sohbetHaric.js";

/* --------------------------------------------------------------------------
   .env okuma
   --------------------------------------------------------------------------
   Bu process Nuxt tarafindan baslatilmadigi icin .env kendisi okunur
   (projede dotenv bagimliligi yok; api/sql/run.cjs de ayni yolu izler). */
function envOku(dosya) {
  const deger = {};
  if (!fs.existsSync(dosya)) {
    return deger;
  }
  for (const satir of fs.readFileSync(dosya, "utf8").split(/\r?\n/)) {
    const temiz = satir.trim();
    if (!temiz || temiz.startsWith("#")) {
      continue;
    }
    const ayir = temiz.indexOf("=");
    if (ayir < 1) {
      continue;
    }
    let val = temiz.slice(ayir + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    deger[temiz.slice(0, ayir).trim()] = val;
  }
  return deger;
}
const env = { ...envOku(path.resolve(".env")), ...process.env };

const PORT = parseInt(env.SOCKET_PORT, 10) || 3001;
const JWT_SECRET = env.JWT_SECRET;
const MESAJ_MAX_UZUNLUK = 4000; // SohbetMesajTB.Mesaj ile ayni
/* Kaza sonucu dongu veya kotu niyetli akisi sinirlar: 10 saniyede 20 mesaj. */
const MESAJ_PENCERE_MS = 10 * 1000;
const MESAJ_PENCERE_LIMIT = 20;

if (!JWT_SECRET) {
  console.warn(
    "UYARI: JWT_SECRET yok. Sohbet ve online listesi devre disi, " +
      "yalnizca liste tazeleme yayinlari calisir."
  );
}

const app = express();
const server = createServer(app);

// CORS ayarları Nuxt ile bağlantı kurabilmek için kritiktir
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

/* --------------------------------------------------------------------------
   Veritabani
   --------------------------------------------------------------------------
   Sohbet tablosu yoksa (api/sql/SohbetMesajTB.sql calistirilmadiysa) sunucu
   ayakta kalir; mesaj gonderimi hata dondurur, online listesi calismaya
   devam eder. */
let pool = null;
let sohbetTablosuVar = false;
let aktiflikTablosuVar = false;

async function veritabaniBaslat() {
  const eksik = ["DB_USER", "DB_PASSWORD", "DB_NAME", "DB_SERVER"].filter(
    (k) => !env[k]
  );
  if (eksik.length) {
    console.warn(
      `UYARI: .env icinde eksik deger (${eksik.join(", ")}). ` +
        "Sohbet gecmisi kaydedilemez."
    );
    return;
  }
  try {
    pool = await new mssql.ConnectionPool({
      user: env.DB_USER,
      password: env.DB_PASSWORD,
      database: env.DB_NAME,
      server: env.DB_SERVER,
      options: {
        encrypt: false,
        trustServerCertificate: false,
        connectTimeout: 60000,
        requestTimeout: 60000,
      },
      pool: { max: 5, min: 0, idleTimeoutMillis: 30000 },
    }).connect();
    const kontrol = await pool.request().query(`
      select
        (select count(*) from sys.objects
          where object_id = object_id(N'[dbo].[SohbetMesajTB]') and type = N'U') as mesaj,
        (select count(*) from sys.objects
          where object_id = object_id(N'[dbo].[KullaniciAktiflikTB]') and type = N'U') as aktiflik
    `);
    sohbetTablosuVar = kontrol.recordset[0].mesaj > 0;
    aktiflikTablosuVar = kontrol.recordset[0].aktiflik > 0;
    console.log(
      sohbetTablosuVar
        ? "✅ Socket veritabani baglantisi hazir, sohbet tablosu mevcut."
        : "⚠️  Baglanti var ama SohbetMesajTB yok. " +
            "node api/sql/run.cjs api/sql/SohbetMesajTB.sql"
    );
    if (!aktiflikTablosuVar) {
      console.log(
        "⚠️  KullaniciAktiflikTB yok, son gorulme bilgisi tutulmayacak. " +
          "node api/sql/run.cjs api/sql/KullaniciAktiflikTB.sql"
      );
    }
    await aktiflikYukle();
  } catch (err) {
    console.error("❌ Socket veritabani baglanti hatasi:", err.message);
    pool = null;
  }
}
veritabaniBaslat();

/* --------------------------------------------------------------------------
   Online durumu
   --------------------------------------------------------------------------
   Bir kullanicinin birden fazla sekmesi/cihazi olabilir, bu yuzden kullanici
   basina socket kumesi tutulur. Kullanici ancak SON soketi de kapandiginda
   offline olur; aksi halde bir sekmeyi kapatan herkes offline gorunurdu. */
const onlineKullanicilar = new Map(); // userId -> Set<socketId>

function onlineIdListesi() {
  return [...onlineKullanicilar.keys()];
}
function onlineEkle(userId, socketId) {
  let kume = onlineKullanicilar.get(userId);
  if (!kume) {
    kume = new Set();
    onlineKullanicilar.set(userId, kume);
  }
  kume.add(socketId);
  return kume.size === 1; // ilk baglanti mi
}
function onlineCikar(userId, socketId) {
  const kume = onlineKullanicilar.get(userId);
  if (!kume) {
    return false;
  }
  kume.delete(socketId);
  if (kume.size === 0) {
    onlineKullanicilar.delete(userId);
    return true; // son baglanti kapandi
  }
  return false;
}
/* --------------------------------------------------------------------------
   Son aktiflik
   --------------------------------------------------------------------------
   Aktiflik = kullanicinin GERCEK etkileşimi (istemci fare/klavye/sekme odagi
   olunca presence:ping gonderir). Yalnizca baglantinin acik olmasi aktiflik
   saymaz; boylece sekmeyi acik birakip giden kullanici "cevrimici" degil
   "X dakika once aktif" gorunur.

   Hafizada anlik tutulur, veritabanina kisilmis sekilde yazilir: her ping'te
   yazmak 36 kullanici icin gereksiz yuk olurdu. Baglanti kapanirken her
   zaman yazilir ki sunucu yeniden baslasa da son deger kaybolmasin. */
const AKTIFLIK_YAZMA_ARALIK_MS = 60 * 1000;
const sonAktiflik = new Map(); // userId -> timestamp (ms)
const sonYazim = new Map(); // userId -> timestamp (ms)

async function aktiflikKaydet(userId, zorla) {
  const simdi = Date.now();
  sonAktiflik.set(userId, simdi);
  if (!pool || !aktiflikTablosuVar) {
    return;
  }
  const oncekiYazim = sonYazim.get(userId) || 0;
  if (!zorla && simdi - oncekiYazim < AKTIFLIK_YAZMA_ARALIK_MS) {
    return;
  }
  sonYazim.set(userId, simdi);
  try {
    await pool
      .request()
      .input("id", mssql.Int, userId)
      .query(`
        update KullaniciAktiflikTB set SonAktif = getutcdate() where KullaniciID = @id;
        if @@rowcount = 0
          insert into KullaniciAktiflikTB (KullaniciID, SonAktif) values (@id, getutcdate());
      `);
  } catch (err) {
    console.error("aktiflik kaydi hatasi:", err.message);
  }
}
/* Istemcilere gonderilen aktiflik haritasi: { userId: ISO tarih } */
function aktiflikHaritasi() {
  const harita = {};
  for (const [userId, zaman] of sonAktiflik.entries()) {
    harita[userId] = new Date(zaman).toISOString();
  }
  return harita;
}
/* Veritabanindaki son aktiflik degerleri hafizaya alinir; sunucu yeniden
   baslatildiginda "son gorulme" bilgisi sifirlanmasin. */
async function aktiflikYukle() {
  if (!pool || !aktiflikTablosuVar) {
    return;
  }
  try {
    const sonuc = await pool
      .request()
      .query("select KullaniciID, SonAktif from KullaniciAktiflikTB");
    for (const satir of sonuc.recordset) {
      const zaman = new Date(satir.SonAktif).getTime();
      if (!isNaN(zaman)) {
        sonAktiflik.set(Number(satir.KullaniciID), zaman);
      }
    }
    console.log(`Son aktiflik yuklendi: ${sonuc.recordset.length} kullanici`);
  } catch (err) {
    console.error("aktiflik yukleme hatasi:", err.message);
  }
}
/* Kullanicinin tum sekmelerine gonderim icin oda kullanilir: "user:12" */
function kullaniciOdasi(userId) {
  return `user:${userId}`;
}

/* --------------------------------------------------------------------------
   Handshake dogrulamasi
   -------------------------------------------------------------------------- */
io.use((socket, next) => {
  socket.data.user = null;
  socket.data.mesajZamanlari = [];
  const token = socket.handshake.auth && socket.handshake.auth.token;
  if (!token || !JWT_SECRET) {
    return next(); // eski yayinlar icin anonim baglantiya izin verilir
  }
  jwt.verify(token, JWT_SECRET, async (err, payload) => {
    if (err || !payload || !payload.userId) {
      return next();
    }
    const userId = Number(payload.userId);
    /* Token 7 gun gecerli; bu surede hesap kapatilmis olabilir. Kapatilmis
       hesap elindeki token ile sohbete devam etmesin ve online gorunmesin.
       Veritabanina ulasilamiyorsa sohbet zaten calismaz (mesaj kaydedilemez),
       bu durumda token dogrulamasiyla yetinilir. */
    if (pool) {
      try {
        const kontrol = await pool
          .request()
          .input("id", mssql.Int, userId)
          .query("select Aktif from KullaniciTB where ID = @id");
        const satir = kontrol.recordset[0];
        if (!satir || !satir.Aktif) {
          console.log(`Kapatilmis hesap baglanti denemesi: ${userId}`);
          return next();
        }
      } catch (hata) {
        console.error("handshake kullanici kontrolu hatasi:", hata.message);
      }
    }
    socket.data.user = { userId: userId, username: payload.username };
    next();
  });
});

function mesajHiziAsildi(socket) {
  const simdi = Date.now();
  socket.data.mesajZamanlari = socket.data.mesajZamanlari.filter(
    (t) => simdi - t < MESAJ_PENCERE_MS
  );
  if (socket.data.mesajZamanlari.length >= MESAJ_PENCERE_LIMIT) {
    return true;
  }
  socket.data.mesajZamanlari.push(simdi);
  return false;
}

io.on("connection", (socket) => {
  const user = socket.data.user;
  console.log(
    user
      ? `Kullanici baglandi: ${user.username} (${user.userId}) / ${socket.id}`
      : `Anonim baglanti: ${socket.id}`
  );

  /* ---------------- Eski yayinlar: davranis degismedi ---------------- */
  socket.on("update_production_emit", () => {
    io.emit("update_production_on");
  });
  socket.on("production_save_emit", () => {
    io.emit("production_save_on");
  });
  socket.on("card_list_update_emit", () => {
    io.emit("card_list_update_on");
  });

  /* ---------------- Online durumu ---------------- */
  if (user) {
    socket.join(kullaniciOdasi(user.userId));
    const ilkBaglanti = onlineEkle(user.userId, socket.id);
    /* Baglanmak etkileşim sayilir: sayfayi acan kisi o an aktiftir. */
    aktiflikKaydet(user.userId, true);
    /* Yeni gelen once mevcut listeyi alir, sonra digerleri haberdar edilir. */
    socket.emit("presence:list", {
      online: onlineIdListesi(),
      aktiflik: aktiflikHaritasi(),
    });
    if (ilkBaglanti) {
      socket.broadcast.emit("presence:update", {
        userId: user.userId,
        username: user.username,
        online: true,
        sonAktif: new Date().toISOString(),
      });
    }
  }

  socket.on("presence:list", () => {
    if (!user) {
      return;
    }
    socket.emit("presence:list", {
      online: onlineIdListesi(),
      aktiflik: aktiflikHaritasi(),
    });
  });

  /* Istemci etkileşim bildirir (fare/klavye/sekme odagi). Istemci zaten
     kisitli araliklarla gonderir; yine de sunucu tarafinda da yazma
     kisitlanir. */
  socket.on("presence:ping", async () => {
    if (!user) {
      return;
    }
    const onceki = sonYazim.get(user.userId) || 0;
    await aktiflikKaydet(user.userId, false);
    /* Yalnizca veritabanina yazildiysa (yani araliga girdiyse) digerlerine
       haber verilir; her fare hareketinde yayin yapilmaz. */
    if ((sonYazim.get(user.userId) || 0) !== onceki) {
      socket.broadcast.emit("presence:activity", {
        userId: user.userId,
        sonAktif: new Date().toISOString(),
      });
    }
  });

  /* ---------------- Mesaj gonderme ---------------- */
  socket.on("chat:send", async (veri, cevap) => {
    const bitir = (sonuc) => {
      if (typeof cevap === "function") {
        cevap(sonuc);
      }
    };
    if (!user) {
      return bitir({ status: false, message: "Oturum dogrulanamadi." });
    }
    if (!pool || !sohbetTablosuVar) {
      return bitir({ status: false, message: "Sohbet kurulumu tamamlanmamis." });
    }
    const aliciId = Number(veri && veri.aliciId);
    const mesaj = String((veri && veri.mesaj) || "").trim();
    if (!aliciId || aliciId <= 0) {
      return bitir({ status: false, message: "Alici secilmedi." });
    }
    if (aliciId === user.userId) {
      return bitir({ status: false, message: "Kendinize mesaj gonderemezsiniz." });
    }
    /* Listede gorunmeyen hesaba mesaj da gonderilemez (api/sohbetHaric.js) */
    if (sohbetHaricMi(aliciId)) {
      return bitir({ status: false, message: "Bu hesapla sohbet edilemez." });
    }
    if (!mesaj) {
      return bitir({ status: false, message: "Mesaj bos." });
    }
    if (mesaj.length > MESAJ_MAX_UZUNLUK) {
      return bitir({
        status: false,
        message: `Mesaj en fazla ${MESAJ_MAX_UZUNLUK} karakter olabilir.`,
      });
    }
    /* Mesaj gondermek kesinlikle etkilesimdir. */
    aktiflikKaydet(user.userId, false);
    if (mesajHiziAsildi(socket)) {
      return bitir({ status: false, message: "Çok hızlı mesaj gönderiyorsunuz." });
    }
    try {
      /* Alicinin gercek ve aktif bir kullanici oldugu dogrulanir; aksi halde
         istemciden gelen herhangi bir sayi ile kayit olusabilirdi. */
      const request = pool.request();
      request.input("GonderenID", mssql.Int, user.userId);
      request.input("AliciID", mssql.Int, aliciId);
      request.input("Mesaj", mssql.NVarChar(MESAJ_MAX_UZUNLUK), mesaj);
      const sonuc = await request.query(`
        if not exists (select 1 from KullaniciTB where ID = @AliciID and Aktif = 1)
        begin
          select cast(0 as bit) as basarili, cast(null as bigint) as ID,
                 cast(null as datetime) as GonderimTarihi;
        end
        else
        begin
          insert into SohbetMesajTB (GonderenID, AliciID, Mesaj)
          output cast(1 as bit) as basarili, inserted.ID, inserted.GonderimTarihi
          values (@GonderenID, @AliciID, @Mesaj);
        end
      `);
      const satir = sonuc.recordset[0];
      if (!satir || !satir.basarili) {
        return bitir({ status: false, message: "Alici bulunamadi." });
      }
      const paket = {
        ID: String(satir.ID),
        GonderenID: user.userId,
        GonderenAdi: user.username,
        AliciID: aliciId,
        Mesaj: mesaj,
        GonderimTarihi: satir.GonderimTarihi,
        OkunduTarihi: null,
      };
      /* Aliciya ve gonderenin diger sekmelerine gonderilir. */
      io.to(kullaniciOdasi(aliciId)).emit("chat:message", paket);
      io.to(kullaniciOdasi(user.userId)).emit("chat:message", paket);
      bitir({ status: true, message: paket });
    } catch (err) {
      console.error("chat:send hatasi:", err.message);
      bitir({ status: false, message: "Mesaj kaydedilemedi." });
    }
  });

  /* ---------------- Okundu isaretleme ---------------- */
  socket.on("chat:read", async (veri, cevap) => {
    const bitir = (sonuc) => {
      if (typeof cevap === "function") {
        cevap(sonuc);
      }
    };
    if (!user || !pool || !sohbetTablosuVar) {
      return bitir({ status: false });
    }
    const karsiId = Number(veri && veri.karsiId);
    if (!karsiId || karsiId <= 0) {
      return bitir({ status: false });
    }
    aktiflikKaydet(user.userId, false);
    try {
      const request = pool.request();
      request.input("AliciID", mssql.Int, user.userId);
      request.input("GonderenID", mssql.Int, karsiId);
      const sonuc = await request.query(`
        update SohbetMesajTB set OkunduTarihi = getutcdate()
         where AliciID = @AliciID
           and GonderenID = @GonderenID
           and OkunduTarihi is null
      `);
      const adet = sonuc.rowsAffected[0] || 0;
      if (adet > 0) {
        /* Gonderen, mesajlarinin okundugunu gorsun. */
        io.to(kullaniciOdasi(karsiId)).emit("chat:read", {
          okuyanId: user.userId,
          adet: adet,
        });
      }
      bitir({ status: true, adet: adet });
    } catch (err) {
      console.error("chat:read hatasi:", err.message);
      bitir({ status: false });
    }
  });

  // Bağlantı koptuğunda
  socket.on("disconnect", () => {
    if (user) {
      const sonBaglanti = onlineCikar(user.userId, socket.id);
      if (sonBaglanti) {
        /* Son baglanti kapanirken deger mutlaka yazilir: sunucu yeniden
           baslasa da "son gorulme" korunur. */
        aktiflikKaydet(user.userId, true);
        socket.broadcast.emit("presence:update", {
          userId: user.userId,
          username: user.username,
          online: false,
          sonAktif: new Date(
            sonAktiflik.get(user.userId) || Date.now()
          ).toISOString(),
        });
      }
      console.log(`Kullanici ayrildi: ${user.username} (${user.userId})`);
    } else {
      console.log("Anonim baglanti kapandi.");
    }
  });
});

/* Sunucunun ayakta olup olmadigini ve sohbet kurulumunu gormek icin. */
app.get("/health", (req, res) => {
  res.status(200).json({
    status: true,
    sohbetTablosuVar: sohbetTablosuVar,
    aktiflikTablosuVar: aktiflikTablosuVar,
    veritabani: !!pool,
    onlineKullanici: onlineKullanicilar.size,
    baglanti: io.engine.clientsCount,
  });
});

server.listen(PORT, () => {
  console.log(`Socket sunucusu ${PORT} portunda çalışıyor.`);
});
