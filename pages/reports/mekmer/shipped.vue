<template>
  <div>
    <div class="row m-auto text-center">
      <div class="col">
        <Button
          type="button"
          class="p-button-success w-100"
          label="New Product"
          @click="newForm"
        />
      </div>
    </div>
    <orderShippedList
      :list="getOrderList"
      @production_selected_emit="productionSelected($event)"
      :status="'Shipped 2'"
      :total="getOrderProductionTotal"
    />
    <Dialog
      :visible.sync="production_detail_form"
      header=""
      modal
      :style="{ width: '100%' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
      :closeOnEscape="false"
      :closable="false"
    >
      <orderDetailForm
        :modelProduction="productionModel"
        :modelProduct="getOrderProductModel"
        :status="getOrderProductionButtonStatus"
        :customer="getCustomersList"
        :user="getUserList"
        :productsList="getOrderProductionProductDetailList"
        :supplier="getSupplierList"
        :unit="getUnitList"
        :po="getOrderProductionPo"
        :delivery="getOrderKindOfDeliveryList"
        :payment="getOrderKindOfPaymentList"
        :country="getCountryList"
        :invoice="getOrderKindOfInvoiceList"
        :cost="getOrderProductionCostList"
        :costTotal="getOrderProductionCostTotal"
        :supplierDelivery="getOrderKindOfDeliverySupplierList"
        :productSupplier="getOrderProductionSupplierList"
        :supplierProduct="getOrderSupplierProductList"
        :document="getOrderProductionDocumentList"
        :check="getOrderProductionCheckList"
        :checkTotal="getOrderProductionCheckListTotal"
        :productCalculation="getOrderProductionProductTotal"
        :freightCalculation="getOrderProductionFreightTotal"
        :detailCalculation="getOrderProductionDetailTotal"
        :detailProductTotal="getOrderProductionProductDetailTotal"
        :detailProductCost="getOrderProductionProductDetailCostTotal"
        :insuranceCalculation="0"
        :statusAlfa="false"
        @order_production_product_reset_model_emit="
          orderProductionProductResetModel($event)
        "
        @process="process"
        @workerman_selected_emit="workermanSelected($event)"
        @close_production_form_emit="closeProductionForm"
        @proforma_delete_emit="proformaDelete($event)"
        @isf_delete_emit="isfDelete($event)"
        :source="getOrderProductionSourceTypes"
      />
    </Dialog>

    <Dialog :visible.sync="workerman_dialog_form" header="" modal>
      <orderDetailWorkermanForm
        :list="getOrderProductionProductDetailWorkermanList"
        :model="getOrderProductWorkermanModel"
        :supplier="getSupplierList"
        :productId="productId"
        :po="getOrderProductionPo"
      />
    </Dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import date from "../../../plugins/date";
