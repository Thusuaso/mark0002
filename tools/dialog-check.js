/*
 * DIALOG GORUNURLUK TARAYICISI
 *
 * Neden var: "bazi sayfalarda dialoglar acilmiyor" sikayeti tek tek
 * tiklayarak aranamayacak kadar genis (63 dosyada 100'den fazla
 * Dialog). Bu arac her <Dialog>'un gorunurluk sozlesmesini okuyup
 * KAPANAMAYACAK olanlari isaretliyor.
 *
 * ---------------------------------------------------------------------
 * ARANAN HATA
 * ---------------------------------------------------------------------
 * PrimeVue Dialog KONTROLLU bir bilesen: ne gosterecegini yalnizca
 * `visible` prop'undan ogrenir, kendi ic durumunu tutmaz. Kullanici
 * X'e bastiginda Dialog yalnizca `update:visible` OLAYINI yayar.
 *
 *   v-model:visible="x"   -> Vue olayi dinler ve x = false yapar  [OK]
 *   :visible="x" + @update:visible="x = $event"                   [OK]
 *   :visible="x"  (dinleyici YOK)                                 [HATA]
 *
 * Son durumda X'e basmak degiskeni false yapmaz. Dialog gorunurde
 * kapanir (PrimeVue DOM'dan kaldirir) ama degisken TRUE kalir; ikinci
 * kez "ac" dendiginde `true -> true` atamasi olur, prop DEGISMEZ ve
 * Dialog BIR DAHA ACILMAZ. Tam olarak sikayet edilen davranis.
 *
 * ---------------------------------------------------------------------
 * KULLANIM
 * ---------------------------------------------------------------------
 *   node tools/dialog-check.js
 *
 * Cikis kodu: bulgu varsa 1, yoksa 0.
 */

import { readFileSync, readdirSync, statSync } from "node:fs"
import { join, relative, dirname } from "node:path"
import { fileURLToPath } from "node:url"

/*
 * Mutlak yol GOMULMEZ -- bu dosyanin KENDI konumundan turetiliyor.
 * (Daha once store-check.js'te sabit bir `C:\Users\...` yolu vardi ve
 *  baska bir makinede/deploy'da calismazdi.)
 */
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..")
const APP = join(ROOT, "app")

function vueFiles(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) vueFiles(full, out)
    else if (name.endsWith(".vue")) out.push(full)
  }
  return out
}

/** Dosyadaki <template> blogu -- yorumlar cikarilmis halde. */
function templateOf(source) {
  const start = source.indexOf("<template>")
  if (start === -1) return ""

  /*
   * Card/Dialog gibi bilesenler IC ICE <template #slot> kullaniyor,
   * yani ILK </template> sablonun sonu degil -- sonuncusu alinmali.
   */
  const end = source.lastIndexOf("</template>")
  if (end === -1) return ""

  return source
    .slice(start, end)
    .replace(/<!--[\s\S]*?-->/g, "") /* yorumlardaki ornek kod sayilmasin */
}

/** Bir acilis etiketinin tam metnini dondurur (ic ice tirnak guvenli). */
function openingTagAt(tpl, index) {
  let depth = 0
  let quote = null

  for (let i = index; i < tpl.length; i += 1) {
    const ch = tpl[i]

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
      if (depth === 0) return tpl.slice(index, i + 1)
    }
  }
  return tpl.slice(index)
}

const findings = []

