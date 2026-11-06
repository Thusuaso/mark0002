<template>
  <div>
    <div class="container row">
      <div class="col">
        <DatePicker
          v-model="selectedDates"
          selectionMode="range"
          :manualInput="false"
          placeholder="Select a Date Range"
          class="w-100"
          dateFormat="dd/mm/yy"
        />
      </div>
      <div class="col">
        <Button
          type="button"
          severity="secondary"
          class="w-100"
          label="Clear"
          @click="selectedDates = null"
        />
      </div>

      <div class="col">
        <Button
          type="button"
          severity="success"
          class="w-100"
          label="Search"
          @click="searchDateList"
        />
      </div>
      <div class="col">
        <Button type="button" label="Excel" @click="excel_output" />
      </div>
    </div>

    <ReportsMekmerProductionList
      :list="reportsStore.getReportsMekmerProductionList"
      :total="reportsStore.getReportsMekmerProductionListTotal"
      :dates="selectedDates"
      @mekmer_filtered_production_list_emit="mekmerFilteredProductionList($event)"
      @mekmer_production_filter_cleared_emit="is_filtered = false"
    />
  </div>
</template>

<script>
import { useReportsStore } from "~/stores/reports"
import { useSharedStore } from "~/stores/shared"
import { toIsoDate } from "~/utils/dates"

