<template>
    <div class="row m-auto text-center">
        <div class="col">
            <Dropdown v-model="selectedUser" :options="users" optionLabel="username" placeholder="Select a User"
            style="width:50%;" @change="userSelected($event)" />
        </div>
        <div class="row m-auto-text-center">
            <div class="col-sm-4">
                <DataTable :value="representative_this_year_total" responsiveLayout="scroll"
                    class="p-datatable-sm"
                >
            <template #header>
                {{ new Date().getFullYear() }} Seller Profit
            </template>
            <Column field="month" header="Month">
                <template #body="slotProps">
                    {{ getMonthName(slotProps.data.month) }}
                </template>

            </Column>
            <Column field="profit_usd" header="Profit ($)">
                <template #body="slotProps">
                    {{ slotProps.data.profit_usd | formatPriceUsd }}
                </template>
                <template #footer>
                    {{ representative_this_year_sum.profit_usd | formatPriceUsd }}
                </template>
            </Column>
            <Column field="profit_tl" header="Profit (₺)">
                <template #body="slotProps">
                    {{ slotProps.data.profit_tl | formatPriceTl }}
                </template>
                <template #footer>
                    {{ representative_this_year_sum.profit_tl | formatPriceTl }}
                </template>
            </Column>
            </DataTable>
            </div>
            <div class="col-sm-4">
                <DataTable :value="representative_two_year_total" responsiveLayout="scroll"
                    class="p-datatable-sm"
                >
            <template #header>
                {{ new Date().getFullYear() - 1 }} Seller Profit
            </template>
            <Column field="month" header="Month">
                <template #body="slotProps">
                    {{ getMonthName(slotProps.data.month) }}
                </template>
            </Column>
            <Column field="profit_usd" header="Profit ($)">
                <template #body="slotProps">
                    {{ slotProps.data.profit_usd | formatPriceUsd }}
                </template>
                <template #footer>
                    {{ representative_one_year_sum.profit_usd | formatPriceUsd }}
                </template>
            </Column>
            <Column field="profit_tl" header="Profit (₺)">
                <template #body="slotProps">
                    {{ slotProps.data.profit_tl | formatPriceTl }}
                </template>
                <template #footer>
                    {{ representative_one_year_sum.profit_tl | formatPriceTl }}
                </template>
            </Column>
                </DataTable>
            </div>
            <div class="col-sm-4">
                <DataTable :value="representative_three_year_total" responsiveLayout="scroll"
                    class="p-datatable-sm"
                >
            <template #header>
                {{ new Date().getFullYear() - 2 }} Seller Profit
            </template>
            <Column field="month" header="Month">
                <template #body="slotProps">
                    {{ getMonthName(slotProps.data.month) }}
                </template>
            </Column>
            <Column field="profit_usd" header="Profit ($)">
                <template #body="slotProps">
                    {{ slotProps.data.profit_usd | formatPriceUsd }}
                </template>
                <template #footer>
                    {{ representative_two_year_sum.profit_usd | formatPriceUsd }}
                </template>
            </Column>
            <Column field="profit_tl" header="Profit (₺)">
                <template #body="slotProps">
                    {{ slotProps.data.profit_tl | formatPriceTl }}
                </template>
                <template #footer>
                    {{ representative_two_year_sum.profit_tl | formatPriceTl }}
                </template>
            </Column>
                </DataTable>
            </div>
        </div>

        <div class="row m-auto-text-center">
            <div class="col-sm-4">
                <DataTable :value="operation_this_year_total" responsiveLayout="scroll"
                    class="p-datatable-sm"
                >
            <template #header>
                {{ new Date().getFullYear() }} Operation Profit
            </template>
            <Column field="month" header="Month">
                <template #body="slotProps">
                    {{ getMonthName(slotProps.data.month) }}
                </template>

            </Column>
            <Column field="profit_usd" header="Profit ($)">
                <template #body="slotProps">
                    {{ slotProps.data.profit_usd | formatPriceUsd }}
                </template>
                <template #footer>
                    {{ operation_this_year_sum.profit_usd | formatPriceUsd }}
                </template>
            </Column>
            <Column field="profit_tl" header="Profit (₺)">
                <template #body="slotProps">
                    {{ slotProps.data.profit_tl | formatPriceTl }}
                </template>
                <template #footer>
                    {{ operation_this_year_sum.profit_tl | formatPriceTl }}
                </template>
            </Column>
            </DataTable>
            </div>
            <div class="col-sm-4">
                <DataTable :value="operation_two_year_total" responsiveLayout="scroll"
                    class="p-datatable-sm"
                >
            <template #header>
                {{ new Date().getFullYear() - 1 }} Operation Profit
            </template>
            <Column field="month" header="Month">
                <template #body="slotProps">
                    {{ getMonthName(slotProps.data.month) }}
                </template>
            </Column>
            <Column field="profit_usd" header="Profit ($)">
                <template #body="slotProps">
                    {{ slotProps.data.profit_usd | formatPriceUsd }}
                </template>
                <template #footer>
                    {{ operation_one_year_sum.profit_usd | formatPriceUsd }}
                </template>
            </Column>
            <Column field="profit_tl" header="Profit (₺)">
                <template #body="slotProps">
                    {{ slotProps.data.profit_tl | formatPriceTl }}
                </template>
                <template #footer>
                    {{ operation_one_year_sum.profit_tl | formatPriceTl }}
                </template>
            </Column>
                </DataTable>
            </div>
            <div class="col-sm-4">
                <DataTable :value="operation_three_year_total" responsiveLayout="scroll"
                    class="p-datatable-sm"
                >
            <template #header>
                {{ new Date().getFullYear() - 2 }} Operation Profit
            </template>
            <Column field="month" header="Month">
                <template #body="slotProps">
                    {{ getMonthName(slotProps.data.month) }}
                </template>
            </Column>
            <Column field="profit_usd" header="Profit ($)">
                <template #body="slotProps">
                    {{ slotProps.data.profit_usd | formatPriceUsd }}
                </template>
                <template #footer>
                    {{ operation_two_year_sum.profit_usd | formatPriceUsd }}
                </template>
            </Column>
            <Column field="profit_tl" header="Profit (₺)">
                <template #body="slotProps">
                    {{ slotProps.data.profit_tl | formatPriceTl }}
                </template>
                <template #footer>
                    {{ operation_two_year_sum.profit_tl | formatPriceTl }}
                </template>
            </Column>
                </DataTable>
            </div>
        </div>



    </div>

