import { defineStore } from "pinia"

/*
 * store/modules/mekmar_cost.js -> Pinia
 *
 * Elle yazildi (codemod degil): modul 70 satir, iki action'in ikisi de
 * ayni adli mutation'i cagiran ince sarmalayici. Getter adlari KORUNDU
 * -- operation/cost-control.vue ve components/cost/{Form,List}.vue
 * bunlari mapGetters ile okuyordu.
 *
 * Dosya adi: kaynakta `mekmar_cost.js`, pilotta `mekmarCost.ts`
 * (importantLink.ts ile ayni kural -- store dosyalari camelCase).
 *
 * TEK VERI KAYNAGI, DORT GETTER: sunucu listeyi tek bir cagriyla
 * donduruyor (`/reports/mekmar/cost/control/list`) ve icindeki dort
 * dizi (list/po/product/supplier) ayri getter'lara dagiliyor. Bu yuzden
 * setMekmarCostList TEK payload alip dordunu birlikte yaziyor; kismi
 * guncelleme YOK (kaynaktaki davranis da buydu).
 *
 * ============================================================
 * KORUNAN DAVRANIS -- setMekmarCostModel BIR MERGE, ATAMA DEGIL
 * ============================================================
 * Kaynak mutation:
 *     state.model = { ...state.model, ...payload }
 *
 * Yani model HIC SIFIRLANMIYOR, uzerine yaziliyor. Sonucu:
 *
 *   A satiri secilir  -> model = A'nin alanlari
 *   B satiri secilir  -> B'de OLMAYAN alanlar A'dan KALIR
 *
 * Bu, kaynakta mevcut bir hata; ama /operation/cost-control pratikte
 * maskeliyor: `newForm()` TAM modeli (dokuz alanin hepsi) gonderiyor ve
 * `costSelected()` de sunucudan gelen satiri tam gonderiyor. Dolayisiyla
 * bugune kadar gorunur bir etkisi olmamis.
 *
 * ATAMAYA CEVIRMEDIM: payload'i eksik gonderen bir cagri ortaya
 * cikarsa (orn. ileride yalnizca tek alan guncelleyen bir ekran),
 * atama o alanlari sessizce undefined yapar ve Checkbox'lar
 * :binary ile undefined'i "isaretsiz" olarak gosterir -- yani
 * kullaniciya yanlis maliyet durumu gorunur. Merge en azindan eski
 * degeri koruyor. Degistirmek davranis degisikligi olurdu.
 */

export interface MekmarCostModel {
  ID: number
  Po: string
  Logistic: boolean
  Custom: boolean
  Fumigation: boolean
  Port: boolean
  Insurance: boolean
  Lashing: boolean
  Spanzlet: boolean
  Freight: boolean
}

/*
 * Kaynaktaki varsayilan model. `newForm()` ve Form.vue'daki `reset()`
 * AYNI dokuz alani harfi harfine yeniden yaziyordu (uc kopya); tek
 * yerden uretiliyor ki uclu kopya birbirinden ayrilmasin.
 */
export const createMekmarCostModel = (): MekmarCostModel => ({
  ID: 0,
  Po: "",
  Logistic: false,
  Custom: false,
  Fumigation: false,
  Port: false,
  Insurance: false,
  Lashing: false,
  Spanzlet: false,
  Freight: false,
})

/* Sunucudan gelen satirlar serbest bicimli -- alan adlari Turkce ve
 * ekrandan ekrana degisiyor, bu yuzden dar bir tip yazilmadi. */
export interface MekmarCostRow {
  [key: string]: unknown
}

export interface MekmarCostListPayload {
  list?: MekmarCostRow[]
  po?: MekmarCostRow[]
  product?: MekmarCostRow[]
  supplier?: MekmarCostRow[]
}

export const useMekmarCostStore = defineStore("mekmarCost", {
  state: () => ({
    list: [] as MekmarCostRow[],
    po: [] as MekmarCostRow[],
    product: [] as MekmarCostRow[],
    supplier: [] as MekmarCostRow[],
    model: createMekmarCostModel(),
  }),

  getters: {
    getMekmarCostList: (state) => state.list,
    getMekmarPoList: (state) => state.po,
    getMekmarProductList: (state) => state.product,
    getMekmarCostModel: (state) => state.model,
    getMekmarSupplier: (state) => state.supplier,
  },

  actions: {
    /*
     * `|| []` KORUNDU: sunucu bu dort anahtardan bazilarini hic
     * gondermeyebiliyor ve undefined atanirsa DataTable :value="undefined"
     * alir. Kaynakta da ayni koruma vardi.
     */
    setMekmarCostList(payload: MekmarCostListPayload) {
      this.list = payload.list || []
      this.po = payload.po || []
      this.product = payload.product || []
      this.supplier = payload.supplier || []
    },

    /* Merge -- yukaridaki "KORUNAN DAVRANIS" notuna bak. */
    setMekmarCostModel(payload: Partial<MekmarCostModel>) {
      this.model = { ...this.model, ...payload }
    },
  },
})
