<template>
    <div class="row mt-4 container m-auto">
        <Button class="mb-5" type="button" label="New Form" @click="newForm"/>
        <div class="col-sm-6">
            <span class="p-float-label">
                <Dropdown class="w-100" id="year" v-model="selectedYear" :options="years" optionLabel="year"  @change="yearSelected($event)"/>
                <label for="year">Year</label>
            </span>
        </div>
        <div class="col-sm-6">
            <span class="p-float-label">
                <Dropdown class="w-100"  id="month" v-model="selectedMonth" :options="months" optionLabel="month_name"  @change="monthSelected($event)"/>
                <label for="month">Month</label>
            </span>
        </div>
        {{ list }}
        <Dialog header="New Form" :visible.sync="cost_supplier_dialog"  modal>
            <div class="row mt-5">
                <div class="col-4">
                    <Calendar  id="date" :inline="true" v-model="selectedDate" dateFormat="dd.mm.yy" @date-select="dateSelected($event)"/>

                </div>
                <div class="col-8">
                    <div class="row mt-5">

                        <div class="col-4">
                            <span class="p-float-label ">
                                <AutoComplete :disabled="disabled_1" id="supplier" v-model="selectedSupplier" :suggestions="filteredSupplier" @complete="searchSupplier($event)" field="FirmaAdi" @item-select="supplierSelected($event)"
                                    @input="supplierInput($event)"
                                />
                                <label for="supplier">Tedarikçi</label>
                            </span>
                        </div>
                        <div class="col-4">
                            <span class="p-float-label">
                                <AutoComplete :disabled="disabled_2" id="quarry" v-model="selectedQuarry" :suggestions="filteredQuarry" @complete="searchQuarry($event)" field="OcakAdi" @item-select="quarrySelected($event)"
                                    @input="quarryInput($event)"
                                />
                                <label for="quarry">Ocaklar</label>
                            </span>
                        </div>
                        <div class="col-4">
                            <span class="p-float-label">
                                <AutoComplete :disabled="disabled_3" id="strip" v-model="selectedStrip" :suggestions="filteredStrip" @complete="searchStrip($event)" field="Strips" @item-select="stripSelected($event)"
                                    @input="stripInput($event)"
                                />
                                <label for="strip">Stripler</label>
                            </span>
                        </div>

                    </div>
                    <div class="row mt-5">
                        <div class="col">
                            <span class="p-float-label">
                                <InputText :disabled="disabled_4" class="w-100" id="strip_m2" type="text" v-model="model.stripM2" @input="disabled_5 = false"/>
                                <label for="strip_m2">Strip M2</label>
                            </span>
                        </div>
                        <div class="col">
                            <CustomInput
                            :value="model.stripPrice"
                            text="Strip Kesim Fiyatı"
                            @onInput="model.stripPrice = $event"
                            :disabled="disabled_5"
                            />
                        </div>
                        <div class="col">
                            <CustomInput
                            :value="model.stripCost"
                            text="Strip Maliyet Toplam"
                            @onInput="model.stripCost = $event"
                            :disabled="true"
                            />
                        </div>
                    </div>
                    <div class="row mt-4">
                        <div class="col">
                            <CustomInput
                        :value="model.supplierCost"
                        text="Moloz Fiyatı (TL)"
                        @onInput="model.supplierCost = $event"
                        />
                        </div>
                        
                        <div class="col">
                            <CustomInput
                        :value="model.currency"
                        text="Kur"
                        @onInput="model.currency = $event"
                        :disabled="true"
                        />
                        </div>
                        <div class="col">
                            <CustomInput
                        :value="model.supplierCostUsd"
                        text="Moloz Fiyatı ($)"
                        @onInput="model.supplierCostUsd = $event"
                        :disabled="true"
                        />
                        </div>
                        <div class="col">
                            <CustomInput
                        :value="model.produce_m2"
                        text="Üretilen M2"
                        @onInput="model.produce_m2 = $event"
                        :disabled="true"
                        />

                        </div>

                    </div>
                    <div class="row mt-4 text-center">
                        <div class="col text-center border">
                            <table class="table">
                                    <thead>
                                        <tr>
                                        <th scope="col">Maliyet (M2)</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <th scope="row">{{ model.cost | formatPriceUsd }}</th>

                                        </tr>

                                    </tbody>
                                    </table>


                        </div>
                    </div>
                </div>

            </div>

            <div class="row mt-4">
                <div class="col">
                    <Button  type="button" class="p-button-info w-100" label="Hesapla" :disabled="button_disabled" @click="calculate"/>
                </div>
                <div class="col">
                    <Button class="w-100 p-button-primary" type="button" label="Kaydet" :disabled="button_disabled" @click="process"/>
                </div>
            </div>


        </Dialog>

    </div>

