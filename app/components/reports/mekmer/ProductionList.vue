<template>
  <div>
    <DataTable
      :value="list"
      paginator
      :rows="15"
      v-model:filters="filters1"
      filterDisplay="row"
      @filter="mekmerProductionFilter($event)"
      class="p-datatable-sm table-fit-compact"
      sortField="Tarih"
      :sortOrder="-1"
      v-if="!dates"
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
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @keyup.enter="filterApply('date', filterModel.value)"
            @input="filterInput('date', filterModel.value)"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column
        field="FirmaAdi"
        header="Supplier"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @keyup.enter="filterApply('supplier', filterModel.value)"
            @input="filterInput('supplier', filterModel.value)"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column
        field="KategoriAdi"
        header="Category"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @keyup.enter="filterApply('category', filterModel.value)"
            @input="filterInput('category', filterModel.value)"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column
        field="KasaNo"
        header="Crate No"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @keyup.enter="filterApply('crate', filterModel.value)"
            @input="filterInput('crate', filterModel.value)"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column
        field="UrunAdi"
        header="Product"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @keyup.enter="filterApply('product', filterModel.value)"
            @input="filterInput('product', filterModel.value)"
            class="p-column-filter"
          />
        </template>
        <template #footer>
          {{ formatDecimal(total.crate) }}
        </template>
      </Column>
      <Column
        field="OcakAdi"
        header="Mine"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @keyup.enter="filterApply('mine', filterModel.value)"
            @input="filterInput('mine', filterModel.value)"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column
        field="YuzeyIslemAdi"
        header="Surface"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @keyup.enter="filterApply('surface', filterModel.value)"
            @input="filterInput('surface', filterModel.value)"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column
        field="En"
        header="Width"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @keyup.enter="filterApply('width', filterModel.value)"
            @input="filterInput('width', filterModel.value)"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column
        field="Boy"
        header="Height"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @keyup.enter="filterApply('height', filterModel.value)"
            @input="filterInput('height', filterModel.value)"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column
        field="Kenar"
        header="Edge"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @keyup.enter="filterApply('edge', filterModel.value)"
            @input="filterInput('edge', filterModel.value)"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column
        field="Miktar"
        header="Amount"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ formatDecimal(slotProps.data.Miktar) }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
        <template #footer>
          {{ formatDecimal(total.amount) }}
        </template>
      </Column>
      <Column
        field="Adet"
        header="Piece"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ formatDecimal(slotProps.data.Adet) }}
        </template>
        <template #footer>
          {{ formatDecimal(total.piece) }}
        </template>
      </Column>
      <Column
        field="BirimAdi"
        header="Unit"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @keyup.enter="filterApply('unit', filterModel.value)"
            @input="filterInput('unit', filterModel.value)"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column
        field="SiparisAciklama"
        header="Po"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @keyup.enter="filterApply('po', filterModel.value)"
            @input="filterInput('po', filterModel.value)"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column
        field="Aciklama"
        header="Description"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @keyup.enter="filterApply('description', filterModel.value)"
            @input="filterInput('description', filterModel.value)"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="Fason" header="Fason">
        <template #body="slotProps">
          <div v-if="slotProps.data.Fason == true">Fason</div>
          <div v-if="slotProps.data.Fason == false">Fason Değil</div>
        </template>
      </Column>
      <Column field="Kutulama" header="Kutulama">
        <template #body="slotProps">
          <div v-if="slotProps.data.Kutulama == true">Kutulama</div>
          <div v-if="slotProps.data.Kutulama == false">Kutulama Değil</div>
        </template>
      </Column>
    </DataTable>
    <DataTable
      :value="list"
      paginator
      :rows="15"
      v-model:filters="filters2"
      filterDisplay="row"
      @filter="mekmerProductionFilter($event)"
      class="p-datatable-sm table-fit-compact"
      v-if="dates"
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
        field="FirmaAdi"
        header="Supplier"
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
        field="KategoriAdi"
        header="Category"
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
        field="KasaNo"
        header="Crate No"
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
        field="UrunAdi"
        header="Product"
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
          {{ formatDecimal(total.crate) }}
        </template>
      </Column>
      <Column
        field="OcakAdi"
        header="Mine"
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
        field="YuzeyIslemAdi"
        header="Surface"
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
        field="En"
        header="Width"
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
        field="Boy"
        header="Height"
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
        field="Kenar"
        header="Edge"
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
        field="Miktar"
        header="Amount"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ formatDecimal(slotProps.data.Miktar) }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
        <template #footer>
          {{ formatDecimal(total.amount) }}
        </template>
      </Column>
      <Column
        field="Adet"
        header="Piece"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ formatDecimal(slotProps.data.Adet) }}
        </template>
        <template #footer>
          {{ formatDecimal(total.piece) }}
        </template>
      </Column>
      <Column
        field="BirimAdi"
        header="Unit"
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
        field="SiparisAciklama"
        header="Po"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @keyup.enter="filterApply('po', filterModel.value)"
            @input="filterInput('po', filterModel.value)"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column
        field="Aciklama"
        header="Description"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @keyup.enter="filterApply('description', filterModel.value)"
            @input="filterInput('description', filterModel.value)"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="Fason" header="Fason">
        <template #body="slotProps">
          <div v-if="slotProps.data.Fason == true">Fason</div>
          <div v-if="slotProps.data.Fason == false">Fason Değil</div>
        </template>
      </Column>
      <Column field="Kutulama" header="Kutulama">
        <template #body="slotProps">
          <div v-if="slotProps.data.Kutulama == true">Kutulama</div>
          <div v-if="slotProps.data.Kutulama == false">Kutulama Değil</div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script>
