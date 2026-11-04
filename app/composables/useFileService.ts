/*
 * plugins/upload.js karsiligi.
 *
 * Nuxt 2'de bu, file-service.mekmar.com'a multipart POST atan bir axios
 * ornegiydi ve 11 metodu vardi: offerFile, sendInvoice, sendTransport,
 * sendInvoiceShipping, sendSample, sendProforma, sendIsf,
 * sendOfferProforma, sendSampleFile, sendSupplier, sendDrawing.
 *
 * 240 satirin tamami ayni kaliptı -- her metot birebir sunu yapiyordu:
 *   1) dosya adinda birden fazla "." varsa alert() + sessizce return
 *   2) yol kur, FormData'ya "file" olarak ekle, POST et
 *   3) { ...res.data, dosyaAdi } dondur
 * Tek fark URL sablonu ve `dosyaAdi` olarak ne dondugu. Bu yuzden kalip
 * tek bir uploadFile() cekirdegine alindi.
 *
 * TASINAN METOTLAR -- yalnizca su an tasinan bilesenlerin ihtiyaci
 * olanlar:
 *   sendIsf      <- orderDetail/SupplierForm.vue
 *   sendProforma <- orderDetail/ProformaForm.vue
 *   sendDrawing  <- orderDetail/ProformaForm.vue
 *
 * Sonradan eklenenler:
 *   sendInvoiceShipping <- container/InputForm.vue
 *   sendTransport       <- transport/InputForm.vue
 *   sendInvoice         <- upload/Form.vue
 *   sendSupplier        <- upload/SupplierForm.vue
 *   sendSample          <- sample/Form.vue
 *
 * Son 3'u de eklendi (teklif ekranlari tasinirken):
 *   offerFile         <- offer/Form.vue (Reminder sekmesi)
 *   sendOfferProforma <- offer/Proforma.vue
 *   sendSampleFile    <- offer/Sample.vue
 * Boylece plugins/upload.js'in 11 metodunun TAMAMI karsilandi.
 *
 * Adres runtimeConfig.public.fileServiceBase'ten geliyor; Nuxt 2'de
 * kaynak koda gomuluydu ve yerel adres yorum satiri olarak yanindaydi.
 */

export interface UploadResult {
  dosyaAdi: string
  [key: string]: unknown
}

/*
 * Dosya adinda birden fazla nokta olup olmadigini denetler.
 *
 * KORUNAN DAVRANIS: hata durumunda alert() gosterip undefined donuyor.
 * Cagri yerleri sonucu `.then(...)` ile zincirliyor, yani undefined
 * donunce "TypeError: Cannot read properties of undefined (reading
 * 'then')" aliyorlar -- Nuxt 2'de de boyleydi. Bunu duzeltmek (orn. hata
 * firlatmak veya {ok:false} dondurmek) cagri yerlerini de degistirmeyi
 * gerektirir; davranis degisikligi oldugu icin bu gecise dahil edilmedi.
 */
function isFilenameValid(file: File): boolean {
  if (file.name.split(".").length > 2) {
    alert("Lütfen Dosya İsmini Düzeltiniz.Dosya İsminde '.' karakteri olamaz.")
    return false
  }
  return true
}

