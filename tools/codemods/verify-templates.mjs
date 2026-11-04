// Tum .vue sablonlarini Vue 2 derleyicisinden gecirir. DB'ye dokunmaz.
import fs from "node:fs"
import path from "node:path"
import { createRequire } from "node:module"
const require = createRequire("C:/Users/mekma/Desktop/mark0002/package.json")
const compiler = require("vue-template-compiler")

const ROOT = "C:/Users/mekma/Desktop/mark0002"
const DIRS = ["pages", "components", "layouts"]

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, out)
    else if (e.name.endsWith(".vue")) out.push(p)
  }
  return out
}

let total = 0, failed = 0
const problems = []

for (const d of DIRS) {
  for (const file of walk(path.join(ROOT, d))) {
    const src = fs.readFileSync(file, "utf8")
    const parsed = compiler.parseComponent(src)
    if (!parsed.template || !parsed.template.content) continue
    total++
    const res = compiler.compile(parsed.template.content)
    const errs = (res.errors || [])
    if (errs.length) {
      failed++
      problems.push({ file: path.relative(ROOT, file), errs })
    }
  }
}

console.log("Derlenen sablon :", total)
console.log("HATALI          :", failed)
for (const p of problems.slice(0, 30)) {
  console.log("\n" + p.file)
  for (const e of p.errs.slice(0, 4)) console.log("   -", String(e).slice(0, 160))
}
