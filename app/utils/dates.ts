/*
 * plugins/date.js karsiligi.
 *
 * !!! DIKKAT -- ISIM CAKISMASI !!!
 *
 * Projede `dateToString` adinda IKI AYRI fonksiyon vardi ve ciktilari
 * birbirinin tersi:
 *
 *   plugins/date.js          -> "2026-10-02"  (yil-ay-gun)   <- BU DOSYA
 *   plugins/components.js'te
 *   Vue.filter("dateToString") -> "02-10-2026"  (gun-ay-yil)
 *
 * Birincisi API'ye YAZILAN tarihler icin kullaniliyor (ornegin navbar'da
 * todo kayitlarinin GirisTarihi / YapildiTarihi alanlari), ikincisi ise
 * yalnizca EKRANDA GOSTERIM icin.
 *
 * Ikisini karistirmak derleme hatasi vermez, sessizce ters formatta veri
 * yazar. Bu yuzden adlar burada bilerek ayristirildi:
 *
 *   toIsoDate(value)      -> "2026-10-02"   (veri yazarken)
 *   formatters.dateToString(value) -> "02-10-2026"  (gosterirken)
 *
 * Eski `dateToString` adi geriye donuk uyumluluk icin takma ad olarak
 * duruyor, ama yeni kodda toIsoDate tercih edilmeli.
 */

function pad(value: number): string {
  return value.toString().length === 1 ? `0${value}` : String(value)
}

/** API'ye yazilan bicim: yil-ay-gun (orn. "2026-10-02") */
export function toIsoDate(value: Date | string | null | undefined): string {
  if (value == null) return ""

  const date = new Date(value)
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

/** "2026-10-02" -> Date. Gecersiz/bos giriste "" doner (orijinal davranis). */
export function fromIsoDate(value: string | null | undefined): Date | "" {
  if (value == null) return ""

  const [year, month, day] = value.split("-")
  return new Date(`${year}-${month}-${day}`)
}

/*
 * DEPRECATED ALIAS'LAR KALDIRILDI (2026-10-16).
 *
 * Burada `dateToString = toIsoDate` ve `stringToDate = fromIsoDate` diye
 * iki alias duruyordu. Hicbir yer onlari BU dosyadan import etmiyordu
 * (tum cagri yerleri toIsoDate / fromIsoDate kullaniyor), ama Nuxt'un
 * auto-import islemi ayni adlari app/utils/formatters.js'te de buldugu icin
 * her derlemede su uyari cikiyordu:
 *
 *   Duplicated imports "dateToString", the one from
 *   app/utils/dates.ts has been ignored and
 *   app/utils/formatters.js is used
 *
 * Cakismayi auto-import formatters.js LEHINE cozuyordu ve iki bicim
 * FARKLI:
 *     formatters.js dateToString -> "02-10-2026"  (GOSTERIM)
 *     dates.ts      toIsoDate    -> "2026-10-02"  (API)
 *
 * Yani ciplak `dateToString(x)` yazan biri ISO bekleyip SESSIZCE
 * gosterim bicimi aliyordu. Gecis sirasinda bu tuzaga UC kez denk
 * gelindi (offer/Form.vue, offer/Sample.vue, finance/PurchaseForm.vue --
 * ucunde de acik import yazmak zorunda kalindi).
 *
 * Alias'lar silinince cakisma ve uyari ortadan kalkti. Gosterim
 * bicimi isteyen formatters.js'ten (auto-import ya da acik) almaya
 * devam ediyor; API bicimi isteyen bu dosyadan toIsoDate aliyor.
 */
