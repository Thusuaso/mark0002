<template>
  <div class="container">
    <new-version-banner />
    <home :home="home" />
  </div>
</template>

<script>
import NewVersionBanner from "~/components/home/newVersionBanner.vue";

export default {
  computed: {
    home() {
      return this.$store.getters.getHomeList;
    },
  },
  components: { NewVersionBanner },
  data() {
    return {};
  },
  beforeMount() {},
  created() {
    if (process.client) {
      // api.get('/reports/production/send/mail');
      this.$store.dispatch("getHome");
    }
  },
  mounted() {},
  methods: {},
};
</script>
<style></style>
