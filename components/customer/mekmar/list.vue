<template>
  <div>
    <DataTable
      :value="list"
      sortField="ID"
      :sortOrder="-1"
      :selection.sync="selectedCustomer"
      selectionMode="single"
      @row-click="customerSelected($event)"
      :paginator="true"
      :rows="15"
      :filters.sync="filters1"
      filterDisplay="row"
      :loading="loading"
    >
      <Column field="ID" header="Id"></Column>
      <Column field="FirmaAdi" header="Firma Adı" :showFilterMenu="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="Adres" header="Adres"></Column>
      <Column field="Marketing" header="Marketing" :showFilterMenu="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="UlkeAdi" header="Ülke Adı" :showFilterMenu="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="Png_Flags" header="Logo">
        <template #body="slotProps">
          <img
            :src="'https://cdn.mekmarimage.com/countryLogo/' + slotProps.data.Png_Flags"
            width="50"
            heigth="50"
          />
        </template>
      </Column>
      <Column field="Temsilci" header="Temsilci" :showFilterMenu="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="SatisciAdi" header="Satışçı" :showFilterMenu="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="Devir" header="Devir">
        <template #body="slotProps">
          <div v-if="slotProps.data.Devir">✓</div>
          <div v-else>X</div>
        </template>
      </Column>
      <Column field="Ozel" header="Özel">
        <template #body="slotProps">
          <div v-if="slotProps.data.Ozel">✓</div>
          <div v-else>X</div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script>
import { FilterMatchMode } from "primevue/api";
export default {
  computed: {},
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
      this.$store.dispatch("setMekmarDetailOrdersList", event.data.ID);
    },
  },
};
</script>
