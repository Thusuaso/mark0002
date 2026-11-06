<template>
  <div class="container">
    <!--
      GETTER ADI DUZELTILDI: `getOrderProductionList` order store'da
      TANIMLI DEGIL (bkz. app/stores/order.ts getters blogu); liste
      getter'inin adi `getOrderList`.

      Eski hali hata ATMIYORDU, sessizce `undefined` donuyordu: yani
      ShipmentForm'a `orders` olarak undefined gidiyor ve "Orders"
      autocomplete'i BOS kaliyordu. Sayfa veriyi zaten asagida
      `setOrderProductionList()` ile cekiyor ve o action listeyi
      `MUT_setOrderList` uzerinden `orderList`e yaziyor -- yani veri
      vardi, yalnizca okundugu getter adi yanlisti.

      Alt nottaki "mapGetters(['getOrderProductionList']) -> orderStore"
      satiri Nuxt 2'deki ADI oldugu gibi tasimis; pilotta getter
      `getOrderList` olarak duruyor.
    -->
    <ShipmentForm :orders="orderStore.getOrderList" />
  </div>
</template>

<script>
import { useOrderStore } from "~/stores/order"

export default {
  computed: {
    orderStore() {
      return useOrderStore()
    },
  },

  /*
   * [x] created() KALDIRILDI -- veri cekimi asagidaki <script setup>
   * blogunda useAsyncData ile. Gerekcesi orada.
   */
}
</script>

<script setup>
/*
 * Veri cekimi NEDEN created() icinde degil: SSR created() icindeki async
 * isi BEKLEMEZ -- liste bos serialize edilir, client hydration onu
 * devralir ve created() bir daha calismadigi icin "Orders"
 * autocomplete'i bos kalir.
 *
 * server: false ZORUNLU -- legacy Express API'si SSR'in IC fetch yolunda
 * calismiyor (bkz. server/middleware/1.legacy-api.ts).
 *
 * TEDARIKCI LISTESI DE BURADA CEKILIYOR -- bu not ONCE YANLISTI:
 * "onu layouts/default.vue dolduruyor" diyordu. Nuxt 2'de dogruydu,
 * pilotta DEGIL: pilotun layout'u o 25 liste cagrisini bilerek
 * erteledi. Sonuc: ShipmentForm'un __getPriceControl'u
 * `sharedStore.getSupplierList.find(...)` ile tedarikci adini ariyor,
 * bos dizide find() undefined donuyor ve fiyat uyarisinda firma adi
 * yerine "Tedarikçi" yazisi cikiyordu (Form.vue:412).
 */
const orderStore = useOrderStore()

await useAsyncData(
  "operation-shipment",
  () => orderStore.setOrderProductionList(),
  { server: false },
)

const shipmentSharedStore = useSharedStore()

await useReferenceData("operation-shipment-reference", [
  ["supplierList", () => shipmentSharedStore.setSupplierList()],
])
</script>

<!--
  pages/operation/shipment.vue

  Navbar bu yola link veriyordu ama sayfa pilotta YOKTU.

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] mapGetters(["getOrderProductionList"]) -> orderStore
  [x] this.$store.dispatch("setOrderProductionList")
         -> orderStore.setOrderProductionList()
      (Ikisi de pilotta zaten tasinmis: app/stores/order.ts:274)
  [x] <shipmentForm> -> <ShipmentForm>
  [x] created() -> <script setup> + useAsyncData({ server: false })

  DIKKAT -- definePageMeta EKLENMEDI:
      Nuxt 2'de bu sayfada `middleware: ["authority"]` satiri YORUM
      ICINDEYDI:
          // middleware: ["authority"],
      Yani kisitlama BILEREK (ya da gecici olarak) kapatilmis. Kardes
      operation sayfalarinin hepsinde etkin, burada degil. Etkinlestirmek
      Nuxt 2'de olmayan bir kisitlama getirmek olurdu, bu yuzden
      yorumdaki hali gibi birakildi -- yani bu sayfa 48/54/56/62 numarali
      kullanicilara da acik.
-->
