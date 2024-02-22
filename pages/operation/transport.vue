<template>
    <div class="container">
        <transportInput :company="getCompanyList" :orders="getOrdersAllList" @new-company-form-dialog="new_form_dialog = true"/>
        <Dialog :visible.sync="new_form_dialog" header="New Company" modal>
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
            new_form_dialog:false,
        }
    },
    created(){
        this.$store.dispatch('setCompanyList');
    }
}
</script>