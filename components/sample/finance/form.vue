<template>
  <div>
    <DataTable :value="list" :loading="loading">
      <Column field="NumuneNo" header="Po"></Column>
      <Column field="NumuneTarihi" header="G.Tarihi">
        <template #body="slotProps">
          {{ slotProps.data.NumuneTarihi | dateToString }}
        </template>
      </Column>
      <Column field="YuklemeTarihi" header="Y.Tarihi">
        <template #body="slotProps">
          {{ slotProps.data.YuklemeTarihi | dateToString }}
        </template>
      </Column>
      <Column field="GonderiAdi" header="Gönderi Tipi"></Column>
      <Column field="BankaAdi" header="Banka Tipi"></Column>
      <Column field="KuryeAlis" header="Alış ($)">
        <template #body="slotProps">
          {{ slotProps.data.KuryeAlis | formatPriceUsd }}
        </template>
      </Column>
      <Column field="KuryeSatis" header="Satış ($)">
        <template #body="slotProps">
          {{ slotProps.data.KuryeSatis | formatPriceUsd }}
        </template>
      </Column>
      <Column field="Euro_Alis" header="Alış (€)">
        <template #body="slotProps">
          {{ slotProps.data.Euro_Alis | formatPriceEuro }}
        </template>
      </Column>
      <Column field="Euro_Satis" header="Satış (€)">
        <template #body="slotProps">
          {{ slotProps.data.Euro_Satis | formatPriceEuro }}
        </template>
      </Column>
      <Column field="TL_Alis" header="Alış (₺)">
        <template #body="slotProps">
          {{ slotProps.data.TL_Alis | formatPriceTl }}
        </template>
      </Column>
      <Column field="TL_Satis" header="Satış (₺)">
        <template #body="slotProps">
          {{ slotProps.data.TL_Satis | formatPriceTl }}
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
    loading: {
      type: Boolean,
      required:false
    }
  },
};
</script>
