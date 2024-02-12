const state = {
    offerList: [],
    offerCountryList: [],
    offerDetailList: [],
    offerDetailProductsList: [],
    offerButtonStatus: false,
    offerId: 0,
    offerAllButtonStatus: false,
    offerOldList: [],
    offerDetailBList:[]
};
const actions = {
    setOfferMainList(vuexContext) {
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.get('/offer/main/list')
            .then(response => {
                if (response.data) {
                                vuexContext.commit('setOfferMainList', response.data); 
                vuexContext.dispatch('setEndLoadingAction');
                }

            });
    },
    setOfferMainDetailList(vuexContext, representative) {
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.get(`/offer/main/detail/list/${representative}`)
            .then(response => {
                if (response.data.list) {
                                    vuexContext.commit('setOfferMainDetailList', response.data.list); 
                vuexContext.dispatch('setEndLoadingAction');
                }

            });
    },
    setOfferDetailProductsList(vuexContext, id) {
        this.$axios.get(`/offer/detail/products/list/${id}`)
            .then(response => {
                vuexContext.commit('setOfferDetailProductsList', response.data.list); 
            });
    },
    setOfferDetailProductsAdd(vuexContext, product) {

        this.$axios.post('/offer/product/add', product)
            .then(response => {
                if(response.data.status){
                    this.$toast.success('Başarıyla Eklendi.');
                    vuexContext.commit('setOfferDetailProductsAdd', { ...product, 'Id': response.data.id });
                    vuexContext.dispatch('setOfferProductModel');


                } else {
                    this.$toast.error('Ekleme Başarısız');
                }
            });
        
    },
    setOfferDetailProductsUpdate(vuexContext, product) {

        this.$axios.put('/offer/product/update', product)
            .then(response => {
                if (response.data.status) {
                    this.$toast.success('Başarıyla Güncellendi.');
                    vuexContext.commit('setOfferDetailProductsUpdate', product);

                    vuexContext.dispatch('setOfferProductModel');
                } else {
                    this.$toast.error('Güncelleme Başarısız');
                }
            })
    },
    setOfferDetailProductsDelete(vuexContext, id) {
        this.$axios.delete(`/offer/product/delete/${id}`)
            .then(response => {
                if (response.data.status) {
                    this.$toast.success('Başarıyla Silindi');
                    vuexContext.commit('setOfferDetailProductsDelete', id);

                } else {
                    this.$toast.error('Silme Başarısız');
                }
                
            });
    },
    setOfferButtonStatus(vuexContext, status) {
        vuexContext.commit('setOfferButtonStatus', status);
    },
    setOfferSave(vuexContext, payload) {
        this.$axios.post('/offer/save', payload)
            .then(response => {
                if (response.data.status) {
                    this.$toast.success('Başarıyla Kaydedildi');
                   
                    vuexContext.dispatch('setOfferMainList');
                    vuexContext.dispatch('setOfferId', response.data.id);
                } else {
                    this.$toast.error('Kaydetme Başarısız');
                }
            });
    },
    setOfferUpdate(vuexContext, payload) {
        this.$axios.put('/offer/update',payload)
            .then(response => {
                if (response.data.status) {
                    this.$toast.success('Başarıyla Güncellendi');
                     if (vuexContext.state.offerAllButtonStatus) {
                        vuexContext.dispatch('setOfferDetailAllList');
                    };
                    vuexContext.dispatch('setOfferMainList');
                } else {
                    this.$toast.error('Güncelleme Başarısız');
                }
            });
    },
    setOfferDelete(vuexContext, id) {
        this.$axios.delete(`/offer/delete/${id}`)
            .then(response => {
                if (response.data.status) {
                    this.$toast.success('Başarıyla Silindi');
                    vuexContext.dispatch('setOfferMainList');
                    vuexContext.commit('setOfferDelete', id);
                } else {
                    this.$toast.error('Silme Başarısız');
                }
            });
        
    },
    setOfferId(vuexContext, id) {
        vuexContext.commit('setOfferId', id);
    },
    setOfferDetailAllList(vuexContext) {
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.get('/offer/detail/all/list')
            .then(response => {
                if (response.data.list) {
                                vuexContext.commit('setOfferMainDetailList', response.data.list); 
                vuexContext.dispatch('setEndLoadingAction');
                }

            });
    },
    setOfferAllButtonStatus(vuexContext, payload) {
        vuexContext.commit('setOfferAllButtonStatus', payload);   
    },
    setOfferOldList(vuexContext) {
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.get('/offer/old/list')
            .then(response => {
                if (response.data.list) {
                                vuexContext.commit('setOfferMainDetailList', response.data.list); 
                vuexContext.dispatch('setEndLoadingAction');
                }

            });
    },
    setOfferMainDetailBList(vuexContext, representative) {
        this.$axios.get(`/offer/main/detail/b/list/${representative}`)
            .then(response => {
                    vuexContext.commit('setOfferMainDetailBList', response.data.list);
            });
    }
};
const mutations = {
    setOfferMainList(state, payload) {
        state.offerList = payload.list;
        state.offerCountryList = payload.country;
    },
    setOfferMainDetailList(state, payload) {
        state.offerDetailList = payload;
    },
    setOfferDetailProductsList(state, payload) {
        state.offerDetailProductsList = payload;
    },
    setOfferDetailProductsAdd(state, payload) {
        state.offerDetailProductsList.push(payload);
    },
    setOfferDetailProductsUpdate(state, payload) {
        const index = state.offerDetailProductsList.findIndex(x => x.Id == payload.Id);
        state.offerDetailProductsList[index] = payload;
    },
    setOfferDetailProductsDelete(state, payload) {
        const index = state.offerDetailProductsList.findIndex(x => x.Id == payload);
        state.offerDetailProductsList.splice(index, 1);
    },
    setOfferButtonStatus(state, payload) {
        state.offerButtonStatus = payload;
    },
    setOfferId(state, payload) {
        state.offerId = payload;
    },
    setOfferAllButtonStatus(state, payload) {
        state.offerAllButtonStatus = payload;
    },
    setOfferDelete(state, payload) {
        const index = state.offerDetailList.find(x => x.Id == payload);
        state.offerDetailList.splice(index, 1);
    },
    setOfferMainDetailBList(state, payload) {
        state.offerDetailBList = payload;
    }

};
const getters = {
    getOfferList(state) {
        return state.offerList;
    },
    getOfferCountryList(state) {
        return state.offerCountryList;
    },
    getOfferDetailList(state) {
        return state.offerDetailList;
    },
    getOfferDetailProductsList(state) {
        return state.offerDetailProductsList;
    },
    getOfferButtonStatus(state) {
        return state.offerButtonStatus;
    },
    getOfferId(state) {
        return state.offerId;
    },
    getOfferAllButtonStatus(state) {
        return state.offerAllButtonStatus;
    },
    getOfferOldList(state) {
        return state.offerOldList;
    },
    getOfferDetailBList(state) {
        return state.offerDetailBList;
    }
    
};

export default {
    state,
    actions,
    mutations,
    getters
}