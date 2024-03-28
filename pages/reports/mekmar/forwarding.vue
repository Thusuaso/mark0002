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
          :data="getreportsMekmarForwardingList"
          :fields="reportsMekmerForwardingListExcelFields"
          worksheet="Forwarding"
          name="Forwarding.xls"
        >
          <Button
            type="button"
            class="p-button-info w-100"
            icon="pi pi-file-excel"
            label="Excel"
          />
        </JsonExcel> -->
        <vue-excel-xlsx
          :data="getreportsMekmarForwardingList"
          :columns="reportsMekmerForwardingListExcelFields2"
          :file-name="'Forwarding'"
          :file-type="'xlsx'"
          :sheet-name="'sheetname'"
          style="border: none; background-color: white; width: 100%"
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
    <reportsMekmarForwardingList
      :list="getreportsMekmarForwardingList"
      :total="getReportsMekmarForwardingListTotal"
      :loading="getLoading"
    />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  middleware: ["authority"],
  computed: {
    ...mapGetters([
      "getreportsMekmarForwardingList",
      "getReportsMekmarForwardingListTotal",
      "getLoading",
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
      reportsMekmerForwardingListExcelFields: {
        Tarih: "Tarih",
        "Firma Adi": "FirmaAdi",
        Tedarikci: "TedarikciAdi",
        UrunKartId: "UrunKartId",
        "Kasa No": "KasaNo",
        Ocak: "OcakAdi",
        Kategori: "KategoriAdi",
        Ürün: "UrunAdi",
        Yuzey: "YuzeyIslemAdi",
        En: "En",
        Boy: "Boy",
        Kenar: "Kenar",
        "Kutu Adet": "KutuAdet",
        Adet: "Adet",
        Miktar: "Miktar",
        Birim: "BirimAdi",
        Po: "SiparisAciklama",
        "Birim Fiyat": "BirimFiyat",
        Toplam: "Toplam",
      },
      reportsMekmerForwardingListExcelFields2: [
        { label: "Tarih", field: "Tarih" },
        { label: "Firma Adi", field: "FirmaAdi" },
        { label: "Tedarikci", field: "TedarikciAdi" },
        { label: "UrunKartId", field: "UrunKartId" },
        { label: "Kasa No", field: "KasaNo" },
        { label: "Ocak", field: "OcakAdi" },
        { label: "Kategori", field: "KategoriAdi" },
        { label: "Ürün", field: "UrunAdi" },
        { label: "Yuzey", field: "YuzeyIslemAdi" },
        { label: "En", field: "En" },
        { label: "Boy", field: "Boy" },
        { label: "Kenar", field: "Kenar" },
        { label: "Kutu Adet", field: "KutuAdet" },
        { label: "Adet", field: "Adet" },
        { label: "Miktar", field: "Miktar", dataFormat: this.formatDecimal },
        { label: "Birim", field: "BirimAdi" },
        { label: "Po", field: "SiparisAciklama" },
        { label: "Birim Fiyat", field: "BirimFiyat", dataFormat: this.formatDecimal },
        { label: "Toplam", field: "Toplam", dataFormat: this.formatDecimal },
      ],
    };
  },
  created() {
    this.$store.dispatch("setReportsMekmarForwardingList");
  },
  methods: {
    yearChange(event) {},
    formatDecimal(value) {
      if (value == null || value == undefined || value == "" || value == " ") {
        return 0;
      } else {
        let val = (value / 1).toFixed(2).replace(".", ",");
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      }
    },
    searchDateList() {
      const date1 = this.selectedDates[0];
      const date2 = this.selectedDates[1];
      const payload = {
        date1: date1,
        date2: date2,
      };
      this.$store.dispatch("setReportsMekmarForwardingDate", payload);
    },
  },
};
</script>
