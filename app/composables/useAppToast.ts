import ToastEventBus from "primevue/toasteventbus"

/*
 * @nuxtjs/toast (Nuxt 3+'ta yok) yerine PrimeVue Toast uzerinde ayni
 * cagri sekli: toast.success(msg) / toast.error(msg) / toast.warn(msg)
 *
 * !!! NEDEN useToast() KULLANILMIYOR -- GERCEK BIR HATA SONUCU !!!
 *
 * Ilk surum PrimeVue'nun onerdigi yolu kullaniyordu:
 *     const toast = useToast()
 * ama useToast() govdesi sadece sudur:
 *     const PrimeVueToast = inject(PrimeVueToastSymbol)
 *     if (!PrimeVueToast) throw new Error('No PrimeVue Toast provided!')
 *
 * inject() YALNIZCA setup() / render / yasam dongusu kancalari icinde
 * calisir. Bu projede toast'lari cagiran yerlerin cogu PINIA ACTION'LARI
 * ve o action'lar TIKLAMA ISLEYICILERINDEN cagriliyor -- o anda aktif
 * bileşen ornegi (currentInstance) YOK. Sonuc: inject undefined doner ve
 * useToast() HATA FIRLATIR.
 *
 * Hata, action'in ilk satirinda atildigi icin action'in geri kalani hic
 * calismiyor. Somut belirti:
 *
 *   Siparis detay diyalogunda "Exit" -> closeProductionForm()
 *     -> orderStore.setProductionProductSaveMail(data)
 *          const toast = useAppToast()   <-- burada patliyor
 *     -> geri donus yok, dolayisiyla
 *        `this.production_detail_form = false` HIC CALISMIYOR
 *        => DIYALOG KAPANMIYOR.
 *
 * Kullanici bunu "exit tiklayinca dialog kapanmiyor" olarak bildirdi;
 * sebebi toast'ti.
 *
 * COZUM: PrimeVue'nun ToastService'i zaten ToastEventBus uzerine ince
 * bir sarmalayici -- yaptigi tek sey `ToastEventBus.emit("add", mesaj)`.
 * Bus duz bir olay yayicisi, bileşen baglami istemiyor. Buradan dogrudan
 * yayinca her yerden (store action'i, olay isleyicisi, plain fonksiyon)
 * calisiyor.
 *
 * Mesajlari dinleyen <Toast /> bileşeni layouts/default.vue ve
 * layouts/empty.vue icinde bagli; bus'a kendisi abone oluyor.
 */

function add(severity: "success" | "error" | "warn" | "info", summary: string, detail: string) {
  ToastEventBus.emit("add", { severity, summary, detail, life: 3000 })
}

export function useAppToast() {
  return {
    success(detail: string) {
      add("success", "Başarılı", detail)
    },

    error(detail: string) {
      add("error", "Hata", detail)
    },

    /*
     * EKLENDI -- @nuxtjs/toast'ta karsiligi vardi ama bu projede hic
     * kullanilmamis: uyari niteligindeki mesajlar .success() ile, yani
     * YESIL "Başarılı" kutusu olarak gosteriliyordu. Gecis sirasinda
     * bulunan ornekler:
     *   "Bu po ya ait sipariş bulunmakta."    -> cakisma UYARISI
     *   "Dosya boyutu 1MB den büyük olamaz!"  -> HATA (.error yapildi)
     *   "Error"                                -> HATA (.error yapildi)
     *
     * PrimeVue 4'te severity adi "warning" DEGIL "warn".
     */
    warn(detail: string) {
      add("warn", "Uyarı", detail)
    },
  }
}
