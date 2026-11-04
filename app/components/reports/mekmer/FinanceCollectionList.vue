<template>
  <div>
    <div class="row mt-4">
      <div class="col">
        <FloatLabel>
          <Select
            v-model="selectedYear"
            inputId="years"
            :options="years"
            optionLabel="Yil"
            class="w-full md:w-14rem"
            @change="yearChanged($event)"
          />
          <label for="years">Years</label>
        </FloatLabel>
      </div>
      <div class="col">
        <FloatLabel>
          <Select
            v-model="selectedMonth"
            inputId="months"
            :options="months"
            optionLabel="Ay"
            class="w-full md:w-14rem"
            @change="monthChanged($event)"
          />
          <label for="months">Months</label>
        </FloatLabel>
      </div>
    </div>
    <DataTable
      :value="list"
      v-model:filters="filteredCollection"
      filterDisplay="row"
      scrollable
      scrollHeight="450px"
      @filter="collectionFiltered($event)"
    >
      <Column
        field="Tarih"
        header="Date"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ dateToString(slotProps.data.Tarih) }}
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
      <Column
        field="FirmaAdi"
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
          />
        </template>
      </Column>
      <Column
        field="Tutar"
        header="Paid Amount"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ formatPriceUsd(slotProps.data.Tutar) }}
        </template>
        <template #footer>
          {{ formatPriceUsd(total) }}
        </template>
      </Column>
    </DataTable>
    <br />
    <DataTable :value="sample" >
      <Column field="Tarih" header="Date" headerClass="tableHeader" bodyClass="tableBody">
        <template #body="slotProps">
          {{ dateToString(slotProps.data.Tarih) }}
        </template>
      </Column>
      <Column
        field="MusteriAdi"
        header="Customer"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
      </Column>
      <Column
        field="NumuneNo"
        header="Sample No"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
      </Column>
      <Column field="Banka" header="Bank" headerClass="tableHeader" bodyClass="tableBody">
      </Column>

      <Column
        field="Tutar"
        header="Paid Amount"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ formatPriceUsd(slotProps.data.Tutar) }}
        </template>
        <template #footer>
          {{ formatPriceUsd(sampleTotal) }}
        </template>
      </Column>
    </DataTable>
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
    years: {
      type: Array,
      required: false,
    },
    months: {
      type: Array,
      required: false,
    },
    total: {
      type: Number,
      required: false,
    },

    sample: {
      type: Array,
      required: false,
    },
    sampleTotal: {
      type: Number,
      required: false,
    },
  },
  data() {
    return {
      selectedYear: null,
      selectedMonth: null,
      filteredCollection: {
        Tarih: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        FirmaAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        SiparisNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
    };
  },
  methods: {
    collectionFiltered(event) {},
    monthChanged(event) {
      const data = {
        month: event.value.Ay,
        year: this.selectedYear.Yil,
      };
      this.financeStore.setFinanceCollectionListMekmerMonth(data);
    },
    yearChanged(event) {
      this.financeStore.setFinanceCollectionListMekmerYear(event.value.Yil);
    },
  },
  watch: {
    years() {
      this.selectedYear = this.years[0];
    },
    months() {
      this.selectedMonth = this.months[0];
    },
  },
};
</script>
<style scoped>
@media screen and (max-width:576px) {
  .row{
    clear:both;
    display:block;
    width:100%;
  }
  .col{
    clear:both;
    display:block;
    width:100%;
  }
}
</style>
