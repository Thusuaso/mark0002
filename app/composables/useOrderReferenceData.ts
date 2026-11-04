/*
 * Siparis ekranlarinin acilir listelerini besleyen REFERANS VERISI.
 *
 * NEDEN VAR -- gercek bir hata sonucu:
 * Nuxt 2'de layouts/default.vue'nun created()'i acilista 25 liste
 * action'ini birden tetikliyordu (musteriler, ulkeler, birimler,
 * teslim/odeme/fatura turleri...). Pilotun layout'u bunu BILEREK
 * ertelemis ve "her sayfa kendi ihtiyacini useAsyncData ile ceksin"
 * notunu dusmus.
 *
 * Ancak pages/orders/waiting.vue ve production.vue tasinirken yalnizca o
 * sayfalarin kendi created()'larindaki 2 action aktarildi. Detay
 * diyalogunun ve proforma formunun okudugu referans listeleri HIC
 * cekilmedi. Sonuc: Customer AutoComplete'i ve proforma bolumundeki
 * Select / AutoComplete alanlari BOS geldi.
 *
 * Hata yok, uyari yok: getter bos dizi donuyor, bilesen de bos liste
 * gosteriyor. Derleme, SSR render ve "cozulemeyen bilesen" kontrolleri
 * bunu yakalamaz. Bu yuzden tools/codemods/check-list-fetches.mjs
 * yazildi: bir sayfanin okudugu her getter'in arkasindaki state'i
 * dolduran bir action'in gercekten cagrildigini dogruluyor.
 *
 * NEDEN LAYOUT'A GERI KONULMADI: 25 listenin tamamini her sayfa acilisinda
 * cekmek Nuxt 2'deki davranisti ve gereksiz; siparis ekranlarinin
 * ihtiyaci bu yedisi. Diger ekranlar tasindikca kendi kumelerini
 * tanimlayabilir.
 *
 * ZATEN DOLUYSA TEKRAR CEKMEZ: Pinia state'i gezinmeler arasinda
 * yasiyor, bu yuzden waiting -> production gecisinde ayni listeler
 * yeniden istenmiyor. `force: true` ile zorlanabilir.
 */
export async function useOrderReferenceData(options: { force?: boolean } = {}) {
  const shared = useSharedStore()

  /* getter degil STATE okunuyor: bos mu diye bakmak icin yeterli. */
  const lists: Array<[keyof typeof shared.$state, () => unknown]> = [
    ["customersList", () => shared.setCustomerList()],
    ["unitList", () => shared.setUnitList()],
    ["countryList", () => shared.setCountryList()],
    ["orderKindOfDeliveryList", () => shared.setOrderKindOfDeliveryList()],
    ["orderKindOfPaymentList", () => shared.setOrderKindOfPaymentList()],
    ["orderKindOfInvoiceList", () => shared.setOrderKindOfInvoiceList()],
    ["orderKindOfDeliverySupplierList", () => shared.setOrderKindOfDeliverySupplierList()],

    /*
     * Tedarikci listesi: hem isçilik (workerman) formundaki AutoComplete
     * hem de OrderDetailSupplierForm'daki Select bunu okuyor
     * (:supplier="sharedStore.getSupplierList").
     *
     * Nuxt 2'de layouts/default.vue cekiyordu. Tasinan sayfalarda ise
     * TEK gecen yer bir YORUM satiriydi
     * (waiting.vue: `// this.sharedStore.setSupplierList();`), yani
     * fiilen hic cagrilmiyordu ve bu iki alan da bos geliyordu.
     */
    ["supplierList", () => shared.setSupplierList()],

    /*
     * Tum siparislerin listesi: orderDetail/Form.vue'daki inputPo()
     * bunu okuyor ve girilen po numarasi zaten kullanilmissa uyari
     * veriyor (`sharedStore.getOrdersAllList.find(...)`).
     *
     * Nuxt 2'de layouts/default.vue cekiyordu; waiting ve production
     * ayrica kendi metotlarinda da tazeliyordu, ama shipped.vue YALNIZCA
     * layout'a guveniyordu. Pilotta layout bunu cekmedigi icin shipped
     * ekraninda po cakisma uyarisi hic calismazdi -- liste bos oldugundan
     * find() daima undefined donerdi.
     */
    ["ordersAllList", () => shared.setOrderAllList()],
  ]

  /*
   * Cekim/atlama/`force` mantigi useReferenceData'da (tek yerde);
   * burada yalnizca SIPARIS ekranlarinin listesi duruyor.
   */
  await useReferenceData("order-reference-data", lists, options)
}
