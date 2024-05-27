const state = {
    loading: false,
    loadingDatatable:false,
};
const actions = {
    setBeginLoadingAction(vuexContext) {
        vuexContext.commit('setBeginLoadingAction');
    },
    setEndLoadingAction(vuexContext) {
        vuexContext.commit('setEndLoadingAction');
    },
    setBeginLoadingDatatableAction(vuexContext) {
        vuexContext.commit('setBeginLoadingDatatableAction');
    },
    setEndLoadingDatatableAction(vuexContext) {
        vuexContext.commit('setEndLoadingDatatableAction');
    }
};
const mutations = {
    setBeginLoadingAction(state) {
        state.loading = true;
    },
    setEndLoadingAction(state) {
        state.loading = false;
    },
    setBeginLoadingDatatableAction(state) {
        state.loadingDatatable = true;
    },
    setEndLoadingDatatableAction(state) {
        state.loadingDatatable = false;
    }
};
const getters = {
    getLoading(state) {
        return state.loading;
    },
    getLoadingDatatable(state) {
        return state.loadingDatatable;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
}