/*
 * Bir sayfa/bilesen tasinmadan ONCE: dokundugu her store uyesi pilotta
 * GERCEKTEN var mi?
 *
 * NEDEN UYE DUZEYINDE: "order store'u pilotta var" demek yetmiyor.
 * pilot/app/stores/shared.ts, Vuex'teki store/modules/shared.js'in
 * YALNIZCA bir parcasi (supplierList + userList + loading). cards/list.vue
 * ise ayni modulden `setCardList` dispatch ediyor -- modul "var" ama uye
 * yok. Bu fark derleme zamaninda gorunmez; `sharedStore.setCardList is
 * not a function` olarak calisma aninda cikar.
 *
 * Kullanim (Nuxt 2 kaynagindaki yola gore):
 *   node tools/codemods/check-store-coverage.mjs components/cards/list.vue
 *   node tools/codemods/check-store-coverage.mjs pages/orders/waiting.vue ...
 */
import fs from "node:fs"
import path from "node:path"

const SRC_ROOT = "C:/Users/mekma/Desktop/mark0002"
const VUEX_DIR = path.join(SRC_ROOT, "store/modules")
const PILOT_STORES_DIR = path.resolve(import.meta.dirname, "../../app/stores")

const SECTIONS = ["state", "actions", "mutations", "getters"]

/* ---------- Vuex modullerini indeksle ---------- */

