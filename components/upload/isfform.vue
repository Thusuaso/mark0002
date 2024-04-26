<template>
    <div class="row">
        <div class="col">
            <Dropdown v-model="selectedSupplier" :options="isf" optionLabel="TedarikciAdi" placeholder="Select a Supplier" style="margin-top:5px;;margin-bottom:100px;" 
            @change="supplierChange($event)"
        />

        </div>
        <div class="col">
            <Button icon="pi pi-download" class="p-button"  @click="$refs.link_id.click()"/>
            <a :href="link" ref="link_id"/>

        </div>






    </div>
</template>
<script>
export default {
    props:{
        isf:{
            type:Object,
            required:false
        }
    },
    data(){
        return{
            link:null,
            selectedSupplier:null
        }
    },
    methods:{
        supplierChange(event){
            const docName = event.value.TedarikciAdi + '-' + event.value.SiparisNo + '.pdf';
            this.link = `https://file-service.mekmar.com/file/download/3/${docName}`
        }
    }
}
</script>