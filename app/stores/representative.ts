import { defineStore } from "pinia"

/*
 * Vuex store/modules/representative.js karsiligi.
 *
 * Donusumler (pilot genelindeki kurallar):
 *   this.$axios  -> useApi()        (govdeyi DOGRUDAN donduruyor)
 *   this.$toast  -> useAppToast()
 *   vuexContext.commit(...) / dispatch(...) -> dogrudan eylem cagrisi
 */

/* GET /sales/representative/list govdesi (api/index.js:1590) */
export interface RepresentativeRow {
  SiparisNo: string
  SiparisSahibi: string
  Operasyon: string
}

export interface RepresentativeTotal {
  SiparisSahibi?: string
  Operasyon?: string
  Total: number
}

export interface RepresentativeChange {
  siparisSahibiId: number
  SiparisSahibi: string
  operasyonId: number
  Operasyon: string
  SiparisNo: string
}

export const useRepresentativeStore = defineStore("representative", {
  state: () => ({
    representativeList: [] as RepresentativeRow[],
    totalRepresentative: [] as RepresentativeTotal[],
    totalOperation: [] as RepresentativeTotal[],
  }),

  getters: {
    getRepresentativeList: (state) => state.representativeList,
    getTotalRepresentative: (state) => state.totalRepresentative,
    getTotalOperation: (state) => state.totalOperation,
  },

  actions: {
    /*
     * Vuex'te action ve mutation'in ADI AYNIYDI (setRepresentativeList) --
     * ayri isim uzaylarinda oldugu icin cakismiyorlardi. Mutation tek
     * isti uc alani state'e dagitmakti, bu yuzden MUT_ onekli ayri bir
     * eylem yazmak yerine action'in icine alindi (ayni yaklasim:
     * stores/home.ts).
     *
     * Uc, UC AYRI LISTE donduruyor:
     *   representative      -> satir listesi
     *   totalRepresentative -> satici bazinda toplam
     *   totalOperation      -> operasyon bazinda toplam
     * Yalnizca biri gelmezse digerleri `?? []` ile bos kaliyor; Nuxt
     * 2'de boyle bir koruma yoktu ve eksik alan state'e `undefined`
     * olarak yaziliyordu (DataTable :value="undefined" alirdi).
     */
    async setRepresentativeList() {
      try {
        const api = useApi()
        const res = await api<{
          representative: RepresentativeRow[]
          totalRepresentative: RepresentativeTotal[]
          totalOperation: RepresentativeTotal[]
        }>("/sales/representative/list")

        this.representativeList = res?.representative ?? []
        this.totalRepresentative = res?.totalRepresentative ?? []
        this.totalOperation = res?.totalOperation ?? []
      } catch (err) {
        console.error("setRepresentativeList basarisiz:", err)
        this.representativeList = []
        this.totalRepresentative = []
        this.totalOperation = []
      }
    },

    async setRepresentativeChange(representative: RepresentativeChange) {
      const toast = useAppToast()
      try {
        const api = useApi()
        const res = await api<{ status: boolean }>(
          "/sales/representative/change",
          { method: "PUT", body: representative },
        )

        if (res.status) {
          toast.success("Başarıyla Güncellendi.")
          await this.setRepresentativeList()
        } else {
          toast.error("Güncelleme Başarısız.")
        }
      } catch (err) {
        /*
         * Nuxt 2'de .catch() YOKTU: istek HTTP hatasiyla donerse
         * (403/500) ne toast cikiyor ne konsola bir sey basiliyordu --
         * kullanici "Change" dugmesine basiyor ve HICBIR SEY olmuyordu.
         */
        console.error("setRepresentativeChange basarisiz:", err)
        toast.error("Güncelleme Başarısız.")
      }
    },
  },
})
