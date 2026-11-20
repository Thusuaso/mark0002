/*
 * ANA MENU -- TEK KAYNAK.
 *
 * Navbar eskiden ayni menuyu UC KEZ, elle yaziyordu (~60 baglanti,
 * 1100 satir). Uc kopya birbirinden bagimsiz degistirilebildigi icin
 * sessizce ayrisabiliyordu: yeni bir ekran yalnizca birine eklenince
 * kimin gordugu rastgele oluyordu. Yapi burada, gorunum bilesende.
 *
 * [!] ICERIK BIREBIR KORUNDU -- bu bir tasarim degisikligiydi, menu
 * degisikligi DEGIL. Baglantilar, metinler, siralama ve kosullar eski
 * sablondan oldugu gibi cikarildi; hicbir oge eklenmedi, silinmedi,
 * yeri degistirilmedi.
 *
 * OLU KOSULLAR DA KORUNDU (bilerek):
 * A varyanti zaten `!getAuthorityStatus` iken gosteriliyor, ama uc
 * ogesinin kosulu `getAuthorityStatus` -- yani ASLA gorunmuyorlar
 * (ust seviyedeki SELECTION, ve MEKMER icindeki iki rapor). Bunlar
 * eski sablonda da boyleydi. Silmek davranisi degistirmezdi ama
 * "sadece gorunum" kapsaminin disina cikardi; kaldirilmasi ayri bir
 * karar.
 */

export interface NavItem {
  label: string
  to: string
  /* Cozumu bilende: "canSeePasswords" | "getAyoStatus" |
     "getAuthorityStatus" | "!getAuthorityStatus" */
  when?: string
}

export interface NavGroup {
  /* Baslik yoksa oge TEK BASINA bir baglantidir (acilir menu degil). */
  label?: string
  to?: string
  items?: NavItem[]
  when?: string
}

/* ---------------------------------------------------------------- *
 * A -- TAM MENU   (!getAuthorityStatus)
 * ---------------------------------------------------------------- */
export const NAV_FULL: NavGroup[] = [
  /* [!] OLU: bu navbar zaten !getAuthorityStatus iken cikiyor. */
  { label: "SELECTION", to: "/selection/input", when: "getAuthorityStatus" },

  { label: "HOME", to: "/" },

  {
    label: "ORDERS",
    items: [
      { label: "Production", to: "/orders/production" },
      { label: "Shipped", to: "/orders/shipped" },
      { label: "On Hold", to: "/orders/waiting" },
    ],
  },
  {
    label: "SALES",
    items: [
      { label: "To Do", to: "/sales/todo" },
      { label: "Sales & Operation", to: "/sales/representative" },
      { label: "Customer Notes", to: "/sales/follow" },
      { label: "BGP Projects", to: "/sales/bgp" },
      { label: "Points to Consider", to: "/sales/consider" },
      { label: "Passwords", to: "/passwords", when: "canSeePasswords" },
      { label: "Important Links", to: "/sales/important-links" },
    ],
  },
  {
    label: "SELECTION",
    items: [
      { label: "Entry", to: "/selection/input" },
      { label: "Crate Size", to: "/selection/size" },
      { label: "Container Calculator", to: "/container" },
    ],
  },

  { label: "FINANCE", to: "/finance" },

  {
    label: "OPERATION",
    items: [
      { label: "Product Data", to: "/operation/cards" },
      { label: "Suppliers", to: "/operation/supplier" },
      { label: "Dispatch", to: "/operation/shipment" },
      { label: "Shipment Form", to: "/operation/uploadform" },
      { label: "Container Tracking", to: "/operation/follow" },
      { label: "Shipped Containers", to: "/operation/unfollow" },
      { label: "Shipment Costs", to: "/operation/transport" },
      { label: "Shipment Invoices", to: "/operation/transportlist" },
      { label: "FOB Costs", to: "/operation/container" },
      { label: "FOB Invoices", to: "/operation/containerlist" },
      { label: "Palet Takibi", to: "/operation/palet" },
    ],
  },
  {
    label: "CUSTOMERS",
    items: [
      { label: "Sale Customers", to: "/customer/mekmar" },
      { label: "Quote Customers", to: "/customer/offer" },
      { label: "BGP Customer", to: "/customer/bgp" },
      { label: "Expo Customers", to: "/customer/fair" },
      { label: "Selection", to: "/customer/selection" },
    ],
  },
  {
    label: "MEKMER",
    items: [
      { label: "Production Crates", to: "/reports/mekmer/production" },
      { label: "Stock Report", to: "/reports/mekmer/stock" },
      { label: "Quarry Info", to: "/reports/mekmer/mine" },
      { label: "Production", to: "/reports/mekmer/productions" },
      { label: "Shipped", to: "/reports/mekmer/shipped" },
      { label: "On Hold", to: "/reports/mekmer/onhold" },
      { label: "Finance", to: "/reports/mekmer/finance" },
      { label: "Mekmer Alış Finans", to: "/reports/mekmer/new-mekmer-finance" },
      /* [!] OLU -- gerekcesi dosya basinda. */
      {
        label: "Product Purchase",
        to: "/reports/mekmer/by-buying-production",
        when: "getAuthorityStatus",
      },
      {
        label: "Shipped Crates",
        to: "/reports/mekmar/forwarding",
        when: "getAuthorityStatus",
      },
      { label: "Stripler", to: "/reports/mekmer/strips" },
      { label: "Muhasebe", to: "/reports/mekmer/calculating-cost" },
    ],
  },
  {
    label: "MEKMAR REPORTS",
    items: [
      { label: "AYO", to: "/reports/mekmar/ayo", when: "getAyoStatus" },
      { label: "List of Shipments", to: "/reports/mekmar/loading" },
      { label: "Shipped Crates", to: "/reports/mekmar/forwarding" },
      { label: "Order Summary", to: "/reports/mekmar/summary" },
      { label: "MK Reports", to: "/reports/mekmar/mk" },
      { label: "Reports", to: "/reports/mekmar/gu", when: "getAyoStatus" },
      {
        label: "Finance",
        to: "/reports/mekmar/filter-finance",
        when: "getAyoStatus",
      },
      {
        label: "Country Orders",
        to: "/reports/mekmar/country-order",
        when: "getAyoStatus",
      },
      {
        label: "Supplier Cost",
        to: "/reports/mekmar/supplier-cost",
        when: "getAyoStatus",
      },
      {
        label: "Continent Orders",
        to: "/reports/mekmar/continent-order",
        when: "getAyoStatus",
      },
    ],
  },
  {
    label: "SAMPLE",
    items: [
      { label: "Sample List", to: "/sample/sample" },
      { label: "Sample Finance", to: "/sample/finance" },
    ],
  },

  { label: "QUOTES", to: "/offers" },

  {
    label: "W. PANEL",
    items: [
      { label: "Products (Published)", to: "/panel/products/published" },
      { label: "Products (Unpublished)", to: "/panel/products/notpublished" },
      { label: "Projects", to: "/panel/project" },
      { label: "Product Queue", to: "/panel/products/queue" },
      { label: "USA Panel", to: "/panel/usa" },
    ],
  },
]

