<template>
  <div class="container">
    <HomeDashboard
      :home="homeStore.getHomeList"
      :stocks="homeStore.getMekmerStocks"
      :total-supplier-cost="homeStore.getTotalSupplierCost"
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

await useAsyncData(
  "home",
  async () => {
    await Promise.all([
      homeStore.getHome(),
      homeStore.getMekmerStocksList(),
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
