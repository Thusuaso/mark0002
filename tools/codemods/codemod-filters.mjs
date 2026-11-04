/*
 * Codemod: Vue 2 template filter -> fonksiyon cagrisi
 *   {{ tutar | formatPriceUsd }}  ->  {{ formatPriceUsd(tutar) }}
 *
 * Kullanim:
 *   node codemod-filters.mjs           (kuru calisma, hicbir sey yazmaz)
 *   node codemod-filters.mjs --write   (uygular)
 */
import fs from "node:fs"
import path from "node:path"

const ROOT = "C:/Users/mekma/Desktop/mark0002"
const DIRS = ["pages", "components", "layouts"]
const WRITE = process.argv.includes("--write")

const KNOWN = new Set([
  "formatPriceUsd", "formatPriceEuro", "formatPriceTl",
  "formatDecimal", "formatDecimal2",
  "dateToString", "stringToDate", "monthToString", "dateToTime",
])

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, out)
    else if (e.name.endsWith(".vue")) out.push(p)
  }
  return out
}

const OR = "\u0000OR\u0000"

function convertMustache(inner) {
  // || operatorunu maskele ki filter pipe'i ile karismasin
  const masked = inner.replace(/\|\|/g, OR)
  if (!masked.includes("|")) return null

  const parts = masked.split("|")
  let expr = parts[0].trim()
  const applied = []

  for (const raw of parts.slice(1)) {
    const name = raw.trim()
    if (!/^[A-Za-z_$][\w$]*$/.test(name)) return { skip: "basit olmayan filter: " + name }
    if (!KNOWN.has(name)) return { skip: "bilinmeyen filter: " + name }
    applied.push(name)
  }
  if (!applied.length) return null

  // en soldaki filter en ice: a | f | g  ->  g(f(a))
  let out = expr
  for (const name of applied) out = `${name}(${out})`
  return { text: out.replace(new RegExp(OR, "g"), "||"), applied }
}

let filesChanged = 0
let conversions = 0
const skipped = []
const perFilter = {}

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
    const newTpl = tpl.replace(/\{\{([\s\S]*?)\}\}/g, (whole, inner) => {
      const r = convertMustache(inner)
      if (!r) return whole
      if (r.skip) {
        skipped.push({ file: path.relative(ROOT, file), expr: whole.trim().slice(0, 100), why: r.skip })
        return whole
      }
      n++
      for (const f of r.applied) perFilter[f] = (perFilter[f] || 0) + 1
      return `{{ ${r.text} }}`
    })

    if (n > 0) {
      filesChanged++
      conversions += n
      if (WRITE) fs.writeFileSync(file, head + newTpl + tail, "utf8")
    }
  }
}

console.log(WRITE ? "=== UYGULANDI ===" : "=== KURU CALISMA (hicbir dosya yazilmadi) ===")
console.log("Degisen dosya :", filesChanged)
console.log("Donusum       :", conversions)
console.log("\n--- filter basina ---")
for (const [k, v] of Object.entries(perFilter).sort((a, b) => b[1] - a[1])) console.log(String(v).padStart(6), k)
console.log("\n--- ATLANAN (" + skipped.length + ") ---")
for (const s of skipped.slice(0, 20)) console.log(" ", s.why, "|", s.file, "|", s.expr)
