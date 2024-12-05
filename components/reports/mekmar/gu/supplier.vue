<template>
    <div class="col">
        <DataTable :value="list.data" scrollable scrollHeight="500px">
            <template #header >
                <div class="text-center">
                    {{ list.year }}
                </div>
            </template>
            <Column field="Year" header="Year"></Column>
            <Column field="Total" header="Total">
                <template #body="slotProps">
                    {{slotProps.data.Total | formatPriceUsd}}
                </template>
                <template #footer>
                    {{ list.total | formatPriceUsd}}
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