<template>
  <div class="row">
    <div :class="status ? 'col-9' : 'col'">
      <DataTable
        :value="allStatus ? allList : list"
        sortField="balanced"
        :sortOrder="-1"
        scrollable
        scrollHeight="650px"
        v-model:filters="filteredFinance"
        filterDisplay="row"
        @filter="financeFiltered($event)"
        v-model:selection="selectedFinanceList"
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
            {{ formatPriceUsd(slotProps.data.total_order_amount) }}
          </template>
          <template #footer>
            {{ formatPriceUsd(total.total) }}
          </template>
        </Column>
        <Column
          field="production"
          header="On Production"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ formatPriceUsd(slotProps.data.production) }}
          </template>
          <template #footer>
            {{ formatPriceUsd(total.production) }}
          </template>
        </Column>
        <Column
          field="forwarding"
          header="Shipped"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ formatPriceUsd(slotProps.data.forwarding) }}
          </template>
          <template #footer>
            {{ formatPriceUsd(total.forwarding) }}
          </template>
        </Column>
        <Column
          field="advanced_payment"
          header="Pre Payment"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ formatPriceUsd(slotProps.data.advanced_payment) }}
          </template>
          <template #footer>
            {{ formatPriceUsd(total.advanced) }}
          </template>
        </Column>
        <Column
          field="paid"
          header="Paid"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ formatPriceUsd(slotProps.data.paid) }}
          </template>
          <template #footer>
            {{ formatPriceUsd(total.paid) }}
          </template>
        </Column>
        <Column
          field="total"
          header="Balance (Including Production)"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ formatPriceUsd(slotProps.data.total) }}
          </template>
          <template #footer>
            {{ formatPriceUsd(total.balanceProduction) }}
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
              {{ formatPriceUsd(slotProps.data.balanced) }}
            </div>
          </template>
          <template #footer>
            {{ formatPriceUsd(total.balance) }}
          </template>
        </Column>
      </DataTable>
    </div>
    <div class="col-3" v-if="status">
      <DataTable
        :value="expiry"
        sortField="vade_tarih"
        :sortOrder="1"
        :scrollable="true"
        scrollHeight="650px"
        style="width: 100%"
      >
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
            {{ dateToString(slotProps.data.vade_tarih) }}
          </template>
        </Column>
        <Column
          field="tutar"
          header="Total"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ formatPriceUsd(slotProps.data.tutar) }}
          </template>
          <template #footer>
            {{ formatPriceUsd(expiryTotal) }}
          </template>
        </Column>
      </DataTable>
    </div>

    <!-- <DataTable :value="maya" v-if="status">
      <Column
        field="order_date"
        header="Order Date"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ dateToString(slotProps.data.order_date) }}
        </template>
      </Column>
      <Column
        field="forwarding_date"
        header="Shipment Date"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ dateToString(slotProps.data.forwarding_date) }}
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
          {{ formatPriceUsd(slotProps.data.order_amount) }}
        </template>
      </Column>
      <Column
        field="paid"
        header="Payment Received"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ formatPriceUsd(slotProps.data.paid) }}
        </template>
      </Column>
      <Column
        field="balance"
        header="Balance"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ formatPriceUsd(slotProps.data.balance) }}
        </template>
      </Column>
    </DataTable> -->
  </div>
</template>
<script>
import { useFinanceStore } from "~/stores/finance"
import { FilterMatchMode } from "@primevue/core/api";
export default {
  computed: {
    financeStore() {
      return useFinanceStore()
    },
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
      this.financeStore.setFinanceTotalList(event.filteredValue);
    },
  },
  /*
   * created() -> mounted(): created() SSR'da da calisir, icindeki async
   * is BEKLENMEZ ve liste BOS serialize edilir; hydration onu devralir,
   * created() bir daha calismadigi icin tablo bos kalir (bkz. commit
   * 2afc877e3). mounted() sunucuda hic calismaz.
   */
  mounted() {},
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
