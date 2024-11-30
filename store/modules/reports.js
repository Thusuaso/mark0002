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

    reportsMekmarGuYearList: [],
    reportsMekmarGuContList: [],
    reportsMekmarGuContByCustList:[],
    reportsMekmarGuMekusList: [],
    reportsMekmarGuLogsList: [],
    reportsMekmarGuForwList: [],
    reportsMekmerAtlantaList:[],
    reportsMekmarMkList: [],
    reportsMekmarGuAyoList: [],
    reportsMekmarGuOrdererThisYear: [],
    reportsMekmarGuOrdererThisYearTotal: {
        'fob': 0,
        'ddp':0,
    },
    reportsMekmarGuOrdererPreviousYear: [],
    reportsMekmarGuOrdererPreviousYearTotal: {
        'fob': 0,
        'ddp':0,
    },
        reportsMekmarGuOrdererTwoYearAgo: [],
    reportsMekmarGuOrdererTwoYearAgoTotal: {
        'fob': 0,
        'ddp':0,
    },
        reportsMekmarGuOperationThisYear: [],
    reportsMekmarGuOperationThisYearTotal: {
        'fob': 0,
        'ddp':0,
    },
    reportsMekmarGuOperationPreviousYear: [],
    reportsMekmarGuOperationPreviousYearTotal: {
        'fob': 0,
        'ddp':0,
    },
        reportsMekmarGuOperationTwoYearAgo: [],
    reportsMekmarGuOperationTwoYearAgoTotal: {
        'fob': 0,
        'ddp':0,
    },

    mekmarGuSellerOrderDetailList: [],
    mekmarGuSellerOrderDetailListTotal: {
        'fob': 0,
        'ddp': 0,
        'navlun': 0,
        'detail1': 0,
        'detail2': 0,
        'detail3': 0,
        'detail4':0,
    },


        reportsMekmarGuOrdererThisYearForw: [],
    reportsMekmarGuOrdererThisYearTotalForw: {
        'fob': 0,
        'ddp':0,
    },
    reportsMekmarGuOrdererPreviousYearForw: [],
    reportsMekmarGuOrdererPreviousYearTotalForw: {
        'fob': 0,
        'ddp':0,
    },
        reportsMekmarGuOrdererTwoYearAgoForw: [],
    reportsMekmarGuOrdererTwoYearAgoTotalForw: {
        'fob': 0,
        'ddp':0,
    },
        reportsMekmarGuOperationThisYearForw: [],
    reportsMekmarGuOperationThisYearTotalForw: {
        'fob': 0,
        'ddp':0,
    },
    reportsMekmarGuOperationPreviousYearForw: [],
    reportsMekmarGuOperationPreviousYearTotalForw: {
        'fob': 0,
        'ddp':0,
    },
        reportsMekmarGuOperationTwoYearAgoForw: [],
    reportsMekmarGuOperationTwoYearAgoTotalForw: {
        'fob': 0,
        'ddp':0,
    },
    mekmarGuSelectedUser: {},

    
    
};

