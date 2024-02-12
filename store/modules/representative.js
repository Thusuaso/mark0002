const state = {
    representativeList:[],
    totalRepresentative:[],
    totalOperation:[],
};
const actions = {
    setRepresentativeList(vuexContext){
        this.$axios.get('/sales/representative/list')
        .then(response=>{
            vuexContext.commit('setRepresentativeList',response.data);
        });
    },
    setRepresentativeChange(vuexContext,representative){
        this.$axios.put('/sales/representative/change',representative)
        .then(response=>{
            if(response.data.status){
                vuexContext.dispatch('setRepresentativeList');
                this.$toast.success('Başarıyla Güncellendi.');
            } else{
                this.$toast.error('Güncelleme Başarısız.');
            }
        });
    }
};
const mutations = {
    setRepresentativeList(state,representative){
        state.representativeList = representative.representative;
        state.totalRepresentative = representative.totalRepresentative;
        state.totalOperation = representative.totalOperation;
    },
};
const getters = {
    getRepresentativeList(state){
        return state.representativeList;
    },
    getTotalRepresentative(state){
        return state.totalRepresentative;
    },
    getTotalOperation(state){
        return state.totalOperation;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
}