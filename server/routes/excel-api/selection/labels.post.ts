/*
 * Excel sunucusundaki `/seleksiyon/etiket/excel` ucunun Nitro
 * karsiligi (seleksiyon kasa etiketleri).
 *
 * Cagri yeri:
 *   app/components/selection/input/Panel.vue -> ticket_click_excel()
 *
 * ---------------------------------------------------------------------
 * KAYNAK (okundu)
 * ---------------------------------------------------------------------
 *   web.py:3080  SeleksiyonUrunEtiketApi
 *   web.py:2750  post -> ExcellCiktiIslem().seleksiyon_listesi_excel(data)
 *                get  -> send_file('excel/dosyalar/seleksiyon_etiket.xlsx')
 *   web.py:607   seleksiyon_listesi_excel  <-- govde burada
 *
 * Sablon: excel/sablonlar/seleksiyon_etiket.xlsx, sayfa **'Sheet'**.
 *
 * ---------------------------------------------------------------------
 * DUZEN: ETIKET BASINA 9 SATIR, TEK KOLON
 * ---------------------------------------------------------------------
 * Her etiket 8 satir kullaniyor, adim 9 (arada bir satir bosluk).
 * Sutunlar her zaman A..E (kaynakta `column` degiskeni 1'de sabit).
 *
 *   satir    A: "CASE NO:"  (kalin, ortali)
 *            B: KasaNo      (36 punto kalin, ortali) -- B:D BIRLESIK
 *            E: "DESTINATION" (kalin, ortali)
 *   satir+1  A: "STATUS: "  (kalin, ortali)  [sondaki BOSLUK kaynakta]
 *            B: "STOK"      (36 punto kalin) -- B:D BIRLESIK
 *            E: "TR"        (14 punto kalin)
 *   satir+2  A..E BIRLESIK (satir+7'ye kadar): urun bilgisi,
 *            24 punto kalin, ortali + SATIR KAYDIRMALI
 *
 * Ayrica kaynak A ve E sutunlarinin satir+2..satir+7 hucrelerine ve
 * satir+7'nin B, C, D hucrelerine TEK TEK kenarlik veriyor (bir kismi
 * birlesik alanin icinde kalip gorunmuyor) -- birebir korundu.
 *
 * ---------------------------------------------------------------------
 * SABIT DEGERLER
 * ---------------------------------------------------------------------
 * "STOK" ve "TR" kaynakta SABIT yazili; govdeden gelmiyor. Yani etiket
 * her zaman "STOK" durumu ve "TR" hedefi gosteriyor.
 *
 * ---------------------------------------------------------------------
 * BOS DEGER DAVRANISI -- PYTHON'DAN FARK
 * ---------------------------------------------------------------------
 * Python urun metnini `i['KategoriAdi'] + ' / ' + ...` ile kuruyor;
 * metin alanlarindan biri bos ise TypeError firlatip ucun TAMAMINI
 * dusuruyor (istemci kontrol etmedigi icin kullanici SABLON KOPYASINI
 * indiriyor). Sayi alanlari ise `str(...)` ile donusuyor, yani bos
 * olanlar etikete LITERAL "None" olarak basiliyordu.
 *
 * Burada bos alanlar BOS DIZGE sayiliyor: rapor uretiliyor ve etikette
 * "None" yazmiyor.
 */

interface SelectionLabel {
  KasaNo?: string | number | null
  KategoriAdi?: string | null
  UrunAdi?: string | null
  YuzeyIslemAdi?: string | null
  En?: string | number | null
  Boy?: string | number | null
  Kenar?: string | number | null
  Adet?: number | null
  Miktar?: number | null
  UrunBirimAdi?: string | null
}

/* Python'daki Alignment(horizontal="center", vertical="center") */
const CENTER_PLAIN = { horizontal: "center", vertical: "middle" } as const
const CENTER_WRAP = { horizontal: "center", vertical: "middle", wrapText: true } as const

const BOLD_PLAIN = { bold: true } as const
const BOLD_36 = { size: 36, bold: true } as const
const BOLD_24 = { size: 24, bold: true } as const
const BOLD_14 = { size: 14, bold: true } as const

