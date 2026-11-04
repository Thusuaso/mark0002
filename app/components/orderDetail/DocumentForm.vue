<template>
  <div>
    <DataTable :value="list">
      <Column field="YuklemeEvrakID" header="Y.ID" />
      <Column field="SiparisFaturaTurID" header="S.ID" />
      <Column field="Tarih" header="Upload Date">
        <template #body="slotProps">
          {{ dateToString(slotProps.data.Tarih) }}
        </template>
      </Column>
      <Column field="Evrak" header="Document Name" />
      <Column field="Link" header="Link">
        <template #body="slotProps">
          <a :href="slotProps.data.Link">
            <i class="pi pi-download" />
          </a>
        </template>
      </Column>
      <Column field="kullanici" header="Document Rep" />
      <Column header="#">
        <template #body="slotProps">
          <Button
            v-if="slotProps.data.Evrak == 'Proforma Invoice'"
            label="Sil"
            severity="danger"
            @click="proformaDelete(slotProps.data.ID)"
          />
          <Button
            v-if="slotProps.data.YuklemeEvrakID == 3"
            label="Sil"
            severity="danger"
            @click="isfDelete(slotProps.data)"
          />
          <Button
            v-if="slotProps.data.YuklemeEvrakID == 200"
            label="Sil"
            severity="danger"
            @click="drawingDelete(slotProps.data.ID)"
          />
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
  methods: {
    drawingDelete(id) {
      if (confirm("Are you sure you want to delete?")) {
        this.$emit("drawing_delete_emit", id)
      }
    },
    isfDelete(event) {
      if (confirm("Are you sure you want to delete?")) {
        this.$emit("isf_delete_emit", event)
      }
    },
    proformaDelete(id) {
      if (confirm("Are you sure you want to delete?")) {
        this.$emit("proforma_delete_emit", id)
      }
    },
  },
}
</script>

<!--
  components/orders/forms/document.vue
    -> app/components/orderDetail/DocumentForm.vue

  DOSYA ADI: Nuxt 2'de `orderDetailDocumentForm` adiyla global kayitliydi;
  yol o adi uretecek sekilde secildi (bkz. CostForm.vue'deki aciklama).

  [1] class="p-button-danger" -> severity="danger"
      PrimeVue 4'te buton renk siniflari kaldirildi, yerine `severity`
      prop'u geldi. p-button-danger siniifi artik hicbir sey yapmiyor --
      birebir tasinsa butonlar KIRMIZI DEGIL duz renk cikardi ve "Sil"
      butonu normal butondan ayirt edilemezdi.

  [2] Bos <Column ...></Column> ciftleri self-closing yapildi; govdesi
      olmayan kolonlarda `<template #body>` ile ayni field'i basan
      gereksiz sarmalayicilar kaldirildi (YuklemeEvrakID,
      SiparisFaturaTurID). Davranis ayni: #body verilmezse PrimeVue
      field'i oldugu gibi basar.

  [3] KALDIRILDI: watch: { list() { console.log(this.list) } }
      Unutulmus hata ayiklama kodu -- liste her degistiginde konsola tum
      evrak dizisini basiyordu. Davranisa katkisi yok.

  KORUNDU: confirm() ile onay. PrimeVue'nun ConfirmDialog'u daha uygun
  olurdu ama bu bir davranis/gorunum degisikligi; gecis kapsami disinda
  birakildi. Yalnizca tiklama isleyicisinde cagrildigi icin SSR'da
  calismiyor, sorun cikarmaz.
-->
