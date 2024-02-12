<template>
    <div class="container">
        <DataTable :value="po"
            :selection.sync="selectedPo"
            selectionMode="single"
            @row-click="$emit('customer_order_po_selected_emit', $event.data.SiparisNo)"
        >
            <Column field="SiparisNo" header="Po"></Column>
            <Column field="SiparisSahibi" header="Sipariş Sahibi"></Column>
            <Column field="Operasyon" header="Operasyon"></Column>
        </DataTable>
    </div>
</template>
<script>
export default {
    props:{
        po:{
            type:Array,
            required:false,
        }
    },
    data(){
        return {
            selectedPo:null,
        }
    }
}
</script>