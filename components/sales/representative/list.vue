<template>
    <div class="row">
        <div class="col">
            <DataTable :value="list"  class="p-datatable-sm" :selection="selectedRepresentative" selectionMode="single" @row-click="representativeSelected($event)">
                <Column field="SiparisNo" header="Sipariş No"></Column>
                <Column field="SiparisSahibi" header="Sipariş Sahibi"></Column>
                <Column field="Operasyon" header="Operasyon"></Column>
            </DataTable>
        </div>
        <div class="col">
            <DataTable :value="orderer"   class="p-datatable-sm">
                <template #header>
                    <div class="flex flex-wrap align-items-center justify-content-between gap-2 text-center">
                        Siparişçi Özet
                    </div>
                </template>
                <Column field="SiparisSahibi" header="Sipariş Sahibi"></Column>
                <Column field="Total" header="Toplam"></Column>
            </DataTable>
            <br/>
            <DataTable :value="operation" class="p-datatable-sm">
                <template #header>
                    <div class="flex flex-wrap align-items-center justify-content-between gap-2 text-center">
                        Operasyon Özet
                    </div>
                </template>
                <Column field="Operasyon" header="Operasyon"></Column>
                <Column field="Total" header="Toplam"></Column>
            </DataTable>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        list:{
            type:Array,
            required:false,
        },
        orderer:{
            type:Array,
            required:false,
        },
        operation:{
            type:Array,
            required:false,
        }
    },
    data(){
        return{
            selectedRepresentative:null,

        }
    },
    methods:{
        representativeSelected(event){
            this.$emit('representative_form_emit',event.data);
        }
    }
}
</script>