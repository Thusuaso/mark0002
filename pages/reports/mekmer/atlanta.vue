<template>
  <div><reportsMekmerAtlantaList :list="getReportsMekmerAtlantaList" /></div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getReportsMekmerAtlantaList"]),
  },
  created() {
    this.$store.dispatch("setReportsMekmerAtlantaList");
  },
};
</script>
<style scoped></style>
