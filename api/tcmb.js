const https = require("https");
const crypto = require("crypto"); // <-- 1. EKLENEN: Crypto kütüphanesini çağır

export default function (req, res, next) {
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

  console.log(`[TCMB Proxy] Temizlenen URL: ${cleanUrl}`);

  // --- 2. EKLENEN: SSL HATASINI ÇÖZEN AGENT ---
  const agent = new https.Agent({
    rejectUnauthorized: false,
    // Bu seçenek Node 18+ sürümünün eski sunucularla (TCMB) konuşmasını sağlar
    secureOptions:
      crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT |
      crypto.constants.SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION,
  });

  const options = {
    hostname: "www.tcmb.gov.tr",
    port: 443,
    path: cleanUrl,
    method: "GET",
    agent: agent, // <-- 3. EKLENEN: Oluşturduğumuz özel ajanı buraya tanımladık
    headers: {
      Host: "www.tcmb.gov.tr",
      "User-Agent": "Mozilla/5.0 (compatible; NuxtBot/1.0)",
      Accept: "application/xml, text/xml, */*; q=0.01",
    },
  };

  const proxyReq = https.request(options, (proxyRes) => {
    // TCMB'den gelen status code ve headerları aynen frontend'e ilet
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  proxyReq.on("error", (e) => {
    console.error(`Proxy Hatası: ${e.message}`);
    // Header gönderilmediyse hata kodu dön
    if (!res.headersSent) {
      res.statusCode = 500;
      res.end("Proxy Hatasi: " + e.message);
    }
  });

  proxyReq.end();
}
