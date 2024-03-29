<template>
  <div class="row">
    <div class="col">
      <DataTable
        :value="list"
        class="p-datatable-sm"
        :selection="selectedRepresentative"
        selectionMode="single"
        @row-click="representativeSelected($event)"
        :filters.sync="representativeFilter"
        filterDisplay="row"
      >
        <Column
          field="SiparisNo"
          header="Po"
          :showFilterMenu="false"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              class="p-column-filter"
            />
          </template>
        </Column>
        <Column
          field="SiparisSahibi"
          header="Seller"
          :showFilterMenu="false"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              class="p-column-filter"
            />
          </template>
        </Column>
        <Column
          field="Operasyon"
          header="Operation"
          :showFilterMenu="false"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              class="p-column-filter"
            />
          </template>
        </Column>
      </DataTable>
    </div>
    <div class="col">
      <DataTable :value="orderer" class="p-datatable-sm">
        <template #header>
          <div
            class="flex flex-wrap align-items-center justify-content-between text-center"
          >
            Sales Summary
          </div>
        </template>
        <Column
          field="SiparisSahibi"
          header="Seller"
          headerClass="tableHeader"
          bodyClass="tableBody"
        ></Column>
        <Column
          field="Total"
          header="Total"
          headerClass="tableHeader"
          bodyClass="tableBody"
        ></Column>
      </DataTable>
      <br />
      <DataTable :value="operation" class="p-datatable-sm">
        <template #header>
          <div
            class="flex flex-wrap align-items-center justify-content-between gap-2 text-center"
          >
            Operation Summary
          </div>
        </template>
        <Column
          field="Operasyon"
          header="Seller"
          headerClass="tableHeader"
          bodyClass="tableBody"
        ></Column>
        <Column
          field="Total"
          header="Total"
          headerClass="tableHeader"
          bodyClass="tableBody"
        ></Column>
      </DataTable>
    </div>
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
    orderer: {
      type: Array,
      required: false,
    },
    operation: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      selectedRepresentative: null,
      representativeFilter: {
        SiparisNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        SiparisSahibi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Operasyon: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
    };
  },
  methods: {
    representativeSelected(event) {
      this.$emit("representative_form_emit", event.data);
    },
  },
};
</script>
