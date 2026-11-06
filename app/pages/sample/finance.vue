<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <Select
          v-model="selectedYear"
          :options="sampleStore.getSampleYearList"
          optionLabel="Yil"
          class="w-full"
          @change="yearSelected($event)"
        />
      </div>
    </div>
    <SampleFinanceList
      :list="sampleStore.getSampleFinanceList"
      :years="sampleStore.getSampleYearList"
      :total="sampleStore.getSampleFinanceListTotal"
      :bank="sampleStore.getSampleFinanceBankList"
      @finance_list_selected_emit="financeListSelected($event)"
    />
    <Dialog v-model:visible="sampleFinanceDetailForm" header="" modal>
      <SampleFinanceForm :list="sampleStore.getSampleFinanceDetailList"/>
    </Dialog>
  </div>
</template>
<script>
import { useSampleStore } from "~/stores/sample"
export default {
  middleware: ["authority"],
  computed: {
    sampleStore() {
      return useSampleStore()
    },
  },
  data() {
    return {
      /*
       * =================================================================
       * [!] ESKIDEN `{ Yil: 2024 }` DIYE GOMULUYDU
       * =================================================================
       * Secici 2024 gosteriyordu ama tablodaki veriler 2026'ydi.
       *
       * Neden: parametresiz `/sample/finance/list` ucu once yil
       * listesini cekip EN YENISINI seciyor ve onun verisini donuyor
       * (api/index.js:7855 -> `yearList.recordset[0].Yil`, sorgu
       * `order by YEAR(...) desc`). Yani sunucu 2026'yi secerken
       * sayfa secicisi sabit 2024'te duruyordu.
       *
       * SADECE GORSEL DEGILDI: financeListSelected() detay sorgusunu
       * `this.selectedYear.Yil` ile atiyor. Kullanici 2026
       * rakamlarini gosteren bir satira tikliyor, acilan detay ise
       * 2024'e ait oluyordu.
       *
       * Artik null basliyor ve asagidaki izleyici, yil listesi
       * gelince sunucunun sectigi yilin AYNISINI (listenin ilk
       * ogesi) seciyor.
       */
      selectedYear: null,
      sampleFinanceDetailForm: false,
    };
  },

  watch: {
    /*
     * Yil listesi urun listesiyle AYNI yanittan geliyor
     * (stores/sample.ts: `this.sampleYearList = payload.years`),
     * ayri bir istek yok.
     *
     * `immediate: true`: veri izleyici kurulmadan once gelmis olsa
     * bile (sayfaya geri donuldugunde store zaten dolu) ilk deger
     * yine atanir.
     */
    "sampleStore.getSampleYearList": {
      immediate: true,
      handler() {
        const liste = this.sampleStore.getSampleYearList;
        this.selectedYear = liste?.[0] ?? null;
      },
    },
  },
  /*
   * created() -> mounted(): created() SSR'da da calisir, icindeki async
   * is BEKLENMEZ ve liste BOS serialize edilir; hydration onu devralir,
   * created() bir daha calismadigi icin tablo bos kalir (bkz. commit
   * 2afc877e3). mounted() sunucuda hic calismaz.
   */
  mounted() {
    this.sampleStore.setSampleFinanceList();
  },
  methods: {
    yearSelected(event) {
      this.sampleStore.setSampleFinanceListYear(event.value.Yil);
    },
    financeListSelected(event) {
      /*
       * Yil secilmemisse detay sorgusu `undefined` ile giderdi.
       * Normalde izleyici dolduruyor; yil listesi BOS donerse diye
       * koruma.
       */
      if (!this.selectedYear?.Yil) {
        useAppToast().warn("Year list is not loaded yet.");
        return;
      }

      const data = {
        year: this.selectedYear.Yil,
        customer: event.MusteriID,
      };
      this.sampleStore.setSampleFinanceDetailList(data);
      this.sampleFinanceDetailForm = true;
    },
  },
};
</script>
<script setup>
/*
 * definePageMeta yalnizca <script setup> icinde cagrilabilir -> Options
 * API sayfalarinda ikinci bir script blogu gerekiyor.
 *
 * ZORUNLU: Options API'deki `middleware: [...]` anahtari Nuxt 3+'ta YOK
 * SAYILIR -- hata vermez, yetki kisitlamasi SESSIZCE kalkar
 * (bkz. commit 5fc77edb1).
 */
definePageMeta({ middleware: ["authority"] })
</script>
