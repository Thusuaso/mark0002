const state  = {
    list:[]
};
const actions = {
    setImportantLinkListAction(vuexContext){
        this.$axios.get('/important/link/list')
        .then(res=>{
            vuexContext.commit('setImportantLinkListMutation',res.data.list)
        });
    },
    setImportantLinkListSaveAction(vuexContext,payload){
        this.$axios.post('/important/link/save',payload).then(res=>{
            if(res.data.status){
                vuexContext.commit('addImportantLink',{...payload,'ID':res.data.id});
                this.$toast.success('Başarıyla Kaydedildi.');
            }
        });
    },
    setImportantLinkListUpdateAction(vuexContext,payload){
        this.$axios.put('/important/link/update',payload)
        .then(res=>{
            if(res.data.status){
                vuexContext.commit('updateImportantLink',payload);
                this.$toast.success('Başarıyla Kaydedildi.');

            }else{
                this.$toast.error('Kaydetme Başarısız');
            }
        });
    },
    setImportantLinkListDeleteAction(vuexContext,payload){
        this.$axios.delete(`/important/link/delete/${payload}`)
        .then(res=>{
            if(res.data.status){
                vuexContext.commit('deleteImportantLink',payload);
                this.$toast.success('Başarıyla Silindi.');
            }else{
                this.$toast.error('Silme Başarısız');
            }
        });
    }
};

const mutations = {
    setImportantLinkListMutation(state,payload){
        state.list = payload;
    },
    addImportantLink(state,payload){
        state.list.push(payload);
    },
    updateImportantLink(state,payload){
        const index = state.list.findIndex(x=>x.ID === payload.ID);
        if(index > -1){
            state.list.splice(index,1,payload);
        }
    },
    deleteImportantLink(state,payload){
        const index = state.list.findIndex(x=>x.ID === payload);
        if(index > -1){
            state.list.splice(index,1);
        }
    }

};
const getters = {
    getImportantLinkList(state){
        return state.list;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
}