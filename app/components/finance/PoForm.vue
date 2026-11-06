<template>
  <div class="row mb-2" style="padding: 20px 0px">
    <TcmbCurrency
      @dateSelectedEmit="dateSelected($event)"
      @rateFetchedEmit="rateFetched($event)"
    />
    <div class="col-9">
      <div class="row mt-3">
        <div class="col">
          <FloatLabel>
            <InputText id="customer" v-model="po.FirmaAdi" disabled />
            <label for="customer">Customer</label>
          </FloatLabel>
        </div>
        <div class="col">
          <FloatLabel>
            <InputText id="po" v-model="po.SiparisNo" disabled />
            <label for="po">Po</label>
          </FloatLabel>
        </div>
        <div class="col">
          <CustomInput
            :value="po.Balanced"
            text="Balance"
            @onInput="po.Balanced = $event"
            :disabled="true"
          />
        </div>
      </div>
      <div class="row mt-3">
        <div class="col">
          <!-- <FloatLabel>
            <DatePicker
              v-model="paid_date"
              inputId="date"
              @date-select="paidDateSelected($event)"
              dateFormat="dd/mm/yy"
            />
            <label for="date">Date</label>
          </FloatLabel> -->
        </div>
        <div class="col">
          <CustomInput
            :value="model.Tutar"
            text="Paid Amount"
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
        <!-- <div class="col">
          <CustomInput
            :value="model.Kur"
            text="Rate"
            @onInput="model.Kur = $event"
            :disabled="false"
          />
        </div> -->
      </div>
      <div class="row mt-3">
        <div class="col">
          <FloatLabel>
            <Textarea
              v-model="model.Aciklama"
              rows="5"
              class="w-100"
              :disabled="!model.Kur"
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
            @click="process"
          />
        </div>
        <div class="col">
          <Button
            type="button"
            severity="danger" class="w-100"
            label="Delete"
            @click="deleteForm"
          />
        </div>
      </div>
    </div>
    <div class="col-12 col-lg-3">
      <DataTable
        :value="poPaidList"
        v-model:selection="selectedPoPaidList"
        selectionMode="single"
        @row-click="poPaidListSelected($event)"
      >
        <Column field="Tarih" header="Date">
          <template #body="slotProps">
            {{ dateToString(slotProps.data.Tarih) }}
          </template>
        </Column>
        <Column field="Tutar" header="Price">
          <template #body="slotProps">
            {{ formatPriceUsd(slotProps.data.Tutar) }}
          </template>
        </Column>
        <Column field="Masraf" header="Paid Amount">
          <template #body="slotProps">
            {{ formatPriceUsd(slotProps.data.Masraf) }}
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>
<script>
import { useFinanceStore } from "~/stores/finance"
import { toIsoDate, fromIsoDate } from "~/utils/dates"

export default {
  computed: {
    financeStore() {
      return useFinanceStore()
    },
  },
  props: {
    model: {
      type: Object,
      required: true,
    },
    po: {
      type: Object,
      required: true,
    },
    poPaidList: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      paid_date: null,
      paid_button_status: true,
      selectedPoPaidList: null,
    };
  },
  methods: {
    rateFetched(event) {
      this.model.Kur = event.rate;
    },
    dateSelected(event) {
      this.model.Tarih = toIsoDate(event);
    },
    deleteForm() {
      /* Yikici islem -- onay. Metin: app/utils/confirm.ts */
      if (!confirmAction()) return

      this.$emit("po_paid_delete_emit", {
        ...this.model,
      });
      this.paid_date = null;
    },
    poPaidListSelected(event) {
      this.financeStore.setFinancePoButtonStatus(false);
      this.paid_date = fromIsoDate(event.data.Tarih);
      this.model.Tarih = toIsoDate(event.data.Tarih);
      this.model.ID = event.data.ID;
      this.model.MusteriID = event.data.MusteriID;
      this.model.FirmaAdi = event.data.FirmaAdi;
      this.model.SiparisNo = event.data.SiparisNo;
      this.model.FinansOdemeTurID = event.data.FinansOdemeTurID;
      this.model.Aciklama = event.data.Aciklama;
      this.model.Tutar = event.data.Tutar;
      this.model.Masraf = event.data.Masraf;
      this.model.KullaniciID = useCookie("userId").value;
      this.model.KullaniciAdi = useCookie("username").value;
      this.model.Kur = event.data.Kur;
      this.model.BugunTarih = toIsoDate(new Date());
    },
    process() {
      if (this.model.Kur == 0) {
        useAppToast().error("Kur girilmesi zorunludur.");
      } else {
        this.model.MusteriID = this.po.MusteriID;
        this.model.Tarih = toIsoDate(this.model.Tarih);
        this.model.FirmaAdi = this.po.FirmaAdi;
        this.model.SiparisNo = this.po.SiparisNo;
        this.model.FinansOdemeTurID = 2;
        this.model.KullaniciID = useCookie("userId").value;
        this.model.KullaniciAdi = useCookie("username").value;
        this.model.BugunTarih = toIsoDate(new Date());
        this.$emit("po_paid_process_emit", this.model);
        this.paid_date = null;
      }
    },
    paidDateSelected(event) {
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
@media screen and (max-width: 576px) {
  .row {
    clear: both;
    display: block;
    width: 100%;
  }
  .col-9 {
    clear: both;
    display: block;
    width: 100%;
  }
  .col-3 {
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
