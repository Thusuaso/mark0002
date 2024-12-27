const state = {
    cost:[],
    oldProductionDetail:{}
};
const actions = {
    addCost(vuexContext,payload){
        vuexContext.commit("addCost",payload);
    },
    updateCost(vuexContext,payload){
        
    },
    deleteCost(vuexContext,payload){

    },
    setOldProductionDetail(vuexContext,payload){
        vuexContext.commit("setOldProductionDetail",payload);
    },
    resetCostList(vuexContext){
        vuexContext.commit("resetCostList");

    }
};
const mutations = {
    resetCostList(state){
        state.cost = [];
    },
    addCost(state,payload){
        state.cost.push(payload);
    },
    updateCost(state,payload){
        const index = state.cost.findIndex(x=>x.id == payload.id);
        if(index > -1){
            state.cost.splice(index,1,payload);
        }
    },
    deleteCost(state,payload){
        const index = state.cost.findIndex(x=>x.id == payload.id);
        if(index > -1){
            state.cost.splice(index,1);
        }
    },
    setOldProductionDetail(state,payload){
        state.oldProductionDetail = payload;
    }
};
const getters = {
    getCostList(state){
        return state.cost;
    },
    getOldProductionDetail(state){
        return state.oldProductionDetail
    }
};

export default {
    state,
    actions,
    mutations,
    getters
}