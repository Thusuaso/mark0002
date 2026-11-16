/*
 * PI evraki indirme -- TEK YOL, hem web hem Android kabugu.
 *
 * NEDEN BIR BILET:
 * Indirme adresi bir <a href> ile aciliyor ve bir gezinme Authorization
 * basligi GONDEREMEZ, yalnizca cerez tasir. Web'de cerez vardi ve is
 * goruyordu; Android kabugunda sayfa https://localhost'tan, API ise
 * gozv2.mekmar.com'dan geldigi icin o cerez GITMEZ -- yani cereze dayanan
 * cozum uygulamada sessizce 401 verirdi.
 *
 * Bu yuzden once NORMAL yetkiyle (Bearer) kisa omurlu bir bilet aliniyor
 * (/api/pi-ticket/<no>), indirme adresi de o bileti tasiyor. Cerez
 * gerekmiyor, dolayisiyla iki ortamda da ayni kod calisiyor.
 *
 * Sunucu tarafi: api/index.js -> /pi-ticket/:siparisNo ve /file/pi/:siparisNo
 */
export function usePiDownload() {
  const api = useApi()
  const apiOrigin = useRuntimeConfig().public.apiOrigin || ""

  return async function piDownload(siparisNo: string) {
    if (!siparisNo) return

    const res = await api<{ status: boolean; url: string }>(
      `/pi-ticket/${encodeURIComponent(siparisNo)}`,
    )
    if (!res?.status || !res.url) {
      throw new Error("PI bileti alinamadi")
    }

    /*
     * Bilet ucu adresi "/api/..." olarak doner (sunucu kendi onekini
     * bilir). Web'de oldugu gibi kullanilir; kabukta basina mutlak taban
     * gelmeli, yoksa https://localhost/api/... olur ve hicbir yere gitmez.
     */
    const url = `${apiOrigin}${res.url}`

    /*
     * Indirmeyi Content-Disposition: attachment basligi zorluyor (uc onu
     * gonderiyor), bu yuzden adrese gitmek yeterli; blob'a almaya gerek
     * yok. location.href yerine gecici bir <a>: gezinme gecmisine
     * girmiyor ve sayfa yerinde kaliyor.
     */
    const a = document.createElement("a")
    a.href = url
    a.rel = "noopener"
    document.body.appendChild(a)
    a.click()
    a.remove()
  }
}
