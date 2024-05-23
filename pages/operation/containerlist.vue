<template>
  <div class="container">
    <containerInputList :list="getContainerInputList"/>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  middleware: ["authority"],
  computed: {
    ...mapGetters(["getContainerInputList"]),
  },
  created() {
    this.$store.dispatch("setContainerInputList");
  },
};
</script>
