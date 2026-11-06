<template>
  <div class="col-12 col-lg-3">
    <DataTable :value="list.data" >
      <template #header>
        {{ list.year }}
      </template>
      <Column field="Ay" header="Month" headerClass="tableHeader" bodyClass="tableBody">
        <template #body="slotProps">
          {{ monthToString(slotProps.data.Ay) }}
        </template>
      </Column>
      <Column field="Fob" header="Fob" headerClass="tableHeader" bodyClass="tableBody">
        <template #body="slotProps">
          {{ formatPriceUsd(slotProps.data.Fob) }}
        </template>
        <template #footer>
          {{ formatPriceUsd(list.fob) }}
        </template>
      </Column>
      <Column field="Ddp" header="Ddp" headerClass="tableHeader" bodyClass="tableBody">
        <template #body="slotProps">
          {{ formatPriceUsd(slotProps.data.Ddp) }}
        </template>
        <template #footer>
          {{ formatPriceUsd(list.ddp) }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      /*
       * DIKKAT: DIZI DEGIL NESNE -- { year, data[], fob, ddp }.
       * Sayfa bunu v-for ile yillar dizisinden tek tek veriyor.
       */
      type: Object,
      required: false,
      default: () => ({ year: "", data: [], fob: 0, ddp: 0 }),
    },
  },
};
</script>

<!--
  components/reports/mekmar/gu/forwarding.vue
     -> app/components/reports/mekmar/gu/ForwardingList.vue

  Bu bileşen pages/reports/mekmar/gu.vue'nun bir TabView sekmesini
  dolduruyor. Sayfa ve iki buyuk operasyon bileşeni
  (ordererOperation / shippedOperation) SONRAKI commit'te; bu commit
  sekmelerin hafif olanlarini getiriyor.

  Otomatik ice alma adi `ReportsMekmarGuForwardingList` -- Nuxt 2'deki
  global kayit adiyla AYNI (plugins/components.js:66).

  DIKKAT -- ADI BENZEYEN BASKA BIR BILESEN VAR: pilotta
  app/components/reports/mekmar/ForwardingList.vue zaten duruyor
  (`ReportsMekmarForwardingList`) ve BASKA bir sayfaya ait
  (reports/mekmar/forwarding.vue). `gu/` alt klasoru sayesinde adlar
  cakismiyor (check-name-collisions dogruladi).

  IKI SEKMEDE DE KULLANILIYOR: sayfa bunu "Shipment Summary (Yearly)" ve
  "Order Summary (Yearly)" sekmelerinde v-for ile yil basina bir kez
  render ediyor -- yani ayni bileşen iki ayri veri kumesini gosteriyor.

  `list` PROP'U DIZI DEGIL NESNE: { year, data[], fob, ddp }. Tablo
  satirlari `list.data`dan, baslik `list.year`den, footer toplamlari
  `list.fob`/`list.ddp`den geliyor. default olarak bu dort alani olan
  bos bir nesne verildi -- kaynakta default YOKTU ve veri gelene kadar
  `list.data` okunurken "Cannot read properties of undefined" riski
  vardi.
-->
