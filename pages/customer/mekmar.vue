<template>
  <div class="container">

    <div class="row">
      <div class="col">
        <Button type="button" class="p-button-success w-100" label="New" @click="newForm" />

      </div>
      <div class="col">
        <vue-excel-xlsx
        :data="getMekmarList"
        :columns="excelColumnsField"
        :file-name="'Customer'"
        :file-type="'xlsx'"
        :sheet-name="'sheetname'"
        style="border: none; background-color: white"
      >
        <Button
          type="button"
          class="p-button-info w-100"
          icon="pi pi-file-excel"
          label="Excel"
        />
      </vue-excel-xlsx>

      </div>

      </div>
    <customerMekmarList
      :list="getMekmarList"
      @customer_mekmar_selected_emit="customerMekmarSelected($event)"
    />
    <Dialog :visible.sync="customer_mekmar_dialog_form" header="" modal>
      <customerMekmarForm
        :model="model"
        :country="getCountryList"
        :status="getMekmarButtonStatus"
        :users="getUserList"
        :orders="getMekmarButtonStatus ? [] : getMekmarDetailOrdersList"
        @customer_mekmar_order_po_emit="customerMekmarOrderPo($event)"
        @customer_mekmar_dialog="customer_mekmar_dialog_form = $event"
      />
    </Dialog>
    <Dialog :visible.sync="custommer_mekmar_orders_dialog_form" header="" modal>
      <customerMekmarOrdersPoForm
        :po="getMekmarDetailOrdersPoList"
        @customer_order_po_selected_emit="customerOrderPoSelectedEmit($event)"
      />
    </Dialog>
    <Dialog :visible.sync="cusomer_mekmar_orders_products_dialog_form" header="" modal>
      <customerMekmarOrdersPoProductsForm
        :products="getSetMekmarDetailOrdersPoProductsList"
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
      "getMekmarList",
      "getCountryList",
      "getMekmarButtonStatus",
      "getUserList",
      "getCustomerModel",
      "getMekmarDetailOrdersList",
      "getMekmarDetailOrdersPoList",
      "getSetMekmarDetailOrdersPoProductsList",
    ]),
  },
  created() {
    this.$store.dispatch("setMekmarList");
  },
  data() {
    return {
      customer_mekmar_dialog_form: false,
      model: null,
      custommer_mekmar_orders_dialog_form: false,
      cusomer_mekmar_orders_products_dialog_form: false,
      excelColumnsField: [
        {
          label: "Firma Adı",
          field: "FirmaAdi",
        },
        {
          label: "Unvan",
          field: "Unvan",
        },
        {
          label: "Adres",
          field: "Adres",
        },
        {
          label: "Ulke",
          field: "Ulke",
        },
        {
          label: "Marketing",
          field: "Marketing",
        },
        {
          label: "Temsilci",
          field: "Temsilci",
        },
        {
          label: "Satisci Adi",
          field: "SatisciAdi",
        },
        {
          label: "Mail Adresi",
          field: "MailAdresi",
        },
        {
          label: "Telefon",
          field: "Telefon",
        },
        {
          label: "Musteri Yeri",
          field: "MusteriYeri",
        },

      ],
    };
  },
  methods: {
    customerOrderPoSelectedEmit(po) {
      this.$store.dispatch("setMekmarDetailOrdersPoProductsList", po);
      this.cusomer_mekmar_orders_products_dialog_form = true;
    },
    customerMekmarOrderPo(event) {
      this.custommer_mekmar_orders_dialog_form = true;
      this.$store.dispatch("setMekmarDetailOrdersPoList", event);
    },
    newForm() {
      this.$store.dispatch("setCustomerModel");
      this.model = this.getCustomerModel;
      this.$store.dispatch("setMekmarButtonStatus", true);
      this.customer_mekmar_dialog_form = true;
    },
    customerMekmarSelected(event) {
      this.model = event.data;
      this.$store.dispatch("setMekmarButtonStatus", false);
      this.customer_mekmar_dialog_form = true;
    },
  },
};
</script>
