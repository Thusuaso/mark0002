/*
 * Codemod: tum <DataTable>'lara sabit yukseklik + scroll ekle.
 *   <DataTable ...>  ->  <DataTable scrollable scrollHeight="var(--app-table-height)" ...>
 *
 * Zaten scrollable/scrollHeight tasiyan tablolara DOKUNMAZ.
 * scrollHeight degeri CSS degiskeni oldugu icin yukseklik tek yerden
 * (assets/css/app.css) ayarlanabilir.
 */
import fs from "node:fs"
import path from "node:path"

const ROOT = process.argv.find((a) => a.startsWith("--root="))?.slice(7)
  || "C:/Users/mekma/Desktop/mark0002"
const DIRS = ["pages", "components", "layouts"]
const WRITE = process.argv.includes("--write")

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, out)
    else if (e.name.endsWith(".vue")) out.push(p)
  }
  return out
}

const ADD = ` scrollable\n      scrollHeight="var(--app-table-height)"`

let files = 0, added = 0, skipped = 0
const skippedList = []

for (const d of DIRS) {
  for (const file of walk(path.join(ROOT, d))) {
    const src = fs.readFileSync(file, "utf8")
    if (!src.includes("<DataTable")) continue

    let n = 0
    // acilis etiketinin tamamini yakala: <DataTable ... >
    const out = src.replace(/<DataTable\b([^>]*?)(\/?)>/g, (whole, attrs, selfClose) => {
      if (/\bscrollable\b/.test(attrs) || /\bscrollHeight\b/.test(attrs)) {
        skipped++
        skippedList.push(path.relative(ROOT, file))
        return whole
      }
      n++
      return `<DataTable${ADD}${attrs}${selfClose}>`
    })

    if (n > 0) {
      files++
      added += n
      if (WRITE) fs.writeFileSync(file, out, "utf8")
    }
  }
}

console.log(WRITE ? "=== UYGULANDI ===" : "=== KURU CALISMA ===")
console.log("kok           :", ROOT)
console.log("degisen dosya :", files)
console.log("eklenen       :", added)
console.log("atlanan (zaten scrollable):", skipped)
for (const s of [...new Set(skippedList)].slice(0, 10)) console.log("   ", s)
