<template>
    <div>
        <div class="row m-auto text-center">
            <div class="col-sm-6">
                <Dropdown v-model="selectedYear" :options="years" optionLabel="year" placeholder="Select a Year" 
                    @change="yearSelected($event)"
                    class="w-100"
                />
            </div>
            <div class="col-sm-6">
                      <JsonExcel
        class="w-100"
        :data="list"
        :fields="checkListFields"
        worksheet="Çeki"
        name="Üretim.xls"
      >
        <Button
          type="button"
          class="p-button-info w-100"
          icon="pi pi-file-excel"
          label="Excel"
        />
      </JsonExcel>

            </div>

        </div>


        <DataTable :value="list" responsiveLayout="scroll" class="p-datatable-sm" :paginator="true" :rows="15"
        
            :filters.sync="filters1" filterDisplay="menu"
            @filter="filterSelected($event)"
        >
            <Column field="Month" header="Ay">
                <template #filter="{filterModel}">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter"/>
                </template>
            </Column>
            <Column field="OcakAdi" header="Ocak">
                <template #filter="{filterModel}">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter"/>
                </template>
            </Column>
            <Column field="KasaNo" header="Kasa">
                <template #filter="{filterModel}">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter"/>
                </template>
            </Column>
            <Column field="FirmaAdi" header="Firma">
                <template #filter="{filterModel}">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter"/>
                </template>
            </Column>
            <Column field="SiparisAciklama" header="Po">
                <template #filter="{filterModel}">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter"/>
                </template>
            </Column>
            <Column field="UrunAdi" header="Ürün">
                <template #filter="{filterModel}">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter"/>
                </template>
            </Column>
            <Column field="BirimAdi" header="Birim">
                <template #filter="{filterModel}">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter"/>
                </template>
            </Column>
            <Column field="AlisFiyati" header="Alış Fiyatı">
                <template #body="slotProps">
                    {{ slotProps.data.AlisFiyati  | formatPriceUsd }}
                </template>
            </Column>
            <Column field="Miktar" header="Miktar">
                <template #body="slotProps">
                    {{ slotProps.data.Miktar  | formatDecimal }}
                </template>
                <template #footer>
                    {{ listTotal.miktar | formatDecimal}}
                </template>
            </Column>
            <Column field="AlisToplam" header="Alış Toplam">
                <template #body="slotProps">
                    {{ slotProps.data.AlisToplam  | formatPriceUsd }}
                </template>
                <template #footer>
                    {{ listTotal.alisToplam | formatPriceUsd }}
                </template>
            </Column>


        </DataTable>

    </div>
</template>
<script >
import {FilterMatchMode,FilterOperator} from 'primevue/api/';

export default {
    data(){
        return{
            list:[],
            years:[
            ],
            selectedYear:{},
            listTotal:{
                alisToplam:0,
                miktar:0
            },
            filters1:{
                Month:{value:null,matchMode:FilterMatchMode.STARTS_WITH},
                OcakAdi:{value:null,matchMode:FilterMatchMode.STARTS_WITH},
                KasaNo:{value:null,matchMode:FilterMatchMode.STARTS_WITH},
                FirmaAdi:{value:null,matchMode:FilterMatchMode.STARTS_WITH},
                SiparisAciklama:{value:null,matchMode:FilterMatchMode.STARTS_WITH},
                UrunAdi:{value:null,matchMode:FilterMatchMode.STARTS_WITH},
                BirimAdi:{value:null,matchMode:FilterMatchMode.STARTS_WITH},

            },
            checkListFields: {
                Month: "Month",
                OcakAdi: "OcakAdi",
                KasaNo: "KasaNo",
                FirmaAdi: "FirmaAdi",
                SiparisAciklama: "SiparisAciklama",
                UrunAdi: "UrunAdi",
                BirimAdi: "BirimAdi",
                AlisFiyati: "AlisFiyati",
                Miktar: "Miktar",
                AlisToplam: "AlisToplam",

            },
        }
    },
    created(){
        const year = new Date().getFullYear();
        for(let i = 2020; i<=year; i++){
            this.years.push({'year':i});
        };
        this.listTotal = {
                alisToplam:0,
                miktar:0
            };

        this.$axios.get('/production/buying/price/list')
        .then(res=>{
            this.list = res.data.list;
            res.data.list.forEach(x=>{
                this.listTotal.alisToplam += x.AlisToplam;
                this.listTotal.miktar += x.Miktar;

            });
        });
        this.selectedYear = {'year':year};
    },
    methods:{
        yearSelected(event){
            this.listTotal = {
                alisToplam:0,
                miktar:0
            };
            this.$axios.get(`/production/buying/price/list/yearly/${event.value.year}`)
            .then(res=>{
                this.list = res.data.list;
                res.data.list.forEach(x=>{
                    this.listTotal.alisToplam += x.AlisToplam;
                    this.listTotal.miktar += x.Miktar;

                });
            })
        },
        filterSelected(event){
            this.listTotal = {
                alisToplam:0,
                miktar:0
            };
            event.filteredValue.forEach(x=>{
                this.listTotal.alisToplam += x.AlisToplam;
                this.listTotal.miktar += x.Miktar;

            });

        }
    }
}
</script>