<template>
  <div>
    <!--
      Yukleme sirasinda etkilesimi engelleyen tam ekran katman.
      Onceden sadece ortada donen bir ikon vardi; arkasindaki forma ve
      tabloya tiklanabiliyordu, yani veri degisirken islem baslatmak
      mumkundu. Katman tum tiklamalari yakalar ve ekran okuyuculara
      aria-busy ile durumu bildirir.
    -->
    <div
      v-if="shared.isLoading"
      class="app-loading-overlay"
      role="status"
      aria-busy="true"
      aria-live="polite"
    >
      <ProgressSpinner strokeWidth="4" />
      <span class="app-sr-only">Yükleniyor…</span>
    </div>

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
// loadingSpinner componenti yerine PrimeVue ProgressSpinner
const shared = useSharedStore()
const auth = useAuthStore()

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
