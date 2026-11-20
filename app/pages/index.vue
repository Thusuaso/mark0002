<template>
  <div class="container">
    <!--
      ANDROID UYGULAMASI -- sayfanin USTUNDE, navbar'in hemen altinda.

      Once navbar'daydi: orada ~190px yer kapliyor ve sagdaki Logout
      ile takvim simgesini ekran disina itiyordu. Menude yeri de yoktu
      zaten -- bir ekran degil, bir indirme.

      Ustte duruyor cunku panelin altinda kaydirmadan goruluyordu:
      ana sayfa uzun (KPI kartlari + grafikler + tablolar) ve serit
      ancak sonuna kadar inince ortaya cikiyordu. Uygulamadan haberi
      olmayan kisi oraya hic inmez.

      Kabukta GOSTERILMIYOR (v-if): uygulamanin icinde "uygulamayi
      indir" demek anlamsiz.
    -->
    <section v-if="!isMobile" class="appcta" :class="{ 'appcta--yeni': yeniSurum }">
      <div class="appcta__mark" aria-hidden="true">
        <i class="pi pi-android" />
      </div>

      <div class="appcta__text">
        <h2 class="appcta__title">
          GOZ on your phone
          <!--
            YENI SURUM ROZETI. Yalnizca son yayin TAZE ise cikiyor
            (bkz. yeniSurum); surekli duran bir "yeni" etiketi birkac
            gun sonra gorulmez oluyor ve anlamini yitiriyor.
          -->
          <span v-if="yeniSurum" class="appcta__yeni">NEW</span>
        </h2>

        <!--
          Taze yayin varsa ACIKLAMA YERINE o yayinin ilk notu
          gosteriliyor: "indir" demek icin bir SEBEP veriyor. Sayfa
          kullanicinin telefonunda hangi surumun kurulu oldugunu
          BILEMEZ, bu yuzden "guncelleme var" degil "su tarihte su
          surum cikti" deniyor -- bildigimiz sey bu.
        -->
        <p v-if="yeniSurum" class="appcta__desc">
          <strong>v{{ guncelSurum.version }}</strong>
          · {{ tarihYazisi(guncelSurum.date) }} —
          {{ guncelSurum.notes[0] }}
        </p>
        <p v-else class="appcta__desc">
          Orders, container tracking and stock reports, built for the
          screen in your pocket.
        </p>
      </div>

      <NuxtLink to="/app" class="appcta__btn">
        <i class="pi pi-download" aria-hidden="true" />
        {{ yeniSurum ? `Get v${guncelSurum.version}` : "Download Android App" }}
      </NuxtLink>
    </section>

    <HomeDashboard
      :home="homeStore.getHomeList"
      :stocks="homeStore.getMekmerStocks"
      :total-supplier-cost="homeStore.getTotalSupplierCost"
      :comparison="homeStore.getProductionComparison"
    />

  </div>
</template>

<script>
import { useHomeStore } from "~/stores/home"

export default {
  computed: {
    homeStore() {
      return useHomeStore()
    },
  },

  /*
   * [x] created() KALDIRILDI -- veri cekimi asagidaki <script setup>
   * blogunda useAsyncData ile. Gerekcesi orada.
   */
}
</script>

<script setup>
import { MOBILE_RELEASES } from "~/utils/mobileVersion"

/* Kabukta gizlemek icin -- gerekcesi nuxt.config.ts (derleme zamani). */
const isMobile = useRuntimeConfig().public.isMobile

/*
 * YENI SURUM VURGUSU.
 *
 * Sayfa, kullanicinin telefonunda hangi surumun kurulu oldugunu
 * BILEMEZ -- bunu ogrenmenin bir yolu yok. O yuzden "guncelleme var"
 * DEMIYORUZ; yalnizca son yayinin TAZE oldugunu soyluyoruz. Soyledigi
 * sey dogru: "su tarihte su surum cikti".
 *
 * 14 GUN: rozet kalici olursa birkac gun sonra gorulmez hale geliyor
 * ve "yeni" kelimesi anlamini yitiriyor. Suresi dolunca serit sakin
 * haline donuyor.
 */
