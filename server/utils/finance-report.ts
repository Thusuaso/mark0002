/*
 * Excel sunucusundaki UC finans raporu ucunun ortak motoru.
 *
 *   /finance/reports/test         -> FinanceTest.getList()
 *   /finance/reports/test/filter  -> FinanceTest.getListFilter()
 *   /finance/reports/mekmer/all   -> FinanceTestAll.getListFilter()
 *
 * Ucu de ayni govdeyi donduruyor: { financeList, mayaList, vadeList }
 *
 * Python kaynagi (gercek dosyadan okundu, ozetten degil):
 *   component/finance/finance.py:6/23/40   uc Resource
 *   component/finance/list.py:7            FinanceTest
 *   component/finance/list.py:767          FinanceTestAll
 *   component/finance/maturity.py:5        VadeAnaliste
 *
 * Veritabanina YAZMIYOR (hepsi select) -> Python ile yan yana
 * dogrulanabiliyor.
 *
 * ---------------------------------------------------------------------
 * UC SINIF DEGIL, UC VARYANT
 * ---------------------------------------------------------------------
 * FinanceTest ve FinanceTestAll ayri iki sinifti (toplam ~700 satir)
 * ama 22 sorgunun 20'si BIREBIR AYNI (olculdu). Gercek farklar:
 *
 *   varyant       musteri Marketing listesi        getListFilter farki
 *   ------------  ------------------------------    -------------------
 *   test          'Mekmar','Imperial Homes'         (getList kullanir)
 *   test-filter   'İç Piyasa','Mekmer'              cost dahil, <8 suzer
 *   mekmer-all    'İç Piyasa','Mekmer','Mekmar'     cost YOK, suzmez
 *
 * Bu yuzden tek motor + varyant tablosu.
 *
 * ---------------------------------------------------------------------
 * BELLEKTE JOIN -- O(musteri x satir) YERINE MAP
 * ---------------------------------------------------------------------
 * Python 22 listeyi onden cekip her musteri icin listeleri BASTAN
 * TARIYORDU (`for item in self.orders: if item.MusteriID == id`).
 * Ustelik getList ayni getter'i satir basina 3 kez cagiriyor
 * (`__getOrder` 372, 374 ve 379'da), yani her tarama tekrarliyor.
 *
 * Burada listeler MusteriID'ye gore bir kez indeksleniyor. Davranis
 * ayni: Python ILK eslesen satiri aliyordu, Map de ilk yazilani
 * koruyor.
 */
import {
  SQL_CUSTOMERS, SQL_ORDERS, SQL_PRODUCTS, SQL_PRODUCTS_FILTER, SQL_PAIDS,
  SQL_PAIDS_FILTER, SQL_ORDERS_FORWARDING, SQL_ORDERS_PRODUCTION,
  SQL_PRODUCTS_FORWARDING, SQL_PRODUCTS_FORWARDING_FILTER,
  SQL_PRODUCTS_PRODUCTION, SQL_PRODUCTS_PRODUCTION_FILTER,
  SQL_ADVANCE_PAYMENT, SQL_ADVANCE_PAYMENT_FILTER, SQL_MAYA_PAYMENT_ORDERS,
  SQL_MAYA_PAYMENT_PRODUCTS, SQL_MAYA_PAYMENT_LIST, SQL_EXTRA_COST_FILTERED,
  SQL_COST_FILTER_FORWARDING,
} from "./finance-queries"

/* Python __noneControl: None -> 0, aksi halde float(). */
function nc(value: unknown): number {
  if (value === null || value === undefined) return 0
  const n = Number(value)
  return Number.isFinite(n) ? n : 0
}

/* Python __floatControlDecimal: -8..8 arasi 0 sayilir. */
function fcd(value: number): number {
  return value >= -8 && value <= 8 ? 0 : value
}

/*
 * ILK eslesen satir kazanir -- Python'un `for ... return` davranisi.
 */
function indexBy<T>(rows: T[], key: (r: T) => unknown): Map<unknown, T> {
  const m = new Map<unknown, T>()
  for (const r of rows) {
    const k = key(r)
    if (!m.has(k)) m.set(k, r)
  }
  return m
}

/*
 * Python getter'lari satir BULUNAMAZSA None donduruyor ve getList bunu
 * bazi alanlarda HAM gonderiyor (orn. 'advanced_payment'), yani govdede
 * null goruluyor. JSON'da `undefined` anahtari DUSURUR, bu yuzden
 * burada acikca null donuluyor.
 */
