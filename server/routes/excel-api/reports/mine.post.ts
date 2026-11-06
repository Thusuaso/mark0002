/*
 * Excel sunucusundaki `/reports/excel/mine` ucunun Nitro karsiligi
 * (Mekmer ocak/maden raporu).
 *
 * Cagri yeri:
 *   app/pages/reports/mekmer/mine.vue -> excel_output()
 *
 * ---------------------------------------------------------------------
 * KAYNAK (okundu)
 * ---------------------------------------------------------------------
 *   web.py:3107            ReportsProductMineApi
 *   web.py:2846            post -> ExcellCiktiIslem().mine_excel_list(data)
 *                          get  -> send_file('excel/dosyalar/mine_excel.xlsx')
 *   web.py:1487            mine_excel_list  <-- govde burada
 *
 * Sablon: excel/sablonlar/mine_excel.xlsx, sayfa 'Sayfa1', satir 2'den.
 * Basliklar sablondan: Mine | M2 | MT | Piece | Crate Piece
 *
 * Veri satirlari (Python, col 1..5, HEPSINE thin_border):
 *   1 OcakAdi   2 M2   3 MT   4 Adet   5 KasaAdedi
 *
 * Veritabanina GITMIYOR; liste govdeden geliyor.
 *
 * =====================================================================
 * [FIX] PYTHON'DA TOPLAM SATIRINDA IKI SUTUN YER DEGISTIRMIS
 * =====================================================================
 * Python (web.py:1536-1539):
 *
 *     amount_cell = sayfa.cell(satir, column=2, value=m2_total)
 *     piece_cell  = sayfa.cell(satir, column=3, value=piece_total)   # <-- MT sutunu
 *     m2_cell     = sayfa.cell(satir, column=4, value=mt_total)      # <-- Piece sutunu
 *     crate_cell  = sayfa.cell(satir, column=5, value=crate_total)
 *
 * Veri satirlarinda 3. sutun MT, 4. sutun Adet(Piece). Ama toplam
 * satirinda 3. sutuna ADET toplami, 4. sutuna MT toplami yaziliyor --
 * yani MT ve Piece toplamlari TERS.
 *
 * URETIMDE DOGRULANDI (bu makineden iki satirlik ornek POST edildi):
 *   girdi:  M2 100.5 / 200.75,  MT 10.25 / null,  Adet 4 / 6,  Kasa 2 / 3
 *   Python toplam satiri:  ["Total", 301.25, 10, 10.25, 5]
 *                                            ^^   ^^^^^
 *   MT basligi altinda 10 (= 4+6, ADET toplami)
 *   Piece basligi altinda 10.25 (= 10.25+0, MT toplami)
 *
 * Yani uretimdeki raporda bu iki toplam yillardir yanlis yerde.
 * Projedeki yerlesik karar (bkz. server/utils/cost-report.ts
 * [FIX-1..6]) Python hatalarini TASIMAMAK; burada da DUZELTILDI:
 * her toplam kendi sutununda.
 *
 * [!] GORUNUR DEGISIKLIK: bu raporda MT ve Piece toplamlari artik
 *     dogru sutunda cikacak, yani eski dosyalardan farkli olacak.
 *     Istenirse hatali davranis geri alinabilir ama dogru olan bu.
 */

interface MineRow {
  OcakAdi?: string | null
  M2?: number | null
  MT?: number | null
  Adet?: number | null
  KasaAdedi?: number | null
}

export default defineEventHandler(async (event) => {
  const rows = requireList<MineRow>(await readBody(event))

  const buffer = await fillTemplate(
    { template: "mine_excel.xlsx", sheetName: "Sayfa1" },
    (sheet) => {
      let satir = 2

      let m2Total = 0
      let mtTotal = 0
      let pieceTotal = 0
      let crateTotal = 0

      for (const item of rows) {
        /*
         * Python ham degeri yaziyor (__noneControl'dan GECIRMIYOR),
         * yani null hucre BOS kaliyor -- toplamlarda ise 0 sayiliyor.
         * Bu ayrim korundu: ornek ciktida MT'si null olan satirin
         * hucresi bos geldi, toplam ise etkilenmedi.
         */
        sheet.getCell(satir, 1).value = item.OcakAdi ?? null
        sheet.getCell(satir, 2).value = item.M2 ?? null
        sheet.getCell(satir, 3).value = item.MT ?? null
        sheet.getCell(satir, 4).value = item.Adet ?? null
        sheet.getCell(satir, 5).value = item.KasaAdedi ?? null

        for (let c = 1; c <= 5; c++) restyle(sheet.getCell(satir, c), { border: THIN })

        m2Total += nc(item.M2)
        mtTotal += nc(item.MT)
        pieceTotal += nc(item.Adet)
        crateTotal += nc(item.KasaAdedi)

        satir += 1
      }

      totalCell(sheet.getCell(satir, 1), { center: true }).value = "Total"

      /* [FIX] Her toplam KENDI sutununda -- Python'da 3 ve 4 tersti. */
      totalCell(sheet.getCell(satir, 2)).value = m2Total
      totalCell(sheet.getCell(satir, 3)).value = mtTotal
      totalCell(sheet.getCell(satir, 4)).value = pieceTotal
      totalCell(sheet.getCell(satir, 5)).value = crateTotal
    },
  )

  return sendXlsxBuffer(event, buffer, "mekamer_mine_excel.xlsx")
})
