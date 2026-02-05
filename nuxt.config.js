import bodyParser from "body-parser";
import crypto from "crypto";
import https from "https";

// --- SSL / TLS DÜZELTMESİ (GLOBAL) ---
// Node.js 17+ sürümlerinde eski sunuculara (TCMB, Excel Server)
// bağlanırken oluşan OpenSSL hatalarını engeller.
try {
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false, // Sertifika hatalarını yoksay
    secureOptions:
      crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT |
      crypto.constants.SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION,
  });

  // Global ajana bu ayarları zorla
  https.globalAgent.options.secureOptions = httpsAgent.options.secureOptions;
  https.globalAgent.options.rejectUnauthorized = false;
} catch (error) {
  console.log("SSL Patch uyarısı:", error.message);
}

export default {
  // Server Side Rendering (SSR) açık
  ssr: true,

  // --- KRİTİK WINDOWS AYARI ---
  // Dosya değişikliklerini sürekli dinlemek yerine
  // belirli aralıklarla (1 saniye) kontrol eder.
  // Bu, Windows'ta CPU'nun kilitlenmesini önler.
  watchers: {
    webpack: {
      poll: 1000,
      ignored: /node_modules/,
    },
  },

  head: {
    title: "GOZ",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "primevue/resources/themes/vela-orange/theme.css" }],
    script: [
      {
        src: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js",
      },
    ],
  },

  css: ["primeflex/primeflex.css", "~/assets/css/bootstrap.min.css"],

  plugins: [
    "~/plugins/components.js",
    { src: "~/plugins/excel.js", mode: "client" },
    "~/plugins/logs.js",
    "~/plugins/cookies",
    // TCMB servisi client tarafında kullanılacaksa:
    { src: "~/plugins/tcmb-service.js", mode: "client" },
    // Excel API Servisi (Artık .server.js DEĞİL):
    "~/plugins/excelApi.js",
  ],

  components: true,

  buildModules: [],

  modules: [
    [
      "primevue/nuxt",
      {
        theme: "saga-orange",
        ripple: true,
      },
    ],
    "@nuxtjs/axios",
    "@nuxtjs/toast",
    "nuxt-socket-io", // <-- EKLENDİ: io ayarının çalışması için gerekli
  ],

  axios: {
    baseURL: process.env.server || "http://localhost:3000", // Fallback eklendi
    browserBaseURL: process.env.server,
  },

  // Proxy ayarı SİLİNDİ.
  // Çünkü aşağıda 'serverMiddleware' ile tcmb.js kullanıyoruz.
  // İkisi aynı anda olursa çakışma yaratır.

  // --- BUILD OPTİMİZASYONU ---
  build: {
    // Windows kilitlenmelerini önleyen ayarlar:
    parallel: false,
    cache: false,
    hardSource: false, // Windows'ta bazen sorun çıkarır, kapalı kalsın
    productionSourceMap: false,

    terser: {
      parallel: false,
      sourceMap: false,
    },

    transpile: ["primevue"],

    loaders: {
      scss: {
        implementation: require("sass"),
      },
      vue: {
        prettify: false,
      },
    },

    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = "eval-cheap-module-source-map";
      }
    },
  },

  // API ve Middleware Ayarları
  serverMiddleware: [
    bodyParser.json(),
    "~/api", // Genel API
    { path: "/tcmb-api", handler: "~/api/tcmb.js" }, // TCMB Proxy Fix
  ],

  // Socket.io Ayarları
  io: {
    sockets: [{ name: "main", url: "http://localhost:3001" }],
  },
};
