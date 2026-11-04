/*
 * Pilottaki TUM .vue dosyalarini VUE 3 derleyicisinden gecirir.
 *
 * NEDEN VAR -- iki ayri yanlis guven kaynagi yuzunden:
 *
 * 1) tools/codemods/verify-templates.mjs VUE 2 derleyicisini kullaniyor
 *    (Nuxt 2 kaynagini on-kontrol icin yazilmis) ve 215 sablonun
 *    tamaminda 0 HATA raporluyor. Oysa
 *    components/orders/lists/shipped.vue'da `<a` ACILIS ETIKETI EKSIKTI:
 *
 *        <div v-if="slotProps.data.EvrakDurum > 0">
 *          (bos satir -- <a burada olmaliydi)
 *            :href="'https://.../download/2/' + slotProps.data.SiparisNo"
 *          >
 *            <i class="pi pi-download" />
 *          </a>
 *
 *    Vue 2 derleyicisi bunu TOLERE ediyor; Vue 3
 *    "SyntaxError: Invalid end tag" ile derlemeyi KESIYOR. Yani Vue 2
 *    tabanli on-kontrol, Vue 3 kirilmalarini ONGOREMEZ.
 *
 * 2) `nuxt build` KULLANILMAYAN bileseni DERLEMEZ. order/ShippedList.vue
 *    tasindiktan sonra build "Build complete" dedi ve o halde commit'lendi
 *    -- cunku o bileseni henuz hicbir sayfa kullanmiyordu. Hata ancak
 *    reports/mekmer/shipped.vue onu kullanmaya basladiginda cikti.
 *    Ayni sekilde eksik `xlsx` bagimliligi da o ana kadar gorunmedi.
 *
 * Bu arac her .vue dosyasini TEK TEK, referans edilip edilmedigine
 * bakmadan Vue 3 SFC derleyicisinden geciriyor.
 *
 * Kullanim:
 *   node tools/codemods/verify-templates-vue3.mjs
 */
import fs from "node:fs"
import path from "node:path"
import { createRequire } from "node:module"

const PILOT = path.resolve(import.meta.dirname, "../..")
const require = createRequire(path.join(PILOT, "package.json"))
const sfc = require("@vue/compiler-sfc")

const DIRS = ["app/components", "app/pages", "app/layouts"]

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

let failed = 0
const problems = []

for (const abs of files) {
  const rel = path.relative(PILOT, abs).replace(/\\/g, "/")
  const src = fs.readFileSync(abs, "utf8")

  const { descriptor, errors } = sfc.parse(src, { filename: rel })
  const all = [...errors]

  if (descriptor.template) {
    const res = sfc.compileTemplate({
      source: descriptor.template.content,
      filename: rel,
      id: rel,
    })
    all.push(...(res.errors ?? []))
  }

  if (!all.length) continue
  failed++
  problems.push({ rel, errors: all })
}

console.log(`Derlenen .vue dosyasi : ${files.length}`)
console.log(`HATALI                : ${failed}`)

for (const p of problems) {
  console.log(`\nX ${p.rel}`)
  for (const e of p.errors) {
    const loc = e.loc?.start ? ` (${e.loc.start.line}:${e.loc.start.column})` : ""
    console.log(`    ${typeof e === "string" ? e : e.message}${loc}`)
  }
}

if (failed) process.exit(1)
console.log("\nTum sablonlar Vue 3 derleyicisinden gecti.")
