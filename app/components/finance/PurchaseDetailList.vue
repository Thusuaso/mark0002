<template>
  <div class="purchase-detail">
    <DataTable
      :value="rows"
      v-model:filters="filters"
      :globalFilterFields="globalFields"
      :loading="loading"
      :paginator="true"
      :rows="20"
      :rowsPerPageOptions="[10, 20, 50, 100]"
      dataKey="ID"
      sortField="KalanTutar"
      :sortOrder="-1"
      filterDisplay="row"
      size="small"
      showGridlines
      currentPageReportTemplate="{first} - {last} / {totalRecords}"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :selection="selectedSupplierFinance"
      selectionMode="single"
      @row-click="supplierFinanceSelected($event)"
    >
      <template #header>
        <div class="table-header">
          <h3>Satın Alma Detayı</h3>
          <IconField>
            <InputIcon class="pi pi-search" />
            <InputText v-model="filters.global.value" placeholder="Ara..." />
          </IconField>
        </div>
      </template>

      <template #empty>Kayıt bulunamadı.</template>
      <template #loading>Veriler yükleniyor...</template>

      <Column
        v-for="col in textColumns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
        :sortable="true"
        :showFilterMenu="false"
        :showClearButton="false"
        :style="col.style"
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
        field="KalanTutar"
        header="Kalan Tutar"
        :sortable="true"
        headerClass="col-right"
        bodyClass="col-right"
        style="min-width: 140px"
      >
        <template #body="{ data }">
          {{ formatCurrency(data.KalanTutar) }}
        </template>
      </Column>

      <ColumnGroup type="footer">
        <Row>
          <Column footer="Toplam" :colspan="4" footerClass="col-right" />
          <Column :footer="formatCurrency(total)" footerClass="col-right" />
        </Row>
      </ColumnGroup>
    </DataTable>

    <Dialog v-model:visible="finance_supplier_form_visible" header="" modal>
      <FinancePurchaseForm :financePaid="financePaid" />
    </Dialog>
  </div>
</template>

<script>
import { FilterMatchMode } from "@primevue/core/api"
import { useFinanceStore } from "~/stores/finance"

