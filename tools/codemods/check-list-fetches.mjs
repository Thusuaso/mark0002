/*
 * Bir sayfanin (ve kullandigi bilesenlerin) OKUDUGU store getter'lari
 * ile o getter'in arkasindaki state'i DOLDURAN action'i eslestirir;
 * sonra sayfanin o action'lari gercekten cagirip cagirmadigini soyler.
 *
 * NEDEN VAR -- gercek bir hata sonucu:
 * Nuxt 2'de layouts/default.vue'nun created()'i 25 referans listesini
 * birden cekiyordu (musteriler, ulkeler, birimler, teslim/odeme/fatura
 * turleri...). Pilotun layout'u bunu BILEREK ertelemis ve "her sayfa
 * kendi ihtiyacini useAsyncData ile ceksin" demis. Ancak
 * pages/orders/waiting.vue ve production.vue tasinirken yalnizca kendi
 * created()'larindaki 2 action aktarildi; diyaloglarin okudugu referans
 * listeleri HIC CEKILMEDI.
 *
 * Sonuc: AutoComplete ve Select alanlari BOS geliyor. Hata yok, uyari
 * yok -- getter bos dizi donuyor, bilesen de bos liste gosteriyor.
 * Kullanici bunu "customer ve proforma alanlarinin verileri gelmiyor"
 * olarak bildirdi.
 *
 * Kullanim (pilot yollariyla):
 *   node tools/codemods/check-list-fetches.mjs app/pages/orders/waiting.vue
 */
import fs from "node:fs"
import path from "node:path"

const PILOT = path.resolve(import.meta.dirname, "../..")
const STORES = path.join(PILOT, "app/stores")
const COMPONENTS = path.join(PILOT, "app/components")

/* ---------- store'u ayristir: getter -> state anahtari, action -> yazdigi anahtarlar ---------- */

function parseStore(file) {
  const text = fs.readFileSync(file, "utf8")

  // getX: (state) => state.k
  const getterOf = new Map()
  for (const m of text.matchAll(/^\s{4}([A-Za-z_$][\w$]*)\s*:\s*\(state\)\s*=>\s*state\.([\w$]+)/gm)) {
    getterOf.set(m[1], m[2])
  }

  /*
   * Her state anahtarinin BASLANGIC degeri bos dizi mi?
   *
   * Bu ayrim onemli: "hicbir action cagrilmamis" tek basina hata DEMEK
   * DEGIL. Bir sayac, bayrak veya varsayilanlarla dolu bir model nesnesi
   * zaten anlamli bir baslangic degerine sahip ve ilgili action yalnizca
   * TALEP UZERINE calisiyor (orn. satir secilince, kaydetmeden sonra).
   * Asil sorun `[]` ile baslayip hic doldurulmayan LISTELER -- acilir
   * menuler onlari bos gosteriyor.
   *
   * Ilk surum bu ayrimi yapmiyordu ve 14 bulgudan 7'si yanlis pozitifti.
   */
  const emptyArrayState = new Set()
  for (const m of text.matchAll(/^\s{2,4}([A-Za-z_$][\w$]*)\s*:\s*\[\s*\](?:\s+as\s+[^,]+)?,/gm)) {
    emptyArrayState.add(m[1])
  }

  // action govdelerini kabaca ayir: "    name(" ile baslayip bir sonraki ayni girintili tanima kadar
  const actions = new Map()
  const lines = text.split("\n")
  let cur = null
  let buf = []
  for (const l of lines) {
    const m = l.match(/^ {4}(?:async\s+)?([A-Za-z_$][\w$]*)\s*\(/)
    if (m) {
      if (cur) actions.set(cur, buf.join("\n"))
      cur = m[1]
      buf = []
    } else if (cur) {
      buf.push(l)
    }
  }
  if (cur) actions.set(cur, buf.join("\n"))

  /* Bir action hangi state anahtarlarini yaziyor?
   * Dogrudan `this.k = ...` veya `this.MUT_x(...)` araciligiyla. */
  function writesOf(name, seen = new Set()) {
    if (seen.has(name)) return new Set()
    seen.add(name)
    const body = actions.get(name)
    if (!body) return new Set()

    const out = new Set()

    /* dogrudan atama: this.k = ... */
    for (const m of body.matchAll(/this\.([A-Za-z_$][\w$]*)\s*=[^=]/g)) out.add(m[1])

    /*
     * DIZI MUTASYONU da bir yazmadir: this.k.push(...) / splice / unshift.
     *
     * Ilk surum yalnizca `=` atamasina bakiyordu, bu yuzden
     * MUT_setOrderProductAdded gibi `this.orderProductAdded.push(payload)`
     * yazan mutation'lari GORMUYORDU. Sonuc: o state'in tek "dolduran"i
     * olarak onu SIFIRLAYAN action (setProductionProductMailReset)
     * bulunuyor ve getter "hic beslenmiyor" diye yanlis isaretleniyordu.
     */
    for (const m of body.matchAll(/this\.([A-Za-z_$][\w$]*)\.(?:push|unshift|splice)\s*\(/g)) {
      out.add(m[1])
    }

    for (const m of body.matchAll(/this\.(MUT_[A-Za-z_$][\w$]*)\s*\(/g)) {
      for (const k of writesOf(m[1], seen)) out.add(k)
    }
    return out
  }

  const fillersOf = new Map() // state anahtari -> onu dolduran action'lar
  for (const name of actions.keys()) {
    if (name.startsWith("MUT_")) continue
    for (const k of writesOf(name)) {
      if (!fillersOf.has(k)) fillersOf.set(k, [])
      fillersOf.get(k).push(name)
    }
  }

  return { getterOf, fillersOf, emptyArrayState, actions: new Set(actions.keys()) }
}

const storeFiles = fs.readdirSync(STORES).filter((f) => f.endsWith(".ts"))
const STORE = new Map() // varName -> parsed
const VAR_OF_FILE = {
  "shared.ts": "sharedStore",
  "order.ts": "orderStore",
  "models.ts": "modelsStore",
  "cost.ts": "costStore",
  "local.ts": "localStore",
  "socket.ts": "socketStore",
  "supplier.ts": "supplierStore",
  "todo.ts": "todoStore",
  "authority.ts": "authorityStore",
}
for (const f of storeFiles) {
  const v = VAR_OF_FILE[f]
  if (!v) continue
  STORE.set(v, parseStore(path.join(STORES, f)))
}

/* ---------- hedef sayfa + bilesen kapanisi ---------- */

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, out)
    else if (e.name.endsWith(".vue")) out.push(p)
  }
  return out
}

