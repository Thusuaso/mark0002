<template>
  <div>
    <div class="row mb-4">
      <div class="col">
        <span class="p-float-label">
          <AutoComplete v-model="selectedOrder" inputId="order" :suggestions="filteredOrders"
            @complete="searchOrders($event)" field="SiparisNo" @item-select="ordersSelected($event.value.SiparisNo)" />
          <label for="order">Orders</label>
        </span>
      </div>
      <div class="col">
        <span class="p-float-label">
          <Calendar v-model="forwardingDate" inputId="forwardingdate" dateFormat="dd/mm/yy" />
          <label for="forwardingdate">Shipment Date</label>
        </span>
      </div>
      <div class="col">
        <span class="p-float-label">
          <InputText id="invoice" v-model="invoice" />
          <label for="invoice">Invoice No</label>
        </span>
      </div>
      <div class="col">
        <div class="flex align-items-center">
          <Checkbox class="mr-1" id="follow" v-model="follow" binary />
          <label for="follow"> Track </label>
        </div>
      </div>
      <div class="col">
        <div class="flex align-items-center">
          <RadioButton id="normal" v-model="forwardingstatus" name="dynamic" :value="'normal'" />
          <label for="normal" class="ml-2">Regular Shipment</label>
        </div>
        <div class="flex align-items-center">
          <RadioButton id="fast" v-model="forwardingstatus" name="dynamic" :value="'fast'" />
          <label for="fast" class="ml-2">Fast Shipment</label>
        </div>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-3">
        <Dropdown v-model="selectedProduct" :options="getOrderProductionProductNormalList" optionLabel="Aciklama"
          placeholder="Select a Product" class="w-100" @change="productSelected($event)" />
      </div>
      <div class="col-3">
        <span class="p-float-label">
          <InputText id="orderamount" v-model="getShipmentAmount.order" disabled />
          <label for="orderamount">Order</label>
        </span>
      </div>
      <div class="col-3">
        <span class="p-float-label">
          <InputText id="forwardamount" v-model="getShipmentAmount.production" disabled />
          <label for="forwardamount">Shipped</label>
        </span>
      </div>
      <div class="col-3">
        <span class="p-float-label">
          <InputText id="remainderamount" v-model="getShipmentAmount.remainder" disabled />
          <label for="remainderamount">Remained</label>
        </span>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col">
        <Button type="button" class="p-button-success w-100" label="Ship" @click="save"
          :disabled="save_button_disabled" />
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-4">
        <DataTable :value="getShipmentProductionList" dataKey="ID" :selection.sync="selectedProducts" :scrollable="true"
          scrollHeight="400px"
            sortField="KasaNo" :sortOrder="1"
          >
          <Column selectionMode="multiple" headerStyle="width: 2rem" header="All" headerClass="tableHeader"
            bodyClass="tableBody"></Column>
          <Column field="KasaNo" header="Crate No" headerClass="tableHeader" bodyClass="tableBody"></Column>
          <Column field="Miktar" header="Amount" headerClass="tableHeader" bodyClass="tableBody"></Column>
          <Column field="BirimAdi" header="Unit" headerClass="tableHeader" bodyClass="tableBody"></Column>
        </DataTable>
      </div>
      <div class="col-1">
        <Button type="button" class="p-button-primary" label="Send Crate" @click="sendingCrate"
          :disabled="sending_crate_button_disabled" />
      </div>
      <div class="col">
        <DataTable :value="getShipmentSendProductionList" :scrollable="true" scrollHeight="400px">
          <Column field="KasaNo" header="Crate No" headerClass="tableHeader" bodyClass="tableBody"></Column>
          <Column field="UrunAdi" header="Product" headerClass="tableHeader" bodyClass="tableBody">
            <template #footer>
              {{ getShipmentSendProductionTotal.crate }}
            </template>
          </Column>
          <Column field="YuzeyIslemAdi" header="Surface" headerClass="tableHeader" bodyClass="tableBody"></Column>
          <Column header="Size" headerClass="tableHeader" bodyClass="tableBody">
            <template #body="slotProps">
              {{
              slotProps.data.En + "x" + slotProps.data.Boy + "x" + slotProps.data.Kenar
              }}
            </template>
          </Column>
          <Column field="BirimAdi" header="Unit" headerClass="tableHeader" bodyClass="tableBody"></Column>
          <Column field="Miktar" header="Amount" headerClass="tableHeader" bodyClass="tableBody">
            <template #body="slotProps">
              {{ slotProps.data.Miktar | formatDecimal }}
            </template>
            <template #footer>
              {{ getShipmentSendProductionTotal.amount | formatDecimal }}
            </template>
          </Column>
          <Column field="TotalProduct" header="Total" headerClass="tableHeader" bodyClass="tableBody">
            <template #body="slotProps">
              {{ slotProps.data.TotalProduct | formatPriceUsd }}
            </template>
            <template #footer>
              {{ getShipmentSendProductionTotal.total | formatPriceUsd }}
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import convertDate from "../../plugins/date";
import Cookies from "js-cookie";

