<template>
  <div>
    <DataTable
      :value="list"
      :selection.sync="selectedPanelUserList"
      selectionMode="single"
      @row-click="$emit('panel_user_list_selected_emit', $event)"
    >
      <Column field="Id" header="Id"></Column>
      <Column field="adi" header="Name"></Column>
      <Column field="kullaniciadi" header="Username"></Column>
      <Column field="mailadres" header="Mail"></Column>
      <Column field="telefon" header="Phone"></Column>
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
  },
  data() {
    return {
      selectedPanelUserList: null,
    };
  },
};
</script>
