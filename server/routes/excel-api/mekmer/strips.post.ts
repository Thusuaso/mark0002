/*
 * Excel sunucusundaki `/reports/mekmer/strips/excel` ucunun Nitro
 * karsiligi (Mekmer strip raporu).
 *
 * Cagri yeri:
 *   app/pages/reports/mekmer/strips.vue -> strips excel butonu
 *
 * Kaynak: web.py:3081 ReportsStripsExcelApi
 *         web.py:808  reports_strips_excel
 *
 * Sablon: excel/sablonlar/reports_mekmer_strips.xlsx, sayfa 'Sayfa1'.
 * Basliklar KODDAN (satir 1, kenarlik + Font(bold=True)); veri satir
 * 2'den, hepsi kenarlikli. TOPLAM SATIRI YOK.
 *
 * 15 sutun; alan adlari INGILIZCE (kardes uclarda Turkce -- kaynaktaki
 * tutarsizlik korundu, istemciyi baglar).
 */
interface StripRow {
  Date?: string | null
  DocumentNo?: string | number | null
  SupplierName?: string | null
  QuarryName?: string | null
  StripName?: string | null
  Invoice?: string | number | null
  StripM2?: number | null
  StripPrice?: number | null
  StripCost?: number | null
  StripCostUsd?: number | null
  Currency?: number | null
  StripWidth?: string | number | null
  StripHeight?: string | number | null
  StripThickness?: string | number | null
  StripPiece?: number | null
}

export default defineEventHandler(async (event) => {
  const rows = requireList<StripRow>(await readBody(event))

  const buffer = await buildHeaderedTable<StripRow>({
    template: "reports_mekmer_strips.xlsx",
    rows,
    columns: [
      { header: "Tarih", value: (r) => dateConvert(r.Date) },
      { header: "İrsaliye No", value: (r) => r.DocumentNo ?? null },
      { header: "Tedarikçi Adı", value: (r) => r.SupplierName ?? null },
      { header: "Ocak Adı", value: (r) => r.QuarryName ?? null },
      { header: "Strip Adı", value: (r) => r.StripName ?? null },
      { header: "Fatura No", value: (r) => r.Invoice ?? null },
      { header: "Strip (M2)", value: (r) => r.StripM2 ?? null },
      { header: "Strip (₺)", value: (r) => r.StripPrice ?? null },
      { header: "Strip Toplam (₺)", value: (r) => r.StripCost ?? null },
      { header: "Strip Toplam ($)", value: (r) => r.StripCostUsd ?? null },
      { header: "Kur (₺)", value: (r) => r.Currency ?? null },
      { header: "En", value: (r) => r.StripWidth ?? null },
      { header: "Boy", value: (r) => r.StripHeight ?? null },
      { header: "Kalınlık", value: (r) => r.StripThickness ?? null },
      { header: "Adet", value: (r) => r.StripPiece ?? null },
    ],
  })

  return sendXlsxBuffer(event, buffer, "reports_mekmer_strips.xlsx")
})
