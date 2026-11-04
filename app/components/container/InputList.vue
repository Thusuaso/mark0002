<template>
  <div>
    <DataTable
      :value="list"
      paginator
      :rows="15"
      v-model:filters="filters1"
      filterDisplay="row"
      @filter="filteredContainer($event)"
    >
      <Column
        field="EvrakYuklemeTarihi"
        header="Upload Date"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ dateToString(slotProps.data.EvrakYuklemeTarihi) }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>

      <Column
        field="firma"
        header="Company"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>

      <Column
        field="SiparisNo"
        header="Po"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>

      <Column
        field="FaturaNo"
        header="Invoice No"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>

      <Column
        field="Tur"
        header="Kind"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>

      <Column
        field="Kur"
        header="Currency"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ formatPriceTl(slotProps.data.Kur) }}
        </template>
      </Column>

      <Column
        field="Tutar"
        header="$"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ formatPriceUsd(slotProps.data.Tutar) }}
        </template>
        <template #footer>
          {{ formatPriceUsd(total.usd) }}
        </template>
      </Column>

      <Column
        field="Tutar"
        header="₺"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ formatPriceTl(slotProps.data.Tutar * slotProps.data.Kur) }}
        </template>
        <template #footer>
          {{ formatPriceTl(total.tl) }}
        </template>
      </Column>

      <Column
        field="Aciklama"
        header="Description"
        headerClass="tableHeader"
        bodyClass="tableBody"
      />

      <Column
        field="Link"
        header="Link"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          <a :href="slotProps.data.Link">
            <i class="pi pi-download" style="font-size: 1rem" />
          </a>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import { FilterMatchMode } from "@primevue/core/api"

export default {
  props: {
    list: {
      type: Array,
      required: false,
      default: () => [],
    },
  },

  computed: {
    /*
     * DUZELTILDI -- TOPLAMLAR ILK ACILISTA 0 GORUNUYORDU.
     *
     * Nuxt 2'de `total` bir data alaniydi ve YALNIZCA @filter olayinda
     * (filteredContainer -> calculateSum) hesaplaniyordu. DataTable
     * @filter'i ilk render'da ATESLEMEZ, yalnizca kullanici bir filtre
     * alanina yazdiginda ateslenir.
     *
     * Sonuc: sayfa acildiginda iki footer "$0.00" gosteriyordu. Toplami
     * gormek icin bir filtreye bir sey yazip silmek gerekiyordu --
     * kullanicinin bunu bilmesi icin bir sebep yok.
     *
     * Artik turetilmis: filtre uygulanmissa filtrelenmis satirlar,
     * uygulanmamissa listenin tamami uzerinden hesaplaniyor. Filtre
     * davranisi AYNI kaldi.
     */
    rows() {
      return this.filteredRows ?? this.list
    },

    total() {
      return this.rows.reduce(
        (acc, item) => {
          acc.tl += item.Tutar * item.Kur
          acc.usd += item.Tutar
          return acc
        },
        { tl: 0, usd: 0 },
      )
    },
  },

  data() {
    return {
      /* null = "kullanici henuz filtre uygulamadi" */
      filteredRows: null,
      filters1: {
        /*
         * DUZELTILDI: bu anahtarda `matchmode` yaziyordu (kucuk "m").
         * Dogru ad `matchMode`. Yanlis yazim PrimeVue tarafindan
         * TANINMIYOR, yani bu kolonun eslesme kurali hic verilmemis
         * sayiliyordu -- digerleri STARTS_WITH ile suzulurken bu kolon
         * varsayilana dusuyordu. Hata vermez, sessizce tutarsiz filtre.
         */
        EvrakYuklemeTarihi: {
          value: null,
          matchMode: FilterMatchMode.STARTS_WITH,
        },
        firma: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        SiparisNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        FaturaNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Tur: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
    }
  },

  methods: {
    filteredContainer(event) {
      this.filteredRows = event.filteredValue
    },
  },
}
</script>

<!--
  components/container/InputList.vue
  (Nuxt 2: components/container/input/list.vue)

  Etiket adi <ContainerInputList>. Nuxt 2'de ad `containerInputList` idi
  (plugins/components.js:258, ELLE kayit).

  DUZELTILDI -- NUXT 2'DE SESSIZCE BOZUK OLAN UC SEY:

  [x] ₺ KOLONUNUN TOPLAMI DOLAR ISARETIYLE GOSTERILIYORDU.
      Footer'da `formatPriceUsd(total.tl)` yaziyordu -- yani TL toplami
      "$" onekiyle basiliyordu. Deger dogru, para birimi YANLIS; iki
      footer yan yana durdugu icin ikisi de dolar gibi gorunuyordu.
      formatPriceTl oldu.

  [x] TOPLAMLAR ILK ACILISTA 0 GORUNUYORDU
      (gerekcesi `rows` computed'inin basinda).

  [x] filters1.EvrakYuklemeTarihi icinde `matchmode` (kucuk "m")
      yaziliyordu (gerekcesi data() icinde).

  DIGER ZORUNLU DEGISIKLIKLER:

  [x] import { FilterMatchMode } from "primevue/api"
         -> "@primevue/core/api"   (alt paket v4'te kaldirildi)

  [x] :filters + @update:filters -> v-model:filters

  [x] <Column ...></Column> -> <Column ... />  (Aciklama kolonu)

  [x] props.list -> `default: () => []`

  DIKKAT -- KASITLI OLARAK DEGISTIRILMEDI:

      Iki kolon da `field="Tutar"` kullaniyor ($ ve ₺). Ayni field'in iki
      kolonda olmasi DataTable icin sorun degil (gosterim #body ile
      yapiliyor), ama siralama/filtreleme acisindan ikisi ayni veriye
      bakar. Nuxt 2'deki hali bu.

      `<a :href="...">` indirme baglantisi target/rel ALMIYOR, yani ayni
      sekmede aciliyor. Dosya indirme icin dogru davranis; dokunulmadi.
-->
