<template>
  <div class="container">
    <DataTable :value="products">
      <Column field="KategoriAdi" header="Category"></Column>
      <Column field="UrunAdi" header="Product"></Column>
      <Column field="YuzeyIslemAdi" header="Surface"></Column>
      <Column field="En" header="Width"></Column>
      <Column field="Boy" header="Height"></Column>
      <Column field="Kenar" header="Edge"></Column>
      <Column field="Miktar" header="Amount">
        <template #body="slotProps">
          {{ slotProps.data.Miktar | formatDecimal }}
        </template>
      </Column>
      <Column field="BirimAdi" header="Unit"></Column>
      <Column field="SatisFiyati" header="Price">
        <template #body="slotProps">
          {{ slotProps.data.SatisFiyati | formatPriceUsd }}
        </template>
      </Column>
      <Column field="SatisToplam" header="Total">
        <template #body="slotProps">
          {{ slotProps.data.SatisToplam | formatPriceUsd }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script>
export default {
  props: {
    products: {
      type: Array,
      required: false,
    },
  },
};
</script>
