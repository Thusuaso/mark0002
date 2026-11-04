<template>
  <div>
    <div class="row m-auto mb-3 mt-3">
      <div class="col">
        <FloatLabel>
          <InputText
            class="w-100"
            id="customer"
            type="text"
            v-model="model.MusteriAdi"
          />
          <label for="customer">Customer</label>
        </FloatLabel>
      </div>
      <div class="col">
        <FloatLabel>
          <InputText
            class="w-100"
            id="company"
            type="text"
            v-model="model.Company"
          />
          <label for="company">Company</label>
        </FloatLabel>
      </div>
      <div class="col">
        <FloatLabel>
          <AutoComplete
            v-model="selectedCountry"
            inputId="country"
            :suggestions="filteredCountry"
            optionLabel="UlkeAdi"
            @complete="searchCountry($event)"
            class="w-100"
          />
          <label for="country">Country</label>
        </FloatLabel>
      </div>
    </div>
    <div class="row m-auto mb-3">
      <div class="col">
        <FloatLabel>
          <InputText class="w-100" id="email" type="text" v-model="model.Mail" />
          <label for="email">Mail</label>
        </FloatLabel>
      </div>
      <div class="col">
        <FloatLabel>
          <InputText
            class="w-100"
            id="phone"
            type="text"
            v-model="model.Phone"
          />
          <label for="phone">Phone</label>
        </FloatLabel>
      </div>
    </div>
    <div class="row m-auto mb-3">
      <div class="col">
        <FloatLabel>
          <Textarea
            id="adress"
            v-model="model.Adress"
            rows="5"
            cols="30"
            class="w-100"
          />
          <label for="adress">Address</label>
        </FloatLabel>
      </div>
      <div class="col">
        <FloatLabel>
          <Textarea
            id="description"
            v-model="model.Description"
            rows="5"
            cols="30"
            class="w-100"
          />
          <label for="description">Description</label>
        </FloatLabel>
      </div>
    </div>
    <div class="row m-auto mb-3">
      <div class="col">
        <Button
          type="button"
          severity="success"
          class="w-100"
          label="Save"
          @click="process"
        />
      </div>
      <div class="col" v-if="!button">
        <Button
          type="button"
          severity="danger"
          class="w-100"
          label="Delete"
          @click="deleteForm"
        />
      </div>
    </div>
    <hr />
    <h3 class="text-center m-auto">Offer ID</h3>
    <div class="row">
      <div class="col-1" v-for="offer in offerData" :key="offer.Id">
        <Button
          :label="String(offer.Sira)"
          severity="primary"
          @click="open_offer(offer)"
        />
      </div>
    </div>
    <hr />
    <Dialog
      v-model:visible="offer_list_detail_form"
      :header="offer_id"
      modal
      :closeOnEscape="false"
    >
      <OfferForm
        :model="offerModel"
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
  </div>
</template>

<script>
import { useSharedStore } from "~/stores/shared"
import { useOfferStore } from "~/stores/offer"
import { useModelsStore } from "~/stores/models"
import { useCustomerStore } from "~/stores/customer"

export default {
  props: {
    model: {
      type: Object,
      required: true,
    },
    country: {
      type: Array,
      required: true,
    },
    button: {
      type: Boolean,
      required: true,
    },
    offerData: {
      type: Array,
      required: true,
    },
  },
  emits: ["offer_customer_dialog_close"],
  computed: {
    sharedStore() {
      return useSharedStore()
    },
    offerStore() {
      return useOfferStore()
    },
    modelsStore() {
      return useModelsStore()
    },
    customerStore() {
      return useCustomerStore()
    },
  },
  data() {
    return {
      selectedCountry: null,
      filteredCountry: null,
      offer_list_detail_form: false,
      offer_id: null,
      offerModel: {},
      disabled_offer_button_status: false,
    }
  },
  /*
   * created() KORUNDU: senkron, istek atmiyor; ayrica bu bilesen SSR'da
   * mount edilmiyor (customer/offer.vue onu v-model:visible=false ile
   * baslayan <Dialog> icinde render ediyor).
   */
  created() {
    this.selectedCountry = this.country.find((x) => x.Id == this.model.UlkeId)
  },
  methods: {
    offerDelete() {
      alert("Bu bölümde çalışmaz")
    },
    offerProcess() {
      alert("Bu bölümde çalışmaz")
    },
    open_offer(event) {
      const legacyApi = useLegacyApi()

      legacyApi.get(`/offer/customer/get/offer/${event.Id}`).then((res) => {
        this.offerModel = res.data.list[0]
        this.offerStore.setOfferButtonStatus(false)
        this.offerStore.setOfferId(event.Id)
        this.offerStore.setOfferDetailProductsList(event.Id)
        this.offer_id = event.Sira
        this.offer_list_detail_form = true
      })
    },
    deleteForm() {
      this.customerStore.setOfferCustomerDelete(this.model.Id)
      this.$emit("offer_customer_dialog_close")
    },
    save() {
      this.model.UlkeId = this.selectedCountry.Id
      this.model.UlkeAdi = this.selectedCountry.UlkeAdi
      this.model.Kullanici = useCookie("userId").value
      this.model.KullaniciAdi = useCookie("username").value
      this.customerStore.setOfferCustomerSave(this.model)
      this.$emit("offer_customer_dialog_close")
    },
    update() {
      this.model.UlkeId = this.selectedCountry.Id
      this.model.UlkeAdi = this.selectedCountry.UlkeAdi
      this.customerStore.setOfferCustomerUpdate(this.model)
      this.$emit("offer_customer_dialog_close")
    },
    process() {
      if (this.button) {
        this.save()
      } else {
        this.update()
      }
    },
    searchCountry(event) {
      let results
      if (event.query.length == 0) {
        results = this.country
      } else {
        results = this.country.filter((x) => {
          return x.UlkeAdi.toLowerCase().startsWith(event.query.toLowerCase())
        })
      }
      this.filteredCountry = results
    },
  },
}
</script>

