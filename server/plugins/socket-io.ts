import type { Server as HttpServer } from "node:http"
import { Server as SocketIoServer } from "socket.io"
import { installChat } from "../utils/chat-socket"

/*
 * Python socket sunucusunun (socket-io.py) Nitro karsiligi.
 *
 * ---------------------------------------------------------------------
 * NEDEN BU DOSYA VAR
 * ---------------------------------------------------------------------
 * Nuxt 2 kurulumunda canli tazeleme AYRI bir Flask-SocketIO servisiyle
 * yapiliyordu (goz.mekmar.com, port 5001). O servisin TAMAMI 32 satirdi
 * ve SAF ROLEYDI: veritabanina dokunmuyor, kimlik dogrulamasi yapmiyor,
 * hicbir is mantigi icermiyor. Yaptigi tek sey bir olayi alip BASKA BIR
 * ADLA herkese yeniden yayinlamak.
 *
 * Python tarafindan kurtulmak icin o rolenin Nitro icine alinmasi
 * yeterli. Kaynak (Thusuaso/socket, socket-io.py) birebir karsilandi --
 * asagidaki RELAY tablosu onun alti handler'inin aynisi.
 *
 * ---------------------------------------------------------------------
 * NEDEN defineWebSocketHandler DEGIL
 * ---------------------------------------------------------------------
 * Nitro'nun yerlesik WebSocket destegi (experimental.websocket +
 * defineWebSocketHandler, crossws uzerinden) HAM WebSocket konusur --
 * Socket.IO protokolunu DEGIL. Socket.IO'nun kendi el sikismasi,
 * cerceveleme bicimi, yeniden baglanma ve polling'e dusme mantigi var.
 *
 * Onu kullanmak istemci tarafini da degistirmek demekti: socket.io-client
 * yerine ham WebSocket, yeniden baglanmayi elle yazmak, vb. Bu dosya ise
 * ISTEMCIDE HICBIR SEY DEGISTIRMIYOR -- app/stores/socket.ts zaten
 * `io(url, { path: "/socket.io/" })` ile baglaniyor ve socket.io
 * sunucusu de varsayilan olarak ayni yolu dinliyor.
 *
 * Tek istemci tarafi degisiklik nuxt.config.ts'teki socketUrl'in bos
 * dizgeye cekilmesi: socket.io-client bos adres verildiginde SAYFANIN
 * KENDI KOKENINE baglanir, yani artik Nitro'ya.
 *
 * ---------------------------------------------------------------------
 * HTTP SUNUCUSUNA NASIL TUTUNUYOR
 * ---------------------------------------------------------------------
 * socket.io bir Node `http.Server` ornegine ihtiyac duyuyor. Nitro o
 * ornegi dogrudan vermiyor, ama ilk istegin soketi uzerinden erisilebilir
 * (`event.node.res.socket.server`). Bu yuzden kurulum ILK ISTEKTE,
 * bir kez yapiliyor ve sunucu nesnesine isaretleniyor.
 *
 * SONUCU: socket.io yalnizca Nitro'ya EN AZ BIR HTTP istegi geldikten
 * sonra ayaga kalkar. Pratikte sorun degil -- istemci socket'e ancak
 * sayfayi yukledikten sonra baglaniyor, yani o istek zaten gelmis olur.
 *
 * ---------------------------------------------------------------------
 * DIKKAT -- COK ORNEKLI CALISTIRMA
 * ---------------------------------------------------------------------
 * Bu role YALNIZCA AYNI SURECE bagli istemcilere yayin yapar. Nitro tek
 * bir Node surecinde calistigi surece sorun yok (bugunku kurulum boyle:
 * legacy Express API'si de ayni surece gomulu).
 *
 * Ileride pm2 cluster / birden fazla ornek / birden fazla sunucu
 * kullanilirsa yayin YARIM calisir: A ornegine bagli kullanici B
 * ornegine bagli kullaniciya ulasmaz. Hata vermez, sessizce eksik
 * tazelenir. O noktada cozum socket.io'nun bir adapter'i (orn.
 * @socket.io/redis-adapter) -- ama o zaman Redis de isin icine girer.
 *
 * Python servisi tek surec oldugu icin bu kisit ONCEDEN DE vardi; yani
 * tasima bir gerileme getirmiyor, yalnizca kisiti devrediyor.
 */

