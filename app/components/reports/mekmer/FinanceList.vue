<template>
  <div class="row">
    <div>
      <div class=" flex flex-wrap justify-content-center gap-3">


        <div class="flex align-items-center">
          <Checkbox v-model="selectedAll" inputId="ingredient1" binary @change="changeAll($event)" />
          <label for="ingredient1" class="ml-2"> All </label>
        </div>

      </div>

    </div>
    <div :class="status ? 'col-9':'col'">
      <DataTable :value="selectedMekmar ? mekmar:list" sortField="totalExceptProduction" :sortOrder="-1" scrollable
        scrollHeight="650px" v-model:filters="filteredFinance" filterDisplay="row" @filter="financeFiltered($event)"
        v-model:selection="selectedFinanceList" selectionMode="single"
        @row-click="$emit('finance_list_selected_mekmer_emit', $event)" :rowClass="marketing">
        <Column field="customer_name" header="Customer" :showFilterMenu="false" :showClearButton="false"
          headerClass="tableHeader" bodyClass="tableBody">
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
          </template>
        </Column>
        <Column field="total_order_amount" header="Total Order" headerClass="tableHeader" bodyClass="tableBody">
          <template #body="slotProps">
            {{ formatPriceUsd(slotProps.data.total_order_amount) }}
          </template>
          <template #footer>
            {{ formatPriceUsd(total.order) }}
          </template>
        </Column>
        <Column field="production" header="On Production" headerClass="tableHeader" bodyClass="tableBody">
          <template #body="slotProps">
            {{ formatPriceUsd(slotProps.data.production) }}
          </template>
          <template #footer>
            {{ formatPriceUsd(total.produced) }}
          </template>
        </Column>
        <Column field="forwarding" header="Shipped" headerClass="tableHeader" bodyClass="tableBody">
          <template #body="slotProps">
            {{ formatPriceUsd(slotProps.data.forwarding) }}
          </template>
          <template #footer>
            {{ formatPriceUsd(total.shipped) }}
          </template>
        </Column>

        <Column field="paid" header="Paid" headerClass="tableHeader" bodyClass="tableBody">
          <template #body="slotProps">
            {{ formatPriceUsd(slotProps.data.paid) }}
          </template>
          <template #footer>
            {{ formatPriceUsd(total.paid) }}
          </template>
        </Column>

        <Column field="total" header="Balance (Including Production)" headerClass="tableHeader" bodyClass="tableBody">
          <template #body="slotProps">
            {{ formatPriceUsd(slotProps.data.total) }}
          </template>
          <template #footer>
            {{ formatPriceUsd(total.balanced) }}
          </template>
        </Column>
        <Column field="totalExceptProduction" header="Balance (Except Production)" headerClass="tableHeader"
          bodyClass="tableBody">
          <template #body="slotProps">
            {{ formatPriceUsd(slotProps.data.totalExceptProduction) }}
          </template>
          <template #footer>
            {{ formatPriceUsd(total.balancedExceptProduction) }}
          </template>

        </Column>

      </DataTable>
    </div>
    <div class="col-12 col-lg-3" v-if="status">
      <DataTable :value="expiry">
        <Column field="firmaAdi" header="Customer" headerClass="tableHeader" bodyClass="tableBody"></Column>
        <Column field="siparis_no" header="Po" headerClass="tableHeader" bodyClass="tableBody"></Column>
        <Column field="vade_tarih" header="Maturity" headerClass="tableHeader" bodyClass="tableBody">
          <template #body="slotProps">
            {{ dateToString(slotProps.data.vade_tarih) }}
          </template>
        </Column>
        <Column field="tutar" header="Total" headerClass="tableHeader" bodyClass="tableBody">
          <template #body="slotProps">
            {{ formatPriceUsd(slotProps.data.tutar) }}
          </template>
        </Column>
      </DataTable>
    </div>
    <DataTable :value="maya" v-if="status">
      <Column field="order_date" header="Order Date" headerClass="tableHeader" bodyClass="tableBody">
        <template #body="slotProps">
          {{ dateToString(slotProps.data.order_date) }}
        </template>
      </Column>
      <Column field="forwarding_date" header="Shipment Date" headerClass="tableHeader" bodyClass="tableBody">
        <template #body="slotProps">
          {{ dateToString(slotProps.data.forwarding_date) }}
        </template>
      </Column>
      <Column field="customer" header="Customer" headerClass="tableHeader" bodyClass="tableBody"></Column>
      <Column field="po" header="Po" headerClass="tableHeader" bodyClass="tableBody"></Column>
      <Column field="order_amount" header="Invoice" headerClass="tableHeader" bodyClass="tableBody">
        <template #body="slotProps">
          {{ formatPriceUsd(slotProps.data.order_amount) }}
        </template>
      </Column>
      <Column field="paid" header="Payment Received" headerClass="tableHeader" bodyClass="tableBody">
        <template #body="slotProps">
          {{ formatPriceUsd(slotProps.data.paid) }}
        </template>
      </Column>
      <Column field="balance" header="Balance" headerClass="tableHeader" bodyClass="tableBody">
        <template #body="slotProps">
          {{ formatPriceUsd(slotProps.data.balance) }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script>
import { useFinanceStore } from "~/stores/finance"
import { useSharedStore } from "~/stores/shared"
import { FilterMatchMode } from "@primevue/core/api";
export default {
  computed: {
    sharedStore() {
      return useSharedStore()
    },
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
    status:{
      type:Boolean,
      required:false
    }
  },
  data() {
    return {
      selectedAll:false,
      filteredFinance: {
        customer_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      selectedFinanceList: null,
      selectedMekmar:false,
      mekmar:[]
    };
  },
  methods: {
    changeAll(event) {
      this.sharedStore.beginLoading();
      if (this.selectedAll) {
        this.financeStore
          .setFinanceAllListMekmer()
          .catch((err) => {
            console.error("changeAll basarisiz:", err);
          })
          /*
           * Iki dalda da AYNI sey yapiliyordu (endLoading), istek
           * patlarsa HICBIRI calismiyordu -- yukleme katmani tum
           * tiklamalari yakaladigi icin ekran kilitli kaliyordu.
           */
          .finally(() => {
            this.sharedStore.endLoading();
          });
      } else {
        this.financeStore.setFinanceListFilter();
        /* ELSE DALINDA HIC KAPANMIYORDU: beginLoading yukarida kosulsuz
           cagriliyor, bu dalda endLoading yoktu. */
        this.sharedStore.endLoading();
      }
    },
    changeMekmar(event) {
      if (this.selectedMekmar) {
        this.mekmar = this.list.filter(x => {
          return x.marketing == 'Mekmar';
        });
        this.financeStore.setFinanceTotalListMekmer(this.mekmar);

      } else {
        this.financeStore.setFinanceTotalListMekmer(this.list);

      }
    },
    marketing(event) {
      if (event.marketing == 'Mekmar') {
        return 'row-accessories';
      }
    },
    financeFiltered(event) {
      this.financeStore.setFinanceTotalListMekmer(event.filteredValue);
    },
  },
};
</script>
<style scoped>
@media screen and (max-width:575px) {
  .row{
clear:both;
display:block;
width:90vw;
}
.col-3{
  clear:both;
  display:block;
  width:90vw;
}
.col-9{
  clear:both;
  display:block;
  width:90vw;
}
}
:deep(.row-accessories) {
  background-color: #ccede2 !important;
}
</style>
