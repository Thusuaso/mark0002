<template>
  <div class="container">
    <todos
      :todos="getTodos"
      @todo_form_detail_dialog="todoFormDetailDialog($event)"
      @todo_form_not_seen_emit="todoNotSeen($event)"
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
export default {
  // middleware: ["authority"],
  data() {
    return {
      todo_dialog_form: false,
      todoDetail: null,
    };
  },
  computed: {
    ...mapGetters(["getTodos", "getUserList"]),
  },
  created() {
    this.$store.dispatch("setTodos");
  },
  methods: {
    todoFormDetailDialog(event) {
      this.todoDetail = event;
      this.todo_dialog_form = true;
    },
    todoNotSeen(event) {
      this.$store.dispatch("setTodoNotSeen", event);
    },
  },
};
</script>
