<template>
    <div class="mt-5 mb-5">
        <div class="row mb-5 mt-5">
            <div class="col">
                <span class="p-float-label">
                    <InputText class="w-100" id="container" type="text" v-model="containerNo" />
                    <label for="container">Konteynır No</label>
                </span>
            </div>
            <div class="col">
                <span class="p-float-label">
                    <InputText class="w-100" id="line" type="text" v-model="line" />
                    <label for="line">Hat</label>
                </span>
            </div>
            <div class="col">
                <span class="p-float-label">
                    <Calendar class="w-100" v-model="eta_date" inputId="eta_date" style="z-index:99;"/>
                    <label for="eta_date">Eta Tarihi</label>
                </span>
            </div>
            <div class="col">
                <Button type="button" class="p-button-danger" @click="eta_date = null" label="Temizle"/>
            </div>
            <div class="col">
                <Checkbox v-model="checkedSendingForm" :binary="true" /> <span v-if="checkedSendingForm">Gönderildi</span> <span v-else>Gönderilmedi</span>
            </div>
            <div class="col">
                <Checkbox v-model="checkedFollowForm" :binary="true" /> <span v-if="checkedFollowForm">Takibi Bırak</span> <span v-else>Takip Et</span>
            </div>
        </div>
        <Button type="button" class="p-button-success w-100 mt-5" label="Kaydet" @click="save"/>
    </div>
    
</template>
<script>
import date from '../../../plugins/date';
export default {
    props:{
        model:{
            type:Object,
            required:false,
        }
    },
    data(){
        return{
            eta_date:null,
            checkedSendingForm:false,
            checkedFollowForm:false,
            line:null,
            containerNo:null,
        }
    },
    created(){
        this.containerNo = this.model.KonteynerNo;
        this.line = this.model.Line;
        this.eta_date = date.dateToString(this.model.Eta);
        this.checkedSendingForm = (this.model.KonsimentoDurum == null || !this.model.KonsimentoDurum) ? false:true;
        this.checkedFollowForm = (this.model.Takip == null || !this.model.Takip) ? false:true
    },
    methods:{
        save(){
            let eta = null;
            if(this.eta_date == null){
                eta = null;
            }else{
                eta = date.dateToString(this.eta_date);
            }
            const data = {
                'EtaTarihi':eta,
                'KonsimentoDurum':this.checkedSendingForm,
                'Takip':this.checkedFollowForm,
                'Line':this.line,
                'KonteynırNo':this.containerNo,
                'SiparisNo':this.model.SiparisNo,
            };
            this.$store.dispatch('setContainerFollowSave',data);

        }
    }
}
</script>