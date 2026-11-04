/*
 * Codemod: mapGetters / $store.dispatch -> Pinia store referanslari
 *
 * NE YAPAR
 *   1) mapGetters([...]) listesindeki her getter'in SAHIBI Vuex modulunu
 *      bulur, onu pilot store'una eslestirir.
 *   2) Sablonda ve script'te o getter adinin HER kullanimini
 *      `<storeVar>.getX` bicimine cevirir.
 *   3) this.$store.dispatch("Y", args) -> `<storeVar>.Y(args)`
 *      this.$store.getters.X          -> `<storeVar>.X`
 *   4) Gereken store'lar icin import + computed blogu uretir (stdout'a
 *      yazar; dosyaya ELLE eklenir ki nereye girecegi kontrol edilsin).
 *
 * NEDEN ARAC: waiting.vue 52 getter + 48 dispatch, production.vue 116
 * dispatch tasiyor. Elle yapilsa tek bir ad yanlis store'a baglanir ve
 * sonuc DERLEME HATASI VERMEZ -- `undefined.getX` calisma aninda patlar
 * ya da sessizce undefined doner. Arac her donusumu sayiyor ve
 * cozemedigini RAPORLUYOR.
 *
 * Kullanim:
 *   node map-store-refs.mjs <kaynak.vue>                  (rapor)
 *   node map-store-refs.mjs <kaynak.vue> --in <pilot.vue> (pilot dosyasini duzenler)
 */
import fs from "node:fs"
import path from "node:path"

const SRC_ROOT = "C:/Users/mekma/Desktop/mark0002"
const VUEX_DIR = path.join(SRC_ROOT, "store/modules")
const SECTIONS = ["state", "actions", "mutations", "getters"]

/* Vuex modulu -> pilot store'u. Birlesmis olanlar burada. */
const STORE_OF = {
  shared: { use: "useSharedStore", varName: "sharedStore", file: "~/stores/shared" },
  loading: { use: "useSharedStore", varName: "sharedStore", file: "~/stores/shared" },
  order: { use: "useOrderStore", varName: "orderStore", file: "~/stores/order" },
  models: { use: "useModelsStore", varName: "modelsStore", file: "~/stores/models" },
  cost: { use: "useCostStore", varName: "costStore", file: "~/stores/cost" },
  local: { use: "useLocalStore", varName: "localStore", file: "~/stores/local" },
  socket: { use: "useSocketStore", varName: "socketStore", file: "~/stores/socket" },
  auth: { use: "useAuthStore", varName: "authStore", file: "~/stores/auth" },
  authority: { use: "useAuthorityStore", varName: "authorityStore", file: "~/stores/authority" },
  supplier: { use: "useSupplierStore", varName: "supplierStore", file: "~/stores/supplier" },
  todo: { use: "useTodoStore", varName: "todoStore", file: "~/stores/todo" },
}

/* Pilotta adi degisen uyeler. */
const RENAME = {
  setBeginLoadingAction: "beginLoading",
  setEndLoadingAction: "endLoading",
  setBeginLoadingDatatableAction: "beginLoadingDatatable",
  setEndLoadingDatatableAction: "endLoadingDatatable",
  getLoading: "isLoading",
  getLoadingDatatable: "isLoadingDatatable",
  setConnection: "connect",
  setDisconnect: "disconnect",
}

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
const ownerOf = (kind, name) => Object.keys(VUEX).filter((m) => VUEX[m][kind].includes(name))

const args = process.argv.slice(2)
const srcArg = args[0]
const inIdx = args.indexOf("--in")
const inPath = inIdx > -1 ? args[inIdx + 1] : null

if (!srcArg) {
  console.error("kullanim: node map-store-refs.mjs <kaynak.vue> [--in <pilot.vue>]")
  process.exit(1)
}

const srcText = fs.readFileSync(path.join(SRC_ROOT, srcArg), "utf8")

/* ---------- 1) mapGetters listesini cikar ---------- */

