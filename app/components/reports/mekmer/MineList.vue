<template>
  <div>
    <DataTable
      :value="list"
      class="p-datatable-sm"
      :filters="mineFilter" @update:filters="mineFilter = $event"
      filterDisplay="row"
    >
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
        field="M2"
        header="M2"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ formatDecimal(slotProps.data.M2) }}
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
        field="MT"
        header="MT"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ formatDecimal(slotProps.data.MT) }}
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
        field="Adet"
        header="Piece"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ formatDecimal(slotProps.data.Adet) }}
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
        field="KasaAdedi"
        header="Crate Piece"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ formatDecimal(slotProps.data.KasaAdedi) }}
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
      selectedMineList: null,
      mineFilter: {
        OcakAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        M2: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        MT: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Adet: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        KasaAdedi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
    };
  },
};
</script>

<!--
  components/reports/mekmer/mine/list.vue -> ReportsMekmerMineList

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] "primevue/api" -> "@primevue/core/api"   (AtlantaList.vue ile ayni
      gerekce: PrimeVue 4'te eski yol yok, FilterMatchMode undefined'a
      duser ve filtreler sessizce calismaz.)

  KALDIRILDI -- OLU KOD:
  [x] methods: {}        (bos)
  [x] `loading` PROP'U HIC TANIMLI DEGILDI -- asagiya bakin.

  DIKKAT -- NUXT 2'DE DE VAR OLAN TUHAFLIK:
      pages/reports/mekmer/mine.vue bu bilesene :loading="getLoading"
      geciriyor, ama bilesenin props'unda `loading` TANIMLI DEGIL ve
      sablonda da kullanilmiyor. Yani DataTable'in yukleme gostergesi bu
      ekranda hic calismiyordu. Davranis birebir korundu: prop
      EKLENMEDI. Eklemek gorunumu degistirir (tabloya spinner gelir),
      bu yuzden ayri bir karar.

      Ayrica `selectedMineList` data'da duruyor ama hicbir yere BAGLI
      DEGIL -- ne :selection ne baska bir sey. Tamamen olu; yine de
      birebir korundu cunku kaldirmak bu commit'in kapsamini
      "davranis-korumali tasima"dan cikarir.
-->
