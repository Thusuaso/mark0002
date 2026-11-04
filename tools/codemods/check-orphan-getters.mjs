/*
 * Sablonlarda KALAN, hicbir store'a baglanmamis getter adlarini bulur.
 *
 * NEDEN VAR -- gercek bir hata sonucu:
 * map-store-refs.mjs getter adlarini `mapGetters([...])` listesinden ve
 * `$store.getters.X` kullanimlarindan topluyor. Ama bir sablon, sayfanin
 * mapGetters listesinde OLMAYAN bir getter adini da kullanabiliyor:
 *
 *   pages/reports/mekmer/onhold.vue  ->  :loading="getLoading"
 *   ama mapGetters listesinde getLoading YOK
 *
 * Vue 2'de bu zaten bozuktu (computed tanimli olmadigi icin undefined
 * geliyordu, spinner hic gorunmuyordu) ve Vue 2 de uyari basiyordu.
 * Gecisten sonra ad oldugu gibi kaldi ve Vue 3 su uyariyi veriyor:
 *
 *   [Vue warn]: Property "getLoading" was accessed during render but is
 *   not defined on instance.
 *
 * Derleme gecer, sayfa render edilir, ilgili prop undefined olur.
 *
 * Bu arac Vuex modullerindeki TUM getter adlarini bilir; sablonda o
 * adlardan biri bir store degiskeni ONEKI OLMADAN geciyorsa isaretler.
 *
 * Kullanim:
 *   node tools/codemods/check-orphan-getters.mjs
 */
import fs from "node:fs"
import path from "node:path"

const PILOT = path.resolve(import.meta.dirname, "../..")
const VUEX_DIR = "C:/Users/mekma/Desktop/mark0002/store/modules"
const DIRS = ["app/components", "app/pages", "app/layouts"]

/* Vuex modullerindeki tum getter adlari */
function gettersOf(text) {
  const m = /const\s+getters\s*=\s*\{/.exec(text)
  if (!m) return []
  const out = []
  let d = 0
  for (const raw of text.slice(m.index + m[0].length - 1).split("\n")) {
    const l = raw.replace(/\/\/[^\n]*$/, "")
    if (d === 1) {
      const k = l.match(/^\s*([A-Za-z_$][\w$]*)\s*[:(]/)
      if (k) out.push(k[1])
    }
    for (const ch of l) {
      if (ch === "{" || ch === "(") d++
      else if (ch === "}" || ch === ")") d--
    }
    if (d <= 0) break
  }
  return out
}

const KNOWN = new Set()
for (const f of fs.readdirSync(VUEX_DIR).filter((f) => f.endsWith(".js"))) {
  for (const g of gettersOf(fs.readFileSync(path.join(VUEX_DIR, f), "utf8"))) KNOWN.add(g)
}

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, out)
    else if (e.name.endsWith(".vue")) out.push(p)
  }
  return out
}

const files = DIRS.flatMap((d) => walk(path.join(PILOT, d)))

let problems = 0

for (const abs of files) {
  const rel = path.relative(PILOT, abs).replace(/\\/g, "/")
  const text = fs.readFileSync(abs, "utf8")

  /* yorumlari ve belge blogunu at */
  const tplEnd = text.indexOf("<script")
  const tpl = (tplEnd === -1 ? text : text.slice(0, tplEnd)).replace(/<!--[\s\S]*?-->/g, "")

  /*
   * BILESENIN KENDI TANIMLADIGI ADLARI DISLA.
   *
   * app/components/shared/shared/Navbar.vue eski mapGetters adlarini
   * BILEREK uyumluluk computed'i olarak tutuyor:
   *     getAuthorityStatus() { return this.authority.getAuthorityStatus }
   * Boylece 540 satirlik sablona hic dokunulmamis. Ilk surum bunlari
   * "baglanmamis" sanip 7 yanlis pozitif uretti -- oysa o dosya calisiyor.
   *
   * Bu yuzden script bolumundeki computed/methods/data anahtarlari ve
   * setup() donusu taranip isim kumesinden cikariliyor.
   */
  const script = tplEnd === -1 ? "" : text.slice(tplEnd)
  const localNames = new Set()
  for (const m of script.matchAll(/^\s{2,6}([A-Za-z_$][\w$]*)\s*\(\s*\)\s*\{/gm)) localNames.add(m[1])
  for (const m of script.matchAll(/^\s{2,6}([A-Za-z_$][\w$]*)\s*:/gm)) localNames.add(m[1])
  for (const m of script.matchAll(/\b(?:const|let|var|function)\s+([A-Za-z_$][\w$]*)/g)) localNames.add(m[1])

  const hits = new Map()
  tpl.split("\n").forEach((line, i) => {
    for (const m of line.matchAll(/(^|[^\w$.])(get[A-Z][\w$]*)/g)) {
      const name = m[2]
      if (!KNOWN.has(name)) continue
      if (localNames.has(name)) continue
      if (!hits.has(name)) hits.set(name, [])
      hits.get(name).push(i + 1)
    }
  })

  if (!hits.size) continue
  problems++
  console.log(`\nX ${rel}: ${hits.size} baglanmamis getter adi`)
  for (const [name, lines] of hits) {
    console.log(`    ${name}  (sablon satiri ${lines.join(", ")})`)
  }
}

if (problems) {
  console.log(`\n${problems} dosyada baglanmamis getter var -- <store>.<getter> bicimine cevrilmeli.`)
  process.exit(1)
}
console.log(`${files.length} dosya tarandi. Baglanmamis getter yok.`)
