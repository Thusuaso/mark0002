<template>
  <div class="">
    <SelectionInputPanel
      :productionTotal="selectionStore.getProductionTotal"
      @products_status_selected="productsStatusSelected($event)"
      @selection_production_dialog="selection_production_dialog_form = true"
    />
    <SelectionInputList
      :products="selectionStore.getProductList"
      :total="selectionStore.getProductionSumTotal"
      @product_selected_emit="productSelectedEmit($event)"
    />
    <Dialog v-model:visible="selection_production_dialog_form" header="" modal>
      <SelectionInputForm
        :suppliers="sharedStore.getSupplierList"
        :orders="sharedStore.getOrderProductionList"
        :products="selectionStore.getProductionProductsList"
        :mines="sharedStore.getMineList"
        :model="model"
        :buttonStatus="selectionStore.getProductionButtonStatus"
        @selection_production_dialog_form="
          selection_production_dialog_form = $event
        "
      />
    </Dialog>
  </div>
</template>

<script>
import { useSelectionStore } from "~/stores/selection"
import { useSharedStore } from "~/stores/shared"
import { useOrderStore } from "~/stores/order"

export default {
  computed: {
    selectionStore() {
      return useSelectionStore()
    },
    sharedStore() {
      return useSharedStore()
    },
    orderStore() {
      return useOrderStore()
    },
  },
  data() {
    return {
      productsButtonStatus: 1,
      selection_production_dialog_form: false,
      model: {},
    }
  },
  /*
   * created() -> mounted(): created() SSR'da da calisir, icindeki async
   * is BEKLENMEZ ve listeler BOS serialize edilir; hydration onu
   * devralir, created() bir daha calismadigi icin tablolar bos kalir
   * (bkz. commit 2afc877e3). mounted() sunucuda hic calismaz.
   */
  mounted() {
    this.fetchProductionList()
    this.selectionStore.setSelectionProductionTotal()
    this.selectionStore.setSelectionProductsList()
    this.selectionStore.setSelectionProductionMekmerButtonStatus()
  },
  methods: {
    /*
     * IKI STORE'A DA CAGRI -- bkz. alt nottaki [1].
     * Vuex'te `setOrderProductionList` adi IKI modulde tanimliydi
     * (order.js ve shared.js) ve namespaced olmadigi icin tek dispatch
     * IKISINI DE calistiriyordu. Ikisi FARKLI uclara gidip FARKLI
     * state besliyor; biri secilse diger ekran sessizce bozulurdu.
     */
    fetchProductionList() {
      this.orderStore.setOrderProductionList()
      this.sharedStore.setOrderProductionList()
    },
    productsStatusSelected(event) {
      this.productsButtonStatus = event

      if (event == 1) {
        this.selectionStore.setSelectionProductionMekmerButton()
        this.selectionStore.setSelectionProductionMekmerButtonStatus()
      } else if (event == 2) {
        this.selectionStore.setSelectionProductionDisButton()
        this.selectionStore.setSelectionProductionDisButtonStatus()
      } else if (event == 3) {
        this.selectionStore.setSelectionProductionMekmerDisButton()
        this.selectionStore.setSelectionProductionMekmerDisButtonStatus()
      } else if (event == 4) {
        this.selectionStore.setSelectionProductionBulunamadiButton()
        this.selectionStore.setSelectionProductionBulunamadiButtonStatus()
      }
    },
    productSelectedEmit(event) {
      this.sharedStore.setCardList()

      this.selection_production_dialog_form = true
      this.model = event.data
      this.selectionStore.setSelectionProductionButtonStatus(false)
    },
  },
}
</script>

<script setup>
/*
 * CANLI TAZELEME -- kaynaktaki hali UC YERDEN YANLISTI:
 *
 *   mounted() {
 *     this.$store.dispatch("setConnection")
 *     this.$store.getters.getSocket.on("production_save_on", () => {
 *       this.$store.dispatch("setOrderProductionList")
 *     })
 *   },
 *   beforeDestroy() {
 *     if (this.socket) { this.$store.dispatch("setDisconnect") }
 *   }
 *
 *   (a) Dinleyici HIC kaldirilmiyordu.
 *   (b) `this.socket` HICBIR ZAMAN atanmadigi icin kosul daima false ->
 *       setDisconnect HIC cagrilmiyordu. Socket store baglantiyi
 *       SAYIYOR, yani her acilista sayac artiyor, hic azalmiyordu.
 *   (c) `beforeDestroy` Vue 3'te YOK (adi beforeUnmount oldu), yani
 *       birebir tasinsa o blok ZATEN HIC calismazdi.
 *   Ayrica getSocket SSR'da null oldugu icin `.on` sunucuda patlardi.
 *
 * useRealtime() ucunu de hallediyor: client'ta baglanir, olayi dinler,
 * kapsam yok olurken dinleyiciyi kaldirip baglantiyi birakir.
 *
 * Handler, Options API'deki fetchProductionList ile AYNI isi yapiyor
 * (iki store birlikte) -- store'lar burada yeniden alindi cunku
 * <script setup> ile Options API blogu `this`i paylasmiyor.
 */
const selectionOrderStore = useOrderStore()
const selectionSharedStore = useSharedStore()

useRealtime("production_save_on", () => {
  selectionOrderStore.setOrderProductionList()
  selectionSharedStore.setOrderProductionList()
})

