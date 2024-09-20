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
              <td>{{ (getReportsMekmarAyoListTotal.profitUsd - cost_usd) | formatPriceUsd }}</td>
              <td>{{ (getReportsMekmarAyoListTotal.profitTl - cost_tl) | formatPriceTl }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
    </div>
    <div class="container row">
      <div class="col">
        <Dropdown class="w-100" v-model="selectedQuarter" :options="quarters" optionLabel="quarter" placeholder="Select a Quarter" @change="quarterSelected($event)"/>

      </div>
      <div class="col">
        <Dropdown class="w-100" v-model="selectedHalfMonths" :options="halfmonths" optionLabel="month" placeholder="Select a Month" @change="halfMonthsSelected($event)"/>

      </div>
      <div class="col">
        <Button type="button" class="p-button-warning w-100" label="Credit Card" @click="creditCardToggle"/>
        <Dialog :visible.sync="credit_card_form_visible" header="Credit Card Cost" modal >
          <creditCardForm style="margin-bottom:5px;" v-for="item in creditCardCostList" :key="item" :month="item.month" :value="item.value"
          :month_id="item.month_id" :currency="item.currency" :year="selectedYear.Yil" :usd="item.usd" :id="item.id"
          @credit_card_cost_list_updated_emit="creditCardCostListUpdated"
          @cost_save_emit="creditCardCostSave($event)"
          @cost_update_emit="creditCardCostUpdate($event)"
          />

        </Dialog>

      </div>
      <div class="col">
        <Button type="button" class="p-button-info w-100" label="Travel Cost" @click="travelCost"/>
        <Dialog :visible.sync="travel_cost_form_visible" header="Travel Cost" modal >
          <creditCardForm style="margin-bottom:5px;" v-for="item in travelCostList" :key="item" :month="item.month" :value="item.value"
          :month_id="item.month_id" :currency="item.currency" :year="selectedYear.Yil" :usd="item.usd" :id="item.id"
          @credit_card_cost_list_updated_emit="travelCostListUpdated"
          @cost_save_emit="travelCostSave($event)"
          @cost_update_emit="travelCostUpdate($event)"
          />

        </Dialog>
      </div>
      <div class="col">
        <Button type="button" class="p-button-secondary w-100" label="Wage Cost" @click="wageCost"/>
        <Dialog :visible.sync="wage_cost_form_visible" header="Wage Cost" modal >
          <creditCardForm style="margin-bottom:5px;" v-for="item in wageCostList" :key="item" :month="item.month" :value="item.value"
          :month_id="item.month_id" :currency="item.currency" :year="selectedYear.Yil" :usd="item.usd" :id="item.id"
          @credit_card_cost_list_updated_emit="wageCostListUpdated"
          @cost_save_emit="wageCostSave($event)"
          @cost_update_emit="wageCostUpdate($event)"
          />

        </Dialog>
      </div>
      <!-- <div class="col">
        <Button type="button" class="p-button-danger w-100" label="Abroad Cost" @click="abroadCost"/>
        <Dialog :visible.sync="abroad_cost_form_visible" header="Abroad Cost" modal >
          <creditCardForm style="margin-bottom:5px;" v-for="item in abroadCostList" :key="item" :month="item.month" :value="item.value"
          :month_id="item.month_id" :currency="item.currency" :year="selectedYear.Yil" :usd="item.usd" :id="item.id"
          @credit_card_cost_list_updated_emit="abroadCostListUpdated"
          @cost_save_emit="abroadCostSave($event)"
          @cost_update_emit="abroadCostUpdate($event)"
          />

        </Dialog>
      </div> -->
      <div class="col">
        <Button type="button" class="p-button-help w-100" label="Sample Cost" @click="sampleCost"/>
        <Dialog :visible.sync="sample_cost_form_visible" header="Wage Cost" modal >
          <creditCardForm style="margin-bottom:5px;" v-for="item in sampleCostList" :key="item" :month="item.month" :value="item.value"
          :month_id="item.month_id" :currency="item.currency" :year="selectedYear.Yil" :usd="item.usd" :id="item.id"
          @credit_card_cost_list_updated_emit="sampleCostListUpdated"
          @cost_save_emit="sampleCostSave($event)"
          @cost_update_emit="sampleCostUpdate($event)"
          />

        </Dialog>
      </div>
      <div class="col">
        <Button type="button" class="p-button-success w-100" label="Other Cost" @click="otherCost"/>

        <Dialog :visible.sync="other_cost_form_visible" header="Wage Cost" modal >
          <creditCardForm style="margin-bottom:5px;" v-for="item in otherCostList" :key="item" :month="item.month" :value="item.value"
          :month_id="item.month_id" :currency="item.currency" :year="selectedYear.Yil" :usd="item.usd" :id="item.id"
          @credit_card_cost_list_updated_emit="otherCostListUpdated"
          @cost_save_emit="otherCostSave($event)"
          @cost_update_emit="otherCostUpdate($event)"
          />

        </Dialog>
      </div>
      <div class="col">
        <Button label="Currency" class="p-button-danger" @click="currency" />
        <Dialog :visible.sync="currency_form_visible" modal >
          <formCurrency v-for="cur in currency_list" :key="cur" 
            :month="cur.month" :id="cur.id" :month_id="cur.month_id" :currency="cur.currency"
            @cost_save_emit="saveCurrency($event)"
            @cost_update_emit="updateCurrency($event)"
            :year="selectedYear.Yil"
          />

        </Dialog>
      </div>
      <div class="col">
        <Button icon="pi pi-file-excel" @click="cost_excel" class="p-button-raised p-button-rounded" style="font-size: 2rem"/>
      </div>
    </div>

    <reportsMekmarAyoList :list="getReportsMekmarAyoList" :total="getReportsMekmarAyoListTotal" />
  </div>


</template>
<script>
import { mapGetters } from "vuex";
import api from "../../../plugins/excel.server";
import currency from "../../../plugins/currency";
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
      currency_list:[],
      currency_form_visible:false,
      cost_tl:0,
      cost_usd:0,
      other_cost_form_visible:false,
      otherCostList:[],
      sampleCostList:[],
      sample_cost_form_visible:false,
      abroadCostList:[],
      abroad_cost_form_visible:false,
      wage_cost_form_visible:false,
      wageCostList:[],
      travelCostList:[],
      travel_cost_form_visible:false,
      creditCardCostList:[],
      credit_card_form_visible:false,
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
        this.__getMonthlyCostList(date.year,date.month);
        this.$store.dispatch("setEndLoadingAction");
      });




  },
  methods: {
    cost_excel(){
      this.$axios.get(`/reports/ayo/other/cost/list/${this.selectedYear.Yil}`)
      .then(other=>{
        this.$axios.get(`/reports/ayo/sample/cost/list/${this.selectedYear.Yil}`)
        .then(sample=>{
          this.$axios.get(`/reports/ayo/wage/cost/list/${this.selectedYear.Yil}`)
          .then(wage=>{
            this.$axios.get(`/reports/ayo/travel/cost/list/${this.selectedYear.Yil}`)
            .then(travel=>{
              this.$axios.get(`/reports/ayo/credit/card/cost/list/${this.selectedYear.Yil}`)
              .then(credit=>{
                const data = {
                  'other':other.data.list,
                  'sample':sample.data.list,
                  'wage':wage.data.list,
                  'travel':travel.data.list,
                  'credit':credit.data.list
                };

                api
                .post("/reports/mekmar/ayo/cost/excel", data)
                .then((response) => {
                  if (response.status) {
                    const link = document.createElement("a");
                    link.href = this.getLocalUrl + "reports/mekmar/ayo/cost/excel";

                    link.setAttribute("download", "ayo_cost_excel.xlsx");
                    document.body.appendChild(link);
                    link.click();
                  }
                });
              });

            });

          });
          
          
        });
      });
    },
    updatedCurrencyList(){
      this.$axios.get(`/reports/ayo/currency/list/${this.selectedYear.Yil}`)
      .then(res=>{
        this.currency_list = res.data.list;

      });
    },
    updateCurrency(event){
      this.$axios.put('/reports/ayo/currency/update',event)
      .then(res=>{
        this.$toast.success('Başarıyla Güncellendi.');
      });
    },
    saveCurrency(event){
      this.$axios.post('/reports/ayo/currency/save',event)
      .then(res=>{
        this.updatedCurrencyList();
        this.$toast.success('Başarıyla Kaydedildi.');
      });
    },
    currency(){
      this.$axios.get(`/reports/ayo/currency/list/${this.selectedYear.Yil}`)
      .then(res=>{
        this.currency_list = res.data.list;
        this.currency_form_visible = true;

      })
    },
    __getHalfCostList(month_1,month_2,year){
      this.$axios.get(`/reports/ayo/costs/half/${month_1}/${month_2}/${year}`)
      .then(res=>{
        this.cost_tl = res.data.tl;
        this.cost_usd = res.data.usd;
      });
    },
    __getQuarterCostList(quarter_1,quarter_2,year){
      this.$axios.get(`/reports/ayo/costs/quarter/${quarter_1}/${quarter_2}/${year}`)
      .then(res=>{
        this.cost_tl = res.data.tl;
        this.cost_usd = res.data.usd;
      });
    },
    __getMonthlyCostList(year,month){
      this.$axios.get(`/reports/ayo/costs/list/${year}/${month}`)
      .then(res=>{
        this.cost_tl = res.data.tl;
        this.cost_usd = res.data.usd;
      });
    },
    __getYearlyCostList(year){
      this.$axios.get(`/reports/ayo/costs/yearly/${year}`)
      .then(res=>{
        this.cost_tl = res.data.tl;
        this.cost_usd = res.data.usd;
      });
    },



    otherCostListUpdated(){
      this.$axios.get(`/reports/ayo/other/cost/list/${this.selectedYear.Yil}`)
      .then(res=>{
        this.otherCostList = res.data.list;
      });
    },
    otherCostUpdate(event){
      this.$axios.put('/reports/ayo/other/cost/update',event)
      .then(res=>{
        this.$toast.success('Başarıyla Güncellendi.');
      });
    },
    otherCostSave(event){
      this.$axios.post('/reports/ayo/other/cost/save',event)
      .then(res=>{
        this.$toast.success('Başarıyla Kaydedildi.');
        this.otherCostListUpdated();

      });
    },
    otherCost(){
      this.$axios.get(`/reports/ayo/other/cost/list/${this.selectedYear.Yil}`)
      .then(res=>{
        this.otherCostList = res.data.list;
        this.other_cost_form_visible = true;
      });
    },




    sampleCostListUpdated(){
      this.$axios.get(`/reports/ayo/sample/cost/list/${this.selectedYear.Yil}`)
      .then(res=>{
        this.sampleCostList = res.data.list;
      });
    },
    sampleCostUpdate(event){
      this.$axios.put('/reports/ayo/sample/cost/update',event)
      .then(res=>{
        this.$toast.success('Başarıyla Güncellendi.');

      });
    },
    sampleCostSave(event){
      this.$axios.post('/reports/ayo/sample/cost/save',event)
      .then(res=>{
        this.$toast.success('Başarıyla Kaydedildi.');
        this.sampleCostListUpdated();

      });

    },
    sampleCost(){
      this.$axios.get(`/reports/ayo/sample/cost/list/${this.selectedYear.Yil}`)
      .then(res=>{
        this.sampleCostList = res.data.list;
        this.sample_cost_form_visible = true;
      });
    },
    abroadCostListUpdated(){
      this.$axios.get(`/reports/ayo/abroad/cost/list/${this.selectedYear.Yil}`)
      .then(res=>{
        this.abroadCostList = res.data.list;
      });
    },
    abroadCostUpdate(event){
      this.$axios.put('/reports/ayo/abroad/cost/update',event)
      .then(res=>{
        this.$toast.success('Başarıyla Güncellendi.');
      });
    },
    abroadCostSave(event){
      this.$axios.post('/reports/ayo/abroad/cost/save',event)
      .then(res=>{
        this.$toast.success('Başarıyla Kaydedildi.');
        this.abroadCostListUpdated();
      });
    },
    abroadCost(){
      this.$axios.get(`/reports/ayo/abroad/cost/list/${this.selectedYear.Yil}`)
      .then(res=>{
        this.abroadCostList = res.data.list;
        this.abroad_cost_form_visible = true;
      });
    },

    wageCostUpdate(event){
      this.$axios.put('/reports/ayo/wage/cost/update',event)
      .then(res=>{
        
        this.$toast.success('Başarıyla Güncellendi.');
      });
    },
    wageCostSave(event){
      this.$axios.post('/reports/ayo/wage/cost/save',event)
      .then(res=>{
        this.wageCostList = res.data.list;
        this.$toast.success('Başarıyla Kaydedildi.');
        this.wageCostListUpdated();
      });
    },
    wageCostListUpdated(){
      this.$axios.get(`/reports/ayo/wage/cost/list/${this.selectedYear.Yil}`)
      .then(res=>{
        this.wageCostList = res.data.list;
      });
    },
    wageCost(){
      this.$axios.get(`/reports/ayo/wage/cost/list/${this.selectedYear.Yil}`)
      .then(res=>{
        this.wageCostList = res.data.list;
        this.wage_cost_form_visible = true;
      });
    },
    travelCostUpdate(event){
      this.$axios.put('/reports/ayo/travel/cost/update',event)
      .then(res=>{
        this.$toast.success('Başarıyla Güncellendi.');
      });
    },
    travelCostSave(event){
      this.$axios.post('/reports/ayo/travel/cost/save',event)
      .then(res=>{
        this.$toast.success('Başarıyla Kaydedildi.');
        this.travelCostListUpdated();
      });
    },
    creditCardCostUpdate(event){
      this.$axios.put('/reports/ayo/credit/card/cost/update',event)
            .then(res=>{
                this.$toast.success('Başarıyla Güncellendi.');
            });
    },
    creditCardCostSave(event){
      this.$axios.post('/reports/ayo/credit/card/cost/save',event)
            .then(res=>{
                this.$toast.success('Başarıyla Kaydedildi.');
                this.creditCardCostListUpdated();
            });
    },
    travelCostListUpdated(){
      this.$axios.get(`/reports/ayo/travel/cost/list/${this.selectedYear.Yil}`)
      .then(res=>{
        this.travelCostList = res.data.list;
      });
    },
    creditCardCostListUpdated(){
      this.$axios.get(`/reports/ayo/credit/card/cost/list/${this.selectedYear.Yil}`)
      .then(res=>{
        this.creditCardCostList = res.data.list;
      });
    },
    travelCost(){
      this.$axios.get(`/reports/ayo/travel/cost/list/${this.selectedYear.Yil}`)
      .then(res=>{
        this.travelCostList = res.data.list;
        this.travel_cost_form_visible = true;
      });
    },
    creditCardToggle(){
      this.$axios.get(`/reports/ayo/credit/card/cost/list/${this.selectedYear.Yil}`)
      .then(res=>{
        this.creditCardCostList = res.data.list;
        this.credit_card_form_visible = true;
      });





    },
    halfMonthsSelected(event){
      if(event.value.id == 0){
        this.$store.dispatch("setBeginLoadingAction");
        api
          .get(`/maliyet/listeler/maliyetListesi/${this.selectedYear.Yil}`)
          .then((response) => {
            if (response) {
              const data = response.data.filter(x => {
                return (x.yukleme_month >= 1 && x.yukleme_month <= 6)
              });
              this.__getHalfCostList(1,6,this.selectedYear.Yil);
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
              });
              this.__getHalfCostList(7,12,this.selectedYear.Yil);

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
            this.__getMonthlyCostList(this.selectedYear.Yil,this.getReportsMekmarAyoMonthList[0].Ay)
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
            this.__getMonthlyCostList(this.selectedYear.Yil,this.getReportsMekmarAyoMonthList[0].Ay)
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
              this.__getQuarterCostList(1,3,this.selectedYear.Yil);
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
              this.__getQuarterCostList(4,6,this.selectedYear.Yil);

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
              this.__getQuarterCostList(7,9,this.selectedYear.Yil);

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
              this.__getQuarterCostList(10,12,this.selectedYear.Yil);

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
            this.__getYearlyCostList(this.selectedYear.Yil);
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
            this.__getMonthlyCostList(this.selectedYear.Yil,this.getReportsMekmarAyoMonthList[0].Ay);
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
          this.__getMonthlyCostList(date.year,date.month);
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
