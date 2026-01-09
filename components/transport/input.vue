<template>
  <div class="container">
    <currencyApi
      @dateSelectedEmit="dateSelected($event)"
      @rateFetchedEmit="rateFetched($event)"
    />
    <div class="row mb-3">
      <div class="col">
        <Button
          type="button"
          class="p-button-primary"
          label="New Company"
          @click="newCompany"
        />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-3">
        <span class="p-float-label">
          <AutoComplete
            v-model="selectedCompany"
            inputId="company"
            :suggestions="filteredCompany"
            field="FirmaAdi"
            @complete="searchCompany($event)"
            :disabled="!this.currency"
          />
          <label for="company">Company</label>
        </span>
      </div>
      <!-- <div class="col-3">
        <span class="p-float-label">
          <Calendar
            v-model="transportdate"
            inputId="date"
            @date-select="transportDateSelected($event)"
            :disabled="disabled"
            dateFormat="dd/mm/yy"
          />
          <label for="date">Date</label>
        </span>
      </div> -->
      <div class="col-3">
        <span class="p-float-label">
          <InputText
            id="invoiceno"
            v-model="invoiceno"
            :disabled="!this.currency"
          />
          <label for="invoiceno">Invoice No</label>
        </span>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <span class="p-float-label">
          <AutoComplete
            v-model="selectedPo"
            inputId="po"
            :suggestions="filteredPo"
            field="SiparisNo"
            @complete="searchPo($event)"
            :disabled="!this.currency"
          />
          <label for="po">Order No</label>
        </span>
      </div>
      <div class="col">
        <CustomInput
          :value="tl"
          text="₺"
          @onInput="inputTl($event)"
          :disabled="!this.currency"
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
          :disabled="!this.currency"
        />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <Button
          type="button"
          class="p-button-primary w-100"
          label="New"
          @click="newForm"
          :disabled="newButtonDisabled"
        />
      </div>
      <div class="col">
        <Button
          type="button"
          class="p-button-success w-100"
          label="Save"
          @click="save"
          :disabled="saveButtonDisabled"
        />
      </div>
      <div class="col">
        <Button
          type="button"
          class="p-button-warning w-100"
          label="Update"
          @click="update"
          :disabled="updateButtonDisabled"
        />
      </div>
      <div class="col">
        <Button
          type="button"
          class="p-button-danger w-100"
          label="Delete"
          @click="deleteForm"
          :disabled="deleteButtonDisabled"
        />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <DataTable
          :value="transportList"
          :selection.sync="selectedTransport"
          selectionMode="single"
          @row-click="transportSelected($event)"
        >
          <Column field="companyName" header="Company"></Column>
          <Column field="po" header="Po"></Column>
          <Column field="invoiceno" header="Invoice No"></Column>
          <Column field="date" header="Date">
            <template #body="slotProps">
              {{ slotProps.data.date }}
            </template>
          </Column>
          <Column field="tl" header="Tl">
            <template #body="slotProps">
              {{ slotProps.data.tl | formatPriceTl }}
            </template>
          </Column>
          <Column field="currency" header="Currency">
            <template #body="slotProps">
              {{ slotProps.data.currency | formatPriceUsd }}
            </template>
          </Column>
          <Column field="usd" header="Usd">
            <template #body="slotProps">
              {{ slotProps.data.usd | formatPriceUsd }}
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <Button
          type="button"
          class="p-button-success w-100"
          label="Save"
          @click="saveTransport"
        />
      </div>
    </div>
    <div class="row">
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
import currency from "../../plugins/currency";
import date from "../../plugins/date";
import upload from "../../plugins/upload";
import Cookies from "js-cookie";
import server from "@/plugins/excel.server";

