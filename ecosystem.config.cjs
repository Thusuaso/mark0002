/*
 * pm2 yapilandirmasi -- URETIM.
 *
 * Kullanim:
 *   npm ci
 *   npm run build
 *   pm2 start ecosystem.config.cjs
 *   pm2 save && pm2 startup     (sunucu yeniden baslayinca otomatik aciliş)
 *
 * ---------------------------------------------------------------------
 * [!] exec_mode: "fork" ve instances: 1 -- DEGISTIRMEYIN
 * ---------------------------------------------------------------------
 * pm2'nin cluster modu cazip gorunur ama BU UYGULAMADA SESSIZCE
 * BOZAR. Socket.IO rolesi (server/plugins/socket-io.ts) yalnizca
 * KENDI SURECINE bagli istemcilere yayin yapiyor; dosyanin kendi
 * notunda da yaziyor:
 *
 *   "Bu role YALNIZCA AYNI SURECE bagli istemcilere yayin yapar...
 *    birden fazla ornek kullanilirsa yayin YARIM calisir: A ornegine
 *    bagli kullanici B ornegine bagli kullaniciya ulasmaz.
 *    Hata vermez, sessizce eksik calisir."
 *
 * Yani cluster'da iki kullanici farkli surece duserse sohbet mesaji
 * gitmez ve canli liste tazelemeleri calismaz -- ama LOG'DA HICBIR
 * SEY GORUNMEZ. Hata ayiklamasi cok zor bir sinif.
 *
 * Birden fazla ornek gerekirse once socket.io'ya bir adapter
 * (orn. @socket.io/redis-adapter) eklenmeli; o zaman Redis de isin
 * icine girer.
 *
 * ---------------------------------------------------------------------
 * [!] --env-file ZORUNLU
 * ---------------------------------------------------------------------
 * Bu projede `dotenv` YOK ve Nuxt `.env` dosyasini yalnizca GELISTIRME
 * modunda okur. Uretimde `.output/server/index.mjs` ortam
 * degiskenlerini SURECTEN alir.
 *
 * Yani `pm2 start .output/server/index.mjs` diye duz baslatilirsa
 * DB_SERVER/DB_USER/... tanimsiz kalir: uygulama acilir ama HER veri
 * istegi patlar. Node 20.6+ ile gelen `--env-file` bayragi .env'i
 * surece yukluyor (bu makinede Node 26, destekleniyor).
 *
 * Alternatif: degiskenleri asagidaki `env` blogunda ya da systemd
 * biriminde tanimlamak. Gizli bilgiler depoya girmesin diye burada
 * .env tercih edildi (.env .gitignore'da).
 */
module.exports = {
  apps: [
    {
      name: "mark0002-pilot",
      script: ".output/server/index.mjs",

      /* Gerekcesi yukarida -- cluster'a CEVIRMEYIN. */
      exec_mode: "fork",
      instances: 1,

      /* .env'i surece yukler; bkz. yukaridaki not. */
      node_args: "--env-file=.env",

      env: {
        NODE_ENV: "production",

        /*
         * Nitro'nun node-server on ayari bu ikisini okuyor.
         * nginx yalnizca buraya proxy yapacak.
         */
        PORT: 3000,
        HOST: "127.0.0.1",
      },

      /*
       * Bellek sinirini asarsa yeniden baslat. Socket baglantilari
       * kopar ama istemci kendiliginden yeniden baglanir.
       */
      max_memory_restart: "1G",

      /* Cokme dongusune girmesin. */
      min_uptime: "20s",
      max_restarts: 10,

      /* Gunlukler tek yerde ve zaman damgali. */
      merge_logs: true,
      time: true,
    },
  ],
}
