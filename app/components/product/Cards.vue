<template>
  <div class="container">
    <DataTable
      :value="shared.getCardList"
      paginator
      :rows="15"
      v-model:filters="filters"
      filterDisplay="row"
      v-model:selection="selectedCards"
      selectionMode="single"
      scrollable
      scrollHeight="var(--app-table-height)"
      @row-click="cardsSelected($event)"
    >
      <Column
        v-for="col in columns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            @input="filterCallback()"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
// [1] DEGISTI: "primevue/api" -> "@primevue/core/api"
import { FilterMatchMode } from "@primevue/core/api"
import { useSharedStore } from "~/stores/shared"

/*
 * Yedi kolonun tamami birebir ayniydi (yalnizca field/header farkli), bu
 * yuzden tekrar eden 120 satir tek bir v-for'a indirildi. Sira ve
 * davranis korundu.
 */
const COLUMNS = [
  { field: "ID", header: "Product Card Id" },
  { field: "KategoriAdi", header: "Category" },
  { field: "UrunAdi", header: "Product" },
  { field: "YuzeyIslemAdi", header: "Surface" },
  { field: "En", header: "Width" },
  { field: "Boy", header: "Height" },
  { field: "Kenar", header: "Thickness" },
]

export default {
  emits: ["cards_selected_emit"],

  setup() {
    /*
     * [2] socket yasam dongusu useRealtime()'a devredildi.
     * Orijinal hali (mounted + beforeDestroy) uc ayri sekilde bozuktu;
     * ayrintilar app/composables/useRealtime.ts ve app/stores/socket.ts
     * basindaki notlarda. Ozetle: dinleyici hic kaldirilmiyordu,
     * `if (this.socket)` daima false oldugu icin baglanti hic
     * kapatilmiyordu ve getSocket SSR'da null olacagi icin `.on(...)`
     * zincirlemesi sunucuda patlardi.
     */
    const shared = useSharedStore()
    useRealtime("card_list_update_on", () => shared.setCardList())
  },

  computed: {
    // [3] mapGetters(["getCardList"]) -> Pinia store'u
    shared() {
      return useSharedStore()
    },
    columns() {
      return COLUMNS
    },
  },

  data() {
    return {
      selectedCards: null,
      filters: Object.fromEntries(
        COLUMNS.map((c) => [c.field, { value: null, matchMode: FilterMatchMode.STARTS_WITH }]),
      ),
    }
  },

  methods: {
    cardsSelected(event) {
      this.$emit("cards_selected_emit", event.data)
    },
  },
}
</script>

<!--
  components/cards/list.vue -> app/components/product/Cards.vue

  DOSYA YOLU BILEREK DEGISTI: Nuxt 2'de bu bilesen `productCards` adiyla
  global kayitliydi (plugins/components.js), dosya yolu adla uyusmuyordu.
  Nuxt auto-import adi yoldan uretildigi icin cards/list.vue
  <CardsList> olurdu ve kullanan sablonlardaki <productCards> etiketi
  cozulemezdi -- Vue bunu yalnizca KONSOLA uyari olarak basar, sayfa
  hatasiz render edilir ve bilesen sessizce yok olur (pilotta Navbar ile
  bir kez yasandi). product/Cards.vue yolu <ProductCards> uretiyor.

  ZORUNLU degisiklikler:
  [1] import { FilterMatchMode } from "primevue/api" -> "@primevue/core/api"
  [2] mounted()/beforeDestroy() icindeki socket kurulumu -> useRealtime()
      Ayrica beforeDestroy artik Vue 3'te beforeUnmount; bu dosyada
      kanca tamamen kalktigi icin adlandirma sorunu da ortadan kalkti.
  [3] mapGetters(["getCardList"]) -> useSharedStore()
      Not: `setCardList` ve `getCardList` pilotun shared.ts'inde YOKTU --
      o dosya shared.js'in yalnizca ucunu kapsiyordu. Bu gecis sirasinda
      tamamlandi (bkz. app/stores/shared.ts basindaki birlesme notu).
  [4] :filters + @update:filters -> v-model:filters
      :selection                 -> v-model:selection
      (PrimeVue 4'te secim tek yonlu prop ile calismaz)
  [5] emits dizisi eklendi -- Vue 3'te bildirilmeyen emit attribute olarak
      dusuyor ve uyari veriyor.

  KALDIRILDI:
  - data.socket: hicbir zaman atanmiyordu, yalnizca beforeDestroy'daki
    olu kosulu besliyordu.
  - methods.test(event) { console.log(event) }: cagiran yok, hata ayiklama
    artigi.
  - :showFilterMatchModes="false" yalnizca ilk kolonda vardi ve
    filterDisplay="row" ile zaten etkisiz (match-mode menusu satir
    filtrelerinde gosterilmiyor).

  EKLENDI: scrollable + scrollHeight="var(--app-table-height)" -- pilotun
  diger liste tablolariyla ayni (bkz. assets/css/app.css).
-->
