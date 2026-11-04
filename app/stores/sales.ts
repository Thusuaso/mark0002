import { defineStore } from "pinia"

/*
 * Vuex store/modules/sales.js karsiligi.
 *
 * MUT_ oneki GEREKMEDI: bu modulde her mutation'in adi bir action'la
 * AYNIYDI (setFollowList, setFollowDetail, setFollowDetailSave, ...)
 * ama mutation'lar YALNIZCA kendi action'larindan commit ediliyordu --
 * hicbir bilesen dogrudan commit() cagirmiyor. Bu yuzden her mutation
 * cagiran action'in icine alindi; ayri MUT_ eylemi yazmaya gerek yok.
 * (Karsilastirma: todo.ts'te MainList.vue DOGRUDAN commit ediyordu, o
 *  yuzden orada MUT_setTodosMainList sart oldu.)
 */

export interface FollowCustomer {
  FirmaAdi: string
  Oncelik: string | number
  Temsilci: string
  baslik: string
}

export interface FollowDetail {
  ID: number
  MusteriAdi: string
  MusteriId?: number
  Tarih: string | null
  Baslik: string | null
  Aciklama: string | null
  Hatirlatma_Tarih: string | null
  Hatirlatma_Notu: string | null
  KullaniciAdi?: string
  Temsilci?: string | number | null
}

export interface PointOfConsider {
  ID: number
  Hata: string
}

