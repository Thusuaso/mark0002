<template>
    <div class="row mt-4  m-auto ml-2 mr-2">
        <div class="row m-auto text-center">
            <div class="col-sm-3">
                <Button class="w-100 mb-5 p-button-success" type="button" label="Yeni Strip" @click="newForm"/>

            </div>
            <div class="col-sm-3">
                <Button class="w-100 mb-5 p-button-info" type="button" label="Excel Stripler" @click="excel_strip_output"/>

            </div>
            <div class="col-sm-3">
                <Button class="w-100 mb-5 p-button-success" type="button" label="Yeni Moloz" @click="newFormMoloz"/>

            </div>
            <div class="col-sm-3">
                <Button class="w-100 mb-5 p-button-info" type="button" label="Excel Molozlar" @click="excel_strip_output_moloz"/>

            </div>

        </div>
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
        <div class="row m-auto text-center">
            <div class="col-6">
                <DataTable :value="list" responsiveLayout="scroll" class="p-datatable-sm" :resizableColumns="true" columnResizeMode="fit" showGridlines
                :selection.sync="selectedStripData" selectionMode="single"
                @row-click="stripDataSelected($event)"
                >
                <template #header>STRIPLER</template>
                    <Column field="Date" header="Tarih">
                        <template #body="slotProps">
                            {{ slotProps.data.Date | dateToString }}
                        </template>
                    </Column>
                    <Column field="Supplier" header="Tedarikçi Adı">
                        <template #body="slotProps">
                            {{ _getSupplierName(slotProps.data.Supplier) }}
                        </template>
                    </Column>
                    <Column field="Quarry" header="Ocak Adı">
                        <template #body="slotProps">
                            {{ _getQuarryName(slotProps.data.Quarry) }}
                        </template>
                    </Column>
                    <Column field="Strip" header="Strip Adı">
                        <template #body="slotProps">
                            {{ _getStripName(slotProps.data.Strip) }}
                        </template>
                    </Column>
                    <Column field="StripM2" header="Strip (M2)">
                        <template #body="slotProps">
                            {{ slotProps.data.StripM2 | formatDecimal }}
                        </template>
                        <template #footer>
                            {{ total.m2 | formatDecimal }}
                        </template>
                    </Column>
                    <Column field="StripPrice" header="Strip ($)">
                        <template #body="slotProps">
                            {{ slotProps.data.StripPrice | formatPriceUsd }}
                        </template>
                    </Column>
                    <Column field="StripCost" header="Strip Toplam ($)">
                        <template #body="slotProps">
                            {{ slotProps.data.StripCost | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ total.cost | formatPriceUsd }}
                        </template>
                    </Column>
                    <Column field="StripWidth" header="En">
                        <template #body="slotProps">
                            {{ slotProps.data.StripWidth }}
                        </template>
                    </Column>
                    <Column field="StripHeight" header="Boy">
                        <template #body="slotProps">
                            {{ slotProps.data.StripHeight }}
                        </template>
                    </Column>
                    <Column field="StripPiece" header="Adet">
                        <template #body="slotProps">
                            {{ slotProps.data.StripPiece }}
                        </template>
                        <template #footer>
                            {{ total.piece }}
                        </template>
                    </Column>
                </DataTable>

            </div>
        </div>
        <Dialog :header="dialog_header" :visible.sync="cost_supplier_dialog"  modal style="width:100%;">
            <div class="row mt-5">
                <div class="col-4">
                    <Calendar style="width:500px;"  id="date" :inline="true" v-model="selectedDate" dateFormat="dd.mm.yy" @date-select="dateSelected($event)"/>

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
                            <CustomInput
                            :value="model.stripM2"
                            text="Strip M2"
                            @onInput="model.stripM2 = $event"
                            
                            />

                        </div>
                        <div class="col">
                            <CustomInput
                            :value="model.stripPrice"
                            text="Strip Kesim Fiyatı"
                            @onInput="model.stripPrice = $event"
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
                    <div class="row mt-5">
                            <div class="col">
                            <CustomInput
                            :value="model.stripWidth"
                            text="Strip En"
                            @onInput="model.stripWidth = $event"
                            />
                        </div>
                        <div class="col">
                            <CustomInput
                            :value="model.stripHeight"
                            text="Strip Boy"
                            @onInput="model.stripHeight = $event"
                            />
                        </div>
                        <div class="col">
                            <CustomInput
                            :value="model.stripPiece"
                            text="Strip Adet"
                            @onInput="model.stripPiece = $event"
                            />
                        </div>
                    </div>


                </div>

            </div>

            <div class="row mt-4">
                <div class="col">
                    <Button  type="button" class="p-button-info w-100" label="Hesapla"  @click="calculate"/>
                </div>
                <div class="col">
                    <Button class="w-100 p-button-primary" type="button" label="Kaydet" :disabled="button_disabled_2" @click="process"/>
                </div>
                <div class="col" v-if="!new_button_status">
                    <Button class="w-100 p-button-danger" type="button" label="Sil"  @click="deleteProcess"/>
                </div>
            </div>


        </Dialog>
        <Dialog :header="dialog_header_moloz" :visible.sync="cost_supplier_dialog_moloz"  modal style="width:100%;">
            <Dropdown class="mt-3" v-model="selectedCurrencyStatus" :options="currency_status" optionLabel="currency" placeholder="USD // TL" @change="disabled_calendar_moloz = false"/>

            <div class="row mt-5">
                <div class="col-4">
                    <Calendar :disabled="disabled_calendar_moloz" style="width:500px;"  id="date" :inline="true" v-model="selectedDate" dateFormat="dd.mm.yy" @date-select="dateSelectedMoloz($event)"/>

                </div>
                <div class="col-8">
                    <div class="row mt-5">

                        <div class="col-4">
                            <span class="p-float-label ">
                                <AutoComplete :disabled="disabled_1" id="supplier" v-model="selectedSupplier" :suggestions="filteredSupplier" @complete="searchSupplier($event)" field="FirmaAdi" @item-select="supplierSelectedMoloz($event)"
                                    @input="supplierInputMoloz($event)"
                                />
                                <label for="supplier">Tedarikçi</label>
                            </span>
                        </div>
                        <div class="col-4">
                            <span class="p-float-label">
                                <AutoComplete :disabled="disabled_2" id="quarry" v-model="selectedQuarry" :suggestions="filteredQuarry" @complete="searchQuarry($event)" field="OcakAdi" @item-select="quarrySelectedMoloz($event)"
                                    @input="quarryInputMoloz($event)"
                                />
                                <label for="quarry">Ocaklar</label>
                            </span>
                        </div>
                        <div class="col-4">
                            <span class="p-float-label">
                                <AutoComplete :disabled="disabled_3" id="strip" v-model="selectedStrip" :suggestions="filteredStrip" @complete="searchStrip($event)" field="Strips" @item-select="stripSelectedMoloz($event)"
                                    @input="stripInputMoloz($event)"
                                />
                                <label for="strip">Stripler</label>
                            </span>
                        </div>

                    </div>
                    <div class="row mt-5">
                        <div class="col">
                            <CustomInput
                            :value="moloz_model.ton"
                            text="Tonaj"
                            @onInput="moloz_model.ton = $event"
                            
                            />

                        </div>
                        <div class="col">
                            <CustomInput
                            :value="moloz_model.price"
                            text="Fiyat"
                            @onInput="moloz_model.price = $event"
                            />
                        </div>
                        <div class="col">
                            <CustomInput
                            :value="moloz_model.total"
                            text="Toplam"
                            @onInput="moloz_model.total = $event"
                            :disabled="true"
                            />
                        </div>
                    </div>



                </div>

            </div>

            <div class="row mt-4">
                <div class="col">
                    <Button  type="button" class="p-button-info w-100" label="Hesapla"  @click="calculateMoloz"/>
                </div>
                <div class="col">
                    <Button class="w-100 p-button-primary" type="button" label="Kaydet" :disabled="button_disabled_2" @click="processMoloz"/>
                </div>
                <div class="col" v-if="!new_button_status_moloz">
                    <Button class="w-100 p-button-danger" type="button" label="Sil"  @click="deleteProcessMoloz"/>
                </div>
            </div>


        </Dialog>

    </div>

