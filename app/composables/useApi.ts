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

  /* Store ornegi BURADA aliniyor: onResponseError Nuxt baglaminin
     disinda calisiyor ve orada useAuthStore() cagrilamaz. */
  const auth = useAuthStore()

  /*
   * apiOrigin + apiBase. Web'de apiOrigin BOS, apiBase "/api", yani
   * baseURL eskisi gibi "/api" -- davranis degismiyor. Android kabugunda
   * sayfa https://localhost'tan geldigi icin goreli "/api" yanlis yere
   * gider; orada apiOrigin uretim adresini veriyor ve baseURL
   * "https://goz.mekmar.com/api" oluyor.
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

    /*
     * OTURUM GECERSIZSE GIRISE GONDER.
     *
     * Eskiden burada yalnizca console.warn vardi: kullanici bozuk bir
     * ekranla kaliyor, her istek sessizce dusuyor ve ne oldugunu
     * anlamiyordu. Gercek bir vakada ortaya cikti -- site
     * gozv2.mekmar.com'dan goz.mekmar.com'a tasinince, tarayicida o
     * host icin ESKI sistemden kalma bir `token` cerezi duruyordu.
     * Istemci onu gonderiyor, yeni sunucunun JWT_SECRET'i farkli oldugu
     * icin dogrulama basarisiz oluyor ve HER istek 403 donuyordu.
     *
     * 401 ile 403 AYRIMI (api/index.js authenticateToken):
     *   401 = token YOK
     *   403 = token var ama dogrulanamiyor (yanlis sir, suresi dolmus)
     * Ikisinde de yapilacak sey ayni: oturumu temizle, girise gonder.
     *
     * TEMIZLEMEK SART: yalnizca yonlendirmek sonsuz donguye girer --
     * /auth yine ayni gecersiz cerezle aciliyor olurdu.
     */
    onResponseError({ response }) {
      if (response.status !== 401 && response.status !== 403) return

      /* Sunucuda yonlendirme yapilmaz; bu uclar zaten yalnizca
         istemciden cagriliyor (bkz. server: false notlari). */
      if (import.meta.server) return

      /*
       * [!] BURADA useRoute()/navigateTo CAGRILMIYOR, BILEREK.
       * Bu kanca istek bittikten SONRA, Nuxt baglaminin disinda
       * tetikleniyor; oradan composable cagirmak "nuxt instance
       * unavailable" veriyor. Ihtiyac duyulan tek sey yol bilgisi ve
       * yonlendirme -- ikisi de tarayicidan dogrudan alinabiliyor.
       */
      if (window.location.pathname.startsWith("/auth")) return

      console.warn(`Oturum gecersiz (${response.status}) -- girise yonlendiriliyor.`)

      /* Store ornegi YUKARIDA, baglam icindeyken alindi. */
      auth.logout()

      /*
       * TAM SAYFA YENILEME, router yonlendirmesi degil: gecersiz cerez
       * senaryosunda bellekteki durum da bayat olabiliyor; bastan
       * acilmak temiz bir baslangic veriyor.
       *
       * replace(): bozuk sayfa gecmise girmesin, geri tusu oraya
       * dondurmesin.
       */
      window.location.replace("/auth")
    },
  })
}
