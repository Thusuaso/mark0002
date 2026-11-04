// Nuxt 2 middleware/authority.js karsiligi.
// Nuxt 2: context.req / context.$cookie / context.redirect
// Nuxt 3+: defineNuxtRouteMiddleware + useCookie (SSR+client ayrimi gereksiz)
const BLOCKED = [48, 54, 56, 62]

export default defineNuxtRouteMiddleware(() => {
  const userId = useCookie<string>("userId")
  if (userId.value && BLOCKED.includes(Number(userId.value))) {
    return navigateTo("/")
  }
})
