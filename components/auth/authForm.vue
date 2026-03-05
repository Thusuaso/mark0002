<template>
  <Card style="width: 25rem; margin: 0px auto">
    <template #title>
      <div class="text-center">
        {{ step === 1 ? "Login" : "E-posta Doğrulama" }}
      </div>
    </template>
    <template #content>
      <form v-if="step === 1" @submit.prevent="onSubmit">
        <div class="flex flex-column gap-3">
          <div class="field">
            <label for="username">Username</label>
            <InputText
              id="username"
              v-model="user.username"
              @change="validateUsername($event)"
              class="w-full"
            />
          </div>

          <div class="field">
            <label for="password">Password</label>
            <InputText
              id="password"
              v-model="user.password"
              @change="validatePassword($event)"
              class="w-full"
              type="password"
            />
          </div>

          <Button
            type="submit"
            label="İlerle"
            class="mt-3"
            :disabled="
              !usernameStatus || !passwordStatus || next_step_loading_button
            "
            :loading="next_step_loading_button"
          />
          <div class="flex justify-content-end mt-1">
            <Button
              type="button"
              label="Şifremi Unuttum?"
              class="p-button-link p-0 text-sm text-color-secondary"
              @click="goToForgotPassword"
            />
          </div>
        </div>
      </form>

      <form v-else @submit.prevent="onSubmit">
        <div class="flex flex-column gap-3 text-center">
          <p class="text-sm italic">
            Lütfen mail adresinize gönderilen 6 haneli kodu girin.
          </p>
          <div class="field">
            <InputText
              id="otp"
              v-model="otpCode"
              class="w-full text-center"
              placeholder="000000"
              maxlength="6"
              autofocus
            />
          </div>
          <Button
            type="submit"
            label="Giriş Yap"
            class="mt-3 p-button-success"
            :disabled="step_2_loading_button"
            :loading="step_2_loading_button"
          />
          <Button
            type="button"
            label="Geri Dön"
            class="p-button-text text-sm"
            @click="step = 1"
          />
        </div>
      </form>
    </template>
  </Card>
</template>

<script>
import Cookies from "js-cookie";
export default {
  middleware: ["navbarControl"],
  props: {
    users: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      step: 1, // Hangi aşamada olduğumuzu tutar (1: Login, 2: OTP)
      otpCode: "",
      user: {
        username: "",
        password: "",
      },
      usernameStatus: false,
      passwordStatus: false,
      next_step_loading_button: false,
      step_2_loading_button: false,
    };
  },
  methods: {
    validateUsername(event) {
      const val = event.target._value || this.user.username;
      const found = this.users.find(
        (x) => x.KullaniciAdi.toLowerCase() === val.toLowerCase()
      );
      this.usernameStatus = !!found;
    },
    validatePassword(event) {
      const val = event.target._value || this.user.password;
      const userObj = this.users.find(
        (x) => x.KullaniciAdi.toLowerCase() === this.user.username.toLowerCase()
      );
      this.passwordStatus = userObj && userObj.YSifre === val;
    },

    // Tek bir onSubmit metodu ile iki aşamayı da yönetiyoruz
    async onSubmit() {
      this.next_step_loading_button = true;
      try {
        if (this.step === 1) {
          // 1. AŞAMA: Kullanıcı adı ve şifreyi backend'e gönder
          const response = await this.$axios.$post("/login", {
            username: this.user.username,
            password: this.user.password,
          });

          // Backend "otp_sent" dediyse 2. adıma geç
          if (response.status && response.step === "otp_sent") {
            this.step = 2;
          } else {
            alert(
              response.message || "Giriş bilgileri hatalı veya sunucu reddetti."
            );
            this.next_step_loading_button = false;
          }
        } else if (this.step === 2) {
          this.next_step_loading_button = false;
          this.step_2_loading_button = true;
          // 2. AŞAMA: Mailden gelen kodu backend'e doğrulat
          const response = await this.$axios.$post("/verify-otp", {
            username: this.user.username,
            code: this.otpCode,
          });

          // Kod doğruysa içeri al
          if (response.status) {
            console.log("Giriş Başarılı:", response);

            // Eğer Nuxt Auth veya Store kullanıyorsan kullanıcıyı kaydetme işlemini burada yapabilirsin
            // Örn: this.$store.commit("setUser", response);
            const date = new Date();
            response.innerDate =
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
            Cookies.set("token", response.token);
            Cookies.set("userId", response.userId);
            Cookies.set("username", response.username);
            Cookies.set("mail", response.mail);
            this.$store.dispatch("login_mailer", response);
            this.$store.dispatch("setToDoListByUsername", response.username);
            this.$store.dispatch("setUserId", response.userId);
            this.step_2_loading_button = false;
            this.$router.push("/"); // Ana sayfaya veya dashboarda yönlendir
          } else {
            alert(response.message || "Kod hatalı veya süresi dolmuş.");
            this.step_2_loading_button = false;
          }
        }
      } catch (error) {
        console.error("İşlem hatası:", error);
        alert("Sunucuyla iletişim kurulurken bir hata oluştu.");
        this.step_2_loading_button = false;
      }
    },
    async goToForgotPassword() {
      this.$router.push("/auth/change-password");
    },
  },
};
</script>
