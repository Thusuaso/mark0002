<template>
  <div class="container">
    <Button type="button" class="p-button-success w-100" label="New" @click="newForm" />
    <supplierList
      :list="getSupplierList"
      @supplier_model_emit="supplierModelEmit($event)"
    />
    <Dialog :visible.sync="supplier_form_dialog" modal header="">
      <supplierForm
        :status="getSupplierButtonStatus"
        :model="model"
        @supplier_dialog_close_emit="supplier_form_dialog = false"
      />
    </Dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  middleware: ["authority"],
  computed: {
    ...mapGetters(["getSupplierList", "getSupplierButtonStatus"]),
  },
  data() {
    return {
      supplier_form_dialog: false,
      model: {
        FirmaAdi: null,
      },
    };
  },
  created() {
    this.$store.dispatch("setSupplierList");
  },
  methods: {
    newForm() {
      this.model = {
        FirmaAdi: null,
      };
      this.$store.dispatch("setSupplierButtonStatus", true);
      this.supplier_form_dialog = true;
    },
    supplierModelEmit(event) {
      this.model = event;
      this.$store.dispatch("setSupplierButtonStatus", false);
      this.supplier_form_dialog = true;
    },
  },
};
</script>
