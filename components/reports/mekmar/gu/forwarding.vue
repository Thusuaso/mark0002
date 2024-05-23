<template>
  <div class="col-3">
    <DataTable :value="list.data" >
      <template #header>
        {{ list.year }}
      </template>
      <Column field="Ay" header="Month" headerClass="tableHeader" bodyClass="tableBody">
        <template #body="slotProps">
          {{ slotProps.data.Ay | monthToString }}
        </template>
      </Column>
      <Column field="Fob" header="Fob" headerClass="tableHeader" bodyClass="tableBody">
        <template #body="slotProps">
          {{ slotProps.data.Fob | formatPriceUsd }}
        </template>
        <template #footer>
          {{ list.fob | formatPriceUsd }}
        </template>
      </Column>
      <Column field="Ddp" header="Ddp" headerClass="tableHeader" bodyClass="tableBody">
        <template #body="slotProps">
          {{ slotProps.data.Ddp | formatPriceUsd }}
        </template>
        <template #footer>
          {{ list.ddp | formatPriceUsd }}
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

  },
};
</script>
