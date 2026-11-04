import { defineStore } from "pinia"

/*
 * Vuex store/modules/container.js karsiligi.
 *
 * MUT_ oneki GEREKMEDI: mutation adlari action adlariyla ayni olsa da
 * mutation'lar YALNIZCA kendi action'larindan commit ediliyordu --
 * hicbir bilesen dogrudan commit() cagirmiyor. Mutation'lar cagiran
 * action'in icine alindi (ayni yaklasim: stores/sales.ts, stores/bgp.ts).
 *
 * YUKLEME SAYACI: Vuex'teki setBeginLoadingAction / setEndLoadingAction
 * pilotta shared store'a tasindi ve artik BOOLEAN DEGIL SAYAC
 * (beginLoading / endLoading -- bkz. app/stores/shared.ts).
 *
 * DIKKAT -- SAYAC SIZINTISI KAPATILDI: Nuxt 2'de endLoading YALNIZCA
 * .then() icinde cagriliyordu, .catch() hic yoktu. Istek hata verirse
 * sayac EKSIK KALIYOR ve tam ekran yukleme katmani EBEDIYEN acik
 * kaliyordu -- kullanici sayfayi yenilemek zorunda. Burada endLoading
 * finally icinde.
 */

export interface ContainerFollow {
  SiparisNo: string
  MusteriAdi: string
  YuklemeTarihi: string | null
  KonteynerNo: string | null
  Line: string | null
  Eta: string | null
  Kalan: string | number | null
  KonsimentoDurum: boolean | null
  Takip: boolean | null
  AktarmaLimanAdi: string | null
  Sorumlu: string | null
}

export interface ContainerInput {
  EvrakYuklemeTarihi: string | null
  firma: string | null
  SiparisNo: string | null
  FaturaNo: string | null
  Tur: string | null
  Kur: number
  Tutar: number
  Aciklama: string | null
  Link: string | null
}

export interface ContainerFollowSave {
  EtaTarihi: string | null
  KonsimentoDurum: boolean
  Takip: boolean
  Line: string | null
  /* Sunucu alan adi TURKCE 'ı' iceriyor -- birebir korundu. */
  KonteynırNo: string | null
  SiparisNo: string
}

/*
 * AcenteTB satiri (upstream f22fe601b). `TakipUrl` icinde
 * {KONTEYNER} yer tutucusu olabilir; FollowForm onu konteyner
 * numarasiyla doldurup link kuruyor.
 */
export interface ContainerAgency {
  ID: number
  AcenteAdi: string
  TakipUrl: string | null
}