<style scoped>
@media screen and (max-width: 576px) {
  .row {
    clear: both;
    display: block;
    width: 100%;
  }
  .col {
    clear: both;
    display: block;
    width: 100%;
  }
}
</style>

<!--
  components/customer/offer/form.vue -> app/components/customer/offer/Form.vue

  Otomatik ice alma adi `CustomerOfferForm` -- Nuxt 2'deki global kayit
  adiyla AYNI (plugins/components.js:267).

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] <span class="p-float-label"> -> <FloatLabel>   (sinif v4'te YOK)
  [x] p-button-success/danger/primary -> :severity
  [x] AutoComplete `field="UlkeAdi"` -> `optionLabel="UlkeAdi"`
      (v4'te field prop'u YOK; yoksa oneri listesi [object Object])
  [x] :visible + @update:visible -> v-model:visible
  [x] <offerForm> -> <OfferForm>  (otomatik ice alma adi)
  [x] mapGetters(16 getter) -> ilgili store'lar (shared/offer/models/
      customer). Sablonda hangi getter hangi store'dan geliyor ARTIK
      ACIK -- Vuex modulleri namespaced olmadigi icin kaynakta
      belirsizdi.
  [x] this.$axios -> useLegacyApi()   (response.data sozlesmesi korunur)
  [x] Cookies.get(...) -> useCookie(...).value
  [x] this.$store.dispatch(...) -> ilgili store action'lari
  [x] `emits: [...]` bildirildi (Vue 3'te bildirilmeyen emit uyari verir)

  [x] v-for'a `:key` eklendi: `v-for="offer in offerData"` key'siz
      yaziliydi; Vue 3'te bu uyari veriyor ve liste guncellenirken
      ogeleri yanlis eslestirebiliyor.

  [x] `:label="offer.Sira"` -> `String(offer.Sira)`. PrimeVue 4'te
      Button `label` prop'u String tipinde bildirilmis; Sira sayi
      geldiginde Vue tip uyarisi veriyordu.

  [x] ETIKETSIZ IKI <label> BAGLANDI: iki Textarea (Address ve
      Description) `<label>` ogelerinin `for`'u YOKTU ve Textarea'nin
      da id'si yoktu -- etiketler hicbir alana bagli degildi, tiklamak
      hicbir sey yapmiyordu. id/for ciftleri eklendi.

  KORUNDU -- `offerDelete` / `offerProcess` yalnizca alert() yapiyor:
  bu ekranda teklif kaydetme/silme BILINCLI olarak devre disi
  ("Bu bölümde çalışmaz"). <OfferForm> paylasilan bir bilesen oldugu
  icin olaylari yayiyor, ama musteri ekraninda karsiliksiz birakilmis.
  Calisir hale getirmek yeni bir ozellik olurdu; alert() de pilotun
  genel kararina uygun sekilde korundu (bkz. orderDetail/DocumentForm.vue).

  NOT -- `model` PROP'UNA ALAN YAZILIYOR (save/update icinde
  `this.model.UlkeId = ...`): Vue 3'te bu HATA VERMEZ, cunku prop'un
  KENDISINE atama degil, isaret ettigi nesnenin alanina atama.
  find-prop-mutations bunu "INCELE" olarak listeler, "KIRILIR" olarak
  degil. Ebeveyn (customer/offer.vue) bu nesneyi zaten store modelinden
  veriyor ve kaydetme ayni nesneyi gonderiyor -- kaynaktaki akis bu.
-->
