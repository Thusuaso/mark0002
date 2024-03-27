<template>
  <div>
    <DataTable
      :value="marketing"
      responsiveLayout="scroll"
      :filters.sync="filtersMarketing"
      filterDisplay="row"
      @filter="filteredMarketing($event)"
      :loading="loading"
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
          {{ slotProps.data.toplam | formatPriceUsd }}
        </template>
        <template #footer>
          {{ marketingFob | formatPriceUsd }}
        </template>
      </Column>
      <Column field="toplamCfr" header="Ddp ($)"
      headerClass="tableHeader"
          bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ slotProps.data.toplamCfr | formatPriceUsd }}
        </template>
        <template #footer>
          {{ marketingDdp | formatPriceUsd }}
        </template>
      </Column>
    </DataTable>
    <br />
    <DataTable
      :value="customer"
      :filters.sync="filtersCustomer"
      filterDisplay="row"
      @filter="filteredCustomer($event)"
      :loading="loading"
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
          {{ slotProps.data.toplam | formatPriceUsd }}
        </template>
        <template #footer>
          {{ customerFob | formatPriceUsd }}
        </template>
      </Column>
      <Column field="toplamCfr" header="Ddp ($)"
      headerClass="tableHeader"
          bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ slotProps.data.toplamCfr | formatPriceUsd }}
        </template>
        <template #footer>
          {{ customerDdp | formatPriceUsd }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script>
import { FilterMatchMode } from "primevue/api";

export default {
  props: {
    customer: {},
    marketing: {},
    loading:{}
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
