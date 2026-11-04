/*
 * Vue 2'de calisan, Vue 3'te KIRILAN prop atamalarini bulur.
 *
 * NEDEN: Vue 2 `this.someProp = x` atamasini yalnizca uyariyla geciyor ve
 * atama fiilen calisiyordu (bir sonraki ebeveyn render'ina kadar). Vue
 * 3'te props shallowReadonly oldugu icin ayni atama BASARISIZ olur.
 * Sonuc derleme hatasi degil: form dolmuyor, secim islemiyor, alan
 * guncellenmiyor -- ve konsoldaki uyari kolayca gozden kaciyor.
 *
 * Bu projede desen gercek: components/orders/forms/workerman.vue
 * `this.model = event.data` yaziyordu ve `model` prop'u DOGRUDAN store
 * state'iydi; birebir tasinsa tablo satiri secimi formu doldurmazdi.
 *
 * Ic ozellik atamalari (this.model.Tutar = 0) AYRI raporlanir: Vue 3'te
 * hata vermez (nesne icerigi readonly degil) ama prop'un sahibinin
 * state'ini uzaktan degistirdigi icin yine incelenmeli.
 *
 * Kullanim (Nuxt 2 kaynagina gore yol):
 *   node tools/codemods/find-prop-mutations.mjs components/orders/forms/detail.vue
 *   node tools/codemods/find-prop-mutations.mjs --all
 */
import fs from "node:fs"
import path from "node:path"

const SRC_ROOT = "C:/Users/mekma/Desktop/mark0002"
const DIRS = ["pages", "components", "layouts"]

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, out)
    else if (e.name.endsWith(".vue")) out.push(path.relative(SRC_ROOT, p).replace(/\\/g, "/"))
  }
  return out
}

/* Satir sayisi -- kacis dizisi gommeden. */
const NEWLINE = String.fromCharCode(10)
function countLines(s) {
  return s.split(NEWLINE).length
}

