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
        <vue-excel-xlsx
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
        </vue-excel-xlsx>
      </div>

    </div>
    <reportsMekmerProductionList
      :list="getReportsMekmerProductionList"
      :total="getReportsMekmerProductionListTotal"
    />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters([
      "getReportsMekmerProductionList",
      "getReportsMekmerProductionListTotal",
    ]),
  },
  data() {
    return {
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
        { label: "Miktar Sayısı", field: "Miktar", dataFormat: this.formatDecimal },
        { label: "Adet", field: "Adet" },
        { label: "Birim Adı", field: "BirimAdi" },
        { label: "Po", field: "SiparisAciklama" },
        { label: "Aciklama", field: "Aciklama" },
      ],
    };
  },
  created() {
    this.$store.dispatch("setReportsMekmerProductionList");
  },
  methods: {
    
    formatDecimal(value) {
      const data = value.toString().replace(".", ",");
      return data;
    },
    searchDateList() {
      const date1 = this.selectedDates[0];
      const date2 = this.selectedDates[1];
      const payload = {
        date1: date1,
        date2: date2,
      };
      this.$store.dispatch("setReportsMekmerProductionDate", payload);
    },
  },
};
</script>
