<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <uploadForm :orders="getOrdersAllList"/>
            </div>
            <div class="col">
                <uploadList :model="getDocumentModelList"/>
            </div>
        </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
    middleware: ["authority"],
    computed:{
        ...mapGetters(['getOrdersAllList','getDocumentModelList'])
    },
    created(){
        this.$store.dispatch('setDocumentModelList');
    }
}
</script>