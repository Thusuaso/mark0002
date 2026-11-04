/*
 * Nuxt 2 middleware/navbarControl.js karsiligi.
 *
 * ---------------------------------------------------------------------
 * NEDEN EKLENDI -- DUSMUS BIR KISITLAMA
 * ---------------------------------------------------------------------
 * Bu middleware pilota HIC TASINMAMISTI (ayrinti: ayo-control.global.ts
 * basindaki not -- layout'un bes middleware'inden yalnizca biri
 * tasinmisti).
 *
 * Eksikliginin sonucu ayo-control'dekinin TERSI yonde: authority
 * store'undaki authorityStatus hicbir zaman true olmuyordu, dolayisiyla
 * SharedNavbar'daki `v-show="!getAuthorityStatus"` ile korunan TUM menu
 * ogeleri HERKESE goruniyordu -- asagidaki KISITLI kullanicilar dahil.
 *
 * Yani pilot, Nuxt 2'de var olan bir YETKI KISITLAMASINI sessizce
 * kaldirmis durumdaydi. Bu dosya onu geri getiriyor.
 *
 * DIKKAT -- bu bir GORUNURLUK kisitlamasi, guvenlik siniri DEGIL:
 * menuyu gizlemek sayfalari erisilemez yapmaz. Sayfa duzeyindeki
 * engelleme ayri ve app/middleware/authority.ts icinde
 * (BLOCKED = [48, 54, 56, 62] -- ayni dort kimlik).
 *
 * KIMLIK LISTESI DEGISTIRILMEDI: Nuxt 2 ile birebir ayni.
 * 47 bu listede DEGIL, yani tam navbar'i gormeye devam ediyor.
 */
const RESTRICTED_USER_IDS = [48, 54, 56, 62]

export default defineNuxtRouteMiddleware((to) => {
  /* /auth haric -- gerekcesi ayo-control.global.ts icinde. */
  if (to.path.startsWith("/auth")) return

  const userId = useCookie<string | null>("userId").value

  useAuthorityStore().setAuthorityNavbarStatus(
    RESTRICTED_USER_IDS.includes(parseInt(String(userId), 10))
  )
})
