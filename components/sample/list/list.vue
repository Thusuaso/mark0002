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
      <Column field="NumuneKategori" header="Category"></Column>
      <Column header="Miktar/Birim">
        <template #body="slotProps">
          {{ slotProps.data.Miktar }} / {{ slotProps.data.NumuneUrunBirim }}
        </template>
      </Column>
      <Column field="NumuneGonderiTipi" header="Shipment Type"></Column>
      <Column field="NumuneBanka" header="Bank"></Column>
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
