<template>
  <div class="row">
    <div class="col">
      <DataTable
        :value="list"
        :selection.sync="selectedOfferList"
        selectionMode="single"
        @row-click="offerListSelected($event)"
      >
        <Column
          field="TeklifSahibi"
          header="Representative"
          headerClass="tableHeader"
          bodyClass="tableBody"
        ></Column>
        <Column
          field="TeklifSayisi"
          header="Quote Count"
          headerClass="tableHeader"
          bodyClass="tableBody"
        ></Column>
        <Column
          field="TeklifSayisiA"
          header="Quotes A"
          headerClass="tableHeader"
          bodyClass="tableBody"
        ></Column>
        <Column
          field="TeklifSayisiB"
          header="Quotes B"
          headerClass="tableHeader"
          bodyClass="tableBody"
        ></Column>
      </DataTable>
    </div>
    <div class="col">
      <DataTable :value="country" scrollable scrollHeight="450px" >
        <Column
          field="Ulke"
          header="Country"
          headerClass="tableHeader"
          bodyClass="tableBody"
        ></Column>
        <Column
          field="TeklifSayisi"
          header="Total"
          headerClass="tableHeader"
          bodyClass="tableBody"
        ></Column>
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
