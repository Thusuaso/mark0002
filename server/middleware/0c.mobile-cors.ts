/*
 * NITRO ROTALARI ICIN CORS -- yalnizca Android kabugu.
 *
 * NEDEN AYRICA GEREKIYOR: api/index.js icindeki CORS Express'e ait ve
 * yalnizca /api/* isteklerini goruyor. Ama uygulamanin bir kismi Nitro
 * rotalarini cagiriyor -- /finance-api, /maliyet-api, /mk-api,
 * /tcmb-api, /excel-api -- ve onlar Express'e hic ugramiyor. Kabuktan
 * (https://localhost) yapilan cagrilar o yuzden engelleniyordu:
 * Finance sayfasi acildigi halde verisi gelmiyordu.
 *
 * /api ATLANIYOR: oranin basliklarini Express koyuyor; ikinci kez
 * koymak Access-Control-Allow-Origin'i cift degerli yapar ve tarayici
 * boyle bir yaniti GECERSIZ sayip istegi yine engeller.
 *
 * Liste Express'tekiyle AYNI uc origin. Allow-Credentials yine
 * verilmiyor: kabuk yetkiyi Authorization basligiyla tasiyor.
 *
 * Web etkilenmiyor -- ayni origin'den gelen isteklerde Origin basligi
 * ya yok ya da listede olmadigi icin hicbir baslik eklenmiyor.
 */
const MOBIL_ORIGINLER = new Set([
  "https://localhost",
  "capacitor://localhost",
  "http://localhost",
])

export default defineEventHandler((event) => {
  if (event.path.startsWith("/api")) return

  const origin = getRequestHeader(event, "origin")
  if (!origin || !MOBIL_ORIGINLER.has(origin)) return

  setResponseHeaders(event, {
    "Access-Control-Allow-Origin": origin,
    Vary: "Origin",
    "Access-Control-Allow-Headers": "Authorization, Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    "Access-Control-Max-Age": "600",
  })

  /* On yoklamayi burada bitir; rotalara hic inmesin. */
  if (event.method === "OPTIONS") {
    setResponseStatus(event, 204)
    return ""
  }
})
