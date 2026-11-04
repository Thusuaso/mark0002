/*
 * Pinia store'lari icin denetci: `this.X` ile cagrilan her uyenin o
 * store'da GERCEKTEN tanimli oldugunu dogrular.
 *
 * NEDEN: Vuex modulleri namespaced DEGILDI, bu yuzden
 * `vuexContext.dispatch("setBeginLoadingAction")` cagrisi baska bir
 * modulun action'ina gidiyordu. Codemod bunu kor bicimde `this.X` yapinca
 * ortaya cikan hata DERLEME ZAMANINDA GORUNMEZ: yalnizca o kod yolu
 * calistirildiginda "TypeError: this.X is not a function" verir -- yani
 * kullanici "Kaydet"e bastiginda, testte degil.
 *
 * Kullanim:
 *   node tools/codemods/verify-stores.mjs
 *   node tools/codemods/verify-stores.mjs order models
 *
 * Cikis kodu 1 = en az bir cozulemeyen referans var.
 *
 * ---------------------------------------------------------------------
 * DUZELTME -- SATIR YORUMU SIYIRMA CRLF'TE CALISMIYORDU
 * ---------------------------------------------------------------------
 * Bu dosyada (ve 6 denetci/codemod'da daha, toplam 12 yerde) yorum
 * siyirma soyle yaziliydi:
 *
 *     raw.replace(/\/\/.*$/, "")
 *
 * JavaScript'te `.` SATIR SONU KARAKTERLERINI ESLEMEZ -- `\n` kadar
 * `\r` de dahil. Dosyalar CRLF oldugu icin (app/stores/*.ts'in HEPSI
 * CRLF) her satir `\r` ile bitiyor; `.*` o `\r`den once duruyor, `$`
 * (m bayragi yok) ise dizgi sonu istiyor, dolayisiyla KALIP HIC
 * ESLESMIYOR ve yorum satirlari OLDUGU GIBI sayiliyordu.
 *
 * Somut sonucu: app/stores/finance.ts'te yorum ICINE alinmis bir kod
 * blogu var (`// .then(response => {` ... `// });`) ve kume/parantez
 * dengesi tutmuyor. Siyirma calismadigi icin bu satirlar `depth`
 * sayacini +2 kaydirdi; o noktadan sonraki butun action tanimlari
 * `start === sectionDepth` kosulunu saglamadi ve UYE OLARAK
 * TOPLANMADILAR. Denetci 44 "cozulemeyen referans" raporladi; 44'u de
 * YANLIS POZITIFTI ve aradaki TEK gercek bulgu (6 yerde `this.$excelApi`)
 * o gurultunun altinda kaliyordu.
 *
 * Ters yonu daha tehlikeli: ayni kayma, gercek bir hatanin uye sanilip
 * SESSIZCE gecmesine de yol acabilir.
 *
 * Kalip `[^\n]*` oldu -- `\r` dahil satir sonuna kadar siyiriyor.
 * (check-list-fetches.mjs'teki surum `/gm` bayrakli; `m` ile `$`, `\r`
 * oncesinde de eslestigi icin ORASI DOGRUYDU, degistirilmedi.)
 */
import fs from "node:fs"
import path from "node:path"

const STORE_DIR = path.resolve(import.meta.dirname, "../../app/stores")

// Pinia'nin kendi ornek uyeleri + Vue bilesen ornegi uyeleri.
const BUILTIN = new Set([
  "$id",
  "$state",
  "$patch",
  "$reset",
  "$subscribe",
  "$onAction",
  "$dispose",
])

/*
 * Blok yorumlarini satir satir ayiklar.
 *
 * NEDEN GEREKLI -- SATIR YORUMU SIYIRMAK YETMIYOR:
 * memberNames ve collectRefs `{` ve `(` sayarak derinlik tutuyor. Bir
 * BLOK yorumunun icinde ornek kod varsa (bu projede siklikla var:
 * "Nuxt 2'de soyle yaziliyordu:" bloklari) o parantezler de sayiliyor.
 * Ornek genellikle bir KESIT oldugu icin dengeli olmak zorunda da
 * degil; ornegin su uc satir net -1 sus parantez verir:
 *
 *     } else {
 *       toast.success('...');
 *     }
 *
 * O noktadan sonra derinlik kayar, sonraki action tanimlari
 * `start === sectionDepth` kosulunu saglamaz ve UYE OLARAK TOPLANMAZLAR
 * -- denetci onlara yapilan this.X referanslarini "cozulemeyen" diye
 * raporlar. Hepsi YANLIS POZITIF.
 *
 * Bu app/stores/transport.ts tasinirken gercekten yasandi: uc action
 * toplanmadi ve iki referans hatali raporlandi.
 *
 * Ters yonu daha tehlikeli: ayni kayma, gercek bir hatanin uye sanilip
 * SESSIZCE gecmesine de yol acar.
 *
 * Blok yorumu, satir yorumundan ONCE cikarilmali: blok yorumunun icinde
 * "//" gecen satirlar olabiliyor.
 */
