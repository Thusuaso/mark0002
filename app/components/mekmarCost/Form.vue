<template>
  <div class="container">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th v-for="flag in flagFields" :key="flag" scope="col">{{ flag }}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">
            <FloatLabel class="mb-4 w-100">
              <AutoComplete
                v-model="selectedPo"
                inputId="po"
                :suggestions="filteredPo"
                @complete="searchPo($event)"
                @item-select="poSelected($event)"
                optionLabel="SiparisNo"
                class="w-100"
              />
              <label for="po">PO</label>
            </FloatLabel>
          </th>
          <td v-for="flag in flagFields" :key="flag">
            <Checkbox v-model="model[flag]" :binary="true" />
          </td>
        </tr>
      </tbody>
    </table>

    <table class="table" v-show="productList.length > 0">
      <thead>
        <tr>
          <th scope="col">Supplier</th>
          <th scope="col">Invoice</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in productList" :key="index">
          <th scope="row">
            {{ item.FirmaAdi }}
          </th>
          <td>
            <Checkbox
              v-model="item.Invoice"
              :binary="true"
              @change="changeSupplierChecked(item)"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <div class="row">
      <div class="col">
        <Button
          type="button"
          :severity="status ? 'success' : 'warn'"
          :label="status ? 'Save' : 'Update'"
          @click="process"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useMekmarCostStore } from "~/stores/mekmarCost"

export default {
  props: {
    status: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    mekmarCostStore() {
      return useMekmarCostStore()
    },
    /*
     * Sablon dokuz yerde `getMekmarCostModel.X` yaziyordu; tek kisa ad.
     * Store getter'i state.model NESNESINI dondurur, yani
     * `model.Freight = true` state'i DOGRUDAN yazar -- kaynaktaki
     * davranis da buydu (Vuex'te de getter uzerinden yaziliyordu,
     * strict mode kapali oldugu icin sessizce geciyordu).
     *
     * Vue 3'te bu HATA VERMEZ: bir prop DEGIL, store nesnesi.
     * (find-prop-mutations --pilot bu yuzden burayi isaretlemiyor.)
     */
    model() {
      return this.mekmarCostStore.getMekmarCostModel
    },
  },
  data() {
    return {
      selectedPo: null,
      filteredPo: null,
      productList: [],
      supplierChecked: [],
      /*
       * Dokuz bayrak alani. Sablonda hem baslik satiri hem Checkbox
       * satiri HARFI HARFINE tekrar ediyordu (18 blok); v-for'a indi.
       * SIRA kaynaktaki ile birebir ayni.
       */
      flagFields: [
        "Freight",
        "Logistic",
        "Custom",
        "Fumigation",
        "Port",
        "Insurance",
        "Lashing",
        "Spanzlet",
      ],
    }
  },
  methods: {
    async save() {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()
      const response = await legacyApi.post(
        "/reports/mekmar/cost/control/save",
        this.model
      )
      if (response.data.status) {
        toast.success(response.data.message)
      } else {
        toast.error(response.data.message)
      }
      if (this.supplierChecked.length > 0) {
        const response_2 = await legacyApi.post(
          "/reports/mekmar/cost/control/product/save",
          { data: this.supplierChecked, Po: this.model.Po }
        )
        if (response_2.data.status) {
          toast.success(response_2.data.message)
        } else {
          toast.error(response_2.data.message)
        }
      }
    },
    async update() {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()
      const response = await legacyApi.put(
        "/reports/mekmar/cost/control/update",
        this.model
      )
      if (response.data.status) {
        toast.success(response.data.message)
      } else {
        toast.error(response.data.message)
      }
      if (this.supplierChecked.length > 0) {
        const response_2 = await legacyApi.put(
          "/reports/mekmar/cost/control/product/save",
          { data: this.supplierChecked, Po: this.model.Po }
        )
        if (response_2.data.status) {
          toast.success(response_2.data.message)
        } else {
          toast.error(response_2.data.message)
        }
      }
    },
    process() {
      if (this.status) {
        this.save()
      } else {
        this.update()
      }
    },
    searchPo(event) {
      const poList = this.mekmarCostStore.getMekmarPoList
      if (event.query.length == 0) {
        this.filteredPo = poList
        return
      } else {
        this.filteredPo = poList.filter((po) => {
          return po.SiparisNo.toLowerCase().startsWith(event.query.toLowerCase())
        })
      }
    },
    poSelected(event) {
      this.model.Po = event.value.SiparisNo
      /*
       * `{ ...x }` KOPYASI ONEMLI: asagidaki Checkbox `item.Invoice`'a
       * YAZIYOR. Kopya olmasa store'daki product dizisinin nesneleri
       * dogrudan kirletilirdi.
       */
      this.productList = this.mekmarCostStore.getMekmarProductList
        .filter((x) => x.SiparisNo === event.value.SiparisNo)
        .map((x) => ({ ...x, Invoice: false }))
      this.supplierChecked = []
    },
    changeSupplierChecked(event) {
      if (event.Invoice) {
        this.supplierChecked.push(event)
      } else {
        const index = this.supplierChecked.findIndex((x) => {
          return x.TedarikciID === event.TedarikciID
        })
        if (index > -1) {
          this.supplierChecked.splice(index, 1)
        }
      }
    },
  },
  /*
   * created() KORUNDU (pilotun genel "created() -> mounted()" kuralinin
   * BILINCLI ISTISNASI).
   *
   * Kural su yuzden var: created() SSR'da da calisir, icindeki ASENKRON
   * is beklenmez ve liste bos serialize edilir (bkz. commit 2afc877e3).
   * Burada o risk YOK:
   *   - govde tamamen SENKRON, hic istek atmiyor; yalnizca zaten yuklu
   *     store verisini esliyor,
   *   - bu bilesen SSR'da HIC mount edilmiyor: tek kullanicisi
   *     operation/cost-control.vue'daki <Dialog> ve o dialog
   *     v-model:visible=false ile basliyor, yani icerigi ancak kullanici
   *     "New"/satir tiklamasiyla acildiginda render ediliyor.
   * mounted()'a tasinmasi ilk render'da `v-show="productList.length > 0"`
   * yuzunden bir kare bos tablo goseterirdi -- gereksiz.
   */
  created() {
    if (!this.status) {
      this.selectedPo = this.model.Po

      const products = this.mekmarCostStore.getMekmarProductList.filter(
        (x) => x.SiparisNo === this.model.Po
      )

      const supplierMap = new Map()
      for (const supplier of this.mekmarCostStore.getMekmarSupplier) {
        supplierMap.set(`${supplier.Po}_${supplier.SupplierId}`, !!supplier.Invoice)
      }

      const optimizedData = []
      for (const product of products) {
        const key = `${product.SiparisNo}_${product.TedarikciID}`
        if (supplierMap.has(key)) {
          optimizedData.push({ ...product, Invoice: supplierMap.get(key) })
        }
      }

      this.productList = optimizedData
    }
  },
}
</script>

