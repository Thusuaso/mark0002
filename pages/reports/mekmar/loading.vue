<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <Button type="button" class="p-button-info" :label="byCustomerListLabel" @click="byCustomerList"/>
            </div>
            <div class="col">
                <Dropdown v-model="selectedYear" :options="getYearList" optionLabel="Year" class="w-100" @change="yearChange($event)"/>
            </div>
            <div class="col">
                <Dropdown v-model="selectedMonth" :options="getMonthList" optionLabel="Month"  class="w-100" @change="monthChange($event)"/>
            </div>
            <div class="col">
                <Button type="button" class="p-button-secondary" label="Excel" @click="excel_output"/>

            </div>
        </div>

        <reportsMekmarLoadingList :list="getReportsMekmarLoadingList" :total="getReportsMekmarLoadingListTotal" :loading="getLoading" :yearly="getReportsMekmarLoadingListYear" :yearlyTotal="getReportsMekmarLoadingListYearTotal"/>
    </div>
</template>
<script>
import {mapGetters} from 'vuex';

export default {
    middleware: ["authority"],
    computed:{
        ...mapGetters([
            'getLoading',
        'getYearList',
        'getMonthList',
        'getReportsMekmarLoadingList',
        'getReportsMekmarLoadingListTotal',
        'getReportsMekmarLoadingListYear',
        'getReportsMekmarLoadingListYearTotal',
        'getLocalUrl'
    ])},
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
    created(){

        this.$store.dispatch('setLoadingListNotYear')
    },
    methods:{
        excel_output(){
            this.$excelApi.post("/reports/excel/loading", this.getReportsMekmarLoadingList).then((response) => {
                if (response.status) {
                const link = document.createElement("a");
                link.href = this.getLocalUrl + "reports/excel/loading";

                link.setAttribute("download", "mekamer_loading_excel.xlsx");
                document.body.appendChild(link);
                link.click();
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
                this.$store.dispatch('setLoadingByCustomerList',date);
            } else{
                this.byCustomerListLabel = 'Müşteri',
                this.$store.dispatch('setLoadingList',date);
            }
        },
        monthChange(event){
            const data = {
                        year:this.selectedYear.Year,
                        month:this.selectedMonth.Month
                    }
                    this.$store.dispatch('setLoadingList',data)
        },
        yearChange(event){
            this.$store.dispatch('setYearlyMonthList',event.value.Year).then(response=>{
                if(response){
                    const data = {
                        year:this.selectedYear.Year,
                        month:response[0].Month
                    }
                    this.$store.dispatch('setLoadingList',data)

                }
            })
        }
    },
    watch:{
        getYearList(){
            this.selectedYear = this.getYearList[0];
        },
        getMonthList(){
            this.selectedMonth = this.getMonthList[0];

        }

    }
    
}
</script>