import { io } from "socket.io-client";
import { tokenOku, socketUrl } from "./socket";

/* Sirket ici birebir sohbet ve online durumu.

   Kendi socket baglantisini kurar (store/modules/socket.js'teki liste
   tazeleme baglantisindan bagimsiz): o baglanti sayfa gezintilerinde
   yenileniyor, sohbetin ise layout boyunca ayakta kalmasi gerekiyor.
   Sunucu ayni kullanicinin birden fazla baglantisini tek online kullanici
   sayar, bu yuzden iki baglanti online gostergesini bozmaz. */

/* Cevrimici bildiriminin tekrarini engeller: { userId -> son bildirim ms }.
   Vuex state'inde tutulmasi gerekmez, arayuzde gosterilmiyor. */
const BILDIRIM_BEKLEME_MS = 5 * 60 * 1000;
const sonBildirim = new Map();

const state = {
  socket: null,
  users: [],          // sohbet edilebilecek kullanicilar
  online: [],         // online kullanici ID'leri
  aktiflik: {},       // { userId: ISO tarih } son gercek etkileşim
  activeUserId: null, // acik olan yazisma
  messages: [],       // acik yazismanin mesajlari
  loadingHistory: false,
  dahaVar: false,
  ready: true,        // SohbetMesajTB kurulu mu
  dosyaReady: false,  // goruntu eki gonderilebilir mi (kolonlar + depo)
  panelOpen: false,
};

