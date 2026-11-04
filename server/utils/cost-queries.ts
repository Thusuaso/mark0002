/*
 * maliyetListesi (YILLIK) zincirinin sorgulari.
 *
 * ---------------------------------------------------------------------
 * BU DOSYA KAYNAKTAN URETILDI -- ELLE YAZILMADI
 * ---------------------------------------------------------------------
 * Python kaynagindan sorgu metinleri BIREBIR cikarildi
 * (scratchpad/extract-cost.mjs); yalnizca girinti kirpildi ve `?`
 * yer tutuculari adli parametreye cevrildi.
 *
 *   component/cost.py:325     MaliyetRaporIslem_Yil.__init__   (9 sorgu)
 *   component/order.py:212    Siparisler_Yil                   (2 sorgu)
 *   component/product.py:177  Urunler_Yil                      (2 sorgu)
 *   component/execuse.py:316  Masraflar_Yil                    (3 sorgu)
 *   component/paid.py:6       Odemeler                         (1 sorgu)
 *
 * ---------------------------------------------------------------------
 * 17 SORGUNUN 4'U CEKILMIYOR -- SONUCU HIC OKUNMUYOR
 * ---------------------------------------------------------------------
 *   dtOzeliscilikFaturaList  tek kullanicisi yorumlu blok (cost.py:506)
 *   dtDovizKur               yillik yolda hic okunmuyor (aylik varyantta var)
 *   dtTedarikciForm          hic okunmuyor
 *   product.dtFaturalar      mekmar/mekmoz/dis evrak linklerini uretiyor
 *                            ama birlestirme urun_model'in o alanlarini
 *                            HIC OKUMUYOR (cost.py:452-454 kopyalari
 *                            yorumlu). Yani tedarikci fatura tablosu
 *                            bosa taraniyordu.
 *
 * Her biri tek tek dogrulandi (referans sayimi), tahmin edilmedi.
 */

/* Omurga: yuklemesi yapilmis Mekmar siparisleri (Siparisler_Yil.__siparisOlustur)
 * (Python: siparis.result) */
export const SQL_SIPARISLER = `
          select
           s.ID,
           s.SiparisNo,
           s.SiparisTarihi,
           s.YuklemeTarihi,
           m.FirmaAdi as MusteriAdi,
           s.NavlunSatis,
           s.DetayTutar_1,
           s.DetayTutar_2,
           s.DetayTutar_3,
           s.DetayTutar_4,
           s.NavlunAlis,
           s.DetayAlis_1,
           s.DetayAlis_2,
           s.DetayAlis_3,
           u.UlkeAdi,
           m.Marketing,
           t.TeslimTur,
           s.Komisyon,
           s.EvrakGideri,
           s.depo_yukleme,
           s.sigorta_Tutar,
           s.sigorta_id,
           s.sigorta_tutar_satis,
           (select k.KullaniciAdi from KullaniciTB k WHERE k.ID = s.SiparisSahibi) as siparisci,
  (select k.KullaniciAdi from KullaniciTB k WHERE k.ID = s.Operasyon) as operasyon,
  (select sum(ozel.Tutar) from SiparisEkstraGiderlerTB ozel  where ozel.SiparisNo=s.SiparisNo) as ozeliscilik,
           (select TOP 1 TedarikciID from SiparisEkstraGiderlerTB ozel  where ozel.SiparisNo=s.SiparisNo and ozel.TedarikciID=1) as isciliktedarikcimekmer,
  (select TOP 1 TedarikciID from SiparisEkstraGiderlerTB ozel  where ozel.SiparisNo=s.SiparisNo and ozel.TedarikciID=123) as isciliktedarikcimekmoz,
           (select f.FaturaAdi from FaturaKesilmeTB f where f.ID = s.FaturaKesimTurID) as faturalama,
  Month(s.YuklemeTarihi) as YuklemeMonth,
           YEAR(s.YuklemeTarihi) as YuklemeYil,
  MONTH(s.YuklemeTarihi) as YuklemeAy,
           DAY(s.YuklemeTarihi) as YuklemeGun,
           s.alisFiyatiControl
           from
           SiparislerTB s,MusterilerTB m,YeniTeklif_UlkeTB u,SiparisTeslimTurTB t
           where
           s.SiparisDurumID=3
           and m.Marketing='Mekmar'
           and m.UlkeId=u.Id
           and s.TeslimTurID=t.ID
           and s.MusteriID=m.ID
           and Year(s.YuklemeTarihi)=@year
           order by s.YuklemeTarihi asc
`

