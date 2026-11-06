/*
 * Excel sunucusundaki `/finance/mekmar/excel/custom` ucunun Nitro
 * karsiligi (Mekmar finans PO detayi -- IKI SAYFALI).
 *
 * Cagri yeri:
 *   app/components/finance/PoList.vue -> excel_output()
 *
 * ---------------------------------------------------------------------
 * KAYNAK (okundu)
 * ---------------------------------------------------------------------
 *   web.py:3075   FinanceTestExcelCustomApi
 *   web.py:702    finance_excel_custom  <-- govde burada
 *
 * Sablon: excel/sablonlar/finance_detail_custom.xlsx
 * IKI SAYFA kullaniyor: 'Sayfa1' (siparisler) ve 'Sayfa2' (odemeler).
 *
 * ---------------------------------------------------------------------
 * GOVDE DIZI DEGIL, NESNE
 * ---------------------------------------------------------------------
 * Diger uclarin hepsi bir LISTE gonderiyor; bu uc
 *     { po: [...], paid: [...] }
 * gonderiyor. Bu yuzden requireList degil requireObject.
 *
 * Sayfa1 -- basliklar KODDAN (satir 1), kenarlikli + Font(bold=True)
 * (punto VERILMEMIS, yani varsayilan):
 *   1 Po  2 Order Date  3 Shipped Date  4 Status
 *   5 Order Total  6 Payment Received  7 Balanced  8 Prepayment
 *
 * Sayfa1 veri (satir 2'den, HEPSINE thin_border):
 *   1 SiparisNo
 *   2 _dateConvert(SiparisTarihi)
 *   3 _dateConvert(YuklemeTarihi)
 *   4 Durum
 *   5 _formatControl(OrderTotal)
 *   6 _formatControl(Paid)
 *   7 _formatControl(Balanced)
 *   8 _formatControl(Pesinat)
 *
 * Sayfa2 -- basliklar KODDAN (satir 1), kenarlikli + kalin:
 *   1 Date  2 Paid
 * Sayfa2 veri (satir 2'den, kenarlikli):
 *   1 _dateConvert(Tarih)  2 _formatControl(Paid)
 *
 * TOPLAM SATIRI YOK (iki sayfada da).
 *
 * Veritabanina GITMIYOR; veri govdeden geliyor.
 *
 * ---------------------------------------------------------------------
 * [FIX] PYTHON'DA SAYFA2 SATIR SAYACI SIFIRLANMIYOR -- ETKISI YOK
 * ---------------------------------------------------------------------
 * Python'da `satir2 = 1` basta atanip Sayfa2 basligi PO dongusunden
 * SONRA yaziliyor; arada satir2 degismedigi icin sonuc dogru (satir 1).
 * Yani bir hata degil, sadece okunurlugu dusuk. Buradaki akis ayni
 * sonucu veriyor.
 *
 * _formatControl'un bos deger davranisi: Python'da None ile
 * karsilastirma TypeError firlatip ucu dusuruyordu; burada 0 sayiliyor.
 * Gerekcesi server/utils/xlsx-template.ts icindeki formatControl'da.
 */

interface PoRow {
  SiparisNo?: string | null
  SiparisTarihi?: string | null
  YuklemeTarihi?: string | null
  Durum?: string | null
  OrderTotal?: number | null
  Paid?: number | null
  Balanced?: number | null
  Pesinat?: number | null
}

interface PaidRow {
  Tarih?: string | null
  Paid?: number | null
}

interface CustomBody {
  po?: PoRow[] | null
  paid?: PaidRow[] | null
}

const PO_HEADERS = [
  "Po",
  "Order Date",
  "Shipped Date",
  "Status",
  "Order Total",
  "Payment Received",
  "Balanced",
  "Prepayment",
] as const

const PAID_HEADERS = ["Date", "Paid"] as const

/* Python: Font(bold=True) -- punto verilmemis, varsayilan kaliyor. */
const BOLD: Parameters<typeof restyle>[1]["font"] = { bold: true }

function writeHeaders(
  sheet: Parameters<Parameters<typeof fillTemplate>[1]>[0],
  headers: readonly string[],
) {
  headers.forEach((text, i) => {
    const cell = sheet.getCell(1, i + 1)
    cell.value = text
    cell.style = { border: THIN, font: BOLD }
  })
}

export default defineEventHandler(async (event) => {
  const body = requireObject<CustomBody>(await readBody(event))

  const buffer = await fillTemplate(
    { template: "finance_detail_custom.xlsx", sheetName: "Sayfa1" },
    (sheet, book) => {
      /* ---------- Sayfa1: siparisler ---------- */
      writeHeaders(sheet, PO_HEADERS)

      let satir = 2

      for (const po of body.po ?? []) {
        const values: (string | number | null)[] = [
          po.SiparisNo ?? null,
          dateConvert(po.SiparisTarihi),
          dateConvert(po.YuklemeTarihi),
          po.Durum ?? null,
          formatControl(po.OrderTotal),
          formatControl(po.Paid),
          formatControl(po.Balanced),
          formatControl(po.Pesinat),
        ]

        values.forEach((v, i) => {
          const cell = sheet.getCell(satir, i + 1)
          cell.value = v
          borderOnly(cell)
        })

        satir += 1
      }

      /* ---------- Sayfa2: odemeler ---------- */
      const sheet2 = book.getWorksheet("Sayfa2")
      if (!sheet2) {
        throw createError({
          statusCode: 500,
          statusMessage: "Sablonda 'Sayfa2' yok: finance_detail_custom.xlsx",
        })
      }

      writeHeaders(sheet2, PAID_HEADERS)

      let satir2 = 2

      for (const paid of body.paid ?? []) {
        const date = sheet2.getCell(satir2, 1)
        date.value = dateConvert(paid.Tarih)
        borderOnly(date)

        const amount = sheet2.getCell(satir2, 2)
        amount.value = formatControl(paid.Paid)
        borderOnly(amount)

        satir2 += 1
      }
    },
  )

  return sendXlsxBuffer(event, buffer, "finance_detail_custom.xlsx")
})