const actions = {
  /* Layout'tan bir kez cagrilir. */
  setChatConnection(vuexContext) {
    if (process.server || vuexContext.state.socket) {
      return;
    }
    const token = tokenOku();
    if (!token) {
      return; // oturum yok, sohbet kurulmaz
    }
    const socket = io(socketUrl(this), {
      transports: ["websocket", "polling"],
      path: "/socket.io/",
      auth: { token: token },
    });

    socket.on("presence:list", (veri) => {
      vuexContext.commit("setChatOnline", (veri && veri.online) || []);
      vuexContext.commit("setChatAktiflik", (veri && veri.aktiflik) || {});
    });
    socket.on("presence:update", (veri) => {
      /* Toast yalnizca cevrimdisi -> cevrimici gecisinde cikar; ilk
         baglantida gelen tam liste (presence:list) bildirim uretmez. */
      const oncedenOnline = vuexContext.state.online.indexOf(
        Number(veri && veri.userId)
      ) !== -1;
      vuexContext.commit("setChatPresence", veri);
      if (veri && veri.online && !oncedenOnline) {
        vuexContext.dispatch("chatOnlineBildirimi", veri);
      }
    });
    socket.on("presence:activity", (veri) => {
      vuexContext.commit("setChatPresence", veri);
    });
    socket.on("chat:message", (mesaj) => {
      vuexContext.dispatch("chatIncoming", mesaj);
    });
    socket.on("chat:read", (veri) => {
      /* Karsi taraf okudu: acik yazismadaki kendi mesajlarimi okundu yap. */
      if (veri && Number(veri.okuyanId) === Number(vuexContext.state.activeUserId)) {
        vuexContext.commit("setChatOwnRead");
      }
    });
    /* Yeniden baglanildiginda online listesi bayatlamasin. */
    socket.on("connect", () => {
      socket.emit("presence:list");
    });

    vuexContext.commit("setChatSocket", socket);
  },

  setChatDisconnect(vuexContext) {
    vuexContext.commit("destroyChatSocket");
  },

  /* Kullanici listesi ve okunmamis sayaclari. */
  setChatUserList(vuexContext) {
    return this.$axios
      .get("/chat/users")
      .then((response) => {
        vuexContext.commit("setChatUsers", response.data.list || []);
        vuexContext.commit("setChatReady", response.data.ready !== false);
        vuexContext.commit("setChatDosyaReady", response.data.dosya === true);
      })
      .catch(() => {
        vuexContext.commit("setChatUsers", []);
      });
  },

  /* Bir kisiyle yazismayi ac: gecmisi yukle ve okundu isaretle. */
  setChatActiveUser(vuexContext, userId) {
    vuexContext.commit("setChatActiveUser", userId);
    vuexContext.commit("setChatMessages", []);
    if (!userId) {
      return Promise.resolve();
    }
    vuexContext.commit("setChatLoadingHistory", true);
    return this.$axios
      .get(`/chat/history/${userId}`)
      .then((response) => {
        vuexContext.commit("setChatMessages", response.data.list || []);
        vuexContext.commit("setChatDahaVar", !!response.data.dahaVar);
        vuexContext.commit("setChatReady", response.data.ready !== false);
        vuexContext.dispatch("setChatRead", userId);
      })
      .catch(() => {
        vuexContext.commit("setChatMessages", []);
      })
      .then(() => {
        vuexContext.commit("setChatLoadingHistory", false);
      });
  },

  /* Yukari kaydirinca daha eski mesajlari ekle. */
  setChatOlderMessages(vuexContext) {
    const { activeUserId, messages, dahaVar, loadingHistory } = vuexContext.state;
    if (!activeUserId || !dahaVar || loadingHistory || messages.length === 0) {
      return Promise.resolve();
    }
    vuexContext.commit("setChatLoadingHistory", true);
    const enEski = messages[0].ID;
    return this.$axios
      .get(`/chat/history/${activeUserId}?beforeId=${enEski}`)
      .then((response) => {
        vuexContext.commit("prependChatMessages", response.data.list || []);
        vuexContext.commit("setChatDahaVar", !!response.data.dahaVar);
      })
      .catch(() => {})
      .then(() => {
        vuexContext.commit("setChatLoadingHistory", false);
      });
  },

  /* Goruntuyu Spaces'e yukler, nesne anahtarini doner (hata olursa null).
     Dosya sunucudan GECMEZ: imza alinir, yukleme dogrudan depoya gider.
     ilerleme: yuzde bildiren islev (istege bagli). */
  setChatDosyaYukle(vuexContext, veri) {
    const dosya = veri && veri.dosya;
    const ilerleme = veri && veri.ilerleme;
    if (!dosya || !dosya.blob) {
      return Promise.resolve(null);
    }
    return this.$axios
      .post("/chat/upload-url", {
        contentType: dosya.tur,
        boyut: dosya.blob.size,
      })
      .then((response) => {
        const veriler = response.data || {};
        if (!veriler.status || !veriler.url || !veriler.key) {
          this.$toast.error(veriler.message || "Görüntü yüklenemedi.");
          return null;
        }
        return new Promise((resolve) => {
          /* Yukleme yuzdesi icin XMLHttpRequest: axios'un tarayici
             tarafinda ilerleme olayi var ama imzali PUT'u araya girmeden
             gondermek gerekiyor (baslik eklenirse imza uyusmaz). */
          const istek = new XMLHttpRequest();
          istek.open("PUT", veriler.url, true);
          istek.setRequestHeader("Content-Type", dosya.tur);
          if (typeof ilerleme === "function") {
            istek.upload.onprogress = (olay) => {
              if (olay.lengthComputable) {
                ilerleme(Math.round((olay.loaded / olay.total) * 100));
              }
            };
          }
          istek.onload = () => {
            const tamam = istek.status >= 200 && istek.status < 300;
            if (!tamam) {
              console.error("sohbet goruntu yukleme hatasi:", istek.status);
              this.$toast.error("Görüntü yüklenemedi.");
            }
            resolve(tamam ? veriler.key : null);
          };
          istek.onerror = () => {
            this.$toast.error("Görüntü yüklenemedi.");
            resolve(null);
          };
          istek.send(dosya.blob);
        });
      })
      .catch(() => {
        this.$toast.error("Görüntü yüklenemedi.");
        return null;
      });
  },

  /* veri: metin ("eski kullanim") veya { mesaj, dosya, ilerleme }.
     dosya: utils/chatDosya.js resimHazirla sonucu ({ blob, tur, ad }). */
  async setChatSend(vuexContext, veri) {
    const girdi = typeof veri === "string" ? { mesaj: veri } : veri || {};
    const { socket, activeUserId } = vuexContext.state;
    const metin = String(girdi.mesaj || "").trim();
    const dosya = girdi.dosya || null;
    if ((!metin && !dosya) || !activeUserId) {
      return { status: false };
    }
    if (!socket || !socket.connected) {
      this.$toast.error("Sohbet sunucusuna bağlanılamadı.");
      return { status: false };
    }
    /* Once yukleme, sonra mesaj: yukleme basarisizsa bos mesaj gitmesin. */
    let dosyaKey = null;
    if (dosya) {
      dosyaKey = await vuexContext.dispatch("setChatDosyaYukle", {
        dosya: dosya,
        ilerleme: girdi.ilerleme,
      });
      if (!dosyaKey) {
        return { status: false };
      }
    }
    return new Promise((resolve) => {
      socket.emit(
        "chat:send",
        {
          aliciId: activeUserId,
          mesaj: metin,
          dosyaKey: dosyaKey,
          dosyaAd: dosya ? dosya.ad : null,
        },
        (sonuc) => {
          if (!sonuc || !sonuc.status) {
            this.$toast.error(
              (sonuc && sonuc.message) || "Mesaj gönderilemedi."
            );
          }
          /* Mesaj ekrana chat:message olayi ile eklenir (gonderenin tum
             sekmeleri ayni paketi alir), burada tekrar eklenmez. */
          resolve(sonuc || { status: false });
        }
      );
    });
  },

  setChatRead(vuexContext, userId) {
    const socket = vuexContext.state.socket;
    vuexContext.commit("clearChatUnread", userId);
    if (socket && socket.connected) {
      socket.emit("chat:read", { karsiId: userId });
      return Promise.resolve();
    }
    /* Socket kapaliysa REST ile isaretle. */
    return this.$axios.post("/chat/read", { karsiId: userId }).catch(() => {});
  },

  /* Gelen mesaj: acik yazismaya ait ise listeye eklenir ve okundu yapilir,
     degilse ilgili kisinin okunmamis sayaci artirilir. */
  chatIncoming(vuexContext, mesaj) {
    const benId = Number(vuexContext.getters.getUserId);
    const gonderen = Number(mesaj.GonderenID);
    const alici = Number(mesaj.AliciID);
    const karsiId = gonderen === benId ? alici : gonderen;
    const aktif = Number(vuexContext.state.activeUserId);

    vuexContext.commit("setChatUserPreview", {
      userId: karsiId,
      mesaj: mesaj.Mesaj,
      tarih: mesaj.GonderimTarihi,
    });

    if (karsiId === aktif) {
      vuexContext.commit("appendChatMessage", mesaj);
      if (gonderen !== benId) {
        vuexContext.dispatch("setChatRead", karsiId);
      }
      return;
    }
    if (gonderen !== benId) {
      /* Gonderen onbellekteki listede yoksa sayac artirilamaz ve rozet
         gorunmezdi (ornegin yeni bir calisan eklenip siz sayfayi hic
         yenilemediyseniz). Bu durumda liste tazelenir. */
      const listede = vuexContext.state.users.some(
        (u) => Number(u.ID) === karsiId
      );
      if (!listede) {
        vuexContext.dispatch("setChatUserList");
        return;
      }
      vuexContext.commit("incrementChatUnread", karsiId);
    }
  },

  /* Biri cevrimiciye gecince sag ustte toast (konum nuxt.config.js ->
     toast.position). Bildirim sohbet listesindeki HERKES icin cikar.

     Yalnizca listede gorunen kisiler bildirilir: bolge/yer tutucu
     hesaplar (api/sohbetHaric.js) listeye girmedigi gibi bildirim de
     uretmemeli. */
  chatOnlineBildirimi(vuexContext, veri) {
    const id = Number(veri.userId);
    const kisi = vuexContext.state.users.find((u) => Number(u.ID) === id);
    if (!kisi) {
      return;
    }
    /* Sayfa yenilemek baglantiyi kopartip yeniden kurar; her F5'te ayni
       kisi icin bildirim cikmasin diye ayni kisi kisa sure icinde tekrar
       bildirilmez. Gercek "ise basladi" bildirimi etkilenmez. */
    const simdi = Date.now();
    const oncekiBildirim = sonBildirim.get(id) || 0;
    if (simdi - oncekiBildirim < BILDIRIM_BEKLEME_MS) {
      return;
    }
    sonBildirim.set(id, simdi);
    const ad = kisi.KullaniciAdi || veri.username;
    if (this.$toast) {
      this.$toast.info(`${ad} is now online`);
    }
  },

  setChatPanelOpen(vuexContext, acik) {
    vuexContext.commit("setChatPanelOpen", acik);
  },
};

