/*
 * Pinia store uyesi cagrilarini dogrular: bir dosyada
 * `<alias>.<uye>` seklinde erisilen her ad, o store'da GERCEKTEN
 * tanimli mi?
 *
 * NEDEN VAR: Nuxt 2 -> Nuxt 3 tasimasinda `mapGetters` / `$store.dispatch`
 * cagrilari elle store nesnelerine cevrilmis ve bazi yerlerde AD ya da
 * STORE yanlis kalmis. Bu hatalarin iki bicimi var:
 *   - ACTION yanlissa  -> TypeError, metot O SATIRDA kesilir ve altindaki
 *                         kod hic calismaz (dialog acilmaz, buton kilitli
 *                         kalir...)
 *   - GETTER yanlissa  -> SESSIZCE undefined doner (bos liste/form)
 * Ikisi de kullaniciya "tiklama bir sey yapmiyor" olarak gorunuyor.
 *
 * ILK SURUMUN IKI KUSURU VARDI, ikisi de yanlis pozitif uretti:
 *   1) YORUMLARI AYIKLAMIYORDU -- yorum icindeki ornek adlar
 *      (`reportsStore.getX`) hata sanildi.
 *   2) YALNIZCA options-style store'lari ayristiriyordu; auth.ts
 *      setup-style oldugu icin uyeleri hic bulunamadi ve
 *      `authStore.getUserId` hata sanildi.
 * Ayrica alias -> store eslemesi ADA GORE tahmin ediliyordu; burada
 * import ve atamalardan COZULUYOR.
 */
/*
 * ESM YAZILDI, CommonJS DEGIL.
 *
 * Projenin package.json'inda `"type": "module"` var, dolayisiyla
 * buradaki .js dosyalari ES modulu sayiliyor: `require` ve `__dirname`
 * TANIMSIZ. Betik ilk once scratchpad'de yazildigi (orada boyle bir
 * ayar yok) ve CommonJS olarak calistigi icin bu fark projeye
 * kopyalanana kadar gorunmedi.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

/*
 * PROJE KOKU BETIGIN KENDI KONUMUNDAN COZULUYOR.
 *
 * Ilk surumde buraya gelistirme makinesinin MUTLAK YOLU yaziliydi
 * ("C:/Users/<kullanici>/.../mark0002-nuxt3-pilot"). Betik tools/
 * altinda oldugu icin bir ust dizin proje koku.
 *
 * NOT: bu bir GELISTIRME araci (tools/), uygulamanin calisma zamanina
 * dahil degil -- yani mutlak yol dagitilan uygulamayi bozmazdi, ama
 * araci calistiran herkeste ve surum kontrolunde sorun olurdu.
 */
const HERE = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(HERE, "..")
const STORE_DIR = path.join(ROOT, "app/stores")

/* ---------- yorum / dizge ayiklama ---------- */

/*
 * Blok ve satir yorumlarini, ayrica dizge ve sablon-dizge iceriklerini
 * bosluga cevirir (uzunluk korunur ki satir numaralari kaymasin).
 */
function strip(src) {
  /*
   * HTML/Vue yorumlari ONCE ayiklanir.
   *
   * Bu projede .vue dosyalarinin sonunda uzun `<!-- tasima notlari -->`
   * bloklari var ve icinde ORNEK store cagrilari geciyor
   * (orn. "reportsStore.getX", "mapGetters -> orderStore"). Ilk surum
   * yalnizca JS yorumlarini ayikladigi icin bunlari GERCEK cagri sandi
   * ve yanlis pozitif uretti.
   */
  src = src.replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "))

  let out = ""
  let i = 0
  const n = src.length

  while (i < n) {
    const two = src.slice(i, i + 2)

    if (two === "/*") {
      const end = src.indexOf("*/", i + 2)
      const stop = end === -1 ? n : end + 2
      out += src.slice(i, stop).replace(/[^\n]/g, " ")
      i = stop
      continue
    }

    if (two === "//") {
      const end = src.indexOf("\n", i)
      const stop = end === -1 ? n : end
      out += " ".repeat(stop - i)
      i = stop
      continue
    }

    const ch = src[i]
    if (ch === '"' || ch === "'" || ch === "`") {
      let j = i + 1
      while (j < n && src[j] !== ch) {
        if (src[j] === "\\") j++
        j++
      }
      const stop = Math.min(j + 1, n)
      out += src.slice(i, stop).replace(/[^\n]/g, " ")
      i = stop
      continue
    }

    out += ch
    i++
  }

  return out
}

