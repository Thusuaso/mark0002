<template>
  <div class="row">
    <div class="col-12" v-for="item in list" :key="item.surface">
      <h3 class="text-center">{{ item.surface }}</h3>
      <DataTable
        :value="item.items"
        :selection.sync="selectedSelectionCustomerList"
        selectionMode="single"
        @row-click="$emit('selection_customer_selected_emit', $event)"
        :loading="loading"
      >
        <Column field="FirstName" header="Müşteri Adı"></Column>
        <Column field="City" header="Ülke"></Column>
        <Column field="Email" header="Email"></Column>
        <Column field="Phone" header="Phone"></Column>
        <Column field="Adress" header="Adres"></Column>
      </DataTable>
    </div>
  </div>
</template>
<script>
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
      selectedSelectionCustomerList: null,
    };
  },
  created() {},
};
</script>
