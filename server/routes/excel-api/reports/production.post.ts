/*
 * Excel sunucusundaki `/reports/excel/production` ucunun Nitro
 * karsiligi (Mekmer uretim raporu).
 *
 * Cagri yeri:
 *   app/pages/reports/mekmer/production.vue -> excel_output()
 *
 * ---------------------------------------------------------------------
 * KAYNAK (okundu)
 * ---------------------------------------------------------------------
 *   web.py:3106   ReportsProductionApi
 *   web.py:2836   post -> ExcellCiktiIslem().production_excel_list(data)
 *                 get  -> send_file('excel/dosyalar/production_excel.xlsx')
 *   web.py:1367   production_excel_list  <-- govde burada
 *
 * Sablon: excel/sablonlar/production_excel.xlsx, sayfa 'Sayfa1',
 * satir 2'den. 17 sutun; basliklar sablondan.
 *
 * Veri satirlari (Python, col 1..17, HEPSINE thin_border):
 *    1 _dateConvert(Tarih)  2 FirmaAdi     3 KategoriAdi
 *    4 KasaNo               5 UrunAdi      6 OcakAdi
 *    7 YuzeyIslemAdi        8 En           9 Boy
 *   10 Kenar               11 Miktar      12 Adet
 *   13 BirimAdi            14 SiparisAciklama  15 Aciklama
 *   16 Fason    ? 'Fason'    : 'Fason Değil'
 *   17 Kutulama ? 'Kutulama' : 'Kutulama Değil'
 *
 * ---------------------------------------------------------------------
 * TOPLAM SATIRI -- PYTHON'DAKI AYRINTILI BICIM BIREBIR TASINDI
 * ---------------------------------------------------------------------
 * Python toplam satirinda sutunlara UC AYRI bicim uyguluyor:
 *
 *   col1      'Total'  -> kenarlik + kalin 13 + defb00 + ORTALI
 *   col2..10  ''       -> SADECE kenarlik (dolgu YOK, kalin YOK)
 *   col11,12  toplamlar-> kenarlik + kalin 13 + defb00
 *   col13,14,15 ''     -> kenarlik + defb00 (ama KALIN DEGIL)
 *   col16,17           -> HIC YAZILMIYOR
 *
 * Sonra A{satir}:J{satir} birlestiriliyor, yani col2..10 zaten
 * gorunmez kaliyor; buna ragmen Python onlara kenarlik yaziyor ve
 * bu korundu.
 *
 * Veritabanina GITMIYOR; liste govdeden geliyor.
 *
 * NOT -- Fason/Kutulama kosulu Python'da `== True`; yalnizca GERCEK
 * True "Fason" uretir. Katilik korundu (`=== true`).
 */

interface ProductionRow {
  Tarih?: string | null
  FirmaAdi?: string | null
  KategoriAdi?: string | null
  KasaNo?: string | number | null
  UrunAdi?: string | null
  OcakAdi?: string | null
  YuzeyIslemAdi?: string | null
  En?: string | number | null
  Boy?: string | number | null
  Kenar?: string | number | null
  Miktar?: number | null
  Adet?: number | null
  BirimAdi?: string | null
  SiparisAciklama?: string | null
  Aciklama?: string | null
  Fason?: boolean | null
  Kutulama?: boolean | null
}

export default defineEventHandler(async (event) => {
  const rows = requireList<ProductionRow>(await readBody(event))

  const buffer = await fillTemplate(
    { template: "production_excel.xlsx", sheetName: "Sayfa1" },
    (sheet) => {
      let satir = 2

      let amountTotal = 0
      let pieceTotal = 0

      for (const item of rows) {
        const values: (string | number | null)[] = [
          dateConvert(item.Tarih),
          item.FirmaAdi ?? null,
          item.KategoriAdi ?? null,
          item.KasaNo ?? null,
          item.UrunAdi ?? null,
          item.OcakAdi ?? null,
          item.YuzeyIslemAdi ?? null,
          item.En ?? null,
          item.Boy ?? null,
          item.Kenar ?? null,
          item.Miktar ?? null,
          item.Adet ?? null,
          item.BirimAdi ?? null,
          item.SiparisAciklama ?? null,
          item.Aciklama ?? null,
          item.Fason === true ? "Fason" : "Fason Değil",
          item.Kutulama === true ? "Kutulama" : "Kutulama Değil",
        ]

        values.forEach((v, i) => {
          const cell = sheet.getCell(satir, i + 1)
          cell.value = v
          borderOnly(cell)
        })

        amountTotal += nc(item.Miktar)
        pieceTotal += nc(item.Adet)

        satir += 1
      }

      totalCell(sheet.getCell(satir, 1), { center: true }).value = "Total"

      /* col2..10: bos deger + SADECE kenarlik */
      for (let c = 2; c <= 10; c++) {
        const cell = sheet.getCell(satir, c)
        cell.value = ""
        borderOnly(cell)
      }

      totalCell(sheet.getCell(satir, 11)).value = amountTotal
      totalCell(sheet.getCell(satir, 12)).value = pieceTotal

      /*
       * col13,14,15: bos + kenarlik + defb00 ama KALIN DEGIL --
       * Python bu uc hucreye font ATAMIYOR, yalnizca border ve fill
       * veriyor. totalCell kullanilsa kalin 13 punto eklenirdi.
       */
      for (let c = 13; c <= 15; c++) {
        const cell = sheet.getCell(satir, c)
        cell.value = ""
        cell.style = { border: THIN, fill: TOTAL_FILL }
      }

      /*
       * BIRLESTIRME EN SONDA -- PYTHON'DAKI SIRA (web.py:1472) VE
       * ZORUNLU.
       *
       * exceljs'te birlestirilmis bir alanin KOLE hucresine deger
       * yazmak MASTER'IN degerini EZIYOR. Ilk surumde birlestirme
       * basta yapildi, ardindan col2..10'a '' yazildi ve A{satir}
       * hucresindeki 'Total' etiketi SILINDI -- olculdu:
       *   DEGER A4: py="Total" nitro=""
       * openpyxl'de kole hucreye yazmak master'i etkilemiyor, bu
       * yuzden Python'da sira sorun cikarmiyordu.
       *
       * Tum hucreler yazildiktan SONRA birlestirince hem etiket
       * korunuyor hem de Python'un sirasina birebir uyulmus oluyor.
       * (Birlestirme aninda exceljs master stilini kolelere
       * kopyaliyor; o fark yalnizca GORUNMEZ hucrelerde kaliyor --
       * gerekcesi ./loading.post.ts icinde.)
       */
      sheet.mergeCells(satir, 1, satir, 10)
    },
  )

  return sendXlsxBuffer(event, buffer, "mekamer_production_excel.xlsx")
})
