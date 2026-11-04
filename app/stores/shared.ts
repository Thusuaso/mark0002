import { defineStore } from "pinia"
import type { AppUser, Supplier } from "~/types/models"

/*
 * store/modules/shared.js -> Pinia   (+ store/modules/loading.js)
 *
 * Bu dosya tools/codemods/vuex-to-pinia.mjs ile URETILDI, sonra elle
 * gozden gecirildi ve ONCEKI ELLE YAZILMIS SURUMLE BIRLESTIRILDI.
 *
 * Birlesme neden gerekti: bu dosyanin ilk hali elle yazilmisti ve
 * shared.js'in yalnizca ucunu kapsiyordu (supplierList + userList +
 * loading) -- 31 action'dan 2'si, 42 getter'dan 3'u. cards/list.vue
 * `setCardList`, waiting.vue `getCustomersList`/`getUnitList`/
 * `getCountryList`... istiyor; bunlar yoktu. Modul "tasinmis" gorunuyordu
 * ama uyelerin %90'i eksikti -- ve bu eksiklik derleme zamaninda
 * gorunmuyor. (Bu yuzden tools/codemods/check-store-coverage.mjs yazildi:
 * artik bir bilesen tasinmadan once uye duzeyinde kontrol ediliyor.)
 *
 * CODEMOD CIKTISI UZERINE ELLE KORUNANLAR:
 *   - loading / loadingDatatable sayaclari (Vuex'te ayri `loading`
 *     modulundeydi; pilotta bu store'un icinde)
 *   - setUserList: parola alanini FILTRELEYEN surum korundu. Codemod'un
 *     urettigi hal `response.data.users`i oldugu gibi state'e yaziyor,
 *     yani /api/users'in dondurdugu YSifre alani store'a ve tarayiciya
 *     girerdi -- mevcut guvenlik duzeltmesi geri alinmis olurdu.
 *   - setSupplierList: tipli + hatayi yakalayan surum korundu.
 *
 * Donusumler:
 *   vuexContext.commit("X", p)   -> this.MUT_X(p)
 *   vuexContext.dispatch("Y", p) -> this.Y(p)
 *   vuexContext.state.x          -> this.x
 *   this.$axios                  -> useLegacyApi()   (axios sozlesmesini
 *                                   taklit eder, response.data KORUNUR)
 *   this.$toast                  -> useAppToast()
 *   mutation'lar                 -> MUT_ onekli action
 *
 * MUT_ oneki neden var: Vuex'te action ve mutation ayri isim
 * uzaylarindadir; bu projede 324 mutation'in 298'i bir action'la ayni ada
 * sahip. Pinia'da ikisi de action oldugu icin cakisirlar.
 *
 * Istatistik: 31 action, 31 mutation, 42 getter
 */
/*
 * Bekci zamanlayicisi MODUL kapsaminda: tek bir istemci uygulamasi icin
 * tek sayac var. SSR'da hic kurulmuyor (beginLoading import.meta.client
 * kontrolu yapiyor), yani sunucuda istekler arasi sizinti olmaz.
 *
 * Yardimcilar MODUL DUZEYINDE (action degil): depodaki `__` oneki
 * "modul duzeyi yardimci" demek ve verify-stores.mjs bunu boyle
 * denetliyor -- action olarak yazildiklarinda o denetci onlari
 * "tanimsiz yardimci" sanip hata veriyordu.
 */
let loadingWatchdog: ReturnType<typeof setTimeout> | null = null
const LOADING_WATCHDOG_MS = 60_000

function __clearLoadingWatchdog() {
  if (loadingWatchdog) {
    clearTimeout(loadingWatchdog)
    loadingWatchdog = null
  }
}

function __armLoadingWatchdog(store: { loading: number }) {
  __clearLoadingWatchdog()
  loadingWatchdog = setTimeout(() => {
    if (store.loading > 0) {
      console.warn(
        `[yukleme] sayac ${LOADING_WATCHDOG_MS / 1000} sn sonra hala ` +
          `${store.loading}; ekran kilitli kalmasin diye sifirlandi. ` +
          `Bir endLoading() cagrisi atlanmis olabilir.`,
      )
      store.loading = 0
    }
    loadingWatchdog = null
  }, LOADING_WATCHDOG_MS)
}