/* ---------- store uyelerini cikar ---------- */

function optionsMembers(src) {
  const members = new Set()

  /*
   * state / getters / actions bloklarinin HEPSI ikinci seviye girintide
   * (`  ad:` veya `    ad:`). Hem `ad: deger`, hem `ad() {}`, hem
   * `async ad() {}` bicimlerini aliyoruz.
   */
  for (const m of src.matchAll(/^[ \t]{2,6}([A-Za-z_$][\w$]*)[ \t]*:/gm)) members.add(m[1])
  for (const m of src.matchAll(/^[ \t]{2,6}(?:async[ \t]+)?([A-Za-z_$][\w$]*)[ \t]*\(/gm))
    members.add(m[1])

  return members
}

function setupMembers(src) {
  const members = new Set()

  /* const/let/function tanimlari */
  for (const m of src.matchAll(/^[ \t]*(?:const|let|var)[ \t]+([A-Za-z_$][\w$]*)/gm))
    members.add(m[1])
  for (const m of src.matchAll(/^[ \t]*(?:async[ \t]+)?function[ \t]+([A-Za-z_$][\w$]*)/gm))
    members.add(m[1])

  /* return { a, b, c } icindeki adlar */
  const ret = src.match(/return[ \t]*\{([\s\S]*?)\}/)
  if (ret) {
    for (const m of ret[1].matchAll(/([A-Za-z_$][\w$]*)/g)) members.add(m[1])
  }

  return members
}

/** useXStore adi -> uye kumesi */
const storeMembers = new Map()

for (const file of fs.readdirSync(STORE_DIR)) {
  if (!file.endsWith(".ts")) continue

  const raw = fs.readFileSync(path.join(STORE_DIR, file), "utf8")
  const src = strip(raw)

  const hook = (raw.match(/export\s+const\s+(use[A-Za-z0-9_]*Store)/) || [])[1]
  if (!hook) continue

  const isSetup = /defineStore\([^,]+,\s*\(\s*\)/.test(src)
  const members = isSetup ? setupMembers(src) : optionsMembers(src)

  storeMembers.set(hook, { file, members, isSetup })
}

/* ---------- kullanim yerlerini tara ---------- */

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(p, out)
    else if (/\.(vue|ts|js)$/.test(entry.name)) out.push(p)
  }
  return out
}

const findings = []

