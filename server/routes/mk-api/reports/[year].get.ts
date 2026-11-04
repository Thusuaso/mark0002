/*
 * Excel sunucusundaki `/raporlar/listeler/mkraporlari/{yil}` ucunun
 * Nitro karsiligi.
 *
 * Python kaynagi (gercek dosyadan okundu, ozetten degil):
 *   component/mk/mk.py:36       MkRaporlariApi
 *   component/mk/reports.py:9   MkRaporlari
 *   model/mk.py                 5 marshmallow semasi
 *
 * Cagri yeri: app/pages/reports/mekmar/mk.vue (3 yerden: mounted, yil
 * secimi, excel sonrasi yenileme).
 *
 * ---------------------------------------------------------------------
 * NEDEN DOGRULANABILIR
 * ---------------------------------------------------------------------
 * Veritabanina YAZMIYOR. Sorgularin hepsi select; cagrilan sakli yordam
 * da (musteri_bazinda_tum_genel_ciro_son_7) saf okuma -- tanimi
 * sys.sql_modules'tan okunup kontrol edildi: insert/update/delete/
 * truncate/drop/exec/merge izi YOK, gecici tablo YOK.
 *
 * ---------------------------------------------------------------------
 * ALTINCI ANAHTAR (byYuklemevSiparisler) DONULMUYOR
 * ---------------------------------------------------------------------
 * Python yedi anahtar donduruyordu. `byYuklemevSiparisler`
 * (mkRaporlarSevkSip, reports.py:265-314) istemcide HIC OKUNMUYOR --
 * tarama sifir referans buldu. Donulmedigi icin o sorgu da atildi.
 *
 * ---------------------------------------------------------------------
 * PYTHON'UN 425 SATIRLIK DEV DALLANMASI VERIYE CEVRILDI
 * ---------------------------------------------------------------------
 * getGenelMusteriSiparis (reports.py:713-1242) tek bir sakli yordam
 * cagirip sonucu hardcoded musteri id'lerine gore elden geciriyor:
 * bazi musterileri ATLIYOR, bazilarini baska bir musterinin uzerine
 * TOPLUYOR. 425 canli satirin neredeyse tamami ayni 10 satirin
 * kopyasi. Burada MERGE tablosu olarak duruyor (asagida).
 *
 * Python'un kendi icinde IC ICE DONGUSU var: her hedef musteri icin
 * tum sonucu bastan tarayip kaynaklarini ariyor (644 x 644). Burada
 * kaynaklar ONCE id'ye gore indeksleniyor, sonuc ayni.
 */

/* ---------------- Python: __getNoneType / getisNoneType ---------------- */

/** Python `__getNoneType`: None -> 0, aksi halde float(). */
function num(value: unknown): number {
  if (value === null || value === undefined) return 0
  const n = Number(value)
  return Number.isFinite(n) ? n : 0
}

/* ====================================================================
 * 1) byPo -- getPoBazindaYillikSiparisler (reports.py:17)
 * ==================================================================== */

const SQL_PO = `
select
  s.SiparisNo,
  m.FirmaAdi,
  sum(su.SatisToplam) as SiparisToplam,
  st.TeslimTur,
  s.SiparisTarihi
from SiparislerTB s
  inner join SiparisUrunTB su on su.SiparisNo = s.SiparisNo
  inner join MusterilerTB m on m.ID = s.MusteriID
  inner join SiparisTeslimTurTB st on st.ID = s.TeslimTurID
where YEAR(s.SiparisTarihi) = @year and m.Marketing = 'Mekmar'
group by s.SiparisNo, m.FirmaAdi, st.TeslimTur, s.SiparisTarihi
order by sum(su.SatisToplam) desc
`

/*
 * DIKKAT -- bu sorgu SiparisUrunTB'ye JOIN YAPMIYOR, yani navlun
 * toplamini siparis duzeyinde veriyor. Ustteki sorgu ise urun
 * satirlarini topluyor. Python'daki ayrim bu, degistirilmedi.
 */
