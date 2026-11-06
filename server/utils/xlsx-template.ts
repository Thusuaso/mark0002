import ExcelJS from "exceljs"
import JSZip from "jszip"
import type ExcelJSTypes from "exceljs"
import type { H3Event } from "h3"

/*
 * SABLON TEMELLI .xlsx URETIMI -- Python'un yaptiginin aynisi.
 *
 * ---------------------------------------------------------------------
 * NEDEN SABLON: KAYNAK OYLE YAPIYOR
 * ---------------------------------------------------------------------
 * Excel sunucusunun hicbir ucu dosyayi sifirdan kurmuyor. Hepsi ayni
 * kalibi izliyor (ornek: component/orders/excel.py:18 uretimCikti):
 *
 *     source_path = 'excel/sablonlar/Uretim_list.xlsx'
 *     target_path = 'excel/dosyalar/Uretim_list.xlsx'
 *     shutil.copy2(source_path, target_path)
 *     kitap = load_workbook(target_path)
 *     sayfa = kitap.get_sheet_by_name('Sheet')
 *     satir = 2
 *     ... sayfa.cell(satir, column=N, value=...) ...
 *     kitap.save(target_path)
 *
 * Yani BASLIK SATIRI, SUTUN GENISLIKLERI, ZEMIN RENKLERI, KENARLIKLAR,
 * YAZI TIPLERI VE SAYI BICIMLERI SABLONUN ICINDE duruyor; Python
 * yalnizca hucre DEGERLERINI yaziyor (yer yer hizalama/kenarlik ekliyor).
 *
 * Ilk yaklasimim bu stilleri ELLE YENIDEN KURMAKTI: uretimden dosya
 * indirip xl/styles.xml ve xl/worksheets/sheet1.xml okunarak her bicim
 * cikarilip kodda tekrar uretiliyordu. Calisti (finans test ucunda 192
 * hucre birebir tuttu) ama:
 *   - uc basina saatler suren bir tersine cozme isiydi (uretim listesi
 *     ucunda 23 ayri hucre bicimi, 10 kenarlik varyanti, 41 birlestirme
 *     cikti),
 *   - ve asla tam olmuyordu: `bestFit` ipucu, `charset="162"`, kenarlik
 *     renk indeksi gibi ayrintilar kodda yeniden uretilemiyordu.
 *
 * Sablonlar elde oldugu icin (26 dosya, 516K; socket repo'sundaki
 * excel/sablonlar -> server/assets/excel-templates) dogru cozum bu:
 * sablonu oku, hucreleri doldur, tamponu don. Stil isi SIFIR.
 *
 * ---------------------------------------------------------------------
 * PYTHON'DAN KORUNAN TEK FARK: DISKE YAZMA YOK
 * ---------------------------------------------------------------------
 * Python sablonu `excel/dosyalar/<ad>.xlsx` adresine KOPYALIYOR ve GET
 * istegi o SABIT dosyayi geri veriyor. Iki kullanici ayni anda rapor
 * aldiginda ikincisi birincinin dosyasini eziyor; ustelik
 * /finance/reports/test/excel ve /finance/reports/test/excel/mekmer
 * uclari AYNI dosyayi paylasiyor (component/finance/finance.py:116 ve
 * :129 -- ikisi de 'excel/dosyalar/finans_test_list.xlsx'), yani
 * FARKLI IKI RAPOR birbirini eziyor.
 *
 * Burada sablon yalnizca OKUNUYOR, cikti istege ozel bir tampon.
 * Paylasilan durum ve yaris durumu yok.
 */

