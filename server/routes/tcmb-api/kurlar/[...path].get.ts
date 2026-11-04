import https from "node:https"
import crypto from "node:crypto"

/*
 * api/tcmb.js (Nuxt 2 serverMiddleware) karsiligi.
 *
 * Nuxt 2'de boyle baglanmisti:
 *     serverMiddleware: [
 *       { path: "/tcmb-api", handler: "~/api/tcmb.js" }
 *     ]
 * Nitro'da serverMiddleware yok; yolun kendisi dosya adindan geliyor:
 * server/routes/tcmb-api/kurlar/[...path].get.ts  ->  /tcmb-api/kurlar/**
 *
 * Orijinal handler gelen URL'de "/kurlar" dizgisini ARIYOR ve oradan
 * sonrasini aliyordu (Nuxt 2 serverMiddleware'i prefix'i bazen kirpiyordu).
 * Burada o belirsizlik yok: yol parametresi dogrudan /kurlar/ sonrasini
 * veriyor.
 *
 * NEDEN PROXY VAR (kaldirilamaz): tarayici TCMB'ye dogrudan istek atamaz,
 * CORS basligi yok.
 *
 * ---------------------------------------------------------------------
 * TLS -- ORIJINALDEN BILEREK AYRILDIM
 * ---------------------------------------------------------------------
 * api/tcmb.js'teki agent SERTIFIKA DOGRULAMASINI KAPATIYORDU:
 *
 *     new https.Agent({ rejectUnauthorized: false, secureOptions: ... })
 *
 * Bu iki ayri sey: (a) eski TLS yeniden-anlasma uyumlulugu,
 * (b) sertifika dogrulamasi. TCMB ile el sikisma sorunu (a)'dan
 * kaynaklaniyor; (b)'yi kapatmak ortadaki-adam saldirisina acik hale
 * getiriyor ve kur verisi muhasebeye giriyor. Burada YALNIZCA (a) acik:
 * secureOptions duruyor, rejectUnauthorized varsayilan (true) kaldi.
 *
 * Eger TCMB'nin sertifika zinciri gercekten dogrulanamiyorsa bu uc
 * "unable to verify the first certificate" gibi bir hata dondurur --
 * sessizce yanlis veri DONDURMEZ. O durumda cozum dogrulamayi kapatmak
 * degil, ara sertifikayi (CA bundle) agent'a `ca` ile vermektir.
 */
export default defineEventHandler(async (event) => {
  const path = getRouterParam(event, "path") || ""

  /*
   * Yol parcalarini temizle: ".." ile TCMB sunucusunda baska bir yere
   * gidilmesini engeller. Orijinalde bu kontrol YOKTU -- gelen URL
   * oldugu gibi hedef path'e yaziliyordu.
   */
  const safePath = path
    .split("/")
    .filter((part) => part && part !== "." && part !== "..")
    .join("/")

  if (!safePath) {
    throw createError({
      statusCode: 400,
      statusMessage: "Hatali URL: /kurlar/ eksik",
    })
  }

  const agent = new https.Agent({
    secureOptions:
      crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT |
      crypto.constants.SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION,
  })

  const options: https.RequestOptions = {
    hostname: "www.tcmb.gov.tr",
    port: 443,
    path: `/kurlar/${safePath}`,
    method: "GET",
    agent,
    headers: {
      Host: "www.tcmb.gov.tr",
      "User-Agent": "Mozilla/5.0 (compatible; NuxtBot/1.0)",
      Accept: "application/xml, text/xml, */*; q=0.01",
    },
  }

  /*
   * Yanit Promise'e sarildi.
   *
   * Orijinalde handler yaniti pipe edip DONUYORDU; Nitro bir handler
   * donunce istegin bittigini varsayar ve pipe tamamlanmadan yaniti
   * sonlandirabilir -- "Express mount asenkron yanitlarda sunucuyu
   * dusuruyordu" ile ayni sinif sorun (bkz. commit faee5b947). Burada
   * Promise, akis bitene kadar cozulmuyor.
   */
  return await new Promise<void>((resolve, reject) => {
    const proxyReq = https.request(options, (proxyRes) => {
      event.node.res.writeHead(proxyRes.statusCode || 502, proxyRes.headers)
      proxyRes.pipe(event.node.res, { end: true })

      proxyRes.on("end", () => resolve())
      proxyRes.on("error", (err) => reject(err))
    })

    proxyReq.on("error", (err) => {
      console.error("[TCMB Proxy] istek hatasi:", err)
      reject(err)
    })

    /*
     * Zaman asimi: TCMB yanitsiz kalirsa istek sonsuza kadar asili
     * kalmasin. Orijinalde yoktu -- yanitsiz bir istek Node baglantisini
     * tutuyordu.
     */
    proxyReq.setTimeout(15000, () => {
      proxyReq.destroy(new Error("TCMB zaman asimi (15s)"))
    })

    proxyReq.end()
  })
})