</template>
<script>
import server from "@/plugins/excel.server";

export default {
    data(){
        return{
            years:[
                {'year':new Date().getFullYear()},
                {'year':new Date().getFullYear() - 1},

            ],
            selectedYear:{'year':new Date().getFullYear()},
            months:[],
            selectedMonth:null,
            suppliers:[],
            list:[],
            strips:[],
            quarries:[],
            cost_supplier_dialog:false,
            selectedSupplier:null,
            filteredSupplier:null,
            model:{
                'quarryName':null,
                'quarryId':null,
                'supplierName':null,
                'supplierId':null,
                'supplierCost':null,
                'stripId':null,
                'stripName':null,
                'stripPrice':null,
                'stripM2':0,
                'cost':null,
                'produce_m2':0,
                'currency':null,
                'date':null,
                'stripCost':0,
                'supplierCostUsd':0
            },
            selectedQuarry:null,
            filteredQuarry:null,
            selectedStrip:null,
            filteredStrip:null,
            selectedDate:null,
            new_button_status:false,
            disabled_1:true,
            disabled_2:true,
            disabled_3:true,
            disabled_4:true,
            disabled_5:true,
            disabled_6:true,
            button_disabled: false
        }
    },
    created(){
        const date = new Date();
        const month = date.getMonth();
        let _months = [];
        for(let i = 0;i <= month;i++){
            _months.push({'month_id':i,'month_name':''});
        };
        const _months_name = ['January','February','March','April','May','June','July','August','September','October','November','December'];


        _months = _months.map((item)=>{
            const new_item = {};
            new_item.month_name = _months_name[item.month_id];
            new_item.month_id = (item.month_id + 1);

            return new_item;
        });
        this.months = _months;
        this.selectedMonth = {'month_id':_months.length,'month_name':_months_name[_months.length - 1]};
        
        this.__created();




    },
    methods:{
        __created(){
            this.$axios.get(`/reports/mekmer/quarries/supplier/${this.selectedYear.year}/${this.selectedMonth.month_id}`)
        .then(res=>{
            this.suppliers = res.data.suppliers;
            this.list = res.data.list
            this.strips = res.data.strips;
            this.quarries = res.data.quarries;
        }).catch(err=>{
            console.log("err",err);
        })
        },
        yearSelected(event){
            
        },
        monthSelected(event){

        },
        searchSupplier(event){
            let results;
            if(event.query.lenght == 0){
                results = this.suppliers;
            }else{
                results = this.suppliers.filter(x=>{
                    return x.FirmaAdi.toUpperCase().startsWith(event.query.toUpperCase());
                });
            };
            this.filteredSupplier = results;
        },
        supplierSelected(event){
            this.model.supplierId = event.value.ID;
            this.model.supplierName = event.value.FirmaAdi;
        },
        supplierInput(event){
            this.model.supplierId = null;
            this.model.supplierName = event;
            this.disabled_2 = false;
        },
        searchQuarry(event){
            let results;
            if(event.query.lenght == 0){
                results = this.quarries;
            }else{
                results = this.quarries.filter(x=>{
                    return x.OcakAdi.toUpperCase().startsWith(event.query.toUpperCase());
                });
            };
            this.filteredQuarry = results;
        },
        quarrySelected(event){
            this.model.quarryId = event.value.ID;
            this.model.quarryName = event.value.OcakAdi;
            this.$axios.get(`/reports/mekmer/quarries/${event.value.ID}/${this.selectedYear.year}/${this.selectedMonth.month_id}`)
            .then(res=>{
                this.model.produce_m2 = res.data.total;
            }).catch(err=>{

            });
        },
        quarryInput(event){
            this.model.quarryId = null;
            this.model.quarryName = event;
            this.disabled_3 = false;
        },
        searchStrip(event){
            let results;
            if(event.query.lenght == 0){
                results = this.strips;
            }else{
                results = this.strips.filter(x=>{
                    return x.Strips.toUpperCase().startsWith(event.query.toUpperCase());
                });
            };
            this.filteredStrip = results;
        },
        stripSelected(event){
            this.model.stripId = event.value.ID;
            this.model.stripName = event.value.StripName;
        },
        stripInput(event){
            this.model.stripId = null;
            this.model.stripName = event;
            this.disabled_4 = false;
        },
        dateSelected(event){
            this.model.date = event;
            this.disabled_1 = false;
            const year = event.getFullYear();
      const month = event.getMonth() + 1;
      const day = event.getDate();
      server
        .get("/finance/doviz/liste/" + year + "/" + month + "/" + day)
        .then((response) => {
          this.model.currency = parseFloat(response.data);
        });
        },
        calculate(){
            if(this.__controlModel(this.model.date) && 
            this.__controlModel(this.model.supplierCost) &&
            this.__controlModel(this.model.stripPrice) &&
            this.__controlModel(this.model.stripM2) &&
            this.__controlModel(this.model.produce_m2) 
        
            ){
                const strip_cost = this.model.stripM2 * this.model.stripPrice;
                this.model.stripCost = strip_cost;
                const moloz_cost = (this.model.supplierCost / this.model.currency);
                this.model.supplierCostUsd = moloz_cost;
                const cost = (strip_cost + moloz_cost) / this.model.produce_m2;
                this.model.cost = cost;
             }else{
                this.$toast.error('Lütfen tüm değerleri giriniz!');

            }

        },
        newForm(){
            this.new_button_status = true;
            this.cost_supplier_dialog = true;

        },
        reset(){
            this.selectedSupplier = null;
            this.model = {
                'quarryName':null,
                'quarryId':null,
                'supplierName':null,
                'supplierId':null,
                'supplierCost':null,
                'stripId':null,
                'stripName':null,
                'stripPrice':null,
                'stripM2':0,
                'cost':null,
                'produce_m2':0,
                'currency':null,
                'date':null,
                'stripCost':0,
                'supplierCostUsd':0
            },
            this.selectedQuarry = null;
            this.selectedStrip = null;
            this.selectedDate=null;
            this.disabled_1 = true;
            this.disabled_2 = true;
            this.disabled_3 = true;
            this.disabled_4 = true;
            this.disabled_5 = true;
            this.disabled_6 = true;
        },
        process(){
            if(this.new_button_status) this.save();
            else this.update();
        },
        save(){
            this.$store.dispatch('setBeginLoadingAction');
            this.$axios.post('/reports/mekmer/quarries/supplier/save',this.model)
            .then(status=>{
                if(status){
                    this.$toast.success('Başarıyla Kaydedildi.');
            this.$store.dispatch('setEndLoadingAction');
            this.__created();

                } 
            }).catch(err=>{
                this.$toast.error('Kaydetme başarısız...');
            this.$store.dispatch('setEndLoadingAction');
                

            })
        },
        __controlModel(val){
            if(val == null || val == '' || val == '' || val == undefined || val == 0){
                return false;
            }else{
                return true;
            }
        }
        
    },
    watch:{

    }
}
</script>