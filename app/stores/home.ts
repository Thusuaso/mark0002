import { defineStore } from "pinia"

/*
 * Vuex store/modules/home.js karsiligi + components/home/home.vue'nun
 * created() icinde ELLE yaptigi ikinci istek.
 *
 * Orijinalde ana sayfanin verisi IKI AYRI yerden geliyordu:
 *   1. store/modules/home.js   -> GET /home          (pages/index.vue)
 *   2. components/home/home.vue -> GET /reports/mekmer/stocks/list
 *      (bilesenin kendi created()'inda, this.$axios ile, store'a hic
 *       ugramadan, dogrudan local data'ya yaziliyordu)
 *
 * Ikisi de burada toplandi. Gerekcesi: (2) bilesen icinde kaldigi surece
 * sayfa useAsyncData ile veriyi bekleyemez -- ayrinti pages/index.vue
 * icindeki <script setup> yorumunda.
 */

/* GET /home yanitinin govdesi (api/index.js:469 res.json govdesinden
 * birebir cikarildi). Grafik govdeleri SUNUCUDA hazirlaniyor: labels +
 * datasets dogrudan Chart'a verilebilecek bicimde geliyor, istemci
 * tarafinda sekillendirme yok. */
export interface HomeChartData {
  labels: string[]
  datasets: Record<string, unknown>[]
}

export interface SupplierCost {
  TedarikciID: number
  FirmaAdi: string
  Total: number
}

export interface HomeData {
  supplierCostList: SupplierCost[]

  aylikSiparis: number
  yillikSiparis: number
  ortalamaSiparis: number
  tahminiYillikSiparis: number

  aylikYukleme: number
  yillikYukleme: number
  ortalamaYukleme: number
  tahminiYillikYukleme: number

  chartOne: HomeChartData
  chartCustomerShipped: HomeChartData
  chartProducts: HomeChartData
  chartOffers: HomeChartData
}

/* GET /reports/mekmer/stocks/list (api/index.js:19683) */
export interface MekmerStocks {
  monthly_stock: { MONTH: string | number; SqmMiktar: number; KasaAdedi: number }[]
  current_stock: { Month: string | number; KasaM2: number; KasaAdet: number }[]
  mekmer_shipped: { Month: string | number; Satis: number }[]
}

/*
 * Baslangic degerleri NEDEN BOS NESNE DEGIL:
 *
 * Orijinal state `homeList: {}` idi ve sablon `home.chartOne` diye
 * okuyordu -- yani veri gelene kadar <Chart :data="undefined"> render
 * ediliyordu. PrimeVue Chart bunu patlatmaz ama chart.js bos bir tuval
 * kurup sonra veri gelince yeniden kurar; ilk karede legend/eksen
 * ucusur. Bos ama DOGRU BICIMLI bir govde ile ilk render zaten dogru
 * iskelette oluyor.
 *
 * mekmer_datas ise orijinalde `[]` (DIZI) olarak baslatilmisti, ama
 * sablon `mekmer_datas.monthly_stock` diye NESNE alani okuyordu --
 * dizide o alan yok, yani veri gelene kadar uc DataTable :value="undefined"
 * aliyordu. Tip hatasi vermedigi icin fark edilmemis; burada nesne.
 */
function emptyChart(): HomeChartData {
  return { labels: [], datasets: [] }
}

function emptyHome(): HomeData {
  return {
    supplierCostList: [],

    aylikSiparis: 0,
    yillikSiparis: 0,
    ortalamaSiparis: 0,
    tahminiYillikSiparis: 0,

    aylikYukleme: 0,
    yillikYukleme: 0,
    ortalamaYukleme: 0,
    tahminiYillikYukleme: 0,

    chartOne: emptyChart(),
    chartCustomerShipped: emptyChart(),
    chartProducts: emptyChart(),
    chartOffers: emptyChart(),
  }
}

function emptyStocks(): MekmerStocks {
  return { monthly_stock: [], current_stock: [], mekmer_shipped: [] }
}

export const useHomeStore = defineStore("home", {
  state: () => ({
    homeList: emptyHome() as HomeData,
    mekmerStocks: emptyStocks() as MekmerStocks,
  }),

  getters: {
    getHomeList: (state) => state.homeList,
    getMekmerStocks: (state) => state.mekmerStocks,

    /*
     * Orijinalde bu toplam bilesenin icinde, `watch: { home() { ... } }`
     * ile hesaplaniyordu ve IKI AYRI sekilde bozuktu:
     *
     *   1. BIRIKIYORDU. `this.totalSupplier += x.Total` bir data alanina
     *      yaziyordu ama watch her tetiklendiginde onu SIFIRLAMIYORDU.
     *      home bir kez daha gelse (ornegin sayfaya geri donulse ve
     *      getHome yeniden dispatch edilse) toplam ikiye katlaniyordu.
     *   2. ILK YUKLEMEDE CALISMIYORDU. watch'un immediate'i yok; home
     *      prop'u ilk degerini ALMAK watch sayilmaz, degisim sayilir.
     *      Veri tek seferde gelip bir daha degismezse -- ki normal akis
     *      bu -- footer "$0.00" kaliyordu.
     *
     * Turetilmis getter ikisini de yapisal olarak imkansiz kiliyor:
     * her okumada listeden bastan hesaplanir.
     */
    getTotalSupplierCost: (state) =>
      state.homeList.supplierCostList.reduce((acc, x) => acc + (x.Total || 0), 0),
  },

  actions: {
    /*
     * Orijinalde action'in adi da mutation'in adi da `getHome` idi
     * (Vuex'te ayri isim uzaylari). reports.ts gibi codemod uretimi
     * store'larda bu cakisma MUT_ onekiyle cozuldu; burada mutation tek
     * satir oldugu icin action'in icine alindi, ayri bir MUT_getHome
     * yazmaya deger yok.
     */
    async getHome() {
      const response = await useLegacyApi().get<HomeData>("/home")
      this.homeList = response.data
    },

    async getMekmerStocksList() {
      const response = await useLegacyApi().get<MekmerStocks>(
        "/reports/mekmer/stocks/list",
      )
      this.mekmerStocks = response.data
    },
  },
})
