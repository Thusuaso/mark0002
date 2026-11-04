<template>
  <div class="container">
    <div class="flex flex-wrap gap-3 mb-3 ml-3">
      <div class="flex align-items-center">
        <RadioButton v-model="ingredient" inputId="stockKind_stock" value="Stock" @change="statusSelect($event)" />
        <label for="stockKind_stock" class="ml-2">Only Stock</label>
      </div>
      <div class="flex align-items-center">
        <RadioButton v-model="ingredient" inputId="stockKind_outer" value="Outer" @change="statusSelect($event)" />
        <label for="stockKind_outer" class="ml-2">External</label>
      </div>
      <div class="flex align-items-center">
        <RadioButton v-model="ingredient" inputId="stockKind_mekmer" value="Mekmer" @change="statusSelect($event)" />
        <label for="stockKind_mekmer" class="ml-2">Ext. Crates in Mekmer</label>
      </div>
      <div class="flex align-items-center">
        <RadioButton v-model="ingredient" inputId="stockKind_mekmerIn" value="MekmerIn" @change="statusSelect($event)" />
        <label for="stockKind_mekmerIn" class="ml-2">Mekmer</label>
      </div>
      <div class="flex align-items-center">
        <RadioButton v-model="ingredient" inputId="stockKind_mekmerOnly" value="MekmerOnlyStocks" @change="statusSelect($event)" />
        <label for="stockKind_mekmerOnly" class="ml-2">Mekmer (Only Stocks)</label>
      </div>
      <div class="flex align-items-center">
        <RadioButton v-model="ingredient" inputId="stockKind_mekmoz" value="Mek-Moz" @change="statusSelect($event)" />
        <label for="stockKind_mekmoz" class="ml-2">Mek-Moz</label>
      </div>
      <div class="flex align-items-center">
        <RadioButton v-model="ingredient" inputId="stockKind_all" value="All" @change="statusSelect($event)" />
        <label for="stockKind_all" class="ml-2">All</label>
      </div>
      <div class="flex align-items-center">
        <Button severity="success" label="Excel" @click="excel_output" />
      </div>
    </div>

    <ReportsMekmerStockList
      :list="reportsStore.getReportsMekmerStockList"
      :total="reportsStore.getReportsMekmerStockListTotal"
      @reports_mekmer_stock_list_selected_emit="reportsMekmerStockListSelected($event)"
    />
    <Dialog v-model:visible="reports_mekmer_stock_dialog" header="" modal>
      <ReportsMekmerStockForm
        :list="reportsStore.getReportsStockListDetail"
        :total="reportsStore.getReportsStockListDetailTotal"
      />
    </Dialog>
  </div>
</template>

<script>
import { useReportsStore } from "~/stores/reports"
import { useSharedStore } from "~/stores/shared"

/*
 * Radyo dugmesi degeri -> store eylemi eslemeleri.
 *
 * NEDEN TABLO: Nuxt 2'de ayni 7 secenek IKI AYRI if/else zincirinde,
 * ELLE tekrar ediliyordu (statusSelect ve reportsMekmerStockListSelected).
 * Iki zincir birbirinden bagimsiz degistirilebildigi icin sessizce
 * ayrisabiliyordu -- ornegin yeni bir secenek eklenip yalnizca birine
 * yazilsa, liste dogru gelir ama satira tiklaninca YANLIS detay acilir.
 * Tablo bunu yapisal olarak imkansiz kiliyor.
 *
 * Esleme Nuxt 2'deki iki zincirden BIREBIR cikarildi; hicbir secenek
 * eklenmedi veya cikarilmadi.
 */
