import { formatters } from "~/utils/formatters"

/*
 * Nuxt 2'deki `Vue.mixin({ methods: formatters })` karsiligi.
 *
 * NEDEN GEREKLI:
 * Vue 3'te filter destegi yok, bu yuzden codemod 875 kullanimı
 *   {{ tutar | formatPriceUsd }}  ->  {{ formatPriceUsd(tutar) }}
 * bicimine cevirdi. Ama bu artik sablonda duz bir FONKSIYON CAGRISI,
 * yani sablonun erisebildigi bir isim olmasi gerekiyor.
 *
 * utils/ klasorundeki export'lar Nuxt tarafindan auto-import edilir, ancak
 * bu yalnizca <script>/<script setup> icinde gecerlidir. Options API
 * sablonlari isimleri component ornegi uzerinden cozer -- auto-import
 * edilmis yardimcilar oraya ULASMAZ. Tasinan sayfalarin cogu Options API
 * oldugu icin fonksiyonlar globalProperties'e kaydediliyor; boylece hem
 * Options API hem script setup sablonlarinda calisiyorlar.
 *
 * DIKKAT: buradaki dateToString GOSTERIM icindir -> "02-10-2026".
 * API'ye tarih YAZARKEN utils/dates.ts icindeki toIsoDate kullanilmali
 * -> "2026-10-02". Ikisi ayni isimde olup ters cikti uretiyordu; bkz.
 * utils/dates.ts basindaki uyari.
 */
export default defineNuxtPlugin((nuxtApp) => {
  for (const [name, fn] of Object.entries(formatters)) {
    nuxtApp.vueApp.config.globalProperties[name] = fn
  }
})
