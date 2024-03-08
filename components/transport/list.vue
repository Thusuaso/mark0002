<template>
  <div>
    <DataTable
      :value="list"
      paginator
      :rows="15"
      :filters.sync="filters1"
      filterDisplay="row"
      :loading="loading"
    >
      <Column field="Tarih" header="Date" :showFilterMenu="false" :showClearButton="false">
        <template #body="slotProps">
          {{ slotProps.data.Tarih | dateToString }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="SiparisNo" header="Po" :showFilterMenu="false" :showClearButton="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="firma_adi" header="Company" :showFilterMenu="false" :showClearButton="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="FaturaNo" header="Invoice No" :showFilterMenu="false" :showClearButton="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column header="₺">
        <template #body="slotProps">
          {{ (slotProps.data.Tutar * slotProps.data.Kur) | formatPriceTl }}
        </template>
      </Column>
      <Column field="Kur" header="Currency">
        <template #body="slotProps">
          {{ slotProps.data.Kur | formatPriceTl }}
        </template>
      </Column>
      <Column header="$">
        <template #body="slotProps">
          {{ slotProps.data.Tutar | formatPriceUsd }}
        </template>
      </Column>
      <Column field="link" header="Download">
        <template #body="slotProps">
          <a :href="slotProps.data.link">
            <i class="pi pi-download" style="font-size: 1rem"></i>
          </a>
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
      filters1: {
        Tarih: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        SiparisNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        firma_adi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        FaturaNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
    };
  },
};
</script>
