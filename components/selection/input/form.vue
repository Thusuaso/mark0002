<template>
  <div class="container">
    <div class="row mt-3">
      <div class="col">
        <Dropdown
          v-model="selectedSaveKind"
          :options="kinds"
          optionLabel="status"
          placeholder="Kind of Save"
          class="mb-4"
          style="width: 300px"
          @change="saveKindSelected($event)"
        />
        <span class="p-float-label mb-4" style="width: 250px">
          <AutoComplete
            :disabled="disabledOrders"
            style="width: 250px"
            v-model="selectedPo"
            inputId="ac"
            :suggestions="filteredPo"
            field="SiparisNo"
            @complete="searchPo($event)"
            @item-select="poSelected($event)"
          />
          <label for="ac">Po</label>
        </span>
        <Dropdown
          class="mb-4"
          :disabled="disabledOrders"
          v-model="selectedProducts"
          :options="products"
          optionLabel="Aciklama"
          placeholder="Select a Product"
          style="width: 300px"
          @change="productsSelected($event)"
        />
        <InputText
          class="mb-4"
          style="width: 300px"
          type="text"
          v-model="orderProductCardDesc"
          disabled
          placeholder="Order Product Card"
        />
        <div class="row mb-4">
          <div class="col-9">
            <InputText
              type="text"
              class="w-100"
              v-model="productCardId"
              disabled
            />
          </div>
          <div class="col">
            <Button
              type="button"
              class="p-button-secondary"
              label="@"
              @click="product_cards_form_dialog = true"
              :disabled="!disabledOrders"
            />
          </div>
        </div>
        <div class="row mb-4">
          <div class="col-6">
            <span class="p-float-label">
              <InputText
                id="create"
                type="text"
                v-model="getProductionCrateNo"
              />
              <label for="create">Crate No</label>
            </span>
          </div>
          <div class="col-6">
            <span class="p-float-label">
              <AutoComplete
                id="mine"
                v-model="selectedMine"
                :suggestions="filteredMineList"
                @complete="searchMine($event)"
                field="OcakAdi"
              />
              <label for="mine">Quarry</label>
            </span>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <span class="p-float-label">
              <InputText id="organizer" type="text" v-model="organizer" />
              <label for="organizer">Controled by</label>
            </span>
          </div>
          <div class="col-6">
            <span class="p-float-label">
              <InputText id="crateMan" type="text" v-model="crateman" />
              <label for="crateMan">Crated by</label>
            </span>
          </div>
        </div>
      </div>
      <div class="col">
        <span class="p-float-label mb-3">
          <AutoComplete
            v-model="selectedSupplier"
            inputId="ac"
            :suggestions="filteredSuppliers"
            field="FirmaAdi"
            @complete="searchSupplier($event)"
            @item-select="supplierSelected($event)"
          />
          <label for="ac">Supplier</label>
        </span>
        <Calendar
          v-model="selectedDate"
          dateFormat="dd/mm/yy"
          class="w-100 mb-3"
        />
        <div class="row mb-3">
          <div
            v-for="(item, index) of amountStatus"
            :key="item.id"
            class="col-3"
          >
            <RadioButton
              v-model="selectedAmountStatus"
              :inputId="index"
              name="dynamic"
              :value="item.status"
            />
            <label :for="index" class="ml-2">{{ item.status }}</label>
          </div>
        </div>
        <div class="row g-3 mb-3">
          <div class="col-4">
            <span class="p-float-label">
              <InputText
                id="boxamount"
                type="text"
                v-model="boxamount"
                class="w-100"
                @input="calculateM2Box($event)"
              />
              <label for="boxamount">Box Amount</label>
            </span>
          </div>
          <div class="col-4">
            <span class="p-float-label">
              <InputText
                id="boxinamount"
                type="text"
                v-model="boxinamount"
                class="w-100"
                @input="calculateTotalAmount($event)"
              />
              <label for="boxinamount">Pcs in Box</label>
            </span>
          </div>
          <div class="col-4">
            <span class="p-float-label">
              <InputText
                id="totalamount"
                type="text"
                v-model="totalamount"
                class="w-100"
                @input="calculateTotalAmountM2($event)"
              />
              <label for="totalamount">Total Pieces</label>
            </span>
          </div>
        </div>
        <div class="row g-3">
          <div class="col-4">
            <span class="p-float-label">
              <InputText
                id="amount"
                type="text"
                v-model="amount"
                class="w-100"
                @input="amountInput($event)"
              />
              <label for="amount">Amount</label>
            </span>
          </div>
          <div class="col-4">
            <span class="p-float-label">
              <InputText
                id="speacialamount"
                type="text"
                v-model="speacialAmount"
                @input="speacialAmount = $event.replace(',', '.')"
                class="w-100"
              />
              <label for="speacialamount">Sqm</label>
            </span>
          </div>
          <div class="col-4">
            <span class="p-float-label">
              <InputText
                id="crateamount"
                type="text"
                v-model="crateAmount"
                class="w-100"
              />
              <label for="crateamount">Crate Amount</label>
            </span>
          </div>
        </div>
        <div class="row g-3 mb-3">
          <div class="col">
            <div class="flex align-items-center">
              <Checkbox v-model="boxStatus" inputId="box" :binary="true" />
              <label for="box" class="ml-2"> Box </label>
            </div>
          </div>
          <div class="col">
            <div class="flex align-items-center">
              <Checkbox
                v-model="stringStatus"
                inputId="string"
                :binary="true"
              />
              <label for="string" class="ml-2"> Binded </label>
            </div>
          </div>
          <div class="col">
            <div class="flex align-items-center">
              <Checkbox v-model="outStatus" inputId="out" :binary="true" />
              <label for="out" class="ml-2"> Out </label>
            </div>
          </div>
          <div class="col">
            <div class="flex align-items-center">
              <Checkbox
                v-model="notFindStatus"
                inputId="notFind"
                :binary="true"
              />
              <label for="notFind" class="ml-2"> N.Found </label>
            </div>
          </div>
          <div class="col">
            <div class="flex align-items-center">
              <Checkbox
                v-model="fasonStatus"
                inputId="fason_status"
                :binary="true"
              />
              <label for="fason_status" class="ml-2"> Fason </label>
            </div>
          </div>
          <div class="col">
            <div class="flex align-items-center">
              <Checkbox
                v-model="kutulamaStatus"
                inputId="kutulama_status"
                :binary="true"
              />
              <label for="kutulama_status" class="ml-2"> Kutulama </label>
            </div>
          </div>
        </div>
        <div class="row g-3">
          <Textarea v-model="description" rows="5" cols="25" />
        </div>
      </div>
      <div class="col">
        <div class="row">
          <div class="col-6 mb-2">
            <span class="p-float-label">
              <InputText
                id="category"
                type="text"
                v-model="categoryName"
                disabled
              />
              <label for="category">Category</label>
            </span>
          </div>
          <div class="col-6">
            <span class="p-float-label">
              <InputText
                id="product"
                type="text"
                v-model="productName"
                disabled
              />
              <label for="product">Product</label>
            </span>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <span class="p-float-label">
              <InputText
                id="surface"
                type="text"
                v-model="surfaceName"
                disabled
              />
              <label for="surface">Surface</label>
            </span>
          </div>
          <div class="col-6">
            <span class="p-float-label">
              <InputText id="size" type="text" v-model="sizeName" disabled />
              <label for="size">Size</label>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row m-auto text-center">
        <div class="col">
          <Button
            type="button"
            class="p-button-success w-100"
            label="Save"
            @click="saveProcess"
          />
        </div>
        <div class="col" v-if="!buttonStatus">
          <Button
            type="button"
            class="p-button-danger w-100"
            label="Delete"
            @click="deleteForm"
          />
        </div>
      </div>
    </div>

    <Dialog
      :visible.sync="product_cards_form_dialog"
      header="Ürün Kartları"
      modal
    >
      <productCards @cards_selected_emit="productCardsSelected($event)" />
    </Dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import date from "../../../plugins/date";
