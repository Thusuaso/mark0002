import { defineStore } from "pinia"

/*
 * store/modules/reports.js -> Pinia
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
 * Istatistik: 60 action, 35 mutation, 65 getter
 */
export const useReportsStore = defineStore("reports", {
  state: () => ({
  reportsMekmerProductionList: [],
  reportsMekmerProductionListTotal: {
    amount: 0,
    crate: 0,
    piece: 0,
  },
  reportsMekmerStockList: [],
  reportsMekmerStockListTotal: {
    crate: 0,
    amount: 0,
  },
  reportsStockListDetail: [],
  reportsStockListDetailTotal: {
    amount: 0,
    piece: 0,
  },
  reportsMekmerMineList: [],
  reportsMekmerMineListTotal: {},
  reportsMekmarAyoList: [],
  reportsMekmarAyoListTotal: {
    proforma: 0,
    mekmerProduction: 0,
    mekmozProduction: 0,
    outerProduction: 0,
    transport: 0,
    duty: 0,
    spraying: 0,
    port: 0,
    insuranceBuyes: 0,
    insuranceSales: 0,
    freightBuyes: 0,
    lashing: 0,
    booking: 0,
    spanzlet: 0,
    detailBuyes1: 0,
    detailBuyes2: 0,
    detailBuyes3: 0,
    mekus: 0,
    specialwork: 0,
    bankCost: 0,
    fregileCost: 0,
    costTotal: 0,
    profitUsd: 0,
    profitTl: 0,
    commision: 0,
  },
  reportsMekmarAyoYearList: [],
  reportsMekmarAyoMonthList: [],

  reportsMekmarLoadingList: [],
  reportsMekmarLoadingListTotal: {
    fob: 0,
    ddp: 0,
  },
  reportsMekmarLoadingListYear: [],
  reportsMekmarLoadingListYearTotal: {
    fob: 0,
    ddp: 0,
  },
  loadingYears: [],
  loadingMonths: [],
  reportsMekmarForwardingList: [],
  reportsMekmarForwardingListTotal: {
    crate: 0,
    amount: 0,
    box: 0,
    piece: 0,
    total: 0,
  },
  reportsMekmarSummaryOrderList: [],
  reportsMekmarSummaryOrderListTotal: [],
  reportsMekmarSummaryOrderDetail: [],
  reportsMekmarSummaryOrderDetailTotal: {
    fob: 0,
    freight: 0,
    detail1: 0,
    detail2: 0,
    detail3: 0,
    detail4: 0,
    ddp: 0,
  },
  reportsMekmarSummaryOrderListByRepresentative: [],
  reportsMekmarSummaryOrderListByRepresentativeTotal: [],

  reportsMekmarSummaryForwardingList: [],
  reportsMekmarSummaryForwardingListTotal: [],

  reportsMekmarGuYearList: [],
  reportsMekmarGuContList: [],
  reportsMekmarGuContByCustList: [],
  reportsMekmarGuMekusList: [],
  reportsMekmarGuLogsList: [],
  reportsMekmarGuForwList: [],
  reportsMekmarGuOrderList: [],
  reportsMekmerAtlantaList: [],
  reportsMekmarMkList: [],
  reportsMekmarGuAyoList: [],
  reportsMekmarGuOrdererThisYear: [],
  reportsMekmarGuOrdererThisYearTotal: {
    fob: 0,
    ddp: 0,
  },
  reportsMekmarGuOrdererPreviousYear: [],
  reportsMekmarGuOrdererPreviousYearTotal: {
    fob: 0,
    ddp: 0,
  },
  reportsMekmarGuOrdererTwoYearAgo: [],
  reportsMekmarGuOrdererTwoYearAgoTotal: {
    fob: 0,
    ddp: 0,
  },
  reportsMekmarGuOperationThisYear: [],
  reportsMekmarGuOperationThisYearTotal: {
    fob: 0,
    ddp: 0,
  },
  reportsMekmarGuOperationPreviousYear: [],
  reportsMekmarGuOperationPreviousYearTotal: {
    fob: 0,
    ddp: 0,
  },
  reportsMekmarGuOperationTwoYearAgo: [],
  reportsMekmarGuOperationTwoYearAgoTotal: {
    fob: 0,
    ddp: 0,
  },

  mekmarGuSellerOrderDetailList: [],
  mekmarGuSellerOrderDetailListTotal: {
    fob: 0,
    ddp: 0,
    navlun: 0,
    detail1: 0,
    detail2: 0,
    detail3: 0,
    detail4: 0,
  },

  reportsMekmarGuOrdererThisYearForw: [],
  reportsMekmarGuOrdererThisYearTotalForw: {
    fob: 0,
    ddp: 0,
  },
  reportsMekmarGuOrdererPreviousYearForw: [],
  reportsMekmarGuOrdererPreviousYearTotalForw: {
    fob: 0,
    ddp: 0,
  },
  reportsMekmarGuOrdererTwoYearAgoForw: [],
  reportsMekmarGuOrdererTwoYearAgoTotalForw: {
    fob: 0,
    ddp: 0,
  },
  reportsMekmarGuOperationThisYearForw: [],
  reportsMekmarGuOperationThisYearTotalForw: {
    fob: 0,
    ddp: 0,
  },
  reportsMekmarGuOperationPreviousYearForw: [],
  reportsMekmarGuOperationPreviousYearTotalForw: {
    fob: 0,
    ddp: 0,
  },
  reportsMekmarGuOperationTwoYearAgoForw: [],
  reportsMekmarGuOperationTwoYearAgoTotalForw: {
    fob: 0,
    ddp: 0,
  },
  mekmarGuSelectedUser: {},
}),

  getters: {
    getMekmarGuSelectedUser: (state) => state.mekmarGuSelectedUser,
    getReportsMekmarGuOrdererThisYearForw: (state) => state.reportsMekmarGuOrdererThisYearForw,
    getReportsMekmarGuOrdererThisYearTotalForw: (state) => state.reportsMekmarGuOrdererThisYearTotalForw,
    getReportsMekmarGuOrdererPreviousYearForw: (state) => state.reportsMekmarGuOrdererPreviousYearForw,
    getReportsMekmarGuOrdererPreviousYearTotalForw: (state) => state.reportsMekmarGuOrdererPreviousYearTotalForw,
    getReportsMekmarGuOrdererTwoYearAgoForw: (state) => state.reportsMekmarGuOrdererTwoYearAgoForw,
    getReportsMekmarGuOrdererTwoYearAgoTotalForw: (state) => state.reportsMekmarGuOrdererTwoYearAgoTotalForw,
    getreportsMekmarGuOperationThisYearForw: (state) => state.reportsMekmarGuOperationThisYearForw,
    getReportsMekmarGuOperationThisYearTotalForw: (state) => state.reportsMekmarGuOperationThisYearTotalForw,
    getReportsMekmarGuOperationPreviousYearForw: (state) => state.reportsMekmarGuOperationPreviousYearForw,
    getReportsMekmarGuOperationPreviousYearTotalForw: (state) => state.reportsMekmarGuOperationPreviousYearTotalForw,
    getReportsMekmarGuOperationTwoYearAgoForw: (state) => state.reportsMekmarGuOperationTwoYearAgoForw,
    getReportsMekmarGuOperationTwoYearAgoTotalForw: (state) => state.reportsMekmarGuOperationTwoYearAgoTotalForw,
    getMekmarGuSellerOrderDetailListTotal: (state) => state.mekmarGuSellerOrderDetailListTotal,
    getMekmarGuSellerOrderDetailList: (state) => state.mekmarGuSellerOrderDetailList,
    getReportsMekmarGuOrdererThisYear: (state) => state.reportsMekmarGuOrdererThisYear,
    getReportsMekmarGuOrdererThisYearTotal: (state) => state.reportsMekmarGuOrdererThisYearTotal,
    getReportsMekmarGuOrdererPreviousYear: (state) => state.reportsMekmarGuOrdererPreviousYear,
    getReportsMekmarGuOrdererPreviousYearTotal: (state) => state.reportsMekmarGuOrdererPreviousYearTotal,
    getReportsMekmarGuOrdererTwoYearAgo: (state) => state.reportsMekmarGuOrdererTwoYearAgo,
    getReportsMekmarGuOrdererTwoYearAgoTotal: (state) => state.reportsMekmarGuOrdererTwoYearAgoTotal,
    getReportsMekmarGuOperationThisYear: (state) => state.reportsMekmarGuOperationThisYear,
    getReportsMekmarGuOperationThisYearTotal: (state) => state.reportsMekmarGuOperationThisYearTotal,
    getReportsMekmarGuOperationPreviousYear: (state) => state.reportsMekmarGuOperationPreviousYear,
    getReportsMekmarGuOperationPreviousYearTotal: (state) => state.reportsMekmarGuOperationPreviousYearTotal,
    getReportsMekmarGuOperationTwoYearAgo: (state) => state.reportsMekmarGuOperationTwoYearAgo,
    getReportsMekmarGuOperationTwoYearAgoTotal: (state) => state.reportsMekmarGuOperationTwoYearAgoTotal,
    getReportsMekmarGuAyoList: (state) => state.reportsMekmarGuAyoList,
    getReportsMekmarMkList: (state) => state.reportsMekmarMkList,
    getReportsMekmarSummaryOrderListByRepresentativeTotal: (state) => state.reportsMekmarSummaryOrderListByRepresentativeTotal,
    getReportsMekmarSummaryOrderListByRepresentative: (state) => state.reportsMekmarSummaryOrderListByRepresentative,
    getReportsMekmerProductionList: (state) => state.reportsMekmerProductionList,
    getReportsMekmerProductionListTotal: (state) => state.reportsMekmerProductionListTotal,
    getReportsMekmerStockList: (state) => state.reportsMekmerStockList,
    getReportsMekmerStockListTotal: (state) => state.reportsMekmerStockListTotal,
    getReportsStockListDetail: (state) => state.reportsStockListDetail,
    getReportsStockListDetailTotal: (state) => state.reportsStockListDetailTotal,
    getReportsMekmerMineList: (state) => state.reportsMekmerMineList,
    getReportsMekmarAyoList: (state) => state.reportsMekmarAyoList,
    getReportsMekmarAyoYearList: (state) => state.reportsMekmarAyoYearList,
    getReportsMekmarAyoMonthList: (state) => state.reportsMekmarAyoMonthList,
    getReportsMekmarAyoListTotal: (state) => state.reportsMekmarAyoListTotal,
    getReportsMekmarLoadingList: (state) => state.reportsMekmarLoadingList,
    getReportsMekmarLoadingListTotal: (state) => state.reportsMekmarLoadingListTotal,
    getReportsMekmarLoadingListYear: (state) => state.reportsMekmarLoadingListYear,
    getReportsMekmarLoadingListYearTotal: (state) => state.reportsMekmarLoadingListYearTotal,
    getLoadingYears: (state) => state.loadingYears,
    getLoadingMonths: (state) => state.loadingMonths,
    getreportsMekmarForwardingList: (state) => state.reportsMekmarForwardingList,
    getReportsMekmarForwardingListTotal: (state) => state.reportsMekmarForwardingListTotal,
    getReportsMekmarSummaryOrderList: (state) => state.reportsMekmarSummaryOrderList,
    getReportsMekmarSummaryOrderListTotal: (state) => state.reportsMekmarSummaryOrderListTotal,
    getReportsMekmarSummaryOrderDetail: (state) => state.reportsMekmarSummaryOrderDetail,
    getReportsMekmarSummaryOrderDetailTotal: (state) => state.reportsMekmarSummaryOrderDetailTotal,
    getReportsMekmarSummaryForwardingList: (state) => state.reportsMekmarSummaryForwardingList,
    getReportsMekmarSummaryForwardingListTotal: (state) => state.reportsMekmarSummaryForwardingListTotal,
    getReportsMekmarGuYearList: (state) => state.reportsMekmarGuYearList,
    getReportsMekmarGuContList: (state) => state.reportsMekmarGuContList,
    getReportsMekmarGuContByCustList: (state) => state.reportsMekmarGuContByCustList,
    getReportsMekmarGuMekusList: (state) => state.reportsMekmarGuMekusList,
    getReportsMekmarGuLogsList: (state) => state.reportsMekmarGuLogsList,
    getReportsMekmarGuForwList: (state) => state.reportsMekmarGuForwList,
    getReportsMekmerAtlantaList: (state) => state.reportsMekmerAtlantaList,
    getReportsMekmarGuOrderList: (state) => state.reportsMekmarGuOrderList,
  },

  actions: {
    setMekmarGuSelectedUser(payload) {

          this.MUT_setMekmarGuSelectedUser(payload);
    },
    setMekmarGuSellerOrderDetail(payload) {
      const legacyApi = useLegacyApi()

          return new Promise((resolve, reject) => {
            legacyApi
              .get(
                `/reports/gu/mekmar/order/seller/${payload.month}/${payload.year}/${payload.userId}`
              )
              .then((response) => {
                if (response) {
                  this.MUT_setMekmarGuSellerOrderDetail(response.data.detail
                  );
                  resolve(true);
                } else {
                  resolve(false);
                }
              });
          });
    },
    setMekmarGuOperationOrderDetail(payload) {
      const legacyApi = useLegacyApi()

          return new Promise((resolve, reject) => {
            legacyApi
              .get(
                `/reports/gu/mekmar/order/operation/${payload.month}/${payload.year}/${payload.userId}`
              )
              .then((response) => {
                if (response) {
                  this.MUT_setMekmarGuSellerOrderDetail(response.data.detail
                  );
                  resolve(true);
                } else {
                  resolve(false);
                }
              });
          });
    },
    setMekmarGuSellerForwardingDetail(payload) {
      const legacyApi = useLegacyApi()

          return new Promise((resolve, reject) => {
            legacyApi
              .get(
                `/reports/gu/mekmar/forwarding/seller/${payload.month}/${payload.year}/${payload.userId}`
              )
              .then((response) => {
                if (response) {
                  this.MUT_setMekmarGuSellerOrderDetail(response.data.detail
                  );
                  resolve(true);
                } else {
                  resolve(false);
                }
              });
          });
    },
    setMekmarGuOperationForwardingDetail(payload) {
      const legacyApi = useLegacyApi()

          return new Promise((resolve, reject) => {
            legacyApi
              .get(
                `/reports/gu/mekmar/forwarding/operation/${payload.month}/${payload.year}/${payload.userId}`
              )
              .then((response) => {
                if (response) {
                  this.MUT_setMekmarGuSellerOrderDetail(response.data.detail
                  );
                  resolve(true);
                } else {
                  resolve(false);
                }
              });
          });
    },
    setMekmarGuOrdererOperationList(userId) {
      const legacyApi = useLegacyApi()

          return new Promise((resolve, reject) => {
            legacyApi
              .get("/reports/mekmar/gu/operation/orderer/list/" + userId)
              .then((response) => {
                if (response) {
                  this.MUT_setMekmarGuOrdererOperationList(response.data
                  );
                  resolve(true);
                } else {
                  resolve(false);
                }
              });
          });
    },
    setReportsMekmarMkList(payload) {

          this.MUT_setReportsMekmarMkList(payload);
    },
    setReportsMekmarSummaryOrderListByRepresentative(userId) {
      const legacyApi = useLegacyApi()

          legacyApi
            .get(`/reports/mekmar/summary/order/list/by/representative/${userId}`)
            .then((response) => {
              this.MUT_setReportsMekmarSummaryOrderListByRepresentative(response.data.items
              );
              this.setReportsMekmarSummaryOrderListByRepresentativeTotal(response.data.items
              );
            });
    },
    setReportsMekmarSummaryOrderDetailRepresentative(payload) {
      const legacyApi = useLegacyApi()
      const sharedStore = useSharedStore()

          legacyApi
            .get(
              `/reports/mekmar/summary/order/list/by/representative/detail/${payload.userId}/${payload.month}/${payload.year}`
            )
            .then((response) => {
              this.MUT_setReportsMekmarSummaryOrderDetail(response.data.list
              );
              this.setReportsMekmarSummaryOrderDetailTotal(response.data.list
              );
              sharedStore.endLoading();
            });
    },
    setReportsMekmarSummaryOrderListByRepresentativeTotal(payload) {

          this.MUT_setReportsMekmarSummaryOrderListByRepresentativeTotal(payload
          );
    },
    /*
     * [x] setReportsMekmerFilteredProductionList TASINMADI -- OLU KOD.
     *
     * Vuex'teki hali:
     *     vuexContext.commit("reportsMekmerProductionFilterList", payload)
     * Boyle bir MUTATION HICBIR Vuex modulunde yok (yalnizca ayni adli
     * state alani ve bir getter var). Vuex namespaced olmadigi icin bu
     * cagri sessizce "[vuex] unknown mutation type" uyarisi birakip hicbir
     * sey yapmiyordu; getReportsMekmerProductionFilterList her zaman []
     * donuyordu.
     *
     * Ustelik action'i HICBIR YER dispatch etmiyor ve getter'i yalnizca
     * pages/reports/mekmer/production.vue mapGetters'a yaziyor, sablonda
     * ya da kodda HIC OKUMUYOR. Filtrelenen liste o sayfada kendi yerel
     * `mekmer_filtered_list` verisinde tutuluyor -- store'a hic ugramiyor.
     *
     * Yani: tasinacak davranis yok. state alani da birlikte kaldirildi.
     */
    setReportsMekmerProductionList(payload) {

          this.MUT_setReportsMekmerProductionList(payload);
          this.setReportsMekmerProductionTotal(payload);
    },
    setProductionFilterList(filter) {
      const legacyApi = useLegacyApi()
      const sharedStore = useSharedStore()

          sharedStore.beginLoading();
          legacyApi
            .post("/reports/mekmer/production/filter", filter)
            .then((response) => {
              this.MUT_setReportsMekmerProductionList(response.data.list
              );
              this.setReportsMekmerProductionTotal(response.data.list
              );
              sharedStore.endLoading();
            })
            .catch((err) => {
              console.error("setProductionFilterList basarisiz:", err)
              sharedStore.endLoading()
            });
    },
    setReportsMekmerProductionDate(payload) {
      const legacyApi = useLegacyApi()
      const sharedStore = useSharedStore()

          sharedStore.beginLoading();
          legacyApi
            .post("/reports/mekmer/production/date", payload)
            .then((response) => {
              this.MUT_setReportsMekmerProductionList(response.data.list
              );
              this.setReportsMekmerProductionTotal(response.data.list
              );
              sharedStore.endLoading();
            })
            .catch((err) => {
              console.error("setReportsMekmerProductionDate basarisiz:", err)
              sharedStore.endLoading()
            });
    },
    setReportsMekmerProductionTotal(payload) {

          this.MUT_setReportsMekmerProductionTotal(payload);
    },
    setReportsMekmerStockList() {
      const legacyApi = useLegacyApi()
      const sharedStore = useSharedStore()

          sharedStore.beginLoading();
          legacyApi.get("/reports/mekmer/stock/list").then((response) => {
            this.MUT_setReportsMekmerStockList(response.data.list);
            this.MUT_setReportsMekmerStockListTotal(response.data.list);
            sharedStore.endLoading();
          })
            .catch((err) => {
              console.error("setReportsMekmerStockList basarisiz:", err)
              sharedStore.endLoading()
            });
    },
    setReportsMekmerStockListStock() {
      const legacyApi = useLegacyApi()
      const sharedStore = useSharedStore()

          sharedStore.beginLoading();
          legacyApi.get("/reports/mekmer/stock/list/stock").then((response) => {
            this.MUT_setReportsMekmerStockList(response.data.list);
            this.MUT_setReportsMekmerStockListTotal(response.data.list);
            sharedStore.endLoading();
          })
            .catch((err) => {
              console.error("setReportsMekmerStockListStock basarisiz:", err)
              sharedStore.endLoading()
            });
    },
    setReportsMekmerStockListMekmer() {
      const legacyApi = useLegacyApi()
      const sharedStore = useSharedStore()

          sharedStore.beginLoading();
          legacyApi.get("/reports/mekmer/stock/list/mekmer").then((response) => {
            this.MUT_setReportsMekmerStockList(response.data.list);
            this.MUT_setReportsMekmerStockListTotal(response.data.list);
            sharedStore.endLoading();
          })
            .catch((err) => {
              console.error("setReportsMekmerStockListMekmer basarisiz:", err)
              sharedStore.endLoading()
            });
    },
    setReportsMekmerStockListMekmerIn() {
      const legacyApi = useLegacyApi()
      const sharedStore = useSharedStore()

          sharedStore.beginLoading();
          legacyApi.get("/reports/mekmer/stock/list/mekmer/in").then((response) => {
            this.MUT_setReportsMekmerStockList(response.data.list);
            this.MUT_setReportsMekmerStockListTotal(response.data.list);
            sharedStore.endLoading();
          })
            .catch((err) => {
              console.error("setReportsMekmerStockListMekmerIn basarisiz:", err)
              sharedStore.endLoading()
            });
    },
    setReportsMekmerStockListMekmoz() {
      const legacyApi = useLegacyApi()
      const sharedStore = useSharedStore()

          sharedStore.beginLoading();
          legacyApi.get("/reports/mekmer/stock/list/mekmoz").then((response) => {
            this.MUT_setReportsMekmerStockList(response.data.list);
            this.MUT_setReportsMekmerStockListTotal(response.data.list);
            sharedStore.endLoading();
          })
            .catch((err) => {
              console.error("setReportsMekmerStockListMekmoz basarisiz:", err)
              sharedStore.endLoading()
            });
    },
    setReportsMekmerStockListOuter() {
      const legacyApi = useLegacyApi()
      const sharedStore = useSharedStore()

          sharedStore.beginLoading();
          legacyApi.get("/reports/mekmer/stock/list/outer").then((response) => {
            this.MUT_setReportsMekmerStockList(response.data.list);
            this.MUT_setReportsMekmerStockListTotal(response.data.list);
            sharedStore.endLoading();
          })
            .catch((err) => {
              console.error("setReportsMekmerStockListOuter basarisiz:", err)
              sharedStore.endLoading()
            });
    },
    setReportsMekmerStockListOnlyStocksMekmer() {
      const legacyApi = useLegacyApi()
      const sharedStore = useSharedStore()

          sharedStore.beginLoading();
          legacyApi
            .get("/reports/mekmer/stock/list/only/mekmer")
            .then((response) => {
              this.MUT_setReportsMekmerStockList(response.data.list);
              this.MUT_setReportsMekmerStockListTotal(response.data.list
              );
              sharedStore.endLoading();
            })
            .catch((err) => {
              console.error("setReportsMekmerStockListOnlyStocksMekmer basarisiz:", err)
              sharedStore.endLoading()
            });
    },
    setReportsMekmerStockListTotal(payload) {

          this.MUT_setReportsMekmerStockListTotal(payload);
    },
    setReportsAllStockListDetail(payload) {
      const legacyApi = useLegacyApi()
      const sharedStore = useSharedStore()

          sharedStore.beginLoading();
          legacyApi.post("/reports/all/stock/detail", payload).then((response) => {
            this.MUT_setReportsStockListDetail(response.data.list);
            this.MUT_setReportsStockListDetailTotal(response.data.list);
            sharedStore.endLoading();
          })
            .catch((err) => {
              console.error("setReportsAllStockListDetail basarisiz:", err)
              sharedStore.endLoading()
            });
    },
    setReportsStockStockListDetail(payload) {
      const legacyApi = useLegacyApi()
      const sharedStore = useSharedStore()

          sharedStore.beginLoading();
          legacyApi
            .post("/reports/stock/stock/detail", payload)
            .then((response) => {
              this.MUT_setReportsStockListDetail(response.data.list);
              this.MUT_setReportsStockListDetailTotal(response.data.list
              );
              sharedStore.endLoading();
            })
            .catch((err) => {
              console.error("setReportsStockStockListDetail basarisiz:", err)
              sharedStore.endLoading()
            });
    },
    setReportsOuterStockListDetail(payload) {
      const legacyApi = useLegacyApi()
      const sharedStore = useSharedStore()

          sharedStore.beginLoading();
          legacyApi
            .post("/reports/outer/stock/detail", payload)
            .then((response) => {
              this.MUT_setReportsStockListDetail(response.data.list);
              this.MUT_setReportsStockListDetailTotal(response.data.list
              );
              sharedStore.endLoading();
            })
            .catch((err) => {
              console.error("setReportsOuterStockListDetail basarisiz:", err)
              sharedStore.endLoading()
            });
    },
    setReportsMekmerStockListDetail(payload) {
      const legacyApi = useLegacyApi()
      const sharedStore = useSharedStore()

          sharedStore.beginLoading();
          legacyApi
            .post("/reports/mekmer/stock/detail", payload)
            .then((response) => {
              this.MUT_setReportsStockListDetail(response.data.list);
              this.MUT_setReportsStockListDetailTotal(response.data.list
              );
              sharedStore.endLoading();
            })
            .catch((err) => {
              console.error("setReportsMekmerStockListDetail basarisiz:", err)
              sharedStore.endLoading()
            });
    },
    setReportsMekmerInStockListDetail(payload) {
      const legacyApi = useLegacyApi()
      const sharedStore = useSharedStore()

          sharedStore.beginLoading();
          legacyApi
            .post("/reports/mekmer/stock/detail/in", payload)
            .then((response) => {
              this.MUT_setReportsStockListDetail(response.data.list);
              this.MUT_setReportsStockListDetailTotal(response.data.list
              );
              sharedStore.endLoading();
            })
            .catch((err) => {
              console.error("setReportsMekmerInStockListDetail basarisiz:", err)
              sharedStore.endLoading()
            });
    },
    setReportsMekmozStockListDetail(payload) {
      const legacyApi = useLegacyApi()
      const sharedStore = useSharedStore()

          sharedStore.beginLoading();
          legacyApi
            .post("/reports/mekmoz/stock/detail", payload)
            .then((response) => {
              this.MUT_setReportsStockListDetail(response.data.list);
              this.MUT_setReportsStockListDetailTotal(response.data.list
              );
              sharedStore.endLoading();
            })
            .catch((err) => {
              console.error("setReportsMekmozStockListDetail basarisiz:", err)
              sharedStore.endLoading()
            });
    },
    setReportsMekmozStockListOnlyStocksMekmerDetail(payload) {
      const legacyApi = useLegacyApi()
      const sharedStore = useSharedStore()

          sharedStore.beginLoading();
          legacyApi
            .post("/reports/mekmer/stock/only/stock/mekmer/detail", payload)
            .then((response) => {
              this.MUT_setReportsStockListDetail(response.data.list);
              this.MUT_setReportsStockListDetailTotal(response.data.list
              );
              sharedStore.endLoading();
            })
            .catch((err) => {
              console.error("setReportsMekmozStockListOnlyStocksMekmerDetail basarisiz:", err)
              sharedStore.endLoading()
            });
    },
    setReportsStockListDetailTotal(payload) {

          this.MUT_setReportsStockListDetailTotal(payload);
    },
    setReportsMekmerMineList() {
      const legacyApi = useLegacyApi()

          legacyApi.get("/reports/mekmer/mine/list").then((response) => {
            this.MUT_setReportsMekmerMineList(response.data.list);
          });
    },
    setReportsMekmerMineListTotal(payload) {

          this.MUT_setReportsMekmerMineListTotal(payload);
    },
    setReportsMekmarAyoList(payload) {
      const legacyApi = useLegacyApi()
      const sharedStore = useSharedStore()

          sharedStore.beginLoading();
          legacyApi
            .get(`/reports/mekmar/ayo/list/${payload.year}/${payload.month}`)
            .then((response) => {
              this.MUT_setReportsMekmarAyoList(response.data.list);
              this.setReportsMekmarAyoListTotal(response.data.list
              );
              sharedStore.endLoading();
            })
            .catch((err) => {
              console.error("setReportsMekmarAyoList basarisiz:", err)
              sharedStore.endLoading()
            });
    },
    setReportsMekmarQuarterAyoList(payload) {
      const sharedStore = useSharedStore()

          sharedStore.beginLoading();

          this.MUT_setReportsMekmarAyoList(payload);
          this.setReportsMekmarAyoListTotal(payload);
          sharedStore.endLoading();
    },
    setReportsMekmarAyoListYear(year) {
      const legacyApi = useLegacyApi()
      const sharedStore = useSharedStore()

          sharedStore.beginLoading();
          legacyApi
            .get(`/reports/mekmar/ayo/by/year/list/${year}`)
            .then((response) => {
              this.MUT_setReportsMekmarAyoList(response.data.list);
              this.setReportsMekmarAyoListTotal(response.data.list
              );
              this.setReportsMekmarAyoMonthList(year);
              sharedStore.endLoading();
            })
            .catch((err) => {
              console.error("setReportsMekmarAyoListYear basarisiz:", err)
              sharedStore.endLoading()
            });
    },
    setReportsMekmarAyoListMonth(payload) {
      const legacyApi = useLegacyApi()
      const sharedStore = useSharedStore()

          sharedStore.beginLoading();
          legacyApi
            .get(`/reports/mekmar/ayo/list/${payload.year}/${payload.month}`)
            .then((response) => {
              this.MUT_setReportsMekmarAyoList(response.data.list);
              this.setReportsMekmarAyoListTotal(response.data.list
              );
              sharedStore.endLoading();
            })
            .catch((err) => {
              console.error("setReportsMekmarAyoListMonth basarisiz:", err)
              sharedStore.endLoading()
            });
    },
    setReportsMekmarAyoListTotal(payload) {

          this.MUT_setReportsMekmarAyoListTotal(payload);
    },
    setReportsMekmarAyoYearList() {
      const legacyApi = useLegacyApi()

          legacyApi.get("/reports/mekmar/ayo/year/list").then((response) => {
            this.MUT_setReportsMekmarAyoYearList(response.data.list);
          });
    },
    setReportsMekmarAyoMonthList(year) {
      const legacyApi = useLegacyApi()

          legacyApi
            .get(`/reports/mekmar/ayo/month/list/${year}`)
            .then((response) => {
              this.MUT_setReportsMekmarAyoMonthList(response.data.list);
            });
    },
    setLoadingListNotYear() {
      const legacyApi = useLegacyApi()
      const sharedStore = useSharedStore()

          sharedStore.beginLoading();

          legacyApi.get("/reports/loading/not/year/list").then((res) => {
            this.MUT_setLoadingList(res.data);
            this.MUT_setReportsMekmarLoadingListTotal(res.data.list);
            this.MUT_setReportsMekmarLoadingListYear(res.data.yearly);
            sharedStore.endLoading();
            sharedStore.setMonthList();
            sharedStore.setYearList();
          })
            .catch((err) => {
              console.error("setLoadingListNotYear basarisiz:", err)
              sharedStore.endLoading()
            });
    },
    setLoadingList(date) {
      const legacyApi = useLegacyApi()
      const sharedStore = useSharedStore()

          sharedStore.beginLoading();

          legacyApi
            .get(`/reports/loading/list/${date.year}/${date.month}`)
            .then((response) => {
              this.MUT_setLoadingList(response.data);
              this.MUT_setReportsMekmarLoadingListTotal(response.data.list
              );
              this.MUT_setReportsMekmarLoadingListYear(response.data.yearly
              );
              sharedStore.endLoading();
            })
            .catch((err) => {
              console.error("setLoadingList basarisiz:", err)
              sharedStore.endLoading()
            });
    },
    setLoadingByCustomerList(date) {
      const legacyApi = useLegacyApi()
      const sharedStore = useSharedStore()

          sharedStore.beginLoading();

          legacyApi
            .get(`/reports/loading/list/by/customer/${date.year}/${date.month}`)
            .then((response) => {
              const data = [];
              response.data.list.forEach((x) => {
                data.push({ ...x, YuklemeTarihi: "", SiparisNo: "" });
              });
              this.MUT_setLoadingCustomerList(data);
              this.MUT_setReportsMekmarLoadingListTotal(data);
              sharedStore.endLoading();
            })
            .catch((err) => {
              console.error("setLoadingByCustomerList basarisiz:", err)
              sharedStore.endLoading()
            });
    },
    setYearlyMonthList(year) {
      const legacyApi = useLegacyApi()
      const sharedStore = useSharedStore()

          return new Promise((resolve, reject) => {
            legacyApi.get(`/reports/loading/list/${year}`).then((response) => {
              if (response) {
                resolve(response.data.months);
                sharedStore.MUT_setMonthList(response.data.months);
              } else {
                resolve(false);
              }
            });
          });
    },
    setReportsMekmarLoadingListTotal(list) {

          this.MUT_setReportsMekmarLoadingListTotal(list);
    },
    setReportsMekmarLoadingListYear(list) {

          this.MUT_setReportsMekmarLoadingListYear(list);
    },
    setReportsMekmarForwardingList() {
      const legacyApi = useLegacyApi()
      const sharedStore = useSharedStore()

          sharedStore.beginLoading();
          legacyApi.get("/reports/mekmar/forwarding/list").then((response) => {
            this.MUT_setReportsMekmarForwardingList(response.data.list);
            this.setReportsMekmarForwardingListTotal(response.data.list
            );
            sharedStore.endLoading();
          })
            .catch((err) => {
              console.error("setReportsMekmarForwardingList basarisiz:", err)
              sharedStore.endLoading()
            });
    },
    setForwardingFilterList(filter) {
      const legacyApi = useLegacyApi()
      const sharedStore = useSharedStore()

          sharedStore.beginLoading();
          legacyApi
            .post("/reports/mekmar/forwarding/filter", filter)
            .then((response) => {
              this.MUT_setReportsMekmarForwardingList(response.data.list
              );
              this.setReportsMekmarForwardingListTotal(response.data.list
              );
              sharedStore.endLoading();
            })
            .catch((err) => {
              console.error("setForwardingFilterList basarisiz:", err)
              sharedStore.endLoading()
            });
    },
    setReportsMekmarForwardingListTotal(payload) {

          this.MUT_setReportsMekmarForwardingListTotal(payload);
    },
    setReportsMekmarForwardingDate(payload) {
      const legacyApi = useLegacyApi()
      const sharedStore = useSharedStore()

          sharedStore.beginLoading();
          legacyApi
            .post(`/reports/mekmar/forwarding/date`, payload)
            .then((response) => {
              this.MUT_setReportsMekmarForwardingList(response.data.list
              );
              this.setReportsMekmarForwardingListTotal(response.data.list
              );
              sharedStore.endLoading();
            })
            .catch((err) => {
              console.error("setReportsMekmarForwardingDate basarisiz:", err)
              sharedStore.endLoading()
            });
    },
    setReportsMekmarSummaryOrderList() {
      const legacyApi = useLegacyApi()
      const sharedStore = useSharedStore()

          sharedStore.beginLoading();
          legacyApi.get("/reports/mekmar/summary/order/list").then((response) => {
            this.MUT_setReportsMekmarSummaryOrderList(response.data.items
            );
            this.setReportsMekmarSummaryOrderListTotal(response.data.items
            );
            sharedStore.endLoading();
          })
            .catch((err) => {
              console.error("setReportsMekmarSummaryOrderList basarisiz:", err)
              sharedStore.endLoading()
            });
    },
    setReportsMekmarSummaryOrderListTotal(payload) {

          this.MUT_setReportsMekmarSummaryOrderListTotal(payload);
    },
    setReportsMekmarSummaryForwardingList() {
      const legacyApi = useLegacyApi()

          legacyApi
            .get("/reports/mekmar/summary/forwarding/list")
            .then((response) => {
              this.MUT_setReportsMekmarSummaryForwardingList(response.data.items
              );
              this.MUT_setReportsMekmarSummaryForwardingListTotal(response.data.items
              );
            });
    },
    setReportsMekmarSummaryForwardingListTotal(payload) {

          this.MUT_setReportsMekmarSummaryForwardingListTotal(payload);
    },
    setReportsMekmarSummaryOrderDetail(payload) {
      const legacyApi = useLegacyApi()
      const sharedStore = useSharedStore()

          sharedStore.beginLoading();
          legacyApi
            .post("/reports/mekmar/summary/order/detail/list", payload)
            .then((response) => {
              this.MUT_setReportsMekmarSummaryOrderDetail(response.data.list
              );
              this.setReportsMekmarSummaryOrderDetailTotal(response.data.list
              );
              sharedStore.endLoading();
            })
            .catch((err) => {
              console.error("setReportsMekmarSummaryOrderDetail basarisiz:", err)
              sharedStore.endLoading()
            });
    },
    setReportsMekmarSummaryOrderDetailTotal(payload) {

          this.MUT_setReportsMekmarSummaryOrderDetailTotal(payload);
    },
    setReportsMekmarSummaryForwardingDetail(payload) {
      const legacyApi = useLegacyApi()
      const sharedStore = useSharedStore()

          sharedStore.beginLoading();
          legacyApi
            .post("/reports/mekmar/summary/forwarding/detail/list", payload)
            .then((response) => {
              this.MUT_setReportsMekmarSummaryOrderDetail(response.data.list
              );
              this.setReportsMekmarSummaryOrderDetailTotal(response.data.list
              );
              sharedStore.endLoading();
            })
            .catch((err) => {
              console.error("setReportsMekmarSummaryForwardingDetail basarisiz:", err)
              sharedStore.endLoading()
            });
    },
    setReportsMekmarGuList() {
      const legacyApi = useLegacyApi()
      const sharedStore = useSharedStore()

          sharedStore.beginLoading();
          legacyApi.get("/reports/mekmar/gu/list").then((response) => {
            this.MUT_setReportsMekmarGuList(response.data);
            sharedStore.endLoading();
          })
            .catch((err) => {
              console.error("setReportsMekmarGuList basarisiz:", err)
              sharedStore.endLoading()
            });
    },
    setReportsMekmarGuListYear(payload) {
      const legacyApi = useLegacyApi()

          legacyApi.get(`/reports/mekmar/gu/list/${payload}`).then((response) => {
            this.MUT_setReportsMekmarGuList(response.data);
          });
    },
    setReportsMekmerAtlantaList() {
      const legacyApi = useLegacyApi()
      const sharedStore = useSharedStore()

          sharedStore.beginLoading();
          legacyApi.get("/reports/mekmer/atlanta/list").then((response) => {
            this.MUT_setReportsMekmerAtlantaList(response.data.list);
            sharedStore.endLoading();
          })
            .catch((err) => {
              console.error("setReportsMekmerAtlantaList basarisiz:", err)
              sharedStore.endLoading()
            });
    },

    /* ---------- mutation'lar (MUT_ onekli) ---------- */
    MUT_setMekmarGuSelectedUser(payload) {

          this.mekmarGuSelectedUser = payload;
    },
    MUT_setMekmarGuSellerOrderDetail(payload) {

          this.mekmarGuSellerOrderDetailListTotal = {
            fob: 0,
            ddp: 0,
            navlun: 0,
            detail1: 0,
            detail2: 0,
            detail3: 0,
            detail4: 0,
          };
          this.mekmarGuSellerOrderDetailList = payload;
          payload.forEach((x) => {
            this.mekmarGuSellerOrderDetailListTotal.fob += x.FOB;
            this.mekmarGuSellerOrderDetailListTotal.ddp += x.DDP;
            this.mekmarGuSellerOrderDetailListTotal.navlun += x.Navlun;
            this.mekmarGuSellerOrderDetailListTotal.detail1 += x.Detay1;
            this.mekmarGuSellerOrderDetailListTotal.detail2 += x.Detay2;
            this.mekmarGuSellerOrderDetailListTotal.detail3 += x.Detay3;
            this.mekmarGuSellerOrderDetailListTotal.detail4 += x.Detay4;
          });
    },
    MUT_setMekmarGuOrdererOperationList(payload) {

          this.reportsMekmarGuOrdererThisYear = [];
          this.reportsMekmarGuOrdererThisYearTotal = {
            fob: 0,
            ddp: 0,
          };
          this.reportsMekmarGuOrdererPreviousYear = [];
          this.reportsMekmarGuOrdererPreviousYearTotal = {
            fob: 0,
            ddp: 0,
          };
          this.reportsMekmarGuOrdererTwoYearAgo = [];
          this.reportsMekmarGuOrdererTwoYearAgoTotal = {
            fob: 0,
            ddp: 0,
          };
          this.reportsMekmarGuOperationThisYear = [];
          this.reportsMekmarGuOperationThisYearTotal = {
            fob: 0,
            ddp: 0,
          };
          this.reportsMekmarGuOperationPreviousYear = [];
          this.reportsMekmarGuOperationPreviousYearTotal = {
            fob: 0,
            ddp: 0,
          };
          (this.reportsMekmarGuOperationTwoYearAgo = []),
            (this.reportsMekmarGuOperationTwoYearAgoTotal = {
              fob: 0,
              ddp: 0,
            });
          this.reportsMekmarGuOrdererThisYear = payload.thisYearOrderer;
          this.reportsMekmarGuOrdererPreviousYear = payload.previusYearOrderer;
          this.reportsMekmarGuOrdererTwoYearAgo = payload.twoYearOrderer;
          this.reportsMekmarGuOperationThisYear = payload.thisYearOperation;
          this.reportsMekmarGuOperationPreviousYear = payload.previusYearOperation;
          this.reportsMekmarGuOperationTwoYearAgo = payload.twoYearOperation;

          payload.thisYearOrderer.forEach((x) => {
            this.reportsMekmarGuOrdererThisYearTotal.fob += x.FOB;
            this.reportsMekmarGuOrdererThisYearTotal.ddp += x.DDP;
          });
          payload.previusYearOrderer.forEach((x) => {
            this.reportsMekmarGuOrdererPreviousYearTotal.fob += x.FOB;
            this.reportsMekmarGuOrdererPreviousYearTotal.ddp += x.DDP;
          });
          payload.twoYearOrderer.forEach((x) => {
            this.reportsMekmarGuOrdererTwoYearAgoTotal.fob += x.FOB;
            this.reportsMekmarGuOrdererTwoYearAgoTotal.ddp += x.DDP;
          });

          payload.thisYearOperation.forEach((x) => {
            this.reportsMekmarGuOperationThisYearTotal.fob += x.FOB;
            this.reportsMekmarGuOperationThisYearTotal.ddp += x.DDP;
          });
          payload.previusYearOperation.forEach((x) => {
            this.reportsMekmarGuOperationPreviousYearTotal.fob += x.FOB;
            this.reportsMekmarGuOperationPreviousYearTotal.ddp += x.DDP;
          });
          payload.twoYearOperation.forEach((x) => {
            this.reportsMekmarGuOperationTwoYearAgoTotal.fob += x.FOB;
            this.reportsMekmarGuOperationTwoYearAgoTotal.ddp += x.DDP;
          });

          /*Forw */
          (this.reportsMekmarGuOrdererThisYearForw = []),
            (this.reportsMekmarGuOrdererThisYearTotalForw = {
              fob: 0,
              ddp: 0,
            });
          this.reportsMekmarGuOrdererThisYearForw = payload.thisYearForwarding;
          payload.thisYearForwarding.forEach((x) => {
            this.reportsMekmarGuOrdererThisYearTotalForw.fob += x.FOB;
            this.reportsMekmarGuOrdererThisYearTotalForw.ddp += x.DDP;
          });

          this.reportsMekmarGuOrdererPreviousYearForw = [];
          this.reportsMekmarGuOrdererPreviousYearTotalForw = {
            fob: 0,
            ddp: 0,
          };

          this.reportsMekmarGuOrdererPreviousYearForw =
            payload.previousYearForwarding;
          payload.previousYearForwarding.forEach((x) => {
            this.reportsMekmarGuOrdererPreviousYearTotalForw.fob += x.FOB;
            this.reportsMekmarGuOrdererPreviousYearTotalForw.ddp += x.DDP;
          });

          this.reportsMekmarGuOrdererTwoYearAgoForw = [];
          this.reportsMekmarGuOrdererTwoYearAgoTotalForw = {
            fob: 0,
            ddp: 0,
          };

          this.reportsMekmarGuOrdererTwoYearAgoForw = payload.twoYearAgoForwarding;
          payload.twoYearAgoForwarding.forEach((x) => {
            this.reportsMekmarGuOrdererTwoYearAgoTotalForw.fob += x.FOB;
            this.reportsMekmarGuOrdererTwoYearAgoTotalForw.ddp += x.DDP;
          });

          this.reportsMekmarGuOperationThisYearForw = [];
          this.reportsMekmarGuOperationThisYearTotalForw = {
            fob: 0,
            ddp: 0,
          };

          this.reportsMekmarGuOperationThisYearForw =
            payload.thisYearOperationForwarding;
          payload.thisYearOperationForwarding.forEach((x) => {
            this.reportsMekmarGuOperationThisYearTotalForw.fob += x.FOB;
            this.reportsMekmarGuOperationThisYearTotalForw.ddp += x.DDP;
          });

          this.reportsMekmarGuOperationPreviousYearForw = [];
          this.reportsMekmarGuOperationPreviousYearTotalForw = {
            fob: 0,
            ddp: 0,
          };
          this.reportsMekmarGuOperationPreviousYearForw =
            payload.previousYearOperationForwarding;
          payload.previousYearOperationForwarding.forEach((x) => {
            this.reportsMekmarGuOperationPreviousYearTotalForw.fob += x.FOB;
            this.reportsMekmarGuOperationPreviousYearTotalForw.ddp += x.DDP;
          });
          this.reportsMekmarGuOperationTwoYearAgoForw = [];
          this.reportsMekmarGuOperationTwoYearAgoTotalForw = {
            fob: 0,
            ddp: 0,
          };
          this.reportsMekmarGuOperationTwoYearAgoForw =
            payload.twoYearAgoOperationForwarding;
          payload.twoYearAgoOperationForwarding.forEach((x) => {
            this.reportsMekmarGuOperationTwoYearAgoTotalForw.fob += x.FOB;
            this.reportsMekmarGuOperationTwoYearAgoTotalForw.ddp += x.DDP;
          });
    },
    MUT_setReportsMekmarMkList(payload) {

          this.reportsMekmarMkList = payload;
    },
    MUT_setLoadingList(payload) {

          this.reportsMekmarLoadingList = payload.list;
          this.reportsMekmarLoadingListYear = payload.yearly;
    },
    MUT_setLoadingCustomerList(payload) {

          this.reportsMekmarLoadingList = payload;
    },
    MUT_setReportsMekmerProductionList(payload) {
          /*
           * markRaw: SATIR NESNELERI PROXY'LENMESIN.
           *
           * Bu liste 1960 satir x 17 alan (bu yilin tum uretimi). Pinia
           * state'ine duz atandiginda Vue her satiri derin reaktif
           * yapiyor -- ~33 bin ozellik icin proxy. Ustelik DataTable
           * listeyi suzup siraliyor ve bunu bir sayfa acilisinda 6 KEZ
           * yapiyor (asagidaki nota bakin), yani butun o proxy'lerden
           * tekrar tekrar geciliyor.
           *
           * markRaw dizinin ICINI reaktiflikten cikariyor; state
           * ozelligine ATAMA yine izleniyor, yani liste degisince tablo
           * guncellenmeye devam ediyor. Kaybedilen tek sey satirlarin
           * KENDI ICINDE degistiginde tepki vermesi -- bu liste
           * yalnizca okunuyor (tablo gosterimi + Excel ciktisi),
           * secim/duzenleme yok, hicbir yerde satira yazilmiyor.
           *
           * Olculdu (1960 satir, headless Chrome, ilk render):
           *     dev,  markRaw yok   593 ms
           *     dev,  markRaw var   385 ms
           *
           * DIKKAT: satirlar ileride duzenlenebilir hale getirilirse
           * (editMode / v-model ile hucre) markRaw KALDIRILMALI, yoksa
           * degisiklikler ekrana yansimaz.
           */
          this.reportsMekmerProductionList = markRaw(payload);
    },
    MUT_setReportsMekmerStockList(payload) {

          this.reportsMekmerStockList = payload;
    },
    MUT_setReportsMekmerProductionTotal(payload) {
          /*
           * DIKKAT -- TOPLAMA YEREL DEGISKENDE, STATE'TE DEGIL.
           *
           * Nuxt 2'deki hali her satirda DOGRUDAN state'e yaziyordu:
           *     this.reportsMekmerProductionListTotal.amount += item.Miktar
           * 1960 satir x 2 alan = 3920 REAKTIF YAZMA, ve bu mutation
           * DataTable'in @filter olayindan cagriliyor, yani bir sayfa
           * acilisinda 6 kez. Toplam ~23 bin reaktif yazma; her biri
           * aboneleri uyandiriyor (tablo altliklari bu nesneyi okuyor).
           *
           * Olculdu (1960 satir, headless Chrome, dev, ilk render):
           *     dongu icinde state'e yazarken   1848 ms
           *     yerel degiskende toplayarak      593 ms   (3.1x)
           *
           * Vue 2'de bu ucuzdu (dep notify cok daha hafifti); Vue 3'te
           * her yazma proxy + scheduler maliyeti demek. Sonuc ayni,
           * tek fark state'e TEK SEFERDE yazilmasi.
           */
          let amount = 0;
          let piece = 0;
          for (const item of payload) {
            amount += item.Miktar;
            piece += item.Adet;
          }

          this.reportsMekmerProductionListTotal = {
            amount,
            crate: payload.length,
            piece,
          };
    },
    MUT_setReportsMekmerStockListTotal(payload) {
          /*
           * Toplama YEREL degiskende, state'te DEGIL.
           *
           * Her `this.reportsMekmerStockListTotal.x += ...` bir REAKTIF YAZMA; bu
           * mutation DataTable'in @filter olayindan bir acilista 5-6 kez
           * cagriliyor, yani maliyet satir sayisiyla carpiliyor. State'e
           * TEK SEFERDE yazmak olculen 3.1x fark yaratti (8241b3c88).
           *
           * Toplama ifadeleri YERINDE kaldi -- yalnizca hedefi yerel
           * degisken oldu, yani toplama SIRASI (ve kayan nokta sonucu)
           * birebir ayni.
           */
          let crate = 0;
          let amount = 0;
          for (const item of payload) {
            crate += item.KasaSayisi;
            amount += item.Toplam;
          }

          this.reportsMekmerStockListTotal = {
            crate,
            amount,
          };
    },
    MUT_setReportsStockListDetail(payload) {

          this.reportsStockListDetail = payload;
    },
    MUT_setReportsStockListDetailTotal(payload) {
          /*
           * Toplama YEREL degiskende, state'te DEGIL.
           *
           * Her `this.reportsStockListDetailTotal.x += ...` bir REAKTIF YAZMA; bu
           * mutation DataTable'in @filter olayindan bir acilista 5-6 kez
           * cagriliyor, yani maliyet satir sayisiyla carpiliyor. State'e
           * TEK SEFERDE yazmak olculen 3.1x fark yaratti (8241b3c88).
           *
           * Toplama ifadeleri YERINDE kaldi -- yalnizca hedefi yerel
           * degisken oldu, yani toplama SIRASI (ve kayan nokta sonucu)
           * birebir ayni.
           */
          let amount = 0;
          let piece = 0;
          for (const item of payload) {
            amount += item.Miktar;
            piece += item.Adet;
          }

          this.reportsStockListDetailTotal = {
            amount,
            piece,
          };
    },
    MUT_setReportsMekmerMineList(payload) {

          this.reportsMekmerMineList = payload;
    },
    MUT_setReportsMekmerMineListTotal(payload) {

    },
    MUT_setReportsMekmarAyoList(payload) {

          this.reportsMekmarAyoList = payload;
    },
    MUT_setReportsMekmarAyoYearList(payload) {

          this.reportsMekmarAyoYearList = payload.filter((x) => x.Yil >= 2019);
    },
    MUT_setReportsMekmarAyoMonthList(payload) {

          this.reportsMekmarAyoMonthList = payload;
    },
    MUT_setReportsMekmarAyoListTotal(payload) {
          /*
           * Toplama YEREL degiskende, state'te DEGIL.
           *
           * Her `this.reportsMekmarAyoListTotal.x += ...` bir REAKTIF YAZMA; bu
           * mutation DataTable'in @filter olayindan bir acilista 5-6 kez
           * cagriliyor, yani maliyet satir sayisiyla carpiliyor. State'e
           * TEK SEFERDE yazmak olculen 3.1x fark yaratti (8241b3c88).
           *
           * Toplama ifadeleri YERINDE kaldi -- yalnizca hedefi yerel
           * degisken oldu, yani toplama SIRASI (ve kayan nokta sonucu)
           * birebir ayni.
           */
          let proforma = 0;
          let mekmerProduction = 0;
          let mekmozProduction = 0;
          let outerProduction = 0;
          let transport = 0;
          let duty = 0;
          let spraying = 0;
          let port = 0;
          let insuranceBuyes = 0;
          let freightBuyes = 0;
          let lashing = 0;
          let booking = 0;
          let spanzlet = 0;
          let detailBuyes1 = 0;
          let detailBuyes2 = 0;
          let detailBuyes3 = 0;
          let mekus = 0;
          let specialwork = 0;
          let bankCost = 0;
          let fregileCost = 0;
          let costTotal = 0;
          let profitUsd = 0;
          let profitTl = 0;
          let commision = 0;
          payload.forEach((x) => {
            proforma += x.toplam_bedel;
            mekmerProduction += x.mekmar_alim;
            mekmozProduction += x.mekmoz_alim;
            outerProduction += x.dis_alim;
            transport += x.nakliye;
            duty += x.gumruk;
            spraying += x.ilaclama;
            port += x.liman;
            insuranceBuyes += x.sigorta;
            freightBuyes += x.navlun;
            lashing += x.lashing;
            booking += x.booking;
            spanzlet += x.spazlet;
            detailBuyes1 += x.detay_1 + x.detay_2;
            detailBuyes2 += x.detay_2;
            detailBuyes3 += x.detay_3;

            mekus += x.mekus_masraf;
            specialwork += x.ozel_iscilik;
            bankCost +=
              x.banka_masrafi + x.kurye_masrafi;
            //   fregileCost += x.kurye_masrafi;
            costTotal += x.masraf_toplam;
            profitUsd += x.kar_zarar;
            profitTl += x.kar_zarar_tl;
            commision += x.pazarlama;
          });

          this.reportsMekmarAyoListTotal = {
            proforma,
            mekmerProduction,
            mekmozProduction,
            outerProduction,
            transport,
            duty,
            spraying,
            port,
            insuranceBuyes,
            insuranceSales: 0,
            freightBuyes,
            lashing,
            booking,
            spanzlet,
            detailBuyes1,
            detailBuyes2,
            detailBuyes3,
            mekus,
            specialwork,
            bankCost,
            fregileCost,
            costTotal,
            profitUsd,
            profitTl,
            commision,
          };
    },
    MUT_setReportsMekmarLoadingList(payload) {

          this.reportsMekmarLoadingList = payload;
    },
    MUT_setReportsMekmarLoadingListTotal(payload) {
          /*
           * Toplama YEREL degiskende, state'te DEGIL.
           *
           * Her `this.reportsMekmarLoadingListTotal.x += ...` bir REAKTIF YAZMA; bu
           * mutation DataTable'in @filter olayindan bir acilista 5-6 kez
           * cagriliyor, yani maliyet satir sayisiyla carpiliyor. State'e
           * TEK SEFERDE yazmak olculen 3.1x fark yaratti (8241b3c88).
           *
           * Toplama ifadeleri YERINDE kaldi -- yalnizca hedefi yerel
           * degisken oldu, yani toplama SIRASI (ve kayan nokta sonucu)
           * birebir ayni.
           */
          let fob = 0;
          let ddp = 0;
          payload.forEach((x) => {
            fob += x.Fob;
            ddp += x.Dtp;
          });

          this.reportsMekmarLoadingListTotal = {
            fob,
            ddp,
          };
    },
    MUT_setReportsMekmarLoadingListYear(payload) {
          /*
           * Toplama YEREL degiskende, state'te DEGIL.
           *
           * Her `this.reportsMekmarLoadingListYearTotal.x += ...` bir REAKTIF YAZMA; bu
           * mutation DataTable'in @filter olayindan bir acilista 5-6 kez
           * cagriliyor, yani maliyet satir sayisiyla carpiliyor. State'e
           * TEK SEFERDE yazmak olculen 3.1x fark yaratti (8241b3c88).
           *
           * Toplama ifadeleri YERINDE kaldi -- yalnizca hedefi yerel
           * degisken oldu, yani toplama SIRASI (ve kayan nokta sonucu)
           * birebir ayni.
           */
          let fob = 0;
          let ddp = 0;
          payload.forEach((x) => {
            fob += x.Fob;
            ddp += x.Dtp;
          });

          this.reportsMekmarLoadingListYearTotal = {
            fob,
            ddp,
          };
    },
    MUT_setReportsMekmarLoadingYearMonthList(payload) {

          this.loadingMonths = payload;
    },
    MUT_setLoadingYearsMonths(payload) {

          this.loadingYears = payload.years;
          this.loadingMonths = payload.months;
    },
    MUT_setReportsMekmarForwardingList(payload) {

          this.reportsMekmarForwardingList = payload;
    },
    MUT_setReportsMekmarForwardingListTotal(payload) {

          this.reportsMekmarForwardingListTotal = {
            crate: 0,
            amount: 0,
            box: 0,
            piece: 0,
            total: 0,
          };
          this.reportsMekmarForwardingListTotal.crate = payload.length;
          payload.forEach((x) => {
            this.reportsMekmarForwardingListTotal.amount += x.Miktar;
            this.reportsMekmarForwardingListTotal.piece += x.Adet;
            this.reportsMekmarForwardingListTotal.box += x.KutuAdet;
            this.reportsMekmarForwardingListTotal.total += x.Toplam;
          });
    },
    MUT_setReportsMekmarSummaryOrderList(payload) {

          this.reportsMekmarSummaryOrderList = payload;
    },
    MUT_setReportsMekmarSummaryOrderListTotal(payload) {

          for (const item of payload) {
            let fob = 0;
            let ddp = 0;
            for (const item2 of item) {
              fob += item2.FOB;
              ddp += item2.DDP;
            }
            this.reportsMekmarSummaryOrderListTotal.push({ fob: fob, ddp: ddp });
          }
    },
    MUT_setReportsMekmarSummaryForwardingList(payload) {

          this.reportsMekmarSummaryForwardingList = payload;
    },
    MUT_setReportsMekmarSummaryForwardingListTotal(payload) {

          for (const item of payload) {
            let fob = 0;
            let ddp = 0;
            for (const item2 of item) {
              fob += item2.FOB;
              ddp += item2.DDP;
            }
            this.reportsMekmarSummaryForwardingListTotal.push({
              fob: fob,
              ddp: ddp,
            });
          }
    },
    MUT_setReportsMekmarSummaryOrderDetail(payload) {

          this.reportsMekmarSummaryOrderDetail = payload;
    },
    MUT_setReportsMekmarSummaryOrderDetailTotal(payload) {
          /*
           * Toplama YEREL degiskende, state'te DEGIL.
           *
           * Her `this.reportsMekmarSummaryOrderDetailTotal.x += ...` bir REAKTIF YAZMA; bu
           * mutation DataTable'in @filter olayindan bir acilista 5-6 kez
           * cagriliyor, yani maliyet satir sayisiyla carpiliyor. State'e
           * TEK SEFERDE yazmak olculen 3.1x fark yaratti (8241b3c88).
           *
           * Toplama ifadeleri YERINDE kaldi -- yalnizca hedefi yerel
           * degisken oldu, yani toplama SIRASI (ve kayan nokta sonucu)
           * birebir ayni.
           */
          let fob = 0;
          let freight = 0;
          let detail1 = 0;
          let detail2 = 0;
          let detail3 = 0;
          let detail4 = 0;
          let ddp = 0;
          for (const item of payload) {
            fob += item.Fob;
            freight += item.NavlunSatis;
            detail1 += item.DetayTutar_1;
            detail2 += item.DetayTutar_2;
            detail3 += item.DetayTutar_3;
            detail4 += item.DetayTutar_4;
            ddp += item.Ddp;
          }

          this.reportsMekmarSummaryOrderDetailTotal = {
            fob,
            freight,
            detail1,
            detail2,
            detail3,
            detail4,
            ddp,
          };
    },
    MUT_setReportsMekmarGuList(payload) {

          this.reportsMekmarGuYearList = payload.yearList;
          payload.contList.forEach((x) => {
            if (x.KontSayisi == null) {
              x.KontSayisi = 0;
            }
          });
          this.reportsMekmarGuContList = payload.contList;
          payload.contByCust.forEach((x) => {
            if (x.KontSayisi == null) {
              x.KontSayisi = 0;
            }
          });
          this.reportsMekmarGuContByCustList = payload.contByCust;
          this.reportsMekmarGuMekusList = payload.mekusList;
          this.reportsMekmarGuLogsList = payload.logsList;

          let date = new Date().getFullYear();
          let index = 0;
          for (const x of Array(11).keys()) {
            this.reportsMekmarGuForwList.push({
              year: date,
              data: [],
              fob: 0,
              ddp: 0,
            });
            this.reportsMekmarGuOrderList.push({
              year: date,
              data: [],
              fob: 0,
              ddp: 0,
            });
            for (const y of payload.forwList) {
              if (y.Yil == date) {
                this.reportsMekmarGuForwList[index].fob += y.Fob;
                this.reportsMekmarGuForwList[index].ddp += y.Ddp;
                this.reportsMekmarGuForwList[index].data.push(y);
              }
            }
            for (const y of payload.orderSummaryList) {
              if (y.Yil == date) {
                this.reportsMekmarGuOrderList[index].fob += y.Fob;
                this.reportsMekmarGuOrderList[index].ddp += y.Ddp;
                this.reportsMekmarGuOrderList[index].data.push(y);
              }
            }
            index += 1;
            date = date - 1;
          }

          this.reportsMekmarGuAyoList = payload.ayoList;
    },
    MUT_setReportsMekmerAtlantaList(payload) {

          this.reportsMekmerAtlantaList = payload;
    },
    MUT_setReportsMekmarSummaryOrderListByRepresentative(payload) {

          this.reportsMekmarSummaryOrderListByRepresentative = payload;
    },
    MUT_setReportsMekmarSummaryOrderListByRepresentativeTotal(payload) {

          for (const item of payload) {
            let fob = 0;
            let ddp = 0;
            for (const item2 of item) {
              fob += item2.FOB;
              ddp += item2.DDP;
            }
            this.reportsMekmarSummaryOrderListByRepresentativeTotal.push({
              fob: fob,
              ddp: ddp,
            });
          }
    },
  },
})
