<template>
  <div>
    <todoMainList
      :list="getTodosMainList"
      @sales_to_do_main_done_emit="salesTodoMainDone($event)"
      @sales_to_do_main_seen_emit="salesTodoMainSeen($event)"
      @sales_to_do_main_list_change_queue="salesTodoMainChangeQueue($event)"
    />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Cookies from "js-cookie";
export default {
  computed: {
    ...mapGetters(["getTodosMainList"]),
  },
  created() {
    this.$store.dispatch("setTodosMainList", Cookies.get("username"));
  },
  methods: {
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
