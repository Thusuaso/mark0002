// api/tcmb.js
const https = require("https");

export default function (req, res, next) {
  // --- DÜZELTME BURADA ---
  // Gelen URL ne olursa olsun (örn: /api/tcmb-api/kurlar/...)
  // Biz sadece "/kurlar/" kelimesini bulup oradan sonrasını alacağız.

  const kurlarIndex = req.url.indexOf("/kurlar");

  // Eğer URL içinde /kurlar yoksa işlemi durdur
  if (kurlarIndex === -1) {
    res.statusCode = 400;
    res.end("Hatali URL: /kurlar/ eksik");
    return;
  }

  // Sadece /kurlar/202511/28112025.xml kısmını al
  const cleanUrl = req.url.substring(kurlarIndex);

  // Terminalde kontrol et (Bunu görünce sorunu anlayacağız)
  console.log(`[TCMB Proxy] Temizlenen URL: ${cleanUrl}`);

  const options = {
    hostname: "www.tcmb.gov.tr",
    port: 443,
    path: cleanUrl,
    method: "GET",
    rejectUnauthorized: false,
    headers: {
      Host: "www.tcmb.gov.tr",
      "User-Agent": "Mozilla/5.0 (compatible; NuxtBot/1.0)",
      Accept: "application/xml, text/xml, */*; q=0.01",
    },
  };

  const proxyReq = https.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  proxyReq.on("error", (e) => {
    console.error(`Proxy Hatası: ${e.message}`);
    res.statusCode = 500;
    res.end("Proxy Hatasi");
  });

  proxyReq.end();
}
