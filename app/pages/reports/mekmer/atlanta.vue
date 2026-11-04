<template>
  <div><ReportsMekmerAtlantaList :list="reportsStore.getReportsMekmerAtlantaList" /></div>
</template>

<script>
import { useReportsStore } from "~/stores/reports"

export default {
  computed: {
    reportsStore() {
      return useReportsStore()
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
 * isi BEKLEMEZ -- liste BOS serialize edilir, client hydration onu
 * devralir ve created() bir daha calismadigi icin tablo bos kalir;
 * ayrica yukleme sayaci payload'da 1 kalip spinner'i kilitler
 * (bkz. commit 2afc877e3).
 *
 * server: false ZORUNLU -- legacy Express API'si SSR'in IC fetch yolunda
 * calismiyor (bkz. server/middleware/1.legacy-api.ts).
 */
const reportsStore = useReportsStore()

await useAsyncData(
  "reports-mekmer-atlanta",
  async () => {
    await reportsStore.setReportsMekmerAtlantaList()
    return true
  },
  { server: false },
)
</script>

<style scoped></style>

<!--
  pages/reports/mekmer/atlanta.vue

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] mapGetters(["getReportsMekmerAtlantaList"])
         -> computed reportsStore + sablonda reportsStore.getX
  [x] this.$store.dispatch("setReportsMekmerAtlantaList")
         -> reportsStore.setReportsMekmerAtlantaList()
  [x] created() -> <script setup> + useAsyncData({ server: false })
  [x] <reportsMekmerAtlantaList> -> <ReportsMekmerAtlantaList>
      Nuxt 2'de bilesen plugins/components.js ile `reportsMekmerAtlantaList`
      adiyla ELLE kaydediliyordu. Pilotta Nuxt auto-import kullaniliyor ve
      ad dizin yolundan uretiliyor:
      app/components/reports/mekmer/AtlantaList.vue -> ReportsMekmerAtlantaList
-->
