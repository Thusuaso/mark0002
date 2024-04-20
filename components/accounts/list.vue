<template>
  <DataTable
    :value="list"
    responsiveLayout="scroll"
    :selection.sync="selectedAccounts"
    selectionMode="single"
    @row-click="accountsSelected($event)"
    :filters.sync="filteredAccounts"
    filterDisplay="row"
  >
    <Column
      field="Platform"
      header="Platform"
      bodyStyle="text-align: center"
      :showClearButton="false"
      :showFilterMenu="false"
    >
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          v-model="filterModel.value"
          type="text"
          @input="filterCallback()"
          class="p-column-filter"
          placeholder="Search by country"
        />
      </template>
    </Column>
    <Column
      field="LoginName"
      header="Login Name"
      bodyStyle="text-align: center"
      :showClearButton="false"
      :showFilterMenu="false"
    >
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          v-model="filterModel.value"
          type="text"
          @input="filterCallback()"
          class="p-column-filter"
          placeholder="Search by country"
        />
      </template>
    </Column>
    <Column field="LoginPassword" header="Login Password" bodyStyle="text-align: center">
      <template #body="slotProps">
        <div v-if="!passwordStatus">********</div>
        <div v-else>
          {{ slotProps.data.LoginPassword }}
        </div>
      </template>
    </Column>
  </DataTable>
</template>
<script>
import { FilterMatchMode } from "primevue/api";
export default {
  data() {
    return {
      selectedAccounts: null,
      filteredAccounts: {
        Platform: { value: null, matchMode: FilterMatchMode.CONTAINS },
        LoginName: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
    };
  },
  props: {
    list: {
      type: Array,
      required: false,
    },
    passwordStatus: {
      type: Boolean,
      required: true,
    },
  },

  methods: {
    accountsSelected(event) {
      this.$emit("accounts_selected_emit", event);
    },
  },
};
</script>
