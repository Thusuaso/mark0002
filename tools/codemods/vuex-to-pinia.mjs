/*
 * Codemod: Vuex modulu -> Pinia options store
 *
 * Kullanim:
 *   node vuex-to-pinia.mjs order            (kuru calisma, stdout'a yazar)
 *   node vuex-to-pinia.mjs order --write    (app/stores/order.ts olusturur)
 *
 * TASARIM KARARLARI
 *
 * 1) Mutation'lar MUT_ onekiyle action'a cevrilir.
 *    Vuex'te action ve mutation ayri isim uzaylarindadir ve bu projede
 *    324 mutation'in 298'i bir action'la AYNI ada sahip. Pinia'da ikisi de
 *    action oldugu icin cakisirlar. Onek, cakismayi mekanik ve gozle
 *    izlenebilir bicimde cozer; ince sarmalayicilari elle sadelestirmek
 *    sonraki (istege bagli) bir adim.
 *
 * 2) this.$axios -> useLegacyApi()
 *    axios `{ data }` dondurur, $fetch govdeyi dogrudan. 338 cagri yerinde
 *    `response.data.x` -> `response.x` anlamsal donusumu yapmak yerine
 *    axios sozlesmesini taklit eden bir katman kullaniliyor; boylece bu
 *    donusum tamamen mekanik ve davranis-korumali kaliyor.
 *    (bkz. app/composables/useLegacyApi.ts)
 *
 * 3) Getter'lar: 319 getter'in 318'i yalnizca `return state.x`. Bunlar
 *    Pinia getter'ina birebir cevrilir.
 *
 * CIKTI ELLE GOZDEN GECIRILMELIDIR -- bu bir taslak ureticisi, sihir degil.
 */
import fs from "node:fs"
import path from "node:path"

const SRC_DIR = "C:/Users/mekma/Desktop/mark0002/store/modules"
const OUT_DIR = "C:/Users/mekma/Desktop/mark0002-nuxt3-pilot/app/stores"

const moduleName = process.argv[2]
const WRITE = process.argv.includes("--write")

if (!moduleName) {
  console.error("kullanim: node vuex-to-pinia.mjs <modul-adi> [--write]")
  process.exit(1)
}

const srcPath = path.join(SRC_DIR, `${moduleName}.js`)
if (!fs.existsSync(srcPath)) {
  console.error(`bulunamadi: ${srcPath}`)
  process.exit(1)
}

const src = fs.readFileSync(srcPath, "utf8")

/* ---------- capraz modul cozumlemesi ----------
 *
 * NEDEN VAR: bu projede Vuex modulleri `namespaced: true` DEGIL. Yani
 * `vuexContext.dispatch("setBeginLoadingAction")` cagrisi, cagiran modulde
 * boyle bir action olmasa bile calisir -- Vuex adi TUM moduller arasinda
 * arar. commit/dispatch/getters/state icin ayni sey gecerli.
 *
 * Bu donusumun en tehlikeli yeri burasi: adi kor bicimde `this.X` yapmak
 * derleme hatasi URETMEZ, yalnizca calisma aninda
 * "TypeError: this.X is not a function" verir -- ve bu da ancak o kod
 * yolu gercekten calistirildiginda ortaya cikar.
 *
 * Bu yuzden her ad once cagiran modulde aranir; yoksa sahibi bulunur ve
 * dogru store'a yonlendirilir. Sahibi bilinmiyorsa cikti derlenmez hale
 * getirilir (TODO_CAPRAZ_MODUL) ve stderr'e uyari basilir -- sessizce
 * yanlis kod uretmekten iyidir.
 */

// Zaten elle tasinmis modullerin pilot karsiliklari. Yeniden adlandirma
// gerekiyorsa `rename` ile belirtilir.
const PILOT_STORES = {
  loading: {
    store: "useSharedStore",
    varName: "sharedStore",
    // Vuex'te iki ayri boolean vardi; pilotta ikisi de sayac.
    rename: {
      setBeginLoadingAction: "beginLoading",
      setEndLoadingAction: "endLoading",
      setBeginLoadingDatatableAction: "beginLoadingDatatable",
      setEndLoadingDatatableAction: "endLoadingDatatable",
      getLoading: "isLoading",
      getLoadingDatatable: "isLoadingDatatable",
      loading: "loading",
      loadingDatatable: "loadingDatatable",
    },
  },
  shared: { store: "useSharedStore", varName: "sharedStore" },
  auth: { store: "useAuthStore", varName: "authStore" },
  authority: { store: "useAuthorityStore", varName: "authorityStore" },
  supplier: { store: "useSupplierStore", varName: "supplierStore" },
  todo: { store: "useTodoStore", varName: "todoStore" },
}

