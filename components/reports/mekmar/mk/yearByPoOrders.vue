<template>
  <div>
    <DataTable
      :value="list"
      responsiveLayout="scroll"
      :filters.sync="filters"
      filterDisplay="row"
      @filter="filtered($event)"
      :loading="loading"
    >
      <Column
        field="tarih"
        header="Date"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ slotProps.data.tarih | dateToString }}
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
        field="firma"
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
        field="po"
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
        field="teslim"
        header="Delivery Term."
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
        field="fob"
        header="Fob ($)"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ slotProps.data.fob | formatPriceUsd }}
        </template>
        <template #footer>
          {{ fob | formatPriceUsd }}
        </template>
      </Column>
      <Column
        field="ddp"
        header="Ddp ($)"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ slotProps.data.ddp | formatPriceUsd }}
        </template>
        <template #footer>
          {{ ddp | formatPriceUsd }}
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
      type: Object,
      required: false,
    },
    loading: {},
  },
  data() {
    return {
      filters: {
        tarih: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        firma: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        po: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        teslim: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      fob: 0,
      ddp: 0,
    };
  },
  methods: {
    filtered(event) {
      this.fob = 0;
      this.ddp = 0;
      event.filteredValue.forEach((x) => {
        this.fob += x.fob;
        this.ddp += x.ddp;
      });
    },
  },
  mounted() {},
  watch: {
    list() {
      this.fob = 0;
      this.ddp = 0;
      this.list.forEach((x) => {
        this.fob += x.fob;
        this.ddp += x.ddp;
      });
    },
  },
};
</script>
