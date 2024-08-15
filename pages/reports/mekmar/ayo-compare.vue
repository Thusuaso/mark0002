<template>
  <div>


    <div class="row m-auto text-center">
      <div class="col">
        <h3>{{ new Date().getFullYear() }} Q1 </h3>
        <table class="table">
            <thead>
              <tr>
                <th scope="col">TL</th>
                <th scope="col">USD</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ thisYearQ1Total.tl | formatPriceTl}}</td>
                <td>{{ thisYearQ1Total.usd | formatPriceUsd }}</td>

              </tr>

            </tbody>
          </table>
      </div>
      <div class="col">
        <h3>{{ new Date().getFullYear() - 1 }} Q1 </h3>
        <table class="table">
            <thead>
              <tr>
                <th scope="col">TL</th>
                <th scope="col">USD</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ twoYearQ1Total.tl | formatPriceTl}}</td>
                <td>{{ twoYearQ1Total.usd | formatPriceUsd }}</td>

              </tr>

            </tbody>
          </table>
      </div>
      <div class="col">
        <h3>{{ new Date().getFullYear() - 2 }} Q1 </h3>
        <table class="table">
            <thead>
              <tr>
                <th scope="col">TL</th>
                <th scope="col">USD</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ threeYearQ1Total.tl | formatPriceTl}}</td>
                <td>{{ threeYearQ1Total.usd | formatPriceUsd }}</td>

              </tr>

            </tbody>
          </table>
      </div>
    </div>
    <hr/>
    <div class="row m-auto text-center">
      <div class="col">
        <h3>{{ new Date().getFullYear() }} Q2 </h3>
        <table class="table">
            <thead>
              <tr>
                <th scope="col">TL</th>
                <th scope="col">USD</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ thisYearQ2Total.tl | formatPriceTl}}</td>
                <td>{{ thisYearQ2Total.usd | formatPriceUsd }}</td>

              </tr>

            </tbody>
          </table>
      </div>
      <div class="col">
        <h3>{{ new Date().getFullYear() - 1 }} Q2 </h3>
        <table class="table">
            <thead>
              <tr>
                <th scope="col">TL</th>
                <th scope="col">USD</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ twoYearQ2Total.tl | formatPriceTl}}</td>
                <td>{{ twoYearQ2Total.usd | formatPriceUsd }}</td>

              </tr>

            </tbody>
          </table>
      </div>
      <div class="col">
        <h3>{{ new Date().getFullYear() - 2 }} Q2 </h3>
        <table class="table">
            <thead>
              <tr>
                <th scope="col">TL</th>
                <th scope="col">USD</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ threeYearQ2Total.tl | formatPriceTl}}</td>
                <td>{{ threeYearQ2Total.usd | formatPriceUsd }}</td>

              </tr>

            </tbody>
          </table>
      </div>
    </div>
    <hr/>

    <div class="row m-auto text-center">
      <div class="col">
        <h3>{{ new Date().getFullYear() }} Q3 </h3>
        <table class="table">
            <thead>
              <tr>
                <th scope="col">TL</th>
                <th scope="col">USD</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ thisYearQ3Total.tl | formatPriceTl}}</td>
                <td>{{ thisYearQ3Total.usd | formatPriceUsd }}</td>

              </tr>

            </tbody>
          </table>
      </div>
      <div class="col">
        <h3>{{ new Date().getFullYear() - 1 }} Q3 </h3>
        <table class="table">
            <thead>
              <tr>
                <th scope="col">TL</th>
                <th scope="col">USD</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ twoYearQ3Total.tl | formatPriceTl}}</td>
                <td>{{ twoYearQ3Total.usd | formatPriceUsd }}</td>

              </tr>

            </tbody>
          </table>
      </div>
      <div class="col">
        <h3>{{ new Date().getFullYear() - 2 }} Q3 </h3>
        <table class="table">
            <thead>
              <tr>
                <th scope="col">TL</th>
                <th scope="col">USD</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ threeYearQ3Total.tl | formatPriceTl}}</td>
                <td>{{ threeYearQ3Total.usd | formatPriceUsd }}</td>

              </tr>

            </tbody>
          </table>
      </div>
    </div>
    <hr/>

    <div class="row m-auto text-center">
      <div class="col">
        <h3>{{ new Date().getFullYear() }} Q4 </h3>
        <table class="table">
            <thead>
              <tr>
                <th scope="col">TL</th>
                <th scope="col">USD</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ thisYearQ4Total.tl | formatPriceTl}}</td>
                <td>{{ thisYearQ4Total.usd | formatPriceUsd }}</td>

              </tr>

            </tbody>
          </table>
      </div>
      <div class="col">
        <h3>{{ new Date().getFullYear() - 1 }} Q4 </h3>
        <table class="table">
            <thead>
              <tr>
                <th scope="col">TL</th>
                <th scope="col">USD</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ twoYearQ4Total.tl | formatPriceTl}}</td>
                <td>{{ twoYearQ4Total.usd | formatPriceUsd }}</td>

              </tr>

            </tbody>
          </table>
      </div>
      <div class="col">
        <h3>{{ new Date().getFullYear() - 2 }} Q4 </h3>
        <table class="table">
            <thead>
              <tr>
                <th scope="col">TL</th>
                <th scope="col">USD</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ threeYearQ4Total.tl | formatPriceTl}}</td>
                <td>{{ threeYearQ4Total.usd | formatPriceUsd }}</td>

              </tr>

            </tbody>
          </table>
      </div>
    </div>




  </div>