export default defineEventHandler(async (event) => {
  const items = requireList<SelectionLabel>(await readBody(event))

  const buffer = await fillTemplate(
    { template: "seleksiyon_etiket.xlsx", sheetName: "Sheet" },
    (sheet) => {
      let satir = 1

      /** Bos degeri "" yapar; Python'daki str()'in "None" uretmesini onler. */
      const t = (v: unknown) => (v == null ? "" : String(v))

      for (const item of items) {
        /* --- satir: CASE NO / kasa no / DESTINATION --- */
        const caseNo = sheet.getCell(satir, 1)
        caseNo.value = "CASE NO:"
        caseNo.style = { border: THIN, font: BOLD_PLAIN, alignment: CENTER_PLAIN }

        sheet.mergeCells(satir, 2, satir, 4)
        const caseValue = sheet.getCell(satir, 2)
        caseValue.value = (item.KasaNo ?? null) as never
        caseValue.style = { border: THIN, font: BOLD_36, alignment: CENTER_PLAIN }

        /* Birlesik alanin ic hucrelerine de kenarlik (kaynakta var). */
        sheet.getCell(satir, 3).style = { border: THIN }
        sheet.getCell(satir, 4).style = { border: THIN }

        const destination = sheet.getCell(satir, 5)
        destination.value = "DESTINATION"
        destination.style = { border: THIN, font: BOLD_PLAIN, alignment: CENTER_PLAIN }

        /* --- satir+1: STATUS / STOK / TR --- */
        const status = sheet.getCell(satir + 1, 1)
        /* Sondaki BOSLUK kaynakta var: 'STATUS: ' */
        status.value = "STATUS: "
        status.style = { border: THIN, font: BOLD_PLAIN, alignment: CENTER_PLAIN }

        sheet.mergeCells(satir + 1, 2, satir + 1, 4)
        const stock = sheet.getCell(satir + 1, 2)
        stock.value = "STOK"
        stock.style = { border: THIN, font: BOLD_36, alignment: CENTER_PLAIN }

        sheet.getCell(satir + 1, 3).style = { border: THIN }
        sheet.getCell(satir + 1, 4).style = { border: THIN }

        const country = sheet.getCell(satir + 1, 5)
        country.value = "TR"
        country.style = { border: THIN, font: BOLD_14, alignment: CENTER_PLAIN }

        /*
         * --- satir+2..satir+7: urun bilgisi ---
         *
         * Python'daki birlesik dizge (web.py:662) BIREBIR:
         *   KategoriAdi / UrunAdi / YuzeyIslemAdi / EnxBoyxKenar /
         *   Adet pcs / Miktar UrunBirimAdi
         * Olcu ucluSU arasinda BOSLUK YOK ("70,0x70,0x2,0"), digerlerinde
         * " / " ayirici var.
         */
        const productName =
          `${t(item.KategoriAdi)} / ${t(item.UrunAdi)} / ${t(item.YuzeyIslemAdi)} / ` +
          `${t(item.En)}x${t(item.Boy)}x${t(item.Kenar)} / ` +
          `${t(item.Adet)} pcs / ${t(item.Miktar)} ${t(item.UrunBirimAdi)}`

        sheet.mergeCells(satir + 2, 1, satir + 7, 5)
        const product = sheet.getCell(satir + 2, 1)
        product.value = productName
        product.style = { border: THIN, font: BOLD_24, alignment: CENTER_WRAP }

        /*
         * A ve E sutunlarinin satir+2..satir+7 hucreleri + satir+7'nin
         * B, C, D hucreleri.
         *
         * BURADA restyle ZORUNLU, TAM ATAMA DEGIL: dongunun ilk adimi
         * (satir+2, A) birlesik alanin MASTER hucresi, yani urun
         * bilgisinin yazildigi yer. Tam atama yapilirsa 24 punto kalin
         * + satir kaydirmali stil EZILIYOR ve metin varsayilan bicime
         * dusuyor -- olculdu: A3/A12/A21 hucrelerinde 3 stil farki.
         *
         * Python `cell.border = thin_border` dedigINde mevcut stili
         * KORUYUP yalnizca kenarligi degistiriyor; restyle onun
         * karsiligi.
         */
        for (let rr = satir + 2; rr <= satir + 7; rr++) {
          restyle(sheet.getCell(rr, 1), { border: THIN })
          restyle(sheet.getCell(rr, 5), { border: THIN })
        }

        for (const col of [2, 3, 4]) {
          restyle(sheet.getCell(satir + 7, col), { border: THIN })
        }

        /* Python: satir += 9 -- etiketler arasinda bir satir bosluk. */
        satir += 9
      }
    },
  )

  return sendXlsxBuffer(event, buffer, "seleksiyon_etiket.xlsx")
})
