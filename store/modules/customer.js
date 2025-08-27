const state = {
  mekmarList: [],
  mekmarButtonStatus: false,
  mekmarDetailOrdersList: [],
  mekmarDetailOrdersPoList: [],
  mekmarDetailOrdersPoProductsList: [],
  offerCustomerList: [],
  offerCustomerButtonStatus: false,
  bgpCustomerList: [],
  bgpCustomerButtonStatus: false,
  fairCustomerList: [],
  fairCustomerButtonStatus: false,
  selectionCustomerList: [],
  selectionCustomerButtonStatus: false,
};
const actions = {
  setMekmarList(vuexContext) {
    vuexContext.dispatch("setBeginLoadingAction");
    this.$axios.get("/customer/mekmar/list").then((response) => {
      vuexContext.commit("setMekmarList", response.data.list);
      vuexContext.dispatch("setEndLoadingAction");
    });
  },
  setMekmarButtonStatus(vuexContext, status) {
    vuexContext.commit("setMekmarButtonStatus", status);
  },
  setMekmarDetailOrdersList(vuexContext, id) {
    this.$axios.get(`/customer/mekmar/detail/orders/${id}`).then((response) => {
      vuexContext.commit("setMekmarDetailOrdersList", response.data);
    });
  },
  setMekmarDetailOrdersPoList(vuexContext, value) {
    this.$axios
      .get(
        `/customer/mekmar/detail/orders/po/${value.customerid}/${value.year}`
      )
      .then((response) => {
        vuexContext.commit("setMekmarDetailOrdersPoList", response.data.poList);
      });
  },
  setMekmarDetailOrdersPoProductsList(vuexContext, po) {
    this.$axios
      .get(`/customer/mekmar/detail/orders/products/${po}`)
      .then((response) => {
        vuexContext.commit(
          "setMekmarDetailOrdersPoProductsList",
          response.data.products
        );
      });
  },
  setMekmarCustomerSave(vuexContext, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.post("/customer/mekmar/save", payload).then((response) => {
        if (response.data.status == 1) {
          this.$toast.success("Başarıyla Kaydedildi.");
          vuexContext.dispatch("setMekmarList");
          resolve(true);
        } else {
          this.$toast.error("Kaydetme Başarışız.");
          resolve(false);
        }
      });
    });
  },
  setMekmarCustomerDelete(vuexContext, id) {
    this.$axios.delete(`/customer/mekmar/delete/${id}`).then((response) => {
      if (response.data.status) {
        this.$toast.success("Başarıyla Silindi.");
        vuexContext.dispatch("setMekmarList");
      } else {
        this.$toast.error("Silme Başarışız.");
      }
    });
  },
  setMekmarCustomerUpdate(vuexContext, payload) {
    this.$axios.put("/customer/mekmar/update", payload).then((response) => {
      if (response.data.status) {
        this.$toast.success("Başarıyla Güncellendi.");
        vuexContext.dispatch("setMekmarList");
      } else {
        this.$toast.error("Güncelleme Başarısız.");
      }
    });
  },
  setOfferCustomerList(vuexContext) {
    vuexContext.dispatch("setBeginLoadingAction");
    this.$axios.get("/customer/offer/list").then((response) => {
      vuexContext.commit("setOfferCustomerList", response.data.list);
      vuexContext.dispatch("setEndLoadingAction");
    });
  },
  setOfferCustomerButtonStatus(vuexContext, payload) {
    vuexContext.commit("setOfferCustomerButtonStatus", payload);
  },
  setOfferCustomerSave(vuexContext, payload) {
    this.$axios.post("/customer/offer/save", payload).then((response) => {
      if (response.data.status) {
        vuexContext.dispatch("setOfferCustomerList");
        this.$toast.success("Başarıyla Kaydedildi.");
      } else {
        this.$toast.error("Kaydetme Başarısız.");
      }
    });
  },
  setOfferCustomerDelete(vuexContext, id) {
    this.$axios.delete(`/customer/offer/delete/${id}`).then((response) => {
      if (response.data.status) {
        vuexContext.dispatch("setOfferCustomerList");
        this.$toast.success("Başarıyla Silindi.");
      } else {
        this.$toast.error("Silme Başarısız.");
      }
    });
  },
  setOfferCustomerUpdate(vuexContext, payload) {
    this.$axios.put("/customer/offer/update", payload).then((response) => {
      if (response.data.status) {
        vuexContext.dispatch("setOfferCustomerList");
        this.$toast.success("Başarıyla Güncellendi.");
      } else {
        this.$toast.error("Başarıyla Güncellendi.");
      }
    });
  },
  setBgpCustomerList(vuexContext) {
    vuexContext.dispatch("setBeginLoadingAction");
    this.$axios.get("/customer/bgp/list").then((response) => {
      vuexContext.commit("setBgpCustomerList", response.data.list);
      vuexContext.dispatch("setEndLoadingAction");
    });
  },
  setBgpCustomerButtonStatus(vuexContext, payload) {
    vuexContext.commit("setBgpCustomerButtonStatus", payload);
  },
  setBgpCustomerDelete(vuexContext, id) {
    this.$axios.delete(`/customer/bgp/delete/${id}`).then((response) => {
      if (response.data.status) {
        vuexContext.dispatch("setBgpCustomerList");
        this.$toast.success("Başarıyla Silindi.");
      } else {
        this.$toast.error("Silme İşlemi Başarısız.");
      }
    });
  },
  setBgpCustomerSave(vuexContext, payload) {
    this.$axios.post(`/customer/bgp/save`, payload).then((response) => {
      if (response.data.status) {
        vuexContext.dispatch("setBgpCustomerList");
        this.$toast.success("Başarıyla Kaydedildi.");
      } else {
        this.$toast.error("Kaydetme Başarısız.");
      }
    });
  },
  setBgpCustomerUpdate(vuexContext, payload) {
    this.$axios.put("/customer/bgp/update", payload).then((response) => {
      if (response.data.status) {
        vuexContext.dispatch("setBgpCustomerList");
        this.$toast.success("Başarıyla Güncellendi.");
      } else {
        this.$toast.error("Güncelleme Başarısız.");
      }
    });
  },
  setFairCustomerList(vuexContext) {
    vuexContext.dispatch("setBeginLoadingAction");
    this.$axios.get("/customer/fair/list").then((response) => {
      vuexContext.commit("setFairCustomerList", response.data.list);
      vuexContext.dispatch("setEndLoadingAction");
    });
  },
  setFairCustomerButtonStatus(vuexContext, payload) {
    vuexContext.commit("setFairCustomerButtonStatus", payload);
  },
  setFairCustomerSave(vuexContext, payload) {
    this.$axios.post("/customer/fair/save", payload).then((response) => {
      if (response.data.status) {
        vuexContext.dispatch("setFairCustomerList");
        this.$toast.success("Başarıyla Kaydedildi.");
      } else {
        this.$toast.error("Kaydetme Başarısız.");
      }
    });
  },
  setFairCustomerDelete(vuexContext, id) {
    this.$axios.delete(`/customer/fair/delete/${id}`).then((response) => {
      if (response.data.status) {
        vuexContext.dispatch("setFairCustomerList");
        this.$toast.success("Başarıyla Silindi.");
      } else {
        this.$toast.error("Silme İşlemi başarısız");
      }
    });
  },
  setFairCustomerUpdate(vuexContext, payload) {
    this.$axios.put("/customer/fair/update", payload).then((response) => {
      if (response.data.status) {
        vuexContext.dispatch("setFairCustomerList");
        this.$toast.success("Başarıyla Güncellendi.");
      } else {
        this.$toast.error("Güncelleme Başarısız.");
      }
    });
  },
  setSelectionCustomerList(vuexContext, userId) {
    vuexContext.dispatch("setBeginLoadingAction");
    this.$axios.get(`/customer/selection/list/${userId}`).then((response) => {
      vuexContext.commit("setSelectionCustomerList", response.data.list);
      vuexContext.dispatch("setEndLoadingAction");
    });
  },
  setSelectionCustomerButtonStatus(vuexContext, payload) {
    vuexContext.commit("setSelectionCustomerButtonStatus", payload);
  },
  setSelectionCustomerSave(vuexContext, payload) {
    this.$axios.post("/customer/selection/save", payload).then((response) => {
      if (response.data.status) {
        vuexContext.dispatch("setSelectionCustomerList", payload.UserId);
        vuexContext.dispatch("setSelectionSurfaces");
        this.$toast.success("Başarıyla Eklendi.");
      } else {
        this.$toast.error("Ekleme Başarısız");
      }
    });
  },
  setSelectionCustomerDelete(vuexContext, id) {
    this.$axios.delete(`/customer/selection/delete/${id}`).then((response) => {
      if (response.data.status) {
        this.$toast.success("Başarıyla Silindi.");
      } else {
        this.$toast.error("Silme Başarısız.");
      }
    });
  },
  setSelectionCustomerUpdate(vuexContext, payload) {
    this.$axios.put("/customer/selection/update", payload).then((response) => {
      if (response.data.status) {
        vuexContext.dispatch("setSelectionCustomerList", payload.UserId);
        this.$toast.success("Başarıyla Güncellendi.");
      } else {
        this.$toast.error("Güncelleme Başarısız.");
      }
    });
  },
};
const mutations = {
  setMekmarList(state, payload) {
    state.mekmarList = payload;
  },
  setMekmarButtonStatus(state, payload) {
    state.mekmarButtonStatus = payload;
  },
  setMekmarDetailOrdersList(state, payload) {
    let data = [];
    for (const item of payload.yearList) {
      const order = {
        year: item.Year,
        customerid: item.CustomerId,
        total: 0,
      };
      for (const item2 of payload.orderList) {
        if (item.Year == item2.Year) {
          order.total += item2.Total;
        }
      }
      data.push(order);
    }
    state.mekmarDetailOrdersList = data;
  },
  setMekmarDetailOrdersPoList(state, payload) {
    state.mekmarDetailOrdersPoList = payload;
  },
  setMekmarDetailOrdersPoProductsList(state, payload) {
    state.mekmarDetailOrdersPoProductsList = payload;
  },
  setOfferCustomerList(state, payload) {
    state.offerCustomerList = payload;
  },
  setOfferCustomerButtonStatus(state, payload) {
    state.offerCustomerButtonStatus = payload;
  },
  setBgpCustomerList(state, payload) {
    state.bgpCustomerList = payload;
  },
  setBgpCustomerButtonStatus(state, payload) {
    state.bgpCustomerButtonStatus = payload;
  },
  setFairCustomerList(state, payload) {
    state.fairCustomerList = payload;
  },
  setFairCustomerButtonStatus(state, payload) {
    state.fairCustomerButtonStatus = payload;
  },
  setSelectionCustomerList(state, payload) {
    state.selectionCustomerList = payload;
  },
  setSelectionCustomerButtonStatus(state, payload) {
    state.selectionCustomerButtonStatus = payload;
  },
};
const getters = {
  getMekmarList(state) {
    return state.mekmarList;
  },
  getMekmarButtonStatus(state) {
    return state.mekmarButtonStatus;
  },
  getMekmarDetailOrdersList(state) {
    return state.mekmarDetailOrdersList;
  },
  getMekmarDetailOrdersPoList(state) {
    return state.mekmarDetailOrdersPoList;
  },
  getSetMekmarDetailOrdersPoProductsList(state) {
    return state.mekmarDetailOrdersPoProductsList;
  },
  getOfferCustomerList(state) {
    return state.offerCustomerList;
  },
  getOfferCustomerButtonStatus(state) {
    return state.offerCustomerButtonStatus;
  },
  getBgpCustomerList(state) {
    return state.bgpCustomerList;
  },
  getBgpCustomerButtonStatus(state) {
    return state.bgpCustomerButtonStatus;
  },
  getFairCustomerList(state) {
    return state.fairCustomerList;
  },
  getFairCustomerButtonStatus(state) {
    return state.fairCustomerButtonStatus;
  },
  getSelectionCustomerList(state) {
    return state.selectionCustomerList;
  },
  getSelectionCustomerButtonStatus(state) {
    return state.selectionCustomerButtonStatus;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
