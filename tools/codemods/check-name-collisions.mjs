/*
 * Nuxt auto-import bilesen adlari PrimeVue'nun GLOBAL adlariyla
 * cakisiyor mu?
 *
 * NEDEN: @primevue/nuxt-module tum PrimeVue bilesenlerini global olarak
 * kaydediyor. Projedeki bir bilesenin auto-import adi bunlardan biriyle
 * ayni olursa sablondaki etiket PRIMEVUE'NUNKINE cozulur ve kendi
 * bilesenin SESSIZCE devre disi kalir -- hata yok, uyari yok.
 *
 * Bu gercek oldu: components/orders/lists/list.vue Nuxt 2'de `orderList`
 * adiyla kayitliydi. Pilotta order/List.vue yoluna kondu, ki auto-import
 * adi <OrderList> olsun ve sablonlar degismesin. Ama PrimeVue'nun da
 * `OrderList` adli bir bileseni var (suruklenebilir liste). Sonuc:
 * /orders/waiting sayfasi acildi, tablo YERINE bos bir PrimeVue OrderList
 * render edildi ve prop'lar attribute olarak dustu:
 *     <div class="p-orderlist p-component" status="Production" loading="false">
 *
 * Kullanim:
 *   node tools/codemods/check-name-collisions.mjs          (pilottaki bilesenler)
 *   node tools/codemods/check-name-collisions.mjs --plan   (Nuxt 2 kayitlarinin
 *                                                           planlanan adlari da)
 */
import fs from "node:fs"
import path from "node:path"

const PILOT_ROOT = path.resolve(import.meta.dirname, "../..")
const COMPONENTS_DIR = path.join(PILOT_ROOT, "app/components")
const PRIMEVUE_DIR = path.join(PILOT_ROOT, "node_modules/primevue")
const SRC_ROOT = "C:/Users/mekma/Desktop/mark0002"

/* ---------- PrimeVue'nun global bilesen adlari ---------- */

function primevueNames() {
  const names = new Set()
  for (const e of fs.readdirSync(PRIMEVUE_DIR, { withFileTypes: true })) {
    if (!e.isDirectory()) continue
    // paket klasorleri kucuk harf: "datatable", "orderlist", ...
    // gercek bilesen adini d.ts icindeki declare class'tan al
    const dts = path.join(PRIMEVUE_DIR, e.name, "index.d.ts")
    if (!fs.existsSync(dts)) continue
    const t = fs.readFileSync(dts, "utf8")

    /*
     * `export default <Ad>` en guvenilir kaynak.
     *
     * Ilk denemede yalnizca `declare class` araniyordu ve PrimeVue 4
     * bilesenleri `declare const X: DefineComponent<...>` kullandigi icin
     * HICBIRI yakalanmadi -- denetci "cakisma yok" dedi, oysa OrderList
     * cakisiyordu. Denetcinin kendisi yanlis guven veriyordu.
     */
    const m =
      t.match(/export\s+default\s+([A-Za-z_$][\w$]*)\s*;/) ||
      t.match(/declare\s+(?:class|const)\s+([A-Za-z_$][\w$]*)/)

    if (m) names.add(m[1])
    else names.add(e.name[0].toUpperCase() + e.name.slice(1))
  }
  return names
}

const PRIME = primevueNames()

/* ---------- Nuxt auto-import adi uretimi ---------- */

/*
 * Nuxt, components/ altindaki yolu PascalCase'e cevirip birlestirir ve
 * TEKRAR EDEN parcalari atar: order/List.vue -> OrderList,
 * supplier/Form.vue -> SupplierForm, shared/Navbar.vue -> SharedNavbar.
 */
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

/* ---------- pilottaki bilesenler ---------- */

console.log(`PrimeVue global bilesen adi: ${PRIME.size}`)

const rows = []
for (const rel of walk(COMPONENTS_DIR)) {
  const name = autoImportName(rel)
  rows.push({ rel, name, clash: PRIME.has(name) })
}

console.log("\n### Pilottaki bilesenler")
let clashes = 0
for (const r of rows.sort((a, b) => a.name.localeCompare(b.name))) {
  const mark = r.clash ? "  <-- CAKISIYOR (PrimeVue)" : ""
  if (r.clash) clashes++
  console.log(`  ${r.name.padEnd(28)} app/components/${r.rel}${mark}`)
}

/* ---------- henuz tasinmamis kayitlar icin on uyari ---------- */

if (process.argv.includes("--plan")) {
  const reg = fs.readFileSync(path.join(SRC_ROOT, "plugins/components.js"), "utf8")

  /*
   * Nuxt 2 plugin'i PrimeVue bilesenlerini de ELLE kaydediyordu
   * (import Button from "primevue/button"). Bunlar proje bileseni DEGIL;
   * pilotta @primevue/nuxt-module ayni adlarla kaydettigi icin "cakisma"
   * gibi gorunurler ama aslinda ayni bilesen. Ilk raporda 27 cakismanin
   * 26'si buydu ve tek gercek olan (orderList) arada kayboluyordu.
   * Bu yuzden kaynagi primevue/ olan import'lar ayiklaniyor.
   */
  const localIdents = new Set()
  for (const m of reg.matchAll(/import\s+([A-Za-z_$][\w$]*)\s+from\s+["']([^"']+)["']/g)) {
    if (!m[2].startsWith("primevue/")) localIdents.add(m[1])
  }

  const tags = new Map() // etiket -> ident
  for (const m of reg.matchAll(/Vue\.component\(\s*["']([^"']+)["']\s*,\s*([A-Za-z_$][\w$]*)/g)) {
    tags.set(m[1], m[2])
  }

  console.log("\n### Nuxt 2 kayitli PROJE bilesenleri -- PascalCase hali PrimeVue ile cakisanlar")
  let planned = 0
  for (const [t, ident] of [...tags].sort()) {
    if (!localIdents.has(ident)) continue // primevue'nun kendi bileseni
    const pascal = t[0].toUpperCase() + t.slice(1)
    if (PRIME.has(pascal)) {
      planned++
      console.log(`  ${t}  ->  ${pascal}   CAKISIYOR -- baska bir ad secilmeli`)
    }
  }
  if (!planned) console.log("  (yok)")
  clashes += planned
}

console.log(
  clashes
    ? `\n!! ${clashes} cakisma. Cakisan ad kullanilamaz: etiket PrimeVue'nunkine cozulur ve kendi bilesen sessizce devre disi kalir.`
    : "\nCakisma yok.",
)
process.exit(clashes ? 1 : 0)