export function useFileService() {
  const baseURL = useRuntimeConfig().public.fileServiceBase.replace(/\/+$/, "")

  /* 11 metodun tamaminin paylastigi cekirdek. */
  async function uploadFile(
    file: File,
    pathname: string,
    dosyaAdi: string,
  ): Promise<UploadResult | undefined> {
    if (!isFilenameValid(file)) return undefined

    const formData = new FormData()
    formData.append("file", file)

    /*
     * Content-Type ELLE VERILMEZ: FormData gonderirken tarayici
     * multipart sinir dizesini (boundary) kendisi ekler. Nuxt 2 plugin'i
     * axios ornegine "multipart/form-data" basligini sabit koymustu;
     * axios bunu FormData varken yine de boundary ile degistiriyordu.
     * $fetch'te basligi elle vermek boundary'yi DUSURUR ve sunucu
     * govdeyi ayristiramaz.
     */
    const data = await $fetch<Record<string, unknown>>(
      `/${pathname.replace(/^\/+/, "")}`,
      { baseURL, method: "POST", body: formData },
    )

    return { ...data, dosyaAdi }
  }

  return {
    /* plugins/upload.js:134 */
    sendIsf(file: File, id: number, po: string) {
      return uploadFile(file, `file/upload/${id}/${po}`, po)
    },

    /* plugins/upload.js:113 */
    sendProforma(file: File, teklifId: number, siparisno: string) {
      return uploadFile(file, `file/upload/${teklifId}/${siparisno}`, siparisno)
    },

    /* plugins/upload.js:216 */
    sendDrawing(file: File, po: string, id: number, name: string) {
      return uploadFile(file, `file/upload/drawing/${po}/${id}/${name}`, name)
    },

    /*
     * plugins/upload.js:71
     *
     * DIKKAT -- KARDES METOTLARDAN FARKLI: hemen ustundeki
     * (plugins/upload.js:50, sendInvoice) `invoiceName + '.pdf'`
     * yapiyordu, bu metot ise invoiceName'i OLDUGU GIBI kullaniyor.
     * Uzantiyi CAGIRAN taraf ekliyor:
     *
     *     sendInvoiceShipping(file, FirmaID, FaturaNo + ".pdf")
     *     -- components/container/InputForm.vue
     *
     * Birebir korundu; burada ".pdf" eklemek dosya adini
     * "X.pdf.pdf" yapardi.
     */
    sendInvoiceShipping(file: File, id: number, invoiceName: string) {
      return uploadFile(
        file,
        `file/customer/upload/${id}/${invoiceName}`,
        invoiceName,
      )
    },

    /*
     * plugins/upload.js:50
     *
     * DIKKAT -- sendInvoiceShipping ILE AYNI URL, TEK FARK UZANTI:
     * bu metot ".pdf"yi KENDISI ekliyor, sendInvoiceShipping ise
     * cagirandan bekliyor. Ikisi de birebir korundu; karistirmak dosya
     * adini ya "X" (uzantisiz) ya "X.pdf.pdf" yapar.
     */
    sendTransport(file: File, id: number, invoiceName: string) {
      const dosya = `${invoiceName}.pdf`
      return uploadFile(file, `file/customer/upload/${id}/${dosya}`, dosya)
    },

    /*
     * plugins/upload.js:33
     *
     * Yukleme evraklari: dosya SIPARIS NUMARASIYLA kaydediliyor, evrak
     * turu ise yoldaki {id} ile belirleniyor. Yani her evrak turu icin
     * ayri klasor, icinde PO adli tek dosya.
     *
     * DIKKAT -- `dosyaAdi` DOSYANIN KENDI ADI DEGIL: kaynak burada
     * `const dosya = siparisno` yaziyor, yani donen dosyaAdi PO.
     * Kardes metotlarda (sendIsf, sendProforma) da ayni secim var.
     */
    sendInvoice(file: File, id: number, siparisno: string) {
      return uploadFile(file, `file/upload/${id}/${siparisno}`, siparisno)
    },

    /*
     * plugins/upload.js:195
     *
     * Tedarikci faturasi: evrak turu yola SABIT 30 olarak gomulu
     * (kaynakta da oyle), dosya adi cagirandan geliyor.
     *
     * DIKKAT: donen `dosyaAdi` burada da dosyanin adi DEGIL, PO.
     * Kaynak `const dosya = po` yaziyor; `document` parametresi
     * yalnizca URL'e giriyor.
     */
    sendSupplier(file: File, po: string, document: string) {
      return uploadFile(file, `file/tedarikci/upload/30/${po}/${document}`, po)
    },

    /*
     * plugins/upload.js:93
     *
     * DIKKAT -- KARDES METOTLARDAN FARKLI: burada `dosyaAdi` olarak
     * DOSYANIN KENDI ADI donuyor (`file.name`), PO/ID degil. Yola da
     * dosya adi giriyor, yani ayni numuneye farkli adlarla birden
     * fazla dosya yuklenebiliyor -- sendInvoice'ta oyle degil, orada
     * ad PO oldugu icin her evrak turunde TEK dosya tutuluyor.
     */
    sendSample(file: File, numuneId: number) {
      return uploadFile(
        file,
        `file/upload/numune/numuneDosya/${numuneId}/${file.name}`,
        file.name,
      )
    },

    /*
     * plugins/upload.js:12  <- offer/Form.vue (Reminder sekmesi)
     *
     * Ucunun de `dosyaAdi` olarak dondurdugu DOSYANIN KENDI ADI ve yola
     * da dosya adi giriyor -- sendSample ile ayni kalip, sendInvoice ile
     * degil (orada ad PO'dur).
     */
    offerFile(file: File, teklifId: number) {
      return uploadFile(
        file,
        `file/upload/teklif/teklifDosya/${teklifId}/${file.name}`,
        file.name,
      )
    },

    /* plugins/upload.js:154  <- offer/Proforma.vue */
    sendOfferProforma(file: File, offerId: number) {
      return uploadFile(
        file,
        `file/upload/teklif/proforma/${offerId}/${file.name}`,
        file.name,
      )
    },

    /* plugins/upload.js:174  <- offer/Sample.vue */
    sendSampleFile(file: File, offerId: number) {
      return uploadFile(
        file,
        `file/upload/teklif/teklifNumune/${offerId}/${file.name}`,
        file.name,
      )
    },
  }
}
