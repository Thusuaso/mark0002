const state = {
  homeList: {},
};
const actions = {
  async getHome(vuexContext) {
    await this.$axios.get("/home").then((response) => {
      vuexContext.commit("getHome", response.data);
    });
  },
};
const mutations = {
  getHome(state, payload) {
    state.homeList = payload;
  },
};
const getters = {
  getHomeList(state) {
    return state.homeList;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
