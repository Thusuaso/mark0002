/*
 * Excel sunucusundaki `/gu/reports/seller/operation/forwarding` ucunun
 * Nitro karsiligi (GU satisci/operasyon SEVKIYAT ozeti).
 *
 * Cagri yeri:
 *   app/components/reports/mekmar/gu/ShippedOperation.vue
 *
 * Kaynak: web.py:3079 -> component/excel.py:677
 *         getGuRaporlariSatisciOperasyonShipped
 *
 * Govdenin tamami ./../../utils/gu-summary.ts icinde; kardes uc
 * (orders) ayni ureticiyi "Orders" etiketiyle kullaniyor.
 *
 * NOT -- rota adi "forwarding" ama baslik metni "Shipped": kaynaktaki
 * bu tutarsizlik korundu (rota adi istemciyi, baslik ciktiyi baglar).
 */
export default defineEventHandler(async (event) => {
  const body = requireObject<GuSummaryBody>(await readBody(event))

  const buffer = await buildGuSummary(body, "Shipped")

  return sendXlsxBuffer(event, buffer, "gu_reports_summary.xlsx")
})
