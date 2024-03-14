<template>
  <div class="row">
    <div class="col-9">
      <DataTable
        :value="allStatus ? allList : list"
        sortField="balanced"
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
        <Column
          field="customer_name"
          header="Customer"
          :showFilterMenu="false"
          :showClearButton="false"
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
        <Column field="total_order_amount" header="Total Order">
          <template #body="slotProps">
            {{ slotProps.data.total_order_amount | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.total | formatPriceUsd }}
          </template>
        </Column>
        <Column field="production" header="In Production">
          <template #body="slotProps">
            {{ slotProps.data.production | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.production | formatPriceUsd }}
          </template>
        </Column>
        <Column field="forwarding" header="In Shipment">
          <template #body="slotProps">
            {{ slotProps.data.forwarding | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.forwarding | formatPriceUsd }}
          </template>
        </Column>
        <Column field="advanced_payment" header="Pre Payment">
          <template #body="slotProps">
            {{ slotProps.data.advanced_payment | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.advanced | formatPriceUsd }}
          </template>
        </Column>
        <Column field="paid" header="Paid">
          <template #body="slotProps">
            {{ slotProps.data.paid | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.paid | formatPriceUsd }}
          </template>
        </Column>
        <Column field="total" header="Balance">
          <template #body="slotProps">
            {{ slotProps.data.total | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.balanceProduction | formatPriceUsd }}
          </template>
        </Column>
        <Column field="balanced" header="Balance(Except Production)">
          <template #body="slotProps">
            <div
              :style="{
                backgroundColor:
                  slotProps.data.balanced < -8
                    ? 'red'
                    : 'transparent' || slotProps.data.balanced > 8
                    ? 'green'
                    : 'transparent',
                color:
                  slotProps.data.balanced < -8
                    ? 'white'
                    : 'black' || slotProps.data.balanced > 8
                    ? 'white'
                    : 'black',
              }"
            >
              {{ slotProps.data.balanced | formatPriceUsd }}
            </div>
          </template>
          <template #footer>
            {{ total.balance | formatPriceUsd }}
          </template>
        </Column>
      </DataTable>
    </div>
    <div class="col-3">
      <DataTable :value="expiry" :loading="loading">
        <Column field="firmaAdi" header="Customer"></Column>
        <Column field="siparis_no" header="Po"></Column>
        <Column field="vade_tarih" header="Maturity">
          <template #body="slotProps">
            {{ slotProps.data.vade_tarih | dateToString }}
          </template>
        </Column>
        <Column field="tutar" header="Total">
          <template #body="slotProps">
            {{ slotProps.data.tutar | formatPriceUsd }}
          </template>
        </Column>
      </DataTable>
    </div>
    <DataTable :value="maya" :loading="loading">
      <Column field="order_date" header="Order Date">
        <template #body="slotProps">
          {{ slotProps.data.order_date | dateToString }}
        </template>
      </Column>
      <Column field="forwarding_date" header="Shipment Date">
        <template #body="slotProps">
          {{ slotProps.data.forwarding_date | dateToString }}
        </template>
      </Column>
      <Column field="customer" header="Customer"></Column>
      <Column field="po" header="Po"></Column>
      <Column field="order_amount" header="Invoice">
        <template #body="slotProps">
          {{ slotProps.data.order_amount | formatPriceUsd }}
        </template>
      </Column>
      <Column field="paid" header="Paid">
        <template #body="slotProps">
          {{ slotProps.data.paid | formatPriceUsd }}
        </template>
      </Column>
      <Column field="balance" header="Balance">
        <template #body="slotProps">
          {{ slotProps.data.balance | formatPriceUsd }}
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
    maya: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      filteredFinance: {
        customer_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
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