const SQL_PO_NAVLUN = `
select
  s.SiparisNo,
  m.FirmaAdi,
  s.NavlunSatis + s.DetayTutar_1 + s.DetayTutar_2 + s.DetayTutar_3 + s.DetayTutar_4 as GelenTotal
from SiparislerTB s
  inner join MusterilerTB m on m.ID = s.MusteriID
where YEAR(s.SiparisTarihi) = @year and m.Marketing = 'Mekmar'
`

async function byPo(year: number) {
  const [rows, navlun] = await dbAll([
    dbQuery<{ SiparisNo: string; FirmaAdi: string; SiparisToplam: number | null; TeslimTur: string; SiparisTarihi: Date | null }>(SQL_PO, { year }),
    dbQuery<{ SiparisNo: string; GelenTotal: number | null }>(SQL_PO_NAVLUN, { year }),
  ])

  /*
   * Python her PO icin navlun listesini bastan tariyordu
   * (__getPoBazindaNavlun). Burada Map; AYNI PO birden fazla kez
   * gelirse Python ILK eslesmeyi aliyordu, Map de ilk yazilani
   * korusun diye `if (!has)` ile dolduruluyor.
   */
  const navlunByPo = new Map<string, number | null>()
  for (const n of navlun) if (!navlunByPo.has(n.SiparisNo)) navlunByPo.set(n.SiparisNo, n.GelenTotal)

  return rows.map((item) => {
    const fob = num(item.SiparisToplam)
    return {
      po: item.SiparisNo,
      fob,
      ddp: fob + num(navlunByPo.get(item.SiparisNo)),
      teslim: item.TeslimTur,
      firma: item.FirmaAdi,
      /*
       * Python "YYYY-MM-DD" donduruyor (olculdu: "2026-09-30").
       * Ham Date'i JSON'a vermek tam ISO ("2026-09-30T00:00:00.000Z")
       * uretiyordu -- 35 satirda fark cikti, duzeltildi.
       * UTC okuyucu: gerekcesi monthly-orders rotasinda.
       */
      tarih: sqlDate(item.SiparisTarihi),
    }
  })
}

/* ====================================================================
 * 2) byCustomer -- getMusteriBazindaUretim (reports.py:69)
 * ==================================================================== */

const SQL_CUSTOMER = `
select
  m.ID as MusteriId,
  m.FirmaAdi as MusteriAdi,
  m.Marketing,
  (select yu.UlkeAdi from YeniTeklif_UlkeTB yu where yu.Id = m.UlkeId) as Ulke,
  (select sum(SatisToplam) from SiparislerTB s, SiparisUrunTB u
     where s.SiparisNo = u.SiparisNo and s.SiparisDurumID = 2
       and s.MusteriID = m.ID and YEAR(s.SiparisTarihi) = @year) as FOB,
  (select sum(s.NavlunSatis) + sum(DetayTutar_1) + sum(DetayTutar_2) + sum(DetayTutar_3) + sum(DetayTutar_4)
     from SiparislerTB s
     where s.SiparisDurumID = 2 and s.MusteriID = m.ID and YEAR(s.SiparisTarihi) = @year) as CustPaid
from MusterilerTB m
`

async function byCustomer(year: number) {
  const rows = await dbQuery<{ MusteriId: number; MusteriAdi: string; Marketing: string; Ulke: string | null; FOB: number | null; CustPaid: number | null }>(SQL_CUSTOMER, { year })

  const out = []
  for (const item of rows) {
    /* Python: IKISI de null ise satir atlaniyor (biri null yeterli degil). */
    if (item.FOB === null && item.CustPaid === null) continue

    out.push({
      musteriAdi: item.MusteriAdi,
      /* Python'da HARDCODED: 37 numarali musteri Marketing kolonundan
       * bagimsiz "Imperial Homes" gorunuyor (reports.py:85). */
      marketing: item.MusteriId === 37 ? "Imperial Homes" : item.Marketing,
      ulkeAdi: item.Ulke,
      /* HAM deger -- Python burada __getNoneType KULLANMIYOR, yani
       * FOB null ise null gidiyor (toplamCfr'de ise 0 sayiliyor). */
      toplam: item.FOB,
      toplamCfr: num(item.FOB) + num(item.CustPaid),
    })
  }
  return out
}

