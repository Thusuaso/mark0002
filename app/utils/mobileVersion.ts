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
    version: "1.0.6",
    date: "2026-11-17",
    notes: [
      "The app is now called GOZ everywhere, including the icon on your home screen.",
      "Redesigned menu: a fixed top bar, collapsible sections and a clear marker on the page you are on.",
    ],
  },
  {
    version: "1.0.5",
    date: "2026-11-17",
    notes: [
      "Production Crates rebuilt for the phone — the last screen in scope. Instead of a 17-column table: crate number and date in the header, product, size and supplier below, amount and piece count at the bottom.",
      "Fason and Kutulama now show as badges; the negative state is kept but muted.",
      "Full-width date range picker, with Search / Clear / Excel underneath.",
      "When you search on the phone and then export, the Excel file now contains what is on screen rather than the whole list.",
    ],
  },
  {
    version: "1.0.4",
    date: "2026-11-17",
    notes: [
      "Dialogs fixed on the phone: they now open full screen, the header and footer buttons stay put, and the content scrolls on its own.",
      "Form fields inside dialogs stack vertically; they used to sit side by side with labels overlapping the inputs.",
      "The six tabs in the order detail (Order, Proforma, Cost, Supplier, Document, Check) scroll horizontally on one line.",
      "Tables inside dialogs keep their natural width and scroll in their own box instead of breaking mid-word.",
      "Finance rebuilt for the phone: the balance sits in the card header, the other amounts below it in two columns. Maturities are in a separate, collapsed section.",
      "The Line field was removed from Container Follow (list, form and save).",
    ],
  },
  {
    version: "1.0.3",
    date: "2026-11-17",
    notes: [
      "Sale Customers rebuilt for the phone: company name in the header with its country flag, address clamped to two lines, representative and seller below. The Assigned/Personal marks now appear as badges only when they apply, instead of a tick or cross on every row.",
      "Selection › Entry rebuilt for the phone: crate number in the card header, product and size below, amount / box / per-box figures in a single strip at the bottom.",
      "Both screens have a sticky search box and load in chunks.",
    ],
  },
  {
    version: "1.0.2",
    date: "2026-11-17",
    notes: [
      "Stock Report rebuilt for the phone: a card list instead of an eight-column table — product, category, surface and size on the left, square metres and crate count on the right.",
      "The list type (Only Stock, External, Mekmer…) is now a single picker instead of seven radio buttons.",
      "Sticky search box at the top: by product, category or surface.",
      "Long lists load in chunks; no paging back and forth.",
    ],
  },
  {
    version: "1.0.1",
    date: "2026-11-16",
    notes: [
      "The Finance screen was not loading its data. Fixed.",
      "The same fault affected other report screens, which are fixed too: AYO, MK, GU, Mekmer Finance and the exchange-rate fields.",
      "Excel export now works from the app as well.",
    ],
  },
  {
    version: "1.0.0",
    date: "2026-11-16",
    notes: [
      "First Android release.",
      "Only the screens needed in the field are available on the phone: Home, Orders (Production / Shipped / On Hold), Mekmer (Production, Shipped, Production Crates, Stock Report), Selection entry, Finance and Sale Customers.",
      "PO card view on the order screens: one card per PO, products inside it, production progress shown as a bar.",
      "PI document download moved to a short-lived ticket, so it works from the app too.",
    ],
  },
]

export const MOBILE_VERSION = MOBILE_RELEASES[0]!.version
