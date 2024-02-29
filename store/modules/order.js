const state = {
    orderList: [],
    orderListAll:[],
    orderProductionButtonStatus: false,
    orderProductionProductDetailList:[],
    orderProductionPo: '',
    orderProductAdded: [],
    orderProductUpdated: [],
    orderProductDeleted: [],
    orderProductionCostList: [],
    orderProductionCostTotal: 0,
    orderProductionSupplierList: [],
    orderSupplierProductList: [],
    orderProductionDocumentList:[],
    orderProductionCheckList:[],
    orderProductionCheckListTotal: {
        'crate': 0,
            'box': 0,
        'piece': 0,
        'amount': 0,
        'ton':0,
    },
    orderProductionProductTotal: 0,
    orderProductionFreightTotal: 0,
    orderProductionDetailTotal: 0,
    orderProductionProductDetailTotal: {
        'm2': 0,
        'piece': 0,
        'mt': 0,
        'ton': 0,
        'total':0,
    },
    orderProductionProductDetailCostTotal: {
        supplier: 0,
        workerman: 0,
        brokerage: 0,
        freight: 0,
        detail: 0,
        fob:0
    },

    orderProductionProductDetailFobCostTotal: 0,
    orderProductionProductDetailWorkermanList: [],
    orderProductionYearsList:[],
    orderProductionSaveButtonStatus:false
    



};
const actions = {
    setOrderProductionList(vuexContext) {
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.get('/order/production/list')
            .then(response => {
                if (response.data.list) {
                    vuexContext.commit('setOrderList', response.data.list);
                    vuexContext.commit('setOrderProductionYearsList', response.data.years);
                    vuexContext.commit('setOrderListAll', response.data.list);
                    vuexContext.dispatch('setEndLoadingAction');
                } 
            });
    },
    setOrderProductionListYear(vuexContext, year) {
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.get(`/order/production/list/year/${year}`)
            .then(response => {
                if (response.data.list) {
                    vuexContext.commit('setOrderList', response.data.list);
                    vuexContext.dispatch('setEndLoadingAction');

                
                } 
            });

    },
    setOrderShippedList(vuexContext) {
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.get('/order/shipped/list')
            .then(response => {
                if (response.data.list) {
                vuexContext.commit('setOrderList', response.data.list);
vuexContext.commit('setOrderProductionYearsList', response.data.years);
                vuexContext.dispatch('setEndLoadingAction');
                };
            });
    },

    filterShipment(vuexContext,filter){
        vuexContext.dispatch('setBeginLoadingAction');

        this.$axios.post(`/order/shipped/list/filter`,filter)
            .then(response => {
                if (response.data.list) {
                vuexContext.commit('setOrderList', response.data.list);
                vuexContext.dispatch('setEndLoadingAction');

                };
            });
    },




    setOrderShippedListYear(vuexContext, year) {
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.get(`/order/shipped/list/year/${year}`)
            .then(response => {
                if (response.data.list) {
                    vuexContext.commit('setOrderList', response.data.list);
                    vuexContext.dispatch('setEndLoadingAction');

                
                } 
            });

    },
    setOrderWaitingList(vuexContext) {
                            vuexContext.dispatch('setBeginLoadingAction');

        this.$axios.get('/order/waiting/list')
            .then(response => {
                if (response.data.list) {
                                    vuexContext.commit('setOrderList', response.data.list);
                    vuexContext.commit('setOrderProductionYearsList', response.data.years);
                    vuexContext.dispatch('setEndLoadingAction');
                }

            });
    },
     setOrderWaitingListYear(vuexContext, year) {
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.get(`/order/waiting/list/year/${year}`)
            .then(response => {
                if (response.data.list) {
                    vuexContext.commit('setOrderList', response.data.list);
                    vuexContext.dispatch('setEndLoadingAction');

                
                } 
            });

    },
    setOrderProductionButtonStatus(vuexContext, payload) {
        vuexContext.commit('setOrderProductionButtonStatus', payload)
    },
    setOrderProductionProductDetailList(vuexContext, po) {
        this.$axios.get(`/order/production/product/detail/list/${po}`)
            .then(response => {
                vuexContext.commit('setOrderProductionProductDetailList', response.data.list); 
                vuexContext.commit('setOrderProductionProductTotal', response.data.list);
                vuexContext.dispatch('setOrderProductionProductDetailTotal', response.data.list);
            });
    },
    setOrderProductionPo(vuexContext, po) {
        vuexContext.commit('setOrderProductionPo', po);
    },
    setOrderProductAdded(vuexContext, payload) {
        this.$axios.post('/order/production/product/add', payload)
            .then(response => {
                if (response.data.status) {
                    this.$toast.success('Başarıyla Eklendi.');
                    vuexContext.commit('setOrderProductAdded', { ...payload, 'ID': response.data.id });
                    
                    vuexContext.dispatch('setOrderProductModel');
                    
                } else {
                    this.$toast.error('Ekleme İşlemi Başarısız.');
                }
            });
    },
    setOrderProductUpdated(vuexContext, payload) {
        this.$axios.put('/order/production/product/update', payload)
            .then(response => {
                if (response.data.status) {
                    this.$toast.success('Başarıyla Güncellendi.');
                    vuexContext.commit('setOrderProductUpdated', payload);
                    vuexContext.dispatch('setOrderProductModel');
                } else {
                    this.$toast.error('Güncelleme Başarısız.');
                }
            });
    },
    setOrderProductDeleted(vuexContext, payload) {
        this.$axios.delete(`/order/production/product/delete/${payload.ID}`)
            .then(response => {
                if (response.data.status) {
                    this.$toast.success('Başarıyla Silindi.');
                    vuexContext.commit('setOrderProductDeleted', payload);
                    
                    vuexContext.dispatch('setOrderProductModel');
                } else {
                    this.$toast.error('Silme İşlemi Başarısız.');
                    
                }
            });
    },
    setOrderProformaUpload(vuexContext, payload) {
        this.$axios.post('/order/production/proforma/upload', payload)
            .then(response => {
                if (response.data.status) {
                    this.$toast.success('Başarıyla Yüklendi');
                    vuexContext.dispatch('setOrderProductionDocumentList',payload.po);
                } else {
                    this.$toast.error('Yükleme Başarısız');
                }
            });
    },
    setOrderProductionCostList(vuexContext, po) {
        this.$axios.get(`/order/production/cost/list/${po}`)
            .then(response => {
                vuexContext.commit('setOrderProductionCostList', response.data.list);
                vuexContext.dispatch('setOrderProductionCostTotal', response.data.list);

            })
    },
    setOrderProductionCostTotal(vuexContext, payload) {
        vuexContext.commit('setOrderProductionCostTotal', payload);
    },
    setOrderProductionSupplierList(vuexContext, po) {
        this.$axios.get(`/order/production/product/supplier/${po}`)
            .then(response => {
                vuexContext.commit('setOrderProductionSupplierList', response.data.list);
            });
    },
    setOrderSupplierProductList(vuexContext, payload) {
        this.$axios.get(`/order/production/supplier/product/${payload.po}/${payload.supplier}`)
            .then(response => {
                vuexContext.commit('setOrderSupplierProductList', response.data.list);

            });

    },
    setProductionProductSupplierIsfSave(vuexContext,payload){
            this.$axios.post('/order/production/supplier/isf/save', payload)
                .then(response => {
                    if (response.data.status) {
                        this.$toast.success('Başarıyla Kaydedildi.');
                        vuexContext.dispatch('setOrderProductionList');
                        vuexContext.dispatch('setOrderProductionDocumentList', payload.po);

                    } else {
                        this.$toast.error('Kaydetme Başarısız.');
                    };

                });

    },  
    setOrderProductionDocumentList(vuexContext, po) {
        this.$axios.get(`/order/production/product/document/${po}`)
            .then(response => {
                vuexContext.commit('setOrderProductionDocumentList', response.data.list);

            });
    },
    setOrderProductionCheckList(vuexContext, po) {
        this.$axios.get(`/order/production/product/check/${po}`)
            .then(response => {
                vuexContext.commit('setOrderProductionCheckList', response.data.list);
                vuexContext.dispatch('setOrderProductionCheckListTotal', response.data.list);
            });
    },
    setOrderProductionCheckListTotal(vuexContext, payload) {
        vuexContext.commit('setOrderProductionCheckListTotal', payload);
    },
    setOrderProductionDetailListReset(vuexContext) {
        vuexContext.commit('setOrderProductionDetailListReset');
    },
    setOrderProductionSave(vuexContext, production) {
        this.$axios.post('/order/production/save', production)
            .then(response => {
                if (response.data.status) {
                    this.$toast.success('Başarıyla Kaydedildi. Ürünlerinizi Girebilirsiniz!');
                    
                } else {
                    this.$toast.error('Kaydetme Başarısız');
                }
            });
    },
    setOrderProductionUpdate(vuexContext, production) {
        this.$axios.put('/order/production/update',production)
            .then(response => {
                if (response.data.status) {
                    this.$toast.success('Başarıyla Güncellendi.');
                } else {
                    this.$toast.error('Güncelleme Başarısız');
                }
            });
    },
    setOrderProductionProductTotal(vuexContext, product) {
      vuexContext.commit('setOrderProductionProductTotal',product)  
    },
    setOrderProductionFreightTotal(vuexContext, freight) {
        vuexContext.commit('setOrderProductionFreightTotal', freight);
    },
    setOrderProductionDetailTotal(vuexContext, detail) {
        vuexContext.commit('setOrderProductionDetailTotal', detail);
    },
    setOrderProductionProductDetailTotal(vuexContext, detail) {
        vuexContext.commit('setOrderProductionProductDetailTotal',detail)
    },
    setOrderProductionProductDetailCostTotal(vuexContext, production) {
        vuexContext.commit('setOrderProductionProductDetailCostTotal', production);
    },
    setProductionProductWorkermanList(vuexContext, workerman) {
        this.$axios.get(`/order/production/product/workerman/${workerman.po}/${workerman.productId}`)
            .then(response => {
                vuexContext.commit('setProductionProductWorkermanList',response.data.list);
                vuexContext.commit('setProductionProductWorkermanCalculation', response.data.workerman);
            });
    },
    setProductionProductWorkermanSave(vuexContext, workerman) {
        this.$axios.post('/order/production/product/workerman/save', workerman)
            .then(response => {
                if (response.data.status) {
                    const data = {
                        productId: workerman.UrunKartId,
                      po:workerman.SiparisNo  
                    };
                    vuexContext.dispatch('setProductionProductWorkermanList', data);
                    vuexContext.dispatch('setOrderProductWorkermanModel');

                    this.$toast.success('Başarıyla Kaydedildi.');

                } else {
                    this.$toast.error('Kaydetme Başarısız.');
                    
                }
            });
    },
    setProductionProductWorkermanDelete(vuexContext, workerman) {
        this.$axios.delete(`/order/production/product/workerman/delete/${workerman.ID}`)
            .then(response => {
                if (response.data.status) {
                    const data = {
                        productId: workerman.UrunKartId,
                      po:workerman.SiparisNo  
                    };
                    this.$toast.success('Başarıyla Silindi');
                    vuexContext.dispatch('setProductionProductWorkermanList', data);
                    vuexContext.dispatch('setOrderProductWorkermanModel');

                } else{
                    this.$toast.error('Silme Başarısız.');
                }
            });
    },
    setProductionProductWorkermanUpdate(vuexContext, workerman) {
        this.$axios.put('/order/production/product/workerman/update', workerman)
            .then(response => {
                if (response.data.status) {
                    const data = {
                        productId: workerman.UrunKartId,
                      po:workerman.SiparisNo  
                    };
                    this.$toast.success('Başarıyla Güncellendi');
                    vuexContext.dispatch('setProductionProductWorkermanList', data);
                    vuexContext.dispatch('setOrderProductWorkermanModel');

                } else{
                    this.$toast.error('Güncelleme Başarısız.');
                }
            });
    },
    setProductionProductSaveMail(vuexContext, production) {
        this.$axios.post('/order/production/product/save/mail', production)
            .then(response => {
                if(response.data.status){
                    this.$toast.success('Mail Gönderildi.');
                    vuexContext.dispatch('setProductionProductMailReset');
                    if(production.status == 1){
                        vuexContext.dispatch('setOrderWaitingList');
                    } else if (production.status == 2){
                        vuexContext.dispatch('setOrderProductionList');
                    } else if (production.status == 3){
                        vuexContext.dispatch('setOrderShippedList');
                    }
                    
                } else {
                    this.$toast.error('Mail Gönderilemedi.');
                }
            });
    },
    setProductionProductMailReset(vuexContext) {
        vuexContext.commit('setProductionProductMailReset');
    },
    setOrderProductionSaveButtonStatus(vuexContext,status){
        vuexContext.commit('setOrderProductionSaveButtonStatus',status)
    }






};
const mutations = {
    setOrderList(state, payload) {
        state.orderList = payload;
    },
    setOrderListAll(state, payload) {
      state.orderListAll = payload;  
    },
    setOrderProductionButtonStatus(state, payload) {
        state.orderProductionButtonStatus = payload; 
    },
    setOrderProductionProductDetailList(state, payload) {
        state.orderProductionProductDetailList = payload;

    },
    setOrderProductionPo(state, payload) {
        state.orderProductionPo = payload;
    },
    setOrderProductAdded(state, payload) {
        state.orderProductAdded.push(payload);
        state.orderProductionProductDetailList.push(payload);
        state.orderProductionProductTotal = 0;
        state.orderProductionProductDetailList.forEach(x => {
            state.orderProductionProductTotal += x.SatisToplam;
        });
        state.orderProductionProductDetailTotal = {
            'm2': 0,
            'piece': 0,
            'mt': 0,
            'ton': 0,
            'total': 0,
        };
                        state.orderProductionProductDetailCostTotal.supplier = 0;
        state.orderProductionProductDetailCostTotal.workerman = 0;
        state.orderProductionProductDetailList.forEach(x => {

            if (x.UrunBirimID == 1) {
                state.orderProductionProductDetailTotal.m2 += parseFloat(x.Miktar);
            } else if (x.UrunBirimID == 2) {
                state.orderProductionProductDetailTotal.piece += parseFloat(x.Miktar);
            } else if (x.UrunBirimID == 3) {
                state.orderProductionProductDetailTotal.mt += parseFloat(x.Miktar);
            };
            state.orderProductionProductDetailTotal.ton += parseFloat(x.Ton);
            state.orderProductionProductDetailTotal.total += (x.Miktar * x.SatisFiyati);
            state.orderProductionProductDetailCostTotal.supplier += (x.Miktar * x.AlisFiyati);
            if (x.Iscilik == null) {
                state.orderProductionProductDetailCostTotal.workerman = 0;
            } else {
                state.orderProductionProductDetailCostTotal.workerman += x.Iscilik;
            }

        });
    },

    setOrderProductDeleted(state, payload) {
        state.orderProductDeleted.push(payload);
        const index = state.orderProductionProductDetailList.findIndex(x => x.ID == payload.ID);
        state.orderProductionProductDetailList.splice(index, 1);
                state.orderProductionProductTotal = 0;
        state.orderProductionProductDetailList.forEach(x => {
            state.orderProductionProductTotal += x.SatisToplam;
        });
                state.orderProductionProductDetailTotal = {
            'm2': 0,
            'piece': 0,
            'mt': 0,
            'ton': 0,
            'total': 0,
        };
                        state.orderProductionProductDetailCostTotal.supplier = 0;
        state.orderProductionProductDetailCostTotal.workerman = 0;
        state.orderProductionProductDetailList.forEach(x => {
            if (x.UrunBirimID == 1) {
                state.orderProductionProductDetailTotal.m2 += x.Miktar;
            } else if (x.UrunBirimID == 2) {
                state.orderProductionProductDetailTotal.piece += x.Miktar;
            } else if (x.UrunBirimID == 3) {
                state.orderProductionProductDetailTotal.mt += x.Miktar;
            };

            state.orderProductionProductDetailTotal.ton += x.Ton;
            state.orderProductionProductDetailTotal.total += (x.Miktar * x.SatisFiyati);
            state.orderProductionProductDetailCostTotal.supplier += (x.Miktar * x.AlisFiyati);
            state.orderProductionProductDetailCostTotal.workerman += x.Iscilik;

        });
    },
    setOrderProductUpdated(state, payload) {
        state.orderProductUpdated.push(payload);
        const index = state.orderProductionProductDetailList.findIndex(x => x.ID == payload.ID);
        state.orderProductionProductDetailList.splice(index, 1, payload);
                state.orderProductionProductTotal = 0;
        state.orderProductionProductDetailList.forEach(x => {
            state.orderProductionProductTotal += x.SatisToplam;
        });
                state.orderProductionProductDetailTotal = {
            'm2': 0,
            'piece': 0,
            'mt': 0,
            'ton': 0,
            'total': 0,
        };
        state.orderProductionProductDetailCostTotal.supplier = 0;
        state.orderProductionProductDetailCostTotal.workerman = 0;
        state.orderProductionProductDetailList.forEach(x => {
            if (x.UrunBirimID == 1) {
                state.orderProductionProductDetailTotal.m2 += parseFloat(x.Miktar);
            } else if (x.UrunBirimID == 2) {
                state.orderProductionProductDetailTotal.piece += parseFloat(x.Miktar);
            } else if (x.UrunBirimID == 3) {
                state.orderProductionProductDetailTotal.mt += parseFloat(x.Miktar);
            };
            state.orderProductionProductDetailTotal.ton += parseFloat(x.Ton);
            state.orderProductionProductDetailTotal.total += (x.Miktar * x.SatisFiyati);
            state.orderProductionProductDetailCostTotal.supplier += (x.Miktar * x.AlisFiyati);
                        if (x.Iscilik == null) {
                state.orderProductionProductDetailCostTotal.workerman = 0;
            } else {
                state.orderProductionProductDetailCostTotal.workerman += x.Iscilik;
            }

        });

    },
    setOrderProductionCostList(state, payload) {
        state.orderProductionCostList = payload;
        state.orderProductionProductDetailCostTotal.fob = 0;
        payload.forEach(x => {
            if (x.Tur == 'Navlun' || x.Tur == 'İşçilik') {
                state.orderProductionProductDetailCostTotal.fob += 0;
            } else {
                state.orderProductionProductDetailCostTotal.fob += x.tut;
            }
        });
    },
    setOrderProductionCostTotal(state, payload) {
        payload.forEach(x => {
                    state.orderProductionCostTotal += x.tut;

        });
    },
    setOrderProductionSupplierList(state, payload) {
        state.orderProductionSupplierList = payload
    },
    setOrderSupplierProductList(state, payload) {
        state.orderSupplierProductList = payload;
    },
    setOrderProductionDocumentList(state, payload) {
        state.orderProductionDocumentList = payload;
    },
    setOrderProductionCheckList(state, payload) {
        state.orderProductionCheckList = payload;
    },
    setOrderProductionCheckListTotal(state, payload) {
        state.orderProductionCheckListTotal = {
            'crate': 0,
            'box': 0,
            'piece': 0,
            'amount': 0,
            'ton':0,
        };
        state.orderProductionCheckListTotal.crate += payload.length;
        payload.forEach(x => {
            state.orderProductionCheckListTotal.box += x.KutuAdet;
            state.orderProductionCheckListTotal.piece += x.Adet;
            state.orderProductionCheckListTotal.amount += x.Miktar;
            state.orderProductionCheckListTotal.ton += x.Ton;
        });
    },
    setOrderProductionDetailListReset(state) {
        state.orderProductionCostList = [];
        state.orderProductionCostTotal = 0;
        state.orderProductionSupplierList = [];
        state.orderSupplierProductList = [];
        state.orderProductionDocumentList = [];
        state.orderProductionCheckList = [];
        state.orderProductionProductDetailList = [];
        state.orderProductionCheckListTotal = {
            'crate': 0,
            'box': 0,
            'piece': 0,
            'amount': 0,
            'ton':0
        };

        state.orderProductionProductTotal = 0;
        state.orderProductionFreightTotal = 0;
        state.orderProductionDetailTotal = 0;
        state.orderProductionProductDetailTotal = {
            'm2': 0,
            'piece': 0,
            'mt': 0,
            'ton': 0,
            'total': 0,
        };
        state.orderProductionProductDetailCostTotal = {
            supplier: 0,
            workerman: 0,
            brokerage: 0,
            freight: 0,
            detail: 0,
            fob: 0
        };

        state.orderProductionProductDetailFobCostTotal = 0;
        state.orderProductionProductDetailWorkermanList = [];
    },
    setOrderProductionProductTotal(state, payload) {
        state.orderProductionProductTotal = 0;
        payload.forEach(x => {
            state.orderProductionProductTotal += x.SatisToplam;
        });
    },
    setOrderProductionFreightTotal(state, payload) {
        state.orderProductionFreightTotal = payload;
    },
    setOrderProductionDetailTotal(state, payload) {
        state.orderProductionDetailTotal = (payload.DetayTutar_1 + payload.DetayTutar_2 + payload.DetayTutar_3);
    },
    setOrderProductionProductDetailTotal(state, payload) {
        state.orderProductionProductDetailTotal = {
            'm2': 0,
            'piece': 0,
            'mt': 0,
            'ton': 0,
            'total': 0,
        };
        state.orderProductionProductDetailCostTotal.supplier = 0;
        state.orderProductionProductDetailCostTotal.workerman = 0;

        payload.forEach(x => {
            if (x.UrunBirimID == 1) {
                state.orderProductionProductDetailTotal.m2 += x.Miktar;
            } else if (x.UrunBirimID == 2) {
                state.orderProductionProductDetailTotal.piece += x.Miktar;
            } else if (x.UrunBirimID == 3) {
                state.orderProductionProductDetailTotal.mt += x.Miktar;
            };
            state.orderProductionProductDetailTotal.ton += x.Ton;
            state.orderProductionProductDetailTotal.total += (x.Miktar * x.SatisFiyati);
            state.orderProductionProductDetailCostTotal.supplier += (x.Miktar * x.AlisFiyati);
            state.orderProductionProductDetailCostTotal.workerman += x.Iscilik;

        });
    },
    setOrderProductionProductDetailCostTotal(state, payload) {
        state.orderProductionProductDetailCostTotal.brokerage = 0;
        state.orderProductionProductDetailCostTotal.freight = 0;
        state.orderProductionProductDetailCostTotal.detail = 0;
        state.orderProductionProductDetailCostTotal.brokerage = payload.Komisyon;
        state.orderProductionProductDetailCostTotal.freight = payload.NavlunAlis;
        state.orderProductionProductDetailCostTotal.detail = (payload.DetayAlis_1 + payload.DetayAlis_2 + payload.DetayAlis_3 +payload.EvrakGideri + payload.sigorta_Tutar + payload.DetayTutar_4);
    },
    setProductionProductWorkermanList(state, payload) {
        state.orderProductionProductDetailWorkermanList = payload;
    },
    setProductionProductWorkermanCalculation(state, payload) {
        if (payload.Tutar == null) {
            state.orderProductionProductDetailCostTotal.workerman = 0;
        } else {
                    state.orderProductionProductDetailCostTotal.workerman = parseFloat(payload.Tutar);

        };
    },
    setProductionProductMailReset(state) {
        state.orderProductAdded =  [];
        state.orderProductUpdated =  [];
        state.orderProductDeleted =  [];
    },
    setOrderProductionYearsList(state,payload) {
        state.orderProductionYearsList = payload;
    },
    setOrderProductionSaveButtonStatus(state,payload){
        state.orderProductionSaveButtonStatus = payload;
    }






};
const getters = {
    getOrderList(state) {
        return state.orderList;
    },
    getOrderProductionButtonStatus(state) {
        return state.orderProductionButtonStatus;
    },
    getOrderProductionProductDetailList(state) {
        return state.orderProductionProductDetailList;
    },
    getOrderProductionPo(state) {
        return state.orderProductionPo;
    },
    getOrderProductAdded(state) {
        return state.orderProductAdded;
    },
    getOrderProductUpdated(state) {
        return state.orderProductUpdated;
    },
    getOrderProductDeleted(state) {
        return state.orderProductDeleted;
    },
    getOrderProductionCostList(state) {
        return state.orderProductionCostList;
    },
    getOrderProductionCostTotal(state) {
        return state.orderProductionCostTotal;
    },
    getOrderProductionSupplierList(state) {
        return state.orderProductionSupplierList;
    },
    getOrderSupplierProductList(state) {
        return state.orderSupplierProductList;
    },
    getOrderProductionDocumentList(state) {
        return state.orderProductionDocumentList;
    },
    getOrderProductionCheckList(state) {
        return state.orderProductionCheckList;
    },
    getOrderProductionCheckListTotal(state) {
        return state.orderProductionCheckListTotal;
    },
    getOrderProductionProductTotalCalculation(state) {
        return state.orderProductionProductTotalCalculation;
    },
    getOrderProductionProductTotal(state) {
        return state.orderProductionProductTotal;
    },
    getOrderProductionFreightTotal(state) {
        return state.orderProductionFreightTotal;
    },
    getOrderProductionDetailTotal(state) {
        return state.orderProductionDetailTotal;
    },
    getOrderProductionProductDetailTotal(state) {
        return state.orderProductionProductDetailTotal;
    },
    getOrderProductionProductDetailCostTotal(state) {
        return state.orderProductionProductDetailCostTotal;
    },
    getOrderProductionProductDetailWorkermanList(state) {
        return state.orderProductionProductDetailWorkermanList;
    },
    getOrderProductionYearsList(state){
        return state.orderProductionYearsList;
    },
    getOrderListAll(state) {
        return state.orderListAll;
    },
    getOrderProductionSaveButtonStatus(state){
        return state.orderProductionSaveButtonStatus;
    }

};

export default {
    state,
    actions,
    mutations,
    getters
}     