/* AlisFiyati NULL olan siparis satirlari -- kirmizi uyari rengi icin
 * (Python: siparis.alisFiyatiKontrolSql) */
export const SQL_ALIS_FIYATI_BOS = `
  select


      su.AlisFiyati,
      s.SiparisNo

  from SiparislerTB s ,
       SiparisUrunTB su
  where
      s.SiparisNo = su.SiparisNo and
      Year(s.YuklemeTarihi)=@year and
      su.AlisFiyati is null
`

/* Siparis urun satirlari: satis/alis toplami + tedarikci (Urunler_Yil)
 * (Python: urun.dtUrunler) */
export const SQL_URUNLER = `
  select
  u.SiparisNo,
  u.SatisToplam,
  (u.AlisFiyati * u.Miktar) as AlisToplam,
  u.TedarikciID
  from
  SiparisUrunTB u

  where
  u.SiparisNo in
  (
  Select s.SiparisNo from SiparislerTB s,MusterilerTB m
  where s.MusteriID=m.ID and u.SiparisNo=s.SiparisNo
  and s.SiparisDurumID=3 and m.Marketing='Mekmar'
  and Year(s.YuklemeTarihi)=@year
  )
`

/* Siparis fatura kayitlari (gumruk/nakliye/ilaclama/liman/lashing/booking/spazlet/satis faturasi)
 * (Python: masraf.dtMasraflar) */
export const SQL_MASRAFLAR = `
  select
  *
  from
  SiparisFaturaKayitTB f
  where f.SiparisNo in
  (
      Select s.SiparisNo from SiparislerTB s,MusterilerTB m
      where m.ID=s.MusteriID and s.SiparisNo=f.SiparisNo
      and s.SiparisDurumID=3
      and year(s.YuklemeTarihi)=@year
  )
  and f.YuklemeEvrakID in (
      70,13,73,50,16
  )
`

/* FaturaKayitID -> FirmaID eslesmesi (evrak linki icin)
 * (Python: masraf.dtFaturalar) */
export const SQL_KONTEYNER_FATURALARI = `
  select * from KonteynerDigerFaturalarKayitTB
`

/* Nakliye icin ayri FirmaID tablosu -- Python nakliyede BUNU kullaniyor
 * (Python: masraf.dtNakliyeFaturalar) */
export const SQL_NAKLIYE_FATURALARI = `
  select * from NakliyeFaturaKayitTB
`

/* Mekmar musterilerinin yuklenmis siparislerine gelen odemeler
 * (Python: odeme.dtOdemeler) */
export const SQL_ODEMELER = `
                 Select
           o.Tarih,
           o.SiparisNo,
           o.Masraf,
  sum(o.Tutar) as tutar,
           o.Kur
           from
           OdemelerTB o,MusterilerTB m
           where m.ID=o.MusteriID and m.Marketing='Mekmar'
           and o.SiparisNo in (
               Select s.SiparisNo from SiparislerTB s
               where s.SiparisNo=o.SiparisNo
               and s.MusteriID=m.ID
               and s.SiparisDurumID=3


           )
  group by o.Tarih , o.SiparisNo,  o.Masraf , o.Kur
           order by o.Tarih asc
`

/* Dis tedarikcili siparis/tedarikci ciftleri -- dis_alim_fatura_sayisi
 * (Python: cost.dtTedarikci_group_result) */
export const SQL_TEDARIKCI_GRUP = `
  select
  u.TedarikciID,
  u.SiparisNo
  from
  SiparisUrunTB u
  where
  u.TedarikciID not in (1,123) and
  u.SiparisNo in (
  Select s.SiparisNo from SiparislerTB s,MusterilerTB m
  where s.MusteriID=m.ID and s.SiparisNo=u.SiparisNo
  and m.Marketing='Mekmar'
  and s.SiparisDurumID=3
  and Year(s.YuklemeTarihi)=@year

  )
  group by u.TedarikciID,u.SiparisNo
`

/* dis_alim_evrak
 * (Python: cost.dtDisFaturaList) */
