/*
 * Excel sunucusundaki `/finance/reports/test/excel` ucunun Nitro
 * karsiligi (finans test listesi -- Mekmar + Imperial Homes).
 *
 * Cagri yerleri (2):
 *   app/pages/finance/index.vue                 -> excel_output()
 *   app/pages/reports/mekmar/filter-finance.vue -> excel_output()
 *
 * ---------------------------------------------------------------------
 * KAYNAK (okundu, tahmin degil)
 * ---------------------------------------------------------------------
 *   web.py:3046                      FinanceTestListExcelApi
 *   component/finance/finance.py:116 post -> getExcelList(data)
 *                                    get  -> send_file(
 *                                      'excel/dosyalar/finans_test_list.xlsx')
 *   component/finance/list.py:474    getExcelList  <-- govde burada
 *
 * Python govdesi, birebir:
 *   shutil.copy2('excel/sablonlar/finans_test_list.xlsx', target)
 *   sayfa = kitap.get_sheet_by_name('Sayfa1');  satir = 2
 *   new_list = sorted(data_list, key=lambda x: x['balanced'], reverse=True)
 *   her satir:  col1 customer_name
 *               col2 total_order_amount   col3 production
 *               col4 forwarding           col5 paid
 *               col6 advanced_payment     col7 total
 *               col8 balanced             (col2..8 __noneControl'dan gecer)
 *   son satir:  col1 'Total', col2..8 = ilgili sutunun toplami,
 *               HEPSINE thin_border
 *
 * Veritabanina GITMIYOR; liste govdeden geliyor (kaynagi
 * server/routes/finance-api/reports/test.get.ts).
 *
 * ---------------------------------------------------------------------
 * BASLIK VE STILLER SABLONDAN
 * ---------------------------------------------------------------------
 * Turuncu baslik zemini (FFCC6600), beyaz kalin yazi, sutun
 * genislikleri ve "[$$-409]#,##0.00" para bicimi SABLONUN icinde;
 * Python onlara dokunmuyor, biz de dokunmuyoruz. Gerekcesi ve bu
 * yaklasima nasil gecildigi: server/utils/xlsx-template.ts
 *
 * Tek elle verilen stil, Python'daki gibi toplam satirinin kenarligi.
 */

interface FinanceRow {
  customer_name?: string | null
  total_order_amount?: number | null
  production?: number | null
  forwarding?: number | null
  paid?: number | null
  advanced_payment?: number | null

  /*
   * SON IKI SUTUN VE SIRALAMA ANAHTARI GOVDEDEN GELIYOR, sunucuda
   * HESAPLANMIYOR -- Python col7'ye item['total'], col8'e
   * item['balanced'] yaziyor ve siralamayi item['balanced'] ile
   * yapiyor.
   *
   * Ilk surumum bunlari `production + forwarding - paid` ve
   * `forwarding - paid` olarak YENIDEN HESAPLIYORDU. 22 satirlik
   * uretim karsilastirmasinda (8'i production != 0) birebir tutmustu,
   * cunku `balanced` istemcide zaten `forwarding - paid` olarak
   * atiliyor (stores/finance.ts:984). Ama formulu burada tekrarlamak
   * kirilgan: finans raporunda `total`in tanimi degisirse Excel
   * ciktisi ekrandaki tablodan SESSIZCE sapardi.
   */
  total?: number | null
  balanced?: number | null
}

/*
 * Govdede alan yoksa formule dusuluyor.
 *
 * Python'da yedek YOK: alan eksikse KeyError firlar, except yakalar,
 * uc {"status": false} doner -- ve istemci bunu kontrol etmedigi icin
 * kullanici ESKI dosyayi indirirdi. Burada eksik alan sessiz bozulma
 * yerine ekrandakiyle ayni degere cozuluyor.
 */
const totalOf = (r: FinanceRow) =>
  r.total != null ? nc(r.total) : nc(r.production) + nc(r.forwarding) - nc(r.paid)

const balancedOf = (r: FinanceRow) =>
  r.balanced != null ? nc(r.balanced) : nc(r.forwarding) - nc(r.paid)

export default defineEventHandler(async (event) => {
  const rows = requireList<FinanceRow>(await readBody(event))

  /* Python: sorted(data_list, key=lambda x: x['balanced'], reverse=True) */
  const sorted = [...rows].sort((a, b) => balancedOf(b) - balancedOf(a))

  const buffer = await fillTemplate(
    { template: "finans_test_list.xlsx", sheetName: "Sayfa1" },
    (sheet) => {
      /* Python: satir = 2 (1. satir sablondaki baslik) */
      let satir = 2

      const totals = [0, 0, 0, 0, 0, 0, 0]

      for (const item of sorted) {
        const values = [
          nc(item.total_order_amount),
          nc(item.production),
          nc(item.forwarding),
          nc(item.paid),
          nc(item.advanced_payment),
          totalOf(item),
          balancedOf(item),
        ]

        sheet.getCell(satir, 1).value = item.customer_name ?? null
        values.forEach((v, i) => {
          sheet.getCell(satir, i + 2).value = v
          totals[i] += v
        })

        satir += 1
      }

      /*
       * Toplam satiri. Python toplamlari DONGU ICINDE biriktiriyor,
       * yani siralanmis listenin sirasiyla -- kayan nokta sonucu
       * sıraya bagli oldugu icin burada da ayni sira kullaniliyor
       * (yukaridaki `totals[i] += v`). Yuvarlama YAPILMIYOR:
       * uretim ciktisinda da 275009.7699999998 gibi artiklar var.
       */
      sheet.getCell(satir, 1).value = "Total"
      restyle(sheet.getCell(satir, 1), { border: THIN })

      totals.forEach((t, i) => {
        const cell = sheet.getCell(satir, i + 2)
        cell.value = t
        restyle(cell, { border: THIN })
      })
    },
  )

  return sendXlsxBuffer(event, buffer, "finans_test_list.xlsx")
})
