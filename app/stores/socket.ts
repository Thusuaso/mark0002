import { defineStore } from "pinia"
import { io, type Socket } from "socket.io-client"

/*
 * store/modules/socket.js -> Pinia
 *
 * Elle yazildi. Codemod kullanilamadi, cunku Vuex modulunun kendisi
 * calisan bir sey degildi: BIREBIR tasimak uc ayri hatayi da tasimak
 * olurdu. Nuxt 2'deki haliyle neler bozuk:
 *
 * 1) setDisconnect ICINDE TANIMSIZ DEGISKEN
 *      if (vuexContext.state.socket) { vuexConnect.commit("destroy") }
 *    `vuexConnect` diye bir sey yok (`vuexContext` olacakti). Yani
 *    baglanti varsa bu action HER ZAMAN ReferenceError atiyordu --
 *    baglanti hicbir zaman kapatilmadi.
 *
 * 2) connect DINLEYICISINDE YANLIS `this`
 *      state.socket.on("connect", () => console.log(..., this.socket.id))
 *    Mutation icinde `this` state degil; `this.socket` undefined olup
 *    `.id` okumasi TypeError atiyor -- hem de socket.io'nun olay
 *    isleyicisinin icinde.
 *
 * 3) HER MOUNT YENI BAGLANTI
 *    setConnection kosulsuz yeni bir io() kuruyor ve state.socket'in
 *    ustune yaziyordu. cards/list.vue, cards/form.vue,
 *    selection/input/form.vue ve production.vue dordu de mount'ta bunu
 *    cagiriyor; onceki socket'ler sahipsiz kalip acik kaliyordu.
 *    (cards/list.vue'deki `if (this.socket)` korumasi da ise yaramiyor:
 *    `socket` o bilesenin data alani ve hic atanmiyor -- daima null.)
 *
 * Sonuc: uygulama gezindikce socket.io baglantisi birikiyordu ve hicbiri
 * kapanmiyordu. Bu yuzden burada yasam dongusu REFERANS SAYIMIYLA
 * kuruldu: connect() ilk cagirende baglanir, disconnect() son birakanda
 * kapatir. Cagri yerlerinin dogru sirayla cagirmasi yeterli -- ve
 * useRealtime() composable'i o sirayi kendisi garanti eder.
 *
 * NEDEN SOCKET STATE'TE DEGIL: Pinia state'i SSR payload'ina
 * serilestirilir; Socket nesnesi serilestirilemez (devalue patlar) ve
 * zaten reaktif olmasina gerek yok. Bu yuzden modul duzeyinde, store'un
 * disinda tutuluyor. State'te yalnizca gozlenebilir bayraklar var.
 */

let socket: Socket | null = null

/*
 * Baglanti kurulurken kullanilan token.
 *
 * NEDEN TUTULUYOR: handshake'teki JWT sohbetin ve online listesinin
 * kimlik kaynagi (bkz. server/utils/chat-socket.ts). Token baglanti
 * KURULURKEN bir kez gonderilir; sonradan degisirse acik soket hala
 * ESKI kimlikle dogrulanmis kalir. Iki somut durum:
 *
 *   giris -> once anonim baglanan soket sohbeti ACMAZ
 *   cikis -> kapatilmis oturumun soketi online gorunmeye DEVAM EDER
 *
 * Bu yuzden connect() token degistiyse soketi yeniden kuruyor.
 */
let socketToken: string | null = null

