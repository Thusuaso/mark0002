<template>
  <div class="container">
    <SalesTodoGroup
      :todos="todoStore.getTodos"
      @todo_form_detail_dialog="todoFormDetailDialog($event)"
      @todo_form_not_seen_emit="todoNotSeen($event)"
    />
    <Dialog v-model:visible="todo_dialog_form" header="Todo Form" modal>
      <SalesTodoForm
        :todoDetail="todoDetail"
        :users="sharedStore.getUserList"
        @todo_form_dialog="todo_dialog_form = $event"
      />
    </Dialog>
  </div>
</template>

<script>
import { useTodoStore } from "~/stores/todo"
import { useSharedStore } from "~/stores/shared"

export default {
  computed: {
    todoStore() {
      return useTodoStore()
    },
    sharedStore() {
      return useSharedStore()
    },
  },

  data() {
    return {
      todo_dialog_form: false,
      todoDetail: null,
    }
  },

  /*
   * [x] created() KALDIRILDI -- veri cekimi asagidaki <script setup>
   * blogunda useAsyncData ile. Gerekcesi orada.
   */

  methods: {
    todoFormDetailDialog(event) {
      this.todoDetail = event
      this.todo_dialog_form = true
    },

    todoNotSeen(event) {
      this.todoStore.setTodoNotSeen(event)
    },
  },
}
</script>

<script setup>
/*
 * Veri cekimi NEDEN created() icinde degil: SSR created() icindeki async
 * isi BEKLEMEZ -- govde bos serialize edilir, client hydration onu
 * devralir ve created() bir daha calismadigi icin tablo bos kalir
 * (ayni not pages/reports/mekmer/stock.vue icinde de var).
 *
 * server: false ZORUNLU -- legacy Express API'si SSR'in IC fetch yolunda
 * calismiyor (bkz. server/middleware/1.legacy-api.ts).
 *
 * KULLANICI LISTESI BURADA CEKILMIYOR: SalesTodoForm'un `users` prop'u
 * shared store'dan geliyor ve onu layouts/default.vue dolduruyor
 * (useAsyncData("layout-user-list") -> setUserList). Nuxt 2'de de ayni
 * sekilde layout'tan geliyordu (layouts/default.vue:29). Pilotun diger
 * sayfalari da bu listeyi kendileri cekmiyor -- ayni konvansiyon.
 */
const todoStore = useTodoStore()

definePageMeta({ middleware: ["authority"] })

await useAsyncData("sales-todo", () => todoStore.setTodos(), {
  server: false,
})
</script>

<!--
  pages/sales/todo.vue

  Navbar bu yola link veriyordu ama sayfa pilotta YOKTU -- 62 navbar
  linkinin 36'si boyle (bkz. bu commit'in mesaji).

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] middleware: ["authority"] -> definePageMeta({ middleware: [...] })
      Options API'de middleware anahtari Nuxt 3+'ta YOK SAYILIR: hata
      vermez, kisitlama sessizce kalkar. (Ayni not
      pages/operation/supplier.vue icinde de var.)

  [x] mapGetters(["getTodos", "getUserList"]) -> todoStore / sharedStore
      getUserList todo store'unda DEGIL, shared store'unda.

  [x] this.$store.dispatch("setTodos") -> todoStore.setTodos()
      this.$store.dispatch("setTodoNotSeen", e) -> todoStore.setTodoNotSeen(e)
      setTodoNotSeen pilota BU COMMIT'TE eklendi (stores/todo.ts).

  [x] <todos> -> <SalesTodoGroup>,  <todoForm> -> <SalesTodoForm>
      (Nuxt auto-import adlari dosya yolundan gelir; eski adlar
       plugins/components.js'te ELLE kayitliydi.)

  [x] :visible + @update:visible -> v-model:visible
      Nuxt 2'deki hali Vue 2 .sync codemod ciktisiydi.

  [x] created() -> <script setup> + useAsyncData({ server: false })
-->
