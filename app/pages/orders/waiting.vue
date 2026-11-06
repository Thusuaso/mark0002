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
        <div class="m-auto text-center" style="max-width: 400px; width: 100%">
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
       * data() icinde ayni anahtar IKI KEZ tanimliydi (once null, 12
       * satir sonra "All"). JS'te sonraki kazandigi icin baslangic degeri
       * zaten "All"di; ilk giris olu kodu. Yinelenen anahtar sessizdir --
       * ne derleme ne calisma hatasi verir.
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
   * <script setup> blogunda useAsyncData ile yapiliyor. Gerekcesi orada;
   * ozetle SSR created() icindeki async isi BEKLEMEZ, bu yuzden hem
   * liste bos serialize ediliyor hem loading sayaci 1'de takiliyor.
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
      this.orderStore.setOrderWaitingList();
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
     *     Eski kod olusturdugu <a> ogesini DOM'dan hic kaldirmiyordu ve
     *     adresi this.localStore.getLocalUrl ile elle birlestiriyordu;
     *     artik adres tek yerden (runtimeConfig) geliyor ve yol
     *     normalize ediliyor. Bu yuzden localStore bu sayfada artik
     *     getLocalUrl icin gerekmiyor.
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

      this.orderStore.setOrderProductionSaveButtonStatus(true);
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
      this.orderStore.setOrderProductionButtonStatus(true);
      this.modelsStore.setOrderProductionModel();
      this.modelsStore.setOrderProductModel();
      this.orderStore.setOrderProductionDetailListReset();
      this.orderStore.setOrderProductionPo(null);
      this.orderStore.setOrderProductionUploadProformaButtonStatus(true
      );
      this.orderStore.MUT_setOrderSupplierProductList([]);
      this.orderStore.setOrderProductionSourceTypes();

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
      this.orderStore.setOrderProductionInsuranceTotal(event.sigorta_tutar_satis
      );
      this.orderStore.setOrderProductionDetailTotal(event);
      this.orderStore.setOrderProductionProductDetailCostTotal(event);
      this.orderStore.setOrderProductionSaveButtonStatus(false);
      this.orderStore.setOrderProductionProductDetailNotChangeListReset();
      this.orderStore.setOrderProductionUploadProformaButtonStatus(false
      );
      this.orderStore.MUT_setOrderSupplierProductList([]);
      this.orderStore.setOrderProductionSourceTypes();

      this.orderStore.setOrderProductionId(event.SiparisId);
      this.productionModel = event;
      this.orderStore.setOrderProductionPo(event.SiparisNo);
      this.production_detail_form = true;
    },
  },
  mounted() {
    // this.$socket.socketIO.on('supplier_list_on', () => {
    //   this.sharedStore.setSupplierList();
    // });
    // this.$socket.socketIO.on("production_update_on", () => {
    //   if (this.$route.path == '/orders/production') {
    //     this.orderStore.setOrderProductionList();
    //   } else if (this.$route.path == '/orders/waiting'){
    //     this.orderStore.setOrderWaitingList()
    //   }
    // });
    // this.$socket.socketIO.on("cards_update_on", () => {
    //   this.sharedStore.setCardList();
    // });
  },

  watch: {
    /*
     * [x] Anahtar DIZGIYE cevrildi. Nuxt 2'de mapGetters bu getter'i bir
     * computed yapiyordu, bu yuzden dogrudan izlenebiliyordu. Pinia'ya
     * gecince getter `orderStore` uzerinde, yani izlenecek sey bir YOL;
     * Options API watch dizgi yol kabul ediyor.
     * map-store-refs.mjs bu adi bilerek ATLADI (nesne anahtari).
     */
    "orderStore.getOrderProductionYearsList"() {
      this.selectedYear = { Yil: new Date().getFullYear() }
    },
  },
};
</script>