/*
 * =====================================================================
 * [!] createRequire KULLANILMIYOR -- URETIM SUNUCUSUNU COKERTIYORDU
 * =====================================================================
 * Burada once `createRequire(import.meta.url)("exceljs")` vardi.
 * Gerekcesi gelistirme ortamindaki bir Windows sorunuydu (exceljs
 * disa alindiginda ESM yukleyici `c:\...` yollarini reddediyordu).
 *
 * Ama o cozum URETIMI TAMAMEN BOZUYORDU ve bu yalnizca `npm run build`
 * SONRASI SUNUCU BASLATILINCA goruluyordu -- derleme basariyla
 * geciyordu:
 *
 *   TypeError [ERR_INVALID_ARG_VALUE]: The argument 'filename' must be
 *   a file URL object, file URL string, or absolute path string.
 *   Received 'file:///_entry.js'
 *       at createRequire (.output/server/chunks/_/nitro.mjs)
 *
 * Nitro paketlerken `import.meta.url` ifadesini
 * `globalThis._importMeta_.url` ile degistiriyor ve o da sanal bir
 * yol (`file:///_entry.js`) donuyor; createRequire bunu reddediyor.
 * Yani sunucu HIC ACILMIYORDU.
 *
 * Ikinci bir zarar daha vardi: `createRequire` paketleyiciye
 * GORUNMEZ oldugu icin exceljs ve jszip `.output/server/package.json`
 * bagimlilik listesine HIC girmiyordu. Yalnizca `.output` klasoru
 * kopyalanip orada `npm ci` yapilsaydi iki paket de eksik olurdu.
 *
 * Duz import ikisini de cozuyor: Nitro bagimliligi goruyor, dogru
 * sekilde disa aliyor ve package.json'a yaziyor.
 */

/*
 * Sablonlar NITRO SERVER ASSET deposundan okunuyor.
 *
 * Nitro `server/assets/**` altindaki dosyalari otomatik olarak
 * `assets:server` deposuna bagliyor ve URETIM PAKETINE GOMUYOR.
 *
 * ONCE DOSYA YOLUYLA OKUNUYORDU -- CALISMADI: yol
 * `dirname(fileURLToPath(import.meta.url)) + "/../assets/..."` ile
 * kuruluyordu, ama Nitro bu modulu paketledigi icin import.meta.url
 * `.nuxt/` altini gosteriyor ve yol
 *   .nuxt/assets/excel-templates/finans_test_list.xlsx
 * gibi var olmayan bir yere cikiyordu (olculdu: ENOENT). process.cwd()
 * de dev ile uretimde ayni degil. Depo API'si ikisinde de dogru
 * calisiyor ve paketlemeyi de kendisi hallediyor.
 */
const assets = () => useStorage("assets:server")

/*
 * Sablonlar bellekte onbellege aliniyor.
 *
 * Dosyalar kucuk (en buyugu proforma_invoice.xlsx, 114K) ve ISTEK
 * BASINA DEGISMIYOR; her cagride okumak gereksiz. Tampon
 * KOPYALANARAK veriliyor -- exceljs okurken tamponu tuketebiliyor,
 * paylasilan ornek ikinci istekte bozuk dosya uretir.
 */
const cache = new Map<string, Buffer>()

async function loadTemplate(name: string): Promise<Buffer> {
  const cached = cache.get(name)
  if (cached) return Buffer.from(cached)

  const raw = await assets().getItemRaw<Uint8Array>(`excel-templates/${name}`)
  if (!raw) {
    throw createError({
      statusCode: 500,
      statusMessage: `Excel sablonu bulunamadi: excel-templates/${name}`,
    })
  }

  const buffer = Buffer.from(raw)
  cache.set(name, buffer)
  return Buffer.from(buffer)
}

/*
 * Sablonda KENDI stili olan hucrelerin kumesi ("r,c" bicimli).
 *
 * ---------------------------------------------------------------------
 * NEDEN GEREKLI -- openpyxl'i DOGRU taklit etmek icin
 * ---------------------------------------------------------------------
 * openpyxl bir hucreye deger yazdiginda:
 *   - hucre sablonda VARSA  -> KENDI stilini korur
 *   - hucre sablonda YOKSA  -> VARSAYILAN stille olusturur; sutun
 *                              stilini hucreye TASIMAZ
 *
 * exceljs ise her iki durumda da sutun stilini hucreye yaziyor.
 *
 * Bu ayrim uretim listesi ucunda olculdu (Uretim_list.xlsx, 17 sutunun
 * hepsinde sutun stili var):
 *   - her yerde restyle (koru) -> sablonda OLMAYAN hucreler sutundan
 *     kenarlik/bicim kapiyor: 137 bicim + 134 stil farki
 *   - her yerde tam atama      -> sablonda OLAN hucreler kendi
 *     bicimini kaybediyor:     314 bicim + 398 stil farki
 * Yani tek bir kural yetmiyor; hucre bazinda karar vermek gerekiyor.
 *
 * Kume, sablonun HAM XML'inden okunuyor: `<c r="D2" s="5">` gibi
 * `s` niteligi tasiyan her hucre "kendi stili var" sayilir.
 */
