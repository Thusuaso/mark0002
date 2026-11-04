<template>
  <div class="row">
    <div class="col">
      <DataTable
        :value="list"
        responsiveLayout="scroll"
        sortField="Dtp"
        :sortOrder="-1"
        :scrollable="true"
        scrollHeight="550px"
        v-model:filters="filtersLoadingMonthly"
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
            {{ dateToString(slotProps.data.YuklemeTarihi) }}
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
            {{ formatPriceUsd(slotProps.data.Fob) }}
          </template>
          <template #footer>
            {{ formatPriceUsd(total.fob) }}
          </template>
        </Column>
        <Column field="Dtp" header="Ddp" headerClass="tableHeader" bodyClass="tableBody">
          <template #body="slotProps">
            {{ formatPriceUsd(slotProps.data.Dtp) }}
          </template>
          <template #footer>
            {{ formatPriceUsd(total.ddp) }}
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
        :scrollable="true"
        scrollHeight="550px"
        v-model:filters="filtersLoadingYearly"
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
            {{ formatPriceUsd(slotProps.data.Fob) }}
          </template>
          <template #footer>
            {{ formatPriceUsd(yearlyTotal.fob) }}
          </template>
        </Column>
        <Column field="Dtp" header="Ddp" headerClass="tableHeader" bodyClass="tableBody">
          <template #body="slotProps">
            {{ formatPriceUsd(slotProps.data.Dtp) }}
          </template>
          <template #footer>
            {{ formatPriceUsd(yearlyTotal.ddp) }}
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>
<script>
import { useReportsStore } from "~/stores/reports"
import { FilterMatchMode } from "@primevue/core/api";
export default {
  computed: {
    reportsStore() {
      return useReportsStore()
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
    yearly: {
      type: Array,
      required: false,
    },
    yearlyTotal: {
      type: Object,
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
      this.reportsStore.setReportsMekmarLoadingListTotal(event.filteredValue);
    },
    yearlyLoadingFilter(event) {
      this.reportsStore.setReportsMekmarLoadingListYear(event.filteredValue);
    },
  },
};
</script>
