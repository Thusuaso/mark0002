/*
 * Excel sunucusundaki `/siparisler/dosyalar/uretimExcelCikti` ucunun
 * Nitro karsiligi (uretim listesi).
 *
 * ALTI CAGRI YERI -- projedeki en cok paylasilan Excel ucu:
 *   app/components/selection/input/Panel.vue  -> orders_click_excel()
 *   app/pages/mekmer/products/production.vue  -> excel_output()
 *   app/pages/orders/production.vue           -> excel_output()
 *   app/pages/orders/waiting.vue              -> excel_output()
 *   app/pages/reports/mekmer/onhold.vue       -> excel_output()
 *   app/pages/reports/mekmer/productions.vue  -> excel_output()
 *
 * Govdenin tamami server/utils/uretim-excel.ts icinde; o dosya hem ust
 * bolumu (govdeden gelen siparisler) hem alt bolumu (veritabanindan
 * gelen "ÖZEL İŞÇİLİK YAPILACAKLAR" satirlari) uretiyor.
 *
 * [!] BU UC VERITABANINA GIDIYOR (alt bolum icin tek bir select).
 *     Diger Excel uclarinin hepsi yalnizca govdeyi bicimlendiriyor.
 */
export default defineEventHandler(async (event) => {
  const rows = requireList<UretimRow>(await readBody(event))

  const buffer = await buildUretimExcel(rows)

  return sendXlsxBuffer(event, buffer, "Uretim_list.xlsx")
})