/* ====================================================================
 * 3) byMarketing -- getMarketing (reports.py:106)   [SIPARIS / durum 2]
 * ==================================================================== */

const SQL_MARKETING = `
select
  sum(su.SatisToplam) as Toplam,
  m.Marketing as Marketing
from MusterilerTB m
  inner join SiparislerTB s on s.MusteriID = m.ID
  inner join SiparisUrunTB su on su.SiparisNo = s.SiparisNo
where s.SiparisDurumID = 2 and YEAR(s.SiparisTarihi) = @year
group by m.Marketing
`

const SQL_MARKETING_NAVLUN = `
select
  sum(s.NavlunSatis) + sum(s.DetayTutar_1) + sum(s.DetayTutar_2) + sum(s.DetayTutar_3) + sum(s.DetayTutar_4) as Navlun,
  m.Marketing as Marketing
from MusterilerTB m
  inner join SiparislerTB s on s.MusteriID = m.ID
where s.SiparisDurumID = 2 and YEAR(s.SiparisTarihi) = @year
group by m.Marketing
`

async function byMarketing(year: number) {
  const [rows, navlun] = await dbAll([
    dbQuery<{ Toplam: number | null; Marketing: string }>(SQL_MARKETING, { year }),
    dbQuery<{ Navlun: number | null; Marketing: string }>(SQL_MARKETING_NAVLUN, { year }),
  ])

  const navlunByMk = new Map<string, number | null>()
  for (const n of navlun) if (!navlunByMk.has(n.Marketing)) navlunByMk.set(n.Marketing, n.Navlun)

  return rows.map((item) => {
    const toplam = num(item.Toplam)
    return {
      /*
       * Bu uc byCustomer ile AYNI semayi (MusteriBazindaUretimSchema)
       * kullaniyor ama musteriAdi/ulkeAdi'yi HIC ATAMIYOR; marshmallow
       * onlari model varsayilani "" ile dokuyordu. Olcumde 2+2 alanda
       * fark cikti, eklendi.
       */
      musteriAdi: "",
      ulkeAdi: "",
      marketing: item.Marketing,
      toplam,
      toplamCfr: toplam + num(navlunByMk.get(item.Marketing)),
    }
  })
}

/* ====================================================================
 * 4) byMarketingYukleme -- getMarketingYukleme (reports.py:146)
 *    [YUKLEME / durum 3]
 * ==================================================================== */

const SQL_MK_YUKLEME = `
select
  sum(su.SatisToplam) as Toplam,
  m.Marketing as Marketing
from MusterilerTB m
  inner join SiparislerTB s on s.MusteriID = m.ID
  inner join SiparisUrunTB su on su.SiparisNo = s.SiparisNo
where YEAR(s.YuklemeTarihi) = @year and s.SiparisDurumID = 3
group by m.Marketing
`

const SQL_MK_YUKLEME_NAVLUN = `
select
  sum(s.NavlunSatis) as Navlun,
  sum(s.DetayTutar_1) as DetayTutar1,
  sum(s.DetayTutar_2) as DetayTutar2,
  sum(s.DetayTutar_3) as DetayTutar3,
  sum(s.DetayTutar_4) as DetayTutar4,
  m.Marketing as Marketing
from MusterilerTB m
  inner join SiparislerTB s on s.MusteriID = m.ID
where YEAR(s.YuklemeTarihi) = @year and s.SiparisDurumID = 3
group by m.Marketing
`

