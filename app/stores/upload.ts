import { defineStore } from "pinia"

/*
 * Vuex store/modules/upload.js karsiligi.
 *
 * ---------------------------------------------------------------------
 * MUT_ ONEKI GEREKLI
 * ---------------------------------------------------------------------
 * Bu modulde UC isim action ve mutation olarak AYNIYDI:
 *   setDocumentModelList / setDocumentSupplierList /
 *   setDocumentProductSupplierList / setMissingDocumentList /
 *   setMissingDocumentOrderCount
 * Vuex'te ayri ad uzaylari oldugu icin sorun olmuyordu; Pinia'da ikisi
 * de ayni nesnenin metodu, yani cakisiyor. Projedeki kurala uyularak
 * mutation'lar MUT_ onekiyle duruyor (bkz. app/stores/shared.ts).
 *
 * ---------------------------------------------------------------------
 * OLU STATE DUSURULDU: `documentList`
 * ---------------------------------------------------------------------
 * Nuxt 2'de state'te `documentList:[]` vardi ama onu YAZAN mutation ve
 * OKUYAN getter YOKTU -- `setDocumentList` action'i bile sonucu
 * `documentModelList`e yaziyor. Yani alan hic kullanilmiyordu;
 * tasinmadi.
 *
 * ---------------------------------------------------------------------
 * EKSIK EVRAK UCLARI SALT OKUNUR
 * ---------------------------------------------------------------------
 * /upload/document/missing/{list,count,:po} uclari yalnizca select
 * yapiyor (api/index.js). Sunucu, dayandigi iki migration'dan biri
 * eksikse `ready:false` ile BOS donuyor, yani uygulama hata vermiyor.
 * Burada da `ready` bayragi dikkate alinmiyor -- bos liste bos liste.
 */

export interface MissingDocument {
  ID: number
  EvrakAdi: string
}

export interface MissingDocumentOrder {
  SiparisNo: string
  MusteriAdi: string | null
  YuklemeTarihi: string | Date | null
  Sorumlu: string | null
  TeslimTur: string | null
  EksikEvraklar: MissingDocument[]
  EksikSayi: number
}

export interface DocumentModel {
  ID: number | string
  EvrakAdi: string
  SiparisNo?: string
  KonteynerFirmaID?: number | null
  DocName?: string | null
  Color?: string | null
}

export interface DocumentSupplier {
  TedarikciID: number
  TedarikciAdi: string
  SiparisNo: string
}

/* upload/Form.vue'nun sunucuya gonderdigi kayit. */
export interface UploadInvoicePayload {
  id: number
  siparisno: string
  kullaniciId: string | number | null
  tarih: string
}

