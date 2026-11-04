<template>
  <div class="row mb-6" style="padding:50px 0px;">
    <div class="col-9">
      <div class="row mt-3">
        <div class="col">
          <FloatLabel>
            <InputText id="customer" v-model="po.musteriadi" disabled />
            <label for="customer">Customer</label>
          </FloatLabel>
        </div>
        <div class="col">
          <FloatLabel>
            <InputText id="po" v-model="po.siparisno" disabled />
            <label for="po">Po</label>
          </FloatLabel>
        </div>
        <div class="col">
          <CustomInput :value="po.kalan" text="Balance" @onInput="po.kalan = $event" :disabled="true" />
        </div>
      </div>
      <div class="row mt-3">
        <div class="col">
          <FloatLabel>
            <DatePicker v-model="paid_date" inputId="date" @date-select="paidDateSelected($event)" dateFormat="dd/mm/yy"/>
            <label for="date">Date</label>
          </FloatLabel>
        </div>
        <div class="col">
          <CustomInput :value="model.tutar" text="Paid Amount" @onInput="model.tutar = $event" :disabled="false" />
        </div>
        <div class="col">
          <CustomInput :value="model.masraf" text="Cost" @onInput="model.masraf = $event" :disabled="false" />
        </div>
        <div class="col">
          <CustomInput :value="model.kur" text="Rate" @onInput="model.kur = $event" :disabled="false" />
        </div>
      </div>
      <div class="row mt-3">
        <div class="col">
          <FloatLabel>
            <Textarea v-model="model.aciklama" rows="5" class="w-100" />
            <label>Description</label>
          </FloatLabel>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col">
          <Button type="button" severity="success" class="w-100" label="Save" @click="process" />
        </div>
        <div class="col">
          <Button type="button" severity="danger" class="w-100" label="Delete" @click="deleteForm" />
        </div>
      </div>
    </div>
    <div class="col-3">
      <DataTable :value="poPaidList" v-model:selection="selectedPoPaidList" selectionMode="single"
        @row-click="poPaidListSelected($event)">
        <Column field="Tarih" header="Date">
          <template #body="slotProps">
            {{ dateToString(slotProps.data.tarih) }}
          </template>
        </Column>
        <Column field="Tutar" header="Price">
          <template #body="slotProps">
            {{ formatPriceUsd(slotProps.data.tutar) }}
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
    deleteForm() {
      this.$emit("po_paid_delete_emit", {
        ...this.model,
        Tarih: toIsoDate(this.paid_date),
      });
      this.paid_date = null;
    },
    poPaidListSelected(event) {
      
      this.financeStore.setFinancePoButtonStatus(false);
      this.paid_date = fromIsoDate(event.data.tarih);
      this.model.id = event.data.id;
      this.model.musteri_id = event.data.musteri_id;
      this.model.musteriadi = event.data.musteriadi;
      this.model.siparisno = event.data.siparisno;
      this.model.FinansOdemeTurID = 1;
      this.model.aciklama = event.data.aciklama;
      this.model.kalan = event.data.kalan;
      this.model.tutar = event.data.tutar;

      this.model.masraf = event.data.masraf;
      this.model.KullaniciID = useCookie("userId").value;
      this.model.KullaniciAdi = useCookie("username").value;
      this.model.kur = event.data.kur;
      this.model.BugunTarih = toIsoDate(new Date());
    },
    process() {
      this.model.musteri_id = this.po.musteri_id;
      this.model.tarih = toIsoDate(this.paid_date);
      this.model.musteriadi = this.po.musteriadi;
      this.model.siparisno = this.po.siparisno;
      this.model.FinansOdemeTurID = 2;
      this.model.KullaniciID = useCookie("userId").value;
      this.model.KullaniciAdi = useCookie("username").value;
      this.model.BugunTarih = toIsoDate(new Date());
      this.$emit("po_paid_process_emit", this.model);
      this.paid_date = null;
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
          this.model.kur = parseFloat(rate);
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
    .col-9{
      clear:both;
      display:block;
      width:100%;
    }
    .col-3{
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