async function byMarketingYukleme(year: number) {
  const [rows, navlun] = await dbAll([
    dbQuery<{ Toplam: number | null; Marketing: string }>(SQL_MK_YUKLEME, { year }),
    dbQuery<{ Navlun: number | null; DetayTutar1: number | null; DetayTutar2: number | null; DetayTutar3: number | null; DetayTutar4: number | null; Marketing: string }>(SQL_MK_YUKLEME_NAVLUN, { year }),
  ])

  /*
   * DIKKAT -- PYTHON BURADA PATLAYABILIYORDU (davranis DEGISTIRILDI):
   * __getNavlunYukleme (reports.py:325) bes alani dogrudan topluyor:
   *     item.Navlun + item.DetayTutar1 + ... + item.DetayTutar4
   * Herhangi biri NULL ise Python `None + float` -> TypeError atar ve
   * getMarketingYukleme'nin try/except'i YOK, yani uc 500 doner ve
   * EKRANIN TAMAMI bos kalir. Ayrica marketing listede bulunamazsa
   * fonksiyon None donuyor ve `item.Toplam + None` yine TypeError.
   *
   * Burada her alan num() ile 0'a dusuyor. Fark yalnizca Python'un
   * CALISMADIGI durumlarda ortaya cikar; calistigi her girdide sonuc
   * ayni. Bilerek boyle: muhasebe ekraninin null bir masraf yuzunden
   * tamamen bos kalmasi istenen davranis degil.
   */
  const navlunByMk = new Map<string, number>()
  for (const n of navlun) {
    if (navlunByMk.has(n.Marketing)) continue
    navlunByMk.set(n.Marketing, num(n.Navlun) + num(n.DetayTutar1) + num(n.DetayTutar2) + num(n.DetayTutar3) + num(n.DetayTutar4))
  }

  return rows.map((item) => ({
    marketing: item.Marketing,
    /* HAM -- Python da burada donusturmuyor. */
    fobToplam: item.Toplam,
    cfrToplam: num(item.Toplam) + (navlunByMk.get(item.Marketing) ?? 0),
  }))
}

/* ====================================================================
 * 5) byMarketingDetayYukleme -- getMarketingDetail (reports.py:191)
 * ==================================================================== */

const SQL_MK_DETAIL = `
select
  m.ID as MusteriId,
  m.FirmaAdi as MusteriAdi,
  m.Marketing,
  (select yu.UlkeAdi from YeniTeklif_UlkeTB yu where yu.Id = m.UlkeId) as Ulke,
  (select sum(u.SatisToplam) from SiparislerTB s, SiparisUrunTB u
     where s.SiparisNo = u.SiparisNo and s.SiparisDurumID = 3
       and s.MusteriID = m.ID and YEAR(s.YuklemeTarihi) = @year) as Toplam
from MusterilerTB m
`

/*
 * Python bes ayri alt sorguyu TOPLUYORDU; biri NULL ise SQL'de
 * toplamin tamami NULL olur (NULL + x = NULL). Sorgu aynen korundu --
 * NULL sonucu asagida 0'a dusuyor (Python'da da oyle).
 */
const SQL_MK_DETAIL_NAVLUN = `
select
  m.ID as MusteriId,
  (select sum(s.NavlunSatis) from SiparislerTB s
     where s.SiparisDurumID = 3 and s.MusteriID = m.ID and YEAR(s.YuklemeTarihi) = @year) +
  (select sum(s.DetayTutar_1) from SiparislerTB s
     where s.SiparisDurumID = 3 and s.MusteriID = m.ID and YEAR(s.YuklemeTarihi) = @year) +
  (select sum(s.DetayTutar_2) from SiparislerTB s
     where s.SiparisDurumID = 3 and s.MusteriID = m.ID and YEAR(s.YuklemeTarihi) = @year) +
  (select sum(s.DetayTutar_3) from SiparislerTB s
     where s.SiparisDurumID = 3 and s.MusteriID = m.ID and YEAR(s.YuklemeTarihi) = @year) +
  (select sum(s.DetayTutar_4) from SiparislerTB s
     where s.SiparisDurumID = 3 and s.MusteriID = m.ID and YEAR(s.YuklemeTarihi) = @year) as Masraflar
from MusterilerTB m
`

async function byMarketingDetail(year: number) {
  const [rows, navlun] = await dbAll([
    dbQuery<{ MusteriId: number; MusteriAdi: string; Marketing: string; Toplam: number | null }>(SQL_MK_DETAIL, { year }),
    dbQuery<{ MusteriId: number; Masraflar: number | null }>(SQL_MK_DETAIL_NAVLUN, { year }),
  ])

  const masrafById = new Map<number, number>()
  for (const n of navlun) if (!masrafById.has(n.MusteriId)) masrafById.set(n.MusteriId, num(n.Masraflar))

  const out = []
  for (const item of rows) {
    /* Python: Toplam null ise satir atlaniyor. */
    if (item.Toplam === null) continue

    out.push({
      musteri: item.MusteriAdi,
      marketing: item.Marketing,
      toplamFob: item.Toplam,
      toplamCfr: num(item.Toplam) + (masrafById.get(item.MusteriId) ?? 0),
    })
  }
  return out
}

