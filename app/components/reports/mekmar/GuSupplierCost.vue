<template>
    <div class="col">
        <DataTable :value="list.data" scrollable scrollHeight="500px">
            <template #header >
                <div class="text-center">
                    {{ list.year }}
                </div>
            </template>
            <Column field="FirmaAdi" header="Supplier"></Column>
            <Column field="Total" header="Total">
                <template #body="slotProps">
                    {{ formatPriceUsd(slotProps.data.Total) }}
                </template>
                <template #footer>
                    {{ formatPriceUsd(list.total) }}
                </template>
            </Column>
        </DataTable>

    </div>
</template>
<script>
export default {
    props:{
        list:{
            type:Array,
            required:true
        }
    },

}
</script>