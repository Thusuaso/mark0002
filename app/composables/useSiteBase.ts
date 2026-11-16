/*
 * NITRO ROTALARI ICIN TABAN ADRES.
 *
 * Uygulamanin bir kismi Express'e degil, Nitro rotalarina gidiyor:
 *   /finance-api  /maliyet-api  /mk-api  /tcmb-api  /excel-api
 * Bu cagrilar `baseURL: "/"` ile yaziliydi. Web'de dogru; ama Android
 * kabugunda sayfa https://localhost'tan servis edildigi icin "/" APK'nin
 * KENDI icini gosteriyor ve orada sunucu yok -- istek sessizce
 * basarisiz oluyordu (belirti: Finance sayfasi aciliyor ama verisi
 * gelmiyor).
 *
 * apiOrigin web'de BOS, yani sonuc "/" ve bugunku davranis birebir
 * ayni; kabukta uretim adresi.
 *
 * [!] /api UCLARI ICIN BUNU KULLANMA -- orasi useApi()'nin isi; o
 * ayrica Authorization basligini da ekliyor.
 */
export function siteBase(): string {
  return useRuntimeConfig().public.apiOrigin || "/"
}
