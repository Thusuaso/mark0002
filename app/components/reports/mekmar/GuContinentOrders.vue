<template>
    <div class="col">
        <DataTable :value="values.data">
            <template #header>
                <div class="text-center">
                    {{ values.year }}
                </div>
            </template>
            <Column field="Continent" header="Continent"></Column>
            <Column field="Fob" header="Fob">
                <template #body="slotProps">
                    {{ formatPriceUsd(slotProps.data.Fob) }}
                </template>
                <template #footer> 
                    {{ formatPriceUsd(total.fob) }}
                </template>
            </Column>
            <Column field="Ddp" header="Ddp">
                <template #body="slotProps">
                    {{ formatPriceUsd(slotProps.data.Ddp) }}
                </template>
                <template #footer> 
                    {{ formatPriceUsd(total.ddp) }}
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