export default {
  computed: {
    ...mapGetters([
      "getOrderProductionProductNormalList",
      "getShipmentAmount",
      "getShipmentProductionList",
      "getShipmentSendProductionList",
      "getShipmentSendProductionTotal",
      "getSupplierList"
    ]),
  },
  props: {
    orders: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedProducts: null,
      selectedOrder: null,
      filteredOrders: null,
      forwardingDate: null,
      invoice: null,
      follow: 0,
      forwardingstatus: "normal",
      selectedProduct: null,
      orderamount: null,
      forwardamount: null,
      remainderamount: null,
      sendCrateList: [],
      save_button_disabled: false,
      sending_crate_button_disabled: true,
    };
  },
  methods: {
    ordersSelected(event) {
      this.$store.dispatch("setOrderProductionProductListNormal", event);
      this.forwardingDate = null;
      this.invoice = null;
      this.follow = null;
      this.forwardingstatus = null;
      this.selectedProduct = null;
      this.getShipmentAmount.order = 0;
      this.getShipmentAmount.production = 0;
      this.getShipmentAmount.remainder = 0;
      this.getShipmentProductionList = null;
      this.selectedProducts = null;
      this.$store.dispatch("setShipmentSendProductionList");
      this.$store.dispatch("setShipmentSendProductionTotalCrateReset");
      this.$store.dispatch("setShipmentOrderControl", event)
        .then(response => {
          if (response.TeslimTurID == 5 || response.TeslimTurID == 6 || response.TeslimTurID == 7) {
            this.save_button_disabled = false;
            this.sending_crate_button_disabled = false;
          } else {
            if (response.NavlunSatis == 0 || response.NavlunSatis == null || response.NavlunSatis == "" || response.NavlunSatis == undefined) {
              this.$toast.error("Navlun satış bilgisi girilmeli.Girdikten Sonra Sayfayı Yenileyiniz!");
              this.save_button_disabled = false;
              this.sending_crate_button_disabled = false;
            } else {
              this.save_button_disabled = false;
              this.sending_crate_button_disabled = false;
            }
          }
      })
    },
    __getPriceControl(payload) {

      const supplierName = this.getSupplierList.find(x=>x.ID == payload.TedarikciID).FirmaAdi;
      if (payload.SatisFiyati == 0 || payload.SatisFiyati == undefined || payload.SatisFiyati == null || payload.SatisFiyati == "") {
        this.$toast.error(`${supplierName} ürünlerine satış fiyati girilmeli.Girdikten Sonra Sayfayı Yenileyiniz!`);
        this.save_button_disabled = false;
        this.sending_crate_button_disabled = false;
      } else {
        this.save_button_disabled = false;
        this.sending_crate_button_disabled = false;
      };
    },
    __getFreightControl(payload) {
      
    },
    reset() {
      this.selectedOrder = null;
      this.forwardingDate = null;
      this.invoice = null;
      this.follow = null;
      this.forwardingstatus = null;
      this.selectedProduct = null;
      this.getShipmentAmount.order = 0;
      this.getShipmentAmount.production = 0;
      this.getShipmentAmount.remainder = 0;
      this.getShipmentProductionList = null;
      this.selectedProducts = null;
      this.$store.dispatch("setShipmentSendProductionList");
    },
    save() {
      if(this.getOrderProductionProductNormalList.length  == 0){
      this.save_button_disabled = true;
      if(!this.selectedOrder){
        this.$toast.error("Sipariş seçilmemiş, tekrar deneyiniz...");
        this.save_button_disabled = false;

      }else{
        if(!this.forwardingDate){
          this.$toast.error("Sevkiyat tarihi girilmemiş, tekrar deneyiniz...");
          this.save_button_disabled = false;

        }else{
          if(this.invoice == '' || this.invoice ==  ' ' || this.invoice == null || this.invoice == undefined){
            this.$toast.error("Fatura no girilmemiş, tekrar deneyiniz...");
            this.save_button_disabled = false;

          }else{
            if(this.forwardingstatus == '' || this.forwardingstatus == ' ' || this.forwardingstatus ==null || this.forwardingstatus ==undefined){
              if (confirm("Sevk türü seçilmemiş yine de sevk etmek istiyor musunuz?")) {
                    const data = this.getShipmentSendProductionList;
                    for (const item of data) {
                      item.KullaniciId = Cookies.get("userId");
                      item.Tarih = convertDate.dateToString(this.forwardingDate);
                      item.MusteriId = this.selectedOrder.MusteriID;
                      item.SiparisNo = this.selectedOrder.SiparisNo;
                    }
                    const datas = {
                      data: data,
                      MusteriID: this.selectedOrder.MusteriID,
                      SiparisNo: this.selectedOrder.SiparisNo,
                      FaturaNo: this.invoice,
                      YuklemeTarihi: convertDate.dateToString(this.forwardingDate),
                      SevkStatus: this.forwardingstatus,
                      Takip: this.follow,
                      KullaniciAdi: Cookies.get("username"),
                      mail: Cookies.get("mail"),
                    };
                    this.$store.dispatch("setShipmentSave", datas).then((res) => {
                      if (res) {
                        this.$toast.success("Başarıyla Sevk Edildi");
                        this.$store.dispatch("setOrderList");
                        this.save_button_disabled = false;

                        this.reset();
                      } else {
                        this.$toast.error("Sevk Edilemedi");
                      }
                    });
                } 
            }else{
              const data = this.getShipmentSendProductionList;
                    for (const item of data) {
                      item.KullaniciId = Cookies.get("userId");
                      item.Tarih = convertDate.dateToString(this.forwardingDate);
                      item.MusteriId = this.selectedOrder.MusteriID;
                      item.SiparisNo = this.selectedOrder.SiparisNo;
                    }
                    const datas = {
                      data: data,
                      MusteriID: this.selectedOrder.MusteriID,
                      SiparisNo: this.selectedOrder.SiparisNo,
                      FaturaNo: this.invoice,
                      YuklemeTarihi: convertDate.dateToString(this.forwardingDate),
                      SevkStatus: this.forwardingstatus,
                      Takip: this.follow,
                      KullaniciAdi: Cookies.get("username"),
                      mail: Cookies.get("mail"),
                    };
                    this.$store.dispatch("setShipmentSave", datas).then((res) => {
                      if (res) {
                        this.$toast.success("Başarıyla Sevk Edildi");
                        this.$store.dispatch("setOrderList");
                        this.save_button_disabled = false;

                        this.reset();
                      } else {
                        this.$toast.error("Sevk Edilemedi");
                      }
                    });
            }

          }
        }
      }


      }else{
        this.$toast.error("Gönderilmemiş Ürünler Mevcut. Kontrol edip tekrar dene...");
      };

    },
    sendingCrate() {
      this.$store.dispatch("setShipmentSendingProduction", this.selectedProducts);
      this.$store.dispatch("setShipmentProductionDeleteList");
      this.$store.dispatch(
        "setSelectionProductionProductDelete",
        this.selectedProduct.ID
      );
      this.$store.commit("setShipmentDropProducts", this.selectedProduct.ID);
      this.sending_crate_button_disabled = true;
      this.selectedProducts = null;
    },
    productSelected(event) {
      this.$store.dispatch("setShipmentAmount", event.value);
      this.sending_crate_button_disabled = false;
      this.__getPriceControl(event.value)
    },
    searchOrders(event) {
      let results;
      if (event.query.length == 0) {
        results = this.orders;
      } else {
        results = this.orders.filter((x) => {
          return x.SiparisNo.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
      this.filteredOrders = results;
    },
  },
};
</script>
<style scoped>
@media screen and (max-width:576px) {
  .row{
  clear:both;
  display:block;
  width:100%;
}
.col{
  clear:both;
  display:block;
  width:100%;
}
.col-4{
  clear:both;
  display:block;
  width:100%;
}
.col-1{
  clear:both;
  display:block;
  width:100%;
}
}
</style>