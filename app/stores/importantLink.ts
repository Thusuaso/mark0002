import { defineStore } from "pinia"

/*
 * Vuex store/modules/importantLink.js karsiligi.
 *
 * MUT_ onekine GEREK YOK: bu modulde action ve mutation adlari zaten
 * ayriydi (...Action / ...Mutation, addImportantLink vb.), yani Pinia'da
 * cakisma olusmuyor. Mutation'lar tek satirlik oldugu icin cagiran
 * action'larin icine alindi.
 *
 * YEREL GUNCELLEME KORUNDU: kaydet/guncelle/sil islemleri listeyi
 * YENIDEN CEKMIYOR, state'i yerinde duzeltiyor (push / splice). Nuxt
 * 2'deki davranis buydu ve bilincli gorunuyor -- liste kullanici bazli
 * degil, tek bir ortak liste.
 */

export interface ImportantLink {
  ID: number
  Description: string
  Link: string
  SaveDate: string | Date
  UpdatedUserID: string | number | null
  Username: string | null
}

export const useImportantLinkStore = defineStore("importantLink", {
  state: () => ({
    list: [] as ImportantLink[],
  }),

  getters: {
    getImportantLinkList: (state) => state.list,
  },

  actions: {
    async setImportantLinkListAction() {
      try {
        const api = useApi()
        const res = await api<{ list: ImportantLink[] }>("/important/link/list")
        this.list = res?.list ?? []
      } catch (err) {
        console.error("setImportantLinkListAction basarisiz:", err)
        this.list = []
      }
    },

    /*
     * DUZELTILDI -- BASARISIZLIK SESSIZDI.
     *
     * Nuxt 2'de bu action'da `else` dali HIC YOKTU:
     *
     *     if(res.data.status){ ...commit...; toast.success(...) }
     *     // else: yok
     *
     * Sunucu status:false donerse (ya da istek hata verirse) kullanici
     * HICBIR SEY gormuyordu: ne hata, ne basari. Dialog kapaniyor
     * (bilesen @set_status_button'i her durumda yayiyor) ve kayit
     * olmamis oluyordu. Diger uc action'in hepsinde else dali vardi --
     * yalnizca bu atlanmis.
     */
    async setImportantLinkListSaveAction(payload: ImportantLink) {
      const toast = useAppToast()
      try {
        const api = useApi()
        const res = await api<{ status: boolean; id: number }>(
          "/important/link/save",
          { method: "POST", body: payload },
        )

        if (res.status) {
          this.list.push({ ...payload, ID: res.id })
          toast.success("Başarıyla Kaydedildi.")
        } else {
          toast.error("Kaydetme Başarısız")
        }
      } catch (err) {
        console.error("setImportantLinkListSaveAction basarisiz:", err)
        toast.error("Kaydetme Başarısız")
      }
    },

    async setImportantLinkListUpdateAction(payload: ImportantLink) {
      const toast = useAppToast()
      try {
        const api = useApi()
        const res = await api<{ status: boolean }>("/important/link/update", {
          method: "PUT",
          body: payload,
        })

        if (res.status) {
          const index = this.list.findIndex((x) => x.ID === payload.ID)
          if (index > -1) this.list.splice(index, 1, payload)
          toast.success("Başarıyla Kaydedildi.")
        } else {
          toast.error("Kaydetme Başarısız")
        }
      } catch (err) {
        console.error("setImportantLinkListUpdateAction basarisiz:", err)
        toast.error("Kaydetme Başarısız")
      }
    },

    async setImportantLinkListDeleteAction(id: number) {
      const toast = useAppToast()
      try {
        const api = useApi()
        const res = await api<{ status: boolean }>(
          `/important/link/delete/${id}`,
          { method: "DELETE" },
        )

        if (res.status) {
          const index = this.list.findIndex((x) => x.ID === id)
          if (index > -1) this.list.splice(index, 1)
          toast.success("Başarıyla Silindi.")
        } else {
          toast.error("Silme Başarısız")
        }
      } catch (err) {
        console.error("setImportantLinkListDeleteAction basarisiz:", err)
        toast.error("Silme Başarısız")
      }
    },
  },
})
