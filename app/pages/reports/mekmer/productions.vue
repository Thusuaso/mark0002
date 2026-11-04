<template>
  <div class="">
    <div class="row m-auto text-center">
      <div class="col-6">
        <Button
          type="button"
          severity="success" class="w-100"
          label="New Order"
          @click="newForm"
        />
      </div>

      <div class="col-6">
        <Button
          severity="warn" class="w-100"
          label="Excel"
          @click="excel_output"
        />
      </div>
    </div>
    <OrderTable2
      :list="orderStore.getOrderList"
      @production_selected_emit="productionSelected($event)"
      :loading="sharedStore.isLoadingDatatable"
      :status="'Production'"
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
      :maximizable="true"
    >
      <OrderDetailForm2
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
        :saveButtonStatus="orderStore.getOrderProductionSaveButtonStatus"
        :proformaUploadButtonStatus="
          orderStore.getOrderProductionUploadProformaButtonStatus
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
import { useSharedStore } from "~/stores/shared"
import { useModelsStore } from "~/stores/models"
import { useLocalStore } from "~/stores/local"
import { toIsoDate } from "~/utils/dates"

export default {
  computed: {
    orderStore() {
      return useOrderStore()
    },
    sharedStore() {
      return useSharedStore()
    },
    modelsStore() {
      return useModelsStore()
    },
    localStore() {
      return useLocalStore()
    },
  },
  data() {
    return {
      localOrderList: [],
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

  /*
   * [x] created() KALDIRILDI -- veri cekimi dosyanin sonundaki
   * <script setup> blogunda useAsyncData ile. Gerekcesi orada.
   */

  watch: {
    /*
     * [x] Anahtar DIZGIYE cevrildi -- getter artik orderStore
     * uzerinde, yani izlenecek sey bir YOL.
     */
    "orderStore.getOrderList"(newVal) {
      if (newVal && newVal.length > 0) {
        this.localOrderList = JSON.parse(JSON.stringify(newVal));
      }
    },
    "orderStore.getOrderProductionYearsList"() {
      this.selectedYear = { Yil: new Date().getFullYear() };
    },
  },

  methods: {
    isfDelete(event) {
      this.orderStore.setOrderProductionIsfDelete(event);
    },
    proformaDelete(id) {
      this.orderStore.setOrderProductionProformaDelete(id);
    },
    /*
     * [x] this.$excelApi -> useExcelApi()
     * [x] elle <a> olusturma -> downloadFromExcelServer()
     *     Eski kod <a>'yi DOM'dan hic kaldirmiyordu.
     */
    async excel_output() {
      const response = await useExcelApi().post(
        "/siparisler/dosyalar/uretimExcelCikti",
        this.orderStore.getOrderList,
      )
      if (response.status) {
        downloadFromExcelServer("siparisler/dosyalar/uretimExcelCikti", "Uretim_list.xlsx")
      }
    },
    marketingChange(event) {
      if (this.selectedMarketing == "All") {
        this.orderStore.MUT_setOrderList(this.orderStore.getOrderListAll);
      } else {
        const datas = this.orderStore.getOrderListAll.filter(
          (x) => x.FaturaKesimTurID == 1
        );
        this.orderStore.MUT_setOrderList(datas);
      }
    },
    supplierChange(event) {
      this.allProductionData = this.orderStore.getOrderList;
      if (this.selectedSupplier == "All") {
        this.orderStore.MUT_setOrderList(this.orderStore.getOrderListAll);
      } else if (this.selectedSupplier == "Mekmer") {
        this.filteredProductionStatus = true;
        const datas = this.orderStore.getOrderListAll.filter(
          (x) => x.TedarikciID == 1 || x.TedarikciID == 123
        );
        this.orderStore.MUT_setOrderList(datas);
      } else if (this.selectedSupplier == "External") {
        this.filteredProductionStatus = true;
        const datas = this.orderStore.getOrderListAll.filter(
          (x) => x.TedarikciID != 1 && x.TedarikciID != 123
        );
        this.orderStore.MUT_setOrderList(datas);
      }
    },
    yearChange(event) {
      if (event.value.Yil == "All") {
        this.orderStore.setOrderProductionList();
      } else {
        this.orderStore.setOrderProductionListYear(event.value.Yil);
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
        status: 2,
        notchange: this.orderStore.getOrderProductionProductDetailNotChangeList,
        new: this.orderStore.getOrderProductionButtonStatus,
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

      this.orderStore.setOrderProductionUpdate({
        ...this.productionModel,
        SiparisId: this.orderStore.getOrderProductionId,
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

      this.orderStore.setOrderProductionSaveButtonStatus(true);
      this.productionModel.KayitTarihi = toIsoDate(new Date());
      this.productionModel.KullaniciID = useCookie("userId").value;
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
      this.orderStore.setOrderProductionPo(null);
      this.orderStore.setOrderProductionUploadProformaButtonStatus(true
      );
      this.orderStore.MUT_setOrderSupplierProductList([]);
      this.sharedStore.setOrderAllList();
      this.productionModel = this.modelsStore.getOrderProductionModel;
      this.production_detail_form = true;
    },
    productionSelected(event) {
      this.orderStore.setOrderProductionSourceTypes();
      this.orderStore.setOrderProductionButtonStatus(false);
      this.modelsStore.setOrderProductModel();
      this.orderStore.setOrderProductionProductDetailMekmerList(event.SiparisNo
      );
      this.orderStore.setOrderProductionCostList(event.SiparisNo);
      this.orderStore.setOrderProductionSupplierList(event.SiparisNo);
      this.orderStore.setOrderProductionDocumentList(event.SiparisNo);
      this.orderStore.setOrderProductionCheckMekmerList(event.SiparisNo
      );
      this.orderStore.setOrderProductionFreightTotal(event.NavlunSatis);
      this.orderStore.setOrderProductionInsuranceTotal(event.sigorta_tutar_satis
      );
      this.orderStore.setOrderProductionDetailTotal(event);
      this.orderStore.setOrderProductionProductDetailCostTotal(event);
      this.orderStore.setOrderProductionSaveButtonStatus(false);
      this.orderStore.setOrderProductionProductDetailNotChangeListReset();
      this.orderStore.setOrderProductionUploadProformaButtonStatus(false
      );
      this.orderStore.MUT_setOrderSupplierProductList([]);
      this.orderStore.setOrderProductionId(event.SiparisId);
      this.productionModel = event;
      this.orderStore.setOrderProductionPo(event.SiparisNo);
      this.production_detail_form = true;
    },
  },

  /*
   * KALDIRILDI: tamamen BOS mounted(). Nuxt 2'de de bostu.
   */
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

await useAsyncData("reports-mekmer-productions", async () => {
  await Promise.all([
      orderStore.setOrderProductionMekmerList(),
      orderStore.setOrderProductionSourceTypes(),
  ])
  return true
}, { server: false })
</script>