const STOCK_KINDS = {
  All: { list: "setReportsMekmerStockList", detail: "setReportsAllStockListDetail" },
  Stock: { list: "setReportsMekmerStockListStock", detail: "setReportsStockStockListDetail" },
  Outer: { list: "setReportsMekmerStockListOuter", detail: "setReportsOuterStockListDetail" },
  Mekmer: { list: "setReportsMekmerStockListMekmer", detail: "setReportsMekmerStockListDetail" },
  MekmerIn: { list: "setReportsMekmerStockListMekmerIn", detail: "setReportsMekmerInStockListDetail" },
  "Mek-Moz": { list: "setReportsMekmerStockListMekmoz", detail: "setReportsMekmozStockListDetail" },
  MekmerOnlyStocks: {
    list: "setReportsMekmerStockListOnlyStocksMekmer",
    detail: "setReportsMekmozStockListOnlyStocksMekmerDetail",
  },
}

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
      reports_mekmer_stock_dialog: false,
      ingredient: "All",
    }
  },

  /*
   * [x] created() KALDIRILDI -- veri cekimi asagidaki <script setup>
   * blogunda useAsyncData ile. Gerekcesi orada.
   */
  methods: {
    excel_output() {
      this.sharedStore.beginLoading()

      useExcelApi()
        .post(
          "/raporlar/listeler/stokRaporExcelListe",
          this.reportsStore.getReportsMekmerStockList,
        )
        .then((response) => {
          if (response.status) {
            downloadFromExcelServer(
              "raporlar/listeler/stokRaporExcelListe",
              "Stok_listesi.xlsx",
            )
          }
          this.sharedStore.endLoading()
        })
        .catch((err) => {
          console.error("excel_output basarisiz:", err)
          this.sharedStore.endLoading()
        })
    },

    reportsMekmerStockListSelected(event) {
      const kind = STOCK_KINDS[this.ingredient]
      if (kind) this.reportsStore[kind.detail](event.data)
      this.reports_mekmer_stock_dialog = true
    },

    statusSelect() {
      const kind = STOCK_KINDS[this.ingredient]
      if (kind) this.reportsStore[kind.list]()
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
  "reports-mekmer-stock",
  async () => {
    await reportsStore.setReportsMekmerStockList()
    return true
  },
  { server: false },
)
</script>

<!--
  pages/reports/mekmer/stock.vue

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] mapGetters -> computed reportsStore / sharedStore
  [x] this.$store.dispatch(...) -> ilgili Pinia eylemi
  [x] setBeginLoadingAction / setEndLoadingAction
         -> sharedStore.beginLoading() / endLoading()
      Vuex'teki loading modulu pilotta shared store'a tasindi ve artik
      BOOLEAN degil SAYAC. (bkz. app/stores/shared.ts)
  [x] created() -> <script setup> + useAsyncData({ server: false })
  [x] <reportsMekmerStockList> / <reportsMekmerStockForm>
         -> <ReportsMekmerStockList> / <ReportsMekmerStockForm>
      (Nuxt auto-import adlari; plugins/components.js elle kaydi kalkti.)

  [x] :visible + @update:visible  ->  v-model:visible
      Nuxt 2'deki hali, Vue 2'nin :visible.sync'ini acan codemod
      ciktisiydi (bkz. mark0002 commit c569066e5). Vue 3'te dogru yazim
      v-model:visible.

  [x] class="p-button-success" -> severity="success"
      PrimeVue 4'te p-button-<severity> siniflari KALDIRILDI; sinif olarak
      birakilsa dugme varsayilan (mavi) gorunurde kalirdi -- hata vermez,
      sessizce yanlis renk.

  [x] this.$excelApi + elle <a download> -> useExcelApi() +
      downloadFromExcelServer(). Ayrinti: app/composables/useExcelApi.ts
      Ayrica: Nuxt 2'de endLoading YALNIZCA response.status dogruysa
      cagriliyordu -- Excel sunucusu bos govde donunce sayac EKSIK KALIYOR
      ve spinner EBEDIYEN donuyordu. Pilotta endLoading() if'in DISINDA.

  [x] Iki adet 7 dalli if/else zinciri -> tek STOCK_KINDS tablosu
      (gerekcesi tablonun basinda).

  DUZELTILDI -- NUXT 2'DE BOZUK OLAN:
  [x] RadioButton inputId'leri: 7 radyodan DORDU ayni "ingredient3"
      id'sini paylasiyordu ("Ext. Crates in Mekmer", "Mekmer",
      "Mekmer (Only Stocks)", "Mek-Moz"). HTML id'si BELGEDE TEK olmak
      zorunda; <label for=...> ilk eslesen ogeye baglandigi icin bu dort
      etiketten hangisine tiklanirsa tiklansin hepsi ayni radyoyu
      ("Ext. Crates in Mekmer") seciyordu. Id'ler stockKind_* olarak
      ayristirildi; etiketler artik kendi radyolarini seciyor.
      Radyo DEGERLERI (value) degismedi, yani store davranisi ayni.

  KALDIRILDI -- OLU KOD:
  [x] Yorum icine alinmis <JsonExcel> ve <vue-excel-xlsx> bloklari
      (ikisi de Vue 2'ye bagli; pilota kurulmadilar).
  [x] data.reportsMekmerStockListExcelFields ve ...Fields2 -- yalnizca o
      yorumlu bloklarin alan listeleriydi, baska okuyucusu yok.
  [x] methods.formatDecimal -- yalnizca ...Fields2 icinden
      `dataFormat: this.formatDecimal` olarak referans aliniyordu. Ustelik
      data() icinde `this.formatDecimal` YAZMAK ZATEN CALISMIYORDU:
      data() calistigi anda methods henuz baglanmamistir, yani deger
      undefined oluyordu. Sablonun kullandigi formatDecimal bu degil,
      app/plugins/formatters.ts ile gelen global olandir.

  DIKKAT -- KASITLI OLARAK EKLENMEDI:
      Nuxt 2'de sablon ReportsMekmerStockList'e :loading="getLoading"
      geciriyordu, ama o bilesenin props'unda `loading` TANIMLI DEGIL --
      yani gosterge bu ekranda hic calismiyordu. Vue 3'te tanimsiz prop
      kok ogeye DOM attribute'u olarak dusecegi icin baglama kaldirildi:
      davranis ayni, DOM temiz.
-->
