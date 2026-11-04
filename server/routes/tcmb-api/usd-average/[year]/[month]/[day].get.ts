/*
 * Excel sunucusundaki `/finance/doviz/liste/average/{yil}/{ay}/{gun}`
 * ucunun Nitro karsiligi (Python: api/currency.py getCurrencyAverage,
 * satir 293).
 *
 * Cagri yeri: app/components/reports/mekmar/AyoFormCurrency.vue
 * ("ortalama kur" dugmesi -- AYO maliyet raporunda aylik ortalama kur).
 *
 * ---------------------------------------------------------------------
 * YOL NEDEN /usd-average, /usd/average DEGIL
 * ---------------------------------------------------------------------
 * Gunluk uc `/tcmb-api/usd/[kind]/{y}/{m}/{d}` biciminde. Bu dosya
 * `usd/average/...` altina konsa `/tcmb-api/usd/average/2026/10/31`
 * HER IKI rotayla eslesirdi ([kind] = "average").
 *
 * Nitro statik segmenti dinamik olana tercih eder, yani pratikte dogru
 * rota secilirdi -- ama bu, okuyana gorunmeyen bir onculuk kuralina
 * guvenmek demekti; yanlis tarafa dusse [kind] dogrulamasi
 * "Gecersiz kur turu: average" diye 400 verirdi.
 *
 * Ayri bir on ek ile belirsizlik tamamen kalkti.
 *
 * ---------------------------------------------------------------------
 * PYTHON'UN DAVRANISI BIREBIR KORUNDU
 * ---------------------------------------------------------------------
 *     total = 0; index = 0
 *     for item in range(1, int(gun) + 1):
 *         res = self.getDovizAvarageKurList(yil, ay, item)
 *         if res == 0 or res == 'Doviz Hata ...': continue
 *         else: total += float(res); index += 1
 *     if total == 0: return 0
 *     else: <AyoCurrency UPSERT>; return total/index
 *
 * Dort kritik ayrinti:
 *
 * [1] GUN 1'DEN `gun`'E KADAR -- yani `gun` ayin kac gun oldugu, bir
 *     tarih degil. Cagri yeri zaten boyle gonderiyor:
 *         const date = new Date(this.year, month_, 0)
 *         const days = date.getDate()        // ayin son gunu
 *
 * [2] VERI OLMAYAN GUN ATLANIYOR, GERIYE YURUNMUYOR. getUsdRate()'in
 *     geriye yurume davranisi BURADA YANLIS OLURDU: hafta sonu icin
 *     cuma kuru getirilirse o kur ayin icinde IKI-UC KEZ sayilir ve
 *     ortalama kayar. Bu yuzden fetchTcmbFile + parseUsdSelling
 *     dogrudan kullaniliyor, getUsdRate KULLANILMIYOR.
 *
 * [3] BanknoteSelling OKUNUYOR -- getDovizAvarageKurList satir 282.
 *     ForexSelling DEGIL. (Ayni hatayi gunluk ucta bir kez yaptim;
 *     bkz. commit f67c6f49a.)
 *
 * [4] SONUC `AyoCurrency` TABLOSUNA YAZILIYOR (UPSERT): ayni yil/ay
 *     varsa UPDATE, yoksa INSERT. Yani bu uc SALT OKUMA DEGIL --
 *     cagrilmasi veritabanini degistirir.
 *
 * ---------------------------------------------------------------------
 * TCMB'YE GUNDE 28-31 ISTEK -- DEGISTIRILMEDI
 * ---------------------------------------------------------------------
 * Python her gun icin ayri bir HTTP istegi atiyor; bir ay icin 28-31
 * istek. Burada da oyle, ama SIRAYLA degil PARALEL: Promise.all ile
 * hepsi birlikte gidiyor. Davranis ayni, sure ~30 kat kisa.
 *
 * TCMB'yi bogmamak icin es zamanlilik siniri var (CONCURRENCY).
 */

/* Ayni anda kac TCMB istegi. 31 istegi tek seferde atmamak icin. */
const CONCURRENCY = 6

