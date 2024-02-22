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
      >
        <Column field="SiparisNo" header="Purchase Order"></Column>
        <Column field="SiparisTarihi" header="Order Date">
          <template #body="slotProps">
            {{ slotProps.data.SiparisTarihi | dateToString }}
          </template>
        </Column>
        <Column field="YuklemeTarihi" header="Shipment Date">
          <template #body="slotProps">
            {{ slotProps.data.YuklemeTarihi | dateToString }}
          </template>
        </Column>
        <Column field="Durum" header="Status"></Column>
        <Column field="OrderTotal" header="Order Total USD">
          <template #body="slotProps">
            {{ slotProps.data.OrderTotal | formatPriceUsd }}
          </template>
          <template #footer>
            {{ poListTotal.order | formatPriceUsd }}
          </template>
        </Column>
        <Column field="Paid" header="Paid Amount">
          <template #body="slotProps">
            {{ slotProps.data.Paid | formatPriceUsd }}
          </template>
          <template #footer>
            {{ poListTotal.paid | formatPriceUsd }}
          </template>
        </Column>
        <Column field="Balanced" header="Balance">
          <template #body="slotProps">
            {{ slotProps.data.Balanced | formatPriceUsd }}
          </template>
          <template #footer>
            {{ poListTotal.balanced | formatPriceUsd }}
          </template>
        </Column>
        <Column field="Pesinat" header="Prepayment">
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
};
</script>