export const useUploadStore = defineStore("upload", {
  state: () => ({
    documentModelList: [] as DocumentModel[],
    documentSupplierList: [] as DocumentSupplier[],
    documentProductSupplierList: [] as DocumentSupplier[],
    missingDocumentList: [] as MissingDocumentOrder[],
    missingDocumentOrderCount: 0,
  }),

  getters: {
    getDocumentModelList: (state) => state.documentModelList,
    getDocumentSupplierList: (state) => state.documentSupplierList,
    getDocumentProductSupplierList: (state) => state.documentProductSupplierList,
    getMissingDocumentList: (state) => state.missingDocumentList,
    getMissingDocumentOrderCount: (state) => state.missingDocumentOrderCount,
  },

  actions: {
    /*
     * Secilen PO'nun evrak listesi. Sunucu her evrak icin Color
     * donduruyor (gri = yuklenmis, sari = yuklenmemis); renklendirmeyi
     * upload/List.vue yapiyor.
     *
     * DIKKAT -- ADI YANILTICI: `setDocumentList` ama yazdigi yer
     * `documentModelList`, yani `setDocumentModelList` ile AYNI state.
     * Kaynakta da boyleydi; ikisi arasindaki fark yalnizca cagirdigi
     * uc (PO bazli liste vs. bos sablon listesi).
     */
    async setDocumentList(po: string) {
      try {
        const api = useApi()
        const res = await api<{ model: DocumentModel[] }>(
          `/upload/document/${po}`,
        )
        this.MUT_setDocumentModelList(res?.model ?? [])
      } catch (err) {
        console.error("setDocumentList basarisiz:", err)
        this.MUT_setDocumentModelList([])
      }
    },

    async setDocumentModelList() {
      try {
        const api = useApi()
        const res = await api<{ model: DocumentModel[] }>("/upload/model")
        this.MUT_setDocumentModelList(res?.model ?? [])
      } catch (err) {
        console.error("setDocumentModelList basarisiz:", err)
        this.MUT_setDocumentModelList([])
      }
    },

    /*
     * Yuklenen evragin veritabani kaydi.
     *
     * SOZU VERILEN DEGER ONEMLI: upload/Form.vue bu cagrilarin
     * tamamini Promise.all ile bekliyor ve ANCAK ONDAN SONRA eksik
     * evrak uyarisini tazeliyor. Beklemezse uyari, kayit dusmeden
     * once sorulmus olur ve evrak hala "eksik" gorunur.
     *
     * Nuxt 2'de govde `if(response.data.status){ }` -- ICI BOS bir
     * koşuldu, yani basari/basarisizlik HIC ele alinmiyordu. Burada
     * en azindan hata gunluge yaziliyor; cagiran taraf yine
     * beklemeye devam edebilsin diye hata YUKARI FIRLATILMIYOR
     * (Promise.all tek bir red ile tum zinciri dusururdu).
     */
    async setSendDatabaseInvoice(payload: UploadInvoicePayload) {
      try {
        const api = useApi()
        await api("/upload/file", { method: "POST", body: payload })
      } catch (err) {
        console.error("setSendDatabaseInvoice basarisiz:", err)
      }
    },

    async setDocumentSupplierList(po: string) {
      try {
        const api = useApi()
        const res = await api<{ list: DocumentSupplier[] }>(
          `/upload/document/supplier/list/${po}`,
        )
        this.MUT_setDocumentSupplierList(res?.list ?? [])
      } catch (err) {
        console.error("setDocumentSupplierList basarisiz:", err)
        this.MUT_setDocumentSupplierList([])
      }
    },

    async setDocumentProductSupplierList(po: string) {
      try {
        const api = useApi()
        const res = await api<{ list: DocumentSupplier[] }>(
          `/upload/document/product/supplier/list/${po}`,
        )
        this.MUT_setDocumentProductSupplierList(res?.list ?? [])
      } catch (err) {
        console.error("setDocumentProductSupplierList basarisiz:", err)
        this.MUT_setDocumentProductSupplierList([])
      }
    },

    async setDocumentSupplierSave(payload: Record<string, unknown>) {
      const toast = useAppToast()
      try {
        const api = useApi()
        const res = await api<{ status: boolean }>(
          "/upload/document/product/supplier/save",
          { method: "POST", body: payload },
        )

        if (res?.status) toast.success("Successfully Saved")
        else toast.error("Error")
      } catch (err) {
        console.error("setDocumentSupplierSave basarisiz:", err)
        toast.error("Error")
      }
    },

    /*
     * Sevk edilmis siparislerde eksik kalan zorunlu evraklar
     * (sunucu varsayilani: son 90 gun).
     *
     * Sayac BURADAN DA guncelleniyor: liste cekildiginde badge'in
     * listeyle ayni sayiyi gostermesi icin. Kaynakta da boyleydi.
     */
    async setMissingDocumentList() {
      try {
        const api = useApi()
        const res = await api<{ list: MissingDocumentOrder[] }>(
          "/upload/document/missing/list",
        )
        const list = res?.list ?? []
        this.MUT_setMissingDocumentList(list)
        this.MUT_setMissingDocumentOrderCount(list.length)
      } catch (err) {
        console.error("setMissingDocumentList basarisiz:", err)
        this.MUT_setMissingDocumentList([])
        this.MUT_setMissingDocumentOrderCount(0)
      }
    },

    /*
     * Yalnizca badge icin hafif sayac ucu -- navbar her acilista bunu
     * cagiriyor, tam listeyi DEGIL. Liste ancak panel acildiginda
     * cekiliyor (bkz. shared/Navbar.vue: missingDocumentOpen).
     */
    async setMissingDocumentOrderCount() {
      try {
        const api = useApi()
        const res = await api<{ order: number }>(
          "/upload/document/missing/count",
        )
        this.MUT_setMissingDocumentOrderCount(res?.order ?? 0)
      } catch (err) {
        console.error("setMissingDocumentOrderCount basarisiz:", err)
        this.MUT_setMissingDocumentOrderCount(0)
      }
    },

    /* --- mutation'lar --- */

    MUT_setDocumentModelList(payload: DocumentModel[]) {
      this.documentModelList = payload
    },
    MUT_setDocumentSupplierList(payload: DocumentSupplier[]) {
      this.documentSupplierList = payload
    },
    MUT_setDocumentProductSupplierList(payload: DocumentSupplier[]) {
      this.documentProductSupplierList = payload
    },
    MUT_setMissingDocumentList(payload: MissingDocumentOrder[]) {
      this.missingDocumentList = payload
    },
    MUT_setMissingDocumentOrderCount(payload: number) {
      this.missingDocumentOrderCount = payload
    },
  },
})
