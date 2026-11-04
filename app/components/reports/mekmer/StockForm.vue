<template>
  <div>
    <DataTable :value="list" >
      <Column field="Tarih" header="Tarih">
        <template #body="slotProps">
          {{ dateToString(slotProps.data.Tarih) }}
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
      <Column field="Kenar" header="Thickness"></Column>
      <Column field="BirimAdi" header="Unit"></Column>
      <Column field="Miktar" header="Amount">
        <template #body="slotProps">
          {{ formatDecimal(slotProps.data.Miktar) }}
        </template>
        <template #footer>
          {{ formatDecimal(total.amount) }}
        </template>
      </Column>
      <Column field="Adet" header="Piece">
        <template #body="slotProps">
          {{ formatDecimal(slotProps.data.Adet) }}
        </template>
        <template #footer>
          {{ formatDecimal(total.piece) }}
        </template>
      </Column>
      <Column field="SiparisAciklama" header="Status"></Column>
      <Column field="Aciklama" header="Desc."></Column>
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

<!--
  components/reports/mekmer/stock/form.vue -> ReportsMekmerStockForm

  Bu bilesen SAF SABLON: store'a, $axios'a, primevue/api'ye hic
  dokunmuyor; props (list, total) disinda durumu yok.

  ZORUNLU DEGISIKLIK GEREKMEDI.

  Sablondaki dateToString / formatDecimal, Nuxt 2'de
  `Vue.mixin({ methods: formatters })` ile geliyordu; pilotta ayni isi
  app/plugins/formatters.ts yapiyor, yani cagri yerleri aynen calisiyor.
-->
