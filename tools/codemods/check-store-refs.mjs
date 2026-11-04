/*
 * Denetci: bir Nuxt 2 sayfasinin/bileseninin kullandigi TUM store
 * uyelerinin pilotta hangi store'da oldugunu (ya da EKSIK oldugunu)
 * raporlar.
 *
 * Kullanim:
 *   node check-store-refs.mjs pages/panel/project/index.vue components/panel/project/form.vue
 *   node check-store-refs.mjs --dir components/panel
 *
 * ---------------------------------------------------------------------
 * NEDEN VAR
 * ---------------------------------------------------------------------
 * Vuex modulleri NAMESPACED DEGILDI: bir sayfa `dispatch("setX")`
 * yazdiginda o action HANGI modulde olursa olsun calisiyordu. Pilotta
 * her modul ayri bir Pinia store'u, yani tasirken her ad icin "bu hangi
 * store'da?" sorusunu cevaplamak gerekiyor.
 *
 * Bu is elle yapildiginda iki hata bicimi uretiyor:
 *
 *   1) EKSIK UYE -- adi hic olmayan bir action cagirmak. Derleme
 *      GECER; hata yalnizca o kod yolu calisinca
 *      "TypeError: x is not a function" olarak cikar, yani kullanici
 *      "Kaydet"e bastiginda.
 *   2) YANLIS STORE -- ayni ad iki store'da varsa yanlisini baglamak.
 *      Bu hic hata vermez, sessizce yanlis state'i okur.
 *
 * Arac ikisini de tasimadan ONCE gosteriyor. (1) icin verify-stores.mjs
 * zaten var ama o YAZILMIS pilot store'unu denetliyor; bu arac henuz
 * yazilmamis sayfa icin on kontrol yapiyor.
 *
 * Cikis kodu 1 = en az bir EKSIK uye veya COK ANLAMLI ad var.
 */
import fs from "node:fs"
import path from "node:path"

const SRC_ROOT = "C:/Users/mekma/Desktop/mark0002"
const PILOT_STORES = "C:/Users/mekma/Desktop/mark0002-nuxt3-pilot/app/stores"

/* --- pilot store uyeleri: { storeAdi: Set<uye> } --- */
const stores = {}
for (const f of fs.readdirSync(PILOT_STORES)) {
  if (!f.endsWith(".ts")) continue
  const t = fs.readFileSync(path.join(PILOT_STORES, f), "utf8")
  /*
   * PARAMETRESIZ GETTER DE SAYILIR.
   *
   * Ilk surum yalnizca `ad: (state) => ...` kalibini taniyordu.
   * Ama bazi getter'lar state'e hic dokunmuyor ve `ad: () => ...`
   * yaziliyor (orn. local.ts'teki getLocalUrl, degeri
   * runtimeConfig'den okuyor). Onlar EKSIK sanilip yanlis alarm
   * veriyordu -- arac yanlis alarm verdiginde gercek bulgular da
   * guven kaybediyor.
   */
  const getters = [...t.matchAll(/^\s{4}(\w+):\s*\((?:state)?\)/gm)].map((m) => m[1])
  const actions = [...t.matchAll(/^\s{4}(?:async\s+)?(\w+)\s*\(/gm)].map((m) => m[1])
  stores[path.basename(f, ".ts")] = new Set([...getters, ...actions])
}

/*
 * BILINEN YENIDEN ADLANDIRMALAR.
 *
 * Bazi Vuex uyeleri pilotta BASKA ADLA karsilaniyor; adi birebir
 * aramak bunlari EKSIK gosterip yanlis alarm uretir.
 *
 * `loading` Vuex modulu pilotta ayri bir store DEGIL -- shared store'un
 * parcasi ve sayac tabanli (Vuex'te boolean'di):
 *   setBeginLoadingAction -> shared.beginLoading()
 *   setEndLoadingAction   -> shared.endLoading()
 *   getLoading            -> shared.isLoading
 * Ayni esleme wire-stores.mjs icinde de var; arac ile denetci
 * ayrismasin diye burada da yazili.
 */
const TAKMA_ADLAR = {
  setBeginLoadingAction: "beginLoading",
  setEndLoadingAction: "endLoading",
  getLoading: "isLoading",
}

function nerede(ad) {
  return Object.entries(stores).filter(([, m]) => m.has(ad)).map(([s]) => s)
}

/* --- hedef dosyalar --- */
const args = process.argv.slice(2)

/*
 * --dir ARGUMANLARI EZMIYOR, EKLIYOR.
 *
 * Ilk surumde `--dir` verildiginde konumsal dosya argumanlari YOK
 * SAYILIYORDU. Sonuc sessiz ve kotu: `check-store-refs.mjs
 * pages/sample/sample.vue --dir components/sample` cagrisinda SAYFALAR
 * HIC TARANMIYOR ve arac "EKSIK 0" diyordu -- yani tam da eksikleri
 * gostermesi gereken yerde SAHTE BIR TEMIZ RAPORU veriyordu.
 * (sample sayfalarinda 12 mapGetters getter'i boyle atlandi.)
 */
let files = []
const dirIdx = args.indexOf("--dir")

if (dirIdx > -1) {
  const kok = path.join(SRC_ROOT, args[dirIdx + 1])
  const gez = (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name)
      if (e.isDirectory()) gez(p)
      else if (e.name.endsWith(".vue")) {
        files.push(path.relative(SRC_ROOT, p).split(path.sep).join("/"))
      }
    }
  }
  gez(kok)
}

