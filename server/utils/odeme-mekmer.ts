/*
 * Odemeler_MekmerTB'ye odeme kaydi -- IKI UCUN ORTAK GOVDESI.
 *
 * ---------------------------------------------------------------------
 * KAYNAK (okundu)
 * ---------------------------------------------------------------------
 *   component/finance/list.py:708  setPaidSave      (mekmer ucu)
 *   component/finance/list.py:720  setPoSaveMekmar  (mekmar ucu)
 *
 * Python'da iki ayri fonksiyon var ama INSERT'leri HARF HARF AYNI --
 * ayni tablo, ayni on sutun, ayni sira:
 *
 *   insert into Odemeler_MekmerTB(
 *     Tarih, MusteriID, SiparisNo, FinansOdemeTurID, Aciklama,
 *     Tutar, Masraf, KullaniciID, FaturaKesimTurID, Kur)
 *   VALUES(?,?,?,?,?,?,?,?,?,?)
 *
 * Fark yalnizca BESLENEN DEGERLERDE:
 *
 *   setPoSaveMekmar : Aciklama = ''   KullaniciID = 0
 *                     (govde anahtarlari: date/customer/po/paid/cost/currency)
 *   setPaidSave     : Aciklama ve KullaniciID GOVDEDEN
 *                     (govde anahtarlari: tarih/musteri_id/siparisno/
 *                      aciklama/tutar/masraf/KullaniciID/kur)
 *
 * Bu yuzden SQL burada TEK yerde duruyor; iki rota yalnizca kendi
 * govde seklini bu bicime cevirip cagiriyor.
 *
 * =====================================================================
 * [!] FinansOdemeTurID VE FaturaKesimTurID SABIT 1 -- GOVDEDEN OKUNMAZ
 * =====================================================================
 * Python ikisine de duz 1 yaziyor (list.py:713 ve :725'teki
 * parametre demetinde 4. ve 9. deger).
 *
 * Bu, OZELLIKLE onemli bir ayrinti: mekmer tarafinda istemci govdede
 * `FinansOdemeTurID` ALANINI GONDERIYOR (models.ts:462,
 * financePoModelMekmer icinde, varsayilani 0) ama Python onu YOK
 * SAYIYOR. Eger burada "govdede var, oyleyse kullanalim" denseydi
 * kayitlara FinansOdemeTurID=0 yazilacakti; bu bir odeme turu yabanci
 * anahtari ve yanlis deger finans raporlarini SESSIZCE kaydirirdi.
 *
 * Davranis birebir korundu: ikisi de sabit 1.
 *
 * ---------------------------------------------------------------------
 * SEMA DOGRULANDI (INFORMATION_SCHEMA.COLUMNS)
 * ---------------------------------------------------------------------
 *   ID int NOT NULL (identity)   Tarih date         MusteriID int
 *   SiparisNo varchar(50)        SiparisID int      FinansOdemeTurID int
 *   Aciklama varchar(max)        Tutar decimal      Masraf decimal
 *   FaturaNo varchar(50)         KullaniciID int    FaturaKesimTurID int
 *   Kur decimal
 * Yazilan on sutunun hepsi var ve ID disindakiler NULL kabul ediyor.
 *
 * ---------------------------------------------------------------------
 * PARAMETRELI SORGU
 * ---------------------------------------------------------------------
 * Python pyodbc ile `?` parametreleri kullaniyordu; burada adli
 * parametreler. Hicbir deger dizgeye GOMULMUYOR.
 */

export interface OdemeMekmerRow {
  tarih: string
  musteriId: number
  siparisNo: string
  aciklama: string | null
  tutar: number
  masraf: number
  kullaniciId: number | null
  kur: number
}

const INSERT_SQL = `
  insert into Odemeler_MekmerTB (
    Tarih,
    MusteriID,
    SiparisNo,
    FinansOdemeTurID,
    Aciklama,
    Tutar,
    Masraf,
    KullaniciID,
    FaturaKesimTurID,
    Kur
  )
  values (
    @tarih,
    @musteriId,
    @siparisNo,
    1,
    @aciklama,
    @tutar,
    @masraf,
    @kullaniciId,
    1,
    @kur
  )
`

/**
 * Tek satirlik odeme kaydi ekler.
 *
 * @returns eklenen satir sayisi 1 ise true
 */
export async function insertOdemeMekmer(row: OdemeMekmerRow): Promise<boolean> {
  const affected = await dbExecute(INSERT_SQL, {
    tarih: row.tarih,
    musteriId: row.musteriId,
    siparisNo: row.siparisNo,
    aciklama: row.aciklama,
    tutar: row.tutar,
    masraf: row.masraf,
    kullaniciId: row.kullaniciId,
    kur: row.kur,
  })

  return affected === 1
}