const actions = {
    setMekmarGuSelectedUser(vuexContext, payload) {
        vuexContext.commit('setMekmarGuSelectedUser', payload);  
    },
    /* */
    setMekmarGuSellerOrderDetail(vuexContext, payload) {
        return new Promise((resolve,reject) => {
            this.$axios.get(`/reports/gu/mekmar/order/seller/${payload.month}/${payload.year}/${payload.userId}`)
                .then(response => {
                    if (response) {
                        vuexContext.commit('setMekmarGuSellerOrderDetail', response.data.detail);
                        resolve(true);

                    } else {
                        resolve(false);
                }
            });
        })
    },
        setMekmarGuOperationOrderDetail(vuexContext, payload) {
        return new Promise((resolve,reject) => {
            this.$axios.get(`/reports/gu/mekmar/order/operation/${payload.month}/${payload.year}/${payload.userId}`)
                .then(response => {
                    if (response) {
                        vuexContext.commit('setMekmarGuSellerOrderDetail', response.data.detail);
                        resolve(true);

                    } else {
                        resolve(false);
                }
            });
        })
    },
    setMekmarGuSellerForwardingDetail(vuexContext, payload) {
            return new Promise((resolve,reject) => {
            this.$axios.get(`/reports/gu/mekmar/forwarding/seller/${payload.month}/${payload.year}/${payload.userId}`)
                .then(response => {
                    if (response) {
                        vuexContext.commit('setMekmarGuSellerOrderDetail', response.data.detail);
                        resolve(true);

                    } else {
                        resolve(false);
                }
            });
        })
    },
    
        setMekmarGuOperationForwardingDetail(vuexContext, payload) {
            return new Promise((resolve,reject) => {
            this.$axios.get(`/reports/gu/mekmar/forwarding/operation/${payload.month}/${payload.year}/${payload.userId}`)
                .then(response => {
                    if (response) {
                        vuexContext.commit('setMekmarGuSellerOrderDetail', response.data.detail);
                        resolve(true);

                    } else {
                        resolve(false);
                }
            });
        })
        },
        
    /* */



    setMekmarGuOrdererOperationList(vuexContext, userId) {

        return new Promise((resolve, reject) => {
            this.$axios.get('/reports/mekmar/gu/operation/orderer/list/' + userId)
                .then(response => {
                    if (response) {
                        vuexContext.commit('setMekmarGuOrdererOperationList', response.data);
                        resolve(true);
                    } else {
                        resolve(false);
                }
            });
        })
    },
    setReportsMekmarMkList(vuexContext,payload){
        vuexContext.commit('setReportsMekmarMkList',payload)
    },
    setReportsMekmarSummaryOrderListByRepresentative(vuexContext,userId){
        this.$axios.get(`/reports/mekmar/summary/order/list/by/representative/${userId}`)
        .then(response=>{
            vuexContext.commit('setReportsMekmarSummaryOrderListByRepresentative',response.data.items);
            vuexContext.dispatch('setReportsMekmarSummaryOrderListByRepresentativeTotal',response.data.items);
        });
    },
    setReportsMekmarSummaryOrderDetailRepresentative(vuexContext, payload) {
        
        this.$axios.get(`/reports/mekmar/summary/order/list/by/representative/detail/${payload.userId}/${payload.month}/${payload.year}`)
            .then(response => {
                                vuexContext.commit('setReportsMekmarSummaryOrderDetail', response.data.list);
                vuexContext.dispatch('setReportsMekmarSummaryOrderDetailTotal', response.data.list);
                vuexContext.dispatch('setEndLoadingAction');
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
    setReportsMekmerStockListOnlyStocksMekmer(vuexContext) {
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.get("/reports/mekmer/stock/list/only/mekmer")
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

    setReportsMekmozStockListOnlyStocksMekmerDetail(vuexContext, payload) {
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.post('/reports/mekmer/stock/only/stock/mekmer/detail', payload)
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
    setReportsMekmarQuarterAyoList(vuexContext, payload) {
                vuexContext.dispatch('setBeginLoadingAction');

                vuexContext.commit('setReportsMekmarAyoList', payload);
                vuexContext.dispatch('setReportsMekmarAyoListTotal', payload);
                vuexContext.dispatch('setEndLoadingAction');
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
    
    setLoadingByCustomerList(vuexContext,date){
        vuexContext.dispatch('setBeginLoadingAction');

        this.$axios.get(`/reports/loading/list/by/customer/${date.year}/${date.month}`)
        .then(response=>{
            const data = [];
            response.data.list.forEach(x=>{
                data.push({...x,'YuklemeTarihi':'','SiparisNo':''});
            });
            vuexContext.commit('setLoadingCustomerList',data);
            vuexContext.commit('setReportsMekmarLoadingListTotal',data);
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
    setMekmarGuSelectedUser(state, payload) {
        state.mekmarGuSelectedUser = payload;
    },
    setMekmarGuSellerOrderDetail(state, payload) {
        state.mekmarGuSellerOrderDetailListTotal = {
            'fob': 0,
            'ddp': 0,
            'navlun': 0,
            'detail1': 0,
            'detail2': 0,
            'detail3': 0,
            'detail4': 0,
        };
        state.mekmarGuSellerOrderDetailList = payload;
        payload.forEach(x => {
            state.mekmarGuSellerOrderDetailListTotal.fob += x.FOB;
            state.mekmarGuSellerOrderDetailListTotal.ddp += x.DDP;
            state.mekmarGuSellerOrderDetailListTotal.navlun += x.Navlun;
            state.mekmarGuSellerOrderDetailListTotal.detail1 += x.Detay1;
            state.mekmarGuSellerOrderDetailListTotal.detail2 += x.Detay2;
            state.mekmarGuSellerOrderDetailListTotal.detail3 += x.Detay3;
            state.mekmarGuSellerOrderDetailListTotal.detail4 += x.Detay4;
        });
    },
    setMekmarGuOrdererOperationList(state, payload) {
            state.reportsMekmarGuOrdererThisYear = [];
    state.reportsMekmarGuOrdererThisYearTotal = {
        'fob': 0,
        'ddp':0,
    };
    state.reportsMekmarGuOrdererPreviousYear = [];
    state.reportsMekmarGuOrdererPreviousYearTotal = {
        'fob': 0,
        'ddp':0,
    };
        state.reportsMekmarGuOrdererTwoYearAgo = [];
    state.reportsMekmarGuOrdererTwoYearAgoTotal = {
        'fob': 0,
        'ddp':0,
    };
        state.reportsMekmarGuOperationThisYear =  [];
        state.reportsMekmarGuOperationThisYearTotal= {
            'fob': 0,
            'ddp':0,
        };
        state.reportsMekmarGuOperationPreviousYear= [];
        state.reportsMekmarGuOperationPreviousYearTotal= {
            'fob': 0,
            'ddp':0,
        };
        state.reportsMekmarGuOperationTwoYearAgo= [],
        state.reportsMekmarGuOperationTwoYearAgoTotal= {
            'fob': 0,
            'ddp':0,
            };
        state.reportsMekmarGuOrdererThisYear = payload.thisYearOrderer;
        state.reportsMekmarGuOrdererPreviousYear = payload.previusYearOrderer;
        state.reportsMekmarGuOrdererTwoYearAgo = payload.twoYearOrderer;
        state.reportsMekmarGuOperationThisYear = payload.thisYearOperation;
        state.reportsMekmarGuOperationPreviousYear = payload.previusYearOperation;
        state.reportsMekmarGuOperationTwoYearAgo = payload.twoYearOperation;

        payload.thisYearOrderer.forEach(x => {
            state.reportsMekmarGuOrdererThisYearTotal.fob += x.FOB;
            state.reportsMekmarGuOrdererThisYearTotal.ddp += x.DDP;

        });
        payload.previusYearOrderer.forEach(x => {
            state.reportsMekmarGuOrdererPreviousYearTotal.fob += x.FOB;
            state.reportsMekmarGuOrdererPreviousYearTotal.ddp += x.DDP;
        });
                payload.twoYearOrderer.forEach(x => {
            state.reportsMekmarGuOrdererTwoYearAgoTotal.fob += x.FOB;
            state.reportsMekmarGuOrdererTwoYearAgoTotal.ddp += x.DDP;
                });
        
         payload.thisYearOperation.forEach(x => {
            state.reportsMekmarGuOperationThisYearTotal.fob += x.FOB;
            state.reportsMekmarGuOperationThisYearTotal.ddp += x.DDP;
         });
                 payload.previusYearOperation.forEach(x => {
            state.reportsMekmarGuOperationPreviousYearTotal.fob += x.FOB;
            state.reportsMekmarGuOperationPreviousYearTotal.ddp += x.DDP;
        });
                 payload.twoYearOperation.forEach(x => {
            state.reportsMekmarGuOperationTwoYearAgoTotal.fob += x.FOB;
            state.reportsMekmarGuOperationTwoYearAgoTotal.ddp += x.DDP;
        });
        

        /*Forw */
        state.reportsMekmarGuOrdererThisYearForw = [],
        state.reportsMekmarGuOrdererThisYearTotalForw = {
            'fob': 0,
            'ddp': 0,
            };
        state.reportsMekmarGuOrdererThisYearForw = payload.thisYearForwarding;
        payload.thisYearForwarding.forEach(x => {
                        state.reportsMekmarGuOrdererThisYearTotalForw.fob += x.FOB;
            state.reportsMekmarGuOrdererThisYearTotalForw.ddp += x.DDP;
        });
        
        
        
        state.reportsMekmarGuOrdererPreviousYearForw = [];
        state.reportsMekmarGuOrdererPreviousYearTotalForw = {
            'fob': 0,
            'ddp': 0,
        };

                state.reportsMekmarGuOrdererPreviousYearForw = payload.previousYearForwarding;
        payload.previousYearForwarding.forEach(x => {
                        state.reportsMekmarGuOrdererPreviousYearTotalForw.fob += x.FOB;
            state.reportsMekmarGuOrdererPreviousYearTotalForw.ddp += x.DDP;
        });



        state.reportsMekmarGuOrdererTwoYearAgoForw = [];
        state.reportsMekmarGuOrdererTwoYearAgoTotalForw = {
            'fob': 0,
            'ddp': 0,
        };

         state.reportsMekmarGuOrdererTwoYearAgoForw = payload.twoYearAgoForwarding;
        payload.twoYearAgoForwarding.forEach(x => {
                        state.reportsMekmarGuOrdererTwoYearAgoTotalForw.fob += x.FOB;
            state.reportsMekmarGuOrdererTwoYearAgoTotalForw.ddp += x.DDP;
        });





        state.reportsMekmarGuOperationThisYearForw = [];
        state.reportsMekmarGuOperationThisYearTotalForw = {
            'fob': 0,
            'ddp': 0,
        };

                 state.reportsMekmarGuOperationThisYearForw = payload.thisYearOperationForwarding;
        payload.thisYearOperationForwarding.forEach(x => {
                        state.reportsMekmarGuOperationThisYearTotalForw.fob += x.FOB;
            state.reportsMekmarGuOperationThisYearTotalForw.ddp += x.DDP;
        });



        state.reportsMekmarGuOperationPreviousYearForw = [];
    state.reportsMekmarGuOperationPreviousYearTotalForw =  {
        'fob': 0,
        'ddp':0,
        };
                         state.reportsMekmarGuOperationPreviousYearForw = payload.previousYearOperationForwarding;
        payload.previousYearOperationForwarding.forEach(x => {
                        state.reportsMekmarGuOperationPreviousYearTotalForw.fob += x.FOB;
            state.reportsMekmarGuOperationPreviousYearTotalForw.ddp += x.DDP;
        });
        state.reportsMekmarGuOperationTwoYearAgoForw = [];
        state.reportsMekmarGuOperationTwoYearAgoTotalForw = {
            'fob': 0,
            'ddp': 0,
        };
         state.reportsMekmarGuOperationTwoYearAgoForw = payload.twoYearAgoOperationForwarding;
        payload.twoYearAgoOperationForwarding.forEach(x => {
                        state.reportsMekmarGuOperationTwoYearAgoTotalForw.fob += x.FOB;
            state.reportsMekmarGuOperationTwoYearAgoTotalForw.ddp += x.DDP;
        });
        
        
        
    },
    setReportsMekmarMkList(state,payload){
        state.reportsMekmarMkList = payload;
    },
    setLoadingList(state,payload){
        state.reportsMekmarLoadingList = payload.list;
        state.reportsMekmarLoadingListYear = payload.yearly;
    },
    setLoadingCustomerList(state,payload){
        state.reportsMekmarLoadingList = payload;
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
        state.reportsMekmarGuAyoList = payload.ayoList;


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
    getMekmarGuSelectedUser(state) {
        return state.mekmarGuSelectedUser;  
    },
    getReportsMekmarGuOrdererThisYearForw(state) {
        return state.reportsMekmarGuOrdererThisYearForw;  
    },
    getReportsMekmarGuOrdererThisYearTotalForw(state) {
        return state.reportsMekmarGuOrdererThisYearTotalForw;
    },
    getReportsMekmarGuOrdererPreviousYearForw(state) {
        return state.reportsMekmarGuOrdererPreviousYearForw;
    },
    getReportsMekmarGuOrdererPreviousYearTotalForw(state) {
        return state.reportsMekmarGuOrdererPreviousYearTotalForw;
    },
    getReportsMekmarGuOrdererTwoYearAgoForw(state) {
        return state.reportsMekmarGuOrdererTwoYearAgoForw;
    },
    getReportsMekmarGuOrdererTwoYearAgoTotalForw(state) {
        return state.reportsMekmarGuOrdererTwoYearAgoTotalForw;
    },
    getreportsMekmarGuOperationThisYearForw(state) {
        return state.reportsMekmarGuOperationThisYearForw;
    },
    getReportsMekmarGuOperationThisYearTotalForw(state){
        return state.reportsMekmarGuOperationThisYearTotalForw;
    },
    getReportsMekmarGuOperationPreviousYearForw(state) {
        return state.reportsMekmarGuOperationPreviousYearForw;
    },
    getReportsMekmarGuOperationPreviousYearTotalForw(state) {
        return state.reportsMekmarGuOperationPreviousYearTotalForw;
    },
    getReportsMekmarGuOperationTwoYearAgoForw(state) {
        return state.reportsMekmarGuOperationTwoYearAgoForw;
    },
    getReportsMekmarGuOperationTwoYearAgoTotalForw(state) {
        return state.reportsMekmarGuOperationTwoYearAgoTotalForw;
    },



    getMekmarGuSellerOrderDetailListTotal(state) {
        return state.mekmarGuSellerOrderDetailListTotal;  
    },
    getMekmarGuSellerOrderDetailList(state) {
        return state.mekmarGuSellerOrderDetailList;  
    },
    getReportsMekmarGuOrdererThisYear(state) {
        return state.reportsMekmarGuOrdererThisYear;
    },
    getReportsMekmarGuOrdererThisYearTotal(state) {
        return state.reportsMekmarGuOrdererThisYearTotal;
    },
    getReportsMekmarGuOrdererPreviousYear(state) {
        return state.reportsMekmarGuOrdererPreviousYear;
    },
    getReportsMekmarGuOrdererPreviousYearTotal(state) {
        return state.reportsMekmarGuOrdererPreviousYearTotal;
    },
    getReportsMekmarGuOrdererTwoYearAgo(state) {
        return state.reportsMekmarGuOrdererTwoYearAgo;
    },
    getReportsMekmarGuOrdererTwoYearAgoTotal(state) {
        return state.reportsMekmarGuOrdererTwoYearAgoTotal;
    },
    getReportsMekmarGuOperationThisYear(state) {
        return state.reportsMekmarGuOperationThisYear;
    },
    getReportsMekmarGuOperationThisYearTotal(state) {
        return state.reportsMekmarGuOperationThisYearTotal;
    },
    getReportsMekmarGuOperationPreviousYear(state) {
        return state.reportsMekmarGuOperationPreviousYear;
    },
    getReportsMekmarGuOperationPreviousYearTotal(state) {
        return state.reportsMekmarGuOperationPreviousYearTotal;
    },
    getReportsMekmarGuOperationTwoYearAgo(state) {
        return state.reportsMekmarGuOperationTwoYearAgo;
    },
    getReportsMekmarGuOperationTwoYearAgoTotal(state) {
        return state.reportsMekmarGuOperationTwoYearAgoTotal;
    },








    getReportsMekmarGuAyoList(state) {
        return state.reportsMekmarGuAyoList;
    },
    getReportsMekmarMkList(state){
        return state.reportsMekmarMkList;
    },
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