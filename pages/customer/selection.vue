<template>
  <div class="container">
    <Button type="button" class="p-button-success" label="New" @click="newForm" />
    <customerSelectionList
      :list="getSelectionCustomerList"
      @selection_customer_selected_emit="selectionCustomerSelected($event)"
      :loading="getLoading"
    />
    <Dialog :visible.sync="customer_selection_dialog_form" header="" modal>
      <customerSelectionForm
        :model="model"
        :surface="getSelectionSurfaces"
        :button="getSelectionCustomerButtonStatus"
        :country="getCountryList"
        @surface_customer_process_emit="process($event)"
        @surface_customer_delete_emit="deleteForm($event)"
      />
    </Dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Cookies from "js-cookie";
export default {
  middleware: ["authority", "selectionCustomer"],
  computed: {
    ...mapGetters([
      "getSelectionCustomerList",
      "getSelectionSurfaces",
      "getSelectionCustomerModel",
      "getSelectionCustomerButtonStatus",
      "getCountryList",
      "getLoading",
    ]),
  },
  data() {
    return {
      surfacesList: [],
      customer_selection_dialog_form: false,
      model: null,
    };
  },
  created() {},
  methods: {
    deleteForm(id) {
      this.$store.dispatch("setSelectionCustomerDelete", id);
      this.customer_selection_dialog_form = false;
    },
    update(event) {
      this.$store.dispatch("setSelectionCustomerUpdate", event);
      this.customer_selection_dialog_form = false;
    },
    save(event) {
      event.UserId = Cookies.get("userId");
      this.$store.dispatch("setSelectionCustomerSave", event);
      this.customer_selection_dialog_form = false;
    },
    process(event) {
      if (this.getSelectionCustomerButtonStatus) {
        this.save(event);
      } else {
        this.update(event);
      }
    },
    newForm() {
      this.$store.dispatch("setSelectionCustomerModel");
      this.$store.dispatch("setSelectionCustomerButtonStatus", true);
      this.model = this.getSelectionCustomerModel;
      this.customer_selection_dialog_form = true;
    },
    selectionCustomerSelected(event) {
      this.$store.dispatch("setSelectionCustomerButtonStatus", false);
      this.model = event.data;
      this.customer_selection_dialog_form = true;
    },
  },
};
</script>
