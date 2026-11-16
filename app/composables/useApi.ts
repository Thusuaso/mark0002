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

  /*
   * apiOrigin + apiBase. Web'de apiOrigin BOS, apiBase "/api", yani
   * baseURL eskisi gibi "/api" -- davranis degismiyor. Android kabugunda
   * sayfa https://localhost'tan geldigi icin goreli "/api" yanlis yere
   * gider; orada apiOrigin uretim adresini veriyor ve baseURL
   * "https://gozv2.mekmar.com/api" oluyor.
   */
  const cfg = useRuntimeConfig().public
  const baseURL = `${cfg.apiOrigin || ""}${cfg.apiBase || "/api"}`

  return $fetch.create({
    baseURL,

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
