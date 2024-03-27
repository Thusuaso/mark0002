<template>
  <div>
    <DataTable
      :value="list"
      responsiveLayout="scroll"
      :filters.sync="filters1"
      filterDisplay="row"
      :selection.sync="selectedFollow"
      selectionMode="single"
      @row-click="followSelected($event)"
      paginator
      :rows="10"
      :loading="loading"
    >
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
            type="text"
            v-model="filterModel.value"
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
            type="text"
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column
        field="YuklemeTarihi"
        header="Shipment Date"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ slotProps.data.YuklemeTarihi | dateToString }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column
        field="KonteynerNo"
        header="Container No"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column
        field="Line"
        header="Line"
        headerClass="tableHeader"
        bodyClass="tableBody"
      ></Column>
      <Column
        field="Eta"
        header="Est. Date"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ slotProps.data.Eta | dateToString }}
        </template>
      </Column>
      <Column
        field="Kalan"
        header="Remaining Time"
        headerClass="tableHeader"
        bodyClass="tableBody"
      ></Column>
      <Column header="#" headerClass="tableHeader" bodyClass="tableBody">
        <template #body="slotProps">
          <div
            v-if="
              slotProps.data.KonsimentoDurum == null || !slotProps.data.KonsimentoDurum
            "
          >
            Not Sent
          </div>
          <div v-else>Sent</div>
        </template>
      </Column>
      <Column
        field="AktarmaLimanAdi"
        header="Port"
        headerClass="tableHeader"
        bodyClass="tableBody"
      ></Column>
      <Column
        field="Sorumlu"
        header="Responsible"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
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
      filters1: {
        MusteriAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        SiparisNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        YuklemeTarihi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        KonteynerNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Sorumlu: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      selectedFollow: null,
    };
  },
  methods: {
    followSelected(event) {
      this.$emit("follow-selected-dialog-emit", event.data);
    },
  },
};
</script>
