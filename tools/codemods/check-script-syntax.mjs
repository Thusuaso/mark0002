/*
 * Her .vue dosyasinin <script> bloklari AYRISTIRILABILIYOR mu?
 *
 * ---------------------------------------------------------------------
 * NEDEN VAR -- DENETCI BOSLUGU
 * ---------------------------------------------------------------------
 * verify-templates-vue3.mjs yalnizca <template> blogunu derliyor.
 * <script> icindeki bir SOZDIZIMI hatasi o denetciden de, diger bes
 * denetciden de GECIYOR ve ancak `nuxt build` ile ortaya cikiyor --
 * yani ~10 dakika sonra.
 *
 * Bu gercek oldu: pages/reports/mekmar/loading.vue'da Nuxt 2'de bir
 * izleyici mapGetters getter'ini izliyordu:
 *
 *     watch: { getYearList() { ... } }
 *
 * Getter store'a tasinirken ad `sharedStore.getYearList` oldu ve izleyici
 * anahtari da oyle yazildi:
 *
 *     watch: { sharedStore.getYearList() { ... } }   // GECERSIZ
 *
 * Nesne anahtarinda nokta olamaz; derleme
 *     SyntaxError: [vue/compiler-sfc] Unexpected token, expected ","
 * veriyor. Alti denetci de "temiz" dedi. (Dogrusu anahtarin TIRNAK ICINDE
 * olmasi: "sharedStore.getYearList"() -- Vue 3 noktali yol anahtarlarini
 * dizgi olarak destekliyor.)
 *
 * Bu denetci saniyeler surer ve ayni sinifi derlemeden once yakalar.
 *
 * Kullanim:
 *   node tools/codemods/check-script-syntax.mjs
 *
 * Cikis kodu 1 = en az bir dosya ayristirilamadi.
 */
import fs from "node:fs"
import path from "node:path"
import { parse as parseSfc } from "@vue/compiler-sfc"
import { parse as parseJs } from "@babel/parser"

const PILOT_ROOT = path.resolve(import.meta.dirname, "../..")
const APP_DIR = path.join(PILOT_ROOT, "app")

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, out)
    else if (e.name.endsWith(".vue")) out.push(p)
  }
  return out
}

const files = walk(APP_DIR)
const problems = []
let blocks = 0

for (const file of files) {
  const rel = path.relative(PILOT_ROOT, file).replace(/\\/g, "/")
  const text = fs.readFileSync(file, "utf8")

  let sfc
  try {
    sfc = parseSfc(text, { filename: rel })
  } catch (err) {
    problems.push({ rel, where: "SFC", message: err.message })
    continue
  }

  /* compiler-sfc'nin kendi ayristirma hatalari */
  for (const e of sfc.errors || []) {
    problems.push({ rel, where: "SFC", message: e.message })
  }

  const scripts = [sfc.descriptor.script, sfc.descriptor.scriptSetup].filter(Boolean)

  for (const block of scripts) {
    blocks++
    const isTs = /ts|tsx/.test(block.lang || "")

    try {
      parseJs(block.content, {
        sourceType: "module",
        allowReturnOutsideFunction: true,
        plugins: [isTs ? "typescript" : "jsx", "topLevelAwait"],
      })
    } catch (err) {
      /*
       * Babel satir numarasi BLOK ICINDEKI satiri verir; dosyadaki
       * gercek satiri bulmak icin blogun baslangici ekleniyor -- aksi
       * halde buyuk dosyalarda yanlis yere bakiliyor.
       */
      const blockStartLine = text.slice(0, block.loc.start.offset).split("\n").length
      const line = (err.loc ? err.loc.line : 1) + blockStartLine - 1

      problems.push({
        rel,
        where: block === sfc.descriptor.scriptSetup ? "script setup" : "script",
        line,
        message: err.message,
      })
    }
  }
}

console.log(`Dosya: ${files.length}, ayristirilan <script> blogu: ${blocks}`)

if (!problems.length) {
  console.log("\nTum script bloklari ayristirildi.")
  process.exit(0)
}

console.log(`\n!! ${problems.length} SOZDIZIMI HATASI:`)
for (const p of problems) {
  console.log(`  ${p.rel}${p.line ? ":" + p.line : ""}  [${p.where}]`)
  console.log(`      ${p.message}`)
}
process.exit(1)
