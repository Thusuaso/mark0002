<template>
  <div>
    <DataTable :value="cost">
      <Column field="Tur" header="Tür"></Column>
      <Column field="tut" header="Tutar">
        <template #body="slotProps">
          {{ slotProps.data.tut | formatPriceUsd }}
        </template>
        <template #footer>
          {{ total | formatPriceUsd }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script>
export default {
  props: {
    cost: {
      type: Array,
      required: false,
    },
    total: {
      type: Number,
      required: false,
    },
  },
};
</script>
