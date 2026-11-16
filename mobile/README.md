# Android kabuğu (Capacitor)

Web uygulamasının aynısı, Android kabuğunun içinde. **Ayrı bir kod tabanı
yok**: `app/` altındaki Nuxt uygulaması SPA olarak derlenip APK'ya
gömülüyor, veri üretim sunucusundan geliyor.

```
app/  +  api/        ->  gozv2.mekmar.com   (bugünkü web, değişmiyor)
app/          ->  SPA  ->  APK              (bu klasör)
                            |
                            +-- veri --> https://gozv2.mekmar.com/api
```

## Neden böyle

Kabukta sunucu yok: dosyalar APK'nın içinden `https://localhost` üzerinden
servis ediliyor. Bunun üç sonucu var ve üçü de koda yansıdı:

| Sonuç | Çözüm | Yer |
|---|---|---|
| SSR çalışamaz | `MOBILE_BUILD=1` ile `ssr: false` | `nuxt.config.ts` |
| `/api` yanlış yere gider | `NUXT_PUBLIC_API_BASE` mutlak adres verir | `app/composables/useApi.ts` |
| Çapraz kaynak isteği engellenir | Dar CORS listesi | `api/index.js` |

Dördüncüsü PI indirmeydi: çerez çapraz kaynağa gitmediği için kısa ömürlü
bilete geçirildi (`app/composables/usePiDownload.ts`).

## Kurulum (bir kez)

Depo kökünde:

```
npm i -D @capacitor/cli
npm i @capacitor/core @capacitor/android
```

Sonra bu klasörde:

```
npx cap add android
```

Gereken: Android Studio + JDK 17.

## Derleme

Depo kökünde SPA paketini üret:

```
npm run build:mobile
```

`.output/public` oluşur. Sonra bu klasörde:

```
npx cap sync android
npx cap open android
```

Android Studio açılır; oradan cihaza/emülatöre çalıştır ya da APK al.

## Sunucu adresini değiştirmek

`package.json` içindeki `build:mobile` betiğinde duruyor. Test sunucusuna
bağlamak için `NUXT_PUBLIC_API_BASE` ve `NUXT_PUBLIC_SOCKET_URL`
değerlerini değiştirip yeniden derlemek yeterli — kod değişmiyor.

> **[!] Adresi değiştirirsen CORS listesini de güncelle.**
> `api/index.js` içindeki `MOBIL_ORIGINLER` yalnızca kabuğun origin'lerini
> tanıyor. Yeni bir sunucuya bağlanırken o sunucunun API'si de aynı
> listeyi taşımalı, yoksa her istek tarayıcı tarafından engellenir ve
> hata mesajı yanıltıcı olur (ağ hatası gibi görünür, 401 gibi değil).

## Bu kabuğun yapmadıkları

- **Bildirim yok.** Native push ayrı bir iş (Faz 4).
- **Çevrimdışı çalışmaz.** Veri her zaman sunucudan geliyor.
- **Mağazada değil.** Şimdilik yalnızca doğrudan kurulan APK.