const ownStyleCache = new Map<string, Set<string>>()

async function templateOwnStyleCells(name: string, sheetName: string) {
  const key = `${name}|${sheetName}`
  const cached = ownStyleCache.get(key)
  if (cached) return cached

  const cells = new Set<string>()

  /*
   * Sablonu ZIP olarak acip sayfa XML'ini okumak yerine exceljs'in
   * kendi okumasini kullanmak mumkun DEGIL: exceljs hucre stilini
   * sutun stiliyle birlestirdigi icin "kendi stili var mi" bilgisi
   * kayboluyor. Bu yuzden ham XML ayristiriliyor.
   */
  const zip = await JSZip.loadAsync(await loadTemplate(name))

  /* workbook.xml: sayfa adi -> dosya sirasi */
  const workbook = await zip.file("xl/workbook.xml")?.async("string")
  const sheetNames = workbook
    ? [...workbook.matchAll(/<sheet[^>]*name="([^"]*)"/g)].map((m) => m[1])
    : []

  const index = Math.max(0, sheetNames.indexOf(sheetName))
  const xml = await zip.file(`xl/worksheets/sheet${index + 1}.xml`)?.async("string")

  if (xml) {
    for (const m of xml.matchAll(/<c r="([A-Z]+)(\d+)"[^>]*\ss="\d+"/g)) {
      const col = [...m[1]!].reduce((acc, ch) => acc * 26 + (ch.charCodeAt(0) - 64), 0)
      cells.add(`${Number(m[2])},${col}`)
    }
  }

  ownStyleCache.set(key, cells)
  return cells
}

export interface TemplateSheet {
  /** Sablon dosya adi, orn. "Uretim_list.xlsx" */
  template: string

  /** Python'daki get_sheet_by_name(...) argumaninin aynisi. */
  sheetName: string
}

/*
 * Sablonu acar, `fill` ile doldurulmasina izin verir, tamponu dondurur.
 *
 * `fill` dogrudan exceljs worksheet'i aliyor -- uclarin cogu basit bir
 * sutun eslemesi degil (gruplanmis birlestirmeler, bolum basliklari,
 * kosullu birim metinleri). Python da hucre hucre yaziyor; ayni
 * esneklik burada da korundu.
 */
/**
 * Hucreye deger yazar ve stili openpyxl'in yaptigi gibi belirler:
 * sablonda kendi stili olan hucrenin stili KORUNUR, olmayan hucre
 * VARSAYILAN stille olusur (sutun stili tasinmaz). `patch` her iki
 * durumda da ustune uygulanir.
 *
 * Gerekcesi templateOwnStyleCells'in notunda.
 */
export type CellWriter = (
  row: number,
  col: number,
  value: string | number | boolean | null | undefined,
  patch?: Partial<ExcelJSTypes.Style>,
) => ExcelJSTypes.Cell

