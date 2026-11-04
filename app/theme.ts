/*
 * PrimeVue tema yapilandirmasi.
 *
 * Neden ayri bir dosya:
 *
 * 1) nuxt.config.ts'in tepesinden `import Aura from "@primeuix/themes/aura"`
 *    yapilamiyor -- paket ESM-only, Nuxt'un config yukleyicisi (jiti) CJS
 *    cozumleme yaptigi icin "Cannot find module" veriyor.
 *
 * 2) Modulun importTheme secenegi bu dosyayi Vite'in isledigi plugin'e
 *    enjekte eder, yani import burada sorunsuz calisir.
 *
 * 3) @primevue/nuxt-module sunu uretiyor:
 *        Theme.setTheme(<importTheme.as> || options?.theme)
 *    yani import edilen DEGER setTheme'e dogrudan gidiyor. setTheme tam bir
 *    tema nesnesi ({ preset, options }) bekler, ciplak preset degil.
 *    Dolayisiyla burada preset'i sarmalayip disa veriyoruz.
 *
 * Daha once `as` verilmedigi icin modul "import undefined from ..." uretmis,
 * Theme.setTheme(undefined) calismis ve tema degiskenleri style etiketine
 * literal "undefined" olarak basilmisti -- tum var(--p-*) referanslari bosa
 * dusuyor, arayuz bu yuzden bozuk gorunuyordu.
 */
import Aura from "@primeuix/themes/aura"

export default {
  preset: Aura,
  options: {
    darkModeSelector: ".app-dark",
  },
}
