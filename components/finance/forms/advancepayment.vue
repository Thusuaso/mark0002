<template>
  <div>
    <div class="row mt-3">
      <div class="col">
        <currencyApi
          @dateSelectedEmit="dateSelected($event)"
          @rateFetchedEmit="rateFetched($event)"
        />
      </div>
      <div class="col">
        <span class="p-float-label">
          <InputText id="po" v-model="model.SiparisNo" disabled />
          <label for="po">Po</label>
        </span>
      </div>
      <div class="col">
        <CustomInput
          :value="model.Tutar"
          text="Price"
          @onInput="model.Tutar = $event"
          :disabled="!model.Kur"
        />
      </div>

      <div class="col">
        <CustomInput
          :value="model.Masraf"
          text="Cost"
          @onInput="model.Masraf = $event"
          :disabled="!model.Kur"
        />
      </div>
    </div>
    <div class="row mt-3">
      <div class="col">
        <span class="p-float-label">
          <Textarea
            v-model="model.Aciklama"
            rows="5"
            class="w-100"
            :disabled="!model.Kur"
          />
          <label>Description</label>
        </span>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col">
        <Button
          type="button"
          class="p-button-success w-100"
          label="Save"
          :disabled="!model.Kur"
          @click="save"
        />
      </div>
      <div class="col">
        <Button
          type="button"
          class="p-button-warning w-100"
          label="Cancel"
          :disabled="!model.Kur"
          @click="cancel"
        />
      </div>
    </div>
    <DataTable
      :value="list"
      :selection.sync="selectedAdvancedPayment"
      selectionMode="single"
      @row-click="advancedPaymentSelected($event)"
    >
      <Column field="FirmaAdi" header="Customer"></Column>
      <Column field="SiparisNo" header="Po"></Column>
      <Column field="Kalan" header="Price">
        <template #body="slotProps">
          {{ slotProps.data.Kalan | formatPriceUsd }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script>
import date from "../../../plugins/date";
import Cookies from "js-cookie";
import server from "@/plugins/excel.server";

export default {
  props: {
    list: {
      type: Array,
      required: false,
    },
    model: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      payment_date: null,
      selectedAdvancedPayment: null,
      advanced_payment_disabled: true,
    };
  },
  methods: {
    rateFetched(event) {
      this.model.Kur = event.rate;
    },
    dateSelected(event) {
      this.model.Tarih = date.dateToString(event);
    },
    formatPoint(value) {
      if (value == null || value == " ") {
        return 0;
      } else {
        return value.replace(",", ".");
      }
    },
    cancel() {
      this.advanced_payment_disabled = true;
      this.payment_date = null;
      this.selectedAdvancedPayment = null;
      this.$store.dispatch("setFinancePaymentModel");
    },
    save() {
      if (this.model.Kur == 0) {
        this.$toast.error("Kur girilmesi zorunludur.");
      } else {
        this.model.BugunTarih = date.dateToString(new Date());
        this.model.KullaniciID = Cookies.get("userId");
        this.model.KullaniciAdi = Cookies.get("username");
        this.$emit("advanced_payment_save_emit", this.model);
        this.advanced_payment_disabled = true;
        this.payment_date = null;
        this.selectedAdvancedPayment = null;
        this.$store.dispatch("setFinancePaymentModel");
      }
    },
    advancedPaymentSelected(event) {
      this.model.MusteriID = event.data.MusteriID;
      this.model.FirmaAdi = event.data.FirmaAdi;
      this.model.SiparisNo = event.data.SiparisNo;
      this.model.FinansOdemeTurID = 1;
      this.model.Tutar = event.data.Kalan;
      this.advanced_payment_disabled = false;
    },
    paymentDateSelected(event) {
      this.model.Tarih = date.dateToString(event);

      const year = event.getFullYear();
      const month = event.getMonth() + 1;
      const day = event.getDate();
      server
        .get("/finance/doviz/liste/" + year + "/" + month + "/" + day)
        .then((response) => {
          this.model.Kur = parseFloat(response.data);
        });
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
}
</style>