export async function fillTemplate(
  spec: TemplateSheet,
  fill: (
    sheet: ExcelJSTypes.Worksheet,
    book: ExcelJSTypes.Workbook,
    write: CellWriter,
    /*
     * COK SAYFALI SABLONLAR ICIN sayfa basina yazici uretir.
     *
     * `write` yalnizca birincil sayfaya baglidir; ayo maliyet ucu gibi
     * ALTI AYRI sayfaya yazan uclarda her sayfanin kendi
     * "sablonda stili var mi" kumesi gerekiyor (kume sayfa bazli).
     */
    writerFor: (sheetName: string) => Promise<CellWriter>,
  ) => void | Promise<void>,
): Promise<Buffer> {
  const book = new ExcelJS.Workbook()
  await book.xlsx.load(await loadTemplate(spec.template))

  const makeWriter = async (sheetName: string): Promise<CellWriter> => {
    const target = book.getWorksheet(sheetName)
    if (!target) {
      throw createError({
        statusCode: 500,
        statusMessage: `Sablonda '${sheetName}' sayfasi yok: ${spec.template}`,
      })
    }

    const ownStyle = await templateOwnStyleCells(spec.template, sheetName)

    return (row, col, value, patch = {}) => {
      const cell = target.getCell(row, col)
      cell.value = (value ?? null) as never

      cell.style = ownStyle.has(`${row},${col}`)
        ? { ...cell.style, ...patch } /* sablonda kendi stili var -> koru */
        : { ...patch } /* sablonda yok -> varsayilan + patch */

      return cell
    }
  }

  const sheet = book.getWorksheet(spec.sheetName)
  if (!sheet) {
    throw createError({
      statusCode: 500,
      statusMessage: `Sablonda '${spec.sheetName}' sayfasi yok: ${spec.template}`,
    })
  }

  await fill(sheet, book, await makeWriter(spec.sheetName), makeWriter)

  return (await book.xlsx.writeBuffer()) as Buffer
}

/** Python'daki thin_border'in karsiligi (dort kenar 'thin'). */
export const THIN: Partial<ExcelJSTypes.Borders> = {
  top: { style: "thin" },
  left: { style: "thin" },
  bottom: { style: "thin" },
  right: { style: "thin" },
}

/*
 * Hucrenin stilini GUVENLI sekilde degistirir.
 *
 * ---------------------------------------------------------------------
 * NEDEN ZORUNLU -- OLCULEN BIR HATA
 * ---------------------------------------------------------------------
 * exceljs bir sablonu okudugunda ayni bicimi paylasan TUM hucreler
 * AYNI stil nesnesini paylasir. Dolayisiyla
 *
 *     cell.border = THIN            // YANLIS
 *
 * o paylasilan nesneyi YERINDE degistirir ve bicimi paylasan butun
 * hucreler etkilenir.
 *
 * Olculdu (finans test ucu): yalnizca TOPLAM satirina kenarlik
 * verilmesi gerekirken, cikti dosyasinda B2, H2, H23 gibi VERI
 * hucreleri de kenarlikli geldi -- cunku sablonda veri hucrelerinin
 * hepsi ayni bicimi (xf1: para bicimi, kenarliksiz) paylasiyor ve
 * toplam satiri da ondan turuyor. Yan belirti: uretilen dosyada
 * cellXfs sayisi 5'e dustu (Python'da 6) -- yeni bir bicim
 * olusturulmak yerine mevcut bicim EZILMISTI.
 *
 * Stil nesnesini YAYARAK atamak hucreye KENDI nesnesini verir,
 * paylasilan olana dokunmaz. openpyxl'de `cell.border = ...` zaten
 * boyle davraniyor (yeni bir stil turetiyor), yani bu yardimci
 * Python'un davranisini tasiyor.
 */
export function restyle(
  cell: ExcelJSTypes.Cell,
  patch: Partial<ExcelJSTypes.Style>,
): ExcelJSTypes.Cell {
  cell.style = { ...cell.style, ...patch }
  return cell
}

