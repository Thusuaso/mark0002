/*
 * Excel sunucusundaki `/reports/excel/forwarding` ucunun Nitro
 * karsiligi (Mekmer sevkiyat raporu).
 *
 * Cagri yeri:
 *   app/pages/reports/mekmar/forwarding.vue -> excel_output()
 *
 * ---------------------------------------------------------------------
 * KAYNAK (okundu)
 * ---------------------------------------------------------------------
 *   web.py:3109   ReportsProductForwardingApi
 *   web.py:2866   post -> ExcellCiktiIslem().forwarding_excel_list(data)
 *                 get  -> send_file('excel/dosyalar/forwarding_excel.xlsx')
 *   web.py:1627   forwarding_excel_list  <-- govde burada
 *
 * Sablon: excel/sablonlar/forwarding_excel.xlsx, sayfa 'Sayfa1',
 * satir 2'den. 22 sutun; basliklar sablondan.
 *
 * Veri satirlari (Python, col 1..22, HEPSINE thin_border):
 *    1 _dateConvert(Tarih)   2 FirmaAdi        3 TedarikciAdi
 *    4 UrunKartId            5 KasaNo          6 OcakAdi
 *    7 KategoriAdi           8 UrunAdi         9 YuzeyIslemAdi
 *   10 En                   11 Boy            12 Kenar
 *   13 KutuAdet             14 Adet           15 Miktar
 *   16 BirimAdi             17 SiparisAciklama 18 Aciklama
 *   19 BirimFiyat           20 Toplam
 *   21 Fason    ? 'Fason'    : 'Fason Değil'
 *   22 Kutulama ? 'Kutulama' : 'Kutulama Değil'
 *
 * Toplam satiri (Python):
 *   col1 'Total' -> ortali + kenarlik + kalin 13 + defb00,
 *                   A{satir}:L{satir} BIRLESTIRILMIS
 *   col13 boxincrate (KutuAdet toplami)
 *   col14 peaceincrate (Adet toplami)
 *   col15 amount (Miktar toplami)
 *   col20 total_price (Toplam toplami)
 *   -> dordune de kenarlik + kalin 13 + defb00
 *   (col16..19, 21, 22 toplam satirinda BOS birakiliyor)
 *
 * Veritabanina GITMIYOR; liste govdeden geliyor.
 *
 * NOT -- Fason/Kutulama kosulu Python'da `== True` ile yaziliyor, yani
 * yalnizca GERCEK True degeri "Fason" uretir; 1, "1", "true" gibi
 * degerler "Fason Değil" olur. Bu katilik KORUNDU (`=== true`):
 * gevsetilirse mevcut raporlarda satirlarin etiketi degisebilirdi.
 */

interface ForwardingRow {
  Tarih?: string | null
  FirmaAdi?: string | null
  TedarikciAdi?: string | null
  UrunKartId?: string | number | null
  KasaNo?: string | number | null
  OcakAdi?: string | null
  KategoriAdi?: string | null
  UrunAdi?: string | null
  YuzeyIslemAdi?: string | null
  En?: string | number | null
  Boy?: string | number | null
  Kenar?: string | number | null
  KutuAdet?: number | null
  Adet?: number | null
  Miktar?: number | null
  BirimAdi?: string | null
  SiparisAciklama?: string | null
  Aciklama?: string | null
  BirimFiyat?: number | null
  Toplam?: number | null
  Fason?: boolean | null
  Kutulama?: boolean | null
}

export default defineEventHandler(async (event) => {
  const rows = requireList<ForwardingRow>(await readBody(event))

  const buffer = await fillTemplate(
    { template: "forwarding_excel.xlsx", sheetName: "Sayfa1" },
    (sheet) => {
      let satir = 2

      let boxInCrate = 0
      let pieceInCrate = 0
      let amount = 0
      let totalPrice = 0

      for (const item of rows) {
        const values: (string | number | null)[] = [
          dateConvert(item.Tarih),
          item.FirmaAdi ?? null,
          item.TedarikciAdi ?? null,
          item.UrunKartId ?? null,
          item.KasaNo ?? null,
          item.OcakAdi ?? null,
          item.KategoriAdi ?? null,
          item.UrunAdi ?? null,
          item.YuzeyIslemAdi ?? null,
          item.En ?? null,
          item.Boy ?? null,
          item.Kenar ?? null,
          item.KutuAdet ?? null,
          item.Adet ?? null,
          item.Miktar ?? null,
          item.BirimAdi ?? null,
          item.SiparisAciklama ?? null,
          item.Aciklama ?? null,
          item.BirimFiyat ?? null,
          item.Toplam ?? null,

          /* Python: `if(item['Fason'] == True)` -- sadece gercek True */
          item.Fason === true ? "Fason" : "Fason Değil",
          item.Kutulama === true ? "Kutulama" : "Kutulama Değil",
        ]

        /*
         * borderOnly: sablon bicimleri SUTUN duzeyinde tanimli;
         * restyle() onlari hucreye tasiyip Python'dan sapiyordu.
         * Gerekce: server/utils/xlsx-template.ts
         */
        values.forEach((v, i) => {
          const cell = sheet.getCell(satir, i + 1)
          cell.value = v
          borderOnly(cell)
        })

        boxInCrate += nc(item.KutuAdet)
        pieceInCrate += nc(item.Adet)
        amount += nc(item.Miktar)
        totalPrice += nc(item.Toplam)

        satir += 1
      }

      /*
       * BIRLESTIRME ONCE, BICIMLENDIRME SONRA -- gerekcesi
       * loading.post.ts icinde (exceljs birlestirmede master stilini
       * kolelere kopyaliyor, openpyxl kopyalamiyor).
       */
      sheet.mergeCells(satir, 1, satir, 12)
      totalCell(sheet.getCell(satir, 1), { center: true }).value = "Total"

      totalCell(sheet.getCell(satir, 13)).value = boxInCrate
      totalCell(sheet.getCell(satir, 14)).value = pieceInCrate
      totalCell(sheet.getCell(satir, 15)).value = amount
      totalCell(sheet.getCell(satir, 20)).value = totalPrice
    },
  )

  return sendXlsxBuffer(event, buffer, "mekamer_forwarding_excel.xlsx")
})