const autoName = (abs) =>
  path
    .relative(COMPONENTS, abs)
    .replace(/\.vue$/, "")
    .split(path.sep)
    .map((s) => s[0].toUpperCase() + s.slice(1))
    .reduce((acc, p) => (acc.length && acc[acc.length - 1].toLowerCase() === p.toLowerCase() ? acc : [...acc, p]), [])
    .join("")

const allComponents = walk(COMPONENTS).map((abs) => ({ abs, name: autoName(abs) }))

function closure(entryAbs) {
  const seen = new Set([entryAbs])
  const queue = [entryAbs]
  while (queue.length) {
    const text = fs.readFileSync(queue.shift(), "utf8")
    const tpl = text.slice(0, text.indexOf("<script") === -1 ? text.length : text.indexOf("<script"))
    for (const c of allComponents) {
      if (seen.has(c.abs)) continue
      if (new RegExp(`<${c.name}(?=[\\s/>])`).test(tpl)) {
        seen.add(c.abs)
        queue.push(c.abs)
      }
    }
  }
  return [...seen]
}

/* ---------- rapor ---------- */

const targets = process.argv.slice(2)
if (!targets.length) {
  console.error("kullanim: node check-list-fetches.mjs <app/pages/...vue>")
  process.exit(1)
}

let problems = 0

