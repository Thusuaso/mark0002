import { defineStore } from "pinia"

/*
 * Vuex store/modules/cards.js karsiligi.
 *
 * MUT_ oneki GEREKLI -- ama yalnizca BIRI icin:
 * `setCardsOrderList` hem action (API'den ceker) hem mutation (verilen
 * diziyi state'e yazar) olarak tanimliydi ve pages/operation/cards.vue
 * MUTATION'i DOGRUDAN commit ediyor:
 *
 *     this.$store.commit("setCardsOrderList", [])
 *
 * Duz bir cevrim bunu ACTION'a baglardi ve action argumani KART ID'si
 * sanip `/card/order/list/` adresine bos dizi ile istek atardi.
 * (Ayni tuzak todo.ts'te de vardi -- bkz. MUT_setTodosMainList.)
 *
 * `setCardsButtonStatus` mutation'i ise yalnizca kendi action'indan
 * commit ediliyor, o yuzden action'in icine alindi.
 *
 * NOT: kart listelerinin kendisi (kategori/urun/yuzey/olcu/kart listesi)
 * bu modulde DEGIL, shared store'unda -- Vuex'te tum moduller tek isim
 * uzayini paylastigi icin bu ayrim gorunmuyordu.
 */

export interface CardOrder {
  ID: number
  [key: string]: unknown
}

export const useCardsStore = defineStore("cards", {
  state: () => ({
    cardsButtonStatus: false,
    cardsOrderList: [] as CardOrder[],
  }),

  getters: {
    getCardsButtonStatus: (state) => state.cardsButtonStatus,
    getCardsOrderList: (state) => state.cardsOrderList,
  },

  actions: {
    setCardsButtonStatus(status: boolean) {
      this.cardsButtonStatus = status
    },

    /*
     * Kaydetme/guncelleme/silme sonrasi tazelenen listeler SHARED
     * store'unda. Nuxt 2'de bunlar `vuexContext.dispatch(...)` ile
     * cagriliyordu ve ayni isim uzayinda oldugu icin modul ayrimi
     * gorunmuyordu.
     *
     * DIKKAT -- BU CAGRILAR BEKLENMIYOR, BEKLENEMEZ: shared store'undaki
     * kart eylemleri `async` DEGIL ve hicbir sey DONDURMUYOR; iclerinde
     * `legacyApi.get(...).then(...)` var ama o promise return edilmiyor
     * (bkz. app/stores/shared.ts:242). Yani `await` koymak undefined'i
     * beklemek olur -- hemen gecer ve istekler arkada surer.
     *
     * Yaniltici olmasin diye await KULLANILMADI; davranis Nuxt 2 ile
     * ayni (orada da dispatch'ler beklenmiyordu). Listeler yuklendikce
     * reaktif olarak ekrana yansiyor.
     */
    async setCardsSave(card: unknown) {
      const toast = useAppToast()
      try {
        const api = useApi()
        const res = await api<{ status: boolean }>("/card/save", {
          method: "POST",
          body: card,
        })

        if (res.status) {
          const shared = useSharedStore()
          shared.setCardSizesList()
          shared.setCardCategoryList()
          shared.setCardProductsList()
          shared.setCardSurfacesList()
          shared.setCardList()
          toast.success("Başarıyla Kaydedildi.")
        } else {
          toast.error("Kaydetme Başarısız.")
        }
      } catch (err) {
        console.error("setCardsSave basarisiz:", err)
        toast.error("Kaydetme Başarısız.")
      }
    },

    async setCardsDelete(cardId: number) {
      const toast = useAppToast()
      try {
        const api = useApi()
        const res = await api<{ status: boolean }>(`/card/delete/${cardId}`, {
          method: "DELETE",
        })

        if (res.status) {
          useSharedStore().setCardList()
          toast.success("Başarıyla Silindi.")
        } else {
          toast.error("Silme Başarısız")
        }
      } catch (err) {
        console.error("setCardsDelete basarisiz:", err)
        toast.error("Silme Başarısız")
      }
    },

    async setCardsUpdate(card: unknown) {
      const toast = useAppToast()
      try {
        const api = useApi()
        const res = await api<{ status: boolean }>("/card/update", {
          method: "PUT",
          body: card,
        })

        if (res.status) {
          const shared = useSharedStore()
          shared.setCardSizesList()
          shared.setCardList()
          toast.success("Başarıyla Güncellendi.")
        } else {
          toast.error("Güncelleme Başarısız")
        }
      } catch (err) {
        console.error("setCardsUpdate basarisiz:", err)
        toast.error("Güncelleme Başarısız")
      }
    },

    async setCardsOrderList(cardId: number) {
      try {
        const api = useApi()
        const res = await api<{ list: CardOrder[] }>(
          `/card/order/list/${cardId}`,
        )
        this.cardsOrderList = res?.list ?? []
      } catch (err) {
        console.error("setCardsOrderList basarisiz:", err)
        this.cardsOrderList = []
      }
    },

    /*
     * MUT_ oneki ZORUNLU -- gerekcesi dosyanin basinda.
     * pages/operation/cards.vue newForm() icinde bu listeyi BOSALTMAK
     * icin commit ediyordu.
     */
    MUT_setCardsOrderList(payload: CardOrder[]) {
      this.cardsOrderList = payload
    },
  },
})
