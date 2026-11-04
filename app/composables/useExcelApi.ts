/*
 * plugins/excelApi.js ($excelApi) karsiligi.
 *
 * Nuxt 2'de bu, ayri bir axios ornegiydi: Excel sunucusuna POST atiyor,
 * sunucu dosyayi uretiyor, sonra cagri yeri ayri bir <a download> linkiyle
 * dosyayi indiriyor.
 *
 * axios SOZLESMESI TAKLIT EDILIYOR (useLegacyApi ile ayni gerekce):
 * cagri yerleri `.post(url, data).then((response) => { if (response) ... })`
 * bicimindedir. $fetch'e duz gecis yapilsa `response` govdenin kendisi
 * olurdu; sunucu bos govde donduren uclar icin `if (response)` false'a
 * duser ve indirme linki HIC olusturulmaz -- hata vermeden, sessizce.
 *
 * ATILAN: new https.Agent({ rejectUnauthorized: false })
 *   Nuxt 2 plugin'i TLS dogrulamasini kapatiyordu. Bu yalnizca Node
 *   tarafinda anlamli; tarayicida axios httpsAgent'i zaten yok sayar ve
 *   bu cagrilarin HEPSI tiklama isleyicisinden geliyor, yani client'ta
 *   calisiyor. Dolayisiyla davranis kaybi yok.
 *   DIKKAT: bu composable bir gun sunucu tarafindan cagrilirsa, Excel
 *   sunucusunun sertifikasi gecersizse istek basarisiz olur. O noktada
 *   dogru cozum sertifikayi duzeltmek, dogrulamayi kapatmak degil.
 *
 * Adres runtimeConfig.public.excelServerBase'ten geliyor (bkz.
 * nuxt.config.ts); Nuxt 2'de hem burada hem store/modules/local.js'te
 * AYRI AYRI gomuluydu ve ikisi birbirinden bagimsiz degistirilmek
 * zorundaydi.
 */

export interface ExcelResponse<T = unknown> {
  data: T
  status: number
}

/** Sondaki egik cizgiyi atar: ".../mekmar.com/" -> ".../mekmar.com" */
export function excelServerOrigin(): string {
  return useRuntimeConfig().public.excelServerBase.replace(/\/+$/, "")
}

export function useExcelApi() {
  const baseURL = excelServerOrigin()

  async function request<T>(
    url: string,
    opts: Record<string, unknown> = {},
  ): Promise<ExcelResponse<T>> {
    const data = await $fetch<T>(url, {
      baseURL,
      headers: { "Content-Type": "application/json" },
      ...opts,
    } as any)
    return { data, status: 200 }
  }

  return {
    get: <T = unknown>(url: string, opts?: Record<string, unknown>) =>
      request<T>(url, { ...opts, method: "GET" }),

    post: <T = unknown>(url: string, body?: unknown, opts?: Record<string, unknown>) =>
      request<T>(url, { ...opts, method: "POST", body }),
  }
}

/*
 * Excel sunucusunun urettigi dosyayi indirir.
 *
 * NEDEN AYRI FONKSIYON: Nuxt 2'de her cagri yeri bu uc satiri kendi
 * eliyle yaziyordu ve her biri biraz farkliydi -- bir yerde
 * `getLocalUrl + "excel/check/list"`, baska yerde
 * `getLocalUrl + "/excel/labels/list"`. getLocalUrl sonda egik cizgiyle
 * bittigi icin ikincisi CIFT EGIK CIZGI uretiyordu
 * (".../mekmar.com//excel/labels/list"). Burada yol normalize ediliyor.
 *
 * Ayrica eski kod olusturdugu <a> ogesini DOM'dan hic kaldirmiyordu;
 * her indirmede body'ye bir olu link daha ekleniyordu.
 */
export function downloadFromExcelServer(pathname: string, filename: string) {
  const url = `${excelServerOrigin()}/${pathname.replace(/^\/+/, "")}`

  const link = document.createElement("a")
  link.href = url
  link.setAttribute("download", filename)
  document.body.appendChild(link)
  link.click()
  link.remove()
}
