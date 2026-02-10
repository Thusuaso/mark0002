<template>
  <div>
    <DataTable
      :value="list"
      scrollable
      scrollHeight="400px"
      :selection.sync="selectedOfferDetailListForm"
      selectionMode="single"
      @row-click="$emit('offer_detail_list_form_selected_emit', $event.data)"
      :rowClass="offerClass"
      :filters.sync="orderFilters"
      filterDisplay="row"
      @filter="aListFiltered($event)"
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
      <Column
        field="Sira"
        header="Queue"
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
          />
        </template>
      </Column>
      <Column
        field="UlkeAdi"
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
      <Column
        field="KullaniciAdi"
        header="Representative"
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
        <template #footer>
          {{ aListTotal }}
        </template>
      </Column>
      <Column
        field="TeklifOncelik"
        header="Priority"
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
    </DataTable>
    <DataTable
      :value="bList"
      scrollable
      scrollHeight="400px"
      :selection.sync="selectedOfferDetailListForm"
      selectionMode="single"
      @row-click="$emit('offer_detail_list_form_selected_emit', $event.data)"
      :rowClass="offerClass"
      :filters.sync="orderFiltersB"
      filterDisplay="row"
      @filter="bListFiltered($event)"
    >
      <template #header>
        <h3 class="header">B List</h3>
      </template>
      <Column
        field="Tarih"
        header="Tarih"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
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
      <Column
        field="Sira"
        header="Queue"
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
          />
        </template>
      </Column>
      <Column
        field="UlkeAdi"
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
      <Column
        field="KullaniciAdi"
        header="Representative"
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
        <template #footer>
          {{ bListTotal }}
        </template>
      </Column>
      <Column
        field="TeklifOncelik"
        header="Priority"
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
    bList: {
      type: Array,
      required: false,
    },
    aListTotal: {
      type: Number,
      required: false,
    },
    bListTotal: {
      type: Number,
      required: false,
    },
  },
  data() {
    return {
      selectedOfferDetailListForm: null,
      orderFilters: {
        Tarih: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Sira: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        MusteriAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        UlkeAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        KullaniciAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        TeklifOncelik: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      orderFiltersB: {
        Tarih: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Sira: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        MusteriAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        UlkeAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        KullaniciAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        TeklifOncelik: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
    };
  },
  methods: {
    bListFiltered(event) {
      this.$store.dispatch("setOfferBListTotal", event.filteredValue);
    },
    aListFiltered(event) {
      this.$store.dispatch("setOfferAListTotal", event.filteredValue);
    },
    offerClass(event) {
      return event.TeklifOncelik == "Toplantı" ? "yellow" : "";
    },
  },
};
</script>
<style scoped>
:deep(.yellow) {
  background-color: rgb(242, 255, 0) !important;
  border: 1px solid gray;
}
</style>