const guncelSurum = MOBILE_RELEASES[0]

const yeniSurum = computed(() => {
  const g = (Date.now() - new Date(guncelSurum.date).getTime()) / 86400000
  return g >= 0 && g <= 14
})

function tarihYazisi(iso) {
  const d = new Date(iso)
  const iki = (n) => (n < 10 ? "0" + n : String(n))
  return `${iki(d.getDate())}.${iki(d.getMonth() + 1)}.${d.getFullYear()}`
}

/*
 * Veri cekimi NEDEN created() icinde degil: SSR created() icindeki async
 * isi BEKLEMEZ -- govde BOS serialize edilir, client hydration onu
 * devralir ve created() bir daha calismadigi icin ekran bos kalir
 * (bkz. pages/reports/mekmer/stock.vue icindeki ayni not).
 *
 * server: false ZORUNLU -- legacy Express API'si SSR'in IC fetch yolunda
 * calismiyor (bkz. server/middleware/1.legacy-api.ts).
 *
 * IKI ISTEK NEDEN Promise.all: Nuxt 2'de bunlar birbirinden habersiz iki
 * ayri yerde baslatiliyordu -- /home sayfanin created()'inda,
 * /reports/mekmer/stocks/list ise BILESENIN created()'inda. Ikisi de
 * agirdir (/home tek seferde 11 SQL sorgusu calistiriyor), sirayla
 * beklemenin bir sebebi yok.
 */
const homeStore = useHomeStore()

/*
 * [x] YIL KARSILASTIRMASI ARTIK KOSULSUZ CEKILIYOR.
 *
 * Ilk surumde istek yalnizca userId 48 icin atiliyordu, cunku tablo
 * yalnizca o panelde vardi. Simdi IKI PANELDE de var (48'de en ustte,
 * digerlerinde en altta), yani kosul her zaman dogru olacakti --
 * duran bir `userId == 48` kontrolu ileride "bu neden burada?"
 * sorusuna donusur ve yanlis tarafa dusen bir degisiklikte tabloyu
 * sessizce bos birakir.
 */
await useAsyncData(
  "home",
  async () => {
    await Promise.all([
      homeStore.getHome(),
      homeStore.getMekmerStocksList(),
      homeStore.getProductionComparisonList(),
    ])
    return true
  },
  { server: false },
)
</script>

<!--
  pages/index.vue

  Nuxt 2'deki hali, pilotun ilk gunlerinden kalan bir ISKELETLE
  degistirilmisti ("Nuxt 4 + PrimeVue 5 pilot" basligi ve tedarikci
  ekranina giden tek bir dugme). O iskelet artik gereksiz: gezinme
  layouts/default.vue icindeki <SharedNavbar> ile geliyor.

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] this.$store.getters.getHomeList -> homeStore.getHomeList
  [x] this.$store.dispatch("getHome") -> homeStore.getHome()
  [x] <home :home="home" /> -> <HomeDashboard ... />
      (Nuxt auto-import adi dosya yolundan gelir; ad secimi
       components/home/Dashboard.vue icinde aciklandi.)

  [x] `if (process.client)` sarmalayicisi KALDIRILDI. Nuxt 3+'ta
      process.client YOK (import.meta.client var); daha onemlisi
      useAsyncData'nin server: false secenegi ayni isi zaten yapiyor.

  [x] Bilesenin kendi cektigi /reports/mekmer/stocks/list buraya alindi
      -- gerekcesi yukarida, <script setup> icinde.

  KALDIRILDI -- OLU KOD:
  [x] components: {}, data() { return {} }, beforeMount() {},
      mounted() {}, methods: {} -- hepsi BOSTU.
  [x] <style></style> -- bos.
  [x] Yorum icine alinmis `// api.get('/reports/production/send/mail')`
      satiri. Islevi belirsiz ve created() icinde yorumlu duruyordu;
      pilota tasinmadi. Geri gerekirse Nuxt 2 deposunda duruyor.
