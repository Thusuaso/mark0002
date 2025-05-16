<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <Button type="button" class="p-button-success w-100" label="New Quotes" @click="newOffer" />
      </div>
      <div class="col">
        <Button type="button" class="p-button-primary w-100" label="Current Quotes" @click="offers" />
      </div>
      <div class="col">
        <Button type="button" class="p-button-secondary w-100" label="Old Quotes" @click="oldOffers" />
      </div>
    </div>
    <offerList :list="getOfferList" :country="getOfferCountryList" @offer_list_selected_emit="offerListSelected($event)"
      @offer_list_b_list_selected_emit="offerBListSelected($event)" />
    <Dialog :visible.sync="offer_list_detail" header="" modal :closeOnEscape="false">
      <offerDetail :list="getOfferDetailList" :bList="getOfferDetailBList"
        @offer_detail_list_form_selected_emit="offerDetailListFormSelected($event)" :aListTotal="getOfferDetailTotalA"
        :bListTotal="getOfferDetailTotalB" />
    </Dialog>
    <Dialog :visible.sync="offer_list_detail_form" :header="offer_id" modal :closeOnEscape="false">
      <offerForm :model="model" :category="getOfferCategoryList" :product="getOfferProductList" :size="getOfferSizeList"
        :thickness="getOfferThicknessList" :surface="getOfferSurfaceList" :unit="getOfferUnitList"
        :productsList="getOfferDetailProductsList" :modelProduct="getOfferProductModel" :status="getOfferButtonStatus"
        :customer="getOfferCustomerList" :country="getCountryList" :customerModel="getOfferCustomerModel"
        @offer_process_emit="offerProcess($event)" :id="getOfferId" @offer_delete_emit="offerDelete($event)"
        :disabled_button_status="disabled_offer_button_status" />
    </Dialog>
    <Dialog :visible.sync="offer_list_detail_old" header="Old Quotes" :closeOnEscape="false" modal>
      <offerOld :list="getOfferOldList" @old_offers_selected_emit="oldOfferSelected($event)"></offerOld>
    </Dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Cookies from "js-cookie";
