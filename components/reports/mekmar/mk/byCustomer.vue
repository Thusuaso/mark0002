<template>
  <div class="row m-auto mt-3">
    <div class="col">
      <DataTable
        :value="list"
        :filters="filters"
        filterDisplay="row"
        style="font-size: 85%"
        :sortOrder="-1"
        sortField="Toplam"
        :loading="loading"
      >
        <Column
          field="musteri"
          header="Customer"
          bodyStyle="text-align:center"
          headerStyle="width:60px;"
          :showFilterMenu="false"
          :showFilterOperator="false"
          :showClearButton="false"
          :showApplyButton="false"
          :showFilterMatchModes="false"
          :showAddButton="false"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ slotProps.data.musteri }}
          </template>
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
          field="logo"
          header="Logo"
          headerStyle="width:30px;"
          bodyStyle="text-align:center"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            <img
              :src="'https://cdn.mekmarimage.com/countryLogo/' + slotProps.data.logo"
              width="40"
              height="40"
            />
          </template>
        </Column>
        <Column
          field="Toplam"
          header="Total"
          headerStyle="width:65px;"
          bodyStyle="text-align:center"
          style="flex-grow: 1; flex-basis: 100px"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ slotProps.data.Toplam | formatPriceUsd }}
          </template>
        </Column>
        <Column
          field="ulkeAdi"
          header="Country"
          headerStyle="width:60px;"
          bodyStyle="text-align:center"
          style="flex-grow: 1; flex-basis: 100px"
          :showFilterMenu="false"
          :showFilterOperator="false"
          :showClearButton="false"
          :showApplyButton="false"
          :showFilterMatchModes="false"
          :showAddButton="false"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ slotProps.data.ulkeAdi }}
          </template>
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
          field="temsilci"
          header="Representative"
          headerStyle="width:60px;"
          bodyStyle="text-align:center"
          style="flex-grow: 1; flex-basis: 100px"
          :showFilterMenu="false"
          :showFilterOperator="false"
          :showClearButton="false"
          :showApplyButton="false"
          :showFilterMatchModes="false"
          :showAddButton="false"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ slotProps.data.temsilci }}
          </template>
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
          field="BuYilUretim"
          :header="new Date().getFullYear() + '        Production-Shipped       '"
          headerStyle="width:100px;white-space:pre-wrap;"
          bodyStyle="text-align:center"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            <div style="column-count: 2; column-rule: 1px solid black">
              <div>
                {{ slotProps.data.BuYilUretim | formatPriceUsd }}
              </div>
              <div>
                {{ slotProps.data.BuYilSevkiyat | formatPriceUsd }}
              </div>
            </div>
          </template>
        </Column>

        <Column
          field="GecenYil"
          :header="new Date().getFullYear() - 1 + ' Ddp'"
          headerStyle="width:60px;"
          bodyStyle="text-align:center"
          style="flex-grow: 1; flex-basis: 100px"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ slotProps.data.GecenYil | formatPriceUsd }}
          </template>
        </Column>
        <Column
          field="OncekiYil"
          :header="new Date().getFullYear() - 2 + ' Ddp'"
          headerStyle="width:60px;"
          bodyStyle="text-align:center"
          style="flex-grow: 1; flex-basis: 100px"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ slotProps.data.OncekiYil | formatPriceUsd }}
          </template>
        </Column>

        <Column
          field="OnDokuzYili"
          :header="new Date().getFullYear() - 3 + ' Ddp'"
          headerStyle="width:60px;"
          bodyStyle="text-align:center"
          style="flex-grow: 1; flex-basis: 100px"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ slotProps.data.OnDokuzYili | formatPriceUsd }}
          </template>
        </Column>

        <Column
          field="OnSekizYili"
          :header="new Date().getFullYear() - 4 + ' Ddp'"
          headerStyle="width:60px;"
          bodyStyle="text-align:center"
          style="flex-grow: 1; flex-basis: 100px"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ slotProps.data.OnSekizYili | formatPriceUsd }}
          </template>
        </Column>
        <Column
          field="OnYediYili"
          :header="new Date().getFullYear() - 5 + ' Ddp'"
          headerStyle="width:60px;"
          bodyStyle="text-align:center"
          style="flex-grow: 1; flex-basis: 100px"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ slotProps.data.OnYediYili | formatPriceUsd }}
          </template>
        </Column>
        <Column
          field="OnAltiYili"
          :header="new Date().getFullYear() - 6 + ' Ddp'"
          headerStyle="width:60px;"
          bodyStyle="text-align:center"
          style="flex-grow: 1; flex-basis: 100px"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ slotProps.data.OnAltiYili | formatPriceUsd }}
          </template>
        </Column>
        <Column
          field="OnBesYili"
          :header="new Date().getFullYear() - 7 + ' Ddp'"
          headerStyle="width:60px;"
          bodyStyle="text-align:center"
          style="flex-grow: 1; flex-basis: 100px"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ slotProps.data.OnBesYili | formatPriceUsd }}
          </template>
        </Column>
        <Column
          field="OnDortYili"
          :header="new Date().getFullYear() - 8 + ' Ddp'"
          headerStyle="width:60px;"
          bodyStyle="text-align:center"
          style="flex-grow: 1; flex-basis: 100px"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ slotProps.data.OnDortYili | formatPriceUsd }}
          </template>
        </Column>
        <Column
          field="OnUcYili"
          :header="new Date().getFullYear() - 9 + ' Ddp'"
          headerStyle="width:60px;"
          bodyStyle="text-align:center"
          style="flex-grow: 1; flex-basis: 100px"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ slotProps.data.OnUcYili | formatPriceUsd }}
          </template>
        </Column>
        <Column
          field="OnUcYiliOncesi"
          :header="new Date().getFullYear() - 10 + ' Ddp'"
          headerStyle="width:60px;"
          bodyStyle="text-align:center"
          style="flex-grow: 1; flex-basis: 100px"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ slotProps.data.OnUcYiliOncesi | formatPriceUsd }}
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>
<script>
import { FilterMatchMode } from "primevue/api";
export default {
  props: {
    list: {},
    loading: {},
  },
  data() {
    return {
      filters: {
        musteri: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        ulkeAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        temsilci: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
    };
  },
};
</script>
