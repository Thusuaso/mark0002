<template>
  <div>
    <DataTable
      :value="list"
      :filters.sync="filterAtlanta"
      filterDisplay="row"
      :selection.sync="selectedAtlantaList"
      selectionMode="single"
      @row-dblclick="test"
    >
      <Column field="SkuNo" header="Sku" :showFilterMenu="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
            placeholder="Search by country"
          />
        </template>
      </Column>
      <Column field="MekmarKod" header="Code" :showFilterMenu="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
            placeholder="Search by country"
          />
        </template>
      </Column>
      <Column field="UrunTanim" header="Description" :showFilterMenu="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
            placeholder="Search by country"
          />
        </template>
      </Column>
      <Column field="atl" header="Po" :showFilterMenu="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
            placeholder="Search by country"
          />
        </template>
      </Column>
      <Column field="KasaAdet" header="Amount in Crate">
        <template #body="slotProps">
          {{ slotProps.data.KasaAdet | formatDecimal }}
        </template>
      </Column>
      <Column field="KasaKutu" header="Box in Crate">
        <template #body="slotProps">
          {{ slotProps.data.KasaKutu | formatDecimal }}
        </template>
      </Column>
      <Column field="KasaM2" header="M2 in Crate">
        <template #body="slotProps">
          {{ slotProps.data.KasaM2 | formatDecimal }}
        </template>
      </Column>
      <Column field="KasaSqft" header="Sqft in Crate">
        <template #body="slotProps">
          {{ slotProps.data.KasaSqft | formatDecimal }}
        </template>
      </Column>
      <Column field="StokBox" header="Stock Box">
        <template #body="slotProps">
          {{ slotProps.data.StokBox | formatDecimal }}
        </template>
      </Column>
      <Column field="StokSqft" header="Stock Sqft">
        <template #body="slotProps">
          {{ slotProps.data.StokSqft | formatDecimal }}
        </template>
      </Column>
      <Column field="mekmar_fiyat" header="Price">
        <template #body="slotProps">
          {{ slotProps.data.mekmar_fiyat | formatPriceUsd }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script>
import { FilterMatchMode } from "primevue/api";
export default {
  props: {
    list: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      filterAtlanta: {
        SkuNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        MekmarKod: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        UrunTanim: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        atl: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      selectedAtlantaList: null,
    };
  },
  methods: {
    test() {
      console.log("double click");
    },
  },
};
</script>
