<template>
  <div>
    <DataTable
      :value="list"
      responsiveLayout="scroll"
      v-model:filters="filters"
      filterDisplay="row"
      @filter="filtered($event)"
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
          {{ dateToString(slotProps.data.tarih) }}
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
          {{ formatPriceUsd(slotProps.data.fob) }}
        </template>
        <template #footer>
          {{ formatPriceUsd(fob) }}
        </template>
      </Column>
      <Column
        field="ddp"
        header="Ddp ($)"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ formatPriceUsd(slotProps.data.ddp) }}
        </template>
        <template #footer>
          {{ formatPriceUsd(ddp) }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script>
import { FilterMatchMode } from "@primevue/core/api";
export default {
  props: {
    list: {
      type: Object,
      required: false,
    },
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
