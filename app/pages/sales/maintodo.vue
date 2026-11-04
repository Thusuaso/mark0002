<template>
  <div>
    <TodoMainList
      :list="todoStore.getTodosMainList"
      @sales_to_do_main_done_emit="salesTodoMainDone($event)"
      @sales_to_do_main_seen_emit="salesTodoMainSeen($event)"
      @sales_to_do_main_list_change_queue="salesTodoMainChangeQueue($event)"
      @main_to_do_list_selected_emit="mainToDoListSelected($event)"
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
    mainToDoListSelected(event) {
      this.todo_dialog_form = true
      this.todoDetail = event.data
    },

    salesTodoMainChangeQueue(event) {
      this.todoStore.setSalesTodoMainChangeQueue(event)
    },

    salesTodoMainDone(event) {
      this.todoStore.setSalesTodoMainDone(event)
    },

    salesTodoMainSeen(event) {
      this.todoStore.setSalesTodoMainSeen(event)
    },
  },
}
</script>

<script setup>
/*
 * Veri cekimi NEDEN created() icinde degil: SSR created() icindeki async
 * isi BEKLEMEZ -- liste bos serialize edilir, client hydration onu
 * devralir ve created() bir daha calismadigi icin tablo bos kalir.
 *
 * server: false ZORUNLU -- legacy Express API'si SSR'in IC fetch yolunda
 * calismiyor (bkz. server/middleware/1.legacy-api.ts).
 *
 * Kullanici listesi burada cekilmiyor; layouts/default.vue dolduruyor
 * (ayni not pages/sales/todo.vue icinde).
 *
 * ---------------------------------------------------------------------
 * "gizem" SABIT KODLU -- DEGISTIRILMEDI
 * ---------------------------------------------------------------------
 * Nuxt 2: this.$store.dispatch("setTodosMainList", "gizem")
 *
 * "Ana" gorev listesi bu kullanicinin listesi; sayfa oturum acan kisiye
 * gore DEGISMIYOR, herkes ayni listeyi goruyor.
 *
 * Argumani BOS BIRAKMAK davranis degistirir: pilotun setTodosMainList
 * eylemi arguman gelmezse CEREZDEKI kullanici adina duser, yani her
 * kullanici kendi (cogu zaman bos) listesini gorurdu. Bu yuzden deger
 * birebir korundu.
 *
 * Buraya sabit yazilmis olmasinin BILINCLI bir tasarim mi yoksa
 * unutulmus bir deger mi oldugu kodda belli degil; yapilandirmaya
 * tasimak ayri bir karar.
 */
const todoStore = useTodoStore()

definePageMeta({ middleware: ["authority"] })

await useAsyncData(
  "sales-maintodo",
  () => todoStore.setTodosMainList("gizem"),
  { server: false },
)
</script>

<!--
  pages/sales/maintodo.vue

  Navbar bu yola link veriyordu ama sayfa pilotta YOKTU.

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] middleware: ["authority"] -> definePageMeta({ middleware: [...] })
      Options API'deki middleware anahtari Nuxt 3+'ta YOK SAYILIR: hata
      vermez, kisitlama sessizce kalkar.

  [x] mapGetters(["getTodosMainList", "getUserList"]) -> todoStore /
      sharedStore (getUserList shared store'unda, todo'da degil).

  [x] Dort dispatch -> Pinia eylemi. DORDUNUN UCU pilota BU COMMIT'TE
      eklendi (stores/todo.ts): setSalesTodoMainDone,
      setSalesTodoMainSeen, setSalesTodoMainChangeQueue.

  [x] <todoMainList> -> <TodoMainList>,  <todoForm> -> <SalesTodoForm>

  [x] :visible + @update:visible -> v-model:visible

  [x] created() -> <script setup> + useAsyncData({ server: false })

  [x] `import Cookies from "js-cookie"` KALDIRILDI -- dosyada HIC
      kullanilmiyordu (js-cookie pilota kurulmadi bile).

  [x] <style scoped></style> KALDIRILDI -- bostu.

  DIKKAT:
      "gizem" sabit kullanici adi birebir korundu; gerekcesi yukarida,
      MAIN_TODO_OWNER tanimin basinda.
-->
