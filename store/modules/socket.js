import { io } from "socket.io-client";

const state = {
  socket: null,
};
const actions = {
  setConnection(vuexContext) {
    vuexContext.commit("setConnection");
  },
  setDisconnect(vuexContext) {
    if (vuexContext.state.socket) {
      vuexConnect.commit("destroy");
    }
  },
};
const mutations = {
  setConnection(state) {
    // const url = "http://localhost:3001";
    const url = "https://goz.mekmar.com";
    state.socket = io(url, {
      transports: ["websocket", "polling"],
      path: "/socket.io/", // Varsayılan budur ama garanti olsun
    });
    state.socket.on("connect", () => {
      console.log("Socket connected:", this.socket.id);
    });
  },
  destroy(state) {
    state.socket.close();
    state.socket = null;
  },
};
const getters = {
  getSocket(state) {
    return state.socket;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