<script setup>
/*
 * Veri cekimi NEDEN created() icinde degil:
 *
 * Vue, SSR sirasinda created() icindeki async isi beklemez. Nuxt 2'de de
 * oyleydi; orada sonuc sadece "tablo ilk render'da bos gelir, client
 * doldurur" oluyordu. Pinia + Nuxt 4'te ayni desen iki ek soruna yol
 * aciyor (ikisi de pilotta bir kez yasandi, bkz. commit 2afc877e3):
 *
 *  1) Yaris: render bitince Pinia state payload'a yazilir. Fetch henuz
 *     bitmediyse liste BOS serialize edilir; client hydration o bos
 *     listeyi devralir ve created() bir daha calismadigi icin tablo bos
 *     kalir.
 *  2) Takilan spinner: loading sayaci begin'den sonra, end'den once
 *     serialize edilir -> payload'da loading=1. Client bunu devralir,
 *     bitince 1'e doner ve orada KALIR; veri gelmesine ragmen spinner
 *     hic durmaz.
 *
 * server: false ZORUNLU -- legacy Express API'si SSR'in IC fetch yolunda
 * calismiyor (bkz. server/middleware/1.legacy-api.ts). Nuxt 2 de bu
 * veriyi SSR'da getirmiyordu, dolayisiyla davranis kaybi yok.
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

await useAsyncData("orders-waiting", async () => {
  await Promise.all([
    orderStore.setOrderWaitingList(),
    orderStore.setOrderProductionSourceTypes(),
  ])
  return true
}, { server: false })
</script>

<!--
  pages/orders/waiting.vue -> app/pages/orders/waiting.vue

  Mekanik donusumler tools/codemods/vue2-to-vue3.mjs ile:
  [1] 3x  :x + @update:x -> v-model:x
  [2] 1x  <Dropdown> -> <Select>
  [3] 5x  p-button-* -> severity

  Store gecisi tools/codemods/map-store-refs.mjs ile (sayilar dogrulandi):
  [4]  48x  this.$store.dispatch("Y", a) -> this.<store>.Y(a)
  [5]   8x  this.$store.commit("X", a)   -> this.<store>.MUT_X(a)
            (Pinia'da mutation yok; vuex-to-pinia codemod'u mutation'lari
             MUT_ onekli action'a cevirmisti)
  [6] 116x  this.getX  -> this.<store>.getX
       97x  sablonda getX -> <store>.getX
  [7] mapGetters([47 ad]) blogu -> 4 store computed'i
      (orderStore, modelsStore, sharedStore, localStore)

  ELLE yapilanlar:
  [8]  js-cookie -> useCookie (4 yer)
  [9]  plugins/date -> toIsoDate (4 yer; API'ye YAZILAN "2026-10-02"
       bicimi. Sablondaki dateToString ise GOSTERIM surumu "02-10-2026" --
       ikisi ayni ada sahipti ve ciktilari birbirinin tersi, bkz.
       app/utils/dates.ts)
  [10] this.$toast -> useAppToast(); ayrica bolme HATASI yesil
       "basarili" toast'i olarak gosteriliyordu -> .error
  [11] this.$excelApi -> useExcelApi(); indirme linki
       downloadFromExcelServer() ile (adres tek yerden, <a> temizleniyor)
  [12] created() -> <script setup> + useAsyncData (gerekcesi yukarida)
  [13] data() icindeki YINELENEN selectedSupplier girisi kaldirildi
  [14] RadioButton :inputId / <label :for> -> dizge sablonu
       PrimeVue 4'te inputId prop'u String bekliyor; buraya suppliers /
       marketings dizisindeki SAYISAL `key` geliyordu:
         [Vue warn]: Invalid prop: type check failed for prop "inputId".
         Expected String with value "0", got Number with value 0.
       Ayrica iki radyo grubu da ayni sayilari (0, 1) kullandigi icin
       belgede YINELENEN id olusuyordu ve "All" etiketine tiklamak
       yanlis gruptaki radyoyu secebiliyordu. Artik `supplier-0` /
       `marketing-0` gibi onekli.

  [x] Bolme diyalogu (sablon ~370 + metot ~210 satir) bu dosyadan
      CIKARILDI -> app/components/order/DivideDialog.vue. production.vue
      ile BIREBIR AYNI iki kopya halindeydi (aradaki tek fark yorumlardi,
      diff ile dogrulandi), dolayisiyla bir tarafta duzeltilen hata
      digerinde kaliyordu. Kapatilan hatalar o dosyanin sonundaki notta.
      Bu sayfada kalan tek baglanti <OrderDivideDialog> etiketi ile
      divide() / divided() metotlari.

  DOKUNULMADI ama DIKKAT:
  - app/stores/models.ts icindeki divideProductionModel /
    divideProductionProductModel (ve setDivideProductions*Model
    action'lari) artik hicbir yerden kullanilmiyor; bolme durumu
    DivideDialog bileseninin kendi data()'sinda. Store'dan
    temizlenmeleri ayri bir adim -- calisma aninda zararsizlar.
  - Detay diyalogu <orderDetailForm> bilesenini kullaniyor; o bilesen
    (components/orders/forms/detail.vue) HENUZ TASINMADI. Sayfa acilir ve
    ana tablo calisir, ama satira tiklayinca acilan diyalog BOS gelir ve
    konsolda "Failed to resolve component: OrderDetailForm" uyarisi
    cikar. Vue bunu hata saymaz -- bilesen sessizce yok olur.
-->