/*
 * socket-io.py'deki alti handler ile BIREBIR ayni esleme.
 *
 * DIKKAT -- GONDEREN DE ALIR: Flask-SocketIO'da
 * `emit(event, broadcast=True)` namespace'teki TUM istemcilere gider,
 * GONDEREN DAHIL (hariç tutmak icin include_self=False gerekir).
 *
 * socket.io JS'te bunun karsiligi `io.emit(...)`. `socket.broadcast.emit(...)`
 * KULLANILMAMALI -- o gondereni HARIC TUTAR ve davranisi degistirirdi
 * (ornegin kart kaydeden kullanicinin kendi listesi tazelenmezdi).
 */
/*
 * ---------------------------------------------------------------------
 * ⚠ PYTHON'UN TABLOSU EKSIKTI -- IKI CIFT EKLENDI
 * ---------------------------------------------------------------------
 * Ilk surumde bu tablo socket-io.py'nin alti handler'inin BIREBIR
 * kopyasiydi. Kullanici "kart sildim, uretim tarafinda aninda
 * silinmedi" dedi ve olcum su cikti:
 *
 *   uygulama YAYIYOR    : card_list_update_emit  (3 yerden,
 *                         app/components/cards/Form.vue)
 *   uygulama DINLIYOR   : card_list_update_on    (2 yerden,
 *                         app/components/product/Cards.vue)
 *   Python'un rolesinde : O CIFT YOK
 *
 * Yani Flask-SocketIO handler'i olmayan olayi sessizce yutuyordu ve bu
 * ozellik NUXT 2'DE DE HIC CALISMAMISTI -- orijinal kod da ayni adi
 * yayiyor, ayni adi dinliyordu (mark0002: components/cards/form.vue:203
 * ve components/cards/list.vue:172). Taşıma hatasi degil, Python
 * rolesindeki eksik; birebir kopyalayinca sadik bicimde tasinmis.
 *
 * Ayrica olculdu: Python'un alti ciftinin HICBIRI pilotta kullanilmiyor
 * (`cards_update_emit` Nuxt 2'de de uc yerde YORUMLU). Yani role
 * bugune kadar hicbir seyi iletmiyordu.
 *
 * Alti cift yine de DURUYOR: offers/supplier/customer ekranlari henuz
 * tasinmadi, tasindiklarinda o adlari kullanacaklar.
 */
const RELAY: Record<string, string> = {
  /* --- CANLI: su an uygulama tarafindan kullaniliyor --- */

  /* Kart kaydet/guncelle/sil -> kart listelerini tazele.
   * EKLENDI (Python'da yoktu). */
  card_list_update_emit: "card_list_update_on",

  /* Uretim listesini tazele. Dinleyicisi var
   * (app/pages/orders/production.vue), yayan ekran HENUZ TASINMADI
   * (Nuxt 2: components/selection/input/form.vue). Cift simdiden
   * hazir, o ekran gelince calisacak. EKLENDI. */
  update_production_emit: "update_production_on",

  /* Uretim kaydedildi -> uretim/secim listelerini tazele.
   * YAYAN TARAF PILOTTA VAR: app/pages/orders/production.vue:674
   * `production_save_emit` yayiyor, ama bu cift tabloda YOKTU -- yani
   * yayin sessizce yutuluyordu.
   *
   * Python rolesinde de yoktu; Nuxt 2 tarafinda ise role Python'dan
   * api/server.js'e tasinirken bu cift ORAYA EKLENMISTI
   * (origin/main, api/server.js:398). Pilotun RELAY tablosu Python
   * surumunden kopyalandigi icin cift atlanmis.
   *
   * Dinleyen ekran HENUZ TASINMADI (Nuxt 2: pages/selection/input.vue:87),
   * cift simdiden hazir. EKLENDI. */
  production_save_emit: "production_save_on",

  /* --- PYTHON'DAN GELEN ALTI CIFT: su an hicbiri kullanilmiyor --- */
  production_update_emit: "production_update_on",
  cards_update_emit: "cards_update_on",
  offers_updated_emit: "offers_updated_on",
  offers_deleted_emit: "offers_deleted_on",
  supplier_list_emit: "supplier_list_on",
  customer_list_emit: "customer_list_on",
}