for (const file of walk(path.join(ROOT, "app"))) {
  const raw = fs.readFileSync(file, "utf8")
  const src = strip(raw)

  /*
   * alias -> useXStore eslemesi, DOSYANIN KENDISINDEN cozuluyor:
   *   const financeStore = useFinanceStore()
   *   financeStore() { return useFinanceStore() }
   */
  const alias = new Map()

  /*
   * `()` SONRASINDA NOKTA OLMAMALI -- `(?!\s*\.)`.
   *
   * Aksi halde zincirlenmis ifadeler takma ad saniliyor ve yanlis
   * pozitif uretiyor. Olculen iki ornek:
   *   const user   = useSharedStore().getUserList.find(...)   // bgp.ts
   *   const socket = useSocketStore().getSocket               // chat.ts
   * Bunlarda degisken store DEGIL, zincirin SONUCU (bir kullanici
   * nesnesi ve bir socket.io ornegi). `user.KullaniciAdi` ve
   * `socket.on(...)` dogru kod oldugu halde hata olarak bildiriliyordu.
   */
  for (const m of src.matchAll(
    /(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(use[A-Za-z0-9_]*Store)\s*\(\s*\)(?!\s*\.)/g,
  ))
    alias.set(m[1], m[2])
  for (const m of src.matchAll(
    /([A-Za-z_$][\w$]*)\s*\(\s*\)\s*\{\s*return\s+(use[A-Za-z0-9_]*Store)\s*\(/g,
  ))
    alias.set(m[1], m[2])

  /*
   * TAKMA AD KULLANMAYAN DOGRUDAN CAGRILAR: `useXStore().uye`
   *
   * Kod tabaninda 19 tane var (orn. `useModelsStore().setAccountsModel`,
   * `useLogsStore().setLogs`). Takma ad temelli tarama bunlari HIC
   * gormuyordu, yani o yollar denetimsiz kaliyordu.
   */
  for (const m of src.matchAll(
    /(use[A-Za-z0-9_]*Store)\s*\(\s*\)\s*\.\s*([A-Za-z_$][\w$]*)/g,
  )) {
    const [, hook, member] = m
    const store = storeMembers.get(hook)
    if (!store) continue
    if (store.members.has(member)) continue
    if (/^\$/.test(member) || ["patch", "reset", "state", "value"].includes(member)) continue

    const line = src.slice(0, m.index).split("\n").length
    findings.push({
      file: path.relative(ROOT, file),
      line,
      name: `${hook}()`,
      member,
      hook,
      store: store.file,
    })
  }

  if (!alias.size) continue

  /*
   * TAKMA AD BASINA ARAMA -- genel `NAME.MEMBER` deseni KULLANILAMAZ.
   *
   * Ilk surum `\b(\w+)\s*\.\s*(\w+)/g` kullaniyordu ve `this.` onekli
   * cagrilari KACIRIYORDU: `this.financeStore.setFinancePoModel`
   * girdisinde desen once `this.financeStore` esleniyor (name=this,
   * member=financeStore), `financeStore` TUKETILDIGI icin asil cagri
   * hic goruntulenmiyordu.
   *
   * Bu, bu projedeki EN YAYGIN kalip (options API bileşenleri hep
   * `this.xStore.y()` yaziyor), dolayisiyla aracin "0 bulgu" sonucu
   * gecersizdi -- sinama dosyasiyla olculdu: sablondaki getter
   * yakalandi, iki metot cagrisi KACTI.
   *
   * Simdi her takma ad icin AYRI desen kuruluyor ve onunde istege
   * bagli `this.` kabul ediliyor.
   */
  for (const [name, hook] of alias) {
    const store = storeMembers.get(hook)
    if (!store) continue

    const re = new RegExp(
      `(?:^|[^\\w$])(?:this\\s*\\.\\s*)?${name}\\s*\\.\\s*([A-Za-z_$][\\w$]*)`,
      "g",
    )

    for (const m of src.matchAll(re)) {
      const member = m[1]
      if (store.members.has(member)) continue

      /* $-ile baslayan Pinia API'si (patch, reset, state...) haric */
      if (/^\$/.test(member) || ["patch", "reset", "state", "value"].includes(member)) continue

      const line = src.slice(0, m.index).split("\n").length
      findings.push({
        file: path.relative(ROOT, file),
        line,
        name,
        member,
        hook,
        store: store.file,
      })
    }
  }
}

/* ---------- rapor ---------- */

console.log(`Taranan store: ${storeMembers.size}`)
console.log(`Bulgu: ${findings.length}\n`)

const seen = new Set()
for (const f of findings) {
  const key = `${f.file}|${f.name}.${f.member}`
  if (seen.has(key)) continue
  seen.add(key)

  /* Uye hangi BASKA store'da tanimli? */
  const elsewhere = [...storeMembers.entries()]
    .filter(([h, s]) => h !== f.hook && s.members.has(f.member))
    .map(([, s]) => s.file)

  console.log(`${f.file}:${f.line}`)
  console.log(`  ${f.name}.${f.member}   (${f.store} icinde YOK)`)
  console.log(
    elsewhere.length ? `  -> asil yeri: ${elsewhere.join(", ")}` : `  -> hicbir store'da yok`,
  )
  console.log()
}
