<template>
  <div class="row">
    <div class="col-9">
      <DataTable
        :value="list"
        responsiveLayout="scroll"
        :selection.sync="selectedFinanceList"
        selectionMode="single"
        @row-click="financeListSelected($event)"
        :loading="loading"
        :filters.sync="filterSampleFinance"
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
            {{ slotProps.data.AlisUsd | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.getUsd | formatPriceUsd }}
          </template>
        </Column>
        <Column
          field="SatisUsd"
          header="USD Selling"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ slotProps.data.SatisUsd | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.setUsd | formatPriceUsd }}
          </template>
        </Column>
        <Column
          field="AlisEuro"
          header="Euro Buying"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ slotProps.data.AlisEuro | formatPriceEuro }}
          </template>
          <template #footer>
            {{ total.getEuro | formatPriceEuro }}
          </template>
        </Column>
        <Column
          field="SatisEuro"
          header="Euro Selling"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ slotProps.data.SatisEuro | formatPriceEuro }}
          </template>
          <template #footer>
            {{ total.setEuro | formatPriceEuro }}
          </template>
        </Column>
        <Column
          field="AlisTl"
          header="TL Buying"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ slotProps.data.AlisTl | formatPriceTl }}
          </template>
          <template #footer>
            {{ total.getTl | formatPriceTl }}
          </template>
        </Column>
        <Column
          field="SatisTl"
          header="TL Selling"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ slotProps.data.SatisTl | formatPriceTl }}
          </template>
          <template #footer>
            {{ total.setTl | formatPriceTl }}
          </template>
        </Column>
      </DataTable>
    </div>
    <div class="col-3">
      <DataTable :value="bank" :loading="loading">
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
            {{ slotProps.data.Tutar | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.bank | formatPriceUsd }}
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
            <th>{{ (total.setUsd - total.getUsd) | formatPriceUsd }}</th>
            <td>{{ (total.setEuro - total.getEuro) | formatPriceUsd }}</td>
            <td>{{ (total.setTl - total.getTl) | formatPriceUsd }}</td>
          </tr>
        </tbody>
      </table>
    </div>
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
    total: {
      type: Object,
      required: false,
    },
    bank: {
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
