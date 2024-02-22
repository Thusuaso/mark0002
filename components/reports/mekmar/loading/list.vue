<template>
  <div class="row">
    <div class="col">
      <DataTable
        :value="list"
        scrollable
        scrollHeight="600px"
        sortField="DDP"
        :sortOrder="-1"
        :loading="loading"
      >
        <template #header> Shipment (Monthly) </template>
        <Column field="YuklemeTarihi" header="S.Date">
          <template #body="slotProps">
            {{ slotProps.data.YuklemeTarihi | dateToString }}
          </template>
        </Column>
        <Column field="SiparisTarihi" header="O.Date">
          <template #body="slotProps">
            {{ slotProps.data.SiparisTarihi | dateToString }}
          </template>
        </Column>
        <Column field="SiparisNo" header="Po"></Column>
        <Column field="MusteriAdi" header="Customer"></Column>

        <Column field="FOB" header="Fob">
          <template #body="slotProps">
            {{ slotProps.data.FOB | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.fob | formatPriceUsd }}
          </template>
        </Column>
        <Column field="DDP" header="Ddp">
          <template #body="slotProps">
            {{ slotProps.data.DDP | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.ddp | formatPriceUsd }}
          </template>
        </Column>
      </DataTable>
    </div>
    <div class="col">
      <DataTable
        :value="listYear"
        scrollable
        scrollHeight="600px"
        sortField="DDP"
        :sortOrder="-1"
        :loading="loading"
      >
        <template #header> Shipment (Yearly) </template>
        <Column field="MusteriAdi" header="Customer"></Column>
        <Column field="FOB" header="FOB">
          <template #body="slotProps">
            {{ slotProps.data.FOB | formatPriceUsd }}
          </template>
          <template #footer>
            {{ listYearTotal.fob | formatPriceUsd }}
          </template>
        </Column>
        <Column field="DDP" header="DDP">
          <template #body="slotProps">
            {{ slotProps.data.DDP | formatPriceUsd }}
          </template>
          <template #footer>
            {{ listYearTotal.ddp | formatPriceUsd }}
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
    total: {
      type: Object,
      required: false,
    },
    listYear: {
      type: Array,
      required: false,
    },
    listYearTotal: {
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