export default {
  computed: {
    reportsStore() {
      return useReportsStore()
    },
    sharedStore() {
      return useSharedStore()
    },
  },

  data() {
    return {
      selectedDates: null,
      is_filtered: false,
      mekmer_filtered_list: [],
    }
  },

  /*
   * [x] created() KALDIRILDI -- veri cekimi asagidaki <script setup>
   * blogunda useAsyncData ile. Gerekcesi orada.
   */
  methods: {
    mekmerFilteredProductionList(event) {
      this.is_filtered = true
      this.mekmer_filtered_list = event
    },

    /*
     * ARTIK EXCEL SUNUCUSUNDAN DEGIL, NITRO'DAN:
     *   eski: POST + GET {excelServerBase}/reports/excel/production
     *   yeni: POST /excel-api/reports/production   (tek istek)
     *         server/routes/excel-api/reports/production.post.ts
     *
     * Cikti uretimdekiyle ornek veriyle KARSILASTIRILDI: deger, sayi
     * bicimi, hucre stili, sutun genisligi ve birlestirme farki 0
     * (yalnizca A:J birlestirmesinin ICINDEKI gorunmez hucrelerde
     * kayitli stil farki var -- Excel onlari cizmiyor).
     *
     * `if (response.status)` DUSTU: HTTP durumunu (daima 200) okuyordu,
     * govdedeki {"status": false}'u DEGIL.
     */
    async excel_output() {
      try {
        await exportExcel(
          "/excel-api/reports/production",
          this.is_filtered
            ? this.mekmer_filtered_list
            : this.reportsStore.getReportsMekmerProductionList,
          "mekamer_production_excel.xlsx",
        )
      } catch (err) {
        console.error("production excel ciktisi basarisiz:", err)
        useAppToast().error("Excel olusturulamadi.")
      }
    },

    async searchDateList() {
      const payload = {
        date1: toIsoDate(this.selectedDates[0]),
        date2: toIsoDate(this.selectedDates[1]),
      }

      this.sharedStore.beginLoading()
      try {
        const response = await useLegacyApi().post(
          "/reports/mekmer/production/date",
          payload,
        )
        this.is_filtered = false
        this.reportsStore.setReportsMekmerProductionList(response.data.list)
      } finally {
        this.sharedStore.endLoading()
      }
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
const sharedStore = useSharedStore()

await useAsyncData(
  "reports-mekmer-production",
  async () => {
    sharedStore.beginLoading()
    try {
      const response = await useLegacyApi().get("/reports/mekmer/production/list")
      reportsStore.setReportsMekmerProductionList(response.data.list)
    } finally {
      sharedStore.endLoading()
    }
    return true
  },
  { server: false },
)
</script>

<!--
  pages/reports/mekmer/production.vue

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] mapGetters -> computed reportsStore / sharedStore
  [x] this.$store.dispatch(...) -> Pinia eylemleri
  [x] this.$axios -> useLegacyApi()
  [x] setBeginLoadingAction / setEndLoadingAction
         -> sharedStore.beginLoading() / endLoading()
      Vuex'teki loading modulu pilotta shared store'a tasindi ve artik
      BOOLEAN degil SAYAC (bkz. app/stores/shared.ts).
  [x] created() -> <script setup> + useAsyncData({ server: false })
  [x] <Calendar> -> <DatePicker>   (PrimeVue 4'te yeniden adlandirildi)
  [x] <reportsMekmerProductionList> -> <ReportsMekmerProductionList>
      (Nuxt auto-import adi; plugins/components.js elle kaydi kalkti.)

  [x] class="p-button-secondary" / "p-button-success" -> severity="..."
      PrimeVue 4'te p-button-<severity> siniflari KALDIRILDI; sinif olarak
      birakilsa dugmeler varsayilan (mavi) gorunurde kalirdi -- hata
      vermez, sessizce yanlis renk. ("w-100" yerlesim sinifi, kaldi.)
      Excel dugmesindeki class="p-button-primary" ZATEN varsayilan
      gorunumdu, bu yuzden severity verilmedi.

  [x] this.$excelApi + elle <a download> -> useExcelApi() +
      downloadFromExcelServer(). Eski kod <a> ogesini DOM'dan hic
      kaldirmiyordu ve adresi getLocalUrl ile elle birlestiriyordu.
      Ayrinti: app/composables/useExcelApi.ts

  [x] searchDateList'teki elle tarih bicimlendirme -> toIsoDate()
      Nuxt 2'de iki tarih icin ayri ayri
          d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate()
      yaziliydi. Bu AY VE GUNU BASA SIFIR KOYMADAN uretir: 5 Ocak icin
      "2026-1-5". toIsoDate sifir dolguluyor (bkz. app/utils/dates.ts).
      Uc tarafinda VarChar olarak baglanip SQL'e verildigi icin bu
      yalnizca sans eseri calisiyordu.

  [x] searchDateList icinde yalnizca setReportsMekmerProductionList
      cagiriliyor. Nuxt 2 ayrica setReportsMekmerProductionTotal'i da
      dispatch ediyordu; ama ...List eylemi govdesinde ZATEN ...Total'i
      cagiriyor, yani toplam iki kez hesaplaniyordu. Mutation idempotent
      oldugu icin sonuc ayni.

  [x] @mekmer_production_filter_cleared_emit="is_filtered = false" EKLENDI
      Liste bileseni filtre temizlenip tam listeye dondugunde bunu
      yayiyor. Nuxt 2'de ayni isi bilesenin icindeki
      `this.is_filtered = false` yapmaya CALISIYORDU -- ama o alan
      BILESENDE degil BU SAYFADA tanimli, yani atama bosa gidiyordu ve
      bayrak true kaliyordu. Sonuc: filtreyi temizleyip Excel'e basan
      kullanici ESKI filtrelenmis satirlari aliyordu. Ayrinti:
      app/components/reports/mekmer/ProductionList.vue sonundaki not.

  KALDIRILDI -- OLU KOD:
  [x] mapGetters'daki "getReportsMekmerProductionFilterList"
      Getter'in kendisi de store'a tasinmadi: besleyen action, hicbir
      modulde var olmayan bir mutation'a commit ediyordu, yani getter
      daima [] donuyordu. Sayfa onu mapGetters'a yaziyor ama HIC
      OKUMUYORDU. (Ayrinti: app/stores/reports.ts, ayni adin gectigi not.)
  [x] data.productionList          -- yalnizca tanim, okuyan yok
  [x] data.quarters / selectedQuarter -- Q1..Q5 listesi; sablonda bunlari
      gosteren hicbir alan yok, baska yerde de okunmuyor
  [x] data.reportsMekmerProductionListExcelFields ve ...Fields2
      -- yalnizca yorumlu <JsonExcel> / <vue-excel-xlsx> bloklarinin alan
      listeleriydi
  [x] methods.formatDecimal -- yalnizca ...Fields2 icinden
      `dataFormat: this.formatDecimal` olarak referansliydi. Ustelik
      data() icinde `this.formatDecimal` yazmak ZATEN calismiyordu:
      data() calistiginda methods henuz bagli degil, deger undefined
      oluyordu. Sablonun kullandigi formatDecimal bu degil,
      app/plugins/formatters.ts ile gelen global olandir.
  [x] Yorumlu <JsonExcel> ve <vue-excel-xlsx> bloklari -- ikisi de Vue 2'ye
      bagli (vue-json-excel@0.3.0'in Vue 3 surumu yok), pilota kurulmadilar.

  DIKKAT -- NUXT 2'DE DE VAR OLAN DAVRANIS (korundu):
      "Search" dugmesi selectedDates null iken tiklanirsa
      `this.selectedDates[0]` TypeError atar. Nuxt 2'de de boyleydi;
      koruma eklemek dugmenin davranisini degistirir (orn. devre disi
      birakmak) ve bu ayri bir karar.
-->