function pick<T>(m: Map<unknown, T>, id: unknown, f: (r: T) => number): number | null {
  const r = m.get(id)
  return r === undefined ? null : f(r)
}

type Cust = { ID: number; FirmaAdi: string; Marketing: string }
type Sum5 = { Navlun: number | null; Detay1: number | null; Detay2: number | null; Detay3: number | null; Sigorta: number | null }

const sum5 = (r: Sum5) => nc(r.Navlun) + nc(r.Detay1) + nc(r.Detay2) + nc(r.Detay3) + nc(r.Sigorta)

export type FinanceVariant = "test" | "test-filter" | "mekmer-all"

/*
 * Python'daki uc ayri musteri sorgusunun Marketing IN listeleri.
 * Sorgu `in (@m1, @m2, @m3)` bekliyor; ucten az deger varsa kalan
 * yuvalar null kalir ve NULL hicbir seyle eslesmedigi icin zararsiz.
 * (string_split kullanilamadi -- gerekcesi finance-queries.ts icinde.)
 */
const MARKETING: Record<FinanceVariant, string[]> = {
  "test": ["Mekmar", "Imperial Homes"],
  "test-filter": ["İç Piyasa", "Mekmer"],
  "mekmer-all": ["İç Piyasa", "Mekmer", "Mekmar"],
}

/*
 * Vade analizi (maturity.py:12). Ucunde de ayni, parametresiz.
 * dbo.Get_Siparis_Bakiye_Tutar fonksiyonu hem select'te hem where'de
 * cagriliyor -- Python'da da oyle, dokunulmadi.
 */
const SQL_VADE = `
select
  m.FirmaAdi,
  dbo.Get_Siparis_Bakiye_Tutar(s.SiparisNo) as tutar,
  s.SiparisNo,
  s.Vade
from SiparislerTB s, MusterilerTB m
where s.MusteriID = m.ID
  and (s.SiparisDurumID in (2,3))
  and s.Vade is not null
  and dbo.Get_Siparis_Bakiye_Tutar(s.SiparisNo) > 0
group by m.FirmaAdi, s.SiparisNo, s.Vade
`

