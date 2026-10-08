<template>
  <div class="">
    <div class="row m-auto text-center">
      <div class="col-4">
        <Button
          type="button"
          class="p-button-success w-100"
          label="New Order"
          @click="newForm"
        />
      </div>
      <div class="col-4 m-auto text-center">
        <div class="m-auto text-center" style="width: 400px">
          <div class="m-auto text-center">
            <div class="row mb-2 m-auto text-center">
              <div class="col-2">Supplier</div>
              <div class="col">
                <div class="flex flex-wrap gap-3">
                  <div
                    class="flex align-items-center"
                    v-for="supplier in suppliers"
                    :key="supplier.key"
                  >
                    <RadioButton
                      v-model="selectedSupplier"
                      :inputId="supplier.key"
                      name="dynamic"
                      :value="supplier.name"
                      @change="supplierChange($event)"
                    />
                    <label :for="supplier.key" class="ml-2">{{
                      supplier.name
                    }}</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="row m-auto text-center">
              <div class="col-2">Seller</div>
              <div class="col">
                <div class="flex flex-wrap gap-3">
                  <div
                    class="flex align-items-center"
                    v-for="marketing in marketings"
                    :key="marketing.key"
                  >
                    <RadioButton
                      v-model="selectedMarketing"
                      :inputId="marketing.key"
                      name="dynamic"
                      :value="marketing.name"
                      @change="marketingChange($event)"
                    />
                    <label :for="marketing.key" class="ml-2">{{
                      marketing.name
                    }}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-4">
        <Button
          class="p-button-warning w-100"
          label="Excel"
          @click="excel_output"
        />
      </div>
    </div>
    <orderList
      :list="getOrderList"
      @production_selected_emit="productionSelected($event)"
      :status="'Production'"
      :total="getOrderProductionTotal"
      :loading="getLoadingDatatable"
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
        :saveButtonStatus="getOrderProductionSaveButtonStatus"
        :proformaUploadButtonStatus="
          getOrderProductionUploadProformaButtonStatus
        "
        :statusAlfa="false"
        :insuranceCalculation="getOrderProductionInsuranceTotal"
        @order_production_product_reset_model_emit="
          orderProductionProductResetModel($event)
        "
        @process="process"
        @workerman_selected_emit="workermanSelected($event)"
        @close_production_form_emit="closeProductionForm"
        @proforma_delete_emit="proformaDelete($event)"
        @isf_delete_emit="isfDelete($event)"
        @drawing_delete_emit="drawingDelete($event)"
        @divide="divide"
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
    <orderDivideForm
      :visible.sync="divide_dialog_form"
      :order="productionModel"
      @done="divideCompleted"
    />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Cookies from "js-cookie";
import date from "../../plugins/date";
import { io } from "socket.io-client";

