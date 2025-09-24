<template>
  <div class="row">
    <div class="col-3">
      <DataTable
        :value="country_data.data_1"
        scrollable
        scrollHeight="450px"
        :filters.sync="filter_1"
        filterDisplay="row"
      >
        <template #header>
          <div style="margin: 0px auto; text-align: center">{{ date }}</div>
        </template>
        <Column
          field="UlkeAdi"
          header="Country"
          :showFilterMenu="false"
          :showClearButton="false"
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
        <Column field="Count" header="Count">
          <template #footer>
            {{ data_1_total }}
          </template>
        </Column>
        <Column header="%">
          <template #body="slotProps">
            {{ ((slotProps.data.Count / data_1_total) * 100).toFixed(2) }}%
          </template>
        </Column>
      </DataTable>
    </div>
    <div class="col-3">
      <DataTable
        :value="country_data.data_2"
        scrollable
        scrollHeight="450px"
        :filters.sync="filter_2"
        filterDisplay="row"
      >
        <template #header>
          <div style="margin: 0px auto; text-align: center">{{ date - 1 }}</div>
        </template>
        <Column
          field="UlkeAdi"
          header="Country"
          :showFilterMenu="false"
          :showClearButton="false"
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
        <Column field="Count" header="Count">
          <template #footer>
            {{ data_2_total }}
          </template>
        </Column>
        <Column header="%">
          <template #body="slotProps">
            {{ ((slotProps.data.Count / data_2_total) * 100).toFixed(2) }}%
          </template>
        </Column>
      </DataTable>
    </div>
    <div class="col-3">
      <DataTable
        :value="country_data.data_3"
        scrollable
        scrollHeight="450px"
        :filters.sync="filter_3"
        filterDisplay="row"
      >
        <template #header>
          <div style="margin: 0px auto; text-align: center">{{ date - 2 }}</div>
        </template>
        <Column
          field="UlkeAdi"
          header="Country"
          :showFilterMenu="false"
          :showClearButton="false"
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
        <Column field="Count" header="Count">
          <template #footer>
            {{ data_3_total }}
          </template>
        </Column>
        <Column header="%">
          <template #body="slotProps">
            {{ ((slotProps.data.Count / data_3_total) * 100).toFixed(2) }}%
          </template>
        </Column>
      </DataTable>
    </div>
    <div class="col-3">
      <DataTable
        :value="country_data.data_4"
        scrollable
        scrollHeight="450px"
        :filters.sync="filter_4"
        filterDisplay="row"
      >
        <template #header>
          <div style="margin: 0px auto; text-align: center">{{ date - 3 }}</div>
        </template>
        <Column
          field="UlkeAdi"
          header="Country"
          :showFilterMenu="false"
          :showClearButton="false"
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
        <Column field="Count" header="Count">
          <template #footer>
            {{ data_4_total }}
          </template>
        </Column>
        <Column header="%">
          <template #body="slotProps">
            {{ ((slotProps.data.Count / data_4_total) * 100).toFixed(2) }}%
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script>
import { FilterMatchMode } from "primevue/api";
export default {
  data() {
    return {
      country_data: [],
      data_1_total: 0,
      data_2_total: 0,
      data_3_total: 0,
      data_4_total: 0,
      date: new Date().getFullYear(),
      filter_1: {
        UlkeAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      filter_2: {
        UlkeAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      filter_3: {
        UlkeAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      filter_4: {
        UlkeAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
    };
  },
  created() {
    this.$axios.get("mekmar/reports/offer/country").then((res) => {
      this.country_data = res.data;
      res.data.data_1.forEach((item) => {
        this.data_1_total += item.Count;
      });
      res.data.data_2.forEach((item) => {
        this.data_2_total += item.Count;
      });
      res.data.data_3.forEach((item) => {
        this.data_3_total += item.Count;
      });
      res.data.data_4.forEach((item) => {
        this.data_4_total += item.Count;
      });
    });
  },
  methods: {
    // filter_1_event(event) {
    //   (this.data_1_total = 0),
    //     event.filteredValue.forEach((x) => {
    //       this.data_1_total += x.Count;
    //     });
    // },
    // filter_2_event(event) {
    //   (this.data_2_total = 0),
    //     event.filteredValue.forEach((x) => {
    //       this.data_2_total += x.Count;
    //     });
    // },
    // filter_3_event(event) {
    //   (this.data_3_total = 0),
    //     event.filteredValue.forEach((x) => {
    //       this.data_3_total += x.Count;
    //     });
    // },
    // filter_4_event(event) {
    //   (this.data_4_total = 0),
    //     event.filteredValue.forEach((x) => {
    //       this.data_4_total += x.Count;
    //     });
    // },
  },
};
</script>
