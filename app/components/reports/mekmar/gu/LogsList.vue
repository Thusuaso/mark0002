<template>
  <div>
    <DataTable
      :value="list"
      filterDisplay="row"
      v-model:filters="logsFilter"
      :rowClass="logsRowClass"
      paginator
      :rows="25"
    >
      <Column
        field="DegisiklikTarihi"
        header="Date"
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
        header="Po"
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
        field="IslemAdi"
        header="LOGs"
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
        field="DegisiklikYapan"
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
  data() {
    return {
      logsFilter: {
        DegisiklikTarihi: {
          value: null,
          matchMode: FilterMatchMode.STARTS_WITH,
        },
        YuklemeTarihi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        SiparisNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        IslemAdi: { value: null, matchMode: FilterMatchMode.CONTAINS },
        DegisiklikYapan: {
          value: null,
          matchMode: FilterMatchMode.STARTS_WITH,
        },
      },
    };
  },
  methods: {
    logsRowClass(event) {
      if (event.Renk == "#ffec31") {
        return "row-accessories";
      }
    },
  },
};
</script>
<style scoped>
:deep(.row-accessories) {
  background-color: #ffec31 !important;
}
</style>

<!--
  components/reports/mekmar/gu/logs.vue
     -> app/components/reports/mekmar/gu/LogsList.vue

  Bu bileşen pages/reports/mekmar/gu.vue'nun bir TabView sekmesini
  dolduruyor. Sayfa ve iki buyuk operasyon bileşeni
  (ordererOperation / shippedOperation) SONRAKI commit'te; bu commit
  sekmelerin hafif olanlarini getiriyor.

  Otomatik ice alma adi `ReportsMekmarGuLogsList` -- Nuxt 2'deki global
  kayit adiyla AYNI (plugins/components.js:65).

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:
  [x] import { FilterMatchMode } from "primevue/api"
         -> "@primevue/core/api"
  [x] :filters + @update:filters -> v-model:filters
  [x] `rows="25"` -> `:rows="25"`
      Kaynakta tirnak icinde, yani DIZGE geciyordu. PrimeVue 4'te
      DataTable'in `rows` prop'u Number tipinde bildirilmis; dizge
      verilince Vue
         "Invalid prop: type check failed for prop rows.
          Expected Number with value 25, got String"
      uyarisi basiyor. `:` ile sayi olarak geciliyor.
  [x] `list` prop'una `default: () => []` eklendi (kaynakta yoktu)

  == KORUNANLAR (bilincli) ==
  1) `logsFilter` icinde `YuklemeTarihi` anahtari var ama o alana sahip
     bir KOLON YOK -- olu filtre girdisi. Zararsiz (PrimeVue yalnizca
     kolonlarin kullandigi anahtarlara bakiyor); silmek davranis
     degistirmezdi ama kaynaktaki hali korundu.
  2) `logsRowClass` eslesme yoksa `undefined` donuyor (else YOK).
     Vue bunu sorunsuz ele aliyor; kaynaktaki hali.
  3) Stil blogu zaten `:deep(...)` yaziyordu (Vue 2.7 de destekliyor),
     `::v-deep` yoktu -- cevrilecek bir sey cikmadi.
-->
