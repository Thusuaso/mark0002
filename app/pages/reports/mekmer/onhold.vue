<template>
    <div class="">
        <div class="row m-auto text-center">
            <div class="col-6">
                <Button type="button" severity="success" class="w-100" label="New Order" @click="newForm" />
            </div>

            <div class="col-6">
                <Button severity="warn" class="w-100" label="Excel" @click="excel_output" />
            </div>
        </div>
        <OrderTable2 :list="orderStore.getOrderList" @production_selected_emit="productionSelected($event)" :loading="sharedStore.isLoading"
            :status="'Production'" :total="orderStore.getOrderProductionTotal" />
        <Dialog v-model:visible="production_detail_form" header="" modal :style="{ width: '100%' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" :closeOnEscape="false" :closable="false"
            :maximizable="true">
            <OrderDetailForm :modelProduction="productionModel" :modelProduct="modelsStore.getOrderProductModel"
                :status="orderStore.getOrderProductionButtonStatus" :customer="sharedStore.getCustomersList" :user="sharedStore.getUserList"
                :productsList="orderStore.getOrderProductionProductDetailList" :supplier="sharedStore.getSupplierList" :unit="sharedStore.getUnitList"
                :po="orderStore.getOrderProductionPo" :delivery="sharedStore.getOrderKindOfDeliveryList" :payment="sharedStore.getOrderKindOfPaymentList"
                :country="sharedStore.getCountryList" :invoice="sharedStore.getOrderKindOfInvoiceList" :cost="orderStore.getOrderProductionCostList"
                :costTotal="orderStore.getOrderProductionCostTotal" :supplierDelivery="sharedStore.getOrderKindOfDeliverySupplierList"
                :productSupplier="orderStore.getOrderProductionSupplierList" :supplierProduct="orderStore.getOrderSupplierProductList"
                :document="orderStore.getOrderProductionDocumentList" :check="orderStore.getOrderProductionCheckList"
                :checkTotal="orderStore.getOrderProductionCheckListTotal" :productCalculation="orderStore.getOrderProductionProductTotal"
                :freightCalculation="orderStore.getOrderProductionFreightTotal" :detailCalculation="orderStore.getOrderProductionDetailTotal"
                :detailProductTotal="orderStore.getOrderProductionProductDetailTotal"
                :detailProductCost="orderStore.getOrderProductionProductDetailCostTotal"
                :saveButtonStatus="orderStore.getOrderProductionSaveButtonStatus"
                :proformaUploadButtonStatus="orderStore.getOrderProductionUploadProformaButtonStatus" :statusAlfa="true"
                :insuranceCalculation="0"
                :source="orderStore.getOrderProductionSourceTypes"
                @order_production_product_reset_model_emit="
                    orderProductionProductResetModel($event)
                    " @process="process" @workerman_selected_emit="workermanSelected($event)"
                @close_production_form_emit="closeProductionForm" @proforma_delete_emit="proformaDelete($event)"
                @isf_delete_emit="isfDelete($event)" />
        </Dialog>

        <Dialog v-model:visible="workerman_dialog_form" header="" modal>
            <OrderDetailWorkermanForm :list="orderStore.getOrderProductionProductDetailWorkermanList"
                :model="modelsStore.getOrderProductWorkermanModel" :supplier="sharedStore.getSupplierList" :productId="productId"
                :po="orderStore.getOrderProductionPo" />
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
         *     Eski kod <a> ogesini DOM'dan hic kaldirmiyordu ve adresi
         *     localStore.getLocalUrl ile elle birlestiriyordu; birinde
         *     sondaki egik cizgi yuzunden cift // olusuyordu.
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
                const datas = this.orderStore.getOrderListAll.filter((x) => x.FaturaKesimTurID == 1);
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

            this.orderStore.setOrderProductionSaveButtonStatus(true);
            this.productionModel.KayitTarihi = toIsoDate(new Date());
            this.productionModel.KullaniciID = useCookie("userId").value;
            this.orderStore.setOrderProductionSave(this.productionModel);
            this.orderStore.setOrderProductionPo(this.productionModel.SiparisNo);
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
            this.orderStore.setOrderProductionUploadProformaButtonStatus(true);
            this.orderStore.MUT_setOrderSupplierProductList([]);
            this.sharedStore.setOrderAllList();
            this.productionModel = this.modelsStore.getOrderProductionModel;
            this.production_detail_form = true;
        },
        productionSelected(event) {
            this.orderStore.setOrderProductionButtonStatus(false);
            this.modelsStore.setOrderProductModel();
            this.orderStore.setOrderProductionProductDetailMekmerList(event.SiparisNo);
            this.orderStore.setOrderProductionCostList(event.SiparisNo);
            this.orderStore.setOrderProductionSupplierList(event.SiparisNo);
            this.orderStore.setOrderProductionDocumentList(event.SiparisNo);
            this.orderStore.setOrderProductionCheckMekmerList(event.SiparisNo);
            this.orderStore.setOrderProductionFreightTotal(event.NavlunSatis);
            this.orderStore.setOrderProductionInsuranceTotal(event.sigorta_tutar_satis);
            this.orderStore.setOrderProductionDetailTotal(event);
            this.orderStore.setOrderProductionProductDetailCostTotal(event);
            this.orderStore.setOrderProductionSaveButtonStatus(false);
            this.orderStore.setOrderProductionProductDetailNotChangeListReset();
            this.orderStore.setOrderProductionUploadProformaButtonStatus(false);
            this.orderStore.MUT_setOrderSupplierProductList([]);

            this.orderStore.setOrderProductionId(event.SiparisId);
            this.productionModel = event;
            this.orderStore.setOrderProductionPo(event.SiparisNo);
            this.production_detail_form = true;
        },
    },
    /*
     * KALDIRILDI: govdesi yalnizca yorum olan mounted().
     * Icerigi `// this.$socket.socketIO.on("cards_update_on", ...)`
     * satirlariydi; $socket diye bir eklenti pilotta YOK ve kod
     * Nuxt 2'de de yorumdaydi, yani hic calismiyordu.
     */

    watch: {
      /*
       * [x] Anahtar DIZGIYE cevrildi: getter artik orderStore
       * uzerinde, yani izlenecek sey bir YOL. map-store-refs.mjs
       * bu adi bilerek ATLADI (nesne anahtari oldugu icin).
       */
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
 * isi BEKLEMEZ -- liste bos serialize edilir ve loading sayaci 1'de
 * takilir (bkz. commit 2afc877e3). server: false ZORUNLU, cunku legacy
 * Express API'si SSR'in IC fetch yolunda calismiyor
 * (bkz. server/middleware/1.legacy-api.ts).
 */
const orderStore = useOrderStore()

await useAsyncData(
  "reports-mekmer-onhold",
  async () => {
    await Promise.all([
      orderStore.setOrderOnHoldMekmerList(),
      /*
       * [x] EKLENDI -- kardes sayfalarla hizalandi.
       * Nuxt 2'de bu sayfa ne `:source` prop'unu geciyordu ne de kaynak
       * turlerini cekiyordu, yani proforma formundaki "Source Type"
       * Select'i DAIMA BOS geliyordu. Ustelik tutarsizdi: ProformaForm
       * SECILI degeri store'dan okuyor, SECENEKLERI ise prop'tan --
       * prop undefined oldugu icin secili bir deger varken hic secenek
       * gorunmuyordu. Diger 5 sayfa ikisini de yapiyor.
       */
      orderStore.setOrderProductionSourceTypes(),
    ])
    return true
  },
  { server: false },
)
</script>

<!--
  pages/reports/mekmer/onhold.vue -> app/pages/reports/mekmer/onhold.vue

  Mekanik + store donusumleri: 35 dispatch, 7 commit, 51 getter
  referansi, mapGetters([40 ad]) -> 4 store computed'i,
  <orderList2> -> <OrderTable2>, <orderDetailForm> -> <OrderDetailForm>.

  ELLE: js-cookie -> useCookie, plugins/date -> toIsoDate,
        $excelApi -> useExcelApi + downloadFromExcelServer,
        created() -> <script setup> + useAsyncData,
        olu mounted() kaldirildi, watch anahtari dizgiye cevrildi,
        useOrderReferenceData() eklendi.

  DUZELTILEN EKSIKLER (ucu de Nuxt 2'de de vardi; denetciler yakaladi):

  [1] :loading="getLoading" -> :loading="sharedStore.isLoading"
      `getLoading` sayfanin mapGetters LISTESINDE YOKTU, yalnizca
      sablonda geciyordu. Yani Vue 2'de de tanimsizdi:
          [Vue warn]: Property "getLoading" was accessed during render
          but is not defined on instance.
      Tablo spinner'i hic gorunmuyordu. Artik gorunuyor -- davranis
      degisikligi, ama sablonda yazilmis NIYET buydu.
      (Siparis ekranlari bu prop'a `isLoadingDatatable` geciyor; burada
      yazilana sadik kalindi. Tablo yuklenirken sayfanin tamami da
      kilitlenmesin isteniyorsa isLoadingDatatable'a cevrilebilir.)
      tools/codemods/check-orphan-getters.mjs bu sinifi yakalamak icin
      yazildi.

  [2] :insuranceCalculation="0" EKLENDI
      Prop `required: true` ama gecilmiyordu -> undefined. Form.vue'daki
      "G.Total" satiri `... + undefined` hesapladigi icin ekranda "$NaN"
      yaziyordu. Deger 0 secildi: reports/mekmer/shipped.vue de
      sigortayi izlemeyen bir sayfa olarak boyle geciyor.

  [3] :source + setOrderProductionSourceTypes() EKLENDI
      Bu sayfa ne prop'u geciyordu ne kaynak turlerini cekiyordu, yani
      proforma formundaki "Source Type" Select'i daima bostu -- ustelik
      tutarsizdi: ProformaForm SECILI degeri store'dan, SECENEKLERI
      prop'tan okuyor. Diger 5 sayfa ikisini de yapiyor.

  NOT: bu dosya bilesen govdesini 4 bosluk girintiyle yaziyor (projenin
  geri kalani 2). Girinti KORUNDU; bicim degisikligi diff'i okunmaz
  hale getirirdi.
-->
