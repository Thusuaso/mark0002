<template>
  <div>
    <currencyApi
      @dateSelectedEmit="dateSelected($event)"
      @rateFetchedEmit="rateFetched($event)"
    />
    <div class="row mt-3">
      <div class="col">
        <span class="p-float-label">
          <AutoComplete
            v-model="selectedCompany"
            inputId="company"
            :suggestions="filteredCompany"
            field="FirmaAdi"
            @complete="searchCompany($event)"
            :disabled="!currency"
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
            :disabled="!currency"
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
          :disabled="!currency"
          @change="invoiceSelected($event)"
        />
      </div>
      <!-- <div class="col">
        <span class="p-float-label">
          <Calendar
            v-model="containerdate"
            inputId="date"
            @date-select="containerDateSelected($event)"
            :disabled="disabled"
            dateFormat="dd/mm/yy"
          />
          <label for="date">Tarih</label>
        </span>
      </div> -->
      <div class="col">
        <span class="p-float-label">
          <InputText id="invoiceno" v-model="invoiceno" :disabled="!currency" />
          <label for="invoiceno">Invoice No</label>
        </span>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col">
        <CustomInput
          :value="tl"
          text="₺"
          @onInput="inputTl($event)"
          :disabled="!currency"
        />
      </div>
      <!-- <div class="col">
        <CustomInput
          :value="currency"
          text="Currency ($)"
          @onInput="currency = $event"
          :disabled="disabled_input"
        />
      </div> -->
      <div class="col">
        <CustomInput
          :value="usd"
          text="$"
          @onInput="inputUsd($event)"
          :disabled="!currency"
        />
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
            :disabled="!currency"
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
import server from "../../../plugins/excel.server";
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
      disabled_input: true,
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
      invoice_document_id: 0,
    };
  },
  methods: {
    rateFetched(event) {
      this.currency = event.rate;
    },
    dateSelected(event) {
      this.containerdate = date.dateToString(event);
    },
    invoiceSelected(event) {
      if (event.value.id == 7) {
        this.invoice_document_id = 70;
      } else {
        this.invoice_document_id = 50;
      }
    },
    inputUsd(event) {
      this.usd = event;
      this.tl = event * this.currency;
    },
    inputTl(event) {
      this.tl = event;
      this.usd = event / this.currency;
    },
    onUpload(event) {
      upload.sendInvoiceShipping(
        event.files[0],
        this.getContainerResults.FirmaID,
        this.getContainerResults.FaturaNo + ".pdf"
      );
      const data = {
        invoicedocumentid: this.invoice_document_id,
        invoiceid: this.getContainerResults.ID,
        ...this.containerdata,
      };
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
        date: this.containerdate,
        tl: this.tl,
        usd: this.usd,
        currency: this.currency,
        description: this.description,
        userId: Cookies.get("userId"),
        nowDate: date.dateToString(new Date()),
        invoicekindid: this.selectedInvoice.id,
      };

      this.$store.dispatch("setContainerInputSave", this.containerdata);
      const log = {
        description:
          this.selectedPo.SiparisNo +
          " po ya " +
          this.invoiceno +
          " fatura no ile " +
          this.selectedInvoice.name +
          " faturası $" +
          this.usd.toFixed(4) +
          " ve $" +
          this.currency.toFixed(4) +
          " kur girilmiştir.",
        po: this.selectedPo.SiparisNo,
        color: "#ffec31",
      };
      this.$logs.save(log);
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
      server
        .get("/finance/doviz/liste/" + year + "/" + month + "/" + day)
        .then((response) => {
          this.currency = parseFloat(response.data);
          this.disabled_input = false;
        });
      // currency.getDateCurrency(year, month, day).then((response) => {
      //   this.currency = response;
      // });
    },
    searchPo(event) {
      let result;
      if (event.query.length == 0) {
        result = this.orders;
      } else {
        result = this.orders.filter((x) => {
          return x.SiparisNo.toLowerCase().startsWith(
            event.query.toLowerCase()
          );
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
  .col-3 {
    clear: both;
    display: block;
    width: 100%;
  }
}
</style>
