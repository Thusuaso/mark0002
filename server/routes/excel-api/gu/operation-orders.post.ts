/*
 * Excel sunucusundaki `/gu/reports/seller/operation/orders` ucunun
 * Nitro karsiligi (GU satisci/operasyon SIPARIS ozeti).
 *
 * Cagri yeri:
 *   app/components/reports/mekmar/gu/OrdererOperation.vue
 *
 * Kaynak: web.py:3078 -> component/excel.py:531
 *         getGuRaporlariSatisciOperasyonOrders
 *
 * Govdenin tamami ./../../utils/gu-summary.ts icinde; kardes uc
 * (forwarding) ayni ureticiyi "Shipped" etiketiyle kullaniyor --
 * iki Python fonksiyonu baslik kelimesi disinda birebir aynidir.
 */
export default defineEventHandler(async (event) => {
  const body = requireObject<GuSummaryBody>(await readBody(event))

  const buffer = await buildGuSummary(body, "Orders")

  return sendXlsxBuffer(event, buffer, "gu_reports_summary.xlsx")
})
