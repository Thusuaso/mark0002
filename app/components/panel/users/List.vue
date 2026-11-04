<template>
  <div>
    <DataTable
      scrollable
      scrollHeight="var(--app-table-height)"
      :value="list"
      v-model:selection="selectedPanelUserList"
      selectionMode="single"
      @row-click="$emit('panel_user_list_selected_emit', $event)"
    >
      <Column field="Id" header="Id" />
      <Column field="adi" header="Name" />
      <Column field="kullaniciadi" header="Username" />
      <Column field="mailadres" header="Mail" />
      <Column field="telefon" header="Phone" />
    </DataTable>
  </div>
</template>
<script>
/*
 * components/panel/users/list.vue karsiligi.
 *
 * PrimeVue 4 / Vue 3 degisiklikleri:
 *   :selection.sync -> v-model:selection
 *   + scrollable/scrollHeight (proje geneli kural,
 *     tools/codemods/codemod-datatable-scroll.mjs)
 *   + emits bildirimi (Vue 3'te zorunlu degil ama sablondaki olay adi
 *     boylece belgelenmis oluyor)
 *
 * SATIR TIKLAMASI OLAYIN TAMAMINI YAYIYOR ($event), yalnizca satiri
 * degil -- ebeveyn `event.data` okuyor. Kaynakta da oyle; degistirmek
 * ebeveyni de degistirmek olurdu.
 */
export default {
  props: {
    list: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  emits: ["panel_user_list_selected_emit"],
  data() {
    return {
      selectedPanelUserList: null,
    }
  },
}
</script>
