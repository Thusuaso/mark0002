/*
 * Excel sunucusundaki `/finance/reports/test/filter` ucunun Nitro karsiligi.
 *
 * Python: FinanceTest.getListFilter()  -- Ic Piyasa + Mekmer, total<=8 suzulur
 *
 * Tum mantik server/utils/finance-report.ts icinde -- uc uc ayni motoru
 * paylasiyor, aralarindaki fark orada varyant tablosu olarak duruyor.
 */
export default defineEventHandler(async () => {
  return await buildFinanceReport("test-filter")
})
