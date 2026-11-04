/*
 * Excel sunucusundaki `/finance/po/paid/list/mekmer/{po}` ucunun Nitro
 * karsiligi.
 *
 * Python kaynagi (gercek dosyadan okundu, ozetten degil):
 *   component/finance/finance.py:110  FinanceTestPoPaidListFilterApi
 *   component/finance/list.py:432     FinanceTest.getPoPaidList
 *   model/financedetail.py            MusteriOdemeSecimSchema
 *
 * Cagri yeri: app/stores/finance.ts  setFinancePoPaidListMekmer()
 *
 * Veritabanina YAZMIYOR (tek select), yani Python ucuyla yan yana
 * dogrulanabiliyor.
 *
 * ---------------------------------------------------------------------
 * `select omt.*` ACIK YAZILDI
 * ---------------------------------------------------------------------
 * Python `select omt.*` kullaniyordu; donen govde Odemeler_MekmerTB'nin
 * o anki kolonlarina bagliydi. Semada yalnizca 9 alan okundugu icin
 * gerisi bosa geliyordu. Burada gereken kolonlar ACIK yazili: tabloya
 * kolon eklenince govde sessizce degismesin.
 */

type Row = {
  ID: number
  SiparisNo: string | null
  Tutar: number | null
  Aciklama: string | null
  Masraf: number | null
  Kur: number | null
  Tarih: Date | null
  MusteriID: number | null
  MusteriAdi: string | null
}

const SQL = `
select
  omt.ID,
  omt.SiparisNo,
  omt.Tutar,
  omt.Aciklama,
  omt.Masraf,
  omt.Kur,
  omt.Tarih,
  omt.MusteriID,
  (select m.FirmaAdi from MusterilerTB m where m.ID = omt.MusteriID) as MusteriAdi
from Odemeler_MekmerTB omt
where omt.SiparisNo = @po
`

export default defineEventHandler(async (event) => {
  const po = getRouterParam(event, "po")

  /*
   * Girdi dogrulamasi: Python'da yoktu. Bos/eksik PO sorguya gidip BOS
   * liste donduruyordu -- "bu PO'nun odemesi yok" ile "PO parametresi
   * bos" ayni gorunuyordu.
   */
  if (!po || !po.trim()) {
    throw createError({ statusCode: 400, statusMessage: "PO numarasi bos" })
  }

  const rows = await dbQuery<Row>(SQL, { po })

  const liste = rows.map((item) => ({
    id: item.ID,
    siparisno: item.SiparisNo,
    tutar: item.Tutar,
    aciklama: item.Aciklama,
    masraf: item.Masraf,
    kur: item.Kur,
    /*
     * Python "YYYY-MM-DD" donduruyor (olculdu). Ham Date tam ISO
     * uretiyordu -- 419 satirda fark cikti. sqlDate: server/utils/sql-date.ts
     */
    tarih: sqlDate(item.Tarih),
    musteri_id: item.MusteriID,
    musteriadi: item.MusteriAdi,
    /*
     * Semada var ama getPoPaidList bunlari HIC ATAMIYOR; marshmallow
     * model varsayilanlariyla ("" ve 0) dokuyordu. Ayni sessiz farki
     * mk raporlarinda yasadim (sonSiparisTarihi), bu yuzden bastan
     * ekli.
     */
    faturatur: "",
    sira: 0,
  }))

  /*
   * Python `{'liste': ...}` donduruyor (digerleri gibi `ayrinti_list`
   * degil). Anahtar adi korundu.
   */
  return { liste }
})
