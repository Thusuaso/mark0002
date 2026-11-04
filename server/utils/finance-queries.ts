/*
 * FinanceTest / FinanceTestAll'in onden cektigi sorgular.
 *
 * ---------------------------------------------------------------------
 * BU DOSYA KAYNAKTAN URETILDI -- ELLE YAZILMADI
 * ---------------------------------------------------------------------
 * component/finance/list.py icindeki __init__ govdelerinden sorgu
 * metinleri BIREBIR cikarildi (tools: scratchpad/extract-sql.mjs +
 * gen-queries.mjs). 22 sorguyu elle kopyalamak sessiz yazim hatasi
 * demekti; metin oldugu gibi alindi, yalnizca girinti kirpildi.
 *
 * Hicbirinde parametre (?) YOK -- hepsi tam liste cekiyor, suzme
 * Python tarafinda bellekte yapiliyordu.
 *
 * ---------------------------------------------------------------------
 * IKI SINIF ARASINDAKI TEK FARK
 * ---------------------------------------------------------------------
 * 22 sorgunun 20'si iki sinifta BIREBIR AYNI. Farklar:
 *
 *   customersFilter        Marketing IN listesi farkli:
 *                            FinanceTest     ('İç Piyasa','Mekmer')
 *                            FinanceTestAll  ('İç Piyasa','Mekmer','Mekmar')
 *   costFilterForwarding   yalnizca FinanceTest'te var
 *
 * Bu yuzden musteri sorgusu tek ve Marketing listesi parametreli;
 * digerleri paylasimli.
 */

/*
 * Musteri listesi. Python'da UC ayri kopya vardi; tek fark Marketing
 * listesiydi, o yuzden parametreli.
 *
 *   /reports/test         -> 'Mekmar,Imperial Homes'
 *   /reports/test/filter  -> 'İç Piyasa,Mekmer'
 *   /reports/mekmer/all   -> 'İç Piyasa,Mekmer,Mekmar'
 *
 * NEDEN string_split DEGIL: sunucu SQL Server 2019 ama veritabaninin
 * COMPATIBILITY_LEVEL'i 120 (yani 2014). string_split 130+ istiyor ve
 * "Invalid object name 'string_split'" hatasi veriyor -- olculdu.
 *
 * Bu yuzden uc ayri parametre: `in (@m1, @m2, @m3)`. NULL hicbir seyle
 * eslesmedigi icin kullanilmayan yuvalar zararsiz, ve SQL hala
 * dizge birlestirmesi ICERMIYOR.
 */
export const SQL_CUSTOMERS = `
  select
  m.ID,
  m.FirmaAdi,
  m.Marketing
  from MusterilerTB m
  where m.ID in
  (
  select
  s.MusteriID
  from SiparislerTB s
  where
  s.MusteriID = m.ID
  )
  and m.Mt_No=2 and m.ID not in (6,34,43,314,153) and m.Marketing in (@m1, @m2, @m3)
`

export const SQL_ORDERS = `
  select
  sum(s.NavlunSatis) as Navlun,
  sum(s.DetayTutar_1) as Detay1,
  sum(s.DetayTutar_2) as Detay2,
  sum(s.DetayTutar_3) as Detay3,
  sum(s.sigorta_tutar_satis) as Sigorta,
  s.MusteriID,
  (select k.KullaniciAdi from KullaniciTB k where k.ID = m.MusteriTemsilciId) as Temsilci
  from SiparislerTB s
  inner join MusterilerTB m on m.ID = s.MusteriID
  where
  m.Mt_No = 2 and s.SiparisDurumID in (1,2,3)
  group by
  s.MusteriID,m.MusteriTemsilciId
`

export const SQL_PRODUCTS = `
  select
  sum(su.SatisToplam) as SatisToplam,
  s.MusteriID
  from SiparislerTB s
  inner join SiparisUrunTB su on su.SiparisNo = s.SiparisNo
  where
  s.MusteriID in (
  select m.ID from MusterilerTB m where m.ID = s.MusteriID and m.Mt_No=2
  )
  group by
  s.MusteriID
`

export const SQL_PRODUCTS_FILTER = `
                                  select
  SUM(su.AlisFiyati * su.Miktar) as SatisToplam,
  s.MusteriID
  from SiparislerTB s
  inner join SiparisUrunTB su on su.SiparisNo = s.SiparisNo
  where
  s.MusteriID in (
  select m.ID from MusterilerTB m where m.ID = s.MusteriID and m.Mt_No=2
  ) and su.TedarikciID in (1,123,1407)
  group by
  s.MusteriID
`