export default {
  computed: {
    ...mapGetters([
      "getOrderProductionSourceTypes",
      "getOldProductionDetail",
      "getCostList",
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
      "getOrderProductionInsuranceTotal",
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
      oldOrderPayload: {},
      divide_dialog_form: false,
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
    this.$store.dispatch("setOrderProductionList");
    this.$store.dispatch("setOrderProductionSourceTypes");
  },
  methods: {
    divide() {
      // Butun veri orderDivideForm icinde sunucudan okunuyor.
      this.divide_dialog_form = true;
    },
    divideCompleted() {
      this.closeProductionForm();
      this.$store.dispatch("setOrderProductionList");
    },
    drawingDelete(event) {
      this.$axios.get(`/production/drawing/delete/${event}`).then((res) => {
        if (res.data.status) {
          this.$toast.success("Drawing deleted successfully");
          this.$store.commit("setOrderProductionProformaDelete", event);
        } else {
          this.$toast.error("Error while deleting drawing");
        }
      });
    },
    isfDelete(event) {
      this.$store.dispatch("setOrderProductionIsfDelete", event);
    },
    proformaDelete(id) {
      this.$store.dispatch("setOrderProductionProformaDelete", id);
    },
    excel_output() {
      this.$excelApi
        .post("/siparisler/dosyalar/uretimExcelCikti", this.getOrderList)
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
        if (this.$route.path == "/orders/production") {
          this.$store.dispatch("setOrderProductionList");
        } else if (this.$route.path == "/orders/waiting") {
          this.$store.dispatch("setOrderWaitingList");
        }

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
      if (
        this.productionModel.SiparisNo == null ||
        this.productionModel.SiparisNo == "" ||
        this.productionModel.SiparisNo == " " ||
        this.productionModel.SiparisNo == undefined
      ) {
        alert("Po name is missing");
        return;
      }
      if (
        this.productionModel.OdemeTurID == null ||
        this.productionModel.OdemeTurID == "" ||
        this.productionModel.OdemeTurID == " " ||
        this.productionModel.OdemeTurID == undefined ||
        this.productionModel.OdemeTurID == 0
      ) {
        alert("Payment Term is missing");
        return;
      }
      if (
        this.productionModel.Operasyon == null ||
        this.productionModel.Operasyon == "" ||
        this.productionModel.Operasyon == " " ||
        this.productionModel.Operasyon == undefined ||
        this.productionModel.Operasyon == 0
      ) {
        alert("Operation is missing");
        return;
      }
      if (
        this.productionModel.SiparisSahibi == null ||
        this.productionModel.SiparisSahibi == "" ||
        this.productionModel.SiparisSahibi == " " ||
        this.productionModel.SiparisSahibi == undefined ||
        this.productionModel.SiparisSahibi == 0
      ) {
        alert("Representative is missing");
        return;
      }
      if (
        this.productionModel.UlkeId == null ||
        this.productionModel.UlkeId == "" ||
        this.productionModel.UlkeId == " " ||
        this.productionModel.UlkeId == undefined ||
        this.productionModel.UlkeId == 0
      ) {
        alert("Country is missing");
        return;
      }
      if (
        this.productionModel.MusteriID == null ||
        this.productionModel.MusteriID == "" ||
        this.productionModel.MusteriID == " " ||
        this.productionModel.MusteriID == undefined ||
        this.productionModel.MusteriID == 0
      ) {
        alert("Customer is missing");
        return;
      }
      if (
        this.productionModel.Finansman == null ||
        this.productionModel.Finansman == "" ||
        this.productionModel.Finansman == " " ||
        this.productionModel.Finansman == undefined ||
        this.productionModel.Finansman == 0
      ) {
        alert("Finansman is missing");
        return;
      }
      if (
        this.productionModel.TeslimTurID == null ||
        this.productionModel.TeslimTurID == "" ||
        this.productionModel.TeslimTurID == " " ||
        this.productionModel.TeslimTurID == undefined ||
        this.productionModel.TeslimTurID == 0
      ) {
        alert("Delivery Term is missing");
        return;
      }
      if (
        this.productionModel.FaturaKesimTurID == null ||
        this.productionModel.FaturaKesimTurID == "" ||
        this.productionModel.FaturaKesimTurID == " " ||
        this.productionModel.FaturaKesimTurID == undefined ||
        this.productionModel.FaturaKesimTurID == 0
      ) {
        alert("Invoice Type is missing");
        return;
      }
      if (
        this.productionModel.SiparisTarihi == null ||
        this.productionModel.SiparisTarihi == "" ||
        this.productionModel.SiparisTarihi == " " ||
        this.productionModel.SiparisTarihi == undefined ||
        this.productionModel.SiparisTarihi == 0
      ) {
        alert("Order date is missing");
        return;
      }

      if (
        this.productionModel.TahminiYuklemeTarihi == null ||
        this.productionModel.TahminiYuklemeTarihi == "" ||
        this.productionModel.TahminiYuklemeTarihi == " " ||
        this.productionModel.TahminiYuklemeTarihi == undefined ||
        this.productionModel.TahminiYuklemeTarihi == 0
      ) {
        alert("Estimated date is missing");
        return;
      }
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
      this.productionModel.SiparisKontrolEden = Cookies.get("userId");

      this.$store.dispatch("setOrderProductionUpdate", {
        ...this.productionModel,
        SiparisId: this.getOrderProductionId,
      });

      this.costControlUpdate(this.productionModel, { ...this.oldOrderPayload });
    },
    __zeroControl(event) {
      if (event.toString().length == 1) {
        return "0" + event.toString();
      } else {
        return event.toString();
      }
    },
    async save() {
      if (
        this.productionModel.SiparisNo == null ||
        this.productionModel.SiparisNo == "" ||
        this.productionModel.SiparisNo == " " ||
        this.productionModel.SiparisNo == undefined
      ) {
        alert("Po name is missing");
        return;
      }
      if (
        this.productionModel.OdemeTurID == null ||
        this.productionModel.OdemeTurID == "" ||
        this.productionModel.OdemeTurID == " " ||
        this.productionModel.OdemeTurID == undefined ||
        this.productionModel.OdemeTurID == 0
      ) {
        alert("Payment Term is missing");
        return;
      }
      if (
        this.productionModel.Operasyon == null ||
        this.productionModel.Operasyon == "" ||
        this.productionModel.Operasyon == " " ||
        this.productionModel.Operasyon == undefined ||
        this.productionModel.Operasyon == 0
      ) {
        alert("Operation is missing");
        return;
      }
      if (
        this.productionModel.SiparisSahibi == null ||
        this.productionModel.SiparisSahibi == "" ||
        this.productionModel.SiparisSahibi == " " ||
        this.productionModel.SiparisSahibi == undefined ||
        this.productionModel.SiparisSahibi == 0
      ) {
        alert("Representative is missing");
        return;
      }
      if (
        this.productionModel.UlkeId == null ||
        this.productionModel.UlkeId == "" ||
        this.productionModel.UlkeId == " " ||
        this.productionModel.UlkeId == undefined ||
        this.productionModel.UlkeId == 0
      ) {
        alert("Country is missing");
        return;
      }
      if (
        this.productionModel.MusteriID == null ||
        this.productionModel.MusteriID == "" ||
        this.productionModel.MusteriID == " " ||
        this.productionModel.MusteriID == undefined ||
        this.productionModel.MusteriID == 0
      ) {
        alert("Customer is missing");
        return;
      }
      if (
        this.productionModel.Finansman == null ||
        this.productionModel.Finansman == "" ||
        this.productionModel.Finansman == " " ||
        this.productionModel.Finansman == undefined ||
        this.productionModel.Finansman == 0
      ) {
        alert("Finansman is missing");
        return;
      }
      if (
        this.productionModel.TeslimTurID == null ||
        this.productionModel.TeslimTurID == "" ||
        this.productionModel.TeslimTurID == " " ||
        this.productionModel.TeslimTurID == undefined ||
        this.productionModel.TeslimTurID == 0
      ) {
        alert("Delivery Term is missing");
        return;
      }
      if (
        this.productionModel.FaturaKesimTurID == null ||
        this.productionModel.FaturaKesimTurID == "" ||
        this.productionModel.FaturaKesimTurID == " " ||
        this.productionModel.FaturaKesimTurID == undefined ||
        this.productionModel.FaturaKesimTurID == 0
      ) {
        alert("Invoice Type is missing");
        return;
      }
      if (
        this.productionModel.SiparisTarihi == null ||
        this.productionModel.SiparisTarihi == "" ||
        this.productionModel.SiparisTarihi == " " ||
        this.productionModel.SiparisTarihi == undefined ||
        this.productionModel.SiparisTarihi == 0
      ) {
        alert("Order date is missing");
        return;
      }
      if (
        this.productionModel.TahminiYuklemeTarihi == null ||
        this.productionModel.TahminiYuklemeTarihi == "" ||
        this.productionModel.TahminiYuklemeTarihi == " " ||
        this.productionModel.TahminiYuklemeTarihi == undefined ||
        this.productionModel.TahminiYuklemeTarihi == 0
      ) {
        alert("Estimated date is missing");
        return;
      }

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

      this.$store.dispatch("setOrderProductionSaveButtonStatus", true);

      await this.$store.dispatch(
        "setOrderProductionSave",
        this.productionModel
      );
      this.$store.getters.getSocket.emit("production_save_emit");
      this.$store.dispatch(
        "setOrderProductionPo",
        this.productionModel.SiparisNo
      );
      this.costControlAdd(this.productionModel);
    },
    costControlAdd(payload) {
      const user = Cookies.get("username");
      const po = payload.SiparisNo;
      const date = new Date();
      const customer = payload.MusteriAdi;
      const seller = payload.SiparisSahibiAdi;
      const operation = payload.OperasyonAdi;
      const finansman = payload.FinansmanAdi;
      const prePayment = payload.Pesinat;
      const maturity = payload.Vade;
      const country = payload.Ulke;
      const paymetDesc = payload.OdemeAciklama;
      const containerDesc = payload.KonteynerAyrinti;
      const commission = payload.Komisyon;
      const refund = payload.Iade;
      const productionDesc = payload.UretimAciklama;
      const shippedDesc = payload.SevkiyatAciklama;
      const financeDesc = payload.FinansAciklama;
      const freightSelling = payload.NavlunSatis;
      const freightSellingCompany = payload.NavlunFirma;
      const detail1 = payload.DetayTutar_1;
      const detail1Desc = payload.DetayAciklama_1;
      const detail2 = payload.DetayTutar_2;
      const detail2Desc = payload.DetayAciklama_2;
      const insuranceSelling = payload.sigorta_tutar_satis;
      const freightBuying = payload.NavlunAlis;
      const freightBuyingDesc = payload.DetayMekmarNot_1;
      const detail1Buying = payload.DetayAlis_1;
      const detail1BuyingDesc = payload.DetayMekmarNot_2;
      const detail2Buying = payload.DetayAlis_2;
      const detail2BuyingDesc = payload.DetayMekmarNot_3;
      const insuranceBuying = payload.sigorta_Tutar;
      const paymentKind = payload.OdemeTur;
      const shippedKind = payload.TeslimTur;
      const invoiceKind = payload.FaturaKesimTurAdi;

      if (po == null || po == "" || po == " " || po == undefined || po == 0) {
        console.log("");
      } else {
        const data = {
          date: date,
          user: user,
          po: po,
          desc: po + " po su sipariş olarak eklenmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }
      if (
        customer == null ||
        customer == "" ||
        customer == " " ||
        customer == undefined ||
        customer == 0
      ) {
        console.log("");
      } else {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po +
            " po sahip siparişe " +
            customer +
            " müşteri olarak girilmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }
      if (
        seller == null ||
        seller == "" ||
        seller == " " ||
        seller == undefined ||
        seller == 0
      ) {
        console.log("");
      } else {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po +
            " po sahip siparişe " +
            seller +
            " satış temsilci olarak girilmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }
      if (
        operation == null ||
        operation == "" ||
        operation == " " ||
        operation == undefined ||
        operation == 0
      ) {
        console.log("");
      } else {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po +
            " po sahip siparişe " +
            operation +
            " operasyoncu olarak girilmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }
      if (
        finansman == null ||
        finansman == "" ||
        finansman == " " ||
        finansman == undefined ||
        finansman == 0
      ) {
        console.log("");
      } else {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po +
            " po sahip siparişe " +
            finansman +
            " finansman olarak girilmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }
      if (
        prePayment == null ||
        prePayment == "" ||
        prePayment == " " ||
        prePayment == undefined ||
        prePayment == 0
      ) {
        console.log("");
      } else {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po +
            " po sahip siparişe $" +
            prePayment +
            " pesinat olarak girilmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }
      if (
        maturity == null ||
        maturity == "" ||
        maturity == " " ||
        maturity == undefined ||
        maturity == 0
      ) {
      } else {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po + " po sahip siparişe " + maturity + " vade olarak girilmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }
      if (
        country == null ||
        country == "" ||
        country == " " ||
        country == undefined ||
        country == 0
      ) {
        console.log("");
      } else {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po + " po sahip siparişe " + country + " ülke olarak girilmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }
      if (
        paymetDesc == null ||
        paymetDesc == "" ||
        paymetDesc == " " ||
        paymetDesc == undefined ||
        paymetDesc == 0
      ) {
        console.log("");
      } else {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po +
            " po sahip siparişe ~" +
            paymetDesc +
            "~ ödeme açıklaması olarak girilmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }
      if (
        containerDesc == null ||
        containerDesc == "" ||
        containerDesc == " " ||
        containerDesc == undefined ||
        containerDesc == 0
      ) {
        console.log("");
      } else {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po +
            " po sahip siparişe ~" +
            containerDesc +
            "~ konteyner ayrıntı olarak girilmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }
      if (
        commission == null ||
        commission == "" ||
        commission == " " ||
        commission == undefined ||
        commission == 0
      ) {
        console.log("");
      } else {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po +
            " po sahip siparişe $" +
            commission +
            " komisyon olarak girilmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }
      if (
        refund == null ||
        refund == "" ||
        refund == " " ||
        refund == undefined ||
        refund == 0
      ) {
        console.log("");
      } else {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po + " po sahip siparişe $" + refund + " iade olarak girilmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }
      if (
        productionDesc == null ||
        productionDesc == "" ||
        productionDesc == " " ||
        productionDesc == undefined ||
        productionDesc == 0
      ) {
        console.log("");
      } else {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po +
            " po sahip siparişe ~" +
            productionDesc +
            "~ üretim açıklaması olarak girilmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }
      if (
        shippedDesc == null ||
        shippedDesc == "" ||
        shippedDesc == " " ||
        shippedDesc == undefined ||
        shippedDesc == 0
      ) {
        console.log("");
      } else {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po +
            " po sahip siparişe ~" +
            shippedDesc +
            "~ sevkiyat açıklaması olarak girilmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }
      if (
        financeDesc == null ||
        financeDesc == "" ||
        financeDesc == " " ||
        financeDesc == undefined ||
        financeDesc == 0
      ) {
        console.log("");
      } else {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po +
            " po sahip siparişe ~" +
            financeDesc +
            "~ finans açıklaması olarak girilmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }
      if (
        freightSelling == null ||
        freightSelling == "" ||
        freightSelling == " " ||
        freightSelling == undefined ||
        freightSelling == 0
      ) {
        console.log("");
      } else {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po +
            " po sahip siparişe $" +
            freightSelling +
            " navlun satış fiyatı olarak girilmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }
      if (
        freightSellingCompany == null ||
        freightSellingCompany == "" ||
        freightSellingCompany == " " ||
        freightSellingCompany == undefined ||
        freightSellingCompany == 0
      ) {
        console.log("");
      } else {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po +
            " po sahip siparişe ~" +
            freightSellingCompany +
            "~ navlun satış açıklama olarak girilmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }
      if (
        detail1 == null ||
        detail1 == "" ||
        detail1 == " " ||
        detail1 == undefined ||
        detail1 == 0
      ) {
        console.log("");
      } else {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po +
            " po sahip siparişe $" +
            detail1 +
            " detay 1 satış fiyatı olarak girilmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }
      if (
        detail2 == null ||
        detail2 == "" ||
        detail2 == " " ||
        detail2 == undefined ||
        detail2 == 0
      ) {
        console.log("");
      } else {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po +
            " po sahip siparişe $" +
            detail2 +
            " detay 2 satış fiyatı olarak girilmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }
      if (
        detail1Desc == null ||
        detail1Desc == "" ||
        detail1Desc == " " ||
        detail1Desc == undefined ||
        detail1Desc == 0
      ) {
        console.log("");
      } else {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po +
            " po sahip siparişe ~" +
            detail1Desc +
            "~ detay 1 satış açıklama olarak girilmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }
      if (
        detail2Desc == null ||
        detail2Desc == "" ||
        detail2Desc == " " ||
        detail2Desc == undefined ||
        detail2Desc == 0
      ) {
        console.log("");
      } else {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po +
            " po sahip siparişe ~" +
            detail2Desc +
            "~ detay 2 satış açıklama olarak girilmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }
      if (
        insuranceSelling == null ||
        insuranceSelling == "" ||
        insuranceSelling == " " ||
        insuranceSelling == undefined ||
        insuranceSelling == 0
      ) {
        console.log("");
      } else {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po +
            " po sahip siparişe $" +
            insuranceSelling +
            " sigorta satış olarak girilmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }
      if (
        freightBuying == null ||
        freightBuying == "" ||
        freightBuying == " " ||
        freightBuying == undefined ||
        freightBuying == 0
      ) {
        console.log("");
      } else {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po +
            " po sahip siparişe $" +
            freightBuying +
            " navlun alış fiyatı olarak girilmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }
      if (
        freightBuyingDesc == null ||
        freightBuyingDesc == "" ||
        freightBuyingDesc == " " ||
        freightBuyingDesc == undefined ||
        freightBuyingDesc == 0
      ) {
        console.log("");
      } else {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po +
            " po sahip siparişe ~" +
            freightBuyingDesc +
            "~ navlun alış açıklama olarak girilmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }

      if (
        detail1Buying == null ||
        detail1Buying == "" ||
        detail1Buying == " " ||
        detail1Buying == undefined ||
        detail1Buying == 0
      ) {
        console.log("");
      } else {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po +
            " po sahip siparişe $" +
            detail1Buying +
            " detay 1 alış fiyatı olarak girilmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }
      if (
        detail2Buying == null ||
        detail2Buying == "" ||
        detail2Buying == " " ||
        detail2Buying == undefined ||
        detail2Buying == 0
      ) {
        console.log("");
      } else {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po +
            " po sahip siparişe $" +
            detail2Buying +
            " detay 2 alış fiyatı olarak girilmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }

      if (
        detail1BuyingDesc == null ||
        detail1BuyingDesc == "" ||
        detail1BuyingDesc == " " ||
        detail1BuyingDesc == undefined ||
        detail1BuyingDesc == 0
      ) {
        console.log("");
      } else {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po +
            " po sahip siparişe ~" +
            detail1BuyingDesc +
            "~ detay 1 alış açıklama olarak girilmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }

      if (
        detail2BuyingDesc == null ||
        detail2BuyingDesc == "" ||
        detail2BuyingDesc == " " ||
        detail2BuyingDesc == undefined ||
        detail2BuyingDesc == 0
      ) {
        console.log("");
      } else {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po +
            " po sahip siparişe ~" +
            detail2BuyingDesc +
            "~ detay 1 alış açıklama olarak girilmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }
      if (
        insuranceBuying == null ||
        insuranceBuying == "" ||
        insuranceBuying == " " ||
        insuranceBuying == undefined ||
        insuranceBuying == 0
      ) {
        console.log("");
      } else {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po +
            " po sahip siparişe $" +
            insuranceBuying +
            " sigorta alış olarak girilmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }

      if (
        paymentKind == null ||
        paymentKind == "" ||
        paymentKind == " " ||
        paymentKind == undefined ||
        paymentKind == 0
      ) {
        console.log("");
      } else {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po +
            " po sahip siparişe ~" +
            paymentKind +
            "~ ödeme tür olarak girilmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }

      if (
        shippedKind == null ||
        shippedKind == "" ||
        shippedKind == " " ||
        shippedKind == undefined ||
        shippedKind == 0
      ) {
        console.log("");
      } else {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po +
            " po sahip siparişe ~" +
            shippedKind +
            "~ yükleme tür olarak girilmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }

      if (
        invoiceKind == null ||
        invoiceKind == "" ||
        invoiceKind == " " ||
        invoiceKind == undefined ||
        invoiceKind == 0
      ) {
        console.log("");
      } else {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po +
            " po sahip siparişe ~" +
            invoiceKind +
            "~ fatura tür olarak girilmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }

      this.$axios.post("/production/add/cost/list", this.getCostList);
      this.$store.dispatch("resetCostList");
    },
    costControlUpdate(newList, oldList) {
      const user = Cookies.get("username");
      const po = oldList.SiparisNo;
      const date = new Date();

      const newCustomer = newList.MusteriAdi;
      const newSeller = newList.SiparisSahibiAdi;
      const newOperation = newList.OperasyonAdi;
      const newFinansman = newList.FinansmanAdi;
      const newPrePayment = newList.Pesinat;
      const newMaturity = newList.Vade;
      const newCountry = newList.Ulke;
      const newPaymetDesc = newList.OdemeAciklama;
      const newContainerDesc = newList.KonteynerAyrinti;
      const newCommission = newList.Komisyon;
      const newRefund = newList.Iade;
      const newProductionDesc = newList.UretimAciklama;
      const newShippedDesc = newList.SevkiyatAciklama;
      const newFinanceDesc = newList.FinansAciklama;
      const newFreightSelling = newList.NavlunSatis;
      const newFreightSellingCompany = newList.NavlunFirma;
      const newDetail1 = newList.DetayTutar_1;
      const newDetail1Desc = newList.DetayAciklama_1;
      const newDetail2 = newList.DetayTutar_2;
      const newDetail2Desc = newList.DetayAciklama_2;
      const newInsuranceSelling = newList.sigorta_tutar_satis;
      const newFreightBuying = newList.NavlunAlis;
      const newFreightBuyingDesc = newList.DetayMekmarNot_1;
      const newDetail1Buying = newList.DetayAlis_1;
      const newDetail1BuyingDesc = newList.DetayMekmarNot_2;
      const newDetail2Buying = newList.DetayAlis_2;
      const newDetail2BuyingDesc = newList.DetayMekmarNot_3;
      const newInsuranceBuying = newList.sigorta_Tutar;
      const newPaymentKind = newList.OdemeTur;
      const newShippedKind = newList.TeslimTur;
      const newInvoiceKind = newList.FaturaKesimTurAdi;

      const oldCustomer = oldList.MusteriAdi;
      const oldSeller = oldList.SiparisSahibiAdi;
      const oldOperation = oldList.OperasyonAdi;
      const oldFinansman = oldList.FinansmanAdi;
      const oldPrePayment = oldList.Pesinat;
      const oldMaturity = oldList.Vade;
      const oldCountry = oldList.Ulke;
      const oldPaymetDesc = oldList.OdemeAciklama;
      const oldContainerDesc = oldList.KonteynerAyrinti;
      const oldCommission = oldList.Komisyon;
      const oldRefund = oldList.Iade;
      const oldProductionDesc = oldList.UretimAciklama;
      const oldShippedDesc = oldList.SevkiyatAciklama;
      const oldFinanceDesc = oldList.FinansAciklama;
      const oldFreightSelling = oldList.NavlunSatis;
      const oldFreightSellingCompany = oldList.NavlunFirma;
      const oldDetail1 = oldList.DetayTutar_1;
      const oldDetail1Desc = oldList.DetayAciklama_1;
      const oldDetail2 = oldList.DetayTutar_2;
      const oldDetail2Desc = oldList.DetayAciklama_2;
      const oldInsuranceSelling = oldList.sigorta_tutar_satis;
      const oldFreightBuying = oldList.NavlunAlis;
      const oldFreightBuyingDesc = oldList.DetayMekmarNot_1;
      const oldDetail1Buying = oldList.DetayAlis_1;
      const oldDetail1BuyingDesc = oldList.DetayMekmarNot_2;
      const oldDetail2Buying = oldList.DetayAlis_2;
      const oldDetail2BuyingDesc = oldList.DetayMekmarNot_3;
      const oldInsuranceBuying = oldList.sigorta_Tutar;
      const oldPaymentKind = oldList.OdemeTur;
      const oldShippedKind = oldList.TeslimTur;
      const oldInvoiceKind = oldList.FaturaKesimTurAdi;

      if (newCustomer != oldCustomer) {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po +
            " po sahip siparişinin müşteri bilgisi " +
            oldCustomer +
            " dan => " +
            newCustomer +
            " olarak güncellenmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }
      if (newSeller != oldSeller) {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po +
            " po sahip siparişinin siparişçi bilgisi " +
            oldSeller +
            " dan => " +
            newSeller +
            " olarak güncellenmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }
      if (newOperation != oldOperation) {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po +
            " po sahip siparişinin operasyon bilgisi " +
            oldOperation +
            " dan => " +
            newOperation +
            " olarak güncellenmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }
      if (newFinansman != oldFinansman) {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po +
            " po sahip siparişinin finansman bilgisi " +
            oldFinansman +
            " dan => " +
            newFinansman +
            " olarak güncellenmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }
      if (newPrePayment != oldPrePayment) {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po +
            " po sahip siparişinin pesinat bilgisi $" +
            oldPrePayment +
            " dan => $" +
            newPrePayment +
            " olarak güncellenmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }
      if (newMaturity != oldMaturity) {
        if (newMaturity == null || oldMaturity == null) {
          console.log("");
        } else {
          const data = {
            date: date,
            user: user,
            po: po,
            desc:
              po +
              " po sahip siparişinin vade tarihi " +
              oldMaturity +
              " dan => " +
              newMaturity +
              " olarak güncellenmiştir.",
          };
          this.$store.dispatch("addCost", data);
        }
      }
      if (newCountry != oldCountry) {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po +
            " po sahip siparişinin ülke bilgisi " +
            oldCountry +
            " dan => " +
            newCountry +
            " olarak güncellenmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }
      if (newPaymetDesc != oldPaymetDesc) {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po +
            " po sahip siparişinin ödeme bilgisi ~" +
            oldPaymetDesc +
            "~ dan => ~" +
            newPaymetDesc +
            "~ olarak güncellenmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }
      if (newContainerDesc != oldContainerDesc) {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po +
            " po sahip siparişinin konteyner bilgisi ~" +
            oldContainerDesc +
            "~ dan => ~" +
            newContainerDesc +
            "~ olarak güncellenmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }
      if (newCommission != oldCommission) {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po +
            " po sahip siparişinin komisyon bilgisi $" +
            oldCommission +
            " dan => $" +
            newCommission +
            " olarak güncellenmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }
      if (newRefund != oldRefund) {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po +
            " po sahip siparişinin iade bilgisi $" +
            oldRefund +
            " dan => $" +
            newRefund +
            " olarak güncellenmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }
      if (newProductionDesc != oldProductionDesc) {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po +
            " po sahip siparişinin ürün üretimi bilgisi ~" +
            oldProductionDesc +
            "~ dan => ~" +
            newProductionDesc +
            "~ olarak güncellenmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }
      if (newShippedDesc != oldShippedDesc) {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po +
            " po sahip siparişinin teslim bilgisi ~" +
            oldShippedDesc +
            "~ dan => ~" +
            newShippedDesc +
            "~ olarak güncellenmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }
      if (newFinanceDesc != oldFinanceDesc) {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po +
            " po sahip siparişinin finans açıklama bilgisi ~" +
            oldFinanceDesc +
            "~ dan => ~" +
            newFinanceDesc +
            "~ olarak güncellenmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }
      if (newFreightSelling != oldFreightSelling) {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po +
            " po sahip siparişinin navlun satış bilgisi $" +
            oldFreightSelling +
            "dan => $" +
            newFreightSelling +
            " olarak güncellenmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }
      if (newFreightSellingCompany != oldFreightSellingCompany) {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po +
            " po sahip siparişinin navlun satış şirketi ~" +
            oldFreightSellingCompany +
            "~ dan => ~" +
            newFreightSellingCompany +
            "~ olarak güncellenmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }
      if (newDetail1 != oldDetail1) {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po +
            " po sahip siparişinin detay 1 satış $" +
            oldDetail1 +
            "~ dan => $" +
            newDetail1 +
            "~ olarak güncellenmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }
      if (newDetail1Desc != oldDetail1Desc) {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po +
            " po sahip siparişinin detay 1 satış açıklama ~" +
            oldDetail1Desc +
            "~ dan => ~" +
            newDetail1Desc +
            "~ olarak güncellenmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }
      if (newDetail2 != oldDetail2) {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po +
            " po sahip siparişinin detay 2 satış $" +
            oldDetail2 +
            " dan => $" +
            newDetail2 +
            " olarak güncellenmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }
      if (newDetail2Desc != oldDetail2Desc) {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po +
            " po sahip siparişinin detay 2 satış açıklama ~" +
            oldDetail2Desc +
            "~ dan => ~" +
            newDetail2Desc +
            "~ olarak güncellenmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }
      if (newInsuranceSelling != oldInsuranceSelling) {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po +
            " po sahip siparişinin sigorta satış $" +
            oldInsuranceSelling +
            " dan => $" +
            newInsuranceSelling +
            " olarak güncellenmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }
      if (newFreightBuying != oldFreightBuying) {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po +
            " po sahip siparişinin navlun alış $" +
            oldFreightBuying +
            " dan => $" +
            newFreightBuying +
            " olarak güncellenmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }
      if (newFreightBuyingDesc != oldFreightBuyingDesc) {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po +
            " po sahip siparişinin navlun alış açıklama ~" +
            oldFreightBuyingDesc +
            "~ dan => ~" +
            newFreightBuyingDesc +
            "~ olarak güncellenmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }
      if (newDetail1Buying != oldDetail1Buying) {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po +
            " po sahip siparişinin detay 1 alış $" +
            oldDetail1Buying +
            " dan => $" +
            newDetail1Buying +
            " olarak güncellenmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }
      if (newDetail1BuyingDesc != oldDetail1BuyingDesc) {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po +
            " po sahip siparişinin detay 1 alış açıklama ~" +
            oldDetail1BuyingDesc +
            "~ dan => ~" +
            newDetail1BuyingDesc +
            "~ olarak güncellenmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }
      if (newDetail2Buying != oldDetail2Buying) {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po +
            " po sahip siparişinin detay 2 alış $" +
            oldDetail2Buying +
            " dan => $" +
            newDetail2Buying +
            " olarak güncellenmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }
      if (newDetail2BuyingDesc != oldDetail2BuyingDesc) {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po +
            " po sahip siparişinin detay 2 alış açıklama ~" +
            oldDetail2BuyingDesc +
            "~ dan => ~" +
            newDetail2BuyingDesc +
            "~ olarak güncellenmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }
      if (newInsuranceBuying != oldInsuranceBuying) {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po +
            " po sahip siparişinin sigorta alış $" +
            oldInsuranceBuying +
            " dan => $" +
            newInsuranceBuying +
            " olarak güncellenmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }
      if (newPaymentKind != oldPaymentKind) {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po +
            " po sahip siparişinin ödeme türü ~" +
            oldPaymentKind +
            "~ dan => ~" +
            newPaymentKind +
            "~ olarak güncellenmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }
      if (newShippedKind != oldShippedKind) {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po +
            " po sahip siparişinin gönderim türü ~" +
            oldShippedKind +
            "~ dan => ~" +
            newShippedKind +
            "~ olarak güncellenmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }
      if (newInvoiceKind != oldInvoiceKind) {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po +
            " po sahip siparişinin fatura türü ~" +
            oldInvoiceKind +
            "~ dan => ~" +
            newInvoiceKind +
            "~ olarak güncellenmiştir.",
        };
        this.$store.dispatch("addCost", data);
      }
      this.$axios.post("/production/add/cost/list", this.getCostList);
      this.$store.dispatch("resetCostList");
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
      this.$store.dispatch("setOrderProductionSourceTypes");
      this.$store.commit("setOrderSupplierProductList", []);
      this.$store.dispatch("setOrderAllList");
      this.productionModel = this.getOrderProductionModel;
      this.production_detail_form = true;
    },
    productionSelected(event) {
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
      this.$store.dispatch("setOrderProductionSourceTypes");

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
      this.$store.dispatch("setOrderProductionCustomer", event.FirmaAdi);
      this.production_detail_form = true;
      this.oldOrderPayload = { ...event };
      this.$store.dispatch("resetCostList");
    },
  },
  mounted() {
    this.$store.dispatch("setConnection");

    this.$store.getters.getSocket.on("update_production_on", () => {
      console.log("update_production_on");
      this.$store.dispatch("setOrderProductionList");
    });
  },
  beforeDestroy() {
    if (this.socket) {
      this.$store.dispatch("setDisconnect");
    }
  },

  watch: {
    getOrderProductionYearsList() {
      this.selectedYear = { Yil: new Date().getFullYear() };
    },
  },
};
</script>
<style scoped>
.visible {
  visibility: hidden;
}
@media screen and (max-width: 576px) {
  .row {
    clear: both;
    display: block;
    float: left;
  }
  .col-4 {
    clear: both;
    display: block;
    float: left;
  }
  .visible {
    visibility: visible;
  }
}
</style>
