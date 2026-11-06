/*
 * Excel sunucusundaki `/finance/po/paid/mekmer/save` ucunun Nitro
 * karsiligi.
 *
 * Cagri yeri:
 *   app/stores/finance.ts -> setPoPaidMekmerSave()
 *   (tetikleyen: app/pages/reports/mekmer/finance.vue -> save())
 *
 * ---------------------------------------------------------------------
 * KAYNAK (okundu)
 * ---------------------------------------------------------------------
 *   web.py:3068                     FinanceTestPaidFilterApi
 *   component/finance/finance.py:103  post -> setPaidSave
 *   component/finance/list.py:708   setPaidSave  <-- govde burada
 *
 * SQL ortak yardimcida: server/utils/odeme-mekmer.ts -- mekmar ucuyla
 * AYNI tabloya ve AYNI sutunlara yaziliyor; fark yalnizca Aciklama ve
 * KullaniciID'nin govdeden gelmesi.
 *
 * =====================================================================
 * [!] FinansOdemeTurID GOVDEDE VAR AMA KULLANILMIYOR
 * =====================================================================
 * Istemci modeli (app/stores/models.ts:456 financePoModelMekmer)
 * `FinansOdemeTurID` alanini TASIYOR ve varsayilani 0. Python ise onu
 * HIC OKUMUYOR, sabit 1 yaziyor (list.py:713).
 *
 * Ilk surumde burada `body.FinansOdemeTurID ?? null` yaziyordu --
 * yani gonderilen 0 kaydedilecekti. Bu bir odeme turu yabanci anahtari
 * oldugu icin yanlis deger finans raporlarini sessizce kaydirirdi.
 * Python'un davranisi birebir korundu; gerekcesi ortak yardimcida.
 */

import { insertOdemeMekmer } from "~~/server/utils/odeme-mekmer"

interface MekmerPaidBody {
  tarih?: string
  musteri_id?: number | string
  siparisno?: string
  aciklama?: string
  tutar?: number
  masraf?: number
  KullaniciID?: number
  kur?: number
}

export default defineEventHandler(async (event) => {
  const body = await readBody<MekmerPaidBody>(event)

  /*
   * Python eksik anahtarda KeyError atip {"status": false} donuyordu.
   * Burada 400 -- cagri yeri `if (response.status)` kontrolu yaptigi
   * icin hata kullaniciya zaten bildirilecek.
   */
  if (!body?.tarih || !body?.siparisno || body?.musteri_id == null) {
    throw createError({
      statusCode: 400,
      statusMessage: "tarih, siparisno ve musteri_id zorunlu.",
    })
  }

  const ok = await insertOdemeMekmer({
    tarih: body.tarih,
    musteriId: Number(body.musteri_id),
    siparisNo: body.siparisno,

    /*
     * Python bu ikisini govdeden aliyor (mekmar ucundan tek farki bu).
     * Alan yoksa Python KeyError ile duserdi; burada bos dizge / 0 ile
     * devam ediliyor -- tablo ikisinde de NULL kabul ediyor ama sabit
     * varsayilanlar mekmar ucuyla tutarli kalsin diye secildi.
     */
    aciklama: body.aciklama ?? "",
    kullaniciId: body.KullaniciID ?? 0,

    tutar: body.tutar ?? 0,
    masraf: body.masraf ?? 0,
    kur: body.kur ?? 0,
  })

  /* Govde sekli Python'la ayni: {"status": boolean}. */
  return { status: ok }
})
