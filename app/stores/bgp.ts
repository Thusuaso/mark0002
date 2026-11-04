import { defineStore } from "pinia"

/*
 * Vuex store/modules/bgp.js karsiligi.
 *
 * MUT_ oneki GEREKMEDI: mutation adlari action adlariyla ayni olsa da
 * mutation'lar YALNIZCA kendi action'larindan commit ediliyordu --
 * hicbir bilesen dogrudan commit() cagirmiyor. Mutation'lar cagiran
 * action'in icine alindi (ayni yaklasim: stores/sales.ts).
 */

export interface Bgp {
  ID: number
  ProjectName: string
  Temsilci: string | number | null
  UlkeAdi: string | null
  UlkeLogo: string | null
  DateofRegistiration: string | null
}

export interface BgpDetail {
  ID: number
  ProjectName?: string
  FirmaAdi: string | null
  Email: string | null
  PhoneNumber: string | null
  Baslik: string | null
  Aciklama: string | null
  KayitTarihi: string | null
  HatirlatmaTarihi: string | null
  HatirlatmaAciklama: string | null
  Unvan?: string
  Temsilci?: string | number | null
  WrongNumber?: boolean
  NotResponse?: boolean
  Interested?: boolean
  NotInterested?: boolean
}

export const useBgpStore = defineStore("bgp", {
  state: () => ({
    bgpLists: [] as Bgp[],
    bgpDetailList: [] as BgpDetail[],
    bgpDetailButtonStatus: false,
  }),

  getters: {
    getBgpLists: (state) => state.bgpLists,
    getBgpDetailList: (state) => state.bgpDetailList,
    getBgpDetailButtonStatus: (state) => state.bgpDetailButtonStatus,
  },

  actions: {
    async setBgpList() {
      try {
        const api = useApi()
        const res = await api<{ data: Bgp[] }>("/sales/bgp/list")
        this.bgpLists = res?.data ?? []
      } catch (err) {
        console.error("setBgpList basarisiz:", err)
        this.bgpLists = []
      }
    },

    /*
     * DUZELTILDI -- TEMSILCI ADI BULUNAMAZSA PATLIYORDU.
     *
     * Nuxt 2'deki hali:
     *
     *   const username = vuexContext.getters.getUserList
     *                      .find(x => x.ID == bgp.Temsilci).KullaniciAdi
     *
     * find() eslesme bulamazsa undefined doner ve `.KullaniciAdi`
     *     TypeError: Cannot read properties of undefined
     * firlatir -- KAYIT SUNUCUDA ZATEN OLUSMUS oldugu halde. Yani veri
     * yazilir, sonra istemci patlar: listeye yeni kart EKLENMEZ, basari
     * toast'i GOSTERILMEZ, kullanici kaydin basarisiz oldugunu dusunup
     * tekrar kaydeder ve MUKERRER kayit olusur.
     *
     * Gercekci: Temsilci cerezden gelen userId; o kullanici listede
     * olmayabilir (pasif/silinmis) ya da getUserList henuz dolmamis
     * olabilir (layout'tan geliyor).
     *
     * Artik ad bulunamazsa sunucunun dondurdugu deger oldugu gibi
     * kaliyor ve uyari basiliyor; kart listeye yine ekleniyor.
     *
     * NOT: getUserList shared store'unda -- Vuex'te tum moduller tek
     * isim uzayini paylastigi icin bu ayrim gorunmuyordu.
     */
    async setBgpSave(bgp: Partial<Bgp>) {
      const toast = useAppToast()
      try {
        const api = useApi()
        const res = await api<{ status: boolean; data: Bgp }>(
          "/sales/bgp/save",
          { method: "POST", body: bgp },
        )

        if (res.status) {
          const user = useSharedStore().getUserList.find(
            (x: { ID: number | string }) => x.ID == bgp.Temsilci,
          )

          if (user) {
            res.data.Temsilci = user.KullaniciAdi
          } else {
            console.warn(
              "setBgpSave: Temsilci kullanici listesinde bulunamadi, " +
                "sunucudan gelen deger korundu. Temsilci:",
              bgp.Temsilci,
            )
          }

          this.bgpLists.push(res.data)
          toast.success("Başarıyla Kaydedildi.")
        } else {
          toast.error("Kaydetme Başarısız")
        }
      } catch (err) {
        console.error("setBgpSave basarisiz:", err)
        toast.error("Kaydetme Başarısız")
      }
    },

    /*
     * DUZELTILDI -- YANLIS KARTI SILIYORDU.
     *
     * Vuex mutation'i index'i KONTROL ETMIYORDU:
     *
     *   const index = state.bgpLists.findIndex(item => item.ID === id)
     *   state.bgpLists.splice(index, 1)
     *
     * Bulunamazsa findIndex -1 doner ve `splice(-1, 1)` dizinin SON
     * ELEMANINI siler -- silinmesi istenen kayit yerine ALAKASIZ bir
     * kart ekrandan kayboluyordu. Hata firlatmaz, toast "Başarıyla
     * Silindi." der.
     *
     * Ayni hata setBgpDetailDelete'te de vardi; ikisi de duzeltildi.
     */
    async setBgpDelete(id: number) {
      const toast = useAppToast()
      try {
        const api = useApi()
        const res = await api<{ status: boolean; id: number }>(
          `/sales/bgp/delete/${id}`,
          { method: "DELETE" },
        )

        if (res.status) {
          const index = this.bgpLists.findIndex((item) => item.ID === res.id)
          if (index > -1) {
            this.bgpLists.splice(index, 1)
          } else {
            console.warn(
              "setBgpDelete: silinen kayit listede yok, liste " +
                "degistirilmedi. ID:",
              res.id,
            )
          }
          toast.success("Başarıyla Silindi.")
        } else {
          toast.error("Silme Başarısız")
        }
      } catch (err) {
        console.error("setBgpDelete basarisiz:", err)
        toast.error("Silme Başarısız")
      }
    },

    async setBgpDetailList(projectName: string) {
      try {
        const api = useApi()
        const res = await api<{ data: BgpDetail[] }>(
          `/sales/bgp/detail/${projectName}`,
        )
        this.bgpDetailList = res?.data ?? []
      } catch (err) {
        console.error("setBgpDetailList basarisiz:", err)
        this.bgpDetailList = []
      }
    },

    setBgpDetailButton(status: boolean) {
      this.bgpDetailButtonStatus = status
    },

    /* Index kontrolu: gerekcesi setBgpDelete'in basinda. */
    async setBgpDetailDelete(id: number) {
      const toast = useAppToast()
      try {
        const api = useApi()
        const res = await api<{ status: boolean; id: number }>(
          `/sales/bgp/detail/delete/${id}`,
          { method: "DELETE" },
        )

        if (res.status) {
          const index = this.bgpDetailList.findIndex(
            (item) => item.ID === res.id,
          )
          if (index > -1) {
            this.bgpDetailList.splice(index, 1)
          } else {
            console.warn(
              "setBgpDetailDelete: silinen kayit listede yok, liste " +
                "degistirilmedi. ID:",
              res.id,
            )
          }
          toast.success("Başarıyla Silindi")
        } else {
          toast.error("Silme Başarısız")
        }
      } catch (err) {
        console.error("setBgpDetailDelete basarisiz:", err)
        toast.error("Silme Başarısız")
      }
    },

    async setBgpDetailSave(bgp: BgpDetail) {
      const toast = useAppToast()
      try {
        const api = useApi()
        const res = await api<{ status: boolean; data: BgpDetail }>(
          "/sales/bgp/detail/save",
          { method: "POST", body: bgp },
        )

        if (res.status) {
          this.bgpDetailList.push(res.data)
          toast.success("Kaydetme Başarılı")
        } else {
          toast.error("Kaydetme Başarısız")
        }
      } catch (err) {
        console.error("setBgpDetailSave basarisiz:", err)
        toast.error("Kaydetme Başarısız")
      }
    },

    /*
     * DUZELTILDI -- GUNCELLEME EKRANDA GORUNMUYORDU (IKI SEBEP).
     *
     * Vuex mutation'i:
     *
     *   const index = state.bgpDetailList.findIndex(i => i.ID === bgp.ID)
     *   state.bgpDetailList[index] = bgp
     *
     * [1] index kontrol edilmiyordu -> bulunamazsa `[-1] = bgp` diziye
     *     "-1" adli bir OZELLIK ekler; tabloda gorunmez, hata vermez.
     * [2] Vue 2'de diziye indeksle atama REAKTIF DEGILDI -- index dogru
     *     olsa bile tablo yeniden render edilmiyordu.
     *
     * Vue 3 Proxy tabanli oldugu icin [2] tasinmayla kendiliginden
     * cozuluyor; yine de splice kullaniliyor (ayni not: sales.ts
     * setFollowDetailUpdate).
     */
    async setBgpDetailUpdate(bgp: BgpDetail) {
      const toast = useAppToast()
      try {
        const api = useApi()
        const res = await api<{ status: boolean; data: BgpDetail }>(
          "/sales/bgp/detail/update",
          { method: "PUT", body: bgp },
        )

        if (res.status) {
          const index = this.bgpDetailList.findIndex(
            (item) => item.ID === res.data.ID,
          )
          if (index > -1) {
            this.bgpDetailList.splice(index, 1, res.data)
          } else {
            console.warn(
              "setBgpDetailUpdate: guncellenen kayit listede yok, liste " +
                "degistirilmedi. ID:",
              res.data?.ID,
            )
          }
          toast.success("Güncelleme Başarılı")
        } else {
          toast.error("Güncelleme Başarısız")
        }
      } catch (err) {
        console.error("setBgpDetailUpdate basarisiz:", err)
        toast.error("Güncelleme Başarısız")
      }
    },
  },
})
