<template>
  <div class="container">
    <DataTable :value="products">
      <Column field="KategoriAdi" header="Kategori"></Column>
      <Column field="UrunAdi" header="Ürün"></Column>
      <Column field="YuzeyIslemAdi" header="Yüzey"></Column>
      <Column field="En" header="En"></Column>
      <Column field="Boy" header="Boy"></Column>
      <Column field="Kenar" header="Kenar"></Column>
      <Column field="Miktar" header="Miktar">
        <template #body="slotProps">
          {{ slotProps.data.Miktar | formatDecimal }}
        </template>
      </Column>
      <Column field="BirimAdi" header="Birim"></Column>
      <Column field="SatisFiyati" header="Fiyat">
        <template #body="slotProps">
          {{ slotProps.data.SatisFiyati | formatPriceUsd }}
        </template>
      </Column>
      <Column field="SatisToplam" header="Toplam">
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
