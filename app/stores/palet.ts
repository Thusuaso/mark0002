import { defineStore } from "pinia"

/*
 * PALET TAKIBI
 *
 * Uclar ve tasarim gerekceleri: api/index.js, "PALET TAKIBI" blogu
 * Tablolar: api/sql/PaletTB.sql
 * Ekran: app/pages/operation/palet.vue
 */

export interface PaletListeDegeri {
  ID: number
  FirmaAdi?: string
  UrunBilgisi?: string
  Deger?: number
}

export interface PaletLookups {
  firma: PaletListeDegeri[]
  en: PaletListeDegeri[]
  boy: PaletListeDegeri[]
  kalinlik: PaletListeDegeri[]
  urun: PaletListeDegeri[]
}

export interface Palet {
  ID: number
  PaletNo: string
  Tarih: string
  FirmaId: number
  FirmaAdi: string
  EnId: number
  En: number
  BoyId: number
  Boy: number
  KalinlikId: number | null
  Kalinlik: number | null
  UrunId: number
  UrunBilgisi: string
  Adet: number
  M2: number
  Kullanildi: boolean
  KayitTarihi: string
}

export interface PaletSayim {
  tumu: number
  kullanilan: number
  kullanilmayan: number
}

export type PaletDurum = "tumu" | "kullanilan" | "kullanilmayan"

function bosLookups(): PaletLookups {
  return { firma: [], en: [], boy: [], kalinlik: [], urun: [] }
}

export const usePaletStore = defineStore("palet", {
  state: () => ({
    list: [] as Palet[],
    lookups: bosLookups() as PaletLookups,
    sayim: { tumu: 0, kullanilan: 0, kullanilmayan: 0 } as PaletSayim,
    durum: "tumu" as PaletDurum,
    yukleniyor: false,
  }),

  getters: {
    getPaletList: (state) => state.list,
    getPaletLookups: (state) => state.lookups,
    getPaletSayim: (state) => state.sayim,
    getPaletDurum: (state) => state.durum,

    /* Listedeki paletlerin M2 toplami -- tablo altinda gosteriliyor.
       Suzgec uygulanmis listeden hesaplaniyor, yani "Kullanilmayan"
       secildiginde yalnizca onlarin toplami. */
    getPaletM2Toplam: (state) =>
      state.list.reduce((t, p) => t + (Number(p.M2) || 0), 0),

    getPaletAdetToplam: (state) =>
      state.list.reduce((t, p) => t + (Number(p.Adet) || 0), 0),
  },

  actions: {
    async setPaletLookups() {
      try {
        const response = await useLegacyApi().get<PaletLookups>("/palet/lookups")
        this.lookups = response.data
      } catch (err) {
        console.error("setPaletLookups basarisiz:", err)
      }
    },

    /*
     * Suzgec SUNUCUDA uygulaniyor (bkz. /palet/list). Durum store'da
     * tutuluyor cunku kayit/isaretleme sonrasi liste yenilenirken AYNI
     * suzgecle yenilenmeli -- yoksa kullanici "Kullanilmayan"a bakarken
     * bir paleti isaretliyor ve liste birden "Tumu"ne donuyordu.
     */
    async setPaletList(durum?: PaletDurum) {
      if (durum) this.durum = durum

      this.yukleniyor = true
      try {
        const response = await useLegacyApi().get<{
          list: Palet[]
          sayim: PaletSayim
        }>(`/palet/list?durum=${this.durum}`)

        this.list = response.data.list || []
        if (response.data.sayim) this.sayim = response.data.sayim
      } catch (err) {
        console.error("setPaletList basarisiz:", err)
        useAppToast().error("Palet listesi alınamadı.")
      } finally {
        this.yukleniyor = false
      }
    },

    /*
     * Kayit ve guncelleme AYNI govdeyi yolluyor; ayrim ID'nin varligi.
     * Donus degeri basari/hata -- ekran dialogu yalnizca basaride
     * kapatiyor, yoksa doldurulmus form kaybolurdu.
     */
    async setPaletSave(model: Record<string, unknown>) {
      const api = useApi()
      const yeni = !model.ID

      try {
        const res = await api<{ status: boolean; message?: string; paletNo?: string }>(
          yeni ? "/palet/save" : "/palet/update",
          { method: yeni ? "POST" : "PUT", body: model },
        )

        if (!res || res.status === false) {
          useAppToast().error(res?.message || "Kayıt sırasında bir hata oluştu.")
          return false
        }

        useAppToast().success(
          yeni && res.paletNo
            ? `${res.paletNo} kaydedildi.`
            : "Kayıt güncellendi.",
        )

        /* Liste MEVCUT SUZGECLE yenileniyor; yeni palet o suzgece
           uymuyorsa listede gorunmez -- dogrusu da bu. */
        await this.setPaletList()
        /* Yeni bir firma/olcu/urun yazilmis olabilir: AutoComplete
           listeleri de tazelensin, yoksa ayni degeri ikinci kez yazan
           kullanici "yeni" uyarisi almaz ama oneri de gormez. */
        await this.setPaletLookups()
        return true
      } catch (err: unknown) {
        console.error("setPaletSave basarisiz:", err)
        const e = err as { data?: { message?: string }; message?: string }
        useAppToast().error(
          `Kayıt sırasında bir hata oluştu: ${e?.data?.message || e?.message || "bilinmeyen"}`,
        )
        return false
      }
    },

    /*
     * ISARET AYRI UC: tek tiklamayla degisiyor, tum form dogrulamasindan
     * gecmesi gerekmiyor (gerekcesi api/index.js /palet/used).
     */
    async setPaletUsed(id: number, kullanildi: boolean) {
      try {
        await useApi()("/palet/used", {
          method: "PUT",
          body: { ID: id, Kullanildi: kullanildi },
        })
        await this.setPaletList()
      } catch (err) {
        console.error("setPaletUsed basarisiz:", err)
        useAppToast().error("İşaret değiştirilemedi.")
        /* Liste yine yenileniyor: ekrandaki anlik degisiklik geri
           alinsin, kullanici kaydedilmemis bir isaret gormesin. */
        await this.setPaletList()
      }
    },

    async setPaletDelete(id: number) {
      try {
        await useApi()(`/palet/${id}`, { method: "DELETE" })
        useAppToast().success("Palet silindi.")
        await this.setPaletList()
      } catch (err) {
        console.error("setPaletDelete basarisiz:", err)
        useAppToast().error("Palet silinemedi.")
      }
    },
  },
})
