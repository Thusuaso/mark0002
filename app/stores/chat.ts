import { defineStore } from "pinia"
import { useSocketStore } from "~/stores/socket"
import { useAuthStore } from "~/stores/auth"

/*
 * Vuex store/modules/chat.js karsiligi -- sirket ici birebir sohbet ve
 * online durumu.
 *
 * =====================================================================
 * AYRI SOCKET BAGLANTISI KALDIRILDI -- TEK BAGLANTI YETIYOR
 * =====================================================================
 * Nuxt 2'de bu modul KENDI socket baglantisini aciyordu, liste tazeleme
 * baglantisindan (store/modules/socket.js) BAGIMSIZ. Gerekce oradaki
 * yorumda yaziliydi: "o baglanti sayfa gezintilerinde yenileniyor,
 * sohbetin ise layout boyunca ayakta kalmasi gerekiyor".
 *
 * O sorun pilotta YOK. app/stores/socket.ts yasam dongusunu REFERANS
 * SAYIMIYLA kuruyor: `connect()` ilk cagirende baglanir, sonrakiler
 * yalnizca sayaci artirir, `disconnect()` SON birakanda kapatir. Yani
 * sayfa gezintileri baglantiyi artik YENILEMIYOR -- Nuxt 2'deki
 * "her setConnection yeni socket acip oncekini birakiyordu" hatasi
 * zaten duzeltilmis durumda (gerekcesi socket.ts basinda).
 *
 * Dolayisiyla sohbet AYNI baglantiyi paylasiyor:
 *   - kullanici basina IKI yerine BIR soket (sunucu ikisini de tek
 *     online kullanici sayiyordu, ama ikincisi bosa yuktu)
 *   - token/handshake mantigi tek yerde (socket.ts)
 *   - sohbet paneli layout'ta oldugu icin `connect()` tuketicisini tum
 *     oturum boyunca tutuyor; yani baglanti zaten kapanmiyor
 *
 * =====================================================================
 * MUT_ ONEKI YERINE ICE ALMA
 * =====================================================================
 * Vuex'te action ve mutation ayri ad uzaylarindaydi; iki isim IKISINDE
 * DE vardi (`setChatActiveUser`, `setChatPanelOpen`) ve Pinia'da bu
 * cakisma olurdu. Mutation'lar tek satirlik oldugu icin cagiran
 * action'larin ICINE alindi (ayni secim app/stores/importantLink.ts'te
 * de yapildi). Getter adlari DEGISMEDI -- bilesen onlari kullaniyor.
 */

/*
 * Cevrimici bildiriminin tekrarini engeller: { userId -> son bildirim ms }.
 * State'te tutulmasina gerek yok, arayuzde gosterilmiyor.
 */
const BILDIRIM_BEKLEME_MS = 5 * 60 * 1000
const sonBildirim = new Map<number, number>()

export interface ChatUser {
  ID: number
  KullaniciAdi: string
  Okunmamis: number
  SonMesaj: string | null
  SonMesajTarihi: string | Date | null
  SonAktif: string | Date | null
}

export interface ChatDosya {
  Tur: string
  Ad: string
  Boyut: number
  Url: string
}

export interface ChatMessage {
  ID: string
  GonderenID: number
  GonderenAdi?: string
  AliciID: number
  Mesaj: string | null
  GonderimTarihi: string | Date
  OkunduTarihi: string | Date | null
  Dosya: ChatDosya | null
}

/* utils/chatDosya.js resimHazirla sonucu. */
export interface ChatEk {
  blob: Blob
  tur: string
  ad: string
  genislik: number
  yukseklik: number
}

type PresenceVeri = {
  userId: number
  username?: string
  online?: boolean
  sonAktif?: string
}

