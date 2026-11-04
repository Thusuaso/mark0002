import { defineStore } from "pinia"

/*
 * store/modules/panel.js -> Pinia
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
 * Istatistik: 71 action, 41 mutation, 28 getter
 */
export const usePanelStore = defineStore("panel", {
  state: () => ({
    panelPublishedList: [],
    panelCategoryList: [],
    panelProductButtonStatus: false,
    panelProductId: 0,
    panelProductSizeList: [],
    panelProductFinishList: [],
    panelProductColorList: [],
    panelProductAreaList: [],
    panelProductTypeList: [],
    panelProductMaterialList: [],
    panelProductEdgeList: [],
    panelProductStyleList:[],
    panelProductPhotoList: [],
    panelProductSuggestedList: [],
    panelProjectList:[],
    panelProjectPhotos: [],
    panelProjectVideo:[],
    panelProjectSuggested: [],
    panelProjectInformation: [],
    panelProjectButtonStatus: false,
    panelProjectId: 0,
    panelUsersList: [],
    panelUsersButtonStatus:false,
    panelUsaStockList:[],
    panelUsaStockPhotosList:[],
    panelUsaStockButtonStatus:false,
    panelId:0,
    panelProductName:''
}),

  getters: {
    getPanelProductName: (state) => state.panelProductName,
    getProductId: (state) => state.panelId,
    getPanelPublishedList: (state) => state.panelPublishedList,
    getPanelCategoryList: (state) => state.panelCategoryList,
    getPanelProductButtonStatus: (state) => state.panelProductButtonStatus,
    getPanelProductId: (state) => state.panelProductId,
    getPanelProductSizeList: (state) => state.panelProductSizeList,
    getPanelProductFinishList: (state) => state.panelProductFinishList,
    getPanelProductColorList: (state) => state.panelProductColorList,
    getPanelProductAreaList: (state) => state.panelProductAreaList,
    getPanelProductTypeList: (state) => state.panelProductTypeList,
    getPanelProductMaterialList: (state) => state.panelProductMaterialList,
    getPanelProductEdgeList: (state) => state.panelProductEdgeList,
    getPanelProductStyleList: (state) => state.panelProductStyleList,
    getPanelProductPhotoList: (state) => state.panelProductPhotoList,
    getPanelProductSuggestedList: (state) => state.panelProductSuggestedList,
    getPanelProjectList: (state) => state.panelProjectList,
    getPanelProjectPhotos: (state) => state.panelProjectPhotos,
    getPanelProjectSuggested: (state) => state.panelProjectSuggested,
    getPanelProjectInformation: (state) => state.panelProjectInformation,
    getPanelProjectVideo: (state) => state.panelProjectVideo,
    getPanelProjectButtonStatus: (state) => state.panelProjectButtonStatus,
    getPanelProjectId: (state) => state.panelProjectId,
    getPanelUsersList: (state) => state.panelUsersList,
    getPanelUsersButtonStatus: (state) => state.panelUsersButtonStatus,
    getPanelUsaStockList: (state) => state.panelUsaStockList,
    getPanelUsaStockPhotosList: (state) => state.panelUsaStockPhotosList,
    getPanelUsaStockButtonStatus: (state) => state.panelUsaStockButtonStatus,
  },

  actions: {
    setPanelProjectMainPhotoChange(photo) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

              legacyApi.post('/panel/project/main/photo/change',photo)
              .then(response=>{
                  if(response.data.status){
                      toast.success("Başarıyla Değiştirildi.");
                  }else{
                      toast.success("Değiştirme Başarısız.");
                
                  }
              });
    },
    setPanelProjectPhotosQueueChange(photos) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

              legacyApi.post('/panel/projet/photos/queue/change',photos)
              .then(response=>{
                  if(response.data.status){
                      toast.success('Başarıyla Değiştirildi.');
                  } else{
                      toast.error('Hata Oluştu.');
                  }
              })
    },
    setPanelProjectQueueChange(projects) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

              legacyApi.put('/panel/project/queue/change',projects)
              .then(response=>{
                  if(response.data.status){
                      toast.success('Başarıyla Değiştirildi.');
                  } else{
                      toast.error('Değiştirme Başarısız.');
                
                  }
              });
    },
    /*
     * [YUK-1] YUKLEME GOSTERGESI TAKILI KALIYORDU.
     *
     * Kaynakta (store/modules/panel.js) `endLoading` cagrisi
     * `if (response.data)` BLOGUNUN ICINDEYDI ve `.catch()` YOKTU:
     *
     *     beginLoading()
     *     get(...).then(r => { if (r.data) { commit(...); endLoading() } })
     *
     * Yani yanit bos/yanlis gelirse ya da istek PATLARSA endLoading hic
     * cagrilmiyor. Pilotun yukleme gostergesi SAYAC oldugu icin
     * (app/stores/shared.ts) sayac bir eksilmemis kaliyor ve tam ekran
     * katman -- tum tiklamalari yakalayan katman -- KALICI olarak acik
     * kaliyor; kullanici sayfayi yenilemek zorunda.
     *
     * try/finally'ye alindi: yanit ne olursa olsun, hata olsa bile
     * gosterge kapaniyor. Veri atama sarti AYNEN korundu.
     */
    async setPanelPublishedList() {
      const legacyApi = useLegacyApi()
      const sharedStore = useSharedStore()

      sharedStore.beginLoading()
      try {
        const response = await legacyApi.get("/panel/published/list")
        if (response.data) this.MUT_setPanelPublishedList(response.data)
      } catch (err) {
        console.error("setPanelPublishedList basarisiz:", err)
      } finally {
        sharedStore.endLoading()
      }
    },
    /* Gerekcesi setPanelPublishedList icindeki [YUK-1] notunda. */
    async setPanelNotPublishedList() {
      const legacyApi = useLegacyApi()
      const sharedStore = useSharedStore()

      sharedStore.beginLoading()
      try {
        const response = await legacyApi.get("/panel/not/published/list")
        /* DIKKAT -- ADI YANILTICI: "not published" listesi de
         * panelPublishedList state'ine yaziliyor. Kaynakta da oyle;
         * iki ekran ayni state'i paylasiyor. */
        if (response.data) this.MUT_setPanelPublishedList(response.data)
      } catch (err) {
        console.error("setPanelNotPublishedList basarisiz:", err)
      } finally {
        sharedStore.endLoading()
      }
    },
    /* Gerekcesi setPanelPublishedList icindeki [YUK-1] notunda. */
    async setPanelPublishedListCategory(id) {
      const legacyApi = useLegacyApi()
      const sharedStore = useSharedStore()

      sharedStore.beginLoading()
      try {
        const response = await legacyApi.get(`/panel/published/list/${id}`)
        if (response.data.list) {
          this.MUT_setPanelPublishedListCategory(response.data.list)
        }
      } catch (err) {
        console.error("setPanelPublishedListCategory basarisiz:", err)
      } finally {
        sharedStore.endLoading()
      }
    },
    /* Gerekcesi setPanelPublishedList icindeki [YUK-1] notunda. */
    async setPanelNotPublishedListCategory(id) {
      const legacyApi = useLegacyApi()
      const sharedStore = useSharedStore()

      sharedStore.beginLoading()
      try {
        const response = await legacyApi.get(`/panel/not/published/list/${id}`)
        if (response.data.list) {
          this.MUT_setPanelPublishedListCategory(response.data.list)
        }
      } catch (err) {
        console.error("setPanelNotPublishedListCategory basarisiz:", err)
      } finally {
        sharedStore.endLoading()
      }
    },
    setPanelProductButtonStatus(status) {

              this.MUT_setPanelProductButtonStatus(status);
    },
    setPanelProductsSave(product) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

              legacyApi.post('/panel/product/save', product)
                  .then(response => {
                      if (response.data.status) {
                          toast.success("Başarıyla Kaydedildi.");
                          this.setPanelProductId(response.data.productId);
                          this.setPanelId(response.data.id)
                          this.MUT_setPanelProductAdd({ ...product, 'Id': response.data.id,'urunid':response.data.productId ,'sira':response.data.queue});
                      } else {
                          toast.error("Kaydetme Başarısız.");
                      }
                  });
    },
    setPanelProductsUpdate(product) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

              legacyApi.put('/panel/product/update', product)
                  .then(response => {
                      if (response.data.status) {
                          toast.success("Başarıyla Güncellendi.");
                          this.MUT_setPanelProductsUpdate(product);
                      } else {
                          toast.error("Güncelleme Başarısız.");
                    
                      }
                  });
    },
    setPanelProductsDelete(productId) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

              legacyApi.delete(`/panel/product/delete/${productId}`)
                  .then(response => {
                      if (response.data.status) {
                          toast.success("Başarıyla Silindi.");
                          this.MUT_setPanelProductsDelete(productId); 
                      } else {
                          toast.error("Silme Başarısız.");
                      }
                  });
    },
    setPanelProductId(id) {

              this.MUT_setPanelProductId(id);
    },
    setPanelProductName(productName) {

              this.MUT_setPanelProductName(productName);
    },
    setPanelId(id) {

              this.MUT_setPanelId(id);
    },
    setPanelProductFiltersList(data) {
      const legacyApi = useLegacyApi()

              legacyApi.post(`/panel/product/filtered/list`,data)
                  .then(response => {
                              this.MUT_setPanelProductFiltersList(response.data);
                  });
    },
    setPanelProductSizeAdd(size) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()
      const modelsStore = useModelsStore()

              legacyApi.post('/panel/product/size/add', size)
                  .then(response => {
                      if (response.data.status) {
                          toast.success('Ebat Başarıyla Eklendi');
                              this.MUT_setPanelProductSizeAdd({...size,'Id':response.data.id}); 
                              modelsStore.setPanelProductSizeModel();
                      } else {
                          toast.error('Ebat Ekleme Başarısız');
                    
                      }

                  });
    },
    setPanelProductSizeDelete(id) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

              legacyApi.delete(`/panel/product/size/delete/${id}`)
                  .then(response => {
                      if (response.data.status) {
                          toast.success("Ebat Başarıyla Silindi");
                          this.MUT_setPanelProductSizeDelete(id);
                      } else {
                          toast.error("Ebat Silme Başarısız");
                      }
                  });
    },
    setPanelProductSizeUpdate(size) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

              legacyApi.put('/panel/product/size/update', size)
                  .then(response => {
                      if (response.data.status) {
                          toast.success("Ebat Başarıyla Güncellendi.");
                          this.MUT_setPanelProductSizeUpdate(size);
                      } else {
                          toast.error("Ebat Güncelleme Başarısız.");
                      }
                  });
    },
    setPanelProductColorAdd(color) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()
      const modelsStore = useModelsStore()

              legacyApi.post('/panel/product/color/add', color)
                  .then(response => {
                      if (response.data.status) {
                          toast.success("Renk Başarıyla Eklendi.");
                          this.MUT_setPanelProductColorAdd({ ...color,'ID':response.data.id });
                          modelsStore.setPanelProductColorModel();
                      } else {
                          toast.error("Renk Ekleme Başarısız.");
                      }
                  });
    },
    setPanelProductColorDelete(id) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

              legacyApi.delete(`/panel/product/color/delete/${id}`)
                  .then(response => {
                      if (response.data.status) {
                          toast.success("Renk Başarıyla Silindi.");
                          this.MUT_setPanelProductColorDelete(id);
                      } else {
                          toast.error("Renk Silme Başarısız.");
                      }
                  });
    },
    setPanelProductFinishAdd(finish) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()
      const modelsStore = useModelsStore()

              legacyApi.post('/panel/product/finish/add', finish)
                  .then(response => {
                      if (response.data.status) {
                          toast.success("Yüzey Başarıyla Eklendi.");
                          this.MUT_setPanelProductFinishAdd({ ...finish, 'Id': response.data.id });
                          modelsStore.setPanelProductFinishModel();
                      } else {
                          toast.error("Yüzey Ekleme Başarısız.");
                      }
                  });
    },
    setPanelProductFinishDelete(id) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

              legacyApi.delete(`/panel/product/finish/delete/${id}`)
                  .then(response => {
                      if (response.data.status) {
                          toast.success("Yüzey Başarıyla Silindi.");
                          this.MUT_setPanelProductFinishDelete(id);
                      } else {
                          toast.error("Yüzey Silme Başarısız.");
                      }
                  })
    },
    setPanelProductAreaAdd(area) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()
      const modelsStore = useModelsStore()

              legacyApi.post('/panel/product/area/add', area)
                  .then(response => {
                      if (response.data.status) {
                          toast.success("Alan Başarıyla Eklendi.");
                          this.MUT_setPanelProductAreaAdd({ ...area, 'ID': response.data.id });
                          modelsStore.setPanelProductAreaModel();
                      } else {
                          toast.error("Alan Ekleme Başarısız.");
                      }
                  });
    },
    setPanelProductAreaDelete(id) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

              legacyApi.delete(`/panel/product/area/delete/${id}`)
                  .then(response => {
                      if (response.data.status) {
                          toast.success("Alan Başarıyla Silindi.");
                          this.MUT_setPanelProductAreaDelete(id);
                      } else {
                          toast.error("Alan Silme Başarısız.");
                      }
                  })
    },
    setPanelProductTypeAdd(type) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()
      const modelsStore = useModelsStore()

              legacyApi.post('/panel/product/type/add', type)
                  .then(response => {
                      if (response.data.status) {
                          toast.success("Tür Başarıyla Eklendi.");
                          this.MUT_setPanelProductTypeAdd({ ...type, 'ID': response.data.id });
                          modelsStore.setPanelProductTypeModel();
                      } else {
                          toast.error("Tür Ekleme Başarısız.");
                      }
                  });
    },
    setPanelProductTypeDelete(id) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

              legacyApi.delete(`/panel/product/type/delete/${id}`)
                  .then(response => {
                     if(response.data.status){
                         toast.success('Tür Silme Başarılı.');
                         this.MUT_setPanelProductTypeDelete(id);
                     } else {
                      toast.error('Tür Silme Başarısız.');
                     }
                  });
    },
    setPanelProductStyleAdd(style) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()
      const modelsStore = useModelsStore()

              legacyApi.post('/panel/product/style/add', style)
                  .then(response => {
                     if(response.data.status){
                         toast.success('Stil Ekleme Başarılı.');
                         this.MUT_setPanelProductStyleAdd({ ...style, 'ID': response.data.id });
                         modelsStore.setPanelProductStyleModel();
                     } else {
                      toast.error('Stil Ekleme Başarısız.');
                     }
                  });
    },
    setPanelProductStyleDelete(id) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

              legacyApi.delete(`/panel/product/style/delete/${id}`)
                  .then(response => {
                      if (response.data.status) {
                          toast.success('Stil Silme Başarılı.');
                          this.MUT_setPanelProductStyleDelete(id);
                      } else {
                          toast.error('Stil Silme Başarısız.');
                      }
                  });
    },
    setPanelProductMaterialAdd(material) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()
      const modelsStore = useModelsStore()

              legacyApi.post('/panel/product/material/add', material)
                  .then(response => {
                      if (response.data.status) {
                          toast.success('Materyal Ekleme Başarılı.');
                          this.MUT_setPanelProductMaterialAdd({ ...material, 'ID': response.data.id });
                          modelsStore.setPanelProductMaterialModel();
                      } else {
                        toast.error('Materyal Ekleme Başarısız.');
                      };
                  })
    },
    setPanelProductMaterialDelete(id) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

              legacyApi.delete(`/panel/product/material/delete/${id}`)
                  .then(response => {
                      if (response.data.status) {
                          toast.success('Materyal Silme Başarılı.');
                          this.MUT_setPanelProductMaterialDelete(id);
                      } else {
                          toast.error('Materyal Silme Başarısız.');
                      }
                  });
    },
    setPanelProductEdgeAdd(kenar) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()
      const modelsStore = useModelsStore()

              legacyApi.post('/panel/product/edge/add', kenar)
                  .then(response => {
                      if (response.data.status) {
                          toast.success('Kenar Ekleme Başarılı.');
                          this.MUT_setPanelProductEdgeAdd({ ...kenar, 'ID': response.data.id });
                          modelsStore.setPanelProductEdgeModel();
                      } else {
                        toast.error('Kenar Ekleme Başarısız.');
                      };
                  })
    },
    setPanelProductEdgeDelete(id) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

              legacyApi.delete(`/panel/product/edge/delete/${id}`)
                  .then(response => {
                      if (response.data.status) {
                          toast.success('Kenar Silme Başarılı.');
                          this.MUT_setPanelProductEdgeDelete(id);
                      } else {
                          toast.error('Kenar Silme Başarısız.');
                      }
                  });
    },
    setPanelProductPhotoOneDelete(id) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

              legacyApi.delete(`/panel/product/photo/one/delete/${id}`)
                  .then(response => {
                      if (response.data.status) {
                          toast.success('Fotoğraf Başarıyla Silindi');
                      } else {
                          toast.error('Fotoğraf Silme Başarısız');
                      }
                  });
    },
    setPanelProductPhotoAllDelete(id) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

              legacyApi.delete(`/panel/product/photo/all/delete/${id}`)
                  .then(response => {
                      if (response.data.status) {
                          toast.success('Fotoğraflar Başarıyla Silindi.');
                      } else {
                          toast.error('Fotoğrafları Silme Başarısız.');
                    
                      }
                  });
    },
    setPanelProductPhotoQueueChange(photo) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

              legacyApi.post('/panel/product/photo/queue/change', photo)
                  .then(response => {
                      if (response.data.status) {
                          toast.success('Fotoğraf Sırası Başarıyla Değiştirildi.');
                      } else {
                          toast.success('Fotoğraf Sırası Değiştirme Başarısız');
                      }
                  })
    },
    setPanelProductPhotoAdd(photo) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

              legacyApi.post('/panel/product/photo/add', photo)
                  .then(response => {
                      if (response.data.status) {
                          toast.success('Fotoğraf Eklendi.');
                          this.setPanelProductPhotoListUpdate(photo.urunid);

                      } else {
                          toast.error('Fotoğraf Eklenemedi.');
                      }
                  });
    },
    setPanelProductPhotoListUpdate(id) {
      const legacyApi = useLegacyApi()

              legacyApi.get(`/panel/product/photos/list/update/${id}`)
                  .then(response => {
                     this.MUT_setPanelProductPhotoListUpdate(response.data.list);
                  });
    },
    setPanelProductSuggestedAdd(payload) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

              legacyApi.post('/panel/product/suggested/add', payload)
                  .then(response => {
                      if(response.data.status){
                          toast.success('Önerilen Ürün Kayıt Başarılı.');
                      } else {
                          toast.error('Önerilen Ürün Kayıt Başarısız.');
                      }
                  });
    },
    setPanelProductSuggestedDelete(id) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

              legacyApi.delete(`/panel/product/suggested/delete/${id}`)
                  .then(response => {
                      if (response.data.status) {
                          toast.success('Önerilen Ürün Silme Başarılı.');
                      } else {
                          toast.error('Önerilen Ürün Silme Başarısız.');
                      };
                  });
    },
    setPanelProductSuggestedQueueChange(payload) {
      const legacyApi = useLegacyApi()

              legacyApi.post('/panel/product/suggested/queue/change', payload)
                  .then(response => {

                  });
    },
    setPanelProductTestReport(payload) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

              legacyApi.post('/panel/product/test/report', payload)
                  .then(response => {
                      if (response.data.status) {
                                          toast.success('Test Raporu Başarıyla Yüklendi');

                      } else {
                                          toast.error('Test Raporu Yükleme Başarısız');

                      };
                  });
    },
    /* Gerekcesi setPanelPublishedList icindeki [YUK-1] notunda.
     * Burada `if` yoktu, ama `.catch()` de yoktu: istek patlarsa
     * gosterge yine takili kaliyordu. */
    async setPanelProjectList() {
      const legacyApi = useLegacyApi()
      const sharedStore = useSharedStore()

      sharedStore.beginLoading()
      try {
        const response = await legacyApi.get("/panel/project/list")
        this.MUT_setPanelProjectList(response.data.list)
      } catch (err) {
        console.error("setPanelProjectList basarisiz:", err)
      } finally {
        sharedStore.endLoading()
      }
    },
    setPanelProjectDetail(id) {
      const legacyApi = useLegacyApi()

              legacyApi.get(`/panel/project/detail/${id}`)
                  .then(response => {
                      if (response.data.information.length ==0) {
                          response.data.information = [
                            {
                                  ID: 0,
                                  ProjectId: 0,
                                  ProjectInformation: '',
                                  ProjectInformation_Fr: '',
                                  ProjectInformation_Es: '',
                                  ProjectInformation_Ru: ''
                              }  
                          ];
                          this.MUT_setPanelProjectDetail(response.data);
                      } else {
                          this.MUT_setPanelProjectDetail(response.data);
                      }
                  });
    },
    setPanelProjectPhotoDelete(id) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

              legacyApi.get(`/panel/project/photo/delete/${id}`)
                  .then(response => {
                      if (response.data.status) {
                          toast.success('Fotoğraf Başarıyla Silindi');
                      } else {
                      toast.error('Fotoğraf Silme Başarısız');
                          }
                  });
    },
    setPanelProjectButtonStatus(status) {

              this.MUT_setPanelProjectButtonStatus(status);
    },
    setPanelProjectId(id) {

              this.MUT_setPanelProjectId(id)
    },
    panelProjectInformationUpdate(information) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

              legacyApi.post('/panel/project/information/update', information)
                  .then(response => {
                      if (response.data.status) {
                          toast.success('Proje Bilgileri Başarıyla Güncellendi');
                      } else {
                          toast.error('Proje Bilgileri Güncelleme Başarısız');
                      }
                  });
    },
    setPanelProjectProductPhotoSave(photo) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

              legacyApi.post('/panel/project/product/photo/save', photo)
                  .then(response => {
                      if (response.data.status) {
                          toast.success('Fotoğraf Başarıyla eklendi.');
                          this.setPanelProjectDetail(photo.ProjectId);
                      } else {
                          toast.error('Fotoğraf Ekleme başarısız.');
                      }
                  });
    },
    setPanelProjectProductPhotoNameSave(photo) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

              legacyApi.put('/panel/project/product/photo/name/update', photo)
                  .then(response => {
                      if (response.data.status) {
                          this.setPanelProjectDetail(photo.ProjectId);
                          toast.success('Ürün İsmi Başarıyla Değiştirildi.');

                      } else {
                          toast.error('Ürün İsmi Değiştirme Başarısız.');
                      }
                  })
    },
    setPanelProjectSuggestedAdd(suggested) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

              legacyApi.post('/panel/project/suggested/add', suggested)
                  .then(response => {
                      if (response.data.status) {
                          this.setPanelProjectDetail(suggested.ProjectId);
                          toast.success('Önerilen Ürün Başarıyla Eklendi.');    
                      } else {
                          toast.success('Önerilen Ürün Ekleme Başarısız.');    
                      };
                  });
    },
    setPanelProjectSuggestedDelete(suggested) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

              legacyApi.delete(`/panel/project/suggested/delete/${suggested.ID}`)
                  .then(response => {
                      if (response.data.status) {
                          this.setPanelProjectDetail(suggested.ProjectId);
                          toast.success('Önerilen Ürün Başarıyla Silindi.');
                      } else {
                          toast.error('Önerilen Ürün Silme Başarısız');
                      }
                  });
    },
    setPanelProjectVideoAdd(video) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

              legacyApi.post('/panel/project/video/add', video)
                  .then(response => {
                      if (response.data.status) {
                          this.setPanelProjectDetail(video.ProjectId);
                          toast.success('Video Başarıyla Eklendi.');    
                      } else {
                       toast.error('Video Ekleme Başarısız.');
                      }
                  });
    },
    setPanelProjectSave(project) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

              legacyApi.post('/panel/project/save', project)
                  .then(response => {
                      if (response.data.status) {
                          toast.success('Proje Başarıyla Kaydedildi, Fotoğrafı Yükleyebilirsiniz...');
                          this.setPanelProjectId(response.data.id);
                      } else {
                          toast.error('Proje Ekleme Başarısız');
                      }
                  });
    },
    setPanelProjectImageAdd(image) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()
      const modelsStore = useModelsStore()

              legacyApi.put('/panel/project/photos/add', image)
                  .then(response => {
                      if (response.data.status) {
                          toast.success('Proje Fotoğrafı Başarıyla Eklendi.');
                          this.setPanelProjectList();
                                              modelsStore.setPanelProjectModel();


                      } else {
                          toast.error('Proje Fotoğrafı Ekleme Hatası.');
                      }
                  });
    },
    panelProjectInformationSave(information) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

              legacyApi.post('/panel/project/information/save', information)
                  .then(response => {
                      if (response.data.status) {
                          toast.success('Proje Bilgileri Başarıyla Kaydedildi.');
                      } else {
                          toast.error('Proje Bilgileri Kaydedilemedi.');
                      }
                  });
    },
    /*
     * SOZ DONDURULUYOR (kaynakta donmuyordu).
     *
     * Sira degistirme ekrani bu eylemi LISTEDEKI HER URUN icin ayri ayri
     * cagiriyor ve hepsinin bitmesini beklemek zorunda -- yoksa "Basariyla
     * Degistirildi" bildirimi istekler havadayken cikar. Kaynakta hicbir
     * sey donmedigi icin beklemek MUMKUN DEGILDI (bkz. queue sayfasindaki
     * [SIRA-1] notu). Govde aynen duruyor, yalnizca `return` eklendi.
     */
    setPanelProductQueue(product) {
      const legacyApi = useLegacyApi()

      return legacyApi.put("/panel/products/queue/change", product)
    },
    setPanelUsersList() {
      const legacyApi = useLegacyApi()

              legacyApi.get('/panel/users/list')
                  .then(response => {
                      this.MUT_setPanelUsersList(response.data.list); 
                  });
    },
    setPanelUsersButtonStatus(status) {

              this.MUT_setPanelUsersButtonStatus(status)
    },
    setPanelUsersSave(user) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

              legacyApi.post('/panel/user/save', user)
                  .then(response => {
                      if (response.data.status) {
                          this.setPanelUsersList();
                          toast.success('Kullanıcı Başarıyla Kaydedildi.');
                      } else {
                          toast.error('Kullanıcı Kaydedilemedi.');
                      }
                  });
    },
    setPanelUserDelete(id) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

              legacyApi.delete(`/panel/user/delete/${id}`)
                  .then(response => {
                      if (response.data.status) {
                          this.setPanelUsersList();
                          toast.success('Kullanıcı Başarıyla Silindi.');

                      } else {
                          toast.error('Kullanıcı Silme Başarısız ');
                      }
                  });
    },
    setPanelUserUpdate(user) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

              legacyApi.put('/panel/user/update', user)
                  .then(response => {
                      if (response.data.status) {
                                              this.setPanelUsersList();

                          toast.success('Kullanıcı Başarıyla Güncellendi.');
                      } else {
                          toast.error('Kullanıcı Güncelleme Başarısız.');
                      }
                  });
    },
    setPanelUsaStockList() {
      const legacyApi = useLegacyApi()

              legacyApi.get('/panel/usa/stock/list')
              .then(response=>{
                  this.MUT_setPanelUsaStockList(response.data.list);
              });
    },
    setpanelUsaStockPhotosList(product_id) {
      const legacyApi = useLegacyApi()

              legacyApi.get(`/panel/usa/stock/photos/list/${product_id}`)
              .then(response=>{
                  this.MUT_setpanelUsaStockPhotosList(response.data.list);
              });
    },
    setPanelUsaStockButtonStatus(status) {

              this.MUT_setPanelUsaStockButtonStatus(status);
    },
    setPanelUsaStockUpdate(product) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

              legacyApi.put('/panel/usa/stock/update',product)
              .then(response=>{
                  if(response.data.status){
                      toast.success('Başarıyla Güncellendi.');
                  } else{
                      toast.error('Güncelleme Başarısız.');
                
                  }
              });
    },
    setPanelUsaStockPhotoUpload(image) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

              legacyApi.post('/panel/usa/stock/photo/upload',image)
              .then(response=>{
                  if(response.data.status){
                      toast.success('Resim Başarıyla Yüklendi.');
                      this.setpanelUsaStockPhotosList(image[0].UrunId);
                  } else{
                      toast.error('Resim Yükleme Başarısız.');
                  }
              });
    },
    setUsaStockPhotosChangeQueue(image) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

              legacyApi.post('/panel/usa/stock/photos/change/queue',image)
              .then(response=>{
                  if(response.data.status){
                      toast.success('Fotoğraf Sırası Başarıyla Değiştirildi.');    
                  } else{
                      toast.success('Fotoğraf Sırası Değiştirme Başarısız.');    

                  }
              });
    },
    setPanelProjectSuggestedReset() {

              this.MUT_setPanelProjectSuggestedReset();
    },
    setPanelProductsSizeListUpdate(sizes) {

              this.MUT_setPanelProductsSizeListUpdate(sizes);
    },
    setpanelProductsSizeChangeQueue(sizes) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

              legacyApi.post('/panel/products/size/change/queue',sizes)
              .then(response=>{
                  if(response.data.status){
                      toast.success("Ürün Ölçü Sırası Başarıyla Değiştirildi.");
                  } else{
                      toast.success("Ürün Ölçü Sırası Değiştirme Başarısız.");
            
                  }
              });
    },
    setPanelProductsFilterReset() {

              this.MUT_setPanelProductsFilterReset();
    },

    /* ---------- mutation'lar (MUT_ onekli) ---------- */
    MUT_setPanelProductName(payload) {

              this.panelProductName = payload;
    },
    MUT_setPanelId(payload) {

              this.panelId = payload;
    },
    MUT_setPanelPublishedList(payload) {

              this.panelPublishedList = payload.list;
              this.panelCategoryList = payload.category;
    },
    MUT_setPanelPublishedChangedList(payload) {

              this.panelPublishedList = payload;
    },
    MUT_setPanelPublishedListCategory(payload) {

              this.panelPublishedList = payload;
    },
    MUT_setPanelProductButtonStatus(payload) {

              this.panelProductButtonStatus = payload;
    },
    MUT_setPanelProductAdd(payload) {

              this.panelPublishedList.push(payload);
    },
    MUT_setPanelProductsUpdate(payload) {

              const index = this.panelPublishedList.findIndex(x => x.Id === payload.Id);
              this.panelPublishedList.splice(index, 1, payload);
    },
    MUT_setPanelProductsDelete(payload) {

              const index = this.panelPublishedList.findIndex(x => x.urunid === payload);
              this.panelPublishedList.splice(index, 1);
    },
    MUT_setPanelProductId(payload) {

              this.panelProductId = payload;
    },
    MUT_setPanelProductSizeAdd(payload) {

              this.panelProductSizeList.push(payload);
    },
    MUT_setPanelProductSizeDelete(payload) {


              const index = this.panelProductSizeList.findIndex(x => x.Id == payload);
              this.panelProductSizeList.splice(index, 1);
    },
    MUT_setPanelProductSizeUpdate(payload) {

              const index = this.panelProductSizeList.findIndex(x => x.Id == payload.Id);
              this.panelProductSizeList.splice(index, 1, payload);
    },
    MUT_setPanelProductFiltersList(payload) {

                  this.panelProductSizeList = payload.size;
                  this.panelProductFinishList = payload.finish;
                  this.panelProductColorList = payload.color;
                  this.panelProductAreaList = payload.area;
                  this.panelProductTypeList = payload.type;
                  this.panelProductMaterialList = payload.material;
                  this.panelProductEdgeList = payload.edge;
                  this.panelProductStyleList = payload.style;
                  this.panelProductPhotoList = [payload.photo, []];
                  this.panelProductSuggestedList = [payload.suggestedall,payload.suggestedlist]
    },
    MUT_setPanelProductColorAdd(payload) {

              this.panelProductColorList.push(payload);
    },
    MUT_setPanelProductColorDelete(payload) {

              const index = this.panelProductColorList.findIndex(x => x.ID == payload);
              this.panelProductColorList.splice(index, 1);
    },
    MUT_setPanelProductFinishAdd(payload) {

              this.panelProductFinishList.push(payload);
    },
    MUT_setPanelProductFinishDelete(payload) {

              const index = this.panelProductFinishList.findIndex(x => x.ID == payload);
              this.panelProductFinishList.splice(index, 1);
    },
    MUT_setPanelProductAreaAdd(payload) {

              this.panelProductAreaList.push(payload);
    },
    MUT_setPanelProductAreaDelete(payload) {

              const index = this.panelProductAreaList.findIndex(x => x.ID == payload);
              this.panelProductAreaList.splice(index, 1);
    },
    MUT_setPanelProductTypeAdd(payload) {

              this.panelProductTypeList.push(payload);
    },
    MUT_setPanelProductTypeDelete(payload) {

              const index = this.panelProductTypeList.findIndex(x => x.ID == payload);
              this.panelProductTypeList.splice(index, 1);
    },
    MUT_setPanelProductStyleAdd(payload) {

              this.panelProductStyleList.push(payload);
    },
    MUT_setPanelProductStyleDelete(payload) {

              const index = this.panelProductStyleList.findIndex(x => x.ID == payload);
              this.panelProductStyleList.splice(index, 1);
    },
    MUT_setPanelProductMaterialAdd(payload) {

              this.panelProductMaterialList.push(payload);
    },
    MUT_setPanelProductEdgeAdd(payload) {

              this.panelProductEdgeList.push(payload);
    },
    MUT_setPanelProductMaterialDelete(payload) {

              const index = this.panelProductMaterialList.findIndex(x => x.ID == payload);
              this.panelProductMaterialList.splice(index, 1);
    },
    MUT_setPanelProductEdgeDelete(payload) {

              const index = this.panelProductEdgeList.findIndex(x => x.ID == payload);
              this.panelProductEdgeList.splice(index, 1);
    },
    MUT_setPanelProductPhotoListUpdate(payload) {

              this.panelProductPhotoList = [payload,[]];
    },
    MUT_setPanelProjectList(payload) {

              this.panelProjectList = payload;
    },
    MUT_setPanelProjectDetail(payload) {

              this.panelProjectPhotos = [payload.photos,[]];
              this.panelProjectSuggested = [payload.notSuggested,payload.suggested];
              this.panelProjectInformation = payload.information[0];
              this.panelProjectVideo = payload.video;
    },
    MUT_setPanelProjectSuggestedReset() {

              this.panelProjectSuggested = [[],[]];
    },
    MUT_setPanelProjectButtonStatus(payload) {

              this.panelProjectButtonStatus = payload;
    },
    MUT_setPanelProjectId(payload) {

              this.panelProjectId = payload;
    },
    MUT_setPanelUsersList(payload) {

              this.panelUsersList = payload;
    },
    MUT_setPanelUsersButtonStatus(payload) {

              this.panelUsersButtonStatus = payload;
    },
    MUT_setPanelUsaStockList(payload) {

             this.panelUsaStockList = payload;
    },
    MUT_setpanelUsaStockPhotosList(payload) {

              this.panelUsaStockPhotosList = payload;
    },
    MUT_setPanelUsaStockButtonStatus(payload) {

              this.panelUsaStockButtonStatus = payload;
    },
    MUT_setPanelProductsSizeListUpdate(payload) {

              this.panelProductSizeList = payload;
    },
    MUT_setPanelProductsFilterReset() {

              this.panelProductSizeList =  [];
              this.panelProductFinishList =  [];
              this.panelProductColorList =  [];
              this.panelProductAreaList =  [];
              this.panelProductTypeList =  [];
              this.panelProductMaterialList =  [];
              this.panelProductEdgeList =  [];
              this.panelProductStyleList = [];
    },
  },
})
