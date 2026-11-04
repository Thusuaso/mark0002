/*
 * Excel sunucusundaki `/finance/po/list/mekmer/{musteri}` ucunun Nitro
 * karsiligi.
 *
 * Python kaynagi (gercek dosyadan okundu, ozetten degil):
 *   component/finance/finance.py:65  FinanceTestDetailFilterApi
 *   component/finance/detail.py:17   MusteriAyrinti
 *   model/financedetail.py:77        MusteriAyrintiSchema / MusteriOdemeSchema
 *
 * Cagri yeri: app/stores/finance.ts  setFinancePoMekmerList()
 *   -> ReportsMekmerFinancePoList (PO tablosu) + FinancePoForm (odeme formu)
 *
 * ---------------------------------------------------------------------
 * NEDEN DOGRULANABILIR
 * ---------------------------------------------------------------------
 * Veritabanina YAZMIYOR (sadece SELECT). Yani Python ucuyla yan yana
 * karsilastirilabiliyor -- "save/put/delete yapma" kisitini ihlal
 * etmeden. monthly-orders ucu ile ayni sebep.
 *
 * ---------------------------------------------------------------------
 * UCUNCU ANAHTAR (po_list) DONULMUYOR
 * ---------------------------------------------------------------------
 * Python uc anahtar donduruyor: ayrinti_list, odeme_liste, po_list.
 * `po_list` (getByCustomersPo -- musterinin tum siparis numaralari)
 * istemcide HIC OKUNMUYOR; tarama yalnizca `po_list_selected_emit`
 * gibi ilgisiz isimler buldu. Yani ucuncu sorgu bosa gidiyordu.
 *
 * Donulmedigi icin o sorgu da atildi. (Python'daki hali ayrica tuhafti:
 * `except: return False` -- hatada liste yerine `false` donduruyordu,
 * yani istemci dizi bekledigi yerde boolean alabilirdi.)
 *
 * ---------------------------------------------------------------------
 * IKI SORGU, IKI AYRI FORMUL -- ASIMETRI BILEREK KORUNDU
 * ---------------------------------------------------------------------
 * `ayrinti_list` iki listenin birlesimi:
 *
 *   __uretilenler   SiparisDurumID in (1,2)   tip = "Üretim"    ONCE
 *   __yuklenenler   SiparisDurumID = 3        tip = "Yükleme"   SONRA
 *
 * Sira onemli: Python `__uretilenler()` listesine `__yuklenenler()`
 * ogelerini EKLIYOR. Tabloda varsayilan siralama bu.
 *
 * Ayni gorunen alanlar IKI LISTEDE FARKLI HESAPLANIYOR:
 *
 *   alan           Yükleme                          Üretim
 *   -------------  -------------------------------  -------------------------
 *   siparis_total  toplam (her sey dahil)           SADECE urun bedeli
 *   toplam         urun+iscilik+navlun+t1+t2+t3     urun+iscilik
 *   kalan          YUVARLANIR (toplam - odeme)      YUVARLANMAZ
 *   kalan2         toplam - odeme                   siparis_total (odeme DUSULMEZ)
 *   pesinat        HAM deger (null olabilir)        null ise 0
 *   tahmini_eta    "YYYY-MM-DD"                     "DD-MM-YYYY"
 *
 * Bunlarin bir kismi acikca tutarsiz (ozellikle tahmini_eta'nin iki
 * farkli bicimi ve Üretim satirlarinda kalan2'nin odemeyi dusmemesi).
 * HICBIRI DEGISTIRILMEDI: bu uc muhasebe ekranini besliyor ve
 * "duzeltmek" ekrandaki sayilari degistirmek demek -- ayri bir karar.
 *
 * ---------------------------------------------------------------------
 * SORGULARDAKI IKI SESSIZ KURAL
 * ---------------------------------------------------------------------
 * [1] TedarikciID in (1,123,1407) -- aylik ucte (1,123), BURADA ucu.
 *     1407 fazladan. Sorgular oldugu gibi birakildi.
 *
 * [2] Iscilik alt sorgusu `YEAR(seg.Tarih) >= YEAR(GETDATE())` diyor,
 *     yani SADECE bu yil ve sonrasindaki ekstra giderler sayiliyor;
 *     gecen yilin iscilik gideri toplama GIRMIYOR. Python'da da boyle.
 *
 * ---------------------------------------------------------------------
 * PYTHON ILE ARASINDAKI TEK OLCULEN FARK: KAYAN NOKTA ARTIGI
 * ---------------------------------------------------------------------
 * Python (pyodbc) decimal kolonlarini Decimal okuyup aritmetigi TAM
 * yapiyor; Node (tedious) ayni kolonu IEEE754 double okuyor. Cikarmada
 * yakin iki sayinin birbirini goturmesi (catastrophic cancellation)
 * artik birakiyor:
 *
 *     kalan2   Python  0.002        Node  0.0019999999999527063
 *     toplam   Python  33035.855    Node  33035.854999999996
 *
 * OLCUM (549 musteri, 3574 ayrinti + 467 odeme satiri, 55011 alan):
 *   bit bit ayni        53643 alan
 *   sapan               1368 alan, HEPSI sayisal, en buyuk sapma 7.3e-12
 *   sayisal olmayan fark   0
 *   satir sayisi uyusmazligi 0
 *
 * Sapan alanlar: kalan2 (970 satir), kalan (256), toplam (71),
 * siparis_total (71). Geri kalan 11 alan -- id, musteriadi, musteri_id,
 * siparisno, yuklemetarihi, tip, vade, pesinat, tahmini_eta,
 * odenen_tutar, iscilik -- her satirda bit bit ayni.
 *
 * (Ilk olcumu 60 musteri ile yapmistim ve orada yalnizca kalan2
 *  sapiyordu; tam populasyon toplam/kalan/siparis_total'i de gosterdi.
 *  Ornek yaniltmisti -- bu yuzden 549'un hepsi tarandi.)
 *
 * YUVARLAMA DENENDI VE GERI ALINDI. 4 ondaliga yuvarlamak farki 387'den
 * 13'e dusurdu ama GERCEK VERIYI BOZDU: Python 1012.018971 derken
 * yuvarlanmis surum 1012.019 dedi. Sebebi kolon olcekleri (dogrudan
 * INFORMATION_SCHEMA'dan okundu):
 *
 *     SiparisUrunTB.AlisFiyati   decimal(18,7)
 *     SiparisUrunTB.Miktar       decimal(18,4)
 *     digerleri (Tutar, Navlun, DetayTutar_*, Pesinat)  decimal(18,2)
 *
 * SQL Server'da carpimin olcegi 7+4 = 11, yani UrunBedeli 11 ondaliga
 * kadar gidebilir. 11 ondalikli gercek veri ile 1e-13 mertebesindeki
 * gurultu arasinda savunulabilir bir yuvarlama esigi YOK.
 *
 * NEDEN BOYLE BIRAKILDI: en buyuk sapma 7.3e-12 ve ekranda her sey
 * formatPriceUsd ile 2 ondalikta gosteriliyor -- 7e-12 o gosterimi
 * degistiremez. Footer toplamlari da yuz mertebesinde satiri topluyor,
 * yani birikmis hata 1e-9 civari kalir.
 *
 * Gercek duzeltme yuvarlama degil, decimal'i KAYIPSIZ okumak olurdu
 * (tedious'a kolonlari string dondurtup Decimal aritmetigi yapmak) --
 * ayri ve cok daha buyuk bir is. Burada not edilip birakildi.
 */

