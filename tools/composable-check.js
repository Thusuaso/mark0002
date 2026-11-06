/*
 * Composable kullanim denetleyicisi.
 *
 * Uc hata sinifini yakalar:
 *
 *   1) CAGRILABILIR composable'a METOT GIBI davranmak
 *      useApi() bir $fetch ornegi dondurur (cagrilabilir fonksiyon),
 *      metot tasimaz. `useApi().get(url)` calisma aninda
 *          TypeError: (intermediate value)().get is not a function
 *      firlatir. Uretimde 8 yerde bu hata vardi; sayfa acilisinda
 *      mounted() icinde patliyordu.
 *
 *   2) NESNE donduren composable'i FONKSIYON GIBI cagirmak
 *      `useAppToast()("mesaj")` gibi -- ters yondeki ayni hata.
 *
 *   3) OLMAYAN METOT adi
 *      `useLegacyApi().patch(...)` gibi; sarmalayicida patch yok.
 *
 * NEDEN ARAC: bu hatalar DERLEME SIRASINDA gorunmuyor (TypeScript
 * gevsek, .vue dosyalari denetlenmiyor) ve yalnizca o sayfa/o buton
 * kullanilinca ortaya cikiyor. Nuxt 2'den tasimada composable
 * sozlesmesi degistigi icin tam bu tur kaymalar olusuyor.
 *
 * Kullanim: node tools/composable-check.js
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const HERE = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(HERE, "..")
const COMPOSABLE_DIR = path.join(ROOT, "app/composables")

/* ---------- yorum / dizge ayiklama ---------- */

