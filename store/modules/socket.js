import { io } from "socket.io-client";

/* Liste tazeleme yayinlari icin kullanilan socket baglantisi.
   Sohbet ve online durumu AYRI bir baglanti kullanir (store/modules/chat.js);
   boylece sayfalar setConnection cagirip bu baglantiyi yenilediginde sohbet
   kesilmez. Sunucu, ayni kullanicinin birden fazla baglantisini tek online
   kullanici olarak sayar (bkz. api/server.js). */
export function tokenOku() {
  if (typeof document === "undefined") {
    return null;
  }
  const bulunan = document.cookie
    .split(";")
    .find((c) => c.trim().startsWith("token="));
  return bulunan ? bulunan.split("=")[1] : null;
}

export function socketUrl(ctx) {
  const yapilandirma = ctx && ctx.$config;
  if (yapilandirma && yapilandirma.socketUrl) {
    return yapilandirma.socketUrl;
  }
  return "http://localhost:3001";
}

const state = {
  socket: null,
};
const actions = {
  setConnection(vuexContext) {
    /* Sunucu tarafinda socket kurulmaz; SSR sirasinda baglanti acilirsa
       her istekte sunucuda bir baglanti sizardi. */
    if (process.server) {
      return;
    }
    /* Onceki baglanti kapatilir. Eskiden her setConnection cagrisi yeni bir
       socket olusturup oncekini kapatmadan birakiyordu; sayfalar arasinda
       gezindikce baglantilar birikiyordu. */
    if (vuexContext.state.socket) {
      vuexContext.commit("destroy");
    }
    const socket = io(socketUrl(this), {
      transports: ["websocket", "polling"],
      path: "/socket.io/", // Varsayılan budur ama garanti olsun
      auth: { token: tokenOku() },
    });
    socket.on("connect", () => {
      /* Eskiden burada this.socket.id okunuyordu; arrow function icinde
         "this" socket olmadigi icin her baglantida hata atiyordu. */
      console.log("Socket connected:", socket.id);
    });
    vuexContext.commit("setConnection", socket);
  },
  setDisconnect(vuexContext) {
    /* Eskiden tanimsiz bir "vuexConnect" degiskenine commit ediliyordu,
       bu yuzden cagrildiginda hata veriyordu. */
    if (vuexContext.state.socket) {
      vuexContext.commit("destroy");
    }
  },
};
const mutations = {
  setConnection(state, socket) {
    state.socket = socket;
  },
  destroy(state) {
    if (state.socket) {
      state.socket.close();
    }
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
