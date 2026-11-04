/* ==========================================================================
   Sohbet disinda tutulan kullanicilar
   --------------------------------------------------------------------------
   Bunlar gercek kisiler degil; bolge/kanal ya da yer tutucu hesaplar.
   Sohbet panelindeki kisi listesinde gorunmezler ve kendilerine mesaj
   gonderilemez. Hesaplar KAPATILMAZ, diger ekranlarda calismaya devam
   ederler; dislama yalnizca sohbete ozeldir.

   Isim degil ID kullanilir: hesap adi degistirilirse dislama bozulmaz.

   Listeyi degistirmek icin asagiya ekleyip cikarmak yeterlidir. Dosya hem
   legacy Express API'si (api/index.js) hem Nitro'daki sohbet socket katmani
   (server/utils/chat-socket.ts) tarafindan okunur, degisiklik iki tarafta
   birden gecerli olur.

   PILOTTA AYRI SUREC YOK: Nuxt 2'de socket sunucusu ayri bir process'ti
   (api/server.js, port 3001) ve bu dosya degisince ELLE yeniden baslatmak
   gerekiyordu. Pilotta socket.io Nitro'nun icinde calisiyor, yani sunucu
   yeniden baslayinca liste de tazelenir; ayri bir adim yok.
   ========================================================================== */
export const SOHBET_HARIC_KULLANICILAR = [
  34, // Atlanta SM
  29, // Ayarlanmadı
  39, // Ghana
  35, // İP
  32, // Maya
  40, // Su
];

/* SQL icine gomulecek liste. Bos kalirsa "not in ()" gecersiz olacagi icin
   hicbir kaydi dislamayan -1 dondurulur. */
export function sohbetHaricSql() {
  const idler = SOHBET_HARIC_KULLANICILAR.filter((x) => Number.isInteger(x));
  return idler.length ? idler.join(", ") : "-1";
}

export function sohbetHaricMi(userId) {
  return SOHBET_HARIC_KULLANICILAR.indexOf(Number(userId)) !== -1;
}
