import https from "node:https"
import crypto from "node:crypto"

/*
 * TCMB kur okuma -- SUNUCU TARAFI.
 *
 * ---------------------------------------------------------------------
 * NEDEN VAR
 * ---------------------------------------------------------------------
 * Python tarafindan kurtulma planinin 2. adimi. Excel sunucusundaki
 * `/finance/doviz/liste/{yil}/{ay}/{gun}` ucu (api/currency.py
 * getDovizKurListe) aslinda Excel'le ILGISIZ: tek yaptigi TCMB'den o
 * gunun USD satis kurunu okumak.
 *
 * O mantik pilotta ZATEN IKI YERDE vardi:
 *   1. app/composables/useTcmb.ts -- tarayicida DOMParser ile
 *   2. plugins/currency.js        -- sunucuda xml2js ile (api/index.js:4205)
 * Artik ucuncu bir kopya yazmak yerine kaynak BURAYA alindi ve useTcmb
 * bunun uzerine ince bir sarmalayiciya indi.
 *
 * ---------------------------------------------------------------------
 * NEDEN SUNUCU TARAFI PARSE
 * ---------------------------------------------------------------------
 * DOMParser yalnizca tarayicida var. Burasi Nitro, yani Node -- bu
 * yuzden ayristirma duzenli ifadeyle yapiliyor. xml2js kullanmak da
 * mumkundu ama o paket aws-sdk'nin bagimliligi olarak geliyor ve TCMB
 * belgesi icin tek bir alan okunacak; tam bir XML ayristiricisi
 * gereksiz agirlik.
 *
 * ---------------------------------------------------------------------
 * TLS -- api/tcmb.js'ten DEVRALINAN AYAR
 * ---------------------------------------------------------------------
 * TCMB sunucusu eski TLS yeniden-anlasma bicimini kullaniyor; Node
 * varsayilan ayarlarla el sikisamiyor. secureOptions bunu aciyor.
 *
 * SERTIFIKA DOGRULAMASI ACIK: Nuxt 2'nin api/tcmb.js'i
 * `rejectUnauthorized: false` yaziyordu, yani ortadaki-adam saldirisina
 * aciktı -- ve bu kur verisi MUHASEBEYE giriyor. Yalnizca (a) eski TLS
 * uyumlulugu acildi, (b) dogrulama varsayilan (true) kaldi.
 * Dogrulamanin gercekten calistigi olculdu (bkz. commit 864302344).
 */

const TCMB_HOST = "www.tcmb.gov.tr"
const TIMEOUT_MS = 15_000

function pad(value: number): string {
  return String(value).padStart(2, "0")
}

export interface TcmbDateParts {
  /** TCMB dosya adi: GGAAYYYY */
  full: string
  /** TCMB klasoru: YYYYAA */
  yearMonth: string
  /** Karsilastirma/gosterim bicimi: GG-AA-YYYY */
  pretty: string
  date: Date
}

export function tcmbDateParts(value: Date | string | number): TcmbDateParts {
  const date = new Date(value)
  const day = pad(date.getDate())
  const month = pad(date.getMonth() + 1)
  const year = date.getFullYear()

  return {
    full: `${day}${month}${year}`,
    yearMonth: `${year}${month}`,
    pretty: `${day}-${month}-${year}`,
    date,
  }
}

/*
 * TCMB'den bir XML dosyasi ceker.
 *
 * Donus: govde dizgesi, ya da o gune ait dosya yoksa null.
 *
 * 404 BIR HATA DEGIL: TCMB hafta sonu/tatil gunleri icin dosya
 * yayinlamaz. Cagiran taraf bir gun geriye gidiyor.
 */
export function fetchTcmbFile(pathname: string): Promise<string | null> {
  const agent = new https.Agent({
    secureOptions:
      crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT |
      crypto.constants.SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION,
  })

  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: TCMB_HOST,
        port: 443,
        path: pathname,
        method: "GET",
        agent,
        headers: {
          Host: TCMB_HOST,
          "User-Agent": "Mozilla/5.0 (compatible; NuxtBot/1.0)",
          Accept: "application/xml, text/xml, */*; q=0.01",
        },
      },
      (res) => {
        if (res.statusCode === 404) {
          res.resume()
          resolve(null)
          return
        }

        if ((res.statusCode ?? 500) >= 400) {
          res.resume()
          reject(
            new Error(`TCMB ${pathname} -> HTTP ${res.statusCode}`),
          )
          return
        }

        let body = ""
        res.setEncoding("utf8")
        res.on("data", (chunk) => (body += chunk))
        res.on("end", () => resolve(body))
        res.on("error", reject)
      },
    )

    req.on("error", reject)

    /*
     * Zaman asimi: TCMB yanitsiz kalirsa istek sonsuza kadar asili
     * kalmasin. api/tcmb.js'te yoktu -- yanitsiz bir istek Node
     * baglantisini tutuyordu.
     */
    req.setTimeout(TIMEOUT_MS, () => {
      req.destroy(new Error(`TCMB zaman asimi (${TIMEOUT_MS / 1000}s)`))
    })

    req.end()
  })
}

