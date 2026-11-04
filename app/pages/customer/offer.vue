<template>
  <div class="container">
    <Button
      type="button"
      severity="success"
      class="w-100"
      label="New"
      @click="newForm"
    />

    <CustomerOfferList
      :offer="customerStore.getOfferCustomerList"
      @offer_customer_selected="offerCustomerSelected($event)"
    />
    <Dialog v-model:visible="offer_form_dialog" header="" modal>
      <CustomerOfferForm
        :model="model"
        :country="sharedStore.getCountryList"
        :button="customerStore.getOfferCustomerButtonStatus"
        :offerData="customer_offer_data"
        @offer_customer_dialog_close="offer_form_dialog = false"
      />
    </Dialog>
  </div>
</template>

<script>
import { useCustomerStore } from "~/stores/customer"
import { useSharedStore } from "~/stores/shared"
import { useModelsStore } from "~/stores/models"
import { useOfferStore } from "~/stores/offer"

export default {
  computed: {
    customerStore() {
      return useCustomerStore()
    },
    sharedStore() {
      return useSharedStore()
    },
    modelsStore() {
      return useModelsStore()
    },
    offerStore() {
      return useOfferStore()
    },
  },
  data() {
    return {
      offer_form_dialog: false,
      model: null,
      customer_offer_data: [],
    }
  },
  /*
   * created() -> mounted(): created() SSR'da da calisir, icindeki async
   * is BEKLENMEZ ve listeler BOS serialize edilir; hydration onu
   * devralir, created() bir daha calismadigi icin tablo bos kalir
   * (bkz. commit 2afc877e3). mounted() sunucuda hic calismaz.
   */
  mounted() {
    this.customerStore.setOfferCustomerList()
    this.offerStore.setOfferMainList()
    this.sharedStore.setOfferSharedList()
    this.sharedStore.setCountryList()
  },
  methods: {
    newForm() {
      this.modelsStore.setOfferCustomerModel()
      this.model = this.modelsStore.getOfferCustomerModel
      this.offer_form_dialog = true
      this.customer_offer_data = []
      this.customerStore.setOfferCustomerButtonStatus(true)
    },
    offerCustomerSelected(offer) {
      const legacyApi = useLegacyApi()

      this.offer_form_dialog = true
      this.model = offer.data
      const id = offer.data.Id
      legacyApi.get("/offer/customer/data/" + id).then((res) => {
        this.customer_offer_data = res.data.list
      })
      this.customerStore.setOfferCustomerButtonStatus(false)
    },
  },
}
</script>

<script setup>
/*
 * definePageMeta yalnizca <script setup> icinde cagrilabilir -> Options
 * API sayfalarinda ikinci bir script blogu gerekiyor.
 *
 * ZORUNLU: Options API'deki `middleware: [...]` anahtari Nuxt 3+'ta YOK
 * SAYILIR -- hata vermez, yetki kisitlamasi SESSIZCE kalkar
 * (bkz. commit 5fc77edb1). Kaynak sayfada `middleware: ["authority"]`
 * yaziliydi.
 */
definePageMeta({ middleware: ["authority"] })
</script>

<!--
  pages/customer/offer.vue -> app/pages/customer/offer.vue

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] created() -> mounted()  (yukaridaki nota bak)
  [x] middleware: ["authority"] -> definePageMeta
  [x] this.$axios -> useLegacyApi()   (response.data sozlesmesi korunur)
  [x] this.$store.dispatch(...) -> ilgili store action'lari
  [x] mapGetters(4 getter) -> customer / shared / models store'lari
  [x] :visible + @update:visible -> v-model:visible
  [x] class="p-button-success" -> severity="success"
  [x] <customerOfferList>/<customerOfferForm>
         -> <CustomerOfferList>/<CustomerOfferForm>
      Nuxt 2'de bu adlar plugins/components.js'te ELLE global
      kaydediliyordu (satir 266-267). Pilotta otomatik ice alma var ve
      ad dosya yolundan uretiliyor:
      app/components/customer/offer/List.vue -> CustomerOfferList.

  == TEKRARLANAN DISPATCH KALDIRILDI ==
  Kaynak created() BES dispatch yapiyordu ve `setOfferCustomerList`
  ILK ve DORDUNCU sirada IKI KEZ vardi:
      setOfferCustomerList · setOfferMainList · setOfferSharedList ·
      setOfferCustomerList · setCountryList
  Ayni liste iki kez cekiliyordu (iki ag istegi, ikincisi birincinin
  sonucunu eziyor). Tek cagri birakildi; digerlerinin SIRASI korundu.

  NOT -- `getOfferCustomerModel` NESNE KIMLIGI:
  newForm() once `setOfferCustomerModel()` cagirip modeli sifirliyor,
  sonra `this.model = ...getOfferCustomerModel` ile o nesneyi aliyor.
  Store getter'i state nesnesini DOGRUDAN dondurdugu icin form
  uzerinde yapilan duzenlemeler store'daki modeli de degistiriyor --
  kaynaktaki davranis aynen bu (Vuex'te de getter uzerinden
  yaziliyordu) ve korundu.
-->