function stripBlockComments(lines) {
  let inBlock = false

  return lines.map((raw) => {
    let out = ""
    let i = 0

    while (i < raw.length) {
      if (inBlock) {
        const end = raw.indexOf("*/", i)
        if (end === -1) return out
        inBlock = false
        i = end + 2
        continue
      }

      const open = raw.indexOf("/*", i)
      if (open === -1) {
        out += raw.slice(i)
        break
      }

      out += raw.slice(i, open)
      inBlock = true
      i = open + 2
    }

    return out
  })
}

function memberNames(text) {
  const names = new Set()
  const lines = stripBlockComments(text.split("\n"))
  let depth = 0
  let section = null
  let sectionDepth = 0

  for (const raw of lines) {
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

/*
 * Setup store'lari (defineStore("x", () => {...})) icin `this` zaten
 * kullanilmaz; bu denetci yalnizca options store'lari hedefler.
 */
function isOptionsStore(text) {
  return /defineStore\(\s*["'][^"']+["']\s*,\s*\{/.test(text)
}

const targets = process.argv.slice(2)
const files = fs
  .readdirSync(STORE_DIR)
  .filter((f) => f.endsWith(".ts"))
  .filter((f) => !targets.length || targets.includes(path.basename(f, ".ts")))

let failed = 0

for (const f of files) {
  const text = fs.readFileSync(path.join(STORE_DIR, f), "utf8")
  if (!isOptionsStore(text)) {
    console.log(`- ${f}: setup store, atlandi`)
    continue
  }

  const defined = memberNames(text)
  const problems = new Map()

  text.split("\n").forEach((raw, i) => {
    const l = raw.replace(/\/\/[^\n]*$/, "")
    if (/^\s*\*/.test(raw)) return // blok yorumu
    const re = /\bthis\.([A-Za-z_$][\w$]*)/g
    let m
    while ((m = re.exec(l))) {
      const name = m[1]
      if (defined.has(name) || BUILTIN.has(name)) continue
      if (!problems.has(name)) problems.set(name, [])
      problems.get(name).push(i + 1)
    }
  })

  // TODO isaretleri de hata sayilir
  const todos = []
  text.split("\n").forEach((l, i) => {
    if (l.includes("TODO_CAPRAZ_MODUL")) todos.push(i + 1)
  })

  /*
   * IKINCI KONTROL: cagrilan ama TANIMLANMAYAN modul duzeyi yardimcilar.
   *
   * NEDEN EKLENDI -- kacirdigi gercek bir hata yuzunden:
   * store/modules/order.js'in ilk 7 satirinda `__noneNullControl` adli
   * bir yardimci vardi ve mutation govdelerinde 5 yerde cagriliyordu.
   * vuex-to-pinia codemod'u yalnizca state/actions/mutations/getters
   * bloklarini ayristirip dosyanin basindaki kodu DUSURUYORDU. Uretilen
   * order.ts cagrilari tasidi, tanimi tasimadi. Derleme GECTI; hata
   * ancak siparis toplami hesaplanirken tarayicida cikti:
   *     Uncaught (in promise) ReferenceError: __noneNullControl is not defined
   * Bu denetci o zaman yalnizca `this.X` referanslarina bakiyordu, yani
   * sorunu gormedi.
   *
   * Kapsam bilerek DAR: yalnizca projenin `__` onekli yardimci
   * adlandirma kurali. Daha genisi (tum serbest degiskenler) Nuxt'un
   * auto-import'u yuzunden yanlis pozitif uretirdi -- useApi, useCookie,
   * navigateTo vb. hicbir yerde import edilmiyor ama tanimli.
   */
  const helperCalls = new Map()
  text.split("\n").forEach((raw, i) => {
    if (/^\s*\*/.test(raw)) return
    const l = raw.replace(/\/\/[^\n]*$/, "")
    for (const m of l.matchAll(/(^|[^\w$.])(__[A-Za-z_$][\w$]*)\s*\(/g)) {
      const name = m[2]
      // tanim satirinin kendisi degil
      if (new RegExp(`(function|const|let|var)\\s+${name}\\b`).test(l)) continue
      if (!helperCalls.has(name)) helperCalls.set(name, [])
      helperCalls.get(name).push(i + 1)
    }
  })

  const missingHelpers = new Map()
  for (const [name, lines] of helperCalls) {
    const declared = new RegExp(`(?:function|const|let|var)\\s+${name}\\b`).test(text)
    if (!declared) missingHelpers.set(name, lines)
  }

  /*
   * UCUNCU KONTROL: ayni blokta YINELENEN anahtar.
   *
   * NEDEN: Nuxt 2'nin store/modules/models.js'inde 5 yinelenen anahtar
   * vardi (offerCustomerModel state'i, getOfferCustomerModel getter'i,
   * setOfferCustomerModel ve MUT_setOfferCustomerModel action'lari).
   * JS nesne literalinde SONRAKI tanim kazanir, yani oncekiler olu kod --
   * ve bunlarin BIRI govdesi FARKLI olandi, yani "hangisi gecerli" sorusu
   * gercek bir davranis sorusuydu. Ne derleme ne calisma hatasi verir.
   *
   * Pilotta temizlendi; bu kontrol codemod yeniden uretirse geri
   * geldiklerini yakalamak icin.
   */
  const dupKeys = new Map()
  {
    let depth = 0
    const scopes = new Map()
    text.split("\n").forEach((raw, i) => {
      if (/^\s*\*/.test(raw)) return
      const l = raw.replace(/\/\/[^\n]*$/, "")
      const start = depth
      /*
       * Anahtar iki bicimde olur:
       *   ad: deger            -> `:` bicimi
       *   ad(param) {          -> metot kisayolu
       *
       * Ikinci bicim icin SATIRIN `{` ile bitmesi sart, yoksa `if (x)` ve
       * `parseFloat(y)` gibi ifadeler anahtar saniliyor. Ilk surum tam
       * bunu yapti: order.ts'te `if` ve `parseFloat`i, socket.ts'te
       * `if`i yinelenen anahtar olarak raporladi -- 3 bulgunun 3'u de
       * yanlis pozitifti. Sart yetmiyor cunku `if (x) {` de ayni sekle
       * uyuyor; bu yuzden anahtar sozcukler ayrica diskaliye ediliyor.
       */
      const KEYWORDS = new Set([
        "if", "else", "for", "while", "do", "switch", "case", "catch", "try",
        "finally", "return", "function", "typeof", "instanceof", "new",
        "delete", "void", "await", "throw", "yield", "with", "in", "of",
      ])

      const colonForm = l.match(/^\s*([A-Za-z_$][\w$]*)\s*:/)
      const methodForm = l.match(/^\s*(?:async\s+)?([A-Za-z_$][\w$]*)\s*\([^)]*\)\s*\{\s*$/)
      const m = colonForm ?? methodForm

      if (m && !KEYWORDS.has(m[1])) {
        if (!scopes.has(start)) scopes.set(start, new Map())
        const sc = scopes.get(start)
        if (sc.has(m[1])) {
          const key = `${m[1]} (depth ${start})`
          if (!dupKeys.has(key)) dupKeys.set(key, [sc.get(m[1])])
          dupKeys.get(key).push(i + 1)
        } else {
          sc.set(m[1], i + 1)
        }
      }
      for (const ch of l) {
        if (ch === "{" || ch === "(") depth++
        else if (ch === "}" || ch === ")") {
          depth--
          scopes.delete(depth + 1)
        }
      }
    })
  }

  if (!problems.size && !todos.length && !missingHelpers.size && !dupKeys.size) {
    console.log(`+ ${f}: ${defined.size} uye, tum this.X referanslari cozuldu`)
    continue
  }

  failed++
  console.log(`\nX ${f}:`)
  if (problems.size) {
    console.log(`  ${problems.size} cozulemeyen this.X referansi:`)
    for (const [name, lines] of problems) {
      console.log(`    this.${name}  (satir ${lines.join(", ")})`)
    }
  }
  if (missingHelpers.size) {
    console.log(`  ${missingHelpers.size} TANIMSIZ modul duzeyi yardimci:`)
    for (const [name, lines] of missingHelpers) {
      console.log(`    ${name}()  (satir ${lines.join(", ")})  -- kaynak modulun basindan tasinmamis`)
    }
  }
  if (dupKeys.size) {
    console.log(`  ${dupKeys.size} YINELENEN anahtar (sonraki tanim kazanir, oncekiler olu):`)
    for (const [name, lines] of dupKeys) {
      console.log(`    ${name}  satir ${lines.join(", ")}`)
    }
  }
  if (todos.length) console.log(`  TODO_CAPRAZ_MODUL isareti: satir ${todos.join(", ")}`)
}

if (failed) {
  console.log(`\n${failed} dosyada sorun var.`)
  process.exit(1)
}
console.log("\nTum store'lar temiz.")
