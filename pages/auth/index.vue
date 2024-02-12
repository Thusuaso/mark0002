<template>
  <div class="container m-auto w-50 mt-5">
    <authForm @onSubmit="onSubmit($event)" />
  </div>
</template>
<script>
export default {
  methods: {
    onSubmit(user) {
      this.$store.dispatch("login", user);
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
    },
  },
};
</script>
