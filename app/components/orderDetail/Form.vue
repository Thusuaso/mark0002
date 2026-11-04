<template>
  <div class="row mt-3" style="padding: 0px 50px">
    <div class="col-10">
      <TabView>
        <TabPanel header="Order">
          <OrderDetailOrderForm
            :sourceModel="modelProduct"
            :products="productsList"
            :supplier="supplier"
            :unit="unit"
            :po="po"
            :detailProductTotal="detailProductTotal"
            :status="status"
            :saveButtonStatus="saveButtonStatus"
            @workerman_selected_emit="$emit('workerman_selected_emit', $event)"
          />
        </TabPanel>
        <TabPanel header="Proforma">
          <OrderDetailProformaForm
            :model="modelProduction"
            :delivery="delivery"
            :payment="payment"
            :status="status"
            :country="country"
            :invoice="invoice"
            :po="po"
            :proformaUploadButtonStatus="proformaUploadButtonStatus"
            @prepayment_is_activated_emit="prePaymentIsActivated($event)"
            :source="source"
          />
        </TabPanel>
        <TabPanel header="Cost" v-if="!statusAlfa">
          <OrderDetailCostForm :cost="cost" :total="costTotal" />
        </TabPanel>
        <TabPanel header="Supplier" v-if="!statusAlfa">
          <OrderDetailSupplierForm
            :modelProduction="modelProduction"
            :productSupplier="productSupplier"
            :invoice="invoice"
            :supplierDelivery="supplierDelivery"
            :po="po"
            :supplierProduct="supplierProduct"
          />
        </TabPanel>
        <TabPanel header="Document" v-if="!statusAlfa">
          <OrderDetailDocumentForm
            :list="document"
            @proforma_delete_emit="$emit('proforma_delete_emit', $event)"
            @isf_delete_emit="$emit('isf_delete_emit', $event)"
            @drawing_delete_emit="$emit('drawing_delete_emit', $event)"
          />
        </TabPanel>
        <TabPanel header="Check">
          <OrderDetailCheckForm :list="check" :total="checkTotal" />
        </TabPanel>
      </TabView>
    </div>
    <div class="col-2">
      <Button
        type="button"
        severity="success" class="w-100 mb-3"
        label="Save"
        @click="$emit('process')"
        :disabled="saveButtonStatus"
      />
      <Button
        type="button"
        severity="danger" class="w-100 mb-4"
        label="Exit"
        @click="$emit('close_production_form_emit')"
      />
      <Button
        type="button"
        severity="secondary" class="w-100 mb-4"
        label="Divide"
        @click="$emit('divide')"
      />
      <div class="flex flex-wrap justify-content-center gap-3 mb-4">
        <div class="flex align-items-center">
          <Checkbox
            v-model="selectedControlBoolean"
            inputId="ingredient1"
            binary
            @change="controlBooleanSelected($event)"
          />
          <label for="ingredient1" class="ml-2"> Control </label>
        </div>
      </div>

      <FloatLabel class="mb-4">
        <InputText
          id="po"
          v-model="modelProduction.SiparisNo"
          class="w-100"
          :disabled="!status"
          @input="inputPo($event)"
        />
        <label for="po">Po</label>
      </FloatLabel>
      <FloatLabel class="mb-4">
        <DatePicker
          v-model="order_date"
          inputId="order_date"
          class="w-100"
          @date-select="orderDateSelected($event)"
          :disabled="!status"
          dateFormat="dd/mm/yy"
        />
        <label for="order_date">Date</label>
      </FloatLabel>
      <FloatLabel class="mb-4">
        <DatePicker
          v-model="guess_loading_date"
          inputId="guess_loading_date"
          class="w-100"
          @date-select="guessLoadingDateSelected($event)"
          :disabled="!status"
          dateFormat="dd/mm/yy"
        />
        <label for="guess_loading_date">Estimated Shipment Date</label>
      </FloatLabel>
      <FloatLabel class="mb-4">
        <AutoComplete
          v-model="selectedCustomer"
          inputId="customer"
          :suggestions="filteredCustomer"
          @complete="searchCustomer($event)"
          optionLabel="FirmaAdi"
          @item-select="customerSelected($event)"
        />
        <label for="customer">Customer</label>
      </FloatLabel>
      <FloatLabel class="mb-4">
        <AutoComplete
          v-model="selectedOrderer"
          inputId="user"
          :suggestions="filteredOrderer"
          @complete="searchOrderer($event)"
          optionLabel="KullaniciAdi"
          @item-select="ordererSelected($event)"
        />
        <label for="user">Seller</label>
      </FloatLabel>
      <FloatLabel class="mb-4">
        <AutoComplete
          v-model="selectedOperation"
          inputId="operation"
          :suggestions="filteredOperation"
          @complete="searchOperation($event)"
          optionLabel="KullaniciAdi"
          @item-select="operationSelected($event)"
        />
        <label for="operation">Operation</label>
      </FloatLabel>
      <FloatLabel class="mb-4">
        <AutoComplete
          v-model="selectedFinanceman"
          inputId="financeman"
          :suggestions="filteredFinanceman"
          @complete="searchFinanceman($event)"
          optionLabel="KullaniciAdi"
          @item-select="financemanSelected($event)"
        />
        <label for="financeman">Finance</label>
      </FloatLabel>
      <CustomInput
        :value="modelProduction.Pesinat"
        text="Prepayment"
        @onInput="modelProduction.Pesinat = $event"
        :disabled="prepaymentDisabledForm"
        v-if="!statusAlfa"
      />
      <table class="table mb-4">
        <thead>
          <tr>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Total</th>
            <td>{{ formatPriceUsd(productCalculation) }}</td>
          </tr>
          <tr>
            <th scope="row">Freight Cost</th>
            <td>{{ formatPriceUsd(freightCalculation) }}</td>
          </tr>
          <tr>
            <th scope="row">Insurance Cost</th>
            <td>{{ formatPriceUsd(insuranceCalculation) }}</td>
          </tr>
          <tr>
            <th scope="row">Total (Other)</th>
            <td>{{ formatPriceUsd(detailCalculation) }}</td>
          </tr>
          <tr>
            <th scope="row">G.Total</th>
            <td>
              {{ formatPriceUsd((productCalculation +
                  freightCalculation +
                  detailCalculation +
                  insuranceCalculation)) }}
            </td>
          </tr>
        </tbody>
      </table>

      <FloatLabel class="mb-4">
        <DatePicker
          v-model="load_date"
          inputId="load_date"
          class="w-100"
          disabled
          dateFormat="dd/mm/yy"
        />
        <label for="load_date">Shipment Date</label>
      </FloatLabel>
      <FloatLabel class="mb-4">
        <DatePicker
          v-model="eta_date"
          inputId="eta_date"
          class="w-100"
          disabled
          dateFormat="dd/mm/yy"
        />
        <label for="eta_date">ETA</label>
      </FloatLabel>
      <FloatLabel class="mb-4">
        <InputText
          id="container"
          v-model="modelProduction.KonteynerNo"
          class="w-100"
          disabled
        />
        <label for="container">Container No</label>
      </FloatLabel>
      <table class="table mb-4">
        <thead>
          <tr>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Producer</th>
            <td>{{ formatPriceUsd(detailProductCost.supplier) }}</td>
          </tr>
          <tr>
            <th scope="row">Labour Cost</th>
            <td>{{ formatPriceUsd(detailProductCost.workerman) }}</td>
          </tr>
          <tr>
            <th scope="row">Freight Quote</th>
            <td>{{ formatPriceUsd(detailProductCost.freight) }}</td>
          </tr>
          <tr>
            <th scope="row">Other (Cost)</th>
            <td>
              {{ formatPriceUsd(detailProductCost.detail) }}
            </td>
          </tr>
          <tr>
            <th scope="row">Commission</th>
            <td>{{ formatPriceUsd(detailProductCost.brokerage) }}</td>
          </tr>
          <tr>
            <th scope="row">Fob</th>
            <td>{{ formatPriceUsd(detailProductCost.fob) }}</td>
          </tr>
          <tr>
            <th scope="row">G. Total</th>
            <td>
              {{ formatPriceUsd((detailProductCost.supplier +
                  detailProductCost.workerman +
                  detailProductCost.freight +
                  detailProductCost.detail +
                  detailProductCost.brokerage +
                  detailProductCost.fob)) }}
            </td>
          </tr>
          <tr>
            <th scope="row">Profit</th>
            <td>
              {{ formatPriceUsd((productCalculation +
                  freightCalculation +
                  detailCalculation -
                  (detailProductCost.supplier +
                    detailProductCost.workerman +
                    detailProductCost.freight +
                    detailProductCost.detail +
                    detailProductCost.brokerage +
                    detailProductCost.fob))) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { toIsoDate, fromIsoDate } from "~/utils/dates"
import { useSharedStore } from "~/stores/shared"
import { useCostStore } from "~/stores/cost"
export default {
  computed: {
    sharedStore() {
      return useSharedStore()
    },
    costStore() {
      return useCostStore()
    },
  },
  props: {
    modelProduction: {
      type: Object,
      required: true,
    },
    modelProduct: {
      type: Object,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
    customer: {
      type: Array,
      required: true,
    },
    user: {
      type: Array,
      required: true,
    },
    productsList: {
      type: Array,
      required: false,
    },
    supplier: {
      type: Array,
      required: false,
    },
    unit: {
      type: Array,
      required: false,
    },
    po: {
      type: String,
      required: false,
    },
    delivery: {
      type: Array,
      required: true,
    },
    payment: {
      type: Array,
      required: true,
    },
    country: {
      type: Array,
      required: true,
    },
    invoice: {
      type: Array,
      required: true,
    },
    cost: {
      type: Array,
      required: false,
    },
    costTotal: {
      type: Number,
      required: false,
    },
    supplierDelivery: {
      type: Array,
      required: true,
    },
    productSupplier: {
      type: Array,
      required: true,
    },
    supplierProduct: {
      type: Array,
      required: false,
    },
    document: {
      type: Array,
      required: false,
    },
    check: {
      type: Array,
      required: false,
    },
    checkTotal: {
      type: Object,
      required: false,
    },
    productCalculation: {
      type: Number,
      required: false,
    },
    freightCalculation: {
      type: Number,
      required: false,
    },
    detailCalculation: {
      type: Number,
      required: false,
    },
    detailProductTotal: {
      type: Object,
      required: false,
    },
    detailProductCost: {
      type: Object,
      required: false,
    },
    saveButtonStatus: {
      type: Boolean,
      required: false,
    },
    proformaUploadButtonStatus: {
      type: Boolean,
      required: false,
    },
    statusAlfa: {
      type: Boolean,
      required: false,
    },
    insuranceCalculation: {
      type: Number,
      required: true,
    },
    source: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedControlBoolean: false,
      prepaymentDisabledForm: true,
      guess_loading_date: null,
      order_date: null,
      filteredCustomer: null,
      selectedCustomer: null,
      selectedOrderer: null,
      filteredOrderer: null,
      selectedOperation: null,
      filteredOperation: null,
      selectedFinanceman: null,
      filteredFinanceman: null,
      load_date: null,
      eta_date: null,
    };
  },
  created() {
    if (!this.status) {
      this.createdProcess();
    }
  },
  methods: {
    controlBooleanSelected(event) {
      this.modelProduction.SiparisKontrol = this.selectedControlBoolean;
      if (this.selectedControlBoolean) {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = date.getHours();
        const minutes = date.getMinutes();

        const payload = {
          po: this.modelProduction.SiparisNo,
          kontrol_eden: useCookie("username").value,
          date:
            year + "/" + month + "/" + day + "/" + " " + hour + ":" + minutes,
        };
        /*
         * [x] this.$axios -> useLegacyApi()
         * useLegacyApi, axios sozlesmesini taklit ediyor (response.data
         * KORUNUYOR), bu yuzden govde degismiyor. Ayrintisi
         * app/composables/useLegacyApi.ts basinda.
         */
        useLegacyApi()
          .post("/mail/product/control/send", payload)
          .then((response) => {
            if (response.data.status) {
              useAppToast().success("Mail gönderildi. Kaydetmeyi unutmayınız.")
            } else {
              useAppToast().error("Mail gönderilemedi.")
            }
          })
      }
    },
    inputPo(event) {
      this.modelProduction.SiparisNo = event.toUpperCase();
      const index = this.sharedStore.getOrdersAllList.find((x) => x.SiparisNo == event)
      if (index) {
        /*
         * [x] .success -> .warn
         * Bu bir UYARI: girilen po numarasi zaten kullanilmis. Nuxt
         * 2'de YESIL "basarili" toast'i olarak cikiyordu, yani kullanici
         * cakismayi onay sanabiliyordu.
         */
        useAppToast().warn("Bu po ya ait sipariş bulunmakta.")
      }
    },
    __nullControl(value) {
      if (
        value == null ||
        value == "null" ||
        value == undefined ||
        value == ""
      ) {
        return 0;
      } else {
        return parseFloat(value);
      }
    },
    prePaymentIsActivated(event) {
      let prepayment = 0;
      this.productsList.forEach((product) => {
        prepayment += product.SatisToplam;
      });
      prepayment += this.__nullControl(this.modelProduction.NavlunSatis);
      prepayment += this.__nullControl(this.modelProduction.DetayTutar_1);
      prepayment += this.__nullControl(this.modelProduction.DetayTutar_2);
      prepayment += this.__nullControl(this.modelProduction.DetayTutar_3);

      if (event == 1) {
        this.prepaymentDisabledForm = true;
        this.modelProduction.Pesinat = prepayment;
      } else if (event == 2) {
        this.prepaymentDisabledForm = false;
        this.modelProduction.Pesinat = 0;
      } else {
        this.prepaymentDisabledForm = true;
        this.modelProduction.Pesinat = 0;
      }
    },
    guessLoadingDateSelected(event) {
      this.modelProduction.TahminiYuklemeTarihi = toIsoDate(event);
    },
    orderDateSelected(event) {
      this.modelProduction.SiparisTarihi = toIsoDate(event);
    },
    financemanSelected(event) {
      this.modelProduction.Finansman = event.value.ID;
      this.modelProduction.FinansmanAdi = event.value.KullaniciAdi;
    },
    searchFinanceman(event) {
      let results;
      if (event.query.length == 0) {
        results = this.user;
      } else {
        results = this.user.filter((x) => {
          return x.KullaniciAdi.toLowerCase().startsWith(
            event.query.toLowerCase()
          );
        });
      }
      this.filteredFinanceman = results;
    },
    operationSelected(event) {
      this.modelProduction.Operasyon = event.value.ID;
      this.modelProduction.operationMail = event.value.MailAdres;
      this.modelProduction.OperasyonAdi = event.value.KullaniciAdi;
    },
    searchOperation(event) {
      let results;
      if (event.query.length == 0) {
        results = this.user;
      } else {
        results = this.user.filter((x) => {
          return x.KullaniciAdi.toLowerCase().startsWith(
            event.query.toLowerCase()
          );
        });
      }
      this.filteredOperation = results;
    },
    searchOrderer(event) {
      let results;
      if (event.query.length == 0) {
        results = this.user;
      } else {
        results = this.user.filter((x) => {
          return x.KullaniciAdi.toLowerCase().startsWith(
            event.query.toLowerCase()
          );
        });
      }
      this.filteredOrderer = results;
    },
    ordererSelected(event) {
      this.modelProduction.SiparisSahibi = event.value.ID;
      this.modelProduction.SiparisSahibiAdi = event.value.KullaniciAdi;
      this.modelProduction.representativeMail = event.value.MailAdres;
    },
    customerSelected(event) {
      this.modelProduction.MusteriID = event.value.ID;
      this.modelProduction.MusteriAdi = event.value.FirmaAdi;
    },
    searchCustomer(event) {
      let results;
      if (event.query.length == 0) {
        results = this.customer;
      } else {
        results = this.customer.filter((x) => {
          return x.FirmaAdi.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
      this.filteredCustomer = results;
    },
    createdProcess() {
      this.guess_loading_date = fromIsoDate(
        this.modelProduction.TahminiYuklemeTarihi
      );
      this.order_date = fromIsoDate(this.modelProduction.SiparisTarihi);
      this.selectedCustomer = this.customer.find(
        (x) => x.ID == this.modelProduction.MusteriID
      );
      this.selectedOrderer = this.user.find(
        (x) => x.ID == this.modelProduction.SiparisSahibi
      );
      this.selectedOperation = this.user.find(
        (x) => x.ID == this.modelProduction.Operasyon
      );
      this.selectedFinanceman = this.user.find(
        (x) => x.ID == this.modelProduction.Finansman
      );
      this.load_date = fromIsoDate(this.modelProduction.YuklemeTarihi);
      this.eta_date = fromIsoDate(this.modelProduction.Eta);
      this.modelProduction.SiparisKontrolEden = useCookie("userId").value;
      if (
        this.modelProduction.SiparisKontrol == null ||
        this.modelProduction.SiparisKontrol == "" ||
        this.modelProduction.SiparisKontrol == "null" ||
        this.modelProduction.SiparisKontrol == undefined ||
        this.modelProduction.SiparisKontrol == false
      ) {
        this.selectedControlBoolean = false;
        this.modelProduction.SiparisKontrol = false;
      } else {
        this.selectedControlBoolean = true;
        this.modelProduction.SiparisKontrol = true;
      }
    },
  },
  watch: {},
  mounted() {},
};
</script>

<style scoped>
@media screen and (max-width: 576px) {
  .row {
    clear: both;
    display: block;
    width: 100%;
  }
  .col-10 {
    clear: both;
    display: block;
    width: 100%;
  }
  .col-2 {
    clear: both;
    display: block;
    width: 100%;
  }
}
</style>

<!--
  components/orders/forms/detail.vue -> app/components/orderDetail/Form.vue

  DOSYA YOLU: Nuxt 2'de `orderDetailForm` adiyla global kayitli.
  Bu bilesen DETAY DIYALOGUNUN KOKU: alt formlarin altisini birden
  kullaniyor (OrderForm, ProformaForm, CostForm, SupplierForm,
  DocumentForm, CheckForm).

  Mekanik donusumler (tools/codemods/vue2-to-vue3.mjs):
  [1] 4x  <Calendar> -> <DatePicker>
  [2] 6x  alt bilesen etiketleri camelCase -> PascalCase
          (<orderDetailOrderForm> -> <OrderDetailOrderForm> vb.)
          Bu olmadan Nuxt auto-import hicbirini cozemez ve ALTI form
          birden sessizce yok olur -- diyalog bos acilir, hata vermez.
  [3] 4x  AutoComplete field= -> optionLabel=
  [4] 3x  p-button-* -> severity

  Store gecisi (tools/codemods/map-store-refs.mjs):
  [5] mapGetters([getOrdersAllList, getCostList]) -> sharedStore/costStore

  ELLE yapilanlar:
  [6] plugins/date -> toIsoDate (2) / fromIsoDate (4)
      DIKKAT: bu dosyada `date` adinda YEREL bir degisken de var
      (controlBooleanSelected icinde `const date = new Date()` ve 5 metot
      cagrisi). `date.` kor degistirilse o Date kullanimlari da bozulurdu;
      yalnizca plugin metotlari hedeflendi ve yerel olanlar betikte
      assert ile DOGRULANDI.
  [7] js-cookie -> useCookie (2 yer)
  [8] this.$axios -> useLegacyApi() (mail gonderimi; response.data
      sozlesmesi korundugu icin govde degismedi)
  [9] 3x this.$toast -> useAppToast()
  [10] toast.success("Bu po ya ait sipariş bulunmakta.") -> .warn
       Bu bir CAKISMA UYARISI, basari degil; yesil kutu kullaniciyi
       yanlis yonlendiriyordu. useAppToast'a warn() eklendi.
  [11] <OrderDetailOrderForm :model= -> :sourceModel=
       Alt bilesende prop yeniden adlandirildi (orada prop'a atama
       yapiliyordu, Vue 3'te basarisiz olur); gerekcesi
       orderDetail/OrderForm.vue icinde.

  DOKUNULMADI ama DIKKAT:
  - 20 adet `this.modelProduction.X = ...` ic prop atamasi var; prop
    sahibinin state'ini uzaktan degistiriyor. Vue 3'te hata vermez,
    birebir korundu (bkz. tools/codemods/find-prop-mutations.mjs).
  - 31 prop'u var. Bir kismi yalnizca alt formlara aktariliyor; provide/
    inject veya store'dan dogrudan okuma daha uygun olurdu, ama bu bir
    tasarim degisikligi ve gecisin kapsami disinda.
-->
