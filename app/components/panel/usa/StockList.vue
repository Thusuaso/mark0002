<template>
  <div>
    <DataTable
      :value="list"
      sortField="StokSqft"
      :sortOrder="-1"
      v-model:selection="selectedUsaList"
      selectionMode="single"
      @row-click="$emit('usa_list_selected_emit', $event)"
      v-model:filters="usaStockFilters"
      filterDisplay="row"
    >
      <Column field="UrunId" header="Product Id"></Column>
      <Column field="SkuNo" header="Sku" :showFilterMenu="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>

      <Column header="Product Name">
        <template #body="slotProps">
          {{ slotProps.data.UrunAdi }} - {{ slotProps.data.Surface }} -
          {{ slotProps.data.Size }}
        </template>
      </Column>
      <Column field="Fiyat" header="Price">
        <template #body="slotProps">
          {{ formatPriceUsd(slotProps.data.Fiyat) }}
        </template>
      </Column>
      <Column field="StokSqft" header="Sqft (in Stock)">
        <template #body="slotProps">
          {{ formatDecimal(slotProps.data.StokSqft) }}
        </template>
      </Column>
      <Column field="StokBox" header="Box (in Stock)">
        <template #body="slotProps">
          {{ formatDecimal(slotProps.data.StokBox) }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script>
import { FilterMatchMode } from "@primevue/core/api";
export default {
  props: {
    list: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      selectedUsaList: null,
      usaStockFilters: {
        SkuNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
    };
  },
};
</script>
