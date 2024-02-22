<template>
  <div>
    <DataTable :value="list" :loading="loading">
      <Column field="Tarih" header="Tarih">
        <template #body="slotProps">
          {{ slotProps.data.Tarih | dateToString }}
        </template>
      </Column>
      <Column field="KasaNo" header="Crate No"></Column>
      <Column field="FirmaAdi" header="Supplier"></Column>
      <Column field="OcakAdi" header="Mine"></Column>
      <Column field="KategoriAdi" header="Category"></Column>
      <Column field="UrunAdi" header="Product"></Column>
      <Column field="YuzeyIslemAdi" header="Surface"></Column>
      <Column field="En" header="Width"></Column>
      <Column field="Boy" header="Height"></Column>
      <Column field="Kenar" header="Edge"></Column>
      <Column field="BirimAdi" header="Unit"></Column>
      <Column field="Miktar" header="Amount">
        <template #body="slotProps">
          {{ slotProps.data.Miktar | formatDecimal }}
        </template>
        <template #footer>
          {{ total.amount | formatDecimal }}
        </template>
      </Column>
      <Column field="Adet" header="Piece">
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
