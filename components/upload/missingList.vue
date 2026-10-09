<template>
  <div>
    <div v-if="list.length == 0" class="text-muted">
      Eksik zorunlu evrak yok.
    </div>
    <DataTable
      v-else
      :value="list"
      responsiveLayout="scroll"
      :selection.sync="selectedOrder"
      selectionMode="single"
      @row-click="orderSelected($event)"
    >
      <Column
        field="SiparisNo"
        header="Po"
        headerClass="tableHeader"
        bodyClass="tableBody"
      ></Column>
      <Column
        field="MusteriAdi"
        header="Customer"
        headerClass="tableHeader"
        bodyClass="tableBody"
      ></Column>
      <Column
        field="TeslimTur"
        header="Delivery"
        headerClass="tableHeader"
        bodyClass="tableBody"
      ></Column>
      <Column
        header="Shipment Date"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ slotProps.data.YuklemeTarihi | dateToString }}
        </template>
      </Column>
      <Column
        header="Missing Documents"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          <span v-badge.danger="slotProps.data.EksikSayi" class="mr-3"></span>
          {{ documentNames(slotProps.data.EksikEvraklar) }}
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
      default: () => [],
    },
  },
  data() {
    return {
      selectedOrder: null,
    };
  },
  methods: {
    documentNames(documents) {
      if (!documents) {
        return "";
      }
      return documents.map((x) => x.EvrakAdi).join(", ");
    },
    orderSelected(event) {
      this.$emit("missing_document_selected_emit", event.data);
    },
  },
};
</script>
