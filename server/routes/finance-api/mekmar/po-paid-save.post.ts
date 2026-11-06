/*
 * Excel sunucusundaki `/finance/mekmar/po/paid/save` ucunun Nitro
 * karsiligi.
 *
 * Cagri yeri:
 *   app/pages/reports/mekmer/finance.vue -> saveFinanceMekmar()
 *
 * ---------------------------------------------------------------------
 * KAYNAK (okundu)
 * ---------------------------------------------------------------------
 *   web.py:3073                    FinanceTestListFilterPoApi
 *   component/finance/finance.py:56  post -> setPoSaveMekmar
 *   component/finance/list.py:720  setPoSaveMekmar  <-- govde burada
 *
 * SQL ortak yardimcida: server/utils/odeme-mekmer.ts
 *
 * =====================================================================
 * [!] BU DOSYANIN ONCEKI SURUMU YANLIS TABLOYA YAZIYORDU
 * =====================================================================
 * Ilk surum `OdemelerTB`'ye alti sutun yaziyordu ve gerekcesi
 * "Express'teki kardes uc (api/index.js:11380 POST
 * /finance/po/paid/save) oraya yaziyor" idi. O kardeslik YANLISTI:
 * Express'teki uc BASKA bir ozellik; bu ucun Python karsiligi
 * `setPoSaveMekmar` ve o `Odemeler_MekmerTB`'ye yaziyor -- mekmer
 * ucuyla AYNI tabloya.
 *
 * Python kaynagi okununca uc eksik alanin da cevabi cikti; tahmine
 * gerek kalmadi:
 *
 *     FinansOdemeTurID = 1      (sabit)
 *     Aciklama         = ''     (sabit BOS DIZGE, null degil)
 *     KullaniciID      = 0      (sabit sifir, null degil)
 *     FaturaKesimTurID = 1      (sabit)
 *
 * Eski surum bunlari NULL birakiyordu ve ustelik tabloyu da
 * sasiriyordu; devreye alinsaydi odemeler yanlis tabloya duserdi.
 *
 * ---------------------------------------------------------------------
 * GOVDE
 * ---------------------------------------------------------------------
 * reports/mekmer/finance.vue:437 `model`:
 *     { balanced, paid, cost, currency, date, po, customer }
 *
 * `balanced` KULLANILMIYOR -- Python da yazmiyor (kalan bakiye; tabloda
 * karsiligi olan sutun yok).
 */

import { insertOdemeMekmer } from "~~/server/utils/odeme-mekmer"

interface MekmarPaidBody {
  date?: string
  customer?: number | string
  po?: string
  paid?: number
  cost?: number
  currency?: number
}

export default defineEventHandler(async (event) => {
  const body = await readBody<MekmarPaidBody>(event)

  /*
   * Python gecersiz govdede KeyError atip {"status": false} + HTTP 200
   * donuyordu; istemci de yalnizca `if (res)` baktigi icin bunu
   * "Success" sayiyordu. Burada eksik zorunlu alan 400 ile
   * reddediliyor, yani sessiz basarisizlik olmuyor.
   */
  if (!body?.date || !body?.po || body?.customer == null) {
    throw createError({
      statusCode: 400,
      statusMessage: "date, po ve customer zorunlu.",
    })
  }

  const ok = await insertOdemeMekmer({
    tarih: body.date,
    musteriId: Number(body.customer),
    siparisNo: body.po,

    /* Python: sabit '' ve 0 -- null DEGIL (list.py:725). */
    aciklama: "",
    kullaniciId: 0,

    tutar: body.paid ?? 0,
    masraf: body.cost ?? 0,
    kur: body.currency ?? 0,
  })

  /* Govde sekli Python'la ayni: {"status": boolean}. */
  return { status: ok }
})
