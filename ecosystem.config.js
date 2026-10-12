module.exports = {
  apps: [
    {
      name: 'NuxtAppName',
      exec_mode: 'cluster',
      instances: 'max',
      script: './node_modules/nuxt/bin/nuxt.js',
    },
    {
      // Socket sunucusu: liste tazeleme yayinlari + sirket ici sohbet ve
      // online durumu (api/server.js, port 3001).
      //
      // ÖNEMLİ: fork modu ve tek instance. Online kullanici listesi ve oda
      // uyelikleri bu process'in hafizasinda tutulur; cluster'a alinirsa
      // kullanicilar farkli worker'lara dusup birbirini gormez (bunun icin
      // sticky session + socket.io Redis adapter gerekir).
      name: 'MekmarSocket',
      exec_mode: 'fork',
      instances: 1,
      script: './api/server.js',
    },
  ],
};
