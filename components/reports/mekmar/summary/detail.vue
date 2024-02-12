<template>
  <div>
    <DataTable :value="list" class="p-datatable-sm">
      <Column field="SiparisTarihi" header="Tarih">
        <template #body="slotProps">
          {{ slotProps.data.SiparisTarihi | dateToString }}
        </template>
      </Column>
      <Column field="SiparisNo" header="Po"></Column>
      <Column field="FirmaAdi" header="Müşteri"></Column>
      <Column field="TeslimTur" header="Teslim Tür"></Column>
      <Column field="Fob" header="Fob">
        <template #body="slotProps">
          {{ slotProps.data.Fob | formatPriceUsd }}
        </template>
        <template #footer>
          {{ total.fob | formatPriceUsd }}
        </template>
      </Column>
      <Column field="NavlunSatis" header="Navlun S.">
        <template #body="slotProps">
          {{ slotProps.data.NavlunSatis | formatPriceUsd }}
        </template>
        <template #footer>
          {{ total.freight | formatPriceUsd }}
        </template>
      </Column>
      <Column field="DetayTutar_1" header="Detay Tutar 1">
        <template #body="slotProps">
          {{ slotProps.data.DetayTutar_1 | formatPriceUsd }}
        </template>
        <template #footer>
          {{ total.detail1 | formatPriceUsd }}
        </template>
      </Column>
      <Column field="DetayTutar_2" header="Detay Tutar 2">
        <template #body="slotProps">
          {{ slotProps.data.DetayTutar_2 | formatPriceUsd }}
        </template>
        <template #footer>
          {{ total.detail2 | formatPriceUsd }}
        </template>
      </Column>
      <Column field="DetayTutar_3" header="Detay Tutar 3">
        <template #body="slotProps">
          {{ slotProps.data.DetayTutar_3 | formatPriceUsd }}
        </template>
        <template #footer>
          {{ total.detail3 | formatPriceUsd }}
        </template>
      </Column>
      <Column field="DetayTutar_4" header="Detay Tutar 4">
        <template #body="slotProps">
          {{ slotProps.data.DetayTutar_4 | formatPriceUsd }}
        </template>
        <template #footer>
          {{ total.detail4 | formatPriceUsd }}
        </template>
      </Column>
      <Column field="Ddp" header="Ddp">
        <template #body="slotProps">
          {{ slotProps.data.Ddp | formatPriceUsd }}
        </template>
        <template #footer>
          {{ total.ddp | formatPriceUsd }}
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
      required: true,
    },
    total: {
      type: Object,
      required: true,
    },
  },
};
</script>
