<template>
  <div class="row">
    <div class="col">
      <DataTable :value="list" scrollable scrollHeight="450px" >
        <Column
          field="SiparisNo"
          header="Po"
          headerClass="tableHeader"
          bodyClass="tableBody"
        />
        <Column
          field="DetayTutar_4"
          header="Mekus"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ formatPriceUsd(slotProps.data.DetayTutar_4) }}
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
};
</script>

<!--
  components/reports/mekmar/gu/mekus.vue
     -> app/components/reports/mekmar/gu/MekusList.vue

  Bu bileşen pages/reports/mekmar/gu.vue'nun bir TabView sekmesini
  dolduruyor. Sayfa ve iki buyuk operasyon bileşeni
  (ordererOperation / shippedOperation) SONRAKI commit'te; bu commit
  sekmelerin hafif olanlarini getiriyor.

  Otomatik ice alma adi `ReportsMekmarGuMekusList` -- Nuxt 2'deki global
  kayit adiyla AYNI (plugins/components.js:64).

  == SU AN ERISILEMEZ -- AMA BILEREK TASINDI ==
  Sayfadaki "Mekus" TabPanel'i kaynakta TAMAMEN YORUMDA:
      (yorum) <TabPanel header="Mekus">
                <reportsMekmarGuMekusList :list="..." />
              </TabPanel> (yorum sonu)
  Yani bu bileşen bugun hicbir yerden render edilmiyor.

  Yine de tasindi: pilotun yerlesik karari, yorumdaki blogu ve onun
  ihtiyaci olan parcalari KORUMAK, boylece sekme yeniden acildiginda
  calisir halde olsun (ayni karar reports/mekmar/{ayo,forwarding}.vue'da
  yorumdaki <JsonExcel> bloklari ve finance/index.vue'daki
  financeListExcelFields icin de verilmisti).

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:
  [x] Bos <Column ...></Column> -> self-closing
  [x] `list` prop'una `default: () => []` eklendi (kaynakta yoktu)
-->
