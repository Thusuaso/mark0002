const state = {
    documentList:[],
    documentModelList:[],
    docForm:[],
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
    setDocumentForm(vuexContext,data){
        this.$axios.get(`/upload/document/form/${data.SiparisNo}/${data.ID}`)
        .then(response=>{
            vuexContext.commit('setDocumentForm',response.data.doc);
        });
    },
    setSendDatabaseInvoice(vuexContext,data){
        this.$axios.post('/upload/file',data)
        .then(response=>{
            if(response.data.status){
                
            }
        });
      }
};
const mutations = {

    setDocumentModelList(state,model){
        state.documentModelList = model;
    },
    setDocumentForm(state,doc){
        state.docForm = doc;
    }
};
const getters = {

    getDocumentModelList(state){
        return state.documentModelList;
    },
    getDocForm(state){
        return state.docForm;
    }
};
export default {
    state,
    actions,
    mutations,
    getters
}