/*
 * Excel sunucusundaki `/reports/excel/loading` ucunun Nitro karsiligi
 * (Mekmar yukleme raporu).
 *
 * Cagri yeri:
 *   app/pages/reports/mekmar/loading.vue -> excel_output()
 *
 * ---------------------------------------------------------------------
 * KAYNAK (okundu)
 * ---------------------------------------------------------------------
 *   web.py:3108   ReportsProductLoadingApi
 *   web.py:2856   post -> ExcellCiktiIslem().loading_excel_list(data)
 *                 get  -> send_file('excel/dosyalar/loading_excel_list.xlsx')
 *   web.py:1564   loading_excel_list  <-- govde burada
 *
 * Sablon: excel/sablonlar/loading_excel_list.xlsx, sayfa 'Sayfa1',
 * satir 2'den. Basliklar sablondan.
 *
 * Veri satirlari (Python, col 1..5, HEPSINE thin_border):
 *   1 _dateConvert(YuklemeTarihi)   2 MusteriAdi   3 SiparisNo
 *   4 Fob                           5 Dtp
 *
 * Toplam satiri (Python):
 *   col1 'Total'  -> ortali, kenarlikli, kalin 13, defb00 zemin
 *                    ve A{satir}:C{satir} BIRLESTIRILMIS
 *   col4 fob_total, col5 ddp_total -> kenarlik + kalin 13 + defb00
 *   (col2 ve col3 birlestirmenin icinde kaldigi icin yazilmiyor)
 *
 * Veritabanina GITMIYOR; liste govdeden geliyor.
 *
 * NOT -- SUTUN ADI 'Dtp': kaynakta boyle yaziyor (DDP'nin yazim
 * hatasi gorunuyor) ama toplam degiskeni `ddp_total`. Govde alani
 * oldugu icin KORUNDU; degistirmek istemciyi kirardi.
 */

interface LoadingRow {
  YuklemeTarihi?: string | null
  MusteriAdi?: string | null
  SiparisNo?: string | null
  Fob?: number | null
  Dtp?: number | null
}

export default defineEventHandler(async (event) => {
  const rows = requireList<LoadingRow>(await readBody(event))

  const buffer = await fillTemplate(
    { template: "loading_excel_list.xlsx", sheetName: "Sayfa1" },
    (sheet) => {
      let satir = 2

      let fobTotal = 0
      let ddpTotal = 0

      for (const item of rows) {
        sheet.getCell(satir, 1).value = dateConvert(item.YuklemeTarihi)
        sheet.getCell(satir, 2).value = item.MusteriAdi ?? null
        sheet.getCell(satir, 3).value = item.SiparisNo ?? null
        sheet.getCell(satir, 4).value = item.Fob ?? null
        sheet.getCell(satir, 5).value = item.Dtp ?? null

        /*
         * borderOnly: bu sablonda bicim SUTUN duzeyinde
         * (<col min="4" max="5" style="1"/>), hucre duzeyinde degil.
         * restyle() sutun bicimini hucreye tasiyip Python'dan sapiyordu
         * -- gerekcesi ve olcum server/utils/xlsx-template.ts icinde.
         */
        for (let c = 1; c <= 5; c++) borderOnly(sheet.getCell(satir, c))

        fobTotal += nc(item.Fob)
        ddpTotal += nc(item.Dtp)

        satir += 1
      }

      /*
       * BIRLESTIRME ONCE, BICIMLENDIRME SONRA.
       *
       * exceljs birlestirme aninda master hucrenin O ANKI stilini
       * kole hucrelere kopyaliyor; openpyxl kopyalamiyor. Master once
       * bicimlendirilirse koleler de defb00 zemin + kalin 13 aliyor ve
       * dosya Python ciktisindan sapiyor (olculdu: B5/C5). Sirayi
       * tersine cevirmek koleleri sablon stilinde birakiyor.
       */
      sheet.mergeCells(satir, 1, satir, 3)
      totalCell(sheet.getCell(satir, 1), { center: true }).value = "Total"

      totalCell(sheet.getCell(satir, 4)).value = fobTotal
      totalCell(sheet.getCell(satir, 5)).value = ddpTotal
    },
  )

  return sendXlsxBuffer(event, buffer, "mekamer_loading_excel.xlsx")
})