import Cookies from "js-cookie";
export default {
  computed: {
    ...mapGetters([
      "getOrderProductionSourceTypes",
      "getOrderList",
      "getOrderProductionModel",
      "getOrderProductModel",
      "getOrderProductionButtonStatus",
      "getCustomersList",
      "getUserList",
      "getOrderProductionProductDetailList",
      "getSupplierList",
      "getUnitList",
      "getOrderProductionPo",
      "getOrderKindOfDeliveryList",
      "getOrderKindOfPaymentList",
      "getCountryList",
      "getOrderKindOfInvoiceList",
      "getOrderProductionCostList",
      "getOrderProductionCostTotal",
      "getOrderKindOfDeliverySupplierList",
      "getOrderProductionSupplierList",
      "getOrderSupplierProductList",
      "getOrderProductionDocumentList",
      "getOrderProductionCheckList",
      "getOrderProductionCheckListTotal",
      "getOrderProductionProductTotal",
      "getOrderProductionFreightTotal",
      "getOrderProductionDetailTotal",
      "getOrderProductionProductDetailTotal",
      "getOrderProductionProductDetailCostTotal",
      "getOrderProductionProductDetailWorkermanList",
      "getOrderProductWorkermanModel",
      "getOrderProductAdded",
      "getOrderProductUpdated",
      "getOrderProductDeleted",
      "getOrderProductionYearsList",
      "getOrderProductionTotal",
    ]),
  },
  data() {
    return {
      production_detail_form: false,
      productionModel: {},
      productModel: {},
      workerman_dialog_form: false,
      productId: 0,
      selectedYear: null,
    };
  },

  created() {
    this.$store.dispatch("setOrderShippedMekmer2List");
    this.$store.dispatch("setOrderProductionSourceTypes");
  },
  methods: {
    __stringCharacterChange(event) {
      if (event != null || event != undefined) {
        const data = event.split("'");
        let value = "";

        data.forEach((x) => {
          value += x + "''";
        });
        const value2 = value.substring(0, value.length - 2);
        return value2;
      } else {
        return "";
      }
    },
    isfDelete(event) {
      this.$store.dispatch("setOrderProductionIsfDelete", event);
    },
    proformaDelete(id) {
      this.$store.dispatch("setOrderProductionProformaDelete", id);
    },
    yearChange(event) {
      if (event.value.Yil == "All") {
        this.$store.dispatch("setOrderShippedList");
      } else {
        this.$store.dispatch("setOrderShippedListYear", event.value.Yil);
      }
    },
    closeProductionForm() {
      const data = {
        po: this.getOrderProductionPo,
        date: date.dateToString(new Date()),
        username: Cookies.get("username"),
        added: this.getOrderProductAdded,
        updated: this.getOrderProductUpdated,
        deleted: this.getOrderProductDeleted,
        operation: this.productionModel.operationMail,
        representative: this.productionModel.representativeMail,
        status: 3,
      };
      if (confirm("Çıkmak istediğinize emin misiniz?")) {
        this.$store.dispatch("setProductionProductSaveMail", data);
        this.production_detail_form = false;
      }
    },
    workermanSelected(event) {
      this.productId = event;
      const data = {
        productId: event,
        po: this.getOrderProductionPo,
      };
      this.$store.dispatch("setProductionProductWorkermanList", data);

      this.workerman_dialog_form = true;
    },
    update() {
      this.productionModel.FinansAciklama_2 = this.__stringCharacterChange(
        this.productionModel.FinansAciklama
      );
      this.productionModel.UretimAciklama_2 = this.__stringCharacterChange(
        this.productionModel.UretimAciklama
      );
      this.productionModel.SevkiyatAciklama_2 = this.__stringCharacterChange(
        this.productionModel.SevkiyatAciklama
      );
      this.productionModel.DetayAciklama_1_2 = this.__stringCharacterChange(
        this.productionModel.DetayAciklama_1
      );
      this.productionModel.DetayAciklama_2_2 = this.__stringCharacterChange(
        this.productionModel.DetayAciklama_2
      );
      this.productionModel.DetayAciklama_3_2 = this.__stringCharacterChange(
        this.productionModel.DetayAciklama_3
      );
      this.productionModel.DetayAciklama_4_2 = this.__stringCharacterChange(
        this.productionModel.DetayAciklama_4
      );
      this.productionModel.DetayMekmarNot_1_2 = this.__stringCharacterChange(
        this.productionModel.DetayMekmarNot_1
      );
      this.productionModel.DetayMekmarNot_2_2 = this.__stringCharacterChange(
        this.productionModel.DetayMekmarNot_2
      );
      this.productionModel.DetayMekmarNot_3_2 = this.__stringCharacterChange(
        this.productionModel.DetayMekmarNot_3
      );
      this.productionModel.SiparisKontrolEden = 0;

      this.$store.dispatch("setOrderProductionUpdate", this.productionModel);
    },
    save() {
      this.productionModel.FinansAciklama_2 = this.__stringCharacterChange(
        this.productionModel.FinansAciklama
      );
      this.productionModel.UretimAciklama_2 = this.__stringCharacterChange(
        this.productionModel.UretimAciklama
      );
      this.productionModel.SevkiyatAciklama_2 = this.__stringCharacterChange(
        this.productionModel.SevkiyatAciklama
      );
      this.productionModel.DetayAciklama_1_2 = this.__stringCharacterChange(
        this.productionModel.DetayAciklama_1
      );
      this.productionModel.DetayAciklama_2_2 = this.__stringCharacterChange(
        this.productionModel.DetayAciklama_2
      );
      this.productionModel.DetayAciklama_3_2 = this.__stringCharacterChange(
        this.productionModel.DetayAciklama_3
      );
      this.productionModel.DetayAciklama_4_2 = this.__stringCharacterChange(
        this.productionModel.DetayAciklama_4
      );
      this.productionModel.DetayMekmarNot_1_2 = this.__stringCharacterChange(
        this.productionModel.DetayMekmarNot_1
      );
      this.productionModel.DetayMekmarNot_2_2 = this.__stringCharacterChange(
        this.productionModel.DetayMekmarNot_2
      );
      this.productionModel.DetayMekmarNot_3_2 = this.__stringCharacterChange(
        this.productionModel.DetayMekmarNot_3
      );
      this.productionModel.KayitTarihi = date.dateToString(new Date());
      this.productionModel.KullaniciID = Cookies.get("userId");
      this.productionModel.SiparisKontrolEden = 0;

      this.$store.dispatch("setOrderProductionSave", this.productionModel);
      this.$store.dispatch(
        "setOrderProductionPo",
        this.productionModel.SiparisNo
      );
    },
    process() {
      if (this.getOrderProductionButtonStatus) {
        this.save();
      } else {
        this.update();
      }
    },
    newForm() {
      this.$store.dispatch("setOrderProductionSourceTypes");

      this.$store.dispatch("setOrderProductionButtonStatus", true);
      this.$store.dispatch("setOrderProductionModel");
      this.$store.dispatch("setOrderProductModel");
      this.$store.dispatch("setOrderProductionDetailListReset");
      this.$store.commit("setOrderSupplierProductList", []);

      this.productionModel = this.getOrderProductionModel;
      this.production_detail_form = true;
    },
    productionSelected(event) {
      this.$store.dispatch("setOrderProductionSourceTypes");

      this.$store.dispatch("setOrderProductionButtonStatus", false);
      this.$store.dispatch("setOrderProductModel");
      this.$store.dispatch(
        "setOrderProductionProductDetailList",
        event.SiparisNo
      );
      this.$store.dispatch("setOrderProductionCostList", event.SiparisNo);
      this.$store.dispatch("setOrderProductionSupplierList", event.SiparisNo);
      this.$store.dispatch("setOrderProductionDocumentList", event.SiparisNo);
      this.$store.dispatch("setOrderProductionCheckList", event.SiparisNo);
      this.$store.dispatch("setOrderProductionFreightTotal", event.NavlunSatis);
      this.$store.dispatch(
        "setOrderProductionInsuranceTotal",
        event.sigorta_tutar_satis
      );
      this.$store.dispatch("setOrderProductionDetailTotal", event);
      this.$store.dispatch("setOrderProductionProductDetailCostTotal", event);
      this.$store.dispatch("setOrderProductionProductDetailNotChangeListReset");
      this.$store.commit("setOrderSupplierProductList", []);

      this.productionModel = event;
      this.$store.dispatch("setOrderProductionPo", event.SiparisNo);
      this.production_detail_form = true;
    },
  },
  watch: {
    getOrderProductionYearsList() {
      this.selectedYear = { Yil: new Date().getFullYear() };
    },
  },
};
</script>
