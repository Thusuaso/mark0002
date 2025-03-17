<template>
  <div class="container">
    <home :home="home" />
  </div>
</template>

<script>
import api from '@/plugins/excel.server';

// import { io } from "socket.io-client";
export default {
  computed: {
    home() {
      return this.$store.getters.getHomeList;
    },
  },
  components: {},
  data() {
    return {
    
    };
  },
  beforeMount() {},
  created() {
    if(process.client){
      // api.get('/reports/production/send/mail');
      this.$store.dispatch("getHome");

    }

  },
  mounted() {},
  methods: {

  },
};
</script>
<style></style>
