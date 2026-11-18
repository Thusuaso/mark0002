# Android kabuğu (Capacitor)

Web uygulamasının aynısı, Android kabuğunun içinde. **Ayrı bir kod tabanı
yok**: `app/` altındaki Nuxt uygulaması SPA olarak derlenip APK'ya
gömülüyor, veri üretim sunucusundan geliyor.

```
app/  +  api/        ->  goz.mekmar.com   (bugünkü web, değişmiyor)
app/          ->  SPA  ->  APK              (bu klasör)
                            |
                            +-- veri --> https://goz.mekmar.com/api
```

## Neden böyle

Kabukta sunucu yok: dosyalar APK'nın içinden `https://localhost` üzerinden
servis ediliyor. Bunun üç sonucu var ve üçü de koda yansıdı:

| Sonuç | Çözüm | Yer |
|---|---|---|
| SSR çalışamaz | `MOBILE_BUILD=1` ile `ssr: false` | `nuxt.config.ts` |
| `/api` yanlış yere gider | `NUXT_PUBLIC_API_ORIGIN` mutlak adres verir | `app/composables/useApi.ts` |
| Çapraz kaynak isteği engellenir | Dar CORS listesi | `api/index.js` |

Dördüncüsü PI indirmeydi: çerez çapraz kaynağa gitmediği için kısa ömürlü
bilete geçirildi (`app/composables/usePiDownload.ts`).

## Kurulum (bir kez)

Bu klasör kendi npm paketi (Capacitor CLI bir paketin kökünde çalışmak
zorunda). Bağımlılıklar burada, depo kökünde değil:

```
cd mobile
npm install
npx cap add android
```

Gereken: Android Studio. Ayrı bir JDK kurmaya **gerek yok** — Android
Studio'nun kendi JDK'sı kullanılıyor (aşağıya bak).

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

Komut satırından APK (Android Studio'yu açmadan):

```
cd android
set JAVA_HOME=C:\Program Files\Android\Android Studio\jbr
gradlew.bat assembleDebug
```

Çıktı: `android/app/build/outputs/apk/debug/app-debug.apk`

## Kurulumda çıkan üç engel ve neden böyle çözüldü

Bunlar tahmin değil, bu makinede tek tek karşılaşıldı.

**1. `Unsupported class file major version 69`**
Android Studio'nun kendi JDK'sı (JBR) **Java 25**, Capacitor'un ürettiği
Gradle 8.14.3 ise en fazla Java 24 destekliyor; build script'i bile
derlenemiyor. Çözüm: wrapper **Gradle 9.1.0**'a çıkarıldı ("Full Java 25
support"). Sisteme ayrı bir JDK kurmak da işe yarardı ama gereksiz —
makinede zaten çalışan bir JDK var.

**2. `Your project path contains non-ASCII characters`**
Depo `.../Masaüstü 05-11-2026/...` altında ve `ü` AGP'yi durduruyor.
Kontrol `android.overridePathCheck=true` ile kapatıldı; uyarı eski
NDK/aapt araçları içindi, bu projede yerel kod yok.
Buna rağmen yoldan kaynaklı bir hata görürsen çözüm **depoyu taşımak
değil**, yalnızca `android/` klasörünü ASCII bir yola kopyalayıp orada
derlemek.

**3. `compileSdk 36` istenirken kurulu olan `android-37.0`**
Elle bir şey yapmak gerekmedi: lisans kabul edilmiş olduğu için AGP
eksik platformu kendisi indirdi. `cmdline-tools` kurulu olmadığından
komut satırından kurmak mümkün değildi; gerekseydi Android Studio →
SDK Manager → "Android SDK Platform 36" tek seçenekti.

## Sunucu adresini değiştirmek

`package.json` içindeki `build:mobile` betiğinde duruyor. Test sunucusuna
bağlamak için `NUXT_PUBLIC_API_ORIGIN` ve `NUXT_PUBLIC_SOCKET_URL`
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

## Göreli adres kullanan yerler — kabukta kırılırlar

Kabukta sayfa `https://localhost`'tan servis edildiği için **göreli her
adres APK'nın içine gider** ve orada sunucu yoktur. `useApi()` üzerinden
giden her şey sorunsuz (mutlak adres kuruyor), ama bunlar ayrı:

| Yer | Durum |
|---|---|
| `app/stores/auth.ts` | **düzeltildi** — `useApi()`'ye geçirildi |
| `app/composables/useTcmb.ts` | `baseURL: "/"` → Nitro rotası, kabukta **çalışmaz** |
| `app/composables/useExcelExport.ts` | `baseURL: "/"` → Nitro rotası, kabukta **çalışmaz** |

Son ikisi Express değil **Nitro sunucu rotaları**; APK'da Nitro de yok.
Kapsamdaki ekranlar bunları kullanmıyorsa sorun değil, kullanıyorsa o
rotaların da üretim sunucusuna yönlendirilmesi gerekir.
