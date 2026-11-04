<template>
  <div>
    <!-- A LIST -->
    <DataTable
      :value="list"
      scrollable
      scrollHeight="400px"
      v-model:selection="selectedOfferDetailListForm"
      selectionMode="single"
      @row-click="$emit('offer_detail_list_form_selected_emit', $event.data)"
      :rowClass="offerClass"
      v-model:filters="orderFilters"
      filterDisplay="row"
      @filter="aListFiltered($event)"
    >
      <Column
        field="Tarih"
        header="Date"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ dateToString(slotProps.data.Tarih) }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>

      <Column
        field="Sira"
        header="Queue"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>

      <Column
        field="MusteriAdi"
        header="Customer"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>

      <Column
        field="UlkeAdi"
        header="Country"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>

      <Column
        field="KullaniciAdi"
        header="Representative"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
        <template #footer>
          {{ aListTotal }}
        </template>
      </Column>

      <Column
        field="TeklifOncelik"
        header="Priority"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
    </DataTable>

    <!-- B LIST -->
    <DataTable
      :value="bList"
      scrollable
      scrollHeight="400px"
      v-model:selection="selectedOfferDetailListForm"
      selectionMode="single"
      @row-click="$emit('offer_detail_list_form_selected_emit', $event.data)"
      :rowClass="offerClass"
      v-model:filters="orderFiltersB"
      filterDisplay="row"
      @filter="bListFiltered($event)"
    >
      <template #header>
        <h3 class="header">B List</h3>
      </template>

      <Column
        field="Tarih"
        header="Tarih"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ dateToString(slotProps.data.Tarih) }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>

      <Column
        field="Sira"
        header="Queue"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>

      <Column
        field="MusteriAdi"
        header="Customer"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>

      <Column
        field="UlkeAdi"
        header="Country"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>

      <Column
        field="KullaniciAdi"
        header="Representative"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
        <template #footer>
          {{ bListTotal }}
        </template>
      </Column>

      <Column
        field="TeklifOncelik"
        header="Priority"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import { FilterMatchMode } from "@primevue/core/api"
import { useOfferStore } from "~/stores/offer"

/* Iki tablonun da ayni alti kolonu, ayni baslangic filtresiyle. */
const makeFilters = () => ({
  Tarih: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  Sira: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  MusteriAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  UlkeAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  KullaniciAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  TeklifOncelik: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
})

export default {
  props: {
    list: {
      type: Array,
      required: false,
      default: () => [],
    },
    bList: {
      type: Array,
      required: false,
      default: () => [],
    },
    aListTotal: {
      type: Number,
      required: false,
      default: 0,
    },
    bListTotal: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  emits: ["offer_detail_list_form_selected_emit"],
  computed: {
    offerStore() {
      return useOfferStore()
    },
  },
  data() {
    return {
      selectedOfferDetailListForm: null,
      orderFilters: makeFilters(),
      orderFiltersB: makeFilters(),
    }
  },
  methods: {
    bListFiltered(event) {
      this.offerStore.setOfferBListTotal(event.filteredValue)
    },
    aListFiltered(event) {
      this.offerStore.setOfferAListTotal(event.filteredValue)
    },
    offerClass(event) {
      const color = event.TeklifOncelik === "Toplantı" ? "yellow" : ""
      const color_2 = event.TeklifOncelik === "D" ? "green" : ""
      return [color, color_2]
    },
  },
}
</script>

<style scoped>
:deep(.yellow) {
  background-color: rgb(242, 255, 0) !important;
  border: 1px solid gray;
}
:deep(.green) {
  background-color: rgb(155, 213, 177) !important;
  border: 1px solid gray;
}
</style>

<!--
  components/offers/detail.vue -> app/components/offer/Detail.vue

  Otomatik ice alma adi `OfferDetail` -- Nuxt 2'deki global kayit adiyla
  AYNI (plugins/components.js:72).

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] import { FilterMatchMode } from "primevue/api"
         -> "@primevue/core/api"      (alt paket v4'te TAMAMEN kaldirildi)
  [x] :selection + @update:selection -> v-model:selection
      :filters   + @update:filters   -> v-model:filters   (iki tabloda da)
  [x] dort prop'a `default` eklendi -- Nuxt 2'de hicbirinde yoktu:
      list/bList icin `() => []` (yoksa DataTable :value="undefined"),
      aListTotal/bListTotal icin 0 (yoksa footer'da "undefined" yaziyordu
      veri gelene kadar).
  [x] `emits: [...]` bildirildi.
  [x] this.$store.dispatch("setOfferAListTotal"/"setOfferBListTotal")
         -> useOfferStore()

  [x] Iki ayni filtre nesnesi tek bir makeFilters() fabrikasina alindi.
      FABRIKA OLMASI ZORUNLU, paylasilan sabit DEGIL: iki tablonun
      filtreleri BAGIMSIZ olmali. Tek nesne paylasilsa A listesinde
      yazilan filtre B listesini de suzerdi.

  ALTI KOLON IKI TABLODA DA AYRI AYRI YAZILI BIRAKILDI (v-for'a
  INDIRILMEDI): bes kolon ayni ama BESINCISI (KullaniciAdi) bir #footer
  slot'u tasiyor ve iki tabloda farkli toplami gosteriyor
  (aListTotal / bListTotal). Vue'da bir slot'u kosullu olarak ATLAMAK
  temiz degil; v-for'a indirmek ya footer'i tum kolonlara koymak ya da
  kolonu donguden cikarip sirayi bozmak olurdu. Ayni dersi
  customer/offer/List.vue'da da aldim (orada dongu kolon dusurmustu),
  bu yuzden burada acik yazim tercih edildi.

  == KORUNAN DAVRANISLAR (bilincli) ==

  1) IKI TABLO AYNI `selectedOfferDetailListForm` DEGISKENINI PAYLASIYOR.
     A listesinde bir satir secilince B listesindeki secim kalkiyor ve
     tersi. Kaynakta da ayni tek degisken kullaniliyordu. Ayirmak
     gorunur bir degisiklik olurdu (iki tabloda ayni anda secim).

  2) B LISTESININ TARIH KOLONU BASLIGI "Tarih" (Turkce), A listesinde
     ayni kolon "Date". Tablonun geri kalani tamamen Ingilizce, yani
     bu bir gozden kacma; ama GORUNUR bir metin oldugu icin
     degistirilmedi.

  3) `@row-click` ile `@filter` BIRLIKTE: filtre her degistiginde
     store'a filtrelenmis satirlar yaziliyor ve toplam oradan geliyor.
     Baslangicta (hic filtre yokken) @filter TETIKLENMEZ, dolayisiyla
     aListTotal/bListTotal ilk acilista store'un onceki degerini
     gosterir. Kaynakta da boyle.
-->
