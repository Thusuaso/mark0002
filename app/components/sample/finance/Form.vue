<template>
  <div>
    <DataTable :value="list" >
      <Column field="NumuneNo" header="Po"></Column>
      <Column field="NumuneTarihi" header="Shipment Date">
        <template #body="slotProps">
          {{ dateToString(slotProps.data.NumuneTarihi) }}
        </template>
      </Column>
      <Column field="YuklemeTarihi" header="Y.Tarihi">
        <template #body="slotProps">
          {{ dateToString(slotProps.data.YuklemeTarihi) }}
        </template>
      </Column>
      <Column field="GonderiAdi" header="Shipment Type"></Column>
      <Column field="BankaAdi" header="Banka Tipi"></Column>
      <Column field="KuryeAlis" header="Alış ($)">
        <template #body="slotProps">
          {{ formatPriceUsd(slotProps.data.KuryeAlis) }}
        </template>
      </Column>
      <Column field="KuryeSatis" header="Satış ($)">
        <template #body="slotProps">
          {{ formatPriceUsd(slotProps.data.KuryeSatis) }}
        </template>
      </Column>
      <Column field="Euro_Alis" header="Alış (€)">
        <template #body="slotProps">
          {{ formatPriceEuro(slotProps.data.Euro_Alis) }}
        </template>
      </Column>
      <Column field="Euro_Satis" header="Satış (€)">
        <template #body="slotProps">
          {{ formatPriceEuro(slotProps.data.Euro_Satis) }}
        </template>
      </Column>
      <Column field="TL_Alis" header="Alış (₺)">
        <template #body="slotProps">
          {{ formatPriceTl(slotProps.data.TL_Alis) }}
        </template>
      </Column>
      <Column field="TL_Satis" header="Satış (₺)">
        <template #body="slotProps">
          {{ formatPriceTl(slotProps.data.TL_Satis) }}
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
    },

  },
};
</script>
