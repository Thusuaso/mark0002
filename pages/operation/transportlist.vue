<template>
  <div class="container ">
    <transportList :list="getTransportList" @selected_transport_emit="selectedTransport($event)" />
    <Dialog :visible.sync="transport_dialog_form" modal header="">
      <div class="row mt-3 mb-3">
        <div class="col">

          <span class="p-float-label">
            <Calendar v-model="selectedDate" @date-select="dateSelected($event)" dateFormat="dd/mm/yy"
              :showIcon="true" />
            <label for="username">Date</label>
          </span>
        </div>
        <div class="col">
          <span class="p-float-label">
            <AutoComplete v-model="selectedPo" inputId="po" :suggestions="filteredPo" field="SiparisNo"
              @complete="searchPo($event)" @item-select="poSelected($event)" />
            <label for="po">Order No</label>
          </span>
        </div>
        <div class="col">
          <span class="p-float-label">
            <InputText id="invoice" type="text" v-model="model.invoice" />
            <label for="invoice">Invoice</label>
          </span>
        </div>

      </div>
      <div class="row" style="height:150px;">
        <div class="col">
          <CustomInput :value="model.tl" text="TL" @onInput="model.tl = $event" />
        </div>
        <div class="col">
          <CustomInput :value="model.usd" text="USD" @onInput="model.usd = $event" />
        </div>
        <div class="col">
          <CustomInput :value="model.currency" text="Currency" @onInput="model.currency = $event" />
        </div>

      </div>
      <div class="row">
        <div class="col">
          <Button class="p-button-warning w-100" label="Update" @click="updateTransport"/>
        </div>
        <div class="col">
          <Button class="p-button-danger w-100" label="Delete" @click="deleteTransport"/>
        </div>

      </div>
    </Dialog>
  </div>

</template>
<script>
import { mapGetters } from "vuex";
import date from '../../plugins/date';
import server from "@/plugins/excel.server";

export default {
  // middleware: ["authority"],
  computed: {
    ...mapGetters(["getTransportList","getOrdersAllList"]),
  },
  created() {
    this.$store.dispatch("setTransportList");
  },
  data() {
    return {
      transport_dialog_form: false,
      model: {
        date: '',
        po: '',
        company: '',
        invoice: '',
        tl: 0,
        usd: 0,
        currency: 0,
        transportId: 0,
        productInvoiceId:0
      },
      selectedDate: new Date(),
      selectedPo: null,
      filteredPo:null

    }
  },
  methods: {
    deleteTransport(){
      this.$store.dispatch('setBeginLoadingAction');
      this.$store.dispatch('setDeleteTransport',this.model)
      .then(response=>{
        if (response) {
          this.$store.dispatch('setEndLoadingAction');
          this.$toast.success('Successfully Updated');
        } else {
          this.$store.dispatch('setEndLoadingAction');

          this.$toast.error('Error Updated');
        }
      })
    },
    updateTransport() {
      this.$store.dispatch('setBeginLoadingAction');

      this.$store.dispatch('setUpdateTransport', this.model)
        .then(res => {
          if (res) {
            this.$store.dispatch('setEndLoadingAction');
            this.$toast.success('Successfully Updated');
          } else {
            this.$store.dispatch('setEndLoadingAction');

            this.$toast.error('Error Updated');

        }
      })
    },
    dateSelected(event){
      const date = new Date(event);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      server
        .get("/finance/doviz/liste/" + year + "/" + month + "/" + day)
        .then((response) => {
          this.model.currency = parseFloat(response.data);
        });
    },
    poSelected(event) {
      this.model.po = event.value.SiparisNo;
    },
    searchPo(event) {
      let result;
      if (event.query.length == 0) {
        result = this.getOrdersAllList;
      } else {
        result = this.getOrdersAllList.filter((x) => {
          return x.SiparisNo.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
      this.filteredPo = result;
    },
    selectedTransport(event) {
      this.transport_dialog_form = true;
      this.selectedDate = date.stringToDate(event.Tarih);
      this.model.po = event.SiparisNo;
      this.model.company = event.firma_adi;
      this.model.invoice = event.FaturaNo;
      this.model.tl = (event.Tutar * event.Kur);
      this.model.usd = event.Tutar;
      this.model.currency = event.Kur;
      this.model.date = date.dateToString(event.Tarih);
      this.model.transportId = event.NakliyeID;
      this.model.productInvoiceId = event.SiparisFaturaID;
      this.selectedPo = this.getOrdersAllList.find(x => x.SiparisNo == event.SiparisNo);

    }
  }
};
</script>