</template>
<script>
import server from "../../../plugins/excel.server";
import date from "../../../plugins/date";
import {mapGetters} from 'vuex';
export default {
    computed:{
        ...mapGetters(['getLocalUrl'])
    },
    data(){
        return{
            disabled_calendar_moloz:true,
            selectedCurrencyStatus:null,
            dialog_header_moloz:'',
            cost_supplier_dialog_moloz:false,
            dialog_header:'',
            selectedStripData:{},
            button_disabled_2:true,
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
                'stripId':null,
                'stripName':null,
                'stripPrice':null,
                'stripM2':0,
                'date':null,
                'stripCost':0,
                'stripWidth':0,
                'stripHeight':0,
                'stripPiece':0,
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
            button_disabled: false,
            total:{
                'm2':0,
                'cost':0,
                'piece':0
            },
            moloz_model:{
                'id':0,
                'date':null,
                'quarryId':null,
                'quarryName':null,
                'supplierId':null,
                'supplierName':null,
                'stripId':null,
                'stripName':null,
                'ton':null,
                'price':0,
                'total':0,
                'currency':0
            },
            new_button_status_moloz:false,
            currency_status:[
                {'id':1,'currency':'USD'},
                {'id':2,'currency':'TL'}

            ]
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
        updateMoloz(){

        },
        saveMoloz(){
            console.log(this.moloz_model)
        },
        deleteProcessMoloz(){

        },
        processMoloz(){
            if(this.new_button_status_moloz){
                this.saveMoloz();
            }else{
                this.updateMoloz();
            }
        },
        calculateMoloz(){
            this.moloz_model.total = (parseFloat(this.moloz_model.ton) * parseFloat(this.moloz_model.price));
            this.button_disabled_2 = false
        },
        stripInputMoloz(event){
            this.moloz_model.stripId = null;
            this.moloz_model.stripName = event;
            this.disabled_4 = false;
        },
        stripSelectedMoloz(event){
            this.moloz_model.stripId = event.value.ID;
            this.moloz_model.stripName = event.value.StripName;
        },
        quarryInputMoloz(event){
            this.moloz_model.quarryId = null;
            this.moloz_model.quarryName = event;
            this.disabled_3 = false;
        },
        quarrySelectedMoloz(event){
            this.moloz_model.quarryId = event.value.ID;
            this.moloz_model.quarryName = event.value.OcakAdi;
        },
        dateSelectedMoloz(event){
            this.moloz_model.date = event;
            this.disabled_1 = false;
            const year = event.getFullYear();
            const month = event.getMonth() + 1;
            const day = event.getDate();
            server
                .get("/finance/doviz/liste/" + year + "/" + month + "/" + day)
                .then((response) => {
                this.moloz_model.currency = parseFloat(response.data);
                });

        },
        supplierInputMoloz(event){
            this.moloz_model.supplierId = null;
            this.moloz_model.supplierName = event;
            this.disabled_2 = false;

        },
        supplierSelectedMoloz(event){
            this.moloz_model.supplierId = event.value.ID;
            this.moloz_model.supplierName = event.value.FirmaAdi;
        },
        newFormMoloz(){
            this.dialog_header_moloz = 'Yeni Moloz Ekle';
            this.cost_supplier_dialog_moloz = true;
            this.reset();
            this.new_button_status_moloz = true;
        },
        excel_strip_output_moloz(){

        },
        deleteProcess(){
            this.$axios.delete(`/reports/mekmer/quarries/supplier/strips/delete/${this.model.Id}`)
            .then(res=>{
                if(res.status){
                    this.cost_supplier_dialog = false;
                    this.$toast.success('Başarıyla Silindi');
                    this.__created();
                }else{
                    this.$toast.error('Silme Başarısız');
                }
            })
        },
        totalStrips(payload){
            this.total = {
                'm2':0,
                'cost':0,
                'piece':0
            };
            payload.forEach(x=>{
                this.total.m2 += x.StripM2;
                this.total.cost += x.StripCost;
                this.total.piece += x.StripPiece;
            })
        },
        excel_strip_output(){

            server.post('/reports/mekmer/strips/excel',this.list)
            .then(res=>{
                if (res.status) {
                    const link = document.createElement("a");
                    link.href = this.getLocalUrl + "reports/mekmer/strips/excel";

                    link.setAttribute("download", "reports_mekmer_strips.xlsx");
                    document.body.appendChild(link);
                    link.click();
                }
            })
        },
        stripDataSelected(event){
            this.new_button_status = false;
            this.cost_supplier_dialog = true;
            this.button_disabled_2 = true;
            this.model.Id = event.data.ID;
            this.model.date = event.data.Date;
            this.model.supplierId = event.data.Supplier;
            this.model.quarryId = event.data.Quarry;
            this.model.stripCost = event.data.StripCost;
            this.model.stripId = event.data.Strip;
            this.model.stripPrice = event.data.StripPrice;
            this.model.stripM2 = event.data.StripM2;
            this.model.stripWidth = event.data.StripWidth;
            this.model.stripHeight = event.data.StripHeight;
            this.model.stripPiece = event.data.StripPiece;
            this.selectedDate = date.stringToDate(event.data.Date);
            this.selectedSupplier = this.suppliers.find(x=>{
                return x.ID = event.data.Supplier;
            });
            this.selectedQuarry = this.quarries.find(x=>{
                return x.ID = event.data.Quarry;
            });
            this.selectedStrip = this.strips.find(x=>{
                return x.ID = event.data.Strip;
            });
            this.dialog_header = this.selectedQuarry.OcakAdi + ' - ' + this.selectedStrip.Strips ;


        },  
        dateSelected (event){
            this.model.date = event;
            this.disabled_1 = false;
        },
        calculate(){
            this.model.stripCost = (parseFloat(this.model.stripM2) * parseFloat(this.model.stripPrice));
            this.model.stripPiece = Math.ceil((parseFloat(this.model.stripWidth) / 100) * (parseFloat(this.model.stripHeight) / 100) * (parseFloat(this.model.stripM2)));
            this.button_disabled_2 = false

        },
        __created(){
            this.$axios.get(`/reports/mekmer/quarries/supplier/${this.selectedYear.year}/${this.selectedMonth.month_id}`)
        .then(res=>{
            this.suppliers = res.data.suppliers;
            this.list = res.data.list
            this.strips = res.data.strips;
            this.quarries = res.data.quarries;
            this.totalStrips(res.data.list);
        }).catch(err=>{
            console.log("err",err);
        })
        },
        yearSelected(event){
            
        },
        monthSelected(event){
            this.$axios.get(`/reports/mekmer/quarries/supplier/${this.selectedYear.year}/${this.selectedMonth.month_id}`)
            .then(res=>{
                this.suppliers = res.data.suppliers;
                this.list = res.data.list
                this.strips = res.data.strips;
                this.quarries = res.data.quarries;
            });
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


        newForm(){
            this.dialog_header = 'New Form';
            this.new_button_status = true;
            this.cost_supplier_dialog = true;
            this.reset();


        },
        reset(){
            this.selectedSupplier = null;
            this.model = {
                'quarryName':null,
                'quarryId':null,
                'supplierName':null,
                'supplierId':null,
                'stripId':null,
                'stripName':null,
                'stripPrice':null,
                'stripM2':0,
                'date':null,
                'stripCost':0,
                'stripWidth':0,
                'stripHeight':0,
                'stripPiece':0
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
            this.moloz_model={
                'id':0,
                'date':null,
                'quarryId':null,
                'quarryName':null,
                'supplierId':null,
                'supplierName':null,
                'stripId':null,
                'stripName':null,
                'ton':null,
                'price':0,
                'total':0,
                'currency':0
            };
        },
        process(){
            if(this.new_button_status) this.save();
            else this.update();
        },
        save(){
            this.$store.dispatch('setBeginLoadingAction');
            this.$axios.post('/reports/mekmer/quarries/supplier/strips/save',this.model)
            .then(status=>{
                if(status){
                    this.$toast.success('Başarıyla Kaydedildi.');
            this.$store.dispatch('setEndLoadingAction');
            this.__created();
            this.reset();

                } 
            }).catch(err=>{
                this.$toast.error('Kaydetme başarısız...');
            this.$store.dispatch('setEndLoadingAction');
                

            })
        },
        update(){
            this.$axios.put('/reports/mekmer/quarries/supplier/strips/update',this.model)
            .then(res=>{
                if(res.status){
                    this.$toast.success('Başarıyla Güncellendi.');
                    this.__created();

                }else{
                    this.$toast.error('Güncelleme başarısız...');
                }
            })
        },
        __controlModel(val){
            if(val == null || val == '' || val == '' || val == undefined || val == 0){
                return false;
            }else{
                return true;
            }
        },
        _getSupplierName(_id){
            let name = this.suppliers.find(x=>{
                return x.ID = _id;
            }).FirmaAdi;
            return name;
        },
        _getQuarryName(_id){
            let name = this.quarries.find(x=>{
                return x.ID = _id;
            }).OcakAdi;
            return name;
        },
        _getStripName(_id){
            let name = this.strips.find(x=>{
                return x.ID = _id;
            }).Strips;
            return name;
        }
        
    },
    watch:{

    }
}
</script>