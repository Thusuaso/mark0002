/*
 * plugins/axios.js karsiligi.
 *
 * Orijinalde @nuxtjs/axios'a bir onRequest interceptor'i takiliydi:
 * her istekte token cerezini okuyup
 *   Authorization: Bearer <token>
 * basligini ekliyordu. api/index.js'teki authenticateToken token'i
 * CEREZDEN DEGIL, bu basliktan okuyor:
 *   const authHeader = req.headers["authorization"]
 * Bu yuzden baslik olmadan her korumali uc 401 doner.
 *
 * Nuxt 2 plugin'i process.server / process.client ayrimi yapip cerezi
 * req.headers.cookie veya document.cookie'den ayristiriyordu; useCookie
 * ikisini birden hallediyor.
 *
 * baseURL "/api": orijinal axios yapilandirmasiyla ayni, boylece store'lar
 * "/suppliers", "/supplier/save" gibi yollari oldugu gibi kullanabiliyor.
 */
export function useApi() {
  const token = useCookie<string | null>("token")

  return $fetch.create({
    baseURL: "/api",

    onRequest({ options }) {
      if (token.value) {
        options.headers.set("Authorization", `Bearer ${token.value}`)
      }
    },

    onResponseError({ response }) {
      if (response.status === 401 || response.status === 403) {
        console.warn("Yetkisiz işlem veya token süresi doldu!")
      }
    },
  })
}