const getterNames = new Set()
for (const m of srcText.matchAll(/mapGetters\(\s*\[([^\]]*)\]/g)) {
  for (const g of m[1].matchAll(/["']([\w$]+)["']/g)) getterNames.add(g[1])
}
const actionNames = new Set()
for (const m of srcText.matchAll(/mapActions\(\s*\[([^\]]*)\]/g)) {
  for (const g of m[1].matchAll(/["']([\w$]+)["']/g)) actionNames.add(g[1])
}
/*
 * !!! BOSLUK TOLERANSI -- GERCEK BIR HATA SONUCU !!!
 *
 * Ilk surumde TOPLAMA regex'i `\$store\.dispatch\(` seklindeydi, yani
 * `$store` ile `.` ARASINDA bosluk kabul etmiyordu. Oysa DEGISTIRME
 * regex'i `this\.\$store\s*\.\s*dispatch\(` ile satir sonuna izin
 * veriyordu. Prettier bu projede uzun zincirleri boluyor:
 *
 *     this.$store
 *       .dispatch("setOrdersProductsDivideList", po)
 *       .then(...)
 *
 * Bu bicimdeki adlar HIC TOPLANMADI, dolayisiyla cozulemedi ve
 * degistirme onlari sessizce atladi. Geriye `this.$store.dispatch(...)`
 * olarak kaldilar -- Pinia'da `$store` diye bir sey olmadigi icin
 * calisma aninda TypeError.
 *
 * Daha kotusu: dogrulama icin kullandigim `grep '\$store\.'` komutu da
 * ayni nedenle bunlari GORMEDI ("$store" sonrasi satir sonu), yani
 * "temiz" raporu verdi. Iki yerde ayni varsayim, iki kere yanlis.
 *
 * waiting.vue'da kaynakta 51 dispatch vardi, codemod 48 cevirdi; fark
 * tam olarak cok satirli uc cagriydi.
 */
for (const m of srcText.matchAll(/\$store\s*\.\s*dispatch\(\s*["']([\w$]+)["']/g)) actionNames.add(m[1])
const storeGetterRefs = new Set()
for (const m of srcText.matchAll(/\$store\s*\.\s*getters\s*\.\s*([\w$]+)/g)) storeGetterRefs.add(m[1])

/*
 * $store.commit(...) -- bilesenden DOGRUDAN mutation.
 *
 * Vuex'te bu zaten kotu bir desendi (mutation'lar store'un ici icindir)
 * ama calisiyordu. Pinia'da mutation diye bir sey yok; vuex-to-pinia
 * codemod'u mutation'lari MUT_ onekli action'a cevirdi, bu yuzden
 * cagri da MUT_ onekli olmali.
 *
 * Bunlari ayri bir kumede tutuyoruz cunku ad cozumlemesi `mutations`
 * bolumune bakmali -- ayni ad hem action hem mutation olarak var
 * olabilir (bu projede 324 mutation'in 298'i boyle).
 */
const commitNames = new Set()
for (const m of srcText.matchAll(/\$store\s*\.\s*commit\(\s*["']([\w$]+)["']/g)) commitNames.add(m[1])

/* ---------- 2) her adi bir store'a bagla ---------- */

const resolved = new Map() // ad -> { varName, member, kind }
const commits = new Map() // ad -> { varName, member }   (MUT_ onekli)
const unresolved = []
const neededStores = new Map() // varName -> {use, file}

function lookup(kind, name) {
  const owners = ownerOf(kind, name)
  if (!owners.length) {
    unresolved.push(`${kind} "${name}": hicbir Vuex modulunde yok`)
    return null
  }
  const store = STORE_OF[owners[0]]
  if (!store) {
    unresolved.push(`${kind} "${name}" -> ${owners[0]} modulu eslenmemis`)
    return null
  }
  neededStores.set(store.varName, store)
  return { store, owner: owners[0] }
}

function bind(kind, name) {
  const hit = lookup(kind, name)
  if (!hit) return
  resolved.set(name, {
    varName: hit.store.varName,
    member: RENAME[name] ?? name,
    kind,
    owner: hit.owner,
  })
}

for (const n of getterNames) bind("getters", n)
for (const n of storeGetterRefs) if (!resolved.has(n)) bind("getters", n)
for (const n of actionNames) if (!resolved.has(n)) bind("actions", n)

/* commit'ler ayri: hedef MUT_ onekli action */
for (const n of commitNames) {
  const hit = lookup("mutations", n)
  if (!hit) continue
  commits.set(n, { varName: hit.store.varName, member: `MUT_${RENAME[n] ?? n}` })
}

/* ---------- rapor ---------- */

console.log(`\n### ${srcArg}`)
console.log(
  `  mapGetters: ${getterNames.size}  |  action: ${actionNames.size}  |  ` +
    `$store.getters: ${storeGetterRefs.size}  |  $store.commit: ${commitNames.size}`,
)
if (commits.size) {
  console.log("\n  commit -> MUT_ action:")
  for (const [n, c] of commits) console.log(`      ${n} -> ${c.varName}.${c.member}`)
}

const byStore = {}
for (const [name, r] of resolved) {
  byStore[r.varName] = byStore[r.varName] ?? []
  byStore[r.varName].push(name + (r.member !== name ? ` -> ${r.member}` : ""))
}
for (const [v, list] of Object.entries(byStore)) {
  console.log(`\n  ${v}  (${list.length})`)
  list.sort().forEach((x) => console.log(`      ${x}`))
}
if (unresolved.length) {
  console.log(`\n  !! COZULEMEDI (${unresolved.length}):`)
  unresolved.forEach((u) => console.log(`      ${u}`))
}

console.log("\n  --- dosyaya eklenecek ---")
for (const [, s] of neededStores) console.log(`  import { ${s.use} } from "${s.file}"`)
console.log("\n  computed: {")
for (const [v, s] of neededStores) console.log(`    ${v}() {\n      return ${s.use}()\n    },`)
console.log("  },")

/* ---------- 3) pilot dosyasini duzenle ---------- */

if (!inPath) {
  console.log("\n  (rapor modu -- uygulamak icin --in <pilot.vue>)")
  process.exit(unresolved.length ? 1 : 0)
}

let text = fs.readFileSync(inPath, "utf8")
const counts = {}
const bump = (k, n = 1) => (counts[k] = (counts[k] ?? 0) + n)

/*
 * ONCE mapGetters/mapActions BLOKLARINI KALDIR.
 *
 * Bu sira ZORUNLU. Asagidaki "ciplak getter adi" gecisi metin uzerinde
 * calisiyor ve mapGetters dizisinin ICINDEKI DIZGILERI de yakalar
 *   "getOrderList"  ->  "orderStore.getOrderList"
 * Blok nasil olsa store computed'leriyle degistirilecek; once kaldirinca
 * o yanlis dokunus hic olusmuyor.
 */
{
  const importLines = [...neededStores.values()]
    .map((s) => `import { ${s.use} } from "${s.file}"`)
    .join("\n")

  /*
   * DIKKAT -- SATIR SONLARI: kaynak dosyalar CRLF. Regex'lerde duz "\n"
   * kullanmak sessizce ESLESMEMEYE yol aciyor (ilk denemede tam bu oldu:
   * vuex import'u yerinde kaldi, store import'lari da eklenmedi ve rapor
   * yine de "eklendi" dedi). Her yerde \r?\n ve eslesme DOGRULANIYOR.
   */
  const impRe = /import\s*\{[^}]*\}\s*from\s*["']vuex["']\s*;?\r?\n/
  if (impRe.test(text)) {
    text = text.replace(impRe, importLines + "\n")
    bump("vuex import -> store import'lari")
  } else {
    const before = text
    text = text.replace(/(<script[^>]*>\r?\n)/, `$1${importLines}\n`)
    if (text === before) {
      console.error("  !! import'lar EKLENEMEDI -- <script> etiketi bulunamadi")
      process.exit(1)
    }
    bump("store import'lari eklendi")
  }

  const computedEntries = [...neededStores.entries()]
    .map(([v, s]) => `    ${v}() {\n      return ${s.use}()\n    },`)
    .join("\n")

  /* ...mapGetters([ ... ]), -> store computed'leri */
  const spreadRe = /\s*\.\.\.map(?:Getters|Actions)\(\s*\[[\s\S]*?\]\s*\)\s*,?/g
  let replacedSpread = false
  text = text.replace(spreadRe, () => {
    bump("mapGetters/mapActions blogu kaldirildi")
    if (replacedSpread) return ""
    replacedSpread = true
    return "\n" + computedEntries
  })

  /*
   * mapGetters YOKSA da store computed'leri GEREKLI.
   *
   * Bir bilesen hic mapGetters kullanmayip yalnizca $store.dispatch
   * cagiriyor olabilir (orn. components/orders/forms/order.vue). O
   * durumda donusum `this.orderStore.X(...)` uretiyor ama `orderStore`
   * diye bir computed olmuyor -> calisma aninda
   * "Cannot read properties of undefined". Derleme bunu yakalamaz.
   * Ilk surum yalnizca uyari basiyordu; artik ekliyor.
   */
  if (!replacedSpread) {
    const before = text

    // 1) var olan bos computed: {} blogu
    text = text.replace(/computed\s*:\s*\{\s*\}/, `computed: {\n${computedEntries}\n  }`)

    // 2) iceriği olan computed: { ... } blogunun basina ekle
    if (text === before) {
      text = text.replace(/computed\s*:\s*\{\r?\n/, (m) => `${m}${computedEntries}\n`)
    }

    // 3) hic computed yoksa export default'un basina koy
    if (text === before) {
      text = text.replace(
        /export\s+default\s*\{\r?\n/,
        (m) => `${m}  computed: {\n${computedEntries}\n  },\n\n`,
      )
    }

    if (text === before) {
      console.error("  !! computed blogu EKLENEMEDI -- elle eklenmeli")
      process.exit(1)
    }
    bump("store computed'leri eklendi (mapGetters yoktu)")
  }
}

/* this.$store.dispatch("Y", a, b) -> this.<var>.Y(a, b) */
text = text.replace(/this\.\$store\s*\.\s*dispatch\(\s*["']([\w$]+)["']\s*(?:,\s*)?/g, (whole, name) => {
  const r = resolved.get(name)
  if (!r) return whole
  bump("dispatch -> action")
  return `this.${r.varName}.${r.member}(`
})

/* this.$store.commit("X", a) -> this.<var>.MUT_X(a) */
text = text.replace(/this\.\$store\s*\.\s*commit\(\s*["']([\w$]+)["']\s*(?:,\s*)?/g, (whole, name) => {
  const c = commits.get(name)
  if (!c) return whole
  bump("commit -> MUT_ action")
  return `this.${c.varName}.${c.member}(`
})

/* this.$store.getters.X -> this.<var>.X */
text = text.replace(/this\.\$store\s*\.\s*getters\s*\.\s*([\w$]+)/g, (whole, name) => {
  const r = resolved.get(name)
  if (!r) return whole
  bump("$store.getters -> store")
  return `this.${r.varName}.${r.member}`
})

/*
 * Getter adlarinin CIPLAK kullanimlari.
 *
 * Script'te `this.getX`, sablonda `getX`. Ikisi de ayni ada bakiyor
 * (mapGetters onlari computed yapmisti). Once `this.getX` cevrilir, sonra
 * kalan ciplak kullanimlar -- ama YALNIZCA zaten bir nokta ile
 * oncelenmeyenler, yoksa `store.getX` tekrar sarmalanir.
 */
for (const [name, r] of resolved) {
  if (r.kind !== "getters") continue

  const thisRe = new RegExp(`\\bthis\\.${name}\\b`, "g")
  text = text.replace(thisRe, () => {
    bump("this.getX -> this.store.getX")
    return `this.${r.varName}.${r.member}`
  })

  /*
   * ONEMLI KORUMA -- ad bir NESNE ANAHTARI olabilir.
   *
   * mapGetters ile gelen bir getter, kodda DEGER olarak kullanilir
   * (`getOrderList`), asla fonksiyon gibi cagrilmaz. Ama ayni ad bir
   * nesne anahtari olarak da gecebiliyor; bu projede gercek ornek:
   *
   *     watch: {
   *       getOrderProductionYearsList() { ... }
   *     }
   *
   * Kor degistirme bunu `orderStore.getOrderProductionYearsList() {...}`
   * yapiyor ve bu GECERSIZ SOZDIZIMI -- derleme
   * "Unexpected token, expected ," ile patliyor. (Ilk denemede tam bu
   * oldu.) Patlamasi iyi: sessiz bir bozulma degil. Yine de arac bunlari
   * ATLIYOR ve raporluyor, cunku dogru donusum farkli:
   *
   *     watch: {
   *       "orderStore.getOrderProductionYearsList"() { ... }
   *     }
   *
   * Kural: adin ardindan ( geliyorsa bu bir anahtar/bildirimdir, kullanim
   * degil -> dokunma.
   */
  const bareRe = new RegExp(`(^|[^\\w$.])${name}\\b(?!\\s*\\()`, "g")
  text = text.replace(bareRe, (whole, pre) => {
    bump("sablonda getX -> store.getX")
    return `${pre}${r.varName}.${r.member}`
  })

  const keyRe = new RegExp(`(^|[^\\w$.])${name}\\s*\\(`, "g")
  const keyHits = (text.match(keyRe) || []).length
  if (keyHits) {
    bump(`ATLANDI (nesne anahtari): ${name}`, keyHits)
  }
}

fs.writeFileSync(inPath, text, "utf8")
console.log(`\n  --- ${inPath} duzenlendi ---`)
for (const [k, v] of Object.entries(counts)) console.log(`  ${String(v).padStart(4)}x  ${k}`)

const leftover = (text.match(/\$store\./g) || []).length
if (leftover) console.log(`\n  !! hala ${leftover} adet $store. referansi var -- elle bakilmali`)
