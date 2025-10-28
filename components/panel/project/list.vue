<template>
  <div>
    <DataTable
      :editingRows.sync="editingRows"
      :value.sync="list"
      editMode="row"
      dataKey="Queue"
      @row-edit-save="onRowEditSave"
      :pt="{
        table: { style: 'min-width: 50rem' },
        column: {
          bodycell: ({ state }) => ({
            style:
              state['d_editing'] &&
              'padding-top: 0.6rem; padding-bottom: 0.6rem',
          }),
        },
      }"
      selectionMode="single"
      @row-click="$emit('panel_project_selected_emit', $event.data.ID)"
      :reorderableColumns="true"
      @row-reorder="colReOrderProject"
      :filters.sync="filterProjects"
      filterDisplay="row"
      sortField="Queue"
      :sortOrder="1"
      style="font-size: 80%"
    >
      <Column field="Queue" header="Queue" style="width: 20%">
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" />
        </template>
      </Column>
      <Column
        field="ID"
        header="Id"
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
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" />
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
        field="ProjectName_Fr"
        header="Project (Fr)"
        :showFilterMenu="false"
        :showClearButton="false"
      >
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" />
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
        field="ProjectName_Es"
        header="Project (Es)"
        :showFilterMenu="false"
        :showClearButton="false"
      >
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" />
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
        field="ProjectName_Ru"
        header="Project (Ru)"
        :showFilterMenu="false"
        :showClearButton="false"
      >
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" />
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
        field="ProjectName_Ar"
        header="Project (Ar)"
        :showFilterMenu="false"
        :showClearButton="false"
      >
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" />
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
      <Column field="VideoStatus" header="Video Status">
        <template #body="slotProps">
          <div v-if="slotProps.data.VideoStatus">Yes</div>
          <div v-else>No</div>
        </template>
      </Column>
      <Column
        :rowEditor="true"
        style="width: 10%; min-width: 8rem"
        bodyStyle="text-align:center"
      ></Column>
    </DataTable>

    <!-- <DataTable
      :value="list"
      :selection.sync="selectedPanelProject"
      selectionMode="single"
      @row-click="$emit('panel_project_selected_emit', $event.data.ID)"
      :reorderableColumns="true"
      @row-reorder="colReOrderProject"
      :filters.sync="filterProjects"
      filterDisplay="row"
      sortField="Queue"
      :sortOrder="1"
    >
      <Column
        :rowReorder="true"
        :headerStyle="{ width: '4rem' }"
        :reorderableColumn="false"
      />
      <Column
        field="ID"
        header="Id"
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
      <Column field="VideoStatus" header="Video Status">
        <template #body="slotProps">
          <div v-if="slotProps.data.VideoStatus">Yes</div>
          <div v-else>No</div>
        </template>
      </Column>
    </DataTable> -->
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
      editingRows: [],
      selectedPanelProject: null,
      filterProjects: {
        ID: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Queue: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        ProjectName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        ProjectName_Fr: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        ProjectName_Es: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        ProjectName_Ru: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        ProjectName_Ar: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        CountryName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
    };
  },
  methods: {
    onCellEditComplete() {},
    onRowEditSave(event) {
      this.$axios
        .post("/panel/project/queue/changing", {
          body: event,
        })
        .then((res) => {
          this.$toast.success("Project queue updated successfully");
          this.$store.dispatch("setPanelProjectList");
        });
    },
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
