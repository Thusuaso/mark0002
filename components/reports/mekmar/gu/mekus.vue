<template>
  <div class="row">
    <div class="col">
      <DataTable :value="list" scrollable scrollHeight="450px" :loading="loading">
        <Column field="SiparisNo" header="Po"></Column>
        <Column field="DetayTutar_4" header="Mekus">
          <template #body="slotProps">
            {{ slotProps.data.DetayTutar_4 | formatPriceUsd }}
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      required: false,
    },
    loading: {
      type: Boolean,
      required: false,
    },
  },
};
</script>
