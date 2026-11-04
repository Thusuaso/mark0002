<template>
  <ChangePasswordForm />
</template>

<script setup>
/*
 * pages/auth/change-password.vue
 *
 * ELLE YAPILAN ZORUNLU DEGISIKLIKLER:
 *
 * [x] `layout: "empty"` -> definePageMeta({ layout: "empty" })
 *     Options API'deki `layout` anahtari Nuxt 3+'ta YOK SAYILIR --
 *     hata vermez, sayfa sessizce DEFAULT layout ile acilir. Burada bu
 *     gorunur bir hata olurdu: sifre degistirme ekrani oturum ACIK
 *     OLMADAN da acilabildigi icin navbar'siz tasarlanmis.
 *
 * [x] `auth: "guest"` KALDIRILDI -- OLU YAPILANDIRMA.
 *     O anahtar @nuxtjs/auth modulune ait; bu proje o modulu HIC
 *     kullanmiyor (kimlik dogrulama kendi JWT'si ve
 *     middleware/auth-check.global.ts ile yapiliyor). Nuxt 2'de de
 *     hicbir sey yapmiyordu.
 *
 * MIDDLEWARE GEREKMIYOR: global auth-check.global.ts `/auth` ile
 * baslayan yollari ZATEN muaf tutuyor, yani bu sayfa token olmadan da
 * acilabiliyor -- sifre degistirme akisi icin dogrusu bu.
 */
definePageMeta({ layout: "empty" })
</script>
