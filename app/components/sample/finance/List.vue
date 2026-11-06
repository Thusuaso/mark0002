<template>
  <div class="row">
    <div class="col-12 col-lg-9">
      <DataTable
        :value="list"
        responsiveLayout="scroll"
        v-model:selection="selectedFinanceList"
        selectionMode="single"
        @row-click="financeListSelected($event)"
        v-model:filters="filterSampleFinance"
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
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              class="p-column-filter"
            />
          </template>
        </Column>
        <Column
          field="AlisUsd"
          header="USD Buying"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ formatPriceUsd(slotProps.data.AlisUsd) }}
          </template>
          <template #footer>
            {{ formatPriceUsd(total.getUsd) }}
          </template>
        </Column>
        <Column
          field="SatisUsd"
          header="USD Selling"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ formatPriceUsd(slotProps.data.SatisUsd) }}
          </template>
          <template #footer>
            {{ formatPriceUsd(total.setUsd) }}
          </template>
        </Column>
        <Column
          field="AlisEuro"
          header="Euro Buying"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ formatPriceEuro(slotProps.data.AlisEuro) }}
          </template>
          <template #footer>
            {{ formatPriceEuro(total.getEuro) }}
          </template>
        </Column>
        <Column
          field="SatisEuro"
          header="Euro Selling"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ formatPriceEuro(slotProps.data.SatisEuro) }}
          </template>
          <template #footer>
            {{ formatPriceEuro(total.setEuro) }}
          </template>
        </Column>
        <Column
          field="AlisTl"
          header="TL Buying"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ formatPriceTl(slotProps.data.AlisTl) }}
          </template>
          <template #footer>
            {{ formatPriceTl(total.getTl) }}
          </template>
        </Column>
        <Column
          field="SatisTl"
          header="TL Selling"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ formatPriceTl(slotProps.data.SatisTl) }}
          </template>
          <template #footer>
            {{ formatPriceTl(total.setTl) }}
          </template>
        </Column>
      </DataTable>
    </div>
    <div class="col-12 col-lg-3">
      <DataTable :value="bank" >
        <Column
          field="Banka"
          header="Bank"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
        </Column>
        <Column
          field="Tutar"
          header="Amount"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ formatPriceUsd(slotProps.data.Tutar) }}
          </template>
          <template #footer>
            {{ formatPriceUsd(total.bank) }}
          </template>
        </Column>
      </DataTable>
      <br />
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Profit($)</th>
            <th scope="col">Profit(€)</th>
            <th scope="col">Profit(₺)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ formatPriceUsd((total.setUsd - total.getUsd)) }}</td>
            <td>{{ formatPriceEuro((total.setEuro - total.getEuro)) }}</td>
            <td>{{ formatPriceTl((total.setTl - total.getTl)) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { FilterMatchMode } from "@primevue/core/api";

export default {
  props: {
    list: {
      type: Array,
      required: false,
    },
    total: {
      type: Object,
      required: false,
    },
    bank: {
      type: Array,
      required: false,
    },

  },
  data() {
    return {
      selectedFinanceList: null,
      filterSampleFinance: {
        MusteriAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
    };
  },
  methods: {
    financeListSelected(event) {
      this.$emit("finance_list_selected_emit", event.data);
    },
  },
};
</script>
<style scoped>
@media screen and (max-width:576px) {
  .row{
    clear:both;
    display:block;
    width:100%;
  }
  .col-9{
    clear: both;
    display:block;
    width:100%;
  }
  .col-3{
    clear:both;
    display:block;
    width:100%;
  }
}
</style>
