/*
 * Sablonda kullanilan her bilesen etiketi GERCEKTEN cozulebiliyor mu?
 *
 * ---------------------------------------------------------------------
 * NEDEN VAR -- IKI KEZ GERCEKLESEN BIR HATA
 * ---------------------------------------------------------------------
 * Nuxt 2'de bilesenler plugins/components.js icinde ELLE kaydediliyordu
 * ve ad, dosya yolundan BAGIMSIZDI:
 *
 *     Vue.component("guSupplierCost", guSupplierCost)
 *     Vue.component("FinancePaidListMekmer", FinancePaidListMekmer)
 *
 * Nuxt 3/4'te auto-import adi DOSYA YOLUNDAN uretiliyor:
 *
 *     app/components/reports/mekmar/GuSupplierCost.vue
 *         -> <ReportsMekmarGuSupplierCost>
 *
 * Yani tasima sirasinda sablondaki etiketin de degismesi gerekiyor.
 * vue2-to-vue3 codemod'u bunu YALNIZCA ILK HARFI BUYUTEREK yapiyor
 * (<guSupplierCost> -> <GuSupplierCost>), ki o ad cozulemez.
 *
 * COZULEMEYEN ETIKET SESSIZDIR: Vue 3 bilinmeyen bir etiketi DOM
 * elementi sanip oldugu gibi render eder. Konsolda yalnizca bir
 * "Failed to resolve component" uyarisi cikar (uretim derlemesinde o da
 * yok), prop'lar attribute olarak duser ve kullanici BOS BIR ALAN gorur.
 * Ne derleme ne sablon denetcisi yakalar.
 *
 * Bu iki kez oldu:
 *   pages/reports/mekmer/finance.vue  -> <FinancePaidListMekmer>
 *       ("Ödenen detay" diyalogu bos gelecekti)
 *   pages/reports/mekmar/supplier-cost.vue -> <GuSupplierCost>
 *       (sayfanin TEK icerigi o bilesendi)
 *
 * check-name-collisions.mjs bunu yakalamiyor -- o, adin PrimeVue ile
 * CAKISMASINA bakiyor; buradaki sorun adin HIC OLMAMASI.
 *
 * Kullanim:
 *   node tools/codemods/check-component-tags.mjs
 *   node tools/codemods/check-component-tags.mjs --list   (cozulen adlari da yazar)
 *
 * Cikis kodu 1 = en az bir cozulemeyen etiket var.
 */
import fs from "node:fs"
import path from "node:path"

const PILOT_ROOT = path.resolve(import.meta.dirname, "../..")
const APP_DIR = path.join(PILOT_ROOT, "app")
const COMPONENTS_DIR = path.join(APP_DIR, "components")
const PRIMEVUE_DIR = path.join(PILOT_ROOT, "node_modules/primevue")

/* ---------- PrimeVue'nun global adlari ---------- */
/* check-name-collisions.mjs ile ayni mantik; oradaki nota bakin
   (PrimeVue 4 `declare const` kullaniyor, `declare class` yetmiyor). */
function primevueNames() {
  const names = new Set()
  if (!fs.existsSync(PRIMEVUE_DIR)) return names

  for (const e of fs.readdirSync(PRIMEVUE_DIR, { withFileTypes: true })) {
    if (!e.isDirectory()) continue
    const dts = path.join(PRIMEVUE_DIR, e.name, "index.d.ts")
    if (!fs.existsSync(dts)) continue

    const t = fs.readFileSync(dts, "utf8")
    const m =
      t.match(/export\s+default\s+([A-Za-z_$][\w$]*)\s*;/) ||
      t.match(/declare\s+(?:class|const)\s+([A-Za-z_$][\w$]*)/)

    names.add(m ? m[1] : e.name[0].toUpperCase() + e.name.slice(1))
  }
  return names
}

/* ---------- Nuxt auto-import adi ---------- */
/* Yolu PascalCase'e cevirip birlestirir, TEKRAR EDEN parcalari atar. */
function autoImportName(relPath) {
  const parts = relPath
    .replace(/\.vue$/, "")
    .split("/")
    .filter(Boolean)
    .map((s) => s[0].toUpperCase() + s.slice(1))

  const out = []
  for (const p of parts) {
    if (out.length && out[out.length - 1].toLowerCase() === p.toLowerCase()) continue
    out.push(p)
  }
  return out.join("")
}

function walk(dir, base = dir, out = []) {
  if (!fs.existsSync(dir)) return out
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, base, out)
    else if (e.name.endsWith(".vue")) out.push(path.relative(base, p).replace(/\\/g, "/"))
  }
  return out
}

/* ---------- cozulebilir adlar ---------- */

const NUXT_BUILTINS = new Set([
  "NuxtPage", "NuxtLayout", "NuxtLink", "NuxtLoadingIndicator",
  "NuxtErrorBoundary", "NuxtWelcome", "NuxtImg", "NuxtPicture",
  "NuxtClientFallback", "NuxtIsland", "ClientOnly", "DevOnly", "ServerPlaceholder",
])

