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
<style></style>
