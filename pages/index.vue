<template>
  <div class="container">
    <home :home="home" />
  </div>
</template>

<script>
export default {
  computed: {
    home() {
      return this.$store.getters.getHomeList;
    },
  },
  components: {},
  data() {
    return {};
  },
  beforeMount() {},
  created() {
    this.$store.dispatch("getHome");
  },
  mounted() {},
  methods: {},
};
</script>
<style>
.tableHeader {
  font-size: 15px;
  font-weight: bold;
}
.tableBody{
  font-size:13px;
}
</style>
