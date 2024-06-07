<template>
  <div class="">
    <div class="row m-auto text-center">
      <div class="col-4">
        <Button type="button" class="p-button-success w-100" label="New Order" @click="newForm" />
      </div>
      <div class="col-4 m-auto text-center">
        <div class="m-auto text-center" style="width: 400px">
          <div class="m-auto text-center">
            <div class="row mb-2 m-auto text-center">
              <div class="col-2">Supplier</div>
              <div class="col">
                <div class="flex flex-wrap gap-3">
                  <div class="flex align-items-center" v-for="supplier in suppliers" :key="supplier.key">
                    <RadioButton v-model="selectedSupplier" :inputId="supplier.key" name="dynamic"
                      :value="supplier.name" @change="supplierChange($event)" />
                    <label :for="supplier.key" class="ml-2">{{ supplier.name }}</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="row m-auto text-center">
              <div class="col-2">Seller</div>
              <div class="col">
                <div class="flex flex-wrap gap-3">
                  <div class="flex align-items-center" v-for="marketing in marketings" :key="marketing.key">
                    <RadioButton v-model="selectedMarketing" :inputId="marketing.key" name="dynamic"
                      :value="marketing.name" @change="marketingChange($event)" />
                    <label :for="marketing.key" class="ml-2">{{ marketing.name }}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-4">
        <Button class="p-button-warning w-100" label="Excel" @click="excel_output" />
      </div>
    </div>
    <orderList :list="getOrderList" @production_selected_emit="productionSelected($event)" :status="'Production'"
      :total="getOrderProductionTotal" :loading="getLoadingDatatable" />
    <Dialog :visible.sync="production_detail_form" header="" modal :style="{ width: '100%' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" :closeOnEscape="false" :closable="false" :maximizable="true">
      <orderDetailForm :modelProduction="productionModel" :modelProduct="getOrderProductModel"
        :status="getOrderProductionButtonStatus" :customer="getCustomersList" :user="getUserList"
        :productsList="getOrderProductionProductDetailList" :supplier="getSupplierList" :unit="getUnitList"
        :po="getOrderProductionPo" :delivery="getOrderKindOfDeliveryList" :payment="getOrderKindOfPaymentList"
        :country="getCountryList" :invoice="getOrderKindOfInvoiceList" :cost="getOrderProductionCostList"
        :costTotal="getOrderProductionCostTotal" :supplierDelivery="getOrderKindOfDeliverySupplierList"
        :productSupplier="getOrderProductionSupplierList" :supplierProduct="getOrderSupplierProductList"
        :document="getOrderProductionDocumentList" :check="getOrderProductionCheckList"
        :checkTotal="getOrderProductionCheckListTotal" :productCalculation="getOrderProductionProductTotal"
        :freightCalculation="getOrderProductionFreightTotal" :detailCalculation="getOrderProductionDetailTotal"
        :detailProductTotal="getOrderProductionProductDetailTotal"
        :detailProductCost="getOrderProductionProductDetailCostTotal"
        :saveButtonStatus="getOrderProductionSaveButtonStatus"
        :proformaUploadButtonStatus="getOrderProductionUploadProformaButtonStatus" :statusAlfa="false"
        @order_production_product_reset_model_emit="
          orderProductionProductResetModel($event)
          " @process="process" @workerman_selected_emit="workermanSelected($event)"
        @close_production_form_emit="closeProductionForm" @proforma_delete_emit="proformaDelete($event)"
        @isf_delete_emit="isfDelete($event)" @divide="divide" />
    </Dialog>

    <Dialog :visible.sync="workerman_dialog_form" header="" modal>
      <orderDetailWorkermanForm :list="getOrderProductionProductDetailWorkermanList"
        :model="getOrderProductWorkermanModel" :supplier="getSupplierList" :productId="productId"
        :po="getOrderProductionPo" />
    </Dialog>
    <Dialog :visible.sync="divide_dialog_form" header="Divide" modal>
      <h3 class="text-center m-auto">Products</h3>
      <div class="row mb-3">
        <div class="col">
          <Dropdown v-model="selectedProduct" :options="getOrderProductionDivideList" optionLabel="Urun"
            placeholder="Select a Product" @change="changeSelectedProduct($event)" />


        </div>
      </div>

      <div class="row" v-if="selectedProduct">
        <div class="col">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Supplier</th>
                <th scope="col">Category</th>
                <th scope="col">Product</th>
                <th scope="col">Surface</th>
                <th scope="col">Width</th>
                <th scope="col">Height</th>
                <th scope="col">Thickness</th>
                <th scope="col">Unit</th>
                <th scope="col">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">{{ selectedProduct.FirmaAdi }}</th>
                <td>{{ selectedProduct.KategoriAdi }}</td>
                <td>{{ selectedProduct.UrunAdi }}</td>
                <td>{{ selectedProduct.YuzeyIslemAdi }}</td>
                <td>{{ selectedProduct.En }}</td>
                <td>{{ selectedProduct.Boy }}</td>
                <td>{{ selectedProduct.Kenar }}</td>
                <td>{{ selectedProduct.BirimAdi }}</td>
                <td>{{ selectedProduct.Miktar | formatDecimal }}</td>



              </tr>
            </tbody>
          </table>


        </div>
      </div>

      <div class="row">
        <div class="col">
          <CustomInput :value="getDivideProductionProductModel.kalan" text="Remainder"
            @onInput="getDivideProductionProductModel.kalan = $event" />
        </div>
        <div class="col">
          <CustomInput :value="getDivideProductionProductModel.gonderilen" text="Outgoing"
            @onInput="getDivideProductionProductModel.gonderilen = $event" />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <Button type="button" class="p-button-success w-100" label="Add" @click="addDivideProductionProduct" />
        </div>
        <div class="col">
          <Button type="button" class="p-button-warning w-100" label="Update" @click="updateDivideProductionProduct" />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <DataTable :value="getOrderProductionDivideOrderList" responsiveLayout="scroll"
            :selection="selectedDivideOrder" selectionMode="single" @row-click="divideOrderSelected($event)">
            <Column field="musteriAciklama" header="Desc."></Column>
            <Column field="urunBirimId" header="Unit">
              <template #body="slotProps">
                <div v-if="slotProps.data.urunBirimId == 1">
                  sqm
                </div>
                <div v-else-if="slotProps.data.urunBirimId == 2">
                  pcs
                </div>
                <div v-else-if="slotProps.data.urunBirimId == 3">
                  mt
                </div>
              </template>
            </Column>

            <Column field="gonderilen" header="Outgoing">
              <template #body="slotProps">
                {{ slotProps.data.gonderilen | formatDecimal }}
              </template>
            </Column>
            <Column field="kalan" header="Remainder">
              <template #body="slotProps">
                {{ slotProps.data.kalan | formatDecimal }}
              </template>
            </Column>
          </DataTable>

        </div>
      </div>
      <hr />
      <h3 class="text-center m-auto">Order</h3>
      <div class="row">
        <div class="col">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Prepayment</th>
                <th scope="col">Freight Selling</th>
                <th scope="col">Detail 1 Selling</th>
                <th scope="col">Detail 2 Selling</th>
                <th scope="col">Detail 3 Selling</th>
                <th scope="col">Freight Buying</th>
                <th scope="col">Detail 1 Buying</th>
                <th scope="col">Detail 2 Buying</th>
                <th scope="col">Detail 3 Buying</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ productionModel.Pesinat | formatPriceUsd }}</td>

                <td>{{ productionModel.NavlunSatis | formatPriceUsd }}</td>
                <td>{{ productionModel.DetayTutar_1 | formatPriceUsd }}</td>
                <td>{{ productionModel.DetayTutar_2 | formatPriceUsd }}</td>
                <td>{{ productionModel.DetayTutar_3 | formatPriceUsd }}</td>

                <td>{{ productionModel.NavlunAlis | formatPriceUsd }}</td>
                <td>{{ productionModel.DetayAlis_1 | formatPriceUsd }}</td>
                <td>{{ productionModel.DetayAlis_2 | formatPriceUsd }}</td>
                <td>{{ productionModel.DetayAlis_3 | formatPriceUsd }}</td>

              </tr>

            </tbody>
          </table>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <CustomInput :value="getDivideProductionModel.kalanPesinat" text="Remainder Prepayment"
            @onInput="getDivideProductionModel.kalanPesinat = $event" />
        </div>
        <div class="col">
          <CustomInput :value="getDivideProductionModel.gidenPesinat" text="Outgoing Prepayment"
            @onInput="getDivideProductionModel.gidenPesinat = $event" />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="row mb-3">
            <div class="col">
              <CustomInput :value="getDivideProductionModel.kalanNavlunSatis" text="Remainder Freight Selling"
                @onInput="getDivideProductionModel.kalanNavlunSatis = $event" />
            </div>
            <div class="col">
              <CustomInput :value="getDivideProductionModel.gidenNavlunSatis" text="Outgoing Freight Selling"
                @onInput="getDivideProductionModel.gidenNavlunSatis = $event" />
            </div>
          </div>

          <div class="row mb-3">
            <div class="col">
              <CustomInput :value="getDivideProductionModel.kalanDetaySatis_1" text="Remainder Detail 1 Selling"
                @onInput="getDivideProductionModel.kalanDetaySatis_1 = $event" />
            </div>
            <div class="col">
              <CustomInput :value="getDivideProductionModel.gidenDetaySatis_1" text="Outgoing Detail 1 Selling"
                @onInput="getDivideProductionModel.gidenDetaySatis_1 = $event" />
            </div>
          </div>
          <div class="row mb-3">
            <div class="col">
              <CustomInput :value="getDivideProductionModel.kalanDetaySatis_2" text="Remainder Detail 2 Selling"
                @onInput="getDivideProductionModel.kalanDetaySatis_2 = $event" />
            </div>
            <div class="col">
              <CustomInput :value="getDivideProductionModel.gidenDetaySatis_2" text="Outgoing Detail 2 Selling"
                @onInput="getDivideProductionModel.gidenDetaySatis_2 = $event" />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <CustomInput :value="getDivideProductionModel.kalanDetaySatis_3" text="Remainder Detail 3 Selling"
                @onInput="getDivideProductionModel.kalanDetaySatis_3 = $event" />
            </div>
            <div class="col">
              <CustomInput :value="getDivideProductionModel.gidenDetaySatis_3" text="Outgoing Detail 3 Selling"
                @onInput="getDivideProductionModel.gidenDetaySatis_3 = $event" />
            </div>
          </div>
        </div>
        <div class="col">
          <div class="row mb-3">
            <div class="col">
              <CustomInput :value="getDivideProductionModel.kalanNavlunAlis" text="Remainder Freight Buying"
                @onInput="getDivideProductionModel.kalanNavlunAlis = $event" />
            </div>
            <div class="col">
              <CustomInput :value="getDivideProductionModel.gidenNavlunAlis" text="Outgoing Freight Buying"
                @onInput="getDivideProductionModel.gidenNavlunAlis = $event" />
            </div>
          </div>
          <div class="row mb-3">
            <div class="col">
              <CustomInput :value="getDivideProductionModel.kalanDetayAlis_1" text="Remainder Detail 1 Buying"
                @onInput="getDivideProductionModel.kalanDetayAlis_1 = $event" />
            </div>
            <div class="col">
              <CustomInput :value="getDivideProductionModel.gidenDetayAlis_1" text="Outgoing Detail 1 Buying"
                @onInput="getDivideProductionModel.gidenDetayAlis_1 = $event" />
            </div>
          </div>
          <div class="row mb-3">
            <div class="col">
              <CustomInput :value="getDivideProductionModel.kalanDetayAlis_2" text="Remainder Detail 2 Buying"
                @onInput="getDivideProductionModel.kalanDetayAlis_2 = $event" />
            </div>
            <div class="col">
              <CustomInput :value="getDivideProductionModel.gidenDetayAlis_2" text="Outgoing Detail 2 Buying"
                @onInput="getDivideProductionModel.gidenDetayAlis_2 = $event" />
            </div>
          </div>
          <div class="row mb-3">
            <div class="col">
              <CustomInput :value="getDivideProductionModel.kalanDetayAlis_3" text="Remainder Detail 3 Buying"
                @onInput="getDivideProductionModel.kalanDetayAlis_3 = $event" />
            </div>
            <div class="col">
              <CustomInput :value="getDivideProductionModel.gidenDetayAlis_3" text="Outgoing Detail 3 Buying"
                @onInput="getDivideProductionModel.gidenDetayAlis_3 = $event" />
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Remainder Prepayment</th>
                <th scope="col">Outgoing Prepayment</th>

                <th scope="col">Remainder Freight Selling</th>
                <th scope="col">Outgoing Freight Selling</th>

                <th scope="col">Remainder Detail 1 Selling</th>
                <th scope="col">Outgoing Detail 1 Selling</th>

                <th scope="col">Remainder Detail 2 Selling</th>
                <th scope="col">Outgoing Detail 2 Selling</th>


                <th scope="col">Remainder Detail 3 Selling</th>
                <th scope="col">Outgoing Detail 3 Selling</th>

                <th scope="col">Remainder Freight Buying</th>
                <th scope="col">Outgoing Freight Buying</th>

                <th scope="col">Remainder Detail 1 Buying</th>
                <th scope="col">Outgoing Detail 1 Buying</th>

                <th scope="col">Remainder Detail 2 Buying</th>
                <th scope="col">Outgoing Detail 2 Buying</th>

                <th scope="col">Remainder Detail 3 Buying</th>
                <th scope="col">Outgoing Detail 3 Buying</th>





              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ getDivideProductionModel.kalanPesinat }}</td>
                <td>{{ getDivideProductionModel.gidenPesinat }}</td>
                <td>{{ getDivideProductionModel.kalanNavlunSatis }}</td>
                <td>{{ getDivideProductionModel.gidenNavlunSatis }}</td>
                <td>{{ getDivideProductionModel.kalanDetaySatis_1 }}</td>
                <td>{{ getDivideProductionModel.gidenDetaySatis_1 }}</td>

                <td>{{ getDivideProductionModel.kalanDetaySatis_2 }}</td>
                <td>{{ getDivideProductionModel.gidenDetaySatis_2 }}</td>

                <td>{{ getDivideProductionModel.kalanDetaySatis_3 }}</td>
                <td>{{ getDivideProductionModel.gidenDetaySatis_3 }}</td>

                <td>{{ getDivideProductionModel.kalanNavlunAlis }}</td>
                <td>{{ getDivideProductionModel.gidenNavlunAlis }}</td>

                <td>{{ getDivideProductionModel.kalanDetayAlis_1 }}</td>
                <td>{{ getDivideProductionModel.gidenDetayAlis_1 }}</td>
                <td>{{ getDivideProductionModel.kalanDetayAlis_2 }}</td>
                <td>{{ getDivideProductionModel.gidenDetayAlis_2 }}</td>
                <td>{{ getDivideProductionModel.kalanDetayAlis_3 }}</td>
                <td>{{ getDivideProductionModel.gidenDetayAlis_3 }}</td>


              </tr>

            </tbody>
          </table>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col">
          <Button type="button" class="p-button-success w-100" label="Divide" @click="divideProduct" />
        </div>
      </div>

    </Dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Cookies from "js-cookie";
