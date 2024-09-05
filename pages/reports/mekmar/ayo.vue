<template>
  <div>
    <div class="row container">
      <div class="col">
        <Dropdown v-model="selectedYear" :options="getReportsMekmarAyoYearList" optionLabel="Yil" class="w-100"
          @change="yearSelected($event)" :disabled="date_disabled" />
      </div>
      <div class="col">
        <Dropdown v-model="selectedMonth" :options="getReportsMekmarAyoMonthList" optionLabel="Ay" class="w-100"
          @change="monthSelected($event)" :disabled="date_disabled" />
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

        <!-- <vue-excel-xlsx
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
        </vue-excel-xlsx> -->
        <Button type="button" class="p-button-info w-100" icon="pi pi-file-excel" label="Excel" @click="excel_output" />
      </div>
      <div class="col">
        <span>
          <Checkbox v-model="checked" :binary="true" @change="allAyoList($event)" />
        </span>
        <span style="padding-top: 25px"> Hepsi </span>
      </div>
      <div class="col">
        <Dropdown v-model="selectedQuarter" :options="quarters" optionLabel="quarter" placeholder="Select a Quarter" @change="quarterSelected($event)"/>

      </div>
      <div class="col">
        <Dropdown v-model="selectedHalfMonths" :options="halfmonths" optionLabel="month" placeholder="Select a Months" @change="halfMonthsSelected($event)"/>

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

    <reportsMekmarAyoList :list="getReportsMekmarAyoList" :total="getReportsMekmarAyoListTotal" />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import api from "../../../plugins/excel.server";