const mutations = {
  setChatSocket(state, socket) {
    state.socket = socket;
  },
  destroyChatSocket(state) {
    if (state.socket) {
      state.socket.close();
    }
    state.socket = null;
    state.online = [];
    state.aktiflik = {};
  },
  setChatUsers(state, users) {
    state.users = users;
  },
  setChatReady(state, ready) {
    state.ready = ready;
  },
  setChatDosyaReady(state, durum) {
    state.dosyaReady = !!durum;
  },
  setChatOnline(state, online) {
    state.online = (online || []).map((x) => Number(x));
  },
  setChatAktiflik(state, harita) {
    state.aktiflik = harita || {};
  },
  setChatPresence(state, veri) {
    if (!veri) {
      return;
    }
    const id = Number(veri.userId);
    if (veri.sonAktif) {
      state.aktiflik = { ...state.aktiflik, [id]: veri.sonAktif };
    }
    /* presence:activity yalnizca aktiflik tasir, online durumunu degistirmez */
    if (typeof veri.online !== "boolean") {
      return;
    }
    const varMi = state.online.indexOf(id) !== -1;
    if (veri.online && !varMi) {
      state.online = state.online.concat([id]);
    } else if (!veri.online && varMi) {
      state.online = state.online.filter((x) => x !== id);
    }
  },
  setChatActiveUser(state, userId) {
    state.activeUserId = userId ? Number(userId) : null;
  },
  setChatMessages(state, messages) {
    state.messages = messages;
  },
  appendChatMessage(state, mesaj) {
    /* Ayni mesaj iki kez gelmesin (yeniden baglanma / cift olay). */
    if (state.messages.some((m) => String(m.ID) === String(mesaj.ID))) {
      return;
    }
    state.messages = state.messages.concat([mesaj]);
  },
  prependChatMessages(state, messages) {
    const mevcut = {};
    state.messages.forEach((m) => {
      mevcut[String(m.ID)] = true;
    });
    const yeni = (messages || []).filter((m) => !mevcut[String(m.ID)]);
    state.messages = yeni.concat(state.messages);
  },
  setChatLoadingHistory(state, durum) {
    state.loadingHistory = durum;
  },
  setChatDahaVar(state, durum) {
    state.dahaVar = durum;
  },
  setChatOwnRead(state) {
    const simdi = new Date().toISOString();
    state.messages = state.messages.map((m) =>
      m.OkunduTarihi ? m : { ...m, OkunduTarihi: simdi }
    );
  },
  incrementChatUnread(state, userId) {
    state.users = state.users.map((u) =>
      Number(u.ID) === Number(userId)
        ? { ...u, Okunmamis: (Number(u.Okunmamis) || 0) + 1 }
        : u
    );
  },
  clearChatUnread(state, userId) {
    state.users = state.users.map((u) =>
      Number(u.ID) === Number(userId) ? { ...u, Okunmamis: 0 } : u
    );
  },
  setChatUserPreview(state, veri) {
    state.users = state.users.map((u) =>
      Number(u.ID) === Number(veri.userId)
        ? { ...u, SonMesaj: veri.mesaj, SonMesajTarihi: veri.tarih }
        : u
    );
  },
  setChatPanelOpen(state, acik) {
    state.panelOpen = !!acik;
  },
};

const getters = {
  getChatUsers(state) {
    return state.users;
  },
  getChatOnline(state) {
    return state.online;
  },
  getChatSocket(state) {
    return state.socket;
  },
  getChatAktiflik(state) {
    return state.aktiflik;
  },
  getChatActiveUserId(state) {
    return state.activeUserId;
  },
  getChatMessages(state) {
    return state.messages;
  },
  getChatLoadingHistory(state) {
    return state.loadingHistory;
  },
  getChatDahaVar(state) {
    return state.dahaVar;
  },
  getChatReady(state) {
    return state.ready;
  },
  getChatDosyaReady(state) {
    return state.dosyaReady;
  },
  getChatPanelOpen(state) {
    return state.panelOpen;
  },
  getChatUnreadTotal(state) {
    return state.users.reduce((acc, u) => acc + (Number(u.Okunmamis) || 0), 0);
  },
  /* Yalnizca listede gorunen kisiler sayilir: sohbet disi tutulan hesaplar
     (api/sohbetHaric.js) online olsa bile sayaca girmemeli. */
  getChatOnlineCount(state) {
    return state.users.filter(
      (u) => state.online.indexOf(Number(u.ID)) !== -1
    ).length;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
