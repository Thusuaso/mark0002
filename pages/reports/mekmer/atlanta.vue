<template>
  <div><reportsMekmerAtlantaList :list="getReportsMekmerAtlantaList" /></div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  middleware: ["authority"],
  computed: {
    ...mapGetters(["getReportsMekmerAtlantaList"]),
  },
  created() {
    this.$store.dispatch("setReportsMekmerAtlantaList");
  },
};
</script>
<style scoped></style>
