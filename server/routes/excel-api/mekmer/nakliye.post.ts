/*
 * Excel sunucusundaki `/reports/mekmer/nakliye/excel` ucunun Nitro
 * karsiligi (Mekmer nakliye raporu).
 *
 * Cagri yeri:
 *   app/pages/reports/mekmer/strips.vue -> nakliye excel butonu
 *
 * Kaynak: web.py:3083 ReportsNakliyeExcelApi
 *         web.py:1020 reports_nakliye_excel
 *
 * Sablon: excel/sablonlar/reports_mekmer_nakliye.xlsx, sayfa 'Sayfa1'.
 * Kalip strips/moloz ile ayni: basliklar koddan, veri satir 2'den,
 * hepsi kenarlikli, TOPLAM SATIRI YOK. 12 sutun.
 *
 * [!] `İrsaliyeNo` alanindaki bastaki harf NOKTALI BUYUK I (U+0130);
 *     duz "I" ile yazilirsa alan bulunamaz.
 *
 * NOT -- baslik metinlerindeki bosluk tutarsizligi kaynakta:
 *   'Fiyat (₺)' ve 'Toplam (₺)' bosluklu, ama 'Kur(₺)' BOSLUKSUZ.
 *   Birebir korundu.
 */
interface NakliyeRow {
  Tarih?: string | null
  PlakaNo?: string | null
  "İrsaliyeNo"?: string | number | null
  FaturaNo?: string | number | null
  FirmaAdi?: string | null
  KimdenAdi?: string | null
  Ton?: number | null
  BirimFiyatTL?: number | null
  BirimFiyatDolar?: number | null
  Kur?: number | null
  ToplamTl?: number | null
  ToplamDolar?: number | null
}

export default defineEventHandler(async (event) => {
  const rows = requireList<NakliyeRow>(await readBody(event))

  const buffer = await buildHeaderedTable<NakliyeRow>({
    template: "reports_mekmer_nakliye.xlsx",
    rows,
    columns: [
      { header: "Tarih", value: (r) => dateConvert(r.Tarih) },
      { header: "Plaka No", value: (r) => r.PlakaNo ?? null },
      { header: "İrsaliye No", value: (r) => r["İrsaliyeNo"] ?? null },
      { header: "Fatura No", value: (r) => r.FaturaNo ?? null },
      { header: "Firma Adı", value: (r) => r.FirmaAdi ?? null },
      { header: "Kimden", value: (r) => r.KimdenAdi ?? null },
      { header: "Tonaj", value: (r) => r.Ton ?? null },
      { header: "Fiyat (₺)", value: (r) => r.BirimFiyatTL ?? null },
      { header: "Fiyat ($)", value: (r) => r.BirimFiyatDolar ?? null },
      { header: "Kur(₺)", value: (r) => r.Kur ?? null },
      { header: "Toplam (₺)", value: (r) => r.ToplamTl ?? null },
      { header: "Toplam ($)", value: (r) => r.ToplamDolar ?? null },
    ],
  })

  return sendXlsxBuffer(event, buffer, "reports_mekmer_nakliye.xlsx")
})
