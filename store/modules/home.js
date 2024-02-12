const state = {
    homeList:{}
};
const actions = {
    getHome(vuexContext){
        this.$axios.get('/home')
        .then(response=>{
            vuexContext.commit('getHome',response.data)
        })
    }
};
const mutations = {
    getHome(state,payload){
        state.homeList = payload;
    }
};
const getters = {
    getHomeList(state){
        return state.homeList;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
}