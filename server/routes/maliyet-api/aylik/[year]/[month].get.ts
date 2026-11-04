/*
 * Excel sunucusundaki `/maliyet/listeler/maliyetListesi/{yil}/{ay}`
 * ucunun Nitro karsiligi (AYO AYLIK maliyet raporu).
 *
 * Python kaynagi:
 *   component/main.py:12      MaliyetRaporIslemApi
 *   component/cost.py:10      MaliyetRaporIslem
 *   component/order.py:6      Siparisler
 *   component/product.py:5    Urunler
 *   component/execuse.py:5    Masraflar
 *   component/paid.py:6       Odemeler        (yillik ile ORTAK sinif)
 *   model/cost.py:13          OzelMaliyetListeSchema  (yillik ile ORTAK sema)
 *
 * Motor yillik uc ile AYNI: server/utils/cost-report.ts -> buildCostReport.
 * Aylik/yillik arasindaki iki islevsel fark ve digerlerinin neden OLU KOD
 * oldugu orada [AY-1] ve fonksiyon basindaki notta yaziyor.
 *
 * Veritabanina YAZMIYOR (hepsi select).
 *
 * DIKKAT -- YILLIK UCTAKI DORT HATA DUZELTMESI BURADA DA GECERLI
 * ([FIX-1..6], cost-report.ts). Yani bu uc Python'un aylik ciktisini
 * BIREBIR taklit etmiyor; farklar BEKLENEN farklardir.
 */
export default defineEventHandler(async (event) => {
  const yearParam = getRouterParam(event, "year")
  const monthParam = getRouterParam(event, "month")

  const year = Number(yearParam)
  const month = Number(monthParam)

  /*
   * Girdi dogrulamasi: Python'da YOKTU (<int:yil>/<int:ay> yalnizca tam
   * sayi sarti koyuyordu). Gecersiz deger sorgulara gidip BOS liste
   * donduruyordu -- yani "veri yok" ile "yanlis istek" ayirt edilemiyordu.
   * Yillik ucta da ayni dogrulama var.
   */
  if (!Number.isInteger(year) || year < 1990 || year > 2200) {
    throw createError({
      statusCode: 400,
      statusMessage: `Gecersiz yil: ${yearParam}`,
    })
  }

  if (!Number.isInteger(month) || month < 1 || month > 12) {
    throw createError({
      statusCode: 400,
      statusMessage: `Gecersiz ay: ${monthParam}`,
    })
  }

  return await buildCostReport(year, month)
})
