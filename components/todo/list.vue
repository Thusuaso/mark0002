<template>
  <div>
    <DataTable
      :value="list"
      :selection.sync="selectedTodo"
      selectionMode="single"
      @row-click="$emit('to_do_list_selected_emit', $event)"
      sortField="Acil"
      :sortOrder="-1"
      :rowClass="rowClass"
    >
      <Column field="Yapilacak" header="To Do"></Column>
      <Column field="GirisTarihi" header="Date">
        <template #body="slotProps">
          {{ slotProps.data.GirisTarihi | dateToString }}
        </template>
      </Column>
      <Column field="YapilacakOncelik" header="Priority"></Column>
      <Column>
        <template #body="slotProps">
          <Button
            type="button"
            class="p-button-info"
            label="Done"
            @click="$emit('todo_done_emit', slotProps.data)"
          />
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
  },
  data() {
    return {
      selectedTodo: null,
    };
  },
  methods: {
    rowClass(event) {
      return event.Acil ? "red-row" : "";
    },
  },
};
</script>
<style scoped>
:deep(.red-row) {
  background-color: rgba(255, 0, 0, 0.789) !important;
  border: 1px solid gray !important;
  color: white !important;
}
</style>