function vuexKeys(text, sectionName) {
  const m = new RegExp(`const\\s+${sectionName}\\s*=\\s*\\{`).exec(text)
  if (!m) return []
  const out = []
  let d = 0
  for (const raw of text.slice(m.index + m[0].length - 1).split("\n")) {
    const l = raw.replace(/\/\/[^\n]*$/, "")
    if (d === 1) {
      const k = l.match(/^\s*(?:async\s+)?([A-Za-z_$][\w$]*)\s*[:(]/)
      if (k) out.push(k[1])
    }
    for (const ch of l) {
      if (ch === "{" || ch === "(") d++
      else if (ch === "}" || ch === ")") d--
    }
  }
  return out
}

const VUEX = {}
for (const f of fs.readdirSync(VUEX_DIR).filter((f) => f.endsWith(".js"))) {
  const t = fs.readFileSync(path.join(VUEX_DIR, f), "utf8")
  VUEX[path.basename(f, ".js")] = Object.fromEntries(SECTIONS.map((s) => [s, vuexKeys(t, s)]))
}

/* ---------- pilot store'larini indeksle ---------- */

// Vuex modulu -> pilot dosyasi (bire bir olmayanlar burada)
const MAP = {
  loading: { file: "shared.ts", rename: {
    setBeginLoadingAction: "beginLoading",
    setEndLoadingAction: "endLoading",
    setBeginLoadingDatatableAction: "beginLoadingDatatable",
    setEndLoadingDatatableAction: "endLoadingDatatable",
    getLoading: "isLoading",
    getLoadingDatatable: "isLoadingDatatable",
  } },
  socket: { file: "socket.ts", rename: {
    setConnection: "connect",
    setDisconnect: "disconnect",
  } },
}

function pilotMembers(file) {
  const p = path.join(PILOT_STORES_DIR, file)
  if (!fs.existsSync(p)) return null
  const text = fs.readFileSync(p, "utf8")
  const names = new Set()

  // setup store: defineStore("x", () => { ... return { a, b } })
  if (!/defineStore\(\s*["'][^"']+["']\s*,\s*\{/.test(text)) {
    for (const m of text.matchAll(/^\s*(?:const|function|async function)\s+([A-Za-z_$][\w$]*)/gm)) names.add(m[1])
    return names
  }

  let depth = 0, section = null, sectionDepth = 0
  for (const raw of text.split("\n")) {
    const l = raw.replace(/\/\/[^\n]*$/, "")
    const start = depth
    let delta = 0
    for (const ch of l) {
      if (ch === "{" || ch === "(") delta++
      else if (ch === "}" || ch === ")") delta--
    }
    const head = l.match(/^\s*(state|getters|actions)\s*:/)
    if (head && delta > 0) {
      section = head[1]
      sectionDepth = start + delta
    } else if (section && start === sectionDepth) {
      const m = l.match(/^\s*(?:async\s+)?([A-Za-z_$][\w$]*)\s*[:(]/)
      if (m) names.add(m[1])
    }
    depth += delta
    if (section && depth < sectionDepth) section = null
  }
  return names
}

const PILOT = {}
for (const mod of Object.keys(VUEX)) {
  const file = MAP[mod]?.file ?? `${mod}.ts`
  PILOT[mod] = { file, members: pilotMembers(file), rename: MAP[mod]?.rename ?? {} }
}

const ownerOf = (kind, name) => Object.keys(VUEX).filter((m) => VUEX[m][kind].includes(name))

/* ---------- hedef dosyalari tara ---------- */

const files = process.argv.slice(2)
if (!files.length) {
  console.error("kullanim: node check-store-coverage.mjs <Nuxt2 yoluna gore .vue dosyalari>")
  process.exit(1)
}

let problems = 0

for (const rel of files) {
  const abs = path.join(SRC_ROOT, rel)
  if (!fs.existsSync(abs)) {
    console.log(`\n### ${rel}\n    !! dosya yok`)
    problems++
    continue
  }
  const text = fs.readFileSync(abs, "utf8")

  const uses = [] // { kind, name }
  for (const m of text.matchAll(/\$store\.dispatch\(\s*["']([\w$]+)["']/g)) uses.push({ kind: "actions", name: m[1] })
  for (const m of text.matchAll(/\$store\.getters\.([\w$]+)/g)) uses.push({ kind: "getters", name: m[1] })
  for (const m of text.matchAll(/mapGetters\(\s*\[([^\]]*)\]/g))
    for (const g of m[1].matchAll(/["']([\w$]+)["']/g)) uses.push({ kind: "getters", name: g[1] })
  for (const m of text.matchAll(/mapActions\(\s*\[([^\]]*)\]/g))
    for (const g of m[1].matchAll(/["']([\w$]+)["']/g)) uses.push({ kind: "actions", name: g[1] })

  const seen = new Set()
  const ok = []
  const missingMember = []
  const missingStore = []
  const unknown = []

  for (const { kind, name } of uses) {
    const key = `${kind}:${name}`
    if (seen.has(key)) continue
    seen.add(key)

    const owners = ownerOf(kind, name)
    if (!owners.length) { unknown.push(name); continue }

    const mod = owners[0]
    const pilot = PILOT[mod]
    if (!pilot.members) { missingStore.push(`${name} (modul: ${mod} -> ${pilot.file} YOK)`); continue }

    const target = pilot.rename[name] ?? name
    if (pilot.members.has(target)) ok.push(`${name}${target !== name ? ` -> ${target}` : ""} [${mod}]`)
    else missingMember.push(`${name}${target !== name ? ` -> ${target}` : ""} (${pilot.file} icinde yok) [${mod}]`)
  }

  console.log(`\n### ${rel}`)
  console.log(`    kullanilan store uyesi: ${seen.size}  |  hazir: ${ok.length}`)
  const rep = (label, arr) => { if (arr.length) { console.log(`    ${label} (${arr.length}):`); arr.forEach((x) => console.log(`        ${x}`)) } }
  rep("EKSIK UYE -- pilot store'una eklenmeli", missingMember)
  rep("EKSIK STORE -- hic tasinmamis", missingStore)
  rep("COZULEMEDI -- hicbir Vuex modulunde yok", unknown)
  if (missingMember.length || missingStore.length || unknown.length) problems++
}

if (problems) {
  console.log(`\n${problems} dosyada eksik var.`)
  process.exit(1)
}
console.log("\nTum store uyeleri hazir.")
