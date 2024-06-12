
function __noneNullControl(value){
    if(value == null || value == '' || value == undefined || value == ' '){
        return parseFloat(0);
    }else{
    return parseFloat(value);
    }
};
const state = {
    orderList: [],
    orderListAll:[],
    orderProductionButtonStatus: false,
    orderProductionProductDetailList:[],
    orderProductionProductDetailNotChangeList:[],
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
    orderProductionSaveButtonStatus:false,
    orderProductionId:0,
    orderProductionUploadProformaButtonStatus:true,
    orderProductionTotal:{
        'order':0,
        'production':0,
        'ton':0,
        'price':0
    },
    orderProductionDivideList: [],
    orderProductionDivideOrderList:[]

    



};
const actions = {
    setDivide(vuexContext, payload) {
        return new Promise(async (resolve, reject) => {
           await this.$axios.post('/order/divide',payload)
               .then(response => {
                   if (response.data.status) {
                       resolve(true);
                   } else {
                       resolve(false);
               }
           }) 
        });
    },
    setProductionDivideOrderListUpdate(vuexContext, payload) {
        return new Promise((resolve, reject) => {
            vuexContext.commit('setProductionDivideOrderListUpdate', payload); 
            resolve(true);
        });
    },
    setProductionDivideOrderList(vuexContext, payload) {
        return new Promise((resolve, resject) => {
            vuexContext.commit('setProductionDivideOrderList', payload);
            resolve(true);
        });
    },
        setOrdersProductsDivideList(vuexContext, po) {
        return new Promise(async (resolve, reject) => {
            await this.$axios.get('/orders/product/divide/list/' + po)
                .then(response => {
                    if (response) {
                        vuexContext.commit('setOrdersProductsDivideList', response.data.list);
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                    
                });
        });
    },
        setOrderOnHoldMekmerList(vuexContext){
        this.$axios.get('/order/onhold/mekmer/list')
            .then(response => {
                if (response.data.list) {
                    vuexContext.commit('setOrderList', response.data.list);
                    vuexContext.commit('setOrderProductionYearsList', response.data.years);
                    vuexContext.commit('setOrderListAll', response.data.list);
                    vuexContext.commit('setOrderProductionTotal',response.data.list);
                } 
            });
    },
    setOrderProductionMekmerList(vuexContext) {
        return new Promise(async (resolve, reject) => {
                    this.$axios.get('/order/production/mekmer/list')
            .then(response => {
                if (response.data.list) {
                    vuexContext.commit('setOrderList', response.data.list);
                    vuexContext.commit('setOrderProductionYearsList', response.data.years);
                    vuexContext.commit('setOrderListAll', response.data.list);
                    vuexContext.commit('setOrderProductionTotal', response.data.list);
                    resolve(true);
                } 
            });
        })

    },
    setOrderProductionTotal(vuexContext,list){
        vuexContext.commit('setOrderProductionTotal',list)
    },
    setOrderProductionIsfDelete(vuexContext,event){
        this.$axios.get(`/production/isf/delete/${event.ID}/${event.EvrakAdi}/${event.SiparisNo}`)
        .then(response=>{
            if(response.data.status){
                vuexContext.dispatch('setEndLoadingAction');
                this.$toast.success('Isf Silindi.');
                vuexContext.commit('setOrderProductionProformaDelete',event.ID);
            }else{
                this.$toast.error('Isf Silme Başarısız.');
            };
        });
    },
    setOrderProductionProformaDelete(vuexContext,id){
        this.$axios.get(`/production/proforma/delete/${id}`)
        .then(response=>{
            if(response.data.status){
                this.$toast.success('Proforma Silindi.');
                vuexContext.commit('setOrderProductionProformaDelete',id);
            }else{
                this.$toast.error('Proforma Silme Başarısız.');
            };
        });
    },
    setOrderProductionMekmer2List(vuexContext) {
        this.$axios.get('/order/production/mekmer2/list')
            .then(response => {
                if (response.data.list) {
                    vuexContext.commit('setOrderList', response.data.list);
                    vuexContext.commit('setOrderProductionYearsList', response.data.years);
                    vuexContext.commit('setOrderListAll', response.data.list);
                    vuexContext.commit('setOrderProductionTotal',response.data.list);
                } 
            });
    },
    setOrderProductionList(vuexContext) {
        this.$axios.get('/order/production/list')
            .then(response => {
                if (response.data.list) {
                    vuexContext.commit('setOrderList', response.data.list);
                    vuexContext.commit('setOrderProductionYearsList', response.data.years);
                    vuexContext.commit('setOrderListAll', response.data.list);
                    vuexContext.commit('setOrderProductionTotal',response.data.list);
                } 
            });
    },
    setOrderProductionListYear(vuexContext, year) {
        this.$axios.get(`/order/production/list/year/${year}`)
            .then(response => {
                if (response.data.list) {
                    vuexContext.commit('setOrderList', response.data.list);
                    vuexContext.commit('setOrderProductionTotal',response.data.list);

                    

                
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
vuexContext.commit('setOrderProductionTotal',response.data.list);

                vuexContext.dispatch('setEndLoadingAction');
                };
            });
    },

    setOrderShippedMekmerList(vuexContext) {
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.get('/order/shipped/mekmer/list')
            .then(response => {
                if (response.data.list) {
                vuexContext.commit('setOrderList', response.data.list);
                vuexContext.commit('setOrderProductionYearsList', response.data.years);
                vuexContext.commit('setOrderProductionTotal',response.data.list);

                vuexContext.dispatch('setEndLoadingAction');
                };
            });
    },
    setOrderShippedMekmer2List(vuexContext) {
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.get('/order/shipped/mekmer2/list')
            .then(response => {
                if (response.data.list) {
                vuexContext.commit('setOrderList', response.data.list);
                vuexContext.commit('setOrderProductionYearsList', response.data.years);
                vuexContext.commit('setOrderProductionTotal',response.data.list);

                vuexContext.dispatch('setEndLoadingAction');
                };
            });
    },

    filterShipment(vuexContext,filter){
        vuexContext.dispatch('setBeginLoadingDatatableAction');

        this.$axios.post(`/order/shipped/list/filter`,filter)
            .then(response => {
                if (response.data.list) {
                vuexContext.commit('setOrderList', response.data.list);
                vuexContext.commit('setOrderProductionTotal',response.data.list);

                vuexContext.dispatch('setEndLoadingDatatableAction');

                };
            });
    },

    setFilterShipmentGlobal(vuexContext,filter){
        vuexContext.dispatch('setBeginLoadingDatatableAction');

        this.$axios.get(`/order/shipped/list/filter/global/${filter}`)
            .then(response => {
                if (response.data.list) {
                
                vuexContext.commit('setOrderList', response.data.list);
                vuexContext.commit('setOrderProductionTotal',response.data.list);

                vuexContext.dispatch('setEndLoadingDatatableAction');

                };
            });
    },




    setOrderShippedListYear(vuexContext, year) {
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.get(`/order/shipped/list/year/${year}`)
            .then(response => {
                if (response.data.list) {
                    vuexContext.commit('setOrderList', response.data.list);
                    vuexContext.commit('setOrderProductionTotal',response.data.list);

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
                    vuexContext.commit('setOrderProductionTotal',response.data.list);

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
                    vuexContext.commit('setOrderProductionTotal',response.data.list);

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
    setOrderProductionProductDetailMekmerList(vuexContext,po){
        this.$axios.get(`/order/production/product/detail/mekmer/list/${po}`)
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
                    vuexContext.dispatch("setOrderProductionSupplierList",payload.SiparisNo);
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
                    vuexContext.dispatch("setOrderProductionSupplierList",payload.SiparisNo);
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
                    vuexContext.dispatch("setOrderProductionSupplierList",payload.SiparisNo);
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
        return new Promise((resolve, reject) => {
                this.$axios.post('/order/production/supplier/isf/save', payload)
                .then(response => {
                    if (response.data.status) {
                        this.$toast.success('Başarıyla Kaydedildi.');
                        vuexContext.dispatch('setOrderProductionList');
                        vuexContext.dispatch('setOrderProductionDocumentList', payload.po);
                        resolve(true);

                    } else {
                        this.$toast.error('Kaydetme Başarısız.');
                        resolve(false)
                    };

                });
            })

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
    setOrderProductionCheckMekmerList(vuexContext, po) {
        this.$axios.get(`/order/production/product/check/mekmer/${po}`)
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
                    vuexContext.dispatch("setOrderProductionButtonStatus", false);
                    vuexContext.dispatch("setOrderProductionSaveButtonStatus",false);
                    vuexContext.dispatch('setOrderProductionId',response.data.id);
                    vuexContext.dispatch('setOrderProductionUploadProformaButtonStatus',false);

                    
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
                    if (response.data.status) {
                        this.$toast.success('Mail Gönderildi.');
                        vuexContext.dispatch('setProductionProductMailReset');

                    } 
                });
    },
    setProductionProductMailReset(vuexContext) {
        vuexContext.commit('setProductionProductMailReset');
    },
    setOrderProductionSaveButtonStatus(vuexContext,status){
        vuexContext.commit('setOrderProductionSaveButtonStatus',status)
    },
    setOrderProductionProductDetailNotChangeList(vuexContext,product){
        vuexContext.commit('setOrderProductionProductDetailNotChangeList',product)
    },
    setOrderProductionProductDetailNotChangeListReset(vuexContext){
        vuexContext.commit('setOrderProductionProductDetailNotChangeListReset')
    },
    setOrderProductionId(vuexContext,id){
        vuexContext.commit('setOrderProductionId',id)
    },
    setOrderProductionUploadProformaButtonStatus(vuexContext,status){
        vuexContext.commit('setOrderProductionUploadProformaButtonStatus',status)
    },
    setOrderProductionIsfSendMail(vuexContext, payload) {
        this.$axios.post('/production/isf/send/mail', payload)
            .then(response => {
                if (response.data.status) {
                    this.$toast.success('Mail Gönderildi.');
                }

            });
    }






};
const mutations = {
    setProductionDivideOrderListUpdate(state, payload) {
        if (state.orderProductionDivideOrderList.length > 0) {

            
            const index = state.orderProductionDivideOrderList.findIndex(x => x.id == payload.id);
            state.orderProductionDivideOrderList.splice(index, 1, payload);
        } else {
            return;
      }
    },
    setProductionDivideOrderList(state, payload) {
        state.orderProductionDivideOrderList.push(payload);
    },
        setProductionDivideOrderListReset(state) {
            state.orderProductionDivideOrderList = [];
    },
    setOrdersProductsDivideList(state, list) {
        state.orderProductionDivideList = list;
    },
    setOrderProductionTotal(state,list){
        console.log(15.15+15.15);
        state.orderProductionTotal = {
            'order':0,
            'production':0,
            'ton':0,
            'price':0
        };
        list.forEach(x=>{
            state.orderProductionTotal.order += __noneNullControl(x.Miktar);
            state.orderProductionTotal.production += __noneNullControl(x.Uretim);
            state.orderProductionTotal.ton += __noneNullControl(x.Ton);
            state.orderProductionTotal.price += __noneNullControl(x.SatisToplam);
            
        });
    },
    setOrderProductionProformaDelete(state,id){
        const index = state.orderProductionDocumentList.findIndex(x=>x.ID == id);
        state.orderProductionDocumentList.splice(index,1);
    },
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
    setOrderProductionProductDetailNotChangeList(state,payload){
        state.orderProductionProductDetailNotChangeList.push(payload);
    },
    setOrderProductionProductDetailNotChangeListReset(state){
        state.orderProductionProductDetailNotChangeList = [];
    },

    setOrderProductionPo(state, payload) {
        state.orderProductionPo = payload;
    },
    setOrderProductAdded(state, payload) {
        state.orderProductAdded.push(payload);
        state.orderProductionProductDetailList.push(payload);
        state.orderProductionProductDetailNotChangeList.push(payload);
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
        state.orderProductionProductDetailNotChangeList.splice(index, 1);


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
        const index2 = state.orderProductUpdated.findIndex(x=>x.ID == payload.ID);

        if(index2 == -1){
            state.orderProductUpdated.push(payload);

        }else{
            state.orderProductUpdated.splice(index2,1,payload);

        }

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
        state.orderProductionCostTotal = 0;
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
        state.orderProductionDetailTotal = (parseFloat(payload.DetayTutar_1) + parseFloat(payload.DetayTutar_2) + parseFloat(payload.DetayTutar_3));
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
        state.orderProductionProductDetailCostTotal.brokerage = parseFloat(payload.Komisyon);
        state.orderProductionProductDetailCostTotal.freight = parseFloat(payload.NavlunAlis);
        state.orderProductionProductDetailCostTotal.detail = (parseFloat(payload.DetayAlis_1) + parseFloat(payload.DetayAlis_2) + parseFloat(payload.DetayAlis_3) + parseFloat(payload.EvrakGideri) + parseFloat(payload.sigorta_Tutar) + parseFloat(payload.DetayTutar_4));
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
    },
    setOrderProductionId(state,payload){
        state.orderProductionId = payload;
    },
    setOrderProductionUploadProformaButtonStatus(state,payload){
        state.orderProductionUploadProformaButtonStatus = payload;
    }






};
const getters = {
    getOrderProductionDivideOrderList(state) {
        return state.orderProductionDivideOrderList;  
    },
    getOrderProductionDivideList(state) {
        return state.orderProductionDivideList;  
    },
    getOrderProductionTotal(state){
        return state.orderProductionTotal;
    },
    getOrderList(state) {
        return state.orderList;
    },
    getOrderProductionButtonStatus(state) {
        return state.orderProductionButtonStatus;
    },
    getOrderProductionProductDetailList(state) {
        return state.orderProductionProductDetailList;
    },
    getOrderProductionProductDetailNotChangeList(state){
        return state.orderProductionProductDetailNotChangeList;
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
    },
    getOrderProductionId(state){
        return state.orderProductionId;
    },
    getOrderProductionUploadProformaButtonStatus(state){
        return state.orderProductionUploadProformaButtonStatus;
    }

};

export default {
    state,
    actions,
    mutations,
    getters
}     