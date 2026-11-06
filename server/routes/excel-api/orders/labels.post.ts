/*
 * Excel sunucusundaki `/excel/labels/list` ucunun Nitro karsiligi
 * (kasa etiketleri -- sayfa basina 4 etiketlik izgara).
 *
 * Cagri yeri:
 *   app/components/orderDetail/CheckForm.vue -> etiket listesi butonu
 *
 * ---------------------------------------------------------------------
 * KAYNAK (okundu)
 * ---------------------------------------------------------------------
 *   web.py:3041  SiparislerLabelsExcelApi
 *   web.py:3027  post -> ExcellCiktiIslem().export_final_labels_excel(data)
 *                get  -> send_file('excel/dosyalar/kasa_etiketleri.xlsx')
 *   web.py:37    export_final_labels_excel  <-- govde burada
 *
 * Sablon: excel/sablonlar/etiket_sablon.xlsx -- Python `kitap.active`
 * kullaniyor, yani sayfa ADIYLA secilmiyor, ILK sayfa aliniyor.
 *
 * [!] CIKTI DOSYA ADI SABLONDAN FARKLI: Python sablonu
 *     'kasa_etiketleri.xlsx' adiyla kopyaliyor ve GET de o adi
 *     servis ediyor -- 'etiket_sablon.xlsx' degil.
 *
 * Govde: { customer, po, list: [ { Sira, KategoriAdi, UrunAdi,
 *          YuzeyIslem, En, Boy, Kenar, Adet, Miktar, BirimAdi, Ton } ] }
 *
 * ---------------------------------------------------------------------
 * IZGARA
 * ---------------------------------------------------------------------
 * Her etiket 11 satir kullaniyor ama izgara adimi 12 (rows_per_label),
 * yani etiketler arasinda bir satir bosluk kaliyor. Sayfa basina 4
 * etiket, 2x2 yerlesim:
 *
 *   page = index // 4
 *   pos  = index % 4
 *   r = page * 24 + (pos // 2) * 12 + 1
 *   c = (pos % 2) * 10 + 1
 *
 * (24 = rows_per_label * 2; sayfada iki etiket satiri var.)
 *
 * Satir satir icerik -- her biri kaynaktaki sirayla:
 *   r    : "CSTMR:" (sol) | musteri adi BUYUK HARF (c+1..c+7 birlesik)
 *          | "DESTINATION" (c+8..c+9 birlesik)
 *   r+1  : "ORDER:" (sol) | PO (c+1..c+7) | BOS birlesik alan (c+8..c+9)
 *   r+2..r+5  : Sira no, c..c+1 birlesik, 40 punto
 *   r+6       : "PRODUCTS:", c..c+1 birlesik
 *   r+2..r+6  : urun bilgisi, c+2..c+7 birlesik, 15 punto
 *   r+2..r+6  : "PRODUCT\nOF\nTURKEY", c+8..c+9 birlesik
 *   r+7  : "FRAGILE" (c..c+7) | "<ton> KGS" (c+8..c+9)
 *   r+8  : WARNING basligi, c..c+9 birlesik, 8 punto, SOLA yasli
 *   r+9  : uyari metni, c..c+9 birlesik, 7.5 punto, sol-ust,
 *          SATIR YUKSEKLIGI 45
 *   r+10 : "NO CLAIMS ..." c..c+9 birlesik
 *   ardindan r..r+10 x c..c+9 TUM hucrelere kenarlik
 *
 * Sutun genislikleri: 1..20 sutunun hepsi 11.
 *
 * ---------------------------------------------------------------------
 * BOS DEGER DAVRANISI -- PYTHON'DAN FARK
 * ---------------------------------------------------------------------
 * Python iki yerde bos degerde DUSUYOR:
 *   data['customer'].upper()  -> None ise AttributeError
 *   int(item['Ton'])          -> None ise TypeError
 * Her iki durumda uc {"status": false} donuyor, istemci bunu kontrol
 * etmedigi icin kullanici SABLONUN KOPYASINI (bos etiket sayfasi)
 * indiriyor. Burada bos musteri "" , bos ton 0 sayiliyor.
 */

interface LabelItem {
  Sira?: string | number | null
  KategoriAdi?: string | null
  UrunAdi?: string | null
  YuzeyIslem?: string | null
  En?: string | number | null
  Boy?: string | number | null
  Kenar?: string | number | null
  Adet?: number | null
  Miktar?: number | null
  BirimAdi?: string | null
  Ton?: number | null
}

