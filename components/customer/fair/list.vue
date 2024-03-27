<template>
  <DataTable
    :value="list"
    :selection="selectedFairList"
    selectionMode="single"
    @row-click="$emit('fair_customer_selected_emit', $event)"
    paginator
    :rows="15"
    :filters.sync="filters1"
    filterDisplay="row"
    :loading="loading"
  >
    <Column
      field="Customer"
      header="Customer"
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
      field="Company"
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
      field="Email"
      header="Mail"
      headerClass="tableHeader"
      bodyClass="tableBody"
    ></Column>
    <Column
      field="Phone"
      header="Phone"
      headerClass="tableHeader"
      bodyClass="tableBody"
    ></Column>
    <Column
      field="Adress"
      header="Address"
      headerClass="tableHeader"
      bodyClass="tableBody"
    ></Column>
    <Column
      field="UlkeAdi"
      header="Country"
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
      field="Orderer"
      header="Salesman"
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
    <Column field="Fuar" header="Fair" headerClass="tableHeader" bodyClass="tableBody">
      <template #body="slotProps">
        <div v-if="slotProps.data.Fuar">✓</div>
        <div v-else>x</div>
      </template>
    </Column>
    <Column
      field="Ziyaret"
      header="Visit"
      headerClass="tableHeader"
      bodyClass="tableBody"
    >
      <template #body="slotProps">
        <div v-if="slotProps.data.Ziyaret">✓</div>
        <div v-else>x</div>
      </template>
    </Column>
  </DataTable>
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
      selectedFairList: null,
      filters1: {
        Customer: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Company: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        UlkeAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Orderer: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
    };
  },
  methods: {},
};
</script>
