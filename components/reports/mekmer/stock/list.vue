<template>
  <div>
    <DataTable
      :value="list"
      scrollable
      scrollHeight="650px"
      :filters.sync="filters1"
      filterDisplay="row"
      @filter="reportsMekmerStockFilter($event)"
      :selection="selectedReportsMekmerStockList"
      selectionMode="single"
      @row-click="$emit('reports_mekmer_stock_list_selected_emit', $event)"
      :loading="loading"
      class="p-datatable-sm"
      style="font-size: 90%"
    >
      <Column field="En" header="Width" :showFilterMenu="false" sortable :showClearButton="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="Boy" header="Height" :showFilterMenu="false" sortable :showClearButton="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="Kenar" header="Edge" :showFilterMenu="false" sortable :showClearButton="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="KategoriAdi" header="Category" :showFilterMenu="false" sortable :showClearButton="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="UrunAdi" header="Product" :showFilterMenu="false" sortable :showClearButton="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="YuzeyIslemAdi" header="Surface" :showFilterMenu="false" sortable :showClearButton="false">
        <template #body="slotProps">
          <div style="word-break: break-word">
            {{ slotProps.data.YuzeyIslemAdi }}
          </div>
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
      <Column field="Toplam" header="Amount" :showFilterMenu="false" sortable :showClearButton="false">
        <template #body="slotProps">
          {{ slotProps.data.Toplam | formatDecimal }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
        <template #footer>
          {{ total.amount | formatDecimal }}
        </template>
      </Column>
      <Column field="KasaSayisi" header="Crate Amount" :showFilterMenu="false" sortable :showClearButton="false">
        <template #body="slotProps">
          {{ slotProps.data.KasaSayisi | formatDecimal }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
        <template #footer>
          {{ total.crate | formatDecimal }}
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
    total: {
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
      selectedReportsMekmerStockList: null,
      filters1: {
        En: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Boy: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Kenar: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        KategoriAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        UrunAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        YuzeyIslemAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Toplam: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        KasaSayisi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },

      },
    };
  },
  methods: {
    reportsMekmerStockFilter(event) {
      this.$store.dispatch("setReportsMekmerStockListTotal", event.filteredValue);
    },
  },
};
</script>
