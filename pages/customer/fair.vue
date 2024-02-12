<template>
  <div class="container">
    <Button type="button" class="p-button-success w-100" label="Yeni" @click="newForm" />
    <customerFairList
      :list="getFairCustomerList"
      @fair_customer_selected_emit="fairCustomerSelected($event)"
      :loading="getLoading"
    />
    <Dialog :visible.sync="fair_customer_dialog_form" header="" modal>
      <customerFairForm
        :model="model"
        :country="getCountryList"
        :button="getFairCustomerButtonStatus"
        @fair_customer_process_emit="process($event)"
        @fair_customer_delete_emit="fairCustomerDelete($event)"
      />
    </Dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Cookies from "js-cookie";
export default {
  computed: {
    ...mapGetters([
      "getFairCustomerList",
      "getFairCustomerModel",
      "getCountryList",
      "getFairCustomerButtonStatus",
      "getLoading"
    ]),
  },
  data() {
    return {
      fair_customer_dialog_form: false,
      model: null,
    };
  },
  created() {
    this.$store.dispatch("setFairCustomerList");
  },
  methods: {
    fairCustomerDelete(id) {
      this.fair_customer_dialog_form = false;
      this.$store.dispatch("setFairCustomerDelete", id);
    },
    update(event) {
      this.fair_customer_dialog_form = false;
      if (event.Fuar == null) {
        event.Fuar = false;
      }
      if (event.Ziyaret == null) {
        event.Ziyaret = false;
      }
      this.$store.dispatch("setFairCustomerUpdate", event);
    },
    save(event) {
      event.Kullanici = Cookies.get("userId");
      if (event.Fuar == null) {
        event.Fuar = false;
      }
      if (event.Ziyaret == null) {
        event.Ziyaret = false;
      }
      this.$store.dispatch("setFairCustomerSave", event);
      this.fair_customer_dialog_form = false;
    },
    process(event) {
      if (this.getFairCustomerButtonStatus) {
        this.save(event);
      } else {
        this.update(event);
      }
    },
    newForm() {
      this.$store.dispatch("setFairCustomerModel");
      this.$store.dispatch("setFairCustomerButtonStatus", true);
      this.model = this.getFairCustomerModel;
      this.fair_customer_dialog_form = true;
    },
    fairCustomerSelected(event) {
      this.$store.dispatch("setFairCustomerButtonStatus", false);
      this.model = event.data;
      this.fair_customer_dialog_form = true;
    },
  },
};
</script>
