<template>
    <div>
        <Button type="button" class="p-button-secondary" label="Excel" @click="excel_output"/>
        <div class="row">
        <guSupplierCost v-for="item in list" :list="item" :key="item"/>
    </div>
    </div>

</template>

<script>
import { mapGetters } from "vuex";

 export default {
    computed:{
        ...mapGetters(['getLocalUrl'])
    },
    data(){
        return {
            list:[]
        }
    },
    created(){
        this.$axios.get('/reports/supplier/cost/list')
        .then(res=>{
            this.list = res.data.list;
        });
    },
    methods:{
        excel_output(){
            this.$excelApi.post("/reports/excel/supplier/cost", this.list).then((response) => {
        if (response.status) {
          const link = document.createElement("a");
          link.href = this.getLocalUrl + "reports/excel/supplier/cost";

          link.setAttribute("download", "mekamer_supplier_cost_excel.xlsx");
          document.body.appendChild(link);
          link.click();
        }
      });
        }
    }
 }
</script>