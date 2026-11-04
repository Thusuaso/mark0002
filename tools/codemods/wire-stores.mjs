/*
 * Tasinan bir .vue dosyasini Pinia store'larina BAGLAR.
 *
 * vue2-to-vue3.mjs mekanik donusumleri yapiyor ama store baglamalarina
 * BILEREK dokunmuyor ("ELLE YAPILACAK" listesi). Bu arac o listedeki
 * tekrarlayan maddeleri otomatiklestiriyor:
 *
 *   mapGetters([...])            -> store computed'leri + referans yazimi
 *   this.$store.dispatch("X", a) -> this.<store>.X(a)
 *   this.$store.commit("X", a)   -> this.<store>.MUT_X(a)
 *   this.$axios / $toast / $excelApi -> composable'lar
 *   js-cookie Cookies.get("x")   -> useCookie("x").value
 *   plugins/date date.dateToString / .stringToDate -> toIsoDate / fromIsoDate
 *   elle <a download> blogu      -> downloadFromExcelServer()
 *   created()                    -> mounted()
 *   noktali watch anahtarlari    -> tirnak icine
 *
 * HANGI STORE: elle liste YOK. Her ad app/stores/*.ts icinde aranir;
 * bulunamazsa veya BIRDEN FAZLA store'da varsa arac DURUR ve adi
 * bildirir -- yanlis store'a baglamak sessiz bir hata olurdu.
 *
 * NEDEN ONEMLI: Vuex modulleri namespaced DEGILDI, yani bir sayfa
 * getter'larini tek isim uzayindan okuyordu. Pilotta ayni adlar UC-DORT
 * ayri store'a dagiliyor ve bazilarinin ADI DEGISTI (Vuex getLoading ->
 * shared store isLoading; Vuex boolean, pilotta `loading > 0` sayaci).
 *
 * Kullanim:
 *   node tools/codemods/wire-stores.mjs <dosya.vue> [...]   (kuru calisma)
 *   node tools/codemods/wire-stores.mjs <dosya.vue> --write
 */
import fs from "node:fs"
import path from "node:path"

const ROOT = path.resolve(import.meta.dirname, "../..")
const STORE_DIR = path.join(ROOT, "app/stores")
const CR = "\r\n"

/* ---------- store uye dizini ---------- */

const MEMBERS = new Map() // uye adi -> [store adi, ...]

