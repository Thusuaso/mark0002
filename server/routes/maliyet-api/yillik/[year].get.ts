/*
 * Excel sunucusundaki `/maliyet/listeler/maliyetListesi/{yil}` ucunun
 * Nitro karsiligi (AYO yillik maliyet raporu).
 *
 * Tum mantik server/utils/cost-report.ts icinde; orada Python'daki
 * dort hatanin duzeltmesi [FIX-1..4] olarak isaretli.
 */
export default defineEventHandler(async (event) => {
  const year = Number(getRouterParam(event, "year"))

  /*
   * Girdi dogrulamasi: Python'da yoktu (<int:yil> sadece tam sayi
   * sarti). Gecersiz yil sorgulara gidip BOS liste donduruyordu.
   */
  if (!Number.isInteger(year) || year < 1990 || year > 2200) {
    throw createError({
      statusCode: 400,
      statusMessage: `Gecersiz yil: ${getRouterParam(event, "year")}`,
    })
  }

  return await buildCostReport(year)
})
