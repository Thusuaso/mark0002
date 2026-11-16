import { isMobileAllowed } from "~/utils/mobileRoutes"

/*
 * ANDROID KABUGUNDA KAPSAM DISI EKRANLARI KAPAT.
 *
 * Menuden gizlemek YETMEZ: adres cubugu olmasa bile uygulama icindeki
 * bir <NuxtLink>, bir yonlendirme ya da kayitli bir derin baglanti
 * kapsam disi bir ekrani acabilir. Gorunurluk bir kisitlama degildir;
 * kapi burada kapaniyor.
 *
 * [!] WEB ETKILENMIYOR. isMobile yalnizca MOBILE_BUILD=1 ile uretilen
 * pakette true; tarayicidan girildiginde bu middleware hicbir sey
 * yapmadan donuyor ve 66 rotanin hepsi eskisi gibi acik.
 *
 * Bu bir YETKI sinirı DEGIL, kapsam sinirı: hangi ekranlarin telefonda
 * anlamli oldugu kararı. Yetki ayri ve sunucuda (api/index.js
 * authenticateToken) + app/middleware/authority.ts.
 */
export default defineNuxtRouteMiddleware((to) => {
  if (!useRuntimeConfig().public.isMobile) return

  if (!isMobileAllowed(to.path)) {
    return navigateTo("/")
  }
})
