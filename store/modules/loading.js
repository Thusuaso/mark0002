const state = {
    loading:false,
};
const actions = {
    setBeginLoadingAction(vuexContext) {
        vuexContext.commit('setBeginLoadingAction');
    },
    setEndLoadingAction(vuexContext) {
        vuexContext.commit('setEndLoadingAction');
    }
};
const mutations = {
    setBeginLoadingAction(state) {
        state.loading = true;
    },
    setEndLoadingAction(state) {
        state.loading = false;
    }
};
const getters = {
    getLoading(state) {
        return state.loading;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
}