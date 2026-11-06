/*
 * Excel sunucusundaki `/reports/excel/supplier/cost` ucunun Nitro
 * karsiligi (GU tedarikci maliyet raporu).
 *
 * Cagri yeri:
 *   app/pages/reports/mekmar/supplier-cost.vue -> excel_output()
 *
 * ---------------------------------------------------------------------
 * KAYNAK (okundu)
 * ---------------------------------------------------------------------
 *   web.py:3112   ReportsGuSupplierCostApi
 *   web.py:2896   post -> ExcellCiktiIslem().gu_supplier_cost(data)
 *                 get  -> send_file('excel/dosyalar/supplier_cost.xlsx')
 *   web.py:2392   gu_supplier_cost  <-- govde burada
 *
 * Sablon: excel/sablonlar/supplier_cost.xlsx, sayfa 'Sayfa1'.
 *
 * ---------------------------------------------------------------------
 * DUZEN: YIL BLOKLARI YAN YANA
 * ---------------------------------------------------------------------
 * Govde `[{ year, data: [{ FirmaAdi, Total }] }]` seklinde ve her yil
 * iki sutunluk bir BLOK olarak SAGA DOGRU yaziliyor; bloklar arasinda
 * bir sutun bosluk var (Python: `column += 3`).
 *
 * Her blok (baslangic sutunu = column):
 *   satir 1  column   : item['year']
 *                       -> kenarlik + kalin 13 + ORTALI + defb00
 *   satir 2  column   : 'Supplier'   -> kenarlik + kalin 13 + ORTALI
 *            column+1 : 'Total'      -> kenarlik + kalin 13 + ORTALI
 *                       (bu ikisinde DOLGU YOK)
 *   satir 3+ column   : FirmaAdi     -> sadece kenarlik
 *            column+1 : Total        -> sadece kenarlik
 *   son satir column  : 'Total' -> kenarlik + kalin 13 + ORTALI + defb00
 *            column+1 : toplam -> kenarlik + kalin 13 + defb00
 *                       (toplam hucresi ORTALI DEGIL)
 *
 * Basliklar SABLONDAN GELMIYOR -- kod yaziyor; sablon bos bir sayfa.
 *
 * Veritabanina GITMIYOR; liste govdeden geliyor.
 */

interface SupplierCostItem {
  FirmaAdi?: string | null
  Total?: number | null
}

interface SupplierCostBlock {
  year?: number | string | null
  data?: SupplierCostItem[] | null
}

export default defineEventHandler(async (event) => {
  const blocks = requireList<SupplierCostBlock>(await readBody(event))

  const buffer = await fillTemplate(
    { template: "supplier_cost.xlsx", sheetName: "Sayfa1" },
    (sheet) => {
      let column = 1

      for (const block of blocks) {
        let satir = 1

        /* Yil basligi */
        const header = sheet.getCell(satir, column)
        header.value = (block.year ?? null) as never
        header.style = {
          border: THIN,
          font: BOLD_13,
          alignment: CENTER,
          fill: TOTAL_FILL,
        }
        satir += 1

        /* Sutun basliklari -- dolgu YOK */
        for (const [offset, text] of [
          [0, "Supplier"],
          [1, "Total"],
        ] as const) {
          const cell = sheet.getCell(satir, column + offset)
          cell.value = text
          cell.style = { border: THIN, font: BOLD_13, alignment: CENTER }
        }
        satir += 1

        let total = 0

        for (const item of block.data ?? []) {
          const name = sheet.getCell(satir, column)
          name.value = item.FirmaAdi ?? null
          borderOnly(name)

          const value = sheet.getCell(satir, column + 1)
          value.value = item.Total ?? null
          borderOnly(value)

          total += nc(item.Total)
          satir += 1
        }

        /* Blok toplami */
        totalCell(sheet.getCell(satir, column), { center: true }).value = "Total"
        totalCell(sheet.getCell(satir, column + 1)).value = total

        /* Python: column += 3 -- bloklar arasinda bir sutun bosluk */
        column += 3
      }
    },
  )

  return sendXlsxBuffer(event, buffer, "mekamer_supplier_cost_excel.xlsx")
})