export default {
  props: {
    company: {
      type: Array,
      required: false,
    },
    orders: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      disabled_input: true,
      filteredCompany: null,
      selectedCompany: null,
      transportdate: null,
      invoiceno: null,
      selectedPo: null,
      filteredPo: null,
      tl: 0.0,
      currency: 0,
      usd: 0.0,
      disabled: true,
      newButtonDisabled: false,
      transportList: [],
      saveButtonDisabled: true,
      updateButtonDisabled: true,
      deleteButtonDisabled: true,
      selectedTransport: {},
    };
  },
  methods: {
    rateFetched(event) {
      this.currency = event.rate;
    },
    dateSelected(event) {
      this.transportdate = date.dateToString(event);
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
      upload.sendTransport(
        event.files[0],
        this.selectedCompany.ID,
        this.invoiceno
      );
      this.$store.dispatch("setTransportFileSave", this.transportList);
    },
    transportSelected(event) {
      this.disabled = false;
      this.saveButtonDisabled = true;
      this.updateButtonDisabled = false;
      this.deleteButtonDisabled = false;
      this.newButtonDisabled = true;
      this.selectedCompany = this.company.find(
        (x) => (x.ID = event.data.companyId)
      );
      this.transportdate = date.stringToDate(event.data.date);
      this.invoiceno = event.data.invoiceno;
      this.selectedPo = this.orders.find((x) => (x.SiparisNo = event.data.po));
      this.tl = event.data.tl;
      this.usd = event.data.usd;
      this.currency = event.data.currency;
    },
    saveTransport() {
      this.$store.dispatch("setTransportSave", this.transportList);
      this.reset();
      this.newButtonDisabled = false;
    },
    reset() {
      this.disabled = true;
      this.saveButtonDisabled = true;
      this.updateButtonDisabled = true;
      this.transportdate = null;
      this.selectedPo = null;
      this.tl = 0.0;
      this.currency = 0.0;
      this.usd = 0.0;
      this.selectedTransport = {};
      this.selectedCompany = null;
      this.invoiceno = null;
    },
    newForm() {
      this.disabled = false;
      this.newButtonDisabled = true;
      this.saveButtonDisabled = false;
      this.updateButtonDisabled = true;
      this.deleteButtonDisabled = true;
    },
    save() {
      const data = {
        id: Math.random().toString(36).substr(2, 9),
        companyId: this.selectedCompany.ID,
        companyName: this.selectedCompany.FirmaAdi,
        date: date.dateToString(this.transportdate),
        po: this.selectedPo.SiparisNo,
        tl: this.tl,
        currency: this.currency,
        usd: this.usd,
        invoiceno: this.invoiceno,
        nowDate: date.dateToString(new Date()),
        userId: Cookies.get("userId"),
      };
      const log = {
        description:
          this.selectedPo.SiparisNo +
          " po ya " +
          this.invoiceno +
          " fatura no ile Nakliye Faturası $" +
          this.usd.toFixed(4) +
          " ve $" +
          this.currency.toFixed(4) +
          " kur girilmiştir.",
        po: this.selectedPo.SiparisNo,
        color: "#ffec31",
      };
      this.$logs.save(log);

      this.transportList.push(data);
      this.reset();
      this.newButtonDisabled = false;
    },
    update() {
      const index = this.transportList.findIndex(
        (x) => x.id == this.selectedTransport.id
      );
      this.transportList[index].companyId = this.selectedCompany.ID;
      this.transportList[index].companyName = this.selectedCompany.FirmaAdi;
      this.transportList[index].date = date.dateToString(this.transportdate);
      this.transportList[index].po = this.selectedPo.SiparisNo;
      this.transportList[index].tl = this.tl;
      this.transportList[index].currency = this.currency;
      this.transportList[index].usd = this.usd;
      this.transportList[index].invoiceno = this.invoiceno;
      this.reset();
      this.newButtonDisabled = false;
    },
    deleteForm() {
      const index = this.transportList.findIndex(
        (x) => x.id == this.selectedTransport.id
      );
      this.transportList.splice(index, 1);
      this.reset();
      this.newButtonDisabled = false;
    },
    usdInput(event) {
      this.tl = event * this.currency;
    },
    tlInput(event) {
      this.usd = event / this.currency;
    },
    transportDateSelected(event) {
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
    newCompany() {
      this.$emit("new-company-form-dialog");
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
