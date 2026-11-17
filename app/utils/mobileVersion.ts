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
    version: "1.0.4",
    date: "2026-11-17",
    notes: [
      "Dialoglar telefonda düzeldi: artık tam ekran açılıyorlar, başlık ve alt düğmeler sabit kalıyor, içerik kendi içinde kayıyor.",
      "Dialog içindeki form alanları alt alta diziliyor; daha önce yan yana sıkışıp etiketler kutuların üstüne biniyordu.",
      "Sipariş detayındaki altı sekme (Order, Proforma, Cost, Supplier, Document, Check) tek satırda yatay kayıyor.",
      "Dialog içindeki tablolar harf harf kırılmak yerine doğal genişliğinde, kendi kutusunda yatay kayıyor.",
      "Finance telefon için yeniden tasarlandı: bakiye kartın başlığında, diğer tutarlar altında iki sütun halinde. Vadeler ayrı ve kapalı bir bölümde.",
      "Container Follow ekranından Line alanı kaldırıldı (liste, form ve kayıt).",
    ],
  },
  {
    version: "1.0.3",
    date: "2026-11-17",
    notes: [
      "Sale Customers telefon için yeniden tasarlandı: firma adı başlıkta, ülke bayrağıyla birlikte; adres iki satırda kısaltılıyor, temsilci ve satışçı altta. Devir/Özel işaretleri her satırda ✓/X yerine yalnızca geçerliyse rozet olarak çıkıyor.",
      "Selection › Entry telefon için yeniden tasarlandı: kart başlığı kasa numarası, altında ürün ve ebat, en altta miktar / kutu / kutuda sayıları tek şerit halinde.",
      "Her iki ekranda da üstte sabit arama kutusu ve parçalı yükleme var.",
    ],
  },
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
