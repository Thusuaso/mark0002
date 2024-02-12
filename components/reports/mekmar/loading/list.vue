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
        <template #header> Aylık Yükleme </template>
        <Column field="YuklemeTarihi" header="Y.Tarih">
          <template #body="slotProps">
            {{ slotProps.data.YuklemeTarihi | dateToString }}
          </template>
        </Column>
        <Column field="SiparisTarihi" header="S.Tarih">
          <template #body="slotProps">
            {{ slotProps.data.SiparisTarihi | dateToString }}
          </template>
        </Column>
        <Column field="SiparisNo" header="SiparisNo"></Column>
        <Column field="MusteriAdi" header="Müşteri"></Column>

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
        <template #header> Yıllık Yükleme </template>
        <Column field="MusteriAdi" header="Müşteri"></Column>
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
