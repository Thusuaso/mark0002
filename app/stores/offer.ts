import { defineStore } from "pinia"

/*
 * store/modules/offer.js -> Pinia
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
 * Istatistik: 23 action, 16 mutation, 13 getter
 */
export const useOfferStore = defineStore("offer", {
  state: () => ({
    offerList: [],
    offerCountryList: [],
    offerDetailList: [],
    offerDetailProductsList: [],
    offerButtonStatus: false,
    offerId: 0,
    offerAllButtonStatus: false,
    offerOldList: [],
    offerDetailBList:[],
    offerDetailTotalA:0,
    offerDetailTotalB:0
}),

  getters: {
    getOfferOldList: (state) => state.offerOldList,
    getOfferDetailTotalA: (state) => state.offerDetailTotalA,
    getOfferDetailTotalB: (state) => state.offerDetailTotalB,
    /*
     * KALDIRILDI -- OLU VE BOZUK GETTER.
     *
     * Kaynak (store/modules/offer.js:318):
     *     getOfferDetailAllTotalB(state) {
     *       return state.offerDetailAllTotalA;   // <- B istenmis, A donuyor
     *     }
     *
     * Iki ayri sorun bir arada:
     *   - Adi "...TotalB" ama "...TotalA" donduruyor.
     *   - `offerDetailAllTotalA` STATE'TE HIC YOK (grep ile
     *     dogrulandi: tum modulde yalnizca bu satirda geciyor),
     *     yani getter her zaman undefined donuyordu.
     *
     * Ve hicbir sayfa/bilesen onu OKUMUYOR. Tasinmadi.
     */
    getOfferList: (state) => state.offerList,
    getOfferCountryList: (state) => state.offerCountryList,
    getOfferDetailList: (state) => state.offerDetailList,
    getOfferDetailProductsList: (state) => state.offerDetailProductsList,
    getOfferButtonStatus: (state) => state.offerButtonStatus,
    getOfferId: (state) => state.offerId,
    getOfferAllButtonStatus: (state) => state.offerAllButtonStatus,
    /*
     * YINELENEN TANIM KALDIRILDI: `getOfferOldList` kaynakta IKI KEZ
     * tanimliydi (offer.js:309 ve 342), ikisi de ayni govdeyle.
     * Vuex'te de JS nesne anahtari oldugu icin sonraki kazaniyordu,
     * yani davranis degismiyor -- yukaridaki tanim duruyor.
     * (tools/codemods/verify-stores.mjs "YINELENEN anahtar" diye
     * yakaladi.)
     */
    getOfferDetailBList: (state) => state.offerDetailBList,
  },

  actions: {
    setOfferAddSize(size) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()
      const sharedStore = useSharedStore()

              legacyApi.post('/offer/add/size',{'size':size})
              .then(response=>{
                  if(response.data.status){
                      toast.success('Successful');
                      sharedStore.setOfferSharedList();
                  }else{
                      toast.error('Error');
                  }
              });
    },
    setOfferAListTotal(payload) {

              this.MUT_setOfferAListTotal(payload);
    },
    setOfferBListTotal(payload) {

              this.MUT_setOfferBListTotal(payload);
    },
    setOfferMainList() {
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
              legacyApi.get('/offer/main/list')
                  .then(response => {
                      if (response.data) {
                          this.MUT_setOfferMainList(response.data); 
                      }

                  })
        .catch((err) => {
          console.error("setOfferMainList basarisiz:", err)
        })
        .finally(() => {
          sharedStore.endLoading()
        });
    },
    setOfferMainDetailList(representative) {
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
              legacyApi.get(`/offer/main/detail/list/${representative}`)
                  .then(response => {
                      if (response.data.list) {
                                          this.MUT_setOfferMainDetailList(response.data.list); 
                                          this.setOfferAListTotal(response.data.list);
                      }

                  })
        .catch((err) => {
          console.error("setOfferMainDetailList basarisiz:", err)
        })
        .finally(() => {
          sharedStore.endLoading()
        });
    },
    setOfferDetailProductsList(id) {
      const legacyApi = useLegacyApi()

              legacyApi.get(`/offer/detail/products/list/${id}`)
                  .then(response => {
                      this.MUT_setOfferDetailProductsList(response.data.list); 
                  });
    },
    setOfferDetailProductsAdd(product) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()
      const modelsStore = useModelsStore()
      const sharedStore = useSharedStore()


              legacyApi.post('/offer/product/add', product)
                  .then(response => {
                      if(response.data.status){
                          toast.success('Başarıyla Eklendi.');
                          this.MUT_setOfferDetailProductsAdd({ ...product, 'Id': response.data.id });
                          modelsStore.setOfferProductModel();
                          sharedStore.setOfferSharedList();


                      } else {
                          toast.error('Ekleme Başarısız');
                      }
                  });
    },
    setOfferDetailProductsUpdate(product) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()
      const modelsStore = useModelsStore()


              legacyApi.put('/offer/product/update', product)
                  .then(response => {
                      if (response.data.status) {
                          toast.success('Başarıyla Güncellendi.');
                          this.MUT_setOfferDetailProductsUpdate(product);

                          modelsStore.setOfferProductModel();
                      } else {
                          toast.error('Güncelleme Başarısız');
                      }
                  })
    },
    setOfferDetailProductsDelete(id) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

              legacyApi.delete(`/offer/product/delete/${id}`)
                  .then(response => {
                      if (response.data.status) {
                          toast.success('Başarıyla Silindi');
                          this.MUT_setOfferDetailProductsDelete(id);

                      } else {
                          toast.error('Silme Başarısız');
                      }
                
                  });
    },
    setOfferButtonStatus(status) {

              this.MUT_setOfferButtonStatus(status);
    },
    setOfferSave(payload) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()
      const customerStore = useCustomerStore()

              return new Promise(async (resolve, reject) => {
                         legacyApi.post('/offer/save', payload)
                  .then(response => {
                      if (response.data.status) {
                   
                          this.setOfferMainList();
                          this.setOfferId(response.data.id);
                          // this.$socket.socketIO.emit('offers_updated_emit');
                          this.MUT_setOfferButtonStatus(false);
                          customerStore.setOfferCustomerList();
                          toast.success('Başarıyla Kaydedildi');
                          resolve(true);

                      } else {
                          toast.error('Kaydetme Başarısız');
                          resolve(false);

                      }
                  });
              });
    },
    setOfferUpdate(payload) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()
      const customerStore = useCustomerStore()

              legacyApi.put('/offer/update',payload)
                  .then(response => {
                      if (response.data.status) {
                          //  if (this.offerAllButtonStatus) {
                          //     this.setOfferDetailAllList();
                          // };
                          this.setOfferMainList();
                          // this.$socket.socketIO.emit('offers_updated_emit',payload);
                          customerStore.setOfferCustomerList();

                          toast.success('Başarıyla Güncellendi');


                      } else {
                          toast.error('Güncelleme Başarısız');
                      }
                  });
    },
    setOfferDelete(id) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

              legacyApi.delete(`/offer/delete/${id}`)
                  .then(response => {
                      if (response.data.status) {
                          this.setOfferMainList();
                          this.MUT_setOfferDelete(id);
                          // this.$socket.socketIO.emit('offers_deleted_emit',id);
                          toast.success('Başarıyla Silindi');


                      } else {
                          toast.error('Silme Başarısız');
                      }
                  });
    },
    setOfferId(id) {

              this.MUT_setOfferId(id);
    },
    setOfferDetailAllList() {
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
              legacyApi.get('/offer/detail/all/list')
                  .then(response => {
                      if (response.data.list) {
                          this.MUT_setOfferMainDetailList(response.data.list); 
                          this.MUT_setOfferMainDetailBList(response.data.bList);
                          this.setOfferAListTotal(response.data.list);
                          this.setOfferBListTotal(response.data.bList);

                      }

                  })
        .catch((err) => {
          console.error("setOfferDetailAllList basarisiz:", err)
        })
        .finally(() => {
          sharedStore.endLoading()
        });
    },
    setOfferAllButtonStatus(payload) {

              this.MUT_setOfferAllButtonStatus(payload);
    },
    setOfferOldList() {
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
              legacyApi.get('/offer/old/list')
                  .then(response => {
                      if (response.data.list) {
                                      this.MUT_setOfferOldList(response.data.list); 
                      }

                  })
        .catch((err) => {
          console.error("setOfferOldList basarisiz:", err)
        })
        .finally(() => {
          sharedStore.endLoading()
        });
    },
    setOfferMainDetailBList(representative) {
      const legacyApi = useLegacyApi()

              legacyApi.get(`/offer/main/detail/b/list/${representative}`)
                  .then(response => {
                          this.MUT_setOfferMainDetailBList(response.data.list);
                          this.setOfferBListTotal(response.data.list);
                  });
    },
    setOfferReminderCloudUpload(payload) {
      const legacyApi = useLegacyApi()

              return new Promise((resolve,reject)=>{
                  legacyApi.put('/offer/reminder/file/upload',payload).then(response=>{
                      if(response.data.status){
                          resolve(true);
                      }else{
                          reject(false)
                      }
                  });
              });
    },
    setOfferProformaUpload(payload) {
      const legacyApi = useLegacyApi()

              return new Promise((resolve,reject)=>{

                  legacyApi.put('/offer/proforma/file/upload',payload).then(response=>{

                      if(response.data.status){
                          resolve(true);
                      }else{
                          reject(false)
                      }

                  })
              });
    },
    setOfferSampleUpload(payload) {
      const legacyApi = useLegacyApi()

              return new Promise((resolve,reject)=>{
                  legacyApi.put('/offer/sample/file/upload',payload).then(response=>{
                      if(response.data.status){
                          resolve(true);
                      }else{
                          reject(false)
                      }
                  })
              });
    },
    setOfferDetailUpdatedAllEmit(payload) {

              this.MUT_setOfferDetailUpdatedAllEmit(payload);
    },
    setOfferDetailDeletedAllEmit(offerId) {

              this.MUT_setOfferDetailDeletedAllEmit(offerId);
    },

    /* ---------- mutation'lar (MUT_ onekli) ---------- */
    MUT_setOfferOldList(payload) {

              this.offerOldList = payload;
    },
    MUT_setOfferDetailDeletedAllEmit(offerId) {

              const index = this.offerDetailList.findIndex(x=>x.Id==offerId);
              this.offerDetailList.splice(index,1);
    },
    MUT_setOfferDetailUpdatedAllEmit(payload) {

              const index = this.offerDetailList.findIndex(x=>x.Id==payload.Id);
              this.offerDetailList.splice(index,1,payload);
    },
    MUT_setOfferAListTotal(payload) {

              this.offerDetailTotalA=payload.length;
    },
    MUT_setOfferBListTotal(payload) {

              this.offerDetailTotalB=payload.length;
    },
    MUT_setOfferMainList(payload) {

              this.offerList = payload.list;
              this.offerCountryList = payload.country;
    },
    MUT_setOfferMainDetailList(payload) {

              this.offerDetailList = payload;
    },
    MUT_setOfferDetailProductsList(payload) {

              this.offerDetailProductsList = payload;
    },
    MUT_setOfferDetailProductsAdd(payload) {

              this.offerDetailProductsList.push(payload);
    },
    MUT_setOfferDetailProductsUpdate(payload) {

              const index = this.offerDetailProductsList.findIndex(x => x.Id == payload.Id);
              this.offerDetailProductsList[index] = payload;
    },
    MUT_setOfferDetailProductsDelete(payload) {

              const index = this.offerDetailProductsList.findIndex(x => x.Id == payload);
              this.offerDetailProductsList.splice(index, 1);
    },
    MUT_setOfferButtonStatus(payload) {

              this.offerButtonStatus = payload;
    },
    MUT_setOfferId(payload) {

              this.offerId = payload;
    },
    MUT_setOfferAllButtonStatus(payload) {

              this.offerAllButtonStatus = payload;
    },
    MUT_setOfferDelete(payload) {

              const index = this.offerDetailList.find(x => x.Id == payload);
              this.offerDetailList.splice(index, 1);
    },
    MUT_setOfferMainDetailBList(payload) {

              this.offerDetailBList = payload;
    },
  },
})
