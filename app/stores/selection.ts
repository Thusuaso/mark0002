import { defineStore } from "pinia"

/*
 * Vuex store/modules/selection.js karsiligi -- TAM.
 *
 * ---------------------------------------------------------------------
 * TASIMA GECMISI
 * ---------------------------------------------------------------------
 * Bu modul UC adimda tasindi, cunku cagri yerleri ayri commit'lerde
 * geldi:
 *
 *   1) setSelectionProductionProductDelete
 *      <- components/shipment/Form.vue
 *   2) setSelectionProductionCrateSize* ailesi + productionCrateSizeList
 *      / ...ButtonStatus   <- /selection/size  (commit 80c78ee52)
 *   3) GERI KALAN HER SEY   <- /selection/input (bu commit)
 *
 * Artik orijinal modulun TUM uyeleri karsilandi; "kismi" notu kalkti.
 *
 * TASINMAYAN TEK SEY -- `productionNewButtonStatus`:
 * kaynak state'te TANIMLI ama onu yazan bir mutation, okuyan bir getter
 * ya da cagiran bir sayfa YOK (kod tabaninda tek gecisi state tanimi).
 * Olu alan oldugu icin tasinmadi.
 *
 * ---------------------------------------------------------------------
 * ESKI NOT ARTIK GECERSIZ -- SEVKIYAT EKRANINDAKI SILME
 * ---------------------------------------------------------------------
 * Bu dosyanin ilk surumunde su not vardi: "productionProductsList'i
 * DOLDURAN eylem henuz tasinmadi, yani sevkiyat ekraninda liste BOS,
 * dolayisiyla silme bir NO-OP."
 *
 * O eylem (setSelectionProductionProductsList) bu commit'te eklendi,
 * yani bag artik kurulu: /selection/input formu listeyi dolduruyor ve
 * components/shipment/Form.vue'daki silme gercekten is yapiyor.
 * Ikisinin BIRLIKTE denenmesi gerekiyor (uretim verisi gerektirdigi
 * icin bu commit'te denenemedi).
 */

/*
 * /selection/production/list ucu DORT listeyi birlikte donduruyor.
 * Ekrandaki dort filtre butonu bunlardan birini secip productList'e
 * yaziyor.
 */
export interface SelectionProductRow {
  [key: string]: unknown
}

export interface SelectionProductsLists {
  mekmerList?: SelectionProductRow[]
  disList?: SelectionProductRow[]
  mekmerDisList?: SelectionProductRow[]
  bulunamadiList?: SelectionProductRow[]
}

export interface SelectionSumTotal {
  miktar: number
  kutu: number
  kutuiciadet: number
  kasaadedi: number
}

/*
 * Toplam her hesaplamada SIFIRDAN kuruluyor. Paylasilan bir nesne
 * OLMAMALI (yoksa iki ekran ayni nesneyi biriktirir), bu yuzden her
 * kullanimda kopyalaniyor.
 */
const EMPTY_SUM_TOTAL: SelectionSumTotal = {
  miktar: 0,
  kutu: 0,
  kutuiciadet: 0,
  kasaadedi: 0,
}

/* SiparisUretimKasaOlcuTB satiri (/selection/size ekrani). */
export interface ProductionCrateSize {
  Id: number
  [key: string]: unknown
}

export interface SelectionProductionProduct {
  ID: number
  [key: string]: unknown
}

