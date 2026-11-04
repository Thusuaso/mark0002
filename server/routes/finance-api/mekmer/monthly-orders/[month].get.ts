/*
 * Excel sunucusundaki `/finance/po/list/mekmer/month/{ay}` ucunun Nitro
 * karsiligi.
 *
 * Python kaynagi:
 *   component/finance/finance.py:83  FinanceTestDetailFilterMonthApi
 *   component/finance/detail.py:355  MusteriAyrintiMonth
 *   model/financedetail.py:77        MusteriAyrintiSchema
 *
 * Cagri yeri: app/pages/reports/mekmer/finance.vue
 *   "MEKMAR => MEKMER DEN SATIN ALDIGI URUNLERIN BEDELLERI" tablosu
 *   (3 yerden: mounted, ay secimi, kayit sonrasi yenileme).
 *
 * ---------------------------------------------------------------------
 * NEDEN BU UC SECILDI
 * ---------------------------------------------------------------------
 * Excel sunucusunda kalan "ince" uclari olctum; neredeyse hicbiri ince
 * degil (bkz. asagidaki siniflandirma). Bu uc ISTISNA: tek sinif
 * (MusteriAyrintiMonth, 84 satir), TEK SQL sorgusu, veritabanina
 * YAZMIYOR. Yani tasinabilir en kucuk tam birim.
 *
 *   uc                              bagimli oldugu motor        satir/sorgu
 *   /finance/reports/test           FinanceTest + VadeAnaliste   1556 / 92
 *   /finance/reports/test/filter    ayni                         1556 / 92
 *   /finance/reports/mekmer/all     FinanceTestAll               1556 / 92
 *   /finance/po/paid/list/mekmer/   FinanceTest.getPoPaidList    1556 / 92
 *   /finance/po/list/mekmer/{id}    MusteriAyrinti                438 / 18
 *   /raporlar/.../mkraporlari/{yil} MkRaporlari (7 metot)        1450 / 26
 *   /finance/po/list/mekmer/month/  MusteriAyrintiMonth           84 /  1  <-- bu
 *
 * ---------------------------------------------------------------------
 * SORGU AYNEN KORUNDU
 * ---------------------------------------------------------------------
 * `?` yerine parametreli `@month`. Sorgunun kendisine DOKUNULMADI --
 * icinde dort tane korele alt sorgu var ve TedarikciID in (1,123)
 * filtresi hem alt sorgularda hem dista tekrarliyor; "duzeltmek"
 * sonucu degistirebilirdi.
 *
 * DIKKAT: sorgu YIL olarak YEAR(GETDATE()) kullaniyor, yani her zaman
 * ICINDE BULUNULAN YIL. Ay parametreyle geliyor ama yil gelmiyor --
 * Ocak'ta gecen yilin Aralik'ina bakmak MUMKUN DEGIL. Python'da da
 * boyleydi, davranis degistirilmedi.
 */

/* Python: __noneControl -- None/""/"undefined"/"null" -> 0 */
function noneControl(value: unknown): number {
  if (value === null || value === undefined) return 0
  if (value === "" || value === "undefined" || value === "null") return 0

  const n = Number(value)
  return Number.isFinite(n) ? n : 0
}

/*
 * Python: __floatControlDecimal -- -8 ile 8 ARASINDAKI bakiyeyi 0 sayar.
 *
 * Kurus artiklarini "kapali" gostermek icin. Sinir DAHIL (>= -8 && <= 8),
 * tablodaki yesil vurgu ise `kalan > 8` diyor; yani tam 8 olan bakiye
 * hem 0'a yuvarlanir hem vurgulanmaz -- tutarli.
 */
function floatControlDecimal(value: number): number {
  return value >= -8 && value <= 8 ? 0 : value
}

type Row = {
  UrunBedeli: number | null
  FirmaAdi: string | null
  SiparisNo: string | null
  Odeme: number | null
  Iscilik: number | null
  SiparisTarihi: Date | null
  YuklemeTarihi: Date | null
  MusteriID: number | null
}

const SQL = `
select
  (select sum(su.AlisFiyati * su.Miktar) from SiparisUrunTB su
     where su.SiparisNo = s.SiparisNo and su.TedarikciID in (1,123)) as UrunBedeli,
  m.FirmaAdi,
  s.SiparisNo,
  (select sum(om.Tutar) from Odemeler_MekmerTB om
     where om.SiparisNo = s.SiparisNo) as Odeme,
  (select sum(seg.Tutar) from SiparisEkstraGiderlerTB seg
     where seg.SiparisNo = s.SiparisNo and seg.TedarikciID in (1,123)) as Iscilik,
  s.SiparisTarihi,
  s.YuklemeTarihi,
  m.ID as MusteriID
from SiparislerTB s
inner join MusterilerTB m on m.ID = s.MusteriID
inner join SiparisUrunTB sipu on sipu.SiparisNo = s.SiparisNo
where m.Marketing = 'Mekmar'
  and YEAR(s.YuklemeTarihi) = YEAR(GETDATE())
  and MONTH(s.YuklemeTarihi) = @month
  and sipu.TedarikciID in (1,123)
group by s.SiparisNo, m.FirmaAdi, s.SiparisTarihi, s.YuklemeTarihi, m.ID
order by s.YuklemeTarihi desc
`

export default defineEventHandler(async (event) => {
  const month = Number(getRouterParam(event, "month"))

  /*
   * Girdi dogrulamasi: Python'da YOKTU. Gecersiz ay dogrudan sorguya
   * gidiyor ve BOS liste donuyordu -- yani "o ay siparis yok" ile
   * "ay parametresi bozuk" ayni gorunuyordu.
   */
  if (!Number.isInteger(month) || month < 1 || month > 12) {
    throw createError({
      statusCode: 400,
      statusMessage: `Gecersiz ay: ${getRouterParam(event, "month")}`,
    })
  }

  const rows = await dbQuery<Row>(SQL, { month })

  const list = rows.map((item) => {
    const urunBedeli = item.UrunBedeli ?? 0
    const odeme = item.Odeme ?? 0
    const iscilik = noneControl(item.Iscilik)

    const toplam = urunBedeli + iscilik

    return {
      musteriadi: item.FirmaAdi ?? "",
      musteri_id: item.MusteriID,
      siparisno: item.SiparisNo ?? "",
      yuklemetarihi: sqlDate(item.YuklemeTarihi),

      toplam,
      /* Python'da ikisi AYNI deger; ayri alan olarak duruyor cunku
       * kardes uc (customer-orders) ayni semayi kullaniyor ve orada
       * farklilasiyor. */
      siparis_total: toplam,

      /* kalan -8..8 suzgecinden gecer, kalan2 GECMEZ -- Python'da da oyle. */
      kalan: floatControlDecimal(toplam - odeme),
      kalan2: toplam - odeme,

      odenen_tutar: odeme,
      iscilik,
    }
  })

  /*
   * Python sema uzerinden 15 alan donduruyordu; 5'i (id, tip, vade,
   * pesinat, tahmini_eta) bu uc icin HIC ATANMIYOR, yani sinif
   * varsayilanlariyla (None/""/0) gidiyordu. Istemcide okuyan yer
   * olmadigi icin donulmuyorlar.
   *
   * Gerceklen okunan alanlar: siparisno, yuklemetarihi, toplam,
   * iscilik, kalan (tablo + Excel ciktisi), musteri_id (satir secimi).
   */
  return { list }
})