-->

<style scoped>
/*
 * Android indirme seridi. Panelin altinda, kendi basina duran tek bir
 * serit: dikkat cekiyor ama panelin verileriyle yarismiyor.
 */
.appcta {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;

  padding: 18px 20px;
  margin: 8px 0 40px;

  background: #ffffff;
  border: 1px solid #e2e5ea;
  border-radius: 14px;
  box-shadow: 0 1px 2px rgb(17 24 39 / 5%);
}

.appcta__mark {
  display: grid;
  place-items: center;
  flex: none;

  width: 44px;
  height: 44px;

  font-size: 20px;
  color: #ffffff;

  background: linear-gradient(140deg, #1d4ed8, #0f766e);
  border-radius: 12px;
}

.appcta__text {
  flex-grow: 1;
  min-width: 220px;
}

.appcta__title {
  margin: 0;
  font-size: 16px;
  font-weight: 650;
  letter-spacing: -0.01em;
  color: #111827;
}

.appcta__desc {
  margin: 3px 0 0;
  font-size: 13px;
  line-height: 1.45;
  color: #4b5563;
}

.appcta__btn {
  display: inline-flex;
  flex: none;
  gap: 8px;
  align-items: center;

  /* 44px: dokunma hedefi, dar ekranda da gecerli. */
  min-height: 44px;
  padding: 0 18px;

  font-size: 14px;
  font-weight: 650;
  color: #ffffff;
  text-decoration: none;
  white-space: nowrap;

  background: #111827;
  border-radius: 10px;
  transition: background-color 150ms ease;
}

.appcta__btn:hover,
.appcta__btn:focus-visible {
  color: #ffffff;
  background: #1d4ed8;
}

/* Dar ekranda dugme kendi satirinda ve tam genislikte. */
@media (max-width: 575.98px) {
  .appcta__btn {
    justify-content: center;
    width: 100%;
  }
}

/* ---------- taze yayin: serit renkleniyor ---------- */

/*
 * Yeni surum varken serit sakin beyazdan cikip renkleniyor: panelin
 * ustunde, sayfanin ilk gordugu yerde durdugu icin bu kadari dikkat
 * cekmeye yetiyor. Renk 14 gun sonra kendiliginden sonuyor
 * (bkz. yeniSurum) -- kalici bir vurgu birkac gun sonra gorulmez
 * hale geliyor.
 */
.appcta--yeni {
  background: linear-gradient(135deg, #eff4ff 0%, #ecfdf7 100%);
  border-color: #bfd3fb;
  box-shadow: 0 2px 10px -4px rgb(29 78 216 / 22%);
}

.appcta--yeni .appcta__mark {
  /* Isaret de canlansin; serit ile ayni iki renk. */
  box-shadow: 0 0 0 4px rgb(29 78 216 / 10%);
}

.appcta--yeni .appcta__btn {
  background: #1d4ed8;
}

.appcta--yeni .appcta__btn:hover,
.appcta--yeni .appcta__btn:focus-visible {
  background: #1e3a8a;
}

/*
 * "NEW" rozeti. Basligin yaninda, kucuk ve yuksek karsitlikli.
 * Animasyon YOK: surekli hareket eden bir oge okumayi zorlastiriyor
 * ve panelin verisiyle yarisiyor; renk ve konum zaten yetiyor.
 */
.appcta__yeni {
  display: inline-block;
  vertical-align: middle;

  margin-left: 8px;
  padding: 2px 8px;

  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: #ffffff;

  background: #0f766e;
  border-radius: 999px;
}

.appcta--yeni .appcta__desc strong {
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: #1d4ed8;
}
</style>
