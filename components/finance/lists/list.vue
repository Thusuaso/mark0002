<template>
  <div class="row">
    <div :class="status ? 'col-9' : 'col'">
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
      >
        <Column
          field="customer_name"
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
          field="total_order_amount"
          header="Total Order"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ slotProps.data.total_order_amount | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.total | formatPriceUsd }}
          </template>
        </Column>
        <Column
          field="production"
          header="On Production"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ slotProps.data.production | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.production | formatPriceUsd }}
          </template>
        </Column>
        <Column
          field="forwarding"
          header="Shipped"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ slotProps.data.forwarding | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.forwarding | formatPriceUsd }}
          </template>
        </Column>
        <Column
          field="advanced_payment"
          header="Pre Payment"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ slotProps.data.advanced_payment | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.advanced | formatPriceUsd }}
          </template>
        </Column>
        <Column
          field="paid"
          header="Paid"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ slotProps.data.paid | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.paid | formatPriceUsd }}
          </template>
        </Column>
        <Column
          field="total"
          header="Balance (Including Production)"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ slotProps.data.total | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.balanceProduction | formatPriceUsd }}
          </template>
        </Column>
        <Column
          field="balanced"
          header="Balance (Except Production)"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
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
    <div class="col-3" v-if="status">
      <DataTable :value="expiry" sortField="vade_tarih" :sortOrder="1">
        <Column
          field="firmaAdi"
          header="Customer"
          headerClass="tableHeader"
          bodyClass="tableBody"
        ></Column>
        <Column
          field="siparis_no"
          header="Po"
          headerClass="tableHeader"
          bodyClass="tableBody"
        ></Column>
        <Column
          field="vade_tarih"
          header="Maturity"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ slotProps.data.vade_tarih | dateToString }}
          </template>
        </Column>
        <Column
          field="tutar"
          header="Total"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ slotProps.data.tutar | formatPriceUsd }}
          </template>
          <template #footer>
            {{ expiryTotal | formatPriceUsd }}
          </template>
        </Column>
      </DataTable>
    </div>
    <DataTable :value="maya" v-if="status">
      <Column
        field="order_date"
        header="Order Date"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ slotProps.data.order_date | dateToString }}
        </template>
      </Column>
      <Column
        field="forwarding_date"
        header="Shipment Date"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ slotProps.data.forwarding_date | dateToString }}
        </template>
      </Column>
      <Column
        field="customer"
        header="Customer"
        headerClass="tableHeader"
        bodyClass="tableBody"
      ></Column>
      <Column
        field="po"
        header="Po"
        headerClass="tableHeader"
        bodyClass="tableBody"
      ></Column>
      <Column
        field="order_amount"
        header="Invoice"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ slotProps.data.order_amount | formatPriceUsd }}
        </template>
      </Column>
      <Column
        field="paid"
        header="Payment Received"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ slotProps.data.paid | formatPriceUsd }}
        </template>
      </Column>
      <Column
        field="balance"
        header="Balance"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ slotProps.data.balance | formatPriceUsd }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script>
import { FilterMatchMode } from "primevue/api";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getFinanceExpiryList"]),
  },
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

    maya: {
      type: Array,
      required: false,
    },
    status: {
      type: Boolean,
      required: false,
    },
    expiryTotal: {
      type: Number,
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
  created() {},
};
</script>
<style scoped>
@media screen and (max-width: 575px) {
  .row {
    clear: both;
    display: block;
    width: 90vw;
  }
  .col-3 {
    clear: both;
    display: block;
    width: 90vw;
  }
  .col-9 {
    clear: both;
    display: block;
    width: 90vw;
  }
}
</style>
