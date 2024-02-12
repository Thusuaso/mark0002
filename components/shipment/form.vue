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
            @item-select="
              $store.dispatch(
                'setSelectionProductionProductsList',
                $event.value.SiparisNo
              )
            "
          />
          <label for="order">Sipariş No</label>
        </span>
      </div>
      <div class="col">
        <span class="p-float-label">
          <Calendar
            v-model="forwardingDate"
            inputId="forwardingdate"
            dateFormat="dd/mm/yy"
          />
          <label for="forwardingdate">Sevk Tarihi</label>
        </span>
      </div>
      <div class="col">
        <span class="p-float-label">
          <InputText id="invoice" v-model="invoice" />
          <label for="invoice">Fatura No</label>
        </span>
      </div>
      <div class="col">
        <div class="flex align-items-center">
          <Checkbox class="mr-1" id="follow" v-model="follow" binary />
          <label for="follow"> Takip </label>
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
          <label for="normal" class="ml-2">Normal Sevk</label>
        </div>
        <div class="flex align-items-center">
          <RadioButton
            id="fast"
            v-model="forwardingstatus"
            name="dynamic"
            :value="'fast'"
          />
          <label for="fast" class="ml-2">Hızlı Sevk</label>
        </div>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-3">
        <Dropdown
          v-model="selectedProduct"
          :options="getProductionProductsList"
          optionLabel="Aciklama"
          placeholder="Ürün Seçiniz"
          class="w-50"
          @change="productSelected($event)"
        />
      </div>
      <div class="col-3">
        <span class="p-float-label">
          <InputText id="orderamount" v-model="getShipmentAmount.order" disabled />
          <label for="orderamount">Sipariş</label>
        </span>
      </div>
      <div class="col-3">
        <span class="p-float-label">
          <InputText id="forwardamount" v-model="getShipmentAmount.production" disabled />
          <label for="forwardamount">Giden</label>
        </span>
      </div>
      <div class="col-3">
        <span class="p-float-label">
          <InputText
            id="remainderamount"
            v-model="getShipmentAmount.remainder"
            disabled
          />
          <label for="remainderamount">Kalan</label>
        </span>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col">
        <Button
          type="button"
          class="p-button-success w-100"
          label="Sevk Et"
          @click="save"
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
            header="Hepsi"
          ></Column>
          <Column field="KasaNo" header="Kasa No"></Column>
          <Column field="Miktar" header="Miktar"></Column>
          <Column field="BirimAdi" header="Birim"></Column>
        </DataTable>
      </div>
      <div class="col-1">
        <Button
          type="button"
          class="p-button-primary"
          label="Kasa Çık"
          @click="sendingCrate"
        />
      </div>
      <div class="col">
        <DataTable
          :value="getShipmentSendProductionList"
          :scrollable="true"
          scrollHeight="400px"
        >
          <Column field="KasaNo" header="Kasa No"></Column>
          <Column field="UrunAdi" header="Ürün">
            <template #footer>
              {{ getShipmentSendProductionTotal.crate }}
            </template>
          </Column>
          <Column field="YuzeyIslemAdi" header="Yüzey"></Column>
          <Column header="Ölçü">
            <template #body="slotProps">
              {{
                slotProps.data.En + "x" + slotProps.data.Boy + "x" + slotProps.data.Kenar
              }}
            </template>
          </Column>
          <Column field="BirimAdi" header="Birim"></Column>
          <Column field="Miktar" header="Miktar">
            <template #body="slotProps">
              {{ slotProps.data.Miktar | formatDecimal }}
            </template>
            <template #footer>
              {{ getShipmentSendProductionTotal.amount | formatDecimal }}
            </template>
          </Column>
          <Column field="TotalProduct" header="Toplam">
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
      "getProductionProductsList",
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
      follow: null,
      forwardingstatus: null,
      selectedProduct: null,
      orderamount: null,
      forwardamount: null,
      remainderamount: null,
      sendCrateList: [],
    };
  },
  methods: {
    save() {
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
      };
      this.$store.dispatch("setShipmentSave", datas);
    },
    sendingCrate() {
      this.$store.dispatch("setShipmentSendingProduction", this.selectedProducts);
      this.$store.dispatch("setShipmentProductionDeleteList");
      this.$store.dispatch(
        "setSelectionProductionProductDelete",
        this.selectedProduct.ID
      );
    },
    productSelected(event) {
      this.$store.dispatch("setShipmentAmount", event.value);
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