/* props: { a: {...}, b: {...} }  veya  props: ["a", "b"] */
function propNames(text) {
  const names = new Set()

  const objMatch = /\bprops\s*:\s*\{/.exec(text)
  if (objMatch) {
    let d = 0
    const start = objMatch.index + objMatch[0].length - 1
    const lines = text.slice(start).split("\n")
    for (const raw of lines) {
      const l = raw.replace(/\/\/[^\n]*$/, "")
      if (d === 1) {
        const k = l.match(/^\s*([A-Za-z_$][\w$]*)\s*:/)
        if (k) names.add(k[1])
      }
      for (const ch of l) {
        if (ch === "{" || ch === "(") d++
        else if (ch === "}" || ch === ")") d--
      }
      if (d <= 0) break
    }
  }

  const arrMatch = /\bprops\s*:\s*\[([^\]]*)\]/.exec(text)
  if (arrMatch) for (const m of arrMatch[1].matchAll(/["']([\w$]+)["']/g)) names.add(m[1])

  return names
}

function walkFrom(dir, kok, out = []) {
  if (!fs.existsSync(dir)) return out
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walkFrom(p, kok, out)
    else if (e.name.endsWith(".vue")) out.push(path.relative(kok, p).split(path.sep).join("/"))
  }
  return out
}

const COMMENT_OPEN = '/' + '*'
const COMMENT_CLOSE = '*' + '/'
/*
 * HTML yorumu da atlanir: pilotun TASIMA NOTLARI dosya sonunda
 * <!-- ... --> blogunda duruyor ve icinde ornek kod geciyor
 * (orn. "[x] `this.model = {}` PROP'A ATAMAYDI"). O satirlar yildizla
 * baslamadigi icin bulgu sanilip raporlaniyordu.
 */
const HTML_OPEN = '<' + '!--'
const HTML_CLOSE = '--' + '>'

const args = process.argv.slice(2)

/*
 * --pilot: Nuxt 2 kaynagi yerine PILOTUN KENDISINI tarar.
 *
 * NEDEN GEREKLI: bu hatayi codemod'un KENDISI uretebiliyor.
 * vue2-to-vue3.mjs `:x.sync="prop"` bagllamasini mekanik olarak
 * `v-model:x="prop"` yapiyor; kaynakta DERLEME DUSER bulgusu olmasa
 * bile pilot ciktisinda oluyor. Olculen iki ornek:
 *
 *   panel/project/List.vue   :value.sync="list" -> v-model:value="list"
 *       (PrimeVue DataTable `update:value` yaymadigi icin kaynaktaki
 *        .sync zaten OLU bir baglamaydi)
 *   panel/ProductForm.vue    iki PickList
 *
 * Yani tasimadan once kaynagi, tasidiktan sonra pilotu taramak gerekiyor.
 */
const PILOT = args.includes("--pilot")
const KOK = PILOT ? path.resolve(import.meta.dirname, "../..") : SRC_ROOT
const TARA = PILOT ? ["app"] : DIRS

const files = (args.includes("--all") || PILOT)
  ? TARA.flatMap((d) => walkFrom(path.join(KOK, d), KOK))
  : args

let hardCount = 0
let softCount = 0
let filesWithHard = 0

for (const rel of files) {
  const abs = path.join(KOK, rel)
  if (!fs.existsSync(abs)) {
    console.log(`!! yok: ${rel}`)
    continue
  }
  const text = fs.readFileSync(abs, "utf8")
  const props = propNames(text)
  if (!props.size) continue

  const hard = [] // this.prop = ...      -> Vue 3'te KIRILIR
  const soft = [] // this.prop.x = ...    -> calisir ama sahibinin state'ini degistirir
  const model = [] // <X v-model="prop">  -> Vue 3'te DERLEME HATASI
  let blokYorumda = false

  /*
   * SABLONDA PROP UZERINDE v-model -- DERLEMEYI DURDURUR
   * ---------------------------------------------------------------
   * `<PickList v-model="photoList">` gibi, ifadenin TAMAMI bir prop ise
   * Vue 3 derleyicisi su hatayi verir ve derleme DUSER:
   *
   *     v-model cannot be used on a prop, because local prop bindings
   *     are not writable
   *
   * Vue 2'de bu sessizce yurudu (yalnizca "Avoid mutating a prop
   * directly" uyarisi). Bu denetim BU ARACA SONRADAN EKLENDI: panel
   * form'u tasinirken arac "KIRILIR: 0" dedi ama derleme iki yerde
   * patladi -- cunku yukaridaki tarama yalnizca SCRIPT icindeki
   * atamalara bakiyor, sablona bakmiyordu.
   *
   * `v-model="prop.alan"` KAPSAM DISI: uye ifadesine atama Vue 3'te
   * gecerli (prop nesnesinin ici yazilabilir), derleme hatasi vermez.
   *
   * Sablon siniri SON `</template>` ile bulunuyor: slot'lar
   * (`<template #item>`) ic ice kapanis etiketi uretiyor, ilkini almak
   * sablonu erken kesip bulgulari kacirir.
   */
  const sonKapanis = text.lastIndexOf("</template>")
  if (sonKapanis > -1) {
    const tpl = text.slice(0, sonKapanis)

    /*
     * SABLONDA OLAY ISLEYICISINDE PROP'A ATAMA -- CALISMA ANINDA KIRILIR
     * ---------------------------------------------------------------
     * `@onInput="usd = $event"` gibi. Bunlar v-model DEGIL, duz
     * ifadeler; Vue 3 derleyicisi bunlara karismaz, yani DERLEME GECER.
     * Hata ancak olay tetiklenince cikar:
     *
     *     TypeError: proxy set handler returned false for property "usd"
     *
     * Kullanici bu hatayi IKI KEZ bildirdi: AyoFormCurrency.vue
     * (commit eaafb9e18) ve ardindan AyoCreditCardForm.vue. Ilk
     * taramada "baska prop yazmasi yok" denmisti, cunku yalnizca
     * SCRIPT atamalarina bakilmisti -- sablondaki bu bicim gorulmedi.
     */
    for (const m of tpl.matchAll(/@[\w.:-]+="\s*([A-Za-z_$][\w$]*)\s*=[^=][^"]*"/g)) {
      if (props.has(m[1])) {
        model.push({
          line: countLines(tpl.slice(0, m.index)),
          prop: m[1],
          sablonAtama: true,
        })
      }
    }
    for (const m of tpl.matchAll(/v-model(?::[\w.]+)?="\s*([^"]+?)\s*"/g)) {
      const expr = m[1].trim()
      if (props.has(expr)) {
        model.push({
          line: countLines(tpl.slice(0, m.index)),
          prop: expr,
        })
      }
    }
  }

  text.split("\n").forEach((raw, i) => {
    const l = raw.replace(/\/\/[^\n]*$/, "")
    /*
     * BLOK YORUM TAKIBI -- YANLIS POZITIFLERI KALDIRIR.
     *
     * Onceden yalnizca yildizla BASLAYAN satirlar atlaniyordu. Ama bu
     * projedeki yorumlar gecmis duzeltmeleri anlatiyor ve icinde ORNEK
     * KOD geciyor; ornegin:
     *
     *     [x] `this.model = {}` (reset icinde) PROP'A ATAMAYDI...
     *
     * Bu satirlar yildizla baslamadigi icin BULGU olarak raporlaniyordu
     * -- uc dosyada uc yanlis pozitif. Arac yanlis alarm verdiginde
     * gercek bulgular da guven kaybediyor; blok yorum icindeki satirlar
     * artik tamamen atlaniyor.
     */
    const acilis = raw.lastIndexOf(COMMENT_OPEN)
    const kapanis = raw.lastIndexOf(COMMENT_CLOSE)
    const hAcilis = raw.lastIndexOf(HTML_OPEN)
    const hKapanis = raw.lastIndexOf(HTML_CLOSE)
    const satirYorumda = blokYorumda
    if (acilis > -1 && acilis > kapanis) blokYorumda = true
    else if (kapanis > -1 && kapanis > acilis) blokYorumda = false
    if (hAcilis > -1 && hAcilis > hKapanis) blokYorumda = true
    else if (hKapanis > -1 && hKapanis > hAcilis) blokYorumda = false

    if (satirYorumda) return
    if (/^\s*\*/.test(raw)) return

    for (const p of props) {
      // this.p = ... (karsilastirma ==/=== ve +=/-= haric tutulmuyor: onlar da atama)
      const hardRe = new RegExp(`\\bthis\\.${p}\\s*(=[^=]|\\+=|-=|\\*=|/=)`)
      if (hardRe.test(l)) hard.push({ line: i + 1, prop: p, code: raw.trim() })

      const softRe = new RegExp(`\\bthis\\.${p}(\\.[A-Za-z_$][\\w$]*|\\[[^\\]]+\\])+\\s*(=[^=]|\\+=|-=|\\*=|/=)`)
      if (softRe.test(l)) soft.push({ line: i + 1, prop: p, code: raw.trim() })
    }
  })

  if (!hard.length && !soft.length && !model.length) continue

  console.log(`\n### ${rel}   (props: ${[...props].join(", ")})`)
  if (model.length) {
    filesWithHard++
    const vm = model.filter((m) => !m.sablonAtama)
    const sa = model.filter((m) => m.sablonAtama)
    if (vm.length) {
      console.log(`  DERLEME DUSER -- sablonda prop uzerinde v-model (${vm.length}):`)
      for (const m of vm) {
        console.log(`      ${String(m.line).padStart(5)}: v-model="${m.prop}"`)
      }
    }
    if (sa.length) {
      console.log(`  CALISMA ANINDA KIRILIR -- sablonda olay isleyicisinde prop'a atama (${sa.length}):`)
      for (const m of sa) {
        console.log(`      ${String(m.line).padStart(5)}: @...="${m.prop} = ..."`)
      }
    }
  }
  if (hard.length) {
    filesWithHard++
    console.log(`  KIRILIR -- prop'un kendisine atama (${hard.length}):`)
    for (const h of hard) console.log(`      ${String(h.line).padStart(5)}: ${h.code}`)
  }
  if (soft.length) {
    console.log(`  INCELE -- prop'un ic alanina atama (${soft.length}):`)
    for (const s of soft.slice(0, 12)) console.log(`      ${String(s.line).padStart(5)}: ${s.code}`)
    if (soft.length > 12) console.log(`      ... +${soft.length - 12} daha`)
  }
  hardCount += hard.length
  softCount += soft.length
}

console.log(`\n==== TOPLAM ====`)
console.log(`  KIRILIR : ${hardCount} atama, ${filesWithHard} dosya`)
console.log(`  INCELE  : ${softCount} atama`)
if (hardCount) process.exit(1)
