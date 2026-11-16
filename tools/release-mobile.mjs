/*
 * MOBIL YAYIN: surumu yaz -> SPA uret -> Android'e kopyala -> APK derle
 *
 * Surumun TEK KAYNAGI app/utils/mobileVersion.ts. Bu betik onu okuyup
 * android/app/build.gradle icindeki versionName ve versionCode'u
 * guncelliyor, boylece indirme sayfasinda yazan surum ile telefondaki
 * uygulamanin surumu AYRILAMIYOR. Elle iki yeri guncellemek zorunda
 * kalsaydik er gec biri unutulur ve "guncelledim mi" sorusu
 * cevaplanamaz hale gelirdi.
 *
 * versionCode: Android'in ic sayaci, her yayinda ARTMAK ZORUNDA ve
 * yalnizca tam sayi kabul ediyor ("1.2.3" gecerli degil). Surumden
 * turetiliyor:  major*10000 + minor*100 + patch  ->  1.2.3 = 10203
 *
 * Kullanim (depo kokunde):   npm run release:mobile
 * Cikti: mobile/dist/goz-<surum>.apk
 */
import { spawnSync } from "node:child_process"
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const kok = join(dirname(fileURLToPath(import.meta.url)), "..")

/* --- surumu oku ------------------------------------------------------ */
/* mobileVersion.ts bir TS modulu; Node'a yuklemek yerine duz metinden
   okunuyor -- tek bir satir ve derleyici zinciri gerektirmiyor. */
const src = readFileSync(join(kok, "app/utils/mobileVersion.ts"), "utf8")
const m = src.match(/version:\s*"(\d+)\.(\d+)\.(\d+)"/)
if (!m) {
  console.error("HATA: mobileVersion.ts icinde surum bulunamadi.")
  process.exit(1)
}
const [, maj, min, pat] = m
const surum = `${maj}.${min}.${pat}`
const kod = Number(maj) * 10000 + Number(min) * 100 + Number(pat)

console.log(`[yayin] surum ${surum}  (versionCode ${kod})`)

/* --- build.gradle'a yaz ---------------------------------------------- */
const gradlePath = join(kok, "mobile/android/app/build.gradle")
let gradle = readFileSync(gradlePath, "utf8")
const onceki = gradle
gradle = gradle
  .replace(/versionCode\s+\d+/, `versionCode ${kod}`)
  .replace(/versionName\s+"[^"]*"/, `versionName "${surum}"`)
if (gradle === onceki) {
  console.error("HATA: build.gradle icinde versionCode/versionName bulunamadi.")
  process.exit(1)
}
writeFileSync(gradlePath, gradle)
console.log("[yayin] build.gradle guncellendi")

/* --- adimlar ---------------------------------------------------------- */
function kos(komut, args, cwd) {
  const r = spawnSync(komut, args, { stdio: "inherit", shell: true, cwd, env: process.env })
  if (r.status !== 0) {
    console.error(`\nHATA: "${komut} ${args.join(" ")}" basarisiz (${r.status}).`)
    process.exit(r.status ?? 1)
  }
}

kos("node", ["tools/build-mobile.mjs"], kok)
kos("npx", ["cap", "sync", "android"], join(kok, "mobile"))

/*
 * JAVA_HOME: Android Studio'nun kendi JDK'si. PATH'te java olmayabilir
 * (bu makinede yoktu) -- varsa kullanicininki bozulmasin diye yalnizca
 * tanimsizsa atanıyor.
 */
const jbr = "C:\\Program Files\\Android\\Android Studio\\jbr"
if (!process.env.JAVA_HOME && existsSync(jbr)) {
  process.env.JAVA_HOME = jbr
  console.log("[yayin] JAVA_HOME -> Android Studio JDK")
}

const gradlew = process.platform === "win32" ? "gradlew.bat" : "./gradlew"
kos(gradlew, ["assembleDebug"], join(kok, "mobile/android"))

/* --- surumlu kopya ---------------------------------------------------- */
const apk = join(kok, "mobile/android/app/build/outputs/apk/debug/app-debug.apk")
if (!existsSync(apk)) {
  console.error("HATA: APK uretilmedi: " + apk)
  process.exit(1)
}
const distDir = join(kok, "mobile/dist")
mkdirSync(distDir, { recursive: true })
const hedef = join(distDir, `goz-${surum}.apk`)
copyFileSync(apk, hedef)

console.log(`\n[yayin] HAZIR: mobile/dist/goz-${surum}.apk`)
console.log("[yayin] Sunucuya atmak icin:")
console.log(
  `        scp mobile/dist/goz-${surum}.apk deploy@138.68.95.219:/var/www/mark0002-downloads/`
)
