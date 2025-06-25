<template>
  <div>
    <div class="container row">
      <div class="col">
        <Calendar
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
          class="p-button-secondary w-100"
          label="Clear"
          @click="selectedDates = null"
        />
      </div>

      <div class="col">
        <Button
          type="button"
          class="p-button-success w-100"
          label="Search"
          @click="searchDateList"
        />
      </div>
      <div class="col">
        <!-- <JsonExcel
          class="w-100"
          :data="getReportsMekmerProductionList"
          :fields="reportsMekmerProductionListExcelFields"
          worksheet="Production"
          name="Production.xls"
        >
          <Button
            type="button"
            class="p-button-info w-100"
            icon="pi pi-file-excel"
            label="Excel"
          />
        </JsonExcel> -->
        <!-- <vue-excel-xlsx
          :data="getReportsMekmerProductionList"
          :columns="reportsMekmerProductionListExcelFields2"
          :file-name="'Production'"
          :file-type="'xlsx'"
          :sheet-name="'sheetname'"
          style="border: none; background-color: white"
        >
          <Button
            type="button"
            class="p-button-info w-100"
            icon="pi pi-file-excel"
            label="Excel"
          />
        </vue-excel-xlsx> -->

        <Button
          type="button"
          class="p-button-primary"
          label="Excel"
          @click="excel_output"
        />
      </div>
    </div>
    <reportsMekmerProductionList
      :list="getReportsMekmerProductionList"
      :total="getReportsMekmerProductionListTotal"
      :dates="selectedDates"
      @mekmer_filtered_production_list_emit="
        mekmerFilteredProductionList($event)
      "
    />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import api from "~/plugins/excel.server.js";

export default {
  computed: {
    ...mapGetters([
      "getReportsMekmerProductionList",
      "getReportsMekmerProductionListTotal",
      "getLocalUrl",
      "getReportsMekmerProductionFilterList",
    ]),
  },
  data() {
    return {
      productionList: [],
      quarters: [
        { id: 1, quarter: "Q1" },
        { id: 2, quarter: "Q2" },
        { id: 3, quarter: "Q3" },
        { id: 4, quarter: "Q4" },
        { id: 5, quarter: "Q5" },
      ],
      selectedQuarter: { id: 1, quarter: "Q1" },
      selectedDates: null,
      reportsMekmerProductionListExcelFields: {
        Tarih: "Tarih",
        "Firma Adı": "FirmaAdi",
        "Kategori Adı": "KategoriAdi",
        "Kasa No": "KasaNo",
        Urun: "UrunAdi",
        "Ocak Adı": "OcakAdi",
        Yüzey: "YuzeyIslemAdi",
        En: "En",

        Boy: "Boy",
        "Miktar Sayısı": "Miktar",
        Adet: "Adet",
        "Birim Adı": "BirimAdi",
        Po: "SiparisAciklama",
        Aciklama: "Aciklama",
      },
      reportsMekmerProductionListExcelFields2: [
        { label: "Tarih", field: "Tarih" },
        { label: "Firma Adı", field: "FirmaAdi" },
        { label: "Kategori Adı", field: "KategoriAdi" },
        { label: "Kasa No", field: "KasaNo" },
        { label: "Urun", field: "UrunAdi" },
        { label: "Ocak Adı", field: "OcakAdi" },
        { label: "Yüzey", field: "YuzeyIslemAdi" },
        { label: "En", field: "En" },

        { label: "Boy", field: "Boy" },
        {
          label: "Miktar Sayısı",
          field: "Miktar",
          dataFormat: this.formatDecimal,
        },
        { label: "Adet", field: "Adet" },
        { label: "Birim Adı", field: "BirimAdi" },
        { label: "Po", field: "SiparisAciklama" },
        { label: "Aciklama", field: "Aciklama" },
      ],
      is_filtered: false,
      mekmer_filtered_list: [],
    };
  },
  created() {
    this.$store.dispatch("setBeginLoadingAction");
    this.$axios.get("/reports/mekmer/production/list").then((response) => {
      this.is_filtered = false;
      this.$store.dispatch(
        "setReportsMekmerProductionList",
        response.data.list
      );
      this.$store.dispatch(
        "setReportsMekmerProductionTotal",
        response.data.list
      );
      this.$store.dispatch("setEndLoadingAction");
    });
  },
  methods: {
    mekmerFilteredProductionList(event) {
      this.is_filtered = true;
      this.mekmer_filtered_list = event;
    },
    excel_output() {
      api
        .post(
          "/reports/excel/production",
          this.is_filtered
            ? this.mekmer_filtered_list
            : this.getReportsMekmerProductionList
        )
        .then((response) => {
          if (response.status) {
            const link = document.createElement("a");
            link.href = this.getLocalUrl + "reports/excel/production";

            link.setAttribute("download", "mekamer_production_excel.xlsx");
            document.body.appendChild(link);
            link.click();
          }
        });
    },
    formatDecimal(value) {
      const data = value.toString().replace(".", ",");
      return data;
    },
    searchDateList() {
      const _date1 = new Date(this.selectedDates[0]);
      const _date2 = new Date(this.selectedDates[1]);
      const _date_1_format =
        _date1.getFullYear() +
        "-" +
        (_date1.getMonth() + 1) +
        "-" +
        _date1.getDate();
      const _date_2_format =
        _date2.getFullYear() +
        "-" +
        (_date2.getMonth() + 1) +
        "-" +
        _date2.getDate();
      const payload = {
        date1: _date_1_format,
        date2: _date_2_format,
      };
      this.$store.dispatch("setBeginLoadingAction");
      this.$axios
        .post("/reports/mekmer/production/date", payload)
        .then((response) => {
          this.is_filtered = false;
          this.$store.dispatch(
            "setReportsMekmerProductionList",
            response.data.list
          );

          this.$store.dispatch(
            "setReportsMekmerProductionTotal",
            response.data.list
          );
          this.$store.dispatch("setEndLoadingAction");
        });
    },
  },
};
</script>
