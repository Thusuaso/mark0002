import mssql from "mssql"

/*
 * Nitro rotalarindan MSSQL erisimi.
 *
 * ---------------------------------------------------------------------
 * NEDEN VAR
 * ---------------------------------------------------------------------
 * Python tarafindan kurtulma planinda tasinan uclarin cogu veritabanina
 * gidiyor. Legacy Express API'si (api/index.js) kendi baglantisini
 * kuruyor ama onu DISA VERMIYOR (`dbReady` modul-yerel bir degisken).
 *
 * Bu yuzden Nitro rotalari icin ince bir erisim katmani gerekiyordu.
 *
 * ---------------------------------------------------------------------
 * IKINCI HAVUZ ACILMIYOR -- KAYNAKTAN DOGRULANDI
 * ---------------------------------------------------------------------
 * mssql'in global baglanti mantigi (mssql@10.0.4,
 * node_modules/mssql/lib/global-connection.js):
 *
 *     let globalConnection = null
 *     ...
 *     if (!globalConnection) {
 *       globalConnection = new shared.driver.ConnectionPool(config)   // satir 17-18
 *       ...
 *     }
 *     return globalConnection.connect()                               // satir 59
 *
 * Yani `mssql.connect(config)` YALNIZCA global havuz yokken yeni havuz
 * kurar; varsa mevcut havuzu dondurur ve VERILEN CONFIG'I YOK SAYAR.
 *
 * api/index.js acilista `mssql.connect(sql)` cagiriyor
 * (server/middleware/1.legacy-api.ts onu import ettigi icin). Dolayisiyla
 * normal akista buradaki cagri o havuzu yeniden kullaniyor.
 *
 * Config yalnizca "Nitro rotasi legacy API'den ONCE calisirsa" durumu
 * icin duruyor -- pratikte olmasi zor ama havuzsuz kalmaktan iyi.
 *
 * ---------------------------------------------------------------------
 * DIKKAT -- CONFIG IKI YERDE
 * ---------------------------------------------------------------------
 * Asagidaki config api/index.js:25'teki kopyanin AYNISI. api/index.js
 * onu disa vermedigi icin tekrar yazmak zorunlu kaldi. Ikisi ayni ortam
 * degiskenlerini okuyor, yani ortam degisikliginde birlikte degisiyorlar;
 * ama HAVUZ AYARI (max/min/idle) degistirilecekse IKI yerde de
 * degistirilmeli. api/index.js tamamen tasindiginda bu kopya tek kaynak
 * olacak.
 */
const config: mssql.config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  server: process.env.DB_SERVER as string,
  options: {
    encrypt: false,
    trustServerCertificate: false,
    connectTimeout: 60000,
    requestTimeout: 60000,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
}

/*
 * Baglanti havuzunu dondurur.
 *
 * Her cagrida mssql.connect cagrilmasi sorun degil: yukaridaki nota gore
 * global havuz varsa aninda onu donduruyor.
 */
export function getDb(): Promise<mssql.ConnectionPool> {
  return mssql.connect(config)
}

/*
 * Parametreli sorgu.
 *
 * NEDEN PARAMETRELI: legacy api/index.js'in bircok yerinde SQL dizge
 * birlestirmesiyle kuruluyor (`... where ID='${req.params.id}'`) -- yani
 * SQL enjeksiyonuna acik. Bu katmandan gecen yeni kod oyle yazilmasin
 * diye tek giris noktasi parametreli.
 *
 * Kullanim:
 *     const rows = await dbQuery<{ CURRENCY: number }>(
 *       "select CURRENCY from AyoCurrency where YEAR=@yil and MONTH=@ay",
 *       { yil: 2026, ay: 10 },
 *     )
 */
export async function dbQuery<T = Record<string, unknown>>(
  sql: string,
  params: Record<string, unknown> = {},
): Promise<T[]> {
  const pool = await getDb()
  const request = pool.request()

  for (const [key, value] of Object.entries(params)) {
    request.input(key, value)
  }

  const result = await request.query<T>(sql)
  return result.recordset ?? []
}

/*
 * Veri degistiren sorgu. Etkilenen satir sayisini dondurur.
 */
export async function dbExecute(
  sql: string,
  params: Record<string, unknown> = {},
): Promise<number> {
  const pool = await getDb()
  const request = pool.request()

  for (const [key, value] of Object.entries(params)) {
    request.input(key, value)
  }

  const result = await request.query(sql)
  return result.rowsAffected?.[0] ?? 0
}

/*
 * Promise.all'in guvenli surumu.
 *
 * ---------------------------------------------------------------------
 * NEDEN VAR -- DEV SUNUCUSUNU IKI KEZ OLDURDU
 * ---------------------------------------------------------------------
 * `Promise.all([q1, q2, ... q20])` ILK reddi firlatir; geri kalan
 * reddedilmis promise'lar ISLENMEMIS kalir. Node 24'te islenmemis bir
 * promise reddi SURECI OLDURUYOR.
 *
 * Olculdu: finans raporu ucu 20 sorguyu paralel atiyor. Sorgulardan
 * biri patladiginda (benim durumumda "Invalid object name
 * 'string_split'") uc once duzgun bir 500 dondurdu, hemen ardindan
 * digerlerinin reddi islenmemis kalip Nitro dev worker'ini comertti --
 * sonrasinda SAYFANIN TAMAMI 503 verdi, yalnizca o uc degil.
 *
 * allSettled hepsini bekler, yani islenmemis red kalmaz; sonra ilk
 * hata firlatilir, boylece cagiran taraf icin davranis Promise.all ile
 * ayni (tek hata, ayni hata).
 *
 * Kullanim Promise.all ile ayni, tuple tipleri korunur:
 *     const [a, b] = await dbAll([dbQuery(...), dbQuery(...)])
 */
export async function dbAll<T extends readonly unknown[]>(
  promises: readonly [...{ [K in keyof T]: Promise<T[K]> | T[K] }],
): Promise<T> {
  const settled = await Promise.allSettled(promises)

  const failed = settled.find((s) => s.status === "rejected")
  if (failed && failed.status === "rejected") throw failed.reason

  return settled.map((s) => (s as PromiseFulfilledResult<unknown>).value) as unknown as T
}
