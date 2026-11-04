<template>
  <div>
    <div class="row m-auto text-center">
      <div class="col">
        <Button
          type="button"
          severity="success" class="w-100"
          label="New Product"
          @click="newForm"
        />
      </div>
    </div>
    <OrderShippedList
      :list="orderStore.getOrderList"
      @production_selected_emit="productionSelected($event)"
      :status="'Shipped 2'"
      :total="orderStore.getOrderProductionTotal"
    />
    <Dialog
      v-model:visible="production_detail_form"
      header=""
      modal
      :style="{ width: '100%' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
      :closeOnEscape="false"
      :closable="false"
    >
      <OrderDetailForm
        :modelProduction="productionModel"
        :modelProduct="modelsStore.getOrderProductModel"
        :status="orderStore.getOrderProductionButtonStatus"
        :customer="sharedStore.getCustomersList"
        :user="sharedStore.getUserList"
        :productsList="orderStore.getOrderProductionProductDetailList"
        :supplier="sharedStore.getSupplierList"
        :unit="sharedStore.getUnitList"
        :po="orderStore.getOrderProductionPo"
        :delivery="sharedStore.getOrderKindOfDeliveryList"
        :payment="sharedStore.getOrderKindOfPaymentList"
        :country="sharedStore.getCountryList"
        :invoice="sharedStore.getOrderKindOfInvoiceList"
        :cost="orderStore.getOrderProductionCostList"
        :costTotal="orderStore.getOrderProductionCostTotal"
        :supplierDelivery="sharedStore.getOrderKindOfDeliverySupplierList"
        :productSupplier="orderStore.getOrderProductionSupplierList"
        :supplierProduct="orderStore.getOrderSupplierProductList"
        :document="orderStore.getOrderProductionDocumentList"
        :check="orderStore.getOrderProductionCheckList"
        :checkTotal="orderStore.getOrderProductionCheckListTotal"
        :productCalculation="orderStore.getOrderProductionProductTotal"
        :freightCalculation="orderStore.getOrderProductionFreightTotal"
        :detailCalculation="orderStore.getOrderProductionDetailTotal"
        :detailProductTotal="orderStore.getOrderProductionProductDetailTotal"
        :detailProductCost="orderStore.getOrderProductionProductDetailCostTotal"
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
        :source="orderStore.getOrderProductionSourceTypes"
      />
    </Dialog>

    <Dialog v-model:visible="workerman_dialog_form" header="" modal>
      <OrderDetailWorkermanForm
        :list="orderStore.getOrderProductionProductDetailWorkermanList"
        :model="modelsStore.getOrderProductWorkermanModel"
        :supplier="sharedStore.getSupplierList"
        :productId="productId"
        :po="orderStore.getOrderProductionPo"
      />
    </Dialog>
  </div>