function strip(src) {
  /* HTML/Vue yorumlari: .vue dosyalarinin sonundaki tasima notlari */
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

/* ---------- composable sozlesmelerini cikar ---------- */

/*
 * `return { ... }` blogunun EN UST SEVIYEDEKI anahtarlarini cikarir.
 *
 * ---------------------------------------------------------------------
 * NEDEN KUME-PARANTEZ ESLEME, NEDEN REGEX DEGIL
 * ---------------------------------------------------------------------
 * Ilk surum `return\s*\{([\s\S]*?)\n\s*\}` ile blogu kesip icinde
 * `ad:` ariyordu. Iki yonden yanlisti:
 *
 *   1) Bu projedeki composable'lar uyeleri METOT KISAYOLU ile
 *      tanimliyor (`success(detail: string) { ... }`), `ad:` bicimiyle
 *      DEGIL -- yani hicbir uye bulunamiyordu. useAppToast icin uye
 *      kumesi BOS cikti ve 100'den fazla gecerli `useAppToast().error`
 *      cagrisi "boyle bir uye yok" diye raporlandi.
 *
 *   2) Tembel `*?` eslemesi blogu ILK girintili `}`de kesiyordu, yani
 *      ic fonksiyonlarin govdesinde duruyordu; kalan metin icindeki
 *      TIP ADLARI (`file: File`, `id: number`) uye sanildi --
 *      useFileService icin `File, dosyaAdi, id, number, po` gibi
 *      anlamsiz bir kume uretti.
 *
 * Dogrusu: `return {`den baslayip parantez derinligi takip ederek
 * blogu kapatmak ve YALNIZCA derinlik 1'deki `ad(` / `ad:` / `ad,`
 * bicimlerini uye saymak.
 */
function returnedMembers(body) {
  const members = new Set()

  let i = body.indexOf("return")
  while (i !== -1) {
    /* `return` sonrasi ilk anlamli karakter `{` mi? */
    let j = i + "return".length
    while (j < body.length && /\s/.test(body[j])) j++

    if (body[j] === "{") {
      let depth = 0
      let end = j

      for (; end < body.length; end++) {
        if (body[end] === "{") depth++
        else if (body[end] === "}") {
          depth--
          if (depth === 0) break
        }
      }

      const block = body.slice(j + 1, end)

      /* Derinlik 1'deki anahtarlar: ic govdeler atlanir. */
      /*
       * Derinlik 1'deki anahtarlar; ic govdeler atlanir.
       *
       * ACILIS KARAKTERI KORUNUYOR: `(` ve `{` derinligi artirmadan
       * ONCE yaziliyor. Aksi halde metot kisayolu
       *     success(detail: string) { ... }
       * ozetlenirken `(` dusuyor ve ad `success)` gibi gorunuyor;
       * uye deseni adin ardindan `(` bekledigi icin HICBIR uye
       * bulunamiyordu (olculdu: useAppToast, useFileService,
       * useSpacesService, useTcmb -- dordu de bos cikti ve 180'den
       * fazla gecerli cagri hata sanildi).
       */
      let d = 0
      let line = ""
      for (const ch of block) {
        const opens = ch === "{" || ch === "(" || ch === "["
        const closes = ch === "}" || ch === ")" || ch === "]"

        if (opens) {
          if (d === 0) line += ch
          d++
        } else if (closes) {
          d--
          if (d === 0) line += ch
        } else if (d === 0) {
          line += ch
        }

        if (ch === "\n" && d > 0) line += "\n"
      }

      /*
       * Uc tanim bicimi de kabul ediliyor:
       *   ad(...) { }   metot kisayolu   -> ardindan `(`
       *   ad: deger     klasik anahtar   -> ardindan `:`
       *   ad           kisayol ozellik  -> ardindan `,` veya blok sonu
       *
       * Ucuncusu ONCE ATLANMISTI: useTcmb `return { getUSDRate }`
       * yaziyor ve uye kumesi bos cikiyordu; o composable'in TEK
       * uyesine yapilan dort gecerli cagri hata sanildi.
       */
      /*
       * `async` / `get` / `set` ONEKLERI ATLANIYOR.
       *
       * Bu da once KACIRILMISTI: useSpacesService'teki
       *     async panelProductPhotoDelete(filename: string) { ... }
       * tanimi bulunamiyordu, cunku desen adin hemen oncesinde
       * `[\n,{]` bekliyor; burada adin onunde `async ` var. Sonuc:
       * VAR OLAN bir uye "yok" diye raporlandi ve calisan kod hatali
       * sanildi (ProductForm.vue'daki iki cagri).
       */
      for (const m of line.matchAll(
        /(?:^|[\n,{])\s*(?:(?:async|get|set)\s+)?([A-Za-z_$][\w$]*)\s*(?=[(:]|\s*,|\s*$)/gm,
      )) {
        members.add(m[1])
      }
    }

    i = body.indexOf("return", i + 1)
  }

  return members
}

/** useX adi -> { kind: "callable" | "object", members:Set, file } */
const contracts = new Map()

for (const file of fs.readdirSync(COMPOSABLE_DIR)) {
  if (!file.endsWith(".ts")) continue

  const src = strip(fs.readFileSync(path.join(COMPOSABLE_DIR, file), "utf8"))

  for (const m of src.matchAll(/export\s+function\s+(use[A-Z][\w$]*)\s*\(/g)) {
    const name = m[1]

    /* Fonksiyon govdesini kabaca al: bir sonraki top-level export'a kadar */
    const start = m.index
    const nextExport = src.slice(start + 1).search(/\nexport\s/)
    const body = src.slice(start, nextExport === -1 ? src.length : start + 1 + nextExport)

    /*
     * `return $fetch.create(...)` -> CAGRILABILIR
     * `return { ... }`            -> NESNE (uyeler toplanir)
     */
    if (/return\s+\$fetch\.create\s*\(/.test(body)) {
      contracts.set(name, { kind: "callable", members: new Set(), file })
      continue
    }

    contracts.set(name, { kind: "object", members: returnedMembers(body), file })
  }
}

/* ---------- kullanim yerlerini tara ---------- */

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(p, out)
    else if (/\.(vue|ts)$/.test(entry.name)) out.push(p)
  }
  return out
}

const findings = []

for (const file of walk(path.join(ROOT, "app"))) {
  if (file.startsWith(path.join(ROOT, "app/composables"))) continue

  const src = strip(fs.readFileSync(file, "utf8"))

  for (const [name, contract] of contracts) {
    /* useX() SONRASI ne geliyor: `.uye` mi, `(` mi? */
    const re = new RegExp(`\\b${name}\\s*\\(\\s*\\)\\s*(\\.\\s*([A-Za-z_$][\\w$]*)|\\()`, "g")

    for (const m of src.matchAll(re)) {
      const member = m[2]
      const line = src.slice(0, m.index).split("\n").length
      const isCall = member === undefined

      if (contract.kind === "callable" && !isCall) {
        findings.push({
          file,
          line,
          problem: `${name}().${member}  -> ${name}() CAGRILABILIR, metodu yok`,
          fix: `${name}()(url, { method: "..." })`,
        })
      }

      if (contract.kind === "object" && isCall) {
        findings.push({
          file,
          line,
          problem: `${name}()(...)  -> ${name}() NESNE donduruyor, cagrilabilir degil`,
          fix: `${name}().<uye>(...)`,
        })
      }

      if (contract.kind === "object" && !isCall && !contract.members.has(member)) {
        findings.push({
          file,
          line,
          problem: `${name}().${member}  -> boyle bir uye YOK`,
          fix: `mevcut uyeler: ${[...contract.members].sort().join(", ") || "(cikarilamadi)"}`,
        })
      }
    }
  }
}

/* ---------- rapor ---------- */

console.log("Composable sozlesmeleri:")
for (const [name, c] of contracts) {
  const detail =
    c.kind === "callable"
      ? "cagrilabilir ($fetch ornegi)"
      : `nesne { ${[...c.members].sort().join(", ")} }`
  console.log(`  ${name.padEnd(24)} ${detail}`)
}

console.log(`\nBulgu: ${findings.length}\n`)

for (const f of findings) {
  console.log(`${path.relative(ROOT, f.file)}:${f.line}`)
  console.log(`  ${f.problem}`)
  console.log(`  dogrusu: ${f.fix}\n`)
}

process.exitCode = findings.length ? 1 : 0
