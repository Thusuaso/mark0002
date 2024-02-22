<template>
  <div>
    <DataTable
      :value="list"
      scrollable
      scrollHeight="400px"
      :selection.sync="selectedOfferDetailListForm"
      selectionMode="single"
      @row-click="$emit('offer_detail_list_form_selected_emit', $event.data)"
      :sortField="['TeklifOncelik', 'Sira']"
      sortOrder="-1"
      :rowClass="offerClass"
      :loading="loading"
    >
      <Column field="Tarih" header="Tarih">
        <template #body="slotProps">
          {{ slotProps.data.Tarih | dateToString }}
        </template>
      </Column>
      <Column field="Sira" header="Queue"></Column>
      <Column field="MusteriAdi" header="Customer"></Column>
      <Column field="UlkeAdi" header="Country"></Column>
      <Column field="KullaniciAdi" header="Representative"></Column>
      <Column field="TeklifOncelik" header="Priority"></Column>
    </DataTable>
    <DataTable
      :value="bList"
      scrollable
      scrollHeight="400px"
      :selection.sync="selectedOfferDetailListForm"
      selectionMode="single"
      @row-click="$emit('offer_detail_list_form_selected_emit', $event.data)"
      sortField="TeklifOncelik"
      :sortOrder="1"
      :rowClass="offerClass"
      :loading="loading"
    >
      <template #header>
        <h3 class="header">B List</h3>
      </template>
      <Column field="Tarih" header="Tarih">
        <template #body="slotProps">
          {{ slotProps.data.Tarih | dateToString }}
        </template>
      </Column>
      <Column field="Sira" header="Queue"></Column>
      <Column field="MusteriAdi" header="Customer"></Column>
      <Column field="UlkeAdi" header="Country"></Column>
      <Column field="KullaniciAdi" header="Representative"></Column>
      <Column field="TeklifOncelik" header="Priority"></Column>
    </DataTable>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      required: false,
    },
    bList: {
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
      selectedOfferDetailListForm: null,
    };
  },
  methods: {
    offerClass(event) {
      return event.TeklifOncelik == "Toplantı" ? "yellow" : "";
    },
  },
};
</script>
<style scoped>
:deep(.yellow) {
  background-color: rgb(242, 255, 0) !important;
  border: 1px solid gray;
}
</style>
