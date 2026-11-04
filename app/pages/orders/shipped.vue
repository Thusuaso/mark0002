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
      <div class="col">
        <FloatLabel>
          <Select
            v-model="selectedYear"
            inputId="years"
            :options="orderStore.getOrderProductionYearsList"
            optionLabel="Yil"
            class="w-100"
            @change="yearChange($event)"
          />
          <label for="years">Year</label>
        </FloatLabel>
      </div>
    </div>
    <OrderTable
      :list="orderStore.getOrderList"
      @production_selected_emit="productionSelected($event)"
      :status="'Shipped'"
      :total="orderStore.getOrderProductionTotal"
      :loading="sharedStore.isLoadingDatatable"
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
      <!--
        Sevk edilmis siparisin eksik zorunlu evraklari. productionModel
        baslangicta {} oldugu icin `|| null` gerekli -- panel prop'u
        String bekliyor ve undefined uyari uretir.
      -->
      <uploadMissingPanel :po="productionModel.SiparisNo || null" />

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
        :statusAlfa="false"
        :insuranceCalculation="orderStore.getOrderProductionInsuranceTotal"
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
import { useCostStore } from "~/stores/cost"
import { useModelsStore } from "~/stores/models"
import { useSharedStore } from "~/stores/shared"
import { toIsoDate } from "~/utils/dates"
export default {
  computed: {
    orderStore() {
      return useOrderStore()
    },
    costStore() {
      return useCostStore()
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
      productionCostOldList: {},
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
    costControlUpdate(newList, oldList) {
      const user = useCookie("username").value;
      const po = newList.SiparisNo;
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
        this.costStore.addCost(data);
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
        this.costStore.addCost(data);
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
        this.costStore.addCost(data);
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
        this.costStore.addCost(data);
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
        this.costStore.addCost(data);
      }
      if (newMaturity != oldMaturity) {
        if (newMaturity == null || oldMaturity == null) {
          // deger bos: bu dalda is yapilmiyor
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
          this.costStore.addCost(data);
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
        this.costStore.addCost(data);
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
        this.costStore.addCost(data);
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
        this.costStore.addCost(data);
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
        this.costStore.addCost(data);
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
        this.costStore.addCost(data);
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
        this.costStore.addCost(data);
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
        this.costStore.addCost(data);
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
        this.costStore.addCost(data);
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
            " dan => $" +
            newFreightSelling +
            " olarak güncellenmiştir.",
        };
        this.costStore.addCost(data);
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
        this.costStore.addCost(data);
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
        this.costStore.addCost(data);
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
        this.costStore.addCost(data);
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
        this.costStore.addCost(data);
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
        this.costStore.addCost(data);
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
        this.costStore.addCost(data);
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
        this.costStore.addCost(data);
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
        this.costStore.addCost(data);
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
        this.costStore.addCost(data);
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
        this.costStore.addCost(data);
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
        this.costStore.addCost(data);
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
        this.costStore.addCost(data);
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
        this.costStore.addCost(data);
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
        this.costStore.addCost(data);
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
        this.costStore.addCost(data);
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
        this.costStore.addCost(data);
      }
      useLegacyApi().post("/production/add/cost/list", this.costStore.getCostList);
      this.costStore.resetCostList();
    },
    costControlAdd(payload) {
      const user = useCookie("username").value;
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
        // deger bos: bu dalda is yapilmiyor
      } else {
        const data = {
          date: date,
          user: user,
          po: po,
          desc: po + " po su sipariş olarak eklenmiştir.",
        };
        this.costStore.addCost(data);
      }
      if (
        customer == null ||
        customer == "" ||
        customer == " " ||
        customer == undefined ||
        customer == 0
      ) {
        // deger bos: bu dalda is yapilmiyor
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
        this.costStore.addCost(data);
      }
      if (
        seller == null ||
        seller == "" ||
        seller == " " ||
        seller == undefined ||
        seller == 0
      ) {
        // deger bos: bu dalda is yapilmiyor
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
        this.costStore.addCost(data);
      }
      if (
        operation == null ||
        operation == "" ||
        operation == " " ||
        operation == undefined ||
        operation == 0
      ) {
        // deger bos: bu dalda is yapilmiyor
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
        this.costStore.addCost(data);
      }
      if (
        finansman == null ||
        finansman == "" ||
        finansman == " " ||
        finansman == undefined ||
        finansman == 0
      ) {
        // deger bos: bu dalda is yapilmiyor
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
        this.costStore.addCost(data);
      }
      if (
        prePayment == null ||
        prePayment == "" ||
        prePayment == " " ||
        prePayment == undefined ||
        prePayment == 0
      ) {
        // deger bos: bu dalda is yapilmiyor
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
        this.costStore.addCost(data);
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
        this.costStore.addCost(data);
      }
      if (
        country == null ||
        country == "" ||
        country == " " ||
        country == undefined ||
        country == 0
      ) {
        // deger bos: bu dalda is yapilmiyor
      } else {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po + " po sahip siparişe " + country + " ülke olarak girilmiştir.",
        };
        this.costStore.addCost(data);
      }
      if (
        paymetDesc == null ||
        paymetDesc == "" ||
        paymetDesc == " " ||
        paymetDesc == undefined ||
        paymetDesc == 0
      ) {
        // deger bos: bu dalda is yapilmiyor
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
        this.costStore.addCost(data);
      }
      if (
        containerDesc == null ||
        containerDesc == "" ||
        containerDesc == " " ||
        containerDesc == undefined ||
        containerDesc == 0
      ) {
        // deger bos: bu dalda is yapilmiyor
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
        this.costStore.addCost(data);
      }
      if (
        commission == null ||
        commission == "" ||
        commission == " " ||
        commission == undefined ||
        commission == 0
      ) {
        // deger bos: bu dalda is yapilmiyor
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
        this.costStore.addCost(data);
      }
      if (
        refund == null ||
        refund == "" ||
        refund == " " ||
        refund == undefined ||
        refund == 0
      ) {
        // deger bos: bu dalda is yapilmiyor
      } else {
        const data = {
          date: date,
          user: user,
          po: po,
          desc:
            po + " po sahip siparişe $" + refund + " iade olarak girilmiştir.",
        };
        this.costStore.addCost(data);
      }
      if (
        productionDesc == null ||
        productionDesc == "" ||
        productionDesc == " " ||
        productionDesc == undefined ||
        productionDesc == 0
      ) {
        // deger bos: bu dalda is yapilmiyor
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
        this.costStore.addCost(data);
      }
      if (
        shippedDesc == null ||
        shippedDesc == "" ||
        shippedDesc == " " ||
        shippedDesc == undefined ||
        shippedDesc == 0
      ) {
        // deger bos: bu dalda is yapilmiyor
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
        this.costStore.addCost(data);
      }
      if (
        financeDesc == null ||
        financeDesc == "" ||
        financeDesc == " " ||
        financeDesc == undefined ||
        financeDesc == 0
      ) {
        // deger bos: bu dalda is yapilmiyor
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
        this.costStore.addCost(data);
      }
      if (
        freightSelling == null ||
        freightSelling == "" ||
        freightSelling == " " ||
        freightSelling == undefined ||
        freightSelling == 0
      ) {
        // deger bos: bu dalda is yapilmiyor
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
        this.costStore.addCost(data);
      }
      if (
        freightSellingCompany == null ||
        freightSellingCompany == "" ||
        freightSellingCompany == " " ||
        freightSellingCompany == undefined ||
        freightSellingCompany == 0
      ) {
        // deger bos: bu dalda is yapilmiyor
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
        this.costStore.addCost(data);
      }
      if (
        detail1 == null ||
        detail1 == "" ||
        detail1 == " " ||
        detail1 == undefined ||
        detail1 == 0
      ) {
        // deger bos: bu dalda is yapilmiyor
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
        this.costStore.addCost(data);
      }
      if (
        detail2 == null ||
        detail2 == "" ||
        detail2 == " " ||
        detail2 == undefined ||
        detail2 == 0
      ) {
        // deger bos: bu dalda is yapilmiyor
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
        this.costStore.addCost(data);
      }
      if (
        detail1Desc == null ||
        detail1Desc == "" ||
        detail1Desc == " " ||
        detail1Desc == undefined ||
        detail1Desc == 0
      ) {
        // deger bos: bu dalda is yapilmiyor
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
        this.costStore.addCost(data);
      }
      if (
        detail2Desc == null ||
        detail2Desc == "" ||
        detail2Desc == " " ||
        detail2Desc == undefined ||
        detail2Desc == 0
      ) {
        // deger bos: bu dalda is yapilmiyor
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
        this.costStore.addCost(data);
      }
      if (
        insuranceSelling == null ||
        insuranceSelling == "" ||
        insuranceSelling == " " ||
        insuranceSelling == undefined ||
        insuranceSelling == 0
      ) {
        // deger bos: bu dalda is yapilmiyor
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
        this.costStore.addCost(data);
      }
      if (
        freightBuying == null ||
        freightBuying == "" ||
        freightBuying == " " ||
        freightBuying == undefined ||
        freightBuying == 0
      ) {
        // deger bos: bu dalda is yapilmiyor
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
        this.costStore.addCost(data);
      }
      if (
        freightBuyingDesc == null ||
        freightBuyingDesc == "" ||
        freightBuyingDesc == " " ||
        freightBuyingDesc == undefined ||
        freightBuyingDesc == 0
      ) {
        // deger bos: bu dalda is yapilmiyor
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
        this.costStore.addCost(data);
      }

      if (
        detail1Buying == null ||
        detail1Buying == "" ||
        detail1Buying == " " ||
        detail1Buying == undefined ||
        detail1Buying == 0
      ) {
        // deger bos: bu dalda is yapilmiyor
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
        this.costStore.addCost(data);
      }
      if (
        detail2Buying == null ||
        detail2Buying == "" ||
        detail2Buying == " " ||
        detail2Buying == undefined ||
        detail2Buying == 0
      ) {
        // deger bos: bu dalda is yapilmiyor
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
        this.costStore.addCost(data);
      }

      if (
        detail1BuyingDesc == null ||
        detail1BuyingDesc == "" ||
        detail1BuyingDesc == " " ||
        detail1BuyingDesc == undefined ||
        detail1BuyingDesc == 0
      ) {
        // deger bos: bu dalda is yapilmiyor
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
        this.costStore.addCost(data);
      }

      if (
        detail2BuyingDesc == null ||
        detail2BuyingDesc == "" ||
        detail2BuyingDesc == " " ||
        detail2BuyingDesc == undefined ||
        detail2BuyingDesc == 0
      ) {
        // deger bos: bu dalda is yapilmiyor
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
        this.costStore.addCost(data);
      }
      if (
        insuranceBuying == null ||
        insuranceBuying == "" ||
        insuranceBuying == " " ||
        insuranceBuying == undefined ||
        insuranceBuying == 0
      ) {
        // deger bos: bu dalda is yapilmiyor
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
        this.costStore.addCost(data);
      }

      if (
        paymentKind == null ||
        paymentKind == "" ||
        paymentKind == " " ||
        paymentKind == undefined ||
        paymentKind == 0
      ) {
        // deger bos: bu dalda is yapilmiyor
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
        this.costStore.addCost(data);
      }

      if (
        shippedKind == null ||
        shippedKind == "" ||
        shippedKind == " " ||
        shippedKind == undefined ||
        shippedKind == 0
      ) {
        // deger bos: bu dalda is yapilmiyor
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
        this.costStore.addCost(data);
      }

      if (
        invoiceKind == null ||
        invoiceKind == "" ||
        invoiceKind == " " ||
        invoiceKind == undefined ||
        invoiceKind == 0
      ) {
        // deger bos: bu dalda is yapilmiyor
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
        this.costStore.addCost(data);
      }

      useLegacyApi().post("/production/add/cost/list", this.costStore.getCostList);
    },
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
    update() {

      this.productionModel.KullaniciID = useCookie("userId").value;


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
      this.orderStore.setOrderProductionUpdate(this.productionModel);
      this.costControlUpdate(this.productionModel, this.productionCostOldList);
    },
    save() {


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
      this.productionModel.KayitTarihi = toIsoDate(new Date());
      this.productionModel.KullaniciID = useCookie("userId").value;
      this.orderStore.setOrderProductionSave(this.productionModel);
      this.orderStore.setOrderProductionPo(this.productionModel.SiparisNo
      );
      this.costControlAdd(this.productionModel);
    },
    process() {
      if (this.orderStore.getOrderProductionButtonStatus) {
        this.save();
      } else {
        this.update();
      }
    },
    newForm() {
      this.orderStore.setOrderProductionButtonStatus(true);
      this.modelsStore.setOrderProductionModel();
      this.modelsStore.setOrderProductModel();
      this.orderStore.setOrderProductionDetailListReset();
      this.orderStore.MUT_setOrderSupplierProductList([]);
      this.orderStore.setOrderProductionSourceTypes();

      this.productionModel = this.modelsStore.getOrderProductionModel;
      this.production_detail_form = true;
    },
    productionSelected(event) {
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
      this.orderStore.setOrderProductionSourceTypes();

      this.productionModel = event;
      this.orderStore.setOrderProductionPo(event.SiparisNo);
      this.production_detail_form = true;
      this.productionCostOldList = { ...event };
      this.costStore.resetCostList();
    },
  },
  watch: {
    /*
     * [x] Anahtar DIZGIYE cevrildi: getter artik `orderStore` uzerinde,
     * yani izlenecek sey bir YOL. map-store-refs.mjs bu adi bilerek
     * ATLADI (nesne anahtari oldugu icin).
     */
    "orderStore.getOrderProductionYearsList"() {
      this.selectedYear = { Yil: this.orderStore.getOrderProductionYearsList[0].Yil };
    },
  },
  mounted() {
    // this.$socket.socketIO.on('supplier_list_on', () => {
    //   this.sharedStore.setSupplierList();
    // });
    // this.$socket.socketIO.on("production_update_on", () => {
    //   if (this.$route.path == '/orders/production') {
    //     this.orderStore.setOrderProductionList();
    //   };
    // });
    // this.$socket.socketIO.on("cards_update_on", () => {
    //   this.sharedStore.setCardList();
    // });
  },
};
</script>