/* --dir ve degerini cikar, geri kalan konumsal argumanlar da dosyadir. */
const konumsal = args.filter((a, i) => {
  if (a === "--dir") return false
  if (dirIdx > -1 && i === dirIdx + 1) return false
  return !a.startsWith("--")
})
files = [...new Set([...files, ...konumsal])]

if (!files.length) {
  console.error("kullanim: node check-store-refs.mjs <dosya...> | --dir <klasor>")
  process.exit(1)
}

/* ad -> { tur, dosyalar[] } */
const bulgular = new Map()

function ekle(ad, tur, dosya) {
  if (!bulgular.has(ad)) bulgular.set(ad, { tur, dosyalar: new Set() })
  bulgular.get(ad).dosyalar.add(dosya)
}

for (const rel of files) {
  const abs = path.join(SRC_ROOT, rel)
  if (!fs.existsSync(abs)) {
    console.log(`!! yok: ${rel}`)
    continue
  }
  const t = fs.readFileSync(abs, "utf8")

  /* mapGetters(["a","b"]) ve mapGetters({x:"a"}) -- ikisinde de
     tirnakli get* adlari aranir. */
  for (const m of t.matchAll(/["'](get[A-Z]\w*)["']/g)) ekle(m[1], "getter", rel)
  /* $store.getters.getX */
  for (const m of t.matchAll(/\$store\.getters\.(\w+)/g)) ekle(m[1], "getter", rel)
  /* dispatch("X") */
  for (const m of t.matchAll(/dispatch\(\s*["'](\w+)["']/g)) ekle(m[1], "action", rel)
  /* commit("X") -> pilotta MUT_X */
  for (const m of t.matchAll(/commit\(\s*["'](\w+)["']/g)) ekle(m[1], "mutation", rel)
}

let eksik = 0
let belirsiz = 0
const satirlar = []

for (const [ad, { tur, dosyalar }] of [...bulgular].sort()) {
  const aranan =
    TAKMA_ADLAR[ad] ?? (tur === "mutation" ? "MUT_" + ad : ad)
  let n = nerede(aranan)
  /* mutation MUT_ onegiyle bulunamadiysa duz adi da dene: bazi
     mutation'lar codemod sirasinda cagiran action'in icine alindi. */
  if (!n.length && tur === "mutation") n = nerede(ad)

  let durum
  if (!n.length) {
    durum = "EKSIK"
    eksik++
  } else if (n.length > 1) {
    durum = "BELIRSIZ(" + n.join("/") + ")"
    belirsiz++
  } else {
    durum = n[0]
  }
  satirlar.push({ ad: aranan, tur, durum, dosyalar: [...dosyalar] })
}

console.log("uye".padEnd(44) + "tur".padEnd(10) + "store")
console.log("-".repeat(78))
for (const s of satirlar) {
  const isaret = s.durum === "EKSIK" ? "!! " : s.durum.startsWith("BELIRSIZ") ? "?? " : "   "
  console.log(isaret + s.ad.padEnd(41) + s.tur.padEnd(10) + s.durum)
}
console.log("-".repeat(78))
console.log(`${satirlar.length} uye | EKSIK ${eksik} | BELIRSIZ ${belirsiz}`)

if (eksik) {
  console.log("\n!! EKSIK uyeler ve nerede kullanildiklari:")
  for (const s of satirlar.filter((x) => x.durum === "EKSIK")) {
    console.log(`   ${s.ad}  <- ${s.dosyalar.join(", ")}`)
  }
  console.log("\n   Bunlar icin ilgili Vuex modulu henuz tasinmamis olabilir:")
  console.log("   node tools/codemods/vuex-to-pinia.mjs <modul> --write")
}

process.exit(eksik || belirsiz ? 1 : 0)
