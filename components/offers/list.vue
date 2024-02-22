<template>
  <div class="row">
    <div class="col">
      <DataTable
        :value="list"
        :selection.sync="selectedOfferList"
        selectionMode="single"
        @row-click="offerListSelected($event)"
        :loading="loading"
      >
        <Column field="TeklifSahibi" header="Owner"></Column>
        <Column field="TeklifSayisi" header="Total"></Column>
        <Column field="TeklifSayisiA" header="A"></Column>
        <Column field="TeklifSayisiB" header="B"></Column>
      </DataTable>
    </div>
    <div class="col">
      <DataTable :value="country" scrollable scrollHeight="450px" :loading="loading">
        <Column field="Ulke" header="Country"></Column>
        <Column field="TeklifSayisi" header="Total"></Column>
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
    country: {
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
      selectedOfferList: null,
    };
  },
  methods: {
    offerListSelected(event) {
      this.$emit("offer_list_selected_emit", event.data);
      this.$emit("offer_list_b_list_selected_emit", event.data);
    },
  },
};
</script>
