<template>
  <div>
    <DataTable
      :value="list"
      style="width: 100%"
      :filters.sync="filters1"
      filterDisplay="row"
      headerStyle="color:red"
      :selection="selectedSupplier"
      selectionMode="single"
      @row-click="supplierSelected($event)"
      :loading="loading"
    >
      <Column
        field="ID"
        header="Id"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column
        field="FirmaAdi"
        header="Company"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column
        field="ToplamTedarikci"
        header="Total Order"
        headerClass="tableHeader"
        bodyClass="tableBody"
      ></Column>
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
    loading: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      selectedSupplier: null,

      filters1: {
        ID: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        FirmaAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
    };
  },
  methods: {
    supplierSelected(event) {
      this.$emit("supplier_model_emit", event.data);
    },
  },
};
</script>
