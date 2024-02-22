<template>
  <div>
    <div class="row mt-3">
      <div class="col">
        <span class="p-float-label">
          <AutoComplete
            v-model="selectedCompany"
            inputId="company"
            :suggestions="filteredCompany"
            field="FirmaAdi"
            @complete="searchCompany($event)"
            :disabled="disabled"
          />
          <label for="company">Company</label>
        </span>
      </div>
      <div class="col">
        <span class="p-float-label">
          <AutoComplete
            v-model="selectedPo"
            inputId="po"
            :suggestions="filteredPo"
            field="SiparisNo"
            @complete="searchPo($event)"
            :disabled="disabled"
          />
          <label for="po">Po</label>
        </span>
      </div>
      <div class="col">
        <Dropdown
          v-model="selectedInvoice"
          :options="invoice"
          optionLabel="name"
          placeholder="Kind of Invoice"
          :disabled="disabled"
        />
      </div>
      <div class="col">
        <span class="p-float-label">
          <Calendar
            v-model="containerdate"
            inputId="date"
            @date-select="containerDateSelected($event)"
            :disabled="disabled"
          />
          <label for="date">Tarih</label>
        </span>
      </div>
      <div class="col">
        <span class="p-float-label">
          <InputText id="invoiceno" v-model="invoiceno" :disabled="disabled" />
          <label for="invoiceno">Invoice No</label>
        </span>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col">
        <span class="p-float-label">
          <InputNumber
            v-model="tl"
            locale="en-US"
            inputId="tlInput"
            :minFractionDigits="3"
            @input="tlInput($event)"
            :disabled="disabled"
          />
          <label for="tlInput">₺</label>
        </span>
      </div>
      <div class="col">
        <span class="p-float-label">
          <InputNumber
            v-model="currency"
            locale="en-US"
            inputId="currencyInput"
            :minFractionDigits="3"
            :disabled="disabled"
          />
          <label for="currencyInput">Currency ($)</label>
        </span>
      </div>
      <div class="col">
        <span class="p-float-label">
          <InputNumber
            v-model="usd"
            locale="en-US"
            inputId="usdInput"
            :minFractionDigits="3"
            @input="usdInput($event)"
            :disabled="disabled"
          />
          <label for="usdInput">$</label>
        </span>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col">
        <span class="p-float-label">
          <Textarea
            v-model="description"
            inputId="description"
            rows="5"
            class="w-100"
            :disabled="disabled"
          />
          <label for="description">Description</label>
        </span>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col">
        <Button
          type="button"
          class="p-button-secondary w-100"
          label="New"
          @click="newForm"
          :disabled="disabledNewForm"
        />
      </div>
      <div class="col">
        <Button
          type="button"
          class="p-button-success w-100"
          label="Save"
          @click="save"
          :disabled="disabledSaveForm"
        />
      </div>
    </div>
    <div class="row mt-3">
      <div class="col">
        <FileUpload
          mode="basic"
          accept=".pdf"
          :maxFileSize="1000000"
          @select="onUpload($event)"
        />
      </div>
    </div>
  </div>
</template>
<script>
import currency from "../../../plugins/currency";
import date from "../../../plugins/date";
import upload from "../../../plugins/upload";
import { mapGetters } from "vuex";
import Cookies from "js-cookie";

export default {
  computed: {
    ...mapGetters(["getContainerResults"]),
  },
  props: {
    company: {
      type: Array,
      required: false,
    },
    orders: {
      type: Array,
      required: false,
    },
    invoice: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      selectedCompany: null,
      filteredCompany: null,
      selectedPo: null,
      filteredPo: null,
      selectedInvoice: null,
      invoiceno: null,
      containerdate: new Date(),
      disabled: true,
      tl: 0.0,
      currency: 0.0,
      usd: 0.0,
      description: "",
      disabledNewForm: false,
      disabledSaveForm: true,
      containerdata: {},
    };
  },
  methods: {
    onUpload(event) {
      upload.sendInvoiceShipping(
        event.files[0],
        this.getContainerResults.FirmaID,
        this.getContainerResults.FaturaNo + ".pdf"
      );
      const data = { invoiceid: this.getContainerResults.ID, ...this.containerdata };
      this.$store.dispatch("setContainerInputFileSave", data);
    },
    reset() {
      this.selectedCompany = null;
      this.selectedPo = null;
      this.selectedInvoice = null;
      this.invoiceno = null;
      this.containerdate = new Date();
      this.disabled = true;
      this.tl = 0.0;
      this.currency = 0.0;
      this.usd = 0.0;
      this.description = "";
      this.disabledSaveForm = true;
      this.disabledNewForm = false;
    },
    save() {
      this.containerdata = {
        companyid: this.selectedCompany.ID,
        companyname: this.selectedCompany.FirmaAdi,
        po: this.selectedPo.SiparisNo,
        invoiceno: this.invoiceno,
        date: date.dateToString(this.containerdate),
        tl: this.tl,
        usd: this.usd,
        currency: this.currency,
        description: this.description,
        userId: Cookies.get("userId"),
        nowDate: date.dateToString(new Date()),
        invoicekindid: this.selectedInvoice.id,
      };
      this.$store.dispatch("setContainerInputSave", this.containerdata);
      this.reset();
    },
    newForm() {
      this.disabled = false;
      this.disabledNewForm = true;
      this.disabledSaveForm = false;
    },
    usdInput(event) {
      this.tl = event * this.currency;
    },
    tlInput(event) {
      this.usd = event / this.currency;
    },
    containerDateSelected(event) {
      const date = new Date(event);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      currency.getDateCurrency(year, month, day).then((response) => {
        this.currency = response;
      });
    },
    searchPo(event) {
      let result;
      if (event.query.length == 0) {
        result = this.orders;
      } else {
        result = this.orders.filter((x) => {
          return x.SiparisNo.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
      this.filteredPo = result;
    },
    searchCompany(event) {
      let result;
      if (event.query.length == 0) {
        result = this.company;
      } else {
        result = this.company.filter((x) => {
          return x.FirmaAdi.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
      this.filteredCompany = result;
    },
  },
};
</script>
