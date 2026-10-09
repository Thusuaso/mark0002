const state = {
    documentList:[],
    documentModelList:[],
    documentSupplierList:[],
    documentProductSupplierList:[],
    missingDocumentList:[],
    missingDocumentOrderCount:0
};
const actions = {
    setDocumentList(vuexContext,po){
        this.$axios.get(`/upload/document/${po}`)
        .then(response=>{
            vuexContext.commit('setDocumentModelList',response.data.model);
        });
    },
    setDocumentModelList(vuexContext){
        this.$axios.get('/upload/model')
        .then(response=>{
            vuexContext.commit('setDocumentModelList',response.data.model);
        });
    },

    setSendDatabaseInvoice(vuexContext,data){
        return this.$axios.post('/upload/file',data)
        .then(response=>{
            if(response.data.status){
                
            }
        });
      },
    setDocumentSupplierList(vuexContext,po){
        this.$axios.get(`/upload/document/supplier/list/${po}`)
        .then(response=>{
            vuexContext.commit('setDocumentSupplierList',response.data.list);
        });
    },
    setDocumentProductSupplierList(vuexContext,po){
        this.$axios.get(`/upload/document/product/supplier/list/${po}`)
        .then(response=>{
            vuexContext.commit('setDocumentProductSupplierList',response.data.list);
        });
    },
    setDocumentSupplierSave(vuexContext,data){
        this.$axios.post('/upload/document/product/supplier/save',data)
        .then(response=>{
            if(response.data.status){
                this.$toast.success('Successfully Saved');
            }else{
                this.$toast.error('Error');
            }
        });
    },
    // Sevk edilmis siparislerde eksik kalan zorunlu evraklar (son 90 gun)
    setMissingDocumentList(vuexContext){
        this.$axios.get('/upload/document/missing/list')
        .then(response=>{
            vuexContext.commit('setMissingDocumentList',response.data.list);
            vuexContext.commit('setMissingDocumentOrderCount',response.data.list.length);
        })
        .catch(()=>{
            vuexContext.commit('setMissingDocumentList',[]);
            vuexContext.commit('setMissingDocumentOrderCount',0);
        });
    },
    setMissingDocumentOrderCount(vuexContext){
        this.$axios.get('/upload/document/missing/count')
        .then(response=>{
            vuexContext.commit('setMissingDocumentOrderCount',response.data.order);
        })
        .catch(()=>{
            vuexContext.commit('setMissingDocumentOrderCount',0);
        });
    }
};
const mutations = {

    setDocumentModelList(state,model){
        state.documentModelList = model;
    },
    setDocumentSupplierList(state,payload){
        state.documentSupplierList = payload;
    },
    setDocumentProductSupplierList(state,payload){
        state.documentProductSupplierList = payload;
    },
    setMissingDocumentList(state,payload){
        state.missingDocumentList = payload;
    },
    setMissingDocumentOrderCount(state,payload){
        state.missingDocumentOrderCount = payload;
    }
};
const getters = {

    getDocumentModelList(state){
        return state.documentModelList;
    },
    getDocumentSupplierList(state){
        return state.documentSupplierList;
    },
    getDocumentProductSupplierList(state){
        return state.documentProductSupplierList;
    },
    getMissingDocumentList(state){
        return state.missingDocumentList;
    },
    getMissingDocumentOrderCount(state){
        return state.missingDocumentOrderCount;
    }
};
export default {
    state,
    actions,
    mutations,
    getters
}