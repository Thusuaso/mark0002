#!/usr/bin/env bash
#
# Uretim guncellemesi -- SUNUCUDA, `deploy` kullanicisiyla calistirilir:
#
#   ssh deploy@<sunucu>
#   cd /var/www/mark0002 && ./deploy/update.sh
#
# ---------------------------------------------------------------------
# [!] NODE_OPTIONS heap siniri -- KALDIRMAYIN
# ---------------------------------------------------------------------
# `npm run build` bu projede 3.5 GB bellek tepesi yapiyor (olculdu:
# 4 GB'lik Droplet'te 3511 MB). Calisan uygulama da ~200 MB tutuyor.
# Ikisi ayni anda sinirsiz buyurse cekirdek OOM killer'i devreye girer
# ve rastgele birini oldurur -- genelde CALISAN UYGULAMAYI, cunku o
# daha uzun suredir ayakta. Belirti aldatici olur: build basarili
# gorunur ama site bir anda duser.
#
# Heap'i 2.8 GB'a sabitlemek build'i biraz yavaslatir (fazlasi swap'a
# tasar) ama calisan surece yer birakir.
set -euo pipefail

cd "$(dirname "$0")/.."
APP="mark0002-pilot"

# ------------------------------------------------------------------
# [!] AYNI ANDA IKI KEZ CALISTIRILAMAZ -- KILIDI KALDIRMAYIN
# ------------------------------------------------------------------
# `npm ci` node_modules'i BASTAN SILER. Iki calisma cakisirsa birinin
# npm ci'si, otekinin build'i surerken agaci siliyor ve Nitro'nun dosya
# izleyicisi (@vercel/nft) yarisi yok olmus agacta patliyor:
#   Error: File /var/www/mark0002/node_modules/socket.io/wrapper.mjs
#          does not exist.
# Hata aldatici: socket.io'da bir sorun yok, dosya o anda silinmis.
# Ikinci calisma beklemek yerine hemen cikar (-n): deploy kuyruga
# girmemeli, cunku ikisi de ayni origin/<dal> ucunu kuruyor -- biri
# yeterli.
exec 9>/tmp/mark0002-deploy.lock
if ! flock -n 9; then
  echo "HATA: baska bir update.sh calisiyor. Onun bitmesini bekleyin." >&2
  echo "      (Ayni anda iki build node_modules'i birbirine kirar.)" >&2
  exit 1
fi

echo "==> Mevcut surum: $(git rev-parse --short HEAD)"

# ------------------------------------------------------------------
# [!] .env SUNUCUDA, DEPODA DEGIL
# ------------------------------------------------------------------
# .env .gitignore'da oldugu icin git pull onu ASLA getirmez/silmez.
# Yine de varligini kontrol ediyoruz: dosya yoksa build geciyor ama
# uygulama acildiginda HER veri istegi patliyor (bkz.
# ecosystem.config.cjs icindeki --env-file notu).
if [ ! -f .env ]; then
  echo "HATA: .env yok. Uygulama acilir ama tum veri istekleri patlar." >&2
  exit 1
fi

echo "==> Degisiklikler aliniyor"
git fetch origin
BRANCH=$(git rev-parse --abbrev-ref HEAD)
git reset --hard "origin/$BRANCH"
echo "==> Yeni surum: $(git rev-parse --short HEAD)"

echo "==> Bagimliliklar (npm ci)"
npm ci --no-audit --no-fund

echo "==> Build (heap 2.8 GB ile sinirli, gerekcesi yukarida)"
NODE_ENV=production NODE_OPTIONS=--max-old-space-size=2800 npm run build

# Buraya gelindiyse build BASARILI (set -e). Basarisiz bir build'den
# sonra restart edilirse .output yarim kalmis olacagi icin uygulama
# hic acilmaz -- bu yuzden restart yalnizca bu noktada.
echo "==> Yeniden baslatiliyor"
pm2 restart "$APP" --update-env

sleep 6
pm2 list | grep "$APP" || true

echo "==> Saglik kontrolu"
CODE=$(curl -s -o /dev/null -m 15 -w "%{http_code}" http://127.0.0.1:3000/)
# Giris korumasi nedeniyle kok adres /auth'a yonlendirir: 302 BEKLENEN
# normal yanit, 200 degil.
if [ "$CODE" = "302" ] || [ "$CODE" = "200" ]; then
  echo "TAMAM -- uygulama yanit veriyor (HTTP $CODE)"
else
  echo "UYARI: beklenmeyen yanit (HTTP $CODE). Loglar:" >&2
  pm2 logs "$APP" --lines 30 --nostream >&2
  exit 1
fi
