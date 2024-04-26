<template>
  <div class="col">
    <DataTable
      :value="list"
      class="p-datatable-sm"
      :selection.sync="selectedOrderList"
      selectionMode="single"
      @row-click="$emit('order_selected_list_emit', $event.data)"
      :loading="loading"
    >
      <template #header> {{ year }} {{ status }} Summary</template>
      <Column
        field="Month"
        header="Month"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ slotProps.data.Month | monthToString }}
        </template>
      </Column>
      <Column field="FOB" header="FOB" headerClass="tableHeader" bodyClass="tableBody">
        <template #body="slotProps">
          {{ slotProps.data.FOB | formatPriceUsd }}
        </template>
        <template #footer>
          {{ total.fob | formatPriceUsd }}
        </template>
      </Column>
      <Column field="DDP" header="DDP" headerClass="tableHeader" bodyClass="tableBody">
        <template #body="slotProps">
          {{ slotProps.data.DDP | formatPriceUsd }}
        </template>
        <template #footer>
          {{ total.ddp | formatPriceUsd }}
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
    loading: {
      type: Boolean,
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
