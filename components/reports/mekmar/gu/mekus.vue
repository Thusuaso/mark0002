<template>
  <div class="row">
    <div class="col">
      <DataTable :value="list" scrollable scrollHeight="450px" >
        <Column
          field="SiparisNo"
          header="Po"
          headerClass="tableHeader"
          bodyClass="tableBody"
        ></Column>
        <Column
          field="DetayTutar_4"
          header="Mekus"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
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

  },
};
</script>
