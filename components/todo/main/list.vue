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
    >
      <Column rowReorder headerStyle="width: 3rem" :reorderableColumn="false" />
      <Column field="Sira" header="Queue"></Column>
      <Column field="OrtakGorev" header="Owner"></Column>
      <Column field="Yapilacak" header="To Do"></Column>
      <Column header="#">
        <template #body="slotProps">
          <Button
            type="button"
            class="p-button-primary"
            label="Done"
            @click="$emit('sales_to_do_main_done_emit', slotProps.data.ID)"
          />
        </template>
      </Column>
      <Column header="#">
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
export default {
  props: {
    list: {
      type: Array,
      required: false,
    },
  },
  data(){
    return{
      selectedMainList:null
    }
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
