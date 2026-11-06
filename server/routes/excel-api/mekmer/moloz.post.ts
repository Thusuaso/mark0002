/*
 * Excel sunucusundaki `/reports/mekmer/moloz/excel` ucunun Nitro
 * karsiligi (Mekmer moloz raporu).
 *
 * Cagri yeri:
 *   app/pages/reports/mekmer/strips.vue -> moloz excel butonu
 *
 * Kaynak: web.py:3082 ReportsMolozExcelApi
 *         web.py:923  reports_moloz_excel
 *
 * Sablon: excel/sablonlar/reports_mekmer_moloz.xlsx, sayfa 'Sayfa1'.
 * Kalip strips ile ayni: basliklar koddan, veri satir 2'den,
 * hepsi kenarlikli, TOPLAM SATIRI YOK. 12 sutun.
 *
 * [!] ALAN ADLARI KARISIK: bazilari Ingilizce (SupplierName,
 *     QuarryName, StripName, Currency), bazilari Turkce ve TURKCE
 *     KARAKTERLI (`İrsaliyeNo`, `FaturaNo`). Kaynakta boyle; anahtar
 *     adlari istemciyi bagladigi icin AYNEN korundu -- ozellikle
 *     `İrsaliyeNo` bastaki buyuk I harfi noktali (U+0130), duz "I"
 *     ile yazilirsa alan BULUNAMAZ.
 */
interface MolozRow {
  Date?: string | null
  "İrsaliyeNo"?: string | number | null
  SupplierName?: string | null
  FaturaNo?: string | number | null
  QuarryName?: string | null
  StripName?: string | null
  Ton?: number | null
  PriceTl?: number | null
  PriceUsd?: number | null
  Currency?: number | null
  Total?: number | null
  TotalUsd?: number | null
}

export default defineEventHandler(async (event) => {
  const rows = requireList<MolozRow>(await readBody(event))

  const buffer = await buildHeaderedTable<MolozRow>({
    template: "reports_mekmer_moloz.xlsx",
    rows,
    columns: [
      { header: "Tarih", value: (r) => dateConvert(r.Date) },
      { header: "İrsaliye No", value: (r) => r["İrsaliyeNo"] ?? null },
      { header: "Tedarikçi Adı", value: (r) => r.SupplierName ?? null },
      { header: "Fatura No", value: (r) => r.FaturaNo ?? null },
      { header: "Ocak Adı", value: (r) => r.QuarryName ?? null },
      { header: "Strip Adı", value: (r) => r.StripName ?? null },
      { header: "Tonaj", value: (r) => r.Ton ?? null },
      { header: "Fiyat (Tl)", value: (r) => r.PriceTl ?? null },
      { header: "Fiyat ($)", value: (r) => r.PriceUsd ?? null },
      { header: "Kur ($)", value: (r) => r.Currency ?? null },
      { header: "Toplam (₺)", value: (r) => r.Total ?? null },
      { header: "Toplam ($)", value: (r) => r.TotalUsd ?? null },
    ],
  })

  return sendXlsxBuffer(event, buffer, "reports_mekmer_moloz.xlsx")
})
