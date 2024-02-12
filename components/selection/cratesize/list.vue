<template>
  <div>
    <DataTable
      :value="list"
      :filters.sync="filters1"
      filterDisplay="row"
      :selection="selectedCrateSize"
      selectionMode="single"
      @row-click="crateSizeSelected($event)"
      :loading="loading"
    >
      <template #header>
        <Button
          type="button"
          icon="pi pi-filter-slash"
          label="Filtreleri Temizle"
          outlined
          @click="clearFilter()"
        />
      </template>
      <Column field="TedarikciAdi" header="Tedarikci" :showFilterMenu="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="Ebat" header="Ebat" :showFilterMenu="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="KasaOlculeri" header="Kasa Ölçüsü" :showFilterMenu="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="Adet" header="Adet" :showFilterMenu="false">
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
      selectedCrateSize: null,
      filters1: {
        TedarikciAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Ebat: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        KasaOlculeri: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Adet: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
    };
  },
  methods: {
    clearFilter(event) {
      this.filters1 = {
        TedarikciAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Ebat: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        KasaOlculeri: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Adet: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      };
    },
    crateSizeSelected(event) {
      this.$emit("size_selected_model_emit", event.data);
      this.$store.dispatch("setSelectionProductionCrateSizeButtonStatus", false);
    },
  },
};
</script>
