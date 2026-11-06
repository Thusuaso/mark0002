/*
 * Excel sunucusundaki `/maliyet/dosyalar/maliyetRaporExcelListe` ucunun
 * Nitro karsiligi (AYO maliyet listesi).
 *
 * Cagri yeri:
 *   app/pages/reports/mekmar/ayo.vue -> excel_output()
 *
 * ---------------------------------------------------------------------
 * KAYNAK (okundu)
 * ---------------------------------------------------------------------
 *   web.py:3053           MaliyetRaporExcelApi
 *   component/excel.py:14 maliyet_rapor_ciktisi  <-- govde burada
 *
 * Sablon: excel/sablonlar/ayo_maliyet_listesi.xlsx, sayfa **'Sheet'**.
 * Basliklar sablondan; veri satir 2'den. 30 sutun.
 * Python HIC stil uygulamiyor, TOPLAM SATIRI YOK.
 *
 * ---------------------------------------------------------------------
 * TEK OZEL DURUM: 29. SUTUN (kar/zarar yuzdesi)
 * ---------------------------------------------------------------------
 * Python (component/excel.py:58-62):
 *
 *     if(kar_zarar_tl_yuzdesi == None or == 0 or == '' or == ' '):
 *         cell = 0
 *     else:
 *         cell = int(kar_zarar_tl_yuzdesi) / 100
 *
 * Iki ayrinti korundu:
 *   - `int(...)` Python'da KIRPIYOR (yuvarlamaz): 12.7 -> 12 -> 0.12.
 *     Math.trunc ile ayni sonuc.
 *   - Deger 100'e BOLUNUYOR, yani hucreye oran olarak giriyor
 *     (sablondaki yuzde bicimi onu %12 olarak gosteriyor).
 *
 * Veritabanina GITMIYOR; liste govdeden geliyor (kaynagi
 * server/routes/maliyet-api/yillik/[year].get.ts).
 */

interface MaliyetRow {
  siparisci?: string | null
  operasyon?: string | null
  siparis_no?: string | null
  marketing?: string | null
  faturatur?: string | null
  siparis_tarihi?: string | null
  yukleme_tarihi?: string | null
  musteri_adi?: string | null
  ulke_adi?: string | null
  teslim_sekli?: string | null
  toplam_bedel?: number | null
  mekmar_alim?: number | null
  dis_alim?: number | null
  nakliye?: number | null
  gumruk?: number | null
  ilaclama?: number | null
  liman?: number | null
  sigorta?: number | null
  navlun?: number | null
  detay_1?: number | null
  detay_2?: number | null
  detay_3?: number | null
  ozel_iscilik?: number | null
  banka_masrafi?: number | null
  kurye_masrafi?: number | null
  masraf_toplam?: number | null
  kar_zarar?: number | null
  kar_zarar_tl?: number | null
  kar_zarar_tl_yuzdesi?: number | string | null
  dosya_kapanma_date?: string | null
}

/*
 * Python'daki bos kontrolu BIREBIR: None, 0, '' ve ' ' -> 0.
 * Diger her deger int()/100'den geciyor.
 */
function profitRatio(value: unknown): number {
  if (value == null || value === 0 || value === "" || value === " ") return 0

  const n = typeof value === "number" ? value : Number(value)
  if (!Number.isFinite(n)) return 0

  return Math.trunc(n) / 100
}

export default defineEventHandler(async (event) => {
  const rows = requireList<MaliyetRow>(await readBody(event))

  const buffer = await fillTemplate(
    { template: "ayo_maliyet_listesi.xlsx", sheetName: "Sheet" },
    (_sheet, _book, write) => {
      let satir = 2

      for (const item of rows) {
        const values: (string | number | null)[] = [
          item.siparisci ?? null,
          item.operasyon ?? null,
          item.siparis_no ?? null,
          item.marketing ?? null,
          item.faturatur ?? null,
          item.siparis_tarihi ?? null,
          item.yukleme_tarihi ?? null,
          item.musteri_adi ?? null,
          item.ulke_adi ?? null,
          item.teslim_sekli ?? null,
          item.toplam_bedel ?? null,
          item.mekmar_alim ?? null,
          item.dis_alim ?? null,
          item.nakliye ?? null,
          item.gumruk ?? null,
          item.ilaclama ?? null,
          item.liman ?? null,
          item.sigorta ?? null,
          item.navlun ?? null,
          item.detay_1 ?? null,
          item.detay_2 ?? null,
          item.detay_3 ?? null,
          item.ozel_iscilik ?? null,
          item.banka_masrafi ?? null,
          item.kurye_masrafi ?? null,
          item.masraf_toplam ?? null,
          item.kar_zarar ?? null,
          item.kar_zarar_tl ?? null,
          profitRatio(item.kar_zarar_tl_yuzdesi),
          item.dosya_kapanma_date ?? null,
        ]

        values.forEach((v, i) => write(satir, i + 1, v))

        satir += 1
      }
    },
  )

  return sendXlsxBuffer(event, buffer, "ayo_maliyet_listesi.xlsx")
})
