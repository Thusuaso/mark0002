<template>
  <div>
    <DataTable
      :value="list"
      :filters.sync="filterYearByPoOrders"
      filterDisplay="row"
      scrollable
      scrollHeight="600px"
      :loading="loading"
    >
      <Column field="SiparisTarihi" header="Order Date" :showFilterMenu="false">
        <template #body="slotProps">
          {{ slotProps.data.SiparisTarihi | dateToString }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="FirmaAdi" header="Customer" :showFilterMenu="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="SiparisNo" header="Po" :showFilterMenu="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>

      <Column field="TeslimTur" header="Kind of Delivery"></Column>
      <Column field="Fob" header="Fob">
        <template #body="slotProps">
          {{ slotProps.data.Fob | formatPriceUsd }}
        </template>
        <template #footer>
          {{ total.fob | formatPriceUsd }}
        </template>
      </Column>
      <Column field="Ddp" header="Ddp">
        <template #body="slotProps">
          {{ slotProps.data.Ddp | formatPriceUsd }}
        </template>
        <template #footer>
          {{ total.ddp | formatPriceUsd }}
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
    loading: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      filterYearByPoOrders: {
        SiparisTarihi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        FirmaAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        SiparisNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
    };
  },
};
</script>
