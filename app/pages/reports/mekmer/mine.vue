<template>
  <div class="container">
    <Button
      type="button"
      severity="secondary"
      label="Excel"
      @click="excel_output"
    />
    <ReportsMekmerMineList :list="reportsStore.getReportsMekmerMineList" />
  </div>
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
  methods: {
    excel_output() {
      useExcelApi()
        .post("/reports/excel/mine", this.reportsStore.getReportsMekmerMineList)
        .then((response) => {
          if (response.status) {
            downloadFromExcelServer("reports/excel/mine", "mekamer_mine_excel.xlsx")
          }
        })
    },
  },
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
  "reports-mekmer-mine",
  async () => {
    await reportsStore.setReportsMekmerMineList()
    return true
  },
  { server: false },
)
</script>

<!--
  pages/reports/mekmer/mine.vue

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] mapGetters -> computed reportsStore
  [x] this.$store.dispatch("setReportsMekmerMineList")
         -> reportsStore.setReportsMekmerMineList()
  [x] created() -> <script setup> + useAsyncData({ server: false })
  [x] <reportsMekmerMineList> -> <ReportsMekmerMineList>  (auto-import adi)

  [x] this.$excelApi -> useExcelApi()
  [x] Indirme linkini ELLE kurma -> downloadFromExcelServer()
      Eski kod `getLocalUrl + "reports/excel/mine"` ile <a download>
      olusturuyor, DOM'a ekliyor, tikliyor ve ORADA BIRAKIYORDU; her
      Excel tiklamasi body'ye bir olu <a> daha ekliyordu. Ayrica adres
      iki yerde (store/modules/local.js ve plugins/excelApi.js) ayri ayri
      gomuluydu. Ayrinti: app/composables/useExcelApi.ts

  [x] class="p-button-secondary" -> severity="secondary"
      PrimeVue 4'te p-button-<severity> siniflari KALDIRILDI; sinif olarak
      birakilsa dugme varsayilan (mavi) gorunurde kalirdi -- hata vermez,
      sessizce yanlis renk.

  KALDIRILDI -- OLU KOD:
  [x] Yorum icine alinmis <JsonExcel> blogu.
      vue-json-excel@0.3.0 YALNIZCA Vue 2 icin; Vue 3 surumu yok, pilota
      hic kurulmadi. Yorumu tasimak, var olmayan bir bileseni geri
      acilabilirmis gibi gostermek olurdu. Calisan yol zaten yukaridaki
      excel_output().
  [x] data.getReportsMekmerMineExcelFields ve ...Fields2
      Ikisi de SADECE o yorumlu JsonExcel blogunun alanlariydi; kodda ve
      sablonda baska hicbir okuyucusu yok.

  DIKKAT -- KASITLI OLARAK EKLENMEDI:
      Nuxt 2'de sablon :loading="getLoading" geciriyordu, ama
      ReportsMekmerMineList'in props'unda `loading` TANIMLI DEGIL (orada
      da not dusuldu) -- yani bu ekranda yukleme gostergesi hic
      calismiyordu. Vue 3'te tanimsiz prop kok ogeye DOM attribute'u
      olarak dusecegi icin baglama tamamen kaldirildi: davranis ayni,
      DOM temiz. Gostergeyi gercekten calistirmak ayri bir karar.
-->
