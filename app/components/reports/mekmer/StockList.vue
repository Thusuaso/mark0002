<template>
  <div>
    <DataTable
      :value="list"
      scrollable
      scrollHeight="650px"
      :filters="filters1" @update:filters="filters1 = $event"
      filterDisplay="row"
      @filter="reportsMekmerStockFilter($event)"
      :selection="selectedReportsMekmerStockList"
      selectionMode="single"
      @row-click="$emit('reports_mekmer_stock_list_selected_emit', $event)"
      class="p-datatable-sm"
      style="font-size: 90%"
    >
      <Column
        field="En"
        header="Width"
        :showFilterMenu="false"
        sortable
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
        field="Boy"
        header="Height"
        :showFilterMenu="false"
        sortable
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
        field="Kenar"
        header="Thickness"
        :showFilterMenu="false"
        sortable
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
        field="KategoriAdi"
        header="Category"
        :showFilterMenu="false"
        sortable
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
        field="UrunAdi"
        header="Product"
        :showFilterMenu="false"
        sortable
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
        field="YuzeyIslemAdi"
        header="Surface"
        :showFilterMenu="false"
        sortable
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
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
      <Column
        field="Toplam"
        header="Amount"
        :showFilterMenu="false"
        sortable
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ formatDecimal(slotProps.data.Toplam) }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
        <template #footer>
          {{ formatDecimal(total.amount) }}
        </template>
      </Column>
      <Column
        field="KasaSayisi"
        header="Crate Amount"
        :showFilterMenu="false"
        sortable
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ formatDecimal(slotProps.data.KasaSayisi) }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
        <template #footer>
          {{ formatDecimal(total.crate) }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script>
import { FilterMatchMode } from "@primevue/core/api"
import { useReportsStore } from "~/stores/reports"
export default {
  emits: ["reports_mekmer_stock_list_selected_emit"],

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
      this.reportsStore.setReportsMekmerStockListTotal(event.filteredValue);
    },
  },
};
</script>

<!--
  components/reports/mekmer/stock/list.vue -> ReportsMekmerStockList

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] "primevue/api" -> "@primevue/core/api"
      PrimeVue 4'te eski yol yok; FilterMatchMode undefined kalirsa 8
      kolonun matchMode'u da undefined olur ve filtreler sessizce
      calismaz.

  [x] this.$store.dispatch("setReportsMekmerStockListTotal", ...)
         -> this.reportsStore.setReportsMekmerStockListTotal(...)
      Vuex yok; eylem artik app/stores/reports.ts icinde.

  [x] emits: ["reports_mekmer_stock_list_selected_emit"] EKLENDI.
      Sablon bu olayi $emit ile atiyordu ama bilesen hic bildirmiyordu.
      Vue 3'te bildirilmeyen olay, kok ogeye DOM dinleyicisi olarak da
      gecirilmeye calisilir (attribute fallthrough); bildirmek bunu
      engeller ve sozlesmeyi aciga cikarir.

  DOKUNULMADI ama DIKKAT -- NUXT 2'DEN GELEN TUHAFLIK:
      :selection="selectedReportsMekmerStockList" TEK YONLU: eslik eden
      bir @update:selection YOK (atlanta/list.vue'de VAR). Yani
      selectionMode="single" olmasina ragmen secilen satir hic
      vurgulanmiyor -- `selectedReportsMekmerStockList` daima null
      kaliyor. Diyalogu acan sey selection degil, ayri duran
      @row-click. Nuxt 2'deki davranis bu; birebir korundu.
      Duzeltmek (iki yonlu baglamak) gorunumu degistirir.
-->
