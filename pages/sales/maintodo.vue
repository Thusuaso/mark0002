<template>
  <div>
    <todoMainList
      :list="getTodosMainList"
      @sales_to_do_main_done_emit="salesTodoMainDone($event)"
      @sales_to_do_main_seen_emit="salesTodoMainSeen($event)"
      @sales_to_do_main_list_change_queue="salesTodoMainChangeQueue($event)"
      @main_to_do_list_selected_emit="mainToDoListSelected($event)"
    />
    <Dialog :visible.sync="todo_dialog_form" header="Todo Form" modal>
      <todoForm
        :todoDetail="todoDetail"
        @todo_form_dialog="todo_dialog_form = $event"
        :users="getUserList"
      />
    </Dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Cookies from "js-cookie";
export default {
  middleware: ["authority"],
  computed: {
    ...mapGetters(["getTodosMainList", "getUserList"]),
  },
  data() {
    return {
      todo_dialog_form: false,
      todoDetail: null,
    };
  },
  created() {
    this.$store.dispatch("setTodosMainList", "gizem");
  },
  methods: {
    mainToDoListSelected(event) {
      this.todo_dialog_form = true;
      this.todoDetail = event.data;
    },
    salesTodoMainChangeQueue(event) {
      this.$store.dispatch("setSalesTodoMainChangeQueue", event);
    },
    salesTodoMainDone(event) {
      this.$store.dispatch("setSalesTodoMainDone", event);
    },
    salesTodoMainSeen(event) {
      this.$store.dispatch("setSalesTodoMainSeen", event);
    },
  },
};
</script>

<style scoped></style>
