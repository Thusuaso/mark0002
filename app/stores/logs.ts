import { defineStore } from "pinia"

/*
 * Vuex store/modules/logs.js + plugins/logs.js karsiligi.
 *
 * Nuxt 2'de ikiye bolunmustu: plugins/logs.js yalnizca bir sarmalayiciydi
 *
 *     const logs = { save(payload) { context.store.dispatch('setLogs', payload) } }
 *     inject('logs', logs)
 *
 * yani `this.$logs.save(x)` cagrisi dogrudan `dispatch('setLogs', x)`
 * demekti. Araya giren katmanin hicbir isi yoktu; Pinia'da store'a
 * dogrudan erisildigi icin plugin'e karsilik gelen bir dosya yazilmadi.
 *
 * Vuex modulu state/mutations/getters bolumlerini BOS tanimliyordu
 * (kullanilmiyordu) -- burada yalnizca eylem var.
 */
export interface LogEntry {
  description: string
  po?: string
  color?: string
}

export const useLogsStore = defineStore("logs", {
  actions: {
    /*
     * Nuxt 2'de kullanici adi `this.$cookie.get('username')` ile, tarih
     * ise `new Date()` ile ISTEMCIDE uretiliyordu. Ikisi de birebir
     * korundu -- sunucunun bekledigi govde bu.
     *
     * NOT: tarih istemci saatinden geliyor, yani kullanicinin makinesi
     * yanlis saatteyse log kaydi yanlis zamanli olur. Sunucuda uretmek
     * daha dogru olurdu ama bu api/index.js'i degistirmek demek.
     */
    async setLogs(payload: LogEntry) {
      const toast = useAppToast()
      try {
        const api = useApi()
        const res = await api<{ status: boolean }>("/logs/save", {
          method: "POST",
          body: {
            ...payload,
            username: useCookie("username").value,
            date: new Date(),
          },
        })

        if (res.status) {
          toast.success("Loglara Eklendi.")
        } else {
          toast.error("Loglara Eklenemedi.")
        }
      } catch (err) {
        /*
         * Nuxt 2'de .catch() YOKTU: log istegi hata verirse hicbir iz
         * kalmiyordu. Log kaydi ikincil bir is oldugu icin basarisizligi
         * KULLANICIYA gosterilen bir hata haline getirmek dogru degil --
         * ama konsolda iz olmali.
         */
        console.error("setLogs basarisiz:", err)
        toast.error("Loglara Eklenemedi.")
      }
    },
  },
})
