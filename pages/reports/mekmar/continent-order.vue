<template>
    <div class="row">
        <Button class="p-button-secondary" label="Excel" @click="excel_output"/>
        <guContinentOrders v-for="item in list" :key="item" :values="item"/>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    import api from "~/plugins/excel.server";
export default {
    computed:{
            ...mapGetters(['getLocalUrl']),
        },
    data(){
        return{
            list:[]
        }
    },
    created(){
        this.$axios.get('/reports/continent/order/list')
        .then(res=>{
            this.list = res.data.list;
        });
    },
    methods:{
        excel_output(){

                api
                .post("/maliyet/dosyalar/continent", this.list)
                .then((response) => {
                if (response.status) {
                    const link = document.createElement("a");
                    link.href = this.getLocalUrl + "maliyet/dosyalar/continent";

                    link.setAttribute("download", "continents.xlsx");
                    document.body.appendChild(link);
                    link.click();
                }
                });
        },
    }
}
</script>