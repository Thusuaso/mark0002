/*
 * YIKICI ISLEMLER ICIN ONAY -- TEK METIN, TEK YER.
 *
 * ---------------------------------------------------------------------
 * NEDEN VAR
 * ---------------------------------------------------------------------
 * Silme ve guncelleme dugmeleri tutarsizdi. Olculdu (42 adet
 * `label="Delete"` / `label="Update"` dugmesi):
 *
 *   19 tanesi onay soruyordu, 23 tanesi HIC SORMUYORDU --
 *   yani tek tikla kayit siliniyordu.
 *
 * Soranlarin metni de dagilmisti: 17 kez "Are you sure you want to
 * delete?", ayrica "Silme Islemini Onayliyor musunuz?",
 * "Silmek istiyor musunuz?", "Silme islemini onayliyor musunuz?"
 * gibi birbirinden farkli Turkce varyantlar.
 *
 * Burada tek bir metin var; degistirmek gerekirse tek satir.
 *
 * ---------------------------------------------------------------------
 * NEDEN NATIVE confirm()
 * ---------------------------------------------------------------------
 * PrimeVue'nun ConfirmDialog'u gorsel olarak uygulamaya daha cok
 * yakisirdi, ama o GERI CAGIRMA tabanli: `confirm.require({ accept })`.
 * Bu, 42 cagri yerinin akisini (if/return, async/await, erken cikislar)
 * yeniden yazmak demek -- yikici islemler uzerinde, dogrulanmasi zor
 * bir degisiklik.
 *
 * `confirm()` SENKRON: cagri yerine tek satir eklenir, govdeye hic
 * dokunulmaz. Ayrica bu projede ZATEN kullanilan kalip (26 dosyada
 * mevcut), yani yeni bir sey getirmiyor.
 *
 * Gorsel olarak PrimeVue dialoguna gecmek istenirse: bu dosyadaki
 * fonksiyon imzasi korunarak degistirilemez (senkron -> async olur),
 * cagri yerleri de `await` almak zorunda kalir. Bilincli bir karar
 * olarak ertelendi.
 */

/** Silme/guncelleme onayinda gosterilen metin. */
export const CONFIRM_MESSAGE = "Are you sure you want to perform this action?"

/**
 * Kullaniciya onay sorar.
 *
 * Kullanim -- islemi yapan metodun ILK satiri:
 *
 *     deleteForm() {
 *       if (!confirmAction()) return
 *       ...
 *     }
 *
 * @param message Ozel metin verilmezse standart metin kullanilir.
 * @returns kullanici onayladiysa true
 */
export function confirmAction(message: string = CONFIRM_MESSAGE): boolean {
  /*
   * SSR korumasi: bu yardimci yalnizca kullanici etkilesiminden
   * cagriliyor, yani pratikte hep istemcide calisir. Yine de sunucuda
   * `confirm` tanimsiz oldugu icin orada true donuyor -- aksi halde
   * yanlislikla sunucuda cagrilirsa islem sessizce iptal olurdu.
   */
  if (typeof window === "undefined") return true

  return window.confirm(message)
}
