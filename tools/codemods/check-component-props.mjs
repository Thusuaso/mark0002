/*
 * Her bilesen KULLANIMINDA, o bilesenin `required: true` prop'lari
 * gercekten gecilmis mi?
 *
 * NEDEN VAR:
 * orderDetail/OrderForm.vue'da prop adi `model` -> `sourceModel` olarak
 * DEGISTIRILDI. Sebebi: Vue 2 kodu `this.model = event.data` ile prop'un
 * kendisine atama yapiyordu ve Vue 3'te props shallowReadonly oldugu icin
 * bu atama basarisiz oluyordu (urun secimi formu doldurmuyordu).
 * Icerideki 105 referansa dokunmamak icin prop yeniden adlandirildi.
 *
 * Bedeli: kullanan her sablonun `:model=` yerine `:sourceModel=` yazmasi
 * gerekiyor. orderDetail/Form.vue guncellendi, ama
 * components/orders/forms/detail2.vue HENUZ TASINMADI -- tasinirken
 * atlanirsa form sessizce bos kalir. Vue `required: true` icin uyari
 * basar ama konsol uyarisi kolayca kaciriliyor (bu gecis sirasinda tam
 * bu sekilde bir sorun yasandi: <Navbar> cozulemiyordu ve yalnizca
 * konsolda uyari vardi).
 *
 * Bu arac uyariyi DERLEME ZAMANINA cekiyor: eksik zorunlu prop'ta
 * cikis kodu 1.
 *
 * Kullanim:
 *   node tools/codemods/check-component-props.mjs
 */
import fs from "node:fs"
import path from "node:path"

const PILOT = path.resolve(import.meta.dirname, "../..")
const COMPONENTS = path.join(PILOT, "app/components")
const SCAN_DIRS = ["app/components", "app/pages", "app/layouts"]

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, out)
    else if (e.name.endsWith(".vue")) out.push(p)
  }
  return out
}

/* Nuxt auto-import adi: yol parcalarini PascalCase'leyip tekrarlari atar */
const autoName = (abs) =>
  path
    .relative(COMPONENTS, abs)
    .replace(/\.vue$/, "")
    .split(path.sep)
    .map((s) => s[0].toUpperCase() + s.slice(1))
    .reduce(
      (acc, p) => (acc.length && acc[acc.length - 1].toLowerCase() === p.toLowerCase() ? acc : [...acc, p]),
      [],
    )
    .join("")

/* ---------- bilesenlerin prop sozlesmesi ---------- */

function propsOf(text) {
  const required = new Set()
  const all = new Set()

  const m = /\bprops\s*:\s*\{/.exec(text)
  if (!m) return { required, all }

  let d = 0
  const start = m.index + m[0].length - 1
  const lines = text.slice(start).split("\n")

  let currentProp = null
  for (const raw of lines) {
    const l = raw.replace(/\/\/[^\n]*$/, "")
    const at = d

    if (at === 1) {
      const k = l.match(/^\s*([A-Za-z_$][\w$]*)\s*:/)
      if (k) {
        currentProp = k[1]
        all.add(currentProp)
      }
    }
    if (at === 2 && currentProp && /required\s*:\s*true/.test(l)) {
      required.add(currentProp)
    }

    for (const ch of l) {
      if (ch === "{" || ch === "(") d++
      else if (ch === "}" || ch === ")") d--
    }
    if (d <= 0) break
  }
  return { required, all }
}

const registry = new Map() // auto-import adi -> { file, required, all }
for (const abs of walk(COMPONENTS)) {
  const text = fs.readFileSync(abs, "utf8")
  registry.set(autoName(abs), {
    file: path.relative(PILOT, abs).replace(/\\/g, "/"),
    ...propsOf(text),
  })
}

/* ---------- kullanim yerlerini tara ---------- */

const files = SCAN_DIRS.flatMap((d) => walk(path.join(PILOT, d)))

let problems = 0
let checked = 0

for (const abs of files) {
  const rel = path.relative(PILOT, abs).replace(/\\/g, "/")
  const text = fs.readFileSync(abs, "utf8")

  const tplEnd = text.indexOf("<script")
  const tpl = (tplEnd === -1 ? text : text.slice(0, tplEnd)).replace(/<!--[\s\S]*?-->/g, "")

  for (const [name, def] of registry) {
    if (!def.required.size) continue

    /* <Name ...> acilis etiketini tamamiyla yakala */
    const re = new RegExp(`<${name}(\\s[^>]*?)?/?>`, "g")
    let m
    while ((m = re.exec(tpl))) {
      checked++
      const attrs = m[1] ?? ""

      const passed = new Set()
      for (const a of attrs.matchAll(/(?:v-bind)?:?([A-Za-z_$][\w$-]*)\s*=/g)) {
        /* kebab-case -> camelCase (sablonlar iki bicimi de kullanabilir) */
        const raw = a[1]
        passed.add(raw)
        passed.add(raw.replace(/-([a-z])/g, (_, c) => c.toUpperCase()))
      }
      /* v-bind="obj" ile toplu gecis varsa denetlenemez */
      if (/v-bind\s*=\s*"/.test(attrs)) continue

      const missing = [...def.required].filter((p) => !passed.has(p))
      if (missing.length) {
        problems++
        const line = tpl.slice(0, m.index).split("\n").length
        console.log(`\nX ${rel}:${line}  <${name}>`)
        console.log(`    eksik zorunlu prop: ${missing.join(", ")}`)
        console.log(`    bilesen: ${def.file}`)
      }
    }
  }
}

console.log(`\n${checked} kullanim denetlendi.`)
if (problems) {
  console.log(`${problems} kullanimda eksik zorunlu prop var.`)
  process.exit(1)
}
console.log("Eksik zorunlu prop yok.")