export const useSelectionStore = defineStore("selection", {
  state: () => ({
    productionCrateSizeList: [] as ProductionCrateSize[],
    productionCrateSizeButtonStatus: false,
    productionProductsList: [] as SelectionProductionProduct[],

    /*
     * ---------------------------------------------------------------
     * /selection/input ALANLARI (bu commit)
     * ---------------------------------------------------------------
     * DIKKAT -- productsList ADI YANILTICI: bu bir DIZI DEGIL,
     * sunucudan gelen DORT LISTEYI tasiyan bir NESNE
     * ({ mekmerList, disList, mekmerDisList, bulunamadiList }).
     * Dort filtre butonu bu nesneden secip productList'e (tekil,
     * GERCEK dizi) yaziyor.
     *
     * Kaynakta baslangic degeri `[]` yani DIZI idi -- adiyla ve
     * kullanimiyla tutarsiz. Burada `{}` olarak baslatildi; bu, liste
     * yuklenmeden filtre butonuna basilma durumunu da duzeltiyor
     * (bkz. applyProductFilter notu).
     */
    productsList: {} as SelectionProductsLists,
    productList: [] as SelectionProductRow[],
    productionTotal: {} as Record<string, unknown>,
    productionSumTotal: { ...EMPTY_SUM_TOTAL },
    productionButtonStatus: false,
    productionCrateNo: null as string | number | null,
    productionMekmerButtonStatus: false,
    productionDisButtonStatus: false,
    productionDisMekmerButtonStatus: false,
    productionBulunamadiButtonStatus: false,
    filteredSelectionList: [] as SelectionProductRow[],

    /*
     * ORTAK KASA SECIMI (upstream 8fbf9a8c6).
     * productionCrateOptions: seleksiyonda duran (UrunDurumID=1) kasalar.
     * productionCrateGroupReady: UretimTB.KasaGrupNo kolonu VAR MI --
     *   api/sql/UretimTBKasaGrup.sql calistirilmadiysa false doner ve
     *   formdaki alan HIC GOSTERILMEZ (ozellik sessizce kapali).
     */
    productionCrateOptions: [] as SelectionProductRow[],
    productionCrateGroupReady: false,
  }),

  getters: {
    getProductionCrateSizeList: (state) => state.productionCrateSizeList,
    getProductionCrateSizeButtonStatus: (state) =>
      state.productionCrateSizeButtonStatus,
    getProductionProductsList: (state) => state.productionProductsList,

    /* --- /selection/input --- */
    getFilteredSelectionList: (state) => state.filteredSelectionList,
    getProductionTotal: (state) => state.productionTotal,
    getProductsList: (state) => state.productsList,
    getProductList: (state) => state.productList,
    getProductionSumTotal: (state) => state.productionSumTotal,
    getProductionButtonStatus: (state) => state.productionButtonStatus,
    getProductionCrateNo: (state) => state.productionCrateNo,
    getProductionCrateOptions: (state) => state.productionCrateOptions,
    getProductionCrateGroupReady: (state) => state.productionCrateGroupReady,
  },

  actions: {
    /*
     * ---------------------------------------------------------------
     * KASA OLCUSU (/selection/size)
     * ---------------------------------------------------------------
     * KAYNAKTAKI GEREKSIZ CIFT IS -- BILEREK KORUNDU:
     * save/update/delete HEM yerel bir mutation uyguluyor HEM de
     * ardindan listeyi SUNUCUDAN yeniden cekiyor. Yerel degisiklik
     * aninda uzerine yaziliyor, yani pratikte etkisiz.
     *
     * Yine de tasindi, cunku kaldirmak davranis degisikligi olurdu:
     * yeniden cekme basarisiz olursa yerel degisiklik ekranda kalir.
     *
     * YEREL MUTATION'LARDA GIZLI HATA (kaynakta da var):
     * `findIndex` eslesme bulamazsa -1 doner ve
     *   - splice(-1, 1)  listenin SON elemanini siler
     *   - list[-1] = x   diziye tuhaf bir ozellik ekler
     * Ikisi de yanlis ama listenin hemen yeniden cekilmesi sonucu
     * maskeliyor. Koruma eklendi (index > -1) -- bu, maskelenen
     * davranisi degistirmiyor, yalnizca yeniden cekme basarisiz
     * oldugunda listenin BOZULMASINI onluyor.
     */
    async setSelectionProductionCrateSizeList() {
      const shared = useSharedStore()
      shared.beginLoading()
      try {
        const api = useLegacyApi()
        const res = await api.get("/selection/production/cratesize")
        this.productionCrateSizeList = res.data.cratesize ?? []
      } catch (err) {
        console.error("setSelectionProductionCrateSizeList basarisiz:", err)
      } finally {
        /*
         * .finally -- kaynakta endLoading `.then` ICINDEYDI ve
         * `.catch()` YOKTU, yani istek patlayinca yukleme gostergesi
         * KALICI acik kaliyordu (ayni hata panel/customer/offer
         * store'larinda da vardi).
         */
        shared.endLoading()
      }
    },

    setSelectionProductionCrateSizeButtonStatus(status: boolean) {
      this.productionCrateSizeButtonStatus = status
    },

    async setSelectionProductionCrateSizeSave(cratesize: ProductionCrateSize) {
      const toast = useAppToast()
      try {
        const api = useLegacyApi()
        const res = await api.post(
          "/selection/production/cratesize/save",
          cratesize,
        )
        if (res.data.status) {
          this.productionCrateSizeList.push(res.data.cratesize)
          await this.setSelectionProductionCrateSizeList()
          toast.success("Başarıyla Kaydedildi.")
        } else {
          toast.error("Kaydetme Başarısız.")
        }
      } catch (err) {
        console.error("setSelectionProductionCrateSizeSave basarisiz:", err)
        toast.error("Kaydetme Başarısız.")
      }
    },

    async setSelectionProductionCrateSizeUpdate(cratesize: ProductionCrateSize) {
      const toast = useAppToast()
      try {
        const api = useLegacyApi()
        const res = await api.put(
          "/selection/production/cratesize/update",
          cratesize,
        )
        if (res.data.status) {
          const i = this.productionCrateSizeList.findIndex(
            (x) => x.Id === cratesize.Id,
          )
          if (i > -1) this.productionCrateSizeList[i] = cratesize
          await this.setSelectionProductionCrateSizeList()
          toast.success("Başarıyla Güncellendi.")
        } else {
          toast.error("Güncelleme Başarısız.")
        }
      } catch (err) {
        console.error("setSelectionProductionCrateSizeUpdate basarisiz:", err)
        toast.error("Güncelleme Başarısız.")
      }
    },

    async setSelectionProductionCrateSizeDelete(id: number) {
      const toast = useAppToast()
      try {
        const api = useLegacyApi()
        const res = await api.delete(
          `/selection/production/cratesize/delete/${id}`,
        )
        if (res.data.status) {
          const i = this.productionCrateSizeList.findIndex(
            (x) => x.Id === res.data.id,
          )
          if (i > -1) this.productionCrateSizeList.splice(i, 1)
          await this.setSelectionProductionCrateSizeList()
          toast.success("Başarıyla Silindi.")
        } else {
          toast.error("Silme Başarısız.")
        }
      } catch (err) {
        console.error("setSelectionProductionCrateSizeDelete basarisiz:", err)
        toast.error("Silme Başarısız.")
      }
    },

    /*
     * DUZELTILDI -- YANLIS SATIRI SILIYORDU.
     *
     * Vuex mutation'i index'i KONTROL ETMIYORDU:
     *
     *     const index = state.productionProductsList.findIndex(
     *       (x) => x.ID === id)
     *     state.productionProductsList.splice(index, 1)
     *
     * Bulunamazsa findIndex -1 doner ve `splice(-1, 1)` dizinin SON
     * ogesini siler -- silinmesi istenen urun yerine ALAKASIZ bir urun
     * listeden kayboluyordu. Hata firlatmaz.
     *
     * (Ayni hata sales.js, bgp.js ve transport/input.vue'da da vardi;
     *  hepsi ilgili commit'lerde duzeltildi.)
     */
    setSelectionProductionProductDelete(id: number) {
      const index = this.productionProductsList.findIndex((x) => x.ID === id)

      if (index < 0) {
        console.warn(
          "setSelectionProductionProductDelete: urun listede yok, liste " +
            "degistirilmedi. ID:",
          id,
        )
        return
      }

      this.productionProductsList.splice(index, 1)
    },

    /*
     * ===============================================================
     * /selection/input (bu commit)
     * ===============================================================
     */

    /*
     * Vuex'te MUTATION'di ve components/selection/input/list.vue onu
     * DOGRUDAN commit ediyor, bu yuzden MUT_ onekli bir action olarak
     * duruyor (pilotun genel kurali: mutation -> MUT_<ad>; bkz.
     * stores/accounts.ts basligi).
     *
     * TOPLAMI SIFIRDAN HESAPLIYOR: her cagrida dort alan da sifirlanip
     * yeniden toplaniyor, yani ust uste birikmiyor.
     *
     * `kutuiciadet` alani x.Adet'ten geliyor (x.KutuIciAdet DEGIL) --
     * kaynaktaki eslesme bu, ad benzerligine aldanilmamali.
     */
    MUT_setSelectionProductTotalList(payload: SelectionProductRow[]) {
      const rows = payload ?? []
      const sum = { ...EMPTY_SUM_TOTAL }

      rows.forEach((x) => {
        sum.miktar += Number(x.Miktar) || 0
        sum.kutu += Number(x.KutuAdet) || 0
        sum.kutuiciadet += Number(x.Adet) || 0
      })
      sum.kasaadedi = rows.length

      this.productionSumTotal = sum
    },

    /* Vuex'te mutation; form.vue bunu da dogrudan commit ediyor. */
    MUT_setSelectionProductionCrateNo(no: string | number | null) {
      this.productionCrateNo = no
    },

    setSelectionProductFilteredList(payload: SelectionProductRow[]) {
      this.filteredSelectionList = payload
    },

    /*
     * TEK ISTEK, UC HEDEF: sunucu dort listeyi birlikte donduruyor.
     * productsList nesnenin tamamini, productList ve toplam ise
     * BASLANGICTA mekmerList'i aliyor (ekran mekmer sekmesiyle
     * aciliyor).
     */
    async setSelectionProductsList() {
      const shared = useSharedStore()
      shared.beginLoading()
      try {
        const api = useLegacyApi()
        const res = await api.get("/selection/production/list")
        /*
         * `if (res.data)` KORUNDU: kaynak govdeyi kontrol ediyordu.
         * Ancak kaynakta endLoading BU IF'IN ICINDEYDI -- govde bos
         * gelirse yukleme gostergesi KALICI acik kaliyordu. finally'ye
         * alindi ([YUK-1]; ayni hata kasa olcusu listesinde de vardi).
         */
        if (res.data) {
          this.productsList = res.data.data ?? {}
          const mekmer = res.data.data?.mekmerList ?? []
          this.productList = mekmer
          this.MUT_setSelectionProductTotalList(mekmer)
        }
      } catch (err) {
        console.error("setSelectionProductsList basarisiz:", err)
      } finally {
        shared.endLoading()
      }
    },

    /*
     * Formdaki "Ortak Kasalar" alaninin secenekleri.
     *
     * PROMISE DONDURUYOR (await ediliyor): Form.vue bunu createdProcess'ten
     * ONCE bekliyor, cunku duzenlemede mevcut grup uyeleri BU listeden
     * okunuyor. Dondurulmezse alan bos acilirdi.
     *
     * Vuex'teki ayri mutation (setSelectionProductionCrateOptions) buraya
     * KATILDI: tek cagri yeri bu action'di, MUT_ onekli ayri bir action
     * yalnizca gurultu uretirdi.
     *
     * Kolon yoksa uc { hazir: false, list: [] } donuyor -> alan gizlenir.
     */
    async setSelectionProductionCrateOptions() {
      try {
        const api = useLegacyApi()
        const res = await api.get("/selection/production/crate/options")
        this.productionCrateOptions = res.data.list || []
        this.productionCrateGroupReady = !!res.data.hazir
      } catch (err) {
        /*
         * Kaynakta .catch YOKTU. Burada yutuluyor ve ozellik KAPALI
         * kabul ediliyor: uc patlarsa form alani gorunmez, yani
         * kullanici yarim calisan bir secim alani gormez.
         */
        console.error("crate/options cekilemedi:", err)
        this.productionCrateOptions = []
        this.productionCrateGroupReady = false
      }
    },

    async setSelectionProductionTotal() {
      try {
        const api = useLegacyApi()
        const res = await api.get("/selection/production/total")
        this.productionTotal = res.data.data ?? {}
      } catch (err) {
        console.error("setSelectionProductionTotal basarisiz:", err)
      }
    },

    /*
     * DORT FILTRE BUTONU -- tek yardimciya indi. Kaynakta dordu de
     * HARFI HARFINE ayniydi, yalnizca productsList icindeki anahtar
     * degisiyordu (mekmerList / disList / mekmerDisList /
     * bulunamadiList).
     *
     * `?? []` KORUMASI EKLENDI: kaynakta state.productsList baslangicta
     * `[]` (DIZI) oldugu icin .mekmerList undefined donuyordu ve toplam
     * mutation'i payload.forEach ile PATLIYORDU -- yani liste
     * yuklenmeden bir filtre butonuna basilirsa TypeError. Veri
     * yuklendikten sonraki yol DEGISMIYOR.
     */
    /*
     * ADLARDA `__` ONEKI YOK -- BILEREK.
     * Bu dosyadaki applyProductFilter / setActiveFilterFlag, tekrari
     * azaltmak icin EKLENEN iki Pinia action'i; kaynak modulde
     * karsiliklari yok.
     *
     * Pilotta `__` oneki store'larda BASKA bir sey demek: kaynak Vuex
     * modulunun BASINDA duran, blok disi modul duzeyi yardimcilar
     * (orn. stores/order.ts:29 `__noneNullControl`). verify-stores
     * denetcisi de tam bunu ariyor ve `__` gorup tanimini
     * `function|const|let|var` olarak bulamayinca "TANIMSIZ modul
     * duzeyi yardimci" diye isaretliyor -- nesne-metot kisaltmasini
     * tanimiyor. Ilk yazimda ikisi `__` onekliydi ve denetci bu
     * yuzden hata verdi.
     */
    applyProductFilter(key: keyof SelectionProductsLists) {
      const rows = this.productsList?.[key] ?? []
      this.productList = rows
      this.MUT_setSelectionProductTotalList(rows)
    },

    setSelectionProductionMekmerButton() {
      this.applyProductFilter("mekmerList")
    },

    setSelectionProductionDisButton() {
      this.applyProductFilter("disList")
    },

    setSelectionProductionMekmerDisButton() {
      this.applyProductFilter("mekmerDisList")
    },

    setSelectionProductionBulunamadiButton() {
      this.applyProductFilter("bulunamadiList")
    },

    /*
     * DORT DURUM BAYRAGI -- birbirini dislayan secim (radio gibi).
     * Kaynakta dort ayri mutation vardi ve her biri dordunu birlikte
     * yaziyordu; tek yardimciya indi, davranis ayni.
     * Hicbiri PARAMETRE ALMIYOR: hangi action cagrildiysa o bayrak
     * true, digerleri false.
     */
    setActiveFilterFlag(active: "mekmer" | "dis" | "mekmerDis" | "bulunamadi") {
      this.productionMekmerButtonStatus = active === "mekmer"
      this.productionDisButtonStatus = active === "dis"
      this.productionDisMekmerButtonStatus = active === "mekmerDis"
      this.productionBulunamadiButtonStatus = active === "bulunamadi"
    },

    setSelectionProductionMekmerButtonStatus() {
      this.setActiveFilterFlag("mekmer")
    },

    setSelectionProductionDisButtonStatus() {
      this.setActiveFilterFlag("dis")
    },

    setSelectionProductionMekmerDisButtonStatus() {
      this.setActiveFilterFlag("mekmerDis")
    },

    setSelectionProductionBulunamadiButtonStatus() {
      this.setActiveFilterFlag("bulunamadi")
    },

    setSelectionProductionButtonStatus(status: boolean) {
      this.productionButtonStatus = status
    },

    /*
     * productionProductsList'i DOLDURAN taraf. Dosyanin basindaki
     * "sevkiyat ekraninda silme bir NO-OP" notu bu commit'ten sonra
     * GECERSIZ -- liste artik doluyor (baslik guncellendi).
     */
    async setSelectionProductionProductsList(po: string | number) {
      try {
        const api = useLegacyApi()
        const res = await api.get(`/order/products/${po}`)
        this.productionProductsList = res.data.products ?? []
      } catch (err) {
        console.error("setSelectionProductionProductsList basarisiz:", err)
      }
    },

    async setSelectionProductionCrateNoIn() {
      try {
        const api = useLegacyApi()
        const res = await api.get("/selection/production/crateno/in")
        this.productionCrateNo = res.data.no
      } catch (err) {
        console.error("setSelectionProductionCrateNoIn basarisiz:", err)
      }
    },

    async setSelectionProductionCrateNoOut() {
      try {
        const api = useLegacyApi()
        const res = await api.get("/selection/production/crateno/out")
        this.productionCrateNo = res.data.no
      } catch (err) {
        console.error("setSelectionProductionCrateNoOut basarisiz:", err)
      }
    },

    /*
     * KORUNAN SESSIZLIK: kaynakta `if (response.data.status)` dalinin
     * ELSE'I YOK -- kaydetme basarisiz olursa kullaniciya HICBIR SEY
     * gosterilmiyor. Kardes eylem setSelectionProductionCrateSizeSave'de
     * ise else VAR ve toast.error atiyor; yani kaynak kendi icinde
     * tutarsiz. Her birini OLDUGU GIBI tasimak en savunulabilir yol
     * oldugu icin buradaki sessizlik korundu: catch yalnizca console'a
     * yaziyor, toast ATMIYOR -- aksi halde bugune kadar sessiz olan bir
     * akis aniden uyari gosterirdi.
     */
    async setSelectionProductionSave(product: Record<string, unknown>) {
      const toast = useAppToast()
      try {
        const api = useLegacyApi()
        const res = await api.post("/selection/production/save", product)
        if (res.data.status) {
          await this.setSelectionProductionUpdateList()
          toast.success("Başarıyla Kaydedildi.")
        }
      } catch (err) {
        console.error("setSelectionProductionSave basarisiz:", err)
      }
    },

    async setSelectionProductionUpdate(product: Record<string, unknown>) {
      const toast = useAppToast()
      try {
        const api = useLegacyApi()
        const res = await api.put("/selection/production/update", product)
        if (res.data.status) {
          await this.setSelectionProductionUpdateList()
          toast.success("Başarıyla Güncellendi.")
        } else {
          toast.error("Güncelleme Başarısız.")
        }
      } catch (err) {
        console.error("setSelectionProductionUpdate basarisiz:", err)
        toast.error("Güncelleme Başarısız.")
      }
    },

    async setSelectionProductionDelete(crateno: string | number) {
      const toast = useAppToast()
      try {
        const api = useLegacyApi()
        const res = await api.delete(`/selection/production/delete/${crateno}`)
        if (res.data.status) {
          await this.setSelectionProductionUpdateList()
          toast.success("Başarıyla Silindi.")
        } else {
          toast.error("Silme Başarısız.")
        }
      } catch (err) {
        console.error("setSelectionProductionDelete basarisiz:", err)
        toast.error("Silme Başarısız.")
      }
    },

    /*
     * Kaydet/guncelle/sil sonrasi listeyi yeniden cekip O AN AKTIF olan
     * filtreyi TEKRAR UYGULUYOR -- yoksa kullanici "Dis" sekmesindeyken
     * kaydettiginde liste mekmer'e geri donerdi.
     *
     * Hicbiri aktif degilse (ilk acilis) HICBIR filtre uygulanmiyor ve
     * productList onceki haliyle kaliyor; kaynaktaki davranis bu. Liste
     * ilk kez setSelectionProductsList ile doluyor, orada mekmerList
     * yaziliyor.
     */
    async setSelectionProductionUpdateList() {
      try {
        const api = useLegacyApi()
        const res = await api.get("/selection/production/list")
        this.productsList = res.data.data ?? {}

        if (this.productionMekmerButtonStatus) {
          this.setSelectionProductionMekmerButton()
        } else if (this.productionDisButtonStatus) {
          this.setSelectionProductionDisButton()
        } else if (this.productionDisMekmerButtonStatus) {
          this.setSelectionProductionMekmerDisButton()
        } else if (this.productionBulunamadiButtonStatus) {
          this.setSelectionProductionBulunamadiButton()
        }
      } catch (err) {
        console.error("setSelectionProductionUpdateList basarisiz:", err)
      }
    },
  },
})
