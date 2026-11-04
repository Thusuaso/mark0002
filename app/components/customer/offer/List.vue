<template>
  <DataTable
    :value="offer"
    paginator
    :rows="15"
    v-model:selection="selectedOffer"
    selectionMode="single"
    @row-click="$emit('offer_customer_selected', $event)"
    v-model:filters="filters1"
    filterDisplay="row"
  >
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
          type="text"
          v-model="filterModel.value"
          @input="filterCallback()"
          class="p-column-filter"
        />
      </template>
    </Column>
    <Column
      field="Company"
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
      field="Mail"
      header="Mail"
      headerClass="tableHeader"
      bodyClass="tableBody"
    />
    <Column
      field="Phone"
      header="Phone"
      headerClass="tableHeader"
      bodyClass="tableBody"
    />
    <Column
      field="Adress"
      header="Address"
      headerClass="tableHeader"
      bodyClass="tableBody"
    />
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
          type="text"
          v-model="filterModel.value"
          @input="filterCallback()"
          class="p-column-filter"
        />
      </template>
    </Column>
    <Column
      field="KullaniciAdi"
      header="Salesman"
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
  </DataTable>
</template>

<script>
import { FilterMatchMode } from "@primevue/core/api"

export default {
  props: {
    offer: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  emits: ["offer_customer_selected"],
  data() {
    return {
      selectedOffer: null,
      filters1: {
        MusteriAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Company: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        UlkeAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        KullaniciAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
    }
  },
}
</script>

<!--
  components/customer/offer/list.vue -> app/components/customer/offer/List.vue

  Otomatik ice alma adi `CustomerOfferList` -- Nuxt 2'deki global kayit
  adiyla AYNI (plugins/components.js:266).

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] import { FilterMatchMode } from "primevue/api"
         -> "@primevue/core/api"      (alt paket v4'te TAMAMEN kaldirildi;
                                       eski yol derlemeyi dusurur)
  [x] :selection + @update:selection -> v-model:selection
      :filters   + @update:filters   -> v-model:filters
      (Nuxt 2'deki hali Vue 2 .sync codemod ciktisiydi, commit c569066e5)
  [x] bos <Column ...></Column> uclari -> self-closing
  [x] `offer` prop'una `default: () => []` eklendi -- Nuxt 2'de default
      YOKTU, yani veri gelene kadar DataTable :value="undefined" aliyordu.
      (container/FollowList.vue ile ayni duzeltme.)
  [x] `emits: ["offer_customer_selected"]` bildirildi: Vue 3'te
      bildirilmeyen emit'ler DOM attribute'u olarak kok ogeye dusuyor
      ve uyari veriyor.

  YEDI KOLON DA AYRI AYRI YAZILI BIRAKILDI (v-for'a INDIRILMEDI):
  dort filtreli kolon ardi ardina DEGIL -- kaynaktaki sira
      MusteriAdi(f) · Company(f) · Mail · Phone · Adress · UlkeAdi(f) ·
      KullaniciAdi(f)
  yani filtreliler Mail/Phone/Address ile BOLUNMUS. Tek bir v-for
  filtrelileri bir araya toplar ve kolon sirasini DEGISTIRIRDI; iki ayri
  dongu de araya giren uc kolonu disarida birakirdi. #filter slot'unun
  dort kez tekrar etmesi, kolon sirasinin dogrulugu karsiliginda kabul
  edildi.
-->
