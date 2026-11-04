import { defineStore } from "pinia"

/*
 * store/modules/order.js -> Pinia
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
 * Istatistik: 61 action, 40 mutation, 33 getter
 */
/*
 * store/modules/order.js'in BASINDAKI modul duzeyi kod -- aynen
 * tasindi. Govdelerden cagriliyor; tasinmazsa calisma aninda
 * "ReferenceError: ... is not defined" verir (derleme gecer).
 */
function __noneNullControl(value) {
  if (value == null || value == "" || value == undefined || value == " ") {
    return parseFloat(0);
  } else {
    return parseFloat(value);
  }
}

export const useOrderStore = defineStore("order", {
  state: () => ({
  orderProductionCustomer: "",
  orderList: [],
  orderListAll: [],
  orderProductionButtonStatus: false,
  orderProductionProductDetailList: [],
  orderProductionProductDetailNotChangeList: [],
  orderProductionPo: "",
  orderProductAdded: [],
  orderProductUpdated: [],
  orderProductDeleted: [],
  orderProductionCostList: [],
  orderProductionCostTotal: 0,
  orderProductionSupplierList: [],
  orderSupplierProductList: [],
  orderProductionDocumentList: [],
  orderProductionCheckList: [],
  orderProductionCheckListTotal: {
    crate: 0,
    box: 0,
    piece: 0,
    amount: 0,
    ton: 0,
  },
  orderProductionProductTotal: 0,
  orderProductionFreightTotal: 0,
  orderProductionDetailTotal: 0,
  orderProductionProductDetailTotal: {
    m2: 0,
    piece: 0,
    mt: 0,
    ton: 0,
    total: 0,
  },
  orderProductionProductDetailCostTotal: {
    supplier: 0,
    workerman: 0,
    brokerage: 0,
    freight: 0,
    detail: 0,
    fob: 0,
  },

  orderProductionProductDetailFobCostTotal: 0,
  orderProductionProductDetailWorkermanList: [],
  orderProductionYearsList: [],
  orderProductionSaveButtonStatus: false,
  orderProductionId: 0,
  orderProductionUploadProformaButtonStatus: true,
  orderProductionTotal: {
    order: 0,
    production: 0,
    ton: 0,
    price: 0,
    buying: 0,
  },
  orderProductionDivideList: [],
  orderProductionDivideOrderList: [],
  orderProductionInsuranceTotal: 0,
  orderProductionSourceTypes: [],
}),

  getters: {
    getOrderProductionCustomer: (state) => state.orderProductionCustomer,
    getOrderProductionSourceTypes: (state) => state.orderProductionSourceTypes,
    getOrderProductionDivideOrderList: (state) => state.orderProductionDivideOrderList,
    getOrderProductionDivideList: (state) => state.orderProductionDivideList,
    getOrderProductionTotal: (state) => state.orderProductionTotal,
    getOrderList: (state) => state.orderList,
    getOrderProductionButtonStatus: (state) => state.orderProductionButtonStatus,
    getOrderProductionProductDetailList: (state) => state.orderProductionProductDetailList,
    getOrderProductionProductDetailNotChangeList: (state) => state.orderProductionProductDetailNotChangeList,
    getOrderProductionPo: (state) => state.orderProductionPo,
    getOrderProductAdded: (state) => state.orderProductAdded,
    getOrderProductUpdated: (state) => state.orderProductUpdated,
    getOrderProductDeleted: (state) => state.orderProductDeleted,
    getOrderProductionCostList: (state) => state.orderProductionCostList,
    getOrderProductionCostTotal: (state) => state.orderProductionCostTotal,
    getOrderProductionSupplierList: (state) => state.orderProductionSupplierList,
    getOrderSupplierProductList: (state) => state.orderSupplierProductList,
    getOrderProductionDocumentList: (state) => state.orderProductionDocumentList,
    getOrderProductionCheckList: (state) => state.orderProductionCheckList,
    getOrderProductionCheckListTotal: (state) => state.orderProductionCheckListTotal,
    getOrderProductionProductTotalCalculation: (state) => state.orderProductionProductTotalCalculation,
    getOrderProductionProductTotal: (state) => state.orderProductionProductTotal,
    getOrderProductionFreightTotal: (state) => state.orderProductionFreightTotal,
    getOrderProductionInsuranceTotal: (state) => state.orderProductionInsuranceTotal,
    getOrderProductionDetailTotal: (state) => state.orderProductionDetailTotal,
    getOrderProductionProductDetailTotal: (state) => state.orderProductionProductDetailTotal,
    getOrderProductionProductDetailCostTotal: (state) => state.orderProductionProductDetailCostTotal,
    getOrderProductionProductDetailWorkermanList: (state) => state.orderProductionProductDetailWorkermanList,
    getOrderProductionYearsList: (state) => state.orderProductionYearsList,
    getOrderListAll: (state) => state.orderListAll,
    getOrderProductionSaveButtonStatus: (state) => state.orderProductionSaveButtonStatus,
    getOrderProductionId: (state) => state.orderProductionId,
    getOrderProductionUploadProformaButtonStatus: (state) => state.orderProductionUploadProformaButtonStatus,
  },

  actions: {
    /*
     * Sunucunun yanitinin TAMAMI donuyor -- yalnizca true/false degil.
     * Cagiran taraf uretilen iki PO numarasini (siparisno_giden /
     * siparisno_kalan), listeye girmedigi icin kalana tasinan urun
     * sayisini ve hata durumunda sunucunun mesajini gosteriyor. Onceki
     * surum yaniti bool'a indirgediginden kullaniciya "Error"dan baska
     * bir sey soylenemiyordu.
     */
    /*
     * DIKKAT -- useApi() bir OFETCH ORNEGI, axios degil.
     *
     * Burada once `useApi().post(url, body)` yaziliyordu. ofetch ornegine
     * yalnizca .raw / .native / .create eklenir (ofetch kaynagi,
     * shared/ofetch.*.mjs:335-337); .post / .get / .put / .delete YOKTUR.
     * Yani bu satir "useApi(...).post is not a function" TypeError'i
     * atiyordu -- action async OLMADIGI icin de senkron atiyordu, yani
     * cagirandaki .then/.catch zinciri HIC kurulmuyordu: DivideDialog'un
     * .catch'i bile devreye girmiyor, saving=true takili kaliyor ve
     * kullanici sonsuza kadar donen bir dugmeye bakiyordu.
     *
     * Hic fark edilmemesinin sebebi: bu bir YAZMA yolu, ve
     * server/middleware/0.readonly-guard.ts GET disindaki her /api
     * istegini 403'luyor -- ekranda denenmesi mumkun degildi.
     *
     * Dogru kullanim ornegi: stores/supplier.ts (api(url, {method, body})).
     */
    setDivide(payload) {
      const api = useApi()
      return api("/order/divide", { method: "POST", body: payload })
    },
    setProductionDivideOrderListUpdate(payload) {

          return new Promise((resolve, reject) => {
            this.MUT_setProductionDivideOrderListUpdate(payload);
            resolve(true);
          });
    },
    setProductionDivideOrderList(payload) {

          return new Promise((resolve, resject) => {
            this.MUT_setProductionDivideOrderList(payload);
            resolve(true);
          });
    },
    setOrdersProductsDivideList(po) {
      const legacyApi = useLegacyApi()

          return new Promise(async (resolve, reject) => {
            await legacyApi
              .get("/orders/product/divide/list/" + po)
              .then((response) => {
                if (response) {
                  this.MUT_setOrdersProductsDivideList(response.data.list
                  );
                  resolve(true);
                } else {
                  resolve(false);
                }
              });
          });
    },
    setOrderOnHoldMekmerList() {
      const legacyApi = useLegacyApi()

          legacyApi.get("/order/onhold/mekmer/list").then((response) => {
            if (response.data.list) {
              this.MUT_setOrderList(response.data.list);
              this.MUT_setOrderProductionYearsList(response.data.years);
              this.MUT_setOrderListAll(response.data.list);
              this.MUT_setOrderProductionTotal(response.data.list);
            }
          });
    },
    setOrderProductionMekmerList() {
      const legacyApi = useLegacyApi()

          return new Promise(async (resolve, reject) => {
            legacyApi.get("/order/production/mekmer/list").then((response) => {
              if (response.data.list) {
                this.MUT_setOrderList(response.data.list);
                this.MUT_setOrderProductionYearsList(response.data.years
                );
                this.MUT_setOrderListAll(response.data.list);
                this.MUT_setOrderProductionTotal(response.data.list);
                resolve(true);
              }
            });
          });
    },
    setOrderProductionTotal(list) {

          this.MUT_setOrderProductionTotal(list);
    },
    setOrderProductionIsfDelete(event) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()
      const sharedStore = useSharedStore()

          legacyApi
            .get(
              `/production/isf/delete/${event.ID}/${event.EvrakAdi}/${event.SiparisNo}`
            )
            .then((response) => {
              if (response.data.status) {
                sharedStore.endLoading();
                toast.success("Isf Silindi.");
                this.MUT_setOrderProductionProformaDelete(event.ID);
              } else {
                toast.error("Isf Silme Başarısız.");
              }
            });
    },
    setOrderProductionProformaDelete(id) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

          legacyApi.get(`/production/proforma/delete/${id}`).then((response) => {
            if (response.data.status) {
              toast.success("Proforma Silindi.");
              this.MUT_setOrderProductionProformaDelete(id);
            } else {
              toast.error("Proforma Silme Başarısız.");
            }
          });
    },
    setOrderProductionMekmer2List() {
      const legacyApi = useLegacyApi()

          legacyApi.get("/order/production/mekmer2/list").then((response) => {
            if (response.data.list) {
              this.MUT_setOrderList(response.data.list);
              this.MUT_setOrderProductionYearsList(response.data.years);
              this.MUT_setOrderListAll(response.data.list);
              this.MUT_setOrderProductionTotal(response.data.list);
            }
          });
    },
    setOrderProductionList() {
      const legacyApi = useLegacyApi()

          legacyApi.get("/order/production/list").then(async (response) => {
            if (response.data.list) {
              await this.MUT_setOrderList(response.data.list);
              await this.MUT_setOrderProductionYearsList(response.data.years
              );
              await this.MUT_setOrderListAll(response.data.list);
              await this.MUT_setOrderProductionTotal(response.data.list);
            }
          });
    },
    setOrderProductionListYear(year) {
      const legacyApi = useLegacyApi()

          legacyApi.get(`/order/production/list/year/${year}`).then((response) => {
            if (response.data.list) {
              this.MUT_setOrderList(response.data.list);
              this.MUT_setOrderProductionTotal(response.data.list);
            }
          });
    },
    setOrderShippedList() {
      const legacyApi = useLegacyApi()
      const sharedStore = useSharedStore()

          sharedStore.beginLoading();
          legacyApi.get("/order/shipped/list").then((response) => {
            if (response.data.list) {
              this.MUT_setOrderList(response.data.list);
              this.MUT_setOrderProductionYearsList(response.data.years);
              this.MUT_setOrderProductionTotal(response.data.list);
            }
          })
            .catch((err) => {
              console.error("setOrderShippedList basarisiz:", err)
            })
            /*
             * endLoading `if (response.data.list)` ICINDEYDI: istek
             * BASARILI ama liste bos donerse sayac dusmuyor, yukleme
             * katmani tum tiklamalari yakaladigi icin ekran kilitli
             * kaliyordu. finally uc yolda da (bos liste / hata / basari)
             * kapatir.
             */
            .finally(() => {
              sharedStore.endLoading()
            });
    },
    setOrderShippedMekmerList() {
      const legacyApi = useLegacyApi()
      const sharedStore = useSharedStore()

          sharedStore.beginLoading();
          legacyApi.get("/order/shipped/mekmer/list").then((response) => {
            if (response.data.list) {
              this.MUT_setOrderList(response.data.list);
              this.MUT_setOrderProductionYearsList(response.data.years);
              this.MUT_setOrderProductionTotal(response.data.list);
            }
          })
            .catch((err) => {
              console.error("setOrderShippedMekmerList basarisiz:", err)
            })
            /*
             * endLoading `if (response.data.list)` ICINDEYDI: istek
             * BASARILI ama liste bos donerse sayac dusmuyor, yukleme
             * katmani tum tiklamalari yakaladigi icin ekran kilitli
             * kaliyordu. finally uc yolda da (bos liste / hata / basari)
             * kapatir.
             */
            .finally(() => {
              sharedStore.endLoading()
            });
    },
    setOrderShippedMekmer2List() {
      const legacyApi = useLegacyApi()
      const sharedStore = useSharedStore()

          sharedStore.beginLoading();
          legacyApi.get("/order/shipped/mekmer2/list").then((response) => {
            if (response.data.list) {
              this.MUT_setOrderList(response.data.list);
              this.MUT_setOrderProductionYearsList(response.data.years);
              this.MUT_setOrderProductionTotal(response.data.list);
            }
          })
            .catch((err) => {
              console.error("setOrderShippedMekmer2List basarisiz:", err)
            })
            /*
             * endLoading `if (response.data.list)` ICINDEYDI: istek
             * BASARILI ama liste bos donerse sayac dusmuyor, yukleme
             * katmani tum tiklamalari yakaladigi icin ekran kilitli
             * kaliyordu. finally uc yolda da (bos liste / hata / basari)
             * kapatir.
             */
            .finally(() => {
              sharedStore.endLoading()
            });
    },
    setOrderShippedMekmer2ListYears(year) {
      const legacyApi = useLegacyApi()
      const sharedStore = useSharedStore()

          sharedStore.beginLoading();
          legacyApi.get(`/order/shipped/mekmer2/list/${year}`).then((response) => {
            if (response.data.list) {
              this.MUT_setOrderList(response.data.list);
              this.MUT_setOrderProductionYearsList(response.data.years);
              this.MUT_setOrderProductionTotal(response.data.list);
            }
          })
            .catch((err) => {
              console.error("setOrderShippedMekmer2ListYears basarisiz:", err)
            })
            /*
             * endLoading `if (response.data.list)` ICINDEYDI: istek
             * BASARILI ama liste bos donerse sayac dusmuyor, yukleme
             * katmani tum tiklamalari yakaladigi icin ekran kilitli
             * kaliyordu. finally uc yolda da (bos liste / hata / basari)
             * kapatir.
             */
            .finally(() => {
              sharedStore.endLoading()
            });
    },
    filterShipment(filter) {
      const legacyApi = useLegacyApi()
      const sharedStore = useSharedStore()

          sharedStore.beginLoadingDatatable();

          legacyApi.post(`/order/shipped/list/filter`, filter).then((response) => {
            if (response.data.list) {
              this.MUT_setOrderList(response.data.list);
              this.MUT_setOrderProductionTotal(response.data.list);

              sharedStore.endLoadingDatatable();
            }
          });
    },
    setFilterShipmentGlobal(filter) {
      const legacyApi = useLegacyApi()
      const sharedStore = useSharedStore()

          sharedStore.beginLoadingDatatable();

          legacyApi
            .get(`/order/shipped/list/filter/global/${filter}`)
            .then((response) => {
              if (response.data.list) {
                this.MUT_setOrderList(response.data.list);
                this.MUT_setOrderProductionTotal(response.data.list);

                sharedStore.endLoadingDatatable();
              }
            });
    },
    setOrderShippedListYear(year) {
      const legacyApi = useLegacyApi()
      const sharedStore = useSharedStore()

          sharedStore.beginLoading();
          legacyApi.get(`/order/shipped/list/year/${year}`).then((response) => {
            if (response.data.list) {
              this.MUT_setOrderList(response.data.list);
              this.MUT_setOrderProductionTotal(response.data.list);
            }
          })
            .catch((err) => {
              console.error("setOrderShippedListYear basarisiz:", err)
            })
            /*
             * endLoading `if (response.data.list)` ICINDEYDI: istek
             * BASARILI ama liste bos donerse sayac dusmuyor, yukleme
             * katmani tum tiklamalari yakaladigi icin ekran kilitli
             * kaliyordu. finally uc yolda da (bos liste / hata / basari)
             * kapatir.
             */
            .finally(() => {
              sharedStore.endLoading()
            });
    },
    setOrderWaitingList() {
      const legacyApi = useLegacyApi()
      const sharedStore = useSharedStore()

          sharedStore.beginLoading();

          legacyApi.get("/order/waiting/list").then((response) => {
            if (response.data.list) {
              this.MUT_setOrderList(response.data.list);
              this.MUT_setOrderProductionYearsList(response.data.years);
              this.MUT_setOrderProductionTotal(response.data.list);
            }
          })
            .catch((err) => {
              console.error("setOrderWaitingList basarisiz:", err)
            })
            /*
             * endLoading `if (response.data.list)` ICINDEYDI: istek
             * BASARILI ama liste bos donerse sayac dusmuyor, yukleme
             * katmani tum tiklamalari yakaladigi icin ekran kilitli
             * kaliyordu. finally uc yolda da (bos liste / hata / basari)
             * kapatir.
             */
            .finally(() => {
              sharedStore.endLoading()
            });
    },
    setOrderWaitingListYear(year) {
      const legacyApi = useLegacyApi()
      const sharedStore = useSharedStore()

          sharedStore.beginLoading();
          legacyApi.get(`/order/waiting/list/year/${year}`).then((response) => {
            if (response.data.list) {
              this.MUT_setOrderList(response.data.list);
              this.MUT_setOrderProductionTotal(response.data.list);
            }
          })
            .catch((err) => {
              console.error("setOrderWaitingListYear basarisiz:", err)
            })
            /*
             * endLoading `if (response.data.list)` ICINDEYDI: istek
             * BASARILI ama liste bos donerse sayac dusmuyor, yukleme
             * katmani tum tiklamalari yakaladigi icin ekran kilitli
             * kaliyordu. finally uc yolda da (bos liste / hata / basari)
             * kapatir.
             */
            .finally(() => {
              sharedStore.endLoading()
            });
    },
    setOrderProductionButtonStatus(payload) {

          this.MUT_setOrderProductionButtonStatus(payload);
    },
    setOrderProductionProductDetailList(po) {
      const legacyApi = useLegacyApi()

          legacyApi
            .get(`/order/production/product/detail/list/${po}`)
            .then((response) => {
              this.MUT_setOrderProductionProductDetailList(response.data.list
              );
              this.MUT_setOrderProductionProductTotal(response.data.list
              );
              this.setOrderProductionProductDetailTotal(response.data.list
              );
            });
    },
    setOrderProductionProductDetailMekmerList(po) {
      const legacyApi = useLegacyApi()

          legacyApi
            .get(`/order/production/product/detail/mekmer/list/${po}`)
            .then((response) => {
              this.MUT_setOrderProductionProductDetailList(response.data.list
              );
              this.MUT_setOrderProductionProductTotal(response.data.list
              );
              this.setOrderProductionProductDetailTotal(response.data.list
              );
            });
    },
    setOrderProductionPo(po) {

          this.MUT_setOrderProductionPo(po);
    },
    setOrderProductionCustomer(customer) {

          this.MUT_setOrderProductionCustomer(customer);
    },
    setOrderProductAdded(payload) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()
      const modelsStore = useModelsStore()

          legacyApi
            .post("/order/production/product/add", payload)
            .then((response) => {
              if (response.data.status) {
                toast.success("Başarıyla Eklendi.");
                this.MUT_setOrderProductAdded({
                  ...payload,
                  ID: response.data.id,
                });
                this.setOrderProductionCheckList(payload.SiparisNo
                );
                this.setOrderProductionSupplierList(payload.SiparisNo
                );
                modelsStore.setOrderProductModel();
              } else {
                toast.error("Ekleme İşlemi Başarısız.");
              }
            });
    },
    setOrderProductUpdated(payload) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()
      const modelsStore = useModelsStore()

          legacyApi
            .put("/order/production/product/update", payload)
            .then((response) => {
              if (response.data.status) {
                toast.success("Başarıyla Güncellendi.");
                this.MUT_setOrderProductUpdated(payload);
                modelsStore.setOrderProductModel();
                this.setOrderProductionCheckList(payload.SiparisNo
                );

                this.setOrderProductionSupplierList(payload.SiparisNo
                );
              } else {
                toast.error("Güncelleme Başarısız.");
              }
            });
    },
    setOrderProductDeleted(payload) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()
      const modelsStore = useModelsStore()

          legacyApi
            .delete(`/order/production/product/delete/${payload.ID}`)
            .then((response) => {
              if (response.data.status) {
                toast.success("Başarıyla Silindi.");
                this.MUT_setOrderProductDeleted(payload);
                this.setOrderProductionSupplierList(payload.SiparisNo
                );
                modelsStore.setOrderProductModel();
              } else {
                toast.error("Silme İşlemi Başarısız.");
              }
            });
    },
    setOrderProformaUpload(payload) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

          legacyApi
            .post("/order/production/proforma/upload", payload)
            .then((response) => {
              if (response.data.status) {
                toast.success("Başarıyla Yüklendi");
                this.setOrderProductionDocumentList(payload.po);
              } else {
                toast.error("Yükleme Başarısız");
              }
            });
    },
    setOrderProductionCostList(po) {
      const legacyApi = useLegacyApi()

          legacyApi.get(`/order/production/cost/list/${po}`).then((response) => {
            this.MUT_setOrderProductionCostList(response.data.list);
            this.setOrderProductionCostTotal(response.data.list);
          });
    },
    setOrderProductionCostTotal(payload) {

          this.MUT_setOrderProductionCostTotal(payload);
    },
    setOrderProductionSupplierList(po) {
      const legacyApi = useLegacyApi()

          legacyApi
            .get(`/order/production/product/supplier/${po}`)
            .then((response) => {
              this.MUT_setOrderProductionSupplierList(response.data.list
              );
            });
    },
    setOrderSupplierProductList(payload) {
      const legacyApi = useLegacyApi()

          legacyApi
            .get(
              `/order/production/supplier/product/${payload.po}/${payload.supplier}`
            )
            .then((response) => {
              this.MUT_setOrderSupplierProductList(response.data.list);
            });
    },
    setProductionProductSupplierIsfSave(payload) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

          return new Promise((resolve, reject) => {
            legacyApi
              .post("/order/production/supplier/isf/save", payload)
              .then((response) => {
                if (response.data.status) {
                  toast.success("Başarıyla Kaydedildi.");
                  this.setOrderProductionList();
                  this.setOrderProductionDocumentList(payload.po);
                  resolve(true);
                } else {
                  toast.error("Kaydetme Başarısız.");
                  resolve(false);
                }
              });
          });
    },
    setOrderProductionDocumentList(po) {
      const legacyApi = useLegacyApi()

          legacyApi
            .get(`/order/production/product/document/${po}`)
            .then((response) => {
              this.MUT_setOrderProductionDocumentList(response.data.list
              );
            });
    },
    setOrderProductionCheckList(po) {
      const legacyApi = useLegacyApi()

          legacyApi
            .get(`/order/production/product/check/${po}`)
            .then((response) => {
              this.MUT_setOrderProductionCheckList(response.data.list);
              this.setOrderProductionCheckListTotal(response.data.list
              );
            });
    },
    setOrderProductionCheckMekmerList(po) {
      const legacyApi = useLegacyApi()

          legacyApi
            .get(`/order/production/product/check/mekmer/${po}`)
            .then((response) => {
              this.MUT_setOrderProductionCheckList(response.data.list);
              this.setOrderProductionCheckListTotal(response.data.list
              );
            });
    },
    setOrderProductionCheckListTotal(payload) {

          this.MUT_setOrderProductionCheckListTotal(payload);
    },
    setOrderProductionDetailListReset() {

          this.MUT_setOrderProductionDetailListReset();
    },
    setOrderProductionSave(production) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

          legacyApi.post("/order/production/save", production).then((response) => {
            if (response.data.status) {
              toast.success(
                "Başarıyla Kaydedildi. Ürünlerinizi Girebilirsiniz!"
              );
              this.setOrderProductionButtonStatus(false);
              this.setOrderProductionSaveButtonStatus(false);
              this.setOrderProductionId(response.data.id);
              this.setOrderProductionUploadProformaButtonStatus(false
              );
            } else {
              toast.error("Kaydetme Başarısız");
            }
          });
    },
    setOrderProductionUpdate(production) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

          legacyApi.put("/order/production/update", production).then((response) => {
            if (response.data.status) {
              toast.success("Başarıyla Güncellendi.");
            } else {
              toast.error("Güncelleme Başarısız");
            }
          });
    },
    setOrderProductionProductTotal(product) {

          this.MUT_setOrderProductionProductTotal(product);
    },
    setOrderProductionFreightTotal(freight) {

          this.MUT_setOrderProductionFreightTotal(freight);
    },
    setOrderProductionInsuranceTotal(insurance) {

          if (
            insurance == null ||
            insurance == undefined ||
            insurance == " " ||
            insurance == ""
          ) {
            this.MUT_setOrderProductionInsuranceTotal(0);
          } else {
            this.MUT_setOrderProductionInsuranceTotal(insurance);
          }
    },
    setOrderProductionDetailTotal(detail) {

          this.MUT_setOrderProductionDetailTotal(detail);
    },
    setOrderProductionProductDetailTotal(detail) {

          this.MUT_setOrderProductionProductDetailTotal(detail);
    },
    setOrderProductionProductDetailCostTotal(production) {

          this.MUT_setOrderProductionProductDetailCostTotal(production);
    },
    setProductionProductWorkermanList(workerman) {
      const legacyApi = useLegacyApi()

          legacyApi
            .get(
              `/order/production/product/workerman/${workerman.po}/${workerman.productId}`
            )
            .then((response) => {
              this.MUT_setProductionProductWorkermanList(response.data.list
              );
              this.MUT_setProductionProductWorkermanCalculation(response.data.workerman
              );
            });
    },
    setProductionProductWorkermanSave(workerman) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()
      const modelsStore = useModelsStore()

          legacyApi
            .post("/order/production/product/workerman/save", workerman)
            .then((response) => {
              if (response.data.status) {
                const data = {
                  productId: workerman.UrunKartId,
                  po: workerman.SiparisNo,
                };
                this.setProductionProductWorkermanList(data);
                modelsStore.setOrderProductWorkermanModel();
                this.setOrderProductionProductDetailList(workerman.SiparisNo
                );
                // this.MUT_addWorkerman({ ID:response.data.id,...workerman });
                toast.success("Başarıyla Kaydedildi.");
              } else {
                toast.error("Kaydetme Başarısız.");
              }
            });
    },
    setProductionProductWorkermanDelete(workerman) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()
      const modelsStore = useModelsStore()

          legacyApi
            .delete(`/order/production/product/workerman/delete/${workerman.ID}`)
            .then((response) => {
              if (response.data.status) {
                const data = {
                  productId: workerman.UrunKartId,
                  po: workerman.SiparisNo,
                };
                toast.success("Başarıyla Silindi");
                this.setOrderProductionProductDetailList(workerman.SiparisNo
                );
                modelsStore.setOrderProductWorkermanModel();
                this.setProductionProductWorkermanList(data);
              } else {
                toast.error("Silme Başarısız.");
              }
            });
    },
    setProductionProductWorkermanUpdate(workerman) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()
      const modelsStore = useModelsStore()

          legacyApi
            .put("/order/production/product/workerman/update", workerman)
            .then((response) => {
              if (response.data.status) {
                const data = {
                  productId: workerman.UrunKartId,
                  po: workerman.SiparisNo,
                };
                toast.success("Başarıyla Güncellendi");
                this.setOrderProductionProductDetailList(workerman.SiparisNo
                );

                this.setProductionProductWorkermanList(data);
                modelsStore.setOrderProductWorkermanModel();
              } else {
                toast.error("Güncelleme Başarısız.");
              }
            });
    },
    setProductionProductSaveMail(production) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

          legacyApi
            .post("/order/production/product/save/mail", production)
            .then((response) => {
              if (response.data.status) {
                toast.success("Mail Gönderildi.");

                this.setProductionProductMailReset();
              }
            });
    },
    setProductionProductMailReset() {

          this.MUT_setProductionProductMailReset();
    },
    setOrderProductionSaveButtonStatus(status) {

          this.MUT_setOrderProductionSaveButtonStatus(status);
    },
    setOrderProductionProductDetailNotChangeList(product) {

          this.MUT_setOrderProductionProductDetailNotChangeList(product);
    },
    setOrderProductionProductDetailNotChangeListReset() {

          this.MUT_setOrderProductionProductDetailNotChangeListReset();
    },
    setOrderProductionId(id) {

          this.MUT_setOrderProductionId(id);
    },
    setOrderProductionUploadProformaButtonStatus(status) {

          this.MUT_setOrderProductionUploadProformaButtonStatus(status);
    },
    setOrderProductionIsfSendMail(payload) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

          legacyApi.post("/production/isf/send/mail", payload).then((response) => {
            if (response.data.status) {
              toast.success("Mail Gönderildi.");
            }
          });
    },
    setOrderProductionSourceTypes(payload) {
      const legacyApi = useLegacyApi()

          legacyApi.get("/order/production/source/types").then((response) => {
            this.MUT_setOrderProductionSourceTypes(response.data.list);
          });
    },

    /* ---------- mutation'lar (MUT_ onekli) ---------- */
    MUT_setOrderProductionCustomer(payload) {

          this.orderProductionCustomer = payload;
    },
    MUT_setOrderProductionSourceTypes(payload) {

          this.orderProductionSourceTypes = payload;
    },
    MUT_addWorkerman(payload) {

          this.orderProductionProductDetailWorkermanList.push(payload);
    },
    MUT_setProductionDivideOrderListUpdate(payload) {

          if (this.orderProductionDivideOrderList.length > 0) {
            const index = this.orderProductionDivideOrderList.findIndex(
              (x) => x.id == payload.id
            );
            this.orderProductionDivideOrderList.splice(index, 1, payload);
          } else {
            return;
          }
    },
    MUT_setProductionDivideOrderList(payload) {

          this.orderProductionDivideOrderList.push(payload);
    },
    MUT_setProductionDivideOrderListReset() {

          this.orderProductionDivideOrderList = [];
    },
    MUT_setOrdersProductsDivideList(list) {

          this.orderProductionDivideList = list;
    },
    MUT_setOrderProductionTotal(list) {
          /*
           * Toplama YEREL degiskende, state'te DEGIL.
           *
           * Her `this.orderProductionTotal.x += ...` bir REAKTIF YAZMA; bu
           * mutation DataTable'in @filter olayindan bir acilista 5-6 kez
           * cagriliyor, yani maliyet satir sayisiyla carpiliyor. State'e
           * TEK SEFERDE yazmak olculen 3.1x fark yaratti (8241b3c88).
           *
           * Toplama ifadeleri YERINDE kaldi -- yalnizca hedefi yerel
           * degisken oldu, yani toplama SIRASI (ve kayan nokta sonucu)
           * birebir ayni.
           */
          let order = 0;
          let production = 0;
          let ton = 0;
          let price = 0;
          let buying = 0;
          list.forEach((x) => {
            order += __noneNullControl(x.Miktar);
            production += __noneNullControl(x.Uretim);
            ton += __noneNullControl(x.Ton);
            price += __noneNullControl(x.SatisToplam);
            buying += __noneNullControl(x.AlisFiyati);
          });

          this.orderProductionTotal = {
            order,
            production,
            ton,
            price,
            buying,
          };
    },
    MUT_setOrderProductionProformaDelete(id) {

          const index = this.orderProductionDocumentList.findIndex(
            (x) => x.ID == id
          );
          this.orderProductionDocumentList.splice(index, 1);
    },
    MUT_setOrderList(payload) {

          this.orderList = Object.freeze(payload);
    },
    MUT_setOrderListAll(payload) {

          this.orderListAll = Object.freeze(payload);
    },
    MUT_setOrderProductionButtonStatus(payload) {

          this.orderProductionButtonStatus = payload;
    },
    MUT_setOrderProductionProductDetailList(payload) {

          this.orderProductionProductDetailList = payload;
    },
    MUT_setOrderProductionProductDetailNotChangeList(payload) {

          this.orderProductionProductDetailNotChangeList.push(payload);
    },
    MUT_setOrderProductionProductDetailNotChangeListReset() {

          this.orderProductionProductDetailNotChangeList = [];
    },
    MUT_setOrderProductionPo(payload) {

          this.orderProductionPo = payload;
    },
    MUT_setOrderProductAdded(payload) {

          this.orderProductAdded.push(payload);
          this.orderProductionProductDetailList.push(payload);
          this.orderProductionProductDetailNotChangeList.push(payload);
          this.orderProductionProductTotal = 0;
          this.orderProductionProductDetailList.forEach((x) => {
            this.orderProductionProductTotal += x.SatisToplam;
          });
          this.orderProductionProductDetailTotal = {
            m2: 0,
            piece: 0,
            mt: 0,
            ton: 0,
            total: 0,
          };
          this.orderProductionProductDetailCostTotal.supplier = 0;
          this.orderProductionProductDetailCostTotal.workerman = 0;
          this.orderProductionProductDetailList.forEach((x) => {
            if (x.UrunBirimID == 1) {
              this.orderProductionProductDetailTotal.m2 += parseFloat(x.Miktar);
              this.orderProductionProductDetailTotal.piece += x.Adet;
            } else if (x.UrunBirimID == 2) {
              this.orderProductionProductDetailTotal.piece += parseFloat(x.Miktar);
              this.orderProductionProductDetailTotal.m2 += x.OzelMiktar;
            } else if (x.UrunBirimID == 3) {
              this.orderProductionProductDetailTotal.mt += parseFloat(x.Miktar);
              this.orderProductionProductDetailTotal.piece += x.Adet;
              this.orderProductionProductDetailTotal.m2 += x.OzelMiktar;
            }
            this.orderProductionProductDetailTotal.ton += parseFloat(x.Ton);
            this.orderProductionProductDetailTotal.total += x.Miktar * x.SatisFiyati;
            this.orderProductionProductDetailCostTotal.supplier +=
              x.Miktar * x.AlisFiyati;
            if (x.Iscilik == null) {
              this.orderProductionProductDetailCostTotal.workerman = 0;
            } else {
              this.orderProductionProductDetailCostTotal.workerman += x.Iscilik;
            }
          });
    },
    MUT_setOrderProductDeleted(payload) {

          this.orderProductDeleted.push(payload);
          const index = this.orderProductionProductDetailList.findIndex(
            (x) => x.ID == payload.ID
          );
          this.orderProductionProductDetailList.splice(index, 1);
          this.orderProductionProductDetailNotChangeList.splice(index, 1);

          this.orderProductionProductTotal = 0;
          this.orderProductionProductDetailList.forEach((x) => {
            this.orderProductionProductTotal += x.SatisToplam;
          });
          this.orderProductionProductDetailTotal = {
            m2: 0,
            piece: 0,
            mt: 0,
            ton: 0,
            total: 0,
          };
          this.orderProductionProductDetailCostTotal.supplier = 0;
          this.orderProductionProductDetailCostTotal.workerman = 0;
          this.orderProductionProductDetailList.forEach((x) => {
            if (x.UrunBirimID == 1) {
              this.orderProductionProductDetailTotal.m2 += x.Miktar;
              this.orderProductionProductDetailTotal.piece += x.Adet;
            } else if (x.UrunBirimID == 2) {
              this.orderProductionProductDetailTotal.piece += x.Miktar;
              this.orderProductionProductDetailTotal.m2 += x.OzelMiktar;
            } else if (x.UrunBirimID == 3) {
              this.orderProductionProductDetailTotal.mt += x.Miktar;
              this.orderProductionProductDetailTotal.piece += x.Adet;
              this.orderProductionProductDetailTotal.m2 += x.OzelMiktar;
            }

            this.orderProductionProductDetailTotal.ton += x.Ton;
            this.orderProductionProductDetailTotal.total += x.Miktar * x.SatisFiyati;
            this.orderProductionProductDetailCostTotal.supplier +=
              x.Miktar * x.AlisFiyati;
            this.orderProductionProductDetailCostTotal.workerman += x.Iscilik;
          });
    },
    MUT_setOrderProductUpdated(payload) {

          const index2 = this.orderProductUpdated.findIndex(
            (x) => x.ID == payload.ID
          );

          if (index2 == -1) {
            this.orderProductUpdated.push(payload);
          } else {
            this.orderProductUpdated.splice(index2, 1, payload);
          }

          const index = this.orderProductionProductDetailList.findIndex(
            (x) => x.ID == payload.ID
          );
          this.orderProductionProductDetailList.splice(index, 1, payload);
          this.orderProductionProductTotal = 0;
          this.orderProductionProductDetailList.forEach((x) => {
            this.orderProductionProductTotal += x.SatisToplam;
          });
          this.orderProductionProductDetailTotal = {
            m2: 0,
            piece: 0,
            mt: 0,
            ton: 0,
            total: 0,
          };
          this.orderProductionProductDetailCostTotal.supplier = 0;
          this.orderProductionProductDetailCostTotal.workerman = 0;
          this.orderProductionProductDetailList.forEach((x) => {
            if (x.UrunBirimID == 1) {
              this.orderProductionProductDetailTotal.m2 += parseFloat(x.Miktar);
              this.orderProductionProductDetailTotal.piece += x.Adet;
            } else if (x.UrunBirimID == 2) {
              this.orderProductionProductDetailTotal.piece += parseFloat(x.Miktar);
              this.orderProductionProductDetailTotal.m2 += x.OzelMiktar;
            } else if (x.UrunBirimID == 3) {
              this.orderProductionProductDetailTotal.mt += parseFloat(x.Miktar);
              this.orderProductionProductDetailTotal.piece += x.Adet;
              this.orderProductionProductDetailTotal.m2 += x.OzelMiktar;
            }
            this.orderProductionProductDetailTotal.ton += parseFloat(x.Ton);
            this.orderProductionProductDetailTotal.total += x.Miktar * x.SatisFiyati;
            this.orderProductionProductDetailCostTotal.supplier +=
              x.Miktar * x.AlisFiyati;
            if (x.Iscilik == null) {
              this.orderProductionProductDetailCostTotal.workerman = 0;
            } else {
              this.orderProductionProductDetailCostTotal.workerman += x.Iscilik;
            }
          });
    },
    MUT_setOrderProductionCostList(payload) {

          this.orderProductionCostList = payload;
          this.orderProductionProductDetailCostTotal.fob = 0;
          payload.forEach((x) => {
            if (x.Tur == "Navlun" || x.Tur == "İşçilik") {
              this.orderProductionProductDetailCostTotal.fob += 0;
            } else {
              this.orderProductionProductDetailCostTotal.fob += x.tut;
            }
          });
    },
    MUT_setOrderProductionCostTotal(payload) {
          /*
           * Toplama YEREL degiskende, state'te DEGIL.
           *
           * Her `this.orderProductionCostTotal += ...` bir REAKTIF YAZMA; bu
           * mutation DataTable'in @filter olayindan bir acilista 5-6 kez
           * cagriliyor, yani maliyet satir sayisiyla carpiliyor. State'e
           * TEK SEFERDE yazmak olculen 3.1x fark yaratti (8241b3c88).
           *
           * Toplama ifadeleri YERINDE kaldi -- yalnizca hedefi yerel
           * degisken oldu, yani toplama SIRASI (ve kayan nokta sonucu)
           * birebir ayni.
           */
          let __total = 0;
          payload.forEach((x) => {
            __total += x.tut;
          });

          this.orderProductionCostTotal = __total;
    },
    MUT_setOrderProductionSupplierList(payload) {

          this.orderProductionSupplierList = payload;
    },
    MUT_setOrderSupplierProductList(payload) {

          this.orderSupplierProductList = payload;
    },
    MUT_setOrderProductionDocumentList(payload) {

          this.orderProductionDocumentList = payload;
    },
    MUT_setOrderProductionCheckList(payload) {

          this.orderProductionCheckList = payload;
    },
    MUT_setOrderProductionCheckListTotal(payload) {
          /*
           * Toplama YEREL degiskende, state'te DEGIL.
           *
           * Her `this.orderProductionCheckListTotal.x += ...` bir REAKTIF YAZMA; bu
           * mutation DataTable'in @filter olayindan bir acilista 5-6 kez
           * cagriliyor, yani maliyet satir sayisiyla carpiliyor. State'e
           * TEK SEFERDE yazmak olculen 3.1x fark yaratti (8241b3c88).
           *
           * Toplama ifadeleri YERINDE kaldi -- yalnizca hedefi yerel
           * degisken oldu, yani toplama SIRASI (ve kayan nokta sonucu)
           * birebir ayni.
           */
          let crate = 0;
          let box = 0;
          let piece = 0;
          let amount = 0;
          let ton = 0;
          /*
           * ORTAK KASALAR TEK FIZIKSEL KASADIR: kasa adedi, grubun ILK
           * satiri olarak isaretlenmis satir sayisidir
           * (api/index.js -> kasaGruplariniUygula, KasaGrupIlk alani).
           *
           * Gruplama KAPALIYSA (api/sql/UretimTBKasaGrup.sql
           * calistirilmadiysa) alan HIC GELMEZ; o durumda
           * `=== undefined` dali her satiri sayar, yani davranis
           * eskisiyle birebir ayni kalir.
           */
          crate += payload.filter((x) =>
            x.KasaGrupIlk === undefined ? true : x.KasaGrupIlk
          ).length;
          payload.forEach((x) => {
            box += x.KutuAdet;
            piece += x.Adet;
            amount += x.Miktar;
            ton += x.Ton;
          });

          this.orderProductionCheckListTotal = {
            crate,
            box,
            piece,
            amount,
            ton,
          };
    },
    MUT_setOrderProductionDetailListReset() {

          this.orderProductionCostList = [];
          this.orderProductionCostTotal = 0;
          this.orderProductionSupplierList = [];
          this.orderSupplierProductList = [];
          this.orderProductionDocumentList = [];
          this.orderProductionCheckList = [];
          this.orderProductionProductDetailList = [];
          this.orderProductionCheckListTotal = {
            crate: 0,
            box: 0,
            piece: 0,
            amount: 0,
            ton: 0,
          };

          this.orderProductionProductTotal = 0;
          this.orderProductionFreightTotal = 0;
          this.orderProductionDetailTotal = 0;
          this.orderProductionProductDetailTotal = {
            m2: 0,
            piece: 0,
            mt: 0,
            ton: 0,
            total: 0,
          };
          this.orderProductionProductDetailCostTotal = {
            supplier: 0,
            workerman: 0,
            brokerage: 0,
            freight: 0,
            detail: 0,
            fob: 0,
          };

          this.orderProductionProductDetailFobCostTotal = 0;
          this.orderProductionProductDetailWorkermanList = [];
    },
    MUT_setOrderProductionProductTotal(payload) {
          /*
           * Toplama YEREL degiskende, state'te DEGIL.
           *
           * Her `this.orderProductionProductTotal += ...` bir REAKTIF YAZMA; bu
           * mutation DataTable'in @filter olayindan bir acilista 5-6 kez
           * cagriliyor, yani maliyet satir sayisiyla carpiliyor. State'e
           * TEK SEFERDE yazmak olculen 3.1x fark yaratti (8241b3c88).
           *
           * Toplama ifadeleri YERINDE kaldi -- yalnizca hedefi yerel
           * degisken oldu, yani toplama SIRASI (ve kayan nokta sonucu)
           * birebir ayni.
           */
          let __total = 0;
          payload.forEach((x) => {
            __total += x.SatisToplam;
          });

          this.orderProductionProductTotal = __total;
    },
    MUT_setOrderProductionFreightTotal(payload) {

          this.orderProductionFreightTotal = payload;
    },
    MUT_setOrderProductionInsuranceTotal(payload) {

          this.orderProductionInsuranceTotal = payload;
    },
    MUT_setOrderProductionDetailTotal(payload) {

          this.orderProductionDetailTotal =
            parseFloat(payload.DetayTutar_1) +
            parseFloat(payload.DetayTutar_2) +
            parseFloat(payload.DetayTutar_3);
    },
    MUT_setOrderProductionProductDetailTotal(payload) {

          this.orderProductionProductDetailTotal = {
            m2: 0,
            piece: 0,
            mt: 0,
            ton: 0,
            total: 0,
          };
          this.orderProductionProductDetailCostTotal.supplier = 0;
          this.orderProductionProductDetailCostTotal.workerman = 0;

          payload.forEach((x) => {
            if (x.UrunBirimID == 1) {
              this.orderProductionProductDetailTotal.m2 += x.Miktar;
              this.orderProductionProductDetailTotal.piece += x.Adet;
            } else if (x.UrunBirimID == 2) {
              this.orderProductionProductDetailTotal.piece += x.Miktar;
              this.orderProductionProductDetailTotal.m2 += x.OzelMiktar;
            } else if (x.UrunBirimID == 3) {
              this.orderProductionProductDetailTotal.mt += x.Miktar;
              this.orderProductionProductDetailTotal.piece += x.Adet;
              this.orderProductionProductDetailTotal.m2 += x.OzelMiktar;
            }
            this.orderProductionProductDetailTotal.ton += x.Ton;
            this.orderProductionProductDetailTotal.total += x.Miktar * x.SatisFiyati;
            this.orderProductionProductDetailCostTotal.supplier +=
              x.Miktar * x.AlisFiyati;
            this.orderProductionProductDetailCostTotal.workerman += x.Iscilik;
          });
    },
    MUT_setOrderProductionProductDetailCostTotal(payload) {

          this.orderProductionProductDetailCostTotal.brokerage = 0;
          this.orderProductionProductDetailCostTotal.freight = 0;
          this.orderProductionProductDetailCostTotal.detail = 0;
          this.orderProductionProductDetailCostTotal.brokerage = parseFloat(
            payload.Komisyon
          );
          this.orderProductionProductDetailCostTotal.freight = parseFloat(
            payload.NavlunAlis
          );
          this.orderProductionProductDetailCostTotal.detail =
            parseFloat(payload.DetayAlis_1) +
            parseFloat(payload.DetayAlis_2) +
            parseFloat(payload.DetayAlis_3) +
            parseFloat(payload.EvrakGideri) +
            parseFloat(payload.sigorta_Tutar) +
            parseFloat(payload.DetayTutar_4);
    },
    MUT_setProductionProductWorkermanList(payload) {

          this.orderProductionProductDetailWorkermanList = payload;
    },
    MUT_setProductionProductWorkermanCalculation(payload) {

          if (payload.Tutar == null) {
            this.orderProductionProductDetailCostTotal.workerman = 0;
          } else {
            this.orderProductionProductDetailCostTotal.workerman = parseFloat(
              payload.Tutar
            );
          }
    },
    MUT_setProductionProductMailReset() {

          this.orderProductAdded = [];
          this.orderProductUpdated = [];
          this.orderProductDeleted = [];
    },
    MUT_setOrderProductionYearsList(payload) {

          this.orderProductionYearsList = payload;
    },
    MUT_setOrderProductionSaveButtonStatus(payload) {

          this.orderProductionSaveButtonStatus = payload;
    },
    MUT_setOrderProductionId(payload) {

          this.orderProductionId = payload;
    },
    MUT_setOrderProductionUploadProformaButtonStatus(payload) {

          this.orderProductionUploadProformaButtonStatus = payload;
    },
  },
})

