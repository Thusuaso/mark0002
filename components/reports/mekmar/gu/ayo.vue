<template>
  <div class="container">
    <DataTable :value="list" :loading="loading">
      <Column field="MusteriAdi" header="Customer"></Column>
      <Column field="Proforma" header="Proforma">
        <template #body="slotProps">
          {{ slotProps.data.Proforma | formatPriceUsd }}
        </template>
      </Column>
      <Column field="Maliyet" header="Cost">
        <template #body="slotProps">
          {{ slotProps.data.Maliyet | formatPriceUsd }}
        </template>
      </Column>
      <Column field="ProfitUsd" header="Profit Usd">
        <template #body="slotProps">
          {{ slotProps.data.ProfitUsd | formatPriceUsd }}
        </template>
      </Column>
      <Column field="ProfitTl" header="Profit Tl">
        <template #body="slotProps">
          {{ slotProps.data.ProfitTl | formatPriceTl }}
        </template>
      </Column>
      <Column field="Odenen" header="Paid">
        <template #body="slotProps">
          {{ slotProps.data.Odenen | formatPriceUsd }}
        </template>
      </Column>
      <Column field="Kalan" header="Remainder">
        <template #body="slotProps">
          {{ slotProps.data.Kalan | formatPriceUsd }}
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
      required: false,
    },
  },
};
</script>