<script setup>
/*
 * Acilir listelerin REFERANS VERISI. Nuxt 2'de bunlari
 * layouts/default.vue cekiyordu; pilotun layout'u bilerek ertelemis, bu
 * yuzden sayfa kendi ihtiyacini cekiyor. Olmadiginda detay diyalogundaki
 * Customer AutoComplete'i ve proforma Select alanlari BOS gelir -- hata
 * vermeden. Ayrinti: app/composables/useOrderReferenceData.ts
 */
await useOrderReferenceData()

/*
 * Veri cekimi NEDEN created() icinde degil:
 *
 * SSR, created() icindeki async isi BEKLEMEZ. Pinia + Nuxt 4'te bu iki
 * soruna yol aciyor (ikisi de pilotta yasandi, bkz. commit 2afc877e3):
 *   1) Liste BOS serialize edilir, client hydration onu devralir ve
 *      created() bir daha calismadigi icin tablo bos kalir.
 *   2) loading sayaci begin'den sonra, end'den once serialize edilir ->
 *      payload'da loading=1; client bunu devralir ve spinner hic durmaz.
 *
 * server: false ZORUNLU -- legacy Express API'si SSR'in IC fetch yolunda
 * calismiyor (bkz. server/middleware/1.legacy-api.ts).
 */
