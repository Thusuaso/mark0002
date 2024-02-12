<template>
    <div>
        <div class="row mt-3">
        <div class="col">
            <span class="p-float-label">
                <AutoComplete id="supplier" v-model="selectedSupplier" :suggestions="filteredSupplierList" @complete="searchSupplier($event)" field="FirmaAdi" />
                <label for="supplier">Tedarikçi</label>
            </span>
        </div>
        <div class="col">
            <span class="p-float-label">
                <InputText id="stonesize" type="text" v-model="KasaOlculeri" />
                <label for="stonesize">Taş Ebat</label>
            </span>
        </div>
        <div class="col">
            <span class="p-float-label">
                <InputText id="cratesize" type="text" v-model="Ebat" />
                <label for="cratesize">Kasa Ebat</label>
            </span>
        </div>
        <div class="col">
            <span class="p-float-label">
                <InputText id="amount" type="text" v-model="Adet" />
                <label for="amount">Adet</label>
            </span>
        </div>
        </div>
        <div class="row mt-3">
            <div class="col"><Button type="button" class="p-button-success w-100" label="Kaydet" @click="saveProcess"/></div>
            <div class="col"><Button type="button" class="p-button-danger w-100" label="Sil" @click="deleteForm"/></div>

        </div>
    </div>
    
</template>
<script>
export default {
    props:{
        supplier:{
            type:Array,
            required:true
        },
        model:{
            type:Object,
            required:false,
        },
        status:{
            type:Boolean,
            required:true,
        }
    },
    data(){
        return{
            KasaOlculeri:null,
            Ebat:null,
            Adet:null,
            stoneSize:null,
            selectedSupplier:null,
            filteredSupplierList:null,
        }
    },
    created(){
      if(!this.status){
        this.selectedSupplier = this.supplier.find(x=>x.ID == this.model.TedarikciId);
        this.Ebat = this.model.Ebat;
        this.KasaOlculeri = this.model.KasaOlculeri;
        this.Adet = this.model.Adet;
      }  
    },
    methods:{
        deleteForm(){
            this.$store.dispatch('setSelectionProductionCrateSizeDelete',this.model.Id);
            this.$emit('selection_production_crate_size_dialog_close');
        },
        update(){
            this.model.TedarikciId = this.selectedSupplier.ID;
            this.model.TedarikciAdi = this.selectedSupplier.FirmaAdi;
            this.model.KasaOlculeri = this.KasaOlculeri;
            this.model.Ebat = this.Ebat;
            this.model.Adet = this.Adet;
            this.$store.dispatch('setSelectionProductionCrateSizeUpdate',this.model);
        },
        save(){
            const data = {
                'Ebat':this.Ebat,
                'KasaOlculeri':this.KasaOlculeri,
                'Adet':this.Adet,
                'TedarikciId':this.selectedSupplier.ID
            };
            this.$store.dispatch('setSelectionProductionCrateSizeSave',data);
            this.$emit('selection_production_crate_size_dialog_close');

        },
        saveProcess(){
          if(this.status){
                this.save();
            }  else{
                this.update();
            }
        },
        searchSupplier(event){
            let results;
            if(event.query.length == 0){
                results = this.supplier;
            }else{
                results = this.supplier.filter(x=>{
                    return x.FirmaAdi.toLowerCase().includes(event.query.toLowerCase());
                });
            };
            this.filteredSupplierList = results;
        }
    }
}
</script>