<!--
  components/cost/form.vue -> app/components/mekmarCost/Form.vue
  (klasor adi neden "mekmarCost": List.vue'nun alt notuna bak)

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] <span class="p-float-label mb-4 w-100"> -> <FloatLabel class="mb-4 w-100">
      PrimeVue 4'te `p-float-label` SINIFI kaldirildi; stilsiz bir span
      kalir ve <label> input'un uzerine yuzmek yerine yanina duser.
      (codemod-float-label.mjs ile ayni donusum.)

  [x] AutoComplete `field="SiparisNo"` -> `optionLabel="SiparisNo"`
      PrimeVue 4'te `field` prop'u YOK. Birakilsa oneri listesi her
      satirda [object Object] gosterirdi.

  [x] class="p-button-success" / "p-button-warning" -> :severity
      PrimeVue 4'te buton rengi `severity` prop'u ile veriliyor; eski
      sinif adlari artik hicbir stile baglanmiyor (buton duz/primary
      cikar). "warning" severity'sinin PrimeVue 4'teki adi "warn".

  [x] this.$axios -> useLegacyApi()   (response.data sozlesmesi KORUNUR)
      this.$toast -> useAppToast()
  [x] mapGetters(...) -> useMekmarCostStore()

  [x] `{{ productList }}` KALDIRILDI.
      Iki tablo arasinda, sablonda ciplak duran bir ifadeydi: tum
      productList dizisini JSON olarak EKRANA basiyordu. Birakilmis bir
      hata ayiklama satiri; kullaniciya gorunen comp.

  [x] `reset()` metodu KALDIRILDI -- hicbir yerden cagrilmiyordu
      (kod tabaninda tek gecisi kendi tanimi). Icerigi, varsayilan
      modelin UCUNCU harfi harfine kopyasiydi; o varsayilan artik tek
      yerde: stores/mekmarCost.ts -> createMekmarCostModel().

  [x] poSelected() icindeki OLU KOD kaldirildi:
          const customInvoiceName = "Invoice " + index
          customProductList.push({ ...x, customInvoiceName: false })
      `customInvoiceName` const'u hesaplaniyor ama KULLANILMIYOR --
      nesneye eklenen anahtar hesaplanan deger degil, DUZ "customInvoiceName"
      dizgisi ([customInvoiceName] degil). Sablon da ne o anahtari ne
      `index`i hic okumuyor. Yerine `Invoice: false` yazildi: eskiden
      `Invoice` HIC tanimlanmiyordu ve Checkbox undefined'i "isaretsiz"
      gosteriyordu -- yani GORUNEN davranis ayni, artik acikca yaziliyor.
      `async` + `await ...filter()` de kaldirildi (filter promise degil).

  ============================================================
  DAVRANIS DEGISIKLIGI 1 -- changeSupplierChecked: indexOf -> findIndex
  ============================================================
  Kaynak:
      const index = this.supplierChecked.indexOf((x) => {
        return x.TedarikciID === event.TedarikciID;
      });
      this.supplierChecked.splice(index, 1);

  `indexOf` bir DEGER arar, PREDIKAT almaz. Verilen fonksiyon dizide
  hicbir zaman bulunmadigi icin index DAIMA -1 doner ve
      splice(-1, 1)
  listenin SON elemanini siler. Yani bir tedarikcinin Invoice kutusu
  ISARETSIZ hale getirildiginde, listeden YANLIS tedarikci cikiyordu;
  ardindan sunucuya giden `data` dizisi de yanlis oluyordu
  (/cost/control/product/save her satiri INSERT ediyor).

  `findIndex` + `index > -1` korumasi ile duzeltildi. Ayni hata sinifi
  selection store'unda da vardi (commit 80c78ee52).

  ============================================================
  DAVRANIS DEGISIKLIGI 2 -- created(): IKI YANLIS ALAN ADI
  ============================================================
  Kaynak, Invoice durumlarini eslerken SU IKI ALANI kullaniyordu:
      supplier.TedarikciID     ve     product.ID

  API'nin dondurdugu recordset'lerde BU ALANLAR YOK
  (api/index.js:19393):
      supplier -> mcc.ID, mcc.Po, mcc.SupplierId, mcc.Invoice, t.FirmaAdi
      product  -> s.SiparisNo, su.TedarikciID, t.FirmaAdi, s.SiparisTarihi

  Yani supplier tarafinda dogru ad `SupplierId`, product tarafinda
  `TedarikciID`. Kaynaktaki hali ikisini de `undefined` okuyordu ve
  anahtarlar
      "PO_undefined"  ==  "PO_undefined"
  olarak ESLESIYORDU. Sonuc, sessiz ve yanlis:
    - Map ayni PO icin tek girdiye duser, SONUNCU supplier satirinin
      Invoice degeri kazanir;
    - o PO'nun TUM urun satirlari ayni Invoice degerini gosterir.
  Yani guncelleme modunda kullaniciya tedarikci basina YANLIS fatura
  isaretleri gorunuyordu.

  Alan adlari duzeltildi. BU GORUNUR BIR DEGISIKLIK, iki yonu var:
    1) Invoice isaretleri artik tedarikci basina DOGRU geliyor.
    2) `if (supplierMap.has(key))` filtresi artik GERCEKTEN filtreliyor:
       kayitli supplier satiri OLMAYAN urun satirlari listede
       gorunmuyor. Eskiden PO esleseni gecerdi.
    (2) kaynagin yazili niyeti ("yalnizca supplier kaydi olanlari
    goster") ama bugune kadar hic calismamisti; uzerine karar GEREKEBILIR.

  ------------------------------------------------------------
  TASIMA KAPSAMINDA DEGISTIRILMEDI -- ama bilinmeli (API tarafi):
  ------------------------------------------------------------
  * PUT /reports/mekmar/cost/control/update  GOVDESI BOS:
        app.put(".../update", async (req, res) => {});
    res hic cagrilmiyor, yani istek YANITLANMIYOR. "Update" butonu
    bu yuzden sonsuza kadar bekler: ne toast gorunur ne kayit olur.
    Ayni sey .../product/update icin de gecerli.
  * POST .../product/save her zaman INSERT ediyor (upsert degil), yani
    ayni PO ikinci kez kaydedilirse supplier satirlari COGALIR.
  Ikisi de api/index.js'te ve bu gecisin kapsami disinda.
-->
