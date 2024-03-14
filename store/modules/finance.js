import api from "../../plugins/excel.server";

const state = {
    financeList: [],
    financeListAll: [],
    financeListTotal: {
        'total': 0,
        'production': 0,
        'forwarding': 0,
        'advanced': 0,
        'paid':0,
        'balance': 0,
        'balanceProduction':0
    },
    financeExpiryList: [],
    financeCollectionList:[],
    financeCollectionYearList:[],
    financeCollectionMonthList: [],
    financeCollectionTotal: 0,
    financeAdvancedPaymentList:[],
    financePoList:[],
    financePaidList: [],
    financePoListTotal: {
        order: 0,
        advancedPayment: 0,
        paid: 0,
        balanced:0,
    },
    financePaidListTotal: 0,
    financePoButtonStatus: true,
    financePoPaidList: [],
    financePoPaidDetailList:[],
    financeListMaya:[],
    financeCollectionSampleList:[],
    financeCollectionSampleTotal:0,
    
};
const actions = {
    setFinanceList(vuexContext) {
        vuexContext.dispatch('setBeginLoadingAction');

        api.get("/finance/reports/test").then((response) => {
            if(response.data){
                vuexContext.commit('setFinanceList', response.data); 
                vuexContext.commit('setFinanceTotalList',response.data.financeList)
                vuexContext.dispatch('setEndLoadingAction');
            }
            
          });



        // this.$axios.get('/finance/list')
        //     .then(response => {
        //         if (response.data) {
        //             vuexContext.commit('setFinanceList', response.data); 


        //         }
        //     });
    },
    setFinanceTotalList(vuexContext,finance) {
      vuexContext.commit('setFinanceTotalList',finance)  
    },
    setFinanceCollectionList(vuexContext) {
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.get('/finance/collection/list')
            .then(response => {
                vuexContext.commit('setFinanceCollectionList', response.data); 
                vuexContext.dispatch('setFinanceCollectionTotal', response.data.list);
                vuexContext.commit('setFinanceCollectionSampleTotal',response.data.sample);

                vuexContext.dispatch('setEndLoadingAction');
            });
    },
    setFinanceCollectionTotal(vuexContext, payload) {
        vuexContext.commit('setFinanceCollectionTotal', payload);
    },
    setFinanceCollectionListYear(vuexContext, year) {
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.get(`/finance/collection/list/year/${year}`)
            .then(response => {
                vuexContext.commit('setFinanceCollectionListYear', response.data);
                vuexContext.dispatch('setFinanceCollectionTotal', response.data.list);
                vuexContext.commit('setFinanceCollectionSampleTotal',response.data.sample);

                vuexContext.dispatch('setEndLoadingAction');
            });
    },
    setFinanceCollectionListMonth(vuexContext, finance) {
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.get(`/finance/collection/list/month/${finance.month}/${finance.year}`)
            .then(response => {
                vuexContext.commit("setFinanceCollectionListMonth", response.data.list);
                vuexContext.dispatch('setFinanceCollectionTotal', response.data.list);
                vuexContext.dispatch('setEndLoadingAction');
            });
    },
    setFinanceAdvancedPaymentList(vuexContext){
        this.$axios.get('/finance/advanced/payment/list')
            .then(response => {
               vuexContext.commit('setFinanceAdvancedPaymentList', response.data.list);
            });
    },
    setAdvancedPaymentSave(vuexContext, advancedPayment) {
        this.$axios.post('/finance/advanced/payment/save', advancedPayment)
            .then(response => {
                if (response.data.status) {
                    this.$toast.success('Peşinat Başarıyla Kaydedildi.');
                    vuexContext.dispatch('setAdvancedPaymentSendMail', { ...advancedPayment, 'Mail': 'bilgiislem@mekmar.com' });
                    vuexContext.dispatch('setAdvancedPaymentSendMail', { ...advancedPayment, 'Mail': 'huseyin@mekmer.com' });
                    vuexContext.dispatch('setAdvancedPaymentSendMail', { ...advancedPayment, 'Mail': 'info@mekmar.com' });
                    vuexContext.dispatch('setAdvancedPaymentSendMail', { ...advancedPayment, 'Mail': 'mehmet@mekmer.com' });
                    vuexContext.dispatch('setFinancePoPaidList', paid.SiparisNo);
                    vuexContext.dispatch('setFinanceList');
                    vuexContext.dispatch('setFinancePoList', paid.MusteriID);


                    vuexContext.dispatch('setFinanceAdvancedPaymentList');

                } else {
                    this.$toast.error('Peşinat Kaydetme Başarısız.');
                }
            });
    },
    setAdvancedPaymentSendMail(vuexContext, advancedPayment) {
                            this.$axios.post('/mail/advanced/payment/server', advancedPayment)
                        .then(response => {
                            if (response.data.status) {
                                                                        this.$toast.success('Mail Başarıyla Gönderildi.');

                            } else {
                                                    this.$toast.error('Mail Gönderme Başarısız.');

                            }
                        });
    },
    setFinancePoList(vuexContext, customerId) {
                vuexContext.dispatch('setBeginLoadingAction');

        this.$axios.get(`/finance/po/list/${customerId}`)
            .then(response => {
                vuexContext.commit('setFinancePoList', response.data);
                vuexContext.dispatch('setFinancePoListTotal', response.data.poList);
                vuexContext.dispatch('setFinancePaidListTotal', response.data.paidList);
                vuexContext.dispatch('setEndLoadingAction');
            })
    },
    setFinancePoListTotal(vuexContext, payload) {
        vuexContext.commit('setFinancePoListTotal', payload);
    },
    setFinancePaidListTotal(vuexContext, payload) {
        vuexContext.commit('setFinancePaidListTotal', payload);
    },
    setFinancePoButtonStatus(vuexContext, payload) {
        vuexContext.commit('setFinancePoButtonStatus', payload);
    },
    setPoPaidSave(vuexContext, paid) {
        this.$axios.post('/finance/po/paid/save', paid)
            .then(response => {
                if (response.data.status) {
                    this.$toast.success('Ödeme Kaydedildi.');
                    vuexContext.dispatch('setPoPaidSaveSendMail', { ...paid, 'Mail': 'bilgiislem@mekmar.com' });
                    vuexContext.dispatch('setPoPaidSaveSendMail', { ...paid, 'Mail': 'huseyin@mekmer.com' });
                    vuexContext.dispatch('setPoPaidSaveSendMail', { ...paid, 'Mail': 'info@mekmar.com' });
                    vuexContext.dispatch('setPoPaidSaveSendMail', { ...paid, 'Mail': 'mehmet@mekmer.com' });
                    vuexContext.dispatch('setPoPaidSaveSendMail', { ...paid, 'Mail': 'export1@mekmar.com' });
                    vuexContext.dispatch('setPoPaidSaveSendMail', { ...paid, 'Mail': 'export2@mekmar.com' });
                    vuexContext.dispatch('setFinancePoPaidList', paid.SiparisNo);
                    vuexContext.dispatch('setFinancePoList', paid.MusteriID);
                    vuexContext.dispatch('setFinanceList');
                    vuexContext.dispatch('setFinancePoModel');




                } else {
                    this.$toast.error('Ödeme Kaydedilemedi.');
                }
            });
    },
    setPoPaidSaveSendMail(vuexContext, paid) {
        this.$axios.post('/finance/po/paid/send/mail', paid)
            .then(response => {
                if (response.data.status) {
                    this.$toast.success('Mail Başarıyla Gönderildi.');

                } else {
                    this.$toast.error('Mail Gönderme Başarısız.');
                    }
            })
    },
    setFinancePoPaidList(vuexContext, po) {
        this.$axios.get(`/finance/po/paid/list/${po}`)
            .then(response => {
                vuexContext.commit('setFinancePoPaidList', response.data.list);
            });
    },
    setPoPaidDelete(vuexContext, paid) {
        this.$axios.delete(`/finance/po/paid/delete/${paid.ID}`)
            .then(response => {
                if (response.data.status) {
                    this.$toast.success('Tahsilat Başarıyla Silindi');
                    vuexContext.dispatch('setPoPaidDeleteSendMail', { ...paid, 'Mail': 'bilgiislem@mekmar.com' });
                    vuexContext.dispatch('setPoPaidDeleteSendMail', { ...paid, 'Mail': 'huseyin@mekmer.com' });
                    vuexContext.dispatch('setPoPaidDeleteSendMail', { ...paid, 'Mail': 'info@mekmar.com' });
                    vuexContext.dispatch('setPoPaidDeleteSendMail', { ...paid, 'Mail': 'mehmet@mekmer.com' });
                    vuexContext.dispatch('setPoPaidDeleteSendMail', { ...paid, 'Mail': 'export1@mekmar.com' });
                    vuexContext.dispatch('setPoPaidDeleteSendMail', { ...paid, 'Mail': 'export2@mekmar.com' });



                    vuexContext.dispatch('setFinancePoPaidList', paid.SiparisNo);
                    vuexContext.dispatch('setFinancePoList', paid.MusteriID);
                    vuexContext.dispatch('setFinanceList');
                    vuexContext.dispatch('setFinancePoModel');

                } else {
                    this.$toast.error('Tahsilat Silme Başarısız.');
                }
            });
    },
    setPoPaidDeleteSendMail(vuexContext, paid) {
        this.$axios.post('/finance/po/paid/delete/send/mail', paid)
            .then(response => {
                if (response.data.status) {
                    this.$toast.success('Mail Başarıyla Gönderildi.');
                } else {
                    this.$toast.error('Mail Gönderme Başarısız.');
                    }
            })
    },
    setPoPaidUpdate(vuexContext, paid) {
        this.$axios.put('/finance/po/paid/update', paid)
            .then(response => {
                if (response.data.status) {
                                        this.$toast.success('Tahsilat Başarıyla Güncellendi');
                    vuexContext.dispatch('setPoPaidUpdateSendMail', { ...paid, 'Mail': 'bilgiislem@mekmar.com' });
                    vuexContext.dispatch('setPoPaidUpdateSendMail', { ...paid, 'Mail': 'huseyin@mekmer.com' });
                    vuexContext.dispatch('setPoPaidUpdateSendMail', { ...paid, 'Mail': 'info@mekmar.com' });
                    vuexContext.dispatch('setPoPaidUpdateSendMail', { ...paid, 'Mail': 'mehmet@mekmer.com' });
                    vuexContext.dispatch('setPoPaidUpdateSendMail', { ...paid, 'Mail': 'export1@mekmar.com' });
                    vuexContext.dispatch('setPoPaidUpdateSendMail', { ...paid, 'Mail': 'export2@mekmar.com' });
                    vuexContext.dispatch('setFinancePoPaidList', paid.SiparisNo);
                    vuexContext.dispatch('setFinancePoList', paid.MusteriID);
                    vuexContext.dispatch('setFinanceList');
                    vuexContext.dispatch('setFinancePoModel');
                } else {
                    this.$toast.error('Tahsilat Güncelleme Başarısız.');

                }
            });
    },
    setPoPaidUpdateSendMail(vuexContext, paid) {
                this.$axios.post('/finance/po/paid/update/send/mail', paid)
            .then(response => {
                if (response.data.status) {
                    this.$toast.success('Mail Başarıyla Gönderildi.');
                } else {
                    this.$toast.error('Mail Gönderme Başarısız.');
                    }
            })
    },
    setPoPaidDetailList(vuexContext, value) {
        this.$axios.get(`/finance/po/paid/detail/list/${value.Tarih}/${value.MusteriID}`)
            .then(response => {
                vuexContext.commit('setPoPaidDetailList', response.data.list); 
            });
    }


};
const mutations = {
    setFinanceCollectionSampleTotal(state,payload){
        state.financeCollectionSampleTotal = 0;
        payload.forEach(x=>{
            state.financeCollectionSampleTotal += x.Tutar;
        });
    },
    setFinanceTotalList(state, payload) {
                state.financeListTotal = {
            'total': 0,
            'production': 0,
            'forwarding': 0,
            'advanced': 0,
            'paid': 0,
            'balance': 0,
            'balanceProduction': 0
        };
        payload.forEach(x => {
                              state.financeListTotal.total += x.total_order_amount;
                    state.financeListTotal.production += x.production;
                    state.financeListTotal.forwarding += x.forwarding;
                    state.financeListTotal.advanced += x.advanced_payment;
                    state.financeListTotal.paid += x.paid;
                    state.financeListTotal.balanceProduction += ((x.production + x.forwarding) - x.paid);
                    state.financeListTotal.balance += (x.forwarding - x.paid);  
        })

    },
    setFinanceList(state, payload) {
        state.financeList =  [];
            state.financeListAll =  [];
        state.financeListTotal = {
            'total': 0,
            'production': 0,
            'forwarding': 0,
            'advanced': 0,
            'paid': 0,
            'balance': 0,
            'balanceProduction': 0
        };
        for(const item of payload.financeList) {
            if(item.forwarding - item.paid == 0 ){
                continue;
            }else if ((item.forwarding - item.paid) >8 || (item.forwarding - item.paid) <-8){
                item.balanced = item.forwarding - item.paid;
                state.financeList.push(item);
            }
        };
        for(const item of payload.financeList) {
                item.balanced = item.forwarding - item.paid;
                state.financeListAll.push(item);
        };
        state.financeExpiryList = payload.vadeList;
        state.financeListMaya = payload.mayaList;

    },
    setFinanceCollectionList(state, payload) {
        state.financeCollectionList = payload.list;
        state.financeCollectionYearList = payload.years;
        state.financeCollectionMonthList = payload.months;
        state.financeCollectionSampleList = payload.sample;
    },
    setFinanceCollectionTotal(state, payload) {
        state.financeCollectionTotal = 0;
        payload.forEach(x => {
            state.financeCollectionTotal += x.Tutar;
        })

    },
    setFinanceCollectionListYear(state, payload) {
        state.financeCollectionList = payload.list;
        state.financeCollectionMonthList = payload.months;
        state.financeCollectionSampleList = payload.sample;

    },
    setFinanceCollectionListMonth(state, payload) {
        state.financeCollectionList = payload;
    },
    setFinanceAdvancedPaymentList(state, payload) {
        state.financeAdvancedPaymentList = payload;
    },
    setFinancePoList(state,payload){
        state.financePoList = payload.poList;
        state.financePaidList = payload.paidList;
    },
    setFinancePoListTotal(state, payload) {
        state.financePoListTotal = {
            order: 0,
            advancedPayment: 0,
            paid: 0,
            balanced: 0,
        
        };
        payload.forEach(x => {
            state.financePoListTotal.order += x.OrderTotal;
            state.financePoListTotal.advancedPayment += x.Pesinat;
            state.financePoListTotal.paid += x.Paid;
            state.financePoListTotal.balanced += x.Balanced;
        })
    },
    setFinancePaidListTotal(state, payload) {
        state.financePaidListTotal = 0;
        payload.forEach(x => {
           state.financePaidListTotal += x.Paid 
        });
    },
    setFinancePoButtonStatus(state, payload) {
        state.financePoButtonStatus = payload;
    },
    setFinancePoPaidList(state, payload) {
        state.financePoPaidList = payload;
    },
    setPoPaidDetailList(state, payload) {
        state.financePoPaidDetailList = payload;
    }


};
const getters = {
    getfinanceList(state) {
        return state.financeList;
    },
    getFinanceListAll(state) {
        return state.financeListAll;  
    },
    getFinanceListTotal(state) {
        return state.financeListTotal;
    },
    getFinanceExpiryList(state) {
        return state.financeExpiryList;
    },
    getFinanceCollectionList(state) {
        return state.financeCollectionList;
    },
    getFinanceCollectionYearList(state) {
        return state.financeCollectionYearList;
    },
    getFinanceCollectionMonthList(state) {
        return state.financeCollectionMonthList;
    },
    getFinanceCollectionTotal(state) {
        return state.financeCollectionTotal;
    },
    getFinanceAdvancedPaymentList(state) {
        return state.financeAdvancedPaymentList;
    },
    getFinancePoList(state) {
        return state.financePoList;
    },
    getFinancePaidList(state){
        return state.financePaidList;
    },
    getFinancePoListTotal(state) {
        return state.financePoListTotal;
    },
    getFinancePaidListTotal(state) {
        return state.financePaidListTotal;
    },
    getFinancePoButtonStatus(state) {
        return state.financePoButtonStatus;
    },
    getFinancePoPaidList(state) {
        return state.financePoPaidList;
    },
    getFinancePoPaidDetailList(state) {
        return state.financePoPaidDetailList;
    },
    getFinanceListMaya(state){
        return state.financeListMaya;
    },
    getFinanceCollectionSampleList(state){
        return state.financeCollectionSampleList;
    },
    getFinanceCollectionSampleTotal(state){
        return state.financeCollectionSampleTotal;
    }
};

export default {
    state,actions,mutations,getters
}