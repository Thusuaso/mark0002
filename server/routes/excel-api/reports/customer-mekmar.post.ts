/*
 * Excel sunucusundaki `/customer/mekmar/excel` ucunun Nitro karsiligi
 * (Mekmar musteri listesi).
 *
 * Cagri yeri:
 *   app/pages/customer/mekmar.vue -> excel_output()
 *
 * ---------------------------------------------------------------------
 * KAYNAK (okundu)
 * ---------------------------------------------------------------------
 *   web.py:3098   CustomerMekmerExcelApi
 *   web.py:2816   post -> ExcellCiktiIslem().customer_mekmer_excel(data)
 *                 get  -> send_file('excel/dosyalar/mekmar_customer.xlsx')
 *   web.py:1237   customer_mekmer_excel  <-- govde burada
 *
 * Sablon: excel/sablonlar/mekmar_customer.xlsx, sayfa 'Sayfa1',
 * satir 2'den. Basliklar sablondan.
 *
 * Veri satirlari (Python, col 1..9, HEPSINE thin_border):
 *   1 ID        2 FirmaAdi   3 Unvan     4 Adres    5 UlkeAdi
 *   6 Marketing 7 MailAdresi 8 SatisciAdi 9 Temsilci
 *
 * TOPLAM SATIRI YOK.
 *
 * Veritabanina GITMIYOR; liste govdeden geliyor.
 *
 * NOT -- SINIF ADI 'customer_mekmer_excel' ama rota ve sablon
 * 'mekmar': kaynaktaki bu tutarsizlik yalnizca isimlendirmede, hedef
 * MEKMAR musteri listesi (cagri yeri app/pages/customer/mekmar.vue).
 */

interface CustomerRow {
  ID?: number | string | null
  FirmaAdi?: string | null
  Unvan?: string | null
  Adres?: string | null
  UlkeAdi?: string | null
  Marketing?: string | null
  MailAdresi?: string | null
  SatisciAdi?: string | null
  Temsilci?: string | null
}

export default defineEventHandler(async (event) => {
  const rows = requireList<CustomerRow>(await readBody(event))

  const buffer = await fillTemplate(
    { template: "mekmar_customer.xlsx", sheetName: "Sayfa1" },
    (sheet) => {
      let satir = 2

      for (const item of rows) {
        const values = [
          item.ID ?? null,
          item.FirmaAdi ?? null,
          item.Unvan ?? null,
          item.Adres ?? null,
          item.UlkeAdi ?? null,
          item.Marketing ?? null,
          item.MailAdresi ?? null,
          item.SatisciAdi ?? null,
          item.Temsilci ?? null,
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

  /*
   * Dosya adi istemcinin kullandigi adla AYNI tutuldu: cagri yeri
   * (app/pages/customer/mekmar.vue) indirme linkine "Customers.xlsx"
   * yaziyordu, Python tarafindaki sabit dosya adi ise
   * 'mekmar_customer.xlsx'ti. Kullanicinin GORDUGU ad istemcininkiydi,
   * o korundu -- artik Content-Disposition'dan geliyor.
   */
  return sendXlsxBuffer(event, buffer, "Customers.xlsx")
})
