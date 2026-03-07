<template>
  <Card style="width: 25rem; margin: 0px auto">
    <template #title>
      <div class="text-center">Şifre Değiştirme</div>
    </template>
    <template #content>
      <form v-if="step === 1" @submit.prevent="sendMailCode">
        <div class="flex flex-column gap-3">
          <p class="text-sm text-center">
            Şifrenizi değiştirmek için sistemde kayıtlı mail adresinizi girin.
          </p>
          <div class="field">
            <label for="email">Mail Adresi</label>
            <InputText
              id="email"
              v-model="email"
              class="w-full"
              type="email"
              required
            />
          </div>
          <Button
            type="submit"
            label="Kod Gönder"
            class="mt-3"
            :disabled="!email || step_1_loading_button"
            :loading="step_1_loading_button"
          />
          <Button
            type="button"
            label="Geri"
            @click="goBack"
            class="p-button-primary"
          />
        </div>
      </form>

      <form v-else @submit.prevent="changePassword">
        <div class="flex flex-column gap-3">
          <p class="text-sm text-green-600 text-center font-bold">
            Mailinize gelen kodu ve şifre bilgilerinizi girin.
          </p>

          <div class="field">
            <label>Mail Doğrulama Kodu</label>
            <InputText
              v-model="code"
              class="w-full text-center"
              placeholder="000000"
              maxlength="6"
              required
            />
          </div>

          <div class="field">
            <label>Eski Şifreniz</label>
            <InputText
              v-model="oldPassword"
              class="w-full"
              type="password"
              required
            />
          </div>

          <div class="field">
            <label>Yeni Şifre</label>
            <InputText
              v-model="newPassword"
              class="w-full"
              type="password"
              required
            />
            <div
              v-if="newPassword.length > 0 && passwordErrors.length > 0"
              class="mt-2 p-2 bg-red-100 border-round text-xs text-red-600"
            >
              <div v-for="(error, index) in passwordErrors" :key="index">
                • {{ error }}
              </div>
            </div>
          </div>

          <div class="field">
            <label>Yeni Şifre (Tekrar)</label>
            <InputText
              v-model="confirmPassword"
              class="w-full"
              type="password"
              required
            />
            <small
              v-if="confirmPassword && !doPasswordsMatch"
              class="p-error block mt-1"
              >Şifreler birbiriyle eşleşmiyor.</small
            >
          </div>

          <Button
            type="submit"
            label="Şifremi Değiştir"
            class="mt-3 p-button-success"
            :disabled="!canSubmit || step_2_loading_button"
            :loading="step_2_loading_button"
          />
          <Button
            type="button"
            label="İptal"
            class="p-button-text text-sm"
            @click="cancel"
          />
        </div>
      </form>
    </template>
  </Card>
</template>

<script>
export default {
  data() {
    return {
      step: 1,
      email: "",
      code: "",
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      step_1_loading_button: false,
      step_2_loading_button: false,
    };
  },
  computed: {
    // Şifre kurallarını anlık kontrol eden alan
    passwordErrors() {
      const errors = [];
      if (!/.{6,}/.test(this.newPassword))
        errors.push("En az 6 karakter olmalı.");
      if (!/[A-Z]/.test(this.newPassword))
        errors.push("En az 1 büyük harf içermeli.");
      if (!/[a-z]/.test(this.newPassword))
        errors.push("En az 1 küçük harf içermeli.");
      if (!/\d/.test(this.newPassword)) errors.push("En az 1 sayı içermeli.");
      if (!/[!@#$%^&*(),.?":{}|<>_+\-]/.test(this.newPassword))
        errors.push("En az 1 özel sembol içermeli.");
      return errors;
    },
    isPasswordValid() {
      return this.newPassword.length > 0 && this.passwordErrors.length === 0;
    },
    doPasswordsMatch() {
      return this.newPassword === this.confirmPassword;
    },
    // Tüm kurallar sağlanmazsa butonu pasif bırakır
    canSubmit() {
      return (
        this.code.length === 6 &&
        this.oldPassword.length > 0 &&
        this.isPasswordValid &&
        this.doPasswordsMatch
      );
    },
  },
  methods: {
    async goBack() {
      this.$router.push("/auth");
    },
    async sendMailCode() {
      this.step_1_loading_button = true;
      try {
        // Backend'e maili gönderip, SQL'de Aktif mi kontrol ettiriyoruz
        const response = await this.$axios.$post("/forgot-password-init", {
          email: this.email,
        });

        if (response.status) {
          alert("Mailinize doğrulama kodu gönderildi.");
          this.step = 2;
          this.step_1_loading_button = false;
        } else {
          alert(
            response.message ||
              "Bu mail adresine ait aktif bir hesap bulunamadı."
          );
          this.step_1_loading_button = false;
        }
      } catch (error) {
        alert("Sunucuyla iletişim kurulamadı.");
        this.step_1_loading_button = false;
      }
    },
    async changePassword() {
      this.step_2_loading_button = true;
      try {
        const response = await this.$axios.$post("/change-password", {
          email: this.email,
          code: this.code,
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
        });

        if (response.status) {
          alert(
            "Şifreniz başarıyla değiştirildi! Yeni şifrenizle giriş yapabilirsiniz."
          );
          this.step_2_loading_button = false;
          // İşlem bitince ana giriş sayfasına veya dashboarda yönlendir
          this.$router.push("/auth");
        } else {
          alert(
            response.message || "İşlem başarısız. Bilgilerinizi kontrol edin."
          );
          this.step_2_loading_button = false;
        }
      } catch (error) {
        alert("Sunucu hatası oluştu.");
        this.step_2_loading_button = false;
      }
    },
    async cancel() {
      await this.$cookie.remove("userId");
      await this.$store.dispatch("setAuthorityNavbarStatus", false);
      this.$router.push("/auth");
    },
  },
};
</script>
