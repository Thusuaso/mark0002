/*
 * UC BASINA SURE OLCUMU -- gecici teshis araci.
 *
 * NEDEN VAR: "veri cekmek yavas" sikayetinin kaynagi tahminle
 * bulunamadi. Olculenler:
 *   - Python'dan gelen SAF VERI uclarinin 13'u zaten Nitro'ya tasinmis,
 *   - en agir Nitro route'u (mk-api/reports/[year]) sorgularini ZATEN
 *     dbAll ile paralel calistiriyor,
 *   - uygulamanin verisinin cogu Nitro'nun ICINE mount edilen 21k
 *     satirlik legacy Express'ten (api/index.js) geliyor.
 * Yani hangi ucun yavas oldugunu VERIYLE gormek gerekiyor.
 *
 * ZINCIRDEKI YERI: dosya adi "0a." ile basliyor cunku Nitro
 * middleware'leri ALFABETIK calisiyor ve bu olcumun digerlerinden
 * (0b.body-parser, 1.legacy-api) ONCE baslamasi gerekiyor:
 *     0a.perf-timing -> 0b.body-parser -> 1.legacy-api
 * Boylece sure, yanit hangi katmandan cikarsa ciksin bastan sona
 * olculuyor.
 *
 * NASIL CALISIR: istek girisinde zaman damgasi alinir, yanitin
 * "finish"/"close" olayinda sure hesaplanir. Ayni dinleyici kalibi
 * 1.legacy-api.ts'te de kullaniliyor (Express callback tabanli oldugu
 * icin yanit handler dondukten SONRA yaziliyor); bu yuzden olcum de o
 * olaya bagli, handler'in donusune DEGIL.
 *
 * ACIK/KAPALI:
 *   - gelistirmede (import.meta.dev) VARSAYILAN ACIK,
 *   - uretimde yalnizca PERF_LOG=1 ile acilir.
 * Kapaliyken middleware ilk satirda cikiyor, yani olcum maliyeti yok.
 *
 * ESIK: varsayilan 300 ms. PERF_LOG_MS ile degistirilebilir. Yalnizca
 * esigi GECEN istekler gunluge yaziliyor -- aksi halde her sayfa
 * acilisinda onlarca satir akar ve gunluk okunamaz hale gelir.
 *
 * OZET TABLO: /__perf (ayni acik/kapali kosuluna tabi) tum istekleri
 * -- esigin altindakiler dahil -- yol basina toplayip dondurur.
 *
 * GECICI: teshis bitince bu dosya ve server/routes/__perf.get.ts
 * silinecek. Kalici bir cozum degil; uretimde surekli acik tutmak
 * icin tasarlanmadi.
 */

const ENABLED = import.meta.dev || process.env.PERF_LOG === "1"

const SLOW_MS = Number(process.env.PERF_LOG_MS || 300)

/* Statik varlik ve HMR gurultusu olculmez. */
const IGNORE = /^\/(_nuxt|__nuxt|_ipx|favicon|__perf|socket\.io)/

export interface PerfRow {
  count: number
  total: number
  max: number
  maxPath: string
}

/*
 * Yol normalizasyonu: /api/order/products/12345 ile .../999 AYNI satirda
 * toplanmali, yoksa tablo binlerce tekil satira dagilir.
 * Sayisal, GUID ve tarih benzeri segmentler :p ile degistiriliyor.
 */
export function normalizePath(p: string): string {
  return p
    .split("?")[0]
    .split("/")
    .map((seg) => {
      if (!seg) return seg
      if (/^\d+$/.test(seg)) return ":p"
      if (/^[0-9a-f]{8}-[0-9a-f]{4}-/i.test(seg)) return ":p"
      if (/^\d{4}-\d{2}-\d{2}$/.test(seg)) return ":p"
      /* PO/kasa no gibi harf+rakam karisimi uzun kodlar */
      if (seg.length > 6 && /\d/.test(seg) && /[A-Za-z]/.test(seg)) return ":p"
      return seg
    })
    .join("/")
}

/* Surec omru boyunca bellekte; kalicilik YOK (gecici arac). */
export const perfStats = new Map<string, PerfRow>()

export default defineEventHandler((event) => {
  if (!ENABLED) return
  if (IGNORE.test(event.path)) return

  const res = event.node.res
  const started = performance.now()
  const key = `${event.method} ${normalizePath(event.path)}`

  let recorded = false

  const record = () => {
    if (recorded) return
    recorded = true

    res.removeListener("finish", record)
    res.removeListener("close", record)

    const ms = performance.now() - started

    const row = perfStats.get(key) ?? {
      count: 0,
      total: 0,
      max: 0,
      maxPath: event.path,
    }
    row.count++
    row.total += ms
    if (ms > row.max) {
      row.max = ms
      row.maxPath = event.path
    }
    perfStats.set(key, row)

    if (ms >= SLOW_MS) {
      console.warn(
        `[perf] ${ms.toFixed(0).padStart(6)}ms  ${res.statusCode}  ${key}`,
      )
    }
  }

  /*
   * Ikisi de dinleniyor: "finish" normal tamamlanma, "close" istemci
   * baglantiyi erken kaparsa. 1.legacy-api.ts ile ayni kalip.
   */
  res.once("finish", record)
  res.once("close", record)
})
