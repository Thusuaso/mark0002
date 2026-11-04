/*
 * Sunucu tarafi tarih bicimleyiciler.
 *
 * ---------------------------------------------------------------------
 * NEDEN VAR -- AYNI HATAYI UC KEZ YAPTIM
 * ---------------------------------------------------------------------
 * Python uclari tarihi metin olarak donduruyor ("2024-05-17"); mssql
 * surucusu ise JS `Date` veriyor ve JSON'a dogrudan verilince tam ISO
 * cikiyor ("2024-05-17T00:00:00.000Z"). Bu fark uc ayri ucta cikti
 * (byPo'da 35 satir, po-payments'ta 419 satir) ve her seferinde ancak
 * Python'la karsilastirma yakaladi -- derleme de, goz taramasi da
 * gormez.
 *
 * Fonksiyonun kendisi alti satir; uc kopya olarak durdugu surece
 * dorduncu uc yine kopyalanmayi bekliyordu.
 *
 * ---------------------------------------------------------------------
 * NEDEN UTC OKUYUCU, YEREL DEGIL
 * ---------------------------------------------------------------------
 * mssql, DATE kolonunu UTC gece yarisi olarak donduruyor. Yerel
 * okuyucu (getDate/getMonth) negatif saat diliminde gunu BIR GERI
 * kaydirir. Python tarafi saklanan takvim gununu oldugu gibi aliyordu;
 * UTC okuyucu bunun birebir karsiligi.
 *
 * (app/utils/dates.ts'teki toIsoDate YEREL okuyucu kullaniyor -- o
 *  istemci tarafi icin dogru, sunucuda kullanilmasi yanlis olurdu.)
 */

function parts(value: Date | string | null | undefined) {
  if (value === null || value === undefined) return null

  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return null

  return {
    y: String(date.getUTCFullYear()),
    m: String(date.getUTCMonth() + 1).padStart(2, "0"),
    d: String(date.getUTCDate()).padStart(2, "0"),
  }
}

/** "YYYY-MM-DD" (Python `strftime("%Y-%m-%d")`). Gecersiz/bos -> "" */
export function sqlDate(value: Date | string | null | undefined): string {
  const p = parts(value)
  return p ? `${p.y}-${p.m}-${p.d}` : ""
}

/** "DD-MM-YYYY" (Python `strftime("%d-%m-%Y")`). Gecersiz/bos -> "" */
export function sqlDateTr(value: Date | string | null | undefined): string {
  const p = parts(value)
  return p ? `${p.d}-${p.m}-${p.y}` : ""
}
