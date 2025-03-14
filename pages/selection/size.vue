<template>
  <div class="container">
    <Button type="button" class="p-button-success w-100" label="New" @click="newForm" />
    <crateList
      :list="getProductionCrateSizeList"
      @size_selected_model_emit="sizeSelectedModel($event)"
    />
    <Dialog :visible.sync="production_crate_size_dialog_form" header="" modal>
      <crateForm
        :supplier="getSupplierList"
        :model="model"
        :status="getProductionCrateSizeButtonStatus"
        @selection_production_crate_size_dialog_close="
          production_crate_size_dialog_form = false
        "
      />
    </Dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  middleware: ["authority"],
  computed: {
    ...mapGetters([
      "getProductionCrateSizeList",
      "getSupplierList",
      "getProductionCrateSizeButtonStatus",
    ]),
  },
  created() {
    this.$store.dispatch("setSelectionProductionCrateSizeList");
  },
  data() {
    return {
      production_crate_size_dialog_form: false,
      model: null,
    };
  },
  methods: {
    newForm() {
      const data = {
        Ebat: null,
        KasaOlculeri: null,
        Adet: null,
      };
      this.model = data;
      this.$store.dispatch("setSelectionProductionCrateSizeButtonStatus", true);
      this.production_crate_size_dialog_form = true;
    },
    sizeSelectedModel(event) {
      this.model = event;
      this.production_crate_size_dialog_form = true;
    },
  },
};
</script>
