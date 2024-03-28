<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <Dropdown
          v-model="selectedYear"
          :options="getSampleYearList"
          optionLabel="Yil"
          class="w-full"
          @change="yearSelected($event)"
        />
      </div>
    </div>
    <sampleFinanceList
      :list="getSampleFinanceList"
      :years="getSampleYearList"
      :total="getSampleFinanceListTotal"
      :bank="getSampleFinanceBankList"
      @finance_list_selected_emit="financeListSelected($event)"
      :loading="getLoading"
    />
    <Dialog :visible.sync="sampleFinanceDetailForm" header="" modal>
      <sampleFinanceForm :list="getSampleFinanceDetailList" :loading="getLoading" />
    </Dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  middleware: ["authority"],
  computed: {
    ...mapGetters([
      "getSampleFinanceList",
      "getSampleYearList",
      "getSampleFinanceListTotal",
      "getSampleFinanceBankList",
      "getSampleFinanceDetailList",
      "getLoading",
    ]),
  },
  data() {
    return {
      selectedYear: { Yil: 2024 },
      sampleFinanceDetailForm: false,
    };
  },
  created() {
    this.$store.dispatch("setSampleFinanceList");
  },
  methods: {
    yearSelected(event) {
      this.$store.dispatch("setSampleFinanceListYear", event.value.Yil);
    },
    financeListSelected(event) {
      const data = {
        year: this.selectedYear.Yil,
        customer: event.MusteriID,
      };
      this.$store.dispatch("setSampleFinanceDetailList", data);
      this.sampleFinanceDetailForm = true;
    },
  },
};
</script>
