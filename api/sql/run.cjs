/*
 * SQL BETIGI CALISTIRICI
 *
 *   node api/sql/run.cjs api/sql/PaletTB.sql
 *
 * api/sql/*.sql dosyalarinin basindaki kullanim satirlari ONCEDEN BU
 * KOMUTU yaziyordu ama dosyanin kendisi depoda YOKTU: 11 betikte duran
 * talimat calistirilamiyordu. Burada o eksik kapatiliyor.
 *
 * NEDEN sqlcmd DEGIL: sqlcmd Windows'ta SQL Server araclariyla geliyor,
 * bu makinede yok (ve kurulumu betik calistirmak icin gereginden buyuk
 * bir sart). Proje zaten `mssql` paketine ve .env'deki baglanti
 * bilgilerine sahip; ikisini kullanmak yeterli.
 *
 * ------------------------------------------------------------------
 * [!] GO BIR SQL KOMUTU DEGIL
 * ------------------------------------------------------------------
 * `GO`, SSMS/sqlcmd'in BATCH AYIRICISIDIR; sunucu onu tanimaz.
 * Betigi tek parca gonderirsek "Incorrect syntax near 'GO'" alirsiniz.
 * Ayrica ayirici OLMADAN da calismaz: `create table` ile onu izleyen
 * `insert` ayni batch'te derlenir ve derleme aninda tablo henuz yoktur
 * ("Invalid object name"). Bu yuzden dosya GO'lardan bolunup her parca
 * AYRI AYRI gonderiliyor -- SSMS'in yaptigi is da budur.
 *
 * Bolme yalnizca SATIR BASINDAKI GO'ya bakiyor (onunde/arkasinda
 * yalnizca bosluk olabilir). Boylece bir metnin ya da yorumun icindeki
 * "go" kelimesi batch bolmez.
 */
const fs = require("node:fs")
const path = require("node:path")

require("dotenv").config()
const mssql = require("mssql")

const dosya = process.argv[2]
if (!dosya) {
  console.error("Kullanim: node api/sql/run.cjs <dosya.sql>")
  process.exit(1)
}

const tamYol = path.resolve(dosya)
if (!fs.existsSync(tamYol)) {
  console.error(`HATA: dosya bulunamadi: ${tamYol}`)
  process.exit(1)
}

/* .env'deki adlar api/index.js ile AYNI olmak zorunda -- betik ile
   uygulama ayni veritabanina baglanmali. */
const eksik = ["DB_USER", "DB_PASSWORD", "DB_NAME", "DB_SERVER"].filter(
  (k) => !process.env[k],
)
if (eksik.length) {
  console.error(`HATA: .env icinde eksik anahtar(lar): ${eksik.join(", ")}`)
  process.exit(1)
}

const ayar = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  server: process.env.DB_SERVER,
  /* api/index.js:33 ile BIREBIR ayni -- betik uygulamadan farkli bir
     sifreleme/sertifika ayariyla baglanmamali. */
  options: {
    encrypt: false,
    trustServerCertificate: false,
  },
  /* Betik batch'leri tablo olusturuyor; uygulamanin 60sn'si yetmezse
     diye daha genis. */
  requestTimeout: 120000,
}

async function main() {
  const icerik = fs.readFileSync(tamYol, "utf8")

  const batchler = icerik
    .split(/^[ \t]*go[ \t]*;?[ \t]*$/gim)
    .map((b) => b.trim())
    .filter((b) => b.length > 0)

  console.log(`[sql] ${path.basename(tamYol)} -- ${batchler.length} batch`)

  const pool = await mssql.connect(ayar)

  /*
   * `info` olayi: betiklerdeki `print` ciktisi (ornegin "PaletTB
   * olusturuldu.") buradan geliyor. Dinlenmezse betik sessizce calisir
   * ve neyin olustugu / neyin zaten var oldugu GORULMEZ -- oysa
   * idempotent betiklerin tek geri bildirimi o satirlar.
   */
  pool.on("info", (bilgi) => {
    if (bilgi?.message) console.log(`      ${bilgi.message}`)
  })

  try {
    for (let i = 0; i < batchler.length; i++) {
      const istek = pool.request()
      istek.on("info", (bilgi) => {
        if (bilgi?.message) console.log(`      ${bilgi.message}`)
      })
      await istek.batch(batchler[i])
      console.log(`[sql] batch ${i + 1}/${batchler.length} tamam`)
    }
    console.log("[sql] HAZIR")
  } finally {
    await pool.close()
  }
}

main().catch((hata) => {
  console.error(`\n[sql] HATA: ${hata.message}`)
  /* Hangi batch'te patladigini gormek icin: numara yukaridaki
     "batch i/n tamam" satirlarinin SONRASINDAKI batch'tir. */
  process.exit(1)
})
