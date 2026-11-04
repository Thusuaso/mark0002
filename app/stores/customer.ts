import { defineStore } from "pinia"

/*
 * store/modules/customer.js -> Pinia
 *
 * Bu dosya tools/codemods/vuex-to-pinia.mjs ile URETILDI, sonra elle
 * gozden gecirildi.
 *
 * Donusumler:
 *   vuexContext.commit("X", p)   -> this.MUT_X(p)
 *   vuexContext.dispatch("Y", p) -> this.Y(p)
 *   vuexContext.state.x          -> this.x
 *   this.$axios                  -> useLegacyApi()   (axios sozlesmesini
 *                                   taklit eder, response.data KORUNUR)
 *   this.$toast                  -> useAppToast()
 *   mutation'lar                 -> MUT_ onekli action
 *
 * MUT_ oneki neden var: Vuex'te action ve mutation ayri isim
 * uzaylarindadir; bu projede 324 mutation'in 298'i bir action'la ayni ada
 * sahip. Pinia'da ikisi de action oldugu icin cakisirlar.
 *
 * Istatistik: 28 action, 13 mutation, 13 getter
 */
export const useCustomerStore = defineStore("customer", {
  state: () => ({
  mekmarList: [],
  mekmarButtonStatus: false,
  mekmarDetailOrdersList: [],
  mekmarDetailOrdersPoList: [],
  mekmarDetailOrdersPoProductsList: [],
  offerCustomerList: [],
  offerCustomerButtonStatus: false,
  bgpCustomerList: [],
  bgpCustomerButtonStatus: false,
  fairCustomerList: [],
  fairCustomerButtonStatus: false,
  selectionCustomerList: [],
  selectionCustomerButtonStatus: false,
}),

  getters: {
    getMekmarList: (state) => state.mekmarList,
    getMekmarButtonStatus: (state) => state.mekmarButtonStatus,
    getMekmarDetailOrdersList: (state) => state.mekmarDetailOrdersList,
    getMekmarDetailOrdersPoList: (state) => state.mekmarDetailOrdersPoList,
    getSetMekmarDetailOrdersPoProductsList: (state) => state.mekmarDetailOrdersPoProductsList,
    getOfferCustomerList: (state) => state.offerCustomerList,
    getOfferCustomerButtonStatus: (state) => state.offerCustomerButtonStatus,
    getBgpCustomerList: (state) => state.bgpCustomerList,
    getBgpCustomerButtonStatus: (state) => state.bgpCustomerButtonStatus,
    getFairCustomerList: (state) => state.fairCustomerList,
    getFairCustomerButtonStatus: (state) => state.fairCustomerButtonStatus,
    getSelectionCustomerList: (state) => state.selectionCustomerList,
    getSelectionCustomerButtonStatus: (state) => state.selectionCustomerButtonStatus,
  },

  actions: {
    setMekmarList() {
      const legacyApi = useLegacyApi()
      const sharedStore = useSharedStore()

      /*
       * [YUK-1] YUKLEME GOSTERGESI TAKILI KALIYORDU.
       *
       * Kaynakta `.catch()` YOKTU (ve bazi action'larda endLoading bir
       * `if (response.data)` blogunun ICINDEYDI). Istek patlarsa ya da
       * yanit bos gelirse endLoading HIC cagrilmiyor; pilotun yukleme
       * gostergesi SAYAC oldugu icin (app/stores/shared.ts) sayac bir
       * eksilmemis kaliyor ve tum tiklamalari yakalayan tam ekran
       * katman KALICI olarak acik kaliyor -- kullanici sayfayi
       * yenilemek zorunda.
       *
       * .finally() ile gosterge her durumda kapaniyor; veri atama
       * sartlari AYNEN korundu.
       */
      sharedStore.beginLoading();
          legacyApi.get("/customer/mekmar/list").then((response) => {
            this.MUT_setMekmarList(response.data.list);
          })
        .catch((err) => {
          console.error("setMekmarList basarisiz:", err)
        })
        .finally(() => {
          sharedStore.endLoading()
        });
    },
    setMekmarButtonStatus(status) {

          this.MUT_setMekmarButtonStatus(status);
    },
    setMekmarDetailOrdersList(id) {
      const legacyApi = useLegacyApi()

          legacyApi.get(`/customer/mekmar/detail/orders/${id}`).then((response) => {
            this.MUT_setMekmarDetailOrdersList(response.data);
          });
    },
    setMekmarDetailOrdersPoList(value) {
      const legacyApi = useLegacyApi()

          legacyApi
            .get(
              `/customer/mekmar/detail/orders/po/${value.customerid}/${value.year}`
            )
            .then((response) => {
              this.MUT_setMekmarDetailOrdersPoList(response.data.poList);
            });
    },
    setMekmarDetailOrdersPoProductsList(po) {
      const legacyApi = useLegacyApi()

          legacyApi
            .get(`/customer/mekmar/detail/orders/products/${po}`)
            .then((response) => {
              this.MUT_setMekmarDetailOrdersPoProductsList(response.data.products
              );
            });
    },
    setMekmarCustomerSave(payload) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

          return new Promise((resolve, reject) => {
            legacyApi.post("/customer/mekmar/save", payload).then((response) => {
              if (response.data.status == 1) {
                toast.success("Başarıyla Kaydedildi.");
                this.setMekmarList();
                resolve(true);
              } else {
                toast.error("Kaydetme Başarışız.");
                resolve(false);
              }
            });
          });
    },
    setMekmarCustomerDelete(id) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

          legacyApi.delete(`/customer/mekmar/delete/${id}`).then((response) => {
            if (response.data.status) {
              toast.success("Başarıyla Silindi.");
              this.setMekmarList();
            } else {
              toast.error("Silme Başarışız.");
            }
          });
    },
    setMekmarCustomerUpdate(payload) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

          legacyApi.put("/customer/mekmar/update", payload).then((response) => {
            if (response.data.status) {
              toast.success("Başarıyla Güncellendi.");
              this.setMekmarList();
            } else {
              toast.error("Güncelleme Başarısız.");
            }
          });
    },
    setOfferCustomerList() {
      const legacyApi = useLegacyApi()
      const sharedStore = useSharedStore()

      /*
       * [YUK-1] YUKLEME GOSTERGESI TAKILI KALIYORDU.
       *
       * Kaynakta `.catch()` YOKTU (ve bazi action'larda endLoading bir
       * `if (response.data)` blogunun ICINDEYDI). Istek patlarsa ya da
       * yanit bos gelirse endLoading HIC cagrilmiyor; pilotun yukleme
       * gostergesi SAYAC oldugu icin (app/stores/shared.ts) sayac bir
       * eksilmemis kaliyor ve tum tiklamalari yakalayan tam ekran
       * katman KALICI olarak acik kaliyor -- kullanici sayfayi
       * yenilemek zorunda.
       *
       * .finally() ile gosterge her durumda kapaniyor; veri atama
       * sartlari AYNEN korundu.
       */
      sharedStore.beginLoading();
          legacyApi.get("/customer/offer/list").then((response) => {
            this.MUT_setOfferCustomerList(response.data.list);
          })
        .catch((err) => {
          console.error("setOfferCustomerList basarisiz:", err)
        })
        .finally(() => {
          sharedStore.endLoading()
        });
    },
    setOfferCustomerButtonStatus(payload) {

          this.MUT_setOfferCustomerButtonStatus(payload);
    },
    setOfferCustomerSave(payload) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

          legacyApi.post("/customer/offer/save", payload).then((response) => {
            if (response.data.status) {
              this.setOfferCustomerList();
              toast.success("Başarıyla Kaydedildi.");
            } else {
              toast.error("Kaydetme Başarısız.");
            }
          });
    },
    setOfferCustomerDelete(id) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

          legacyApi.delete(`/customer/offer/delete/${id}`).then((response) => {
            if (response.data.status) {
              this.setOfferCustomerList();
              toast.success("Başarıyla Silindi.");
            } else {
              toast.error("Silme Başarısız.");
            }
          });
    },
    setOfferCustomerUpdate(payload) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

          legacyApi.put("/customer/offer/update", payload).then((response) => {
            if (response.data.status) {
              this.setOfferCustomerList();
              toast.success("Başarıyla Güncellendi.");
            } else {
              toast.error("Başarıyla Güncellendi.");
            }
          });
    },
    setBgpCustomerList() {
      const legacyApi = useLegacyApi()
      const sharedStore = useSharedStore()

      /*
       * [YUK-1] YUKLEME GOSTERGESI TAKILI KALIYORDU.
       *
       * Kaynakta `.catch()` YOKTU (ve bazi action'larda endLoading bir
       * `if (response.data)` blogunun ICINDEYDI). Istek patlarsa ya da
       * yanit bos gelirse endLoading HIC cagrilmiyor; pilotun yukleme
       * gostergesi SAYAC oldugu icin (app/stores/shared.ts) sayac bir
       * eksilmemis kaliyor ve tum tiklamalari yakalayan tam ekran
       * katman KALICI olarak acik kaliyor -- kullanici sayfayi
       * yenilemek zorunda.
       *
       * .finally() ile gosterge her durumda kapaniyor; veri atama
       * sartlari AYNEN korundu.
       */
      sharedStore.beginLoading();
          legacyApi.get("/customer/bgp/list").then((response) => {
            this.MUT_setBgpCustomerList(response.data.list);
          })
        .catch((err) => {
          console.error("setBgpCustomerList basarisiz:", err)
        })
        .finally(() => {
          sharedStore.endLoading()
        });
    },
    setBgpCustomerButtonStatus(payload) {

          this.MUT_setBgpCustomerButtonStatus(payload);
    },
    setBgpCustomerDelete(id) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

          legacyApi.delete(`/customer/bgp/delete/${id}`).then((response) => {
            if (response.data.status) {
              this.setBgpCustomerList();
              toast.success("Başarıyla Silindi.");
            } else {
              toast.error("Silme İşlemi Başarısız.");
            }
          });
    },
    setBgpCustomerSave(payload) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

          legacyApi.post(`/customer/bgp/save`, payload).then((response) => {
            if (response.data.status) {
              this.setBgpCustomerList();
              toast.success("Başarıyla Kaydedildi.");
            } else {
              toast.error("Kaydetme Başarısız.");
            }
          });
    },
    setBgpCustomerUpdate(payload) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

          legacyApi.put("/customer/bgp/update", payload).then((response) => {
            if (response.data.status) {
              this.setBgpCustomerList();
              toast.success("Başarıyla Güncellendi.");
            } else {
              toast.error("Güncelleme Başarısız.");
            }
          });
    },
    setFairCustomerList() {
      const legacyApi = useLegacyApi()
      const sharedStore = useSharedStore()

      /*
       * [YUK-1] YUKLEME GOSTERGESI TAKILI KALIYORDU.
       *
       * Kaynakta `.catch()` YOKTU (ve bazi action'larda endLoading bir
       * `if (response.data)` blogunun ICINDEYDI). Istek patlarsa ya da
       * yanit bos gelirse endLoading HIC cagrilmiyor; pilotun yukleme
       * gostergesi SAYAC oldugu icin (app/stores/shared.ts) sayac bir
       * eksilmemis kaliyor ve tum tiklamalari yakalayan tam ekran
       * katman KALICI olarak acik kaliyor -- kullanici sayfayi
       * yenilemek zorunda.
       *
       * .finally() ile gosterge her durumda kapaniyor; veri atama
       * sartlari AYNEN korundu.
       */
      sharedStore.beginLoading();
          legacyApi.get("/customer/fair/list").then((response) => {
            this.MUT_setFairCustomerList(response.data.list);
          })
        .catch((err) => {
          console.error("setFairCustomerList basarisiz:", err)
        })
        .finally(() => {
          sharedStore.endLoading()
        });
    },
    setFairCustomerButtonStatus(payload) {

          this.MUT_setFairCustomerButtonStatus(payload);
    },
    setFairCustomerSave(payload) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

          legacyApi.post("/customer/fair/save", payload).then((response) => {
            if (response.data.status) {
              this.setFairCustomerList();
              toast.success("Başarıyla Kaydedildi.");
            } else {
              toast.error("Kaydetme Başarısız.");
            }
          });
    },
    setFairCustomerDelete(id) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

          legacyApi.delete(`/customer/fair/delete/${id}`).then((response) => {
            if (response.data.status) {
              this.setFairCustomerList();
              toast.success("Başarıyla Silindi.");
            } else {
              toast.error("Silme İşlemi başarısız");
            }
          });
    },
    setFairCustomerUpdate(payload) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

          legacyApi.put("/customer/fair/update", payload).then((response) => {
            if (response.data.status) {
              this.setFairCustomerList();
              toast.success("Başarıyla Güncellendi.");
            } else {
              toast.error("Güncelleme Başarısız.");
            }
          });
    },
    setSelectionCustomerList(userId) {
      const legacyApi = useLegacyApi()
      const sharedStore = useSharedStore()

      /*
       * [YUK-1] YUKLEME GOSTERGESI TAKILI KALIYORDU.
       *
       * Kaynakta `.catch()` YOKTU (ve bazi action'larda endLoading bir
       * `if (response.data)` blogunun ICINDEYDI). Istek patlarsa ya da
       * yanit bos gelirse endLoading HIC cagrilmiyor; pilotun yukleme
       * gostergesi SAYAC oldugu icin (app/stores/shared.ts) sayac bir
       * eksilmemis kaliyor ve tum tiklamalari yakalayan tam ekran
       * katman KALICI olarak acik kaliyor -- kullanici sayfayi
       * yenilemek zorunda.
       *
       * .finally() ile gosterge her durumda kapaniyor; veri atama
       * sartlari AYNEN korundu.
       */
      sharedStore.beginLoading();
          legacyApi.get(`/customer/selection/list/${userId}`).then((response) => {
            this.MUT_setSelectionCustomerList(response.data.list);
          })
        .catch((err) => {
          console.error("setSelectionCustomerList basarisiz:", err)
        })
        .finally(() => {
          sharedStore.endLoading()
        });
    },
    setSelectionCustomerButtonStatus(payload) {

          this.MUT_setSelectionCustomerButtonStatus(payload);
    },
    setSelectionCustomerSave(payload) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()
      const sharedStore = useSharedStore()

          legacyApi.post("/customer/selection/save", payload).then((response) => {
            if (response.data.status) {
              this.setSelectionCustomerList(payload.UserId);
              sharedStore.setSelectionSurfaces();
              toast.success("Başarıyla Eklendi.");
            } else {
              toast.error("Ekleme Başarısız");
            }
          });
    },
    setSelectionCustomerDelete(id) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

          legacyApi.delete(`/customer/selection/delete/${id}`).then((response) => {
            if (response.data.status) {
              toast.success("Başarıyla Silindi.");
            } else {
              toast.error("Silme Başarısız.");
            }
          });
    },
    setSelectionCustomerUpdate(payload) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

          legacyApi.put("/customer/selection/update", payload).then((response) => {
            if (response.data.status) {
              this.setSelectionCustomerList(payload.UserId);
              toast.success("Başarıyla Güncellendi.");
            } else {
              toast.error("Güncelleme Başarısız.");
            }
          });
    },

    /* ---------- mutation'lar (MUT_ onekli) ---------- */
    MUT_setMekmarList(payload) {

          this.mekmarList = payload;
    },
    MUT_setMekmarButtonStatus(payload) {

          this.mekmarButtonStatus = payload;
    },
    MUT_setMekmarDetailOrdersList(payload) {

          let data = [];
          for (const item of payload.yearList) {
            const order = {
              year: item.Year,
              customerid: item.CustomerId,
              total: 0,
            };
            for (const item2 of payload.orderList) {
              if (item.Year == item2.Year) {
                order.total += item2.Total;
              }
            }
            data.push(order);
          }
          this.mekmarDetailOrdersList = data;
    },
    MUT_setMekmarDetailOrdersPoList(payload) {

          this.mekmarDetailOrdersPoList = payload;
    },
    MUT_setMekmarDetailOrdersPoProductsList(payload) {

          this.mekmarDetailOrdersPoProductsList = payload;
    },
    MUT_setOfferCustomerList(payload) {

          this.offerCustomerList = payload;
    },
    MUT_setOfferCustomerButtonStatus(payload) {

          this.offerCustomerButtonStatus = payload;
    },
    MUT_setBgpCustomerList(payload) {

          this.bgpCustomerList = payload;
    },
    MUT_setBgpCustomerButtonStatus(payload) {

          this.bgpCustomerButtonStatus = payload;
    },
    MUT_setFairCustomerList(payload) {

          this.fairCustomerList = payload;
    },
    MUT_setFairCustomerButtonStatus(payload) {

          this.fairCustomerButtonStatus = payload;
    },
    MUT_setSelectionCustomerList(payload) {

          this.selectionCustomerList = payload;
    },
    MUT_setSelectionCustomerButtonStatus(payload) {

          this.selectionCustomerButtonStatus = payload;
    },
  },
})
