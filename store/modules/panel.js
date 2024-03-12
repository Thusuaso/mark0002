const state = {
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
    panelUsaStockButtonStatus:false
};
const actions = {
    setPanelProjectMainPhotoChange(vuexContext,photo){
        this.$axios.post('/panel/project/main/photo/change',photo)
        .then(response=>{
            if(response.data.status){
                this.$toast.success("Başarıyla Değiştirildi.");
            }else{
                this.$toast.success("Değiştirme Başarısız.");
                
            }
        });
    },
    setPanelProjectPhotosQueueChange(vuexContext,photos){
        this.$axios.post('/panel/projet/photos/queue/change',photos)
        .then(response=>{
            if(response.data.status){
                this.$toast.success('Başarıyla Değiştirildi.');
            } else{
                this.$toast.error('Hata Oluştu.');
            }
        })
    },
    setPanelProjectQueueChange(vuexContext,projects){
        this.$axios.put('/panel/project/queue/change',projects)
        .then(response=>{
            if(response.data.status){
                this.$toast.success('Başarıyla Değiştirildi.');
            } else{
                this.$toast.error('Değiştirme Başarısız.');
                
            }
        });
    },
    setPanelPublishedList(vuexContext) {
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.get('/panel/published/list')
            .then(response => {
                if (response.data) {
                    vuexContext.commit('setPanelPublishedList', response.data);
                    vuexContext.dispatch('setEndLoadingAction');
                }
                
            });
    },
    setPanelNotPublishedList(vuexContext) {
        vuexContext.dispatch('setBeginLoadingAction');
                this.$axios.get('/panel/not/published/list')
                    .then(response => {
                        if (response.data) {
                            vuexContext.commit('setPanelPublishedList', response.data);
                vuexContext.dispatch('setEndLoadingAction');
                        }
                
            });
    },
    setPanelPublishedListCategory(vuexContext, id) {
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.get(`/panel/published/list/${id}`)
            .then(response => {
                if (response.data.list) {
                    vuexContext.commit('setPanelPublishedListCategory', response.data.list); 
                vuexContext.dispatch('setEndLoadingAction');
                }
                
            });
    },
    setPanelNotPublishedListCategory(vuexContext, id) {
            vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.get(`/panel/not/published/list/${id}`)
            .then(response => {
                if (response.data.list) {
                    vuexContext.commit('setPanelPublishedListCategory', response.data.list); 
                vuexContext.dispatch('setEndLoadingAction');
                }
                
            });
    },
    setPanelProductButtonStatus(vuexContext, status) {
        vuexContext.commit('setPanelProductButtonStatus', status);
    },
    setPanelProductsSave(vuexContext, product) {
        this.$axios.post('/panel/product/save', product)
            .then(response => {
                if (response.data.status) {
                    this.$toast.success("Başarıyla Kaydedildi.");
                    vuexContext.dispatch('setPanelProductId', response.data.productId);
                    vuexContext.commit("setPanelProductAdd", { ...product, 'Id': response.data.id,'urunid':response.data.productId ,'sira':response.data.queue});
                } else {
                    this.$toast.error("Kaydetme Başarısız.");
                }
            });
    },
    setPanelProductsUpdate(vuexContext, product) {
        this.$axios.put('/panel/product/update', product)
            .then(response => {
                if (response.data.status) {
                    this.$toast.success("Başarıyla Güncellendi.");
                    vuexContext.commit("setPanelProductsUpdate", product);
                } else {
                    this.$toast.error("Güncelleme Başarısız.");
                    
                }
            });  
    },
    setPanelProductsDelete(vuexContext, productId) {
        this.$axios.delete(`/panel/product/delete/${productId}`)
            .then(response => {
                if (response.data.status) {
                    this.$toast.success("Başarıyla Silindi.");
                    vuexContext.commit('setPanelProductsDelete',productId); 
                } else {
                    this.$toast.error("Silme Başarısız.");
                }
            });
    },
    setPanelProductId(vuexContext, id) {
        vuexContext.commit('setPanelProductId', id);
    },
    setPanelProductFiltersList(vuexContext, data) {
        this.$axios.post(`/panel/product/filtered/list`,data)
            .then(response => {
                        vuexContext.commit('setPanelProductFiltersList',response.data);
            });
    },
    setPanelProductSizeAdd(vuexContext, size) {
        this.$axios.post('/panel/product/size/add', size)
            .then(response => {
                if (response.data.status) {
                    this.$toast.success('Ebat Başarıyla Eklendi');
                        vuexContext.commit('setPanelProductSizeAdd', {...size,'Id':response.data.id}); 
                        vuexContext.dispatch('setPanelProductSizeModel');
                } else {
                    this.$toast.error('Ebat Ekleme Başarısız');
                    
                }

            });

    },
    setPanelProductSizeDelete(vuexContext, id) {
        this.$axios.delete(`/panel/product/size/delete/${id}`)
            .then(response => {
                if (response.data.status) {
                    this.$toast.success("Ebat Başarıyla Silindi");
                    vuexContext.commit('setPanelProductSizeDelete', id);
                } else {
                    this.$toast.error("Ebat Silme Başarısız");
                }
            });
    },
    setPanelProductSizeUpdate(vuexContext, size) {
        this.$axios.put('/panel/product/size/update', size)
            .then(response => {
                if (response.data.status) {
                    this.$toast.success("Ebat Başarıyla Güncellendi.");
                    vuexContext.commit('setPanelProductSizeUpdate', size);
                } else {
                    this.$toast.error("Ebat Güncelleme Başarısız.");
                }
            });
    },
    setPanelProductColorAdd(vuexContext, color) {
        this.$axios.post('/panel/product/color/add', color)
            .then(response => {
                if (response.data.status) {
                    this.$toast.success("Renk Başarıyla Eklendi.");
                    vuexContext.commit('setPanelProductColorAdd', { ...color,'ID':response.data.id });
                    vuexContext.dispatch('setPanelProductColorModel');
                } else {
                    this.$toast.error("Renk Ekleme Başarısız.");
                }
            });

    },
    setPanelProductColorDelete(vuexContext, id) {
        this.$axios.delete(`/panel/product/color/delete/${id}`)
            .then(response => {
                if (response.data.status) {
                    this.$toast.success("Renk Başarıyla Silindi.");
                    vuexContext.commit('setPanelProductColorDelete', id);
                } else {
                    this.$toast.error("Renk Silme Başarısız.");
                }
            });
    },
    setPanelProductFinishAdd(vuexContext, finish) {
        this.$axios.post('/panel/product/finish/add', finish)
            .then(response => {
                if (response.data.status) {
                    this.$toast.success("Yüzey Başarıyla Eklendi.");
                    vuexContext.commit('setPanelProductFinishAdd', { ...finish, 'Id': response.data.id });
                    vuexContext.dispatch('setPanelProductFinishModel');
                } else {
                    this.$toast.error("Yüzey Ekleme Başarısız.");
                }
            });
    },
    setPanelProductFinishDelete(vuexContext, id) {
        this.$axios.delete(`/panel/product/finish/delete/${id}`)
            .then(response => {
                if (response.data.status) {
                    this.$toast.success("Yüzey Başarıyla Silindi.");
                    vuexContext.commit('setPanelProductFinishDelete', id);
                } else {
                    this.$toast.error("Yüzey Silme Başarısız.");
                }
            })
    },
    setPanelProductAreaAdd(vuexContext, area) {
        this.$axios.post('/panel/product/area/add', area)
            .then(response => {
                if (response.data.status) {
                    this.$toast.success("Alan Başarıyla Eklendi.");
                    vuexContext.commit('setPanelProductAreaAdd', { ...area, 'ID': response.data.id });
                    vuexContext.dispatch('setPanelProductAreaModel');
                } else {
                    this.$toast.error("Alan Ekleme Başarısız.");
                }
            });
    },
    setPanelProductAreaDelete(vuexContext, id) {
        this.$axios.delete(`/panel/product/area/delete/${id}`)
            .then(response => {
                if (response.data.status) {
                    this.$toast.success("Alan Başarıyla Silindi.");
                    vuexContext.commit('setPanelProductAreaDelete',id);
                } else {
                    this.$toast.error("Alan Silme Başarısız.");
                }
            })
    },
    setPanelProductTypeAdd(vuexContext, type) {
        this.$axios.post('/panel/product/type/add', type)
            .then(response => {
                if (response.data.status) {
                    this.$toast.success("Tür Başarıyla Eklendi.");
                    vuexContext.commit('setPanelProductTypeAdd', { ...type, 'ID': response.data.id });
                    vuexContext.dispatch('setPanelProductTypeModel');
                } else {
                    this.$toast.error("Tür Ekleme Başarısız.");
                }
            });
    },
    setPanelProductTypeDelete(vuexContext, id) {
        this.$axios.delete(`/panel/product/type/delete/${id}`)
            .then(response => {
               if(response.data.status){
                   this.$toast.success('Tür Silme Başarılı.');
                   vuexContext.commit('setPanelProductTypeDelete', id);
               } else {
                this.$toast.error('Tür Silme Başarısız.');
               }
            });
    },
    setPanelProductStyleAdd(vuexContext, style) {
        this.$axios.post('/panel/product/style/add', style)
            .then(response => {
               if(response.data.status){
                   this.$toast.success('Stil Ekleme Başarılı.');
                   vuexContext.commit('setPanelProductStyleAdd', { ...style, 'ID': response.data.id });
                   vuexContext.dispatch('setPanelProductStyleModel');
               } else {
                this.$toast.error('Stil Ekleme Başarısız.');
               }
            });
    },
    setPanelProductStyleDelete(vuexContext, id) {
        this.$axios.delete(`/panel/product/style/delete/${id}`)
            .then(response => {
                if (response.data.status) {
                    this.$toast.success('Stil Silme Başarılı.');
                    vuexContext.commit('setPanelProductStyleDelete', id);
                } else {
                    this.$toast.error('Stil Silme Başarısız.');
                }
            });
    },
    setPanelProductMaterialAdd(vuexContext, material) {
        this.$axios.post('/panel/product/material/add', material)
            .then(response => {
                if (response.data.status) {
                    this.$toast.success('Materyal Ekleme Başarılı.');
                    vuexContext.commit('setPanelProductMaterialAdd', { ...material, 'ID': response.data.id });
                    vuexContext.dispatch('setPanelProductMaterialModel');
                } else {
                  this.$toast.error('Materyal Ekleme Başarısız.');
                };
            })
    },
    setPanelProductMaterialDelete(vuexContext, id) {
        this.$axios.delete(`/panel/product/material/delete/${id}`)
            .then(response => {
                if (response.data.status) {
                    this.$toast.success('Materyal Silme Başarılı.');
                    vuexContext.commit('setPanelProductMaterialDelete', id);
                } else {
                    this.$toast.error('Materyal Silme Başarısız.');
                }
            });
    },
    setPanelProductEdgeAdd(vuexContext, kenar) {
        this.$axios.post('/panel/product/edge/add', kenar)
            .then(response => {
                if (response.data.status) {
                    this.$toast.success('Kenar Ekleme Başarılı.');
                    vuexContext.commit('setPanelProductEdgeAdd', { ...kenar, 'ID': response.data.id });
                    vuexContext.dispatch('setPanelProductEdgeModel');
                } else {
                  this.$toast.error('Kenar Ekleme Başarısız.');
                };
            })
    },
    setPanelProductEdgeDelete(vuexContext, id) {
        this.$axios.delete(`/panel/product/edge/delete/${id}`)
            .then(response => {
                if (response.data.status) {
                    this.$toast.success('Kenar Silme Başarılı.');
                    vuexContext.commit('setPanelProductEdgeDelete', id);
                } else {
                    this.$toast.error('Kenar Silme Başarısız.');
                }
            });
    },
    setPanelProductPhotoOneDelete(vuexContext, id) {
        this.$axios.delete(`/panel/product/photo/one/delete/${id}`)
            .then(response => {
                if (response.data.status) {
                    this.$toast.success('Fotoğraf Başarıyla Silindi');
                } else {
                    this.$toast.error('Fotoğraf Silme Başarısız');
                }
            });
    },
    setPanelProductPhotoAllDelete(vuexContext, id) {
        this.$axios.delete(`/panel/product/photo/all/delete/${id}`)
            .then(response => {
                if (response.data.status) {
                    this.$toast.success('Fotoğraflar Başarıyla Silindi.');
                } else {
                    this.$toast.error('Fotoğrafları Silme Başarısız.');
                    
                }
            });
    },
    setPanelProductPhotoQueueChange(vuexContext, photo) {
        this.$axios.post('/panel/product/photo/queue/change', photo)
            .then(response => {
                if (response.data.status) {
                    this.$toast.success('Fotoğraf Sırası Başarıyla Değiştirildi.');
                } else {
                    this.$toast.success('Fotoğraf Sırası Değiştirme Başarısız');
                }
            })
    },
    setPanelProductPhotoAdd(vuexContext, photo) {
        this.$axios.post('/panel/product/photo/add', photo)
            .then(response => {
                if (response.data.status) {
                    this.$toast.success('Fotoğraf Eklendi.');
                    vuexContext.dispatch('setPanelProductPhotoListUpdate', photo.urunid);

                } else {
                    this.$toast.error('Fotoğraf Eklenemedi.');
                }
            });
    },
    setPanelProductPhotoListUpdate(vuexContext, id) {
        this.$axios.get(`/panel/product/photos/list/update/${id}`)
            .then(response => {
               vuexContext.commit('setPanelProductPhotoListUpdate', response.data.list);
            });
    },
    setPanelProductSuggestedAdd(vuexContext, payload) {
        this.$axios.post('/panel/product/suggested/add', payload)
            .then(response => {
                if(response.data.status){
                    this.$toast.success('Önerilen Ürün Kayıt Başarılı.');
                } else {
                    this.$toast.error('Önerilen Ürün Kayıt Başarısız.');
                }
            });
    },
    setPanelProductSuggestedDelete(vuexContext, id) {
        this.$axios.delete(`/panel/product/suggested/delete/${id}`)
            .then(response => {
                if (response.data.status) {
                    this.$toast.success('Önerilen Ürün Silme Başarılı.');
                } else {
                    this.$toast.error('Önerilen Ürün Silme Başarısız.');
                };
            });
    },
    setPanelProductSuggestedQueueChange(vuexContext, payload) {
        this.$axios.post('/panel/product/suggested/queue/change', payload)
            .then(response => {

            });

    },
    setPanelProductTestReport(vuexContext, payload) {
        this.$axios.post('/panel/product/test/report', payload)
            .then(response => {
                if (response.data.status) {
                                    this.$toast.success('Test Raporu Başarıyla Yüklendi');

                } else {
                                    this.$toast.error('Test Raporu Yükleme Başarısız');

                };
            });
    },
    setPanelProjectList(vuexContext) {
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.get('/panel/project/list')
            .then(response => {
                vuexContext.commit('setPanelProjectList', response.data.list); 
                vuexContext.dispatch('setEndLoadingAction');
            });
    },
    setPanelProjectDetail(vuexContext, id) {
        this.$axios.get(`/panel/project/detail/${id}`)
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
                    vuexContext.commit('setPanelProjectDetail', response.data);
                } else {
                    vuexContext.commit('setPanelProjectDetail', response.data);
                }
            });
    },
    setPanelProjectPhotoDelete(vuexContext, id) {
        this.$axios.get(`/panel/project/photo/delete/${id}`)
            .then(response => {
                if (response.data.status) {
                    this.$toast.success('Fotoğraf Başarıyla Silindi');
                } else {
                this.$toast.error('Fotoğraf Silme Başarısız');
                    }
            });
    },
    setPanelProjectButtonStatus(vuexContext, status) {
        vuexContext.commit('setPanelProjectButtonStatus', status);
    },
    setPanelProjectId(vuexContext, id) {
        vuexContext.commit('setPanelProjectId',id)
    },
    panelProjectInformationUpdate(vuexContext, information) {
        this.$axios.post('/panel/project/information/update', information)
            .then(response => {
                if (response.data.status) {
                    this.$toast.success('Proje Bilgileri Başarıyla Güncellendi');
                } else {
                    this.$toast.error('Proje Bilgileri Güncelleme Başarısız');
                }
            });
    },
    setPanelProjectProductPhotoSave(vuexContext, photo) {
        this.$axios.post('/panel/project/product/photo/save', photo)
            .then(response => {
                if (response.data.status) {
                    this.$toast.success('Fotoğraf Başarıyla eklendi.');
                    vuexContext.dispatch('setPanelProjectDetail', photo.ProjectId);
                } else {
                    this.$toast.error('Fotoğraf Ekleme başarısız.');
                }
            });
    },
    setPanelProjectProductPhotoNameSave(vuexContext, photo) {
        this.$axios.put('/panel/project/product/photo/name/update', photo)
            .then(response => {
                if (response.data.status) {
                    vuexContext.dispatch('setPanelProjectDetail', photo.ProjectId);
                    this.$toast.success('Ürün İsmi Başarıyla Değiştirildi.');

                } else {
                    this.$toast.error('Ürün İsmi Değiştirme Başarısız.');
                }
            })
    },
    setPanelProjectSuggestedAdd(vuexContext, suggested) {
        this.$axios.post('/panel/project/suggested/add', suggested)
            .then(response => {
                if (response.data.status) {
                    vuexContext.dispatch('setPanelProjectDetail', suggested.ProjectId);
                    this.$toast.success('Önerilen Ürün Başarıyla Eklendi.');    
                } else {
                    this.$toast.success('Önerilen Ürün Ekleme Başarısız.');    
                };
            });
    },
    setPanelProjectSuggestedDelete(vuexContext,suggested){
        this.$axios.delete(`/panel/project/suggested/delete/${suggested.ID}`)
            .then(response => {
                if (response.data.status) {
                    vuexContext.dispatch('setPanelProjectDetail', suggested.ProjectId);
                    this.$toast.success('Önerilen Ürün Başarıyla Silindi.');
                } else {
                    this.$toast.error('Önerilen Ürün Silme Başarısız');
                }
            });
    },
    setPanelProjectVideoAdd(vuexContext,video){
        this.$axios.post('/panel/project/video/add', video)
            .then(response => {
                if (response.data.status) {
                    vuexContext.dispatch('setPanelProjectDetail', video.ProjectId);
                    this.$toast.success('Video Başarıyla Eklendi.');    
                } else {
                 this.$toast.error('Video Ekleme Başarısız.');
                }
            });

    },
    setPanelProjectSave(vuexContext, project) {
        this.$axios.post('/panel/project/save', project)
            .then(response => {
                if (response.data.status) {
                    this.$toast.success('Proje Başarıyla Kaydedildi, Fotoğrafı Yükleyebilirsiniz...');
                    vuexContext.dispatch('setPanelProjectId', response.data.id);
                } else {
                    this.$toast.error('Proje Ekleme Başarısız');
                }
            });
    },
    setPanelProjectImageAdd(vuexContext, image) {
        this.$axios.put('/panel/project/photos/add', image)
            .then(response => {
                if (response.data.status) {
                    this.$toast.success('Proje Fotoğrafı Başarıyla Eklendi.');
                    vuexContext.dispatch('setPanelProjectList');
                                        vuexContext.dispatch('setPanelProjectModel');


                } else {
                    this.$toast.error('Proje Fotoğrafı Ekleme Hatası.');
                }
            });
    },
    panelProjectInformationSave(vuexContext, information) {
        this.$axios.post('/panel/project/information/save', information)
            .then(response => {
                if (response.data.status) {
                    this.$toast.success('Proje Bilgileri Başarıyla Kaydedildi.');
                } else {
                    this.$toast.error('Proje Bilgileri Kaydedilemedi.');
                }
            });
    },
    setPanelProductQueue(vuexContext, products) {
        this.$axios.post('/panel/product/change/queue', products)
            .then(response => {
                
            });
    },
    setPanelUsersList(vuexContext) {
        this.$axios.get('/panel/users/list')
            .then(response => {
                vuexContext.commit('setPanelUsersList', response.data.list); 
            });
    },
    setPanelUsersButtonStatus(vuexContext, status) {
        vuexContext.commit('setPanelUsersButtonStatus',status)
    },
    setPanelUsersSave(vuexContext, user) {
        this.$axios.post('/panel/user/save', user)
            .then(response => {
                if (response.data.status) {
                    vuexContext.dispatch('setPanelUsersList');
                    this.$toast.success('Kullanıcı Başarıyla Kaydedildi.');
                } else {
                    this.$toast.error('Kullanıcı Kaydedilemedi.');
                }
            });
    },
    setPanelUserDelete(vuexContext, id) {
        this.$axios.delete(`/panel/user/delete/${id}`)
            .then(response => {
                if (response.data.status) {
                    vuexContext.dispatch('setPanelUsersList');
                    this.$toast.success('Kullanıcı Başarıyla Silindi.');

                } else {
                    this.$toast.error('Kullanıcı Silme Başarısız ');
                }
            });
    },
    setPanelUserUpdate(vuexContext, user) {
        this.$axios.put('/panel/user/update', user)
            .then(response => {
                if (response.data.status) {
                                        vuexContext.dispatch('setPanelUsersList');

                    this.$toast.success('Kullanıcı Başarıyla Güncellendi.');
                } else {
                    this.$toast.error('Kullanıcı Güncelleme Başarısız.');
                }
            });
    },
    setPanelUsaStockList(vuexContext){
        this.$axios.get('/panel/usa/stock/list')
        .then(response=>{
            vuexContext.commit('setPanelUsaStockList',response.data.list);
        });
    },
    setpanelUsaStockPhotosList(vuexContext,product_id){
        this.$axios.get(`/panel/usa/stock/photos/list/${product_id}`)
        .then(response=>{
            vuexContext.commit('setpanelUsaStockPhotosList',response.data.list);
        });
    },
    setPanelUsaStockButtonStatus(vuexContext,status){
        vuexContext.commit('setPanelUsaStockButtonStatus',status);
    },
    setPanelUsaStockUpdate(vuexContext,product){
        this.$axios.put('/panel/usa/stock/update',product)
        .then(response=>{
            if(response.data.status){
                this.$toast.success('Başarıyla Güncellendi.');
            } else{
                this.$toast.error('Güncelleme Başarısız.');
                
            }
        });
    },
    setPanelUsaStockPhotoUpload(vuexContext,image){
        this.$axios.post('/panel/usa/stock/photo/upload',image)
        .then(response=>{
            if(response.data.status){
                this.$toast.success('Resim Başarıyla Yüklendi.');
                vuexContext.dispatch('setpanelUsaStockPhotosList',image.UrunId);
            } else{
                this.$toast.error('Resim Yükleme Başarısız.');
            }
        });
    },
    setUsaStockPhotosChangeQueue(vuexContext,image){
        this.$axios.post('/panel/usa/stock/photos/change/queue')
        .then(response=>{
            if(response.data.status){
                this.$toast.success('Fotoğraf Sırası Başarıyla Değiştirildi.');    
            } else{
                this.$toast.success('Fotoğraf Sırası Değiştirme Başarısız.');    

            }
        });
    },
    setPanelProjectSuggestedReset(vuexContext){
        vuexContext.commit('setPanelProjectSuggestedReset');
    },
    setPanelProductsSizeListUpdate(vuexContext,sizes){
        vuexContext.commit('setPanelProductsSizeListUpdate',sizes);
    },
    setpanelProductsSizeChangeQueue(vuexContext,sizes){
        this.$axios.post('/panel/products/size/change/queue',sizes)
        .then(response=>{
            if(response.data.status){
                this.$toast.success("Ürün Ölçü Sırası Başarıyla Değiştirildi.");
            } else{
                this.$toast.success("Ürün Ölçü Sırası Değiştirme Başarısız.");
            
            }
        });
    }


};
const mutations = {
    setPanelPublishedList(state, payload) {
        state.panelPublishedList = payload.list;
        state.panelCategoryList = payload.category;
    },
    setPanelPublishedListCategory(state, payload) {
        state.panelPublishedList = payload;
    },
    setPanelProductButtonStatus(state, payload) {
        state.panelProductButtonStatus = payload;
    },
    setPanelProductAdd(state, payload) {
        state.panelPublishedList.push(payload);
    },
    setPanelProductsUpdate(state, payload) {
        const index = state.panelPublishedList.findIndex(x => x.Id === payload.Id);
        state.panelPublishedList.splice(index, 1, payload);
    },
    setPanelProductsDelete(state, payload) {
        const index = state.panelPublishedList.findIndex(x => x.urunid === payload);
        state.panelPublishedList.splice(index, 1);
    },
    setPanelProductId(state, payload) {
        state.panelProductId = payload;
    },
    setPanelProductSizeAdd(state, payload) {
        state.panelProductSizeList.push(payload);
    },
    setPanelProductSizeDelete(state, payload) {

        const index = state.panelProductSizeList.findIndex(x => x.Id == payload);
        state.panelProductSizeList.splice(index, 1);
    },
    setPanelProductSizeUpdate(state, payload) {
        const index = state.panelProductSizeList.findIndex(x => x.Id == payload.Id);
        state.panelProductSizeList.splice(index, 1, payload);
    },
    setPanelProductFiltersList(state, payload) {
            state.panelProductSizeList = payload.size;
            state.panelProductFinishList = payload.finish;
            state.panelProductColorList = payload.color;
            state.panelProductAreaList = payload.area;
            state.panelProductTypeList = payload.type;
        state.panelProductMaterialList = payload.material;
        state.panelProductEdgeList = payload.edge;
        state.panelProductStyleList = payload.style;
        state.panelProductPhotoList = [payload.photo, []];
        state.panelProductSuggestedList = [payload.suggestedall,payload.suggestedlist]
    },
    setPanelProductColorAdd(state, payload) {
        state.panelProductColorList.push(payload);
    },
    setPanelProductColorDelete(state, payload) {
        const index = state.panelProductColorList.findIndex(x => x.ID == payload);
        state.panelProductColorList.splice(index, 1);
    },
    setPanelProductFinishAdd(state, payload) {
        state.panelProductFinishList.push(payload);
    },
    setPanelProductFinishDelete(state, payload) {
        const index = state.panelProductFinishList.findIndex(x => x.ID == payload);
        state.panelProductFinishList.splice(index, 1);
    },
    setPanelProductAreaAdd(state, payload) {
        state.panelProductAreaList.push(payload);
    },
    setPanelProductAreaDelete(state, payload) {
        const index = state.panelProductAreaList.findIndex(x => x.ID == payload);
        state.panelProductAreaList.splice(index, 1);
    },
    setPanelProductTypeAdd(state, payload) {
        state.panelProductTypeList.push(payload);
    },
    setPanelProductTypeDelete(state, payload) {
        const index = state.panelProductTypeList.findIndex(x => x.ID == payload);
        state.panelProductTypeList.splice(index, 1);
    },
    setPanelProductStyleAdd(state, payload) {
        state.panelProductStyleList.push(payload);
    },
    setPanelProductStyleDelete(state, payload) {
        const index = state.panelProductStyleList.findIndex(x => x.ID == payload);
        state.panelProductStyleList.splice(index, 1);
    },
    setPanelProductMaterialAdd(state, payload) {
        state.panelProductMaterialList.push(payload);
    },
    setPanelProductEdgeAdd(state,payload){
        state.panelProductEdgeList.push(payload);
    },
    setPanelProductMaterialDelete(state, payload) {
        const index = state.panelProductMaterialList.findIndex(x => x.ID == payload);
        state.panelProductMaterialList.splice(index, 1);
    },
    setPanelProductEdgeDelete(state, payload) {
        const index = state.panelProductEdgeList.findIndex(x => x.ID == payload);
        state.panelProductEdgeList.splice(index, 1);
    },
    setPanelProductPhotoListUpdate(state, payload) {
        state.panelProductPhotoList = [payload,[]];
    },
    setPanelProjectList(state, payload) {
        state.panelProjectList = payload;
    },
    setPanelProjectDetail(state, payload) {
        state.panelProjectPhotos = [payload.photos,[]];
        state.panelProjectSuggested = [payload.notSuggested,payload.suggested];
        state.panelProjectInformation = payload.information[0];
        state.panelProjectVideo = payload.video;
    
    },
    setPanelProjectSuggestedReset(state){
        state.panelProjectSuggested = [[],[]];

    },
    setPanelProjectButtonStatus(state, payload) {
        state.panelProjectButtonStatus = payload;
    },
    setPanelProjectId(state, payload) {
        state.panelProjectId = payload;  
    },
    setPanelUsersList(state, payload) {
        state.panelUsersList = payload;
    },
    setPanelUsersButtonStatus(state, payload) {
        state.panelUsersButtonStatus = payload;
    },
    setPanelUsaStockList(state,payload){
       state.panelUsaStockList = payload; 
    },
    setpanelUsaStockPhotosList(state,payload){
        state.panelUsaStockPhotosList = payload;
    },
    setPanelUsaStockButtonStatus(state,payload){
        state.panelUsaStockButtonStatus = payload;
    },
    setPanelProductsSizeListUpdate(state,payload){
        state.panelProductSizeList = payload;
    }


};
const getters = {
    getPanelPublishedList(state) {
        return state.panelPublishedList;
    },
    getPanelCategoryList(state) {
        return state.panelCategoryList;
    },
    getPanelProductButtonStatus(state) {
        return state.panelProductButtonStatus;
    },
    getPanelProductId(state) {
        return state.panelProductId;
    },
    getPanelProductSizeList(state) {
        return state.panelProductSizeList;
    },
    getPanelProductFinishList(state) {
        return state.panelProductFinishList;
    },
    getPanelProductColorList(state) {
        return state.panelProductColorList;
    },
    getPanelProductAreaList(state) {
        return state.panelProductAreaList;
    },
    getPanelProductTypeList(state) {
        return state.panelProductTypeList;
    },
    getPanelProductMaterialList(state) {
        return state.panelProductMaterialList;
    },
    getPanelProductEdgeList(state){
      return state.panelProductEdgeList;  
    },
    getPanelProductStyleList(state) {
        return state.panelProductStyleList;
    },
    getPanelProductPhotoList(state) {
        return state.panelProductPhotoList;
    },
    getPanelProductSuggestedList(state) {
        return state.panelProductSuggestedList;
    },
    getPanelProjectList(state) {
        return state.panelProjectList;
    },
    getPanelProjectPhotos(state) {
        return state.panelProjectPhotos;
    },
    getPanelProjectSuggested(state) {
        return state.panelProjectSuggested;  
    },
    getPanelProjectInformation(state) {
        return state.panelProjectInformation;
    },
    getPanelProjectVideo(state) {
        return state.panelProjectVideo;
    },
    getPanelProjectButtonStatus(state) {
        return state.panelProjectButtonStatus;
    },
    getPanelProjectId(state) {
        return state.panelProjectId;
    },
    getPanelUsersList(state) {
        return state.panelUsersList;
    },
    getPanelUsersButtonStatus(state) {
        return state.panelUsersButtonStatus;
    },
    getPanelUsaStockList(state){
        return state.panelUsaStockList;
    },
    getPanelUsaStockPhotosList(state){
        return state.panelUsaStockPhotosList;
    },
    getPanelUsaStockButtonStatus(state){
        return state.panelUsaStockButtonStatus
    },


};
export default {
    state,
    actions,
    mutations,
    getters
}