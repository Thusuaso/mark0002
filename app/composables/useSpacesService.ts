/*
 * plugins/digitalocean.js karsiligi.
 *
 * Panel gorsellerini DigitalOcean Spaces'e yukler/siler. Dosya SUNUCUDAN
 * GECMEZ: once legacy API'den imzali bir PUT adresi alinir
 * (/api/spaces/sign-upload), yukleme dogrudan Spaces'e gider.
 *
 * ---------------------------------------------------------------------
 * NEDEN COMPOSABLE, NEDEN PLUGIN DEGIL
 * ---------------------------------------------------------------------
 * Nuxt 2'de bu bir plugin DEGILDI -- `plugins/` altinda duruyordu ama
 * Vue'ya hic enjekte edilmiyordu; bilesenler onu duz bir modul gibi
 * `import oceanservice from "../../plugins/digitalocean"` ile aliyordu.
 * Pilotta ayni is useFileService() kalibiyla composable olarak duruyor
 * (bkz. app/composables/useFileService.ts).
 *
 * ---------------------------------------------------------------------
 * TASIMA DEGISIKLIKLERI
 * ---------------------------------------------------------------------
 *   elle cerez ayristirma (document.cookie.split(";")...)
 *       -> useCookie("token")
 *   window.$nuxt.$toast
 *       -> useAppToast()
 *      `window.$nuxt` Nuxt 3+'ta YOK; birakilsa yetki hatasinda
 *      bildirim SESSIZCE kaybolurdu (kosul `window.$nuxt &&` oldugu icin
 *      hata da vermez, sadece hicbir sey gostermez).
 *   API_BASE = "/api" sabiti
 *       -> runtimeConfig.public.apiBase
 *
 * ---------------------------------------------------------------------
 * KORUNAN DAVRANISLAR
 * ---------------------------------------------------------------------
 * - PUT basliklari (Content-Type / x-amz-acl / Cache-Control) IMZAYA
 *   DAHIL; birebir ayni gonderilmek zorunda, yoksa Spaces 403 doner.
 *   Degerler aynen korundu.
 * - Nesne anahtari ISTEMCIDE kuruluyor (`prefix + file.name`) ve imza
 *   istegine oyle gonderiliyor. Sohbet eklerinde anahtari SUNUCU
 *   uretiyor (bkz. api/index.js /chat/upload-url); burada oyle degil.
 *   Sunucu tarafini sikilastirmak bu gecisin kapsami disinda -- not
 *   dusuldu.
 * - Hata halinde `false` / `null` donuyor, FIRLATMIYOR; cagri yerleri
 *   `.then(r => r.ok ...)` bekliyor.
 */

function extOf(name: string): string {
  const parts = String(name ?? "").split(".")
  return parts.length > 1 ? (parts.pop() as string).toLowerCase() : ""
}

export function useSpacesService() {
  const apiBase = useRuntimeConfig().public.apiBase

  async function postJson(
    path: string,
    payload: Record<string, unknown>,
  ): Promise<Record<string, unknown> | null> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    }
    const token = useCookie<string | null>("token").value
    if (token) headers.Authorization = `Bearer ${token}`

    const res = await fetch(apiBase + path, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      console.error("Spaces API hatasi:", res.status)

      /*
       * Bu istek useApi/useLegacyApi'den GECMIYOR (ham fetch), yani
       * oradaki yetki bildirimi tetiklenmiyor -- burada gosteriliyor.
       */
      if (res.status === 401 || res.status === 403) {
        let message = "Bu işlem için yetkiniz bulunmamaktadır."
        try {
          const body = await res.json()
          if (body?.message) message = body.message
        } catch {
          /* govde okunamadi, varsayilan mesaj kullanilir */
        }
        useAppToast().error(message)
      }

      return null
    }
    return await res.json()
  }

  async function uploadTo(
    prefix: string,
    file: File,
    contentType?: string,
  ): Promise<boolean> {
    try {
      const type = contentType || file.type || "application/octet-stream"
      const key = prefix + file.name
      const cacheControl = "public,max-age=1,s-max-age=500,must-revalidate"

      const signed = await postJson("/spaces/sign-upload", {
        key,
        contentType: type,
      })
      if (!signed?.status || !signed.url) return false

      /* Bu basliklar IMZAYA DAHIL -- birebir ayni gonderilmeli. */
      const put = await fetch(signed.url as string, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": type,
          "x-amz-acl": "public-read",
          "Cache-Control": cacheControl,
        },
      })

      return put.ok
    } catch (err) {
      console.error("Spaces yukleme hatasi:", err)
      return false
    }
  }

  return {
    panelUsaProductUploadPhoto(file: File) {
      return uploadTo("usa-products/", file, "image/" + extOf(file.name))
    },

    panelProductSendPhoto(file: File) {
      return uploadTo("products/", file, "image/" + extOf(file.name))
    },

    async panelProductPhotoDelete(filename: string) {
      try {
        const r = await postJson("/spaces/delete", {
          key: "products/" + filename,
        })
        return !!r?.status
      } catch (err) {
        console.error("Spaces silme hatasi:", err)
        return false
      }
    },

    panelProductSendTestReport(file: File) {
      return uploadTo("test-reports/", file)
    },

    panelProjectProductSendPhoto(file: File) {
      return uploadTo("galleria-project_photos/photos/", file)
    },

    panelProjectSendPhoto(file: File) {
      return uploadTo("galleria-project_photos/", file)
    },
  }
}