/*
 * REFERANS LISTELERI -- TEDARIKCI + OCAK
 *
 * Forma `:suppliers` ve `:mines` olarak gecen iki liste HIC CEKILMIYORDU:
 * Nuxt 2'de ikisini de layouts/default.vue'nun created()'i cekiyordu
 * (satir 32-33), pilotun layout'u ise o 25 liste cagrisini bilerek
 * ertelemis -- ama bu sayfa tasinirken kendi ihtiyaci eklenmemis.
 * Kaynak sayfanin created()'inda da yoklar, cunku orada gerek yoktu.
 *
 * Sonuc: listedeki bir kasaya tiklandiginda createdProcess() icindeki
 *     this.suppliers.find((x) => x.FirmaAdi == this.model.FirmaAdi)
 *     this.mines.find((x) => x.ID == this.model.OcakId)
 * daima undefined donuyor ve Supplier ile Quarry alanlari BOS aciliyordu
 * (yeni kayitta da iki AutoComplete hic oneri vermiyordu). Hata yok,
 * uyari yok -- bos dizide find() sessizce undefined.
 *
 * Cekim/atlama plumbing'i useReferenceData'da (composables/).
 */
await useReferenceData("selection-input", [
  ["supplierList", () => selectionSharedStore.setSupplierList()],
  ["mineList", () => selectionSharedStore.setMineList()],
])
</script>

<!--
  pages/selection/input.vue -> app/pages/selection/input.vue

  ============================================================
  [1] AYNI AD, IKI MODUL, IKI FARKLI UC
  ============================================================
  Kaynak `this.$store.dispatch("setOrderProductionList")` yaziyordu.
  Bu ad Vuex'te IKI modulde tanimli:

    store/modules/order.js:174   GET /order/production/list
        -> orderList, orderProductionYearsList, orderListAll,
           orderProductionTotal
    store/modules/shared.js:57   GET /orders/production/list
        -> orderProductionList

  Vuex modulleri NAMESPACED OLMADIGI icin tek dispatch IKISINI DE
  calistiriyordu (Vuex ayni adli tum handler'lari cagirir).

  Pinia'da her modul ayri store, yani "hangisi?" sorusunu cevaplamak
  zorunlu. Cevap: IKISI DE, cunku ikisinin ciktisi da bu ekranda
  kullaniliyor:
    - shared'in doldurdugu getOrderProductionList -> forma `:orders`
      prop'u olarak geciyor (PO listesi).
    - order'in doldurdugu getOrderList -> Panel.vue'daki
      orders_click_excel() excel cikisinda gonderiliyor.

  Birini secmek SESSIZCE bir seyi bozardi: ya formun PO listesi bos
  kalirdi ya da uretim excel'i bos liste gonderirdi. Hata vermezdi.
  check-store-refs bunu "BELIRSIZ(order/shared)" olarak isaretledi --
  araci tam bu durum icin yazilmis.

  fetchProductionList() ikisini birden cagiriyor ve socket handler'i da
  ayni yardimciyi kullaniyor (kaynakta da socket dalinda ayni dispatch
  vardi).

  == DIGER ZORUNLU DEGISIKLIKLER ==

  [x] created() -> mounted()  (yukaridaki nota bak)
  [x] Socket yasam dongusu -> useRealtime()  (<script setup> icindeki
      nota bak; kaynaktaki uc hata orada)
  [x] mapGetters(9 getter) -> selection / shared store'lari.
      Hangi getter hangi store'dan geliyor artik ACIK:
        selection: getProductionTotal, getProductList,
                   getProductionSumTotal, getProductionProductsList,
                   getProductionButtonStatus
        shared:    getSupplierList, getOrderProductionList, getMineList
  [x] this.$store.dispatch(...) -> ilgili store action'lari
  [x] :visible + @update:visible -> v-model:visible
  [x] <selection>/<selectionList>/<selectionForm>
         -> <SelectionInputPanel>/<SelectionInputList>/<SelectionInputForm>
      Nuxt 2'de bu adlar plugins/components.js'te ELLE global
      kaydediliyordu (satir 241-243). Ilki `selection` idi -- tek
      kelime, otomatik ice alma icin kullanilamaz bir ad; dosya
      app/components/selection/input/Panel.vue oldu (icerigi uretim
      ozet tablosu + durum butonlari + excel cikislari, yani bir panel;
      pilotta chat/Panel.vue ve upload/MissingPanel.vue ile ayni
      adlandirma).

  == KALDIRILAN OLU KOD ==
  [x] `import { io } from "socket.io-client"` -- io hicbir yerde
      cagrilmiyordu (baglanti socket store'u uzerinden kuruluyor).
  [x] mapGetters'daki `getOrdersList` -- sablonda ve metotlarda HIC
      kullanilmiyordu; forma giden PO listesi getOrderProductionList.
  [x] `productsList: []` data alani -- hic okunmuyordu.

  KORUNDU: `productsButtonStatus` -- productsStatusSelected icinde
  yaziliyor ama sablonda okunmuyor. Hangi filtre sekmesinin secili
  oldugunu tutan tek yerel iz oldugu icin birakildi (store'daki dort
  bayrak ayni bilgiyi tutuyor; yine de kaynaktaki hali korundu).

  definePageMeta EKLENMEDI -- kaynakta da `middleware` anahtari YOKTU.
  Global auth-check.global.ts oturum kontrolunu zaten yapiyor.
-->
