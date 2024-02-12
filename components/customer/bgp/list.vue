<template>
  <div>
    <DataTable
      :value="list"
      paginator
      :rows="15"
      :selection="selectedBgpCustomerList"
      selectionMode="single"
      @row-click="$emit('bgp_customer_emit', $event)"
      :filters.sync="filters1"
      filterDisplay="row"
      :loading="loading"
    >
      <Column field="Customer" header="Müşteri" :showFilterMenu="false">
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
      <Column field="Phone" header="Telefon"></Column>
      <Column field="Email" header="Mail"></Column>
      <Column field="Adress" header="Adres"></Column>
      <Column field="Ulke" header="Ülke" :showFilterMenu="false">
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
      selectedBgpCustomerList: null,
      filters1: {
        Customer: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Company: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Ulke: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        KullaniciAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
    };
  },
  methods: {},
};
</script>
