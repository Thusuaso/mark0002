# Kurulum (kendi sunucunuzda, pm2 + nginx)

Vercel ELENDI: Socket.IO sunucusu uzun omurlu bir Node surecine
tutunuyor (`event.node.res.socket.server`), serverless'ta boyle bir
surec yok. Sohbet ve canli liste tazeleme calismazdi.

Bu kurulum mimarinin tasarlandigi sekli: **tek surec** icinde Nitro +
legacy Express API + Socket.IO.

---

## 1. Gereksinimler

| | |
|---|---|
| Node | 20.6+ (`--env-file` icin). Gelistirmede Node 26 kullanildi. |
| pm2 | `npm i -g pm2` |
| nginx | ters vekil |
| SQL Server | uygulamanin ulasabilecegi bir ag konumunda |

---

## 2. Ortam degiskenleri

`.env.example` dosyasini `.env` olarak kopyalayip doldurun.

```
cp .env.example .env
```

**Zorunlu olanlar:** `DB_SERVER`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`,
`JWT_SECRET`. Bunlar olmadan uygulama acilir ama her veri istegi
patlar / kullanici giris yapamaz.

> **[!] `.env` uretimde KENDILIGINDEN okunmaz.**
> Projede `dotenv` yok ve Nuxt `.env`'i yalnizca gelistirme modunda
> yukler. `ecosystem.config.cjs` bu yuzden `--env-file=.env` ile
> basliyor. pm2'yi elle baslatacaksaniz o bayragi unutmayin.

---

## 3. Derleme ve calistirma

```
npm ci
npm run build
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup          # ciktidaki komutu calistirin
```

Derleme `.output/` uretir; uygulama `127.0.0.1:3000` dinler.

Dogrulama:

```
curl -I http://127.0.0.1:3000/        # 200 ya da /auth'a 302 beklenir
pm2 logs mark0002-pilot --lines 50
```

---

## 4. nginx

`deploy/nginx.conf.example` dosyasini uyarlayin:

```
cp deploy/nginx.conf.example /etc/nginx/sites-available/mark0002
# server_name satirini duzenleyin
ln -s /etc/nginx/sites-available/mark0002 /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
```

> **[!] `/socket.io/` blogunu silmeyin.**
> `Upgrade` / `Connection` basliklari olmadan WebSocket kurulamaz.
> Belirti aldaticidir: sayfa normal acilir, konsolda bariz bir hata
> yoktur, yalnizca sohbet mesajlari gitmez ve "cevrimici" listesi bos
> kalir.

HTTPS icin certbot:

```
certbot --nginx -d alan-adiniz.com
```

---

## 5. Guncelleme

```
git pull
npm ci
npm run build
pm2 reload mark0002-pilot
```

`reload` yerine `restart` da olur; fark, acik socket baglantilarinin
kopmasi (istemci kendiliginden yeniden baglanir).

---

## Dikkat edilecekler

**Tek surec sarti.** `ecosystem.config.cjs` bilerek `exec_mode: "fork"`
ve `instances: 1`. pm2 cluster'a gecirilirse Socket.IO rolesi YARIM
calisir: farkli surece dusen iki kullanici birbirinin mesajini
goremez, canli tazelemeler ulasmaz -- **ve log'da hicbir sey
gorunmez**. Olceklemek gerekirse once `@socket.io/redis-adapter`.

**Veritabani sifrelemesi.** `server/utils/db.ts` ve `api/index.js`
`encrypt: false` kullaniyor. Uygulama ile SQL Server ayni yerel agda
oldugu surece kabul edilebilir; trafik aga cikacaksa `encrypt: true`
yapilip sertifika ayarlanmali.

**Depo boyutu.** Gecmiste `node_modules` (47.778 dosya) ve bir
`.vercel/output` commit'i duruyor; depo ~271 MB. Klonlama yavas ama
calismayi etkilemiyor. Temizlemek icin gecmisin yeniden yazilmasi
gerekiyor:

```
python -m pip install git-filter-repo
python -m git_filter_repo --path node_modules --path .vercel --invert-paths --force
git push --force <uzak-adres> nuxt3-pilot
```

Tum commit SHA'lari degisir; once yedek alin (`git bundle create`).