</template>
<script>
import { mapGetters } from "vuex";
import api from "../../../plugins/excel.server";
export default {
  middleware: ["authority"],
  computed: {
    ...mapGetters([
      "getLocalUrl",
    ]),
  },
  data() {
    return {
      
      thisYearAyoList:[],
      oneYearAgoAyoList:[],
      twoYearAgoAyoList:[],
      thisYearQ1AyoList:[],
      thisYearQ2AyoList:[],
      thisYearQ3AyoList:[],
      thisYearQ4AyoList:[],
      oneYearAgoQ1AyoList:[],
      oneYearAgoQ2AyoList:[],
      oneYearAgoQ3AyoList:[],
      oneYearAgoQ4AyoList:[],
      twoYearAgoQ1AyoList:[],
      twoYearAgoQ2AyoList:[],
      twoYearAgoQ3AyoList:[],
      twoYearAgoQ4AyoList:[],

      thisYearQ1Total:{
        tl:0,
        usd:0
      },
      thisYearQ2Total:{
        tl:0,
        usd:0
      },
      thisYearQ3Total:{
        tl:0,
        usd:0
      },
      thisYearQ4Total:{
        tl:0,
        usd:0
      },

      twoYearQ1Total:{
        tl:0,
        usd:0
      },
      twoYearQ2Total:{
        tl:0,
        usd:0
      },
      twoYearQ3Total:{
        tl:0,
        usd:0
      },
      twoYearQ4Total:{
        tl:0,
        usd:0
      },

      threeYearQ1Total:{
        tl:0,
        usd:0
      },
      threeYearQ2Total:{
        tl:0,
        usd:0
      },
      threeYearQ3Total:{
        tl:0,
        usd:0
      },
      threeYearQ4Total:{
        tl:0,
        usd:0
      }




    };
  },
  created() {
    const date = new Date();
    const year = date.getFullYear();
    this.$store.dispatch("setBeginLoadingAction");
    api
    .get(`/maliyet/listeler/maliyetListesi/${year}`)
    .then((response) => {
      api.get(`/maliyet/listeler/maliyetListesi/${year - 1}`)
      .then((response2)=>{

        api.get(`/maliyet/listeler/maliyetListesi/${year - 2}`)
        .then((response3)=>{
          this.thisYearAyoList = response.data;
          this.oneYearAgoAyoList = response2.data;
          this.twoYearAgoAyoList = response3.data;


          this.thisYearQ1AyoList = response.data.filter(x=>(x.yukleme_month >= 1 && x.yukleme_month <= 3));
          this.thisYearQ2AyoList = response.data.filter(x=>(x.yukleme_month >= 4 && x.yukleme_month <= 6));
          this.thisYearQ3AyoList = response.data.filter(x=>(x.yukleme_month >= 7 && x.yukleme_month <= 9));
          this.thisYearQ4AyoList = response.data.filter(x=>(x.yukleme_month >= 10 && x.yukleme_month <= 12));

          this.oneYearAgoQ1AyoList = response2.data.filter(x=>(x.yukleme_month >= 1 && x.yukleme_month <= 3));
          this.oneYearAgoQ2AyoList = response2.data.filter(x=>(x.yukleme_month >= 4 && x.yukleme_month <= 6));
          this.oneYearAgoQ3AyoList = response2.data.filter(x=>(x.yukleme_month >= 7 && x.yukleme_month <= 9));
          this.oneYearAgoQ4AyoList = response2.data.filter(x=>(x.yukleme_month >= 10 && x.yukleme_month <= 12));

          this.twoYearAgoQ1AyoList = response3.data.filter(x=>(x.yukleme_month >= 1 && x.yukleme_month <= 3));
          this.twoYearAgoQ2AyoList = response3.data.filter(x=>(x.yukleme_month >= 4 && x.yukleme_month <= 6));
          this.twoYearAgoQ3AyoList = response3.data.filter(x=>(x.yukleme_month >= 7 && x.yukleme_month <= 9));
          this.twoYearAgoQ4AyoList = response3.data.filter(x=>(x.yukleme_month >= 10 && x.yukleme_month <= 12));



          this.thisYearQ1AyoList.forEach(q1=>{
            this.thisYearQ1Total.tl += q1.kar_zarar_tl;
            this.thisYearQ1Total.usd += q1.kar_zarar;
          });
          this.thisYearQ2AyoList.forEach(q2=>{
            this.thisYearQ2Total.tl += q2.kar_zarar_tl;
            this.thisYearQ2Total.usd += q2.kar_zarar;
          });
          this.thisYearQ3AyoList.forEach(q3=>{
            this.thisYearQ3Total.tl += q3.kar_zarar_tl;
            this.thisYearQ3Total.usd += q3.kar_zarar;
          });
          this.thisYearQ4AyoList.forEach(q4=>{
            this.thisYearQ4Total.tl += q4.kar_zarar_tl;
            this.thisYearQ4Total.usd += q4.kar_zarar;
          });


          this.oneYearAgoQ1AyoList.forEach(q1=>{
            this.twoYearQ1Total.tl += q1.kar_zarar_tl;
            this.twoYearQ1Total.usd += q1.kar_zarar;
          });
          this.oneYearAgoQ2AyoList.forEach(q2=>{
            this.twoYearQ2Total.tl += q2.kar_zarar_tl;
            this.twoYearQ2Total.usd += q2.kar_zarar;
          });
          this.oneYearAgoQ3AyoList.forEach(q3=>{
            this.twoYearQ3Total.tl += q3.kar_zarar_tl;
            this.twoYearQ3Total.usd += q3.kar_zarar;
          });
          this.oneYearAgoQ4AyoList.forEach(q4=>{
            this.twoYearQ4Total.tl += q4.kar_zarar_tl;
            this.twoYearQ4Total.usd += q4.kar_zarar;
          });



          this.twoYearAgoQ1AyoList.forEach(q1=>{
            this.threeYearQ1Total.tl += q1.kar_zarar_tl;
            this.threeYearQ1Total.usd += q1.kar_zarar;
          });
          this.twoYearAgoQ2AyoList.forEach(q2=>{
            this.threeYearQ2Total.tl += q2.kar_zarar_tl;
            this.threeYearQ2Total.usd += q2.kar_zarar;
          });
          this.twoYearAgoQ3AyoList.forEach(q3=>{
            this.threeYearQ3Total.tl += q3.kar_zarar_tl;
            this.threeYearQ3Total.usd += q3.kar_zarar;
          });
          this.twoYearAgoQ4AyoList.forEach(q4=>{
            this.threeYearQ4Total.tl += q4.kar_zarar_tl;
            this.threeYearQ4Total.usd += q4.kar_zarar;
          });








          this.$store.dispatch("setEndLoadingAction");

        });
      });



    });


  },
  methods: {
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

  },
  watch: {

  },
};
</script>
