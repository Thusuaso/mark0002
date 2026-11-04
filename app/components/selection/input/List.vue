<template>
  <div class="card">
    <div class="row">
      <div class="col">
        <DataTable
          :value="products"
          size="small"
          paginator
          :rows="10"
          :selection="selectedProduct"
          selectionMode="single"
          @row-select="$emit('product_selected_emit', $event)"
          v-model:filters="filters1"
          filterDisplay="row"
          @filter="filteredProductsList($event)"
          columnResizeMode="fit"
          showGridlines
        >
          <template #header>
            <Button
              type="button"
              icon="pi pi-filter-slash"
              label="Filtreleri Temizle"
              outlined
              @click="clearFilter()"
            />
          </template>
          <Column
            field="KasaNo"
            header="Crate No"
            :showFilterMenu="false"
            :showClearButton="false"
            sortable
          >
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                style="width: 50px"
              />
            </template>
          </Column>
          <Column
            field="Tarih"
            header="Date"
            :showFilterMenu="false"
            :showClearButton="false"
            sortable
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
                style="width: 80px"
              />
            </template>
          </Column>
          <Column
            field="KategoriAdi"
            header="Category"
            :showFilterMenu="false"
            :showClearButton="false"
            sortable
          >
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                style="width: 80px"
              />
            </template>
          </Column>
          <Column
            field="OcakAdi"
            header="Quarry"
            :showFilterMenu="false"
            :showClearButton="false"
            sortable
          >
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                style="width: 80px"
              />
            </template>
          </Column>
          <Column
            field="UrunAdi"
            header="Product"
            :showClearButton="false"
            sortable
          >
            <template #footer>
              {{ total.kasaadedi }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                style="width: 80px"
              />
            </template>
          </Column>
          <Column
            field="YuzeyIslemAdi"
            header="Surface"
            :showFilterMenu="false"
            :showClearButton="false"
            sortable
          >
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                style="width: 80px"
              />
            </template>
          </Column>
          <Column
            field="En"
            header="Width"
            :showFilterMenu="false"
            :showClearButton="false"
            sortable
          >
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                style="width: 50px"
              />
            </template>
          </Column>
          <Column
            field="Boy"
            header="Height"
            :showFilterMenu="false"
            :showClearButton="false"
            sortable
          >
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                style="width: 50px"
              />
            </template>
          </Column>
          <Column
            field="Kenar"
            header="Thickness"
            :showFilterMenu="false"
            :showClearButton="false"
            sortable
          >
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                style="width: 50px"
              />
            </template>
          </Column>
          <Column
            field="Adet"
            header="Pcs in Box"
            :showFilterMenu="false"
            :showClearButton="false"
            sortable
          >
            <template #footer>
              {{ formatDecimal2(total.kutuiciadet) }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                style="width: 50px"
              />
            </template>
          </Column>
          <Column
            field="KutuAdet"
            header="Box Amount"
            :showFilterMenu="false"
            :showClearButton="false"
            sortable
          >
            <template #footer>
              {{ formatDecimal2(total.kutu) }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                style="width: 50px"
              />
            </template>
          </Column>
          <Column
            field="Miktar"
            header="Amount"
            :showFilterMenu="false"
            :showClearButton="false"
            sortable
          >
            <template #body="slotProps">
              {{ formatDecimal(slotProps.data.Miktar) }}
            </template>
            <template #footer>
              {{ formatDecimal2(total.miktar) }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                style="width: 50px"
              />
            </template>
          </Column>
          <Column field="Kutu" header="Box" sortable>
            <template #body="slotProps">
              <div v-if="slotProps.data.Kutu == true">✓</div>
              <div v-else>x</div>
            </template>
          </Column>
          <Column field="Bagli" header="Binded" sortable>
            <template #body="slotProps">
              <div v-if="slotProps.data.Bagli == true">✓</div>
              <div v-else>x</div>
            </template>
          </Column>
          <Column
            field="SiparisAciklama"
            header="Po"
            :showFilterMenu="false"
            :showClearButton="false"
            sortable
          >
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                style="width: 80px"
              />
            </template>
          </Column>
          <Column
            field="Aciklama"
            header="Expl."
            :showFilterMenu="false"
            :showClearButton="false"
            sortable
          >
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                style="width: 80px"
              />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>
<script>
import { FilterMatchMode } from "@primevue/core/api"
import { useSelectionStore } from "~/stores/selection"
/*
 * On dort kolonun BASLANGIC filtresi -- data() ve clearFilter() AYNI
 * kaynaktan beslenmeli (bkz. alt nottaki [1]).
 */
const makeFilters = () => ({
  KasaNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  Tarih: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  KategoriAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  OcakAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  UrunAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  YuzeyIslemAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  En: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  Boy: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  Kenar: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  SiparisAciklama: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  Aciklama: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  Adet: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  KutuAdet: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  Miktar: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
})

export default {
  props: {
    products: {
      type: Array,
      required: false,
      default: () => [],
    },
    total: {
      type: Object,
      required: false,
      default: () => ({ miktar: 0, kutu: 0, kutuiciadet: 0, kasaadedi: 0 }),
    },
  },
  emits: ["product_selected_emit"],
  computed: {
    selectionStore() {
      return useSelectionStore()
    },
  },
  data() {
    return {
      selectedProduct: null,
      filters1: makeFilters(),
    }
  },
  methods: {
    clearFilter() {
      /*
       * [1] KAYNAKTA UC ANAHTAR EKSIKTI -- bkz. alt not.
       * makeFilters() ile data() ile AYNI 14 anahtar yazilıyor.
       */
      this.filters1 = makeFilters()
    },

    filteredProductsList(event) {
      /*
       * Vuex'te BIRI commit (mutation) BIRI dispatch (action) idi;
       * Pinia'da ikisi de action, mutation olani MUT_ onekli.
       */
      this.selectionStore.MUT_setSelectionProductTotalList(event.filteredValue)
      this.selectionStore.setSelectionProductFilteredList(event.filteredValue)
    },
  },
};
</script>
<style scoped>
.p-datatable {
  clear: both;
  display: block;
  overflow: auto;
}
.p-datatable-table .p-datatable-wrapper {
  clear: both;
  display: block;
}

.customContainer {
  clear: both;
  display: block;
  width: 100%;
  overflow: auto;
}
@media (max-width: 767px) {
  #dt-responsive-table table {
    width: 100% !important;
  }

  /* Styles for the table header */
  #dt-responsive-table table thead {
    display: none !important;
    /* Hide the table header on mobile */
  }

  /* Styles for the table rows */
  #dt-responsive-table table tbody {
    display: flex !important;
    flex-direction: column !important;
    align-items: stretch !important;
    min-height: auto !important;
    /* Adjust the min-height as needed */
  }

  /* Styles for individual table rows (cards) */
  #dt-responsive-table table tbody tr {
    border: 1px solid #ccc !important;
    border-radius: 8px !important;
    margin-bottom: 1rem !important;
    background-color: #fff !important;
    padding: 1rem !important;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
  }

  /* Styles for table cells within rows */
  #dt-responsive-table table tbody td {
    margin: 0.5rem 0 !important;
  }

  /* Hide individual table rows (cards) on mobile */
  #dt-responsive-table table tbody tr {
    display: table-row !important;
  }

  /* Set the display of table cells to be block-level elements */
  #dt-responsive-table table tbody td {
    display: block !important;
    margin: 0.5rem 0 !important;
  }
}
</style>

