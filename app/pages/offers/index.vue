<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <Button
          type="button"
          severity="success"
          class="w-100"
          label="New Quotes"
          @click="newOffer"
        />
      </div>
      <div class="col">
        <Button
          type="button"
          severity="primary"
          class="w-100"
          label="Current Quotes"
          @click="offers"
        />
      </div>
      <div class="col">
        <Button
          type="button"
          severity="secondary"
          class="w-100"
          label="Old Quotes"
          @click="oldOffers"
        />
      </div>
    </div>

    <OfferList
      :list="offerStore.getOfferList"
      :country="offerStore.getOfferCountryList"
      @offer_list_selected_emit="offerListSelected($event)"
      @offer_list_b_list_selected_emit="offerBListSelected($event)"
    />

    <Dialog
      v-model:visible="offer_list_detail"
      header=""
      modal
      :closeOnEscape="false"
    >
      <OfferDetail
        :list="offerStore.getOfferDetailList"
        :bList="offerStore.getOfferDetailBList"
        :aListTotal="offerStore.getOfferDetailTotalA"
        :bListTotal="offerStore.getOfferDetailTotalB"
        @offer_detail_list_form_selected_emit="
          offerDetailListFormSelected($event)
        "
      />
    </Dialog>

    <Dialog
      v-model:visible="offer_list_detail_form"
      :header="offer_id"
      modal
      :closeOnEscape="false"
    >
      <OfferForm
        :model="model"
        :category="sharedStore.getOfferCategoryList"
        :product="sharedStore.getOfferProductList"
        :size="sharedStore.getOfferSizeList"
        :thickness="sharedStore.getOfferThicknessList"
        :surface="sharedStore.getOfferSurfaceList"
        :unit="sharedStore.getOfferUnitList"
        :productsList="offerStore.getOfferDetailProductsList"
        :modelProduct="modelsStore.getOfferProductModel"
        :status="offerStore.getOfferButtonStatus"
        :customer="customerStore.getOfferCustomerList"
        :country="sharedStore.getCountryList"
        :customerModel="modelsStore.getOfferCustomerModel"
        :id="offerStore.getOfferId"
        :disabled_button_status="disabled_offer_button_status"
        @offer_process_emit="offerProcess($event)"
        @offer_delete_emit="offerDelete($event)"
      />
    </Dialog>

    <Dialog
      v-model:visible="offer_list_detail_old"
      header="Old Quotes"
      modal
      :closeOnEscape="false"
    >
      <OfferOld
        :list="offerStore.getOfferOldList"
        @old_offers_selected_emit="oldOfferSelected($event)"
      />
    </Dialog>
  </div>
</template>

<script>
import { useOfferStore } from "~/stores/offer"
import { useSharedStore } from "~/stores/shared"
import { useModelsStore } from "~/stores/models"
import { useCustomerStore } from "~/stores/customer"
import { useLogsStore } from "~/stores/logs"

