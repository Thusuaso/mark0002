<template>
  <div>
    <DataTable
      :value="marketing"
      responsiveLayout="scroll"
      v-model:filters="filtersMarketing"
      filterDisplay="row"
      @filter="filteredMarketing($event)"
    >
      <Column
        field="marketing"
        header="Marketing"
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

      <Column field="toplam" header="Fob ($)"
      headerClass="tableHeader"
          bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ formatPriceUsd(slotProps.data.toplam) }}
        </template>
        <template #footer>
          {{ formatPriceUsd(marketingFob) }}
        </template>
      </Column>
      <Column field="toplamCfr" header="Ddp ($)"
      headerClass="tableHeader"
          bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ formatPriceUsd(slotProps.data.toplamCfr) }}
        </template>
        <template #footer>
          {{ formatPriceUsd(marketingDdp) }}
        </template>
      </Column>
    </DataTable>
    <br />
    <DataTable
      :value="customer"
      v-model:filters="filtersCustomer"
      filterDisplay="row"
      @filter="filteredCustomer($event)"
    >
      <Column
        field="musteriAdi"
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
        field="marketing"
        header="Marketing"
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
        field="ulkeAdi"
        header="Country"
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
      <Column field="toplam" header="Fob ($)"
      headerClass="tableHeader"
          bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ formatPriceUsd(slotProps.data.toplam) }}
        </template>
        <template #footer>
          {{ formatPriceUsd(customerFob) }}
        </template>
      </Column>
      <Column field="toplamCfr" header="Ddp ($)"
      headerClass="tableHeader"
          bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ formatPriceUsd(slotProps.data.toplamCfr) }}
        </template>
        <template #footer>
          {{ formatPriceUsd(customerDdp) }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script>
import { FilterMatchMode } from "@primevue/core/api";

export default {
  props: {
    customer: {},
    marketing: {},
  },
  data() {
    return {
      filtersMarketing: {
        marketing: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      marketingFob: 0,
      marketingDdp: 0,

      filtersCustomer: {
        musteriAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        marketing: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        ulkeAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      customerFob: 0,
      customerDdp: 0,
    };
  },
  methods: {
    filteredMarketing(event) {
      this.marketingFob = 0;
      this.marketingDdp = 0;
      event.filteredValue.forEach((x) => {
        this.marketingFob += x.toplam;
        this.marketingDdp += x.toplamCfr;
      });
    },
    filteredCustomer(event) {
      this.customerFob = 0;
      this.customerDdp = 0;
      event.filteredValue.forEach((x) => {
        this.customerFob += x.toplam;
        this.customerDdp += x.toplamCfr;
      });
    },
  },
  watch: {
    marketing() {
      this.marketingFob = 0;
      this.marketingDdp = 0;
      this.marketing.forEach((x) => {
        this.marketingFob += x.toplam;
        this.marketingDdp += x.toplamCfr;
      });
    },
    customer() {
      this.customerFob = 0;
      this.customerDdp = 0;
      this.customer.forEach((x) => {
        this.customerFob += x.toplam;
        this.customerDdp += x.toplamCfr;
      });
    },
  },
};
</script>
