<template>
  <div>
    <DataTable :value="list" :filters.sync="filters1" filterDisplay="row" :selection="selectedCrateSize"
      selectionMode="single" @row-click="crateSizeSelected($event)">
      <template #header>
        <Button type="button" icon="pi pi-filter-slash" label="Clear Filters" outlined @click="clearFilter()" />
      </template>
      <Column field="Supplier" header="Supplier" :showFilterMenu="false" :showClearButton="false"
        headerClass="tableHeader" bodyClass="tableBody">
        <template #filter="{ filterModel, filterCallback }">
          <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="Crate_Width" header="Crate Width" :showFilterMenu="false" :showClearButton="false"
        headerClass="tableHeader" bodyClass="tableBody">
        <template #filter="{ filterModel, filterCallback }">
          <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>

      <Column field="Crate_Height" header="Crate Lenght" :showFilterMenu="false" :showClearButton="false"
        headerClass="tableHeader" bodyClass="tableBody">
        <template #filter="{ filterModel, filterCallback }">
          <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="Crate_Thickness" header="Crate Height" :showFilterMenu="false" :showClearButton="false"
        headerClass="tableHeader" bodyClass="tableBody">
        <template #filter="{ filterModel, filterCallback }">
          <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>

      <Column field="Stone_Size" header="Tile Size" :showFilterMenu="false" :showClearButton="false" headerClass="tableHeader"
        bodyClass="tableBody">
        <template #filter="{ filterModel, filterCallback }">
          <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>

      <Column field="Piece" header="Piece" :showFilterMenu="false" :showClearButton="false" headerClass="tableHeader"
        bodyClass="tableBody">
        <template #filter="{ filterModel, filterCallback }">
          <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter" />
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
      selectedCrateSize: null,
      filters1: {
        Supplier: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Crate_Width: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Crate_Height: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Crate_Thickness: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        
        Stone_Size: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Piece: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
    };
  },
  methods: {
    clearFilter(event) {
      this.filters1 = {
        Supplier: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Crate_Width: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Crate_Height: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Crate_Thickness: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        
        Stone_Size: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Piece: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      };
    },
    crateSizeSelected(event) {
      this.$emit("size_selected_model_emit", event.data);
      this.$store.dispatch("setSelectionProductionCrateSizeButtonStatus", false);
    },
  },
};
</script>
