/*
 * MOBIL DUZEN DENETLEYICISI
 *
 * ---------------------------------------------------------------------
 * NEDEN STATIK TARAMA
 * ---------------------------------------------------------------------
 * Bu makinedeki Chrome'da sayfa gorunum alani 1536px'te SABIT kaliyor:
 * pencere kucultulunce `innerWidth` degismiyor (hatta render donuyor),
 * yani medya sorgulari hic tetiklenmiyor ve mobil duzen GOZLE
 * dogrulanamiyor. Bu arac, gorunum alanindan BAGIMSIZ olarak
 * dogrulanabilen tehlikeleri ariyor.
 *
 * Aradigi dort sey -- hepsi dar ekranda YATAY TASMA uretir:
 *
 *   [1] SABIT PIKSEL GENISLIK  : style="width: 550px" / CSS width: 900px
 *       Kap, telefon ekranindan genis olunca sayfa yana kayar.
 *
 *   [2] min-width              : esnek kap bile olsa kuculemez.
 *
 *   [3] PIKSEL GENISLIKLI DIALOG: <Dialog :style="{width:'900px'}">
 *       PrimeVue dialogu ekrani tasar; kapatma dugmesi disarida kalir.
 *
 * ESIK: 400px (en dar yaygin telefon 360-414 CSS px).
 *
 * ---------------------------------------------------------------------
 * [!] BILEREK ARANMAYAN: "kaydirilamayan genis tablo"
 * ---------------------------------------------------------------------
 * Ilk surum, cok kolonlu DataTable'larda `scrollable` prop'u yoksa
 * bulgu uretiyordu ve 46 tablo isaretlenmisti. HEPSI YANLIS POZITIFTI.
 *
 * PrimeVue 4 kaynagi okundu:
 *   primevue/datatable/style/index.mjs:146
 *       inlineStyles.tableContainer = { overflow: 'auto' }
 *   primevue/datatable/index.mjs:6336
 *       o div KOSULSUZ render ediliyor -- `scrollable` prop'una bagli
 *       bir v-if YOK.
 *
 * Yani her DataTable zaten yatay kaydirilabilir bir kabin icinde;
 * `scrollable` yalnizca DIKEY kaydirma/sabit baslik icin gerekiyor.
 * Kontrol kaldirildi.
 *
 * ---------------------------------------------------------------------
 * KULLANIM
 * ---------------------------------------------------------------------
 *   node tools/mobile-check.js
 *
 * Cikis kodu: bulgu varsa 1, yoksa 0.
 */

import { readFileSync, readdirSync, statSync } from "node:fs"
import { join, relative, dirname } from "node:path"
import { fileURLToPath } from "node:url"

/* Mutlak yol GOMULMEZ -- bu dosyanin kendi konumundan turetiliyor. */
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..")
const APP = join(ROOT, "app")

/** Telefon genisligi esigi (CSS px). */
const ESIK = 400

function vueFiles(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) vueFiles(full, out)
    else if (name.endsWith(".vue")) out.push(full)
  }
  return out
}

/** Yorumlari cikarir -- yorumdaki ornek kod bulgu sayilmasin. */
function stripComments(source) {
  return source
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
}

/** Bir acilis etiketinin tam metni (ic ice tirnak guvenli). */
function openingTagAt(text, index) {
  let depth = 0
  let quote = null

  for (let i = index; i < text.length; i += 1) {
    const ch = text[i]

    if (quote) {
      if (ch === quote) quote = null
      continue
    }
    if (ch === '"' || ch === "'") {
      quote = ch
      continue
    }
    if (ch === "<") depth += 1
    if (ch === ">") {
      depth -= 1
      if (depth === 0) return text.slice(index, i + 1)
    }
  }
  return text.slice(index)
}

/** Bir bilesenin govdesi (acilis etiketinden kapanisa). */
function elementBody(text, startIndex, tagName) {
  const open = new RegExp(`<${tagName}\\b`, "g")
  const close = new RegExp(`</${tagName}>`, "g")
  open.lastIndex = startIndex + 1
  close.lastIndex = startIndex

  let depth = 1
  let i = startIndex

  while (depth > 0) {
    close.lastIndex = i + 1
    const c = close.exec(text)
    if (!c) return text.slice(startIndex)

    open.lastIndex = i + 1
    let o = open.exec(text)
    while (o && o.index < c.index) {
      depth += 1
      o = open.exec(text)
    }

    depth -= 1
    i = c.index
    if (depth === 0) return text.slice(startIndex, c.index)
  }
  return text.slice(startIndex)
}

const findings = []

function add(file, kind, detail, why) {
  findings.push({ file, kind, detail, why })
}