</template>
<script>
import { useOrderStore } from "~/stores/order"
import { useModelsStore } from "~/stores/models"
import { useSharedStore } from "~/stores/shared"
import { toIsoDate } from "~/utils/dates"
export default {
  computed: {
    orderStore() {
      return useOrderStore()
    },
    modelsStore() {
      return useModelsStore()
    },
    sharedStore() {
      return useSharedStore()
    },
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

  /*
   * [x] created() KALDIRILDI -- veri cekimi dosyanin sonundaki
   * <script setup> blogunda useAsyncData ile. Gerekcesi orada.
   */
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
      this.orderStore.setOrderProductionIsfDelete(event);
    },
    proformaDelete(id) {
      this.orderStore.setOrderProductionProformaDelete(id);
    },
    yearChange(event) {
      if (event.value.Yil == "All") {
        this.orderStore.setOrderShippedList();
      } else {
        this.orderStore.setOrderShippedListYear(event.value.Yil);
      }
    },
    closeProductionForm() {
      const data = {
        po: this.orderStore.getOrderProductionPo,
        date: toIsoDate(new Date()),
        username: useCookie("username").value,
        added: this.orderStore.getOrderProductAdded,
        updated: this.orderStore.getOrderProductUpdated,
        deleted: this.orderStore.getOrderProductDeleted,
        operation: this.productionModel.operationMail,
        representative: this.productionModel.representativeMail,
        status: 3,
      };
      if (confirm("Çıkmak istediğinize emin misiniz?")) {
        this.orderStore.setProductionProductSaveMail(data);
        this.production_detail_form = false;
      }
    },
    workermanSelected(event) {
      this.productId = event;
      const data = {
        productId: event,
        po: this.orderStore.getOrderProductionPo,
      };
      this.orderStore.setProductionProductWorkermanList(data);

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

      this.orderStore.setOrderProductionUpdate(this.productionModel);
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
      this.productionModel.KayitTarihi = toIsoDate(new Date());
      this.productionModel.KullaniciID = useCookie("userId").value;
      this.productionModel.SiparisKontrolEden = 0;

      this.orderStore.setOrderProductionSave(this.productionModel);
      this.orderStore.setOrderProductionPo(this.productionModel.SiparisNo
      );
    },
    process() {
      if (this.orderStore.getOrderProductionButtonStatus) {
        this.save();
      } else {
        this.update();
      }
    },
    newForm() {
      this.orderStore.setOrderProductionSourceTypes();

      this.orderStore.setOrderProductionButtonStatus(true);
      this.modelsStore.setOrderProductionModel();
      this.modelsStore.setOrderProductModel();
      this.orderStore.setOrderProductionDetailListReset();
      this.orderStore.MUT_setOrderSupplierProductList([]);

      this.productionModel = this.modelsStore.getOrderProductionModel;
      this.production_detail_form = true;
    },
    productionSelected(event) {
      this.orderStore.setOrderProductionSourceTypes();

      this.orderStore.setOrderProductionButtonStatus(false);
      this.modelsStore.setOrderProductModel();
      this.orderStore.setOrderProductionProductDetailList(event.SiparisNo
      );
      this.orderStore.setOrderProductionCostList(event.SiparisNo);
      this.orderStore.setOrderProductionSupplierList(event.SiparisNo);
      this.orderStore.setOrderProductionDocumentList(event.SiparisNo);
      this.orderStore.setOrderProductionCheckList(event.SiparisNo);
      this.orderStore.setOrderProductionFreightTotal(event.NavlunSatis);
      this.orderStore.setOrderProductionInsuranceTotal(event.sigorta_tutar_satis
      );
      this.orderStore.setOrderProductionDetailTotal(event);
      this.orderStore.setOrderProductionProductDetailCostTotal(event);
      this.orderStore.setOrderProductionProductDetailNotChangeListReset();
      this.orderStore.MUT_setOrderSupplierProductList([]);

      this.productionModel = event;
      this.orderStore.setOrderProductionPo(event.SiparisNo);
      this.production_detail_form = true;
    },
  },
  watch: {
    "orderStore.getOrderProductionYearsList"() {
      this.selectedYear = { Yil: new Date().getFullYear() };
    },
  },
};
</script>

<script setup>
/*
 * Acilir listelerin REFERANS VERISI -- detay diyalogunun Customer
 * AutoComplete'i ve proforma Select alanlari bunlari okuyor. Nuxt 2'de
 * layouts/default.vue cekiyordu; pilotun layout'u bilerek ertelemis.
 * Ayrinti: app/composables/useOrderReferenceData.ts
 */
await useOrderReferenceData()

/*
 * Veri cekimi NEDEN created() icinde degil: SSR created() icindeki async
 * isi BEKLEMEZ -- liste BOS serialize edilir, client hydration onu
 * devralir ve created() bir daha calismadigi icin tablo bos kalir;
 * ayrica loading sayaci payload'da 1 kalip spinner'i kilitler
 * (bkz. commit 2afc877e3).
 *
 * server: false ZORUNLU -- legacy Express API'si SSR'in IC fetch yolunda
 * calismiyor (bkz. server/middleware/1.legacy-api.ts).
 */
const orderStore = useOrderStore()

await useAsyncData("reports-mekmer-shipped", async () => {
  await Promise.all([
      orderStore.setOrderShippedMekmer2List(),
      orderStore.setOrderProductionSourceTypes(),
  ])
  return true
}, { server: false })
</script>
