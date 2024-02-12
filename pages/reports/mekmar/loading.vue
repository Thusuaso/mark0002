<template>
  <div class="container">
    <div class="row m-auto mt-3">
      <div class="col">
        <Dropdown
          v-model="selectedYear"
          :options="getLoadingYears"
          optionLabel="Yil"
          class="w-100"
          @change="yearSelected($event)"
        />
      </div>
      <div class="col">
        <Dropdown
          v-model="selectedMonth"
          :options="getLoadingMonths"
          optionLabel="Ay"
          @change="monthChange($event)"
          class="w-100"
        />
      </div>
      <div class="col">
        <JsonExcel
          :data="getReportsMekmarLoadingList"
          :fields="loadingListExcelFields"
          worksheet="Yükleme"
          name="yukleme.xls"
        >
          <Button
            type="button"
            class="p-button-info w-100"
            icon="pi pi-file-excel"
            label="Excel"
          />
        </JsonExcel>
      </div>
    </div>
    <reportsMekmarLoadingList
      :list="getReportsMekmarLoadingList"
      :total="getReportsMekmarLoadingListTotal"
      :listYear="getReportsMekmarLoadingListYear"
      :listYearTotal="getReportsMekmarLoadingListYearTotal"
      :loading="getLoading"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters([
      "getLoadingYears",
      "getLoadingMonths",
      "getReportsMekmarLoadingList",
      "getReportsMekmarLoadingListTotal",
      "getReportsMekmarLoadingListYear",
      "getReportsMekmarLoadingListYearTotal",
      "getLoading",
    ]),
  },
  data() {
    return {
      selectedYear: null,
      selectedMonth: null,
      loadingListExcelFields: {
        "Siparis Tarihi": "SiparisTarihi",
        "Yukleme Tarihi": "YuklemeTarihi",
        "Musteri Adi": "MusteriAdi",
        "Siparis No": "SiparisNo",
        FOB: "FOB",
        DDP: "DDP",
      },
    };
  },
  created() {
    this.$store.dispatch("setLoadingYearsMonths");
    this.$store.dispatch("setReportsMekmarLoadingList");
    this.selectedYear = this.getLoadingYears[0];
    this.selectedMonth = this.getLoadingMonths[0];
  },
  methods: {
    yearSelected(event) {
      const year = this.selectedYear.Yil;
      this.$store.dispatch("setReportsMekmarLoadingYearMonthList", year);
    },
    monthChange(event) {
      const data = {
        Yil: this.selectedYear.Yil,
        Ay: this.selectedMonth.Ay,
      };
      this.$store.dispatch("setReportsMekmarLoadingListYear", data);
    },
  },
  watch: {
    getLoadingYears() {
      this.selectedYear = this.getLoadingYears[0];
    },
    getLoadingMonths() {
      this.selectedMonth = this.getLoadingMonths[0];
    },
  },
};
</script>
