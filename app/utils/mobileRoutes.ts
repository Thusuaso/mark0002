/*
 * ANDROID KABUGUNDA GORUNEN EKRANLAR -- TEK KAYNAK.
 *
 * Hem menu (components/shared/MobileNav.vue) hem de yonlendirme
 * kisitlamasi (middleware/mobile-scope.global.ts) bu listeyi okuyor;
 * ikisi ayri yerde tutulursa menude olmayan bir ekrana adresten
 * girilebilir ya da menude olup acilmayan bir oge kalir.
 *
 * [!] LISTE WEB'I ETKILEMEZ. Kisitlama yalnizca mobil derlemede
 * (MOBILE_BUILD=1 -> runtimeConfig.public.isMobile) devreye giriyor;
 * tarayicidan girildiginde 66 rotanin hepsi eskisi gibi acik.
 *
 * Kapsam kullanicinin belirledigi listedir: ana sayfa, Orders, Finance,
 * Selection girisi, Mekmer uretim/sevk/kasa/stok ve satis musterileri.
 * Buyutmek icin yeni satir eklemek yeterli -- baska hicbir yer
 * degismiyor.
 */
export interface MobileRoute {
  path: string
  label: string
  /* PrimeIcons adi; menude ogeyi ayirt etmek icin. */
  icon: string
  group: string
}

export const MOBILE_ROUTES: MobileRoute[] = [
  { path: "/", label: "Ana Sayfa", icon: "pi-home", group: "" },

  { path: "/orders/production", label: "Production", icon: "pi-cog", group: "Orders" },
  { path: "/orders/shipped", label: "Shipped", icon: "pi-send", group: "Orders" },
  { path: "/orders/waiting", label: "On Hold", icon: "pi-pause", group: "Orders" },

  { path: "/reports/mekmer/productions", label: "Production", icon: "pi-cog", group: "Mekmer" },
  { path: "/reports/mekmer/shipped", label: "Shipped", icon: "pi-send", group: "Mekmer" },
  { path: "/reports/mekmer/production", label: "Production Crates", icon: "pi-box", group: "Mekmer" },
  { path: "/reports/mekmer/stock", label: "Stock Report", icon: "pi-chart-bar", group: "Mekmer" },

  { path: "/selection/input", label: "Entry", icon: "pi-pencil", group: "Selection" },
  { path: "/finance", label: "Finance", icon: "pi-wallet", group: "" },
  { path: "/customer/mekmar", label: "Sale Customers", icon: "pi-users", group: "" },
  { path: "/customer/offer", label: "Quote Customers", icon: "pi-id-card", group: "" },
  { path: "/reports/mekmar/summary", label: "Order Summary", icon: "pi-chart-line", group: "" },
]

/*
 * Kisitlamanin DISINDA kalan yollar -- menude yok ama erisilebilir
 * olmak ZORUNDA, yoksa uygulama kendini kilitler:
 *   /auth*  giris akisi (yonlendirmenin hedefi de burasi olabiliyor)
 */
const DAIMA_ACIK = [
  "/auth",
  /* Surum notlari + APK indirme. Menunun altindaki "Surum x.y.z"
     satiri buraya gidiyor; kapsam disinda birakilirsa o baglanti
     kendini ana sayfaya atar. */
  "/app",
]

export function isMobileAllowed(path: string): boolean {
  const temiz = path.split("?")[0]!.replace(/\/+$/, "") || "/"
  if (DAIMA_ACIK.some((p) => temiz === p || temiz.startsWith(p + "/"))) {
    return true
  }
  return MOBILE_ROUTES.some((r) => r.path === temiz)
}
