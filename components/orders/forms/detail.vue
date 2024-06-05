<template>
  <div class="row mt-3" style="padding:0px 50px;">
    <div class="col-10">
      <TabView>
        <TabPanel header="Order">
          <orderDetailOrderForm :model="modelProduct" :products="productsList" :supplier="supplier" :unit="unit"
            :po="po" :detailProductTotal="detailProductTotal" :status="status" :saveButtonStatus="saveButtonStatus"
            @workerman_selected_emit="$emit('workerman_selected_emit', $event)" />
        </TabPanel>
        <TabPanel header="Proforma">
          <orderDetailProformaForm :model="modelProduction" :delivery="delivery" :payment="payment" :status="status"
            :country="country" :invoice="invoice" :po="po" :proformaUploadButtonStatus="proformaUploadButtonStatus"
            @prepayment_is_activated_emit="prePaymentIsActivated($event)" />
        </TabPanel>
        <TabPanel header="Cost" v-if="!statusAlfa">
          <orderDetailCostForm :cost="cost" :total="costTotal" />
        </TabPanel>
        <TabPanel header="Supplier" v-if="!statusAlfa">
          <orderDetailSupplierForm :modelProduction="modelProduction" :productSupplier="productSupplier"
            :invoice="invoice" :supplierDelivery="supplierDelivery" :po="po" :supplierProduct="supplierProduct" />
        </TabPanel>
        <TabPanel header="Document" v-if="!statusAlfa">
          <orderDetailDocumentForm :list="document" @proforma_delete_emit="$emit('proforma_delete_emit', $event)"
            @isf_delete_emit="$emit('isf_delete_emit', $event)" />
        </TabPanel>
        <TabPanel header="Check">
          <orderDetailCheckForm :list="check" :total="checkTotal" />
        </TabPanel>
      </TabView>
    </div>
    <div class="col-2">
      <Button type="button" class="p-button-success w-100 mb-3" label="Save" @click="$emit('process')"
        :disabled="saveButtonStatus" />
      <Button type="button" class="p-button-danger w-100 mb-4" label="Exit"
        @click="$emit('close_production_form_emit')" />
      <Button type="button" class="p-button-secondary w-100 mb-4" label="Divide" @click="$emit('divide')" />
      <div class="flex flex-wrap justify-content-center gap-3 mb-4">
        <div class="flex align-items-center">
          <Checkbox v-model="selectedControlBoolean" inputId="ingredient1" binary
            @change="controlBooleanSelected($event)" />
          <label for="ingredient1" class="ml-2"> Control </label>
        </div>
      </div>




      <span class="p-float-label mb-4">
        <InputText id="po" v-model="modelProduction.SiparisNo" class="w-100" :disabled="!status"
          @input="inputPo($event)" />
        <label for="po">Po</label>
      </span>
      <span class="p-float-label mb-4">
        <Calendar v-model="order_date" inputId="order_date" class="w-100" @date-select="orderDateSelected($event)"
          :disabled="!status" />
        <label for="order_date">Date</label>
      </span>
      <span class="p-float-label mb-4">
        <Calendar v-model="guess_loading_date" inputId="guess_loading_date" class="w-100"
          @date-select="guessLoadingDateSelected($event)" :disabled="!status" />
        <label for="guess_loading_date">Estimated Shipment Date</label>
      </span>
      <span class="p-float-label mb-4">
        <AutoComplete v-model="selectedCustomer" inputId="customer" :suggestions="filteredCustomer"
          @complete="searchCustomer($event)" field="FirmaAdi" @item-select="customerSelected($event)" />
        <label for="customer">Customer</label>
      </span>
      <span class="p-float-label mb-4">
        <AutoComplete v-model="selectedOrderer" inputId="user" :suggestions="filteredOrderer"
          @complete="searchOrderer($event)" field="KullaniciAdi" @item-select="ordererSelected($event)" />
        <label for="user">Seller</label>
      </span>
      <span class="p-float-label mb-4">
        <AutoComplete v-model="selectedOperation" inputId="operation" :suggestions="filteredOperation"
          @complete="searchOperation($event)" field="KullaniciAdi" @item-select="operationSelected($event)" />
        <label for="operation">Operation</label>
      </span>
      <span class="p-float-label mb-4">
        <AutoComplete v-model="selectedFinanceman" inputId="financeman" :suggestions="filteredFinanceman"
          @complete="searchFinanceman($event)" field="KullaniciAdi" @item-select="financemanSelected($event)" />
        <label for="financeman">Finance</label>
      </span>
      <CustomInput :value="modelProduction.Pesinat" text="Prepayment" @onInput="modelProduction.Pesinat = $event"
        :disabled="prepaymentDisabledForm" v-if="!statusAlfa" />
      <table class="table mb-4">
        <thead>
          <tr>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Total</th>
            <td>{{ productCalculation | formatPriceUsd }}</td>
          </tr>
          <tr>
            <th scope="row">Freight Cost</th>
            <td>{{ freightCalculation | formatPriceUsd }}</td>
          </tr>
          <tr>
            <th scope="row">Total (Other)</th>
            <td>{{ detailCalculation | formatPriceUsd }}</td>
          </tr>
          <tr>
            <th scope="row">G.Total</th>
            <td>
              {{
              (productCalculation + freightCalculation + detailCalculation)
              | formatPriceUsd
              }}
            </td>
          </tr>
        </tbody>
      </table>

      <span class="p-float-label mb-4">
        <Calendar v-model="load_date" inputId="load_date" class="w-100" disabled dateFormat="dd/mm/yy" />
        <label for="load_date">Shipment Date</label>
      </span>
      <span class="p-float-label mb-4">
        <Calendar v-model="eta_date" inputId="eta_date" class="w-100" disabled dateFormat="dd/mm/yy" />
        <label for="eta_date">ETA</label>
      </span>
      <span class="p-float-label mb-4">
        <InputText id="container" v-model="modelProduction.KonteynerNo" class="w-100" disabled />
        <label for="container">Container No</label>
      </span>
      <table class="table mb-4">
        <thead>
          <tr>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Producer</th>
            <td>{{ detailProductCost.supplier | formatPriceUsd }}</td>
          </tr>
          <tr>
            <th scope="row">Labour Cost</th>
            <td>{{ detailProductCost.workerman | formatPriceUsd }}</td>
          </tr>
          <tr>
            <th scope="row">Freight Quote</th>
            <td>{{ detailProductCost.freight | formatPriceUsd }}</td>
          </tr>
          <tr>
            <th scope="row">Other (Cost)</th>
            <td>
              {{ detailProductCost.detail | formatPriceUsd }}
            </td>
          </tr>
          <tr>
            <th scope="row">Commission</th>
            <td>{{ detailProductCost.brokerage | formatPriceUsd }}</td>
          </tr>
          <tr>
            <th scope="row">Fob</th>
            <td>{{ detailProductCost.fob | formatPriceUsd }}</td>
          </tr>
          <tr>
            <th scope="row">G. Total</th>
            <td>
              {{
              (detailProductCost.supplier +
              detailProductCost.workerman +
              detailProductCost.freight +
              detailProductCost.detail +
              detailProductCost.brokerage +
              detailProductCost.fob)
              | formatPriceUsd
              }}
            </td>
          </tr>
          <tr>
            <th scope="row">Profit</th>
            <td>
              {{
              (productCalculation +
              freightCalculation +
              detailCalculation -
              (detailProductCost.supplier +
              detailProductCost.workerman +
              detailProductCost.freight +
              detailProductCost.detail +
              detailProductCost.brokerage +
              detailProductCost.fob))
              | formatPriceUsd
              }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import date from "~/plugins/date";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getOrdersAllList"]),
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
  },
  data() {
    return {
      selectedControlBoolean:false,
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
    controlBooleanSelected(event){
      this.modelProduction.SiparisKontrol = this.selectedControlBoolean;
    },
    inputPo(event) {
      const index = this.getOrdersAllList.find((x) => x.SiparisNo == event);
      if (index) {
        this.$toast.success("Bu po ya ait sipariş bulunmakta.");
      }
    },
    prePaymentIsActivated(event) {
      let prepayment = 0;
      this.productsList.forEach((product) => {
        prepayment += product.SatisToplam;
      });
      if (event == 1) {
        this.prepaymentDisabledForm = false;
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
      this.modelProduction.TahminiYuklemeTarihi = date.dateToString(event);
    },
    orderDateSelected(event) {
      this.modelProduction.SiparisTarihi = date.dateToString(event);
    },
    financemanSelected(event) {
      this.modelProduction.Finansman = event.value.ID;
    },
    searchFinanceman(event) {
      let results;
      if (event.query.length == 0) {
        results = this.user;
      } else {
        results = this.user.filter((x) => {
          return x.KullaniciAdi.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
      this.filteredFinanceman = results;
    },
    operationSelected(event) {
      this.modelProduction.Operasyon = event.value.ID;
      this.modelProduction.operationMail = event.value.MailAdres;
    },
    searchOperation(event) {
      let results;
      if (event.query.length == 0) {
        results = this.user;
      } else {
        results = this.user.filter((x) => {
          return x.KullaniciAdi.toLowerCase().startsWith(event.query.toLowerCase());
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
          return x.KullaniciAdi.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
      this.filteredOrderer = results;
    },
    ordererSelected(event) {
      this.modelProduction.SiparisSahibi = event.value.ID;

      this.modelProduction.representativeMail = event.value.MailAdres;
    },
    customerSelected(event) {
      this.modelProduction.MusteriID = event.value.ID;
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
      this.guess_loading_date = date.stringToDate(
        this.modelProduction.TahminiYuklemeTarihi
      );
      this.order_date = date.stringToDate(this.modelProduction.SiparisTarihi);
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
      this.load_date = date.stringToDate(this.modelProduction.YuklemeTarihi);
      this.eta_date = date.stringToDate(this.modelProduction.Eta);
      if (this.modelProduction.SiparisKontrol == null || this.modelProduction.SiparisKontrol == '' || this.modelProduction.SiparisKontrol == 'null') {
        this.selectedControlBoolean = false;
      } else {
        this.selectedControlBoolean = true;
      }
    },
  },
  watch: {},
};
</script>

<style scoped>
  @media screen and (max-width:576px) {
    .row{
      clear:both;
      display:block;
      width:100%;

    }
    .col-10{
      clear:both;
      display:block;
      width:100%;
    }
    .col-2{
      clear:both;
      display: block;
      width:100%;
    }
  }
</style>