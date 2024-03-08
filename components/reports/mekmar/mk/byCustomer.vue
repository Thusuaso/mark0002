<template>
  <div>
    <DataTable
      :value="list"
      sortField="Toplam"
      :sortOrder="-1"
      :filters.sync="filteredByCustomer"
      filterDisplay="row"
      :loading="loading"
    >
      <Column field="FirmaAdi" header="Customer" :showFilterMenu="false" :showClearButton="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
            style="width: 100px"
          />
        </template>
      </Column>
      <Column field="Ulke" header="Country" :showFilterMenu="false" :showClearButton="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
            style="width: 100px"
          />
        </template>
      </Column>
      <Column field="Temsilci" header="Representative" :showFilterMenu="false" :showClearButton="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
            style="width: 100px"
          />
        </template>
      </Column>
      <Column field="Marketing" header="Marketing" :showFilterMenu="false" :showClearButton="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
            style="width: 100px"
          />
        </template>
      </Column>

      <Column field="Toplam" :header="'Total'">
        <template #body="slotProps">
          {{ slotProps.data.Toplam | formatPriceUsd }}
        </template>
      </Column>
      <Column :header="new Date().getFullYear()">
        <template #body="slotProps">
          {{ slotProps.data.BuYilSiparis | formatPriceUsd }}
          {{ slotProps.data.BuYilYuklenen | formatPriceUsd }}
        </template>
      </Column>
      <Column field="BirYilOnceYuklenen" :header="new Date().getFullYear() - 1">
        <template #body="slotProps">
          {{ slotProps.data.BirYilOnceYuklenen | formatPriceUsd }}
        </template>
      </Column>
      <Column field="İkiYilOnceYuklenen" :header="new Date().getFullYear() - 2">
        <template #body="slotProps">
          {{ slotProps.data.İkiYilOnceYuklenen | formatPriceUsd }}
        </template>
      </Column>
      <Column field="UcYilOnceYuklenen" :header="new Date().getFullYear() - 3">
        <template #body="slotProps">
          {{ slotProps.data.UcYilOnceYuklenen | formatPriceUsd }}
        </template>
      </Column>
      <Column field="DortYilOnceYuklenen" :header="new Date().getFullYear() - 4">
        <template #body="slotProps">
          {{ slotProps.data.DortYilOnceYuklenen | formatPriceUsd }}
        </template>
      </Column>
      <Column field="BesYilOnceYuklenen" :header="new Date().getFullYear() - 5">
        <template #body="slotProps">
          {{ slotProps.data.BesYilOnceYuklenen | formatPriceUsd }}
        </template>
      </Column>

      <Column field="AltiYilOnceYuklenen" :header="new Date().getFullYear() - 6">
        <template #body="slotProps">
          {{ slotProps.data.AltiYilOnceYuklenen | formatPriceUsd }}
        </template>
      </Column>
      <Column field="YediYilOnceYuklenen" :header="new Date().getFullYear() - 7">
        <template #body="slotProps">
          {{ slotProps.data.YediYilOnceYuklenen | formatPriceUsd }}
        </template>
      </Column>

      <Column field="SekizYilOnceYuklenen" :header="new Date().getFullYear() - 8">
        <template #body="slotProps">
          {{ slotProps.data.SekizYilOnceYuklenen | formatPriceUsd }}
        </template>
      </Column>
      <Column field="DokuzYilOnceYuklenen" :header="new Date().getFullYear() - 9">
        <template #body="slotProps">
          {{ slotProps.data.DokuzYilOnceYuklenen | formatPriceUsd }}
        </template>
      </Column>
      <Column field="OnYilOnceYuklenen" :header="new Date().getFullYear() - 10">
        <template #body="slotProps">
          {{ slotProps.data.OnYilOnceYuklenen | formatPriceUsd }}
        </template>
      </Column>
      <Column field="OnBirYilOnceYuklenen" :header="new Date().getFullYear() - 11">
        <template #body="slotProps">
          {{ slotProps.data.OnBirYilOnceYuklenen | formatPriceUsd }}
        </template>
      </Column>
      <Column
        field="OnIkiYilOnceYuklenen"
        :header="new Date().getFullYear() - 11 + ' Before'"
      >
        <template #body="slotProps">
          {{ slotProps.data.OnIkiYilOnceYuklenen | formatPriceUsd }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script>
import { FilterMatchMode } from "primevue/api";
export default {
  props: {
    list: {
      type: Array,
      required: false,
    },
    loading: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      filteredByCustomer: {
        FirmaAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Ulke: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Temsilci: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Marketing: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
    };
  },
};
</script>
