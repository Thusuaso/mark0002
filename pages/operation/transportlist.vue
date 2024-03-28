<template>
  <div class="container">
    <transportList :list="getTransportList" :loading="getLoading" />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  middleware: ["authority"],
  computed: {
    ...mapGetters(["getTransportList", "getLoading"]),
  },
  created() {
    this.$store.dispatch("setTransportList");
  },
};
</script>
