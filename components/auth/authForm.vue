<template>
  <!-- <form @submit.prevent="onSubmit">
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Username</label>
      <input
        type="text"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        v-model="user.username"
        @change="validateUsername($event)"
      />
    </div>

    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Password</label>
      <input
        type="password"
        class="form-control"
        id="exampleInputPassword1"
        v-model="user.password"
        @change="validatePassword($event)"
      />
    </div>
    <button type="submit" class="btn btn-primary w-100">Login</button>
  </form> -->

  <Card style="width: 25rem; margin: 0px auto;">
    <template #title>
      <div class="text-center">Login</div>
    </template>
    <template #content>
      <form @submit.prevent="onSubmit">
        <div class="flex flex-column gap-3">
          <div class="field">
            <label for="email">Username</label>
            <InputText
              id="email"
              v-model="user.username"
              @change="validateUsername($event)"
              class="w-full"
            />
          </div>

          <div class="field">
            <label for="password">Password</label>
            <InputText
              v-model="user.password"
              @change="validatePassword($event)"
              class="w-full"
              type="password"
              inputClass="w-full"
            />
          </div>

          <Button type="submit" label="Login" class="mt-3" />
        </div>
      </form>
    </template>
  </Card>
</template>
<script>
export default {
  props: {
    users: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      user: {
        username: null,
        password: null,
      },
      usernameStatus: false,
      passwordStatus: false,
      usernameInfoStatus: false,
      passwordInfoStatus: false,
    };
  },
  methods: {
    validatePassword(event) {
      this.passwordInfoStatus = true;
      const username = this.users.filter(
        (x) => x.KullaniciAdi.toLowerCase() === this.user.username.toLowerCase()
      );
      if (username.length > 0) {
        const password = username[0].YSifre;
        if (password === event.target._value) {
          this.passwordStatus = true;
          this.passwordInfoStatus = false;
        } else {
          this.passwordStatus = false;
          this.passwordInfoStatus = false;
        }
      } else {
        this.passwordStatus = false;
        this.passwordInfoStatus = true;
      }
    },
    validateUsername(event) {
      this.usernameInfoStatus = true;
      const index = this.users.filter(
        (x) =>
          x.KullaniciAdi.toLowerCase() === event.target._value.toLowerCase()
      );
      if (index.length > 0) {
        this.usernameStatus = true;
        this.usernameInfoStatus = false;
      } else {
        this.usernameStatus = false;
        this.usernameInfoStatus = true;
      }
    },
    onSubmit() {
      this.$emit("onSubmit", this.user);
    },
  },
};
</script>
