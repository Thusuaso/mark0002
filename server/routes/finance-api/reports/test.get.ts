/*
 * Excel sunucusundaki `/finance/reports/test` ucunun Nitro karsiligi.
 *
 * Python: FinanceTest.getList()        -- Mekmar + Imperial Homes, suzme yok
 *
 * Tum mantik server/utils/finance-report.ts icinde -- uc uc ayni motoru
 * paylasiyor, aralarindaki fark orada varyant tablosu olarak duruyor.
 */
export default defineEventHandler(async () => {
  return await buildFinanceReport("test")
})