export const SQL_PAIDS = `
  select
  sum(o.Tutar) as Tutar,
  s.MusteriID

  from OdemelerTB o

  inner join SiparislerTB s on s.SiparisNo = o.SiparisNo

  where
  s.MusteriID in (
      select m.ID from MusterilerTB m where m.Mt_No=2
  )
  group by
  s.MusteriID
`

export const SQL_PAIDS_FILTER = `
  select
  sum(o.Tutar) as Tutar,
  s.MusteriID

  from Odemeler_MekmerTB o

  inner join SiparislerTB s on s.SiparisNo = o.SiparisNo

  where
  s.MusteriID in (
      select m.ID from MusterilerTB m where m.Mt_No=2
  )
  group by
  s.MusteriID
`

export const SQL_PAIDS_FORWARDING = `
  select
  sum(o.Tutar) as Tutar,
  s.MusteriID

  from OdemelerTB o

  inner join SiparislerTB s on s.SiparisNo = o.SiparisNo

  where
  s.MusteriID in (
      select m.ID from MusterilerTB m where m.Mt_No=2
  )
  and s.SiparisDurumID = 3
  group by
  s.MusteriID
`

export const SQL_PAIDS_PRODUCTION = `
  select
  sum(o.Tutar) as Tutar,
  s.MusteriID

  from OdemelerTB o

  inner join SiparislerTB s on s.SiparisNo = o.SiparisNo

  where
  s.MusteriID in (
      select m.ID from MusterilerTB m where m.Mt_No=2
  )
  and s.SiparisDurumID in (1,2)
  group by
  s.MusteriID
`

export const SQL_ORDERS_FORWARDING = `
  select
  sum(s.NavlunSatis) as Navlun,
  sum(s.DetayTutar_1) as Detay1,
  sum(s.DetayTutar_2) as Detay2,
  sum(s.DetayTutar_3) as Detay3,
  sum(s.sigorta_tutar_satis) as Sigorta,
  s.MusteriID,
  (select k.KullaniciAdi from KullaniciTB k where k.ID = m.MusteriTemsilciId) as Temsilci
  from SiparislerTB s
  inner join MusterilerTB m on m.ID = s.MusteriID
  where
  m.Mt_No = 2 and s.SiparisDurumID = 3
  group by
  s.MusteriID,m.MusteriTemsilciId
`

export const SQL_ORDERS_PRODUCTION = `
  select
  sum(s.NavlunSatis) as Navlun,
  sum(s.DetayTutar_1) as Detay1,
  sum(s.DetayTutar_2) as Detay2,
  sum(s.DetayTutar_3) as Detay3,
  sum(s.sigorta_tutar_satis) as Sigorta,
  s.MusteriID,
  (select k.KullaniciAdi from KullaniciTB k where k.ID = m.MusteriTemsilciId) as Temsilci
  from SiparislerTB s
  inner join MusterilerTB m on m.ID = s.MusteriID
  where
  m.Mt_No = 2 and s.SiparisDurumID in (1,2)
  group by
  s.MusteriID,m.MusteriTemsilciId
`

export const SQL_PRODUCTS_FORWARDING = `
  select
  sum(su.SatisToplam) as SatisToplam,
  s.MusteriID
  from SiparislerTB s
  inner join SiparisUrunTB su on su.SiparisNo = s.SiparisNo
  where
  s.MusteriID in (
                      select m.ID from MusterilerTB m where m.ID = s.MusteriID and m.Mt_No=2
              )
  and s.SiparisDurumID=3
  group by
  s.MusteriID
`

export const SQL_PRODUCTS_FORWARDING_FILTER = `
  select
  sum(su.AlisFiyati * su.Miktar) as SatisToplam,
  s.MusteriID
  from SiparislerTB s
  inner join SiparisUrunTB su on su.SiparisNo = s.SiparisNo
  where
  s.MusteriID in (
                      select m.ID from MusterilerTB m where m.ID = s.MusteriID and m.Mt_No=2
              )
  and s.SiparisDurumID=3 and su.TedarikciID in (1,123,1407)
  group by
  s.MusteriID
`