/* Ayni sunucuya iki kez kurulum yapilmasin. */
const INSTALLED = Symbol.for("mark0002.socket-io.installed")

type TaggedServer = HttpServer & { [INSTALLED]?: SocketIoServer }

function install(server: TaggedServer) {
  if (server[INSTALLED]) return

  const io = new SocketIoServer(server, {
    /*
     * Istemci (app/stores/socket.ts) bu yolu acikca veriyor; socket.io'nun
     * varsayilani da ayni ama baglilik gizli kalmasin diye yaziliyor.
     */
    path: "/socket.io/",

    /*
     * Python tarafi cors_allowed_origins="*" ile calisiyordu. Artik
     * socket ile sayfa AYNI KOKENDE oldugu icin CORS'a ihtiyac yok --
     * ve "*" birakmak her siteye baglanma izni vermek olurdu.
     * Ayri bir kokenden baglanmak gerekirse buraya acik liste yazilmali.
     */
    cors: { origin: false },
  })

  io.on("connection", (socket) => {
    /*
     * Python tarafi baglantida `emit('başarıyla bağlandı')` yapiyordu --
     * yalnizca baglanan istemciye, payload'siz. Istemcide bu olayi
     * DINLEYEN kimse yok (app/stores/socket.ts yalnizca socket.io'nun
     * kendi "connect" olayini dinliyor), yani tamamen sussuz bir
     * bildirimdi. Birebir korundu: kaldirmak davranisi degistirmez ama
     * tasimanin eksiksiz oldugunu gostermek icin duruyor.
     */
    socket.emit("başarıyla bağlandı")

    for (const [incoming, outgoing] of Object.entries(RELAY)) {
      socket.on(incoming, (...args: unknown[]) => {
        /*
         * io.emit -> gonderen DAHIL herkese (Flask'in broadcast=True
         * davranisi; gerekcesi RELAY tablosunun basinda).
         *
         * Payload AYNEN geciyor: Python'da iki handler payload aliyordu
         * (offers_updated_emit, offers_deleted_emit), dorduce argumansizdi.
         * Burada ayrim yapmaya gerek yok -- argumansiz olaylarda args bos
         * dizi olur ve io.emit(name) ile ayni sonucu verir.
         */
        io.emit(outgoing, ...args)
      })
    }
  })

  /*
   * SOHBET KATMANI.
   *
   * Nuxt 2'de sohbet AYRI bir process'teydi (api/server.js, port 3001);
   * pilotta socket.io zaten Nitro'nun icinde oldugu icin ayni sunucuya
   * takiliyor -- ayri port, ayri surec, reverse proxy ayari gerekmiyor.
   * Gerekcenin tamami server/utils/chat-socket.ts basinda.
   *
   * SIRA ONEMLI: installChat kendi `io.use(...)` handshake'ini
   * kuruyor ve bu, YUKARIDAKI relay dinleyicilerinden once
   * calismali ki socket.data.user baglanti aninda dolu olsun.
   * io.use middleware'leri her baglanti icin handler'lardan ONCE
   * calistigi icin kurulum sirasi yeterli.
   *
   * Dogrulanamayan baglanti REDDEDILMIYOR: role yayinlari bugune
   * kadar kimlik dogrulamasi istemiyordu, reddetmek onlari kirardi.
   */
  installChat(io)

  server[INSTALLED] = io
  console.info(
    `[socket.io] role kuruldu -- ${Object.keys(RELAY).length} olay, yol /socket.io/`,
  )
}

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("request", (event) => {
    const server = event.node.res.socket?.server as TaggedServer | undefined
    if (server) install(server)
  })
})
