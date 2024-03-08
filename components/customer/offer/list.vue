<template>
  <DataTable
    :value="offer"
    paginator
    :rows="15"
    :selection.sync="selectedOffer"
    selectionMode="single"
    @row-click="$emit('offer_customer_selected', $event)"
    :filters.sync="filters1"
    filterDisplay="row"
    :loading="loading"
  >
    <Column field="MusteriAdi" header="Customer" :showFilterMenu="false" :showClearButton="false">
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          type="text"
          v-model="filterModel.value"
          @input="filterCallback()"
          class="p-column-filter"
        />
      </template>
    </Column>
    <Column field="Company" header="Company" :showFilterMenu="false" :showClearButton="false">
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          type="text"
          v-model="filterModel.value"
          @input="filterCallback()"
          class="p-column-filter"
        />
      </template>
    </Column>
    <Column field="Mail" header="Mail"></Column>
    <Column field="Phone" header="Phone"></Column>
    <Column field="Adress" header="Address"></Column>
    <Column field="UlkeAdi" header="Country" :showFilterMenu="false" :showClearButton="false">
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          type="text"
          v-model="filterModel.value"
          @input="filterCallback()"
          class="p-column-filter"
        />
      </template>
    </Column>
    <Column field="KullaniciAdi" header="Salesman" :showFilterMenu="false" :showClearButton="false">
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          type="text"
          v-model="filterModel.value"
          @input="filterCallback()"
          class="p-column-filter"
        />
      </template>
    </Column>
  </DataTable>
</template>
<script>
import { FilterMatchMode } from "primevue/api";

export default {
  props: {
    offer: {
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
      selectedOffer: null,
      filters1: {
        MusteriAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Company: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        UlkeAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        KullaniciAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
    };
  },
  methods: {},
};
</script>
