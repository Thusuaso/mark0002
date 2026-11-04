/*
 * Guvenlik agi: loading sayacini client baslangicinda sifirla.
 *
 * shared store'daki `loading` bir sayac ve Pinia state'inin parcasi oldugu
 * icin SSR payload'i ile tarayiciya tasiniyor. Bir sayfa veriyi SSR'in
 * beklemedigi bir yerde cekerse (ornegin created() icinde, Nuxt 2'den
 * oldugu gibi tasinmis bir sayfa), payload begin'den sonra end'den once
 * serialize edilir ve loading=1 olarak gelir. Client bunu devralir,
 * kendi istegiyle 2 yapar, bitince 1'e doner ve orada KALIR -- veriler
 * yuklenmesine ragmen spinner sonsuza kadar doner.
 *
 * Asil cozum sayfanin useAsyncData kullanmasi (bkz. pages/operation/
 * supplier.vue). Bu plugin yalnizca o deseni kacirmis bir sayfanin tum
 * uygulamayi kilitlemesini engelliyor: hydration'dan sonra sayac her
 * durumda temiz baslar.
 */
export default defineNuxtPlugin(() => {
  const shared = useSharedStore()

  if (shared.loading !== 0) {
    console.warn(
      `[reset-loading] SSR payload'inda loading=${shared.loading} geldi, sifirlandi. ` +
        `Bir sayfa veriyi SSR'in bekledigi bir yerde cekmiyor olabilir.`,
    )
    shared.loading = 0
  }

  if (shared.loadingDatatable !== 0) {
    console.warn(
      `[reset-loading] SSR payload'inda loadingDatatable=${shared.loadingDatatable} geldi, sifirlandi.`,
    )
    shared.loadingDatatable = 0
  }
})
