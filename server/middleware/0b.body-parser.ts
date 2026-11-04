/*
 * Nuxt 2'de nuxt.config.js soyleydi:
 *   serverMiddleware: [bodyParser.json(), "~/api", ...]
 * yani bodyParser API'den ONCE calisiyordu. Nitro'ya tasirken bu atlanmisti
 * ve req.body undefined kaliyordu -- POST /login ilk satirda
 * "Cannot destructure property 'username' of 'req.body'" ile patliyordu.
 *
 * Dosya adi sirasi onemli (Nitro middleware'leri alfabetik calisir):
 *   0.readonly-guard  ->  0b.body-parser  ->  1.legacy-api
 *
 * bodyParser.json() VARSAYILAN ayarlarla cagriliyor (orijinaldeki gibi),
 * yani govde limiti 100kb. Yukleme uclari imzali URL ile calistigi
 * (/spaces/sign-upload) ve api/index.js'te multipart/base64 isleyen bir sey
 * olmadigi icin bu yeterli. Bir uc 413 "payload too large" verirse sebep
 * budur, limit burada yukseltilir.
 *
 * GOVDESIZ ISTEKLERDE CALISTIRILMAZ:
 * SSR sirasinda useApi() -> $fetch Nitro'nun IC yolunu kullanir ve tam bir
 * Node request nesnesi olusmaz; event.node.req.headers tanimsiz olabiliyor.
 * body-parser ise kosulsuz req.headers["content-type"] okudugu icin
 *   [uncaughtException] Cannot read properties of undefined
 *                       (reading 'content-type')
 * firlatiyordu. GET/HEAD/DELETE'in govdesi zaten yok, dolayisiyla
 * yalnizca govde tasiyan metotlarda ve headers mevcutken calistiriliyor.
 */
import bodyParser from "body-parser"

const jsonParser = fromNodeMiddleware(bodyParser.json())

const METHODS_WITH_BODY = new Set(["POST", "PUT", "PATCH"])

export default defineEventHandler(async (event) => {
  if (!event.path.startsWith("/api")) return

  const req = event.node?.req
  if (!req?.headers) return

  const method = (req.method || "GET").toUpperCase()
  if (!METHODS_WITH_BODY.has(method)) return

  await jsonParser(event)
})
