<template>
  <div class="row">
    <div class="col">
      <DataTable
        :value="list"
        v-model:selection="selectedOfferList"
        selectionMode="single"
        @row-click="offerListSelected($event)"
      >
        <Column
          field="TeklifSahibi"
          header="Representative"
          headerClass="tableHeader"
          bodyClass="tableBody"
        />
        <Column
          field="TeklifSayisi"
          header="Quote Count"
          headerClass="tableHeader"
          bodyClass="tableBody"
        />
        <Column
          field="TeklifSayisiA"
          header="Quotes A"
          headerClass="tableHeader"
          bodyClass="tableBody"
        />
        <Column
          field="TeklifSayisiB"
          header="Quotes B"
          headerClass="tableHeader"
          bodyClass="tableBody"
        />
      </DataTable>
    </div>
    <div class="col">
      <DataTable :value="country" scrollable scrollHeight="450px">
        <Column
          field="Ulke"
          header="Country"
          headerClass="tableHeader"
          bodyClass="tableBody"
        />
        <Column
          field="TeklifSayisi"
          header="Total"
          headerClass="tableHeader"
          bodyClass="tableBody"
        />
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
    country: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  emits: [
    "offer_list_selected_emit",
    "offer_list_b_list_selected_emit",
  ],
  data() {
    return {
      selectedOfferList: null,
    }
  },
  methods: {
    /*
     * KORUNDU -- TEK TIKLAMA, IKI OLAY: ayni satir verisiyle hem A
     * listesi hem B listesi olayi yayiliyor. Ebeveyn (offers/index.vue)
     * ikisini AYRI action'lara bagliyor:
     *   offer_list_selected_emit        -> setOfferMainDetailList
     *   offer_list_b_list_selected_emit -> setOfferMainDetailBList
     * yani bir temsilci secildiginde iki liste birlikte cekiliyor.
     * Kasitli; tek olaya indirmek ebeveyni de degistirmek olurdu.
     */
    offerListSelected(event) {
      this.$emit("offer_list_selected_emit", event.data)
      this.$emit("offer_list_b_list_selected_emit", event.data)
    },
  },
}
</script>

<!--
  components/offers/list.vue -> app/components/offer/List.vue

  Otomatik ice alma adi `OfferList` -- Nuxt 2'deki global kayit adiyla
  AYNI (plugins/components.js:71).

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] :selection + @update:selection -> v-model:selection
      (Nuxt 2'deki hali Vue 2 .sync codemod ciktisiydi, commit c569066e5)
  [x] bos <Column ...></Column> uclari -> self-closing
  [x] `list` ve `country` prop'larina `default: () => []` eklendi --
      Nuxt 2'de default YOKTU, yani veri gelene kadar iki DataTable da
      :value="undefined" aliyordu. (container/FollowList.vue ile ayni
      duzeltme.)
  [x] `emits: [...]` bildirildi: Vue 3'te bildirilmeyen emit'ler DOM
      attribute'u olarak kok ogeye dusuyor ve uyari veriyor.

  NOT -- IKI TABLO, FARKLI VERI: soldaki tablo temsilci basina teklif
  sayilarini, sagdaki ulke basina toplamlari gosteriyor. Sagdakinin
  `TeklifSayisi` alani soldakiyle AYNI ADI tasiyor ama baska bir
  kaynaktan geliyor (ulke listesi); karistirilmamali.
-->
