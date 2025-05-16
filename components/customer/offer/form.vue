<template>
  <div>
    <div class="row m-auto mb-3 mt-3">
      <div class="col">
        <span class="p-float-label">
          <InputText class="w-100" id="customer" type="text" v-model="model.MusteriAdi" />
          <label for="customer">Customer</label>
        </span>
      </div>
      <div class="col">
        <span class="p-float-label">
          <InputText class="w-100" id="company" type="text" v-model="model.Company" />
          <label for="company">Company</label>
        </span>
      </div>
      <div class="col">
        <span class="p-float-label">
          <AutoComplete
            v-model="selectedCountry"
            inputId="country"
            :suggestions="filteredCountry"
            field="UlkeAdi"
            @complete="searchCountry($event)"
            class="w-100"
          />
          <label for="country">Country</label>
        </span>
      </div>
    </div>
    <div class="row m-auto mb-3">
      <div class="col">
        <span class="p-float-label">
          <InputText class="w-100" id="email" type="text" v-model="model.Mail" />
          <label for="email">Mail</label>
        </span>
      </div>
      <div class="col">
        <span class="p-float-label">
          <InputText class="w-100" id="phone" type="text" v-model="model.Phone" />
          <label for="phone">Phone</label>
        </span>
      </div>
    </div>
    <div class="row m-auto mb-3">
      <div class="col">
        <span class="p-float-label">
          <Textarea v-model="model.Adress" rows="5" cols="30" class="w-100" />
          <label>Address</label>
        </span>
      </div>
      <div class="col">
        <span class="p-float-label">
          <Textarea v-model="model.Description" rows="5" cols="30" class="w-100" />
          <label>Description</label>
        </span>
      </div>
    </div>
    <div class="row m-auto mb-3">
      <div class="col">
        <Button
          text="button"
          class="p-button-success w-100"
          label="Save"
          @click="process"
        />
      </div>
      <div class="col" v-if="!button">
        <Button
          text="button"
          class="p-button-danger w-100"
          label="Delete"
          @click="deleteForm"
        />
      </div>
    </div>
    <hr/>
    <h3 class="text-center m-auto">Offer ID</h3>
    <div class="row">
      <div class="col-1" v-for="offer in offerData">
        <Button :label="offer.Sira" class="p-button-primary" @click="open_offer(offer)"/>
      </div>
    </div>
    <hr/>
    <Dialog :visible.sync="offer_list_detail_form" :header="offer_id" modal :closeOnEscape="false">
      <offerForm :model="offerModel" :category="getOfferCategoryList" :product="getOfferProductList" :size="getOfferSizeList"
        :thickness="getOfferThicknessList" :surface="getOfferSurfaceList" :unit="getOfferUnitList"
        :productsList="getOfferDetailProductsList" :modelProduct="getOfferProductModel" :status="getOfferButtonStatus"
        :customer="getOfferCustomerList" :country="getCountryList" :customerModel="getOfferCustomerModel"
        @offer_process_emit="offerProcess($event)" :id="getOfferId" @offer_delete_emit="offerDelete($event)"
        :disabled_button_status="disabled_offer_button_status" />
    </Dialog>
  </div>

</template>
<script>
import Cookies from "js-cookie";
import {mapGetters} from 'vuex';
export default {
  computed: {
    ...mapGetters([
    "getOfferCountryList",
      "getOfferDetailList",
      "getOfferCategoryList",
      "getOfferProductList",
      "getOfferSizeList",
      "getOfferThicknessList",
      "getOfferSurfaceList",
      "getOfferUnitList",
      "getOfferDetailProductsList",
      "getOfferProductModel",
      "getOfferButtonStatus",
      "getOfferCustomerList",
      "getCountryList",
      "getOfferCustomerModel",
      "getOfferModel",
      "getOfferId",
      "getOfferAllButtonStatus",

    ])

  },
  props: {
    model: {
      type: Object,
      required: true,
    },
    country: {
      type: Array,
      required: true,
    },
    button: {
      type: Boolean,
      required: true,
    },
    offerData:{
      type:Array,
      required:true
    }
  },
  data() {
    return {
      selectedCountry: null,
      filteredCountry: null,
      offer_list_detail_form: false,
      offer_id:null,
      offerModel:{},
      disabled_offer_button_status:false,


    };
  },
  created() {
    this.selectedCountry = this.country.find((x) => x.Id == this.model.UlkeId);
  },
  methods: {
    offerDelete(event){
      alert("Bu bölümde çalışmaz");
    },
    offerProcess(event){
      alert("Bu bölümde çalışmaz");

    },    
    open_offer(event){
      this.$axios.get(`/offer/customer/get/offer/${event.Id}`)
      .then(res=>{
        this.offerModel = res.data.list[0];
        this.$store.dispatch("setOfferButtonStatus", false);
        this.$store.dispatch("setOfferId", event.Id);
        this.$store.dispatch("setOfferDetailProductsList", event.Id);
        this.offer_id = event.Sira;
        this.offer_list_detail_form = true;

      });



    },
    deleteForm() {
      this.$store.dispatch("setOfferCustomerDelete", this.model.Id);
      this.$emit("offer_customer_dialog_close");
    },
    save() {
      this.model.UlkeId = this.selectedCountry.Id;
      this.model.UlkeAdi = this.selectedCountry.UlkeAdi;
      this.model.Kullanici = Cookies.get("userId");
      this.model.KullaniciAdi = Cookies.get("username");
      this.$store.dispatch("setOfferCustomerSave", this.model);
      this.$emit("offer_customer_dialog_close");
    },
    update() {
      this.model.UlkeId = this.selectedCountry.Id;
      this.model.UlkeAdi = this.selectedCountry.UlkeAdi;
      this.$store.dispatch("setOfferCustomerUpdate", this.model);
      this.$emit("offer_customer_dialog_close");
    },
    process() {
      if (this.button) {
        this.save();
      } else {
        this.update();
      }
    },
    searchCountry(event) {
      let results;
      if (event.query.length == 0) {
        results = this.country;
      } else {
        results = this.country.filter((x) => {
          return x.UlkeAdi.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
      this.filteredCountry = results;
    },
  },
};
</script>
<style scoped>
@media screen and (max-width:576px){
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
