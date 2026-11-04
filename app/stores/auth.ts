import { defineStore } from "pinia"

/*
 * Vuex store/modules/auth.js karsiligi.
 *
 * Nuxt 2'de sessionControl, cerezi SSR'da context.req.headers.cookie'den
 * elle ayristiriyor, client'ta localStorage'a bakiyordu. Nuxt 3+'ta
 * useCookie ikisini birden hallediyor -- o dallanmanin tamami gitti.
 * (Ayrica eski kod process.isClient kullaniyordu; Nuxt 3+'ta yok.)
 */

export interface AuthUser {
  token: string | null
  userId: string | null
  username: string | null
  mail: string | null
}

/*
 * Istek yanitsiz kalirsa buton sonsuza kadar "yukleniyor"da kaliyor ve
 * kullanici hicbir geri bildirim gormuyor. Body parser eksikken Express
 * unhandledRejection ile olup hic yanit vermedigi icin tam olarak bu oldu.
 */
const REQUEST_TIMEOUT_MS = 30_000

const COOKIE_OPTS = {
  maxAge: 60 * 60 * 24 * 7, // eski kod Cookies.set(..., { expires: 7 })
  sameSite: "lax" as const,
  path: "/",
}

export const useAuthStore = defineStore("auth", () => {
  // useCookie SSR + client'ta ayni sekilde calisir ve reaktiftir
  const token = useCookie<string | null>("token", COOKIE_OPTS)
  const userId = useCookie<string | null>("userId", COOKIE_OPTS)
  const username = useCookie<string | null>("username", COOKIE_OPTS)
  const mail = useCookie<string | null>("mail", COOKIE_OPTS)

  const ayoStatus = ref(false)
  const authorityNavbarStatus = ref(false)

  // Vuex getters
  const isAuthenticated = computed(() => Boolean(token.value))
  const getUserId = computed(() => userId.value)
  const getUsername = computed(() => username.value)
  const getAyoStatus = computed(() => ayoStatus.value)

  function setAyoControlStatus(status: boolean) {
    ayoStatus.value = status
  }

  function setAuthorityNavbarStatus(status: boolean) {
    authorityNavbarStatus.value = status
  }

  function setUserId(id: string | null) {
    userId.value = id
  }

  /* 1. adim: kullanici adi + sifre -> sunucu OTP maili gonderir.
   * DIKKAT: bu cagri kayitli adrese GERCEK e-posta gonderir.
   * Sifre KASITLI olarak istemcide dogrulanmiyor (bkz. pages/auth.vue). */
  async function requestOtp(payload: { username: string; password: string }) {
    return await $fetch<{ status: boolean; step?: string; message?: string }>(
      "/api/login",
      { method: "POST", body: payload, timeout: REQUEST_TIMEOUT_MS },
    )
  }

  /* 2. adim: OTP kodu -> token */
  async function verifyOtp(payload: { username: string; code: string }) {
    const res = await $fetch<{
      status: boolean
      message?: string
      token?: string
      userId?: number
      username?: string
      mail?: string
    }>("/api/verify-otp", {
      method: "POST",
      body: payload,
      timeout: REQUEST_TIMEOUT_MS,
    })

    if (res.status && res.token) {
      token.value = res.token
      userId.value = String(res.userId ?? "")
      username.value = res.username ?? null
      mail.value = res.mail ?? null
    }

    return res
  }

  function logout() {
    token.value = null
    userId.value = null
    username.value = null
    mail.value = null
  }

  return {
    token,
    userId,
    username,
    mail,
    ayoStatus,
    authorityNavbarStatus,
    isAuthenticated,
    getUserId,
    getUsername,
    getAyoStatus,
    setAyoControlStatus,
    setAuthorityNavbarStatus,
    setUserId,
    requestOtp,
    verifyOtp,
    logout,
  }
})