interface LabelsBody {
  customer?: string | null
  po?: string | null
  list?: LabelItem[] | null
}

/* Python'daki yazi tipleri (web.py:51-55). */
const F_HEADER = { bold: true, size: 10 } as const
const F_TITLE = { bold: true, size: 18 } as const
const F_SIRA = { bold: true, size: 40 } as const
const F_WARN_TITLE = { bold: true, size: 8 } as const
const F_SMALL = { size: 7.5 } as const
const F_PRODUCT = { bold: true, size: 15 } as const

/* Python'daki hizalamalar (web.py:57-59). */
const A_CENTER = { horizontal: "center", vertical: "middle", wrapText: true } as const
const A_LEFT = { horizontal: "left", vertical: "middle" } as const
const A_LEFT_TOP = { horizontal: "left", vertical: "top", wrapText: true } as const

const ROWS_PER_LABEL = 12
const COLS_PER_LABEL = 10

const WARNING_TITLE = "WARNING - READ PRIOR TO INSTALLATION"

/*
 * Uyari metni Python'daki birlesik dizgenin BIREBIR aynisi
 * (web.py:145-148). Kaynak dort parcayi yan yana yaziyor ve
 * aralarda bosluk var; burada tek dizge olarak ayni sonuc.
 */
const WARNING_BODY =
  "Natural stones are products of nature and are prone to variations in color, texture, shading and veining that may differ from displays. " +
  "Variations are not considered flaws as no two pieces of stone are alike. Prior to installation, ensure enough material including waste is " +
  "purchased for the entire project. Mix product from various cartons and lay out all tiles and coordinating pieces to ensure optimal " +
  "blending prior to installation. Natural stone products should be sealed prior to grouting."

const NO_CLAIMS =
  "NO CLAIMS WILL BE ACCEPTED AFTER THE MATERIAL HAS BEEN INSTALLED"

