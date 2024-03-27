<template>
  <div class="row">
    <div class="col-9">
      <DataTable
        :value="poList"
        scrollable
        scrollHeight="600px"
        :selection.sync="selectedPoList"
        selectionMode="single"
        @row-click="$emit('po_list_selected_emit', $event)"
        :loading="loading"
        :rowClass="rowClass"
        sortField="Balanced"
        :sortOrder="-1"
      >
        <Column field="SiparisNo" header="Purchase Order" headerClass="tableHeader" bodyClass="tableBody">
          <template #body="slotProps">
            {{ slotProps.data.SiparisNo }}
          </template>
        </Column>
        <Column field="SiparisTarihi" header="Order Date" headerClass="tableHeader" bodyClass="tableBody">
          <template #body="slotProps">
            {{ slotProps.data.SiparisTarihi | dateToString }}
          </template>
        </Column>
        <Column field="YuklemeTarihi" header="Shipment Date" headerClass="tableHeader" bodyClass="tableBody">
          <template #body="slotProps">
            {{ slotProps.data.YuklemeTarihi | dateToString }}
          </template>
        </Column>
        <Column field="Durum" header="Status" headerClass="tableHeader" bodyClass="tableBody"></Column>
        <Column field="OrderTotal" header="Order Total USD" headerClass="tableHeader" bodyClass="tableBody">
          <template #body="slotProps">
            {{ slotProps.data.OrderTotal | formatPriceUsd }}
          </template>
          <template #footer>
            {{ poListTotal.order | formatPriceUsd }}
          </template>
        </Column>
        <Column field="Paid" header="Paid Amount" headerClass="tableHeader" bodyClass="tableBody">
          <template #body="slotProps">
            {{ slotProps.data.Paid | formatPriceUsd }}
          </template>
          <template #footer>
            {{ poListTotal.paid | formatPriceUsd }}
          </template>
        </Column>
        <Column field="Balanced" header="Balance" headerClass="tableHeader" bodyClass="tableBody">
          <template #body="slotProps">
            <div
              :style="{
                backgroundColor: slotProps.data.Balanced > 8 ? 'green' : 'transparent',
                color: slotProps.data.Balanced > 8 ? 'white' : 'black',
              }"
            >
              {{ slotProps.data.Balanced | formatPriceUsd }}
            </div>
          </template>
          <template #footer>
            {{ poListTotal.balanced | formatPriceUsd }}
          </template>
        </Column>
        <Column field="Pesinat" header="Prepayment" headerClass="tableHeader" bodyClass="tableBody">
          <template #body="slotProps">
            {{ slotProps.data.Pesinat | formatPriceUsd }}
          </template>
          <template #footer>
            {{ poListTotal.advancedPayment | formatPriceUsd }}
          </template>
        </Column>
      </DataTable>
    </div>
    <div class="col-3">
      <DataTable
        :value="paidList"
        scrollable
        scrollHeight="600px"
        :selection.sync="selectedPoPaidDetailList"
        selectionMode="single"
        @row-click="$emit('po_paid_detail_list_selected_emit', $event)"
        :loading="loading"
      >
        <Column field="Tarih" header="Date">
          <template #body="slotProps">
            {{ slotProps.data.Tarih | dateToString }}
          </template>
        </Column>

        <Column field="Paid" header="Paid">
          <template #body="slotProps">
            {{ slotProps.data.Paid | formatPriceUsd }}
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