export default {
  middleware: ["authority"],
  computed: {
    ...mapGetters([
      "getOfferList",
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
      "getOfferDetailBList",
      "getOfferDetailTotalA",
      "getOfferDetailTotalB",
      "getOfferOldList",
    ]),
  },
  data() {
    return {
      offer_list_detail: false,
      offer_list_detail_form: false,
      model: {},
      offer_updated_list_form: false,
      offer_id: null,
      offer_list_detail_old: false,
      disabled_offer_button_status:false,
    };
  },
  created() {
    this.$store.dispatch("setOfferMainList");
    this.$store.dispatch("setOfferSharedList");
    this.$store.dispatch("setOfferCustomerList");
    this.$store.dispatch("setCountryList");
  },
  methods: {
    oldOfferSelected(event) {
      this.model = event.data;
      this.$store.dispatch("setOfferDetailProductsList", event.data.Id);
      this.$store.dispatch("setOfferButtonStatus", false);
      this.$store.dispatch("setOfferId", event.data.Id);
      this.offer_id = event.data.Sira;
      this.offer_list_detail_form = true;
    },
    offerBListSelected(event) {
      this.$store.dispatch("setOfferMainDetailBList", event.KullaniciId);
    },
    oldOffers() {
      this.$store.dispatch("setOfferOldList");
      this.$store.dispatch("setOfferAllButtonStatus", false);
      this.offer_list_detail_old = true;
    },
    offers() {
      this.offer_list_detail = true;
      this.offer_updated_list_form = true;
      this.$store.dispatch("setOfferDetailAllList");
      this.$store.dispatch("setOfferAllButtonStatus", true);
    },
    offerDelete(event) {
      const date = new Date();
       const year = date.getFullYear();
       const month = this.__zeroControl(date.getMonth() + 1);
       const day = this.__zeroControl(date.getDate());
       const hour = this.__zeroControl(date.getHours());
       const minute = this.__zeroControl(date.getMinutes());
       const now = day + '-' + month + '-' + year + ' ' + hour + ':' + minute; 
       const desc = `${event.offer.KullaniciAdi} adlı kullanıcı ${event.customer.MusteriAdi} müşterisine ${now} tarihli teklifini sildi.`;
       const log = {
        description:desc,
        po: '',
        color: "",
       }
       this.$logs.save(log);
        this.$store.dispatch("setOfferDelete", event.id);
        this.offer_list_detail_form = false;
    },
    newOffer() {
      this.$store.dispatch("setOfferAllButtonStatus", false);
      this.$store.dispatch("setOfferButtonStatus", true);
      this.$store.dispatch("setOfferModel");
      this.$store.dispatch("setOfferProductModel");
      this.$store.dispatch("setOfferCustomerModel");
      this.$store.dispatch("setOfferId", 0);
      this.$store.commit("setOfferDetailProductsList", []);
      this.offer_id = null;
      this.model = this.getOfferModel;
      this.offer_list_detail_form = true;
    },
    offerProcess(event) {
      if (this.getOfferButtonStatus) {
        const data = {
          customer:event.customer,
          offer:{...event.offer,"KullaniciId":Cookies.get('userId'),'KullaniciAdi':Cookies.get('username')}
        };
        this.save(data);
      } else {
        this.update(event);
      }
    },
    __zeroControl(event){
      if(event.toString().length == 1){
        return "0" + event.toString();
      }else{
        return event.toString();
      }
    },
    save(event) {
      this.disabled_offer_button_status = true;
       const date = new Date();
       const year = date.getFullYear();
       const month = this.__zeroControl(date.getMonth() + 1);
       const day = this.__zeroControl(date.getDate());
       const hour = this.__zeroControl(date.getHours());
       const minute = this.__zeroControl(date.getMinutes());
       const now = day + '-' + month + '-' + year + ' ' + hour + ':' + minute; 
       const desc = `${Cookies.get('username')} adlı kullanıcı ${event.customer.MusteriAdi} müşterisine ${now} tarihli teklif girişi yaptı.`;
       const log = {
        description:desc,
        po: '',
        color: "",
       }
       this.$logs.save(log);
      this.$store.dispatch("setOfferSave", event)
        .then(res => {
          if (res) {
            this.disabled_offer_button_status = false;

          } else {
            this.disabled_offer_button_status = false;

          }
    });
        
    },
    update(event) {
      const date = new Date();
       const year = date.getFullYear();
       const month = this.__zeroControl(date.getMonth() + 1);
       const day = this.__zeroControl(date.getDate());
       const hour = this.__zeroControl(date.getHours());
       const minute = this.__zeroControl(date.getMinutes());
       const now = day + '-' + month + '-' + year + ' ' + hour + ':' + minute; 
       const desc = `${Cookies.get('username')} adlı kullanıcı ${event.customer.MusteriAdi} müşterisine ${now} tarihli teklif güncellemesi yaptı.`;
       const log = {
        description:desc,
        po: '',
        color: "",
       }
       
      this.$logs.save(log);
      this.$store.dispatch("setOfferUpdate", event);
      this.offer_list_detail_form = false;
    },
    offerListSelected(event) {
      this.$store.dispatch("setOfferMainDetailList", event.KullaniciId);
      this.$store.dispatch("setOfferAllButtonStatus", false);

      this.offer_list_detail = true;
    },
    offerDetailListFormSelected(event) {
      this.model = event;
      this.$store.dispatch("setOfferDetailProductsList", event.Id);
      this.$store.dispatch("setOfferButtonStatus", false);
      this.$store.dispatch("setOfferId", event.Id);
      this.offer_id = event.Sira;
      this.offer_list_detail_form = true;
    },
  },
  mounted() {
    // this.$socket.socketIO.on("offers_updated_on", (payload) => {
    //   if (this.offer_updated_list_form) {
    //     this.$store.dispatch("setOfferDetailUpdatedAllEmit", payload.offer);
    //   }
    // });
    // this.$socket.socketIO.on("offers_deleted_on", (offerId) => {
    //   this.$store.dispatch("setOfferDetailDeletedAllEmit", offerId);
    // });
  },
};
</script>
