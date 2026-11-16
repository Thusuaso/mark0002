/*
 * PrimeVue 4.x hattinda BILEREK kaliniyor: PrimeVue 5.0.0 ile proje
 * ticari lisansa (PrimeUI) gecti ve lisans anahtari istiyor.
 * MIT olan en son surumler: primevue 4.5.5, @primevue/nuxt-module 4.5.5,
 * @primeuix/themes 2.0.3, primeicons 7.0.0, primeflex 4.0.0
 *
 * Tema, nuxt.config'in tepesinden import EDILMIYOR: @primeuix/themes
 * ESM-only ve Nuxt'un config yukleyicisi (jiti) CJS cozumleme yaptigi icin
 * "Cannot find module '@primeuix/themes/aura'" veriyor. Modulun importTheme
 * secenegi import'u Vite'in isledigi plugin dosyasina enjekte eder.
 */
export default defineNuxtConfig({
  modules: ["@primevue/nuxt-module", "@pinia/nuxt"],

  /*
   * MOBIL DERLEME -- Android kabugu icin SSR KAPALI.
   *
   * Kabukta sunucu YOK: dosyalar APK'nin icinden (https://localhost)
   * servis ediliyor, veri uretim sunucusundan geliyor. Bu yuzden mobil
   * derleme saf SPA olmali; `nuxt generate` statik bir paket uretiyor.
   *
   * Web derlemesi ETKILENMIYOR: MOBILE_BUILD verilmedigi surece ssr true
   * ve bugunku davranis birebir ayni. (Uygulamanin zaten neredeyse tamami
   * istemcide ciziliyor -- sayfalar useAsyncData'yi `server: false` ile
   * cagiriyor, cunku legacy Express API SSR'in ic yolunda calismiyor;
   * bkz. server/middleware/1.legacy-api.ts. Yani SSR'i kapatmak veri
   * cekme davranisini degistirmiyor.)
   *
   * Kullanimi: mobile/README.md
   */
  ssr: process.env.MOBILE_BUILD !== "1",

  /*
   * MOBIL DERLEMEDE LEGACY API ARA KATMANI DISARIDA BIRAKILIYOR.
   *
   * [!] Bu bir iyilestirme degil, derlemeyi BITIREN sey -- yoksa
   * `nuxt generate` ASILI KALIYOR.
   *
   * Olculdu: cikti (.output/public, index.html + 200.html + rota
   * sayfalari) 90 saniyede tamamlaniyor, ama surec 20 dakika sonra bile
   * CIKMIYOR ve CPU kullanmiyordu. Sebep: server/middleware/1.legacy-api.ts
   * `api/index.js`i EN UST SEVIYEDE import ediyor; o dosya yuklenir
   * yuklenmez setInterval baslatiyor (satir 17, ayrica Eta hatirlatma ve
   * sohbet temizligi zamanlayicilari) ve MSSQL havuzunu aciyor. Nitro
   * on-uretim icin sunucuyu ayaga kaldirdigi icin bu acik tutamaclar
   * Node'un cikmasini engelliyor.
   *
   * Mobil pakette o ara katmanin zaten HICBIR islevi yok: APK'nin
   * icinde sunucu calismiyor, istekler dogrudan uretim sunucusuna
   * gidiyor. Disarida birakmak islev kaybi degil.
   *
   * Web derlemesi ETKILENMIYOR -- kosul yalnizca MOBILE_BUILD=1 icin.
   */
  nitro:
    process.env.MOBILE_BUILD === "1"
      ? { ignore: ["middleware/1.legacy-api.ts"] }
      : {},

  /*
   * Sira orijinal nuxt.config.js ile ayni: primeflex once, bootstrap sonra.
   * primeflex ATLANMISTI -- flex / flex-column / gap-3 / w-full /
   * justify-content-end gibi tum yerlesim siniflari calismiyordu, formlar
   * bu yuzden dagilmis gorunuyordu.
   */
  css: [
    "primeflex/primeflex.css",
    "primeicons/primeicons.css",
    "~/assets/css/bootstrap.min.css",
    "~/assets/css/app.css",
  ],

  /*
   * Tema app/theme.ts'ten geliyor; sebepleri o dosyada aciklandi.
   * `as` ZORUNLU: modul "import <as> from <from>" uretiyor, verilmezse
   * "import undefined from ..." olup tema sessizce uygulanmiyor.
   */
  primevue: {
    importTheme: { from: "~/theme.ts", as: "AppTheme" },
    options: {
      ripple: true,
    },
  },

  /*
   * Navbar'daki acilir menuler Bootstrap'in JS'ine bagli (sablonda 16 adet
   * data-bs-toggle var). Orijinal nuxt.config.js bunu ayni CDN'den
   * head.script ile yukluyordu; birebir tasindi.
   *
   * CSS tarafi vendor'lanmis (assets/css/bootstrap.min.css) ama JS CDN'den
   * geliyor -- orijinaldeki bu tutarsizlik korundu; npm paketine gecirmek
   * ayri bir karar.
   */
  app: {
    head: {
      script: [
        {
          src: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js",
          defer: true,
        },
      ],
    },
  },

  /*
   * NOT: Excel uretecinin (server/utils/xlsx-template.ts) Windows'ta
   * calismasi icin BURADA bir ayar YOK -- bir sure `nitro.externals.
   * inline: ["exceljs"]` denendi ve Nitro worker'ini sonsuz yeniden
   * baslatma dongusune soktu. Cozum o dosyanin icinde createRequire
   * ile; gerekcesi orada ayrintili yazili.
   *
   * Excel SABLONLARI server/assets/excel-templates altinda duruyor;
   * Nitro `server/assets/**`i kendiliginden `assets:server` deposuna
   * bagladigi ve uretim paketine gomdugu icin onlar da ek ayar
   * istemiyor.
   */

  runtimeConfig: {
    public: {
      apiBase: "/api",

      /*
       * Nuxt 2'de bu adresler kaynak koda GOMULUYDU ve yerel gelistirme
       * adresi yanlarinda yorum olarak duruyordu (store/modules/local.js,
       * store/modules/socket.js, plugins/excelApi.js, plugins/upload.js)
       * -- ortam degistirmek icin dosyayi acip yorumu tersine cevirmek
       * gerekiyordu. Buraya tasindilar; NUXT_PUBLIC_* degiskenleriyle
       * ezilebilirler, varsayilanlar uretimdeki degerlerin aynisi.
       *
       * excelServerBase KALDIRILDI: Python'daki excel sunucusuna giden
       * son cagri da Nitro'ya tasindi (server/routes/excel-api/** ve
       * server/routes/finance-api/**), yani adresi tutmaya gerek yok.
       * Onu okuyan useExcelApi.ts ve stores/local.ts de silindi.
       */

      /*
       * BOS = SAYFANIN KENDI KOKENI.
       *
       * Canli tazeleme artik Nitro'nun ICINDE calisiyor
       * (server/plugins/socket-io.ts) -- ayri bir Python servisi
       * (goz.mekmar.com:5001) yok. socket.io-client bos adres verildiginde
       * sayfanin kendi kokenine baglanir, yani dogru hedef bu.
       *
       * Yine de runtimeConfig'de BIRAKILDI: harici bir socket sunucusuna
       * geri donmek gerekirse NUXT_PUBLIC_SOCKET_URL ile tek degisken
       * yeterli, kod degismiyor.
       */
      socketUrl: "",

      fileServiceBase: "https://file-service.mekmar.com",

      /*
       * API'nin ORIGIN'i -- yol degil, yalnizca sema+host.
       *
       * [!] apiBase ILE KARISTIRMA. apiBase yukarida "/api" ve YOL;
       * ikisi birlestiriliyor: apiOrigin + apiBase. Web'de apiOrigin BOS
       * kaldigi icin sonuc "/api", yani bugunku davranis birebir ayni.
       *
       * Android kabugunda sayfa https://localhost'tan servis ediliyor,
       * API ise uretim sunucusunda; orada
       * NUXT_PUBLIC_API_ORIGIN=https://gozv2.mekmar.com veriliyor ve
       * sonuc "https://gozv2.mekmar.com/api" oluyor.
       */
      apiOrigin: "",
    },
  },
})
