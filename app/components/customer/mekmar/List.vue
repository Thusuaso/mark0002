<template>
  <div>
    <DataTable
      :value="list"
      sortField="ID"
      :sortOrder="-1"
      v-model:selection="selectedCustomer"
      selectionMode="single"
      @row-click="customerSelected($event)"
      :paginator="true"
      :rows="15"
      v-model:filters="filters1"
      filterDisplay="row"
    >
      <Column
        field="ID"
        header="Id"
        headerClass="tableHeader"
        bodyClass="tableBody"
      ></Column>
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
        field="Adres"
        header="Address"
        headerClass="tableHeader"
        bodyClass="tableBody"
      ></Column>
      <Column
        field="Marketing"
        header="Marketing"
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
        field="Png_Flags"
        header="Logo"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          <img
            :src="'https://cdn.mekmarimage.com/countryLogo/' + slotProps.data.Png_Flags"
            width="50"
            heigth="50"
          />
        </template>
      </Column>
      <Column
        field="Temsilci"
        header="Representative"
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
        field="SatisciAdi"
        header="Seller"
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
        field="Devir"
        header="Assigned"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          <div v-if="slotProps.data.Devir">✓</div>
          <div v-else>X</div>
        </template>
      </Column>
      <Column
        field="Ozel"
        header="Personal"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          <div v-if="slotProps.data.Ozel">✓</div>
          <div v-else>X</div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script>
import { useCustomerStore } from "~/stores/customer"
import { FilterMatchMode } from "@primevue/core/api";
export default {
  computed: {},
  computed: {
    customerStore() {
      return useCustomerStore()
    },
  },
  props: {
    list: {
      type: Array,
      required: false,
    },

  },
  data() {
    return {
      selectedCustomer: null,
      filters1: {
        FirmaAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Marketing: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        UlkeAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Temsilci: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        SatisciAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
    };
  },
  methods: {
    customerSelected(event) {
      this.$emit("customer_mekmar_selected_emit", event);
      this.customerStore.setMekmarDetailOrdersList(event.data.ID);
    },
  },
};
</script>
