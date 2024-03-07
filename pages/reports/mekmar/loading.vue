<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <Dropdown v-model="selectedYear" :options="getYearList" optionLabel="Year" class="w-100" @change="yearChange($event)"/>
            </div>
            <div class="col">
                <Dropdown v-model="selectedMonth" :options="getMonthList" optionLabel="Month"  class="w-100" @change="monthChange($event)"/>
            </div>
        </div>

        <reportsMekmarLoadingList :list="getReportsMekmarLoadingList" :total="getReportsMekmarLoadingListTotal" :loading="getLoading" :yearly="getReportsMekmarLoadingListYear" :yearlyTotal="getReportsMekmarLoadingListYearTotal"/>
    </div>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
    computed:{
        ...mapGetters([
        'getYearList',
        'getMonthList',
        'getReportsMekmarLoadingList',
        'getReportsMekmarLoadingListTotal',
        'getReportsMekmarLoadingListYear',
        'getReportsMekmarLoadingListYearTotal',
        'getLoading'
    ])},
    data(){
        return{
            selectedYear:null,
            selectedMonth:null
        }
    },
    created(){
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const data = {
            year:year,
            month:month
        }
        this.$store.dispatch('setLoadingList',data)
    },
    methods:{
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