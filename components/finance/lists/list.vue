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
        <Column field="FirmaAdi" header="Müşteri" :showFilterMenu="false">
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              class="p-column-filter"
            />
          </template>
        </Column>
        <Column field="TotalOrder" header="Toplam Sipariş">
          <template #body="slotProps">
            {{ slotProps.data.TotalOrder | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.total | formatPriceUsd }}
          </template>
        </Column>
        <Column field="ProductOrder" header="Üretimde">
          <template #body="slotProps">
            {{ slotProps.data.ProductOrder | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.production | formatPriceUsd }}
          </template>
        </Column>
        <Column field="ForwardingOrder" header="Sevkiyatta">
          <template #body="slotProps">
            {{ slotProps.data.ForwardingOrder | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.forwarding | formatPriceUsd }}
          </template>
        </Column>
        <Column field="AdvancedPayment" header="Peşinat">
          <template #body="slotProps">
            {{ slotProps.data.AdvancedPayment | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.advanced | formatPriceUsd }}
          </template>
        </Column>
        <Column field="Paid" header="Ödenen">
          <template #body="slotProps">
            {{ slotProps.data.Paid | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.paid | formatPriceUsd }}
          </template>
        </Column>
        <Column field="BalancedProduction" header="Bakiye">
          <template #body="slotProps">
            {{ slotProps.data.BalancedProduction | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.balanceProduction | formatPriceUsd }}
          </template>
        </Column>
        <Column field="Balanced" header="Bakiye(Üretim Hariç)">
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
        <Column field="FirmaAdi" header="Müşteri"></Column>
        <Column field="SiparisNo" header="Po"></Column>
        <Column field="Vade" header="Vade">
          <template #body="slotProps">
            {{ slotProps.data.Vade | dateToString }}
          </template>
        </Column>
        <Column field="Total" header="Toplam">
          <template #body="slotProps">
            {{ slotProps.data.Total | formatPriceUsd }}
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