import Cookies from "js-cookie";
import { io } from "socket.io-client";

export default {
  computed: {
    ...mapGetters(["getProductionCrateNo"]),
  },
  props: {
    suppliers: {
      type: Array,
      required: true,
    },
    orders: {
      type: Array,
      required: false,
    },
    products: {
      type: Array,
      required: false,
    },
    mines: {
      type: Array,
      required: true,
    },
    model: {
      type: Object,
      required: true,
    },
    buttonStatus: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      socket: null,
      kutulamaStatus: false,
      fasonStatus: false,
      width: null,
      height: null,
      description: null,
      notFindStatus: false,
      outStatus: false,
      stringStatus: false,
      boxStatus: false,
      crateAmount: 1,
      speacialAmount: 0,
      amount: 0,
      totalamount: 0,
      boxinamount: 0,
      boxamount: 0,
      organizer: "Muhsin",
      crateman: null,
      filteredMineList: null,
      selectedMine: null,
      createNo: null,
      categoryName: null,
      productName: null,
      surfaceName: null,
      sizeName: null,
      orderProductCardDesc: null,
      selectedAmountStatus: "Sqm",
      selectedSaveKind: null,
      kinds: [
        { id: 1, status: "Stok" },
        { id: 2, status: "Sipariş" },
      ],
      selectedSupplier: null,
      items: [],
      filteredSuppliers: null,
      selectedPo: null,
      filteredPo: null,
      selectedDate: new Date(),
      selectedProducts: null,
      amountStatus: [
        { id: 1, status: "Sqm" },
        { id: 2, status: "Pcs" },
        { id: 3, status: "Mt" },
        { id: 4, status: "Ton" },
      ],
      productCardId: null,
      disabledOrders: true,
      product_cards_form_dialog: false,
    };
  },
  created() {
    if (!this.buttonStatus) {
      this.createdProcess();
    } else {
      this.$store.commit("setSelectionProductionCrateNo", null);
    }
  },
  methods: {
    amountInput(event) {
      this.amount = event.replace(",", ".");
      if (this.selectedAmountStatus == "Sqm") {
        this.speacialAmount = this.amount;
      } else {
        this.speacialAmount = 0;
      }
    },
    __nullNoneTrueFalseControl(value) {
      if (value == null || value == undefined || value == "" || value == " ") {
        return false;
      } else {
        return value;
      }
    },

    calculateTotalAmountM2(event) {
      if (this.selectedAmountStatus === "Sqm") {
        if (
          this.width == "ANT" ||
          this.height == "Free" ||
          this.width == "Ant" ||
          this.height == "FREE" ||
          this.width == "Mini" ||
          this.width == "MINI" ||
          this.width == "Other" ||
          this.width == "OTHER"
        ) {
          return 0;
        } else if (
          this.width === "VAR" ||
          this.width === "Various" ||
          this.width === "Slab" ||
          this.width === "SLAB"
        ) {
          this.amount = 0;
        } else {
          if (this.selectedAmountStatus == "Sqm") {
            const width = parseFloat(this.width.replace(",", "."));
            const height = parseFloat(this.height.replace(",", "."));
            this.amount = (
              (width * height * parseInt(event.replace(",", "."))) /
              10000
            ).toFixed(2);
            this.speacialAmount = this.amount;
          } else {
            const width = parseFloat(this.width.replace(",", "."));
            const height = parseFloat(this.height.replace(",", "."));
            this.speacialAmount = (
              (width * height * parseInt(event.replace(",", "."))) /
              10000
            ).toFixed(2);
            this.amount = event;
          }
        }
      } else if (this.selectedAmountStatus === "Pcs") {
        if (
          this.width == "ANT" ||
          this.height == "Free" ||
          this.width == "Ant" ||
          this.height == "FREE" ||
          this.width == "Mini" ||
          this.width == "MINI" ||
          this.width == "Other" ||
          this.width == "OTHER"
        ) {
          return 0;
        } else if (
          this.width === "VAR" ||
          this.width === "Various" ||
          this.width === "Slab" ||
          this.width === "SLAB"
        ) {
          this.amount = event;
        } else {
          if (this.selectedAmountStatus == "Sqm") {
            const width = parseFloat(this.width.replace(",", "."));
            const height = parseFloat(this.height.replace(",", "."));
            this.amount = (
              (width * height * parseInt(event.replace(",", "."))) /
              10000
            ).toFixed(2);
            this.speacialAmount = this.amount;
          } else {
            const width = parseFloat(this.width.replace(",", "."));
            const height = parseFloat(this.height.replace(",", "."));
            this.speacialAmount = (
              (width * height * parseInt(event.replace(",", "."))) /
              10000
            ).toFixed(2);
            this.amount = event;
          }
        }
      }
    },
    calculateTotalAmount(event) {
      if (this.boxamount) {
        this.totalamount = +event * +this.boxamount;
      }
    },
    calculateM2Box(event) {
      let boxM2 = 0.74346;
      let setM2 = 0.494875;

      if (event) {
        if (
          (this.height == "Set" || this.height == "SET") &&
          this.width == "20,3"
        ) {
          this.amount = (setM2 * event).toFixed(2);
          this.speacialAmount = this.amount;
        } else {
          this.amount = (boxM2 * event).toFixed(2);
          this.speacialAmount = this.amount;
        }
      }
    },
    async deleteForm() {
      await this.$store.dispatch(
        "setSelectionProductionDelete",
        this.model.KasaNo
      );
      this.$store.getters.getSocket.emit("update_production_emit");
      this.$emit("selection_production_dialog_form", false);
      this.$store.dispatch("setSelectionProductionTotal");
    },
    supplierSelected(event) {
      if (this.buttonStatus) {
        if (event.value.ID != 1 || event.value.ID != 123) {
          this.$store.dispatch("setSelectionProductionCrateNoOut");
        }
      }
    },
    saveProcess() {
      if (this.buttonStatus) {
        this.save();
      } else {
        this.update();
      }
    },
    async save() {
      let sipAciklama;
      if (this.selectedSaveKind.id == 1) {
        sipAciklama = "Stok";
      } else {
        sipAciklama = this.selectedProducts.SiparisNo;
      }
      let birimId;
      if (this.selectedAmountStatus == "Sqm") {
        birimId = 1;
      } else if (this.selectedAmountStatus == "Pcs") {
        birimId = 2;
      } else if (this.selectedAmountStatus == "Mt") {
        birimId = 3;
      } else if (this.selectedAmountStatus == "Ton") {
        birimId = 4;
      }
      const data = {
        Tarih: date.dateToString(this.selectedDate),
        KasaNo: this.getProductionCrateNo,
        UrunKartID: this.productCardId,
        TedarikciID: this.selectedSupplier.ID,
        UrunBirimID: birimId,
        UrunOcakID: this.selectedMine.ID,
        Adet: this.totalamount,
        KutuAdet: this.boxamount,
        Miktar: this.amount,
        Aciklama: this.description,
        UretimTurID: this.selectedSaveKind.id,
        UrunDurumID: 1,
        SiparisAciklama: sipAciklama,
        Kutu: this.boxStatus,
        Duzenleyen: this.organizer,
        Kasalayan: this.crateman,
        Disarda: this.outStatus,
        KutuIciAdet: this.boxinamount,
        SqmMiktar: this.speacialAmount,
        Bagli: this.stringStatus,
        Bulunamadi: this.notFindStatus,
        KasaKayıtAdedi: this.crateAmount,
        Fason: this.fasonStatus,
        Kutulama: this.kutulamaStatus,
        KullaniciID: Cookies.get("userId"),
      };

      await this.$store.dispatch("setSelectionProductionSave", data);
      this.$store.getters.getSocket.emit("update_production_emit");

      this.$store.dispatch("setSelectionProductionTotal");
      this.reset();
    },
    async update() {
      let sipAciklama;
      if (this.selectedSaveKind.id == 1) {
        sipAciklama = "Stok";
      } else {
        sipAciklama = this.selectedPo.SiparisNo;
      }
      let birimId;
      if (this.selectedAmountStatus == "Sqm") {
        birimId = 1;
      } else if (this.selectedAmountStatus == "Pcs") {
        birimId = 2;
      } else if (this.selectedAmountStatus == "Mt") {
        birimId = 3;
      } else if (this.selectedAmountStatus == "Ton") {
        birimId = 4;
      }
      const data = {
        ID: this.model.ID,
        Tarih: date.dateToString(this.selectedDate),
        KasaNo: this.getProductionCrateNo,
        UrunKartID: this.productCardId,
        TedarikciID: this.selectedSupplier.ID,
        UrunBirimID: birimId,
        UrunOcakID: this.selectedMine.ID,
        Adet: this.totalamount,
        KutuAdet: this.boxamount,
        Miktar: this.amount,
        Aciklama: this.description,
        UretimTurID: this.selectedSaveKind.id,
        UrunDurumID: 1,
        SiparisAciklama: sipAciklama,
        Kutu: this.boxStatus,
        Duzenleyen: this.organizer,
        Kasalayan: this.crateman,
        Disarda: this.outStatus,
        KutuIciAdet: this.boxinamount,
        SqmMiktar: this.speacialAmount,
        Bagli: this.stringStatus,
        Bulunamadi: this.notFindStatus,
        KasaKayıtAdedi: this.crateAmount,
        Fason: this.fasonStatus,
        Kutulama: this.kutulamaStatus,
      };
      await this.$store.dispatch("setSelectionProductionUpdate", data);
      this.$store.getters.getSocket.emit("update_production_emit");
      this.$emit("selection_production_dialog_form", false);
    },
    reset() {
      this.productCardId = null;
      this.selectedProducts = null;
      this.selectedDate = new Date();
      this.selectedProducts = null;
      this.selectedPo = null;
      this.description = null;
      this.notFindStatus = false;
      this.outStatus = false;
      this.stringStatus = false;
      this.boxStatus = false;
      this.crateAmount = 1;
      this.speacialAmount = 0;
      this.amount = 0;
      this.totalamount = 0;
      this.boxinamount = 0;
      this.boxamount = 0;
      this.organizer = "Muhsin";
      this.crateman = null;
      this.filteredMineList = null;
      this.selectedMine = null;
      this.createNo = null;
      this.categoryName = null;
      this.productName = null;
      this.surfaceName = null;
      this.sizeName = null;
      this.orderProductCardDesc = null;
      this.selectedAmountStatus = "Sqm";
      this.selectedSaveKind = null;
      this.selectedSupplier = null;
      this.fasonStatus = false;
      this.kutulamaStatus = false;

      this.$store.commit("setSelectionProductionCrateNo", null);
    },
    createdProcess() {
      this.selectedSaveKind = this.kinds.find(
        (x) => x.id == this.model.UretimTurID
      );
      this.selectedPo = this.orders.find(
        (x) => x.SiparisNo == this.model.SiparisAciklama
      );
      this.selectedSupplier = this.suppliers.find(
        (x) => x.FirmaAdi == this.model.FirmaAdi
      );
      this.selectedDate = date.stringToDate(this.model.Tarih);
      this.selectedAmountStatus = this.model.UrunBirimAdi;
      this.productCardId = this.model.UrunKartId;
      this.categoryName = this.model.KategoriAdi;
      this.productName = this.model.UrunAdi;
      this.surfaceName = this.model.YuzeyIslemAdi;
      this.sizeName =
        this.model.En + "x" + this.model.Boy + "x" + this.model.Kenar;
      this.orderProductCardDesc =
        this.model.FirmaAdi +
        "/" +
        this.model.KategoriAdi +
        "/" +
        this.model.UrunAdi +
        "/" +
        this.model.YuzeyIslemAdi +
        "/" +
        this.model.En +
        "x" +
        this.model.Boy +
        "x" +
        this.model.Kenar;
      this.$store.commit("setSelectionProductionCrateNo", this.model.KasaNo);
      this.selectedMine = this.mines.find((x) => x.ID == this.model.OcakId);
      this.crateman = this.model.Kasalayan;
      this.organizer = this.model.Duzenleyen;
      this.boxamount = this.model.KutuAdet;
      this.boxinamount = this.model.KutuIciAdet;
      this.totalamount = this.model.Adet;
      this.amount = this.model.Miktar;
      this.width = this.model.En;
      this.height = this.model.Boy;
      if (this.model.SqmMiktar == null) {
        this.speacialAmount = 0;
      } else {
        this.speacialAmount = this.model.SqmMiktar;
      }
      this.fasonStatus = this.model.Fason;
      this.kutulamaStatus = this.model.Kutulama;
      this.description = this.model.Aciklama;
      this.notFindStatus = this.__nullNoneTrueFalseControl(
        this.model.Bulunamadi
      );
      this.outStatus = this.__nullNoneTrueFalseControl(this.model.Disarda);
      this.stringStatus = this.__nullNoneTrueFalseControl(this.model.Bagli);
      this.boxStatus = this.__nullNoneTrueFalseControl(this.model.Kutu);
    },
    searchMine(event) {
      let results;
      if (event.query.lenght == 0) {
        results = this.mines;
      } else {
        results = this.mines.filter((x) => {
          return x.OcakAdi.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
      this.filteredMineList = results;
    },
    productCardsSelected(event) {
      this.product_cards_form_dialog = false;
      this.productCardId = event.ID;
      this.orderProductCardDesc =
        event.KategoriAdi +
        "/" +
        event.UrunAdi +
        "/" +
        event.YuzeyIslemAdi +
        "/" +
        event.En +
        "x" +
        event.Boy +
        "x" +
        event.Kenar;
      this.categoryName = event.KategoriAdi;
      this.productName = event.UrunAdi;
      this.surfaceName = event.YuzeyIslemAdi;
      this.sizeName = event.En + "x" + event.Boy + "x" + event.Kenar;
      this.width = event.En;
      this.height = event.Boy;
    },
    saveKindSelected(event) {
      if (!this.buttonStatus) {
        if (this.selectedSupplier.ID == 1) {
          if (event.value.id == 1) {
            this.disabledOrders = true;
            this.selectedSupplier = { ID: 1, FirmaAdi: "Mekmer" };
            if (this.buttonStatus) {
              this.$store.dispatch("setSelectionProductionCrateNoIn");
            }
            this.description = "Stok";
          } else {
            if (this.buttonStatus) {
              this.$store.dispatch("setSelectionProductionCrateNoIn");
            }
            this.disabledOrders = false;
          }
        } else {
          if (event.value.id == 1) {
            this.disabledOrders = true;
            if (this.buttonStatus) {
              this.$store.dispatch("setSelectionProductionCrateNoIn");
            }
            this.description = "Stok";
          } else {
            if (this.buttonStatus) {
              this.$store.dispatch("setSelectionProductionCrateNoIn");
            }
            this.disabledOrders = false;
          }
        }
      } else {
        if (event.value.id == 1) {
          this.disabledOrders = true;
          this.selectedSupplier = { ID: 1, FirmaAdi: "Mekmer" };
          if (this.buttonStatus) {
            this.$store.dispatch("setSelectionProductionCrateNoIn");
          }
          this.description = "Stok";
        } else {
          if (this.buttonStatus) {
            this.$store.dispatch("setSelectionProductionCrateNoIn");
          }
          this.disabledOrders = false;
        }
      }
    },
    productsSelected(event) {
      if (!this.buttonStatus) {
        if (this.model.UrunKartId != event.value.UrunKartId) {
          if (
            confirm("Ürün kartı değiştirilecek. Devam etmek istiyor musunuz?")
          ) {
            this.selectedSupplier = this.suppliers.find(
              (x) => x.ID == event.value.TedarikciID
            );
            this.selectedAmountStatus = this.amountStatus.find(
              (x) => x.id == event.value.UrunBirimID
            ).status;
            this.orderProductCardDesc = event.value.Aciklama;
            this.productCardId = event.value.UrunKartId;
            this.categoryName = event.value.KategoriAdi;
            this.productName = event.value.UrunAdi;
            this.surfaceName = event.value.YuzeyIslemAdi;
            this.sizeName =
              event.value.En + "x" + event.value.Boy + "x" + event.value.Kenar;
            this.width = event.value.En;
            this.height = event.value.Boy;
            if (
              event.value.TedarikciID == 1 ||
              event.value.TedarikciID == 123
            ) {
              if (this.buttonStatus) {
                this.$store.dispatch("setSelectionProductionCrateNoIn");
              }
              this.selectedMine = null;
              this.organizer = null;
              this.crateman = null;
            } else {
              if (this.buttonStatus) {
                this.$store.dispatch("setSelectionProductionCrateNoOut");
              }
              this.selectedMine = this.mines.find((x) => x.ID === 28);
              this.organizer = this.$cookie.get("username");
              this.crateman = this.$cookie.get("username");
            }
          } else {
            this.$emit("selection_production_dialog_form", false);
          }
        }
      } else {
        this.selectedSupplier = this.suppliers.find(
          (x) => x.ID == event.value.TedarikciID
        );
        this.selectedAmountStatus = this.amountStatus.find(
          (x) => x.id == event.value.UrunBirimID
        ).status;
        this.orderProductCardDesc = event.value.Aciklama;
        this.productCardId = event.value.UrunKartId;
        this.categoryName = event.value.KategoriAdi;
        this.productName = event.value.UrunAdi;
        this.surfaceName = event.value.YuzeyIslemAdi;
        this.sizeName =
          event.value.En + "x" + event.value.Boy + "x" + event.value.Kenar;
        this.width = event.value.En;
        this.height = event.value.Boy;
        if (event.value.TedarikciID == 1 || event.value.TedarikciID == 123) {
          if (this.buttonStatus) {
            this.$store.dispatch("setSelectionProductionCrateNoIn");
          }
          this.selectedMine = null;
          this.organizer = "Muhsin";
          this.crateman = "Muhsin";
        } else {
          if (this.buttonStatus) {
            this.$store.dispatch("setSelectionProductionCrateNoOut");
          }
          this.selectedMine = this.mines.find((x) => x.ID === 28);
          this.organizer = this.$cookie.get("username");
          this.crateman = this.$cookie.get("username");
        }
      }
    },
    poSelected(event) {
      this.$store.dispatch(
        "setSelectionProductionProductsList",
        event.value.SiparisNo
      );
      this.description = event.value.SiparisNo;
    },
    searchPo(event) {
      let results;
      if (event.query.length == 0) {
        results = this.orders;
      } else {
        results = this.orders.filter((x) => {
          return x.SiparisNo.toLowerCase().startsWith(
            event.query.toLowerCase()
          );
        });
      }
      this.filteredPo = results;
    },
    searchSupplier(event) {
      let results;
      if (event.query.length == 0) {
        results = this.suppliers;
      } else {
        results = this.suppliers.filter((x) => {
          return x.FirmaAdi.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
      this.filteredSuppliers = results;
    },
  },
  mounted() {
    this.$store.dispatch("setConnection");
  },
  beforeDestroy() {
    // Sayfadan ayrılınca soketi kapatmayı unutmayın
    this.$store.dispatch("setDisconnect");
  },
};
</script>
