<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <Button
          type="button"
          class="p-button-success w-100"
          label="New"
          @click="newOffer"
        />
      </div>
      <div class="col">
        <Button
          type="button"
          class="p-button-primary w-100"
          label="Up to Date Offers"
          @click="offers"
        />
      </div>
      <div class="col">
        <Button
          type="button"
          class="p-button-secondary w-100"
          label="Old Offers"
          @click="oldOffers"
        />
      </div>
    </div>
    <offerList
      :list="getOfferList"
      :country="getOfferCountryList"
      @offer_list_selected_emit="offerListSelected($event)"
      @offer_list_b_list_selected_emit="offerBListSelected($event)"
      :loading="getLoading"
    />
    <Dialog :visible.sync="offer_list_detail" header="" modal :closeOnEscape="false">
      <offerDetail
        :list="getOfferDetailList"
        :bList="getOfferDetailBList"
        @offer_detail_list_form_selected_emit="offerDetailListFormSelected($event)"
        :loading="getLoading"
        :aListTotal="getOfferDetailTotalA"
        :bListTotal="getOfferDetailTotalB"

      />
    </Dialog>
    <Dialog :visible.sync="offer_list_detail_form" header="" modal :closeOnEscape="false">
      <offerForm
        :model="model"
        :category="getOfferCategoryList"
        :product="getOfferProductList"
        :size="getOfferSizeList"
        :thickness="getOfferThicknessList"
        :surface="getOfferSurfaceList"
        :unit="getOfferUnitList"
        :productsList="getOfferDetailProductsList"
        :modelProduct="getOfferProductModel"
        :status="getOfferButtonStatus"
        :customer="getOfferCustomerList"
        :country="getCountryList"
        :customerModel="getOfferCustomerModel"
        @offer_process_emit="offerProcess($event)"
        :id="getOfferId"
        @offer_delete_emit="offerDelete($event)"
      />
    </Dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
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
      "getLoading",
      "getOfferDetailTotalA",
      "getOfferDetailTotalB"
    ]),
  },
  data() {
    return {
      offer_list_detail: false,
      offer_list_detail_form: false,
      model: {},
      offer_updated_list_form: false,
    };
  },
  created() {
    this.$store.dispatch("setOfferMainList");
    this.$store.dispatch("setOfferSharedList");
    this.$store.dispatch("setOfferCustomerList");
  },
  methods: {
    offerBListSelected(event) {
      this.$store.dispatch("setOfferMainDetailBList", event.KullaniciId);
    },
    oldOffers() {
      this.$store.dispatch("setOfferOldList");
      this.$store.dispatch("setOfferAllButtonStatus", false);
      this.offer_list_detail = true;
    },
    offers() {
      this.offer_list_detail = true;
      this.offer_updated_list_form = true;
      this.$store.dispatch("setOfferDetailAllList");
      this.$store.dispatch("setOfferAllButtonStatus", true);
    },
    offerDelete(event) {
      if (confirm("Silmek istiyor musunuz?")) {
        this.$store.dispatch("setOfferDelete", event);
        this.offer_list_detail_form = false;
      }
    },
    newOffer() {
      this.$store.dispatch("setOfferAllButtonStatus", false);
      this.$store.dispatch("setOfferButtonStatus", true);
      this.$store.dispatch("setOfferModel");
      this.$store.dispatch("setOfferProductModel");
      this.$store.dispatch("setOfferCustomerModel");
      this.$store.dispatch("setOfferId", 0);
      this.$store.commit("setOfferDetailProductsList", []);
      this.model = this.getOfferModel;
      this.offer_list_detail_form = true;
    },
    offerProcess(event) {
      if (this.getOfferButtonStatus) {
        this.save(event);
      } else {
        this.update(event);
      }
    },
    save(event) {
      this.$store.dispatch("setOfferSave", event);
    },
    update(event) {
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

      this.offer_list_detail_form = true;
    },
  },
  mounted() {
    this.$socket.socketIO.on("offers_updated_on", () => {
      if (this.offer_updated_list_form) {
        this.$store.dispatch("setOfferDetailAllList");
      } else {
        this.$store.dispatch("setOfferMainDetailList", this.$cookie.get("userId"));
      }
    });
  },
};
</script>
