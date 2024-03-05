const state = {
    sampleList: [],
    sampleYearList: [],
    samplePaidList: [],
    sampleButtonStatus: false,
    sampleFinanceList: [],
    sampleFinanceListTotal: {
        'getUsd': 0,
        'setUsd': 0,
        'getEuro': 0,
        'setEuro': 0,
        'getTl': 0,
        'setTl': 0,
        'bank':0
    },
    sampleFinanceBankList: [],
    sampleFinanceDetailList:[]

};
const actions = {
    setSampleList(vuexContext) {
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.get('/sample/list')
            .then(response => {
                vuexContext.commit('setSampleList', response.data);
                vuexContext.dispatch('setEndLoadingAction');
            });
    },
    setSampleListYear(vuexContext, year) {
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.get(`/sample/list/${year}`)
            .then(response => {
                vuexContext.commit('setSampleList', response.data);
                vuexContext.dispatch('setEndLoadingAction');
            });
    },
    setSamplePaidSave(vuexContext, payload) {
        this.$axios.post('/sample/paid/save', payload)
            .then(response => {
                if (response.data.status) {
                    vuexContext.dispatch('setSampleDetailPaidList',payload.NumuneNo);
                    this.$toast.success('Başarıyla Kaydedildi.');
                } else {
                    this.$toast.error('Kaydetme Başarısız');
                }
            });
    },
    setSamplePhotosFront(vuexContext, payload) {
        this.$axios.post('/sample/photos/front',payload)
            .then(response => {
                if (response.data.status) {
                    this.$toast.success('Başarıyla Kaydedildi.');
                } else {
                    this.$toast.error('Kaydetme Başarısız');
                }
            });
    },
    setSamplePhotosBack(vuexContext, payload) {
        this.$axios.post('/sample/photos/back',payload)
            .then(response => {
                if (response.data.status) {
                    this.$toast.success('Başarıyla Kaydedildi.');
                } else {
                    this.$toast.error('Kaydetme Başarısız');
                }
            });
    },
    setSampleButtonStatus(vuexContext, payload) {
        vuexContext.commit('setSampleButtonStatus', payload);
    },
    setSampleSave(vuexContext, payload) {
        this.$axios.post('/sample/save', payload)
            .then(response => {
                if (response.data.status) {
                    vuexContext.dispatch("setSampleList");
                    vuexContext.dispatch("setCustomersOfferList");

                    this.$toast.success('Başarıyla Kaydedildi.');
                    
                } else {
                    this.$toast.error('Kaydetme Başarısız');
                }
            });
    },
    setSampleDelete(vuexContext, payload) {
        this.$axios.delete(`/sample/delete/${payload.id}/${payload.po}`)
            .then(response => {
                if (response.data.status) {
                    vuexContext.dispatch("setSampleList");
                    this.$toast.success('Başarıyla Silindi.');
                } else {
                    this.$toast.error('Silme Başarısız');
                }
            })
    },
    setSampleUpdate(vuexContext, payload) {
        this.$axios.put('/sample/update', payload)
            .then(response => {
                if (response.data.status) {
                    vuexContext.dispatch("setSampleList");
                    vuexContext.dispatch("setCustomersOfferList");
                    this.$toast.success('Başarıyla Güncellendi.');
                } else {
                    this.$toast.error('Güncelleme Başarısız');
                }
            });
    },
    setSampleDetailPaidList(vuexContext, payload) {
        this.$axios.get(`/sample/detail/paid/list/${payload}`)
            .then(response => {
                vuexContext.commit("setSampleDetailPaidList", response.data.list); 
            });
    },
    setSampleFinanceList(vuexContext) {
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.get('/sample/finance/list')
            .then(response => {
                vuexContext.commit('setSampleFinanceList', response.data); 
                vuexContext.dispatch('setSampleFinanceListTotal', response.data);
                vuexContext.dispatch('setEndLoadingAction');
            });
    },
    setSampleFinanceListYear(vuexContext, year) {
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.get(`/sample/finance/list/${year}`)
            .then(response => {
                vuexContext.commit('setSampleFinanceList', response.data);
                vuexContext.dispatch('setSampleFinanceListTotal', response.data);
                vuexContext.dispatch('setEndLoadingAction');

            });
    },
    setSampleFinanceListTotal(vuexContext, payload) {
        vuexContext.commit('setSampleFinanceListTotal', payload);
    },
    setSampleFinanceDetailList(vuexContext, payload) {
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.get(`/sample/finance/detail/list/${payload.year}/${payload.customer}`)
            .then(response => {
                vuexContext.commit('setSampleFinanceDetailList', response.data.list); 
                vuexContext.dispatch('setEndLoadingAction');
            });
    }

};
const mutations = {
    setSampleList(state, payload) {
        state.sampleList = payload.list;
        state.sampleYearList = payload.years;
    },
    setSampleButtonStatus(state, payload) {
        state.sampleButtonStatus = payload;
    },
    setSampleDetailPaidList(state, payload) {
        state.samplePaidList = payload;
    },
    setSampleFinanceList(state, payload) {
        state.sampleFinanceList = payload.list;
        state.sampleYearList = payload.years;
        state.sampleFinanceBankList = payload.bank;
    },
    setSampleFinanceListTotal(state, payload) {
        state.sampleFinanceListTotal = {
            'getUsd': 0,
            'setUsd': 0,
            'getEuro': 0,
            'setEuro': 0,
            'getTl': 0,
            'setTl': 0,
            'bank':0,
        };
        payload.list.forEach(x => {
            state.sampleFinanceListTotal.getUsd += x.AlisUsd;
            state.sampleFinanceListTotal.setUsd += x.SatisUsd;
            state.sampleFinanceListTotal.getEuro += x.AlisEuro;
            state.sampleFinanceListTotal.setEuro += x.SatisEuro;
            state.sampleFinanceListTotal.getTl += x.AlisTl;
            state.sampleFinanceListTotal.setTl += x.SatisTl;

        });
        payload.bank.forEach(x => {
            state.sampleFinanceListTotal.bank += x.Tutar;
        });
    },
    setSampleFinanceDetailList(state, payload) {
        state.sampleFinanceDetailList = payload;
    }
};
const getters = {
    getSampleList(state) {
        return state.sampleList;
    },
    getSampleYearList(state) {
        return state.sampleYearList;
    },
    getSamplePaidList(state) {
        return state.samplePaidList;
    },
    getSampleButtonStatus(state) {
        return state.sampleButtonStatus;
    },
    getSampleFinanceList(state) {
        return state.sampleFinanceList;
    },
    getSampleFinanceListTotal(state) {
        return state.sampleFinanceListTotal;
    },
    getSampleFinanceBankList(state) {
        return state.sampleFinanceBankList;
    },
    getSampleFinanceDetailList(state) {
        return state.sampleFinanceDetailList;
    }

};

export default {
    state,
    actions,
    mutations,
    getters
}