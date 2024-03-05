<template>
  <div>
    <div class="row container">
      <div class="col">
        <Dropdown
          v-model="selectedYear"
          :options="getReportsMekmarAyoYearList"
          optionLabel="Yil"
          class="w-100"
          @change="yearSelected($event)"
        />
      </div>
      <div class="col">
        <Dropdown
          v-model="selectedMonth"
          :options="getReportsMekmarAyoMonthList"
          optionLabel="Ay"
          class="w-100"
          @change="monthSelected($event)"
        />
      </div>
      <div class="col">
        <!-- <JsonExcel
          :data="getReportsMekmarAyoList"
          :fields="reportsMekmarAyoListExcelField"
          worksheet="Ayo"
          name="ayo.xls"
          :stringifyLongNum="true"
          escapeCsv
          type="csv"
        >
          <Button
            type="button"
            class="p-button-info w-100"
            icon="pi pi-file-excel"
            label="Excel"
          />
        </JsonExcel> -->

        <vue-excel-xlsx
          :data="getReportsMekmarAyoList"
          :columns="reportsMekmarAyoListExcelField2"
          :file-name="'Ayo'"
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
      <div class="col">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Profit ($)</th>
              <th scope="col">Profit (₺)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Total</th>
              <td>{{ getReportsMekmarAyoListTotal.profitUsd | formatPriceUsd }}</td>
              <td>{{ getReportsMekmarAyoListTotal.profitTl | formatPriceTl }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <reportsMekmarAyoList
      :list="getReportsMekmarAyoList"
      :total="getReportsMekmarAyoListTotal"
      :loading="getLoading"
    />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters([
      "getReportsMekmarAyoList",
      "getReportsMekmarAyoYearList",
      "getReportsMekmarAyoMonthList",
      "getReportsMekmarAyoListTotal",
      "getLoading",
    ]),
  },
  data() {
    return {
      selectedYear: null,
      selectedMonth: null,
      reportsMekmarAyoListExcelField: {
        Temsilci: "SiparisSahibi",
        Operasyon: "Operasyon",
        "Firma Adi": "FirmaAdi",
        "Siparis No": "SiparisNo",
        "Fatura Adi": "FaturaAdi",
        "Siparis Tarihi": "SiparisTarihi",
        "Yukleme Tarihi": "YuklemeTarihi",
        "Ulke Adi": "UlkeAdi",
        "Teslim Tur": "TeslimTur",
        Proforma: "Proforma",
        "Mekmer Satis": "MekmerSatis",
        "Mekmoz Satis": "MekmozSatis",
        "Dis Satis": "DisSatis",
        Nakliye: "Nakliye",
        Gumruk: "Gumruk",
        Ilaclama: "Ilaclama",
        Liman: "Liman",
        "Sigorta Alış": "SigortaAlis",
        "Sigorta Satış": "SigortaSatis",
        "Navlun Alış": "NavlunAlis",
        Lashing: "Lashing",
        Booking: "Booking",
        Spanzlet: "Spanzlet",
        "Detay Alış 1": "DetayAlis1",
        "Detay Alış 2": "DetayAlis2",
        "Detay Alış 3": "DetayAlis3",
        Mekus: "Mekus",
        "Özel İşçilik": "OzelIscilik",
        "Banka Masraf": "BankaMasraf",
        Kurye: "Kurye",
        "Masraf Toplam": "MasrafToplam",
        "Profit Usd": "ProfitUsd",
        "Profit Tl": "ProfitTl",
      },
      reportsMekmarAyoListExcelField2: [
        { label: "Temsilci", field: "SiparisSahibi" },
        { label: "Operasyon", field: "Operasyon" },
        { label: "Firma Adi", field: "FirmaAdi" },
        { label: "Siparis No", field: "SiparisNo" },
        { label: "Fatura Adi", field: "FaturaAdi" },
        { label: "Siparis Tarihi", field: "SiparisTarihi" },
        { label: "Yukleme Tarihi", field: "YuklemeTarihi" },
        { label: "Ulke Adi", field: "UlkeAdi" },
        { label: "Teslim Tur", field: "TeslimTur" },
        { label: "Proforma", field: "Proforma", dataFormat: this.formatDecimal },
        { label: "Mekmer Satis", field: "MekmerSatis", dataFormat: this.formatDecimal },
        { label: "Mekmoz Satis", field: "MekmozSatis", dataFormat: this.formatDecimal },
        { label: "Dis Satis", field: "DisSatis", dataFormat: this.formatDecimal },
        { label: "Nakliye", field: "Nakliye", dataFormat: this.formatDecimal },
        { label: "Gumruk", field: "Gumruk", dataFormat: this.formatDecimal },
        { label: "Ilaclama", field: "Ilaclama", dataFormat: this.formatDecimal },
        { label: "Liman", field: "Liman", dataFormat: this.formatDecimal },
        { label: "Sigorta Alış", field: "SigortaAlis", dataFormat: this.formatDecimal },
        { label: "Sigorta Satış", field: "SigortaSatis", dataFormat: this.formatDecimal },
        { label: "Navlun Alış", field: "NavlunAlis", dataFormat: this.formatDecimal },
        { label: "Lashing", field: "Lashing", dataFormat: this.formatDecimal },
        { label: "Booking", field: "Booking", dataFormat: this.formatDecimal },
        { label: "Spanzlet", field: "Spanzlet", dataFormat: this.formatDecimal },
        { label: "Detay Alış 1", field: "DetayAlis1", dataFormat: this.formatDecimal },
        { label: "Detay Alış 2", field: "DetayAlis2", dataFormat: this.formatDecimal },
        { label: "Detay Alış 3", field: "DetayAlis3", dataFormat: this.formatDecimal },
        { label: "Mekus", field: "Mekus", dataFormat: this.formatDecimal },
        { label: "Özel İşçilik", field: "OzelIscilik", dataFormat: this.formatDecimal },
        { label: "Banka Masraf", field: "BankaMasraf", dataFormat: this.formatDecimal },
        { label: "Kurye", field: "Kurye", dataFormat: this.formatDecimal },
        { label: "Masraf Toplam", field: "MasrafToplam", dataFormat: this.formatDecimal },
        { label: "Profit Usd", field: "ProfitUsd", dataFormat: this.formatDecimal },
        { label: "Profit Tl", field: "ProfitTl", dataFormat: this.formatDecimal },
      ],

      json_meta: [
        {
          key: "charset",
          value: "utf-8",
        },
      ],
    };
  },
  created() {
    this.$store.dispatch("setReportsMekmarAyoYearList");
    this.$store.dispatch("setReportsMekmarAyoMonthList", new Date().getFullYear());
    const date = {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
    };

    this.$store.dispatch("setReportsMekmarAyoList", date);
  },
  methods: {
    formatDecimal(value) {
      if (value == null || value == undefined || value == "" || value == " ") {
        return 0;
      } else {
        const data = value.toString().replace(".", ",");
        return data;
      }
    },
    yearSelected(event) {
      this.$store.dispatch("setReportsMekmarAyoListYear", event.value.Yil);
    },
    monthSelected(event) {
      let date = {
        year: this.selectedYear.Yil,
        month: event.value.Ay,
      };
      this.$store.dispatch("setReportsMekmarAyoListMonth", date);
    },
  },
  watch: {
    getReportsMekmarAyoYearList() {
      this.selectedYear = this.getReportsMekmarAyoYearList[0];
    },
    getReportsMekmarAyoMonthList() {
      this.selectedMonth = this.getReportsMekmarAyoMonthList[0];
    },
  },
};
</script>