export default defineEventHandler(async (event) => {
  const body = requireObject<LabelsBody>(await readBody(event))

  const items = body.list ?? []
  const customer = (body.customer ?? "").toUpperCase()
  const po = body.po ?? null

  const buffer = await fillTemplate(
    /*
     * Python `kitap.active` ile ILK sayfayi aliyor; sablonun tek
     * sayfasi 'Sayfa1'.
     */
    { template: "etiket_sablon.xlsx", sheetName: "Sayfa1" },
    (sheet) => {
      items.forEach((item, index) => {
        const page = Math.floor(index / 4)
        const pos = index % 4

        const r = page * (ROWS_PER_LABEL * 2) + Math.floor(pos / 2) * ROWS_PER_LABEL + 1
        const c = (pos % 2) * COLS_PER_LABEL + 1

        /* --- r: CSTMR | musteri | DESTINATION --- */
        const cstmr = sheet.getCell(r, c)
        cstmr.value = "CSTMR:"
        cstmr.style = { font: F_HEADER, alignment: A_LEFT }

        sheet.mergeCells(r, c + 1, r, c + 7)
        const cust = sheet.getCell(r, c + 1)
        cust.value = customer
        cust.style = { font: F_TITLE, alignment: A_CENTER }

        sheet.mergeCells(r, c + 8, r, c + 9)
        const dest = sheet.getCell(r, c + 8)
        dest.value = "DESTINATION"
        dest.style = { font: F_HEADER, alignment: A_CENTER }

        /* --- r+1: ORDER | po | (bos birlesik alan) --- */
        const order = sheet.getCell(r + 1, c)
        order.value = "ORDER:"
        order.style = { font: F_HEADER, alignment: A_LEFT }

        sheet.mergeCells(r + 1, c + 1, r + 1, c + 7)
        const poCell = sheet.getCell(r + 1, c + 1)
        poCell.value = po
        poCell.style = { font: F_TITLE, alignment: A_CENTER }

        /* Python burayi DEGER YAZMADAN birlestiriyor (GN alani). */
        sheet.mergeCells(r + 1, c + 8, r + 1, c + 9)

        /* --- sira no (buyuk) --- */
        sheet.mergeCells(r + 2, c, r + 5, c + 1)
        const sira = sheet.getCell(r + 2, c)
        sira.value = (item.Sira ?? null) as never
        sira.style = { font: F_SIRA, alignment: A_CENTER }

        /* --- PRODUCTS: basligi --- */
        sheet.mergeCells(r + 6, c, r + 6, c + 1)
        const products = sheet.getCell(r + 6, c)
        products.value = "PRODUCTS:"
        products.style = { font: F_HEADER, alignment: A_CENTER }

        /*
         * Urun bilgisi -- Python'daki f-string ile BIREBIR ayni,
         * satir sonlari dahil (web.py:112-114):
         *   "{KategoriAdi} / {UrunAdi} / \n{YuzeyIslem} / {En} x {Boy}
         *    x {Kenar} cm / \n{Adet} pcs / {Miktar} {BirimAdi}"
         *
         * Bos alanlar Python'da "None" olarak YAZILIRDI (f-string
         * None'u metne dokuyor); burada bos dizge kullaniliyor --
         * "None" yazili etiket basmak dogru degil.
         */
        const t = (v: unknown) => (v == null ? "" : String(v))
        const productInfo =
          `${t(item.KategoriAdi)} / ${t(item.UrunAdi)} / \n` +
          `${t(item.YuzeyIslem)} / ${t(item.En)} x ${t(item.Boy)} x ${t(item.Kenar)} cm / \n` +
          `${t(item.Adet)} pcs / ${t(item.Miktar)} ${t(item.BirimAdi)}`

        sheet.mergeCells(r + 2, c + 2, r + 6, c + 7)
        const info = sheet.getCell(r + 2, c + 2)
        info.value = productInfo
        info.style = { font: F_PRODUCT, alignment: A_CENTER }

        /* --- PRODUCT OF TURKEY --- */
        sheet.mergeCells(r + 2, c + 8, r + 6, c + 9)
        const pot = sheet.getCell(r + 2, c + 8)
        pot.value = "PRODUCT\nOF\nTURKEY"
        pot.style = { font: F_HEADER, alignment: A_CENTER }

        /* --- r+7: FRAGILE | KGS --- */
        sheet.mergeCells(r + 7, c, r + 7, c + 7)
        const fragile = sheet.getCell(r + 7, c)
        fragile.value = '"FRAGILE"'
        fragile.style = { font: F_TITLE, alignment: A_CENTER }

        sheet.mergeCells(r + 7, c + 8, r + 7, c + 9)
        const kgs = sheet.getCell(r + 7, c + 8)
        /* Python: f"{int(item['Ton'])} KGS" -- tam sayiya KIRPIYOR. */
        kgs.value = `${Math.trunc(nc(item.Ton))} KGS`
        kgs.style = { font: F_HEADER, alignment: A_CENTER }

        /* --- r+8: WARNING basligi --- */
        sheet.mergeCells(r + 8, c, r + 8, c + 9)
        const warnHead = sheet.getCell(r + 8, c)
        warnHead.value = WARNING_TITLE
        warnHead.style = { font: F_WARN_TITLE, alignment: A_LEFT }

        /* --- r+9: uyari metni + sabit satir yuksekligi --- */
        sheet.mergeCells(r + 9, c, r + 9, c + 9)
        const warnBody = sheet.getCell(r + 9, c)
        warnBody.value = WARNING_BODY
        warnBody.style = { font: F_SMALL, alignment: A_LEFT_TOP }

        /*
         * Python: sayfa.row_dimensions[r+9].height = 45
         * Metnin kesilmemesi icin elle sabitleniyor.
         */
        sheet.getRow(r + 9).height = 45

        /* --- r+10: NO CLAIMS --- */
        sheet.mergeCells(r + 10, c, r + 10, c + 9)
        const claims = sheet.getCell(r + 10, c)
        claims.value = NO_CLAIMS
        claims.style = { font: F_HEADER, alignment: A_CENTER }

        /*
         * Cerceve: Python 11 satir x 10 sutunun HEPSINE kenarlik
         * veriyor (birlesik alanlarin ici dahil) ve bunu en SONDA
         * yapiyor. Sira korundu -- stil atamalari birlestirmelerden
         * sonra geldigi icin mevcut stiller EZILMEMELI, o yuzden
         * restyle (yayarak) kullaniliyor.
         */
        for (let rr = r; rr <= r + 10; rr++) {
          for (let cc = c; cc <= c + 9; cc++) {
            restyle(sheet.getCell(rr, cc), { border: THIN })
          }
        }
      })

      /*
       * Sutun genislikleri: Python 1..20 arasindaki TUM sutunlara 11
       * veriyor (iki etiket sutunu x 10).
       */
      for (let col = 1; col <= COLS_PER_LABEL * 2; col++) {
        sheet.getColumn(col).width = 11
      }
    },
  )

  /* Python GET'i 'kasa_etiketleri.xlsx' adiyla servis ediyor. */
  return sendXlsxBuffer(event, buffer, "kasa_etiketleri.xlsx")
})