/* Python: __noneControl */
function noneControl(value: unknown): number {
  if (value === null || value === undefined) return 0
  if (value === "" || value === "undefined" || value === "null") return 0

  const n = Number(value)
  return Number.isFinite(n) ? n : 0
}

/* Python: __floatControlDecimal -- -8..8 arasi bakiye 0 sayilir. */
function floatControlDecimal(value: number): number {
  return value >= -8 && value <= 8 ? 0 : value
}

type OrderRow = {
  ID: number | null
  SiparisNo: string | null
  YuklemeTarihi: Date | null
  Vade: Date | null
  TahminiEtaTarihi: Date | null
  FirmaAdi: string | null
  MusteriID: number | null
  NavlunSatis: number | null
  DetayTutar_1: number | null
  DetayTutar_2: number | null
  DetayTutar_3: number | null
  sigorta_tutar_satis: number | null
  Pesinat: number | null
  Odeme: number | null
  UrunBedeli: number | null
  Iscilik: number | null
}

/*
 * Iki sorgunun SELECT/FROM kismi ayni; tek fark SiparisDurumID filtresi
 * ve __yuklenenler'deki ORDER BY. Python'da iki ayri kopya olarak
 * duruyordu (kolon SIRASI bile farkliydi, sonuca etkisi yok).
 *
 * Sorgu metni aynen korundu -- eski virgullu JOIN yazimi
 * (from a,b where a.x=b.y) dahil. Modern INNER JOIN ayni plani uretir
 * ama gereksiz risk.
 */
