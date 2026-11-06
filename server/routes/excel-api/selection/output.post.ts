/*
 * Excel sunucusundaki `/siparisler/dosyalar/seleksiyon/excel/output`
 * ucunun Nitro karsiligi (seleksiyon urun listesi).
 *
 * Cagri yeri:
 *   app/components/selection/input/Panel.vue -> selection_click_excel()
 *
 * ---------------------------------------------------------------------
 * KAYNAK (okundu)
 * ---------------------------------------------------------------------
 *   web.py:3101  SelectionExcelApi
 *   web.py:2826  post -> ExcellCiktiIslem().selection_excel_output(data)
 *                get  -> send_file('excel/dosyalar/selection.xlsx')
 *   web.py:1272  selection_excel_output  <-- govde burada
 *
 * Sablon: excel/sablonlar/selection.xlsx, sayfa 'Sayfa1'.
 * BASLIKLAR SABLONDAN (kod satir 1'e dokunmuyor); veri satir 2'den.
 *
 * Veri satirlari (col 1..17, HEPSINE thin_border):
 *    1 KasaNo         2 OcakAdi       3 FirmaAdi
 *    4 KategoriAdi    5 UrunAdi       6 YuzeyIslemAdi
 *    7 En             8 Boy           9 Kenar
 *   10 KutuAdet      11 KutuIciAdet  12 Adet
 *   13 Miktar        14 UrunBirimAdi 15 SiparisAciklama
 *   16 Aciklama      17 Fason
 *
 * TOPLAM SATIRI YOK.
 *
 * [!] 17. SUTUN HAM BOOLEAN: Python `item['Fason']`i OLDUGU GIBI
 *     yaziyor -- forwarding/production uclarindaki gibi
 *     "Fason"/"Fason Değil" metnine CEVIRMIYOR. Yani hucreye TRUE/FALSE
 *     dusuyor. Kaynaktaki bu tutarsizlik korundu; metne cevirmek
 *     ciktiyi uretimden ayirirdi.
 */

interface SelectionRow {
  KasaNo?: string | number | null
  OcakAdi?: string | null
  FirmaAdi?: string | null
  KategoriAdi?: string | null
  UrunAdi?: string | null
  YuzeyIslemAdi?: string | null
  En?: string | number | null
  Boy?: string | number | null
  Kenar?: string | number | null
  KutuAdet?: number | null
  KutuIciAdet?: number | null
  Adet?: number | null
  Miktar?: number | null
  UrunBirimAdi?: string | null
  SiparisAciklama?: string | null
  Aciklama?: string | null
  Fason?: boolean | null
}

export default defineEventHandler(async (event) => {
  const rows = requireList<SelectionRow>(await readBody(event))

  const buffer = await fillTemplate(
    { template: "selection.xlsx", sheetName: "Sayfa1" },
    (sheet) => {
      let satir = 2

      for (const item of rows) {
        const values: (string | number | boolean | null)[] = [
          item.KasaNo ?? null,
          item.OcakAdi ?? null,
          item.FirmaAdi ?? null,
          item.KategoriAdi ?? null,
          item.UrunAdi ?? null,
          item.YuzeyIslemAdi ?? null,
          item.En ?? null,
          item.Boy ?? null,
          item.Kenar ?? null,
          item.KutuAdet ?? null,
          item.KutuIciAdet ?? null,
          item.Adet ?? null,
          item.Miktar ?? null,
          item.UrunBirimAdi ?? null,
          item.SiparisAciklama ?? null,
          item.Aciklama ?? null,
          item.Fason ?? null,
        ]

        values.forEach((v, i) => {
          const cell = sheet.getCell(satir, i + 1)
          cell.value = v as never
          borderOnly(cell)
        })

        satir += 1
      }
    },
  )

  return sendXlsxBuffer(event, buffer, "selection.xlsx")
})