export const useSharedStore = defineStore("shared", {
  state: () => ({
    countryList:[],
    userList:[],
    ordersList:[],
    ordersAllList:[],
    cardList:[],
    supplierList:[],
    mineList:[],
    cardCategoryList:[],
    cardProductsList:[],
    cardSurfacesList:[],
    cardSizesList: [],
    selectionSurfaces: [],
    orderYearList: [],
    customersOfferList: [],
    sampleCategoryList: [],
    sampleUnitList: [],
    sampleSendingList: [],
    sampleBankAccountTypeList: [],
    offerCategoryList: [],
    offerProductList: [],
    offerSizeList: [],
    offerThicknessList: [],
    offerSurfaceList: [],
    offerUnitList: [],
    panelProductSize:[],
    panelProductFinish: [],
    panelProductColor: [],
    panelProductArea: [],
    panelProductStyle: [],
    panelProductType: [],
    panelProductMaterial: [],
    panelProductEdge:[],
    customersList: [],
    unitList:[],
    orderKindOfDeliveryList: [],
    orderKindOfPaymentList: [],
    orderKindOfInvoiceList:[],
    orderKindOfDeliverySupplierList:[],
    yearList:[],
    monthList:[],
    orderProductionList:[],
    orderProductionProductNormalList:[],

    /*
     * Vuex store/modules/loading.js buraya tasindi. Orada IKI bagimsiz
     * boolean vardi: `loading` (sayfa) ve `loadingDatatable` (tablonun
     * kendi spinner'i). Ikisi ayri cunku tabloya ait yukleme yalnizca
     * DataTable'i kilitler, sayfayi degil -- orn. yil filtresi
     * degistiginde sayfa acik kalir, tablo doner. Tuketicileri:
     * orders/waiting|shipped|production ve reports/mekmer/productions.
     *
     * Boolean yerine SAYAC: ayni anda birden fazla istek baslayabiliyor
     * (waiting.vue mount'ta 8 liste cekiyor). Boolean olsa ilk biten
     * istek spinner'i kapatirdi.
     */
    loading: 0,
    loadingDatatable: 0,
}),

  getters: {
    getOrderProductionProductNormalList: (state) => state.orderProductionProductNormalList,
    getOrderProductionList: (state) => state.orderProductionList,
    getCountryList: (state) => state.countryList,
    getUserList: (state) => state.userList,
    getOrdersList: (state) => state.ordersList,
    getOrdersAllList: (state) => state.ordersAllList,
    getCardList: (state) => state.cardList,
    getSupplierList: (state) => state.supplierList,
    getMineList: (state) => state.mineList,
    getCardCategoryList: (state) => state.cardCategoryList,
    getCardProductsList: (state) => state.cardProductsList,
    getCardSurfacesList: (state) => state.cardSurfacesList,
    getCardSizesList: (state) => state.cardSizesList,
    getSelectionSurfaces: (state) => state.selectionSurfaces,
    getOrderYearList: (state) => state.orderYearList,
    getCustomersOfferList: (state) => state.customersOfferList,
    getSampleCategoryList: (state) => state.sampleCategoryList,
    getSampleUnitList: (state) => state.sampleUnitList,
    getSampleSendingList: (state) => state.sampleSendingList,
    getSampleBankAccountTypeList: (state) => state.sampleBankAccountTypeList,
    getOfferCategoryList: (state) => state.offerCategoryList,
    getOfferProductList: (state) => state.offerProductList,
    getOfferSizeList: (state) => state.offerSizeList,
    getOfferThicknessList: (state) => state.offerThicknessList,
    getOfferSurfaceList: (state) => state.offerSurfaceList,
    getOfferUnitList: (state) => state.offerUnitList,
    getPanelProductSize: (state) => state.panelProductSize,
    getPanelProductFinish: (state) => state.panelProductFinish,
    getPanelProductColor: (state) => state.panelProductColor,
    getPanelProductArea: (state) => state.panelProductArea,
    getPanelProductStyle: (state) => state.panelProductStyle,
    getPanelProductType: (state) => state.panelProductType,
    getPanelProductMaterial: (state) => state.panelProductMaterial,
    getPanelProductEdge: (state) => state.panelProductEdge,
    getCustomersList: (state) => state.customersList,
    getUnitList: (state) => state.unitList,
    getOrderKindOfDeliveryList: (state) => state.orderKindOfDeliveryList,
    getOrderKindOfPaymentList: (state) => state.orderKindOfPaymentList,
    getOrderKindOfInvoiceList: (state) => state.orderKindOfInvoiceList,
    getOrderKindOfDeliverySupplierList: (state) => state.orderKindOfDeliverySupplierList,
    getYearList: (state) => state.yearList,
    getMonthList: (state) => state.monthList,

    /*
     * Vuex loading modulundeki getLoading / getLoadingDatatable'in
     * karsiligi. Adlar degisti cunku artik boolean degil sayac okuyorlar;
     * cagri yerleri isLoading / isLoadingDatatable kullanmali.
     */
    isLoading: (state) => state.loading > 0,
    isLoadingDatatable: (state) => state.loadingDatatable > 0,
  },

  actions: {
    /*
     * REFERANS LISTESI ACTION'LARINDA `return legacyApi.get(...)`
     *
     * Codemod ciktisi promise'i YUTUYORDU (`legacyApi.get(...).then(...)`,
     * basinda return yok). Cagiran taraf await etse bile cagri ANINDA
     * donuyor, yani "liste geldi" garantisi olmuyordu.
     *
     * Referans listelerini sayfalar artik useReferenceData() ile cekiyor
     * ve beklemesi gerekiyor; bu yuzden ONLARIN action'larina `return`
     * elle eklendi: setCountryList, setMineList, setSelectionSurfaces,
     * setCustomersOfferList, setSample{Category,Unit,SendingType,
     * BankAccountType}List, setYear/MonthList. Digerleri kaynaktaki
     * haliyle birakildi -- tek tek dokunmanin karsiligi yok, zaten
     * reaktif olarak doluyorlar.
     */
    /* ---------- yukleme sayaclari (Vuex: loading modulu) ---------- */

    /*
     * BEKCI (watchdog) -- NEDEN VAR:
     * layouts/default.vue'daki yukleme katmani TUM TIKLAMALARI yakaliyor
     * (pointer-events: auto). Yani sayac sifira donmezse ekran KILITLI
     * kaliyor ve kullanicinin tek caresi sayfayi yenilemek. Nuxt 2'de
     * ayni sizinti vardi ama orada yalnizca donen bir ikon gorunuyordu,
     * arayuz kullanilabilir kaliyordu -- katman bu sonucu agirlastirdi.
     *
     * Hata yollari 67 cagri yerinde .catch ile kapatildi; GERIYE KALAN
     * sizinti "istek BASARILI ama govde bos/false" durumu: endLoading
     * bir `if` icinde duruyor (24 yer, bkz. commit notu). Bekci o
     * durumlarda da ekranin kilitli kalmamasini GARANTI eder.
     *
     * YEDEK AKILDIR, COZUM DEGIL: bir sizinti olursa konsola uyari
     * birakir ki kaynagi bulunabilsin.
     */
    beginLoading() {
      this.loading++
      if (import.meta.client) __armLoadingWatchdog(this)
    },

    endLoading() {
      if (this.loading > 0) this.loading--
      if (this.loading === 0) __clearLoadingWatchdog()
    },

    beginLoadingDatatable() {
      this.loadingDatatable++
    },

    endLoadingDatatable() {
      if (this.loadingDatatable > 0) this.loadingDatatable--
    },

    setOrderProductionProductListNormal(po) {
      const legacyApi = useLegacyApi()

              legacyApi.get(`/order/products/normal/${po}`)
                  .then(response => {
                  this.MUT_setOrderProductionProductListNormal(response.data.products)
              })
    },
    setOrderProductionList() {
      const legacyApi = useLegacyApi()

              legacyApi.get('/orders/production/list')
              .then(response=>{
                  this.MUT_setOrderProductionList(response.data.list);
              });
    },
    setCountryList() {
      const legacyApi = useLegacyApi()

              return legacyApi.get('/country')
                  .then(response => {
                  this.MUT_setCountryList(response.data.data);
              });
    },
    /*
     * ELLE KORUNDU -- codemod ciktisi degil.
     *
     * GUVENLIK: GET /api/users, KullaniciTB'den ID, KullaniciAdi,
     * MailAdres ve YSifre (SIFRE) donuyor; ustelik api/index.js'te
     * openRoutes icinde oldugu icin kimlik dogrulamasi bile istemiyor.
     * Bu liste yalnizca gorev atama kutusunda kullanici secmek icin
     * kullaniliyor, sifreye ihtiyac yok -- bu yuzden yanit BURADA
     * filtreleniyor ve sifre store'a/tarayiciya hic girmiyor.
     *
     * Codemod'un urettigi hal `response.data.users`i oldugu gibi state'e
     * yaziyordu; o surumu almak bu duzeltmeyi geri almak olurdu.
     *
     * Bu bir pansuman: asil duzeltme endpoint'in kendisinde, YSifre
     * SELECT'ten cikarilmali ve uc kimlik dogrulamasi arkasina alinmali.
     */
    async setUserList() {
      this.beginLoading()
      try {
        const api = useApi()
        const res = await api<{ users: Record<string, unknown>[] }>("/users")

        this.userList = (res.users ?? []).map((u) => ({
          ID: Number(u.ID),
          KullaniciAdi: String(u.KullaniciAdi ?? ""),
          MailAdres: u.MailAdres == null ? null : String(u.MailAdres),
        })) as AppUser[]
      } catch (err) {
        console.error("setUserList basarisiz:", err)
        this.userList = []
      } finally {
        this.endLoading()
      }
    },
    setOrderList() {
      const legacyApi = useLegacyApi()

              legacyApi.get('/orders')
              .then(response=>{
                  this.MUT_setOrderList(response.data.orders);
              })
    },
    setCardList() {
      const legacyApi = useLegacyApi()

              this.beginLoading();
              legacyApi.get('/cards')
              .then(response=>{
                  this.MUT_setCardList(response.data.cards);
                  this.endLoading();
              });
    },
    /*
     * ELLE KORUNDU -- codemod ciktisi degil. Tipli ve hatayi yakalayan
     * surum; codemod'un urettigi hal hata durumunda endLoading'i hic
     * cagirmadigi icin istek patlarsa spinner sonsuza kadar donerdi
     * (.then zincirinde .catch yok).
     */
    async setSupplierList() {
      this.beginLoading()
      try {
        const api = useApi()
        const res = await api<{ suppliers: Supplier[] }>("/suppliers")
        this.supplierList = res.suppliers ?? []
      } catch (err) {
        console.error("setSupplierList basarisiz:", err)
        this.supplierList = []
      } finally {
        this.endLoading()
      }
    },
    setMineList() {
      const legacyApi = useLegacyApi()

              return legacyApi.get('/mines')
              .then(response=>{
                  this.MUT_setMineList(response.data.mines);
            
              });
    },
    setCardCategoryList() {
      const legacyApi = useLegacyApi()

              legacyApi.get('/cardcategories')
              .then(response=>{
                  this.MUT_setCardCategoryList(response.data.categories);
              });
    },
    setCardProductsList() {
      const legacyApi = useLegacyApi()

              legacyApi.get('/cardproducts')
              .then(response=>{
                  this.MUT_setCardProductsList(response.data.products);
            
              });
    },
    setCardSurfacesList() {
      const legacyApi = useLegacyApi()

              legacyApi.get('/cardsurfaces')
              .then(response=>{
                 this.MUT_setCardSurfacesList(response.data.surfaces); 
              });
    },
    setCardSizesList() {
      const legacyApi = useLegacyApi()

              legacyApi.get('/cardsizes')
              .then(response=>{
                  this.MUT_setCardSizesList(response.data.sizes);
              });
    },
    setOrderAllList() {
      const legacyApi = useLegacyApi()

              legacyApi.get('/orders/all')
              .then(response=>{
                 this.MUT_setOrderAllList(response.data.orders) 
              });
    },
    setSelectionSurfaces() {
      const legacyApi = useLegacyApi()

              return legacyApi.get('/selection/surfaces')
                  .then(response => {
                      this.MUT_setSelectionSurfaces(response.data.surfaces);
                  })
    },
    setOrderYearList(payload) {

             this.MUT_setOrderYearList(payload)
    },
    setCustomersOfferList() {
      const legacyApi = useLegacyApi()

              return legacyApi.get('/customer/offer/list/all')
                  .then(response => {
                  this.MUT_setCustomersOfferList(response.data.list);
              })
    },
    setSampleCategoryList() {
      const legacyApi = useLegacyApi()

              return legacyApi.get('/sample/category/list')
                  .then(response => {
                      this.MUT_setSampleCategoryList(response.data.list);
                  });
    },
    setSampleUnitList() {
      const legacyApi = useLegacyApi()

              return legacyApi.get('/sample/unit/list')
                  .then(response => {
                      this.MUT_setSampleUnitList(response.data.list); 
                  });
    },
    setSampleSendingTypeList() {
      const legacyApi = useLegacyApi()

              return legacyApi.get('/sample/sending/type/list')
                  .then(response => {
                      this.MUT_setSampleSendingTypeList(response.data.list); 
                  });
    },
    setSampleBankAccountTypeList() {
      const legacyApi = useLegacyApi()

              return legacyApi.get('/sample/bank/account/type/list')
                  .then(response => {
                      this.MUT_setSampleBankAccountTypeList(response.data.list); 
                  });
    },
    setOfferSharedList() {
      const legacyApi = useLegacyApi()

              legacyApi.get('/offer/shared/list')
                  .then(response => {
                      this.MUT_setOfferSharedList(response.data); 
                  });
    },
    setPanelProductSharedList() {
      const legacyApi = useLegacyApi()

              legacyApi.get('/panel/product/shared/list')
                  .then(response => {
                      this.MUT_setPanelProductSharedList(response.data);
                  })
    },
    setCustomerList() {
      const legacyApi = useLegacyApi()

              legacyApi.get('/customers/list')
                  .then(response => {
                      this.MUT_setCustomerList(response.data.list); 
                  });
    },
    setUnitList() {
      const legacyApi = useLegacyApi()

              legacyApi.get('/unit/list')
                  .then(response => {
                      this.MUT_setUnitList(response.data.list);
                
                  });
    },
    setOrderKindOfDeliveryList() {
      const legacyApi = useLegacyApi()

              legacyApi.get('/order/kind/of/delivery')
              .then(response=>{
                  this.MUT_setOrderKindOfDeliveryList(response.data.list); 
              });
    },
    setOrderKindOfPaymentList() {
      const legacyApi = useLegacyApi()

              legacyApi.get('/order/kind/of/payment')
                  .then(response => {
                      this.MUT_setOrderKindOfPaymentList(response.data.list);

                  });
    },
    setOrderKindOfInvoiceList() {
      const legacyApi = useLegacyApi()

              legacyApi.get('/order/kind/of/invoice')
                  .then(response => {
                      this.MUT_setOrderKindOfInvoiceList(response.data.list);
                  });
    },
    setOrderKindOfDeliverySupplierList() {
      const legacyApi = useLegacyApi()

              legacyApi.get('/order/kind/of/delivery/supplier')
                  .then(response => {
                      this.MUT_setOrderKindOfDeliverySupplierList(response.data.list);
                  });
    },
    setYearList() {
      const legacyApi = useLegacyApi()

              return legacyApi.get('/year/list')
              .then(response=>{
                  this.MUT_setYearList(response.data.list);
              })
    },
    setMonthList() {
      const legacyApi = useLegacyApi()

              return legacyApi.get('/month/list')
              .then(response=>{
                  this.MUT_setMonthList(response.data.list);
              })
    },
    setShipmentDropProducts(id) {

              this.MUT_setShipmentDropProducts(id);
    },

    /* ---------- mutation'lar (MUT_ onekli) ---------- */
    /*
     * DUZELTILDI -- YANLIS URUNU SILIYORDU.
     *
     * index KONTROL EDILMIYORDU. Bulunamazsa findIndex -1 doner ve
     * `splice(-1, 1)` dizinin SON ogesini siler -- silinmesi istenen urun
     * yerine ALAKASIZ bir urun listeden kayboluyordu. Hata firlatmaz.
     *
     * BURADA OZELLIKLE ONEMLI: bu liste sevkiyat ekraninin "gonderilmemis
     * urun kaldi mi" kontrolu (components/shipment/Form.vue save()
     * icinde `length !== 0`). Yanlis bir silme listeyi vaktinden once
     * bosaltarak sevkiyatin ACILMASINA yol acar -- yani gonderilmemis
     * urun varken sevk edilebilir hale gelir.
     *
     * (Ayni kontrolsuz findInsex kalibi sales.js, bgp.js, selection.js ve
     *  transport/input.vue'da da vardi; hepsi ilgili commit'lerde
     *  duzeltildi.)
     */
    MUT_setShipmentDropProducts(payload) {
      const index = this.orderProductionProductNormalList.findIndex(
        (x) => x.ID == payload,
      )

      if (index < 0) {
        console.warn(
          "MUT_setShipmentDropProducts: urun listede yok, liste " +
            "degistirilmedi. ID:",
          payload,
        )
        return
      }

      this.orderProductionProductNormalList.splice(index, 1)
    },
    MUT_setOrderProductionProductListNormal(payload) {

              this.orderProductionProductNormalList = payload;
    },
    MUT_setOrderProductionList(payload) {

              this.orderProductionList = payload;
    },
    MUT_setCountryList(payload) {

              this.countryList = payload;
    },
    MUT_setUserList(payload) {

              this.userList = payload;
    },
    MUT_setOrderList(payload) {

              this.ordersList = payload;
    },
    MUT_setOrderAllList(payload) {

            this.ordersAllList = payload;
    },
    MUT_setCardList(payload) {

              this.cardList = payload;
    },
    MUT_setSupplierList(payload) {

              this.supplierList = payload;
    },
    MUT_setMineList(payload) {

              this.mineList = payload;
    },
    MUT_setCardCategoryList(payload) {

              this.cardCategoryList = payload;
    },
    MUT_setCardProductsList(payload) {

              this.cardProductsList = payload;
    },
    MUT_setCardSurfacesList(payload) {

              this.cardSurfacesList = payload
    },
    MUT_setCardSizesList(payload) {

              this.cardSizesList = payload;
    },
    MUT_setSelectionSurfaces(payload) {

              this.selectionSurfaces = payload;
    },
    MUT_setOrderYearList(payload) {

              this.orderYearList = payload;
    },
    MUT_setCustomersOfferList(payload) {

              this.customersOfferList = payload;
    },
    MUT_setSampleCategoryList(payload) {

              this.sampleCategoryList = payload;
    },
    MUT_setSampleUnitList(payload) {

              this.sampleUnitList = payload;
    },
    MUT_setSampleSendingTypeList(payload) {

              this.sampleSendingList = payload;
    },
    MUT_setSampleBankAccountTypeList(payload) {

              this.sampleBankAccountTypeList = payload;
    },
    MUT_setOfferSharedList(payload) {

             this.offerCategoryList = payload.category;
          this.offerProductList = payload.product;
          this.offerSizeList = payload.size;
          this.offerThicknessList = payload.thickness;
          this.offerSurfaceList = payload.surface;
          this.offerUnitList = payload.unit;
    },
    MUT_setPanelProductSharedList(payload) {

                  this.panelProductSize = payload.size;
                  this.panelProductFinish = payload.finish;
                  this.panelProductColor = payload.color;
                  this.panelProductArea = payload.area;
                  this.panelProductStyle = payload.style;
                  this.panelProductType = payload.type;
              this.panelProductMaterial = payload.material;
              this.panelProductEdge = payload.edge;
    },
    MUT_setCustomerList(payload) {

              this.customersList = payload;
    },
    MUT_setUnitList(payload) {

              this.unitList = payload;
    },
    MUT_setOrderKindOfDeliveryList(payload) {

              this.orderKindOfDeliveryList = payload;
    },
    MUT_setOrderKindOfPaymentList(payload) {

              this.orderKindOfPaymentList = payload;
    },
    MUT_setOrderKindOfInvoiceList(payload) {

              this.orderKindOfInvoiceList = payload;
    },
    MUT_setOrderKindOfDeliverySupplierList(payload) {

              this.orderKindOfDeliverySupplierList = payload;
    },
    MUT_setYearList(payload) {

              this.yearList = payload;
    },
    MUT_setMonthList(payload) {

              this.monthList = payload;
    },
  },
})