const orderStore = useOrderStore()

await useAsyncData("orders-shipped", async () => {
  await Promise.all([
    orderStore.setOrderShippedList(),
    orderStore.setOrderProductionSourceTypes(),
  ])
  return true
}, { server: false })
</script>

<!--
  pages/orders/shipped.vue -> app/pages/orders/shipped.vue

  Uc siparis ekraninin ucuncusu. Ayni 11 ortak bileseni ve ayni
  store'lari kullaniyor; o katman waiting/production icin zaten
  tasinmisti, bu yuzden burada yalnizca sayfanin kendisi degisti.

  Mekanik donusumler (tools/codemods/vue2-to-vue3.mjs):
  [1] 2x  :x + @update:x -> v-model:x
  [2] 1x  <Dropdown> -> <Select>
  [3] 1x  <orderList> -> <OrderTable>
          (ad PrimeVue'nun OrderList'i ile cakisiyordu -- bkz.
           app/components/order/Table.vue)
  [4] 1x  <orderDetailForm> -> <OrderDetailForm>
      1x  <orderDetailWorkermanForm> -> <OrderDetailWorkermanForm>
          camelCase etiketler Nuxt auto-import tarafindan cozulmuyor
  [5] 1x  p-button-* -> severity
  [6] 1x  p-float-label -> <FloatLabel>
          (codemod-float-label.mjs ile; PrimeVue 4'te SINIF kaldirildi,
           birakilsa etiket input'un uzerine yuzmez, kayar)

  Store gecisi (tools/codemods/map-store-refs.mjs):
  [7] 98x  this.$store.dispatch(...) -> Pinia action'lari
  [8]  2x  this.$store.commit("X", a) -> this.<store>.MUT_X(a)
  [9] 47x  getter referansi (35 sablon + 12 script)
  [10] mapGetters([39 ad]) -> 4 store computed'i
       (orderStore, costStore, modelsStore, sharedStore)

  ELLE yapilanlar:
  [11] js-cookie -> useCookie
       plugins/date -> toIsoDate
       DIKKAT: bu dosyada `const date = new Date()` diye YEREL bir
       degisken de var; `date.` kor degistirilse o bozulurdu. Yalnizca
       plugin metodu hedeflendi, yereli assert ile dogrulandi.
  [12] this.$axios -> useLegacyApi()
  [13] 32 adet `console.log("")` -> yorum.
       Kalip: `if (deger bos) { console.log(""); } else { ...is... }`
       Bos dal icin doldurma olarak yazilmislar; dal yapisi KORUNDU.
  [14] created() -> <script setup> + useAsyncData
  [15] useOrderReferenceData() eklendi -- acilir listelerin verisi
  [16] watch anahtari dizgi yola cevrildi

  DIKKAT: OrderTable'a `status="Shipped"` geciyor, yani bu sayfa
  list.vue'nun ILK IKI DataTable'ini render ediyor (masaustu +
  <=576px mobil ikizi; CSS ile biri gizli). Ucuncu tablo v-else oldugu
  icin burada cikmiyor. Ayrinti app/components/order/Table.vue sonundaki
  notta.
-->
