<template>
  <div>
    <DataTable
      :value="list"
      responsiveLayout="scroll"
      :scrollable="true"
      scrollHeight="600px"
      class="p-datatable-sm"
      :filters.sync="panelPublishedFilter"
      filterDisplay="row"
      :selection.sync="selectedPanelPublishedList"
      selectionMode="single"
      @row-click="panelPublishedListSelected($event.data)"
      sortField="sira"
      :sortOrder="1"
    >
      <Column field="sira" header="Queue" :showFilterMenu="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="urunid" header="Product Id" :showFilterMenu="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="urunkod" header="Product Code" :showFilterMenu="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="urunadi_en" header="Product Name" :showFilterMenu="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
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
      panelPublishedFilter: {
        sira: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        urunid: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        urunkod: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        urunadi_en: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      selectedPanelPublishedList: null,
    };
  },
  methods: {
    panelPublishedListSelected(event) {
      this.$emit("panel_published_list_selected_emit", event);
    },
  },
};
</script>
