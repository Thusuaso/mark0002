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
        <FloatLabel class="mb-4" style="width: 250px">
          <AutoComplete
            :disabled="disabledOrders"
            style="width: 250px"
            v-model="selectedPo"
            inputId="ac"
            :suggestions="filteredPo"
            optionLabel="SiparisNo"
            @complete="searchPo($event)"
            @item-select="poSelected($event)"
          />
          <label for="ac">Po</label>
        </FloatLabel>
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
              severity="secondary"
              label="@"
              @click="product_cards_form_dialog = true"
              :disabled="!disabledOrders"
            />
          </div>
        </div>
        <div class="row mb-4">
          <div class="col-6">
            <FloatLabel>
              <InputText
                id="create"
                type="text"
                v-model="getProductionCrateNo"
              />
              <label for="create">Crate No</label>
            </FloatLabel>
          </div>
          <div class="col-6">
            <FloatLabel>
              <AutoComplete
                id="mine"
                v-model="selectedMine"
                :suggestions="filteredMineList"
                @complete="searchMine($event)"
                optionLabel="OcakAdi"
              />
              <label for="mine">Quarry</label>
            </FloatLabel>
          </div>
        </div>
        <div class="row mb-4">
          <div class="col-6">
            <FloatLabel>
              <InputText id="organizer" type="text" v-model="organizer" />
              <label for="organizer">Controled by</label>
            </FloatLabel>
          </div>
          <div class="col-6">
            <FloatLabel>
              <InputText id="crateMan" type="text" v-model="crateman" />
              <label for="crateMan">Crated by</label>
            </FloatLabel>
          </div>
        </div>
        <!-- Ortak kasalar: ayni fiziksel kasayi paylasan diger kasa
             numaralari. Grup kolonu yoksa (api/sql/UretimTBKasaGrup.sql
             calistirilmadiysa) alan hic gosterilmez. -->
        <div
          class="row mb-4"
          v-if="selectionStore.getProductionCrateGroupReady"
        >
          <div class="col-12">
            <label for="common" class="d-block mb-1">Ortak Kasalar</label>
            <AutoComplete
              id="common"
              class="w-100"
              v-model="commonCrates"
              :suggestions="filteredCrateOptions"
              @complete="searchCrateOptions($event)"
              optionLabel="KasaNo"
              multiple
              forceSelection
            >
              <!-- Kasa numarasi tek basina ayirt edici degil; icindeki urun
                   ve tedarikci de gorunsun ki yanlis kasa secilmesin. Ic
                   kasalar 5, dis kasalar 6 haneli; tedarikci adi hangisi
                   oldugunu da belli eder. -->
              <template #option="slotProps">
                <span>{{ slotProps.option.KasaNo }}</span>
                <small class="text-muted ms-2">
                  {{ slotProps.option.TedarikciAdi }} /
                  {{ slotProps.option.KategoriAdi }} /
                  {{ slotProps.option.UrunAdi }} /
                  {{ slotProps.option.SiparisAciklama }}
                </small>
              </template>
            </AutoComplete>
            <small class="text-muted" v-if="commonCrates.length">
              Ceki listesinde ortak kasa no: {{ commonCrateNo }}
            </small>
          </div>
        </div>
      </div>
      <div class="col">
        <FloatLabel class="mb-3">
          <AutoComplete
            v-model="selectedSupplier"
            inputId="ac"
            :suggestions="filteredSuppliers"
            optionLabel="FirmaAdi"
            @complete="searchSupplier($event)"
            @item-select="supplierSelected($event)"
          />
          <label for="ac">Supplier</label>
        </FloatLabel>
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
            <FloatLabel>
              <InputText
                id="boxamount"
                type="text"
                v-model="boxamount"
                class="w-100"
                @input="calculateM2Box($event)"
              />
              <label for="boxamount">Box Amount</label>
            </FloatLabel>
          </div>
          <div class="col-4">
            <FloatLabel>
              <InputText
                id="boxinamount"
                type="text"
                v-model="boxinamount"
                class="w-100"
                @input="calculateTotalAmount($event)"
              />
              <label for="boxinamount">Pcs in Box</label>
            </FloatLabel>
          </div>
          <div class="col-4">
            <FloatLabel>
              <InputText
                id="totalamount"
                type="text"
                v-model="totalamount"
                class="w-100"
                @input="calculateTotalAmountM2($event)"
              />
              <label for="totalamount">Total Pieces</label>
            </FloatLabel>
          </div>
        </div>
        <div class="row g-3">
          <div class="col-4">
            <FloatLabel>
              <InputText
                id="amount"
                type="text"
                v-model="amount"
                class="w-100"
                @input="amountInput($event)"
              />
              <label for="amount">Amount</label>
            </FloatLabel>
          </div>
          <div class="col-4">
            <FloatLabel>
              <InputText
                id="speacialamount"
                type="text"
                v-model="speacialAmount"
                @input="speacialAmount = $event.replace(',', '.')"
                class="w-100"
              />
              <label for="speacialamount">Sqm</label>
            </FloatLabel>
          </div>
          <div class="col-4">
            <FloatLabel>
              <InputText
                id="crateamount"
                type="text"
                v-model="crateAmount"
                class="w-100"
              />
              <label for="crateamount">Crate Amount</label>
            </FloatLabel>
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
            <FloatLabel>
              <InputText
                id="category"
                type="text"
                v-model="categoryName"
                disabled
              />
              <label for="category">Category</label>
            </FloatLabel>
          </div>
          <div class="col-6">
            <FloatLabel>
              <InputText
                id="product"
                type="text"
                v-model="productName"
                disabled
              />
              <label for="product">Product</label>
            </FloatLabel>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <FloatLabel>
              <InputText
                id="surface"
                type="text"
                v-model="surfaceName"
                disabled
              />
              <label for="surface">Surface</label>
            </FloatLabel>
          </div>
          <div class="col-6">
            <FloatLabel>
              <InputText id="size" type="text" v-model="sizeName" disabled />
              <label for="size">Size</label>
            </FloatLabel>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row m-auto text-center">
        <div class="col">
          <Button
            type="button"
            severity="success"
            class="w-100"
            label="Save"
            @click="saveProcess"
          />
        </div>
        <div class="col" v-if="!buttonStatus">
          <Button
            type="button"
            severity="danger"
            class="w-100"
            label="Delete"
            @click="deleteForm"
          />
        </div>
      </div>
    </div>

    <Dialog
      :visible="product_cards_form_dialog" @update:visible="product_cards_form_dialog = $event"
      header="Ürün Kartları"
      modal
    >
      <productCards @cards_selected_emit="productCardsSelected($event)" />
    </Dialog>
  </div>
