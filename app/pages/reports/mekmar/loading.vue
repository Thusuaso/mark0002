<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <Button type="button" severity="info" :label="byCustomerListLabel" @click="byCustomerList"/>
            </div>
            <div class="col">
                <Select v-model="selectedYear" :options="sharedStore.getYearList" optionLabel="Year" class="w-100" @change="yearChange($event)"/>
            </div>
            <div class="col">
                <Select v-model="selectedMonth" :options="sharedStore.getMonthList" optionLabel="Month"  class="w-100" @change="monthChange($event)"/>
            </div>
            <div class="col">
                <Button type="button" severity="secondary" label="Excel" @click="excel_output"/>

            </div>
        </div>

        <ReportsMekmarLoadingList :list="reportsStore.getReportsMekmarLoadingList" :total="reportsStore.getReportsMekmarLoadingListTotal" :loading="sharedStore.isLoading" :yearly="reportsStore.getReportsMekmarLoadingListYear" :yearlyTotal="reportsStore.getReportsMekmarLoadingListYearTotal"/>
    </div>
</template>
<script>
import { useSharedStore } from "~/stores/shared"
import { useReportsStore } from "~/stores/reports"

export default {
    computed:{
        reportsStore() {
      return useReportsStore()
    },
    sharedStore() {
      return useSharedStore()
    },},
    data(){
        return{
            selectedYear:null,
            selectedMonth:null,
            reportsMekmerLoadingListExcelFields2:[
                { label: "Siparis No", field: "SiparisNo" },
                { label: "Musteri Adi", field: "MusteriAdi" },
                { label: "Fob", field: "Fob" },
                { label: "Dtp", field: "Dtp" }

            ],
            byCustomerListStatus:false,
            byCustomerListLabel:'Müşteri',
        }
    },
    /*
     * created() -> mounted(): created() SSR'da da calisir, icindeki async
     * is BEKLENMEZ ve liste BOS serialize edilir; hydration onu devralir,
     * created() bir daha calismadigi icin tablo bos kalir (bkz. commit
     * 2afc877e3). mounted() sunucuda hic calismaz.
     */
    mounted(){

        this.reportsStore.setLoadingListNotYear()
    },
    methods:{
        excel_output(){
            useExcelApi().post("/reports/excel/loading", this.reportsStore.getReportsMekmarLoadingList).then((response) => {
                if (response.status) {
                downloadFromExcelServer(
              "reports/excel/loading",
              "mekamer_loading_excel.xlsx"
            );
                }
            });
        },
        byCustomerList(){
            const date = {
                year:this.selectedYear.Year,
                month:this.selectedMonth.Month
            };
            this.byCustomerListStatus = !this.byCustomerListStatus;
            if(this.byCustomerListStatus){
                this.byCustomerListLabel = 'Po',
                this.reportsStore.setLoadingByCustomerList(date);
            } else{
                this.byCustomerListLabel = 'Müşteri',
                this.reportsStore.setLoadingList(date);
            }
        },
        monthChange(event){
            const data = {
                        year:this.selectedYear.Year,
                        month:this.selectedMonth.Month
                    }
                    this.reportsStore.setLoadingList(data)
        },
        yearChange(event){
            this.reportsStore.setYearlyMonthList(event.value.Year).then(response=>{
                if(response){
                    const data = {
                        year:this.selectedYear.Year,
                        month:response[0].Month
                    }
                    this.reportsStore.setLoadingList(data)

                }
            })
        }
    },
    /*
     * IZLEYICI ANAHTARLARI TIRNAK ICINDE -- ZORUNLU.
     *
     * Nuxt 2'de mapGetters'in getter'i bileşenin KENDI ozelligi gibi
     * gorundugu icin `watch: { getYearList() {...} }` yazilabiliyordu.
     * Pilotta deger store uzerinden okunuyor ve
     *     watch: { sharedStore.getYearList() {} }
     * GECERSIZ SOZDIZIMIDIR -- nesne anahtarinda nokta olamaz. Derleme
     *     SyntaxError: [vue/compiler-sfc] Unexpected token, expected ","
     * ile duser (ve sablon denetcisi bunu YAKALAMAZ, cunku o yalnizca
     * <template> blogunu derliyor).
     *
     * Vue 3 noktali YOL anahtarlarini dizgi olarak destekliyor:
     * "sharedStore.getYearList" calisir, izleme davranisi ayni.
     */
    watch:{
        "sharedStore.getYearList"(){
            this.selectedYear = this.sharedStore.getYearList[0];
        },
        "sharedStore.getMonthList"(){
            this.selectedMonth = this.sharedStore.getMonthList[0];

        }

    }
    
}
</script>

<script setup>
/*
 * definePageMeta yalnizca <script setup> icinde kullanilabilir ->
 * Options API sayfalarinda IKINCI bir script blogu gerekiyor.
 * Nuxt 2'deki sayfa secenegi `middleware: ["authority"]` karsiligi;
 * ara katman app/middleware/authority.ts olarak tasinmis durumda.
 */
definePageMeta({ middleware: ["authority"] })

/*
 * REFERANS LISTESI -- YIL + AY
 *
 * Nuxt 2'de layouts/default.vue'nun created()'i cekiyordu; pilotun
 * layout'u o 25 liste cagrisini bilerek erteledi, ama bu sayfa
 * tasinirken kendi ihtiyaci eklenmedi -- iki Select BOS geliyordu. Dahasi: sayfanin
 * watch'lari (`sharedStore.getYearList` / `getMonthList`) listeler
 * GELDIGINDE varsayilan yil/ayi seciyor; liste hic gelmedigi icin
 * watch hic tetiklenmiyor ve rapor bos aciliyordu.
 * Hata/uyari yok: getter bos dizi donuyor.
 */
const loadingSharedStore = useSharedStore()

await useReferenceData("reports-loading", [
  ["yearList", () => loadingSharedStore.setYearList()],
  ["monthList", () => loadingSharedStore.setMonthList()],
])
</script>

<!--
  pages/reports/mekmar/loading.vue

  Bagimlilik: components/reports/mekmar/loading/list.vue
    (`reportsMekmarLoadingList`) -> app/components/reports/mekmar/LoadingList.vue

  ELLE:
  [x] mapGetters(8 getter) -> UC ayri store: reports.ts (5 getter),
      shared.ts (getYearList / getMonthList) ve getLoading.
      getLoading'in ADI DEGISTI: shared store'da isLoading
      (Vuex'te boolean'di, pilotta SAYAC ve getter `loading > 0`).
  [x] 6 dispatch -> reportsStore
  [x] this.$excelApi -> useExcelApi(); elle <a download> ->
      downloadFromExcelServer()
  [x] mapGetters(["getLocalUrl"]) dustu
  [x] middleware: ["authority"] -> definePageMeta
  [x] created() -> mounted()

  TASIMA YOLU: elle yeniden yazilmadi; tools/codemods/vue2-to-vue3.mjs
  uygulandi, sonra codemod'un "ELLE YAPILACAK" diye listeledigi maddeler
  kapatildi. Kaynak: mark0002 deposunun codemod-vue3-prep dali (filtreler
  ve .sync orada zaten cevrilmisti).
-->
