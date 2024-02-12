<template>
    <div class="container">
        <Button class="p-button-primary" label="Yeni Firma" @click="container_company_dialog_form = true" />
        <containerInputForm :company="getCompanyList" :orders="getOrdersAllList" :invoice="invoiceKindList"/>
        <Dialog :visible.sync="container_company_dialog_form" header="Yeni Firma" modal>
            <transportCompanyForm :company="getCompanyList"/>
        </Dialog>
    </div>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
    computed:{
      ...mapGetters(['getCompanyList','getOrdersAllList'])  
    },
    data(){
        return{
            container_company_dialog_form:false,
            invoiceKindList: [
                { id: 73, name: "İlaçlama" },
                { id: 7, name: "Gümrük" },
                { id: 13, name: "Navlun" },
                { id: 9, name: "Liman" },
                { id: 100, name: "Lashing" },
                { id: 101, name: "Booking" },
                { id: 102, name: "Spanzet" }

            ],  
        }
    },
    created(){
        this.$store.dispatch('setCompanyList');
    }
}
</script>