export async function buildFinanceReport(variant: FinanceVariant) {
  const [m1, m2, m3 = null] = MARKETING[variant]
  const needCost = variant === "test-filter"

  /*
   * Python bu sorgulari __init__ icinde SIRAYLA calistiriyordu
   * (22 tur). Bagimsizlar, paralel gidiyorlar.
   *
   * mekmer-all varyanti costFilterForwarding'i KULLANMIYOR (Python'da
   * FinanceTestAll'da o sorgu hic yok), bu yuzden cekilmiyor.
   */
  const [
    customers, orders, products, productsFilter, paids, paidsFilter,
    ordersForwarding, ordersProduction, productsForwarding,
    productsForwardingFilter, productsProduction, productsProductionFilter,
    advancePayment, advancePaymentFilter, mayaOrders, mayaProducts, mayaPaids,
    extraCost, costForwarding, vade,
  ] = await dbAll([
    dbQuery<Cust>(SQL_CUSTOMERS, { m1, m2, m3 }),
    dbQuery<Sum5 & { MusteriID: number }>(SQL_ORDERS),
    dbQuery<{ MusteriID: number; SatisToplam: number | null }>(SQL_PRODUCTS),
    dbQuery<{ MusteriID: number; SatisToplam: number | null }>(SQL_PRODUCTS_FILTER),
    dbQuery<{ MusteriID: number; Tutar: number | null }>(SQL_PAIDS),
    dbQuery<{ MusteriID: number; Tutar: number | null }>(SQL_PAIDS_FILTER),
    dbQuery<Sum5 & { MusteriID: number }>(SQL_ORDERS_FORWARDING),
    dbQuery<Sum5 & { MusteriID: number }>(SQL_ORDERS_PRODUCTION),
    dbQuery<{ MusteriID: number; SatisToplam: number | null }>(SQL_PRODUCTS_FORWARDING),
    dbQuery<{ MusteriID: number; SatisToplam: number | null }>(SQL_PRODUCTS_FORWARDING_FILTER),
    dbQuery<{ MusteriID: number; SatisToplam: number | null }>(SQL_PRODUCTS_PRODUCTION),
    dbQuery<{ MusteriID: number; SatisToplam: number | null }>(SQL_PRODUCTS_PRODUCTION_FILTER),
    dbQuery<{ MusteriID: number; Pesinat: number | null }>(SQL_ADVANCE_PAYMENT),
    dbQuery<{ MusteriID: number; Pesinat: number | null }>(SQL_ADVANCE_PAYMENT_FILTER),
    dbQuery<{ SiparisNo: string; FirmaAdi: string; SiparisTarihi: Date | null; YuklemeTarihi: Date | null; Cost: number | null }>(SQL_MAYA_PAYMENT_ORDERS),
    dbQuery<{ SiparisNo: string; Total: number | null }>(SQL_MAYA_PAYMENT_PRODUCTS),
    dbQuery<{ SiparisNo: string; Total: number | null }>(SQL_MAYA_PAYMENT_LIST),
    dbQuery<{ MusteriID: number; Iscilik: number | null }>(SQL_EXTRA_COST_FILTERED),
    needCost
      ? dbQuery<{ MusteriID: number; Cost: number | null }>(SQL_COST_FILTER_FORWARDING)
      : Promise.resolve([]),
    dbQuery<{ FirmaAdi: string; tutar: number | null; SiparisNo: string; Vade: Date | null }>(SQL_VADE),
  ])

  const byCust = (rows: { MusteriID: number }[]) => indexBy(rows, (r) => r.MusteriID)

  const mOrders = byCust(orders)
  const mProducts = byCust(products)
  const mProductsFilter = byCust(productsFilter)
  const mPaids = byCust(paids)
  const mPaidsFilter = byCust(paidsFilter)
  const mOrdersFwd = byCust(ordersForwarding)
  const mOrdersPrd = byCust(ordersProduction)
  const mProductsFwd = byCust(productsForwarding)
  const mProductsFwdF = byCust(productsForwardingFilter)
  const mProductsPrd = byCust(productsProduction)
  const mProductsPrdF = byCust(productsProductionFilter)
  const mAdvance = byCust(advancePayment)
  const mAdvanceF = byCust(advancePaymentFilter)
  const mExtraCost = byCust(extraCost)
  const mCostFwd = byCust(costForwarding)

  const getOrder = (id: number) => pick(mOrders, id, sum5)
  const getProduct = (id: number) => pick(mProducts, id, (r) => nc(r.SatisToplam))
  const getProductFilter = (id: number) => pick(mProductsFilter, id, (r) => nc(r.SatisToplam))
  const getPaid = (id: number) => pick(mPaids, id, (r) => nc(r.Tutar))
  const getPaidFilter = (id: number) => pick(mPaidsFilter, id, (r) => nc(r.Tutar))
  const getOrderFwd = (id: number) => pick(mOrdersFwd, id, sum5)
  const getOrderPrd = (id: number) => pick(mOrdersPrd, id, sum5)
  const getProductFwd = (id: number) => pick(mProductsFwd, id, (r) => nc(r.SatisToplam))
  const getProductFwdF = (id: number) => pick(mProductsFwdF, id, (r) => nc(r.SatisToplam))
  const getProductPrd = (id: number) => pick(mProductsPrd, id, (r) => nc(r.SatisToplam))
  const getProductPrdF = (id: number) => pick(mProductsPrdF, id, (r) => nc(r.SatisToplam))
  const getAdvance = (id: number) => pick(mAdvance, id, (r) => nc(r.Pesinat))
  const getAdvanceF = (id: number) => pick(mAdvanceF, id, (r) => nc(r.Pesinat))
  const getWorkerman = (id: number) => pick(mExtraCost, id, (r) => nc(r.Iscilik))
  const getCostFwdF = (id: number) => pick(mCostFwd, id, (r) => nc(r.Cost))

  /* ---------------- financeList ---------------- */

  const financeList: Record<string, unknown>[] = []

  if (variant === "test") {
    /* Python FinanceTest.getList (list.py:361) -- SUZME YOK.
     * Not: `totalExceptProduction` anahtari BU varyantta YOK. */
    for (const c of customers) {
      financeList.push({
        marketing: c.Marketing,
        customer_id: c.ID,
        customer_name: c.FirmaAdi,
        /* HAM -- satir yoksa null (Python'da None). */
        order: getOrder(c.ID),
        product: getProduct(c.ID),
        total_order_amount: nc(getOrder(c.ID)) + nc(getProduct(c.ID)),
        paid: getPaid(c.ID),
        forwarding: nc(getOrderFwd(c.ID)) + nc(getProductFwd(c.ID)),
        production: nc(getProductPrd(c.ID)) + nc(getOrderPrd(c.ID)),
        advanced_payment: getAdvance(c.ID),
        total: nc(getOrder(c.ID)) + nc(getProduct(c.ID)) - nc(getPaid(c.ID)),
      })
    }
  } else {
    /*
     * Python FinanceTest.getListFilter (list.py:384) ve
     * FinanceTestAll.getListFilter (list.py:1107).
     *
     * IKI FARK:
     *  [1] test-filter, total <= 8 olan musterileri ATLAR;
     *      mekmer-all HIC SUZMEZ (Python'da o kontrol yok).
     *  [2] test-filter total_order_amount/forwarding/total/
     *      totalExceptProduction'a costFilterForwarding EKLER;
     *      mekmer-all eklemez (o sorgu FinanceTestAll'da yok).
     */
    for (const c of customers) {
      const fwdF = nc(getProductFwdF(c.ID))
      const prdF = nc(getProductPrdF(c.ID))
      const work = nc(getWorkerman(c.ID))
      const paidF = nc(getPaidFilter(c.ID))
      const cost = needCost ? nc(getCostFwdF(c.ID)) : 0

      if (needCost) {
        /*
         * Python: `total = (fwdF + prdF + work) - paidF`
         *         `if total == 0 or total < 8: continue`
         * DIKKAT: suzmede kullanilan `total` cost'u ICERMEZ, ama
         * govdeye yazilan `total` ICERIR. Python'da da oyle.
         */
        const gate = fwdF + prdF + work - paidF
        if (gate === 0 || gate < 8) continue
      }

      financeList.push({
        marketing: c.Marketing,
        customer_id: c.ID,
        customer_name: c.FirmaAdi,
        order: getOrder(c.ID),
        product: getProductFilter(c.ID),
        total_order_amount: nc(getProductFilter(c.ID)) + cost,
        paid: getPaidFilter(c.ID),
        forwarding: fwdF + cost,
        production: prdF,
        advanced_payment: getAdvanceF(c.ID),
        total: fwdF + prdF + work - paidF + cost,
        /*
         * -8..8 suzgeci SADECE test-filter'da var; mekmer-all'da
         * cikarma ciplak. Python'daki ayrim bu.
         */
        totalExceptProduction: needCost
          ? fcd(fwdF - paidF) + cost
          : fwdF - paidF,
      })
    }
  }

  /* ---------------- mayaList ---------------- */

  const mayaProd = indexBy(mayaProducts, (r) => r.SiparisNo)
  const mayaPaid = indexBy(mayaPaids, (r) => r.SiparisNo)

  /*
   * DIKKAT -- TARIH BICIMI: getMayaList sema KULLANMIYOR, duz dict
   * donduruyor ve Flask'in jsonify'i datetime'i HTTP-date olarak
   * dokuyor: "Thu, 23 Jun 2022 00:00:00 GMT" (olculdu).
   * JS'in toUTCString()'i birebir ayni bicimi uretiyor.
   *
   * Digerleri (vadeList, byPo...) marshmallow String uzerinden
   * "YYYY-MM-DD" veriyor -- ayni projede iki ayri tarih bicimi.
   */
  const httpDate = (d: Date | null) => (d ? new Date(d).toUTCString() : null)

  const mayaList = mayaOrders.map((item) => {
    const prod = pick(mayaProd, item.SiparisNo, (r) => nc(r.Total))
    const paid = pick(mayaPaid, item.SiparisNo, (r) => nc(r.Total))
    const amount = nc(item.Cost) + nc(prod)
    return {
      po: item.SiparisNo,
      customer: item.FirmaAdi,
      order_date: httpDate(item.SiparisTarihi),
      forwarding_date: httpDate(item.YuklemeTarihi),
      order_amount: amount,
      paid: nc(paid),
      balance: amount - nc(paid),
    }
  })

  /* ---------------- vadeList ---------------- */

  const vadeList = vade.map((item) => ({
    firmaAdi: item.FirmaAdi,
    tutar: item.tutar,
    siparis_no: item.SiparisNo,
    /* marshmallow String(date) -> "YYYY-MM-DD" (olculdu). */
    vade_tarih: sqlDate(item.Vade),
  }))

  return { financeList, mayaList, vadeList }
}