<!--
  components/selection/input/list.vue
     -> app/components/selection/input/List.vue

  Otomatik ice alma adi `SelectionInputList`. Nuxt 2'de ad `selectionList`
  idi (plugins/components.js:241, ELLE kayit).

  ============================================================
  [1] "Filtreleri Temizle" TABLOYU KIRIYORDU
  ============================================================
  Kaynakta filtre nesnesi IKI YERDE elle yaziliydi: data() icinde 14
  anahtarla, clearFilter() icinde ise YALNIZCA 11 anahtarla. Eksik ucu:
      Adet, KutuAdet, Miktar

  Bu uc kolonun sablonda #filter slot'u VAR. "Filtreleri Temizle"ye
  basildiginda o anahtarlar nesneden DUSUYOR, PrimeVue slot'a
  `filterModel: filters[field]` olarak undefined veriyor ve
      v-model="filterModel.value"
  render sirasinda patliyor:
      TypeError: Cannot read properties of undefined (reading 'value')

  Yani butona basmak tabloyu bozuyordu -- Vue 2'de de boyleydi.

  Tek bir makeFilters() fabrikasina alindi; data() ve clearFilter()
  artik ayni 14 anahtari uretiyor. FABRIKA OLMASI ZORUNLU, paylasilan
  sabit DEGIL: iki yer ayni nesneyi paylassa temizleme islemi
  baslangic nesnesini de kirletirdi.

  == DIGER ZORUNLU DEGISIKLIKLER ==

  [x] import { FilterMatchMode } from "primevue/api"
         -> "@primevue/core/api"     (alt paket v4'te TAMAMEN kaldirildi)
  [x] :filters + @update:filters -> v-model:filters
  [x] class="p-datatable-sm" -> size="small"
      v4'te bu sinif bir GIRDI degil, bileşenin props'tan URETTIGI cikti
      ('p-datatable-sm': props.size === 'small') ve temada o adi
      hedefleyen kural yok.
  [x] responsiveLayout="scroll" KALDIRILDI (prop v4'te YOK; v3'teki
      davranis artik varsayilan)
  [x] this.$store.commit("setSelectionProductTotalList", ...)
         -> MUT_setSelectionProductTotalList(...)
      this.$store.dispatch("setSelectionProductFilteredList", ...)
         -> setSelectionProductFilteredList(...)
      Vuex'te BIRI mutation BIRI action'di; Pinia'da ikisi de action,
      mutation olani MUT_ onekli (bkz. stores/accounts.ts basligi).
  [x] clearFilter(event) parametresi KALDIRILDI -- govdede hic
      kullanilmiyordu, cagri da `clearFilter()` seklinde argumansizdi.
  [x] `emits: ["product_selected_emit"]` bildirildi (Vue 3'te
      bildirilmeyen emit'ler DOM attribute'una dusuyor ve uyari veriyor).
  [x] Iki prop'a `default` eklendi -- kaynakta YOKTU:
      products -> `() => []` (yoksa DataTable :value="undefined")
      total    -> dort alani sifir olan nesne (yoksa footer'da
                  `total.kutuiciadet` okunurken veri gelene kadar
                  "undefined" yaziyordu)

  == KORUNAN DAVRANISLAR (bilincli) ==

  1) `:selection="selectedProduct"` TEK YONLU birakildi (v-model
     YAPILMADI): kaynakta @update:selection yoktu, yani secilen satir
     geri yazilmiyor ve satir VURGULANMIYOR. Secim isi `@row-select`
     ile yuruyor (dikkat: @row-click DEGIL -- bu tabloda row-select
     kullaniliyor). v-model'e cevirmek satirlarin artik vurgulanmasi
     demek olurdu.

  2) @filter her filtre degisiminde store'a IKI sey yaziyor: filtrelenmis
     satirlarin TOPLAMI ve filtrelenmis listenin kendisi. Ikincisini
     (getFilteredSelectionList) Panel.vue'daki excel cikisi okuyor.
     Baslangicta (hic filtre yokken) @filter TETIKLENMEZ, dolayisiyla
     toplam ilk acilista setSelectionProductsList'in yazdigi mekmer
     toplamidir. Kaynakta da boyle.
-->
