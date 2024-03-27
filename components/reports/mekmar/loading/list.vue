<template>
  <div class="row">
    <div class="col">
      <DataTable
        :value="list"
        responsiveLayout="scroll"
        sortField="Dtp"
        :sortOrder="-1"
        :loading="loading"
        :scrollable="true"
        scrollHeight="550px"
        :filters.sync="filtersLoadingMonthly"
        filterDisplay="row"
        @filter="monthlyLoadingFilter($event)"
      >
        <Column
          field="YuklemeTarihi"
          header="Shipment Date"
          :showFilterMenu="false"
          :showClearButton="false"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ slotProps.data.YuklemeTarihi | dateToString }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              class="p-column-filter"
              style="width: 80px"
            />
          </template>
        </Column>
        <Column
          field="MusteriAdi"
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
              style="width: 80px"
            />
          </template>
        </Column>
        <Column
          field="SiparisNo"
          header="Po"
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
              style="width: 80px"
            />
          </template>
        </Column>
        <Column field="Fob" header="Fob" headerClass="tableHeader" bodyClass="tableBody">
          <template #body="slotProps">
            {{ slotProps.data.Fob | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.fob | formatPriceUsd }}
          </template>
        </Column>
        <Column field="Dtp" header="Ddp" headerClass="tableHeader" bodyClass="tableBody">
          <template #body="slotProps">
            {{ slotProps.data.Dtp | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.ddp | formatPriceUsd }}
          </template>
        </Column>
      </DataTable>
    </div>
    <div class="col">
      <DataTable
        :value="yearly"
        responsiveLayout="scroll"
        sortField="Dtp"
        :sortOrder="-1"
        :loading="loading"
        :scrollable="true"
        scrollHeight="550px"
        :filters.sync="filtersLoadingYearly"
        filterDisplay="row"
        @filter="yearlyLoadingFilter($event)"
      >
        <Column
          field="MusteriAdi"
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
              style="width: 80px"
            />
          </template>
        </Column>
        <Column
          field="SiparisNo"
          header="Po"
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
              style="width: 80px"
            />
          </template>
        </Column>
        <Column field="Fob" header="Fob" headerClass="tableHeader" bodyClass="tableBody">
          <template #body="slotProps">
            {{ slotProps.data.Fob | formatPriceUsd }}
          </template>
          <template #footer>
            {{ yearlyTotal.fob | formatPriceUsd }}
          </template>
        </Column>
        <Column field="Dtp" header="Ddp" headerClass="tableHeader" bodyClass="tableBody">
          <template #body="slotProps">
            {{ slotProps.data.Dtp | formatPriceUsd }}
          </template>
          <template #footer>
            {{ yearlyTotal.ddp | formatPriceUsd }}
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
    yearly: {
      type: Array,
      required: false,
    },
    yearlyTotal: {
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
      filtersLoadingMonthly: {
        YuklemeTarihi: { value: null, matchMode: FilterMatchMode.STARTSWITH },
        MusteriAdi: { value: null, matchMode: FilterMatchMode.STARTSWITH },
        SiparisNo: { value: null, matchMode: FilterMatchMode.STARTSWITH },
      },
      filtersLoadingYearly: {
        MusteriAdi: { value: null, matchMode: FilterMatchMode.STARTSWITH },
        SiparisNo: { value: null, matchMode: FilterMatchMode.STARTSWITH },
      },
    };
  },
  methods: {
    monthlyLoadingFilter(event) {
      this.$store.dispatch("setReportsMekmarLoadingListTotal", event.filteredValue);
    },
    yearlyLoadingFilter(event) {
      this.$store.dispatch("setReportsMekmarLoadingListYear", event.filteredValue);
    },
  },
};
</script>