for (const file of vueFiles(APP)) {
  const tpl = templateOf(readFileSync(file, "utf8"))
  if (!tpl) continue

  const rel = relative(ROOT, file).replace(/\\/g, "/")

  /* Gorunurlugu prop ile yonetilen tum PrimeVue katmanlari. */
  const re = /<(Dialog|Drawer|Sidebar|ConfirmDialog|DynamicDialog|OverlayPanel|Popover)\b/g
  let m

  while ((m = re.exec(tpl)) !== null) {
    const tag = openingTagAt(tpl, m.index)
    const component = m[1]

    /* v-model:visible -> iki yonlu, sorun yok. */
    if (/v-model:visible\s*=/.test(tag)) continue

    const oneWay = tag.match(/(?:^|\s):visible\s*=\s*"([^"]*)"/)
    if (!oneWay) continue /* visible hic verilmemis: ayri bir durum */

    const expr = oneWay[1].trim()
    const hasListener =
      /@update:visible\s*=/.test(tag) || /v-on:update:visible\s*=/.test(tag)

    /*
     * [1] Dinleyici yoksa dialog kapandiktan sonra degisken true kalir
     *     ve bir daha acilmaz.
     */
    if (!hasListener) {
      findings.push({
        file: rel,
        component,
        expr,
        kind: "DINLEYICI YOK",
        why: ":visible tek yonlu ve @update:visible yok -> kapanista degisken false olmuyor, ikinci acilis calismaz",
      })
      continue
    }

    /*
     * [2] :visible icine ATAMA yazilmis. `:visible="x = $event"` bir
     *     PROP baglamasi; $event orada TANIMSIZ, yani her render'da
     *     x = undefined atanir. Buraya @update:visible ifadesi yanlis
     *     yere yapistirilmis demektir.
     */
    if (/[^=!<>]=[^=]/.test(expr) && expr.includes("$event")) {
      findings.push({
        file: rel,
        component,
        expr,
        kind: "PROP ICINDE ATAMA",
        why: ":visible bir PROP; icindeki $event tanimsiz -> her render'da degisken undefined'a dusuyor",
      })
    }
  }
}


/* =====================================================================
 * KONTROL 2 -- DIALOG ACILMADAN ONCE NULL'A ERISIM
 * =====================================================================
 * Gercek sikayetin kaynagi bu: `visible` sozlesmesi dogru olsa bile,
 * dialogu acan metot `x_dialog = true` satirina VARMADAN once null bir
 * alani dereference edip TypeError atarsa dialog hic acilmaz. Hata
 * konsola duser, kullanici yalnizca "tiklıyorum bir sey olmuyor"
 * gorur.
 *
 * Olculen ornek: pages/panel/products/published.vue
 *   panelPublishedListSelected()
 *     satir 136: categoryId: this.selectedCategory.Id   <-- patliyor
 *     satir 141: this.panel_form_dialog = true          <-- buraya hic gelmiyor
 *
 * Kural: data() icinde `null` ile baslatilan bir alan, bir metodun
 * icinde `x_dialog... = true` atamasindan ONCE `?.` KULLANILMADAN
 * dereference ediliyorsa isaretlenir.
 */
function nullFields(source) {
  /* data() { return { ... } } blogundaki `ad: null,` alanlari. */
  const m = source.match(
    /data\s*\(\s*\)\s*\{[\s\S]*?return\s*\{([\s\S]*?)\n\s{4}\}/,
  )
  if (!m) return new Set()

  const out = new Set()
  const re = /(\w+)\s*:\s*null\s*[,}]/g
  let f
  while ((f = re.exec(m[1])) !== null) out.add(f[1])
  return out
}

