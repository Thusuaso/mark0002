/*
 * Nuxt 2 middleware/ayoControl.js karsiligi.
 *
 * ---------------------------------------------------------------------
 * NEDEN EKLENDI -- PILOTTA HIC TASINMAMISTI
 * ---------------------------------------------------------------------
 * Nuxt 2'de layouts/default.vue BES middleware calistiriyordu:
 *     ["sessionControl", "authControl", "navbarControl", "ayoControl", "auth-check"]
 * Pilota yalnizca auth-check tasinmisti.
 *
 * sessionControl ve authControl'un karsiligi ZATEN VAR (cerezler auth
 * store'unda useCookie ref'leriyle okunuyor, /auth yonlendirmesi
 * auth-check.global.ts icinde). Ama ayoControl ve navbarControl
 * tasinmadi ve ikisi de NAVBAR GORUNURLUGUNU belirliyor.
 *
 * Bu dosyanin eksikliginin somut sonucu: auth store'undaki ayoStatus
 * hicbir zaman true olmuyordu (baslangic degeri false ve onu set eden
 * baska kimse yok), dolayisiyla SharedNavbar'daki `v-show="getAyoStatus"`
 * ile korunan ALTI menu ogesi HERKESTEN gizliydi -- AYO yetkisi olan
 * kullanicilar dahil. Kullanici bunu "47 ile girdigimde navbarda her sey
 * gorunmuyor" olarak bildirdi.
 *
 * ".global" soneki: Nuxt 2'de layout'un middleware listesindeydi, yani
 * fiilen tum sayfalarda calisiyordu (bkz. auth-check.global.ts'teki
 * ayni not).
 *
 * KIMLIK LISTESI DEGISTIRILMEDI: Nuxt 2'deki AYO_USER_IDS ile birebir
 * ayni. 47 bu listede ZATEN vardi -- eksik olan sey liste degil, listeyi
 * uygulayan middleware'di.
 */
const AYO_USER_IDS = [13, 19, 47, 51, 57, 58, 59]

export default defineNuxtRouteMiddleware((to) => {
  /*
   * /auth haric: Nuxt 2'de giris ekrani `empty` layout'unu kullaniyor,
   * yani bu middleware orada CALISMIYORDU. Davranis korundu.
   */
  if (to.path.startsWith("/auth")) return

  const userId = useCookie<string | null>("userId").value

  useAuthStore().setAyoControlStatus(
    AYO_USER_IDS.includes(parseInt(String(userId), 10))
  )
})
