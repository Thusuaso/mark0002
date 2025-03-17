<template>
  <div class="">
    <selection :productionTotal="getProductionTotal" @products_status_selected="productsStatusSelected($event)"
      @selection_production_dialog="selection_production_dialog_form = true"
       />
    <selectionList :products="getProductList" :total="getProductionSumTotal"
      @product_selected_emit="productSelectedEmit($event)" />
    <Dialog :visible.sync="selection_production_dialog_form" header="" modal>
      <selectionForm @selection_production_dialog_form="selection_production_dialog_form = $event"
        :suppliers="getSupplierList" :orders="getOrderProductionList" :products="getProductionProductsList"
        :mines="getMineList" :model="model" :buttonStatus="getProductionButtonStatus" />
    </Dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      productsButtonStatus: 1,
      productsList: [],
      selection_production_dialog_form: false,
      model: {},
    };
  },
  computed: {
    ...mapGetters([
      "getProductionTotal",
      "getProductList",
      "getProductionSumTotal",
      "getSupplierList",
      "getOrdersList",
      "getProductionProductsList",
      "getMineList",
      "getProductionButtonStatus",
      "getOrderProductionList",
    ]),
  },
  created() {
    this.$store.dispatch("setOrderProductionList");
    this.$store.dispatch("setSelectionProductionTotal");
    this.$store.dispatch("setSelectionProductsList");
    this.$store.dispatch("setSelectionProductionMekmerButtonStatus");


  },
  methods: {
    productsStatusSelected(event) {
      this.productsButtonStatus = event;
      if (event == 1) {
        this.$store.dispatch("setSelectionProductionMekmerButton");
        this.$store.dispatch("setSelectionProductionMekmerButtonStatus");
      } else if (event == 2) {
        this.$store.dispatch("setSelectionProductionDisButton");
        this.$store.dispatch("setSelectionProductionDisButtonStatus");
      } else if (event == 3) {
        this.$store.dispatch("setSelectionProductionMekmerDisButton");
        this.$store.dispatch("setSelectionProductionMekmerDisButtonStatus");
      } else if (event == 4) {
        this.$store.dispatch("setSelectionProductionBulunamadiButton");
        this.$store.dispatch("setSelectionProductionBulunamadiButtonStatus");
      }
    },
    productSelectedEmit(event) {
      this.$store.dispatch("setCardList");

      this.selection_production_dialog_form = true;
      this.model = event.data;
      this.$store.dispatch("setSelectionProductionButtonStatus", false);
    },
  },
};
</script>
