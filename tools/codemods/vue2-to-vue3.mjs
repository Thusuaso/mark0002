/*
 * Codemod: Vue 2 / PrimeVue 2 bileseni -> Vue 3 / PrimeVue 4
 *
 * SADECE MEKANIK donusumler. Store cagrilari, prop mutasyonlari, olu kod
 * ve davranis kararlari ELLE yapilir -- bu arac onlara dokunmaz.
 *
 * Kullanim:
 *   node vue2-to-vue3.mjs <kaynak.vue>                   (kuru calisma, farki gosterir)
 *   node vue2-to-vue3.mjs <kaynak.vue> --out <hedef.vue> (yazar)
 *
 * Kaynak yolu Nuxt 2 deposuna gore, hedef yolu pilota gore verilir.
 *
 * NEDEN CODEMOD: kalan bilesenler 1541 / 1034 / 893 / 658 / 1324 satir.
 * Bunlari elden gecirirken ayni 8 donusumu yuzlerce kez tekrarlamak hem
 * yavas hem de gozden kacirmaya acik. Codemod her degisikligi SAYIYOR,
 * boylece "kac yer degisti" dogrulanabiliyor.
 */
import fs from "node:fs"
import path from "node:path"

const SRC_ROOT = "C:/Users/mekma/Desktop/mark0002"

const args = process.argv.slice(2)
const srcArg = args[0]
const outIdx = args.indexOf("--out")
const outPath = outIdx > -1 ? args[outIdx + 1] : null

if (!srcArg) {
  console.error("kullanim: node vue2-to-vue3.mjs <kaynak.vue> [--out <hedef.vue>]")
  process.exit(1)
}

const srcPath = path.isAbsolute(srcArg) ? srcArg : path.join(SRC_ROOT, srcArg)
if (!fs.existsSync(srcPath)) {
  console.error(`bulunamadi: ${srcPath}`)
  process.exit(1)
}

let text = fs.readFileSync(srcPath, "utf8")
const counts = {}
const bump = (k, n = 1) => (counts[k] = (counts[k] ?? 0) + n)

function replace(key, re, fn) {
  text = text.replace(re, (...a) => {
    bump(key)
    return typeof fn === "function" ? fn(...a) : fn
  })
}

/* ---------- 1) PrimeVue import yollari ---------- */

/*
 * Sonda EGIK CIZGI de kabul ediliyor.
 *
 * NEDEN: components/finance/lists/po.vue `from 'primevue/api/'` yaziyordu
 * ve ilk kalip ESLESMIYORDU -- codemod hicbir sey raporlamadi, hata
 * ancak `nuxt build` sirasinda "Failed to resolve import" olarak cikti.
 * Alt paket PrimeVue 4'te tamamen kaldirildi, yani eski yolun HER
 * varyanti derlemeyi dusurur.
 */
