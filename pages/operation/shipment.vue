<template>
  <div class="container">
    <shipmentForm :orders="getOrderProductionList" />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  middleware: ["authority"],
  computed: {
    ...mapGetters(["getOrderProductionList"]),
  },
  created() {
    this.$store.dispatch("setOrderProductionList");
  },
};
</script>
