/*
 * Nuxt 2 middleware/auth-check.js karsiligi.
 *
 * Eski kod token'i iki ayri yoldan okuyordu: SSR'da req.headers.cookie'yi
 * elle ayristirip, client'ta document.cookie'ye bakiyordu; JWT payload'ini
 * cozmek icin de ortama gore Buffer.from vs window.atob seciyordu.
 * Nuxt 3+'ta useCookie ve Buffer/atob secimi tek bir yerde toplandi.
 *
 * ".global" soneki: Nuxt 2'de bu middleware layouts/default.vue'nun
 * middleware listesindeydi, yani fiilen tum sayfalarda calisiyordu.
 */

function decodeJwtPayload(token: string): { exp?: number } | null {
  try {
    const part = token.split(".")[1]
    if (!part) return null

    const base64 = part.replace(/-/g, "+").replace(/_/g, "/")

    const json = import.meta.server
      ? Buffer.from(base64, "base64").toString("utf-8")
      : atob(base64)

    return JSON.parse(json)
  } catch {
    return null
  }
}

export default defineNuxtRouteMiddleware((to) => {
  // giris ekranlari serbest
  if (to.path.startsWith("/auth")) return

  const token = useCookie<string | null>("token").value
  if (!token) return navigateTo("/auth")

  const payload = decodeJwtPayload(token)
  if (!payload) return navigateTo("/auth")

  if (typeof payload.exp === "number") {
    const now = Math.floor(Date.now() / 1000)
    if (payload.exp < now) return navigateTo("/auth")
  }
})
