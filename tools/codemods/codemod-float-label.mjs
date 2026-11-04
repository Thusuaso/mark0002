/*
 * Codemod: PrimeVue 2/3 `class="p-float-label"` -> PrimeVue 4 <FloatLabel>
 *
 * NEDEN ZORUNLU -- OLCULDU:
 * PrimeVue 4'te `p-float-label` SINIFI TAMAMEN KALDIRILDI; yerine
 * <FloatLabel> bileşeni geldi. node_modules/primevue ve
 * node_modules/@primevue altinda o sinif adi artik HIC GECMIYOR.
 *
 * Sonuc: `<span class="p-float-label">` stilsiz bir span olarak render
 * ediliyor ve icindeki <label> normal akista kaliyor -- yani input'un
 * uzerine "yuzmek" yerine yanina/ustune dusuyor. Kullanici bunu
 * "bazi autocomplete alanlarinin basliklari kaymis" olarak bildirdi.
 * Hata vermiyor, yalnizca yerlesim bozuluyor; bu yuzden derleme ve
 * render testleri yakalamiyor.
 *
 * Donusum:
 *   <span class="p-float-label">        ->  <FloatLabel>
 *   <span class="p-float-label mb-4">   ->  <FloatLabel class="mb-4">
 *   <div  class="p-float-label w-100">  ->  <FloatLabel class="w-100">
 * Kapanis etiketi de eslestirilir.
 *
 * Icerik SIRASI onemli ve degismiyor: once input, sonra <label>.
 * PrimeVue 4 FloatLabel de ayni sirayi bekliyor.
 *
 * Kullanim:
 *   node codemod-float-label.mjs                 (kuru calisma)
 *   node codemod-float-label.mjs --write
 *   node codemod-float-label.mjs --write <dosya>  (tek dosya)
 */
import fs from "node:fs"
import path from "node:path"

const ROOT = path.resolve(import.meta.dirname, "../..")
const DIRS = ["app/components", "app/pages", "app/layouts"]
const WRITE = process.argv.includes("--write")
const only = process.argv.slice(2).filter((a) => !a.startsWith("--"))

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, out)
    else if (e.name.endsWith(".vue")) out.push(p)
  }
  return out
}

const files = only.length
  ? only.map((f) => path.resolve(ROOT, f))
  : DIRS.flatMap((d) => walk(path.join(ROOT, d)))

/*
 * Acilis etiketinden eslesen KAPANIS etiketini bul (ic ice ayni etiketleri
 * sayarak). Duz arama-degistirme yapilamaz: </span> ve </div> dosyada
 * yuzlerce kez geciyor.
 */
function findMatchingClose(text, openEnd, tag) {
  const openRe = new RegExp(`<${tag}\\b`, "g")
  const closeRe = new RegExp(`</${tag}\\s*>`, "g")
  let depth = 1
  let i = openEnd
  while (i < text.length) {
    openRe.lastIndex = i
    closeRe.lastIndex = i
    const o = openRe.exec(text)
    const c = closeRe.exec(text)
    if (!c) return -1
    if (o && o.index < c.index) {
      depth++
      i = o.index + o[0].length
    } else {
      depth--
      if (depth === 0) return { start: c.index, end: c.index + c[0].length }
      i = c.index + c[0].length
    }
  }
  return -1
}

let totalFiles = 0
let totalConv = 0
const skipped = []

for (const file of files) {
  const original = fs.readFileSync(file, "utf8")
  const rel = path.relative(ROOT, file).replace(/\\/g, "/")
  if (!original.includes("p-float-label")) continue

  /*
   * YALNIZCA <template> bolumu uzerinde calis.
   *
   * Pilottaki dosyalarin sonunda, yapilan degisiklikleri anlatan bir HTML
   * yorum blogu var ve orada "p-float-label" METIN OLARAK geciyor
   * (orn. "[3] <span class=\"p-float-label\"> -> <FloatLabel>").
   * Ilk surum bu yorumlari da donusturmeye calisiyordu: kapanis </span>
   * bulamiyor, "atlandi" diyor ve ayni yere tekrar donuyordu (guard'a
   * kadar 500 kez). supplier/Form.vue ve todoByUsername/Form.vue
   * ZATEN dogru bicimdeydi; tek sorun yorum metniydi.
   */
  const tplStart = original.indexOf("<template>")
  const tplEnd = original.lastIndexOf("</template>")
  if (tplStart === -1 || tplEnd === -1) continue

  const head = original.slice(0, tplStart)
  let text = original.slice(tplStart, tplEnd)
  const tail = original.slice(tplEnd)

  let conv = 0
  let guard = 0

  for (;;) {
    if (++guard > 500) {
      skipped.push(`${rel}: 500 donusumden fazla, durduruldu`)
      break
    }

    const m = /<(span|div)([^>]*)\sclass="([^"]*\bp-float-label\b[^"]*)"([^>]*)>/.exec(text)
    if (!m) break

    const [whole, tag, pre, cls, post] = m
    const openEnd = m.index + whole.length

    const close = findMatchingClose(text, openEnd, tag)
    if (close === -1) {
      skipped.push(`${rel}: </${tag}> eslesmesi bulunamadi, atlandi`)
      /*
       * Sonsuz donguyu onlemek icin sinif adini gecici olarak isaretle.
       * Isaretci "p-float-label" ICERMEMELI: ilk denemede
       * "p-float-label-ATLANDI" kullanildi ve `\bp-float-label\b`
       * kalibi ona DA eslesti (l ile - arasi kelime siniri), yani dongu
       * kirilmadi.
       */
      text =
        text.slice(0, m.index) +
        whole.replace("p-float-label", "ZZATLANDIZZ") +
        text.slice(openEnd)
      continue
    }

    const rest = cls.replace(/\bp-float-label\b/, "").trim().replace(/\s+/g, " ")
    const attrs = `${pre}${post}`.trim()
    const openTag = `<FloatLabel${rest ? ` class="${rest}"` : ""}${attrs ? ` ${attrs}` : ""}>`

    text =
      text.slice(0, m.index) +
      openTag +
      text.slice(openEnd, close.start) +
      "</FloatLabel>" +
      text.slice(close.end)

    conv++
  }

  // atlanmis isaretleri geri al
  text = text.replace(/ZZATLANDIZZ/g, "p-float-label")

  if (!conv) continue
  totalFiles++
  totalConv += conv
  console.log(`  ${String(conv).padStart(3)}x  ${rel}`)

  if (WRITE) fs.writeFileSync(file, head + text + tail, "utf8")
}

console.log(`\n${totalConv} donusum, ${totalFiles} dosya`)
if (skipped.length) {
  console.log("\n!! ATLANANLAR:")
  skipped.forEach((s) => console.log(`   ${s}`))
}
if (!WRITE) console.log("\n(kuru calisma -- uygulamak icin --write)")
