<template>
  <form @submit.prevent="onSubmit">
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Username</label>
      <input
        type="text"
        class="form-control"
        :class="{ 'is-invalid': !user.username, 'is-valid': user.username }"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        v-model="user.username"
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Password</label>
      <input
        type="password"
        class="form-control"
        id="exampleInputPassword1"
        v-model="user.password"
        :class="{ 'is-invalid': !user.password, 'is-valid': user.password }"
      />
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</template>
<script>
export default {
  data() {
    return {
      user: {
        username: null,
        password: null,
      },
    };
  },
  methods: {
    onSubmit() {
      this.$emit("onSubmit", this.user);
    },
  },
};
</script>
