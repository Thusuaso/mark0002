<template>
  <div class="container">
    <DataTable
      :value="purchaseList"
      v-model:filters="filters"
      filterDisplay="row"
      @filter="filterSelected($event)"
      :globalFilterFields="['FirmaAdi', 'SiparisNo']"
      scrollable
      scrollHeight="550px"
      v-model:selection="selectedPurchase"
      selectionMode="single"
      @row-click="purchaseSelected($event)"
    >
      <template #empty>Kayıt bulunamadı.</template>

      <Column
        field="FirmaAdi"
        header="Firma"
        :sortable="true"
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
        field="SiparisNo"
        header="Sipariş No"
        :sortable="true"
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
        field="SiparisTarihi"
        header="Sipariş Tarihi"
        :sortable="true"
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
        <template #body="slotProps">
          {{ formatDate(slotProps.data.SiparisTarihi) }}
        </template>
      </Column>

      <Column
        field="YuklemeTarihi"
        header="Yükleme Tarihi"
        :sortable="true"
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
        <template #body="slotProps">
          {{ formatDate(slotProps.data.YuklemeTarihi) }}
        </template>
      </Column>

      <Column
        field="KalanTutar"
        header="Kalan Tutar"
        :sortable="true"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ formatCurrency(slotProps.data.KalanTutar) }}
        </template>
        <template #footer>
          {{ formatCurrency(total) }}
        </template>
      </Column>
    </DataTable>

    <Dialog v-model:visible="purchase_detail_list_visible" modal>
      <FinancePurchaseDetailList />
    </Dialog>
  </div>
</template>

<script>
import { FilterMatchMode } from "@primevue/core/api"
import { useFinanceStore } from "~/stores/finance"

export default {
  data() {
    return {
      purchase_detail_list_visible: false,
      selectedPurchase: {},
      // null = henuz filtre uygulanmadi, tam liste gecerli
      filteredList: null,
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        FirmaAdi: { value: null, matchMode: FilterMatchMode.CONTAINS },
        SiparisNo: { value: null, matchMode: FilterMatchMode.CONTAINS },
        SiparisTarihi: { value: null, matchMode: FilterMatchMode.CONTAINS },
        YuklemeTarihi: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
    }
  },

  computed: {
    financeStore() {
      return useFinanceStore()
    },

    purchaseList() {
      const list = this.financeStore.getFinancePurchaseMainList
      return Array.isArray(list) ? list : []
    },

    // Toplamin kaynagi: filtre varsa filtrelenmis liste, yoksa tam liste
    visibleList() {
      return Array.isArray(this.filteredList)
        ? this.filteredList
        : this.purchaseList
    },

    total() {
      return this.visibleList.reduce(
        (sum, r) => sum + Number(r.KalanTutar || 0),
        0
      )
    },
  },

  watch: {
    // Store'dan liste yenilenirse eski filtre sonucu bayatlamasin
    purchaseList() {
      this.filteredList = null
    },
  },

  mounted() {
    this.financeStore.setFinancePurchaseMainList()
  },

  methods: {
    filterSelected(event) {
      this.filteredList = event.filteredValue
    },

    purchaseSelected(event) {
      const data = {
        po: event.data.SiparisNo,
        supplier: event.data.MusteriId,
      }
      this.financeStore.setFinancePurchaseDetail(data)
      this.purchase_detail_list_visible = true
    },

    formatCurrency(value) {
      return new Intl.NumberFormat("tr-TR", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      }).format(Number(value || 0))
    },

    formatDate(value) {
      if (!value) return ""
      const d = new Date(value)
      if (isNaN(d)) return ""
      return new Intl.DateTimeFormat("tr-TR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(d)
    },
  },
}
</script>

<!--
  components/finance/lists/supplier.vue
     -> app/components/finance/PurchaseList.vue

  Otomatik ice alma adi `FinancePurchaseList` -- Nuxt 2'deki global kayit
  adiyla AYNI (plugins/components.js:155). Dosya adi "Supplier" DEGIL
  "Purchase": pilotta zaten baska bir `supplier` ailesi var
  (app/components/supplier/, app/stores/supplier.ts) ve bu bileşen
  tedarikci KARTLARI degil SATIN ALMA (purchase) bakiyelerini
  gosteriyor. Kaynaktaki global ad da "Purchase" diyor.

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] import { FilterMatchMode } from "primevue/api"
         -> "@primevue/core/api"   (alt paket v4'te TAMAMEN kaldirildi)
  [x] :filters + @update:filters   -> v-model:filters
      :selection + @update:selection -> v-model:selection
  [x] mapGetters -> useFinanceStore()
  [x] this.$store.dispatch(...) -> financeStore.<action>()
  [x] <financePurchaseDetailList> -> <FinancePurchaseDetailList>

  [x] mapGetters'daki `getFinancePurchaseDetailList` KALDIRILDI:
      bu bileşende HIC kullanilmiyordu (ne sablonda ne metotlarda) --
      tek gecis yeri mapGetters listesinin kendisiydi. Detay listesini
      zaten alt bileşen (FinancePurchaseDetailList) kendisi okuyor.

  [x] watch hedefi `getFinancePurchaseMainList` -> `purchaseList`.
      Vuex'te mapGetters bir computed uretiyordu ve watch o ada
      bakiyordu. Pinia'ya gecince o ad artik bir computed DEGIL
      (store uzerinden okunuyor), yani \`watch: { getFinancePurchaseMainList() }\`
      HICBIR ZAMAN TETIKLENMEZDI -- sessizce olu bir watch olurdu ve
      liste yenilendiginde bayat filtre sonucu ekranda kalirdi
      (yani toplam yanlis gorunurdu). Zaten var olan `purchaseList`
      computed'ine baglandi; o da ayni store getter'ini okuyor.

  [x] Iki tarih kolonuna `:showFilterMenu="false"` + `:showClearButton="false"`
      eklendi. Kaynakta bu iki kolonda #filter slot'u VARDI ama bu iki
      prop YOKTU (digerlerinde var). PrimeVue 4'te filtre menusu
      varsayilan olarak acik oldugu icin o iki kolon digerlerinden
      FARKLI gorunurdu (fazladan huni + temizle dugmesi). Kaynaktaki
      gorunumu korumak icin diger kolonlarla eslendi.

  == KORUNAN DAVRANISLAR (bilincli) ==

  1) TARIH KOLONLARINDA FILTRE PRATIKTE CALISMIYOR: matchMode CONTAINS
     ve filtre HAM degeri (ISO tarih / Date) suzuyor, oysa kullaniciya
     \`formatDate\` ile "02.10.2026" gosteriliyor. Kullanici gordugu
     bicimi yazdiginda eslesme olmaz. Kaynakta da aynen boyle.
     Duzeltmek ya ham veriyi ya da filtre mantigini degistirmek
     demek -- davranis degisikligi.

  2) `filters.global` + `globalFilterFields` TANIMLI ama arama girisi
     YOK: bu bileşende global aramayi besleyecek bir input bulunmuyor
     (kardes FinancePurchaseDetailList'te var). Yani global filtre olu
     yapilandirma. Kaynakta da oyle; silmek, ileride bir arama kutusu
     eklenirse gereken yapilandirmayi yok etmek olurdu.

  3) `selectedPurchase: {}` BOS NESNE ile basliyor (null degil).
     selectionMode="single" ile PrimeVue bos nesneyi "secim yok" gibi
     ele aliyor; kaynaktaki hali korundu.
-->