import date from "../../plugins/date";
import api from "../../plugins/excel.server";
export default {
  computed: {
    ...mapGetters([
      "getOrderProductionDivideOrderList",
      "getDivideProductionProductModel",
      "getDivideProductionModel",
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
      "getOrderProductionDivideList"
    ]),
  },
  data() {
    return {
      selectedDivideOrder: null,
      selectedProduct: null,
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
    this.$store.dispatch("setOrderWaitingList");  },
  methods: {
    divideProduct() {
      this.getDivideProductionModel.id = this.productionModel.SiparisId;
      this.getDivideProductionModel.siparisno = this.productionModel.SiparisNo;
      this.getDivideProductionModel.siparisTarihi = date.dateToString(this.productionModel.SiparisTarihi);
      this.getDivideProductionModel.odemeTurId = this.productionModel.OdemeTurID;
      this.getDivideProductionModel.teslimTurId = this.productionModel.TeslimTurID;
      this.getDivideProductionModel.musteriId = this.productionModel.MusteriID;
      this.getDivideProductionModel.pesinat = this.productionModel.Pesinat;
      this.getDivideProductionModel.navlunFirma = this.productionModel.NavlunFirma;
      this.getDivideProductionModel.kayitTarihi = new Date();
      this.getDivideProductionModel.kullaniciId = Cookies.get("userId");
      this.getDivideProductionModel.siparisDurumId = this.productionModel.SiparisDurumID;
      this.getDivideProductionModel.uretimAciklama = this.productionModel.UretimAciklama;
      this.getDivideProductionModel.sevkiyatAciklama = this.productionModel.SevkiyatAciklama;
      this.getDivideProductionModel.finansAciklama = this.productionModel.FinansAciklama;
      this.getDivideProductionModel.odemeAciklama = this.productionModel.OdemeAciklama;
      this.getDivideProductionModel.TahminiYuklemeTarihi = date.dateToString(this.productionModel.TahminiYuklemeTarihi);
      this.getDivideProductionModel.vade = this.productionModel.Vade;
      this.getDivideProductionModel.ulke = this.productionModel.UlkeAdi;
      this.getDivideProductionModel.komisyon = this.productionModel.Komisyon;
      this.getDivideProductionModel.detayAciklama_1 = this.productionModel.DetayAciklama_1;
      this.getDivideProductionModel.detayMekmarNot_1 = this.productionModel.DetayMekmarNot_1;

      this.getDivideProductionModel.detayAciklama_2 = this.productionModel.DetayAciklama_2;
      this.getDivideProductionModel.detayMekmarNot_2 = this.productionModel.DetayMekmarNot_2;

      this.getDivideProductionModel.detayAciklama_3 = this.productionModel.DetayAciklama_3;
      this.getDivideProductionModel.detayMekmarNot_3 = this.productionModel.DetayMekmarNot_3;


      this.getDivideProductionModel.siparisSahibi = this.productionModel.SiparisSahibi;
      this.getDivideProductionModel.evrakGideri = this.productionModel.EvrakGideri;
      this.getDivideProductionModel.konteynerAyrinti = this.productionModel.KonteynerAyrinti;
      this.getDivideProductionModel.ulkeId = this.productionModel.UlkeId;
      this.getDivideProductionModel.faturaKesimTurId = this.productionModel.FaturaKesimTurID;
      this.getDivideProductionModel.operasyon = this.productionModel.Operasyon;
      this.getDivideProductionModel.finansman = this.productionModel.Finansman;
      this.getDivideProductionModel.iade = this.productionModel.Iade;
      this.getDivideProductionModel.malBedeli = this.productionModel.SiparisId;
      this.getDivideProductionModel.sigortaTutarSatis = this.productionModel.sigorta_tutar_satis;
      this.getDivideProductionModel.sigortaTutar = this.productionModel.sigorta_Tutar;
      const index = this.getDivideProductionModel.siparisno.split('-').length;
      if (index == 1) {
        this.getDivideProductionModel.siparisno_giden = this.getDivideProductionModel.siparisno + '-1';
        this.getDivideProductionModel.siparisno_kalan = this.getDivideProductionModel.siparisno + '-2';

      } else {
        const po2 = this.getDivideProductionModel.siparisno.split('-')[0];
        const index2 = this.getDivideProductionModel.siparisno.split('-')[1];
        this.getDivideProductionModel.siparisno_giden = this.getDivideProductionModel.siparisno;
        this.getDivideProductionModel.siparisno_kalan = po2 + '-' + (parseInt(index2) + 1).toString();
      }

      const data = {
        'order': this.getDivideProductionModel,
        'product': this.getOrderProductionDivideOrderList
      }
      this.$store.dispatch('setDivide', data)
        .then(response => {
          if (response) {
            this.$toast.success('Successfully');
            this.$socket.socketIO.emit("production_update_emit");

          } else {
            this.$toast.success('Error');
          };
        });





    },
    addDivideProductionOrder() {

    },
    updateDivideProductionProduct() {
      if ((this.getDivideProductionProductModel.kalan + this.getDivideProductionProductModel.gonderilen) > this.getDivideProductionProductModel.miktar) {
        alert('cannot be more than the remaining and sent amount');
        return;
      } else {
        this.$store.dispatch('setProductionDivideOrderListUpdate', this.getDivideProductionProductModel)
          .then(response => {
            if (response) {
              this.$store.dispatch('setDivideProductionsProductModel');
            }
          });
      }
    },
    divideOrderSelected(event) {
      this.getDivideProductionProductModel.kalan = event.data.kalan;
      this.getDivideProductionProductModel.gonderilen = event.data.gonderilen;
      this.getDivideProductionProductModel.id = event.data.id;
      this.getDivideProductionProductModel.siparisno = event.data.siparisno;
      this.getDivideProductionProductModel.tedarikciId = event.data.tedarikciId;
      this.getDivideProductionProductModel.urunKartId = event.data.urunKartId;
      this.getDivideProductionProductModel.urunBirimId = event.data.urunBirimId;
      this.getDivideProductionProductModel.miktar = event.data.miktar;
      this.getDivideProductionProductModel.ozelMiktar = event.data.miktar;
      this.getDivideProductionProductModel.satisFiyat = event.data.satisFiyat;
      this.getDivideProductionProductModel.kalanToplam = event.data.kalanToplam;
      this.getDivideProductionProductModel.gidenToplam = event.data.gidenToplam;
      this.getDivideProductionProductModel.uretimAciklama = event.data.uretimAciklama;
      this.getDivideProductionProductModel.musteriAciklama = event.data.musteriAciklama;
      this.getDivideProductionProductModel.kullaniciId = event.data.kullaniciId;
      this.getDivideProductionProductModel.alisFiyati = event.data.alisFiyati;
      this.getDivideProductionProductModel.siraNo = event.data.siraNo;
      this.getDivideProductionProductModel.ton = event.data.ton;
      this.getDivideProductionProductModel.adet = event.data.adet;


    },
    addDivideProductionProduct() {
      if ((this.getDivideProductionProductModel.kalan + this.getDivideProductionProductModel.gonderilen) > this.getDivideProductionProductModel.miktar) {
        alert('cannot be more than the remaining and sent amount');
        return;
      } else {
        this.$store.dispatch('setProductionDivideOrderList', this.getDivideProductionProductModel)
          .then(response => {
            if (response) {
              this.$store.dispatch('setDivideProductionsProductModel');
            }
          });
      }

    },
    changeSelectedProduct(event) {
      this.getDivideProductionProductModel.id = event.value.UrunId;
      this.getDivideProductionProductModel.siparisno = event.value.SiparisNo;
      this.getDivideProductionProductModel.tedarikciId = event.value.TedarikciID;
      this.getDivideProductionProductModel.urunKartId = event.value.UrunKartID;
      this.getDivideProductionProductModel.urunBirimId = event.value.UrunBirimID;
      this.getDivideProductionProductModel.miktar = event.value.Miktar;
      this.getDivideProductionProductModel.ozelMiktar = event.value.Miktar;
      this.getDivideProductionProductModel.satisFiyat = event.value.SatisFiyati;
      this.getDivideProductionProductModel.kalanToplam = (parseFloat(this.getDivideProductionProductModel.kalan) * parseFloat(event.value.SatisFiyati));
      this.getDivideProductionProductModel.gidenToplam = (parseFloat(this.getDivideProductionProductModel.gonderilen) * parseFloat(event.value.SatisFiyati));
      this.getDivideProductionProductModel.uretimAciklama = event.value.UretimAciklama;
      this.getDivideProductionProductModel.musteriAciklama = event.value.MusteriAciklama;
      this.getDivideProductionProductModel.kullaniciId = event.value.MusteriAciklama;
      this.getDivideProductionProductModel.alisFiyati = event.value.AlisFiyati;
      this.getDivideProductionProductModel.siraNo = event.value.SiraNo;
      this.getDivideProductionProductModel.ton = event.value.Ton;
      this.getDivideProductionProductModel.adet = event.value.Adet;
      const index = event.value.SiparisNo.split('-').length;
      if (index == 1) {
        this.getDivideProductionProductModel.giden_po = event.value.SiparisNo + '-1';
        this.getDivideProductionProductModel.kalan_po = event.value.SiparisNo + '-2';

      } else {
        const po2 = event.value.SiparisNo.split('-')[0];
        const index2 = event.value.SiparisNo.split('-')[1];
        this.getDivideProductionProductModel.giden_po = event.value.SiparisNo;
        this.getDivideProductionProductModel.kalan_po = po2 + '-' + (parseInt(index2) + 1).toString();
      };
    },
    divide() {
      this.$store.dispatch('setDivideProductionsProductModel');
      this.$store.dispatch('setDivideProductionsModel');

      this.$store.dispatch('setOrdersProductsDivideList', this.productionModel.SiparisNo)
        .then(response => {
          if (response) {
            this.divide_dialog_form = true;
            this.$store.commit('setProductionDivideOrderListReset');
            this.selectedProduct = null;


          } else {
            this.divide_dialog_form = false;

          }
        })

    },
    isfDelete(event) {
      this.$store.dispatch("setOrderProductionIsfDelete", event);
    },
    proformaDelete(id) {
      this.$store.dispatch("setOrderProductionProformaDelete", id);
    },
    excel_output() {
      api
        .post("/siparisler/dosyalar/uretimExcelCikti", this.getOrderList)
        .then((response) => {
          if (response.status) {
            const link = document.createElement("a");
            link.href = this.getLocalUrl + "siparisler/dosyalar/uretimExcelCikti";

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
        const datas = this.getOrderListAll.filter((x) => x.FaturaKesimTurID == 1);
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
        this.$socket.socketIO.emit("production_update_emit");
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
      this.productionModel.SiparisKontrolEden = Cookies.get('userId');
      this.$store.dispatch("setOrderProductionUpdate", {
        ...this.productionModel,
        SiparisId: this.getOrderProductionId,
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
      this.productionModel.KayitTarihi = date.dateToString(new Date());
      this.productionModel.KullaniciID = Cookies.get("userId");


      this.$store.dispatch("setOrderProductionSaveButtonStatus", true);
      this.$store.dispatch("setOrderProductionSave", this.productionModel);
      this.$store.dispatch("setOrderProductionPo", this.productionModel.SiparisNo);
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
      this.$store.dispatch("setOrderProductionUploadProformaButtonStatus", true);
      this.$store.commit("setOrderSupplierProductList", []);
      this.$store.dispatch("setOrderAllList");
      this.productionModel = this.getOrderProductionModel;
      this.production_detail_form = true;
    },
    productionSelected(event) {
      this.$store.dispatch("setOrderProductionButtonStatus", false);
      this.$store.dispatch("setOrderProductModel");
      this.$store.dispatch("setOrderProductionProductDetailList", event.SiparisNo);
      this.$store.dispatch("setOrderProductionCostList", event.SiparisNo);
      this.$store.dispatch("setOrderProductionSupplierList", event.SiparisNo);
      this.$store.dispatch("setOrderProductionDocumentList", event.SiparisNo);
      this.$store.dispatch("setOrderProductionCheckList", event.SiparisNo);
      this.$store.dispatch("setOrderProductionFreightTotal", event.NavlunSatis);
      this.$store.dispatch("setOrderProductionDetailTotal", event);
      this.$store.dispatch("setOrderProductionProductDetailCostTotal", event);
      this.$store.dispatch("setOrderProductionSaveButtonStatus", false);
      this.$store.dispatch("setOrderProductionProductDetailNotChangeListReset");
      this.$store.dispatch("setOrderProductionUploadProformaButtonStatus", false);
      this.$store.commit("setOrderSupplierProductList", []);

      this.$store.dispatch("setOrderProductionId", event.SiparisId);
      this.productionModel = event;
      this.$store.dispatch("setOrderProductionPo", event.SiparisNo);
      this.production_detail_form = true;
    },
  },
  mounted() {
    this.$socket.socketIO.on("production_update_on", () => {
      if (this.$route.path == '/orders/production') {
        this.$store.dispatch("setOrderProductionList");
      };
    });
    this.$socket.socketIO.on("cards_update_on", () => {
      this.$store.dispatch("setCardList");
    });
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

@media screen and (max-width:576px) {
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
