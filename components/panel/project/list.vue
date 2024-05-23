<template>
  <div>
    <DataTable
      :value="list"
      :selection.sync="selectedPanelProject"
      selectionMode="single"
      @row-click="$emit('panel_project_selected_emit', $event.data.ID)"
      :reorderableColumns="true"
      @row-reorder="colReOrderProject"
      :filters.sync="filterProjects"
      filterDisplay="row"
    >
      <Column
        :rowReorder="true"
        :headerStyle="{ width: '4rem' }"
        :reorderableColumn="false"
      />
      <Column field="ID" header="Id" :showFilterMenu="false" :showClearButton="false">
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
        field="Queue"
        header="Queue"
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
        field="ProjectName"
        header="Project (En)"
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
        field="ProjectName_Fr"
        header="Project (Fr)"
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
        field="ProjectName_Es"
        header="Project (Es)"
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
        field="ProjectName_Ru"
        header="Project (Ru)"
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
        field="CountryName"
        header="Country"
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
      <Column>
        <template #body="slotProps">
          <img :src="slotProps.data.Image" width="150" height="150" lazyload />
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
      selectedPanelProject: null,
      filterProjects: {
        ID: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Queue: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        ProjectName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        ProjectName_Fr: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        ProjectName_Es: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        ProjectName_Ru: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        CountryName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
    };
  },
  methods: {
    colReOrderProject(event) {
      let index = 1;
      const data = [];
      event.value.forEach((x) => {
        x.Queue = index;
        data.push(x);
        index++;
      });
      this.$store.commit("setPanelProjectList", data);
    },
  },
};
</script>
