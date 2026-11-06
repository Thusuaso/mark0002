/*
 * Excel sunucusundaki `/raporlar/listeler/stokRaporExcelListe` ucunun
 * Nitro karsiligi (Mekmer stok raporu).
 *
 * Cagri yeri:
 *   app/pages/reports/mekmer/stock.vue -> excel_output()
 *
 * ---------------------------------------------------------------------
 * KAYNAK (okundu)
 * ---------------------------------------------------------------------
 *   web.py:3052            StokRaporExcelApi
 *   component/excel.py:444 stok_rapor_ciktisi  <-- govde burada
 *
 * Sablon: excel/sablonlar/Stok_listesi.xlsx, sayfa 'Sayfa1'.
 *
 * ---------------------------------------------------------------------
 * BASLIKLAR SABLONDAN DEGIL, KODDAN
 * ---------------------------------------------------------------------
 * Bu uc basliklari satir 1'e KENDI yaziyor (digerlerinin cogu
 * sablondan aliyor):
 *   1 Category  2 Selection  3 Surface  4 W  5 L  6 Thickness
 *   7 M2        8 Crate Amount
 *
 * Baslik bicimi (Python):
 *   dolgu : PatternFill(solid, 'FF' + CC6600) -> FFCC6600
 *           Renk kodu kaynakta rgb=[204,102,0] listesinden
 *           hesaplaniyor; sonuc CC6600.
 *   yazi  : Font(bold=True, size=16)  -- ad VERILMEMIS, renk
 *           VERILMEMIS; openpyxl varsayilanlarini kullaniyor.
 *   kenarlik: YOK (baslik satirina kenarlik uygulanmiyor)
 *
 * Veri satirlari (satir 2'den, HEPSINE thin_border):
 *   1 KategoriAdi  2 UrunAdi  3 YuzeyIslemAdi  4 En
 *   5 Boy          6 Kenar    7 Toplam         8 KasaSayisi
 *
 * TOPLAM SATIRI YOK.
 *
 * Veritabanina GITMIYOR; liste govdeden geliyor.
 *
 * NOT -- kaynakta her baslik hucresi IKI KEZ yaziliyor
 * (`sayfa.cell(...,value='Category').fill=...` ve hemen ardindan
 * `sayfa.cell(...,value='Category').font=...`). Ayni hucreye iki ayri
 * erisim; sonuc tek hucre. Burada tek seferde yazildi.
 */

const HEADERS = [
  "Category",
  "Selection",
  "Surface",
  "W",
  "L",
  "Thickness",
  "M2",
  "Crate Amount",
] as const

interface StockRow {
  KategoriAdi?: string | null
  UrunAdi?: string | null
  YuzeyIslemAdi?: string | null
  En?: string | number | null
  Boy?: string | number | null
  Kenar?: string | number | null
  Toplam?: number | null
  KasaSayisi?: number | null
}

export default defineEventHandler(async (event) => {
  const rows = requireList<StockRow>(await readBody(event))

  const buffer = await fillTemplate(
    { template: "Stok_listesi.xlsx", sheetName: "Sayfa1" },
    (sheet) => {
      /* --- baslik satiri: dolgu + kalin 16, KENARLIK YOK --- */
      HEADERS.forEach((text, i) => {
        const cell = sheet.getCell(1, i + 1)
        cell.value = text
        cell.style = {
          font: { bold: true, size: 16 },
          fill: {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFCC6600" },
            bgColor: { argb: "FFCC6600" },
          },
        }
      })

      /* --- veri satirlari --- */
      let satir = 2

      for (const item of rows) {
        const values = [
          item.KategoriAdi ?? null,
          item.UrunAdi ?? null,
          item.YuzeyIslemAdi ?? null,
          item.En ?? null,
          item.Boy ?? null,
          item.Kenar ?? null,
          item.Toplam ?? null,
          item.KasaSayisi ?? null,
        ]

        values.forEach((v, i) => {
          const cell = sheet.getCell(satir, i + 1)
          cell.value = v as never
          borderOnly(cell)
        })

        satir += 1
      }
    },
  )

  return sendXlsxBuffer(event, buffer, "Stok_listesi.xlsx")
})
