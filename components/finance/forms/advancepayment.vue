<template>
  <div>
    <div class="row mt-3">
      <div class="col">
        <span class="p-float-label">
          <Calendar
            v-model="payment_date"
            inputId="payment_date"
            @date-select="paymentDateSelected($event)"
            :disabled="advanced_payment_disabled"
          />
          <label for="payment_date">Date</label>
        </span>
      </div>
      <div class="col">
        <span class="p-float-label">
          <InputText id="po" v-model="model.SiparisNo" disabled />
          <label for="po">Po</label>
        </span>
      </div>
      <div class="col">
        <span class="p-float-label">
          <InputText
            id="pay"
            v-model="model.Tutar"
            :disabled="advanced_payment_disabled"
            @input="model.Tutar = formatPoint($event)"
          />
          <label for="pay">Price</label>
        </span>
      </div>
      <div class="col">
        <span class="p-float-label">
          <InputText
            id="currency"
            v-model="model.Kur"
            :disabled="advanced_payment_disabled"
            @input="model.Kur = formatPoint($event)"
          />
          <label for="currency">Currency</label>
        </span>
      </div>
      <div class="col">
        <span class="p-float-label">
          <InputText
            id="cost"
            v-model="model.Masraf"
            :disabled="advanced_payment_disabled"
            @input="model.Masraf = formatPoint($event)"
          />
          <label for="cost">Cost</label>
        </span>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col">
        <span class="p-float-label">
          <Textarea
            v-model="model.Aciklama"
            rows="5"
            class="w-100"
            :disabled="advanced_payment_disabled"
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
          :disabled="advanced_payment_disabled"
          @click="save"
        />
      </div>
      <div class="col">
        <Button
          type="button"
          class="p-button-warning w-100"
          label="Cancel"
          :disabled="advanced_payment_disabled"
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
      <Column field="Pesinat" header="Price">
        <template #body="slotProps">
          {{ slotProps.data.Pesinat | formatPriceUsd }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script>
import date from "../../../plugins/date";
import currency from "../../../plugins/currency";
import Cookies from "js-cookie";

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
      this.model.BugunTarih = date.dateToString(new Date());
      this.model.KullaniciID = Cookies.get("userId");
      this.model.KullaniciAdi = Cookies.get("username");
      this.$emit("advanced_payment_save_emit", this.model);
      this.advanced_payment_disabled = true;
      this.payment_date = null;
      this.selectedAdvancedPayment = null;
      this.$store.dispatch("setFinancePaymentModel");
    },
    advancedPaymentSelected(event) {
      this.model.MusteriID = event.data.MusteriID;
      this.model.FirmaAdi = event.data.FirmaAdi;
      this.model.SiparisNo = event.data.SiparisNo;
      this.model.FinansOdemeTurID = 1;
      this.model.Tutar = event.data.Pesinat;
      this.advanced_payment_disabled = false;
    },
    paymentDateSelected(event) {
      this.model.Tarih = date.dateToString(event);

      const year = event.getFullYear();
      const month = event.getMonth() + 1;
      const day = event.getDate();
      currency.getDateCurrency(year, month, day).then((response) => {
        this.model.Kur = response;
      });
    },
  },
};
</script>
