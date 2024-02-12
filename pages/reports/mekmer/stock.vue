<template>
  <div class="container">
    <div class="flex flex-wrap gap-3 mb-3 ml-3">
      <div class="flex align-items-center">
        <RadioButton
          v-model="ingredient"
          inputId="ingredient1"
          value="Stock"
          @change="statusSelect($event)"
        />
        <label for="ingredient1" class="ml-2">Sadece Stok</label>
      </div>
      <div class="flex align-items-center">
        <RadioButton
          v-model="ingredient"
          inputId="ingredient2"
          value="Outer"
          @change="statusSelect($event)"
        />
        <label for="ingredient2" class="ml-2">Dış</label>
      </div>
      <div class="flex align-items-center">
        <RadioButton
          v-model="ingredient"
          inputId="ingredient3"
          value="Mekmer"
          @change="statusSelect($event)"
        />
        <label for="ingredient3" class="ml-2">Mekmer Dış</label>
      </div>
      <div class="flex align-items-center">
        <RadioButton
          v-model="ingredient"
          inputId="ingredient4"
          value="All"
          @change="statusSelect($event)"
        />
        <label for="ingredient4" class="ml-2">Hepsi</label>
      </div>
      <div class="flex align-items-center">
        <JsonExcel
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
        </JsonExcel>
      </div>
    </div>

    <reportsMekmerStockList
      :list="getReportsMekmerStockList"
      :total="getReportsMekmerStockListTotal"
      @reports_mekmer_stock_list_selected_emit="reportsMekmerStockListSelected($event)"
      :loading="getLoading"
    />
    <Dialog :visible.sync="reports_mekmer_stock_dialog" header="" modal>
      <reportsMekmerStockForm
        :list="getReportsStockListDetail"
        :total="getReportsStockListDetailTotal"
        :loading="getLoading"
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
      "getLoading",
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
    };
  },
  created() {
    this.$store.dispatch("setReportsMekmerStockList");
  },
  methods: {
    reportsMekmerStockListSelected(event) {
      if (this.ingredient == "All") {
        this.$store.dispatch("setReportsAllStockListDetail", event.data);
      } else if (this.ingredient == "Stock") {
        this.$store.dispatch("setReportsStockStockListDetail", event.data);
      } else if (this.ingredient == "Outer") {
        this.$store.dispatch("setReportsOuterStockListDetail", event.data);
      } else if (this.ingredient == "Mekmer") {
        this.$store.dispatch("setReportsMekmerStockListDetail", event.data);
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
      }
    },
  },
};
</script>
