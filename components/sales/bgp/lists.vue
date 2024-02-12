<template>
    <div class="row m-auto">
        <bgpList v-for="bgp of bgpLists" :key="bgp.ID" :bgp="bgp" @bgp_detail_dialog_form="bgpDetailForm($event)"/>
    </div>
</template>

<script>
export default {
    props:{
        bgpLists:{
            type:Array,
            required:false,
        }
    },
    methods:{
        bgpDetailForm(event){
            this.$emit('bgp_detail_dialog_form',event);
        }
    }
}
</script>