<template>
  <div>
    <!--
      Yukleme sirasinda etkilesimi engelleyen tam ekran katman.
      Onceden sadece ortada donen bir ikon vardi; arkasindaki forma ve
      tabloya tiklanabiliyordu, yani veri degisirken islem baslatmak
      mumkundu. Katman tum tiklamalari yakalar ve ekran okuyuculara
      aria-busy ile durumu bildirir.
    -->
    <!--
      ClientOnly ZORUNLU -- HYDRATION UYUSMAZLIGI VERIYORDU.

      Yukleme katmaninin kosulu (`shared.isLoading || navigating`)
      SUNUCUDA her zaman false: isLoading sayaci SSR'da hic kurulmuyor
      ve `navigating` yalnizca istemcideki `page:loading:*` kancalariyla
      doluyor. Sunucu bu yuzden bir YORUM dugumu basiyor, istemci ise
      ilk render'da katmani ACMIS oluyor:

        [Vue warn]: Hydration node mismatch:
          - rendered on server: #comment
          - expected on client: div
            at <Transition name="app-loading-fade">

      Eski kodda (Transition'siz, yalnizca isLoading) bu gorunmuyordu
      cunku iki tarafta da false'ti; `navigating` eklenince ortaya
      cikti. Katman zaten tamamen istemci isi, dolayisiyla dogru cozum
      SSR'dan tamamen cikarmak.
    -->
    <ClientOnly>
    <Transition name="app-loading-fade">
      <div
        v-if="shared.isLoading || navigating"
        class="app-loading-overlay"
        role="status"
        aria-busy="true"
        aria-live="polite"
      >
        <!--
          ProgressSpinner yerine goz: sistemin adi "Goz", yukleme
          gostergesi de markaya ait bir isaret olsun.
          Bilesen tamamen gorsel; durum bildirimi burada (role/aria).
        -->
        <SharedEyeLoader />
        <span class="app-sr-only">Yükleniyor…</span>
      </div>
    </Transition>
    </ClientOnly>

    <Toast />

    <!--
      Etiket adi <SharedNavbar>, cunku Nuxt auto-import adini DOSYA
      YOLUNDAN uretiyor: components/shared/Navbar.vue -> SharedNavbar.
      Burada once <Navbar /> yazilmisti ve bilesen cozulemiyordu --
      Vue bunu yalnizca konsola uyari olarak basar, sayfa hatasiz
      render edilir, navbar sessizce YOK olur.
    -->
    <SharedNavbar v-show="auth.isAuthenticated" style="margin-bottom: 5px" />

    <slot />

    <!--
      Sirket ici sohbet: sag altta duran panel.

      LAYOUT'TA DURUYOR ki sayfa gezintilerinde yazisma ve baglanti
      kopmasin. v-if (v-show DEGIL): oturum yoksa bilesen hic
      kurulmasin -- mounted() icinde dakikalik zamanlayici aciyor.
    -->
    <ChatPanel v-if="auth.isAuthenticated" />
  </div>
</template>

<script setup>
// Nuxt 2'de <nuxt /> idi -> Nuxt 3+'ta <slot />
//
// Yukleme gostergesi: Nuxt 2'deki loadingSpinner -> (pilotta PrimeVue
// ProgressSpinner) -> simdi components/shared/EyeLoader.vue (goz).
const shared = useSharedStore()
const auth = useAuthStore()

/*
 * SAYFALAR ARASI GECISTE DE GOZ.
 *
 * `shared.isLoading` yalnizca VERI islemlerini sayiyor
 * (beginLoading/endLoading). Sayfa gezintisi ayri bir sure: Nuxt
 * rotayi cozup yeni sayfanin useAsyncData'larini beklerken ekranda
 * hicbir sey olmuyordu.
 *
 * Nuxt'un `page:loading:start` / `page:loading:end` kancalari tam bu
 * araligi veriyor; ikisi birlestirilerek tek katman kullaniliyor.
 *
 * NEDEN useLoadingIndicator() DEGIL: o composable ekranin tepesinde
 * ince bir cubuk icin tasarlanmis (ilerleme yuzdesi tutuyor) ve
 * `isLoading` degeri gecis bitiminde bir sure daha true kaliyor --
 * tam ekran katman icin istenmeyen bir gecikme. Kancalar dogrudan
 * ve gecikmesiz.
 */
const navigating = ref(false)

const nuxtApp = useNuxtApp()
nuxtApp.hook("page:loading:start", () => {
  navigating.value = true
})
nuxtApp.hook("page:loading:end", () => {
  navigating.value = false
})

/*
 * Nuxt 2 layouts/default.vue acilista 25 liste action'i tetikliyordu
 * (created icinde, SSR tarafindan beklenmeden). Burada yalnizca navbar'in
 * gercekten ihtiyac duydugu kullanici listesi cekiliyor; kalanlar ilgili
 * sayfalar tasindikca kendi useAsyncData'lariyla gelecek.
 *
 * server: false ZORUNLU -- bkz. server/middleware/1.legacy-api.ts
 * Veri legacy Express API'sinden geliyor. SSR sirasinda $fetch Nitro'nun
 * IC yolunu kullanir ve event.node.res gercek bir ServerResponse degil,
 * taklit bir nesnedir. Express'in res.json() cagrisi o nesne uzerinde
 * res.get("content-type") okudugu icin ya patliyor ya istek sonsuza
 * kadar asili kaliyor. Bu yuzden legacy API'ye yapilan cagrilar
 * YALNIZCA CLIENT tarafinda yapiliyor.
 *
 * Davranis kaybi yok: Nuxt 2'de de bu veriler SSR'da gelmiyordu, cunku
 * created() icindeki async is SSR tarafindan beklenmiyordu.
 */
if (auth.isAuthenticated) {
  await useAsyncData("layout-user-list", () => shared.setUserList(), {
    server: false,
  })
}

/*
 * =====================================================================
 * SOHBET + SON AKTIFLIK
 * =====================================================================
 * Sohbet YALNIZCA istemcide ve oturum acikken kurulur. Baglanti
 * paylasilan socket uzerinden gidiyor (app/stores/chat.ts ayri bir
 * baglanti ACMIYOR -- gerekcesi orada).
 *
 * "Son aktiflik" GERCEK ETKILESIMDEN hesaplanir: sekmeyi acik birakip
 * giden kullanici "cevrimici" degil "X dakika once aktif" gorunsun.
 * Yalnizca baglantinin acik olmasi aktiflik SAYMAZ -- bu yuzden
 * fare/klavye/tekerlek/dokunma ve sekmeye geri donus dinleniyor.
 *
 * Her harekette istek atilmaz: en fazla 45 saniyede bir ping gider,
 * sunucu da veritabanina en fazla 60 saniyede bir yazar
 * (server/utils/chat-socket.ts).
 */
const chat = useChatStore()
const socketStore = useSocketStore()

const AKTIFLIK_PING_ARALIK_MS = 45 * 1000
const AKTIFLIK_OLAYLARI = ["mousedown", "keydown", "wheel", "touchstart"]

let sonAktiflikBildirimi = 0
let aktiflikEli = null
let gorunurlukEli = null

function aktiflikBildir() {
  const simdi = Date.now()
  if (simdi - sonAktiflikBildirimi < AKTIFLIK_PING_ARALIK_MS) return
  sonAktiflikBildirimi = simdi

  const socket = socketStore.getSocket
  if (socket?.connected) socket.emit("presence:ping")
}

onMounted(() => {
  if (!auth.isAuthenticated) return

  chat.setChatConnection()
  chat.setChatUserList()

  aktiflikEli = () => aktiflikBildir()
  for (const olay of AKTIFLIK_OLAYLARI) {
    window.addEventListener(olay, aktiflikEli, { passive: true })
  }

  gorunurlukEli = () => {
    if (document.visibilityState === "visible") {
      /* Sekmeye geri donmek etkilesimdir; kisitlamayi ATLA. */
      sonAktiflikBildirimi = 0
      aktiflikBildir()
    }
  }
  document.addEventListener("visibilitychange", gorunurlukEli)
})

onBeforeUnmount(() => {
  if (aktiflikEli) {
    for (const olay of AKTIFLIK_OLAYLARI) {
      window.removeEventListener(olay, aktiflikEli)
    }
    aktiflikEli = null
  }
  if (gorunurlukEli) {
    document.removeEventListener("visibilitychange", gorunurlukEli)
    gorunurlukEli = null
  }

  chat.setChatDisconnect()
})
</script>

<style scoped>
.app-loading-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;

  display: flex;
  align-items: center;
  justify-content: center;

  /* tiklamalari yakalar: altindaki hicbir sey tiklanamaz */
  pointer-events: auto;
  cursor: wait;

  background: rgb(0 0 0 / 25%);
  backdrop-filter: blur(1px);
}

/*
 * Katmanin kendisi de yumusak giriyor/cikiyor.
 *
 * NEDEN: kisa suren isteklerde katman bir kare gorunup kayboluyor ve
 * ekran "cakiyordu". Opaklik gecisi o cakmayi yumusatiyor.
 *
 * CIKIS GIRISTEN YAVAS (90ms -> 220ms): katman aniden kaybolursa goz
 * yari kirpik haldeyken kesiliyor; yavas cikis kirpmanin tamamlanmasina
 * firsat veriyor.
 */
.app-loading-fade-enter-active {
  transition: opacity 90ms ease-out;
}

.app-loading-fade-leave-active {
  transition: opacity 220ms ease-in;
}

.app-loading-fade-enter-from,
.app-loading-fade-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .app-loading-fade-enter-active,
  .app-loading-fade-leave-active {
    transition: none;
  }
}

.app-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
