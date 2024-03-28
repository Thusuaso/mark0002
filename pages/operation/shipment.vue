<template>
  <div class="container">
    <shipmentForm :orders="getOrdersList" />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  middleware: ["authority"],
  computed: {
    ...mapGetters(["getOrdersList"]),
  },
};
</script>