export const SQL_DIS_FATURA = `
      select

  u.TedarikciID ,
  s.SiparisNo
  from SiparisUrunTedarikciFormTB u , SiparisFaturaKayitTB s
   where s.SiparisNo=u.SiparisNo and U.TedarikciID not in (1,123) AND YuklemeEvrakID=3
    group by u.TedarikciID ,s.SiparisNo
`

/* mekmar_alim_evrak
 * (Python: cost.dtMekmarFaturaList) */
export const SQL_MEKMAR_FATURA = `
  select
  s.EvrakAdi ,
  u.TedarikciID ,
  s.SiparisNo
  from SiparisUrunTedarikciFormTB u , SiparisFaturaKayitTB s
   where s.SiparisNo=u.SiparisNo and YuklemeEvrakID=3 and u.TedarikciID=1
    group by u.TedarikciID , s.EvrakAdi,s.SiparisNo
`

/* mekmoz_alim_evrak
 * (Python: cost.dtMekmozFaturaList) */
export const SQL_MEKMOZ_FATURA = `
   select
  s.EvrakAdi ,
  u.TedarikciID ,
  s.SiparisNo
  from SiparisUrunTedarikciFormTB u , SiparisFaturaKayitTB s
   where s.SiparisNo=u.SiparisNo and YuklemeEvrakID=3 and u.TedarikciID=123
    group by u.TedarikciID , s.EvrakAdi,s.SiparisNo
`

/* dis_alim_tedarikci
 * (Python: cost.dtTedarikciFatura) */
export const SQL_TEDARIKCI_FATURA = `
  select * from Tedarikci_Siparis_FaturaTB
`

/* tedarikci_sayisi_evrak
 * (Python: cost.dtTedarikciTum) */
export const SQL_TEDARIKCI_TUM = `
  select TedarikciID ,SiparisNo from SiparisUrunTB where  TedarikciID not in (1,123) group by SiparisNo, TedarikciID
`

/*
 * ---------------------------------------------------------------------
 * AYLIK VARYANT -- YILLIK METINLER DEGISTIRILMEDI
 * ---------------------------------------------------------------------
 * Python'da aylik zincir (Siparisler / Urunler / Masraflar /
 * MaliyetRaporIslem) ayri SINIFLAR halinde yazilmis, ama sorgu
 * metinleri yillik surumle BIREBIR ayni -- tek fark bes sorguya
 * eklenen ay suzgeci:
 *
 *   component/order.py:19,78      Siparisler        (2 sorgu)
 *   component/product.py:24       Urunler           (1 sorgu)
 *   component/execuse.py:19       Masraflar         (1 sorgu)
 *   component/cost.py:33          MaliyetRaporIslem (1 sorgu)
 *
 * Bu yuzden metinler KOPYALANMADI: yillik metin tek kaynak olarak
 * duruyor ve ay suzgeci buradan mekanik olarak ekleniyor. Kopyalansaydi
 * ayni sorgunun iki surumu olur ve biri degisince digeri unutulurdu.
 *
 * DIKKAT -- `Year(...)` BUYUK/KUCUK HARF: SQL_MASRAFLAR'da `year(...)`
 * kucuk harfle yazilmis (Python kaynaginda da oyle), digerlerinde buyuk.
 * Kalip ikisini de yakaliyor.
 *
 * Eslesme sayisi DOGRULANIYOR: her sorguda `=@year` TAM BIR kez
 * gecmeli. SQL_SIPARISLER ayrica `YEAR(s.YuklemeTarihi) as YuklemeYil`
 * iceriyor ama orada `=@year` yok, yani yanlislikla eslesmiyor.
 * Sorgu metni ileride degisip kalip tutmazsa sessizce AY SUZGECSIZ
 * calismak yerine hata firlatiliyor -- aksi halde aylik uc, yilin
 * TAMAMINI dondururdu.
 */
const YIL_KALIBI = /([Yy]ear\(s\.YuklemeTarihi\)\s*=\s*@year)/g

export function ayFiltresiEkle(sql: string, ad: string): string {
  const eslesme = sql.match(YIL_KALIBI)
  if (!eslesme || eslesme.length !== 1) {
    throw new Error(
      `${ad}: ay suzgeci eklenemedi -- "=@year" ${eslesme ? eslesme.length : 0} kez gecti, 1 bekleniyordu.`,
    )
  }
  return sql.replace(YIL_KALIBI, "$1 and Month(s.YuklemeTarihi)=@month")
}
