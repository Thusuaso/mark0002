<template>
  <div>
    <DataTable
      :value="list"
      :filters="filterAtlanta" @update:filters="filterAtlanta = $event"
      filterDisplay="row"
      :selection="selectedAtlantaList" @update:selection="selectedAtlantaList = $event"
      selectionMode="single"
    >
      <Column
        field="SkuNo"
        header="Sku"
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
        field="MekmarKod"
        header="Code"
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
        field="UrunTanim"
        header="Description"
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
        field="atl"
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
        field="KasaAdet"
        header="Amount in Crate"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ formatDecimal(slotProps.data.KasaAdet) }}
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
        field="KasaKutu"
        header="Box in Crate"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ formatDecimal(slotProps.data.KasaKutu) }}
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
        field="KasaM2"
        header="M2 in Crate"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ formatDecimal(slotProps.data.KasaM2) }}
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
        field="KasaSqft"
        header="Sqft in Crate"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ formatDecimal(slotProps.data.KasaSqft) }}
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
        field="StokBox"
        header="Boxes (in Stock)"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ formatDecimal(slotProps.data.StokBox) }}
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
        field="StokSqft"
        header="Sqft (in Stock)"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ formatDecimal(slotProps.data.StokSqft) }}
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
        field="mekmar_fiyat"
        header="Price"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ formatPriceUsd(slotProps.data.mekmar_fiyat) }}
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
    },
  },
  data() {
    return {
      filterAtlanta: {
        SkuNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        MekmarKod: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        UrunTanim: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        atl: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        KasaAdet: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        KasaKutu: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        KasaM2: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        KasaSqft: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        StokBox: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        StokSqft: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        mekmar_fiyat: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      selectedAtlantaList: null,
    };
  },
};
</script>

<!--
  components/reports/mekmer/atlanta/list.vue -> ReportsMekmerAtlantaList

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] import { FilterMatchMode } from "primevue/api"
         -> "@primevue/core/api"
      PrimeVue 4'te "primevue/api" yolu YOK. Eski yol derleme hatasi
      vermeden cozulurse FilterMatchMode undefined olur ve her filtre
      matchMode'u undefined'a duser -- satirlar sessizce filtrelenmez.

  KALDIRILDI -- OLU KOD:
  [x] @row-dblclick="test" ve methods.test() { }
      test() govdesi BOSTU. Satira cift tiklamak hicbir sey yapmiyordu.

  DOKUNULMADI ama DIKKAT:
      `selectedAtlantaList` yalnizca :selection / @update:selection ile
      bagli; secimi OKUYAN hicbir sey yok. Yani tek etkisi satirin
      vurgulanmasi. Nuxt 2'deki haliyle ayni, bilerek korundu.
-->
