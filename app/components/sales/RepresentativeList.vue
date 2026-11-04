<template>
  <div class="row">
    <div class="col">
      <DataTable
        :value="list"
        size="small"
        v-model:selection="selectedRepresentative"
        selectionMode="single"
        @row-click="representativeSelected($event)"
        v-model:filters="representativeFilter"
        filterDisplay="row"
      >
        <Column
          field="SiparisNo"
          header="Po"
          :showFilterMenu="false"
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
          field="SiparisSahibi"
          header="Seller"
          :showFilterMenu="false"
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
          field="Operasyon"
          header="Operation"
          :showFilterMenu="false"
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
      <DataTable :value="orderer" size="small">
        <template #header>
          <div
            class="flex flex-wrap align-items-center justify-content-between text-center"
          >
            Sales Summary
          </div>
        </template>
        <Column
          field="SiparisSahibi"
          header="Seller"
          headerClass="tableHeader"
          bodyClass="tableBody"
        />
        <Column
          field="Total"
          header="Total"
          headerClass="tableHeader"
          bodyClass="tableBody"
        />
      </DataTable>
      <br />
      <DataTable :value="operation" size="small">
        <template #header>
          <div
            class="flex flex-wrap align-items-center justify-content-between gap-2 text-center"
          >
            Operation Summary
          </div>
        </template>
        <Column
          field="Operasyon"
          header="Seller"
          headerClass="tableHeader"
          bodyClass="tableBody"
        />
        <Column
          field="Total"
          header="Total"
          headerClass="tableHeader"
          bodyClass="tableBody"
        />
      </DataTable>
    </div>
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
    orderer: {
      type: Array,
      required: false,
      default: () => [],
    },
    operation: {
      type: Array,
      required: false,
      default: () => [],
    },
  },

  data() {
    return {
      selectedRepresentative: null,
      representativeFilter: {
        SiparisNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        SiparisSahibi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Operasyon: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
    }
  },

  methods: {
    representativeSelected(event) {
      this.$emit("representative_form_emit", event.data)
    },
  },
}
</script>

<!--
  components/sales/RepresentativeList.vue
  (Nuxt 2: components/sales/representative/list.vue)

  Etiket adi <SalesRepresentativeList>. Nuxt 2'de ad `representativeList`
  idi (plugins/components.js:239, ELLE kayit).

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] import { FilterMatchMode } from "primevue/api"
         -> "@primevue/core/api"
      Alt paket "primevue/api" PrimeVue 4'te TAMAMEN kaldirildi; eski yol
      derlemeyi "Failed to resolve import" ile dusurur.

  [x] :selection + @update:selection -> v-model:selection
      :filters   + @update:filters   -> v-model:filters
      Nuxt 2'deki hali Vue 2 .sync codemod ciktisiydi
      (mark0002 commit c569066e5); Vue 3'te dogru yazim v-model:<ad>.

  [x] class="p-datatable-sm" -> size="small"
      PrimeVue 4'te `p-datatable-sm` SINIFI YOK -- paket kaynaginda o ad
      hic gecmiyor; yerine DataTable'in `size` prop'u geldi ('small').
      Sinif olarak birakilsa tablo SESSIZCE normal boyutta render
      edilirdi.

      DIKKAT: pilotta bu olu sinif daha 23 YERDE duruyor (bu dosya haric).
      Hepsini cevirmek 23 tabloyu gorsel olarak kuculteceginden ayri bir
      karar; burada yalnizca yeni dosya dogru yazildi.

  [x] <Column ...></Column> -> <Column ... />  (ic icerik olmayanlar)

  [x] props: list / orderer / operation -> `default: () => []`
      Nuxt 2'de required:false ve default YOKTU, yani veri gelene kadar
      uc DataTable da :value="undefined" aliyordu.
-->