/*
 * Hucreye SADECE verilen stili uygular; mevcut/kalitilan stili
 * TASIMAZ.
 *
 * ---------------------------------------------------------------------
 * NEDEN restyle() YETMIYOR -- SABLONLAR IKI FARKLI TASARIMDA
 * ---------------------------------------------------------------------
 * Sablonlarin bir kismi veri hucrelerini TEK TEK bicimlendirmis,
 * bir kismi ise bicimi SUTUN DUZEYINDE tanimlamis:
 *
 *   finans_test_list.xlsx : B2:H805'in hepsinde hucre bazli xf
 *                           (para bicimi) var  -> restyle() dogru,
 *                           cunku o bicim KORUNMALI.
 *
 *   loading_excel_list.xlsx: hucre YOK, bunun yerine
 *                           <col min="4" max="5" style="1"/>
 *                           yani D-E sutunlarinda sutun bazli
 *                           para bicimi var.
 *
 * Ikinci durumda openpyxl ile exceljs AYRISIYOR:
 *   - openpyxl bos bir hucreye deger yazdiginda sutun stilini hucreye
 *     TASIMIYOR; hucre varsayilan bicimde (fmt=0) kaliyor.
 *   - exceljs `cell.style` okundugunda SUTUN stilini dondurup onu
 *     hucreye yaziyor; sonucta hucre para bicimli (fmt=164) oluyor.
 *
 * Olculdu (loading ucu, 3 satirlik ornek): restyle() ile D3/E3/D4/E4
 * hucreleri fmt=164 cikti, uretimdeki Python ciktisinda ise fmt=0'di
 * -- 8 hucrede sayi bicimi farki. Bu gorunur bir fark (hucrede dolar
 * isaretli bicim vs genel bicim).
 *
 * Bu yuzden sutun bazli sablonlarda borderOnly() kullaniliyor:
 * Python'un sonucuyla ayni, yani varsayilan bicim + kenarlik.
 */
export function borderOnly(cell: ExcelJSTypes.Cell): ExcelJSTypes.Cell {
  cell.style = { border: THIN }
  return cell
}

/** Python: Alignment(horizontal='center', vertical='center') */
export const CENTER: Partial<ExcelJSTypes.Alignment> = {
  horizontal: "center",
  vertical: "middle",
}

/*
 * Toplam satirlarinin sari-yesil zemini.
 *
 * Python: PatternFill(start_color="defb00", end_color="defb00",
 *                     fill_type="solid")
 *
 * DIKKAT -- "FFdefb00" DEGIL: openpyxl 6 haneli rengi 8 haneye
 * basa "00" ekleyerek tamamliyor, "FF" EKLEMIYOR. Uretim ciktisindan
 * okundu (xl/styles.xml):
 *     <fgColor rgb="00defb00" /><bgColor rgb="00defb00" />
 * Tahminle "FFdefb00" yazilsa dosya farkli olurdu.
 */
export const TOTAL_FILL: ExcelJSTypes.FillPattern = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "00defb00" },
  bgColor: { argb: "00defb00" },
}

/*
 * Toplam satirlarinin kalin yazi tipi.
 *
 * Python: Font(name='Calibri', size=13, bold=True, italic=False,
 *              vertAlign=None, underline='none', strike=False,
 *              color='FF000000')
 * Uretim ciktisindaki karsiligi:
 *   <font><name val="Calibri" /><b val="1" /><strike val="0" />
 *         <color rgb="FF000000" /><sz val="13" /></font>
 */
export const BOLD_13: Partial<ExcelJSTypes.Font> = {
  name: "Calibri",
  size: 13,
  bold: true,
  italic: false,
  underline: false,
  strike: false,
  color: { argb: "FF000000" },
}

/*
 * Toplam satirindaki bir hucreyi Python'un yaptigi gibi bicimlendirir:
 * ince kenarlik + kalin 13 punto + defb00 zemin.
 *
 * `center` yalnizca 'Total' etiketinde veriliyor -- Python sadece ona
 * Alignment(center, center) uyguluyor, sayi hucrelerine uygulamiyor.
 */
export function totalCell(
  cell: ExcelJSTypes.Cell,
  opts: { center?: boolean } = {},
): ExcelJSTypes.Cell {
  /*
   * MEVCUT STIL TASINMIYOR (restyle degil, duz atama).
   *
   * Bu stili kullanan Python fonksiyonlari (web.py icindeki
   * ExcellCiktiIslem uyeleri) sutun bazli bicimli sablonlarla
   * calisiyor; openpyxl bos bir hucreye yazarken sutun bicimini
   * tasimadigi icin oradaki toplam hucreleri VARSAYILAN bicimde
   * (fmt=0) kaliyor.
   *
   * Olculdu (loading ucu): restyle() ile D5/E5 toplam hucreleri
   * "[$$-409]#,##0.00" bicimli cikti, Python'da ise bicimsizdi.
   *
   * DIKKAT: para bicimini KORUMASI gereken uclar (orn.
   * excel-api/finance/test -- o sablonda B24:H24'un hucre bazli
   * para bicimi VAR ve Python onu koruyor) bu yardimciyi
   * KULLANMIYOR; orada dogrudan restyle(cell, { border: THIN }).
   */
  cell.style = {
    border: THIN,
    font: BOLD_13,
    fill: TOTAL_FILL,
    ...(opts.center ? { alignment: CENTER } : {}),
  }
  return cell
}

