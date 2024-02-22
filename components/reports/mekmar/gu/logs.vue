<template>
  <div>
    <DataTable
      :value="list"
      filterDisplay="row"
      :filters.sync="logsFilter"
      :rowClass="logsRowClass"
      :loading="loading"
    >
      <Column field="Gun" header="Day" :showFilterMenu="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="Ay" header="Month" :showFilterMenu="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="Yil" header="Year" :showFilterMenu="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="YuklemeTarihi" header="Shipment Date" :showFilterMenu="false">
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
      <Column field="IslemAdi" header="Process" :showFilterMenu="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="DegisiklikYapan" header="Changer" :showFilterMenu="false">
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
    loading: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      logsFilter: {
        Gun: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Ay: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Yil: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        YuklemeTarihi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        SiparisNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        IslemAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        DegisiklikYapan: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
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
