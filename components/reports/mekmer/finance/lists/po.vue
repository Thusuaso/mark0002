<template>
  <div class="row">
    <div class="col-9">
      <DataTable :value="poList" scrollable scrollHeight="600px" :selection.sync="selectedPoList" selectionMode="single"
        @row-click="$emit('po_list_selected_emit', $event)" :loading="loading" :rowClass="rowClass" sortField="kalan"
        :sortOrder="-1">
        <Column field="siparisno" header="Purchase Order" headerClass="tableHeader" bodyClass="tableBody">
          <template #body="slotProps">
            {{ slotProps.data.siparisno }}
          </template>
        </Column>

        <Column field="yuklemetarihi" header="Shipment Date" headerClass="tableHeader" bodyClass="tableBody">
          <template #body="slotProps">
            {{ slotProps.data.yuklemetarihi | dateToString }}
          </template>
        </Column>
        <Column field="tip" header="Status" headerClass="tableHeader" bodyClass="tableBody"></Column>
        <Column field="toplam" header="Order Total USD" headerClass="tableHeader" bodyClass="tableBody">
          <template #body="slotProps">
            {{ slotProps.data.toplam | formatPriceUsd }}
          </template>
          <template #footer>
            {{ poListTotal.order | formatPriceUsd }}
          </template>
        </Column>
        <Column field="odenen_tutar" header="Payment Received" headerClass="tableHeader" bodyClass="tableBody">
          <template #body="slotProps">
            {{ slotProps.data.odenen_tutar | formatPriceUsd }}
          </template>
          <template #footer>
            {{ poListTotal.paid | formatPriceUsd }}
          </template>
        </Column>
        <Column field="kalan" header="Balance" headerClass="tableHeader" bodyClass="tableBody">
          <template #body="slotProps">
            <div :style="{
  backgroundColor: slotProps.data.kalan > 8 ? 'green' : 'transparent',
  color: slotProps.data.kalan > 8 ? 'white' : 'black',
              }">
              {{ slotProps.data.kalan | formatPriceUsd }}
            </div>
          </template>
          <template #footer>
            {{ poListTotal.balanced | formatPriceUsd }}
          </template>
        </Column>

      </DataTable>
    </div>
    <div class="col-3">
      <DataTable :value="paidList" scrollable scrollHeight="600px" :loading="loading">
        <Column field="tarih" header="Date">
          <template #body="slotProps">
            {{ slotProps.data.tarih | dateToString }}
          </template>
        </Column>

        <Column field="tutar" header="Paid">
          <template #body="slotProps">
            {{ slotProps.data.tutar | formatPriceUsd }}
          </template>
          <template #footer>
            {{ paidListTotal | formatPriceUsd }}
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    poList: {
      type: Array,
      required: false,
    },
    paidList: {
      type: Array,
      required: false,
    },
    poListTotal: {
      type: Object,
      required: false,
    },
    paidListTotal: {
      type: Number,
      required: false,
    },
    loading: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      selectedPoList: null,
      selectedPoPaidDetailList: null,
    };
  },
  methods: {
    rowClass(event) {
      return event.MayaControl ? "red-row" : "";
    },
  },
};
</script>
<style scoped>
:deep(.red-row) {
  border: 1px solid yellow !important;
  color: black !important;
}
</style>
