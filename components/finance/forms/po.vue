<template>
  <div class="row mb-6" style="padding:50px 0px;">
    <div class="col-9">
      <div class="row mt-3">
        <div class="col">
          <span class="p-float-label">
            <InputText id="customer" v-model="po.FirmaAdi" disabled />
            <label for="customer">Customer</label>
          </span>
        </div>
        <div class="col">
          <span class="p-float-label">
            <InputText id="po" v-model="po.SiparisNo" disabled />
            <label for="po">Po</label>
          </span>
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
          <span class="p-float-label">
            <Calendar
              v-model="paid_date"
              inputId="date"
              @date-select="paidDateSelected($event)"
              dateFormat="dd/mm/yy"
            />
            <label for="date">Date</label>
          </span>
        </div>
        <div class="col">
          <CustomInput
            :value="model.Tutar"
            text="Paid Amount"
            @onInput="model.Tutar = $event"
            :disabled="false"
          />
        </div>
        <div class="col">
          <CustomInput
            :value="model.Masraf"
            text="Cost"
            @onInput="model.Masraf = $event"
            :disabled="false"
          />
        </div>
        <div class="col">
          <CustomInput
            :value="model.Kur"
            text="Rate"
            @onInput="model.Kur = $event"
            :disabled="false"
          />
        </div>
      </div>
      <div class="row mt-3">
        <div class="col">
          <span class="p-float-label">
            <Textarea v-model="model.Aciklama" rows="5" class="w-100" />
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
            @click="process"
          />
        </div>
        <div class="col">
          <Button
            type="button"
            class="p-button-danger w-100"
            label="Delete"
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
        <Column field="Tarih" header="Date">
          <template #body="slotProps">
            {{ slotProps.data.Tarih | dateToString }}
          </template>
        </Column>
        <Column field="Tutar" header="Price">
          <template #body="slotProps">
            {{ slotProps.data.Tutar | formatPriceUsd }}
          </template>
        </Column>
        <Column field="Masraf" header="Paid Amount">
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
import Cookies from "js-cookie";
import server from "@/plugins/excel.server";

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
      if(this.model.Kur == 0){
        this.$toast.error('Kur girilmesi zorunludur.');
      }else{
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

      }

    },
    paidDateSelected(event) {
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