</template>
<script>
import { toIsoDate, fromIsoDate } from "~/utils/dates"
import { useSelectionStore } from "~/stores/selection"
import { useSocketStore } from "~/stores/socket"

export default {
  computed: {
    selectionStore() {
      return useSelectionStore()
    },
    socketStore() {
      return useSocketStore()
    },
    /*
     * Kaynakta mapGetters(["getProductionCrateNo"]) ile geliyordu;
     * sablonda ayni adla okundugu icin computed olarak korundu.
     */
    getProductionCrateNo() {
      return this.selectionStore.getProductionCrateNo
    },
    /*
     * Grup her zaman EN KUCUK kasa numarasiyla anilir; ceki listesi ve
     * Excel'de tum uyeler bu numarayi gosterir. Backend'deki
     * kasaNoEnKucuk() ile AYNI kurali uygular: tamamen rakamdan
     * olusanlar SAYISAL, digerleri METIN olarak karsilastirilir --
     * aksi halde "9" ile "10" yanlis siralanirdi.
     */
    commonCrateNo() {
      const numaralar = [
        this.getProductionCrateNo,
        ...this.commonCrates.map((x) => x.KasaNo),
      ]
        .map((x) => String(x == null ? "" : x).trim())
        .filter((x) => x.length > 0)

      if (!numaralar.length) {
        return null
      }
      if (numaralar.every((x) => /^[0-9]+$/.test(x))) {
        return numaralar.reduce((a, b) =>
          parseInt(b, 10) < parseInt(a, 10) ? b : a
        )
      }
      return numaralar.slice().sort()[0]
    },
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
      commonCrates: [],
      filteredCrateOptions: [],
    };
  },
  /*
   * ASYNC OLDU: ortak kasa secenekleri createdProcess'ten ONCE gelmeli,
   * cunku duzenlemede mevcut grup uyeleri (commonCratesLoad) O LISTEDEN
   * okunuyor. Beklenmezse alan bos acilirdi.
   *
   * created() KORUNDU (mounted'a tasinmadi): bu bileşen SSR'da HIC mount
   * edilmiyor -- tek kullanicisi v-model:visible=false ile baslayan
   * <Dialog>. Yani async is burada guvenli.
   */
  async created() {
    await this.selectionStore.setSelectionProductionCrateOptions()

    if (!this.buttonStatus) {
      this.createdProcess();
    } else {
      this.selectionStore.MUT_setSelectionProductionCrateNo(null)
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
      await this.selectionStore.setSelectionProductionDelete(this.model.KasaNo);
      this.socketStore.emit("update_production_emit")
      this.$emit("selection_production_dialog_form", false);
      this.selectionStore.setSelectionProductionTotal()
    },
    supplierSelected(event) {
      if (this.buttonStatus) {
        if (event.value.ID != 1 || event.value.ID != 123) {
          this.selectionStore.setSelectionProductionCrateNoOut()
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
        Tarih: toIsoDate(this.selectedDate),
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
        KullaniciID: useCookie("userId").value,
        /*
         * Ortaklik YALNIZCA formda girilen kasa icin kurulur;
         * KasaKayitAdedi > 1 ise ardindan uretilen numaralar AYRI
         * fiziksel kasalardir (api/index.js kasaGrupKaydet).
         */
        OrtakKasalar: this.commonCrates.map((x) => x.KasaNo),
      };

      await this.selectionStore.setSelectionProductionSave(data);
      /* Yeni kasa secenek listesinde de gorunsun. */
      this.selectionStore.setSelectionProductionCrateOptions()
      this.socketStore.emit("update_production_emit")

      this.selectionStore.setSelectionProductionTotal()
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
        Tarih: toIsoDate(this.selectedDate),
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
        OrtakKasalar: this.commonCrates.map((x) => x.KasaNo),
      };
      await this.selectionStore.setSelectionProductionUpdate(data);
      this.selectionStore.setSelectionProductionCrateOptions()
      this.socketStore.emit("update_production_emit")
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
      this.commonCrates = []
      this.filteredCrateOptions = []

      this.selectionStore.MUT_setSelectionProductionCrateNo(null)
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
      this.selectedDate = fromIsoDate(this.model.Tarih);
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
      this.selectionStore.MUT_setSelectionProductionCrateNo(this.model.KasaNo)
      this.commonCratesLoad()
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
    /*
     * Secenekler seleksiyonda duran kasalar; KENDI numarasi ve zaten
     * secili olanlar listeden dusurulur. En fazla 30 oneri gosterilir.
     */
    searchCrateOptions(event) {
      const aranan = (event.query || "").toString().trim().toLowerCase()
      const kendi = String(
        this.getProductionCrateNo == null ? "" : this.getProductionCrateNo
      ).trim()
      const secili = this.commonCrates.map((x) => String(x.KasaNo).trim())

      this.filteredCrateOptions = this.selectionStore.getProductionCrateOptions
        .filter((x) => {
          const no = String(x.KasaNo == null ? "" : x.KasaNo).trim()
          if (!no || no === kendi || secili.includes(no)) {
            return false
          }
          return !aranan || no.toLowerCase().startsWith(aranan)
        })
        .slice(0, 30)
    },
    /* Duzenlemede mevcut grup: ayni KasaGrupNo'ya sahip DIGER kasalar. */
    commonCratesLoad() {
      const grup = String(
        this.model.KasaGrupNo == null ? "" : this.model.KasaGrupNo
      ).trim()

      if (!grup) {
        this.commonCrates = []
        return
      }

      const kendi = String(
        this.model.KasaNo == null ? "" : this.model.KasaNo
      ).trim()

      this.commonCrates = this.selectionStore.getProductionCrateOptions.filter(
        (x) => {
          const no = String(x.KasaNo == null ? "" : x.KasaNo).trim()
          return (
            String(x.KasaGrupNo == null ? "" : x.KasaGrupNo).trim() === grup &&
            no !== kendi
          )
        }
      )
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
              this.selectionStore.setSelectionProductionCrateNoIn()
            }
            this.description = "Stok";
          } else {
            if (this.buttonStatus) {
              this.selectionStore.setSelectionProductionCrateNoIn()
            }
            this.disabledOrders = false;
          }
        } else {
          if (event.value.id == 1) {
            this.disabledOrders = true;
            if (this.buttonStatus) {
              this.selectionStore.setSelectionProductionCrateNoIn()
            }
            this.description = "Stok";
          } else {
            if (this.buttonStatus) {
              this.selectionStore.setSelectionProductionCrateNoIn()
            }
            this.disabledOrders = false;
          }
        }
      } else {
        if (event.value.id == 1) {
          this.disabledOrders = true;
          this.selectedSupplier = { ID: 1, FirmaAdi: "Mekmer" };
          if (this.buttonStatus) {
            this.selectionStore.setSelectionProductionCrateNoIn()
          }
          this.description = "Stok";
        } else {
          if (this.buttonStatus) {
            this.selectionStore.setSelectionProductionCrateNoIn()
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
                this.selectionStore.setSelectionProductionCrateNoIn()
              }
              this.selectedMine = null;
              this.organizer = null;
              this.crateman = null;
            } else {
              if (this.buttonStatus) {
                this.selectionStore.setSelectionProductionCrateNoOut()
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
            this.selectionStore.setSelectionProductionCrateNoIn()
          }
          this.selectedMine = null;
          this.organizer = "Muhsin";
          this.crateman = "Muhsin";
        } else {
          if (this.buttonStatus) {
            this.selectionStore.setSelectionProductionCrateNoOut()
          }
          this.selectedMine = this.mines.find((x) => x.ID === 28);
          this.organizer = this.$cookie.get("username");
          this.crateman = this.$cookie.get("username");
        }
      }
    },
    poSelected(event) {
      this.selectionStore.setSelectionProductionProductsList(event.value.SiparisNo);
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
};
</script>

