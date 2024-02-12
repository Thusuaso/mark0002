<template>
    <div class="row mt-3">
        <div class="col w-100">
            <span class="p-float-label">
                <InputText id="supplier" type="text" v-model="supplier" />
                <label for="supplier">Tedarikçi</label>
            </span>
        </div>
        <div class="col w-100"><Button type="button" class="p-button-success"  label="Kaydet" @click="saveProcess"/></div>
        <div class="col w-100" v-if="!status"><Button type="button" class="p-button-danger"  label="Sil" @click="deleteForm"/></div>
    </div>
</template>
<script>
export default {
    props:{
      status:{
            type:Boolean,
            required:true,
        },
      model:{
            type:Object,
            required:true,
        }
    },
    data(){
    
        return{
            supplier:null,
        }
    },
    created(){
      if(!this.status) {
            this.supplier = this.model.FirmaAdi;
        } 
    },
    methods:{
        saveProcess(){
            if(this.status){
                this.save();
            }else{
                this.update();
            }
        },
        save(){
            this.model.FirmaAdi = this.supplier;
            this.$store.dispatch('setSupplierSave',this.model);
            this.$emit('supplier_dialog_close_emit');
        },
        update(){
            this.model.FirmaAdi = this.supplier;
            this.$store.dispatch('setSupplierUpdate',this.model);
            this.$emit('supplier_dialog_close_emit');

        },
        deleteForm(){
            this.$store.dispatch('setSupplierDelete',this.model.ID);
            this.$emit('supplier_dialog_close_emit');
        },
    }
}
</script>