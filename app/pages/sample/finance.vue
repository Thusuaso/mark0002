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
      selectedYear: { Yil: 2024 },
      sampleFinanceDetailForm: false,
    };
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
