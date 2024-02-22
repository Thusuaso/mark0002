<template>
  <div>
    <DataTable
      :value="list"
      :selection.sync="selectedPanelProject"
      selectionMode="single"
      @row-click="$emit('panel_project_selected_emit', $event.data.ID)"
      :loading="loading"
    >
      <Column field="ID" header="Id"></Column>
      <Column field="Queue" header="Queue"></Column>
      <Column field="ProjectName" header="Project (En)"></Column>
      <Column field="ProjectName_Fr" header="Project (Fr)"></Column>
      <Column field="ProjectName_Es" header="Project (Es)"></Column>
      <Column field="ProjectName_Ru" header="Project (Ru)"></Column>
      <Column field="CountryName" header="Country"></Column>
      <Column>
        <template #body="slotProps">
          <img :src="slotProps.data.Image" width="150" height="150" lazyload />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script>
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
      selectedPanelProject: null,
    };
  },
};
</script>