/** methods: { ... } blogundaki metotlari {ad, govde} olarak dondurur. */
function methodsOf(source) {
  const start = source.search(/\n\s{2}methods\s*:\s*\{/)
  if (start === -1) return []

  /* Blok sonunu suslu parantez sayarak bul (tirnak/yorum kabaca atlanir). */
  const from = source.indexOf("{", source.indexOf("methods", start))
  let depth = 0
  let end = from
  for (let i = from; i < source.length; i += 1) {
    if (source[i] === "{") depth += 1
    if (source[i] === "}") {
      depth -= 1
      if (depth === 0) { end = i; break }
    }
  }
  const block = source.slice(from, end)

  const out = []
  const re = /\n\s{4}(?:async\s+)?(\w+)\s*\([^)]*\)\s*\{/g
  let m
  while ((m = re.exec(block)) !== null) {
    const bodyStart = block.indexOf("{", m.index + m[0].length - 1)
    let d = 0
    let bodyEnd = bodyStart
    for (let i = bodyStart; i < block.length; i += 1) {
      if (block[i] === "{") d += 1
      if (block[i] === "}") {
        d -= 1
        if (d === 0) { bodyEnd = i; break }
      }
    }
    out.push({ name: m[1], body: block.slice(bodyStart, bodyEnd) })
  }
  return out
}

for (const file of vueFiles(APP)) {
  const source = readFileSync(file, "utf8")
  const rel = relative(ROOT, file).replace(/\\/g, "/")
  const nulls = nullFields(source)
  if (nulls.size === 0) continue

  for (const { name, body } of methodsOf(source)) {
    /*
     * Dialogu ACAN satirin konumu.
     *
     * Eslesen atamanin METNI de saklaniyor: `*form*` deseni
     * `order_form_disabled = true` gibi DIALOG OLMAYAN bayraklara da
     * uyuyor ve bu bulgular yanlis pozitif. Raporda atama goruldugu
     * icin ayiklanabiliyorlar.
     */
    const openMatch = body.match(
      /this\.(\w*(?:dialog|Dialog|form|Form|visible|Visible)\w*)\s*=\s*true/,
    )
    if (!openMatch) continue

    /*
     * `form` parcasi DIALOG OLMAYAN bayraklara da uyuyor; olculen
     * yanlis pozitif: OrderForm.vue'da `product_form_disabled = true`
     * (formu kilitleyen bayrak, bir katman acmiyor). Bu adlar eleniyor.
     */
    if (/disabled|enabled|status|loading|readonly|invalid/i.test(openMatch[1])) {
      continue
    }

    const open = openMatch.index
    const flag = openMatch[1]
    const before = body.slice(0, open)

    /*
     * KORUMA TANIMA.
     *
     * Bu statik kural, dereference'in ONUNDE bir koruma varsa
     * susmali -- aksi halde duzeltilmis kod her calistirmada yeniden
     * raporlanir ve arac gurultuye doner.
     *
     * Iki koruma bicimi taniniyor:
     *   [a] erken cikis:  if (...) return   /  if (...) { ... return ... }
     *       orn. `if (!this.requireYear()) return;`
     *   [b] alanin kendisini sart alan blok: `if (this.selectedCategory) {`
     */
    /*
     * `[^)]*` KULLANILAMAZ: sart kendisi parantez icerebiliyor
     * (`if (!this.requireYear()) return;`) ve desen ilk `)` de
     * duruyordu -- koruma taninmiyordu. Tembel `[\s\S]{0,200}?` ic
     * parantezleri de yutuyor.
     */
    const hasEarlyReturn =
      /\bif\s*\([\s\S]{0,200}?\)\s*(?:\{\s*)?return\b/.test(before)

    for (const field of nulls) {
      /* `this.alan.` var ama `this.alan?.` DEGIL. */
      const deref = new RegExp(`this\\.${field}\\s*\\.`)
      const safe = new RegExp(`this\\.${field}\\s*\\?\\.`)

      /* [b] -- alanin dogrulugu sart kosulmus. */
      const guardedByField = new RegExp(
        `\\bif\\s*\\([^)]*this\\.${field}\\b[^)]*\\)\\s*\\{`,
      ).test(before)

      if (hasEarlyReturn || guardedByField) continue

      if (deref.test(before) && !safe.test(before)) {
        findings.push({
          file: rel,
          component: `${name}()`,
          expr: `this.${field}.…   ->   this.${flag} = true`,
          kind: "DIALOG ACILMADAN ONCE NULL ERISIMI",
          why: "data() icinde null baslatilan alan, dialog acilmadan ONCE korumasiz dereference ediliyor -> TypeError metodu kesiyor, dialog hic acilmiyor",
        })
      }
    }
  }
}

if (findings.length === 0) {
  console.log("dialog-check: bulgu yok")
  process.exit(0)
}

const byKind = new Map()
for (const f of findings) {
  if (!byKind.has(f.kind)) byKind.set(f.kind, [])
  byKind.get(f.kind).push(f)
}

for (const [kind, list] of byKind) {
  console.log(`\n=== ${kind} (${list.length}) ===`)
  console.log(list[0].why)
  console.log("")
  for (const f of list) {
    console.log(`  ${f.file}`)
    console.log(`      <${f.component} :visible="${f.expr}">`)
  }
}

console.log(`\ntoplam: ${findings.length}`)
process.exit(1)