for (const rel of targets) {
  const abs = path.resolve(PILOT, rel)
  const files = closure(abs)

  /*
   * YORUMLAR AYIKLANIYOR.
   *
   * Aksi halde yorum icindeki bir cagri "cagriliyor" sayiliyor.
   * Gercek ornek: waiting.vue'da
   *     //   this.sharedStore.setSupplierList();
   * satiri yuzunden getSupplierList "besleniyor" gorundu, oysa tedarikci
   * listesi hic cekilmiyordu ve isçilik formundaki AutoComplete ile
   * OrderDetailSupplierForm'daki Select BOS geliyordu.
   */
  const stripComments = (t) =>
    t
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1")

  const read = (f) => stripComments(fs.readFileSync(f, "utf8"))

  /*
   * TARAMA KAPSAMI: sayfa + bilesen kapanisi + LAYOUT'LAR + SAYFANIN
   * GERCEKTEN CAGIRDIGI COMPOSABLE'LAR.
   *
   * Ilk surum yalnizca bilesen kapanisina bakiyordu ve iki yanlis pozitif
   * uretiyordu:
   *   - shared.setUserList() app/layouts/default.vue icinde cagriliyor,
   *   - referans listeleri app/composables/useOrderReferenceData.ts
   *     icinde cagriliyor (sayfa yalnizca o composable'i cagiriyor).
   * Ikisi de "hic cekilmiyor" diye isaretleniyordu.
   *
   * Ama composable'larin TAMAMINI taramak ters yone kaciriyordu: sayfa
   * useOrderReferenceData'yi cagirmasa bile o dosyadaki
   * `shared.setSupplierList()` satiri "cagriliyor" sayiliyordu. Gercek
   * ornek: pages/selection/input.vue tedarikci listesini HIC cekmiyordu
   * -- kasaya tiklandiginda Supplier alani bos aciliyordu -- ama arac
   * yalnizca ocak listesini bildirdi. Artik bir composable, ancak adi
   * sayfa/bilesen kapanisinda veya bir layout'ta CAGRILIYORSA taraniyor.
   */
  const filesIn = (d) =>
    fs.existsSync(d)
      ? fs
          .readdirSync(d, { withFileTypes: true, recursive: true })
          .filter((e) => e.isFile() && /\.(vue|ts|js)$/.test(e.name))
          .map((e) => path.join(e.parentPath ?? d, e.name))
      : []

  const layoutFiles = filesIn(path.join(PILOT, "app/layouts"))
  const scopeText = [...files, ...layoutFiles].map(read).join("\n")

  const composableFiles = filesIn(path.join(PILOT, "app/composables")).filter((f) => {
    const name = path.basename(f).replace(/\.(vue|ts|js)$/, "")
    return scopeText.includes(name + "(")
  })

  const allText = [scopeText, ...composableFiles.map(read)].join("\n")

  /* okunan getter'lar: <var>.<getter> */
  const used = new Map() // "var.getter" -> {var, getter}
  for (const [v] of STORE) {
    for (const m of allText.matchAll(new RegExp(`\\b${v}\\.([A-Za-z_$][\\w$]*)`, "g"))) {
      const g = m[1]
      if (STORE.get(v).getterOf.has(g)) used.set(`${v}.${g}`, { v, g })
    }
  }

  const missing = []
  const ok = []
  const onDemand = []
  const noFiller = []

  for (const { v, g } of used.values()) {
    const parsed = STORE.get(v)
    const key = parsed.getterOf.get(g)
    const fillers = parsed.fillersOf.get(key) ?? []
    if (!fillers.length) {
      noFiller.push(`${v}.${g} (state.${key})`)
      continue
    }
    const called = fillers.some((a) => new RegExp(`\\b${a}\\s*\\(`).test(allText))

    if (called) {
      ok.push(`${g} <- ${fillers.join("/")}`)
    } else if (parsed.emptyArrayState.has(key)) {
      /*
       * `[]` ile basliyor ve hicbir yerden doldurulmuyor -> acilir menu
       * BOS gelir. Gercek hata budur.
       */
      missing.push({ getter: `${v}.${g}`, key, fillers })
    } else {
      /*
       * Anlamli bir baslangic degeri var (sayac, bayrak, varsayilanli
       * model nesnesi); ilgili action TALEP UZERINE calisiyor -- satir
       * secilince, kaydetmeden sonra vb. "Cagrilmamis olmasi" hata degil.
       * Ilk surum bu ayrimi yapmiyordu ve 14 bulgudan 6'si yanlis
       * pozitifti.
       */
      onDemand.push(`${v}.${g} <- ${fillers.join("/")}`)
    }
  }

  console.log(`\n### ${rel}`)
  console.log(`    kapanis: ${files.length} dosya  |  okunan getter: ${used.size}  |  beslenen: ${ok.length}`)

  if (missing.length) {
    problems++
    console.log(`\n    !! VERISI HIC CEKILMEYEN ${missing.length} GETTER:`)
    for (const m of missing) {
      console.log(`       ${m.getter.padEnd(34)} state.${m.key.padEnd(30)} <- ${m.fillers.join(" / ")}`)
    }
    const actions = [...new Set(missing.flatMap((m) => m.fillers))].sort()
    console.log(`\n    Cagrilmasi gereken action'lar (${actions.length}):`)
    for (const a of actions) console.log(`       ${a}()`)
  }
  if (onDemand.length) {
    console.log(`
    (bilgi) talep uzerine dolan ${onDemand.length} getter -- baslangic degeri var, sorun degil:`)
    for (const d of onDemand) console.log(`       ${d}`)
  }
  if (noFiller.length) {
    console.log(`\n    (bilgi) hicbir action tarafindan doldurulmayan getter: ${noFiller.join(", ")}`)
  }
}

if (problems) {
  console.log(`\n${problems} sayfada eksik veri cekimi var.`)
  process.exit(1)
}
console.log("\nTum okunan getter'lar besleniyor.")
