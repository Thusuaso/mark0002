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
    >
      <Column
        field="Customer"
        header="Müşteri"
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
        header="Şirket"
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
        field="Phone"
        header="Telefon"
        headerClass="tableHeader"
        bodyClass="tableBody"
      ></Column>
      <Column
        field="Email"
        header="Mail"
        headerClass="tableHeader"
        bodyClass="tableBody"
      ></Column>
      <Column
        field="Adress"
        header="Adres"
        headerClass="tableHeader"
        bodyClass="tableBody"
      ></Column>
      <Column
        field="Ulke"
        header="Ülke"
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
        field="KullaniciAdi"
        header="Satışçı"
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
