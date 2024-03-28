<template>
  <div class="container">
    <Button
      type="button"
      class="p-button-success w-100"
      label="New Project"
      @click="newForm"
    />
    <customerBgpList
      :list="getBgpCustomerList"
      @bgp_customer_emit="bgpCustomerSelected($event)"
      :loading="getLoading"
    />
    <Dialog :visible.sync="bgp_customer_dialog_form" modal header="">
      <customerBgpForm
        :model="model"
        :country="getCountryList"
        :button="getBgpCustomerButtonStatus"
        @bgp_customer_process_emit="process($event)"
        @bgp_customer_delete_emit="deleteForm($event)"
      />
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
      "getBgpCustomerList",
      "getBgpCustomerModel",
      "getCountryList",
      "getBgpCustomerButtonStatus",
      "getLoading",
    ]),
  },
  data() {
    return {
      bgp_customer_dialog_form: false,
      model: null,
    };
  },
  created() {
    this.$store.dispatch("setBgpCustomerList");
  },
  methods: {
    deleteForm(event) {
      this.$store.dispatch("setBgpCustomerDelete", event);
      this.bgp_customer_dialog_form = false;
    },
    save(event) {
      event.KullaniciId = Cookies.get("userId");
      this.$store.dispatch("setBgpCustomerSave", event);
      this.bgp_customer_dialog_form = false;
    },
    update(event) {
      this.$store.dispatch("setBgpCustomerUpdate", event);
      this.bgp_customer_dialog_form = false;
    },
    process(event) {
      if (this.getBgpCustomerButtonStatus) {
        this.save(event);
      } else {
        this.update(event);
      }
    },
    bgpCustomerSelected(event) {
      this.model = event.data;
      this.bgp_customer_dialog_form = true;
      this.$store.dispatch("setBgpCustomerButtonStatus", false);
    },
    newForm() {
      this.$store.dispatch("setBgpCustomerModel");
      this.model = this.getBgpCustomerModel;
      this.bgp_customer_dialog_form = true;
      this.$store.dispatch("setBgpCustomerButtonStatus", true);
    },
  },
};
</script>
