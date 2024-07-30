<template>
  <div class="row mb-6" style="padding:50px 0px;">
    <div class="col-9">
      <div class="row mt-3">
        <div class="col">
          <span class="p-float-label">
            <InputText id="customer" v-model="po.musteriadi" disabled />
            <label for="customer">Customer</label>
          </span>
        </div>
        <div class="col">
          <span class="p-float-label">
            <InputText id="po" v-model="po.siparisno" disabled />
            <label for="po">Po</label>
          </span>
        </div>
        <div class="col">
          <CustomInput :value="po.kalan" text="Balance" @onInput="po.kalan = $event" :disabled="true" />
        </div>
      </div>
      <div class="row mt-3">
        <div class="col">
          <span class="p-float-label">
            <Calendar v-model="paid_date" inputId="date" @date-select="paidDateSelected($event)" dateFormat="dd/mm/yy"/>
            <label for="date">Date</label>
          </span>
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
          <span class="p-float-label">
            <Textarea v-model="model.aciklama" rows="5" class="w-100" />
            <label>Description</label>
          </span>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col">
          <Button type="button" class="p-button-success w-100" label="Save" @click="process" />
        </div>
        <div class="col">
          <Button type="button" class="p-button-danger w-100" label="Delete" @click="deleteForm" />
        </div>
      </div>
    </div>
    <div class="col-3">
      <DataTable :value="poPaidList" :selection.sync="selectedPoPaidList" selectionMode="single"
        @row-click="poPaidListSelected($event)">
        <Column field="Tarih" header="Date">
          <template #body="slotProps">
            {{ slotProps.data.tarih | dateToString }}
          </template>
        </Column>
        <Column field="Tutar" header="Price">
          <template #body="slotProps">
            {{ slotProps.data.tutar | formatPriceUsd }}
          </template>
        </Column>

      </DataTable>
    </div>
  </div>
</template>
<script>
import date from "@/plugins/date";
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
      this.paid_date = date.stringToDate(event.data.tarih);
      this.model.id = event.data.id;
      this.model.musteri_id = event.data.musteri_id;
      this.model.musteriadi = event.data.musteriadi;
      this.model.siparisno = event.data.siparisno;
      this.model.FinansOdemeTurID = 1;
      this.model.aciklama = event.data.aciklama;
      this.model.kalan = event.data.kalan;
      this.model.tutar = event.data.tutar;

      this.model.masraf = event.data.masraf;
      this.model.KullaniciID = Cookies.get("userId");
      this.model.KullaniciAdi = Cookies.get("username");
      this.model.kur = event.data.kur;
      this.model.BugunTarih = date.dateToString(new Date());
    },
    process() {
      this.model.musteri_id = this.po.musteri_id;
      this.model.tarih = date.dateToString(this.paid_date);
      this.model.musteriadi = this.po.musteriadi;
      this.model.siparisno = this.po.siparisno;
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
      server
        .get("/finance/doviz/liste/" + year + "/" + month + "/" + day)
        .then((response) => {
          this.model.kur = parseFloat(response.data);
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
