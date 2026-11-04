<template>
  <div class="col">
    <DataTable
      :value="list"
      class="p-datatable-sm"
      v-model:selection="selectedOrderList"
      selectionMode="single"
      @row-click="$emit('order_selected_list_emit', $event.data)"
    >
      <template #header> {{ year }} {{ status }} Summary</template>
      <Column
        field="Month"
        header="Month"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ monthToString(slotProps.data.Month) }}
        </template>
      </Column>
      <Column field="FOB" header="FOB" headerClass="tableHeader" bodyClass="tableBody">
        <template #body="slotProps">
          {{ formatPriceUsd(slotProps.data.FOB) }}
        </template>
        <template #footer>
          {{ formatPriceUsd(total.fob) }}
        </template>
      </Column>
      <Column field="DDP" header="DDP" headerClass="tableHeader" bodyClass="tableBody">
        <template #body="slotProps">
          {{ formatPriceUsd(slotProps.data.DDP) }}
        </template>
        <template #footer>
          {{ formatPriceUsd(total.ddp) }}
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
    year: {
      type: Number,
      required: false,
    },
    total: {
      type: Object,
      required: false,
    },
  
    status: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      selectedOrderList: null,
    };
  },
};
</script>