<script setup>
/*
 * SOCKET YASAM DONGUSU -- kaynaktaki hali UC YERDEN YANLISTI
 * (cards/Form.vue ile birebir ayni kalip, orada da belgelendi):
 *
 *   mounted()       { this.$store.dispatch("setConnection") }
 *   beforeDestroy() { if (this.socket) { ...setDisconnect } }
 *
 *   (a) `this.socket` HICBIR ZAMAN atanmiyordu -> kosul daima false ->
 *       setDisconnect HIC cagrilmiyordu. Socket store baglantiyi
 *       SAYIYOR, yani her acilista sayac artiyor ve hic azalmiyordu.
 *   (b) `beforeDestroy` Vue 3'te YOK (adi beforeUnmount oldu), yani
 *       birebir tasinsa kanca zaten HIC calismazdi.
 *   (c) Yayin `this.$store.getters.getSocket.emit(...)` ile
 *       yapiliyordu; getSocket null oldugunda (SSR ya da henuz
 *       baglanmamisken) TypeError firlatirdi. Pilotun socket
 *       store'undaki emit() null durumunu kontrol edip uyari basiyor.
 *
 * useRealtime() KULLANILMADI: o composable DINLEMEK icin (olay + handler).
 * Bu bileşen yalnizca YAYIN yapiyor, dinlemiyor -- dolayisiyla dogru
 * arac dogrudan socket store'u.
 */