for (const full of vueFiles(APP)) {
  const raw = readFileSync(full, "utf8")
  const src = stripComments(raw)
  const rel = relative(ROOT, full).replace(/\\/g, "/")

  /* ---------- [1] sabit piksel genislik ---------- */
  for (const m of src.matchAll(/(?<!min-|max-)\bwidth:\s*(\d+(?:\.\d+)?)px/g)) {
    const px = Number(m[1])
    if (px >= ESIK) {
      add(
        rel,
        "SABIT GENISLIK",
        `width: ${px}px`,
        "dar ekranda kap kuculemez -> yatay tasma",
      )
    }
  }

  /*
   * ---------- [2] min-width ----------
   *
   * [!] MEDYA SORGULARI ELENIYOR. `@media (min-width: 900px)` bir
   *     ELEMAN genisligi degil, KIRILMA NOKTASI -- mobil duzenin ta
   *     kendisi. Ilk surumde bunlar da bulgu sayiliyordu; Navbar
   *     (768/992/1200/1400) ve Dashboard (900/1100) yanlis yere
   *     isaretlenmisti, oysa ikisi de dogru yazilmis duyarli kod.
   */
  for (const m of src.matchAll(/(@media[^{]*)?\bmin-width:\s*(\d+(?:\.\d+)?)px/g)) {
    if (m[1]) continue
    const px = Number(m[2])
    if (px >= ESIK) {
      add(
        rel,
        "MIN-WIDTH",
        `min-width: ${px}px`,
        "esnek kap bile olsa bu genisligin altina inemez",
      )
    }
  }

  /*
   * ---------- [4] DUYARSIZ BOOTSTRAP KOLONU ----------
   *
   * `col-4` / `col-6` gibi KIRILMA NOKTASI OLMAYAN siniflar her ekran
   * genisliginde ayni orani korur -- telefonda da 1/3, 1/2 kalirlar.
   * `col-sm-4`, `col-md-6`, `col-lg-3` ise esigin ALTINDA tam
   * genislige dusup alt alta gecer.
   *
   * Olculdu (503px, reports/mekmer/strips.vue): uc tablo `col-4` ile
   * yan yana sikisiyor, her biri ~120px kaliyor ve ayri ayri yatay
   * kaydirma cubugu aciyor -- telefonda kullanilamaz. `col-12 col-lg-4`
   * olmaliydi.
   *
   * `col` (sayisiz) ELENIYOR: o esnek kolon, daralinca birlikte
   * kuculuyor ve tek basina bir kirilma sorunu degil.
   */
  for (const m of src.matchAll(/<div\b[^>]*class="([^"]*)"[^>]*>/g)) {
    const kolon = m[1]
      .split(/\s+/)
      /*
       * 1-11 arasi. `col-12` BILEREK DISARIDA: o zaten tam genislik,
       * yani telefonda da tek basina bir satir kapliyor -- sorun degil.
       * `col`, `col-auto`, `col-sm-*` vb. de duyarli/esnek.
       */
      .find((c) => /^col-(?:[1-9]|1[01])$/.test(c))

    if (!kolon) continue

    /*
     * YALNIZCA ICINDE TABLO/GRAFIK OLANLAR.
     *
     * Duyarsiz `col-N` sayisi projede 177; cogu bir dugme ya da kisa
     * bir etiket tutuyor ve telefonda dar kalmasi KATLANILABILIR.
     * Gercekten kullanilamaz hale gelen, icinde DataTable ya da Chart
     * olanlar: strips.vue'da uc tablo `col-4` ile yan yana sikisip
     * her biri ~120px'e dusuyor ve ayri ayri kaydirma cubugu aciyor.
     *
     * Hepsini birden degistirmek masaustu duzenini 177 yerde riske
     * atardi; olcut bu yuzden daraltildi.
     */
    const govde = elementBody(src, m.index, "div")
    if (!/<DataTable\b|<Chart\b/.test(govde)) continue

    add(
      rel,
      "DUYARSIZ KOLON (tablo/grafik iceriyor)",
      kolon,
      "kirilma noktasi yok -> telefonda tablo/grafik ayni dar orana sikisiyor",
    )
  }

  /*
   * ---------- [3] piksel genislikli Dialog ----------
   *
   * IKI YAZIM BICIMI de taraniyor:
   *   :style="{ width: '900px' }"        -> nesne
   *   contentStyle="width:1200px;..."    -> duz CSS dizgesi
   *
   * Ilk surum yalnizca ilkine bakiyordu ve reports/mekmer/finance.vue
   * icindeki `contentStyle="width:1200px;height:700px"` KACMISTI --
   * [1] numarali kontrol onu yakaladigi icin fark edildi.
   */
  for (const m of src.matchAll(/<Dialog\b/g)) {
    const tag = openingTagAt(src, m.index)
    /*
     * `(?<!max-)(?<!min-)` ZORUNLU: aksi halde `max-width:1200px`
     * icindeki `width:1200px` yakalaniyor ve DOGRU yazilmis
     * `contentStyle="max-width:1200px;width:90vw"` bulgu sayiliyordu.
     */
    const w = tag.match(/(?<!max-)(?<!min-)width:\s*['"]?(\d+(?:\.\d+)?)px/)
    if (w) {
      const px = Number(w[1])
      if (px >= ESIK) {
        add(
          rel,
          "DIALOG PIKSEL GENISLIK",
          `${px}px`,
          "dialog ekrani tasar; vw/% kullanilmali",
        )
      }
    }
  }

}

if (findings.length === 0) {
  console.log("mobile-check: bulgu yok")
  process.exit(0)
}

const byKind = new Map()
for (const f of findings) {
  if (!byKind.has(f.kind)) byKind.set(f.kind, [])
  byKind.get(f.kind).push(f)
}

for (const [kind, list] of byKind) {
  console.log(`\n=== ${kind} (${list.length}) ===`)
  console.log(list[0].why + "\n")

  /* Ayni dosyadaki ayni tur bulgular tek satirda ozetlensin. */
  const byFile = new Map()
  for (const f of list) {
    if (!byFile.has(f.file)) byFile.set(f.file, [])
    byFile.get(f.file).push(f.detail)
  }
  for (const [file, details] of [...byFile].sort((a, b) => b[1].length - a[1].length)) {
    console.log(`  ${file}`)
    console.log(`      ${details.join(", ")}`)
  }
}

console.log(`\ntoplam: ${findings.length}`)
process.exit(1)