/*
 * TCMB belgesindeki IKI AYRI USD satis alani.
 *
 * ---------------------------------------------------------------------
 * BU AYRIM GERCEK VE ONCEDEN VAR -- UYDURMA DEGIL
 * ---------------------------------------------------------------------
 * Nuxt 2 kurulumunda ayni uygulama IKI FARKLI kur kullaniyordu:
 *
 *   ForexSelling     plugins/tcmb-service.js ($tcmb.getUSDRate)
 *                    -> <TcmbCurrency> bileseni
 *
 *   BanknoteSelling  Python api/currency.py getDovizKurListe (satir 83)
 *                    -> Excel sunucusunun /finance/doviz/liste/ ucu
 *                    -> yedi muhasebe formu (PO odeme, avans, nakliye...)
 *
 * Ayni Python dosyasindaki getDovizAvarageKurList, getCurrencyUsdToEuro
 * ve getCurrencyEuroToTl de BanknoteSelling okuyor (satir 148, 150,
 * 215, 282).
 *
 * Ikisi AYNI DEGER DEGIL: forex kuru bankalar arasi islem kuru, banknot
 * kuru efektif (nakit) kuru. Birini digerinin yerine koymak muhasebeye
 * yazilan tutari degistirir.
 *
 * Bu yuzden alan adi cagiran tarafta ACIKCA veriliyor.
 */
export type TcmbSellingField = "ForexSelling" | "BanknoteSelling"

/*
 * Istenen USD satis alanini ayristirir.
 *
 * Donus: kur metni, ya da belge beklenen bicimde degilse null.
 */
export function parseUsdSelling(
  xml: string,
  field: TcmbSellingField = "ForexSelling",
): string | null {
  /*
   * TCMB veri olmayan tarihlerde XML DEGIL, HTML hata sayfasi
   * donduruyor -- 200 koduyla. Bu kontrol onu yakaliyor.
   */
  if (xml.trim().startsWith("<!DOCTYPE html>")) return null

  /*
   * USD bloğunu bul, icinden ForexSelling'i al.
   *
   * Kod sirasi/attribute sirasi degisebilir diye blok once Kod="USD"
   * ile sinirlaniyor; `[\s\S]` yeni satirlari da kapsiyor.
   */
  const usdBlock = xml.match(
    /<Currency[^>]*Kod="USD"[^>]*>([\s\S]*?)<\/Currency>/,
  )
  if (!usdBlock) return null

  const selling = usdBlock[1].match(
    new RegExp(`<${field}>([^<]*)</${field}>`),
  )
  if (!selling) return null

  const value = selling[1].trim()
  return value.length > 0 ? value : null
}

export interface TcmbRate {
  /** TCMB'de veri bulunan tarih, "GG-AA-YYYY" */
  date: string
  /** USD satis kuru, TCMB'nin verdigi metin hali */
  rate: string
  /** Hangi alandan okundu -- cagiran taraf dogrulayabilsin */
  field: TcmbSellingField
  /** Istenen tarih, "GG-AA-YYYY" */
  requestedDate: string
  /** Istenen tarihte veri YOKTU, geriye dogru en yakin gun getirildi */
  isFallback: boolean
}

/*
 * Istenen gunden baslayip veri bulana kadar GERIYE dogru gun gun gider.
 *
 * NEDEN GERIYE: TCMB hafta sonu ve resmi tatillerde dosya yayinlamaz.
 * api/currency.py de ayni seyi yapiyordu (orada yalnizca cumartesi
 * ozel olarak ele alinmisti; gun gun geri gitmek tatilleri de kapsar).
 *
 * maxRetry 10: useTcmb.ts'teki degerle ayni. On is gunu ustu ust
 * tatil pratikte yok; sinir sonsuz dongu korumasi.
 */
export async function getUsdRate(
  requested: Date | string | number,
  options: { field?: TcmbSellingField; maxRetry?: number } = {},
): Promise<TcmbRate> {
  const field = options.field ?? "ForexSelling"
  const maxRetry = options.maxRetry ?? 10

  const requestedPretty = tcmbDateParts(requested).pretty
  let target = new Date(requested)

  for (let left = maxRetry; left > 0; left--) {
    const { full, yearMonth, pretty, date } = tcmbDateParts(target)

    const now = new Date()
    const isToday =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()

    /*
     * Bugun icin TCMB'nin "today.xml" dosyasi var; gecmis gunler
     * YYYYAA/GGAAYYYY.xml yolunda.
     */
    const pathname = isToday
      ? "/kurlar/today.xml"
      : `/kurlar/${yearMonth}/${full}.xml`

    let xml: string | null = null

    try {
      xml = await fetchTcmbFile(pathname)
    } catch (err) {
      /*
       * Ag/TLS hatasi da bir gun geriye gitmeye sebep -- useTcmb.ts'teki
       * davranisla ayni. Sebebi gorulebilsin diye konsola yaziliyor.
       */
      console.warn(`[tcmb] ${pathname} okunamadi, bir gun geriye:`, err)
    }

    const rate = xml ? parseUsdSelling(xml, field) : null

    if (rate) {
      return {
        date: pretty,
        rate,
        field,
        requestedDate: requestedPretty,
        isFallback: pretty !== requestedPretty,
      }
    }

    target = new Date(date)
    target.setDate(target.getDate() - 1)
  }

  throw new Error(`Kur bulunamadı (${maxRetry} gün geriye gidildi).`)
}