// Codemod'un urettigi store'lar: ad kalibi mekanik.
function generatedStore(mod) {
  return {
    store: `use${mod[0].toUpperCase()}${mod.slice(1)}Store`,
    varName: `${mod}Store`,
  }
}

function keysOf(text, sectionName) {
  const m = new RegExp(`const\\s+${sectionName}\\s*=\\s*\\{`).exec(text)
  if (!m) return []
  const start = m.index + m[0].length - 1
  const out = []
  const lines = text.slice(start).split("\n")
  let d = 0
  lines.forEach((raw) => {
    const l = raw.replace(/\/\/[^\n]*$/, "")
    const at = d
    if (at === 1) {
      const k = l.match(/^\s*(?:async\s+)?([A-Za-z_$][\w$]*)\s*[:(]/)
      if (k) out.push(k[1])
    }
    for (const ch of l) {
      if (ch === "{" || ch === "(") d++
      else if (ch === "}" || ch === ")") d--
    }
  })
  return out
}

const MODULE_INDEX = {}
for (const f of fs.readdirSync(SRC_DIR).filter((f) => f.endsWith(".js"))) {
  const mod = path.basename(f, ".js")
  const text = fs.readFileSync(path.join(SRC_DIR, f), "utf8")
  MODULE_INDEX[mod] = {
    state: keysOf(text, "state"),
    actions: keysOf(text, "actions"),
    mutations: keysOf(text, "mutations"),
    getters: keysOf(text, "getters"),
  }
}

const crossWarnings = []

// Adin sahibi olan modulu bul (cagiran modul haric).
function ownerOf(kind, name) {
  return Object.keys(MODULE_INDEX).filter(
    (m) => m !== moduleName && MODULE_INDEX[m][kind].includes(name),
  )
}

/*
 * Capraz modul referansi icin erisim ifadesi uret.
 * Donus: { expr, prelude } -- prelude action govdesinin basina eklenir.
 */
function crossRef(kind, name) {
  const owners = ownerOf(kind, name)

  if (owners.length === 0) {
    crossWarnings.push(`${kind} "${name}": hicbir Vuex modulunde bulunamadi`)
    return { expr: `TODO_CAPRAZ_MODUL_BULUNAMADI_${name}`, prelude: null }
  }

  if (owners.length > 1) {
    crossWarnings.push(
      `${kind} "${name}": birden fazla modulde var (${owners.join(", ")}) -- ` +
        `Vuex'te de belirsizdi, ilki secildi`,
    )
  }

  const owner = owners[0]
  const target = PILOT_STORES[owner] ?? generatedStore(owner)
  const member = target.rename?.[name] ?? name
  const finalName = kind === "mutations" ? `MUT_${member}` : member

  /*
   * Iki Vuex modulu AYNI pilot store'una birlesmis olabilir -- ornegin
   * `loading` modulu pilotta ayri bir store degil, shared.ts'in icinde.
   * O durumda bu bir capraz referans DEGIL: store kendi kendini
   * useSharedStore() ile cagirmamali, dogrudan `this.X` demeli.
   */
  const ownStore = (PILOT_STORES[moduleName] ?? generatedStore(moduleName)).store
  if (target.store === ownStore) {
    return { expr: `this.${finalName}`, prelude: null }
  }

  if (!PILOT_STORES[owner] && !fs.existsSync(path.join(OUT_DIR, `${owner}.ts`))) {
    crossWarnings.push(
      `${kind} "${name}" -> ${owner} store'u HENUZ TASINMADI ` +
        `(app/stores/${owner}.ts yok); once onu uretmek gerekiyor`,
    )
  }

  return {
    expr: `${target.varName}.${finalName}`,
    prelude: `const ${target.varName} = ${target.store}()`,
  }
}

/* ---------- ayristirma (suslu parantez sayarak) ---------- */

function sliceBalanced(text, openIndex) {
  let depth = 0
  for (let i = openIndex; i < text.length; i++) {
    const ch = text[i]
    if (ch === "{") depth++
    else if (ch === "}") {
      depth--
      if (depth === 0) return { body: text.slice(openIndex + 1, i), end: i }
    }
  }
  return null
}

function section(name) {
  const m = new RegExp(`const\\s+${name}\\s*=\\s*\\{`).exec(src)
  if (!m) return null
  const open = m.index + m[0].length - 1
  return sliceBalanced(src, open)?.body ?? null
}

function members(block) {
  if (!block) return []
  const out = []
  const re = /(?:^|\n)\s{0,4}(async\s+)?([A-Za-z_$][\w$]*)\s*\(([^)]*)\)\s*\{/g
  let m
  while ((m = re.exec(block))) {
    const open = re.lastIndex - 1
    const sl = sliceBalanced(block, open)
    if (!sl) continue
    out.push({
      isAsync: Boolean(m[1]),
      name: m[2],
      args: m[3].split(",").map((s) => s.trim()).filter(Boolean),
      body: sl.body.replace(/^\n/, "").replace(/\s+$/, ""),
    })
    re.lastIndex = sl.end
  }
  return out
}

/* ---------- modul duzeyi kod (state'ten ONCE duran her sey) ----------
 *
 * NEDEN VAR -- GERCEK BIR HATA SONUCU EKLENDI:
 * Ilk surum yalnizca state/actions/mutations/getters bloklarini
 * ayristiriyordu ve dosyanin BASINDA duran kodu sessizce DUSURUYORDU.
 * store/modules/order.js'in ilk 7 satiri bir yardimci fonksiyondu:
 *
 *     function __noneNullControl(value) { ... }
 *
 * ve mutation govdelerinde 5 yerde cagriliyordu. Uretilen order.ts o
 * cagrilari tasidi ama tanimi tasimadi. Sonuc derleme hatasi DEGIL --
 * tarayicida, siparis toplami hesaplanirken:
 *
 *     Uncaught (in promise) ReferenceError: __noneNullControl is not defined
 *
 * Artik state'ten onceki kod aynen tasiniyor; import satirlari ayri
 * tutuluyor cunku bazi moduller (auth, socket, todo) oradan paket
 * import ediyor ve pilottaki karsiliklari elle yazilmis.
 */
const headSrc = (() => {
  const m = /^(?:export\s+)?const\s+state\s*=/m.exec(src)
  return m ? src.slice(0, m.index).trim() : ""
})()

const headLines = headSrc ? headSrc.split("\n") : []
const headImports = headLines.filter((l) => /^\s*import\s/.test(l))
const headCode = headLines.filter((l) => !/^\s*import\s/.test(l)).join("\n").trim()

const stateBlock = section("state")
const actions = members(section("actions"))
const mutations = members(section("mutations"))
const getters = members(section("getters"))

const OWN = {
  mutations: new Set(mutations.map((m) => m.name)),
  actions: new Set(actions.map((a) => a.name)),
  getters: new Set(getters.map((g) => g.name)),
  state: new Set(MODULE_INDEX[moduleName].state),
}

/* ---------- govde donusumleri ---------- */

function transformBody(body, { isMutation }) {
  let out = body
  const needs = { api: false, toast: false }
  const storePreludes = new Set()

  /*
   * Ad kendi modulunde mi? Evetse `this.X`; degilse sahibinin store'u.
   * (bkz. yukarida "capraz modul cozumlemesi")
   */
  function resolve(kind, name, { prefixMut = false } = {}) {
    if (OWN[kind].has(name)) {
      return `this.${prefixMut ? "MUT_" : ""}${name}`
    }
    const { expr, prelude } = crossRef(kind, name)
    if (prelude) storePreludes.add(prelude)
    return expr
  }

  // vuexContext.commit("X", a, b) -> this.MUT_X(a, b)  (veya digerStore.MUT_X)
  out = out.replace(
    /vuexContext\.commit\(\s*['"]([\w$]+)['"]\s*(?:,\s*)?/g,
    (_m, name) => `${resolve("mutations", name, { prefixMut: true })}(`,
  )

  // vuexContext.dispatch("Y", a) -> this.Y(a)  (veya digerStore.Y)
  out = out.replace(
    /vuexContext\.dispatch\(\s*['"]([\w$]+)['"]\s*(?:,\s*)?/g,
    (_m, name) => `${resolve("actions", name)}(`,
  )

  // vuexContext.state.x / vuexContext.getters.x -> this.x (veya digerStore.x)
  out = out.replace(
    /vuexContext\.(?:state|rootState)\.([\w$]+)/g,
    (_m, name) => resolve("state", name),
  )
  out = out.replace(
    /vuexContext\.(?:getters|rootGetters)\.([\w$]+)/g,
    (_m, name) => resolve("getters", name),
  )

  // mutation govdelerinde state.x -> this.x
  if (isMutation) {
    out = out.replace(/\bstate\./g, "this.")
  }

  // this.$axios -> legacyApi
  if (/this\.\$axios/.test(out)) {
    needs.api = true
    out = out.replace(/this\.\$axios/g, "legacyApi")
  }

  // this.$toast -> toast
  if (/this\.\$toast/.test(out)) {
    needs.toast = true
    out = out.replace(/this\.\$toast/g, "toast")
  }

  // this.$router.push(x) -> navigateTo(x)
  out = out.replace(/this\.\$router\.push\(/g, "navigateTo(")

  return { out, needs, storePreludes: [...storePreludes] }
}

function indent(text, spaces) {
  const pad = " ".repeat(spaces)
  return text
    .split("\n")
    .map((l) => (l.trim() ? pad + l : l))
    .join("\n")
}

function emitMember(m, { isMutation }) {
  const { out, needs, storePreludes } = transformBody(m.body, { isMutation })

  // mutation imzasi: (state, payload) -> (payload)
  let args = m.args
  if (isMutation) args = args.slice(1)
  else args = args.filter((a) => a !== "vuexContext")

  const prelude = []
  if (needs.api) prelude.push("const legacyApi = useLegacyApi()")
  if (needs.toast) prelude.push("const toast = useAppToast()")
  prelude.push(...storePreludes)

  const name = isMutation ? `MUT_${m.name}` : m.name
  const asyncKw = m.isAsync ? "async " : ""
  const bodyText = [...prelude, out].join("\n")

  return `    ${asyncKw}${name}(${args.join(", ")}) {\n${indent(bodyText, 6)}\n    },`
}

function emitGetter(g) {
  const body = g.body.replace(/\s+/g, " ").trim()
  const simple = /^return\s+(state\.[\w.]+)\s*;?$/.exec(body)

  if (simple) {
    return `    ${g.name}: (state) => ${simple[1]},`
  }

  // mantik iceren getter: govdeyi oldugu gibi tasi
  return `    ${g.name}: (state) => {\n${indent(g.body, 6)}\n    },`
}

/* ---------- ciktiyi olustur ---------- */

const header = `import { defineStore } from "pinia"

/*
 * store/modules/${moduleName}.js -> Pinia
 *
 * Bu dosya tools/codemods/vuex-to-pinia.mjs ile URETILDI, sonra elle
 * gozden gecirildi.
 *
 * Donusumler:
 *   vuexContext.commit("X", p)   -> this.MUT_X(p)
 *   vuexContext.dispatch("Y", p) -> this.Y(p)
 *   vuexContext.state.x          -> this.x
 *   this.\$axios                  -> useLegacyApi()   (axios sozlesmesini
 *                                   taklit eder, response.data KORUNUR)
 *   this.\$toast                  -> useAppToast()
 *   mutation'lar                 -> MUT_ onekli action
 *
 * MUT_ oneki neden var: Vuex'te action ve mutation ayri isim
 * uzaylarindadir; bu projede 324 mutation'in 298'i bir action'la ayni ada
 * sahip. Pinia'da ikisi de action oldugu icin cakisirlar.
 *
 * Istatistik: ${actions.length} action, ${mutations.length} mutation, ${getters.length} getter
 */
${
  headCode
    ? `/*
 * store/modules/${moduleName}.js'in BASINDAKI modul duzeyi kod -- aynen
 * tasindi. Govdelerden cagriliyor; tasinmazsa calisma aninda
 * "ReferenceError: ... is not defined" verir (derleme gecer).
 */
${headCode}

`
    : ""
}export const use${moduleName[0].toUpperCase()}${moduleName.slice(1)}Store = defineStore("${moduleName}", {
  state: () => ({${stateBlock ?? ""}}),

  getters: {
${getters.map(emitGetter).join("\n")}
  },

  actions: {
${actions.map((a) => emitMember(a, { isMutation: false })).join("\n")}

    /* ---------- mutation'lar (MUT_ onekli) ---------- */
${mutations.map((m) => emitMember(m, { isMutation: true })).join("\n")}
  },
})
`

if (WRITE) {
  const outPath = path.join(OUT_DIR, `${moduleName}.ts`)
  fs.writeFileSync(outPath, header, "utf8")
  console.log(`yazildi: ${outPath}`)
  console.log(
    `  ${actions.length} action, ${mutations.length} mutation, ${getters.length} getter, ${header.split("\n").length} satir`,
  )
  console.log("  !! elle gozden gecirilmeli")
} else {
  console.log(header)
}

/* ---------- capraz modul raporu ---------- */

if (crossWarnings.length) {
  const uniq = [...new Set(crossWarnings)]
  console.error(`\n!! CAPRAZ MODUL UYARILARI (${uniq.length}):`)
  for (const w of uniq) console.error(`   - ${w}`)
}

if (/TODO_CAPRAZ_MODUL/.test(header)) {
  console.error(
    "\n!! Cikti TODO_CAPRAZ_MODUL isareti iceriyor: cozulemeyen referanslar var.\n" +
      "   Bu bilincli: derlenmeyen kod, sessizce patlayan koddan iyidir.",
  )
  process.exit(1)
}
