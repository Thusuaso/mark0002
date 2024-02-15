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
        <Column field="TeklifSahibi" header="Teklif Sahibi"></Column>
        <Column field="TeklifSayisi" header="Teklif Sayısı"></Column>
        <Column field="TeklifSayisiA" header="Teklif Sayısı A"></Column>
        <Column field="TeklifSayisiB" header="Teklif Sayısı B"></Column>
      </DataTable>
    </div>
    <div class="col">
      <DataTable :value="country" scrollable scrollHeight="450px" :loading="loading">
        <Column field="Ulke" header="Ülke"></Column>
        <Column field="TeklifSayisi" header="Teklif Sayısı"></Column>
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
