/*
 * Excel sunucusundaki `/finance/reports/mekmer/all` ucunun Nitro karsiligi.
 *
 * Python: FinanceTestAll.getListFilter() -- +Mekmar, suzme yok, cost yok
 *
 * Tum mantik server/utils/finance-report.ts icinde -- uc uc ayni motoru
 * paylasiyor, aralarindaki fark orada varyant tablosu olarak duruyor.
 */
export default defineEventHandler(async () => {
  return await buildFinanceReport("mekmer-all")
})
