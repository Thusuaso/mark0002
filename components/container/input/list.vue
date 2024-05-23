<template>
  <div>
    <DataTable
      :value="list"
      paginator
      :rows="15"
      :filters.sync="filters1"
      filterDisplay="row"
    >
      <Column
        field="EvrakYuklemeTarihi"
        header="Upload Date"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ slotProps.data.EvrakYuklemeTarihi | dateToString }}
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
        field="firma"
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
        field="SiparisNo"
        header="Po"
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
        field="FaturaNo"
        header="Invoice No"
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
        field="Tur"
        header="Kind"
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
        field="Kur"
        header="Currency"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ slotProps.data.Kur | formatPriceTl }}
        </template>
      </Column>
      <Column field="Tutar" header="$" headerClass="tableHeader" bodyClass="tableBody">
        <template #body="slotProps">
          {{ slotProps.data.Tutar | formatPriceUsd }}
        </template>
      </Column>
      <Column field="Tutar" header="₺" headerClass="tableHeader" bodyClass="tableBody">
        <template #body="slotProps">
          {{ (slotProps.data.Tutar * slotProps.data.Kur) | formatPriceTl }}
        </template>
      </Column>
      <Column
        field="Aciklama"
        header="Description"
        headerClass="tableHeader"
        bodyClass="tableBody"
      ></Column>
      <Column field="Link" header="Link" headerClass="tableHeader" bodyClass="tableBody">
        <template #body="slotProps">
          <a :href="slotProps.data.Link">
            <i class="pi pi-download" style="font-size: 1rem"></i>
          </a>
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

  },
  data() {
    return {
      filters1: {
        EvrakYuklemeTarihi: { value: null, matchmode: FilterMatchMode.STARTS_WITH },
        firma: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        SiparisNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        FaturaNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Tur: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
    };
  },
};
</script>
