/*
 * Nuxt 2'deki serverMiddleware { path: "/api", handler: app } karsiligi.
 *
 * api/index.js (19.6k satir Express) OLDUGU GIBI kullaniliyor; amac
 * backend'i yeniden yazmamak. Express rotalari "/suppliers" seklinde
 * tanimli (Nuxt 2 onlari /api altina mount ediyordu), bu yuzden istek
 * Express'e verilmeden once URL'den /api oneki dusuruluyor.
 *
 * NEDEN fromNodeMiddleware DEGIL:
 * Ilk surum h3'un fromNodeMiddleware'ini kullaniyordu. Senkron yanit
 * veren uclarda (orn. auth reddi) calisiyordu, ancak api/index.js'teki
 * uclarin cogu CALLBACK TABANLI:
 *     mssql.query(sql, (err, rows) => { res.status(200).json(...) })
 * Bu durumda Express yaniti, h3 handler'i coktan dondukten SONRA
 * yaziyor. Nitro o sirada yaniti sonlandirmis oluyor ve Express'in
 * res.json() cagrisi
 *     [uncaughtException] Cannot read properties of undefined
 *                         (reading 'content-type')
 *     at ServerResponse.getHeader -> res.get -> res.json
 * ile patliyordu. uncaughtException ise Nitro dev worker'ini dusuruyor,
 * yani sunucu komple oluyordu.
 *
 * Cozum: Express'i dogrudan node req/res ile cagirip yanitin GERCEKTEN
 * bitmesini beklemek. Boylece Nitro, Express yazmayi bitirene kadar
 * istegi acik tutuyor.
 */
import app from "~~/api/index.js"

/*
 * ONEMLI KISITLAMA -- SSR'IN IC FETCH YOLU
 *
 * Bu mount yalnizca GERCEK HTTP istekleri icin guvenilir. SSR sirasinda
 * $fetch("/api/...") Nitro'nun IC yolunu kullanir; orada event.node.res
 * gercek bir ServerResponse degil, taklit bir nesnedir. Express'in
 * res.json() cagrisi o nesne uzerinde res.get("content-type") okudugu
 * icin ya patliyor ya da yanit hic sonlanmadigi icin istek asili kaliyor.
 *
 * Bu yuzden legacy API'ye yapilan tum cagrilar sayfa/layout tarafinda
 * useAsyncData(..., { server: false }) ile CLIENT'a birakilmali.
 * Davranis kaybi yok: Nuxt 2'de de bu veriler SSR'da gelmiyordu.
 *
 * Asagidaki zaman asimi bir guvenlik agi: boyle bir durum tekrar
 * olusursa istek sonsuza kadar asili kalmak yerine 504 ile duser ve
 * sunucu ayakta kalir.
 */
const RESPONSE_TIMEOUT_MS = 30_000

export default defineEventHandler(async (event) => {
  if (!event.path.startsWith("/api")) return

  const req = event.node.req
  const res = event.node.res

  req.url = event.path.replace(/^\/api/, "") || "/"

  await new Promise<void>((resolve, reject) => {
    let settled = false

    const timer = setTimeout(() => {
      done(
        createError({
          statusCode: 504,
          statusMessage:
            "Legacy API yanit vermedi (SSR ic fetch yolu olabilir -- " +
            "cagriyi useAsyncData(..., { server: false }) ile client'a alin)",
        }),
      )
    }, RESPONSE_TIMEOUT_MS)

    const done = (err?: unknown) => {
      if (settled) return
      settled = true

      res.removeListener("finish", onFinish)
      res.removeListener("close", onFinish)

      if (err) reject(err)
      else resolve()
    }

    function onFinish() {
      done()
    }

    // Yanit tamamlandiginda (veya baglanti kapandiginda) cozulur
    res.once("finish", onFinish)
    res.once("close", onFinish)

    // Express hicbir rotayla eslesmezse next() cagrilir; o durumda da
    // cozulup Nitro'nun 404 uretmesine izin veriyoruz.
    try {
      app(req, res, (err: unknown) => done(err))
    } catch (err) {
      done(err)
    }
  })
})
