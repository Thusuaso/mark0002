const state = {
    countryList:[],
    userList:[],
    ordersList:[],
    ordersAllList:[],
    cardList:[],
    supplierList:[],
    mineList:[],
    cardCategoryList:[],
    cardProductsList:[],
    cardSurfacesList:[],
    cardSizesList: [],
    selectionSurfaces: [],
    orderYearList: [],
    customersOfferList: [],
    sampleCategoryList: [],
    sampleUnitList: [],
    sampleSendingList: [],
    sampleBankAccountTypeList: [],
    offerCategoryList: [],
    offerProductList: [],
    offerSizeList: [],
    offerThicknessList: [],
    offerSurfaceList: [],
    offerUnitList: [],
    panelProductSize:[],
    panelProductFinish: [],
    panelProductColor: [],
    panelProductArea: [],
    panelProductStyle: [],
    panelProductType: [],
    panelProductMaterial: [],
    panelProductEdge:[],
    customersList: [],
    unitList:[],
    orderKindOfDeliveryList: [],
    orderKindOfPaymentList: [],
    orderKindOfInvoiceList:[],
    orderKindOfDeliverySupplierList:[],
    yearList:[],
    monthList:[],
    orderProductionList:[],
    orderProductionProductNormalList:[],

    

};
const actions = {

    setOrderProductionProductListNormal(vuexContext,po){
        console.log(po);
        this.$axios.get(`/order/products/normal/${po}`)
        .then(response=>{
            vuexContext.commit('setOrderProductionProductListNormal',response.data.products)
        })
    },

    setOrderProductionList(vuexContext){
        this.$axios.get('/orders/production/list')
        .then(response=>{
            vuexContext.commit('setOrderProductionList',response.data.list);
        });
    },
    setCountryList(vuexContext){
        this.$axios.get('/country')
            .then(response => {
            vuexContext.commit('setCountryList',response.data.data);
        });
    },
    setUserList(vuexContext){
        this.$axios.get('/users')
        .then(response=>{
            vuexContext.commit('setUserList',response.data.users);
        });
    },
    setOrderList(vuexContext){
        this.$axios.get('/orders')
        .then(response=>{
            vuexContext.commit('setOrderList',response.data.orders);
        })
    },
    setCardList(vuexContext) {
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.get('/cards')
        .then(response=>{
            vuexContext.commit('setCardList', response.data.cards);
            vuexContext.dispatch('setEndLoadingAction');
        });
    },
    setSupplierList(vuexContext) {
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.get('/suppliers')
        .then(response=>{
            vuexContext.commit('setSupplierList', response.data.suppliers);
            vuexContext.dispatch('setEndLoadingAction');
        })
    },
    setMineList(vuexContext){
        this.$axios.get('/mines')
        .then(response=>{
            vuexContext.commit('setMineList',response.data.mines);
            
        });
    },
    setCardCategoryList(vuexContext){
        this.$axios.get('/cardcategories')
        .then(response=>{
            vuexContext.commit('setCardCategoryList',response.data.categories);
        });
    },
    setCardProductsList(vuexContext){
        this.$axios.get('/cardproducts')
        .then(response=>{
            vuexContext.commit('setCardProductsList',response.data.products);
            
        });
    },
    setCardSurfacesList(vuexContext){
        this.$axios.get('/cardsurfaces')
        .then(response=>{
           vuexContext.commit('setCardSurfacesList',response.data.surfaces); 
        });
    },
    setCardSizesList(vuexContext){
        this.$axios.get('/cardsizes')
        .then(response=>{
            vuexContext.commit('setCardSizesList',response.data.sizes);
        });
    },
    setOrderAllList(vuexContext){
        this.$axios.get('/orders/all')
        .then(response=>{
           vuexContext.commit('setOrderAllList',response.data.orders) 
        });
    },
    setSelectionSurfaces(vuexContext) {
        this.$axios.get('/selection/surfaces')
            .then(response => {
                vuexContext.commit('setSelectionSurfaces', response.data.surfaces);
            })
    },
    setOrderYearList(vuexContext,payload) {
       vuexContext.commit('setOrderYearList',payload)
    },
    setCustomersOfferList(vuexContext) {
        this.$axios.get('/customer/offer/list/all')
            .then(response => {
            vuexContext.commit('setCustomersOfferList', response.data.list);
        })
    },
    setSampleCategoryList(vuexContext) {
        this.$axios.get('/sample/category/list')
            .then(response => {
                vuexContext.commit('setSampleCategoryList', response.data.list);
            }); 
    },
    setSampleUnitList(vuexContext) {
        this.$axios.get('/sample/unit/list')
            .then(response => {
                vuexContext.commit('setSampleUnitList', response.data.list); 
            });
    },
    setSampleSendingTypeList(vuexContext) {
        this.$axios.get('/sample/sending/type/list')
            .then(response => {
                vuexContext.commit('setSampleSendingTypeList', response.data.list); 
            });
    },
    setSampleBankAccountTypeList(vuexContext) {
        this.$axios.get('/sample/bank/account/type/list')
            .then(response => {
                vuexContext.commit('setSampleBankAccountTypeList', response.data.list); 
            });
    },
    setOfferSharedList(vuexContext) {
        this.$axios.get('/offer/shared/list')
            .then(response => {
                vuexContext.commit('setOfferSharedList', response.data); 
            });
    },
    setPanelProductSharedList(vuexContext) {
        this.$axios.get('/panel/product/shared/list')
            .then(response => {
                vuexContext.commit('setPanelProductSharedList', response.data);
            })
    },
    setCustomerList(vuexContext) {
        this.$axios.get('/customers/list')
            .then(response => {
                vuexContext.commit('setCustomerList', response.data.list); 
            });
    },
    setUnitList(vuexContext) {
        this.$axios.get('/unit/list')
            .then(response => {
                vuexContext.commit('setUnitList', response.data.list);
                
            });
    },
    setOrderKindOfDeliveryList(vuexContext) {
        this.$axios.get('/order/kind/of/delivery')
        .then(response=>{
            vuexContext.commit('setOrderKindOfDeliveryList', response.data.list); 
        });
    },
    setOrderKindOfPaymentList(vuexContext) {
        this.$axios.get('/order/kind/of/payment')
            .then(response => {
                vuexContext.commit('setOrderKindOfPaymentList', response.data.list);

            });
    },
    setOrderKindOfInvoiceList(vuexContext) {
        this.$axios.get('/order/kind/of/invoice')
            .then(response => {
                vuexContext.commit('setOrderKindOfInvoiceList', response.data.list);
            });
    },
    setOrderKindOfDeliverySupplierList(vuexContext){
        this.$axios.get('/order/kind/of/delivery/supplier')
            .then(response => {
                vuexContext.commit('setOrderKindOfDeliverySupplierList', response.data.list);
            });
    },
    setYearList(vuexContext){
        this.$axios.get('/year/list')
        .then(response=>{
            vuexContext.commit('setYearList',response.data.list);
        })
    },
    setMonthList(vuexContext){
        this.$axios.get('/month/list')
        .then(response=>{
            vuexContext.commit('setMonthList',response.data.list);
        })
    },
    setShipmentDropProducts(vuexContext,id){
        vuexContext.commit('setShipmentDropProducts',id);
    
    }


    


};
const mutations = {
    setShipmentDropProducts(state,payload){

        const index = state.orderProductionProductNormalList.findIndex(x=>x.ID == payload);
        state.orderProductionProductNormalList.splice(index,1);
    },
    setOrderProductionProductListNormal(state,payload){
        state.orderProductionProductNormalList = payload;
    },
    setOrderProductionList(state,payload){
        state.orderProductionList = payload;
    },
    setCountryList(state,payload){
        state.countryList = payload;
    },
    setUserList(state,payload){
        state.userList = payload;
    },
    setOrderList(state,payload){
        state.ordersList = payload;
    },
    setOrderAllList(state,payload){
      state.ordersAllList = payload; 
    },
    setCardList(state,payload){
        state.cardList = payload;
    },
    setSupplierList(state,payload){
        state.supplierList = payload;
    },
    setMineList(state,payload){
        state.mineList = payload;
    },
    setCardCategoryList(state,payload){
        state.cardCategoryList = payload;
    },
    setCardProductsList(state,payload){
        state.cardProductsList = payload;
    },
    setCardSurfacesList(state,payload){
        state.cardSurfacesList = payload
    },
    setCardSizesList(state,payload){
        state.cardSizesList = payload;
    },
    setSelectionSurfaces(state, payload) {
        state.selectionSurfaces = payload;
    },
    setOrderYearList(state, payload) {
        state.orderYearList = payload;
    },
    setCustomersOfferList(state, payload) {
        state.customersOfferList = payload;
    },
    setSampleCategoryList(state, payload) {
        state.sampleCategoryList = payload;
    },
    setSampleUnitList(state, payload) {
        state.sampleUnitList = payload;
    },
    setSampleSendingTypeList(state, payload) {
        state.sampleSendingList = payload;
    },
    setSampleBankAccountTypeList(state, payload) {
        state.sampleBankAccountTypeList = payload;
    },
    setOfferSharedList(state, payload) {
       state.offerCategoryList = payload.category;
    state.offerProductList = payload.product;
    state.offerSizeList = payload.size;
    state.offerThicknessList = payload.thickness;
    state.offerSurfaceList = payload.surface;
    state.offerUnitList = payload.unit;
    },
    setPanelProductSharedList(state, payload) {
            state.panelProductSize = payload.size;
            state.panelProductFinish = payload.finish;
            state.panelProductColor = payload.color;
            state.panelProductArea = payload.area;
            state.panelProductStyle = payload.style;
            state.panelProductType = payload.type;
        state.panelProductMaterial = payload.material;
        state.panelProductEdge = payload.edge;
    },
    setCustomerList(state, payload) {
        state.customersList = payload;
    },
    setUnitList(state, payload) {
        state.unitList = payload;
    },
    setOrderKindOfDeliveryList(state, payload) {
        state.orderKindOfDeliveryList = payload;
    },
    setOrderKindOfPaymentList(state, payload) {
        state.orderKindOfPaymentList = payload;
    },
    setOrderKindOfInvoiceList(state, payload) {
        state.orderKindOfInvoiceList = payload;
    },
    setOrderKindOfDeliverySupplierList(state, payload) {
        state.orderKindOfDeliverySupplierList = payload;
    },
    setYearList(state,payload){
        state.yearList = payload;
    },
    setMonthList(state,payload){
        state.monthList = payload;
    }

    


};
const getters = {
    getOrderProductionProductNormalList(state){
        return state.orderProductionProductNormalList;
    },
    getOrderProductionList(state){
        return state.orderProductionList;
    },
    getCountryList(state){
        return state.countryList;
    },
    getUserList(state){
        return state.userList;
    },
    getOrdersList(state){
        return state.ordersList;
    },
    getOrdersAllList(state){
      return state.ordersAllList;  
    },
    getCardList(state){
        return state.cardList;
    },
    getSupplierList(state){
        return state.supplierList;
    },
    getMineList(state){
        return state.mineList;
    },
    getCardCategoryList(state){
        return state.cardCategoryList;
    },
    getCardProductsList(state){
        return state.cardProductsList;
    },
    getCardSurfacesList(state){
        return state.cardSurfacesList;
    },
    getCardSizesList(state){
        return state.cardSizesList;  
    },
    getSelectionSurfaces(state) {
        return state.selectionSurfaces;
    },
    getOrderYearList(state) {
        return state.orderYearList;
    },
    getCustomersOfferList(state) {
        return state.customersOfferList;
    },
    getSampleCategoryList(state) {
        return state.sampleCategoryList;
    },
    getSampleUnitList(state) {
        return state.sampleUnitList;
    },
    getSampleSendingList(state) {
        return state.sampleSendingList;
    },
    getSampleBankAccountTypeList(state) {
        return state.sampleBankAccountTypeList;
    },
    getOfferCategoryList(state) {
        return state.offerCategoryList;
    },
    getOfferProductList(state) {
        return state.offerProductList;
    },
    getOfferSizeList(state) {
        return state.offerSizeList;
    },
    getOfferThicknessList(state) {
        return state.offerThicknessList;
    },
    getOfferSurfaceList(state) {
        return state.offerSurfaceList;
    },
    getOfferUnitList(state) {
        return state.offerUnitList;
    },

    getPanelProductSize(state) {
        return state.panelProductSize;
    },
    getPanelProductFinish(state) {
        return state.panelProductFinish;
        
    },
    getPanelProductColor(state){
        return state.panelProductColor;
        
    },
    getPanelProductArea(state){
        return state.panelProductArea;
        
    },
    getPanelProductStyle(state){
        return state.panelProductStyle;
        
    },
    getPanelProductType(state){
        return state.panelProductType;
        
    },
    getPanelProductMaterial(state){
        return state.panelProductMaterial;
    },
    getPanelProductEdge(state){
        return state.panelProductEdge;
    },
    getCustomersList(state) {
        return state.customersList;
    },
    getUnitList(state) {
        return state.unitList;
    },
    getOrderKindOfDeliveryList(state) {
        return state.orderKindOfDeliveryList;
    },
    getOrderKindOfPaymentList(state) {
        return state.orderKindOfPaymentList;
    },
    getOrderKindOfInvoiceList(state) {
        return state.orderKindOfInvoiceList;
    },
    getOrderKindOfDeliverySupplierList(state) {
        return state.orderKindOfDeliverySupplierList;
    },
    getYearList(state){
        return state.yearList;
    },
    getMonthList(state){
        return state.monthList;
    },





};

export default {
    state,
    actions,
    mutations,
    getters
}