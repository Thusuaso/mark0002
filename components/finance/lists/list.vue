<template>
  <div class="row">
    <div class="col-9">
      <DataTable
        :value="allStatus ? allList : list"
        sortField="Balanced"
        :sortOrder="-1"
        scrollable
        scrollHeight="650px"
        :filters.sync="filteredFinance"
        filterDisplay="row"
        @filter="financeFiltered($event)"
        :selection.sync="selectedFinanceList"
        selectionMode="single"
        @row-click="$emit('finance_list_selected_emit', $event)"
        :loading="loading"
      >
        <Column field="FirmaAdi" header="Customer" :showFilterMenu="false" :showClearButton="false">
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              class="p-column-filter"
            />
          </template>
        </Column>
        <Column field="TotalOrder" header="Total Order">
          <template #body="slotProps">
            {{ slotProps.data.TotalOrder | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.total | formatPriceUsd }}
          </template>
        </Column>
        <Column field="ProductOrder" header="In Production">
          <template #body="slotProps">
            {{ slotProps.data.ProductOrder | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.production | formatPriceUsd }}
          </template>
        </Column>
        <Column field="ForwardingOrder" header="In Shipment">
          <template #body="slotProps">
            {{ slotProps.data.ForwardingOrder | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.forwarding | formatPriceUsd }}
          </template>
        </Column>
        <Column field="AdvancedPayment" header="Pre Payment">
          <template #body="slotProps">
            {{ slotProps.data.AdvancedPayment | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.advanced | formatPriceUsd }}
          </template>
        </Column>
        <Column field="Paid" header="Paid">
          <template #body="slotProps">
            {{ slotProps.data.Paid | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.paid | formatPriceUsd }}
          </template>
        </Column>
        <Column field="BalancedProduction" header="Balance">
          <template #body="slotProps">
            {{ slotProps.data.BalancedProduction | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.balanceProduction | formatPriceUsd }}
          </template>
        </Column>
        <Column field="Balanced" header="Balance(Except Production)">
          <template #body="slotProps">
            {{ slotProps.data.Balanced | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.balance | formatPriceUsd }}
          </template>
        </Column>
      </DataTable>
    </div>
    <div class="col-3">
      <DataTable :value="expiry" :loading="loading">
        <Column field="FirmaAdi" header="Customer"></Column>
        <Column field="SiparisNo" header="Po"></Column>
        <Column field="Vade" header="Maturity">
          <template #body="slotProps">
            {{ slotProps.data.Vade | dateToString }}
          </template>
        </Column>
        <Column field="Total" header="Total">
          <template #body="slotProps">
            {{ slotProps.data.Total | formatPriceUsd }}
          </template>
        </Column>
      </DataTable>
    </div>
    <DataTable :value="maya" :loading="loading">
      <Column field="SiparisTarihi" header="Order Date">
        <template #body="slotProps">
          {{ slotProps.data.SiparisTarihi | dateToString }}
        </template>
      </Column>
      <Column field="YuklemeTarihi" header="Shipment Date">
        <template #body="slotProps">
          {{ slotProps.data.YuklemeTarihi | dateToString }}
        </template>
      </Column>
      <Column field="FirmaAdi" header="Customer"></Column>
      <Column field="SiparisNo" header="Po"></Column>
      <Column field="Invoice" header="Invoice">
        <template #body="slotProps">
          {{ slotProps.data.Invoice | formatPriceUsd }}
        </template>
      </Column>
      <Column field="Paid" header="Paid">
        <template #body="slotProps">
          {{ slotProps.data.Paid | formatPriceUsd }}
        </template>
      </Column>
      <Column field="Balance" header="Balance">
        <template #body="slotProps">
          {{ slotProps.data.Balance | formatPriceUsd }}
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
    total: {
      type: Object,
      required: false,
    },
    expiry: {
      type: Array,
      required: false,
    },
    allStatus: {
      type: Boolean,
      required: true,
    },
    allList: {
      type: Array,
      required: false,
    },
    loading: {
      type: Boolean,
      required: false,
    },
    maya:{
      type:Boolean,
      required:false
    }
  },
  data() {
    return {
      filteredFinance: {
        FirmaAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      selectedFinanceList: null,
    };
  },
  methods: {
    financeFiltered(event) {
      this.$store.dispatch("setFinanceTotalList", event.filteredValue);
    },
  },
};
</script>
