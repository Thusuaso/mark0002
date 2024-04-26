<template>
  <div>
    <DataTable
      :value="model"
      :rowClass="rowClass"
      responsiveLayout="scroll"
      :selection.sync="selectedUpload"
      selectionMode="single"
      @row-click="uploadSelected($event)"
    >
      <Column
        field="ID"
        header="#"
        headerClass="tableHeader"
        bodyClass="tableBody"
      ></Column>
      <Column
        field="EvrakAdi"
        header="Document Id"
        headerClass="tableHeader"
        bodyClass="tableBody"
      ></Column>
    </DataTable>
  </div>
</template>
<script>
export default {
  props: {
    model: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      selectedUpload: null,
    };
  },
  methods: {
    rowClass(data) {
      return data.Color === "gray" ? "row-gray" : "row-yellow";
    },
    uploadSelected(event) {
      this.$emit('document_form_emit',event.data);
    },
  },
};
</script>
<style scoped>
:deep(.row-gray) {
  background-color: rgb(180, 180, 180) !important;
  color: white !important;
}
:deep(.row-yellow) {
  background-color: rgb(255, 255, 119) !important;
  color: black !important;
}
</style>
