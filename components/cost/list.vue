<template>
  <div>
    <DataTable
      :value="getMekmarCostList"
      rowGroupMode="rowspan"
      :groupRowsBy="[
        'Po',
        'FirmaAdi',
        'Freight',
        'Logistic',
        'Custom',
        'Fumigation',
        'Port',
        'Insurance',
        'Lashing',
        'Spanzlet',
        'Invoice',
      ]"
      :selection.sync="selectedCost"
      selectionMode="multiple"
      class="p-datatable-sm"
      filterDisplay="row"
      :filters.sync="filtersCost"
      columnResizeMode="fit"
      showGridlines
      responsiveLayout="scroll"
      @row-click="costSelected($event)"
    >
      <Column header="#" headerStyle="width:3rem">
        <template #body="slotProps">
          {{ slotProps.index + 1 }}
        </template>
      </Column>
      <Column
        field="Po"
        header="Po"
        :showFilterMenu="false"
        :showClearButton="false"
        style="width: 3%"
      >
        <template #body="slotProps">
          {{ slotProps.data.Po }}
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
        field="Freight"
        header="Freight"
        :showFilterMenu="false"
        :showClearButton="false"
        style="width: 3%"
      >
        <template #body="slotProps">
          <div v-if="slotProps.data.Freight">
            <i class="pi pi-check"></i>
          </div>
          <div v-else>
            <i class="pi pi-times"></i>
          </div>
        </template>
      </Column>
      <Column
        field="Logistic"
        header="Logistic"
        :showFilterMenu="false"
        :showClearButton="false"
        style="width: 3%"
      >
        <template #body="slotProps">
          <div v-if="slotProps.data.Logistic">
            <i class="pi pi-check"></i>
          </div>
          <div v-else>
            <i class="pi pi-times"></i>
          </div>
        </template>
      </Column>
      <Column
        field="Custom"
        header="Custom"
        :showFilterMenu="false"
        :showClearButton="false"
        style="width: 3%"
      >
        <template #body="slotProps">
          <div v-if="slotProps.data.Custom">
            <i class="pi pi-check"></i>
          </div>
          <div v-else>
            <i class="pi pi-times"></i>
          </div>
        </template>
      </Column>
      <Column
        field="Fumigation"
        header="Fumigation"
        :showFilterMenu="false"
        :showClearButton="false"
        style="width: 3%"
      >
        <template #body="slotProps">
          <div v-if="slotProps.data.Fumigation">
            <i class="pi pi-check"></i>
          </div>
          <div v-else>
            <i class="pi pi-times"></i>
          </div>
        </template>
      </Column>
      <Column
        field="Port"
        header="Port"
        :showFilterMenu="false"
        :showClearButton="false"
        style="width: 3%"
      >
        <template #body="slotProps">
          <div v-if="slotProps.data.Port">
            <i class="pi pi-check"></i>
          </div>
          <div v-else>
            <i class="pi pi-times"></i>
          </div>
        </template>
      </Column>
      <Column
        field="Insurance"
        header="Insurance"
        :showFilterMenu="false"
        :showClearButton="false"
        style="width: 3%"
      >
        <template #body="slotProps">
          <div v-if="slotProps.data.Insurance">
            <i class="pi pi-check"></i>
          </div>
          <div v-else>
            <i class="pi pi-times"></i>
          </div>
        </template>
      </Column>
      <Column
        field="Lashing"
        header="Lashing"
        :showFilterMenu="false"
        :showClearButton="false"
        style="width: 3%"
      >
        <template #body="slotProps">
          <div v-if="slotProps.data.Lashing">
            <i class="pi pi-check"></i>
          </div>
          <div v-else>
            <i class="pi pi-times"></i>
          </div>
        </template>
      </Column>
      <Column
        field="Spanzlet"
        header="Spanzlet"
        :showFilterMenu="false"
        :showClearButton="false"
        style="width: 3%"
      >
        <template #body="slotProps">
          <div v-if="slotProps.data.Spanzlet">
            <i class="pi pi-check"></i>
          </div>
          <div v-else>
            <i class="pi pi-times"></i>
          </div>
        </template>
      </Column>
      <Column
        field="Spanzlet"
        header="Spanzlet"
        :showFilterMenu="false"
        :showClearButton="false"
        style="width: 3%"
      >
        <template #body="slotProps">
          <div v-if="slotProps.data.Spanzlet">
            <i class="pi pi-check"></i>
          </div>
          <div v-else>
            <i class="pi pi-times"></i>
          </div>
        </template>
      </Column>
      <Column
        field="FirmaAdi"
        header="SupplierName"
        :showFilterMenu="false"
        :showClearButton="false"
        style="width: 3%"
      >
        <template #body="slotProps">
          {{ slotProps.data.FirmaAdi }}
        </template>
      </Column>
      <Column
        field="Invoice"
        header="Invoice"
        :showFilterMenu="false"
        :showClearButton="false"
        style="width: 3%"
      >
        <template #body="slotProps">
          <div v-if="slotProps.data.Invoice">
            <i class="pi pi-check"></i>
          </div>
          <div v-else>
            <i class="pi pi-times"></i>
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import { ref } from "vue";
import { mapGetters } from "vuex";
import { FilterMatchMode } from "primevue/api";

export default {
  computed: {
    ...mapGetters(["getMekmarCostList"]),
  },
  data() {
    return {
      expandedRowGroups: ref(),
      filtersCost: {
        Po: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      selectedCost: {},
    };
  },
  methods: {
    costSelected(event) {
      this.$emit("cost_selected_emit", event.data);
    },
  },
  created() {},
  mounted() {},
};
</script>
