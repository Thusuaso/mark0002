<template>
  <div class="">
    <div class="row m-auto text-center">
      <div class="col-6">
        <Button
          type="button"
          class="p-button-success w-100"
          label="New Order"
          @click="newForm"
        />
      </div>

      <div class="col-6">
        <Button
          class="p-button-warning w-100"
          label="Excel"
          @click="excel_output"
        />
      </div>
    </div>
    <orderList2
      :list="getOrderList"
      @production_selected_emit="productionSelected($event)"
      :loading="getLoadingDatatable"
      :status="'Production'"
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
      :maximizable="true"
    >
      <orderDetailForm2
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
        :saveButtonStatus="getOrderProductionSaveButtonStatus"
        :proformaUploadButtonStatus="
          getOrderProductionUploadProformaButtonStatus
        "
        :statusAlfa="true"
        @order_production_product_reset_model_emit="
          orderProductionProductResetModel($event)
        "
        @process="process"
        @workerman_selected_emit="workermanSelected($event)"
        @close_production_form_emit="closeProductionForm"
        @proforma_delete_emit="proformaDelete($event)"
        @isf_delete_emit="isfDelete($event)"
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
import Cookies from "js-cookie";
import date from "@/plugins/date";
import api from "@/plugins/excel.server";
export default {
  computed: {
    ...mapGetters([
      "getLoadingDatatable",
      "getOrderList",
      "getOrderListAll",
      "getOrderProductionModel",
      "getOrderProductModel",
      "getOrderProductionButtonStatus",
      "getCustomersList",
      "getUserList",
      "getOrderProductionProductDetailList",
      "getOrderProductionProductDetailNotChangeList",
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
      "getOrderProductionSaveButtonStatus",
      "getLocalUrl",
      "getOrderProductionId",
      "getOrderProductionUploadProformaButtonStatus",
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
      selectedSupplier: null,
      suppliers: [
        { key: 0, name: "All" },
        { key: 1, name: "Mekmer" },
        { key: 2, name: "External" },
      ],
      selectedSupplier: "All",
      marketings: [
        { key: 0, name: "All" },
        { key: 1, name: "Mekmar" },
      ],
      selectedMarketing: "All",
    };
  },

  created() {
    this.$store.dispatch("setOrderProductionMekmerList");
  },
  methods: {
    isfDelete(event) {
      this.$store.dispatch("setOrderProductionIsfDelete", event);
    },
    proformaDelete(id) {
      this.$store.dispatch("setOrderProductionProformaDelete", id);
    },
    excel_output() {
      const new_data = this.getOrderList.sort(function (a, b) {
        const new_date_a = new Date(a.SiparisTarihi).getTime();
        const new_date_b = new Date(b.SiparisTarihi).getTime();

        return new_date_b - new_date_a;
      });
      api
        .post("/siparisler/dosyalar/uretimExcelCikti", new_data)
        .then((response) => {
          if (response.status) {
            const link = document.createElement("a");
            link.href =
              this.getLocalUrl + "siparisler/dosyalar/uretimExcelCikti";

            link.setAttribute("download", "Uretim_list.xlsx");
            document.body.appendChild(link);
            link.click();
          }
        });
    },
    marketingChange(event) {
      if (this.selectedMarketing == "All") {
        this.$store.commit("setOrderList", this.getOrderListAll);
      } else {
        const datas = this.getOrderListAll.filter(
          (x) => x.FaturaKesimTurID == 1
        );
        this.$store.commit("setOrderList", datas);
      }
    },
    supplierChange(event) {
      this.allProductionData = this.getOrderList;
      if (this.selectedSupplier == "All") {
        this.$store.commit("setOrderList", this.getOrderListAll);
      } else if (this.selectedSupplier == "Mekmer") {
        this.filteredProductionStatus = true;
        const datas = this.getOrderListAll.filter(
          (x) => x.TedarikciID == 1 || x.TedarikciID == 123
        );
        this.$store.commit("setOrderList", datas);
      } else if (this.selectedSupplier == "External") {
        this.filteredProductionStatus = true;
        const datas = this.getOrderListAll.filter(
          (x) => x.TedarikciID != 1 && x.TedarikciID != 123
        );
        this.$store.commit("setOrderList", datas);
      }
    },
    yearChange(event) {
      if (event.value.Yil == "All") {
        this.$store.dispatch("setOrderProductionList");
      } else {
        this.$store.dispatch("setOrderProductionListYear", event.value.Yil);
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
        status: 2,
        notchange: this.getOrderProductionProductDetailNotChangeList,
        new: this.getOrderProductionButtonStatus,
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
    __stringCharacterChange(event) {
      const data = event.split("'");
      let value = "";

      data.forEach((x) => {
        value += x + "''";
      });
      const value2 = value.substring(0, value.length - 2);
      return value2;
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

      this.$store.dispatch("setOrderProductionUpdate", {
        ...this.productionModel,
        SiparisId: this.getOrderProductionId,
      });
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
      this.productionModel.SiparisKontrolEden = 0;

      this.$store.dispatch("setOrderProductionSaveButtonStatus", true);
      this.productionModel.KayitTarihi = date.dateToString(new Date());
      this.productionModel.KullaniciID = Cookies.get("userId");
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
      this.$store.dispatch("setOrderProductionButtonStatus", true);
      this.$store.dispatch("setOrderProductionModel");
      this.$store.dispatch("setOrderProductModel");
      this.$store.dispatch("setOrderProductionDetailListReset");
      this.$store.dispatch("setOrderProductionPo", null);
      this.$store.dispatch(
        "setOrderProductionUploadProformaButtonStatus",
        true
      );
      this.$store.commit("setOrderSupplierProductList", []);
      this.$store.dispatch("setOrderAllList");
      this.productionModel = this.getOrderProductionModel;
      this.production_detail_form = true;
    },
    productionSelected(event) {
      this.$store.dispatch("setOrderProductionButtonStatus", false);
      this.$store.dispatch("setOrderProductModel");
      this.$store.dispatch(
        "setOrderProductionProductDetailMekmerList",
        event.SiparisNo
      );
      this.$store.dispatch("setOrderProductionCostList", event.SiparisNo);
      this.$store.dispatch("setOrderProductionSupplierList", event.SiparisNo);
      this.$store.dispatch("setOrderProductionDocumentList", event.SiparisNo);
      this.$store.dispatch(
        "setOrderProductionCheckMekmerList",
        event.SiparisNo
      );
      this.$store.dispatch("setOrderProductionFreightTotal", event.NavlunSatis);
      this.$store.dispatch(
        "setOrderProductionInsuranceTotal",
        event.sigorta_tutar_satis
      );
      this.$store.dispatch("setOrderProductionDetailTotal", event);
      this.$store.dispatch("setOrderProductionProductDetailCostTotal", event);
      this.$store.dispatch("setOrderProductionSaveButtonStatus", false);
      this.$store.dispatch("setOrderProductionProductDetailNotChangeListReset");
      this.$store.dispatch(
        "setOrderProductionUploadProformaButtonStatus",
        false
      );
      this.$store.commit("setOrderSupplierProductList", []);

      this.$store.dispatch("setOrderProductionId", event.SiparisId);
      this.productionModel = event;
      this.$store.dispatch("setOrderProductionPo", event.SiparisNo);
      this.production_detail_form = true;
    },
  },
  mounted() {
    // this.$socket.socketIO.on("cards_update_on", () => {
    //   this.$store.dispatch("setCardList");
    // });
  },

  watch: {
    getOrderProductionYearsList() {
      this.selectedYear = { Yil: new Date().getFullYear() };
    },
  },
};
</script>