replace(
  "primevue/api -> @primevue/core/api",
  /(["'])primevue\/api\/?\1/g,
  '"@primevue/core/api"'
)

/* ---------- 2) .sync codemod'unun acik bicimi -> v-model:X ----------
 *
 * Kaynak depoda .sync zaten
 *   :x="v" @update:x="v = $event"
 * bicimine cevrilmisti (codemod-sync.mjs). Vue 3'te bunun kisasi
 * v-model:x. Ikisi de calisir; v-model tercih ediliyor cunku PrimeVue 4
 * dokumantasyonu bu bicimde ve okunurlugu yuksek.
 *
 * DIKKAT: yalnizca ifade DUZ BIR DEGISKEN/YOL ise donusturulur
 * ("a", "a.b"). "arr[i].x = $event" gibi durumlarda v-model de calisir
 * ama donusumu dogrulamak zorlasir -- oldugu gibi birakiliyor.
 */
const SIMPLE_PATH = "[A-Za-z_$][A-Za-z0-9_$]*(?:\\.[A-Za-z_$][A-Za-z0-9_$]*)*"
replace(
  ":x + @update:x -> v-model:x",
  new RegExp(
    `:([A-Za-z][A-Za-z0-9-]*)="(${SIMPLE_PATH})"\\s*@update:\\1="\\2\\s*=\\s*\\$event"`,
    "g",
  ),
  (_m, prop, expr) => `v-model:${prop}="${expr}"`,
)

/* ---------- 3) PrimeVue 4 bilesen adlari ----------
 *
 * 4.5.5'te eski adlar hala CALISIYOR (deprecated takma ad), ama yeni
 * adlara geciliyor: 5.x'te kaldirilacaklar ve ticari lisans oncesi son
 * MIT surumde kalmak zorunda oldugumuz icin (bkz. nuxt.config.ts)
 * en azindan adlari guncel tutmak isteniyor.
 */
const RENAMES = [
  ["Calendar", "DatePicker"],
  ["Dropdown", "Select"],
  ["InputSwitch", "ToggleSwitch"],
  ["OverlayPanel", "Popover"],
  ["Sidebar", "Drawer"],
]
for (const [from, to] of RENAMES) {
  replace(`<${from}> -> <${to}>`, new RegExp(`<(/?)${from}(?=[\\s/>])`, "g"), (_m, slash) => `<${slash}${to}`)
}

/* ---------- 3b) PROJE bilesen etiketleri: camelCase -> PascalCase ----------
 *
 * NEDEN ZORUNLU -- OLCULDU, VARSAYIM DEGIL:
 * Nuxt 2 sablonlari bilesenleri camelCase yaziyor (<orderList>,
 * <orderDetailForm>). Nuxt'un auto-import cozumlemesi bu bicimi
 * TANIMIYOR; Vue calisma aninda adi buyuk harfe cevirip GLOBAL kayitlara
 * bakiyor. Sonuc:
 *   - adin global karsiligi yoksa  -> "Failed to resolve component",
 *     bilesen SESSIZCE yok olur (sayfa hatasiz render edilir),
 *   - varsa (orn. PrimeVue'nun OrderList'i) -> YANLIS bilesen render
 *     edilir ve prop'lar attribute olarak duser.
 * Ikisi de /orders/waiting'de gercekten yasandi.
 *
 * Etiket haritasi plugins/components.js'ten uretiliyor; primevue/'dan
 * gelen kayitlar ayiklaniyor (onlar PrimeVue'nun kendi bilesenleri,
 * zaten dogru adla global).
 */
const TAG_OVERRIDES = {
  // PrimeVue 4'un `OrderList` bileseniyle cakisiyor -- bkz. order/Table.vue
  orderList: "OrderTable",

  /*
   * `orderList2` -> `OrderList2` PrimeVue ile CAKISMIYOR, yani teknik
   * olarak zorunlu degil. Yine de yeniden adlandirildi: kardesi
   * OrderTable oldugu icin yan yana `OrderTable` ve `OrderList2`
   * gormek, ikisinin ayni isi yapan iki varyant oldugunu gizliyor.
   * (list2.vue, list.vue'nun %77 ayni, 2 DataTable'li sade surumu.)
   */
  orderList2: "OrderTable2",
}

{
  const regPath = path.join(SRC_ROOT, "plugins/components.js")
  if (fs.existsSync(regPath)) {
    const reg = fs.readFileSync(regPath, "utf8")

    const localIdents = new Set()
    for (const m of reg.matchAll(/import\s+([A-Za-z_$][\w$]*)\s+from\s+["']([^"']+)["']/g)) {
      if (!m[2].startsWith("primevue/")) localIdents.add(m[1])
    }

    const tagMap = new Map()
    for (const m of reg.matchAll(/Vue\.component\(\s*["']([^"']+)["']\s*,\s*([A-Za-z_$][\w$]*)/g)) {
      const [, tag, ident] = m
      if (!localIdents.has(ident)) continue
      const pascal = TAG_OVERRIDES[tag] ?? tag[0].toUpperCase() + tag.slice(1)
      if (pascal !== tag) tagMap.set(tag, pascal)
    }

    for (const [tag, pascal] of tagMap) {
      const re = new RegExp(`<(/?)${tag}(?=[\\s/>])`, "g")
      const n = (text.match(re) || []).length
      if (!n) continue
      text = text.replace(re, (_m, slash) => `<${slash}${pascal}`)
      bump(`<${tag}> -> <${pascal}>`, n)
    }
  }
}

/* ---------- 4) AutoComplete: field -> optionLabel ----------
 * `field` prop'u PrimeVue 4'te KALDIRILDI. Birebir tasinirsa oneri
 * listesi nesneleri "[object Object]" olarak gorunur.
 */
text = text.replace(/<AutoComplete\b[\s\S]*?>/g, (tag) => {
  if (!/\bfield="/.test(tag)) return tag
  bump("AutoComplete field -> optionLabel")
  return tag.replace(/\bfield="/, 'optionLabel="')
})

/* ---------- 5) p-button-* sinifi -> severity prop'u ----------
 * PrimeVue 4'te renk siniflari kaldirildi; sinif birakilirsa buton
 * sessizce duz renk cikar (orn. "Sil" butonu kirmizi olmaz).
 */
const SEVERITIES = ["secondary", "success", "info", "warning", "warn", "help", "danger", "contrast"]
text = text.replace(/class="([^"]*)"/g, (whole, cls) => {
  const parts = cls.split(/\s+/).filter(Boolean)
  const hit = parts.find((p) => p.startsWith("p-button-") && SEVERITIES.includes(p.slice(9)))
  if (!hit) return whole
  bump("p-button-* -> severity")
  let sev = hit.slice(9)
  if (sev === "warning") sev = "warn" // v4'te adi "warn"
  const rest = parts.filter((p) => p !== hit).join(" ")
  return rest ? `severity="${sev}" class="${rest}"` : `severity="${sev}"`
})

/* ---------- 6) Yasam dongusu kancalari ---------- */

replace("beforeDestroy -> beforeUnmount", /\bbeforeDestroy\s*\(/g, "beforeUnmount(")
replace("destroyed -> unmounted", /(^|[^A-Za-z_$.])destroyed\s*\(/gm, (_m, pre) => `${pre}unmounted(`)

/* ---------- 7) Scoped style derin seciciler ---------- */

replace("::v-deep -> :deep()", /::v-deep\s+([^\s{,]+)/g, (_m, sel) => `:deep(${sel})`)
replace(">>> -> :deep()", /([.#]?[A-Za-z][\w-]*)\s*>>>\s*([^\s{,]+)/g, (_m, a, b) => `${a} :deep(${b})`)

/* ---------- 8) Noktali virgulsuz stil (pilot konvansiyonu) ----------
 * Pilottaki dosyalar noktali virgul kullanmiyor. Bu bir BICIM degisikligi
 * ve dogrulamayi zorlastirir, bu yuzden codemod BUNU YAPMIYOR -- elle
 * yapilan dokunuslarda uygulaniyor.
 */

/* ---------- rapor ---------- */

const keys = Object.keys(counts)
console.log(`\n### ${srcArg}`)
if (!keys.length) {
  console.log("  mekanik donusum gerekmiyor")
} else {
  for (const k of keys) console.log(`  ${String(counts[k]).padStart(4)}x  ${k}`)
}

/* Elle ilgilenilmesi gerekenleri hatirlat -- codemod bunlara DOKUNMAZ. */
const manual = [
  [/this\.\$store\.(dispatch|getters)/g, "$store.dispatch / $store.getters -> Pinia store"],
  [/mapGetters|mapActions/g, "mapGetters/mapActions -> Pinia store computed'leri"],
  [/this\.\$axios/g, "this.$axios -> useLegacyApi()"],
  [/this\.\$toast/g, "this.$toast -> useAppToast()"],
  [/this\.\$excelApi/g, "this.$excelApi -> useExcelApi()"],
  [/from\s+["'][^"']*plugins\/upload["']/g, "plugins/upload -> useFileService()"],
  [/from\s+["'][^"']*plugins\/date["']/g, "plugins/date -> ~/utils/dates (toIsoDate/fromIsoDate)"],
  [/\bCookies\.(get|set|remove)\(/g, "js-cookie -> useCookie"],
  [/this\.\$router\.push\(/g, "this.$router.push -> navigateTo"],
  [/\bconsole\.log\(/g, "console.log -- hata ayiklama artigi olabilir"],
  [
    /class="[^"]*\bp-float-label\b/g,
    'p-float-label -> <FloatLabel>  (PrimeVue 4\'te SINIF KALDIRILDI -- ' +
      "node tools/codemods/codemod-float-label.mjs --write ile cevir)",
  ],
  [
    /\bp-button-(secondary|success|info|warning|warn|help|danger|contrast)\b/g,
    "p-button-* sinifi kaldi (muhtemelen :class icinde) -> severity",
  ],
]
const todo = manual
  .map(([re, label]) => [label, (text.match(re) || []).length])
  .filter(([, n]) => n > 0)

if (todo.length) {
  console.log("\n  ELLE YAPILACAK (codemod dokunmadi):")
  for (const [label, n] of todo) console.log(`  ${String(n).padStart(4)}x  ${label}`)
}

if (outPath) {
  fs.mkdirSync(path.dirname(outPath), { recursive: true })
  fs.writeFileSync(outPath, text, "utf8")
  console.log(`\n  yazildi: ${outPath}`)
} else {
  console.log("\n  (kuru calisma -- yazmak icin --out <hedef>)")
}