const VUE_BUILTINS = new Set([
  "Transition", "TransitionGroup", "KeepAlive", "Teleport", "Suspense",
  "Component", "Slot",
])

/*
 * camelCase SVG etiketleri: buyuk harf icerdikleri icin "bilesen" gibi
 * gorunurler ama HTML/SVG'nin kendi elementleridir.
 */
const SVG_CAMEL = new Set([
  "clipPath", "linearGradient", "radialGradient", "textPath", "foreignObject",
  "feGaussianBlur", "feOffset", "feBlend", "feColorMatrix", "feComponentTransfer",
  "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap",
  "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG",
  "feFuncR", "feImage", "feMerge", "feMergeNode", "feMorphology", "fePointLight",
  "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence",
  "animateMotion", "animateTransform", "glyphRef", "altGlyph", "altGlyphDef",
  "altGlyphItem",
])

const PRIME = primevueNames()
const PILOT = new Map() // ad -> dosya
for (const rel of walk(COMPONENTS_DIR)) PILOT.set(autoImportName(rel), rel)

/* Etiket karsilastirmasi icin normalizasyon: kebab-case ve PascalCase
   Nuxt'ta aynidir (<reports-mekmar-gu-supplier-cost> == PascalCase). */
function normalize(tag) {
  return tag
    .split("-")
    .filter(Boolean)
    .map((s) => s[0].toUpperCase() + s.slice(1))
    .join("")
}

const RESOLVABLE = new Set([
  ...PRIME,
  ...PILOT.keys(),
  ...NUXT_BUILTINS,
  ...VUE_BUILTINS,
])
const RESOLVABLE_NORM = new Set([...RESOLVABLE].map(normalize))

/* ---------- tarama ---------- */

/* Yalnizca <template> blogu; HTML yorumlari atiliyor.
   (Dosya sonundaki gecis notlari <!-- --> icinde ve orada ESKI
   etiket adlari ornek olarak geciyor -- onlar hata degil.) */
function templateOf(text) {
  const m = text.match(/<template>([\s\S]*)<\/template>/)
  if (!m) return ""
  return m[1].replace(/<!--[\s\S]*?-->/g, "")
}

function localComponents(text) {
  const names = new Set()

  /* components: { A, B } ve import A from "..." */
  for (const m of text.matchAll(/^\s*import\s+([A-Za-z_$][\w$]*)\s+from/gm)) {
    names.add(m[1])
  }
  const block = text.match(/components:\s*\{([^}]*)\}/)
  if (block) {
    for (const m of block[1].matchAll(/([A-Za-z_$][\w$]*)/g)) names.add(m[1])
  }
  return names
}

const targets = []
for (const sub of ["pages", "components", "layouts"]) {
  const dir = path.join(APP_DIR, sub)
  for (const rel of walk(dir)) targets.push({ abs: path.join(dir, rel), rel: sub + "/" + rel })
}

const problems = []
let tagCount = 0

for (const t of targets) {
  const text = fs.readFileSync(t.abs, "utf8")
  const tpl = templateOf(text)
  if (!tpl) continue

  const local = localComponents(text)
  const lines = tpl.split("\n")

  lines.forEach((line, i) => {
    for (const m of line.matchAll(/<([A-Za-z][A-Za-z0-9_.-]*)/g)) {
      const tag = m[1]

      /* Bilesen adayi: buyuk harf iceriyor VEYA tire iciyor.
         Tamami kucuk ve tiresiz olanlar HTML elementi. */
      const isCandidate = /[A-Z]/.test(tag) || tag.includes("-")
      if (!isCandidate) continue
      if (SVG_CAMEL.has(tag)) continue
      if (tag.includes(".")) continue /* <Foo.Bar> gibi; projede yok */

      tagCount++
      const norm = normalize(tag)
      if (RESOLVABLE_NORM.has(norm) || local.has(tag) || RESOLVABLE.has(tag)) continue

      problems.push({ file: t.rel, line: i + 1, tag })
    }
  })
}

console.log(`PrimeVue global ad: ${PRIME.size}, pilot bileseni: ${PILOT.size}`)
console.log(`${targets.length} dosya, ${tagCount} bilesen etiketi denetlendi.`)

if (process.argv.includes("--list")) {
  console.log("\n### Pilot bilesen adlari")
  for (const [name, rel] of [...PILOT].sort()) console.log(`  ${name.padEnd(42)} ${rel}`)
}

if (!problems.length) {
  console.log("\nCozulemeyen bilesen etiketi yok.")
  process.exit(0)
}

console.log(`\n!! ${problems.length} COZULEMEYEN ETIKET:`)
for (const p of problems) {
  console.log(`  ${p.file}:${p.line}  <${p.tag}>`)
}
console.log(
  "\nBu etiketler DOM elementi olarak render edilir: alan bos gorunur,\n" +
    "prop'lar attribute'a duser ve uretim derlemesinde uyari da cikmaz.\n" +
    "Beklenen ad, bilesenin app/components altindaki YOLUNDAN uretilir."
)
process.exit(1)