/*
 * Python'daki _dateConvert (web.py:784) karsiligi:
 *
 *     None / '' / ' '  -> ''
 *     aksi halde       -> 'dd-mm-yyyy'
 *
 * Python kaynagi tarihi METIN olarak '-' ile uce boluyor ve gun
 * kisminin ilk IKI karakterini aliyor (`_date[0:2]`), yani
 * "2026-10-23T00:00:00.000Z" girdisinde gun "23" olarak cozuluyor.
 * Burada ayni yaklasim: ISO metnin ilk 10 karakteri yeterli, zaman
 * dilimi kaydirmasi YAPILMIYOR.
 *
 * NEDEN new Date() KULLANILMIYOR: `new Date("2026-10-23T00:00:00.000Z")`
 * yerel saate cevrilir ve UTC+3'te gun DEGISMEZ ama negatif ofsetli bir
 * sunucuda BIR GUN GERI kayar. Python metin uzerinde calistigi icin bu
 * riski tasimiyordu; metin uzerinde kalmak davranisi birebir tutuyor.
 */
export function dateConvert(value: unknown): string {
  if (value == null) return ""

  const text = String(value).trim()
  if (text === "") return ""

  const parts = text.slice(0, 10).split("-")
  if (parts.length !== 3) return ""

  const [year, month, day] = parts
  if (!year || !month || !day) return ""

  return `${day.slice(0, 2)}-${month}-${year}`
}

/**
 * Python __noneControl (component/finance/list.py:702) karsiligi:
 *   if value == None: return 0 else: return float(value)
 */
export function nc(value: unknown): number {
  if (value == null) return 0
  const n = typeof value === "number" ? value : Number(value)
  return Number.isFinite(n) ? n : 0
}

/*
 * Python'daki `Font(bold=True)` karsiligi -- PUNTO VERILMEMIS, yani
 * varsayilan (11) kaliyor. BOLD_13 ile karistirilmamali: o toplam
 * satirlarinda kullanilan 13 puntoluk yazi.
 */
export const BOLD: Partial<ExcelJSTypes.Font> = { bold: true }

export interface SimpleColumn<Row> {
  /** Satir 1'e yazilacak baslik -- kaynakla BIREBIR ayni olmali. */
  header: string

  /** Satirdan hucre degerini uretir. */
  value: (row: Row) => string | number | boolean | null | undefined
}

/*
 * "Kodda yazilan baslik satiri + kenarlikli veri satirlari, toplam
 * yok" kalibinin ortak uygulamasi.
 *
 * ---------------------------------------------------------------------
 * NEDEN AYRI YARDIMCI
 * ---------------------------------------------------------------------
 * Kaynakta bu kalip BIREBIR KOPYALANMIS halde bircok yerde duruyor
 * (web.py: reports_strips_excel:808, reports_moloz_excel:923,
 * reports_nakliye_excel:1020 ve benzerleri). Hepsi ayni seyi yapiyor:
 *
 *     satir = 1
 *     <her baslik icin>  cell.border = thin_border; cell.font = Font(bold=True)
 *     satir = 2'den itibaren  <her hucre>.border = thin_border
 *
 * Tek fark SABLON, SAYFA ADI, BASLIK METINLERI ve ALAN ADLARI.
 * Uclar yalnizca bu dordunu veriyor.
 *
 * Hucrelere borderOnly uygulaniyor (restyle degil): bu sablonlarda
 * bicimler sutun duzeyinde tanimli olabiliyor ve openpyxl onlari
 * hucreye tasimiyor -- gerekcesi borderOnly'nin kendi notunda.
 */