import { FilterMatchMode } from "@primevue/core/api"
import { useReportsStore } from "~/stores/reports"
import { useSharedStore } from "~/stores/shared"

/*
 * Sunucu tarafi filtre alanlari: filterModel'in anahtarlari.
 *
 * Sira, /reports/mekmer/production/filter ucunun bekledigi govdeyle ayni
 * (api/index.js:3666 request.input(...) cagrilari). Uc govdede bu
 * anahtarlarin hepsini okudugu icin model her zaman TAM kuruluyor.
 */
const FILTER_FIELDS = [
  "date",
  "supplier",
  "category",
  "crate",
  "product",
  "mine",
  "surface",
  "width",
  "height",
  "edge",
  "unit",
  "po",
  "description",
]

/*
 * Iki DataTable'in kolon filtreleri. Nuxt 2'de `filters1` ve `filters2`
 * ayni 14 kolonu ELLE, birebir ayni iceriklerle tekrar ediyordu (36
 * satir). Ikisi birbirinden bagimsiz degistirilebildigi icin sessizce
 * ayrisabiliyorlardi; artik tek kaynaktan uretiliyorlar.
 */
const FILTER_COLUMNS = [
  "Tarih",
  "FirmaAdi",
  "KategoriAdi",
  "KasaNo",
  "UrunAdi",
  "OcakAdi",
  "YuzeyIslemAdi",
  "En",
  "Boy",
  "Kenar",
  "BirimAdi",
  "SiparisAciklama",
  "Aciklama",
  "Miktar",
]

function emptyColumnFilters() {
  return Object.fromEntries(
    FILTER_COLUMNS.map((f) => [f, { value: null, matchMode: FilterMatchMode.STARTS_WITH }]),
  )
}

