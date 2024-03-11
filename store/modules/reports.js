const state = {
    reportsMekmerProductionList: [],
    reportsMekmerProductionListTotal: {
        'amount': 0,
        'crate': 0,
        'piece':0,
    },
    reportsMekmerStockList: [],
    reportsMekmerStockListTotal: {
        'crate': 0,
        'amount':0,
    },
    reportsStockListDetail: [],
    reportsStockListDetailTotal: {
        'amount': 0,
        'piece':0,
    },
    reportsMekmerMineList: [],
    reportsMekmerMineListTotal: {
    
    },
    reportsMekmarAyoList: [],
    reportsMekmarAyoListTotal: {
        'proforma': 0,
        'mekmerProduction': 0,
        'mekmozProduction': 0,
        'outerProduction': 0,
        'transport': 0,
        'duty': 0,
        'spraying': 0,
        'port': 0,
        'insuranceBuyes': 0,
        'insuranceSales': 0,
        'freightBuyes': 0,
        'lashing': 0,
        'booking': 0,
        'spanzlet': 0,
        'detailBuyes1': 0,
        'detailBuyes2': 0,
        'detailBuyes3': 0,
        'mekus': 0,
        'specialwork': 0,
        'bankCost': 0,
        'fregileCost': 0,
        'costTotal': 0,
        'profitUsd': 0,
        'profitTl':0,
        'commision':0
    },
    reportsMekmarAyoYearList: [],
    reportsMekmarAyoMonthList: [],

    reportsMekmarLoadingList: [],
    reportsMekmarLoadingListTotal: {
        'fob': 0,
        'ddp':0
    },
    reportsMekmarLoadingListYear: [],
    reportsMekmarLoadingListYearTotal: {
        'fob': 0,
        'ddp':0,
    },
    loadingYears: [],
    loadingMonths: [],
    reportsMekmarForwardingList: [],
    reportsMekmarForwardingListTotal: {
        'crate': 0,
        'amount': 0,
        'box': 0,
        'piece': 0,
        'total':0
    },
    reportsMekmarSummaryOrderList: [],
    reportsMekmarSummaryOrderListTotal: [],
    reportsMekmarSummaryOrderDetail: [],
    reportsMekmarSummaryOrderDetailTotal: {
        'fob': 0,
        'freight': 0,
        'detail1': 0,
        'detail2': 0,
        'detail3': 0,
        'detail4': 0,
        'ddp':0,
    },
    reportsMekmarSummaryOrderListByRepresentative:[],
    reportsMekmarSummaryOrderListByRepresentativeTotal:[],


    reportsMekmarSummaryForwardingList:[],
    reportsMekmarSummaryForwardingListTotal: [],
    reportsMekmarMkList: [],
    reportsMekmarMkListTotal: {
        'byOrders': { 'fob': 0, 'ddp': 0 },
        'byMarketing': { 'fob': 0, 'ddp': 0 },
        'byMarketingForw':{'forwarding':{'fob':0,'ddp':0},'mekmar':{'fob':0,'ddp':0},'in':{'fob':0,'ddp':0},'mekmer':{'fob':0,'ddp':0},'imp':{'fob':0,'ddp':0}}
    },
    reportsMekmarMkForwList: [],
    reportsMekmarGuYearList: [],
    reportsMekmarGuContList: [],
    reportsMekmarGuContByCustList:[],
    reportsMekmarGuMekusList: [],
    reportsMekmarGuLogsList: [],
    reportsMekmarGuForwList: [],
    reportsMekmerAtlantaList:[]
    
};
const actions = {
    setReportsMekmarSummaryOrderListByRepresentative(vuexContext,userId){
        this.$axios.get(`/reports/mekmar/summary/order/list/by/representative/${userId}`)
        .then(response=>{
            vuexContext.commit('setReportsMekmarSummaryOrderListByRepresentative',response.data.items);
            vuexContext.dispatch('setReportsMekmarSummaryOrderListByRepresentativeTotal',response.data.items);
        });
    },
    setReportsMekmarSummaryOrderListByRepresentativeTotal(vuexContext,payload){
        vuexContext.commit('setReportsMekmarSummaryOrderListByRepresentativeTotal',payload);
    },
    setReportsMekmerProductionList(vuexContext) {
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.get('/reports/mekmer/production/list')
            .then(response => {
                vuexContext.commit('setReportsMekmerProductionList', response.data.list);
                vuexContext.dispatch('setReportsMekmerProductionTotal', response.data.list);
                vuexContext.dispatch('setEndLoadingAction');
            })
    },

    setProductionFilterList(vuexContext,filter){
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.post('/reports/mekmer/production/filter',filter)
            .then(response => {
                vuexContext.commit('setReportsMekmerProductionList', response.data.list);
                vuexContext.dispatch('setReportsMekmerProductionTotal', response.data.list);
                vuexContext.dispatch('setEndLoadingAction');
            })
    },




    setReportsMekmerProductionDate(vuexContext, payload) {
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.post('/reports/mekmer/production/date', payload)
            .then(response => {
                vuexContext.commit('setReportsMekmerProductionList', response.data.list);
                vuexContext.dispatch('setReportsMekmerProductionTotal', response.data.list);
                vuexContext.dispatch('setEndLoadingAction');

            });
    },
    setReportsMekmerProductionTotal(vuexContext, payload) {
        vuexContext.commit('setReportsMekmerProductionTotal', payload);
    },
    setReportsMekmerStockList(vuexContext) {
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.get("/reports/mekmer/stock/list")
            .then(response => {
                vuexContext.commit('setReportsMekmerStockList', response.data.list);
                vuexContext.commit('setReportsMekmerStockListTotal', response.data.list);
                vuexContext.dispatch('setEndLoadingAction');
            });
    },
    setReportsMekmerStockListStock(vuexContext) {
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.get("/reports/mekmer/stock/list/stock")
            .then(response => {
                vuexContext.commit('setReportsMekmerStockList', response.data.list);
                vuexContext.commit('setReportsMekmerStockListTotal', response.data.list);
                vuexContext.dispatch('setEndLoadingAction');
            });
    },
    setReportsMekmerStockListMekmer(vuexContext) {
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.get("/reports/mekmer/stock/list/mekmer")
            .then(response => {
                vuexContext.commit('setReportsMekmerStockList', response.data.list);
                vuexContext.commit('setReportsMekmerStockListTotal', response.data.list);
                vuexContext.dispatch('setEndLoadingAction');
            });
    },
    setReportsMekmerStockListMekmerIn(vuexContext) {
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.get("/reports/mekmer/stock/list/mekmer/in")
            .then(response => {
                vuexContext.commit('setReportsMekmerStockList', response.data.list);
                vuexContext.commit('setReportsMekmerStockListTotal', response.data.list);
                vuexContext.dispatch('setEndLoadingAction');
            });
    },
    setReportsMekmerStockListMekmoz(vuexContext) {
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.get("/reports/mekmer/stock/list/mekmoz")
            .then(response => {
                vuexContext.commit('setReportsMekmerStockList', response.data.list);
                vuexContext.commit('setReportsMekmerStockListTotal', response.data.list);
                vuexContext.dispatch('setEndLoadingAction');
            });
    },
    setReportsMekmerStockListOuter(vuexContext) {
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.get("/reports/mekmer/stock/list/outer")
            .then(response => {
                vuexContext.commit('setReportsMekmerStockList', response.data.list);
                vuexContext.commit('setReportsMekmerStockListTotal', response.data.list);
                vuexContext.dispatch('setEndLoadingAction');
            });
    },
    setReportsMekmerStockListTotal(vuexContext, payload) {
        vuexContext.commit('setReportsMekmerStockListTotal', payload);
    },
    setReportsAllStockListDetail(vuexContext, payload) {
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.post('/reports/all/stock/detail',payload)
            .then(response => {
                vuexContext.commit('setReportsStockListDetail', response.data.list);
                vuexContext.commit('setReportsStockListDetailTotal', response.data.list);
                vuexContext.dispatch('setEndLoadingAction');
            });
    },
    setReportsStockStockListDetail(vuexContext, payload) {
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.post('/reports/stock/stock/detail', payload)
            .then(response => {
                vuexContext.commit('setReportsStockListDetail', response.data.list);
                vuexContext.commit('setReportsStockListDetailTotal', response.data.list);
                vuexContext.dispatch('setEndLoadingAction');
            })
    },
    setReportsOuterStockListDetail(vuexContext, payload) {
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.post('/reports/outer/stock/detail', payload)
            .then(response => {
                vuexContext.commit('setReportsStockListDetail', response.data.list);
                vuexContext.commit('setReportsStockListDetailTotal', response.data.list);
                vuexContext.dispatch('setEndLoadingAction');
            })
    },
    setReportsMekmerStockListDetail(vuexContext, payload) {
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.post('/reports/mekmer/stock/detail', payload)
            .then(response => {
                vuexContext.commit('setReportsStockListDetail', response.data.list);
                vuexContext.commit('setReportsStockListDetailTotal', response.data.list);
                vuexContext.dispatch('setEndLoadingAction');
            })
    },
    setReportsMekmerInStockListDetail(vuexContext, payload) {
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.post('/reports/mekmer/stock/detail/in', payload)
            .then(response => {
                vuexContext.commit('setReportsStockListDetail', response.data.list);
                vuexContext.commit('setReportsStockListDetailTotal', response.data.list);
                vuexContext.dispatch('setEndLoadingAction');
            })
    },
    setReportsMekmozStockListDetail(vuexContext, payload) {
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.post('/reports/mekmoz/stock/detail', payload)
            .then(response => {
                vuexContext.commit('setReportsStockListDetail', response.data.list);
                vuexContext.commit('setReportsStockListDetailTotal', response.data.list);
                vuexContext.dispatch('setEndLoadingAction');
            })
    },
    setReportsStockListDetailTotal(vuexContext, payload) {
        vuexContext.commit('setReportsStockListDetailTotal',payload)
    },
    setReportsMekmerMineList(vuexContext) {
        this.$axios.get('/reports/mekmer/mine/list')
            .then(response => {
                vuexContext.commit('setReportsMekmerMineList', response.data.list);
            })
    },
    setReportsMekmerMineListTotal(vuexContext, payload) {
        vuexContext.commit('setReportsMekmerMineListTotal', payload);
    },
    setReportsMekmarAyoList(vuexContext, payload) {
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.get(`/reports/mekmar/ayo/list/${payload.year}/${payload.month}`)
            .then(response => {
                vuexContext.commit('setReportsMekmarAyoList', response.data.list);
                vuexContext.dispatch('setReportsMekmarAyoListTotal', response.data.list);
                vuexContext.dispatch('setEndLoadingAction');

            })
    },
    setReportsMekmarAyoListYear(vuexContext, year) {
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.get(`/reports/mekmar/ayo/by/year/list/${year}`)
            .then(response => {
                vuexContext.commit('setReportsMekmarAyoList', response.data.list);
                vuexContext.dispatch('setReportsMekmarAyoListTotal', response.data.list);
                vuexContext.dispatch("setReportsMekmarAyoMonthList", year);
                vuexContext.dispatch('setEndLoadingAction');


            });
    },
    setReportsMekmarAyoListMonth(vuexContext, payload) {
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.get(`/reports/mekmar/ayo/list/${payload.year}/${payload.month}`)
            .then(response => {
                vuexContext.commit('setReportsMekmarAyoList', response.data.list);
                vuexContext.dispatch('setReportsMekmarAyoListTotal', response.data.list);
                vuexContext.dispatch('setEndLoadingAction');
            })
    },




    setReportsMekmarAyoListTotal(vuexContext, payload) {
        vuexContext.commit('setReportsMekmarAyoListTotal', payload);
    },
    setReportsMekmarAyoYearList(vuexContext) {

        this.$axios.get('/reports/mekmar/ayo/year/list')
            .then(response => {
                 vuexContext.commit('setReportsMekmarAyoYearList', response.data.list);
            });
    },
    setReportsMekmarAyoMonthList(vuexContext, year) {
        this.$axios.get(`/reports/mekmar/ayo/month/list/${year}`)
            .then(response => {
                vuexContext.commit('setReportsMekmarAyoMonthList', response.data.list);
            });
    },

    setLoadingList(vuexContext,date){
        vuexContext.dispatch('setBeginLoadingAction');

        this.$axios.get(`/reports/loading/list/${date.year}/${date.month}`)
        .then(response=>{
            vuexContext.commit('setLoadingList',response.data);
            vuexContext.commit('setReportsMekmarLoadingListTotal',response.data.list);
            vuexContext.commit('setReportsMekmarLoadingListYear',response.data.yearly);
            vuexContext.dispatch('setEndLoadingAction');

        });
    },

    setYearlyMonthList(vuexContext,year){
        return new Promise((resolve,reject)=>{
            this.$axios.get(`/reports/loading/list/${year}`)
            .then(response=>{
                if(response){
                    resolve(response.data.months);
                    vuexContext.commit('setMonthList',response.data.months);
                }else{
                    resolve(false);
                }
            })
        });
    },

    setReportsMekmarLoadingListTotal(vuexContext,list){
        vuexContext.commit('setReportsMekmarLoadingListTotal',list);
    },
    setReportsMekmarLoadingListYear(vuexContext,list){
        vuexContext.commit('setReportsMekmarLoadingListYear',list);
    },










    setReportsMekmarForwardingList(vuexContext) {
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.get('/reports/mekmar/forwarding/list')
            .then(response => {
                vuexContext.commit('setReportsMekmarForwardingList', response.data.list); 
                vuexContext.dispatch('setReportsMekmarForwardingListTotal', response.data.list);
                vuexContext.dispatch('setEndLoadingAction');
            });
    },

    setForwardingFilterList(vuexContext,filter){
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.post('/reports/mekmar/forwarding/filter',filter)
        .then(response=>{
            vuexContext.commit('setReportsMekmarForwardingList', response.data.list); 
            vuexContext.dispatch('setReportsMekmarForwardingListTotal', response.data.list);
            vuexContext.dispatch('setEndLoadingAction');
        });

    },

    setReportsMekmarForwardingListTotal(vuexContext, payload) {
        vuexContext.commit('setReportsMekmarForwardingListTotal', payload);
    },
    setReportsMekmarForwardingDate(vuexContext, payload) {
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.post(`/reports/mekmar/forwarding/date`, payload)
            .then(response => {
                vuexContext.commit('setReportsMekmarForwardingList', response.data.list);
                vuexContext.dispatch('setReportsMekmarForwardingListTotal', response.data.list);
                vuexContext.dispatch('setEndLoadingAction');
            })  
    },
    setReportsMekmarSummaryOrderList(vuexContext) {
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.get('/reports/mekmar/summary/order/list')
            .then(response => {
                vuexContext.commit('setReportsMekmarSummaryOrderList', response.data.items);
                vuexContext.dispatch('setReportsMekmarSummaryOrderListTotal', response.data.items);
                vuexContext.dispatch('setEndLoadingAction');
            })
    },
    setReportsMekmarSummaryOrderListTotal(vuexContext, payload) {
        vuexContext.commit('setReportsMekmarSummaryOrderListTotal', payload);
    },
    setReportsMekmarSummaryForwardingList(vuexContext) {
        this.$axios.get('/reports/mekmar/summary/forwarding/list')
            .then(response => {
                vuexContext.commit('setReportsMekmarSummaryForwardingList', response.data.items);
                vuexContext.commit('setReportsMekmarSummaryForwardingListTotal', response.data.items);
                
            });
    },
    setReportsMekmarSummaryForwardingListTotal(vuexContext, payload) {
        vuexContext.commit('setReportsMekmarSummaryForwardingListTotal', payload);
    },

    setReportsMekmarSummaryOrderDetail(vuexContext, payload) {
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.post('/reports/mekmar/summary/order/detail/list', payload)
            .then(response => {
                vuexContext.commit('setReportsMekmarSummaryOrderDetail', response.data.list);
                vuexContext.dispatch('setReportsMekmarSummaryOrderDetailTotal', response.data.list);
                vuexContext.dispatch('setEndLoadingAction');
            });
    },
    setReportsMekmarSummaryOrderDetailTotal(vuexContext, payload) {
        vuexContext.commit('setReportsMekmarSummaryOrderDetailTotal', payload);
    },

    setReportsMekmarSummaryForwardingDetail(vuexContext, payload) {
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.post('/reports/mekmar/summary/forwarding/detail/list', payload)
            .then(response => {
                vuexContext.commit('setReportsMekmarSummaryOrderDetail', response.data.list);
                vuexContext.dispatch('setReportsMekmarSummaryOrderDetailTotal', response.data.list);
                vuexContext.dispatch('setEndLoadingAction');
            });
    },
    setReportsMekmarMkList(vuexContext) {
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.get(`/reports/mekmar/mk/list`)
            .then(response => {
                vuexContext.commit('setReportsMekmarMkList', response.data);
                vuexContext.dispatch('setOrderYearList', response.data.yearList);
                vuexContext.dispatch('setReportsMekmarMkListTotal', response.data);
                vuexContext.dispatch('setEndLoadingAction');
            });
    },
    setReportsMekmarMkListYear(vuexContext, payload) {
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.get(`/reports/mekmar/mk/list/${payload}`)
            .then(response => {
                vuexContext.commit('setReportsMekmarMkList', response.data);
                vuexContext.dispatch('setOrderYearList', response.data.yearList);
                vuexContext.dispatch('setReportsMekmarMkListTotal', response.data);
                vuexContext.dispatch('setEndLoadingAction');
            });
    },
    setReportsMekmarMkListTotal(vuexContext, payload) {
        vuexContext.commit('setReportsMekmarMkListTotal', payload);
    },
    setReportsMekmarGuList(vuexContext) {
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.get('/reports/mekmar/gu/list')
            .then(response => {
                vuexContext.commit('setReportsMekmarGuList', response.data);
                vuexContext.dispatch('setEndLoadingAction');
            });
    },
    setReportsMekmarGuListYear(vuexContext, payload) {
        this.$axios.get(`/reports/mekmar/gu/list/${payload}`)
            .then(response => {
                vuexContext.commit('setReportsMekmarGuList', response.data); 
            });
    },
    setReportsMekmerAtlantaList(vuexContext){
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.get('/reports/mekmer/atlanta/list')
        .then(response=>{
            vuexContext.commit('setReportsMekmerAtlantaList',response.data.list);
            vuexContext.dispatch('setEndLoadingAction');
        });
    }


};
const mutations = {
    setLoadingList(state,payload){
        state.reportsMekmarLoadingList = payload.list;
        state.reportsMekmarLoadingListYear = payload.yearly;
    },
    setReportsMekmerProductionList(state, payload) {
        state.reportsMekmerProductionList = payload;
    },
    setReportsMekmerStockList(state,payload){
       state.reportsMekmerStockList = payload;
    },
    setReportsMekmerProductionTotal(state, payload) {
      state.reportsMekmerProductionListTotal = {
            'amount': 0,
          'crate': 0,
            'piece':0,
        };
        for (const item of payload) {
            state.reportsMekmerProductionListTotal.amount += item.Miktar;
            state.reportsMekmerProductionListTotal.piece += item.Adet;
        };
        state.reportsMekmerProductionListTotal.crate = payload.length;
    },
    setReportsMekmerStockListTotal(state, payload) {
        state.reportsMekmerStockListTotal = {
            'crate': 0,
            'amount': 0
        };
        for (const item of payload) {
            state.reportsMekmerStockListTotal.crate += item.KasaSayisi;
            state.reportsMekmerStockListTotal.amount += item.Toplam;

        }
    },
    setReportsStockListDetail(state, payload) {
        state.reportsStockListDetail = payload;
    },
    setReportsStockListDetailTotal(state, payload) {
        state.reportsStockListDetailTotal = {
            'amount': 0,
            'piece':0,
        };
        for (const item of payload) {
            state.reportsStockListDetailTotal.amount += item.Miktar;
            state.reportsStockListDetailTotal.piece += item.Adet;
        };
    },
    setReportsMekmerMineList(state, payload) {
        state.reportsMekmerMineList = payload;
    },
    setReportsMekmerMineListTotal(state, payload) {
        
    },
    setReportsMekmarAyoList(state, payload) {
    state.reportsMekmarAyoList = payload;
    },
    setReportsMekmarAyoYearList(state, payload) {
        state.reportsMekmarAyoYearList = payload;
    },
    setReportsMekmarAyoMonthList(state, payload) {
        state.reportsMekmarAyoMonthList = payload;
    },
    setReportsMekmarAyoListTotal(state, payload) {
        state.reportsMekmarAyoListTotal = {
            'proforma': 0,
            'mekmerProduction': 0,
            'mekmozProduction': 0,
            'outerProduction': 0,
            'transport': 0,
            'duty': 0,
            'spraying': 0,
            'port': 0,
            'insuranceBuyes': 0,
            'insuranceSales': 0,
            'freightBuyes': 0,
            'lashing': 0,
            'booking': 0,
            'spanzlet': 0,
            'detailBuyes1': 0,
            'detailBuyes2': 0,
            'detailBuyes3': 0,
            'mekus': 0,
            'specialwork': 0,
            'bankCost': 0,
            'fregileCost': 0,
            'costTotal': 0,
            'profitUsd': 0,
            'profitTl': 0,
            'commision':0
        };
        payload.forEach(x => {
            state.reportsMekmarAyoListTotal.proforma += x.toplam_bedel;
            state.reportsMekmarAyoListTotal.mekmerProduction += x.mekmar_alim;
            state.reportsMekmarAyoListTotal.mekmozProduction += x.mekmoz_alim;
            state.reportsMekmarAyoListTotal.outerProduction += x.dis_alim;
            state.reportsMekmarAyoListTotal.transport += x.nakliye;
            state.reportsMekmarAyoListTotal.duty += x.gumruk;
            state.reportsMekmarAyoListTotal.spraying += x.ilaclama;
            state.reportsMekmarAyoListTotal.port += x.liman;
            state.reportsMekmarAyoListTotal.insuranceBuyes += x.sigorta;
            state.reportsMekmarAyoListTotal.freightBuyes += x.navlun;
            state.reportsMekmarAyoListTotal.lashing += x.lashing;
            state.reportsMekmarAyoListTotal.booking += x.booking;
            state.reportsMekmarAyoListTotal.spanzlet += x.spazlet;
            state.reportsMekmarAyoListTotal.detailBuyes1 += x.detay_1;
            state.reportsMekmarAyoListTotal.detailBuyes2 += x.detay_2;
            state.reportsMekmarAyoListTotal.detailBuyes3 += x.detay_3;

            state.reportsMekmarAyoListTotal.mekus += x.mekus_masraf;
            state.reportsMekmarAyoListTotal.specialwork += x.ozel_iscilik;
            state.reportsMekmarAyoListTotal.bankCost += x.banka_masrafi;
            state.reportsMekmarAyoListTotal.fregileCost += x.kurye_masrafi;
            state.reportsMekmarAyoListTotal.costTotal += x.masraf_toplam;
            state.reportsMekmarAyoListTotal.profitUsd += x.kar_zarar;
            state.reportsMekmarAyoListTotal.profitTl += x.kar_zarar_tl;
            state.reportsMekmarAyoListTotal.commision += x.pazarlama




















        
        });
    },
    setReportsMekmarLoadingList(state, payload) {
        state.reportsMekmarLoadingList = payload;
    },
    setReportsMekmarLoadingListTotal(state, payload) {
        state.reportsMekmarLoadingListTotal = {
            'fob': 0,
            'ddp': 0
        };
        payload.forEach(x => {
            state.reportsMekmarLoadingListTotal.fob += x.Fob;
            state.reportsMekmarLoadingListTotal.ddp += x.Dtp;
        });
    },
    setReportsMekmarLoadingListYear(state, payload) {

        state.reportsMekmarLoadingListYearTotal = {
            'fob': 0,
            'ddp': 0,
        };
        payload.forEach(x => {
            state.reportsMekmarLoadingListYearTotal.fob += x.Fob;
            state.reportsMekmarLoadingListYearTotal.ddp += x.Dtp;
        });

    },
    setReportsMekmarLoadingYearMonthList(state, payload) {
        state.loadingMonths = payload;
    },
    setLoadingYearsMonths(state, payload) {
        state.loadingYears = payload.years;
        state.loadingMonths = payload.months;
    },
    setReportsMekmarForwardingList(state, payload) {
        state.reportsMekmarForwardingList = payload;
    },
    setReportsMekmarForwardingListTotal(state, payload) {
        state.reportsMekmarForwardingListTotal = {
            'crate': 0,
            'amount': 0,
            'box': 0,
            'piece': 0,
            'total':0,
        };
        state.reportsMekmarForwardingListTotal.crate  = payload.length;
        payload.forEach(x => {
            state.reportsMekmarForwardingListTotal.amount += x.Miktar;
            state.reportsMekmarForwardingListTotal.piece += x.Adet;
            state.reportsMekmarForwardingListTotal.box += x.KutuAdet;
            state.reportsMekmarForwardingListTotal.total += x.Toplam;

        });
    },
    setReportsMekmarSummaryOrderList(state, payload) {
        state.reportsMekmarSummaryOrderList = payload;
    },
    setReportsMekmarSummaryOrderListTotal(state, payload) {
        for (const item of payload) {
            let fob = 0;
            let ddp = 0;
            for (const item2 of item) {
                fob += item2.FOB;
                ddp += item2.DDP;
            };
            state.reportsMekmarSummaryOrderListTotal.push({ 'fob': fob, 'ddp': ddp });
        }
    },
    setReportsMekmarSummaryForwardingList(state, payload) {
      state.reportsMekmarSummaryForwardingList = payload;
    },
    setReportsMekmarSummaryForwardingListTotal(state, payload) {
        for (const item of payload) {
            let fob = 0;
            let ddp = 0;
            for (const item2 of item) {
                fob += item2.FOB;
                ddp += item2.DDP;
            };
            state.reportsMekmarSummaryForwardingListTotal.push({ 'fob': fob, 'ddp': ddp });
        }
    },
    setReportsMekmarSummaryOrderDetail(state, payload) {
        state.reportsMekmarSummaryOrderDetail = payload;
    },
    setReportsMekmarSummaryOrderDetailTotal(state, payload) {
        state.reportsMekmarSummaryOrderDetailTotal = {
            'fob': 0,
            'freight': 0,
            'detail1': 0,
            'detail2': 0,
            'detail3': 0,
            'detail4': 0,
            'ddp': 0,
        };
        for (const item of payload) {
            state.reportsMekmarSummaryOrderDetailTotal.fob += item.Fob;
            state.reportsMekmarSummaryOrderDetailTotal.freight += item.NavlunSatis;
            state.reportsMekmarSummaryOrderDetailTotal.detail1 += item.DetayTutar_1;
            state.reportsMekmarSummaryOrderDetailTotal.detail2 += item.DetayTutar_2;
            state.reportsMekmarSummaryOrderDetailTotal.detail3 += item.DetayTutar_3;
            state.reportsMekmarSummaryOrderDetailTotal.detail4 += item.DetayTutar_4;
            state.reportsMekmarSummaryOrderDetailTotal.ddp += item.Ddp;
        }
    },
    setReportsMekmarMkList(state, payload) {
        state.reportsMekmarMkList = payload;
        state.reportsMekmarMkForwList = payload.byMarketingForwList;
    },
    setReportsMekmarMkListTotal(state, payload) {
        state.reportsMekmarMkListTotal = {
            'byOrders': { 'fob': 0, 'ddp': 0 },
            'byMarketing': { 'fob': 0, 'ddp': 0 },
             'byMarketingForw':{'forwarding':{'fob':0,'ddp':0},'mekmar':{'fob':0,'ddp':0},'in':{'fob':0,'ddp':0},'mekmer':{'fob':0,'ddp':0},'imp':{'fob':0,'ddp':0}}

        };
        payload.byOrderList.forEach(x => {
            state.reportsMekmarMkListTotal.byOrders.fob += x.Fob;
            state.reportsMekmarMkListTotal.byOrders.ddp += x.Ddp;
        });
        payload.byMarketingList.forEach(x => {
            state.reportsMekmarMkListTotal.byMarketing.fob += x.Fob;
            state.reportsMekmarMkListTotal.byMarketing.ddp += x.Ddp;

        });
        payload.byMarketingForwList.forwList.forEach(x => {
            state.reportsMekmarMkListTotal.byMarketingForw.forwarding.fob += x.Fob;
            state.reportsMekmarMkListTotal.byMarketingForw.forwarding.ddp += x.Ddp;
        });
        payload.byMarketingForwList.forwMekmarList.forEach(x => {
            state.reportsMekmarMkListTotal.byMarketingForw.mekmar.fob += x.Fob;
            state.reportsMekmarMkListTotal.byMarketingForw.mekmar.ddp += x.Ddp;

        });
        payload.byMarketingForwList.forwInList.forEach(x => {
            state.reportsMekmarMkListTotal.byMarketingForw.in.fob += x.Fob;
            state.reportsMekmarMkListTotal.byMarketingForw.in.ddp += x.Ddp;

        });
                payload.byMarketingForwList.forwMekmerList.forEach(x => {
            state.reportsMekmarMkListTotal.byMarketingForw.mekmer.fob += x.Fob;
            state.reportsMekmarMkListTotal.byMarketingForw.mekmer.ddp += x.Ddp;

                });
                payload.byMarketingForwList.forwImpList.forEach(x => {
            state.reportsMekmarMkListTotal.byMarketingForw.imp.fob += x.Fob;
            state.reportsMekmarMkListTotal.byMarketingForw.imp.ddp += x.Ddp;

        });
    },
    setReportsMekmarGuList(state, payload) {
        state.reportsMekmarGuYearList = payload.yearList;
        payload.contList.forEach(x => {
            if (x.KontSayisi == null) {
                x.KontSayisi = 0;
            } 
        });
        state.reportsMekmarGuContList = payload.contList;
        payload.contByCust.forEach(x => {
            if (x.KontSayisi == null) {
              x.KontSayisi = 0;  
            };
        });
        state.reportsMekmarGuContByCustList = payload.contByCust;
        state.reportsMekmarGuMekusList = payload.mekusList;
        state.reportsMekmarGuLogsList = payload.logsList;

        let date = new Date().getFullYear();
        let index = 0;
        for (const x of Array(11).keys()) {
            state.reportsMekmarGuForwList.push({ 'year': date, 'data': [],'fob':0,'ddp':0 });
            for (const y of payload.forwList) {
                if (y.Yil == date) {
                    state.reportsMekmarGuForwList[index].fob += y.Fob;
                    state.reportsMekmarGuForwList[index].ddp += y.Ddp
                    state.reportsMekmarGuForwList[index].data.push(y);
                    
                };
            }
            index += 1;
            date = date - 1;

        };


    },
    setReportsMekmerAtlantaList(state,payload){
        state.reportsMekmerAtlantaList = payload;
    },
    setReportsMekmarSummaryOrderListByRepresentative(state,payload){
        state.reportsMekmarSummaryOrderListByRepresentative = payload;
    },
    setReportsMekmarSummaryOrderListByRepresentativeTotal(state, payload) {
        for (const item of payload) {
            let fob = 0;
            let ddp = 0;
            for (const item2 of item) {
                fob += item2.FOB;
                ddp += item2.DDP;
            };
            state.reportsMekmarSummaryOrderListByRepresentativeTotal.push({ 'fob': fob, 'ddp': ddp });
        }
    },


};
const getters = {
    getReportsMekmarSummaryOrderListByRepresentativeTotal(state){
        return state.reportsMekmarSummaryOrderListByRepresentativeTotal
    },
    getReportsMekmarSummaryOrderListByRepresentative(state){
        return state.reportsMekmarSummaryOrderListByRepresentative;
    },
    getReportsMekmerProductionList(state) {
        return state.reportsMekmerProductionList;
    },
    getReportsMekmerProductionListTotal(state) {
        return state.reportsMekmerProductionListTotal;
    },
    getReportsMekmerStockList(state){
      return state.reportsMekmerStockList;
    },
    getReportsMekmerStockListTotal(state) {
        return state.reportsMekmerStockListTotal;
    },
    getReportsStockListDetail(state) {
        return state.reportsStockListDetail;
    },
    getReportsStockListDetailTotal(state) {
        return state.reportsStockListDetailTotal;
    },
    getReportsMekmerMineList(state) {
        return state.reportsMekmerMineList;
    },
    getReportsMekmarAyoList(state) {
        return state.reportsMekmarAyoList;
    },
    getReportsMekmarAyoYearList(state) {
        return state.reportsMekmarAyoYearList;
    },
    getReportsMekmarAyoMonthList(state) {
        return state.reportsMekmarAyoMonthList;
    },
    getReportsMekmarAyoListTotal(state) {
        return state.reportsMekmarAyoListTotal;
    },
    getReportsMekmarLoadingList(state) {
        return state.reportsMekmarLoadingList;
    },
    getReportsMekmarLoadingListTotal(state) {
        return state.reportsMekmarLoadingListTotal;
    },
    getReportsMekmarLoadingListYear(state) {
        return state.reportsMekmarLoadingListYear;
    },
    getReportsMekmarLoadingListYearTotal(state) {
        return state.reportsMekmarLoadingListYearTotal;
    },
    getLoadingYears(state) {
        return state.loadingYears;
    },
    getLoadingMonths(state) {
        return state.loadingMonths;
    },
    getreportsMekmarForwardingList(state) {
        return state.reportsMekmarForwardingList;
    },
    getReportsMekmarForwardingListTotal(state) {
        return state.reportsMekmarForwardingListTotal;
    },
    getReportsMekmarSummaryOrderList(state) {
        return state.reportsMekmarSummaryOrderList;
    },
    getReportsMekmarSummaryOrderListTotal(state) {
        return state.reportsMekmarSummaryOrderListTotal;
    },
    getReportsMekmarSummaryOrderDetail(state) {
        return state.reportsMekmarSummaryOrderDetail;
    },
    getReportsMekmarSummaryOrderDetailTotal(state) {
        return state.reportsMekmarSummaryOrderDetailTotal;
    },
    getReportsMekmarSummaryForwardingList(state) {
        return state.reportsMekmarSummaryForwardingList;
    },
    getReportsMekmarSummaryForwardingListTotal(state) {
        return state.reportsMekmarSummaryForwardingListTotal;
    },
    getReportsMekmarMkList(state) {
        return state.reportsMekmarMkList;
    },
    getReportsMekmarMkListTotal(state) {
        return state.reportsMekmarMkListTotal;
    },
    getReportsMekmarMkForwList(state) {
        return state.reportsMekmarMkForwList;
    },
    getReportsMekmarGuYearList(state) {
        return state.reportsMekmarGuYearList;
    },

    getReportsMekmarGuContList(state) {
        return state.reportsMekmarGuContList;
    },
    getReportsMekmarGuContByCustList(state) {
        return state.reportsMekmarGuContByCustList;
    },
    getReportsMekmarGuMekusList(state) {
        return state.reportsMekmarGuMekusList;
    },
    getReportsMekmarGuLogsList(state) {
        return state.reportsMekmarGuLogsList;
    },
    getReportsMekmarGuForwList(state) {
        return state.reportsMekmarGuForwList;
    },

    getReportsMekmerAtlantaList(state){
        return state.reportsMekmerAtlantaList;
    }

};
export default {
    state,
    actions,
    mutations,
    getters
};