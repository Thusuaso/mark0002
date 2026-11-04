<template>
  <div class="row">
    <div class="col">
      <DataTable
        :value="contCountList"
        scrollable
        scrollHeight="450px"
        v-model:filters="filtersContCount"
        filterDisplay="row"
      >
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
          field="SipSayisi"
          header="Order Amount"
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
          field="KontSayisi"
          header="Container Amount"
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
    <div class="col">
      <DataTable
        :value="contCustList"
        scrollable
        scrollHeight="450px"
        v-model:filters="filtersContCust"
        filterDisplay="row"
      >
        <Column
          field="FirmaAdi"
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
          field="SipSayisi"
          header="Order Amount"
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
          field="KontSayisi"
          header="Container Amount"
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
  </div>
</template>
<script>
import { FilterMatchMode } from "@primevue/core/api"
export default {
  props: {
    contCountList: {
      type: Array,
      required: false,
      default: () => [],
    },
    contCustList: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data() {
    return {
      filtersContCount: {
        UlkeAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        KontSayisi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        SipSayisi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      filtersContCust: {
        FirmaAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        KontSayisi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        SipSayisi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
    };
  },
};
</script>

<!--
  components/reports/mekmar/gu/cont.vue
     -> app/components/reports/mekmar/gu/ContList.vue

  Bu bileşen pages/reports/mekmar/gu.vue'nun bir TabView sekmesini
  dolduruyor. Sayfa ve iki buyuk operasyon bileşeni
  (ordererOperation / shippedOperation) SONRAKI commit'te; bu commit
  sekmelerin hafif olanlarini getiriyor.

  Otomatik ice alma adi `ReportsMekmarGuContList` -- Nuxt 2'deki global
  kayit adiyla AYNI (plugins/components.js:63).

  DIKKAT -- ADI BENZEYEN BASKA BIR BILESEN VAR: pilotta
  app/components/reports/mekmar/GuContinentOrders.vue zaten duruyor ve o
  BASKA bir kaynaktan geliyor (gu/continent.vue), BASKA bir sayfaya ait
  (reports/mekmar/continent-order.vue). Bu dosya gu/cont.vue -- ulke ve
  musteri bazinda konteyner/siparis sayilari. `gu/` alt klasoru ikisini
  ayri tutuyor (adlar: ReportsMekmarGuContList vs
  ReportsMekmarGuContinentOrders).

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:
  [x] import { FilterMatchMode } from "primevue/api"
         -> "@primevue/core/api"   (alt paket v4'te TAMAMEN kaldirildi)
  [x] :filters + @update:filters -> v-model:filters   (IKI tabloda da)
  [x] Iki prop'a `default: () => []` eklendi -- kaynakta YOKTU, yani
      veri gelene kadar iki DataTable da :value="undefined" aliyordu.

  NOT: iki filtre nesnesi de ucuncu bir anahtar (SipSayisi) tasiyor ve
  o kolonun #filter slot'u VAR, yani uc anahtarin ucu de kullaniliyor --
  List.vue'daki (seleksiyon) eksik-anahtar hatasi burada YOK.
-->
