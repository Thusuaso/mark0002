<template>
  <div>
    <div class="row mt-3">
      <div class="col">
        <FloatLabel>
          <DatePicker
            v-model="payment_date"
            inputId="payment_date"
            @date-select="paymentDateSelected($event)"
            :disabled="advanced_payment_disabled"
            dateFormat="dd/mm/yy"
          />
          <label for="payment_date">Date</label>
        </FloatLabel>
      </div>
      <div class="col">
        <FloatLabel>
          <InputText id="po" v-model="model.SiparisNo" disabled />
          <label for="po">Po</label>
        </FloatLabel>
      </div>
      <div class="col">
        <CustomInput
          :value="model.Tutar"
          text="Price"
          @onInput="model.Tutar = $event"
          :disabled="advanced_payment_disabled"
        />
      </div>
      <div class="col">
        <CustomInput
          :value="model.Kur"
          text="Currency"
          @onInput="model.Kur = $event"
          :disabled="advanced_payment_disabled"
        />
      </div>
      <div class="col">
        <CustomInput
          :value="model.Masraf"
          text="Cost"
          @onInput="model.Masraf = $event"
          :disabled="advanced_payment_disabled"
        />
      </div>
    </div>
    <div class="row mt-3">
      <div class="col">
        <FloatLabel>
          <Textarea
            v-model="model.Aciklama"
            rows="5"
            class="w-100"
            :disabled="advanced_payment_disabled"
          />
          <label>Description</label>
        </FloatLabel>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col">
        <Button
          type="button"
          severity="success" class="w-100"
          label="Save"
          :disabled="advanced_payment_disabled"
          @click="save"
        />
      </div>
      <div class="col">
        <Button
          type="button"
          severity="warn" class="w-100"
          label="Cancel"
          :disabled="advanced_payment_disabled"
          @click="cancel"
        />
      </div>
    </div>
    <DataTable
      :value="list"
      v-model:selection="selectedAdvancedPayment"
      selectionMode="single"
      @row-click="advancedPaymentSelected($event)"
    >
      <Column field="FirmaAdi" header="Customer"></Column>
      <Column field="SiparisNo" header="Po"></Column>
      <Column field="Kalan" header="Price">
        <template #body="slotProps">
          {{ formatPriceUsd(slotProps.data.Kalan) }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script>
import { useModelsStore } from "~/stores/models"
import { toIsoDate, fromIsoDate } from "~/utils/dates"

export default {
  computed: {
    modelsStore() {
      return useModelsStore()
    },
  },

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
      this.modelsStore.setFinancePaymentModel();
    },
    save() {
      this.model.BugunTarih = toIsoDate(new Date());
      this.model.KullaniciID = useCookie("userId").value;
      this.model.KullaniciAdi = useCookie("username").value;
      this.$emit("advanced_payment_save_emit", this.model);
      this.advanced_payment_disabled = true;
      this.payment_date = null;
      this.selectedAdvancedPayment = null;
      this.modelsStore.setFinancePaymentModel();
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
      this.model.Tarih = toIsoDate(event);

      /*
       * Kur artik EXCEL SUNUCUSUNDAN DEGIL, Nitro'dan geliyor:
       * server/routes/tcmb-api/usd/[kind]/[year]/[month]/[day].get.ts
       * (Python tarafindan kurtulma planinin 2. adimi).
       *
       * year/month/day hesabi KALKTI -- useTcmb() tarihi kendisi
       * parcaliyor. Hafta sonu/tatil icin geriye yurume de
       * sunucuda yapiliyor.
       *
       * DUZELTILDI -- .catch() YOKTU: Excel sunucusu ulasilamazsa
       * kullanici hicbir sey gormuyor ve Kur ESKI degerinde
       * kaliyordu; sonra kaydederse YANLIS kurla kayit olusuyordu.
       */
      useTcmb()
        .getUSDRate(event, "banknote")
        .then(({ rate }) => {
          this.model.Kur = parseFloat(rate);
        })
        .catch((err) => {
          console.error("kur alinamadi:", err);
          useAppToast().error("Döviz kuru alınamadı.");
        });
    },
  },
};
</script>
<style scoped>
 @media screen and (max-width:576px) {
    .row{
      clear:both;
      display:block;
      width:100%;
    }
    .col{
      clear:both;
      display:block;
      width:100%;
    }
 }
</style>