export const SQL_PRODUCTS_PRODUCTION = `
  select
  sum(su.SatisToplam) as SatisToplam,
  s.MusteriID
  from SiparislerTB s
  inner join SiparisUrunTB su on su.SiparisNo = s.SiparisNo
  where
  s.MusteriID in (
                      select m.ID from MusterilerTB m where m.ID = s.MusteriID and m.Mt_No=2
              )
  and s.SiparisDurumID in (1,2)
  group by
  s.MusteriID
`

export const SQL_PRODUCTS_PRODUCTION_FILTER = `
  select
  sum(su.AlisFiyati * su.Miktar) as SatisToplam,
  s.MusteriID

  from SiparislerTB s
  inner join SiparisUrunTB su on su.SiparisNo = s.SiparisNo
  where
  s.MusteriID in (
                      select m.ID from MusterilerTB m where m.ID = s.MusteriID and m.Mt_No=2
              )
  and s.SiparisDurumID in (1,2) and su.TedarikciID in (1,123,1407)
  group by
  s.MusteriID
`

export const SQL_ADVANCE_PAYMENT = `
  select
  sum(s.Pesinat) as Pesinat,
  s.MusteriID,
  (select k.KullaniciAdi from KullaniciTB k where k.ID = m.MusteriTemsilciId) as Temsilci
  from SiparislerTB s
  inner join MusterilerTB m on m.ID = s.MusteriID
  where
  m.Mt_No = 2 and s.SiparisDurumID in (1,2)
  group by
  s.MusteriID,m.MusteriTemsilciId
`

export const SQL_ADVANCE_PAYMENT_FILTER = `
  select
  sum(s.Pesinat) as Pesinat,
  s.MusteriID,
  (select k.KullaniciAdi from KullaniciTB k where k.ID = m.MusteriTemsilciId) as Temsilci
  from SiparislerTB s
  inner join MusterilerTB m on m.ID = s.MusteriID
  where
  m.Mt_No = 2 and s.SiparisDurumID in (1,2) and m.Marketing in ('İç Piyasa','Imperial Homes')
  group by
  s.MusteriID,m.MusteriTemsilciId
`

export const SQL_MAYA_PAYMENT_ORDERS = `
  select
  s.SiparisNo,
  s.NavlunSatis + s.DetayTutar_1 + s.DetayTutar_2 + s.DetayTutar_3 + s.sigorta_tutar_satis as Cost,
  m.FirmaAdi,
  m.ID,
  s.SiparisTarihi,
  s.YuklemeTarihi
  from SiparislerTB s
  inner join MusterilerTB m on m.ID = s.MusteriID

  where
  s.MayaControl = 1
`

export const SQL_MAYA_PAYMENT_PRODUCTS = `
  select sum(su.SatisToplam) as Total,su.SiparisNo from SiparisUrunTB su
  inner join SiparislerTB s on s.SiparisNo = su.SiparisNo
  where
  s.MayaControl = 1
  group by
  su.SiparisNo
`

export const SQL_MAYA_PAYMENT_LIST = `
  select
  sum(o.Tutar) as Total,
  o.SiparisNo
  from OdemelerTB o
  inner join SiparislerTB s on s.SiparisNo = o.SiparisNo
  where
  s.MayaControl = 1

  group by
  o.SiparisNo
`

export const SQL_EXTRA_COST_FILTERED = `
  select s.MusteriID,
  sum(seg.Tutar) as Iscilik

  from

  SiparislerTB s
  inner join SiparisEkstraGiderlerTB seg on seg.SiparisNo = s.SiparisNo
  where seg.TedarikciID in (1,123) and YEAR(seg.Tarih) >= YEAR(GETDATE())
  group by s.MusteriID
`

export const SQL_COST_FILTER_FORWARDING = `
  select
 SUM(s.NavlunSatis) + SUM(s.DetayTutar_1) + SUM(s.DetayTutar_2) + SUM(s.DetayTutar_3) as Cost,
s.MusteriID
from SiparislerTB s
inner join SiparisUrunTB su on su.SiparisNo = s.SiparisNo
where
s.MusteriID in (
  select m.ID from MusterilerTB m where m.ID = s.MusteriID and m.Mt_No=2
  )
and s.SiparisDurumID=3 and su.TedarikciID in (1,123,1407) and YEAR(s.YuklemeTarihi) >= 2024
group by
s.MusteriID
`

/* FinanceTestAll'da bu sorgu YOK -- getListFilter'i costFilterForwarding
 * kullanmiyor. */