export default {
  emits: [
    "mekmer_filtered_production_list_emit",
    "mekmer_production_filter_cleared_emit",
  ],

  props: {
    list: {
      type: Array,
      required: false,
    },
    total: {
      type: Object,
      required: false,
    },
    dates: {},
  },

  computed: {
    reportsStore() {
      return useReportsStore()
    },
    sharedStore() {
      return useSharedStore()
    },
  },

  data() {
    return {
      filterModel: Object.fromEntries(FILTER_FIELDS.map((k) => [k, ""])),
      filters1: emptyColumnFilters(),
      filters2: emptyColumnFilters(),
    }
  },

  methods: {
    /*
     * Her tus vurusunda cagrilir: modeli guncel tutar ama SORGU ATMAZ.
     * Sorgu Enter'da filterApply ile gidiyor.
     *
     * `value || ""`: Nuxt 2'deki if/else'in aynisi -- bos/undefined
     * gelirse anahtar bos dizgiye duser, null KALMAZ. Uc bu alanlari
     * NVarChar olarak bagliyor ve null ile "" ayni sorguyu uretmiyor.
     */
    filterInput(key, value) {
      this.filterModel[key] = value || ""
    },

    /*
     * Enter'a basildiginda: kutu doluysa sunucu tarafi filtre; bosaldiysa
     * ve baska filtre de kalmadiysa tam listeye don.
     */
    filterApply(key, value) {
      if (value) {
        this.filterModel[key] = value
        this.reportsStore.setProductionFilterList(this.filterModel)
        return
      }

      /*
       * Buraya girildiginde filterModel[key] ZATEN "" -- filterInput
       * kutu bosaldigi anda (@input) onu temizlemis oluyor. Nuxt 2 de
       * tam olarak buna guveniyordu; davranis korundu.
       */
      if (this.resetFilter()) {
        this.reloadFullList()
      } else {
        this.reportsStore.setProductionFilterList(this.filterModel)
      }
    },

    /** Hicbir filtre alani dolu degil mi? */
    resetFilter() {
      return FILTER_FIELDS.every((k) => this.filterModel[k] === "")
    },

    async reloadFullList() {
      this.sharedStore.beginLoading()
      try {
        const response = await useLegacyApi().get("/reports/mekmer/production/list")
        this.reportsStore.setReportsMekmerProductionList(response.data.list)
        this.$emit("mekmer_production_filter_cleared_emit")
      } finally {
        this.sharedStore.endLoading()
      }
    },

    mekmerProductionFilter(event) {
      this.reportsStore.setReportsMekmerProductionTotal(event.filteredValue)
      this.$emit("mekmer_filtered_production_list_emit", event.filteredValue)
    },
  },
}
</script>
<!--
  components/reports/mekmer/production/list.vue -> ReportsMekmerProductionList

  1142 satir -> 838 satir. Kucultmenin TAMAMI kopyala-yapistir
  tekrarindan geliyor; kolonlar, basliklar ve filtre davranisi birebir ayni.

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] "primevue/api" -> "@primevue/core/api"
      PrimeVue 4'te eski yol YOK; FilterMatchMode undefined kalirsa 14
      kolonun matchMode'u da undefined olur ve filtreler sessizce
      calismaz.

  [x] this.$store.dispatch(...) -> Pinia eylemleri
  [x] this.$axios -> useLegacyApi()
  [x] setBeginLoadingAction / setEndLoadingAction
         -> sharedStore.beginLoading() / endLoading()
  [x] :filters + @update:filters -> v-model:filters  (iki tabloda da)
      Nuxt 2'deki hali Vue 2 .sync codemod ciktisiydi
      (bkz. mark0002 commit c569066e5).

  [x] emits: [...] EKLENDI -- bilesen olay yayiyor ama bildirmiyordu;
      Vue 3'te bildirilmeyen olay kok ogeye DOM dinleyicisi olarak da
      gecirilmeye calisilir.

  == 28 METOT -> 5 METOT (davranis ayni) ==

  Nuxt 2'de 13 filtre kolonunun her biri icin AYRI iki metot vardi:
      filterDateInput / filterDate, filterSupplierInput / filterSupplier,
      ... filterDescriptionInput / filterDescription
  26 metodun govdeleri BIREBIR ayniydi; tek fark filterModel'in hangi
  anahtarini yazdiklariydi. Her filterX govdesi ayrica ayni 20 satirlik
  "tam listeyi yeniden cek" blogunu kendi icinde tekrar ediyordu -- yani
  o blok dosyada 13 KEZ kopyalanmisti (~500 satir).

  Yerine filterInput(key, value) + filterApply(key, value) ve tek bir
  reloadFullList(). Sablondaki 15 cagri yeri de buna gore guncellendi
  (13'u birinci tabloda, 2'si ikincide).

  [x] mekmerProductionFilter icindeki `console.log(event)` kaldirildi.

  [x] reloadFullList artik YALNIZCA setReportsMekmerProductionList
      cagiriyor. Nuxt 2 hem onu hem setReportsMekmerProductionTotal'i
      dispatch ediyordu; ama ...List eylemi govdesinde ZATEN ...Total'i
      cagiriyor (app/stores/reports.ts), yani toplam iki kez
      hesaplaniyordu. Mutation idempotent (her cagride 0'a sifirlayip
      yeniden topluyor), bu yuzden tekrari atmak sonucu degistirmiyor.

  [x] filterModel'den `amount` anahtari KALDIRILDI -- OLU.
      resetFilter() onu da kontrol ediyordu ama HICBIR kolon onu
      yazmiyor: Miktar kolonu sunucu filtresi degil, PrimeVue'nun kendi
      filterCallback'ini kullaniyor. Yani daima "" kaliyor ve
      resetFilter sonucunu hic etkilemiyordu. Uc de onu beklemiyor
      (api/index.js:3666'da `amount` diye bir request.input YOK).

  == DUZELTILDI: FILTRE TEMIZLENINCE EXCEL ESKI SATIRLARI VERIYORDU ==

  Nuxt 2'de "tam listeyi yeniden cek" blogunun ilk satiri sudur:
      this.is_filtered = false;
  Ama `is_filtered` BU BILESENIN data()'sinda DEGIL -- SAYFANIN
  (pages/reports/mekmer/production.vue) data()'sinda. Yani bu atama
  bilesen ornegine reaktif olmayan yeni bir alan yaziyordu ve onu kimse
  okumuyordu; sayfanin bayragi TRUE kaliyordu.

  Somut sonuc: kullanici filtreler (sayfanin is_filtered'i true olur,
  mekmer_filtered_list dolar), sonra filtreyi TEMIZLER (tablo tam
  listeye doner) ve Excel'e basar -> sayfa hala is_filtered true gordugu
  icin ESKI, FILTRELENMIS satirlari gonderir. Ekranda bir liste,
  Excel'de baska bir liste.

  Cozum: temizleme yolunda `mekmer_production_filter_cleared_emit`
  yayiliyor, sayfa bunu dinleyip is_filtered'i false yapiyor. Atamanin
  ACIK NIYETI buydu; yalnizca yanlis nesneye yaziliyordu.

  == DOKUNULMADI, AMA DIKKAT ==

  Iki tablonun filtre mantigi TUTARSIZ ve bu Nuxt 2'den geliyor:

    - TABLO 1 (v-if="!dates"): 13 kolon SUNUCU tarafi filtre
      (setProductionFilterList); yalnizca Miktar istemci tarafi.

    - TABLO 2 (v-if="dates", yani tarih araligi secili): 12 kolon ISTEMCI
      tarafi filterCallback, AMA Po (SiparisAciklama) ve Aciklama hala
      SUNUCU tarafi filterApply cagiriyor. Sunucu filtresi
      /reports/mekmer/production/filter ucunu TARIH ARALIGI OLMADAN
      cagirdigi icin, tarih araligi secili haldeyken Po veya Aciklama
      kutusunda Enter'a basmak SECILI TARIH ARALIGINI SESSIZCE ATAR ve
      tum tarihlerden sonuc getirir.

      Muhtemelen tablo 2 tablo 1'den kopyalanirken bu iki kolon
      cevrilmeden kalmis. Birebir korundu: duzeltmek raporun davranisini
      degistirir ve hangi tarafin dogru oldugu bir karar.
-->
