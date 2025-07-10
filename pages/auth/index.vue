<template>
  <div class="container" style="padding-top: 230px">
    <authForm @onSubmit="onSubmit($event)" :users="getUserList" />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Cookies from "js-cookie";
export default {
  computed: {
    ...mapGetters(["getUserList"]),
  },
  methods: {
    onSubmit(user) {
      this.$store.dispatch("login", user).then((res) => {
        const userId = Cookies.get("userId");
        this.$store.dispatch("setUserId", userId);
        if (res) {
          const date = new Date();
          user.innerDate =
            date.getFullYear() +
            "/" +
            (date.getMonth() + 1) +
            "/" +
            date.getDate() +
            "    " +
            date.getHours() +
            ":" +
            date.getMinutes() +
            ":" +
            date.getSeconds();
          this.$store.dispatch("login_mailer", user);
          this.$store.dispatch("setToDoListByUsername", user.username);
        }
      });
    },
  },
  beforeCreate() {
    this.$store.dispatch("setUserList");
  },
};
</script>
