<template>
  <div>
    <DataTable
      :value="list"
      :selection.sync="selectedPanelProject"
      selectionMode="single"
      @row-click="$emit('panel_project_selected_emit', $event.data.ID)"
      :loading="loading"
      :reorderableColumns="true"
      @row-reorder="colReOrderProject"
    >
      <Column
        :rowReorder="true"
        :headerStyle="{ width: '4rem' }"
        :reorderableColumn="false"
      />
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
