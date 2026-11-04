import { defineStore } from "pinia"

/*
 * store/modules/local.js -> Pinia
 *
 * Vuex modulu tek bir sabitten olusuyordu: Excel sunucusunun adresi.
 * 29 dosya bunu `getLocalUrl` getter'i uzerinden okuyor, bu yuzden
 * getter adi KORUNDU -- cagri yerleri degismesin.
 *
 * Tek davranis farki: deger artik kaynak kodda gomulu degil,
 * runtimeConfig.public.excelServerBase'ten geliyor (bkz. nuxt.config.ts).
 * Nuxt 2'de yerel adrese gecmek icin dosyadaki yorumu tersine cevirmek
 * gerekiyordu; simdi NUXT_PUBLIC_EXCEL_SERVER_BASE yetiyor.
 *
 * Not: bu bir "store" olmayi hak etmiyor -- state'i yok, yalnizca config
 * okuyor. Cagri yerleri mapGetters'tan kurtuldukca dogrudan
 * useRuntimeConfig() kullanilip bu dosya silinebilir.
 */
export const useLocalStore = defineStore("local", {
  getters: {
    getLocalUrl: () => useRuntimeConfig().public.excelServerBase,
  },
})
