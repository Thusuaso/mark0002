<template>
  <div>
    <div class="row mt-4">
      <div class="col">
        <div class="p-float-label">
          <Dropdown
            v-model="selectedYear"
            inputId="years"
            :options="years"
            optionLabel="Yil"
            class="w-full md:w-14rem"
            @change="yearChanged($event)"
          />
          <label for="years">Yıllar</label>
        </div>
      </div>
      <div class="col">
        <div class="p-float-label">
          <Dropdown
            v-model="selectedMonth"
            inputId="months"
            :options="months"
            optionLabel="Ay"
            class="w-full md:w-14rem"
            @change="monthChanged($event)"
          />
          <label for="months">Aylar</label>
        </div>
      </div>
    </div>
    <DataTable
      :value="list"
      :filters.sync="filteredCollection"
      filterDisplay="row"
      scrollable
      scrollHeight="450px"
      @filter="collectionFiltered($event)"
      :loading="loading"
    >
      <Column field="Tarih" header="Tarih" :showFilterMenu="false">
        <template #body="slotProps">
          {{ slotProps.data.Tarih | dateToString }}
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
      <Column field="FirmaAdi" header="Müşteri" :showFilterMenu="false">
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
      <Column field="Tutar" header="Tutar">
        <template #body="slotProps">
          {{ slotProps.data.Tutar | formatPriceUsd }}
        </template>
        <template #footer>
          {{ total | formatPriceUsd }}
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
    loading: {
      type: Boolean,
      required:false
    }
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
      this.$store.dispatch("setFinanceCollectionListMonth", data);
    },
    yearChanged(event) {
      this.$store.dispatch("setFinanceCollectionListYear", event.value.Yil);
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