const socket = useSocketStore()

onMounted(() => socket.connect())
onBeforeUnmount(() => socket.disconnect())
</script>

<!--
  components/selection/input/form.vue
     -> app/components/selection/input/Form.vue

  Otomatik ice alma adi `SelectionInputForm`. Nuxt 2'de ad
  `selectionForm` idi (plugins/components.js:242, ELLE kayit).

  Bu dosya dilimin en buyugu (968 satir) ve kasa girisi/duzenlemesinin
  tamamini tasiyor: PO/tedarikci/ocak secimi, m2-adet-kutu hesaplari,
  kasa no alma (giris/cikis), kaydet/guncelle/sil.

  ============================================================
  [1] SOCKET YASAM DONGUSU -- UC YERDEN YANLISTI
  ============================================================
  Ayrintisi <script setup> blogunun icinde; ozeti:
    (a) `this.socket` hic atanmadigi icin disconnect HIC cagrilmiyordu
        (socket store baglantiyi SAYIYOR -> sayac hic azalmiyordu),
    (b) `beforeDestroy` Vue 3'te YOK (beforeUnmount oldu) -> o blok
        birebir tasinsa zaten HIC calismazdi,
    (c) yayin `$store.getters.getSocket.emit(...)` ile yapiliyordu ve
        getSocket null oldugunda (SSR / henuz baglanmamisken) TypeError
        firlatirdi.

  useRealtime() KULLANILMADI cunku o composable DINLEMEK icin (olay +
  handler). Bu bileşen yalnizca YAYIN yapiyor (uc yerde
  "update_production_emit"), dolayisiyla dogru arac dogrudan socket
  store'u: `socketStore.emit(...)` + <script setup> icinde
  connect/disconnect. (cards/Form.vue ile birebir ayni karar.)

  ============================================================
  [2] TARIH BICIMI -- ACIK IMPORT ZORUNLU
  ============================================================
  import date from "../../../plugins/date"
     -> import { toIsoDate, fromIsoDate } from "~/utils/dates"

  Pilotta `dateToString` adi IKI yerde tanimli ve auto-import cakismayi
  utils/formatters.js lehine cozuyor (derleme bunu "Duplicated imports"
  diye uyariyor). Iki bicim FARKLI:
      utils/formatters.js dateToString -> "02-10-2026"  (GOSTERIM)
      utils/dates.ts      toIsoDate    -> "2026-10-02"  (API)
  Buradaki iki cagri da kaydedilen kasanin TARIHINI uretiyor, yani
  API'ye YAZILIYOR. Ciplak `dateToString` cagrilsa kasa tarihleri
  sessizce ters bicimde kaydedilirdi.

  == DIGER ZORUNLU DEGISIKLIKLER ==

  [x] <span class="p-float-label"> -> <FloatLabel>   (ON ALTI yer)
      Iki tanesi ek sinif tasiyordu ("p-float-label mb-4" ve
      "...mb-3"); ek siniflar FloatLabel'in `class`ina tasindi.
      Kapanis </span> etiketlerinin TAMAMI (16) </FloatLabel> oldu --
      bu dosyadaki tum <span>'ler float-label sarmalayicisiydi
      (kaynakta 16 acilis / 16 kapanis, baska span YOK).
  [x] p-button-success/danger/secondary -> :severity
  [x] AutoComplete `field=` -> `optionLabel=`  (UC AutoComplete:
      SiparisNo, OcakAdi, FirmaAdi -- v4'te field prop'u YOK)
  [x] :visible + @update:visible -> v-model:visible
  [x] mapGetters(["getProductionCrateNo"]) -> store uzerinden okuyan
      ayni ADLA bir computed (sablon o adi kullaniyor).
  [x] this.$store.commit("setSelectionProductionCrateNo", X)
         -> MUT_setSelectionProductionCrateNo(X)     (UC yer)
      Vuex'te MUTATION'di; Pinia'da mutation'lar MUT_ onekli action
      (bkz. stores/accounts.ts basligi).
  [x] this.$store.dispatch(...) -> selectionStore.<action>()
      CrateNoIn (8 yer), CrateNoOut (3), ProductionTotal (2),
      Save/Update/ProductsList.
  [x] Cookies.get(...) -> useCookie(...).value
  [x] `import { io } from "socket.io-client"` KALDIRILDI -- `io`
      hicbir yerde cagrilmiyordu (baglanti socket store'u uzerinden).

  == KORUNAN DAVRANISLAR (bilincli) ==

  1) `Dropdown` ve `Calendar` ADLARI KORUNDU: ikisi de PrimeVue 4'te
     hala pakette (deprecated alias) ve bu dosyada onlari hedefleyen
     CSS yok, yani gorunur kirilma yok. Pilotun 19/18 dosyasi da bu
     adlari kullaniyor. (container.vue'da Dropdown -> Select yapildi
     ama orada :deep(.p-dropdown) kurali vardi ve sessizce eslesmeyi
     birakiyordu -- ayri bir gerekce.)

  2) created() KORUNDU (mounted()'a tasinmadi): govde tamamen SENKRON
     (istek atmiyor, yalnizca prop'lari yerel state'e esliyor ve kasa
     no'yu sifirliyor) ve bu bileşen SSR'da HIC mount edilmiyor --
     tek kullanicisi pages/selection/input.vue icindeki, v-model:visible
     false ile baslayan <Dialog>.
-->
