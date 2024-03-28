<template>
  <div class="container">
    <containerInputList :list="getContainerInputList" :loading="getLoading" />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  middleware: ["authority"],
  computed: {
    ...mapGetters(["getContainerInputList", "getLoading"]),
  },
  created() {
    this.$store.dispatch("setContainerInputList", "getLoading");
  },
};
</script>
