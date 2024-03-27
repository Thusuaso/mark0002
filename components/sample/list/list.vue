<template>
  <div>
    <DataTable
      :value="list"
      class="p-datatable-sm"
      :filters.sync="sampleFilters"
      filterDisplay="row"
      :selection.sync="selectedSample"
      selectionMode="single"
      @row-click="$emit('sample_selected_list', $event)"
      :loading="loading"
    >
      <Column
        field="NumuneTarihi"
        header="Date"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ slotProps.data.NumuneTarihi | dateToString }}
        </template>
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
        field="NumuneTemsilciAdi"
        header="Representative"
        :showFilterMenu="false"
        :showClearButton="false"
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
        field="NumuneNo"
        header="Po"
        :showFilterMenu="false"
        :showClearButton="false"
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
        field="NumuneKategori"
        header="Category"
        headerClass="tableHeader"
        bodyClass="tableBody"
      ></Column>
      <Column header="Miktar/Birim" headerClass="tableHeader" bodyClass="tableBody">
        <template #body="slotProps">
          {{ slotProps.data.Miktar }} / {{ slotProps.data.NumuneUrunBirim }}
        </template>
      </Column>
      <Column
        field="NumuneGonderiTipi"
        header="Shipment Type"
        headerClass="tableHeader"
        bodyClass="tableBody"
      ></Column>
      <Column
        field="NumuneBanka"
        header="Bank"
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
      sampleFilters: {
        NumuneTarihi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        NumuneTemsilciAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        NumuneNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      selectedSample: null,
    };
  },
};
</script>
