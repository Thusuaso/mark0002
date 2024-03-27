<template>
  <div>
    <Button
      type="text"
      class="p-button-success w-100"
      label="Change Queue"
      @click="$emit('sales_to_do_main_list_change_queue', list)"
    />
    <DataTable
      :value="list"
      :reorderableColumns="true"
      @row-reorder="onRowReorder($event)"
      :selection.sync="selectedMainList"
      selectionMode="single"
      @row-click="$emit('main_to_do_list_selected_emit', $event)"
      :filters.sync="mainTodoFilter"
      filterDisplay="row"
    >
      <Column rowReorder headerStyle="width: 3rem" :reorderableColumn="false" />
      <Column
        field="Sira"
        header="Queue"
        headerClass="tableHeader"
        bodyClass="tableBody"
      ></Column>
      <Column
        field="OrtakGorev"
        header="Assignee"
        :showFilterMenu="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
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
        field="Yapilacak"
        header="Assignment"
        :showFilterMenu="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
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
      <Column header="#" headerClass="tableHeader" bodyClass="tableBody">
        <template #body="slotProps">
          <Button
            type="button"
            class="p-button-primary"
            label="Done"
            @click="$emit('sales_to_do_main_done_emit', slotProps.data.ID)"
          />
        </template>
      </Column>
      <Column header="#" headerClass="tableHeader" bodyClass="tableBody">
        <template #body="slotProps">
          <Button
            type="button"
            class="p-button-secondary"
            label="Seen"
            @click="$emit('sales_to_do_main_seen_emit', slotProps.data.ID)"
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
      selectedMainList: null,
      mainTodoFilter: {
        OrtakGorev: { value: null, matchMode: FilterMatchMode.CONTAINS },
        Yapilacak: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
    };
  },
  methods: {
    onRowReorder(event) {
      let index = 1;
      let data = [];
      event.value.forEach((x) => {
        x.Sira = index;
        data.push(x);
        index++;
      });
      this.$store.commit("setTodosMainList", data);
    },
  },
};
</script>