const SELECT = `
select
  s.ID,
  s.SiparisNo,
  s.YuklemeTarihi,
  s.Vade,
  s.TahminiEtaTarihi,
  m.FirmaAdi,
  s.MusteriID,
  s.NavlunSatis,
  s.DetayTutar_1,
  s.DetayTutar_2,
  s.DetayTutar_3,
  s.sigorta_tutar_satis,
  s.Pesinat,
  (select sum(o.Tutar) from Odemeler_MekmerTB o
     where o.SiparisNo = s.SiparisNo and s.MusteriID = m.ID) as Odeme,
  (select sum(u.AlisFiyati * u.Miktar) from SiparisUrunTB u
     where u.SiparisNo = s.SiparisNo and u.TedarikciID in (1,123,1407)) as UrunBedeli,
  (select sum(seg.Tutar) from SiparisEkstraGiderlerTB seg
     where seg.SiparisNo = s.SiparisNo and seg.TedarikciID in (1,123,1407)
       and YEAR(seg.Tarih) >= YEAR(GETDATE())) as Iscilik
from SiparislerTB s, MusterilerTB m
where s.MusteriID = m.ID
  and m.ID = @customer
`

const SQL_URETILENLER = `${SELECT} and s.SiparisDurumID in (1,2)`
const SQL_YUKLENENLER = `${SELECT} and s.SiparisDurumID = 3 order by s.YuklemeTarihi desc`

/* Python semasinin ortak alanlari; iki liste de ayni semayi dolduruyor. */
function base(item: OrderRow) {
  return {
    id: item.ID,
    musteriadi: item.FirmaAdi ?? "",
    musteri_id: item.MusteriID,
    siparisno: item.SiparisNo ?? "",
    yuklemetarihi: sqlDate(item.YuklemeTarihi),
    vade: sqlDateTr(item.Vade),
  }
}

function mapYukleme(item: OrderRow) {
  const urunBedeli = item.UrunBedeli ?? 0
  const odeme = item.Odeme ?? 0
  const iscilik = noneControl(item.Iscilik)

  const toplam =
    urunBedeli +
    iscilik +
    noneControl(item.NavlunSatis) +
    noneControl(item.DetayTutar_1) +
    noneControl(item.DetayTutar_2) +
    noneControl(item.DetayTutar_3)

  return {
    ...base(item),
    tip: "Yükleme",
    /* Python: model.pesinat = item.Pesinat -- null KONTROLU YOK, yani
     * null oldugu gibi gidiyor (Üretim listesinde 0'a cevriliyor). */
    pesinat: item.Pesinat,
    tahmini_eta: sqlDate(item.TahminiEtaTarihi),

    toplam,
    siparis_total: toplam,
    kalan: floatControlDecimal(toplam - odeme),
    kalan2: toplam - odeme,
    odenen_tutar: odeme,
    iscilik,
  }
}

