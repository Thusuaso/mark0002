<template>
    <div class="col">
        <DataTable :value="values.data" tableStyle="min-width: 50rem">
            <template #header>
                <div class="text-center m-auto">
                    {{ values.year }}


                </div>
            </template>
            <Column field="Continent" header="Continent"></Column>
            <Column field="Fob" header="Fob">
                <template #body="slotProps">
                    {{slotProps.data.Fob | formatPriceUsd}}
                </template>
                <template #footer> 
                    {{ total.fob | formatPriceUsd }}
                </template>
            </Column>
            <Column field="Ddp" header="Ddp">
                <template #body="slotProps">
                    {{slotProps.data.Ddp | formatPriceUsd}}
                </template>
                <template #footer> 
                    {{ total.ddp | formatPriceUsd }}
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script>
    export default {
        props:{
            values:{
                type:Object,
                required:true
            }
        },
        data(){
            return{
                total:{
                    fob:0,
                    ddp:0
                }
            }
        },
        created(){
            this.values.data.forEach(x=>{
                this.total.fob += x.Fob;
                this.total.ddp += x.Ddp;

            });
        }
    }
</script>