export default {
  name: "PurchaseDetailTable",

  props: {
    // Disaridan da beslenebilsin diye; bos birakilirsa store'dan alinir
    items: {
      type: Array,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      finance_supplier_form_visible: false,
      financePaid: {},
      /*
       * KAYNAKTA `filters: {}` IDI -- bkz. alt nottaki "[1] PrimeVue 2
       * FILTRE API'SI". v4 her alan icin {value, matchMode} bekliyor.
       */
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        FirmaAdi: { value: null, matchMode: FilterMatchMode.CONTAINS },
        SiparisNo: { value: null, matchMode: FilterMatchMode.CONTAINS },
        TedarikciAdi: { value: null, matchMode: FilterMatchMode.CONTAINS },
        Donem: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
      /* Kaynakta `filter filter-match-mode="contains"` tasiyan dort kolon. */
      textColumns: [
        { field: "FirmaAdi", header: "Firma", style: "min-width: 200px" },
        { field: "SiparisNo", header: "Sipariş No", style: "min-width: 130px" },
        {
          field: "TedarikciAdi",
          header: "Tedarikçi",
          style: "min-width: 160px",
        },
        { field: "Donem", header: "Dönem", style: "min-width: 110px" },
      ],
      globalFields: ["FirmaAdi", "SiparisNo", "TedarikciAdi", "Donem"],
      /*
       * Kaynakta data()'da TANIMLI DEGILDI ama sablonda
       * :selection="selectedSupplierFinance" olarak okunuyordu --
       * Vue 3 bunun icin "accessed during render but is not defined"
       * uyarisi basiyor. null olarak bildirildi; davranis AYNI (secim
       * geri yazilmadigi icin satir vurgulanmiyor, secim isi @row-click
       * ile yuruyor).
       */
      selectedSupplierFinance: null,
    }
  },

  computed: {
    financeStore() {
      return useFinanceStore()
    },

    rows() {
      const source = this.items || this.financeStore.getFinancePurchaseDetailList
      if (!Array.isArray(source)) return []
      // Donem alani global arama ve filtre icin satira ekleniyor
      return source.map((r) => ({
        ...r,
        Donem: this.formatDonem(r),
      }))
    },

    total() {
      return this.rows.reduce((sum, r) => sum + (Number(r.KalanTutar) || 0), 0)
    },
  },

  methods: {
    supplierFinanceSelected(event) {
      this.finance_supplier_form_visible = true
      this.financePaid = event.data
    },
    formatCurrency(value) {
      const n = Number(value) || 0
      return n.toLocaleString("tr-TR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    },

    formatDonem(row) {
      if (!row || !row.Year || !row.Month) return ""
      return `${String(row.Month).padStart(2, "0")}/${row.Year}`
    },
  },
}
</script>

<style scoped>
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.table-header h3 {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
}

:deep(.col-right) {
  text-align: right !important;
}

:deep(.p-datatable-column-footer) {
  font-weight: 600;
}
</style>

<!--
  components/finance/forms/supplier.vue
     -> app/components/finance/PurchaseDetailList.vue

  Otomatik ice alma adi `FinancePurchaseDetailList` -- Nuxt 2'deki global
  kayit adiyla AYNI (plugins/components.js:156). Kaynakta "forms/"
  altindaydi ama bir FORM degil, tablo; pilotta adi islevine gore
  "...DetailList".

  ============================================================
  [1] PrimeVue 2 FILTRE API'SI -- v4'TE TAMAMEN FARKLI
  ============================================================
  Kaynak PrimeVue 2.10, pilot 4.5.5. Bu bileşen filtrelemeyi tamamen
  v2 bicimiyle kuruyordu ve birebir tasinsa filtre + global arama
  SESSIZCE CALISMAZ hale gelirdi:

  a) `filters: {}` BOS nesneydi ve global arama girisi
         <InputText v-model="filters['global']" />
     ile oraya DUZ BIR DIZGE yaziyordu. PrimeVue 2 bunu kabul ediyordu;
     v4 her alan icin `{ value, matchMode }` bekliyor. Dizge atanirsa
     filtre motoru `filters.global.value` okur -> undefined, arama hic
     calismaz (ve `filters.global` bir dizge oldugu icin v-model de
     bozulur).
     -> `filters.global = { value: null, matchMode: CONTAINS }` oldu ve
        giris `v-model="filters.global.value"` ile baglandi.

  b) Global aramanin HANGI alanlarda arayacagi v4'te `globalFilterFields`
     ile bildirilmek ZORUNDA. v2'de boyle bir sey yoktu, tum alanlara
     bakiyordu. -> `globalFields` eklendi (dort metin kolonu).

  c) Kolon basina filtre v2'de Column prop'lariyla kuruluyordu:
         <Column filter filter-match-mode="contains" />
     v4'te Column'un `filter` prop'u YOK; satir filtresi `filters`
     girdisi + `#filter` slot'u ile kurulur. Birebir tasinsa dort
     kolonun filtre girisleri HIC RENDER EDILMEZDI (prop sessizce DOM
     attribute'una duser).
     -> Dort kolona #filter slot'u verildi; `filterDisplay="row"` zaten
        kaynakta vardi.

  ============================================================
  [2] DataTable LISTEYI `rows` DEGIL store'u OKUYORDU
  ============================================================
  Kaynak: `:value="getFinancePurchaseDetailList"`
  ama hemen yaninda `rows` computed'i duruyordu ve yorumu sunu diyordu:
      "Donem alani global arama ve filtre icin satira ekleniyor"
  `rows` yalnizca `total` tarafindan kullaniliyordu; TABLOYA HIC
  VERILMIYORDU. Sonuclari:
    - satirlarda `Donem` ALANI YOKTU, yani o kolonda siralama/filtre
      calismazdi (sadece #body slot'u Year/Month'tan hesaplayip
      gosteriyordu),
    - `items` PROP'U TAMAMEN ETKISIZDI -- "disaridan beslenebilsin diye"
      yazilmis ama tablo onu hic gormuyordu.
  -> `:value="rows"` oldu. Gorunum AYNI (body slot'u zaten Donem'i
     formatliyordu); kazanc: Donem kolonu artik gercekten
     siralanabilir/filtrelenebilir ve `items` prop'u islevsel.
     `rows` icine `Array.isArray` korumasi eklendi (store bos/null
     donerse .map patlardi).

  == DIGER ZORUNLU DEGISIKLIKLER ==

  [x] ::v-deep .col-right  ->  :deep(.col-right)
      `::v-deep` Vue 3'te KALDIRILDI (Vue 2 yazimi). Birebir birakilsa
      derleyici onu tanimaz ve kurallar hic uygulanmaz: "Kalan Tutar"
      kolonu ve footer SAGA DAYALI OLMAZ, footer kalin gorunmez.
  [x] ::v-deep .p-column-footer -> :deep(.p-datatable-column-footer)
      Footer hucresinin sinif adi PrimeVue 4'te degisti
      (p-column-footer -> p-datatable-column-footer); eski ad hicbir
      ogeyle eslesmiyordu.
  [x] class="p-datatable-sm p-datatable-gridlines"
         -> size="small" showGridlines
      v4'te bu iki sinif GIRDI degil, bileşenin props'tan URETTIGI
      ciktilar ('p-datatable-sm': props.size === 'small').
  [x] responsive-layout="scroll" KALDIRILDI (prop v4'te YOK)
  [x] <span class="p-input-icon-left"> + <i class="pi pi-search">
         -> <IconField> + <InputIcon>
      `p-input-icon-left` PrimeVue 4'te kaldirildi; ikonu input'un
      icine yerlestiren bileşenler IconField/InputIcon.
  [x] kebab-case prop'lar camelCase'e cevrildi (rows-per-page-options,
      data-key, sort-field, sort-order, filter-display,
      current-page-report-template, paginator-template, header-class,
      body-class, footer-class). Vue ikisini de kabul ediyor; pilotun
      geri kalaniyla tutarlilik icin.
  [x] mapGetters -> useFinanceStore()
  [x] <financePurchaseForm> -> <FinancePurchaseForm>

  == KORUNAN DAVRANISLAR (bilincli) ==

  1) `:selection` TEK YONLU (v-model DEGIL): kaynakta da
     @update:selection yoktu, satir vurgulanmiyor; secim @row-click ile
     yuruyor. Degisken yalnizca BILDIRILDI (yukaridaki nota bak).

  2) `loading` bir PROP ve ebeveyn (FinancePurchaseList) onu
     GECIRMIYOR -> daima false, "Veriler yükleniyor..." slot'u hic
     gorunmuyor. Kaynakta da oyle.

  3) ColumnGroup footer'i `:colspan="4"` kullaniyor: dort metin kolonu +
     KalanTutar = bes kolon, yani ilk dordu birlesip "Toplam" yaziyor.
     Kolon sayisi degismedigi icin colspan de degismedi.
-->
