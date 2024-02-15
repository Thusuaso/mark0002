<template>
  <form @submit.prevent="onSubmit">
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Username</label>
      <input
        type="text"
        class="form-control"
        :class="{ 'is-invalid': !usernameStatus, 'is-valid': usernameStatus }"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        v-model="user.username"
        @change="validateUsername($event)"
      />
      <i v-if="usernameInfoStatus" style="color: red">*Kullanıcı Adınız Hatalıdır.</i>
    </div>

    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Password</label>
      <input
        type="password"
        class="form-control"
        id="exampleInputPassword1"
        v-model="user.password"
        :class="{ 'is-invalid': !passwordStatus, 'is-valid': passwordStatus }"
        @change="validatePassword($event)"
      />
      <i v-if="passwordInfoStatus" style="color: red">*Parolanız Hatalıdır.</i>
    </div>
    <i v-if="passwordStatus" style="color: rgb(0, 255, 0); padding-bottom: 10px"
      >Artık Giriş Yapabilirsiniz.</i
    >
    <button type="submit" class="btn btn-primary w-100" :disabled="!passwordStatus">
      Login
    </button>
  </form>
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
        (x) => x.KullaniciAdi.toLowerCase() === event.target._value.toLowerCase()
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
