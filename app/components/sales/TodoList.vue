<template>
  <div>
    <DataTable
      :value="todoList"
      v-model:filters="filters2"
      filterDisplay="row"
      v-model:selection="selectedTodo"
      selectionMode="single"
      @row-click="todoSelected($event)"
      :rowClass="rowClass"
      sortField="Acil"
      :sortOrder="-1"
    >
      <Column
        field="OrtakGorev"
        header="Assignee"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column
        field="Yapilacak"
        header="Assignment"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column headerClass="tableHeader" bodyClass="tableBody">
        <template #body="slotProps">
          <Button
            type="button"
            label="Done"
            @click="isTodoChange(slotProps.data.ID)"
          />
        </template>
      </Column>
      <Column>
        <template #body="slotProps">
          <Button
            type="button"
            severity="warn"
            label="Not Seen"
            @click="$emit('todo_not_seen_emit', slotProps.data.ID)"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import { FilterMatchMode } from "@primevue/core/api"
import { useTodoStore } from "~/stores/todo"

export default {
  props: {
    /* Nuxt 2'de `todoList: {}` -- tip tanimsizdi. Liste bir DIZI. */
    todoList: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    todoStore() {
      return useTodoStore()
    },
  },

  data() {
    return {
      filters2: {
        OrtakGorev: { value: null, matchMode: FilterMatchMode.CONTAINS },
        Yapilacak: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
      selectedTodo: null,
    }
  },

  methods: {
    rowClass(event) {
      return event.Acil ? "red-row" : ""
    },

    todoSelected(event) {
      this.$emit("todo_form_detail_dialog", event.data)
      this.todoStore.setTodoButtonStatus(false)
    },

    isTodoChange(id) {
      this.todoStore.setTodoStatusChange(id)
    },
  },
}
</script>

<style scoped>
:deep(.red-row) {
  color: red !important;
}
</style>

<!--
  components/sales/TodoList.vue   (Nuxt 2: components/sales/todo/todo.vue)

  Etiket adi <SalesTodoList>. Nuxt 2'de ad `<todo>` idi
  (plugins/components.js:237, ELLE kayit).

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] import { FilterMatchMode } from "primevue/api"
         -> "@primevue/core/api"
      Alt paket "primevue/api" PrimeVue 4'te TAMAMEN kaldirildi; eski
      yol derlemeyi "Failed to resolve import" ile dusurur.

  [x] :filters + @update:filters  ->  v-model:filters
      :selection + @update:selection -> v-model:selection
      Nuxt 2'deki hali, Vue 2'nin .sync'ini acan codemod ciktisiydi
      (mark0002 commit c569066e5). Vue 3'te dogru yazim v-model:<ad>.

  [x] this.$store.dispatch("setTodoButtonStatus", false)
         -> todoStore.setTodoButtonStatus(false)
      this.$store.dispatch("setTodoStatusChange", id)
         -> todoStore.setTodoStatusChange(id)
      setTodoStatusChange pilota BU COMMIT'TE eklendi (stores/todo.ts).

  [x] class="p-button-primary" KALDIRILDI
      PrimeVue 4'te p-button-<severity> siniflari kaldirildi. "primary"
      zaten Button'un VARSAYILANI, yani severity="primary" yazmak da
      gereksiz -- sinif silindi, gorunum ayni kaldi.

  [x] class="p-button-warning" -> severity="warn"
      PrimeVue 4'te severity adi "warning" DEGIL "warn". Sinif olarak
      birakilsa dugme varsayilan (mavi) gorunurde kalirdi: hata vermez,
      sessizce yanlis renk.

  DIKKAT -- KASITLI OLARAK DEGISTIRILMEDI:
      Bilesen `header` prop'u ALMIYOR ama ebeveyn (SalesTodoGroup) ona
      header="Todos" / header="Mail List" geciriyor. Nuxt 2'de de boyleydi,
      yani o basliklar hic gosterilmiyordu. Prop eklemek GORUNUR bir
      baslik ekler; gerekcesi SalesTodoGroup'un sonundaki notta.
-->