export const useContainerStore = defineStore("container", {
  state: () => ({
    /*
     * ACENTE LISTESI -- upstream f22fe601b ile geldi.
     * AcenteTB tablosundan okunuyor (api/sql/AcenteTB.sql). Script
     * calistirilmadiysa uc bos liste donuyor; dropdown bos gorunur,
     * uygulama patlamaz.
     */
    containerAgencyList: [] as ContainerAgency[],
    containerFollowList: [] as ContainerFollow[],
    /*
     * Vuex'te bu alanin adi `containerUnollowList` idi -- YAZIM HATASI
     * ("f" eksik). Getter da ayni hatali ada bakiyordu, yani ic tutarlilik
     * vardi ve calisiyordu. Ad yalnizca bu dosyanin ICINDE kullanildigi
     * (disariya getter uzerinden ciktigi) icin duzeltmek hicbir
     * sozlesmeyi bozmuyor.
     */
    containerUnfollowList: [] as ContainerFollow[],
    containerResults: null as unknown,
    containerInputList: [] as ContainerInput[],
  }),

  getters: {
    getContainerAgencyList: (state) => state.containerAgencyList,
    getContainerFollowList: (state) => state.containerFollowList,
    getContainerUnfollowList: (state) => state.containerUnfollowList,
    getContainerResults: (state) => state.containerResults,
    getContainerInputList: (state) => state.containerInputList,
  },

  actions: {
    async setContainerFollowList() {
      const shared = useSharedStore()
      shared.beginLoading()
      try {
        const api = useApi()
        const res = await api<{ follow: ContainerFollow[] }>(
          "/container/follow/list",
        )
        this.containerFollowList = res?.follow ?? []
      } catch (err) {
        console.error("setContainerFollowList basarisiz:", err)
        this.containerFollowList = []
      } finally {
        shared.endLoading()
      }
    },

    async setContainerUnfollowList() {
      const shared = useSharedStore()
      shared.beginLoading()
      try {
        const api = useApi()
        const res = await api<{ unfollow: ContainerFollow[] }>(
          "/container/unfollow/list",
        )
        this.containerUnfollowList = res?.unfollow ?? []
      } catch (err) {
        console.error("setContainerUnfollowList basarisiz:", err)
        this.containerUnfollowList = []
      } finally {
        shared.endLoading()
      }
    },

    /*
     * Kaydetmeden sonra IKI liste de yeniden cekiliyor -- Nuxt 2'deki
     * davranis. Mantikli: kayit `Takip` alanini degistirebiliyor, yani
     * bir satir takip listesinden cikip takipsiz listesine (ya da tersi)
     * gecebiliyor.
     */
    async setContainerFollowSave(follow: ContainerFollowSave) {
      const toast = useAppToast()
      try {
        const api = useApi()
        const res = await api<{ status: boolean }>("/container/follow/save", {
          method: "POST",
          body: follow,
        })

        if (res.status) {
          await Promise.all([
            this.setContainerFollowList(),
            this.setContainerUnfollowList(),
          ])
          toast.success("Başarıyla Kaydedildi.")
        } else {
          /* Orijinal metindeki yazim hatasi korundu: "Başarışız". */
          toast.error("Kaydetme Başarışız.")
        }
      } catch (err) {
        console.error("setContainerFollowSave basarisiz:", err)
        toast.error("Kaydetme Başarışız.")
      }
    },

    async setContainerInputSave(container: unknown) {
      const toast = useAppToast()
      try {
        const api = useApi()
        const res = await api<{ status: boolean; containerResults: unknown }>(
          "/container/input/save",
          { method: "POST", body: container },
        )

        if (res.status) {
          toast.success("Başarıyla Kaydedildi.")
          this.containerResults = res.containerResults
        } else {
          toast.error("Kaydetme Başarışız.")
        }
      } catch (err) {
        console.error("setContainerInputSave basarisiz:", err)
        toast.error("Kaydetme Başarışız.")
      }
    },

    async setContainerInputFileSave(container: unknown) {
      const toast = useAppToast()
      try {
        const api = useApi()
        const res = await api<{ status: boolean }>(
          "/container/input/file/save",
          { method: "POST", body: container },
        )

        if (res.status) {
          toast.success("Başarıyla Kaydedildi.")
        } else {
          toast.error("Kaydetme Başarışız.")
        }
      } catch (err) {
        console.error("setContainerInputFileSave basarisiz:", err)
        toast.error("Kaydetme Başarışız.")
      }
    },

    /*
     * Acente listesi. Follow/Unfollow sayfalari acilista cagiriyor;
     * hem formdaki dropdown hem listedeki takip linki buna bagli.
     *
     * YUKLEME GOSTERGESI BILEREK KULLANILMIYOR -- kaynakta da yoktu.
     * Bu yan bir veri; ana liste zaten gostergeyi aciyor ve acente
     * istegi icin ekrani ikinci kez kilitlemek gereksiz.
     *
     * Hata halinde BOS liste: kaynaktaki `.catch(() => commit([]))`
     * davranisi korundu, yani AcenteTB kurulu degilse dropdown bos
     * acilir ve sayfa calismaya devam eder.
     */
    async setContainerAgencyList() {
      try {
        const api = useApi()
        const res = await api<{ list: ContainerAgency[] }>(
          "/container/agency/list",
        )
        this.containerAgencyList = res?.list ?? []
      } catch (err) {
        console.error("setContainerAgencyList basarisiz:", err)
        this.containerAgencyList = []
      }
    },

    async setContainerInputList() {
      const shared = useSharedStore()
      shared.beginLoading()
      try {
        const api = useApi()
        const res = await api<{ list: ContainerInput[] }>(
          "/container/input/list",
        )
        this.containerInputList = res?.list ?? []
      } catch (err) {
        console.error("setContainerInputList basarisiz:", err)
        this.containerInputList = []
      } finally {
        shared.endLoading()
      }
    },
  },
})
