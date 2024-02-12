<template>
    <div>
        <div class="row mt-4">
            <div class="col">
                <span class="p-float-label">
                    <InputText id="company" v-model="companyData.companyname" />
                    <label for="company">Firma</label>
                </span>
            </div>
            <div class="col">
                <span class="p-float-label">
                    <InputText id="mail" v-model="companyData.mail" />
                    <label for="mail">Mail</label>
                </span>
            </div>
            <div class="col">
                <span class="p-float-label">
                    <InputText id="phone" v-model="companyData.phone" />
                    <label for="phone">Telefon</label>
                </span>
            </div>
            <div class="col">
                <span class="p-float-label">
                    <InputText id="description" v-model="companyData.description" />
                    <label for="description">Not</label>
                </span>
            </div>

        </div>
        <Button type="button" class="p-button-success w-100" label="Kaydet" @click="save" />
        <DataTable :value="company" paginator :rows="15">
            <Column field="ID" header="Id"></Column>
            <Column field="FirmaAdi" header="Firma"></Column>
            <Column field="Telefon" header="Telefon"></Column>
            <Column field="MailAdresi" header="Mail"></Column>
            <Column field="Notlar" header="Not"></Column>
        </DataTable>
    </div>
</template>
<script>
export default {
    props:{
        company:{
            type:Array,
            required:true
        }
    },
    data(){
        return{
            companyData:{
                companyname:null,
                mail:null,
                phone:null,
                description:null
            }
        }
    },
    methods:{
        save(){
            this.$store.dispatch('setCompanySave',this.companyData);
        }
    }
}
</script>