<template>
  <div class="row">
    <div>
      <div class=" flex flex-wrap justify-content-center gap-3">
        <div class="flex align-items-center">
          <Checkbox v-model="selectedMekmar" inputId="ingredient1" binary @change="changeMekmar($event)" />
          <label for="ingredient1" class="ml-2"> Mekmar </label>
        </div>

        <div class="flex align-items-center">
          <Checkbox v-model="selectedAll" inputId="ingredient1" binary @change="changeAll($event)" />
          <label for="ingredient1" class="ml-2"> All </label>
        </div>

      </div>

    </div>
    <div :class="status ? 'col-9':'col'">
      <DataTable :value="selectedMekmar ? mekmar:list" sortField="totalExceptProduction" :sortOrder="-1" scrollable
        scrollHeight="650px" :filters.sync="filteredFinance" filterDisplay="row" @filter="financeFiltered($event)"
        :selection.sync="selectedFinanceList" selectionMode="single"
        @row-click="$emit('finance_list_selected_mekmer_emit', $event)" :rowClass="marketing">
        <Column field="customer_name" header="Customer" :showFilterMenu="false" :showClearButton="false"
          headerClass="tableHeader" bodyClass="tableBody">
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
          </template>
        </Column>
        <Column field="total_order_amount" header="Total Order" headerClass="tableHeader" bodyClass="tableBody">
          <template #body="slotProps">
            {{ slotProps.data.total_order_amount | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.order | formatPriceUsd }}
          </template>
        </Column>
        <Column field="production" header="On Production" headerClass="tableHeader" bodyClass="tableBody">
          <template #body="slotProps">
            {{ slotProps.data.production | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.produced | formatPriceUsd }}
          </template>
        </Column>
        <Column field="forwarding" header="Shipped" headerClass="tableHeader" bodyClass="tableBody">
          <template #body="slotProps">
            {{ slotProps.data.forwarding | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.shipped | formatPriceUsd }}
          </template>
        </Column>

        <Column field="paid" header="Paid" headerClass="tableHeader" bodyClass="tableBody">
          <template #body="slotProps">
            {{ slotProps.data.paid | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.paid | formatPriceUsd }}
          </template>
        </Column>

        <Column field="total" header="Balance (Including Production)" headerClass="tableHeader" bodyClass="tableBody">
          <template #body="slotProps">
            {{ slotProps.data.total | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.balanced | formatPriceUsd }}
          </template>
        </Column>
        <Column field="totalExceptProduction" header="Balance (Except Production)" headerClass="tableHeader"
          bodyClass="tableBody">
          <template #body="slotProps">
            {{ slotProps.data.totalExceptProduction | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.balancedExceptProduction | formatPriceUsd }}
          </template>

        </Column>

      </DataTable>
    </div>
    <div class="col-3" v-if="status">
      <DataTable :value="expiry">
        <Column field="firmaAdi" header="Customer" headerClass="tableHeader" bodyClass="tableBody"></Column>
        <Column field="siparis_no" header="Po" headerClass="tableHeader" bodyClass="tableBody"></Column>
        <Column field="vade_tarih" header="Maturity" headerClass="tableHeader" bodyClass="tableBody">
          <template #body="slotProps">
            {{ slotProps.data.vade_tarih | dateToString }}
          </template>
        </Column>
        <Column field="tutar" header="Total" headerClass="tableHeader" bodyClass="tableBody">
          <template #body="slotProps">
            {{ slotProps.data.tutar | formatPriceUsd }}
          </template>
        </Column>
      </DataTable>
    </div>
    <DataTable :value="maya" v-if="status">
      <Column field="order_date" header="Order Date" headerClass="tableHeader" bodyClass="tableBody">
        <template #body="slotProps">
          {{ slotProps.data.order_date | dateToString }}
        </template>
      </Column>
      <Column field="forwarding_date" header="Shipment Date" headerClass="tableHeader" bodyClass="tableBody">
        <template #body="slotProps">
          {{ slotProps.data.forwarding_date | dateToString }}
        </template>
      </Column>
      <Column field="customer" header="Customer" headerClass="tableHeader" bodyClass="tableBody"></Column>
      <Column field="po" header="Po" headerClass="tableHeader" bodyClass="tableBody"></Column>
      <Column field="order_amount" header="Invoice" headerClass="tableHeader" bodyClass="tableBody">
        <template #body="slotProps">
          {{ slotProps.data.order_amount | formatPriceUsd }}
        </template>
      </Column>
      <Column field="paid" header="Payment Received" headerClass="tableHeader" bodyClass="tableBody">
        <template #body="slotProps">
          {{ slotProps.data.paid | formatPriceUsd }}
        </template>
      </Column>
      <Column field="balance" header="Balance" headerClass="tableHeader" bodyClass="tableBody">
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
      this.$store.dispatch('setBeginLoadingAction');
      if (this.selectedAll) {
        this.$store.dispatch('setFinanceAllListMekmer')
          .then(res => {
            if (res) {
              this.$store.dispatch('setEndLoadingAction');

            } else {
              this.$store.dispatch('setEndLoadingAction');

            };
          });
      } else {
        this.$store.dispatch("setFinanceListFilter");
      }
    },
    changeMekmar(event) {
      if (this.selectedMekmar) {
        this.mekmar = this.list.filter(x => {
          return x.marketing == 'Mekmar';
        });
        this.$store.dispatch('setFinanceTotalListMekmer', this.mekmar);

      } else {
        this.$store.dispatch('setFinanceTotalListMekmer', this.list);

      }
    },
    marketing(event) {
      if (event.marketing == 'Mekmar') {
        return 'row-accessories';
      }
    },
    financeFiltered(event) {
      this.$store.dispatch("setFinanceTotalListMekmer", event.filteredValue);
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
