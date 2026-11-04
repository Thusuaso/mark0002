import { defineStore } from "pinia"
import type { Supplier } from "~/types/models"

// Vuex store/modules/supplier.js
export const useSupplierStore = defineStore("supplier", {
  state: () => ({
    supplierButtonStatus: false,
  }),
  getters: {
    getSupplierButtonStatus: (state) => state.supplierButtonStatus,
  },
  actions: {
    setSupplierButtonStatus(status: boolean) {
      this.supplierButtonStatus = status
    },

    async setSupplierSave(supplier: Partial<Supplier>) {
      const shared = useSharedStore()
      const toast = useAppToast()
      const api = useApi()
      const res = await api<{ status: boolean }>("/supplier/save", {
        method: "POST",
        body: supplier,
      })
      if (res.status) {
        await shared.setSupplierList()
        toast.success("Başarıyla Kaydedildi.")
      } else {
        toast.error("Kaydetme Başarısız.")
      }
    },

    async setSupplierUpdate(supplier: Partial<Supplier>) {
      const shared = useSharedStore()
      const toast = useAppToast()
      const api = useApi()
      const res = await api<{ status: boolean }>("/supplier/update", {
        method: "PUT",
        body: supplier,
      })
      if (res.status) {
        await shared.setSupplierList()
        toast.success("Başarıyla Güncellendi.")
      } else {
        toast.error("Güncelleme Başarısız")
      }
    },

    async setSupplierDelete(id: number) {
      const shared = useSharedStore()
      const toast = useAppToast()
      const api = useApi()
      const res = await api<{ status: boolean }>(`/supplier/delete/${id}`, {
        method: "DELETE",
      })
      if (res.status) {
        await shared.setSupplierList()
        toast.success("Başarıyla Silindi.")
      } else {
        toast.error("Silme Başarısız.")
      }
    },
  },
})