function mapUretim(item: OrderRow) {
  const urunBedeli = item.UrunBedeli ?? 0
  const odeme = item.Odeme ?? 0
  const iscilik = noneControl(item.Iscilik)

  return {
    ...base(item),
    tip: "Üretim",
    pesinat: item.Pesinat ?? 0,
    /* Yükleme listesinde "YYYY-MM-DD", burada "DD-MM-YYYY" -- tutarsiz
     * ama Python'daki hali bu. */
    tahmini_eta: sqlDateTr(item.TahminiEtaTarihi),

    /* siparis_total SADECE urun bedeli; toplam iscilikle birlikte. */
    siparis_total: urunBedeli,
    toplam: urunBedeli + iscilik,
    /* kalan -8..8 SUZGECINDEN GECMIYOR (Yükleme'de geciyor),
     * kalan2 odemeyi DUSMUYOR (Yükleme'de dusuyor). */
    kalan: urunBedeli + iscilik - odeme,
    kalan2: urunBedeli,
    odenen_tutar: odeme,
    iscilik,
  }
}

/*
 * Odeme listesi (Python: getOdemeListesi).
 *
 * Musteri id'si Python'da IKI KEZ parametre olarak geciyordu (`?,?`);
 * parametreli surumde tek isim iki yerde kullanilabiliyor, mantik ayni.
 */
const SQL_ODEME = `
select
  o.Tarih,
  sum(o.Tutar) as Tutar
from Odemeler_MekmerTB o
where o.MusteriID = @customer
  and o.SiparisNo in (
    select s.SiparisNo from SiparislerTB s
    where s.SiparisNo = o.SiparisNo and s.MusteriID = @customer
  )
group by o.Tarih
order by o.Tarih desc
`

type PaidRow = { Tarih: Date | null; Tutar: number | null }

export default defineEventHandler(async (event) => {
  const customer = Number(getRouterParam(event, "customer"))

  /*
   * Girdi dogrulamasi: Python'da YOKTU (`<int:customer>` yalnizca tam
   * sayi sarti koyuyordu). Gecersiz id sorguya gidip BOS liste
   * donduruyordu -- "musterinin siparisi yok" ile "id bozuk" ayni
   * gorunuyordu.
   */
  if (!Number.isInteger(customer) || customer <= 0) {
    throw createError({
      statusCode: 400,
      statusMessage: `Gecersiz musteri id: ${getRouterParam(event, "customer")}`,
    })
  }

  /*
   * Python dort sorguyu SIRAYLA calistiriyordu. Birbirine bagli
   * degiller, paralel gidiyorlar (po_list zaten atildi).
   */
  const [uretilenler, yuklenenler, odemeler] = await dbAll([
    dbQuery<OrderRow>(SQL_URETILENLER, { customer }),
    dbQuery<OrderRow>(SQL_YUKLENENLER, { customer }),
    dbQuery<PaidRow>(SQL_ODEME, { customer }),
  ])

  /* Sira: Üretim ONCE, Yükleme SONRA -- Python ile ayni. */
  const ayrinti_list = [
    ...uretilenler.map(mapUretim),
    ...yuklenenler.map(mapYukleme),
  ]

  /* Python'da `key` 1'den baslayan SAYAC -- veritabani id'si degil.
   * Tabloda satir anahtari olarak kullaniliyor. */
  const odeme_liste = odemeler.map((item, i) => ({
    id: i + 1,
    tarih: sqlDate(item.Tarih),
    tutar: item.Tutar,
  }))

  return { ayrinti_list, odeme_liste }
})