/* ====================================================================
 * 6) byCustomerOrder -- getGenelMusteriSiparis (reports.py:713)
 * ==================================================================== */

type CiroRow = {
  MusteriId: number
  MusteriAdi: string
  UlkeAdi: string | null
  UlkeLogo: string | null
  Marketing: string | null
  Temsilci: string | null
  MusteriOncelik: string | null
  BuYilUretim: number | null
  BuYilSevkiyat: number | null
  BuYilCiro: number | null
  GecenYilCiro: number | null
  OncekiYilCiro: number | null
  OndokuzYilCiro: number | null
  OnSekizYilCiro: number | null
  OnYediYilCiro: number | null
  OnAltiYilCiro: number | null
  OnBesYilCiro: number | null
  OnDortYilCiro: number | null
  OnUcYilCiro: number | null
  RealOnUcCiro: number | null
  OnUcYilOncesiCiro: number | null
  GenelCiro: number | null
}

/* Python'un yil alanlari ile yordamin kolonlari arasindaki eslesme. */
const YEAR_FIELDS = [
  ["GecenYil", "GecenYilCiro"],
  ["OncekiYil", "OncekiYilCiro"],
  ["OnDokuzYili", "OndokuzYilCiro"],
  ["OnSekizYili", "OnSekizYilCiro"],
  ["OnYediYili", "OnYediYilCiro"],
  ["OnAltiYili", "OnAltiYilCiro"],
  ["OnBesYili", "OnBesYilCiro"],
  ["OnDortYili", "OnDortYilCiro"],
  ["OnUcYili", "OnUcYilCiro"],
] as const

/*
 * BIRLESTIRME TABLOSU -- Python'daki 425 satirlik if/elif zincirinin
 * tamami bu. `hedef` musterisi listede kalir, `kaynaklar` onun uzerine
 * toplanir ve kendileri listeden DUSER.
 *
 * `uretimSevkiyatiEzer`: Python 23 numarali musteride (Eski Depo)
 * BuYilUretim/BuYilSevkiyat'i `+=` DEGIL `=` ile yaziyor, yani son
 * eslesen kaynak hedefin kendi degerini EZIYOR. Digerlerinde bu iki
 * alana hic dokunulmuyor. Tutarsiz, ama davranis korundu -- rapordaki
 * sayilari degistirmemek icin (ayri karar).
 */
const MERGE: { hedef: number; kaynaklar: number[]; yeniAd?: string; uretimSevkiyatiEzer?: boolean }[] = [
  { hedef: 3446, kaynaklar: [6, 34] },
  { hedef: 169, kaynaklar: [32] },
  { hedef: 269, kaynaklar: [260, 217, 198, 191] },
  { hedef: 63, kaynaklar: [120, 67], yeniAd: "Diğer Ghana" },
  { hedef: 23, kaynaklar: [15, 205, 61, 12], yeniAd: "Eski Depo", uretimSevkiyatiEzer: true },
]

/*
 * Hicbir hedefe toplanmayan, sadece ATILAN musteriler.
 * Python'da ayri birer `continue` olarak duruyordu (reports.py:829-861).
 *
 * DIKKAT: 255 ve 236 hicbir MERGE grubunda kaynak DEGIL, yani ciro
 * bilgileri tamamen DUSUYOR -- hicbir yere eklenmiyor. Python'da da
 * boyle; kasitli mi, unutulmus mu bilinmiyor, degistirilmedi.
 */
const SADECE_ATILAN = [255, 236]

