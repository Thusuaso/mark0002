<template>
  <div class="row">
    <div class="col-9">
      <div class="row mt-3">
        <div class="col">
          <span class="p-float-label">
            <InputText id="customer" v-model="po.FirmaAdi" disabled />
            <label for="customer">Müşteri</label>
          </span>
        </div>
        <div class="col">
          <span class="p-float-label">
            <InputText id="po" v-model="po.SiparisNo" disabled />
            <label for="po">Po</label>
          </span>
        </div>
        <div class="col">
          <span class="p-float-label">
            <InputText id="balance" v-model="po.Balanced" disabled />
            <label for="balance">Bakiye</label>
          </span>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col">
          <span class="p-float-label">
            <Calendar
              v-model="paid_date"
              inputId="date"
              @date-select="paidDateSelected($event)"
            />
            <label for="date">Tarih</label>
          </span>
        </div>
        <div class="col">
          <span class="p-float-label">
            <InputText id="amount" v-model="model.Tutar" />
            <label for="amount">Tutar</label>
          </span>
        </div>
        <div class="col">
          <span class="p-float-label">
            <InputText id="cost" v-model="model.Masraf" />
            <label for="cost">Masraf</label>
          </span>
        </div>
        <div class="col">
          <span class="p-float-label">
            <InputText id="currency" v-model="model.Kur" />
            <label for="currency">Kur</label>
          </span>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col">
          <span class="p-float-label">
            <Textarea v-model="model.Aciklama" rows="5" class="w-100" />
            <label>Açıklama</label>
          </span>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col">
          <Button
            type="button"
            class="p-button-success w-100"
            label="Kaydet"
            @click="process"
          />
        </div>
        <div class="col">
          <Button
            type="button"
            class="p-button-danger w-100"
            label="Sil"
            @click="deleteForm"
          />
        </div>
      </div>
    </div>
    <div class="col-3">
      <DataTable
        :value="poPaidList"
        :selection.sync="selectedPoPaidList"
        selectionMode="single"
        @row-click="poPaidListSelected($event)"
      >
        <Column field="Tarih" header="Tarih">
          <template #body="slotProps">
            {{ slotProps.data.Tarih | dateToString }}
          </template>
        </Column>
        <Column field="Tutar" header="Tutar">
          <template #body="slotProps">
            {{ slotProps.data.Tutar | formatPriceUsd }}
          </template>
        </Column>
        <Column field="Masraf" header="Masraf">
          <template #body="slotProps">
            {{ slotProps.data.Masraf | formatPriceUsd }}
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>
<script>
import date from "../../../plugins/date";
import currency from "../../../plugins/currency";
import Cookies from "js-cookie";

export default {
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
        Tarih: date.dateToString(this.paid_date),
      });
      this.paid_date = null;
    },
    poPaidListSelected(event) {
      this.$store.dispatch("setFinancePoButtonStatus", false);
      this.paid_date = date.stringToDate(event.data.Tarih);
      this.model.ID = event.data.ID;
      this.model.MusteriID = event.data.MusteriID;
      this.model.FirmaAdi = event.data.FirmaAdi;
      this.model.SiparisNo = event.data.SiparisNo;
      this.model.FinansOdemeTurID = event.data.FinansOdemeTurID;
      this.model.Aciklama = event.data.Aciklama;
      this.model.Tutar = event.data.Tutar;
      this.model.Masraf = event.data.Masraf;
      this.model.KullaniciID = Cookies.get("userId");
      this.model.KullaniciAdi = Cookies.get("username");
      this.model.Kur = event.data.Kur;
      this.model.BugunTarih = date.dateToString(new Date());
    },
    process() {
      this.model.MusteriID = this.po.MusteriID;
      this.model.Tarih = date.dateToString(this.paid_date);
      this.model.FirmaAdi = this.po.FirmaAdi;
      this.model.SiparisNo = this.po.SiparisNo;
      this.model.FinansOdemeTurID = 2;
      this.model.KullaniciID = Cookies.get("userId");
      this.model.KullaniciAdi = Cookies.get("username");
      this.model.BugunTarih = date.dateToString(new Date());
      this.$emit("po_paid_process_emit", this.model);
      this.paid_date = null;
    },
    paidDateSelected(event) {
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