for (const f of fs.readdirSync(STORE_DIR).filter((x) => x.endsWith(".ts"))) {
  const store = f.replace(/\.ts$/, "")
  const text = fs.readFileSync(path.join(STORE_DIR, f), "utf8")
  for (const line of text.split("\n")) {
    const m = line.match(/^ {4}(?:async\s+)?([A-Za-z_$][\w$]*)\s*[:(]/)
    if (!m) continue
    const name = m[1]
    if (!MEMBERS.has(name)) MEMBERS.set(name, [])
    if (!MEMBERS.get(name).includes(store)) MEMBERS.get(name).push(store)
  }
}

const VAR_OF = (store) => store.replace(/[^a-z]/gi, "") + "Store"
const FACTORY = (store) =>
  "use" + store[0].toUpperCase() + store.slice(1).replace(/_(\w)/g, (m, c) => c.toUpperCase()) + "Store"

/*
 * Vuex -> pilot ad degisiklikleri. Vuex'teki loading modulu shared
 * store'a tasinirken BOOLEAN getter SAYAC'a dondu ve adi degisti.
 */
const RENAMED = {
  getLoading: ["shared", "isLoading"],
  getLoadingDatatable: ["shared", "isLoadingDatatable"],
  setBeginLoadingAction: ["shared", "beginLoading"],
  setEndLoadingAction: ["shared", "endLoading"],
  setBeginLoadingDatatableAction: ["shared", "beginLoadingDatatable"],
  setEndLoadingDatatableAction: ["shared", "endLoadingDatatable"],
}

/* getLocalUrl: yalnizca elle <a download> bloklarinda kullaniliyordu ve
   downloadFromExcelServer adresi kendisi urettigi icin DUSURULUYOR. */
const DROPPED = new Set(["getLocalUrl"])

function resolve(name, kind) {
  if (RENAMED[name]) return RENAMED[name]

  const candidates = MEMBERS.get(name)
  if (!candidates || !candidates.length) {
    throw new Error(`${kind} "${name}" hicbir store'da bulunamadi`)
  }
  if (candidates.length > 1) {
    throw new Error(
      `${kind} "${name}" BIRDEN FAZLA store'da: ${candidates.join(", ")} -- elle baglanmali`
    )
  }
  return [candidates[0], name]
}

/* ---------- donusum ---------- */

function convert(file) {
  let s = fs.readFileSync(file, "utf8")
  const used = new Set()
  const notes = []

  /* --- servisler --- */
  for (const [re, to, label] of [
    [/this\.\$axios/g, "useLegacyApi()", "$axios"],
    [/this\.\$toast/g, "useAppToast()", "$toast"],
    [/this\.\$excelApi/g, "useExcelApi()", "$excelApi"],
  ]) {
    const n = (s.match(re) || []).length
    if (n) {
      s = s.replace(re, to)
      notes.push(`${label} x${n}`)
    }
  }

  /* --- cerez --- */
  {
    const re = /Cookies\.get\((['"][^'"]+['"])\)/g
    const n = (s.match(re) || []).length
    if (n) {
      s = s.replace(re, "useCookie($1).value")
      s = s.replace(/import Cookies from ['"]js-cookie['"];?\r?\n/, "")
      notes.push(`js-cookie x${n}`)
    }
  }

  /* --- tarih yardimcilari (plugins/date -> ISO bicimi) --- */
  {
    let n = 0
    /*
     * IKI TAKMA AD: plugins/date cogu dosyada `date` olarak import
     * ediliyor ama DORT dosyada `convertDate` olarak (olculdu:
     * 36 x date, 4 x convertDate). Yalnizca `date` desteklenirse
     * convertDate kullanan dosyada import SATIRI kaliyor ve derleme
     * [UNRESOLVED_IMPORT] ile dusuyor -- customer/mekmar/Form.vue'da
     * oyle yakalandi.
     */
    for (const [re, to] of [
      [/\b(?:date|convertDate)\.dateToString\(/g, "toIsoDate("],
      [/\b(?:date|convertDate)\.stringToDate\(/g, "fromIsoDate("],
    ]) {
      n += (s.match(re) || []).length
      s = s.replace(re, to)
    }
    if (n) {
      s = s.replace(/import date from ['"][^'"]*plugins\/date['"];?\r?\n/, "")
      if (!s.includes("~/utils/dates")) {
        s = s.replace(
          /(<script>\r?\n)/,
          `$1import { toIsoDate, fromIsoDate } from "~/utils/dates"${CR}`
        )
      }
      notes.push(`plugins/date x${n}`)
    }
  }

  /* --- elle <a download> --- */
  {
    const re =
      /const link = document\.createElement\("a"\);\r?\n\s*link\.href =\s*[\s\S]{0,80}?getLocalUrl \+\s*([^;]+?);\r?\n+\s*link\.setAttribute\("download", ([^)]+)\);\r?\n\s*document\.body\.appendChild\(link\);\r?\n\s*link\.click\(\);/g
    const n = [...s.matchAll(re)].length
    if (n) {
      s = s.replace(
        re,
        (m, p, f) =>
          `downloadFromExcelServer(${CR}              ${p.trim()},${CR}              ${f.trim()}${CR}            );`
      )
      notes.push(`<a download> x${n}`)
    }
  }

  /* --- commit -> MUT_ --- */
  {
    const re = /this\.\$store\.commit\(\s*["'](\w+)["']\s*(?:,\s*([^)]*?))?\s*\)/g
    const n = (s.match(re) || []).length
    if (n) {
      s = s.replace(re, (m, name, arg) => {
        const [store] = resolve("MUT_" + name, "mutation")
        used.add(store)
        return `this.${VAR_OF(store)}.MUT_${name}(${arg ? arg.trim() : ""})`
      })
      notes.push(`commit x${n}`)
    }
  }

  /* --- dispatch --- */
  {
    const re = /this\.\$store\.dispatch\(\s*["'](\w+)["']\s*(?:,\s*([^)]*?))?\s*\)/g
    const n = (s.match(re) || []).length
    if (n) {
      s = s.replace(re, (m, name, arg) => {
        const [store, member] = resolve(name, "action")
        used.add(store)
        return `this.${VAR_OF(store)}.${member}(${arg ? arg.trim() : ""})`
      })
      notes.push(`dispatch x${n}`)
    }
  }

  /* --- mapGetters --- */
  const mg = s.match(/\.\.\.mapGetters\(\[([\s\S]*?)\]\),?/)
  if (mg) {
    const names = [...mg[1].matchAll(/['"]([A-Za-z_$][\w$]*)['"]/g)].map((x) => x[1])

    /* UZUNDAN KISAYA: kisa ad uzunun oneki olabilir
       (getFinanceList / getFinanceListTotal) */
    for (const name of [...names].sort((a, b) => b.length - a.length)) {
      if (DROPPED.has(name)) continue
      const [store, member] = resolve(name, "getter")
      const target = `${VAR_OF(store)}.${member}`

      const before = s
      s = s.replace(new RegExp("this\\." + name + "(?![\\w$])", "g"), "this." + target)
      /*
       * Tirnak hariç TUTULMAZ: sablondaki kullanim :prop="getX"
       * biciminde, yani adin hemen onunde `"` var. (Ilk surumde tirnak
       * dislanmisti ve sablon referanslarinin HICBIRI cevrilmedi.)
       */
      s = s.replace(new RegExp("(^|[^\\w.$])" + name + "(?![\\w$])", "g"), "$1" + target)
      if (s !== before) used.add(store)
    }
    notes.push(`mapGetters x${names.length}`)
  }

  /* --- store computed'leri + import'lar --- */
  if (!used.size && mg) {
    /*
     * TUM getter'lar DUSURULDU (ornegin tek getter getLocalUrl'di).
     * Store'a ihtiyac yok ama mapGetters satiri ile vuex import'u
     * kalmamali -- yoksa derleme "mapGetters is not defined" ile duser.
     * Bos kalan `computed: {}` blogu da temizleniyor.
     */
    s = s.replace(/\s*\.\.\.mapGetters\(\[[\s\S]*?\]\),?/, "")
    s = s.replace(/import ?\{ ?mapGetters ?\} ?from ?['"]vuex['"];?\r?\n/, "")
    s = s.replace(/\n\s*computed\s*:\s*\{\s*\r?\n?\s*\},?\r?\n/, CR)
    notes.push("mapGetters tamamen dusuruldu")
  }

  if (used.size) {
    const block = [...used]
      .sort()
      .map((st) => `${VAR_OF(st)}() {${CR}      return ${FACTORY(st)}()${CR}    },`)
      .join(CR + "    ")

    if (/\.\.\.mapGetters\(\[[\s\S]*?\]\),?/.test(s)) {
      s = s.replace(/\.\.\.mapGetters\(\[[\s\S]*?\]\),?/, block)
    } else if (/\n\s*computed:\s*\{\r?\n/.test(s)) {
      s = s.replace(/(\n\s*computed:\s*\{\r?\n)/, `$1    ${block}${CR}`)
    } else {
      s = s.replace(
        /(\n\s*(?:props:|data\(\)))/,
        `${CR}  computed: {${CR}    ${block}${CR}  },$1`
      )
    }

    s = s.replace(/import ?\{ ?mapGetters ?\} ?from ?['"]vuex['"];?\r?\n/, "")

    for (const st of used) {
      const imp = `import { ${FACTORY(st)} } from "~/stores/${st}"`
      if (!s.includes(imp)) s = s.replace(/(<script>\r?\n)/, `$1${imp}${CR}`)
    }
  }

  /* --- created() -> mounted() --- */
  if (/\n\s*created\s*\(\s*\)\s*\{/.test(s) && !/\n\s*mounted\s*\(\s*\)\s*\{/.test(s)) {
    s = s.replace(
      /(\n)(\s*)created(\s*\(\s*\)\s*\{)/,
      `$1$2/*$1$2 * created() -> mounted(): created() SSR'da da calisir, icindeki async$1$2 * is BEKLENMEZ ve liste BOS serialize edilir; hydration onu devralir,$1$2 * created() bir daha calismadigi icin tablo bos kalir (bkz. commit$1$2 * 2afc877e3). mounted() sunucuda hic calismaz.$1$2 */$1$2mounted$3`
    )
    notes.push("created->mounted")
  } else if (/\n\s*created\s*\(\s*\)\s*\{/.test(s)) {
    notes.push("!! created() VAR ama mounted() de var -- ELLE birlestir")
  }

  /* --- noktali watch anahtarlari --- */
  {
    const lines = s.split("\n")
    let inWatch = false
    let indent = 0
    let n = 0
    const out = lines.map((raw) => {
      const line = raw.replace(/\r$/, "")
      const open = line.match(/^(\s*)watch\s*:\s*\{/)
      if (open) {
        inWatch = true
        indent = open[1].length
        return raw
      }
      if (inWatch) {
        if (new RegExp("^\\s{0," + indent + "}\\},?\\s*$").test(line)) {
          inWatch = false
          return raw
        }
        const key = line.match(
          /^(\s*)([A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)+)(\s*\([^)]*\)\s*\{)\s*$/
        )
        if (key) {
          n++
          return `${key[1]}"${key[2]}"${key[3]}${raw.endsWith("\r") ? "\r" : ""}`
        }
      }
      return raw
    })
    if (n) {
      s = out.join("\n")
      notes.push(`watch anahtari x${n}`)
    }
  }

  /* --- kalan artik kontrolu --- */
  const leftovers = ["mapGetters", "this.$store", "this.$axios", "this.$toast", "this.$excelApi"]
    .filter((x) => s.includes(x))

  return { text: s, notes, used: [...used], leftovers }
}

/* ---------- CLI ---------- */

const args = process.argv.slice(2)
const write = args.includes("--write")
const files = args.filter((a) => !a.startsWith("--"))

if (!files.length) {
  console.log("kullanim: node wire-stores.mjs <dosya.vue> [...] [--write]")
  process.exit(1)
}

let failed = 0

for (const file of files) {
  try {
    const r = convert(file)
    console.log(`\n### ${file}`)
    console.log("  " + (r.notes.join(", ") || "degisiklik yok"))
    if (r.used.length) console.log("  store: " + r.used.join(", "))
    if (r.leftovers.length) {
      console.log("  !! KALAN: " + r.leftovers.join(", "))
      failed++
    }
    if (write) {
      fs.writeFileSync(file, r.text)
      console.log("  yazildi")
    }
  } catch (err) {
    console.log(`\n### ${file}`)
    console.log("  !! HATA: " + err.message)
    failed++
  }
}

if (!write) console.log("\n(kuru calisma -- uygulamak icin --write)")
process.exit(failed ? 1 : 0)
