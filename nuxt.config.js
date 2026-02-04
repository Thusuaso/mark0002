import bodyParser from "body-parser";
import crypto from "crypto";
import https from "https";

try {
  const httpsAgent = new https.Agent({
    secureOptions:
      crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT |
      crypto.constants.SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION,
  });

  // Hem global https isteklerini hem de axios'u etkilemesi için:
  https.globalAgent.options.secureOptions = httpsAgent.options.secureOptions;
} catch (error) {
  console.log("SSL Patch uyarısı (Önemli değil):", error.message);
}
export default {
  // SSR modunun açık olduğundan emin olalım
  ssr: true,

  // --- KRİTİK AYAR ---
  // Windows'ta dosya takılmalarını önleyen en önemli ayar budur.
  // Dosyaları sürekli dinlemek yerine belirli aralıklarla yoklar.
  watchers: {
    webpack: {
      poll: 1000,
      ignored: /node_modules/,
    },
  },

  typescript: {
    shim: false,
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

  css: [
    "primeflex/primeflex.css",
    "~/assets/css/bootstrap.min.css", // Sadece minified olan kalsın, diğeri silindi.
  ],

  plugins: [
    "~/plugins/components.js",
    { src: "~/plugins/excel.js", mode: "client" },
    "~/plugins/logs.js",
    "~/plugins/cookies",
    { src: "~/plugins/tcmb-service.js", mode: "client" },
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
  ],

  axios: {
    baseURL: process.env.server,
    browserBaseURL: process.env.server,
  },

  // Proxy ayarları
  proxy: {
    "/tcmb-api/": {
      target: "https://www.tcmb.gov.tr/kurlar/",
      pathRewrite: { "^/tcmb-api/": "" },
      changeOrigin: true,
      secure: false,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        Accept: "application/xml, text/xml, */*; q=0.01",
      },
    },
  },

  // --- BUILD OPTİMİZASYONU ---
  build: {
    // Windows kilitlenmelerini önleyen ayarlar:
    parallel: false,
    cache: false,
    hardSource: false,

    // Derleme hızını artırır
    productionSourceMap: false,

    // Minifikasyon işleminin sistemi kilitlemesini önler
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

    // Geliştirme modu için hafif kaynak haritası
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = "eval-cheap-module-source-map";
      }
    },
  },

  serverMiddleware: [
    bodyParser.json(),
    "~/api",
    { path: "/tcmb-api", handler: "~/api/tcmb.js" },
  ],

  io: {
    sockets: [{ name: "main", url: "http://localhost:3001" }],
  },

  // Vite ayarı kaldırıldı.
};