export const useSalesStore = defineStore("sales", {
  state: () => ({
    followList: [] as FollowCustomer[],
    followDetail: [] as FollowDetail[],
    followDetailData: {} as Partial<FollowDetail>,
    followDetailNewButton: false,
    salesPointsOfConsiderList: [] as PointOfConsider[],
    salesPointsOfConsiderButtonStatus: false,
  }),

  getters: {
    getFollowList: (state) => state.followList,
    getFollowDetail: (state) => state.followDetail,
    getFollowDetailData: (state) => state.followDetailData,
    getFollowDetailNewButton: (state) => state.followDetailNewButton,
    getSalesPointsOfConsiderList: (state) => state.salesPointsOfConsiderList,
    getSalesPointsOfConsiderButtonStatus: (state) =>
      state.salesPointsOfConsiderButtonStatus,
  },

  actions: {
    async setFollowList() {
      try {
        const api = useApi()
        const res = await api<{ data: FollowCustomer[] }>("/sales/follow")
        this.followList = res?.data ?? []
      } catch (err) {
        console.error("setFollowList basarisiz:", err)
        this.followList = []
      }
    },

    async setFollowDetail(customer: string) {
      try {
        const api = useApi()
        const res = await api<{ data: FollowDetail[] }>(
          `/sales/follow/detail/${customer}`,
        )
        this.followDetail = res?.data ?? []
      } catch (err) {
        console.error("setFollowDetail basarisiz:", err)
        this.followDetail = []
      }
    },

    setFollowDetailData(detailData: Partial<FollowDetail>) {
      this.followDetailData = detailData
    },

    setFollowDetailNewButton(newButton: boolean) {
      this.followDetailNewButton = newButton
    },

    async setFollowDetailSave(saveData: FollowDetail) {
      const toast = useAppToast()
      try {
        const api = useApi()
        const res = await api<{ status: boolean; data: FollowDetail }>(
          "/sales/follow/detail/save",
          { method: "POST", body: saveData },
        )

        if (res.status) {
          this.followDetail.push(res.data)
          toast.success("Başarıyla Kaydedildi.")
        } else {
          toast.error("Kaydetme Başarısız")
        }
      } catch (err) {
        console.error("setFollowDetailSave basarisiz:", err)
        toast.error("Kaydetme Başarısız")
      }
    },

    /*
     * DUZELTILDI -- IKI AYRI HATA.
     *
     * Vuex mutation'i soyleydi:
     *
     *     const index = state.followDetail.findIndex(x => x.ID == payload.ID)
     *     state.followDetail[index] = payload
     *
     * [1] index KONTROL EDILMIYORDU. Kayit listede bulunamazsa
     *     findIndex -1 doner ve `followDetail[-1] = payload` dizinin
     *     uzunlugunu DEGISTIRMEDEN ona "-1" adli bir OZELLIK ekler.
     *     Hata firlatmaz, tabloda gorunmez: guncelleme sunucuda olur,
     *     ekranda HICBIR SEY degismez.
     *
     * [2] Vue 2'de ZATEN REAKTIF DEGILDI. Vue 2'nin reaktivite sistemi
     *     diziye indeksle atamayi (arr[i] = x) izleyemez -- bu yuzden
     *     index DOGRU olsa bile tablo yeniden render edilmiyordu;
     *     guncellenen satir eski haliyle duruyordu. (Vue 2'de dogrusu
     *     Vue.set veya splice'ti.)
     *
     *     Vue 3 Proxy tabanli oldugu icin bu sorun TASINMAYLA KENDILIGINDEN
     *     cozuluyor; yine de splice kullaniliyor, boylece davranis
     *     reaktivite sisteminden bagimsiz olarak dogru.
     */
    async setFollowDetailUpdate(updateData: FollowDetail) {
      const toast = useAppToast()
      try {
        const api = useApi()
        const res = await api<{ status: boolean; data: FollowDetail }>(
          "/sales/follow/detail/update",
          { method: "PUT", body: updateData },
        )

        if (res.status) {
          const index = this.followDetail.findIndex((x) => x.ID == res.data.ID)
          if (index > -1) {
            this.followDetail.splice(index, 1, res.data)
          } else {
            console.warn(
              "setFollowDetailUpdate: guncellenen kayit listede yok, " +
                "liste degistirilmedi. ID:",
              res.data?.ID,
            )
          }
          toast.success("Başarıyla Güncellendi.")
        } else {
          toast.error("Güncelleme Başarısız")
        }
      } catch (err) {
        console.error("setFollowDetailUpdate basarisiz:", err)
        toast.error("Güncelleme Başarısız")
      }
    },

    /*
     * DUZELTILDI -- YANLIS SATIRI SILIYORDU.
     *
     * Vuex mutation'i:
     *
     *     const index = state.followDetail.findIndex(x => x.ID == payload)
     *     state.followDetail.splice(index, 1)
     *
     * index kontrol edilmiyordu. Kayit listede bulunamazsa findIndex -1
     * doner ve `splice(-1, 1)` dizinin SON ELEMANINI siler -- yani
     * silinmesi istenen kayit yerine ALAKASIZ bir satir listeden
     * kayboluyordu. Hata firlatmaz, toast "Silme Başarılı" der.
     */
    async setFollowDetailDelete(id: number) {
      const toast = useAppToast()
      try {
        const api = useApi()
        const res = await api<{ status: boolean }>(
          `/sales/follow/detail/delete/${id}`,
          { method: "DELETE" },
        )

        if (res.status) {
          const index = this.followDetail.findIndex((x) => x.ID == id)
          if (index > -1) {
            this.followDetail.splice(index, 1)
          } else {
            console.warn(
              "setFollowDetailDelete: silinen kayit listede yok, " +
                "liste degistirilmedi. ID:",
              id,
            )
          }
          toast.success("Silme Başarılı")
        } else {
          toast.error("Silme Başarısız")
        }
      } catch (err) {
        console.error("setFollowDetailDelete basarisiz:", err)
        toast.error("Silme Başarısız")
      }
    },

    async setSalesPointsOfConsiderList() {
      try {
        const api = useApi()
        const res = await api<{ list: PointOfConsider[] }>(
          "/sales/points/of/consider/list",
        )
        this.salesPointsOfConsiderList = res?.list ?? []
      } catch (err) {
        console.error("setSalesPointsOfConsiderList basarisiz:", err)
        this.salesPointsOfConsiderList = []
      }
    },

    setSalesPointsOfConsiderButtonStatus(status: boolean) {
      this.salesPointsOfConsiderButtonStatus = status
    },

    async setSalesPointsOfConsiderSave(data: PointOfConsider) {
      const toast = useAppToast()
      try {
        const api = useApi()
        const res = await api<{ status: boolean }>(
          "/sales/points/of/consider/save",
          { method: "POST", body: data },
        )

        if (res.status) {
          toast.success("Kayıt Başarılı")
          await this.setSalesPointsOfConsiderList()
          /*
           * Vuex'te buradan `dispatch("setSalesPointsOfConsiderModel")`
           * cagriliyordu -- o action sales modulunde DEGIL, models
           * modulundeydi (Vuex'te tum moduller tek isim uzayini
           * paylastigi icin calisiyordu). Pinia'da store'lar ayri, bu
           * yuzden acikca models store'u cagriliyor.
           */
          useModelsStore().setSalesPointsOfConsiderModel()
        } else {
          toast.error("Kayıt Başarısız")
        }
      } catch (err) {
        console.error("setSalesPointsOfConsiderSave basarisiz:", err)
        toast.error("Kayıt Başarısız")
      }
    },

    async setSalesPointsOfConsiderUpdate(data: PointOfConsider) {
      const toast = useAppToast()
      try {
        const api = useApi()
        const res = await api<{ status: boolean }>(
          "/sales/points/of/consider/update",
          { method: "PUT", body: data },
        )

        if (res.status) {
          toast.success("Kayıt Başarılı")
          await this.setSalesPointsOfConsiderList()
        } else {
          toast.error("Kayıt Başarısız")
        }
      } catch (err) {
        console.error("setSalesPointsOfConsiderUpdate basarisiz:", err)
        toast.error("Kayıt Başarısız")
      }
    },

    async setSalesPointsOfConsiderDelete(id: number) {
      const toast = useAppToast()
      try {
        const api = useApi()
        const res = await api<{ status: boolean }>(
          `/sales/points/of/consider/delete/${id}`,
          { method: "DELETE" },
        )

        if (res.status) {
          toast.success("Başarıyla Silindi.")
          await this.setSalesPointsOfConsiderList()
        } else {
          toast.error("Silme Başarısız.")
        }
      } catch (err) {
        console.error("setSalesPointsOfConsiderDelete basarisiz:", err)
        toast.error("Silme Başarısız.")
      }
    },
  },
})