/*
 * ---------------------------------------------------------------------
 * ⚠ "IC PIYASA" OZET SATIRI RAPORA HIC GIRMIYOR -- PYTHON'DA OLU KOD
 * ---------------------------------------------------------------------
 * Python'da sirayla su var (reports.py):
 *
 *   853:  if item.Marketing == "İç Piyasa": continue      <-- ONCE
 *   ...
 *   1145: elif item.MusteriId == 242:                     <-- SONRA
 *           <~50 satir: tum Ic Piyasa musterilerini 242 uzerine topla>
 *
 * 242 numarali musteri "IÇ PIYASA" ve Marketing kolonu da "İç Piyasa"
 * (yordam cikisindan dogrulandi). Yani 853'teki `continue` ONCE
 * calisiyor ve 242 hicbir zaman 1145'teki dalina ULASAMIYOR.
 *
 * SONUC: Ic Piyasa ozet satiri -- olculdugunde 5.485.731,21 toplam --
 * raporda HIC GORUNMUYOR ve ~50 satirlik toplama kodu HIC CALISMIYOR.
 *
 * Ilk yazimda 242'yi gecirmistim; karsilastirmada "SADECE NX'TE: 242"
 * olarak cikti. Python'un davranisi taklit edildi (242 de atiliyor),
 * cunku rapora yeni bir satir eklemek -- hele 5.5 milyonluk bir ozet --
 * tasima isinin karari degil.
 *
 * KARAR VERILDI (kullanici): "raporlarda gorunmuyorsa hesaplanmasina
 * gerek yok". Yani satir GOSTERILMEYECEK ve HESAPLANMAYACAK. Bu kod
 * zaten Ic Piyasa satirlarini atliyor, yani ek bir toplama yapilmiyor;
 * Python'daki ~50 satirlik olu toplama blogu da tasinmadi.
 * ILERIDE "bu satir neden yok" diye sorulursa: kasitli.
 *
 * Python'daki olu toplama kodu BURAYA TASINMADI: calismayan kodu
 * cevirmek yaniltici olurdu. Istenirse geri getirilmesi kolay, kayit
 * bu nottur.
 */
const IC_PIYASA = "İç Piyasa"