export default {
  middleware: ["authority"],
  computed: {
    ...mapGetters([
      "getReportsMekmarAyoList",
      "getReportsMekmarAyoYearList",
      "getReportsMekmarAyoMonthList",
      "getReportsMekmarAyoListTotal",
      "getLocalUrl",
    ]),
  },
  data() {
    return {
      selectedHalfMonths:null,
      halfmonths:[
        {'month':'This Month','id':2},
        {'month':'First 6 Months','id':0},
        {'month':'Last 6 Months','id':1},

      ],
      quarters: [
        { 'quarter': 'This Month', id: 0 },

        { 'quarter': 'Q1', id: 1 },
        { 'quarter': 'Q2', id: 2 },
        { 'quarter': 'Q3', id: 3 },
        { 'quarter': 'Q4', id: 4 },

        
      ],
      selectedQuarter:null,
      checked: false,
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
        { label: "Temsilci", field: "siparisci" },
        { label: "Operasyon", field: "operasyon" },
        { label: "Firma Adi", field: "musteri_adi" },
        { label: "Siparis No", field: "siparis_no" },
        { label: "Fatura Adi", field: "faturatur" },
        { label: "Siparis Tarihi", field: "siparis_tarihi" },
        { label: "Yukleme Tarihi", field: "yukleme_tarihi" },
        { label: "Ulke Adi", field: "ulke_adi" },
        { label: "Teslim Tur", field: "teslim_sekli" },
        { label: "Proforma", field: "toplam_bedel", dataFormat: this.formatDecimal },
        { label: "Mekmer Satis", field: "mekmar_alim", dataFormat: this.formatDecimal },
        { label: "Mekmoz Satis", field: "mekmoz_alim", dataFormat: this.formatDecimal },
        { label: "Dis Satis", field: "dis_alim", dataFormat: this.formatDecimal },
        { label: "Nakliye", field: "nakliye", dataFormat: this.formatDecimal },
        { label: "Gumruk", field: "gumruk", dataFormat: this.formatDecimal },
        { label: "Ilaclama", field: "ilaclama", dataFormat: this.formatDecimal },
        { label: "Liman", field: "liman", dataFormat: this.formatDecimal },
        { label: "Sigorta Alış", field: "sigorta", dataFormat: this.formatDecimal },
        {
          label: "Sigorta Satış",
          field: "sigorta_tutar_satis",
          dataFormat: this.formatDecimal,
        },
        { label: "Navlun Alış", field: "navlun", dataFormat: this.formatDecimal },
        { label: "Lashing", field: "lashing", dataFormat: this.formatDecimal },
        { label: "Booking", field: "booking", dataFormat: this.formatDecimal },
        { label: "Spanzlet", field: "spazlet", dataFormat: this.formatDecimal },
        { label: "Detay Alış 1", field: "detay_1", dataFormat: this.formatDecimal },
        { label: "Detay Alış 2", field: "detay_2", dataFormat: this.formatDecimal },
        { label: "Detay Alış 3", field: "detay_3", dataFormat: this.formatDecimal },
        { label: "Mekus", field: "mekus_masraf", dataFormat: this.formatDecimal },
        { label: "Özel İşçilik", field: "ozel_iscilik", dataFormat: this.formatDecimal },
        { label: "Banka Masraf", field: "banka_masrafi", dataFormat: this.formatDecimal },
        { label: "Kurye", field: "kurye_masrafi", dataFormat: this.formatDecimal },
        {
          label: "Masraf Toplam",
          field: "masraf_toplam",
          dataFormat: this.formatDecimal,
        },
        { label: "Profit Usd", field: "kar_zarar", dataFormat: this.formatDecimal },
        { label: "Profit Tl", field: "kar_zarar_tl", dataFormat: this.formatDecimal },
      ],

      json_meta: [
        {
          key: "charset",
          value: "utf-8",
        },
      ],
      date_disabled: false,
    };
  },
  created() {
    this.$store.dispatch("setReportsMekmarAyoYearList");
    this.$store.dispatch("setReportsMekmarAyoMonthList", new Date().getFullYear());
    const date = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
    };
    this.$store.dispatch("setBeginLoadingAction");

    api
      .get(`/maliyet/listeler/maliyetListesi/${date.year}/${date.month}`)
      .then((response) => {
        this.$store.commit("setReportsMekmarAyoList", response.data);
        this.$store.commit("setReportsMekmarAyoListTotal", response.data);
        this.$store.dispatch("setEndLoadingAction");
      });
  },
  methods: {
    halfMonthsSelected(event){
      if(event.value.id == 0){
        this.$store.dispatch("setBeginLoadingAction");
        api
          .get(`/maliyet/listeler/maliyetListesi/${this.selectedYear.Yil}`)
          .then((response) => {
            if (response) {
              const data = response.data.filter(x => {
                return (x.yukleme_month >= 1 && x.yukleme_month <= 6)
              })
              this.$store.commit("setReportsMekmarAyoList", data);
              this.$store.commit("setReportsMekmarAyoListTotal", data);
              this.$store.dispatch("setEndLoadingAction");
            }

          });
      }else if (event.value.id == 1){
        this.$store.dispatch("setBeginLoadingAction");
        api
          .get(`/maliyet/listeler/maliyetListesi/${this.selectedYear.Yil}`)
          .then((response) => {
            if (response) {
              const data = response.data.filter(x => {
                return (x.yukleme_month >= 7 && x.yukleme_month <= 12)
              })
              this.$store.commit("setReportsMekmarAyoList", data);
              this.$store.commit("setReportsMekmarAyoListTotal", data);
              this.$store.dispatch("setEndLoadingAction");
            }

          });
      } else if (event.value.id == 2){
        this.$store.dispatch("setBeginLoadingAction");
        api
          .get(
            `/maliyet/listeler/maliyetListesi/${this.selectedYear.Yil}/${this.getReportsMekmarAyoMonthList[0].Ay}`
          )
          .then((response) => {
            this.$store.commit("setReportsMekmarAyoList", response.data);
            this.$store.commit("setReportsMekmarAyoListTotal", response.data);
            this.$store.dispatch("setEndLoadingAction");
            this.selectedMonth = this.getReportsMekmarAyoMonthList[0];
          });
      }
    },
    quarterSelected(event){

      if (event.value.id == 0) {
        this.$store.dispatch("setBeginLoadingAction");
        api
          .get(
            `/maliyet/listeler/maliyetListesi/${this.selectedYear.Yil}/${this.getReportsMekmarAyoMonthList[0].Ay}`
          )
          .then((response) => {
            this.$store.commit("setReportsMekmarAyoList", response.data);
            this.$store.commit("setReportsMekmarAyoListTotal", response.data);
            this.$store.dispatch("setEndLoadingAction");
            this.selectedMonth = this.getReportsMekmarAyoMonthList[0];
          });
      } else if (event.value.id == 1) {
        this.$store.dispatch("setBeginLoadingAction");
        api
          .get(`/maliyet/listeler/maliyetListesi/${this.selectedYear.Yil}`)
          .then((response) => {
            if (response) {
              const data = response.data.filter(x => {
                return (x.yukleme_month >= 1 && x.yukleme_month <= 3)
              })
              this.$store.commit("setReportsMekmarAyoList", data);
              this.$store.commit("setReportsMekmarAyoListTotal", data);
              this.$store.dispatch("setEndLoadingAction");
            }

          });
      }
      else if (event.value.id == 2) {
        this.$store.dispatch("setBeginLoadingAction");
        api
          .get(`/maliyet/listeler/maliyetListesi/${this.selectedYear.Yil}`)
          .then((response) => {
            if (response) {
              const data = response.data.filter(x => {
                return (x.yukleme_month >= 4 && x.yukleme_month <= 6)
              })
              this.$store.commit("setReportsMekmarAyoList", data);
              this.$store.commit("setReportsMekmarAyoListTotal", data);
              this.$store.dispatch("setEndLoadingAction");
            }
          });
      }
      else if (event.value.id == 3) {
        this.$store.dispatch("setBeginLoadingAction");
        api
          .get(`/maliyet/listeler/maliyetListesi/${this.selectedYear.Yil}`)
          .then((response) => {
            if (response) {
              const data = response.data.filter(x => {
                return (x.yukleme_month >= 7 && x.yukleme_month <= 9)
              })
              this.$store.commit("setReportsMekmarAyoList", data);
              this.$store.commit("setReportsMekmarAyoListTotal", data);
              this.$store.dispatch("setEndLoadingAction");
            }
          });
      }
      else if (event.value.id == 4) {
        this.$store.dispatch("setBeginLoadingAction");
        api
          .get(`/maliyet/listeler/maliyetListesi/${this.selectedYear.Yil}`)
          .then((response) => {
            if (response) {
              const data = response.data.filter(x => {
                return (x.yukleme_month >= 10 && x.yukleme_month <= 12)
              })
              this.$store.commit("setReportsMekmarAyoList", data);
              this.$store.commit("setReportsMekmarAyoListTotal", data);
              this.$store.dispatch("setEndLoadingAction");
            }
          });
      }
    },
    excel_output() {
      api
        .post("/maliyet/dosyalar/maliyetRaporExcelListe", this.getReportsMekmarAyoList)
        .then((response) => {
          if (response.status) {
            const link = document.createElement("a");
            link.href = this.getLocalUrl + "maliyet/dosyalar/maliyetRaporExcelListe";

            link.setAttribute("download", "ayo_maliyet_listesi.xlsx");
            document.body.appendChild(link);
            link.click();
          }
        });
    },
    allAyoList(event) {
      if (this.checked) {
        this.date_disabled = true;
        this.$store.dispatch("setBeginLoadingAction");
        api
          .get(`/maliyet/listeler/maliyetListesi/${this.selectedYear.Yil}`)
          .then((response) => {
            this.$store.commit("setReportsMekmarAyoList", response.data);
            this.$store.commit("setReportsMekmarAyoListTotal", response.data);
            this.$store.dispatch("setEndLoadingAction");
            this.selectedQuarter = { 'quarter': 'All', id: 0 };
          });
      } else {
        this.$store.dispatch("setReportsMekmarAyoMonthList", this.selectedYear.Yil);
        this.date_disabled = false;
        this.$store.dispatch("setBeginLoadingAction");
        api
          .get(
            `/maliyet/listeler/maliyetListesi/${this.selectedYear.Yil}/${this.getReportsMekmarAyoMonthList[0].Ay}`
          )
          .then((response) => {
            this.$store.commit("setReportsMekmarAyoList", response.data);
            this.$store.commit("setReportsMekmarAyoListTotal", response.data);
            this.$store.dispatch("setEndLoadingAction");
            this.selectedMonth = this.getReportsMekmarAyoMonthList[0];
            this.selectedQuarter = { 'quarter': 'All', id: 0 };

          });
      }
    },
    formatDecimal(value) {
      if (value == null || value == undefined || value == "" || value == " ") {
        return 0;
      } else {
        const data = value.toString().replace(".", ",");
        return data;
      }
    },
    yearSelected(event) {
      this.$store.dispatch("setBeginLoadingAction");
      api
        .get(`/maliyet/listeler/maliyetListesi/${event.value.Yil}/${12}`)
        .then((response) => {
          this.$store.dispatch("setReportsMekmarAyoMonthList", event.value.Yil);
          this.$store.commit("setReportsMekmarAyoList", response.data);
          this.$store.commit("setReportsMekmarAyoListTotal", response.data);
          this.$store.dispatch("setEndLoadingAction");
          this.selectedMonth = this.getReportsMekmarAyoMonthList[0];
          this.selectedQuarter = { 'quarter': 'All', id: 0 };

        });
    },
    monthSelected(event) {
      let date = {
        year: this.selectedYear.Yil,
        month: event.value.Ay,
      };
      this.$store.dispatch("setBeginLoadingAction");

      api
        .get(`/maliyet/listeler/maliyetListesi/${date.year}/${date.month}`)
        .then((response) => {
          this.$store.commit("setReportsMekmarAyoList", response.data);
          this.$store.commit("setReportsMekmarAyoListTotal", response.data);
          this.$store.dispatch("setEndLoadingAction");
          this.selectedQuarter = { 'quarter': 'All', id: 0 };

        });
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