</template>
<script>

export default {
    computed:{
    },
    props:{
        thisyear:{
            type:Array,
            required:true
        },
        oneyear:{
            type:Array,
            required:true
        },
        twoyear:{
            type:Array,
            required:true
        }
    },
    data(){
        return{
            selectedUser:null,
            users: [
            { 'id': 13, 'username': 'Mehmet' },

                { 'id': 44, 'username': 'Hakan' },
                { 'id': 19, 'username': 'Ozlem' },
                { 'id': 10, 'username': 'Gizem' },
                

            ],
            operation_this_year:[],
            representative_this_year:[],
            operation_two_year:[],
            representative_two_year:[],
            operation_three_year:[],
            representative_three_year:[],

            operation_this_year_total:[
                {'month':1,'profit_tl':0,'profit_usd':0},
                {'month':2,'profit_tl':0,'profit_usd':0},
                {'month':3,'profit_tl':0,'profit_usd':0},
                {'month':4,'profit_tl':0,'profit_usd':0},
                {'month':5,'profit_tl':0,'profit_usd':0},
                {'month':6,'profit_tl':0,'profit_usd':0},
                {'month':7,'profit_tl':0,'profit_usd':0},
                {'month':8,'profit_tl':0,'profit_usd':0},
                {'month':9,'profit_tl':0,'profit_usd':0},
                {'month':10,'profit_tl':0,'profit_usd':0},
                {'month':11,'profit_tl':0,'profit_usd':0},
                {'month':12,'profit_tl':0,'profit_usd':0}
            ],
            operation_two_year_total:[
            {'month':1,'profit_tl':0,'profit_usd':0},
                {'month':2,'profit_tl':0,'profit_usd':0},
                {'month':3,'profit_tl':0,'profit_usd':0},
                {'month':4,'profit_tl':0,'profit_usd':0},
                {'month':5,'profit_tl':0,'profit_usd':0},
                {'month':6,'profit_tl':0,'profit_usd':0},
                {'month':7,'profit_tl':0,'profit_usd':0},
                {'month':8,'profit_tl':0,'profit_usd':0},
                {'month':9,'profit_tl':0,'profit_usd':0},
                {'month':10,'profit_tl':0,'profit_usd':0},
                {'month':11,'profit_tl':0,'profit_usd':0},
                {'month':12,'profit_tl':0,'profit_usd':0}
            ],
            operation_three_year_total:[
            {'month':1,'profit_tl':0,'profit_usd':0},
                {'month':2,'profit_tl':0,'profit_usd':0},
                {'month':3,'profit_tl':0,'profit_usd':0},
                {'month':4,'profit_tl':0,'profit_usd':0},
                {'month':5,'profit_tl':0,'profit_usd':0},
                {'month':6,'profit_tl':0,'profit_usd':0},
                {'month':7,'profit_tl':0,'profit_usd':0},
                {'month':8,'profit_tl':0,'profit_usd':0},
                {'month':9,'profit_tl':0,'profit_usd':0},
                {'month':10,'profit_tl':0,'profit_usd':0},
                {'month':11,'profit_tl':0,'profit_usd':0},
                {'month':12,'profit_tl':0,'profit_usd':0}
            ],


            representative_this_year_total:[
            {'month':1,'profit_tl':0,'profit_usd':0},
                {'month':2,'profit_tl':0,'profit_usd':0},
                {'month':3,'profit_tl':0,'profit_usd':0},
                {'month':4,'profit_tl':0,'profit_usd':0},
                {'month':5,'profit_tl':0,'profit_usd':0},
                {'month':6,'profit_tl':0,'profit_usd':0},
                {'month':7,'profit_tl':0,'profit_usd':0},
                {'month':8,'profit_tl':0,'profit_usd':0},
                {'month':9,'profit_tl':0,'profit_usd':0},
                {'month':10,'profit_tl':0,'profit_usd':0},
                {'month':11,'profit_tl':0,'profit_usd':0},
                {'month':12,'profit_tl':0,'profit_usd':0}
            ],
            representative_two_year_total:[
            {'month':1,'profit_tl':0,'profit_usd':0},
                {'month':2,'profit_tl':0,'profit_usd':0},
                {'month':3,'profit_tl':0,'profit_usd':0},
                {'month':4,'profit_tl':0,'profit_usd':0},
                {'month':5,'profit_tl':0,'profit_usd':0},
                {'month':6,'profit_tl':0,'profit_usd':0},
                {'month':7,'profit_tl':0,'profit_usd':0},
                {'month':8,'profit_tl':0,'profit_usd':0},
                {'month':9,'profit_tl':0,'profit_usd':0},
                {'month':10,'profit_tl':0,'profit_usd':0},
                {'month':11,'profit_tl':0,'profit_usd':0},
                {'month':12,'profit_tl':0,'profit_usd':0}
            ],
            representative_three_year_total:[
            {'month':1,'profit_tl':0,'profit_usd':0},
                {'month':2,'profit_tl':0,'profit_usd':0},
                {'month':3,'profit_tl':0,'profit_usd':0},
                {'month':4,'profit_tl':0,'profit_usd':0},
                {'month':5,'profit_tl':0,'profit_usd':0},
                {'month':6,'profit_tl':0,'profit_usd':0},
                {'month':7,'profit_tl':0,'profit_usd':0},
                {'month':8,'profit_tl':0,'profit_usd':0},
                {'month':9,'profit_tl':0,'profit_usd':0},
                {'month':10,'profit_tl':0,'profit_usd':0},
                {'month':11,'profit_tl':0,'profit_usd':0},
                {'month':12,'profit_tl':0,'profit_usd':0}
            ],

            representative_this_year_sum:{
                profit_tl:0,
                profit_usd:0
            },
            representative_one_year_sum:{
                profit_tl:0,
                profit_usd:0
            },
            representative_two_year_sum:{
                profit_tl:0,
                profit_usd:0
            },

            operation_this_year_sum:{
                profit_tl:0,
                profit_usd:0
            },
            operation_one_year_sum:{
                profit_tl:0,
                profit_usd:0
            },
            operation_two_year_sum:{
                profit_tl:0,
                profit_usd:0
            }
        }
    },
    created(){

    },
    methods:{
        getMonthName(value) {
            const data = [
                { id: 1, name: 'January' },
                { id: 2, name: 'February' },
                { id: 3, name: 'March' },
                { id: 4, name: 'April' },
                { id: 5, name: 'May' },
                { id: 6, name: 'June' },
                { id: 7, name: 'July' },
                { id: 8, name: 'August' },
                { id: 9, name: 'September' },
                { id: 10, name: 'October' },
                { id: 11, name: 'November' },
                { id: 12, name: 'December' },
            ];
            return data.find(item => item.id === value).name;
        },
        userSelected(event){
            this.representative_this_year_sum = {
                profit_tl:0,
                profit_usd:0
            };
            this.representative_one_year_sum= {
                profit_tl:0,
                profit_usd:0
            };
            this.representative_two_year_sum = {
                profit_tl:0,
                profit_usd:0
            };

            this.operation_this_year_sum = {
                profit_tl:0,
                profit_usd:0
            };
            this.operation_one_year_sum = {
                profit_tl:0,
                profit_usd:0
            };
            this.operation_two_year_sum = {
                profit_tl:0,
                profit_usd:0
            };

            this.operation_this_year = this.thisyear.filter(x=>{
                return (x.operasyon == event.value.username);
            });
            this.representative_this_year = this.thisyear.filter(x=>{
                return (x.siparisci == event.value.username);
            });

            this.operation_two_year = this.oneyear.filter(x=>{
                return (x.operasyon == event.value.username);
            });
            this.representative_two_year = this.oneyear.filter(x=>{
                return (x.siparisci == event.value.username);
            });

            this.operation_three_year = this.twoyear.filter(x=>{
                return (x.operasyon == event.value.username);
            });
            this.representative_three_year = this.twoyear.filter(x=>{
                return (x.siparisci == event.value.username);
            });


            if(this.representative_this_year.length >0){
                this.representative_this_year.forEach(x=>{
                this.representative_this_year_sum.profit_tl += x.kar_zarar_tl;
                this.representative_this_year_sum.profit_usd += x.kar_zarar;
                if(x.yukleme_month == 1){
                    this.representative_this_year_total[0].profit_tl += x.kar_zarar_tl;
                    this.representative_this_year_total[0].profit_usd += x.kar_zarar;
                } else if(x.yukleme_month == 2){
                    this.representative_this_year_total[1].profit_tl += x.kar_zarar_tl;
                    this.representative_this_year_total[1].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 3){
                    this.representative_this_year_total[2].profit_tl += x.kar_zarar_tl;
                    this.representative_this_year_total[2].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 4){
                    this.representative_this_year_total[3].profit_tl += x.kar_zarar_tl;
                    this.representative_this_year_total[3].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 5){
                    this.representative_this_year_total[4].profit_tl += x.kar_zarar_tl;
                    this.representative_this_year_total[4].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 6){
                    this.representative_this_year_total[5].profit_tl += x.kar_zarar_tl;
                    this.representative_this_year_total[5].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 7){
                    this.representative_this_year_total[6].profit_tl += x.kar_zarar_tl;
                    this.representative_this_year_total[6].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 8){
                    this.representative_this_year_total[7].profit_tl += x.kar_zarar_tl;
                    this.representative_this_year_total[7].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 9){
                    this.representative_this_year_total[8].profit_tl += x.kar_zarar_tl;
                    this.representative_this_year_total[8].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 10){
                    this.representative_this_year_total[9].profit_tl += x.kar_zarar_tl;
                    this.representative_this_year_total[9].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 11){
                    this.representative_this_year_total[10].profit_tl += x.kar_zarar_tl;
                    this.representative_this_year_total[10].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 12){
                    this.representative_this_year_total[11].profit_tl += x.kar_zarar_tl;
                    this.representative_this_year_total[11].profit_usd += x.kar_zarar;
                }
            });
            }else{
                this.representative_this_year_total = [
            {'month':1,'profit_tl':0,'profit_usd':0},
                {'month':2,'profit_tl':0,'profit_usd':0},
                {'month':3,'profit_tl':0,'profit_usd':0},
                {'month':4,'profit_tl':0,'profit_usd':0},
                {'month':5,'profit_tl':0,'profit_usd':0},
                {'month':6,'profit_tl':0,'profit_usd':0},
                {'month':7,'profit_tl':0,'profit_usd':0},
                {'month':8,'profit_tl':0,'profit_usd':0},
                {'month':9,'profit_tl':0,'profit_usd':0},
                {'month':10,'profit_tl':0,'profit_usd':0},
                {'month':11,'profit_tl':0,'profit_usd':0},
                {'month':12,'profit_tl':0,'profit_usd':0}
            ];
            };



            if(this.representative_two_year.length >0){
                this.representative_two_year.forEach(x=>{
                this.representative_one_year_sum.profit_tl += x.kar_zarar_tl;
                this.representative_one_year_sum.profit_usd += x.kar_zarar;
                if(x.yukleme_month == 1){
                    this.representative_two_year_total[0].profit_tl += x.kar_zarar_tl;
                    this.representative_two_year_total[0].profit_usd += x.kar_zarar;
                } else if(x.yukleme_month == 2){
                    this.representative_two_year_total[1].profit_tl += x.kar_zarar_tl;
                    this.representative_two_year_total[1].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 3){
                    this.representative_two_year_total[2].profit_tl += x.kar_zarar_tl;
                    this.representative_two_year_total[2].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 4){
                    this.representative_two_year_total[3].profit_tl += x.kar_zarar_tl;
                    this.representative_two_year_total[3].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 5){
                    this.representative_two_year_total[4].profit_tl += x.kar_zarar_tl;
                    this.representative_two_year_total[4].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 6){
                    this.representative_two_year_total[5].profit_tl += x.kar_zarar_tl;
                    this.representative_two_year_total[5].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 7){
                    this.representative_two_year_total[6].profit_tl += x.kar_zarar_tl;
                    this.representative_two_year_total[6].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 8){
                    this.representative_two_year_total[7].profit_tl += x.kar_zarar_tl;
                    this.representative_two_year_total[7].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 9){
                    this.representative_two_year_total[8].profit_tl += x.kar_zarar_tl;
                    this.representative_two_year_total[8].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 10){
                    this.representative_two_year_total[9].profit_tl += x.kar_zarar_tl;
                    this.representative_two_year_total[9].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 11){
                    this.representative_two_year_total[10].profit_tl += x.kar_zarar_tl;
                    this.representative_two_year_total[10].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 12){
                    this.representative_two_year_total[11].profit_tl += x.kar_zarar_tl;
                    this.representative_two_year_total[11].profit_usd += x.kar_zarar;
                }
            });
            }else{
                this.representative_two_year_total = [
            {'month':1,'profit_tl':0,'profit_usd':0},
                {'month':2,'profit_tl':0,'profit_usd':0},
                {'month':3,'profit_tl':0,'profit_usd':0},
                {'month':4,'profit_tl':0,'profit_usd':0},
                {'month':5,'profit_tl':0,'profit_usd':0},
                {'month':6,'profit_tl':0,'profit_usd':0},
                {'month':7,'profit_tl':0,'profit_usd':0},
                {'month':8,'profit_tl':0,'profit_usd':0},
                {'month':9,'profit_tl':0,'profit_usd':0},
                {'month':10,'profit_tl':0,'profit_usd':0},
                {'month':11,'profit_tl':0,'profit_usd':0},
                {'month':12,'profit_tl':0,'profit_usd':0}
            ];
            };

            if(this.representative_three_year.length >0){
                this.representative_three_year.forEach(x=>{
                this.representative_two_year_sum.profit_tl += x.kar_zarar_tl;
                this.representative_two_year_sum.profit_usd += x.kar_zarar;
                if(x.yukleme_month == 1){
                    this.representative_three_year_total[0].profit_tl += x.kar_zarar_tl;
                    this.representative_three_year_total[0].profit_usd += x.kar_zarar;
                } else if(x.yukleme_month == 2){
                    this.representative_three_year_total[1].profit_tl += x.kar_zarar_tl;
                    this.representative_three_year_total[1].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 3){
                    this.representative_three_year_total[2].profit_tl += x.kar_zarar_tl;
                    this.representative_three_year_total[2].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 4){
                    this.representative_three_year_total[3].profit_tl += x.kar_zarar_tl;
                    this.representative_three_year_total[3].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 5){
                    this.representative_three_year_total[4].profit_tl += x.kar_zarar_tl;
                    this.representative_three_year_total[4].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 6){
                    this.representative_three_year_total[5].profit_tl += x.kar_zarar_tl;
                    this.representative_three_year_total[5].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 7){
                    this.representative_three_year_total[6].profit_tl += x.kar_zarar_tl;
                    this.representative_three_year_total[6].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 8){
                    this.representative_three_year_total[7].profit_tl += x.kar_zarar_tl;
                    this.representative_three_year_total[7].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 9){
                    this.representative_three_year_total[8].profit_tl += x.kar_zarar_tl;
                    this.representative_three_year_total[8].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 10){
                    this.representative_three_year_total[9].profit_tl += x.kar_zarar_tl;
                    this.representative_three_year_total[9].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 11){
                    this.representative_three_year_total[10].profit_tl += x.kar_zarar_tl;
                    this.representative_three_year_total[10].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 12){
                    this.representative_three_year_total[11].profit_tl += x.kar_zarar_tl;
                    this.representative_three_year_total[11].profit_usd += x.kar_zarar;
                }
            });
            }else{
                this.representative_three_year_total = [
            {'month':1,'profit_tl':0,'profit_usd':0},
                {'month':2,'profit_tl':0,'profit_usd':0},
                {'month':3,'profit_tl':0,'profit_usd':0},
                {'month':4,'profit_tl':0,'profit_usd':0},
                {'month':5,'profit_tl':0,'profit_usd':0},
                {'month':6,'profit_tl':0,'profit_usd':0},
                {'month':7,'profit_tl':0,'profit_usd':0},
                {'month':8,'profit_tl':0,'profit_usd':0},
                {'month':9,'profit_tl':0,'profit_usd':0},
                {'month':10,'profit_tl':0,'profit_usd':0},
                {'month':11,'profit_tl':0,'profit_usd':0},
                {'month':12,'profit_tl':0,'profit_usd':0}
            ];
            };




            /* */
            if(this.operation_this_year.length >0){
                this.operation_this_year.forEach(x=>{
                this.operation_this_year_sum.profit_tl += x.kar_zarar_tl;
                this.operation_this_year_sum.profit_usd += x.kar_zarar;
                if(x.yukleme_month == 1){
                    this.operation_this_year_total[0].profit_tl += x.kar_zarar_tl;
                    this.operation_this_year_total[0].profit_usd += x.kar_zarar;
                } else if(x.yukleme_month == 2){
                    this.operation_this_year_total[1].profit_tl += x.kar_zarar_tl;
                    this.operation_this_year_total[1].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 3){
                    this.operation_this_year_total[2].profit_tl += x.kar_zarar_tl;
                    this.operation_this_year_total[2].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 4){
                    this.operation_this_year_total[3].profit_tl += x.kar_zarar_tl;
                    this.operation_this_year_total[3].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 5){
                    this.operation_this_year_total[4].profit_tl += x.kar_zarar_tl;
                    this.operation_this_year_total[4].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 6){
                    this.operation_this_year_total[5].profit_tl += x.kar_zarar_tl;
                    this.operation_this_year_total[5].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 7){
                    this.operation_this_year_total[6].profit_tl += x.kar_zarar_tl;
                    this.operation_this_year_total[6].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 8){
                    this.operation_this_year_total[7].profit_tl += x.kar_zarar_tl;
                    this.operation_this_year_total[7].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 9){
                    this.operation_this_year_total[8].profit_tl += x.kar_zarar_tl;
                    this.operation_this_year_total[8].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 10){
                    this.operation_this_year_total[9].profit_tl += x.kar_zarar_tl;
                    this.operation_this_year_total[9].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 11){
                    this.operation_this_year_total[10].profit_tl += x.kar_zarar_tl;
                    this.operation_this_year_total[10].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 12){
                    this.operation_this_year_total[11].profit_tl += x.kar_zarar_tl;
                    this.operation_this_year_total[11].profit_usd += x.kar_zarar;
                }
            });
            }else{
                this.operation_this_year_total = [
                {'month':1,'profit_tl':0,'profit_usd':0},
                {'month':2,'profit_tl':0,'profit_usd':0},
                {'month':3,'profit_tl':0,'profit_usd':0},
                {'month':4,'profit_tl':0,'profit_usd':0},
                {'month':5,'profit_tl':0,'profit_usd':0},
                {'month':6,'profit_tl':0,'profit_usd':0},
                {'month':7,'profit_tl':0,'profit_usd':0},
                {'month':8,'profit_tl':0,'profit_usd':0},
                {'month':9,'profit_tl':0,'profit_usd':0},
                {'month':10,'profit_tl':0,'profit_usd':0},
                {'month':11,'profit_tl':0,'profit_usd':0},
                {'month':12,'profit_tl':0,'profit_usd':0}
            ];
            }

            if(this.operation_two_year.length >0){
                this.operation_two_year.forEach(x=>{
                this.operation_one_year_sum.profit_tl += x.kar_zarar_tl;
                this.operation_one_year_sum.profit_usd += x.kar_zarar;
                if(x.yukleme_month == 1){
                    this.operation_two_year_total[0].profit_tl += x.kar_zarar_tl;
                    this.operation_two_year_total[0].profit_usd += x.kar_zarar;
                } else if(x.yukleme_month == 2){
                    this.operation_two_year_total[1].profit_tl += x.kar_zarar_tl;
                    this.operation_two_year_total[1].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 3){
                    this.operation_two_year_total[2].profit_tl += x.kar_zarar_tl;
                    this.operation_two_year_total[2].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 4){
                    this.operation_two_year_total[3].profit_tl += x.kar_zarar_tl;
                    this.operation_two_year_total[3].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 5){
                    this.operation_two_year_total[4].profit_tl += x.kar_zarar_tl;
                    this.operation_two_year_total[4].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 6){
                    this.operation_two_year_total[5].profit_tl += x.kar_zarar_tl;
                    this.operation_two_year_total[5].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 7){
                    this.operation_two_year_total[6].profit_tl += x.kar_zarar_tl;
                    this.operation_two_year_total[6].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 8){
                    this.operation_two_year_total[7].profit_tl += x.kar_zarar_tl;
                    this.operation_two_year_total[7].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 9){
                    this.operation_two_year_total[8].profit_tl += x.kar_zarar_tl;
                    this.operation_two_year_total[8].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 10){
                    this.operation_two_year_total[9].profit_tl += x.kar_zarar_tl;
                    this.operation_two_year_total[9].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 11){
                    this.operation_two_year_total[10].profit_tl += x.kar_zarar_tl;
                    this.operation_two_year_total[10].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 12){
                    this.operation_two_year_total[11].profit_tl += x.kar_zarar_tl;
                    this.operation_two_year_total[11].profit_usd += x.kar_zarar;
                }
            });
            }else{
                this.operation_two_year_total = [
                {'month':1,'profit_tl':0,'profit_usd':0},
                {'month':2,'profit_tl':0,'profit_usd':0},
                {'month':3,'profit_tl':0,'profit_usd':0},
                {'month':4,'profit_tl':0,'profit_usd':0},
                {'month':5,'profit_tl':0,'profit_usd':0},
                {'month':6,'profit_tl':0,'profit_usd':0},
                {'month':7,'profit_tl':0,'profit_usd':0},
                {'month':8,'profit_tl':0,'profit_usd':0},
                {'month':9,'profit_tl':0,'profit_usd':0},
                {'month':10,'profit_tl':0,'profit_usd':0},
                {'month':11,'profit_tl':0,'profit_usd':0},
                {'month':12,'profit_tl':0,'profit_usd':0}
            ];
            };

            if(this.operation_three_year.length >0){
                this.operation_three_year.forEach(x=>{
                this.operation_two_year_sum.profit_tl += x.kar_zarar_tl;
                this.operation_two_year_sum.profit_usd += x.kar_zarar;
                if(x.yukleme_month == 1){
                    this.operation_three_year_total[0].profit_tl += x.kar_zarar_tl;
                    this.operation_three_year_total[0].profit_usd += x.kar_zarar;
                } else if(x.yukleme_month == 2){
                    this.operation_three_year_total[1].profit_tl += x.kar_zarar_tl;
                    this.operation_three_year_total[1].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 3){
                    this.operation_three_year_total[2].profit_tl += x.kar_zarar_tl;
                    this.operation_three_year_total[2].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 4){
                    this.operation_three_year_total[3].profit_tl += x.kar_zarar_tl;
                    this.operation_three_year_total[3].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 5){
                    this.operation_three_year_total[4].profit_tl += x.kar_zarar_tl;
                    this.operation_three_year_total[4].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 6){
                    this.operation_three_year_total[5].profit_tl += x.kar_zarar_tl;
                    this.operation_three_year_total[5].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 7){
                    this.operation_three_year_total[6].profit_tl += x.kar_zarar_tl;
                    this.operation_three_year_total[6].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 8){
                    this.operation_three_year_total[7].profit_tl += x.kar_zarar_tl;
                    this.operation_three_year_total[7].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 9){
                    this.operation_three_year_total[8].profit_tl += x.kar_zarar_tl;
                    this.operation_three_year_total[8].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 10){
                    this.operation_three_year_total[9].profit_tl += x.kar_zarar_tl;
                    this.operation_three_year_total[9].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 11){
                    this.operation_three_year_total[10].profit_tl += x.kar_zarar_tl;
                    this.operation_three_year_total[10].profit_usd += x.kar_zarar;
                }else if(x.yukleme_month == 12){
                    this.operation_three_year_total[11].profit_tl += x.kar_zarar_tl;
                    this.operation_three_year_total[11].profit_usd += x.kar_zarar;
                }
            });
            }else{
                this.operation_three_year_total = [
                {'month':1,'profit_tl':0,'profit_usd':0},
                {'month':2,'profit_tl':0,'profit_usd':0},
                {'month':3,'profit_tl':0,'profit_usd':0},
                {'month':4,'profit_tl':0,'profit_usd':0},
                {'month':5,'profit_tl':0,'profit_usd':0},
                {'month':6,'profit_tl':0,'profit_usd':0},
                {'month':7,'profit_tl':0,'profit_usd':0},
                {'month':8,'profit_tl':0,'profit_usd':0},
                {'month':9,'profit_tl':0,'profit_usd':0},
                {'month':10,'profit_tl':0,'profit_usd':0},
                {'month':11,'profit_tl':0,'profit_usd':0},
                {'month':12,'profit_tl':0,'profit_usd':0}
            ];
            };






        }
    }
}
</script>