export async function buildHeaderedTable<Row>(opts: {
  template: string
  sheetName?: string
  columns: SimpleColumn<Row>[]
  rows: Row[]
}): Promise<Buffer> {
  const { template, sheetName = "Sayfa1", columns, rows } = opts

  return await fillTemplate({ template, sheetName }, (sheet) => {
    columns.forEach((col, i) => {
      const cell = sheet.getCell(1, i + 1)
      cell.value = col.header
      cell.style = { border: THIN, font: BOLD }
    })

    let satir = 2

    for (const row of rows) {
      columns.forEach((col, i) => {
        const cell = sheet.getCell(satir, i + 1)
        cell.value = (col.value(row) ?? null) as never
        borderOnly(cell)
      })

      satir += 1
    }
  })
}

/*
 * Tamponu indirilebilir .xlsx yaniti olarak yazar.
 *
 * Dosya adi Content-Disposition'dan gidiyor. Python tarafinda ad
 * send_file'in verdigi SABIT dosya adiydi ve istemci ayrica kendi
 * `download` adini yaziyordu -- ikisi bazen uyusmuyordu (orn.
 * orderDetail/CheckForm.vue'de IKI AYRI rapor ayni "check_list.xlsx"
 * adiyla iniyordu).
 */
export function sendXlsxBuffer(
  event: H3Event,
  buffer: Buffer,
  filename: string,
): Buffer {
  setResponseHeaders(event, {
    "Content-Type":
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "Content-Disposition": `attachment; filename="${filename}"`,
    "Content-Length": String(buffer.byteLength),

    /*
     * Rapor her istekte yeniden uretiliyor; ara bellekte tutulmasi
     * kullaniciya ESKI raporu verir -- eski sozlesmedeki en buyuk
     * sorun tam olarak buydu.
     */
    "Cache-Control": "no-store",
  })

  return buffer
}

/*
 * Govdenin dizi oldugunu dogrular.
 *
 * Python gecersiz govdede istisna firlatip {"status": false} donuyordu
 * ve istemci bunu KONTROL ETMIYORDU -- kullanici sessizce eski dosyayi
 * indiriyordu. Burada 400 donuyor, indirme hic baslamiyor.
 */
export function requireList<Row = Record<string, unknown>>(body: unknown): Row[] {
  if (!Array.isArray(body)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Govde bir dizi olmali (rapor satirlari).",
    })
  }

  return body as Row[]
}

/*
 * Govdenin nesne oldugunu dogrular.
 *
 * Uclarin cogu DIZI gonderiyor ama bazilari NESNE gonderiyor
 * (orn. /finance/mekmar/excel/custom -> { po: [...], paid: [...] }).
 */
export function requireObject<T = Record<string, unknown>>(body: unknown): T {
  if (body == null || typeof body !== "object" || Array.isArray(body)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Govde bir nesne olmali.",
    })
  }

  return body as T
}

/*
 * Python'daki _formatControl (web.py:798) karsiligi:
 *
 *     if(val > -8 and val < 8): return 0
 *     else: return val
 *
 * Yani KUCUK BAKIYELER SIFIRLANIYOR -- kuru/yuvarlama artiklarindan
 * kalan +-8 birimlik tutarlar rapora 0 olarak giriyor.
 *
 * NULL DAVRANISI DEGISTI: Python'da `None > -8` karsilastirmasi
 * Python 3'te TypeError firlatir, yani bos bir tutar ucun TAMAMINI
 * dusurur (`except` yakalar, {"status": false} doner) ve istemci bunu
 * kontrol etmedigi icin kullanici sessizce ESKI dosyayi indirir.
 * Burada bos deger 0 sayiliyor: rapor uretilmeye devam ediyor ve
 * zaten 0 esigin icinde kaldigi icin sonuc da 0.
 */
export function formatControl(value: unknown): number {
  const n = nc(value)
  return n > -8 && n < 8 ? 0 : n
}
