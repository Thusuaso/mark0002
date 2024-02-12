<template>
  <div>
    <DataTable :value="list" :loading="loading">
      <Column field="Marketing" header="Marketing"></Column>
      <Column field="Fob" header="Fob">
        <template #body="slotProps">
          {{ slotProps.data.Fob | formatPriceUsd }}
        </template>
        <template #footer>
          {{ total.fob | formatPriceUsd }}
        </template>
      </Column>
      <Column field="Ddp" header="Ddp">
        <template #body="slotProps">
          {{ slotProps.data.Ddp | formatPriceUsd }}
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
    total: {
      type: Object,
      required: false,
    },
    loading: {
      type: Boolean,
      required: false,
    },
  },
};
</script>
