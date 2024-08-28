<template>
  <div>
    <DataTable
      :value="todoList"
      :filters.sync="filters2"
      filterDisplay="row"
      :selection="selectedTodo"
      selectionMode="single"
      @row-click="todoSelected($event)"
      :rowClass="rowClass"
      sortField="Acil"
      :sortOrder="-1"
    >
      <Column
        field="OrtakGorev"
        header="Assignee"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column
        field="Yapilacak"
        header="Assignment"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column headerClass="tableHeader" bodyClass="tableBody">
        <template #body="slotProps">
          <Button
            type="button"
            class="p-button-primary"
            label="Done"
            @click="isTodoChange(slotProps.data.ID)"
          />
        </template>
      </Column>
      <Column>
        <template #body="slotProps">
          <Button
            type="button"
            class="p-button-warning"
            label="Not Seen"
            @click="$emit('todo_not_seen_emit', slotProps.data.ID)"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script>
import { FilterMatchMode } from "primevue/api";
export default {
  data() {
    return {
      filters2: {
        OrtakGorev: { value: null, matchMode: FilterMatchMode.CONTAINS },
        Yapilacak: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
      selectedTodo: null,
    };
  },
  props: {
    todoList: {},
  },
  methods: {
    rowClass(event) {
      return event.Acil ? "red-row" : "";
    },
    todoSelected(event) {
      this.$emit("todo_form_detail_dialog", event.data);
      this.$store.dispatch("setTodoButtonStatus", false);
    },
    isTodoChange(id) {
      this.$store.dispatch("setTodoStatusChange", id);
    },
  },
};
</script>
<style scoped>
:deep(.red-row) {
  color: red !important;
}
</style>
