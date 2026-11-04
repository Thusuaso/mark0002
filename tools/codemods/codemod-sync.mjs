/*
 * Codemod: .sync modifier -> acik prop + update olayi
 *   :visible.sync="dlg"  ->  :visible="dlg" @update:visible="dlg = $event"
 *
 * Bu bicim HEM Vue 2 HEM Vue 3'te gecerli. (Vue 3'te v-model:visible ile
 * ayni seydir; oraya sadelestirme ayri/istege bagli bir adim.)
 */
import fs from "node:fs"
import path from "node:path"

const ROOT = "C:/Users/mekma/Desktop/mark0002"
const DIRS = ["pages", "components", "layouts"]
const WRITE = process.argv.includes("--write")

const SIMPLE = /^[A-Za-z_$][A-Za-z0-9_$]*(\.[A-Za-z_$][A-Za-z0-9_$]*)*$/

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, out)
    else if (e.name.endsWith(".vue")) out.push(p)
  }
  return out
}

const RE = /(?:v-bind:|:)([A-Za-z_$][A-Za-z0-9_$]*)\.sync\s*=\s*"([^"]*)"/g

let filesChanged = 0, conversions = 0
const skipped = []
const perProp = {}

for (const d of DIRS) {
  for (const file of walk(path.join(ROOT, d))) {
    const src = fs.readFileSync(file, "utf8")
    const tplStart = src.indexOf("<template>")
    const tplEnd = src.lastIndexOf("</template>")
    if (tplStart === -1 || tplEnd === -1) continue

    const head = src.slice(0, tplStart)
    const tpl = src.slice(tplStart, tplEnd)
    const tail = src.slice(tplEnd)

    let n = 0
    const newTpl = tpl.replace(RE, (whole, prop, expr) => {
      const e = expr.trim()
      if (!SIMPLE.test(e)) {
        skipped.push({ file: path.relative(ROOT, file), whole, why: "basit olmayan ifade" })
        return whole
      }
      n++
      perProp[prop] = (perProp[prop] || 0) + 1
      return `:${prop}="${e}" @update:${prop}="${e} = $event"`
    })

    if (n > 0) {
      filesChanged++
      conversions += n
      if (WRITE) fs.writeFileSync(file, head + newTpl + tail, "utf8")
    }
  }
}

console.log(WRITE ? "=== UYGULANDI ===" : "=== KURU CALISMA ===")
console.log("Degisen dosya :", filesChanged)
console.log("Donusum       :", conversions)
console.log("\n--- prop basina ---")
for (const [k, v] of Object.entries(perProp).sort((a, b) => b[1] - a[1])) console.log(String(v).padStart(6), k)
console.log("\n--- ATLANAN (" + skipped.length + ") ---")
for (const s of skipped.slice(0, 15)) console.log(" ", s.why, "|", s.file, "|", s.whole)
