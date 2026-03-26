const state = () => ({
  list: [],
  po: [],
  product: [],
  model: {
    ID: 0,
    Po: "",
    Logistic: false,
    Custom: false,
    Fumigation: false,
    Port: false,
    Insurance: false,
    Lashing: false,
    Spanzlet: false,
    Freight: false,
  },
  supplier: [],
});

const actions = {
  setMekmarCostList({ commit }, payload) {
    commit("setMekmarCostCommitList", payload);
  },
  setMekmarCostModel({ commit }, payload) {
    commit("setMekmarCostModelCommit", payload);
  },
};

const mutations = {
  setMekmarCostCommitList(state, payload) {
    state.list = payload.list || [];
    state.po = payload.po || [];
    state.product = payload.product || [];
    state.supplier = payload.supplier || [];
  },
  setMekmarCostModelCommit(state, payload) {
    state.model = { ...state.model, ...payload };
  },
};

const getters = {
  getMekmarCostList: (state) => {
    return state.list;
  },
  getMekmarPoList: (state) => {
    return state.po;
  },
  getMekmarProductList: (state) => {
    return state.product;
  },
  getMekmarCostModel: (state) => {
    return state.model;
  },
  getMekmarSupplier: (state) => {
    return state.supplier;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
