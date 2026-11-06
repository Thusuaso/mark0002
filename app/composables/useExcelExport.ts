/*
 * Nitro'daki Excel uclarindan dosya indirir.
 *
 * useExcelApi() + downloadFromExcelServer() IKILISININ YERINE geciyor.
 *
 * ---------------------------------------------------------------------
 * NEDEN IKI CAGRI TEK CAGRIYA INDI
 * ---------------------------------------------------------------------
 * Eski akis her cagri yerinde sudur:
 *
 *     useExcelApi().post("/x/y/excel", veri).then((response) => {
 *       if (response.status) {
 *         downloadFromExcelServer("x/y/excel", "rapor.xlsx")
 *       }
 *     })
 *
 * Yani: ONCE sunucuya dosyayi diskte urettir, SONRA ayri bir GET ile
 * "en son uretilen dosyayi" indir. Iki sorunu vardi:
 *
 *   1) YARIS DURUMU -- iki kullanici ayni anda export alirsa ikinci POST
 *      birincinin dosyasini eziyor, birinci kullanici BASKASININ
 *      raporunu indiriyor. Gerekceler ve olculen kanit:
 *      server/utils/xlsx-response.ts
 *
 *   2) `if (response.status)` HICBIR SEY KONTROL ETMIYOR -- bu HTTP
 *      durumu (her zaman 200), sunucunun govdede dondurdugu
 *      `{"status": false}` degil. Uretim patlasa bile indirme
 *      tetikleniyor ve kullanici sessizce bos/eski dosya aliyordu.
 *
 * Yeni akis TEK istek: POST'un YANITI dosyanin kendisi. Uretim
 * basarisizsa istek reddolur, indirme HIC baslamaz ve cagiran taraf
 * hatayi gercekten gorur.
 *
 * ---------------------------------------------------------------------
 * DOSYA ADI SUNUCUDAN GELIYOR
 * ---------------------------------------------------------------------
 * Ad Content-Disposition basligindan okunuyor; `fallbackFilename`
 * yalnizca baslik okunamazsa kullaniliyor. Eski kodda ad her cagri
 * yerinde elle yaziliydi ve bazilari yanlisti -- orderDetail/
 * CheckForm.vue'de IKI AYRI rapor (kontrol listesi ve etiket listesi)
 * ayni "check_list.xlsx" adiyla iniyordu.
 */

/**
 * Nitro ucundan .xlsx indirir.
 *
 * @param path   Nitro yolu, orn. "/excel-api/finance/test"
 * @param body   POST govdesi -- rapor satirlari
 * @param fallbackFilename  Content-Disposition okunamazsa kullanilacak ad
 */
export async function exportExcel(
  path: string,
  body: unknown,
  fallbackFilename: string,
): Promise<void> {
  let filename = fallbackFilename

  const blob = await $fetch<Blob>(path, {
    baseURL: "/",
    method: "POST",
    body,
    responseType: "blob",

    /*
     * Dosya adini basliktan al. onResponse, blob cozulmeden once
     * calistigi icin yanit basliklarina buradan erisilebiliyor --
     * $fetch'in donus degeri yalnizca govde, basliklari tasimiyor.
     */
    onResponse({ response }) {
      const parsed = filenameFromDisposition(
        response.headers.get("content-disposition"),
      )
      if (parsed) filename = parsed
    },
  })

  triggerBlobDownload(blob, filename)
}

/*
 * Content-Disposition'dan dosya adini cikarir.
 *
 * Hem `filename="x.xlsx"` hem RFC 5987 `filename*=UTF-8''x.xlsx`
 * bicimini taniyor: rapor adlarinda Turkce karakter gecebilir
 * (orn. "Stok_listesi.xlsx" bugun ASCII ama "Uretim" raporlari degisirse
 * baslik yildizli bicime duser) ve o durumda yuzde kodlamasi cozulmezse
 * dosya "Stok%20listesi.xlsx" gibi iner.
 */
function filenameFromDisposition(header: string | null): string | null {
  if (!header) return null

  const utf8 = header.match(/filename\*=UTF-8''([^;]+)/i)
  if (utf8?.[1]) {
    try {
      return decodeURIComponent(utf8[1].trim())
    } catch {
      /* bozuk kodlama: duz filename'e dusuyoruz */
    }
  }

  const plain = header.match(/filename="?([^";]+)"?/i)
  return plain?.[1]?.trim() ?? null
}

/*
 * Blob'u indirme olarak tetikler.
 *
 * ESKI KODDAKI IKI SORUN DUZELTILDI:
 *   - olusturulan <a> ogesi DOM'dan HIC kaldirilmiyordu; her indirmede
 *     body'ye bir olu link daha ekleniyordu (raporlar sayfasinda bir
 *     oturumda onlarca birikiyordu).
 *   - object URL serbest birakilmali, yoksa blob bellekte sayfa
 *     kapanana kadar tutulur. Eski kod dogrudan adrese link verdigi
 *     icin bu sorun yoktu; blob'a gecince ZORUNLU oldu.
 */
function triggerBlobDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)

  const link = document.createElement("a")
  link.href = url
  link.setAttribute("download", filename)
  document.body.appendChild(link)
  link.click()
  link.remove()

  /*
   * Hemen revoke EDILMIYOR: bazi tarayicilar (Safari, eski Firefox)
   * indirmeyi tiklamadan sonra asenkron baslatir ve URL o an
   * serbest birakilmissa indirme sessizce iptal olur.
   */
  setTimeout(() => URL.revokeObjectURL(url), 10_000)
}