export default {
  computed: {
    offerStore() {
      return useOfferStore()
    },
    sharedStore() {
      return useSharedStore()
    },
    modelsStore() {
      return useModelsStore()
    },
    customerStore() {
      return useCustomerStore()
    },
    logsStore() {
      return useLogsStore()
    },
  },
  data() {
    return {
      offer_list_detail: false,
      offer_list_detail_form: false,
      model: {},
      offer_updated_list_form: false,
      offer_id: null,
      offer_list_detail_old: false,
      disabled_offer_button_status: false,
    }
  },
  /*
   * created() -> mounted(): created() SSR'da da calisir, icindeki async
   * is BEKLENMEZ ve listeler BOS serialize edilir; hydration onu
   * devralir, created() bir daha calismadigi icin tablolar bos kalir
   * (bkz. commit 2afc877e3). mounted() sunucuda hic calismaz.
   */
  mounted() {
    this.offerStore.setOfferMainList()
    this.sharedStore.setOfferSharedList()
    this.customerStore.setOfferCustomerList()
    this.sharedStore.setCountryList()
  },
  methods: {
    oldOfferSelected(event) {
      this.model = event.data
      this.offerStore.setOfferDetailProductsList(event.data.Id)
      this.offerStore.setOfferButtonStatus(false)
      this.offerStore.setOfferId(event.data.Id)
      this.offer_id = event.data.Sira
      this.offer_list_detail_form = true
    },
    offerBListSelected(event) {
      this.offerStore.setOfferMainDetailBList(event.KullaniciId)
    },
    oldOffers() {
      this.offerStore.setOfferOldList()
      this.offerStore.setOfferAllButtonStatus(false)
      this.offer_list_detail_old = true
    },
    offers() {
      this.offer_list_detail = true
      this.offer_updated_list_form = true
      this.offerStore.setOfferDetailAllList()
      this.offerStore.setOfferAllButtonStatus(true)
    },
    __zeroControl(event) {
      if (event.toString().length == 1) {
        return "0" + event.toString()
      } else {
        return event.toString()
      }
    },
    /*
     * "gg-aa-yyyy ss:dd" damgasi. Kaynakta offerDelete/save/update
     * ucunde de AYNI yedi satir vardi; ustelik yerel degiskenin adi
     * `date` idi.
     */
    __logStamp() {
      const d = new Date()
      const month = this.__zeroControl(d.getMonth() + 1)
      const day = this.__zeroControl(d.getDate())
      const hour = this.__zeroControl(d.getHours())
      const minute = this.__zeroControl(d.getMinutes())
      return `${day}-${month}-${d.getFullYear()} ${hour}:${minute}`
    },
    __saveLog(description) {
      this.logsStore.setLogs({ description, po: "", color: "" })
    },
    offerDelete(event) {
      this.__saveLog(
        `${event.offer.KullaniciAdi} adlı kullanıcı ${event.customer.MusteriAdi} müşterisine ${this.__logStamp()} tarihli teklifini sildi.`
      )
      this.offerStore.setOfferDelete(event.id)
      this.offer_list_detail_form = false
    },
    newOffer() {
      this.offerStore.setOfferAllButtonStatus(false)
      this.offerStore.setOfferButtonStatus(true)
      this.modelsStore.setOfferModel()
      this.modelsStore.setOfferProductModel()
      this.modelsStore.setOfferCustomerModel()
      this.offerStore.setOfferId(0)
      /*
       * Kaynakta `this.$store.commit("setOfferDetailProductsList", [])`
       * -- action DEGIL, dogrudan MUTATION commit'i. Pinia'da
       * mutation'lar MUT_ onekli action'a cevrildi (ayni adli action ile
       * cakismasin diye; bkz. stores/accounts.ts basligi).
       * Ayni adli ACTION (setOfferDetailProductsList) bir ID alip
       * sunucudan liste CEKER -- burada istenen o degil, listeyi yerel
       * olarak BOSALTMAK.
       */
      this.offerStore.MUT_setOfferDetailProductsList([])
      this.offer_id = null
      this.model = this.modelsStore.getOfferModel
      this.offer_list_detail_form = true
    },
    offerProcess(event) {
      if (this.offerStore.getOfferButtonStatus) {
        const data = {
          customer: event.customer,
          offer: {
            ...event.offer,
            KullaniciId: useCookie("userId").value,
            KullaniciAdi: useCookie("username").value,
          },
        }
        this.save(data)
      } else {
        this.update(event)
      }
    },
    save(event) {
      this.disabled_offer_button_status = true
      this.__saveLog(
        `${useCookie("username").value} adlı kullanıcı ${event.customer.MusteriAdi} müşterisine ${this.__logStamp()} tarihli teklif girişi yaptı.`
      )
      /*
       * Kaynakta .then(res => { if (res) {...} else {...} }) vardi ve IKI
       * DALIN GOVDESI DE AYNIYDI (yalnizca butonu geri aciyordu), bu
       * yuzden tek atamaya indi. setOfferSave basarisizlikta da
       * resolve(false) ediyor (reject DEGIL), yani her iki durumda bu
       * .then calisiyor; kullaniciya hata mesajini store gosteriyor.
       */
      this.offerStore.setOfferSave(event).then(() => {
        this.disabled_offer_button_status = false
      })
    },
    update(event) {
      this.__saveLog(
        `${useCookie("username").value} adlı kullanıcı ${event.customer.MusteriAdi} müşterisine ${this.__logStamp()} tarihli teklif güncellemesi yaptı.`
      )
      this.offerStore.setOfferUpdate(event)
      this.offer_list_detail_form = false
    },
    offerListSelected(event) {
      this.offerStore.setOfferMainDetailList(event.KullaniciId)
      this.offerStore.setOfferAllButtonStatus(false)

      this.offer_list_detail = true
    },
    offerDetailListFormSelected(event) {
      this.model = event
      this.offerStore.setOfferDetailProductsList(event.Id)
      this.offerStore.setOfferButtonStatus(false)
      this.offerStore.setOfferId(event.Id)
      this.offer_id = event.Sira
      this.offer_list_detail_form = true
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
  pages/offers/index.vue -> app/pages/offers/index.vue

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] created() -> mounted()  (yukaridaki nota bak)
  [x] middleware: ["authority"] -> definePageMeta
  [x] mapGetters(22 getter) -> offer / shared / models / customer
      store'lari. Hangi getter hangi store'dan geliyor artik ACIK --
      Vuex modulleri namespaced olmadigi icin kaynakta belirsizdi.
      (Ornegin getOfferCategoryList shared'dan, getOfferDetailList
      offer'dan, getOfferProductModel models'ten geliyor.)
  [x] this.$store.dispatch(...) -> ilgili store action'lari
  [x] this.$store.commit("setOfferDetailProductsList", [])
         -> MUT_setOfferDetailProductsList([])   (newOffer() icindeki
            nota bak -- ayni adli action BASKA bir is yapiyor)
  [x] this.$logs.save -> useLogsStore().setLogs
  [x] Cookies.get(...) -> useCookie(...).value
  [x] :visible + @update:visible -> v-model:visible  (DORT Dialog)
  [x] p-button-success/primary/secondary -> :severity
  [x] <offerList>/<offerDetail>/<offerForm>/<offerOld>
         -> <OfferList>/<OfferDetail>/<OfferForm>/<OfferOld>
      Nuxt 2'de bu adlar plugins/components.js'te ELLE global
      kaydediliyordu (satir 71/72/76/307). Pilotta otomatik ice alma
      var ve ad dosya yolundan uretiliyor; adlar birebir ayni kaldi.
  [x] <offerOld ...></offerOld> -> self-closing

  OfferForm/OfferProforma/OfferSample BU COMMIT'TE TASINMADI: onlar
  onceki commit'te (d894de06c) customer/offer.vue ile birlikte geldi.
  Bu sayfa 1249 satirlik OfferForm'u AYNEN yeniden kullaniyor --
  zincirin iki sayfa tarafindan paylasilmasinin sebebi buydu.

  == TEKRAR AZALTMA ==
  offerDelete/save/update ucunun basinda AYNI yedi satirlik tarih
  damgasi + ayni log nesnesi vardi -> __logStamp() + __saveLog().
  Log METINLERI birebir korundu. O uc metottaki yerel
  `const date = new Date()` adi `d` oldu (kaynakta `date` idi; bu
  sayfada golgelenecek bir `date` import islemi yoktu ama offer/Form.vue'da
  vardi -- ayni kalip).

  save() icindeki `.then(res => if/else)` IKI DALI AYNI oldugu icin
  tek atamaya indi (ayrinti metodun icindeki notta).

  == KALDIRILAN OLU KOD ==
  [x] mounted() icindeki TAMAMI YORUMLANMIS socket blogu:
        // this.$socket.socketIO.on("offers_updated_on", ...)
        // this.$socket.socketIO.on("offers_deleted_on", ...)
      Kaynakta zaten etkisizdi (yorumda). Pilotta canli tazeleme
      Nitro'nun ICINDE calisiyor (server/plugins/socket-io.ts,
      commit 08d777c9e), yani eski $socket eklentisi hic yok.
      Ilgili store action'lari (setOfferDetailUpdatedAllEmit /
      setOfferDetailDeletedAllEmit) stores/offer.ts'te DURUYOR ama
      artik hicbir yerden cagrilmiyor -- teklif ekraninin canli
      tazelemesi yarim kalmis bir ozellik. Baglamak yeni is olurdu.
      (`offer_updated_list_form` data alani da yalnizca o yorumlu blok
      icin vardi; offers() icinde true yapiliyor ve baska hicbir yerde
      okunmuyor. Kaynaktaki hali korundu ki blok ileride acilirsa
      anlamli kalsin.)

  == BILINMESI GEREKEN (stores/offer.ts, bu commit'in kapsami disi) ==
  setOfferSave'in Promise'i yalnizca legacyApi.post'un `.then`i
  icinde resolve ediliyor; `.catch` YOK ve dis Promise'in reject'i hic
  cagrilmiyor. Istek AG HATASIYLA patlarsa Promise HIC SONUCLANMAZ,
  yani buradaki `.then` calismaz ve "Save" butonu KALICI OLARAK devre
  disi kalir (sayfa yenilenene kadar). Sayfa tarafina .catch eklemek
  bunu COZMEZ -- cozum store action'inda. Kaynakta da ayni.
-->
