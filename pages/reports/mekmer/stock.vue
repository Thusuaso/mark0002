<template>
  <div class="container">
    <div class="flex flex-wrap gap-3 mb-3 ml-3">
      <div class="flex align-items-center">
        <RadioButton v-model="ingredient" inputId="ingredient1" value="Stock" @change="statusSelect($event)" />
        <label for="ingredient1" class="ml-2">Only Stock</label>
      </div>
      <div class="flex align-items-center">
        <RadioButton v-model="ingredient" inputId="ingredient2" value="Outer" @change="statusSelect($event)" />
        <label for="ingredient2" class="ml-2">External</label>
      </div>
      <div class="flex align-items-center">
        <RadioButton v-model="ingredient" inputId="ingredient3" value="Mekmer" @change="statusSelect($event)" />
        <label for="ingredient3" class="ml-2">Ext. Crates in Mekmer</label>
      </div>
      <div class="flex align-items-center">
        <RadioButton v-model="ingredient" inputId="ingredient3" value="MekmerIn" @change="statusSelect($event)" />
        <label for="ingredient3" class="ml-2">Mekmer</label>
      </div>
      <div class="flex align-items-center">
        <RadioButton v-model="ingredient" inputId="ingredient3" value="MekmerOnlyStocks" @change="statusSelect($event)" />
        <label for="ingredient3" class="ml-2">Mekmer (Only Stocks)</label>
      </div>
      <div class="flex align-items-center">
        <RadioButton v-model="ingredient" inputId="ingredient3" value="Mek-Moz" @change="statusSelect($event)" />
        <label for="ingredient3" class="ml-2">Mek-Moz</label>
      </div>
      <div class="flex align-items-center">
        <RadioButton v-model="ingredient" inputId="ingredient4" value="All" @change="statusSelect($event)" />
        <label for="ingredient4" class="ml-2">All</label>
      </div>
      <div class="flex align-items-center">
        <!-- <JsonExcel
          class="w-100"
          :data="getReportsMekmerStockList"
          :fields="reportsMekmerStockListExcelFields"
          worksheet="Stock"
          name="Stock.xls"
        >
          <Button
            type="button"
            class="p-button-info w-100"
            icon="pi pi-file-excel"
            label="Excel"
          />
        </JsonExcel> -->
        <!-- <vue-excel-xlsx
          :data="getReportsMekmerStockList"
          :columns="reportsMekmerStockListExcelFields2"
          :file-name="'Stock'"
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
        <Button class="p-button-success" label="Excel" @click="excel_output" />
      </div>
    </div>

    <reportsMekmerStockList :list="getReportsMekmerStockList" :total="getReportsMekmerStockListTotal"
      @reports_mekmer_stock_list_selected_emit="reportsMekmerStockListSelected($event)" :loading="getLoading" />
    <Dialog :visible.sync="reports_mekmer_stock_dialog" header="" modal>
      <reportsMekmerStockForm :list="getReportsStockListDetail" :total="getReportsStockListDetailTotal"
         />
    </Dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters([
      "getReportsMekmerStockList",
      "getReportsMekmerStockListTotal",
      "getReportsStockListDetail",
      "getReportsStockListDetailTotal",
      "getLocalUrl",
      'getLoading'
    ]),
  },
  data() {
    return {
      reports_mekmer_stock_dialog: false,
      ingredient: "All",
      reportsMekmerStockListExcelFields: {
        Kategori: "KategoriAdi",
        Urün: "UrunAdi",
        Yüzey: "YuzeyIslemAdi",
        En: "En",
        Boy: "Boy",
        Kenar: "Kenar",
        "Kasa Sayısı": "KasaSayisi",
        "Toplam Miktar": "Toplam",
      },
      reportsMekmerStockListExcelFields2: [
        { label: "Kategori", field: "KategoriAdi" },
        { label: "Urün", field: "UrunAdi" },
        { label: "Yüzey", field: "YuzeyIslemAdi" },
        { label: "En", field: "En" },
        { label: "Boy", field: "Boy" },
        { label: "Kenar", field: "Kenar" },
        { label: "Kasa Sayısı", field: "KasaSayisi" },
        { label: "Toplam Miktar", field: "Toplam", dataFormat: this.formatDecimal },
      ],
    };
  },
  created() {
    this.$store.dispatch("setReportsMekmerStockList");
  },
  methods: {
    excel_output() {
      this.$store.dispatch("setBeginLoadingAction");

      this.$excelApi
        .post("/raporlar/listeler/stokRaporExcelListe", this.getReportsMekmerStockList)
        .then((response) => {
          if (response.status) {
            const link = document.createElement("a");
            link.href = this.getLocalUrl + "/raporlar/listeler/stokRaporExcelListe";
            link.setAttribute("download", "Stok_listesi.xlsx");
            document.body.appendChild(link);
            link.click();
            this.$store.dispatch("setEndLoadingAction");
          }
        });
    },
    formatDecimal(value) {
      const data = value.toString().replace(".", ",");
      return data;
    },
    reportsMekmerStockListSelected(event) {
      if (this.ingredient == "All") {
        this.$store.dispatch("setReportsAllStockListDetail", event.data);
      } else if (this.ingredient == "Stock") {
        this.$store.dispatch("setReportsStockStockListDetail", event.data);
      } else if (this.ingredient == "Outer") {
        this.$store.dispatch("setReportsOuterStockListDetail", event.data);
      } else if (this.ingredient == "Mekmer") {
        this.$store.dispatch("setReportsMekmerStockListDetail", event.data);
      } else if (this.ingredient == "MekmerIn") {
        this.$store.dispatch("setReportsMekmerInStockListDetail", event.data);
      } else if (this.ingredient == "Mek-Moz") {
        this.$store.dispatch("setReportsMekmozStockListDetail", event.data);
      } else if (this.ingredient == "MekmerOnlyStocks") {
        this.$store.dispatch("setReportsMekmozStockListOnlyStocksMekmerDetail", event.data);
      }
      this.reports_mekmer_stock_dialog = true;
    },
    statusSelect(event) {
      if (this.ingredient == "All") {
        this.$store.dispatch("setReportsMekmerStockList");
      } else if (this.ingredient == "Stock") {
        this.$store.dispatch("setReportsMekmerStockListStock");
      } else if (this.ingredient == "Outer") {
        this.$store.dispatch("setReportsMekmerStockListOuter");
      } else if (this.ingredient == "Mekmer") {
        this.$store.dispatch("setReportsMekmerStockListMekmer");
      } else if (this.ingredient == "MekmerIn") {
        this.$store.dispatch("setReportsMekmerStockListMekmerIn");
      } else if (this.ingredient == "Mek-Moz") {
        this.$store.dispatch("setReportsMekmerStockListMekmoz");
      } else if (this.ingredient == 'MekmerOnlyStocks'){
        this.$store.dispatch("setReportsMekmerStockListOnlyStocksMekmer");
      }
    },
  },
};
</script>