export const useChatStore = defineStore("chat", {
  state: () => ({
    users: [] as ChatUser[],
    /* online kullanici ID'leri */
    online: [] as number[],
    /* { userId: ISO tarih } son GERCEK etkilesim */
    aktiflik: {} as Record<number, string>,
    /* acik olan yazisma */
    activeUserId: null as number | null,
    messages: [] as ChatMessage[],
    loadingHistory: false,
    dahaVar: false,
    /* SohbetMesajTB kurulu mu */
    ready: true,
    /* goruntu eki gonderilebilir mi (kolonlar + depo ayari) */
    dosyaReady: false,
    panelOpen: false,
    /* Dinleyiciler kuruldu mu -- iki kez kurulmasin. */
    baglandi: false,
  }),

  getters: {
    getChatUsers: (state) => state.users,
    getChatOnline: (state) => state.online,
    getChatAktiflik: (state) => state.aktiflik,
    getChatActiveUserId: (state) => state.activeUserId,
    getChatMessages: (state) => state.messages,
    getChatLoadingHistory: (state) => state.loadingHistory,
    getChatDahaVar: (state) => state.dahaVar,
    getChatReady: (state) => state.ready,
    getChatDosyaReady: (state) => state.dosyaReady,
    getChatPanelOpen: (state) => state.panelOpen,

    getChatUnreadTotal: (state) =>
      state.users.reduce((acc, u) => acc + (Number(u.Okunmamis) || 0), 0),

    /*
     * Yalnizca LISTEDE gorunen kisiler sayilir: sohbet disi tutulan
     * hesaplar (api/sohbetHaric.js) online olsa bile sayaca girmemeli.
     */
    getChatOnlineCount: (state) =>
      state.users.filter((u) => state.online.includes(Number(u.ID))).length,
  },

  actions: {
    /*
     * Layout'tan BIR KEZ cagrilir.
     *
     * Baglantiyi kendisi ACMIYOR, paylasilan socket'e tutunuyor
     * (gerekcesi dosya basinda). `connect()` referans sayacini artirir;
     * sohbet paneli layout'ta oldugu icin bu tuketici tum oturum
     * boyunca duruyor.
     */
    setChatConnection() {
      if (import.meta.server || this.baglandi) return

      const auth = useAuthStore()
      if (!auth.isAuthenticated) return // oturum yok, sohbet kurulmaz

      const socketStore = useSocketStore()
      socketStore.connect()

      const socket = socketStore.getSocket
      if (!socket) return

      this.baglandi = true

      socket.on("presence:list", (veri: { online?: number[]; aktiflik?: Record<number, string> }) => {
        this.online = (veri?.online ?? []).map((x) => Number(x))
        this.aktiflik = veri?.aktiflik ?? {}
      })

      socket.on("presence:update", (veri: PresenceVeri) => {
        /*
         * Toast YALNIZCA cevrimdisi -> cevrimici GECISINDE cikar; ilk
         * baglantida gelen tam liste (presence:list) bildirim uretmez.
         * Bu yuzden gecis once olculup sonra durum yaziliyor.
         */
        const oncedenOnline = this.online.includes(Number(veri?.userId))
        this.applyPresence(veri)
        if (veri?.online && !oncedenOnline) this.chatOnlineBildirimi(veri)
      })

      socket.on("presence:activity", (veri: PresenceVeri) => {
        this.applyPresence(veri)
      })

      socket.on("chat:message", (mesaj: ChatMessage) => {
        this.chatIncoming(mesaj)
      })

      socket.on("chat:read", (veri: { okuyanId: number }) => {
        /* Karsi taraf okudu: acik yazismadaki KENDI mesajlarimi
         * okundu yap. */
        if (Number(veri?.okuyanId) === Number(this.activeUserId)) {
          this.markOwnRead()
        }
      })

      /* Yeniden baglanildiginda online listesi bayatlamasin. */
      socket.on("connect", () => {
        socket.emit("presence:list")
      })
    },

    /*
     * Paylasilan baglantinin tuketicisini birakir.
     *
     * Dinleyiciler SOKETLE BIRLIKTE gidiyor: socket.ts son tuketici
     * birakinca `socket.close()` yapip referansi atiyor, yani
     * `socket.off(...)` cagirmaya gerek yok. Baglanti baska bir
     * tuketici yuzunden acik kalirsa `baglandi` true kalmali ki
     * dinleyiciler IKINCI KEZ kurulmasin -- bu yuzden burada
     * sifirlanmiyor.
     */
    setChatDisconnect() {
      if (import.meta.server) return

      useSocketStore().disconnect()
      this.online = []
      this.aktiflik = {}
    },

    /* Kullanici listesi ve okunmamis sayaclari. */
    async setChatUserList() {
      try {
        const api = useApi()
        const res = await api<{ list: ChatUser[]; ready: boolean; dosya: boolean }>(
          "/chat/users",
        )
        this.users = res?.list ?? []
        this.ready = res?.ready !== false
        this.dosyaReady = res?.dosya === true
      } catch (err) {
        console.error("setChatUserList basarisiz:", err)
        this.users = []
      }
    },

    /* Bir kisiyle yazismayi ac: gecmisi yukle ve okundu isaretle. */
    async setChatActiveUser(userId: number | null) {
      this.activeUserId = userId ? Number(userId) : null
      this.messages = []
      if (!userId) return

      this.loadingHistory = true
      try {
        const api = useApi()
        const res = await api<{
          list: ChatMessage[]
          dahaVar: boolean
          ready: boolean
        }>(`/chat/history/${userId}`)

        this.messages = res?.list ?? []
        this.dahaVar = !!res?.dahaVar
        this.ready = res?.ready !== false
        await this.setChatRead(Number(userId))
      } catch (err) {
        console.error("sohbet gecmisi alinamadi:", err)
        this.messages = []
      } finally {
        this.loadingHistory = false
      }
    },

    /* Yukari kaydirinca daha eski mesajlari ekle. */
    async setChatOlderMessages() {
      const { activeUserId, messages, dahaVar, loadingHistory } = this
      if (!activeUserId || !dahaVar || loadingHistory || messages.length === 0) {
        return
      }

      this.loadingHistory = true
      const enEski = messages[0]?.ID
      try {
        const api = useApi()
        const res = await api<{ list: ChatMessage[]; dahaVar: boolean }>(
          `/chat/history/${activeUserId}?beforeId=${enEski}`,
        )

        /* Ayni mesaj iki kez girmesin. */
        const mevcut = new Set(this.messages.map((m) => String(m.ID)))
        const yeni = (res?.list ?? []).filter((m) => !mevcut.has(String(m.ID)))
        this.messages = yeni.concat(this.messages)
        this.dahaVar = !!res?.dahaVar
      } catch (err) {
        console.error("eski mesajlar alinamadi:", err)
      } finally {
        this.loadingHistory = false
      }
    },

    /*
     * Goruntuyu Spaces'e yukler, nesne anahtarini doner (hata olursa
     * null). Dosya SUNUCUDAN GECMEZ: imza alinir, yukleme DOGRUDAN
     * depoya gider.
     */
    async setChatDosyaYukle(
      dosya: ChatEk | null,
      ilerleme?: (yuzde: number) => void,
    ): Promise<string | null> {
      const toast = useAppToast()
      if (!dosya?.blob) return null

      try {
        const api = useApi()
        const res = await api<{
          status: boolean
          url?: string
          key?: string
          message?: string
        }>("/chat/upload-url", {
          method: "POST",
          body: { contentType: dosya.tur, boyut: dosya.blob.size },
        })

        if (!res?.status || !res.url || !res.key) {
          toast.error(res?.message || "Görüntü yüklenemedi.")
          return null
        }

        const url = res.url
        const key = res.key

        return await new Promise<string | null>((resolve) => {
          /*
           * Yukleme yuzdesi icin XMLHttpRequest.
           *
           * $fetch/fetch ilerleme olayi VERMIYOR; ayrica imzali PUT'a
           * fazladan baslik eklenirse IMZA UYUSMAZ, yani istegi
           * araya girmeden gondermek gerekiyor. Nuxt 2'de de ayni
           * sebeple XHR kullaniliyordu.
           */
          const istek = new XMLHttpRequest()
          istek.open("PUT", url, true)
          istek.setRequestHeader("Content-Type", dosya.tur)

          if (typeof ilerleme === "function") {
            istek.upload.onprogress = (olay) => {
              if (olay.lengthComputable) {
                ilerleme(Math.round((olay.loaded / olay.total) * 100))
              }
            }
          }

          istek.onload = () => {
            const tamam = istek.status >= 200 && istek.status < 300
            if (!tamam) {
              console.error("sohbet goruntu yukleme hatasi:", istek.status)
              toast.error("Görüntü yüklenemedi.")
            }
            resolve(tamam ? key : null)
          }
          istek.onerror = () => {
            toast.error("Görüntü yüklenemedi.")
            resolve(null)
          }
          istek.send(dosya.blob)
        })
      } catch (err) {
        console.error("sohbet goruntu yukleme hatasi:", err)
        toast.error("Görüntü yüklenemedi.")
        return null
      }
    },

    /*
     * girdi: { mesaj, dosya, ilerleme }
     * dosya: utils/chatDosya.js resimHazirla sonucu.
     */
    async setChatSend(girdi: {
      mesaj?: string
      dosya?: ChatEk | null
      ilerleme?: (yuzde: number) => void
    }): Promise<{ status: boolean; message?: unknown }> {
      const toast = useAppToast()
      const metin = String(girdi?.mesaj ?? "").trim()
      const dosya = girdi?.dosya ?? null

      if ((!metin && !dosya) || !this.activeUserId) return { status: false }

      const socket = useSocketStore().getSocket
      if (!socket || !socket.connected) {
        toast.error("Sohbet sunucusuna bağlanılamadı.")
        return { status: false }
      }

      /* ONCE yukleme, SONRA mesaj: yukleme basarisizsa bos mesaj
       * gitmesin. */
      let dosyaKey: string | null = null
      if (dosya) {
        dosyaKey = await this.setChatDosyaYukle(dosya, girdi.ilerleme)
        if (!dosyaKey) return { status: false }
      }

      return await new Promise((resolve) => {
        socket.emit(
          "chat:send",
          {
            aliciId: this.activeUserId,
            mesaj: metin,
            dosyaKey,
            dosyaAd: dosya ? dosya.ad : null,
          },
          (sonuc: { status: boolean; message?: unknown }) => {
            if (!sonuc?.status) {
              toast.error(String(sonuc?.message || "Mesaj gönderilemedi."))
            }
            /* Mesaj ekrana `chat:message` olayi ile eklenir (gonderenin
             * TUM sekmeleri ayni paketi alir), burada tekrar eklenmez. */
            resolve(sonuc || { status: false })
          },
        )
      })
    },

    async setChatRead(userId: number) {
      /* Rozet hemen sifirlanir -- sunucu yanitini beklemeye gerek yok. */
      this.users = this.users.map((u) =>
        Number(u.ID) === Number(userId) ? { ...u, Okunmamis: 0 } : u,
      )

      const socket = useSocketStore().getSocket
      if (socket?.connected) {
        socket.emit("chat:read", { karsiId: userId })
        return
      }

      /* Socket kapaliysa REST ile isaretle. */
      try {
        const api = useApi()
        await api("/chat/read", { method: "POST", body: { karsiId: userId } })
      } catch (err) {
        console.error("okundu isaretlenemedi:", err)
      }
    },

    /*
     * Gelen mesaj: acik yazismaya ait ise listeye eklenir ve okundu
     * yapilir, degilse ilgili kisinin okunmamis sayaci artirilir.
     */
    chatIncoming(mesaj: ChatMessage) {
      const benId = Number(useAuthStore().getUserId)
      const gonderen = Number(mesaj.GonderenID)
      const alici = Number(mesaj.AliciID)
      const karsiId = gonderen === benId ? alici : gonderen
      const aktif = Number(this.activeUserId)

      /* Liste onizlemesi (son mesaj + tarih) guncellenir. */
      this.users = this.users.map((u) =>
        Number(u.ID) === karsiId
          ? { ...u, SonMesaj: mesaj.Mesaj, SonMesajTarihi: mesaj.GonderimTarihi }
          : u,
      )

      if (karsiId === aktif) {
        /* Ayni mesaj iki kez gelmesin (yeniden baglanma / cift olay). */
        if (!this.messages.some((m) => String(m.ID) === String(mesaj.ID))) {
          this.messages = this.messages.concat([mesaj])
        }
        if (gonderen !== benId) void this.setChatRead(karsiId)
        return
      }

      if (gonderen === benId) return

      /*
       * Gonderen onbellekteki listede YOKSA sayac artirilamaz ve rozet
       * gorunmezdi (ornegin yeni bir calisan eklenip siz sayfayi hic
       * yenilemediyseniz). Bu durumda liste tazelenir.
       */
      if (!this.users.some((u) => Number(u.ID) === karsiId)) {
        void this.setChatUserList()
        return
      }

      this.users = this.users.map((u) =>
        Number(u.ID) === karsiId
          ? { ...u, Okunmamis: (Number(u.Okunmamis) || 0) + 1 }
          : u,
      )
    },

    /*
     * Biri cevrimiciye gecince sag ustte toast. Bildirim sohbet
     * listesindeki HERKES icin cikar.
     *
     * Yalnizca LISTEDE gorunen kisiler bildirilir: bolge/yer tutucu
     * hesaplar (api/sohbetHaric.js) listeye girmedigi gibi bildirim de
     * uretmemeli.
     */
    chatOnlineBildirimi(veri: PresenceVeri) {
      const id = Number(veri.userId)
      const kisi = this.users.find((u) => Number(u.ID) === id)
      if (!kisi) return

      /*
       * Sayfa yenilemek baglantiyi kopartip yeniden kurar; her F5'te
       * ayni kisi icin bildirim cikmasin diye ayni kisi kisa sure icinde
       * TEKRAR bildirilmez. Gercek "ise basladi" bildirimi etkilenmez.
       */
      const simdi = Date.now()
      if (simdi - (sonBildirim.get(id) ?? 0) < BILDIRIM_BEKLEME_MS) return
      sonBildirim.set(id, simdi)

      const ad = kisi.KullaniciAdi || veri.username
      useAppToast().info(`${ad} is now online`)
    },

    setChatPanelOpen(acik: boolean) {
      this.panelOpen = !!acik
    },

    /* --- ic yardimcilar (eski mutation'lar) --- */

    /*
     * presence:update ve presence:activity ortak govdesi.
     *
     * presence:activity YALNIZCA aktiflik tasir, online durumunu
     * DEGISTIRMEZ -- bu yuzden `online` alani boolean degilse durum
     * guncellemesi atlanir.
     */
    applyPresence(veri: PresenceVeri) {
      if (!veri) return

      const id = Number(veri.userId)
      if (veri.sonAktif) {
        this.aktiflik = { ...this.aktiflik, [id]: veri.sonAktif }
      }
      if (typeof veri.online !== "boolean") return

      const varMi = this.online.includes(id)
      if (veri.online && !varMi) this.online = this.online.concat([id])
      else if (!veri.online && varMi) {
        this.online = this.online.filter((x) => x !== id)
      }
    },

    /* Karsi taraf okudu -> kendi mesajlarima okundu damgasi. */
    markOwnRead() {
      const simdi = new Date().toISOString()
      this.messages = this.messages.map((m) =>
        m.OkunduTarihi ? m : { ...m, OkunduTarihi: simdi },
      )
    },
  },
})
