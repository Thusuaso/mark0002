const state = {
    authorityStatus:false
};
const actions = {
    setAuthorityErrorMessage(vuexContext){
        vuexContext.commit('setAuthorityErrorMessage')
    },
    setAuthorityNavbarStatus(vuexContext,payload){
        vuexContext.commit('setAuthorityNavbarStatus',payload);
    }
}
const mutations = {
    setAuthorityErrorMessage(state){
        this.$toast.error('Unauthorized login detected.')
    },
    setAuthorityNavbarStatus(state,payload){
        state.authorityStatus = payload;
    }
}

const getters = {
    getAuthorityStatus(state){
        return state.authorityStatus;
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}