async function byCustomerOrder() {
  /*
   * Sakli yordam: tanimi okunup saf okuma oldugu dogrulandi.
   * 644 satir, ~1.2 sn.
   */
  const rows = await dbQuery<CiroRow>("exec musteri_bazinda_tum_genel_ciro_son_7")

  const byId = new Map<number, CiroRow>()
  for (const r of rows) if (!byId.has(r.MusteriId)) byId.set(r.MusteriId, r)

  /* Hangi id'ler listeden dusecek: tum kaynaklar + sadece atilanlar. */
  const atilan = new Set<number>(SADECE_ATILAN)
  for (const g of MERGE) for (const k of g.kaynaklar) atilan.add(k)

  const hedefler = new Map(MERGE.map((g) => [g.hedef, g]))

  const out = []
  for (const item of rows) {
    if (atilan.has(item.MusteriId)) continue

    /*
     * Marketing "İç Piyasa" olan HER satir duser -- 242 dahil.
     * Gerekcesi yukaridaki uyari blogunda.
     */
    if (item.Marketing === IC_PIYASA) continue

    const base = {
      musteri_id: item.MusteriId,
      musteri: item.MusteriAdi,
      ulkeAdi: item.UlkeAdi,
      logo: item.UlkeLogo,
      temsilci: item.Temsilci,
      marketing: item.Marketing,
      oncelik: item.MusteriOncelik,
      /*
       * KullaniciSchema'da var ama getGenelMusteriSiparis onu HIC
       * atamiyor; marshmallow model varsayilani "" ile dokuyordu.
       * Olcumde 481 satirin hepsinde fark cikti, eklendi.
       */
      sonSiparisTarihi: "",
    }

    const group = hedefler.get(item.MusteriId)

    if (!group) {
      /*
       * Normal musteri -- Python'un `else` dali (reports.py:1199).
       * DIKKAT: burada yil alanlari HAM gidiyor (null kalabilir);
       * birlestirme dallarinda ise 0'a dusuyor. Python'daki ayrim bu.
       */
      out.push({
        ...base,
        BuYilUretim: item.BuYilUretim,
        BuYilSevkiyat: item.BuYilSevkiyat,
        BuYil: item.BuYilCiro,
        GecenYil: item.GecenYilCiro,
        OncekiYil: item.OncekiYilCiro,
        OnDokuzYili: item.OndokuzYilCiro,
        OnSekizYili: item.OnSekizYilCiro,
        OnYediYili: item.OnYediYilCiro,
        OnAltiYili: item.OnAltiYilCiro,
        OnBesYili: item.OnBesYilCiro,
        OnDortYili: item.OnDortYilCiro,
        OnUcYili: item.OnUcYilCiro,
        OnUcYiliOncesi: num(item.OnUcYilOncesiCiro) + num(item.RealOnUcCiro),
        Toplam: num(item.GenelCiro) - num(item.BuYilCiro) + num(item.OnUcYilOncesiCiro),
      })
      continue
    }

    /* --- birlestirme hedefi --- */
    const acc: Record<string, number> = {}
    for (const [out_, src] of YEAR_FIELDS) acc[out_] = num(item[src])

    let buYilUretim = item.BuYilUretim
    let buYilSevkiyat = item.BuYilSevkiyat
    let toplam = num(item.GenelCiro) - num(item.BuYilCiro) + num(item.OnUcYilOncesiCiro)

    /*
     * OnUcYiliOncesi: Python birlestirme dongusunun ICINDE de bunu
     * `item` (DIS satir) uzerinden YENIDEN HESAPLIYOR, `i` (kaynak)
     * uzerinden toplamiyor -- yani kaynaklarin OnUcYilOncesi degerleri
     * TOPLAMA GIRMIYOR. Ayni sonucu veren tek atama olarak duruyor.
     */
    const onUcOncesi = num(item.OnUcYilOncesiCiro) + num(item.RealOnUcCiro)

    const kaynaklar = group.kaynaklar
      .map((id) => byId.get(id))
      .filter((r): r is CiroRow => Boolean(r))

    for (const src of kaynaklar) {
      for (const [out_, col] of YEAR_FIELDS) acc[out_] += num(src[col])
      toplam += num(src.GenelCiro)

      if (group.uretimSevkiyatiEzer) {
        /* 23 (Eski Depo): ATAMA -- son kaynak kazanir. Bkz. MERGE notu. */
        buYilUretim = num(src.BuYilUretim)
        buYilSevkiyat = num(src.BuYilSevkiyat)
      }
    }

    out.push({
      ...base,
      musteri: group.yeniAd ?? item.MusteriAdi,
      BuYilUretim: buYilUretim,
      BuYilSevkiyat: buYilSevkiyat,
      BuYil: item.BuYilCiro,
      GecenYil: acc.GecenYil,
      OncekiYil: acc.OncekiYil,
      OnDokuzYili: acc.OnDokuzYili,
      OnSekizYili: acc.OnSekizYili,
      OnYediYili: acc.OnYediYili,
      OnAltiYili: acc.OnAltiYili,
      OnBesYili: acc.OnBesYili,
      OnDortYili: acc.OnDortYili,
      OnUcYili: acc.OnUcYili,
      OnUcYiliOncesi: onUcOncesi,
      Toplam: toplam,
    })
  }

  return out
}

/* ==================================================================== */

export default defineEventHandler(async (event) => {
  const year = Number(getRouterParam(event, "year"))

  /*
   * Girdi dogrulamasi: Python'da yoktu (`<int:year>` yalnizca tam sayi
   * sarti koyuyordu). Gecersiz yil sorgulara gidip BOS liste
   * donduruyordu -- "o yil veri yok" ile "yil bozuk" ayni gorunuyordu.
   */
  if (!Number.isInteger(year) || year < 1990 || year > 2200) {
    throw createError({
      statusCode: 400,
      statusMessage: `Gecersiz yil: ${getRouterParam(event, "year")}`,
    })
  }

  /* Python alti sorgu grubunu SIRAYLA calistiriyordu; bagimsizlar. */
  const [po, customer, marketing, marketingYukleme, marketingDetail, customerOrder] =
    await dbAll([
      byPo(year),
      byCustomer(year),
      byMarketing(year),
      byMarketingYukleme(year),
      byMarketingDetail(year),
      byCustomerOrder(),
    ])

  return {
    byPo: po,
    byCustomer: customer,
    byMarketing: marketing,
    byMarketingYukleme: marketingYukleme,
    byMarketingDetayYukleme: marketingDetail,
    byCustomerOrder: customerOrder,
  }
})
