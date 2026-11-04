<template>
  <div>
    <DataTable
      :value="list"
      style="width: 100%"
      scrollable
      scrollHeight="var(--app-table-height)"
      v-model:filters="filters1"
      filterDisplay="row"
      v-model:selection="selectedSupplier"
      selectionMode="single"
      @row-click="supplierSelected($event)"
    >
      <Column
        field="ID"
        header="Id"
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
        field="FirmaAdi"
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
      <Column field="Telefon" header="Phone" headerClass="tableHeader" bodyClass="tableBody" />
      <Column field="MailAdres" header="Email" headerClass="tableHeader" bodyClass="tableBody" />
      <Column field="Il" header="City" headerClass="tableHeader" bodyClass="tableBody" />
      <Column field="Notlar" header="Notes" headerClass="tableHeader" bodyClass="tableBody" />
      <Column field="ToplamTedarikci" header="Total Order" headerClass="tableHeader" bodyClass="tableBody" />
    </DataTable>
  </div>
</template>

<script>
// [1] DEGISTI: "primevue/api" -> "@primevue/core/api"
import { FilterMatchMode } from "@primevue/core/api"

export default {
  props: {
    list: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      selectedSupplier: null,
      filters1: {
        ID: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        FirmaAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
    }
  },
  methods: {
    supplierSelected(event) {
      this.$emit("supplier_model_emit", event.data)
    },
  },
}
</script>

<!--
  Nuxt2/PrimeVue2 -> Nuxt4/PrimeVue5 icin bu dosyada ZORUNLU degisiklikler:
  [1] import { FilterMatchMode } from "primevue/api"  ->  "@primevue/core/api"
  [2] :filters.sync="filters1"        ->  v-model:filters="filters1"
  [3] :selection="selectedSupplier"   ->  v-model:selection="selectedSupplier"
      (v2'de tek yonlu prop + @row-click yetiyordu; v4+'ta secim v-model ile)
  [4] headerStyle="color:red" DataTable'dan kaldirildi -- v2'de de gecersiz bir
      prop'tu, sessizce yok sayiliyordu. v5'te attribute olarak <table>'a dusup
      kirmizi yazi yapiyor. Parite icin silindi.
  [5] field="ıl" -> field="Il"  (MEVCUT UYGULAMADA BUG: SQL "Il" donuyor ama
      kolon noktasiz "ı" ile yazilmis, yani City kolonu bugun BOS geliyor.)
  Korunanlar: Options API, props, emit adi, headerClass/bodyClass, filterDisplay.

  EKLENDI (orijinalde yoktu):
  [6] scrollable + scrollHeight="var(--app-table-height)"
      Eskiden tablo satir sayisiyla birlikte uzuyor ve sayfanin kendisi
      asagiya kayiyordu; basliklar ekrandan cikiyordu. Artik tablo govdesi
      sabit yukseklikte, kendi scroll'u var ve basliklar sabit kaliyor.
      Yukseklik degeri assets/css/app.css icindeki tek bir degiskenden
      geliyor -- 211 tabloya sabit sayi gomulmuyor.
-->
