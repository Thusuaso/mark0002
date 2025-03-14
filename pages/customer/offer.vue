<template>
  <div class="container">
    <Button type="button" class="p-button-success w-100" label="New" @click="newForm" />

    <customerOfferList
      :offer="getOfferCustomerList"
      @offer_customer_selected="offerCustomerSelected($event)"
    />
    <Dialog :visible.sync="offer_form_dialog" header="" modal>
      <customerOfferForm
        :model="model"
        :country="getCountryList"
        :button="getOfferCustomerButtonStatus"
        @offer_customer_dialog_close="offer_form_dialog = false"
      />
    </Dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  // middleware: ["authority"],
  computed: {
    ...mapGetters([
      "getOfferCustomerList",
      "getCountryList",
      "getOfferCustomerButtonStatus",
      "getOfferCustomerModel",
    ]),
  },
  data() {
    return {
      offer_form_dialog: false,
      model: null,
    };
  },
  created() {
    this.$store.dispatch("setOfferCustomerList");
  },
  methods: {
    newForm() {
      this.$store.dispatch("setOfferCustomerModel");
      this.model = this.getOfferCustomerModel;
      this.offer_form_dialog = true;
      this.$store.dispatch("setOfferCustomerButtonStatus", true);
    },
    offerCustomerSelected(offer) {
      this.offer_form_dialog = true;
      this.model = offer.data;
      this.$store.dispatch("setOfferCustomerButtonStatus", false);
    },
  },
};
</script>
