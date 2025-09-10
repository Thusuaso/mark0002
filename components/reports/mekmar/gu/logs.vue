<template>
  <div>
    <DataTable
      :value="list"
      filterDisplay="row"
      :filters.sync="logsFilter"
      :rowClass="logsRowClass"
      paginator
      rows="25"
    >
      <Column
        field="DegisiklikTarihi"
        header="Date"
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
        field="IslemAdi"
        header="LOGs"
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
        field="DegisiklikYapan"
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
  },
  data() {
    return {
      logsFilter: {
        DegisiklikTarihi: {
          value: null,
          matchMode: FilterMatchMode.STARTS_WITH,
        },
        YuklemeTarihi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        SiparisNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        IslemAdi: { value: null, matchMode: FilterMatchMode.CONTAINS },
        DegisiklikYapan: {
          value: null,
          matchMode: FilterMatchMode.STARTS_WITH,
        },
      },
    };
  },
  methods: {
    logsRowClass(event) {
      if (event.Renk == "#ffec31") {
        return "row-accessories";
      }
    },
  },
};
</script>
<style scoped>
:deep(.row-accessories) {
  background-color: #ffec31 !important;
}
</style>
