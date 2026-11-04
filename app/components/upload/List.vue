<template>
  <div>
    <DataTable
      scrollable
      scrollHeight="var(--app-table-height)"
      :value="model"
      :rowClass="rowClass"
      v-model:selection="selectedUpload"
      selectionMode="single"
      @row-click="$emit('document_form_emit', $event.data)"
    >
      <Column
        field="ID"
        header="#"
        headerClass="tableHeader"
        bodyClass="tableBody"
      />
      <Column
        field="EvrakAdi"
        header="Document Id"
        headerClass="tableHeader"
        bodyClass="tableBody"
      />
    </DataTable>
  </div>
</template>
<script>
/*
 * components/upload/list.vue karsiligi.
 *
 * Secili PO'nun evrak listesi. Satir rengi sunucudan gelen `Color`
 * alanina gore: gri = evrak yuklenmis, sari = yuklenmemis
 * (api/index.js: documentColor).
 *
 * PrimeVue 4 degisiklikleri:
 *   :selection.sync        -> v-model:selection
 *   responsiveLayout       -> KALDIRILDI (PrimeVue 4'te yok; tablolar
 *                             zaten tasarim geregi kayan)
 *   + scrollable/scrollHeight (proje geneli kural, bkz.
 *     tools/codemods/codemod-datatable-scroll.mjs)
 */
export default {
  props: {
    model: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  emits: ["document_form_emit"],
  data() {
    return {
      selectedUpload: null,
    }
  },
  methods: {
    rowClass(data) {
      return data.Color === "gray" ? "row-gray" : "row-yellow"
    },
  },
}
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