export const useSocketStore = defineStore("socket", {
  state: () => ({
    /* Kac cagri yeri su an baglantiyi kullaniyor (referans sayaci). */
    consumers: 0,
    connected: false,
    socketId: null as string | null,
  }),

  getters: {
    /*
     * Vuex'teki `getSocket` getter'inin karsiligi. Adi korundu ama artik
     * state'ten degil modul degiskeninden okuyor.
     *
     * null DONEBILIR: sunucu tarafinda hic socket kurulmaz. Nuxt 2'de
     * cagri yerleri `getSocket.on(...)` diye zincirleme yapiyordu; bu
     * SSR'da patlar. Yeni kodda useRealtime() kullanilmali, o zaten
     * yalnizca client'ta calisir.
     */
    getSocket: () => socket,
    isConnected: (state) => state.connected,
  },

  actions: {
    /*
     * Vuex: setConnection -- ama artik idempotent ve sayan.
     * Yalnizca client'ta baglanir.
     */
    connect() {
      if (import.meta.server) return

      this.consumers++

      /*
       * Oturum cerezi. Sunucu bunu handshake'te dogrulayip sohbet ve
       * online durumunu aciyor; token yoksa baglanti ANONIM kurulur ve
       * yalnizca liste tazeleme rolesi olarak calisir (sunucu tarafi
       * dogrulanmamis baglantiyi REDDETMIYOR -- gerekcesi
       * server/utils/chat-socket.ts basinda).
       */
      const token = useCookie<string | null>("token").value ?? null

      /* Token degistiyse (giris/cikis) soket yeniden kurulmali --
       * gerekcesi socketToken taniminda. */
      if (socket && socketToken !== token) {
        socket.close()
        socket = null
        this.connected = false
        this.socketId = null
      }

      if (socket) return

      const url = useRuntimeConfig().public.socketUrl

      const options = {
        transports: ["websocket", "polling"],
        path: "/socket.io/",
        auth: { token },
      } as const

      socketToken = token

      /*
       * Canli tazeleme artik Nitro'nun ICINDE calisiyor
       * (server/plugins/socket-io.ts), yani hedef sayfanin KENDI
       * KOKENI -- socketUrl varsayilan olarak BOS.
       *
       * BOS DIZGEYI io()'YA VERMEK CALISMAZ: socket.io-client yalnizca
       * adres `null`/`undefined` ise location'a duser (`null == uri`
       * kontrolu). Bos dizge bu kontrolu GECMEZ, sonra "https?://"
       * kalibina uymadigi icin `location.protocol + "//" + ""`
       * kuruluyor -- yani "https://" gibi HOST'SUZ bir adres. Baglanti
       * sessizce kurulamaz.
       *
       * Bu yuzden bos deger acikca ARGUMANSIZ cagriya cevriliyor;
       * io(options) sayfanin kokenine baglanir.
       *
       * Harici bir socket sunucusuna donmek gerekirse
       * NUXT_PUBLIC_SOCKET_URL doldurmak yeterli -- bu dal onu kullanir.
       */
      socket = url ? io(url, options) : io(options)

      socket.on("connect", () => {
        /*
         * Nuxt 2'de burada `this.socket.id` yaziyordu ve TypeError
         * atiyordu. Dogrusu kapanisla yakalanan socket.
         */
        this.connected = true
        this.socketId = socket?.id ?? null
      })

      socket.on("disconnect", () => {
        this.connected = false
        this.socketId = null
      })
    },

    /*
     * Vuex: setDisconnect -- orada tanimsiz degisken yuzunden hic
     * calismiyordu. Son kullanan birakinca gercekten kapatir.
     */
    disconnect() {
      if (import.meta.server) return

      if (this.consumers > 0) this.consumers--
      if (this.consumers > 0) return

      socket?.close()
      socket = null
      socketToken = null
      this.connected = false
      this.socketId = null
    },

    /*
     * Baglanti yoksa sessizce yutar. Nuxt 2'de cagri yerleri
     * `getSocket.emit(...)` diye dogrudan zincirliyordu; socket henuz
     * kurulmamissa bu TypeError atar.
     */
    emit(event: string, ...args: unknown[]) {
      if (!socket) {
        console.warn(`[socket] "${event}" yayilamadi: baglanti yok`)
        return
      }
      socket.emit(event, ...args)
    },
  },
})
