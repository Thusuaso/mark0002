<template>
  <div class="row">
    <div class="col-12" v-for="item in list" :key="item.surface">
      <h3 class="text-center">{{ item.surface }}</h3>
      <DataTable
        :value="item.items"
        v-model:selection="selectedSelectionCustomerList"
        selectionMode="single"
        @row-click="$emit('selection_customer_selected_emit', $event)"
      >
        <Column field="FirstName" header="Customer"></Column>
        <Column field="City" header="Country"></Column>
        <Column field="Email" header="Email"></Column>
        <Column field="Phone" header="Phone"></Column>
        <Column field="Adress" header="Address"></Column>
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

  },
  data() {
    return {
      selectedSelectionCustomerList: null,
    };
  },
  /*
   * created() -> mounted(): created() SSR'da da calisir, icindeki async
   * is BEKLENMEZ ve liste BOS serialize edilir; hydration onu devralir,
   * created() bir daha calismadigi icin tablo bos kalir (bkz. commit
   * 2afc877e3). mounted() sunucuda hic calismaz.
   */
  mounted() {},
};
</script>
