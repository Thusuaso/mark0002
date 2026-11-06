/*
 * Excel sunucusundaki `/reports/mekmar/ayo/cost/excel` ucunun Nitro
 * karsiligi (AYO masraf raporu -- ALTI SAYFALI).
 *
 * Cagri yeri:
 *   app/pages/reports/mekmar/ayo.vue -> (ic ice uc cagrinin sonunda)
 *
 * ---------------------------------------------------------------------
 * KAYNAK (okundu)
 * ---------------------------------------------------------------------
 *   web.py:3095            AyoCostExcelApi
 *   component/excel.py:797 getAyoCostExcel  <-- govde burada
 *
 * Sablon: excel/sablonlar/ayo_cost_excel.xlsx -- ALTI sayfa.
 *
 * ---------------------------------------------------------------------
 * GOVDE ANAHTARI -> SAYFA ADI ESLEMESI
 * ---------------------------------------------------------------------
 *   credit  -> 'creditcard'
 *   travel  -> 'travel'
 *   wage    -> 'wage'
 *   sample  -> 'sample'
 *   other   -> 'fuil'      <-- [!] ESLESMIYOR
 *   meal    -> 'meal'
 *
 * [!] `other` anahtari 'fuil' adli sayfaya yaziliyor ("fuel"in yazim
 *     hatasi gorunuyor). Sayfa adi SABLONUN ICINDE oldugu icin
 *     degistirilemez; esleme kaynaktan birebir alindi.
 *
 * Her sayfanin duzeni AYNI (Python altı kez kopyalanmis):
 *   satir 2'den: col1 month, col2 value, col3 usd, col4 currency
 *   son satir  : col2 = value toplami, col3 = usd toplami
 *                (col1 ve col4 toplam satirinda BOS)
 *
 * Python HIC stil uygulamiyor; tum bicim sablondan geliyor.
 *
 * ---------------------------------------------------------------------
 * BOS DEGER DAVRANISI -- PYTHON'DAN FARK
 * ---------------------------------------------------------------------
 * Python `credit_tl += item['value']` yapiyor; bos deger TypeError
 * firlatip ucun TAMAMINI dusuruyor ve istemci govdedeki status'u
 * kontrol etmedigi icin kullanici SABLON KOPYASINI (bos rapor)
 * indiriyor. Burada bos degerler 0 sayiliyor.
 */

interface CostRow {
  month?: string | number | null
  value?: number | null
  usd?: number | null
  currency?: number | null
}

interface AyoCostBody {
  credit?: CostRow[] | null
  travel?: CostRow[] | null
  wage?: CostRow[] | null
  sample?: CostRow[] | null
  other?: CostRow[] | null
  meal?: CostRow[] | null
}

/* Govde anahtari -> sablon sayfa adi (kaynaktan birebir). */
const SHEETS: [keyof AyoCostBody, string][] = [
  ["credit", "creditcard"],
  ["travel", "travel"],
  ["wage", "wage"],
  ["sample", "sample"],
  ["other", "fuil"],
  ["meal", "meal"],
]

export default defineEventHandler(async (event) => {
  const body = requireObject<AyoCostBody>(await readBody(event))

  const buffer = await fillTemplate(
    /* Birincil sayfa yalnizca dogrulama icin; yazim writerFor ile. */
    { template: "ayo_cost_excel.xlsx", sheetName: "creditcard" },
    async (_sheet, _book, _write, writerFor) => {
      for (const [key, sheetName] of SHEETS) {
        const write = await writerFor(sheetName)
        const rows = body[key] ?? []

        let satir = 2
        let totalTl = 0
        let totalUsd = 0

        for (const item of rows) {
          write(satir, 1, item.month ?? null)
          write(satir, 2, item.value ?? null)
          write(satir, 3, item.usd ?? null)
          write(satir, 4, item.currency ?? null)

          totalTl += nc(item.value)
          totalUsd += nc(item.usd)

          satir += 1
        }

        /* Toplam satiri: yalnizca col2 ve col3. */
        write(satir, 2, totalTl)
        write(satir, 3, totalUsd)
      }
    },
  )

  return sendXlsxBuffer(event, buffer, "ayo_cost_excel.xlsx")
})
