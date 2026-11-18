/*
 * Android kabugu icin SPA paketi uretir -> .output/public
 *
 * NEDEN BIR BETIK, NEDEN DUZ npm SCRIPT DEGIL:
 * Ortam degiskenini satir ici vermek (VAR=x nuxt generate) Windows'ta
 * CALISMAZ -- npm betikleri orada cmd.exe uzerinden kosuyor ve bu sozdizimi
 * cmd'de yok. Depo Windows'ta gelistirilip Linux'ta derlendigi icin iki
 * tarafta da calismasi gerekiyor. cross-env eklemek yerine (bir bagimlilik
 * daha) degiskenler burada veriliyor.
 *
 * Sunucu adresini degistirmek icin asagidaki iki satir yeter; kodda
 * baska hicbir yer degismiyor (bkz. mobile/README.md).
 */
import { spawnSync } from "node:child_process"

const API = process.env.NUXT_PUBLIC_API_ORIGIN || "https://goz.mekmar.com"
const SOCKET = process.env.NUXT_PUBLIC_SOCKET_URL || API

console.log(`[mobil] API    : ${API}`)
console.log(`[mobil] Socket : ${SOCKET}`)
console.log("[mobil] SSR kapali, cikti: .output/public\n")

const r = spawnSync("npx", ["nuxt", "generate"], {
  stdio: "inherit",
  /* shell: Windows'ta npx bir .cmd sarmalayicisi; shell olmadan
     spawn onu bulamaz ve ENOENT verir. */
  shell: true,
  env: {
    ...process.env,
    MOBILE_BUILD: "1",
    NUXT_PUBLIC_API_ORIGIN: API,
    NUXT_PUBLIC_SOCKET_URL: SOCKET,
  },
})

process.exit(r.status ?? 1)
