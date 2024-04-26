<template>
    <div class="row mt-3">
        <div class="col" style="width:100%;height:100px;">
            <Dropdown v-model="selectedSupplier" :options="supplier" optionLabel="TedarikciAdi" placeholder="Select a Supplier" @change="supplierChange($event)"/>
        </div>
        <div class="col">
            <Button icon="pi pi-download" class="p-button"  @click="$refs.link_id.click()"/>
            <a :href="link" ref="link_id"/>

        </div>
        <div class="col">
            <span class="p-float-label">
                <InputText id="invoice" type="text" v-model="invoiceno" />
                <label for="invoice">Invoice No</label>
            </span>

        </div>

        <div class="col">
            <FileUpload
                mode="advanced"
                accept=".pdf"
                :maxFileSize="1000000"
                @upload="onUpload"
                :multiple="true"
                :auto="true"
                chooseLabel="Upload Document"
                @select="onUpload($event)"
            />

        </div>




    </div>
</template>
<script>
import Cookies from 'js-cookie';
import fileService from '../../plugins/upload';
import convertDate from '../../plugins/date';
export default {
    props:{
        supplier:{
            type:Array,
            required:false
        }
    },
    data(){
        return{
            selectedSupplier:null,
            invoiceno:null,
            link:null
        }
    },
    methods:{
        supplierChange(event){
            this.link = `https://file-service.mekmar.com/file/tedarikci/download/30/${this.selectedSupplier.SiparisNo
                                    }/${this.selectedSupplier.TedarikciAdi + ".pdf"}`;
        },
        onUpload(event){
            if(event.files[0].size == 1000000){
                alert('Dosya boyutu 1MB dan büyük olamaz');
            }else{
                const data = {
                    FaturaNo: this.invoiceno,
                    tedarikci_id: this.selectedSupplier.TedarikciID,
                    tedarikci: this.selectedSupplier.TedarikciAdi,
                    evrak: this.selectedSupplier.TedarikciAdi + ".pdf",
                    siparisno: this.selectedSupplier.SiparisNo,
                    kullaniciAdi: Cookies.get('userId'),
                    date:convertDate.dateToString(new Date())
                };
                fileService.sendSupplier(event.files[0],this.selectedSupplier.SiparisNo,this.selectedSupplier.TedarikciAdi + '.pdf')
                .then(response=>{
                    if(response.Status){
                        this.$store.dispatch('setDocumentSupplierSave',data);
                        this.link = `https://file-service.mekmar.com/file/tedarikci/download/30/${this.selectedSupplier.SiparisNo
                                    }/${this.selectedSupplier.TedarikciAdi + ".pdf"}`;
                    }
                });
            }
        }
    }
}
</script>
<style></style>