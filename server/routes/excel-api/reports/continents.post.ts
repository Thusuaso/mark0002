/*
 * Excel sunucusundaki `/maliyet/dosyalar/continent` ucunun Nitro
 * karsiligi (GU kita bazli siparis raporu).
 *
 * Cagri yeri:
 *   app/pages/reports/mekmar/continent-order.vue -> excel_output()
 *
 * ---------------------------------------------------------------------
 * KAYNAK (okundu)
 * ---------------------------------------------------------------------
 *   web.py:3113   ReportsGuContinentsApi
 *   web.py:2907   post -> ExcellCiktiIslem().gu_continents(data)
 *                 get  -> send_file('excel/dosyalar/continents.xlsx')
 *   web.py:2468   gu_continents  <-- govde burada
 *
 * Sablon: excel/sablonlar/continents.xlsx, sayfa 'Sayfa1'.
 *
 * ---------------------------------------------------------------------
 * DUZEN: YIL BLOKLARI YAN YANA (supplier-cost ile ayni kalip)
 * ---------------------------------------------------------------------
 * Govde `[{ year, data: [{ Continent, Fob, Ddp }] }]`; her yil UC
 * sutunluk bir blok, bloklar arasinda bir sutun bosluk
 * (Python: `column += 4`).
 *
 * Her blok (baslangic sutunu = column):
 *   satir 1  column   : item['year']
 *                       -> kenarlik + kalin 13 + ORTALI + defb00
 *   satir 2  column   : 'Continents' -> kenarlik + kalin 13 + ORTALI
 *            column+1 : 'Fob'        -> ayni
 *            column+2 : 'Ddp'        -> ayni   (ucunde DOLGU YOK)
 *   satir 3+ column   : Continent    -> sadece kenarlik
 *            column+1 : Fob          -> sadece kenarlik
 *            column+2 : Ddp          -> sadece kenarlik
 *   son satir column  : 'Total' -> kenarlik + kalin 13 + ORTALI + defb00
 *            column+1 : fob toplami -> kenarlik + kalin 13 + defb00
 *            column+2 : ddp toplami -> kenarlik + kalin 13 + defb00
 *
 * supplier-cost ile TEK yapisal fark: blok genisligi 3 sutun ve
 * ilerleme 4 sutun (orada 2 ve 3).
 *
 * Basliklar SABLONDAN GELMIYOR -- kod yaziyor.
 *
 * Veritabanina GITMIYOR; liste govdeden geliyor.
 *
 * NOT -- rota adi 'continent' (tekil) ama sablon/dosya 'continents';
 * kaynaktaki bu tutarsizlik korundu (rota adi istemciyi baglar).
 */

interface ContinentItem {
  Continent?: string | null
  Fob?: number | null
  Ddp?: number | null
}

interface ContinentBlock {
  year?: number | string | null
  data?: ContinentItem[] | null
}

export default defineEventHandler(async (event) => {
  const blocks = requireList<ContinentBlock>(await readBody(event))

  const buffer = await fillTemplate(
    { template: "continents.xlsx", sheetName: "Sayfa1" },
    (sheet) => {
      let column = 1

      for (const block of blocks) {
        let satir = 1

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
          [0, "Continents"],
          [1, "Fob"],
          [2, "Ddp"],
        ] as const) {
          const cell = sheet.getCell(satir, column + offset)
          cell.value = text
          cell.style = { border: THIN, font: BOLD_13, alignment: CENTER }
        }
        satir += 1

        let fob = 0
        let ddp = 0

        for (const item of block.data ?? []) {
          const values = [item.Continent ?? null, item.Fob ?? null, item.Ddp ?? null]

          values.forEach((v, offset) => {
            const cell = sheet.getCell(satir, column + offset)
            cell.value = v as never
            borderOnly(cell)
          })

          fob += nc(item.Fob)
          ddp += nc(item.Ddp)
          satir += 1
        }

        totalCell(sheet.getCell(satir, column), { center: true }).value = "Total"
        totalCell(sheet.getCell(satir, column + 1)).value = fob
        totalCell(sheet.getCell(satir, column + 2)).value = ddp

        /* Python: column += 4 */
        column += 4
      }
    },
  )

  return sendXlsxBuffer(event, buffer, "continents.xlsx")
})
