/* ==========================================================================
   api/sql/run.cjs - SQL script calistirici
   --------------------------------------------------------------------------
   Proje kokunden calistirilir, .env icindeki DB_* degerlerini kullanir:

     node api/sql/run.cjs api/sql/YeniYuklemeEvraklarTB_EvrakListesi.sql

   Birden fazla dosya verilebilir, sirayla calisirlar. Dosyalar GO
   satirlarindan bolunup her blok ayri batch olarak gonderilir (SSMS ile ayni
   davranis). Select ciktilari tablo olarak basilir.

   Paket kokunde "type": "module" oldugu icin uzanti .cjs olmak zorundadir.
   ========================================================================== */
const fs = require("fs");
const path = require("path");
const mssql = require("mssql");

function envOku(dosya) {
  const deger = {};
  if (!fs.existsSync(dosya)) {
    return deger;
  }
  for (const satir of fs.readFileSync(dosya, "utf8").split(/\r?\n/)) {
    const temiz = satir.trim();
    if (!temiz || temiz.startsWith("#")) {
      continue;
    }
    const ayir = temiz.indexOf("=");
    if (ayir < 1) {
      continue;
    }
    let val = temiz.slice(ayir + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    deger[temiz.slice(0, ayir).trim()] = val;
  }
  return deger;
}

/* GO ayirici yalnizca kendi satirinda duruyorsa gecerlidir. */
function batchlereBol(icerik) {
  return icerik
    .split(/^\s*go\s*;?\s*$/gim)
    .map((x) => x.trim())
    .filter((x) => x.length > 0);
}

(async () => {
  const dosyalar = process.argv.slice(2);
  if (dosyalar.length === 0) {
    console.error("Kullanim: node api/sql/run.cjs <script.sql> [script2.sql ...]");
    process.exit(1);
  }
  for (const d of dosyalar) {
    if (!fs.existsSync(d)) {
      console.error(`Dosya bulunamadi: ${d}`);
      process.exit(1);
    }
  }

  const env = { ...envOku(path.resolve(".env")), ...process.env };
  const eksik = ["DB_USER", "DB_PASSWORD", "DB_NAME", "DB_SERVER"].filter(
    (k) => !env[k]
  );
  if (eksik.length) {
    console.error(`.env icinde eksik deger: ${eksik.join(", ")}`);
    process.exit(1);
  }

  const pool = await mssql.connect({
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    server: env.DB_SERVER,
    options: {
      encrypt: false,
      trustServerCertificate: false,
      connectTimeout: 60000,
      requestTimeout: 120000,
    },
  });
  console.log(`Baglandi: ${env.DB_SERVER} / ${env.DB_NAME}\n`);

  try {
    for (const dosya of dosyalar) {
      console.log(`=== ${dosya} ===`);
      const batchler = batchlereBol(fs.readFileSync(dosya, "utf8"));
      for (let i = 0; i < batchler.length; i++) {
        const request = pool.request();
        /* print ve raiserror ciktilari */
        request.on("info", (bilgi) => console.log(`  ${bilgi.message}`));
        const sonuc = await request.query(batchler[i]);
        for (const kayit of sonuc.recordsets || []) {
          if (kayit.length) {
            console.table(kayit);
          }
        }
      }
      console.log(`--- ${dosya} tamamlandi ---\n`);
    }
  } finally {
    await pool.close();
  }
})().catch((err) => {
  console.error(`\nHATA: ${err.message}`);
  process.exit(1);
});
