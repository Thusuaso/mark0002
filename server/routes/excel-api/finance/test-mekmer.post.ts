/*
 * Excel sunucusundaki `/finance/reports/test/excel/mekmer` ucunun Nitro
 * karsiligi (finans test listesi -- MEKMER suzulmus).
 *
 * Cagri yeri:
 *   app/pages/reports/mekmer/finance.vue -> excel_output()
 *
 * ---------------------------------------------------------------------
 * KAYNAK (okundu, tahmin degil)
 * ---------------------------------------------------------------------
 *   web.py:3047                      FinanceTestListExcelApiFilter
 *   component/finance/finance.py:129 post -> getExcelListMekmerFilter(data)
 *   component/finance/list.py:536    getExcelListMekmerFilter
 *
 * Python govdesi, birebir:
 *   shutil.copy2('excel/sablonlar/finans_test_list.xlsx', target)
 *   sayfa = kitap.get_sheet_by_name('Sayfa1');  satir = 2
 *   new_list = sorted(data_list,
 *                     key=lambda x: x['totalExceptProduction'],
 *                     reverse=True)
 *   her satir:  col1 customer_name
 *               col2 total_order_amount   col3 production
 *               col4 forwarding           col5 paid
 *               col6 advanced_payment     col7 total
 *               col8 totalExceptProduction
 *   dongu bitince dogrudan kaydediyor.
 *
 * ---------------------------------------------------------------------
 * KARDES UCTAN UC FARK -- BIRLESTIRILMEMESININ SEBEBI
 * ---------------------------------------------------------------------
 * `/finance/reports/test/excel` (./test.post.ts) ile sablon ve sutun
 * duzeni AYNI, ama:
 *
 *   1) SIRALAMA ANAHTARI: orada `balanced`, burada
 *      `totalExceptProduction`.
 *   2) 8. SUTUN: orada `balanced`, burada `totalExceptProduction`.
 *   3) TOPLAM SATIRI: orada VAR, burada YOK. Python'un bu
 *      fonksiyonunda toplam biriktirme ve 'Total' hucresi hic yok.
 *
 * ---------------------------------------------------------------------
 * ESKI SOZLESMENIN EN SOMUT KUSURU BU IKI UCTA GORUNUYOR
 * ---------------------------------------------------------------------
 * Iki uc AYNI dosyaya yaziyor ve AYNI dosyadan okuyor
 * (component/finance/finance.py:116 ve :129 -- ikisi de
 * 'excel/dosyalar/finans_test_list.xlsx'). Yani Mekmar raporu alan bir
 * kullanici ile Mekmer raporu alan baska bir kullanici BIRBIRININ
 * dosyasini eziyor; farkli iki rapor, tek dosya. Nitro tarafinda cikti
 * istege ozel, diske hic yazilmiyor.
 *
 * Baslik ve stiller sablondan geliyor; gerekcesi
 * server/utils/xlsx-template.ts icinde.
 */

interface MekmerFinanceRow {
  customer_name?: string | null
  total_order_amount?: number | null
  production?: number | null
  forwarding?: number | null
  paid?: number | null
  advanced_payment?: number | null
  total?: number | null

  /* Python'da hem 8. sutun hem siralama anahtari. */
  totalExceptProduction?: number | null
}

/*
 * Govdede alan yoksa formule dusuluyor. Python'da yedek YOK: eksik
 * alan KeyError firlatir, except yakalar, uc {"status": false} doner --
 * istemci bunu kontrol etmedigi icin kullanici ESKI dosyayi indirirdi.
 */
const totalOf = (r: MekmerFinanceRow) =>
  r.total != null ? nc(r.total) : nc(r.production) + nc(r.forwarding) - nc(r.paid)

const exceptProductionOf = (r: MekmerFinanceRow) =>
  r.totalExceptProduction != null
    ? nc(r.totalExceptProduction)
    : nc(r.forwarding) - nc(r.paid)

export default defineEventHandler(async (event) => {
  const rows = requireList<MekmerFinanceRow>(await readBody(event))

  /* Python: key=lambda x: x['totalExceptProduction'], reverse=True */
  const sorted = [...rows].sort((a, b) => exceptProductionOf(b) - exceptProductionOf(a))

  const buffer = await fillTemplate(
    { template: "finans_test_list.xlsx", sheetName: "Sayfa1" },
    (sheet) => {
      let satir = 2

      for (const item of sorted) {
        sheet.getCell(satir, 1).value = item.customer_name ?? null
        sheet.getCell(satir, 2).value = nc(item.total_order_amount)
        sheet.getCell(satir, 3).value = nc(item.production)
        sheet.getCell(satir, 4).value = nc(item.forwarding)
        sheet.getCell(satir, 5).value = nc(item.paid)
        sheet.getCell(satir, 6).value = nc(item.advanced_payment)
        sheet.getCell(satir, 7).value = totalOf(item)
        sheet.getCell(satir, 8).value = exceptProductionOf(item)

        satir += 1
      }

      /* Toplam satiri YOK -- Python'da da yok. */
    },
  )

  return sendXlsxBuffer(event, buffer, "finans_test_list.xlsx")
})
