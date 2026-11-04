/*
 * Excel sunucusundaki `/finance/doviz/liste/{yil}/{ay}/{gun}` ucunun
 * Nitro karsiligi (api/currency.py -> getDovizKurListe).
 *
 * O uc Excel'le ILGISIZDI: tek yaptigi TCMB'den o gunun USD satis
 * kurunu okumakti. Python tarafindan kurtulma planinin 2. adimi.
 *
 * ---------------------------------------------------------------------
 * NEDEN /tcmb-api ALTINDA
 * ---------------------------------------------------------------------
 * Yol `/finance/...` olarak birebir korunabilirdi ama Nitro sunucu
 * rotalari sayfa rotalariyla ayni adres uzayini paylasiyor ve
 * `/finance` HENUZ TASINMAMIS bir sayfa (navbar'daki olu linklerden
 * biri). Ileride o sayfa tasindiginda cakisirdi.
 *
 * Bu yuzden mevcut /tcmb-api ad alani kullanildi -- proxy ucu de orada
 * (server/routes/tcmb-api/kurlar/[...path].get.ts).
 *
 * ---------------------------------------------------------------------
 * DONUS BICIMI -- ESKIDEN FARKLI, BILEREK
 * ---------------------------------------------------------------------
 * Python ucu CIPLAK BIR SAYI donduruyordu ve cagri yerleri
 * `parseFloat(response.data)` yapiyordu. Yani "veri yok, en yakin gune
 * dusuldu" bilgisi KAYBOLUYORDU -- kullanici hangi gunun kurunu
 * aldigini goremiyordu.
 *
 * Burada useTcmb.ts ile AYNI govde donuyor:
 *   { date, rate, field, requestedDate, isFallback }
 *
 * Boylece cagri yerleri istese kuru, istese "bu kur aslinda su gune
 * ait" uyarisini gosterebiliyor. Mevcut cagri yerleri yalnizca `rate`
 * okuyor, yani davranis kaybi yok.
 *
 * ---------------------------------------------------------------------
 * `kind` NEDEN YOLDA -- IKI FARKLI KUR VAR
 * ---------------------------------------------------------------------
 * TCMB belgesinde USD icin IKI satis alani var ve Nuxt 2 kurulumu
 * ikisini AYRI AYRI kullaniyordu:
 *
 *   forex    -> ForexSelling      plugins/tcmb-service.js ($tcmb)
 *                                 -> <TcmbCurrency>
 *   banknote -> BanknoteSelling   Python api/currency.py:83
 *                                 -> /finance/doviz/liste/
 *                                 -> yedi muhasebe formu
 *
 * Ikisi AYNI DEGER DEGIL (forex: bankalar arasi, banknot: efektif).
 * Birini digerinin yerine koymak muhasebeye yazilan tutari degistirir.
 *
 * VARSAYILAN YOK, BILEREK: hangi kurun istendigi URL'de GORUNSUN.
 * Ilk surumde bu rota kosulsuz ForexSelling okuyordu ve yedi cagri
 * yerinin kurunu sessizce degistiriyordu -- `kind` tam bunu
 * engellemek icin eklendi.
 */

const KINDS = {
  forex: "ForexSelling",
  banknote: "BanknoteSelling",
} as const

export default defineEventHandler(async (event) => {
  const kind = getRouterParam(event, "kind") as keyof typeof KINDS | undefined

  if (!kind || !(kind in KINDS)) {
    throw createError({
      statusCode: 400,
      statusMessage: `Gecersiz kur turu: "${kind}". Beklenen: ${Object.keys(KINDS).join(" | ")}`,
    })
  }

  const field = KINDS[kind]

  const year = Number(getRouterParam(event, "year"))
  const month = Number(getRouterParam(event, "month"))
  const day = Number(getRouterParam(event, "day"))

  /*
   * Girdi dogrulamasi: Python tarafinda YOKTU ve gecersiz tarih
   * sessizce 0 donduruyordu -- cagri yerleri de `parseFloat(0)` alip
   * kuru SIFIR kabul ediyordu. Sifir kur, TL/USD cevrimlerinde
   * sifira bolme ya da sifir tutar demek.
   */
  if (
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    !Number.isInteger(day) ||
    year < 1996 ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: `Gecersiz tarih: ${year}-${month}-${day}`,
    })
  }

  /*
   * Ay 0 tabanli -> new Date(yil, ay-1, gun).
   * Gecersiz gun kombinasyonlari (orn. 31 Subat) Date tarafindan bir
   * sonraki aya tasinir; TCMB'de o gune ait dosya olmayacagi icin
   * geriye yurume mantigi devreye girer ve gecerli bir gun bulunur.
   */
  const requested = new Date(year, month - 1, day)

  try {
    return await getUsdRate(requested, { field })
  } catch (err) {
    /*
     * On gun geriye gidip de bulunamadiysa bu gercek bir sorun
     * (TCMB erisilemiyor ya da cok eski bir tarih istenmis).
     * Python tarafi bu durumda 0 donduruyordu -- sessizce yanlis.
     */
    console.error("[tcmb-api/usd] kur alinamadi:", err)
    throw createError({
      statusCode: 502,
      statusMessage:
        err instanceof Error ? err.message : "TCMB kuru alinamadi",
    })
  }
})
