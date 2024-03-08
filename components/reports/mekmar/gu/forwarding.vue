<template>
  <div class="col-3">
    <DataTable :value="list.data" :loading="loading">
      <template #header>
        {{ list.year }}
      </template>
      <Column field="Ay" header="Month">
        <template #body="slotProps">
          {{ slotProps.data.Ay | monthToString }}
        </template>
      </Column>
      <Column field="Fob" header="Fob">
        <template #body="slotProps">
          {{ slotProps.data.Fob | formatPriceUsd }}
        </template>
        <template #footer>
          {{ list.fob | formatPriceUsd}}
        </template>
      </Column>
      <Column field="Ddp" header="Ddp">
        <template #body="slotProps">
          {{ slotProps.data.Ddp | formatPriceUsd }}
        </template>
        <template #footer>
          {{ list.ddp | formatPriceUsd}}
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script>
export default {
  props: {
    list: {
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
