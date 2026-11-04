import { defineStore } from "pinia"

/*
 * Vuex store/modules/transport.js karsiligi.
 *
 * MUT_ oneki GEREKMEDI: iki mutation (setCompanyList, setTransportList)
 * yalnizca kendi action'larindan commit ediliyordu; hicbir bilesen
 * dogrudan commit() cagirmiyor. Ikisi de cagiran action'in icine alindi.
 *
 * YUKLEME SAYACI: Vuex'teki setBeginLoadingAction / setEndLoadingAction
 * pilotta shared store'a tasindi ve artik BOOLEAN DEGIL SAYAC
 * (beginLoading / endLoading -- bkz. app/stores/shared.ts).
 */

export interface TransportCompany {
  ID: number
  FirmaAdi: string
  Telefon: string | null
  MailAdresi: string | null
  Notlar: string | null
}

export interface TransportRow {
  NakliyeID: number
  SiparisFaturaID: number
  Tarih: string | null
  SiparisNo: string | null
  firma_adi: string | null
  FaturaNo: string | null
  Tutar: number
  Kur: number
  link: string | null
}

export interface TransportCompanyInput {
  companyname: string | null
  mail: string | null
  phone: string | null
  description: string | null
}

export const useTransportStore = defineStore("transport", {
  state: () => ({
    companyList: [] as TransportCompany[],
    transportList: [] as TransportRow[],
  }),

  getters: {
    getCompanyList: (state) => state.companyList,
    getTransportList: (state) => state.transportList,
  },

  actions: {
    async setCompanyList() {
      try {
        const api = useApi()
        const res = await api<{ company: TransportCompany[] }>(
          "/transport/company/list",
        )
        this.companyList = res?.company ?? []
      } catch (err) {
        console.error("setCompanyList basarisiz:", err)
        this.companyList = []
      }
    },

    /*
     * DUZELTILDI -- BASARISIZLIKTA YESIL TOAST GOSTERILIYORDU.
     *
     * Nuxt 2'deki hali:
     *     } else {
     *       this.$toast.success('Kaydetme Başarısız.');
     *     }
     * Basarisizlik dalinda success() cagriliyordu, yani kullanici
     * "Başarısız" yazan YESIL bir toast goruyordu: mesaj olumsuz, renk
     * olumlu. error() oldu.
     *
     * (Ayni hata todo store'unda iki, sales store'unda bir yerde daha
     *  vardi -- commit ebaf74f33.)
     */
    async setCompanySave(company: TransportCompanyInput) {
      const toast = useAppToast()
      try {
        const api = useApi()
        const res = await api<{ status: boolean }>("/transport/company/save", {
          method: "POST",
          body: company,
        })

        if (res.status) {
          toast.success("Başarıyla Kaydedildi.")
          await this.setCompanyList()
        } else {
          toast.error("Kaydetme Başarısız.")
        }
      } catch (err) {
        console.error("setCompanySave basarisiz:", err)
        toast.error("Kaydetme Başarısız.")
      }
    },

    async setTransportSave(transport: unknown) {
      const toast = useAppToast()
      try {
        const api = useApi()
        const res = await api<{ status: boolean }>("/transport/list/save", {
          method: "POST",
          body: transport,
        })

        if (res.status) {
          toast.success("Başarıyla Kaydedildi.")
        } else {
          toast.error("Kaydetme Başarısız")
        }
      } catch (err) {
        console.error("setTransportSave basarisiz:", err)
        toast.error("Kaydetme Başarısız")
      }
    },

    async setTransportFileSave(transport: unknown) {
      const toast = useAppToast()
      try {
        const api = useApi()
        const res = await api<{ status: boolean }>(
          "/transport/file/list/save",
          { method: "POST", body: transport },
        )

        if (res.status) {
          toast.success("Başarıyla Kaydedildi.")
        } else {
          toast.error("Kaydetme Başarısız")
        }
      } catch (err) {
        console.error("setTransportFileSave basarisiz:", err)
        toast.error("Kaydetme Başarısız")
      }
    },

    /*
     * DUZELTILDI -- YUKLEME SAYACI SIZINTISI.
     *
     * Nuxt 2'de endLoading YALNIZCA .then() icinde cagriliyordu, .catch()
     * hic yoktu. Istek hata verirse sayac EKSIK KALIYOR ve tam ekran
     * yukleme katmani EBEDIYEN acik kaliyordu -- kullanici sayfayi
     * yenilemek zorunda. endLoading() artik finally icinde.
     */
    async setTransportList() {
      const shared = useSharedStore()
      shared.beginLoading()
      try {
        const api = useApi()
        const res = await api<{ transport: TransportRow[] }>("/transport/list")
        this.transportList = res?.transport ?? []
      } catch (err) {
        console.error("setTransportList basarisiz:", err)
        this.transportList = []
      } finally {
        shared.endLoading()
      }
    },

    /*
     * DUZELTILDI -- `new Promise` SARMALAYICISI VE REJECT KALDIRILDI.
     *
     * Nuxt 2'deki hali iki eylemi de elle bir Promise'e sariyordu:
     *
     *     setUpdateTransport(ctx, t) {
     *       return new Promise((resolve, reject) => {
     *         this.$axios.put(...).then(response => {
     *           if (response.data.status) { ...; resolve(true) }
     *           else { resolve(false) }
     *         })        // <-- .catch() YOK
     *       })
     *     }
     *
     * Iki sorun:
     *
     * [1] .catch() yoktu. Istek HTTP hatasiyla donerse (403/500) ic
     *     promise reddolur, dis promise ise NE resolve NE reject olur --
     *     yani SONSUZA KADAR BEKLEMEDE kalir. Cagiran taraf
     *     beginLoading() cagirdiktan sonra .then()'e hic girmez, yani
     *     endLoading() HIC CAGRILMAZ: tam ekran yukleme katmani ebediyen
     *     acik kalir.
     *
     * [2] setDeleteTransport basarisizlikta resolve(false) DEGIL
     *     reject(false) yapiyordu. Cagiran taraftaki zincirde .catch()
     *     olmadigi icin bu bir YAKALANMAMIS REDDETME (unhandled
     *     rejection) uretiyor ve ayni sekilde endLoading cagrilmiyordu.
     *
     * Artik ikisi de duz async: basarida true, basarisizlikta false
     * donuyor; istek hatasi da false'a cevriliyor ve konsola yaziliyor.
     * Cagiran tarafin sozlesmesi (truthy/falsy) AYNI kaldi.
     */
    async setUpdateTransport(transport: unknown): Promise<boolean> {
      try {
        const api = useApi()
        const res = await api<{ status: boolean }>("/transport/list/update", {
          method: "PUT",
          body: transport,
        })

        if (!res.status) return false

        await this.setTransportList()
        return true
      } catch (err) {
        console.error("setUpdateTransport basarisiz:", err)
        return false
      }
    },

    /*
     * Gerekcesi setUpdateTransport'un basinda.
     *
     * NOT: silme ucu DELETE DEGIL PUT kullaniyor
     * (PUT /transport/list/delete) -- legacy API'nin tasarimi, birebir
     * korundu.
     */
    async setDeleteTransport(transport: unknown): Promise<boolean> {
      try {
        const api = useApi()
        const res = await api<{ status: boolean }>("/transport/list/delete", {
          method: "PUT",
          body: transport,
        })

        if (!res.status) return false

        await this.setTransportList()
        return true
      } catch (err) {
        console.error("setDeleteTransport basarisiz:", err)
        return false
      }
    },
  },
})
