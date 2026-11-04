<template>
  <div>
    <DataTable
      :value="list"
      scrollable
      scrollHeight="var(--app-table-height)"
      v-model:selection="selectedTodo"
      selectionMode="single"
      @row-click="$emit('to_do_list_selected_emit', $event)"
      sortField="Acil"
      :sortOrder="-1"
      :rowClass="rowClass"
    >
      <Column
        field="Yapilacak"
        header="Assignment"
        headerClass="tableHeader"
        bodyClass="tableBody"
      />
      <Column
        field="GirisTarihi"
        header="Date"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ dateToString(slotProps.data.GirisTarihi) }}
        </template>
      </Column>
      <Column
        field="YapilacakOncelik"
        header="Priority"
        headerClass="tableHeader"
        bodyClass="tableBody"
      />
      <Column headerClass="tableHeader" bodyClass="tableBody">
        <template #body="slotProps">
          <Button
            type="button"
            severity="info"
            label="Done"
            @click="$emit('todo_done_emit', slotProps.data)"
          />
        </template>
      </Column>
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
  emits: ["to_do_list_selected_emit", "todo_done_emit"],
  data() {
    return {
      selectedTodo: null,
    }
  },
  methods: {
    rowClass(event) {
      return event.Acil ? "red-row" : ""
    },
  },
}
</script>

<style scoped>
:deep(.red-row) {
  color: rgba(255, 0, 0, 0.789) !important;
}
</style>

<!--
  components/todo/list.vue -> app/components/todoByUsername/List.vue

  DOSYA YOLU BILEREK DEGISTI: navbar sablonu bu bileseni
  <todoByUsernameList> olarak kullaniyor (plugins/components.js'te o adla
  elle kaydedilmisti). Nuxt auto-import adini DOSYA YOLUNDAN uretir, yani
  components/todo/list.vue -> <TodoList> olurdu ve navbar'daki etiket
  cozulemezdi. todoByUsername/List.vue yolu <TodoByUsernameList> uretiyor,
  boylece navbar sablonuna hic dokunmak gerekmiyor.

  ZORUNLU degisiklikler:
  [1] :selection + @update:selection -> v-model:selection
      (.sync codemod'u acik bicime cevirmisti; burada v-model'e sadelestirildi)
  [2] class="p-button-info" -> severity="info"
  [3] dateToString(...) sablonda cagriliyor -> plugins/formatters.ts bunu
      globalProperties'e kaydediyor. Bu GOSTERIM surumu: "02-10-2026".
      API'ye tarih yazarken utils/dates.ts'teki toIsoDate kullanilmali.
  [4] emits dizisi eklendi (Vue 3'te bildirilmeyen emit'ler attribute
      olarak dusuyor ve uyari veriyor)

  EKLENDI: scrollable + scrollHeight (bkz. assets/css/app.css)
-->
