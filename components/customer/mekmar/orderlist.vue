<template>
  <div class="container">
    <DataTable
      :value="po"
      :selection.sync="selectedPo"
      selectionMode="single"
      @row-click="$emit('customer_order_po_selected_emit', $event.data.SiparisNo)"
    >
      <Column
        field="SiparisNo"
        header="Po"
        headerClass="tableHeader"
        bodyClass="tableBody"
      ></Column>
      <Column
        field="SiparisSahibi"
        header="Order Owner"
        headerClass="tableHeader"
        bodyClass="tableBody"
      ></Column>
      <Column
        field="Operasyon"
        header="Operation"
        headerClass="tableHeader"
        bodyClass="tableBody"
      ></Column>
    </DataTable>
  </div>
</template>
<script>
export default {
  props: {
    po: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      selectedPo: null,
    };
  },
};
</script>