/* ---------------------------------------------------------------- *
 * B -- userId == 62
 * ---------------------------------------------------------------- */
export const NAV_62: NavGroup[] = [
  {
    label: "Yükleme",
    items: [
      { label: "Yüklenen", to: "/reports/mekmer/shipped" },
      { label: "Yükleme Raporu", to: "/reports/mekmar/forwarding" },
    ],
  },
]

/* ---------------------------------------------------------------- *
 * C -- kisitli kullanicilar (48 / 54 / 56)
 * ---------------------------------------------------------------- */
export const NAV_RESTRICTED: NavGroup[] = [
  {
    label: "Mekmar Siparişler",
    items: [
      { label: "Production", to: "/orders/production" },
      { label: "Shipped", to: "/orders/shipped" },
      { label: "On Hold", to: "/orders/waiting" },
    ],
  },

  { label: "Siparişler", to: "/reports/mekmer/productions" },
  { label: "Üretim Raporu", to: "/reports/mekmer/production" },

  {
    label: "Seleksiyon",
    items: [
      { label: "Stok", to: "/selection/input" },
      { label: "Stok Raporu", to: "/reports/mekmer/stock" },
    ],
  },
  {
    label: "Yükleme",
    items: [
      { label: "Yüklenen", to: "/reports/mekmer/shipped" },
      { label: "Yükleme Raporu", to: "/reports/mekmar/forwarding" },
    ],
  },

  { label: "Cari (Finans)", to: "/reports/mekmer/finance" },
  { label: "Kasa Satış Fiyatı", to: "/reports/mekmer/by-buying-production" },
  { label: "Muhasebe", to: "/reports/mekmer/calculating-cost" },
  { label: "Strip & Moloz", to: "/reports/mekmer/strips" },
  { label: "Sevk Et", to: "/operation/shipment" },
  { label: "Mekmer Finans", to: "/reports/mekmer/new-mekmer-finance" },
  { label: "Product Data", to: "/operation/cards" },
  { label: "Sale Customers", to: "/customer/mekmar" },
]
