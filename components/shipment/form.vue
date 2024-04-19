<template>
  <div>
    <div class="row mb-4">
      <div class="col">
        <span class="p-float-label">
          <AutoComplete
            v-model="selectedOrder"
            inputId="order"
            :suggestions="filteredOrders"
            @complete="searchOrders($event)"
            field="SiparisNo"
            @item-select="ordersSelected($event.value.SiparisNo)"
          />
          <label for="order">Orders</label>
        </span>
      </div>
      <div class="col">
        <span class="p-float-label">
          <Calendar
            v-model="forwardingDate"
            inputId="forwardingdate"
            dateFormat="dd/mm/yy"
          />
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
          <label for="follow"> Follow </label>
        </div>
      </div>
      <div class="col">
        <div class="flex align-items-center">
          <RadioButton
            id="normal"
            v-model="forwardingstatus"
            name="dynamic"
            :value="'normal'"
          />
          <label for="normal" class="ml-2">Normal Shipment</label>
        </div>
        <div class="flex align-items-center">
          <RadioButton
            id="fast"
            v-model="forwardingstatus"
            name="dynamic"
            :value="'fast'"
          />
          <label for="fast" class="ml-2">Fast Shipment</label>
        </div>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-3">
        <Dropdown
          v-model="selectedProduct"
          :options="getOrderProductionProductNormalList"
          optionLabel="Aciklama"
          placeholder="Select a Product"
          class="w-50"
          @change="productSelected($event)"
        />
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
          <label for="forwardamount">Outgoing</label>
        </span>
      </div>
      <div class="col-3">
        <span class="p-float-label">
          <InputText
            id="remainderamount"
            v-model="getShipmentAmount.remainder"
            disabled
          />
          <label for="remainderamount">Remainder</label>
        </span>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col">
        <Button
          type="button"
          class="p-button-success w-100"
          label="Ship"
          @click="save"
          :disabled="save_button_disabled"
        />
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-4">
        <DataTable
          :value="getShipmentProductionList"
          dataKey="ID"
          :selection.sync="selectedProducts"
          :scrollable="true"
          scrollHeight="400px"
        >
          <Column
            selectionMode="multiple"
            headerStyle="width: 2rem"
            header="All"
            headerClass="tableHeader"
            bodyClass="tableBody"
          ></Column>
          <Column
            field="KasaNo"
            header="Crate No"
            headerClass="tableHeader"
            bodyClass="tableBody"
          ></Column>
          <Column
            field="Miktar"
            header="Amount"
            headerClass="tableHeader"
            bodyClass="tableBody"
          ></Column>
          <Column
            field="BirimAdi"
            header="Unit"
            headerClass="tableHeader"
            bodyClass="tableBody"
          ></Column>
        </DataTable>
      </div>
      <div class="col-1">
        <Button
          type="button"
          class="p-button-primary"
          label="Send Crate"
          @click="sendingCrate"
          :disabled="sending_crate_button_disabled"
        />
      </div>
      <div class="col">
        <DataTable
          :value="getShipmentSendProductionList"
          :scrollable="true"
          scrollHeight="400px"
        >
          <Column
            field="KasaNo"
            header="Crate No"
            headerClass="tableHeader"
            bodyClass="tableBody"
          ></Column>
          <Column
            field="UrunAdi"
            header="Product"
            headerClass="tableHeader"
            bodyClass="tableBody"
          >
            <template #footer>
              {{ getShipmentSendProductionTotal.crate }}
            </template>
          </Column>
          <Column
            field="YuzeyIslemAdi"
            header="Surface"
            headerClass="tableHeader"
            bodyClass="tableBody"
          ></Column>
          <Column header="Size" headerClass="tableHeader" bodyClass="tableBody">
            <template #body="slotProps">
              {{
                slotProps.data.En + "x" + slotProps.data.Boy + "x" + slotProps.data.Kenar
              }}
            </template>
          </Column>
          <Column
            field="BirimAdi"
            header="Unit"
            headerClass="tableHeader"
            bodyClass="tableBody"
          ></Column>
          <Column
            field="Miktar"
            header="Amount"
            headerClass="tableHeader"
            bodyClass="tableBody"
          >
            <template #body="slotProps">
              {{ slotProps.data.Miktar | formatDecimal }}
            </template>
            <template #footer>
              {{ getShipmentSendProductionTotal.amount | formatDecimal }}
            </template>
          </Column>
          <Column
            field="TotalProduct"
            header="Total"
            headerClass="tableHeader"
            bodyClass="tableBody"
          >
            <template #body="slotProps">
              {{ slotProps.data.TotalProduct | formatDecimal }}
            </template>
            <template #footer>
              {{ getShipmentSendProductionTotal.total | formatDecimal }}
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
      this.save_button_disabled = true;
      if (confirm("Sevk etmek istiyor musunuz?")) {
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
      } else {
        this.save_button_disabled = false;
      }
    },
    sendingCrate() {
      this.$store.dispatch("setShipmentSendingProduction", this.selectedProducts);
      this.$store.dispatch("setShipmentProductionDeleteList");
      this.$store.dispatch(
        "setSelectionProductionProductDelete",
        this.selectedProduct.ID
      );
      this.sending_crate_button_disabled = true;
    },
    productSelected(event) {
      this.$store.dispatch("setShipmentAmount", event.value);
      this.sending_crate_button_disabled = false;
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
