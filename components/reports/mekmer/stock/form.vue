<template>
  <div>
    <DataTable :value="list" :loading="loading">
      <Column field="Tarih" header="Tarih">
        <template #body="slotProps">
          {{ slotProps.data.Tarih | dateToString }}
        </template>
      </Column>
      <Column field="KasaNo" header="Kasa No"></Column>
      <Column field="FirmaAdi" header="Tedarikçi"></Column>
      <Column field="OcakAdi" header="Ocak"></Column>
      <Column field="KategoriAdi" header="Kategori"></Column>
      <Column field="UrunAdi" header="Ürün"></Column>
      <Column field="YuzeyIslemAdi" header="Yüzey"></Column>
      <Column field="En" header="En"></Column>
      <Column field="Boy" header="Boy"></Column>
      <Column field="Kenar" header="Kenar"></Column>
      <Column field="BirimAdi" header="Birim"></Column>
      <Column field="Miktar" header="Miktar">
        <template #body="slotProps">
          {{ slotProps.data.Miktar | formatDecimal }}
        </template>
        <template #footer>
          {{ total.amount | formatDecimal }}
        </template>
      </Column>
      <Column field="Adet" header="Adet">
        <template #body="slotProps">
          {{ slotProps.data.Adet | formatDecimal }}
        </template>
        <template #footer>
          {{ total.piece | formatDecimal }}
        </template>
      </Column>
      <Column field="SiparisAciklama" header="Status"></Column>
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
    loading: {
      type: Boolean,
      required: false,
    },
  },
};
</script>
