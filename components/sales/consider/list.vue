<template>
  <div>
    <DataTable
      :value="list"
      :selection.sync="selectedPointsOfConsider"
      selectionMode="single"
      @row-click="$emit('points_of_consider_selected_emit', $event)"
    >
      <Column
        field="Hata"
        header="Points of Consider"
        headerClass="tableHeader"
        bodyClass="tableBody"
      ></Column>
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
  },
  data() {
    return {
      selectedPointsOfConsider: null,
    };
  },
};
</script>
