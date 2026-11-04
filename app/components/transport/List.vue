<template>
  <div>
    <DataTable
      :value="list"
      paginator
      :rows="15"
      v-model:filters="filters1"
      filterDisplay="row"
      v-model:selection="selectedTransport"
      selectionMode="single"
      @row-click="transportSelected($event)"
      @filter="filteredValue($event)"
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
        field="firma_adi"
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

      <Column header="₺" headerClass="tableHeader" bodyClass="tableBody">
        <template #body="slotProps">
          {{ formatPriceTl(slotProps.data.Tutar * slotProps.data.Kur) }}
        </template>
        <template #footer>
          {{ formatPriceTl(total.tl) }}
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

      <Column header="$" headerClass="tableHeader" bodyClass="tableBody">
        <template #body="slotProps">
          {{ formatPriceUsd(slotProps.data.Tutar) }}
        </template>
        <template #footer>
          {{ formatPriceUsd(total.usd) }}
        </template>
      </Column>

      <Column
        field="link"
        header="Download"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          <a :href="slotProps.data.link">
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
     * (filteredValue -> calculateSum) hesaplaniyordu. DataTable @filter'i
     * ilk render'da ATESLEMEZ, yalnizca kullanici bir filtre alanina
     * yazdiginda ateslenir.
     *
     * Sonuc: sayfa acildiginda ₺ ve $ footer'lari "₺0,00" / "$0.00"
     * gosteriyordu; toplami gormek icin bir filtreye bir sey yazip silmek
     * gerekiyordu.
     *
     * Artik turetilmis: filtre uygulanmissa filtrelenmis satirlar,
     * uygulanmamissa listenin tamami. Filtre davranisi AYNI kaldi.
     *
     * (Ayni sinif hata container/InputList.vue ve ana sayfadaki
     *  totalSupplier'da da vardi.)
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
        Tarih: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        SiparisNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        firma_adi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        FaturaNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      selectedTransport: null,
    }
  },

  methods: {
    transportSelected(event) {
      this.$emit("selected_transport_emit", event.data)
    },

    filteredValue(event) {
      this.filteredRows = event.filteredValue
    },
  },
}
</script>

<!--
  components/transport/List.vue   (Nuxt 2: components/transport/list.vue)

  Etiket adi <TransportList>. Nuxt 2'de ad `transportList` idi
  (plugins/components.js:256, ELLE kayit).

  DUZELTILDI -- NUXT 2'DE SESSIZCE BOZUK OLAN IKI SEY:

  [x] TOPLAMLAR ILK ACILISTA 0 GORUNUYORDU
      (gerekcesi `rows` computed'inin basinda).

  [x] :selection TEK YONLUYDU.
      Nuxt 2'de yalnizca `:selection="selectedTransport"` yaziliyordu --
      `@update:selection` YOKTU. DataTable secimi yukari bildirdiginde
      kimse dinlemedigi icin `selectedTransport` HEP null kaliyordu,
      yani tiklanan satir SECILI GORUNMUYORDU (vurgu yok). Satira
      tiklamak yine de @row-click ile dialogu aciyordu, bu yuzden hata
      islevsel degil GORSEL: kullanici hangi satiri actigini tablodan
      goremiyordu.

      v-model:selection ile iki yonlu baglandi.

  DIGER ZORUNLU DEGISIKLIKLER:

  [x] import { FilterMatchMode } from "primevue/api"
         -> "@primevue/core/api"   (alt paket v4'te kaldirildi)
  [x] :filters + @update:filters -> v-model:filters
  [x] props.list -> `default: () => []`

  DIKKAT -- KASITLI OLARAK DEGISTIRILMEDI:
      `<a :href="...">` indirme baglantisi target/rel ALMIYOR, yani ayni
      sekmede aciliyor -- dosya indirme icin dogru davranis.
-->
