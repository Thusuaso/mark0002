<template>
  <div class="container">
    <todos :todos="getTodos" @todo_form_detail_dialog="todoFormDetailDialog($event)" />
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
  },
};
</script>