async function rateForDay(
  year: number,
  month: number,
  day: number,
): Promise<number | null> {
  const mm = String(month).padStart(2, "0")
  const dd = String(day).padStart(2, "0")

  /*
   * Python ile AYNI yol: /kurlar/YYYYAA/GGAAYYYY.xml
   * (gunluk uctaki "today.xml" ozel durumu BURADA YOK -- Python'un
   *  getDovizAvarageKurList'inde de yok.)
   */
  const pathname = `/kurlar/${year}${mm}/${dd}${mm}${year}.xml`

  try {
    const xml = await fetchTcmbFile(pathname)
    if (!xml) return null

    const raw = parseUsdSelling(xml, "BanknoteSelling")
    if (!raw) return null

    const value = Number.parseFloat(raw)
    return Number.isFinite(value) && value > 0 ? value : null
  } catch (err) {
    /*
     * Python `except: return 0` yapiyor ve cagiran taraf 0'i ATLIYOR.
     * Burada null ayni anlama geliyor: o gun ortalamaya girmiyor.
     */
    console.warn(`[tcmb-api/usd/average] ${pathname} atlandi:`, err)
    return null
  }
}

export default defineEventHandler(async (event) => {
  const year = Number(getRouterParam(event, "year"))
  const month = Number(getRouterParam(event, "month"))
  const dayCount = Number(getRouterParam(event, "day"))

  /*
   * Girdi dogrulamasi: Python'da YOKTU. Gecersiz degerlerde orada
   * dongu hic donmuyor ya da patliyor ve 0 donuyordu -- cagri yeri de
   * `parseFloat(0)` alip ortalamayi SIFIR kabul ediyordu.
   */
  if (
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    !Number.isInteger(dayCount) ||
    year < 1996 ||
    month < 1 ||
    month > 12 ||
    dayCount < 1 ||
    dayCount > 31
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: `Gecersiz donem: ${year}-${month}, gun sayisi ${dayCount}`,
    })
  }

  const days = Array.from({ length: dayCount }, (_, i) => i + 1)
  const rates: number[] = []

  /* Parcali paralellik -- gerekcesi dosya basinda. */
  for (let i = 0; i < days.length; i += CONCURRENCY) {
    const batch = days.slice(i, i + CONCURRENCY)
    const results = await Promise.all(
      batch.map((day) => rateForDay(year, month, day)),
    )

    for (const rate of results) {
      if (rate !== null) rates.push(rate)
    }
  }

  /*
   * Python: `if total == 0: return 0` -- yani hicbir gunde veri yoksa
   * ORTALAMA 0 donuyor ve veritabanina HICBIR SEY yazilmiyor.
   *
   * Bu davranis korundu ama 0 yerine ACIK bir govde donuyor: cagri yeri
   * `parseFloat` ile okuyor, 0 ile "veri yok" ayirt edilemiyordu.
   * `average: 0` ve `dayCountWithData: 0` ikisini birlikte veriyor.
   */
  if (rates.length === 0) {
    console.warn(
      `[tcmb-api/usd/average] ${year}-${month}: hicbir gunde kur bulunamadi, ` +
        "AyoCurrency guncellenmedi.",
    )
    return {
      average: 0,
      field: "BanknoteSelling",
      year,
      month,
      dayCountRequested: dayCount,
      dayCountWithData: 0,
      stored: false,
    }
  }

  const average = rates.reduce((acc, r) => acc + r, 0) / rates.length

  /*
   * AyoCurrency UPSERT -- Python satir 307-319 ile ayni mantik,
   * parametreli sorguyla.
   *
   * Python once SELECT edip sonra UPDATE/INSERT ediyor (iki istek).
   * Burada da ayni sira korundu; tek bir MERGE yazmak mumkundu ama
   * MERGE'un MSSQL'deki bilinen yarisma durumu tuzaklari var ve bu uc
   * tek kullanici tarafindan, dugmeye basilarak cagriliyor.
   */
  const existing = await dbQuery<{ CURRENCY: number }>(
    "select CURRENCY from AyoCurrency where YEAR = @year and MONTH = @month",
    { year, month },
  )

  if (existing.length > 0) {
    await dbExecute(
      "update AyoCurrency set CURRENCY = @average where YEAR = @year and MONTH = @month",
      { average, year, month },
    )
  } else {
    await dbExecute(
      "insert into AyoCurrency(YEAR, MONTH, CURRENCY) values(@year, @month, @average)",
      { year, month, average },
    )
  }

  return {
    average,
    field: "BanknoteSelling",
    year,
    month,
    dayCountRequested: dayCount,
    dayCountWithData: rates.length,
    stored: true,
  }
})
