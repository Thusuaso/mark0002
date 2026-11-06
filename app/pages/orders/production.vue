<template>
  <div class="">
    <div class="row m-auto text-center">
      <div class="col-4">
        <Button
          type="button"
          severity="success" class="w-100"
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
                      :inputId="`supplier-${supplier.key}`"
                      name="dynamic"
                      :value="supplier.name"
                      @change="supplierChange($event)"
                    />
                    <label :for="`supplier-${supplier.key}`" class="ml-2">{{
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
                      :inputId="`marketing-${marketing.key}`"
                      name="dynamic"
                      :value="marketing.name"
                      @change="marketingChange($event)"
                    />
                    <label :for="`marketing-${marketing.key}`" class="ml-2">{{
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
          severity="warn" class="w-100"
          label="Excel"
          @click="excel_output"
        />
      </div>
    </div>
    <OrderTable
      :list="orderStore.getOrderList"
      @production_selected_emit="productionSelected($event)"
      :status="'Production'"
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
      :maximizable="true"
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
        :saveButtonStatus="orderStore.getOrderProductionSaveButtonStatus"
        :proformaUploadButtonStatus="
          orderStore.getOrderProductionUploadProformaButtonStatus
        "
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
        @drawing_delete_emit="drawingDelete($event)"
        @divide="divide"
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
    <!--
      Bolme diyalogu: sablonu ve mantigi app/components/order/DivideDialog.vue
      icinde. Bu sayfada ve orders/waiting.vue'da BIREBIR IKI KOPYA halinde
      duruyordu (sablon ~370, metotlar ~210 satir) -- gerekcesi ve kapatilan
      hatalar o dosyanin sonundaki notta.
    -->
    <OrderDivideDialog
      v-model:visible="divide_dialog_form"
      :productionModel="productionModel"
      @divided="divided"
    />
  </div>
</template>
<script>
import { useOrderStore } from "~/stores/order"
import { useCostStore } from "~/stores/cost"
import { useModelsStore } from "~/stores/models"
import { useSharedStore } from "~/stores/shared"
import { useSocketStore } from "~/stores/socket"
import { toIsoDate } from "~/utils/dates"

export default {
  setup() {
    const orderStore = useOrderStore()
    useRealtime("update_production_on", () => orderStore.setOrderProductionList())
  },

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
    socketStore() {
      return useSocketStore()
    },
  },
  data() {
    return {
      oldOrderPayload: {},
      /*
       * [x] KALDIRILDI: selectedDivideOrder / selectedProduct -- ikisi de
       * yalnizca bolme diyalogunun durumuydu, artik OrderDivideDialog
       * icinde tutuluyor.
       */
      divide_dialog_form: false,
      production_detail_form: false,
      productionModel: {},
      productModel: {},
      workerman_dialog_form: false,
      productId: 0,
      selectedYear: null,
      /*
       * [x] KALDIRILDI: ikinci bir `selectedSupplier: null` girisi.
       * data() icinde ayni anahtar IKI KEZ tanimliydi; JS'te sonraki
       * kazandigi icin baslangic degeri zaten "All"di. Yinelenen anahtar
       * sessizdir -- ne derleme ne calisma hatasi verir.
       */
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
  methods: {
    /*
     * Diyalogu acar. Urun listesini, bedel paylarini ve PO onizlemesini
     * bilesen kendi acilisinda kuruyor (watch: visible), bu yuzden burada
     * yapilacak baska is yok.
     *
     * Onceki surumde bu metot bolme modellerini sifirliyor, urun listesini
     * cekiyor ve ancak cevap gelince diyalogu aciyordu; listeyi cekme
     * basarisiz olursa diyalog hic acilmiyor ve kullaniciya hicbir sey
     * soylenmiyordu.
     */
    divide() {
      this.divide_dialog_form = true;
    },

    /*
     * Bolme basarili: iki yeni siparis olustu, orijinal kayit artik yok.
     * Detay formu KAPATILIYOR -- acik kalsa ekranda silinmis bir siparisin
     * verisi duruyor ve uzerinde yapilan kayit var olmayan bir PO'ya
     * yaziliyordu. Liste de yenilenmeli, yoksa eski PO satirda kaliyor.
     */
    divided() {
      this.production_detail_form = false;
      this.orderStore.setOrderProductionList();
    },
    drawingDelete(event) {
      useLegacyApi().get(`/production/drawing/delete/${event}`).then((res) => {
        if (res.data.status) {
          useAppToast().success("Drawing deleted successfully");
          this.orderStore.MUT_setOrderProductionProformaDelete(event);
        } else {
          useAppToast().error("Error while deleting drawing");
        }
      });
    },
    isfDelete(event) {
      this.orderStore.setOrderProductionIsfDelete(event);
    },
    proformaDelete(id) {
      this.orderStore.setOrderProductionProformaDelete(id);
    },
    /*
     * [x] this.$excelApi -> useExcelApi()
     * [x] elle <a> olusturma -> downloadFromExcelServer()
     *     Eski kod <a> ogesini DOM'dan hic kaldirmiyordu ve adresi
     *     localStore.getLocalUrl ile elle birlestiriyordu.
     */
    /*
     * ARTIK EXCEL SUNUCUSUNDAN DEGIL, NITRO'DAN:
     *   eski: POST + GET
     *         {excelServerBase}/siparisler/dosyalar/uretimExcelCikti
     *   yeni: POST /excel-api/orders/uretim   (tek istek)
     *         server/routes/excel-api/orders/uretim.post.ts
     *
     * AYNI UC ALTI YERDEN CAGRILIYOR; govde tek yerde:
     * server/utils/uretim-excel.ts
     *
     * Cikti uretimdekiyle GERCEK VERIYLE karsilastirildi (41 satir):
     * deger, sayi bicimi, hucre stili, 37 birlestirme, satir
     * yuksekligi ve sutun genisligi farki 0.
     *
     * [!] BU UC VERITABANINA GIDIYOR: alt bolum ("ÖZEL İŞÇİLİK
     *     YAPILACAKLAR") govdeden degil, SiparisDurumID=2 kosullu bir
     *     sorgudan geliyor.
     *
     * [!] BIRIM ESLEMESI `UrunBirimID` ILE: 1->M2, 2->Adet, 3->MT.
     *     Tersine cozmede "Sqm->M2, Pcs->Adet" diye cikarilmisti ve
     *     UCUNCU DAL (MT) kacirilmisti; kaynak bunu duzeltti.
     *
     * `if (response.status)` DUSTU: HTTP durumunu (daima 200)
     * okuyordu, govdedeki {"status": false}'u DEGIL.
     */
    async excel_output() {
      try {
        await exportExcel(
          "/excel-api/orders/uretim",
          this.orderStore.getOrderList,
          "Uretim_list.xlsx",
        )
      } catch (err) {
        console.error("uretim listesi ciktisi basarisiz:", err)
        useAppToast().error("Excel olusturulamadi.")
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
        if (this.$route.path == "/orders/production") {
          this.orderStore.setOrderProductionList();
        } else if (this.$route.path == "/orders/waiting") {
          this.orderStore.setOrderWaitingList();
        }

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
      this.productionModel.SiparisKontrolEden = useCookie("userId").value;

      this.orderStore.setOrderProductionUpdate({
        ...this.productionModel,
        SiparisId: this.orderStore.getOrderProductionId,
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
      this.productionModel.KayitTarihi = toIsoDate(new Date());
      this.productionModel.KullaniciID = useCookie("userId").value;

      this.orderStore.setOrderProductionSaveButtonStatus(true);

      await this.orderStore.setOrderProductionSave(this.productionModel
      );
      this.socketStore.getSocket.emit("production_save_emit");
      this.orderStore.setOrderProductionPo(this.productionModel.SiparisNo
      );
      this.costControlAdd(this.productionModel);
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
      this.costStore.resetCostList();
    },
    costControlUpdate(newList, oldList) {
      const user = useCookie("username").value;
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
            "dan => $" +
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
      this.orderStore.setOrderProductionPo(null);
      this.orderStore.setOrderProductionUploadProformaButtonStatus(true
      );
      this.orderStore.setOrderProductionSourceTypes();
      this.orderStore.MUT_setOrderSupplierProductList([]);
      this.sharedStore.setOrderAllList();
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
      this.orderStore.setOrderProductionSourceTypes();

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
      this.orderStore.setOrderProductionCustomer(event.FirmaAdi);
      this.production_detail_form = true;
      this.oldOrderPayload = { ...event };
      this.costStore.resetCostList();
    },
  },
  /*
   * [x] mounted() + beforeUnmount() -> setup() icinde useRealtime()
   *
   * Eski hali uc sekilde bozuktu (ayni kalip cards/list.vue'da da vardi):
   *   1) Dinleyici hic kaldirilmiyordu (.off cagrisi yok).
   *   2) `if (this.socket)` korumasi DAIMA false: `socket` diye bir data
   *      alani yok, yani disconnect() hicbir zaman cagrilmiyordu ve
   *      baglanti sayfadan ayrilinca da acik kaliyordu.
   *   3) getSocket SSR'da null olacagi icin `.on(...)` zincirlemesi
   *      sunucuda patlardi.
   * useRealtime ucunu de hallediyor; ayrintisi
   * app/composables/useRealtime.ts basinda.
   */

  watch: {
    /*
     * [x] Anahtar DIZGIYE cevrildi: getter artik `orderStore` uzerinde,
     * yani izlenecek sey bir YOL. map-store-refs.mjs bu adi bilerek
     * ATLADI (nesne anahtari oldugu icin).
     */
    "orderStore.getOrderProductionYearsList"() {
      this.selectedYear = { Yil: new Date().getFullYear() };
    },
  },
};
</script>

<script setup>
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
 * calismiyor (bkz. server/middleware/1.legacy-api.ts). Nuxt 2 de bu
 * veriyi SSR'da getirmiyordu, davranis kaybi yok.
 */
const orderStore = useOrderStore()

/*
 * Acilir listelerin REFERANS VERISI (musteriler, ulkeler, birimler,
 * teslim/odeme/fatura turleri). Nuxt 2'de bunlari layouts/default.vue
 * cekiyordu; pilotun layout'u bilerek ertelemis, bu yuzden sayfa kendi
 * ihtiyacini cekiyor. Olmadiginda detay diyalogundaki Customer
 * AutoComplete'i ve proforma Select alanlari BOS geliyordu -- hata
 * vermeden. Ayrinti: app/composables/useOrderReferenceData.ts
 */
await useOrderReferenceData()

await useAsyncData("orders-production", async () => {
  await Promise.all([
    orderStore.setOrderProductionList(),
    orderStore.setOrderProductionSourceTypes(),
  ])
  return true
}, { server: false })
</script>

<!--
  pages/orders/production.vue -> app/pages/orders/production.vue

  Mekanik donusumler (tools/codemods/vue2-to-vue3.mjs):
  [1]  3x  :x + @update:x -> v-model:x
  [2]  1x  <Dropdown> -> <Select>
  [3]  1x  <orderList> -> <OrderTable>
           (ad PrimeVue'nun OrderList'i ile cakisiyordu -- bkz.
            app/components/order/Table.vue)
  [4]  1x  <orderDetailForm> -> <OrderDetailForm>
       1x  <orderDetailWorkermanForm> -> <OrderDetailWorkermanForm>
           camelCase etiketler Nuxt auto-import tarafindan cozulmuyor
  [5]  5x  p-button-* -> severity
  [6]  1x  beforeDestroy -> beforeUnmount (sonra tamamen kaldirildi, [13])

  Store gecisi (tools/codemods/map-store-refs.mjs):
  [7] 114x  this.$store.dispatch(...) -> Pinia action'lari
  [8]   9x  this.$store.commit("X", a) -> this.<store>.MUT_X(a)
  [9]   2x  this.$store.getters.X -> this.<store>.X
  [10] 214x  getter referansi (96 sablon + 118 script)
  [11] mapGetters([49 ad]) -> 6 store computed'i
       (orderStore, costStore, modelsStore, sharedStore, localStore,
        socketStore)

  ELLE yapilanlar:
  [12] js-cookie -> useCookie (6 yer)
       plugins/date -> toIsoDate (3 yer)
       DIKKAT: bu dosyada `const date = new Date()` diye IKI yerel
       degisken var; `date.` kor degistirilse onlar da bozulurdu.
       Yalnizca plugin metodu hedeflendi, yerel olanlar assert ile
       dogrulandi.
  [13] mounted() + beforeUnmount() -> setup() icinde useRealtime().
       Eski hali dinleyiciyi hic kaldirmiyordu ve `if (this.socket)`
       korumasi daima false oldugu icin baglantiyi hic kapatmiyordu.
  [14] created() -> <script setup> + useAsyncData
  [15] this.$axios -> useLegacyApi() (3 yer)
  [16] this.$excelApi -> useExcelApi() + downloadFromExcelServer()
  [17] this.$toast -> useAppToast(); bolme HATASI yesil "Başarılı"
       toast'i olarak gosteriliyordu -> .error
  [18] 32 adet `console.log("")` -> yorum.
       Kalip: `if (deger bos) { console.log(""); } else { ...is... }`
       Bos dal icin doldurma olarak yazilmislar. Dal yapisi KORUNDU --
       33 kosulu tersine cevirmek gereksiz risk.
  [19] data() icindeki YINELENEN selectedSupplier girisi kaldirildi
  [20] RadioButton :inputId ve <label :for> -> dizge sablonu.
       PrimeVue 4 inputId icin String bekliyor, sayisal `key` geliyordu
       ("Expected String with value \"0\", got Number with value 0").
       Ayrica iki radyo grubu ayni sayilari kullandigi icin belgede
       yinelenen id olusuyordu.
  [21] Olu yorum kaldirildi: `// this.$socket.socketIO.emit(...)` --
       $socket diye bir eklenti pilotta yok.

  [22] Bolme diyalogu (sablon ~370 + metot ~210 satir) bu dosyadan
       CIKARILDI -> app/components/order/DivideDialog.vue. waiting.vue ile
       birebir ayni iki kopya halindeydi; kapatilan hatalar o dosyanin
       sonundaki notta. Bu sayfada kalan tek baglanti <OrderDivideDialog>
       etiketi ile divide() / divided() metotlari.

  DOKUNULMADI ama DIKKAT:
  - waiting.vue ve shipped.vue ile hala buyuk olcude ortak kod tasiyor
    (ayni 11 bileseni ve ayni store'lari kullaniyorlar). Kalan
    ortaklastirma ayri bir adim.
  - app/stores/models.ts icindeki divideProductionModel /
    divideProductionProductModel (ve setDivideProductions*Model
    action'lari) artik HICBIR YERDEN kullanilmiyor: bolme durumu
    DivideDialog bileseninin kendi data()'sinda. Store'dan temizlenmeleri
    ayri bir adim olarak birakildi -- calisma aninda zararsizlar.
-->
