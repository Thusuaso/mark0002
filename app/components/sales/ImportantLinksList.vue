<template>
  <div>
    <DataTable
      :value="list"
      v-model:selection="selectedLinkList"
      selectionMode="single"
      @row-click="linkListSelected($event)"
    >
      <Column field="ID" header="ID" />
      <Column field="Description" header="Desc." />
      <Column field="Link" header="Link">
        <template #body="slotProps">
          <a :href="slotProps.data.Link" target="_blank" rel="noopener">Link</a>
        </template>
      </Column>
      <Column field="SaveDate" header="Date">
        <template #body="slotProps">
          {{ dateToString(slotProps.data.SaveDate) }}
        </template>
      </Column>
      <Column field="Username" header="User" />
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
  },

  data() {
    return {
      selectedLinkList: null,
    }
  },

  methods: {
    linkListSelected(event) {
      this.$emit("link_list_selected_emit", event)
    },
  },
}
</script>

<!--
  components/sales/ImportantLinksList.vue
  (Nuxt 2: components/sales/important-links/list.vue)

  Etiket adi <SalesImportantLinksList>. Nuxt 2'de ad `importantLinksList`
  idi (plugins/components.js:179, ELLE kayit).

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] :selection + @update:selection -> v-model:selection
      Nuxt 2'deki hali Vue 2 .sync codemod ciktisiydi.

  [x] responsiveLayout="scroll" KALDIRILDI.
      PrimeVue 4'te bu prop YOK -- paket kaynaginda adi hic gecmiyor.
      v3'te "scroll" davranisi artik varsayilan; prop birakilsa Vue onu
      tanimadigi icin kok ogeye DOM attribute'u olarak duser
      (responsivelayout="scroll") -- zararsiz ama olu.

      DIKKAT: pilotta bu olu prop daha bes yerde duruyor
      (finance/PoList.vue, order/DivideDialog.vue, order/ShippedList.vue,
      order/Table2.vue x2). Davranisa etkisi olmadigi icin burada
      yalnizca yeni dosya temiz yazildi.

  [x] <Column ...></Column> -> <Column ... />

  [x] rel="noopener" EKLENDI.
      target="_blank" ile acilan baglanti, rel="noopener" olmadan hedef
      sayfaya window.opener uzerinden bu sekmeye erisim veriyor. Bu liste
      KULLANICILARIN GIRDIGI serbest URL'leri aciyor, yani hedef guvenilir
      degil. Modern tarayicilar target="_blank" icin noopener'i varsayilan
      yapti, ama acikca yazmak eski tarayicilarda da kapatiyor.
      Gorunum ve davranis degismiyor.

  NOT: dateToString global olarak kayitli (app/plugins/formatters.ts);
  GOSTERIM bicimi uretiyor -> "02-10-2026". API'ye tarih YAZARKEN
  utils/dates.ts icindeki toIsoDate kullanilmali.
-->
