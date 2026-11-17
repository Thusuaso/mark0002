/*
 * MOBIL SURUM VE YENILIKLER -- TEK KAYNAK.
 *
 * Buradaki numara UC yerde birden gorunuyor:
 *   1. menunun altindaki "Surum x.y.z" satiri (SharedMobileNav)
 *   2. /app indirme sayfasi
 *   3. APK'nin kendi surum adi (mobile/android/app/build.gradle)
 *
 * [!] APK'nin build.gradle'indaki versionName/versionCode ELLE
 * guncellenmiyor: `npm run release:mobile` buradaki degeri okuyup oraya
 * yaziyor. Iki yerde ayri tutulursa indirme sayfasi bir sey, telefondaki
 * uygulama baska bir sey soyler ve "guncelledim mi" sorusu
 * cevaplanamaz hale gelir.
 *
 * YENI SURUM CIKARIRKEN: en uste yeni bir kayit ekle, MOBILE_VERSION'i
 * onun surumune esitle, sonra `npm run release:mobile`.
 *
 * versionCode (Android'in ic sayaci) surumden turetiliyor:
 *   major*10000 + minor*100 + patch   ->  1.2.3 = 10203
 * Android bu sayinin her yayinda ARTMASINI sart kosuyor; formul bunu
 * surum numarasi arttikca kendiliginden sagliyor.
 */
export interface MobileRelease {
  version: string
  /* ISO tarih -- gosterimde gun.ay.yil'a cevriliyor. */
  date: string
  notes: string[]
}

export const MOBILE_RELEASES: MobileRelease[] = [
  {
    version: "1.0.2",
    date: "2026-11-17",
    notes: [
      "Stock Report telefon için yeniden tasarlandı: sekiz kolonluk tablo yerine kart listesi — solda ürün, kategori, yüzey ve ebat, sağda m² ve kasa sayısı.",
      "Liste türü (Only Stock, External, Mekmer…) yedi radyo düğmesi yerine tek seçiciye indi.",
      "Üstte sabit arama kutusu: ürün, kategori veya yüzeye göre.",
      "Uzun listeler parça parça yükleniyor; sayfa numaraları arasında gidip gelmek yok.",
    ],
  },
  {
    version: "1.0.1",
    date: "2026-11-16",
    notes: [
      "Finance sayfasında veriler gelmiyordu, düzeltildi.",
      "Aynı sorundan etkilenen diğer rapor ekranları da düzeltildi: AYO, MK, GU, Mekmer Finans ve döviz kuru alanları.",
      "Excel çıktısı uygulamadan da alınabiliyor.",
    ],
  },
  {
    version: "1.0.0",
    date: "2026-11-16",
    notes: [
      "İlk Android sürümü.",
      "Telefonda yalnızca saha için gerekli ekranlar açılıyor: Ana Sayfa, Orders (Production / Shipped / On Hold), Mekmer (Production, Shipped, Production Crates, Stock Report), Selection girişi, Finance ve Sale Customers.",
      "Sipariş ekranlarında PO kart görünümü: her PO tek kart, ürünler kartın içinde, üretim ilerlemesi çubukla.",
      "PI evrakı indirme kısa ömürlü bilete geçti; uygulamadan da çalışıyor.",
    ],
  },
]

export const MOBILE_VERSION = MOBILE_RELEASES[0]!.version
