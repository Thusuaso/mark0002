const state = {

};
const actions = {
    setAuthorityErrorMessage(vuexContext){
        vuexContext.commit('setAuthorityErrorMessage')
    }
}
const mutations = {
    setAuthorityErrorMessage(state){
        this.$toast.error('Unauthorized login detected.')
    }
}

const getters = {

}

export default {
    state,
    actions,
    mutations,
    getters
}