<template>
  <div style="height: 300px">
    <SalesTodoList
      :todoList="todos.listA"
      header="Todos"
      @todo_form_detail_dialog="todoFormDialog($event)"
      @todo_not_seen_emit="todoNotSeen($event)"
    />
    <br />
    <SalesTodoList
      :todoList="todos.listMail"
      header="Mail List"
      @todo_form_detail_dialog="todoFormDialog($event)"
      @todo_not_seen_emit="todoNotSeen($event)"
    />
  </div>
</template>

<script>
export default {
  props: {
    /*
     * GET /sales/todos/list'in govdesi: { listA, listMail }
     * (api/index.js:1417). Nuxt 2'de prop `todos: {}` idi -- yani tip
     * de, zorunluluk da TANIMSIZ. Tipi verildi; required DEGIL, cunku
     * store'daki baslangic degeri zaten dogru bicimli bos bir nesne.
     */
    todos: {
      type: Object,
      default: () => ({ listA: [], listMail: [] }),
    },
  },

  methods: {
    todoFormDialog(event) {
      this.$emit("todo_form_detail_dialog", event)
    },

    todoNotSeen(event) {
      this.$emit("todo_form_not_seen_emit", event)
    },
  },
}
</script>

<!--
  components/sales/TodoGroup.vue   (Nuxt 2: components/sales/todo/todos.vue)

  Etiket adi <SalesTodoGroup>. Nuxt 2'de ad `<todos>` idi ve
  plugins/components.js:236'da ELLE kayitliydi; Nuxt 3+ auto-import adini
  DOSYA YOLUNDAN uretiyor.

  Ayni sebeple ic etiket de degisti:
      <todo ... />   ->   <SalesTodoList ... />
  (Nuxt 2: plugins/components.js:237, components/sales/todo/todo.vue)

  Bu bilesen yalnizca bir SARMALAYICI: ayni listeyi iki kez, iki ayri
  veri kaynagiyla gosteriyor ve alt bilesenin iki olayini yukari
  geciriyor. Mantik yok, oldugu gibi tasindi.

  DIKKAT -- NUXT 2'DE DE BOZUK, DEGISTIRILMEDI:
  Alt bilesene `header="Todos"` / `header="Mail List"` geciriliyor ama
  SalesTodoList'in props'unda `header` TANIMLI DEGIL (Nuxt 2'de de
  degildi). Yani bu iki baslik hicbir yerde gosterilmiyor; Vue 3'te
  tanimsiz prop kok ogeye DOM attribute'u olarak duser. Prop'u eklemek
  ya da baglamayi kaldirmak GORUNUMU DEGISTIRIR (biri baslik ekler,
  digeri DOM'u temizler), bu yuzden karar burada verilmedi -- davranis
  birebir korundu.

  [x] class="" (bos sinif) kaldirildi.
-->
