const state = {
    documentList:[],
    documentModelList:[],
    documentSupplierList:[],
    documentProductSupplierList:[],
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
        this.$axios.post('/upload/file',data)
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
    }

};
export default {
    state,
    actions,
    mutations,
    getters
}