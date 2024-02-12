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
    <Column field="MusteriAdi" header="Müşteri" :showFilterMenu="false">
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          type="text"
          v-model="filterModel.value"
          @input="filterCallback()"
          class="p-column-filter"
        />
      </template>
    </Column>
    <Column field="Company" header="Şirket" :showFilterMenu="false">
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
    <Column field="Phone" header="Telefon"></Column>
    <Column field="Adress" header="Adres"></Column>
    <Column field="UlkeAdi" header="Ülke" :showFilterMenu="false">
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          type="text"
          v-model="filterModel.value"
          @input="filterCallback()"
          class="p-column-filter"
        />
      </template>
    </Column>
    <Column field="KullaniciAdi" header="Satışçı" :showFilterMenu="false">
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
