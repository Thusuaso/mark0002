<template>
  <div class="mt-5">
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
              <InputText id="username" v-model="user.username" class="w-full" />
            </div>

            <div class="field">
              <label for="password">Password</label>
              <InputText
                id="password"
                v-model="user.password"
                class="w-full"
                type="password"
              />
            </div>

            <Message v-if="errorMessage" severity="error" :closable="false">
              {{ errorMessage }}
            </Message>

            <Button
              type="submit"
              label="İlerle"
              class="mt-3"
              :disabled="!canSubmitStep1 || nextStepLoading"
              :loading="nextStepLoading"
            />

            <div class="flex justify-content-end mt-1">
              <Button
                type="button"
                label="Şifremi Unuttum?"
                variant="link"
                class="p-0 text-sm"
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

            <Message v-if="errorMessage" severity="error" :closable="false">
              {{ errorMessage }}
            </Message>

            <Button
              type="submit"
              label="Giriş Yap"
              severity="success"
              class="mt-3"
              :disabled="step2Loading"
              :loading="step2Loading"
            />

            <Button
              type="button"
              label="Geri Dön"
              variant="text"
              class="text-sm"
              @click="backToStep1"
            />
          </div>
        </form>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/stores/auth"

definePageMeta({
  layout: "empty",
})

const auth = useAuthStore()
const todo = useTodoStore()
const router = useRouter()

const step = ref(1)
const otpCode = ref("")
const user = ref({ username: "", password: "" })
const nextStepLoading = ref(false)
const step2Loading = ref(false)
const errorMessage = ref("")

const canSubmitStep1 = computed(
  () => user.value.username.trim() !== "" && user.value.password !== "",
)

function backToStep1() {
  step.value = 1
  otpCode.value = ""
  errorMessage.value = ""
}

async function onSubmit() {
  errorMessage.value = ""

  try {
    if (step.value === 1) {
      nextStepLoading.value = true
      const res = await auth.requestOtp({
        username: user.value.username,
        password: user.value.password,
      })
      nextStepLoading.value = false

      if (res.status && res.step === "otp_sent") {
        step.value = 2
      } else {
        errorMessage.value =
          res.message || "Giriş bilgileri hatalı veya sunucu reddetti."
      }
      return
    }

    step2Loading.value = true
    const res = await auth.verifyOtp({
      username: user.value.username,
      code: otpCode.value,
    })
    step2Loading.value = false

    if (res.status) {
      /*
       * Todo listesini GIRISTE cek.
       *
       * NEDEN BURADA DA: navbar bunu kendi mounted()'inda cekiyor, ama
       * yalnizca ORADA cekmek kirilgan -- navbar zaten mount edilmisse
       * (ornegin isLoggedIn sonradan true olursa) mounted() bir daha
       * calismaz ve liste bos kalir. Nuxt 2 de girişte cekiyordu
       * (components/auth/authForm.vue:169).
       *
       * await EDILMIYOR: yonlendirmeyi bekletmesin; liste arka planda
       * dolar, navbar'daki badge reaktif oldugu icin kendiliginden
       * guncellenir.
       */
      todo.setToDoListByUsername(res.username)

      await router.push("/")
    } else {
      errorMessage.value = res.message || "Kod hatalı veya süresi dolmuş."
    }
  } catch (error) {
    nextStepLoading.value = false
    step2Loading.value = false
    errorMessage.value = "Sunucuyla iletişim kurulurken bir hata oluştu."
    console.error("Giriş hatası:", error)
  }
}

function goToForgotPassword() {
  return router.push("/auth/change-password")
}
</script>

<!--
  components/auth/authForm.vue -> app/pages/auth.vue

  ZORUNLU degisiklikler:
  [1] this.$axios.$post(...)    -> $fetch (store uzerinden)
  [2] this.$store.dispatch(...) -> Pinia store
  [3] middleware: ["navbarControl"] -> definePageMeta
  [4] class="p-button-link" / "p-button-text" -> variant="link" / variant="text"
      (PrimeVue 4'te p-button-* severity/variant siniflari kaldirildi)
  [5] class="p-button-success"  -> severity="success"
  [6] Options API -> <script setup> (bu dosya bastan yazildigi icin tercih edildi)

  DAVRANIS DEGISIKLIKLERI -- bilerek yapildi, dikkat:

  [A] GUVENLIK: Eski form `users` prop'u aliyor ve sifreyi ISTEMCIDE
      dogruluyordu (userObj.YSifre === val). O liste GET /api/users'tan
      geliyor, endpoint api/index.js'te openRoutes icinde -- yani kimlik
      dogrulamasi olmadan tum aktif kullanicilarin adi/maili/SIFRESI
      disariya aciliyor. Bu desen yeni koda TASINMADI: sifre artik yalnizca
      sunucuda (/login) dogrulaniyor, `users` prop'u tamamen kaldirildi.
      Buton artik iki alan da bos degilken aktif oluyor.
      NOT: asil sorun endpoint'in kendisi; o api/index.js'te hala duruyor
      ve ayrica duzeltilmeli.

  [B] alert() -> <Message severity="error">. alert() tarayici modal'i
      acip sayfayi bloke ediyordu.

  [C] Girisden sonra eski kod iki sey daha yapiyordu, pilota alinmadi:
      - dispatch("login_mailer") -> POST /mail/login/server, giris bildirim
        maili. Pilotun salt-okunur kilidi POST'u engelliyor; zaten pilot
        testlerinde her girişte mail gondermek istenmez.
      - dispatch("setToDoListByUsername") -> o sirada todo store'u henuz
        tasinmamisti. ARTIK GERI EKLENDI (yukaridaki verifyOtp dalinda):
        store tasindi ve yalnizca navbar mounted()'ina guvenmek kirilgandi.
      login_mailer hala pilota alinmadi; gercek migration'da geri eklenecek.
-->
