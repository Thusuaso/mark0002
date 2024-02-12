<template>
  <div>
    <DataTable
      :value="list"
      :selection.sync="selectedPanelUserList"
      selectionMode="single"
      @row-click="$emit('panel_user_list_selected_emit', $event)"
    >
      <Column field="Id" header="Id"></Column>
      <Column field="adi" header="Adı"></Column>
      <Column field="kullaniciadi" header="Kullanıcı Adı"></Column>
      <Column field="mailadres" header="Mail"></Column>
      <Column field="telefon" header="Telefon"></Column>
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
