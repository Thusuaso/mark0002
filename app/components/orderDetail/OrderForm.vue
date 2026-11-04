<template>
  <div>
    <div class="row mt-3">
      <div class="col-4">
        <div class="row mb-4">
          <div class="col-9">
            <FloatLabel>
              <InputText
                class="w-100"
                id="productId"
                v-model="model.UrunKartID"
                disabled
              />
              <label for="productId">Product Card Id</label>
            </FloatLabel>
          </div>
          <div class="col">
            <Button
              type="button"
              severity="secondary"
              label="@"
              @click="card_selected_list"
              :disabled="product_form_disabled"
            />
          </div>
        </div>
        <FloatLabel class="mb-4">
          <InputText
            class="w-100"
            id="category"
            v-model="categoryName"
            disabled
          />
          <label for="category">Category</label>
        </FloatLabel>
        <FloatLabel class="mb-4">
          <InputText
            class="w-100"
            id="product"
            v-model="productName"
            disabled
          />
          <label for="product">Product</label>
        </FloatLabel>
        <FloatLabel class="mb-4">
          <InputText
            class="w-100"
            id="surface"
            v-model="surfaceName"
            disabled
          />
          <label for="surface">Surface</label>
        </FloatLabel>
        <FloatLabel class="mb-4">
          <InputText class="w-100" id="size" v-model="sizeName" disabled />
          <label for="size">Size</label>
        </FloatLabel>
        <FloatLabel class="mb-4 w-100">
          <AutoComplete
            v-model="selectedSupplier"
            inputId="supplier"
            :suggestions="filteredSupplier"
            @complete="searchSupplier($event)"
            @item-select="supplierSelected($event)"
            optionLabel="FirmaAdi"
            class="w-100"
            :disabled="product_form_disabled"
          />
          <label for="supplier">Supplier</label>
        </FloatLabel>
        <div class="row mb-4">
          <div class="col">
            <CustomInput
              :value="model.AlisFiyati"
              text="Purchase Price"
              @onInput="model.AlisFiyati = $event"
              :disabled="product_form_disabled"
            />
          </div>
          <div class="col">
            <CustomInput
              :value="model.SatisFiyati"
              text="Sale Price"
              @onInput="model.SatisFiyati = $event"
              :disabled="product_form_disabled"
            />
          </div>
        </div>
        <div class="row mb-4">
          <div class="col">
            <FloatLabel class="w-100">
              <AutoComplete
                v-model="selectedUnit"
                inputId="unit"
                :suggestions="filteredUnit"
                @complete="searchUnit($event)"
                @item-select="unitSelected($event)"
                optionLabel="BirimAdi"
                class="w-100"
                :disabled="product_form_disabled"
              />
              <label for="unit">Unit</label>
            </FloatLabel>
          </div>
          <div class="col">
            <CustomInput
              :value="model.Miktar"
              text="Amount"
              @onInput="model.Miktar = $event"
              :disabled="product_form_disabled || amount_disabled"
              @change="tonajChange($event)"
              style="border: 1px solid red"
            />
          </div>
          <div class="col">
            <CustomInput
              :value="model.Adet"
              text="Piece"
              @onInput="model.Adet = $event"
              :disabled="product_form_disabled || amount_disabled"
            />
          </div>
        </div>
        <div class="row mb-4">
          <div class="col">
            <FloatLabel>
              <InputText
                class="w-100"
                id="queue"
                v-model="model.SiraNo"
                :disabled="product_form_disabled"
              />
              <label for="queue">#</label>
            </FloatLabel>
          </div>
          <div class="col">
            <CustomInput
              :value="model.OzelMiktar"
              text="M2"
              @onInput="model.OzelMiktar = $event"
              :disabled="product_form_disabled || amount_disabled"
              @change="tonajChange2($event)"
            />
          </div>
          <div class="col">
            <CustomInput
              :value="model.Ton"
              text="Ton"
              @onInput="model.Ton = $event"
              :disabled="product_form_disabled"
            />
          </div>
          <div class="col">
            <FloatLabel>
              <InputText
                class="w-100"
                id="crate_size"
                v-model="model.KasaOlcusu"
                :disabled="product_form_disabled"
              />
              <label for="crate_size">C.Size</label>
            </FloatLabel>
          </div>
        </div>
        <div class="row mb-4">
          <div class="col">
            <Button
              type="button"
              severity="info" class="w-100"
              label="Labour Cost"
              @click="$emit('workerman_selected_emit', model.UrunKartID)"
              :disabled="workerman_button_disabled"
            />
          </div>
        </div>
      </div>
      <div class="col-8">
        <FloatLabel class="mb-4">
          <Textarea
            v-model="model.MusteriAciklama"
            rows="10"
            class="w-100"
            :disabled="product_form_disabled"
          />
          <label>Explanation(EN)</label>
        </FloatLabel>
        <FloatLabel>
          <Textarea
            v-model="model.UretimAciklama"
            rows="10"
            class="w-100"
            :disabled="product_form_disabled"
          />
          <label>Explanation(TR)</label>
        </FloatLabel>
        <div class="row mt-4" v-if="po">
          <div class="col">
            <Button
              type="button"
              class="p-button-primary w-100"
              label="New Product"
              :disabled="new_button_disabled"
              @click="newForm"
            />
          </div>
          <div class="col">
            <Button
              type="button"
              severity="secondary" class="w-100"
              label="Cancel"
              :disabled="cancel_button_disabled"
              @click="cancelForm"
            />
          </div>
          <div class="col">
            <Button
              type="button"
              severity="success" class="w-100"
              label="Add"
              :disabled="add_button_disabled"
              @click="add"
            />
          </div>
          <div class="col">
            <Button
              type="button"
              severity="warn" class="w-100"
              label="Update"
              :disabled="update_button_disabled"
              @click="update"
            />
          </div>
          <div class="col">
            <Button
              type="button"
              severity="danger" class="w-100"
              label="Delete"
              :disabled="delete_button_disabled"
              @click="deleteItem"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="row m-auto text-center">
      <div
        class="col-1"
        style="background-color: #4287f5; width: 25px; height: 25px"
      ></div>
      <div class="col-1">İşçilik Var</div>
      <div
        class="col-1"
        style="background-color: #81fca0; width: 25px; height: 25px"
      ></div>
      <div class="col-1">Alış Fiyatı Eksik</div>
    </div>

    <DataTable
      :value="products"
      v-model:selection="selectedOrderProducts"
      selectionMode="single"
      @row-click="orderProductsSelected($event)"
      :sortField="'SiraNo'"
      :sortOrder="1"
    >
      <Column field="SiraNo" header="#">
        <template #body="slotProps">
          <div
            :style="{
              backgroundColor: slotProps.data.Iscilik > 0 ? '#4287f5' : '',
            }"
          >
            {{ slotProps.data.SiraNo }}
          </div>
        </template>
      </Column>
      <Column field="FirmaAdi" header="Supplier">
        <template #body="slotProps">
          <div
            :style="{
              backgroundColor: rowClass(slotProps.data.AlisFiyati)
                ? '#81fca0'
                : '#fff',
            }"
          >
            {{ slotProps.data.FirmaAdi }}
          </div>
        </template>
      </Column>
      <Column field="UrunAdi" header="Product"></Column>
      <Column field="YuzeyIslemAdi" header="Surface"></Column>
      <Column field="En" header="Width"></Column>
      <Column field="Boy" header="Height"></Column>
      <Column field="Kenar" header="Thickness"></Column>
      <Column header="M2">
        <template #body="slotProps">
          <div
            v-if="slotProps.data.UrunBirimID == 1"
            :style="{
              backgroundColor: slotProps.data.UrunBirimID == 1 ? 'red' : '',
            }"
          >
            {{ formatDecimal(slotProps.data.Miktar) }}
          </div>

          <div
            v-else
            :style="{
              backgroundColor: slotProps.data.UrunBirimID == 1 ? 'red' : '',
            }"
          >
            {{ formatDecimal(slotProps.data.OzelMiktar) }}
          </div>
        </template>
        <template #footer>
          {{ formatDecimal(detailProductTotal.m2) }}
        </template>
      </Column>
      <Column header="Piece">
        <template #body="slotProps">
          <div
            v-if="slotProps.data.UrunBirimID == 2"
            :style="{
              backgroundColor: slotProps.data.UrunBirimID == 2 ? 'red' : '',
            }"
          >
            {{ formatDecimal(slotProps.data.Miktar) }}
          </div>
          <div
            v-else
            :style="{
              backgroundColor: slotProps.data.UrunBirimID == 2 ? 'red' : '',
            }"
          >
            {{ formatDecimal(slotProps.data.Adet) }}
          </div>
        </template>
        <template #footer>
          {{ formatDecimal(detailProductTotal.piece) }}
        </template>
      </Column>
      <Column header="MT">
        <template #body="slotProps">
          <div
            v-if="slotProps.data.UrunBirimID == 3"
            :style="{
              backgroundColor: slotProps.data.UrunBirimID == 3 ? 'red' : '',
            }"
          >
            {{ formatDecimal(slotProps.data.Miktar) }}
          </div>
          <div
            v-else
            :style="{
              backgroundColor: slotProps.data.UrunBirimID == 3 ? 'red' : '',
            }"
          >
            {{ formatDecimal(0) }}
          </div>
        </template>
        <template #footer>
          {{ formatDecimal(detailProductTotal.mt) }}
        </template>
      </Column>
      <Column field="Ton" header="Ton">
        <template #body="slotProps">
          {{ formatDecimal(slotProps.data.Ton) }}
        </template>
        <template #footer>
          {{ formatDecimal(detailProductTotal.ton) }}
        </template>
      </Column>
      <Column field="OzelMiktar" header="Ö.M">
        <template #body="slotProps">
          {{ formatDecimal(slotProps.data.OzelMiktar) }}
        </template>
      </Column>
      <Column field="SatisFiyati" header="Price">
        <template #body="slotProps">
          {{ formatPriceUsd(slotProps.data.SatisFiyati) }}
        </template>
      </Column>
      <Column header="Total">
        <template #body="slotProps">
          {{ formatPriceUsd((slotProps.data.Miktar * slotProps.data.SatisFiyati)) }}
        </template>
        <template #footer>
          {{ formatPriceUsd(detailProductTotal.total) }}
        </template>
      </Column>
    </DataTable>

    <Dialog
      v-model:visible="product_cards_form_dialog"
      header="Product Data"
      modal
    >
      <ProductCards @cards_selected_emit="productCardsSelected($event)" />
    </Dialog>
  </div>
</template>
<script>
import { useOrderStore } from "~/stores/order"
import { useModelsStore } from "~/stores/models"
import { useSharedStore } from "~/stores/shared"
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
  props: {
    /*
     * ESKI ADI `model`. Neden degisti:
     *
     * Bu bilesen tabloda bir urun secildiginde
     *     this.model = event.data
     * yaziyordu -- yani PROP'UN KENDISINE atama. Vue 2 bunu uyariyla
     * geciyor ve calisiyordu; Vue 3'te props shallowReadonly oldugu icin
     * atama BASARISIZ olur ve urun secimi formu DOLDURMAZ.
     *
     * Iki cozum vardi:
     *   (a) icerideki 105 `model` referansini `form` diye yeniden
     *       adlandirmak (18 sablon + 70 this.model. + 13 ciplak + ...),
     *   (b) PROP'U yeniden adlandirip yerel bir `model` tutmak.
     *
     * (b) secildi: 4 duzenleme yetiyor ve icerideki 105 referansin
     * HICBIRINE dokunulmuyor. Sablondaki 13 ciplak `model` kullanimi
     * (a)'da en kolay hata yapilacak yerdi.
     *
     * Tek bedeli: kullanan sablon artik :sourceModel= yaziyor.
     * Kullananlar: orderDetail/Form.vue (ayni gecisde guncellendi) ve
     * components/orders/forms/detail2.vue (HENUZ TASINMADI -- tasinirken
     * :model= -> :sourceModel= yapilmali; yapilmazsa `required: true`
     * oldugu icin Vue yuksek sesle uyarir, sessiz kalmaz).
     */
    sourceModel: {
      type: Object,
      required: true,
    },
    products: {
      type: Array,
      required: false,
    },
    supplier: {
      type: Array,
      required: true,
    },
    unit: {
      type: Array,
      required: true,
    },
    po: {
      type: String,
      required: false,
    },
    detailProductTotal: {
      type: Object,
      required: false,
    },
    status: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      /*
       * Prop'un YEREL kopyasi. Boylece `this.model = event.data` gecerli
       * bir atama oluyor ve icerideki tum `model.X` / `this.model.X`
       * kullanimlari degismeden calisiyor.
       * sourceModel degistiginde (ebeveyn modeli sifirladiginda) asagidaki
       * watch yeniden tohumluyor -- kaydetme sonrasi temizlenme akisi
       * korunuyor.
       */
      model: { ...(this.sourceModel ?? {}) },

      amount_disabled: false,
      width: 0,
      height: 0,
      thickness: 0,
      product_cards_form_dialog: false,
      categoryName: null,
      productName: null,
      surfaceName: null,
      sizeName: null,
      selectedSupplier: null,
      filteredSupplier: null,
      selectedUnit: null,
      filteredUnit: null,
      selectedOrderProducts: null,
      new_button_disabled: false,
      cancel_button_disabled: true,
      add_button_disabled: true,
      update_button_disabled: true,
      delete_button_disabled: true,
      product_form_disabled: true,
      workerman_button_disabled: true,
    };
  },
  watch: {
    sourceModel(next) {
      this.model = { ...(next ?? {}) }
    },
  },

  methods: {
    tonajChange2(event) {
      if (event == 0) {
        this.model.Ton = 0;
        return;
      }
      let coefficient = this.productCoefficient(
        this.categoryName.split(" ")[0]
      );

      if (
        this.thickness == "VAR" ||
        this.thickness == "Various" ||
        this.thickness == "SLAB" ||
        this.thickness == "Slab"
      ) {
        this.model.Ton = 0;
      } else {
        if (this.selectedUnit.ID == 1) {
          this.model.Ton =
            (coefficient *
              10 *
              this.__typeFloatControl(event) *
              parseFloat(this.thickness.replace(",", "."))) /
            1000;
        } else {
          this.model.Ton =
            (coefficient *
              10 *
              this.__typeFloatControl(event) *
              parseFloat(this.thickness.replace(",", "."))) /
            1000;
        }
      }
    },
    rowClass(event) {
      if (event == 0 || event == null || event == undefined) {
        return true;
      } else {
        return false;
      }
    },
    tonajChange(event) {
      if (event == 0) {
        this.model.Ton = 0;
        this.model.OzelMiktar = 0;
        this.model.Adet = 0;
        return;
      }
      if (
        this.height == "Free" ||
        this.height == "FREE" ||
        this.height == "VAR" ||
        this.height == "Var" ||
        this.heiht == "Various" ||
        this.height == "SLAB" ||
        this.height == "Slab" ||
        this.height == "PAT" ||
        this.height == "Pat" ||
        this.height == "SET" ||
        this.height == "SINK" ||
        this.width == "Ant" ||
        this.width == "ANT" ||
        this.width == "FRENCH" ||
        this.width == "MINI" ||
        this.thickness == "Other" ||
        this.width == "özel" ||
        this.width == "1 LT"
      ) {
        if (this.selectedUnit.ID == 1) {
          this.model.OzelMiktar = this.model.Miktar;
        } else if (this.selectedUnit.ID == 2) {
          this.model.Adet = this.model.Miktar;
        } else {
          this.model.OzelMiktar = 0;
        }
      } else {
        if (this.selectedUnit.ID == 1) {
          this.model.OzelMiktar = this.model.Miktar;
          this.model.Adet = Math.round(
            this.__typeFloatControl(event) /
              (this.__typeFloatControl(this.width) / 100) /
              (this.__typeFloatControl(this.height) / 100)
          );
        } else if (this.selectedUnit.ID == 2) {
          this.model.OzelMiktar =
            (this.__typeFloatControl(this.width) *
              this.__typeFloatControl(this.height) *
              this.__typeFloatControl(event)) /
            10000;
          this.model.Adet = this.model.Miktar;
        } else if (this.selectedUnit.ID == 3) {
          if (
            this.height == "Free" ||
            this.height == "FREE" ||
            this.height == "VAR" ||
            this.height == "Var" ||
            this.heiht == "Various" ||
            this.height == "SLAB" ||
            this.height == "Slab" ||
            this.height == "PAT" ||
            this.height == "Pat" ||
            this.height == "SET" ||
            this.height == "SINK" ||
            this.width == "Ant" ||
            this.width == "ANT" ||
            this.width == "FRENCH" ||
            this.width == "MINI" ||
            this.thickness == "Other" ||
            this.width == "özel" ||
            this.width == "1 LT"
          ) {
            this.model.OzelMiktar = 0;
            this.model.Adet = 0;
            this.model.Ton = 0;
          } else {
            this.model.OzelMiktar =
              (this.__typeFloatControl(event) *
                this.__typeFloatControl(this.width)) /
              100;
            this.model.Adet = Math.round(
              this.__typeFloatControl(this.model.OzelMiktar) /
                (this.__typeFloatControl(this.width) / 100) /
                (this.__typeFloatControl(this.height) / 100)
            );
          }
        }
      }
      let coefficient = this.productCoefficient(
        this.categoryName.split(" ")[0]
      );

      if (
        this.thickness == "VAR" ||
        this.thickness == "Various" ||
        this.thickness == "SLAB" ||
        this.thickness == "Slab"
      ) {
        this.model.Ton = 0;
      } else {
        if (this.selectedUnit.ID == 1) {
          this.model.Ton =
            (coefficient *
              10 *
              this.__typeFloatControl(event) *
              parseFloat(this.thickness.replace(",", "."))) /
            1000;
        } else {
          this.model.Ton =
            (coefficient *
              10 *
              this.__typeFloatControl(this.model.OzelMiktar) *
              parseFloat(this.thickness.replace(",", "."))) /
            1000;
        }
      }

      // if (this.width == 'VAR' || this.width == 'Various' || this.width == 'SLAB'){
      //   if (this.thickness == 'VAR' || this.thickness == 'Various' || this.thickness == 'SLAB' || this.thickness == 'Slab'){
      //     this.model.Ton = 0;

      //   } else{
      //     if (this.selectedUnit.ID == 1) {
      //       this.model.Ton == ((coefficient * 10 * this.__typeFloatControl(event)) / 1000).toFixed(3);
      //     } else {
      //       this.model.Ton = 0;
      //     }

      //   }

      //   } else if (this.height == 'Free' || this.height == 'FREE'){
      //     if(this.selectedUnit.ID == 3){
      //       const mt = (this.__typeFloatControl(event) * this.__typeFloatControl(this.width)) / 100;
      //       this.model.Ton = (((coefficient * 10 * mt * this.__typeFloatControl(this.thickness))) / 1000).toFixed(3);

      //     } else{

      //       this.model.Ton;
      //     }

      //   } else{
      //     if (this.selectedUnit.ID == 1) {

      //       this.model.Ton = parseFloat((coefficient * 10 * this.__typeFloatControl(event) * this.__typeFloatControl(this.thickness)) / 1000)

      //     } else if (this.selectedUnit.ID == 2) {
      //       if (this.thickness == 'VAR' || this.thickness == 'Various' || this.thickness == 'SLAB' || this.thickness == 'Slab') {
      //         this.model.Ton = 0;
      //         this.model.OzelMiktar = 0;
      //       } else {
      //         const m2 = (this.__typeFloatControl(this.width) * this.__typeFloatControl(this.height) * this.__typeFloatControl(event)) / 10000;
      //         this.model.Ton = parseFloat((coefficient * 10 * m2 * this.__typeFloatControl(this.thickness)) / 1000);
      //         this.model.OzelMiktar = m2;
      //       }

      //     }

      //   }
    },

    __typeFloatControl(payload) {
      if (payload.toString().indexOf(",") == -1) {
        return parseFloat(payload);
      } else {
        return parseFloat(payload.replace(",", "."));
      }
    },
    oM2Change(en, boy, miktar, birim) {
      if (birim == 1) {
        return miktar;
      } else if (birim == 2) {
        if (
          en == "FR" ||
          en == "FRENCH" ||
          en == "VAR" ||
          en == "Various" ||
          en == "ANT" ||
          en == "SLAB" ||
          en == "1 LT" ||
          en == "Crazy" ||
          en == "Other" ||
          en == "SET" ||
          en == "MINI" ||
          boy == "SET" ||
          boy == "Free" ||
          boy == "FREE"
        ) {
          return 0;
        } else {
          return (
            (parseFloat(en.replace(",", ".")) / 100) *
            (parseFloat(boy.replace(",", ".")) / 100) *
            miktar
          ).toFixed(4);
        }
      } else if (birim == 3) {
        if (
          en == "FR" ||
          en == "FRENCH" ||
          en == "VAR" ||
          en == "Various" ||
          en == "ANT" ||
          en == "SLAB" ||
          en == "1 LT" ||
          en == "Crazy" ||
          en == "Other" ||
          en == "SET" ||
          en == "MINI" ||
          boy == "SET"
        ) {
          return 0;
        } else if (boy == "Free" || boy == "FREE") {
          return (miktar * (parseFloat(en.replace(",", ".")) / 100)).toFixed(4);
        } else {
          let adet = miktar / (parseFloat(boy.replace(",", ".")) / 100);
          return (
            adet *
            (parseFloat(boy.replace(",", ".")) / 100) *
            (parseFloat(en.replace(",", ".")) / 100)
          ).toFixed(4);
        }
      } else {
        return 0;
      }
    },
    productCoefficient(event) {
      if (event == "Travertine") {
        return 2.4;
      } else if (event == "Marble") {
        return 2.82;
      } else if (event == "Limestone") {
        return 2.6;
      } else if (event == "Quarts") {
        return 2.5;
      } else {
        return 0;
      }
    },

    __nullControl(value) {
      if (value == null || value == "" || value == undefined) {
        return 0;
      } else {
        return value;
      }
    },
    deleteItem() {
      const log = {
        description:
          this.po +
          " siparişinden " +
          this.model.MusteriAciklama +
          " (" +
          this.model.Miktar +
          ") " +
          this.selectedUnit.BirimAdi +
          " kalemi silindi.",
        po: this.po,
        color: "#ffec31",
      };
      this.$logs.save(log);

      this.categoryName = null;
      this.productName = null;
      this.surfaceName = null;
      this.sizeName = null;
      this.selectedSupplier = null;
      this.selectedUnit = null;
      this.selectedOrderProducts = null;
      this.product_form_disabled = true;
      this.new_button_disabled = false;
      this.cancel_button_disabled = true;
      this.add_button_disabled = true;
      this.update_button_disabled = true;
      this.delete_button_disabled = true;
      this.workerman_button_disabled = true;
      if (
        confirm("Bu ürüne ait kasalar stoğa alınacaktır, onaylıyor musunuz?")
      ) {
        this.orderStore.setOrderProductDeleted(this.model);
      }
    },
    add() {
      if (
        this.selectedSupplier === null ||
        this.selectedSupplier === undefined ||
        this.selectedSupplier === ""
      ) {
        useAppToast().error("Please select a supplier.");
        return;
      }
      if (
        this.selectedUnit === null ||
        this.selectedUnit === undefined ||
        this.selectedUnit === ""
      ) {
        useAppToast().error("Please select a unit.");
        return;
      }
      const log = {
        description:
          this.po +
          " siparişine " +
          this.model.MusteriAciklama +
          " (" +
          this.model.Miktar +
          ") " +
          this.selectedUnit.BirimAdi +
          " yeni kalem eklendi.",
        po: this.po,
        color: "#ffec31",
      };
      this.$logs.save(log);

      this.categoryName = null;
      this.productName = null;
      this.surfaceName = null;
      this.sizeName = null;
      this.selectedSupplier = null;
      this.selectedUnit = null;
      this.selectedOrderProducts = null;
      this.product_form_disabled = true;
      this.new_button_disabled = false;
      this.cancel_button_disabled = true;
      this.add_button_disabled = true;
      this.update_button_disabled = true;
      this.delete_button_disabled = true;
      this.model.SatisToplam = this.model.SatisFiyati * this.model.Miktar;
      this.model.SiparisNo = this.po;
      this.workerman_button_disabled = true;
      this.model.Adet = this.__nullControl(this.model.Adet);

      this.orderStore.setOrderProductAdded(this.model);
    },
    update() {
      const log = {
        description:
          this.po +
          " siparişinde " +
          this.model.MusteriAciklama +
          " (" +
          this.model.Miktar +
          ") " +
          this.selectedUnit.BirimAdi +
          " kalemi güncellendi.",
        po: this.po,
        color: "#ffec31",
      };
      this.$logs.save(log);
      this.categoryName = null;
      this.productName = null;
      this.surfaceName = null;
      this.sizeName = null;
      this.selectedSupplier = null;
      this.selectedUnit = null;
      this.selectedOrderProducts = null;
      this.product_form_disabled = true;
      this.new_button_disabled = false;
      this.cancel_button_disabled = true;
      this.add_button_disabled = true;
      this.update_button_disabled = true;
      this.delete_button_disabled = true;
      this.model.SatisToplam = this.model.SatisFiyati * this.model.Miktar;
      this.model.SiparisNo = this.po;
      this.workerman_button_disabled = true;
      this.model.Adet = this.__nullControl(this.model.Adet);
      this.orderStore.setOrderProductUpdated(this.model);
    },
    cancelForm() {
      this.new_button_disabled = false;
      this.cancel_button_disabled = true;
      this.add_button_disabled = true;
      this.update_button_disabled = true;
      this.delete_button_disabled = true;
      this.categoryName = null;
      this.productName = null;
      this.surfaceName = null;
      this.sizeName = null;
      this.selectedSupplier = null;
      this.selectedUnit = null;
      this.selectedOrderProducts = null;
      this.product_form_disabled = true;
      this.workerman_button_disabled = true;
      this.modelsStore.setOrderProductModel();
    },
    newForm() {
      this.new_button_disabled = true;
      this.cancel_button_disabled = false;
      this.add_button_disabled = false;
      this.product_form_disabled = false;
      // if (this.products.length > 0) {
      //   console.log(this.products.length - 1)
      //   this.model.SiraNo = this.products[this.products.length - 1].SiraNo + 1;
      // }else{
      //   this.model.SiraNo = 1;
      // }
      this.model.SiraNo = this.products.length + 1;
      this.amount_disabled = true;
    },
    orderProductsSelected(event) {
      this.product_form_disabled = false;
      this.new_button_disabled = true;
      this.cancel_button_disabled = false;
      this.add_button_disabled = true;
      this.update_button_disabled = false;
      this.delete_button_disabled = false;
      this.workerman_button_disabled = false;
      this.model = event.data;
      this.selectedUnit = this.unit.find((x) => x.ID == event.data.UrunBirimID);
      this.selectedSupplier = this.supplier.find(
        (x) => x.ID == event.data.TedarikciID
      );
      this.categoryName = event.data.KategoriAdi;
      this.productName = event.data.UrunAdi;
      this.surfaceName = event.data.YuzeyIslemAdi;
      this.sizeName =
        event.data.En + "x" + event.data.Boy + "x" + event.data.Kenar;
      this.width = event.data.En;
      this.height = event.data.Boy;
      this.thickness = event.data.Kenar;
      this.amount_disabled = false;
      const data = {
        SiparisNo: event.data.SiparisNo,
        FirmaAdi: event.data.FirmaAdi,
        KategoriAdi: event.data.KategoriAdi,
        UrunAdi: event.data.UrunAdi,
        YuzeyIslemAdi: event.data.YuzeyIslemAdi,
        En: event.data.En,
        Boy: event.data.Boy,
        Kenar: event.data.Kenar,
        UretimAciklama: event.data.UretimAciklama,
        Miktar: event.data.Miktar,
        AlisFiyati: event.data.AlisFiyati,
        SatisFiyati: event.data.SatisFiyati,
        ID: event.data.ID,
      };

      this.orderStore.setOrderProductionProductDetailNotChangeList(data
      );
    },
    unitSelected(event) {
      this.model.UrunBirimID = event.value.ID;
      this.amount_disabled = false;
    },
    searchUnit(event) {
      let results;
      if (event.query.length === 0) {
        results = this.unit;
      } else {
        results = this.unit.filter((x) => {
          return x.BirimAdi.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
      this.filteredUnit = results;
    },
    supplierSelected(event) {
      this.model.TedarikciID = event.value.ID;
      this.model.FirmaAdi = event.value.FirmaAdi;
    },
    searchSupplier(event) {
      let results;
      if (event.query.length === 0) {
        results = this.supplier;
      } else {
        results = this.supplier.filter((x) => {
          return x.FirmaAdi.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
      this.filteredSupplier = results;
    },
    card_selected_list() {
      this.sharedStore.setCardList();

      this.product_cards_form_dialog = true;
    },
    productCardsSelected(event) {
      this.product_cards_form_dialog = false;
      this.model.UrunKartID = event.ID;
      this.categoryName = event.KategoriAdi;
      this.productName = event.UrunAdi;
      this.surfaceName = event.YuzeyIslemAdi;
      this.sizeName = event.En + "x" + event.Boy + "x" + event.Kenar;
      this.width = event.En;
      this.height = event.Boy;
      this.thickness = event.Kenar;
      this.model.MusteriAciklama =
        event.KategoriAdi +
        "-" +
        event.UrunAdi +
        "-" +
        event.YuzeyIslemAdi +
        "-" +
        event.En +
        "x" +
        event.Boy +
        "x" +
        event.Kenar;

      this.model.UrunAdi = event.UrunAdi;
      this.model.YuzeyIslemAdi = event.YuzeyIslemAdi;
      this.model.En = event.En;
      this.model.Boy = event.Boy;
      this.model.Kenar = event.Kenar;
      this.model.KategoriAdi = event.KategoriAdi;
    },
  },
};
</script>
<style scoped>
:deep(.row-accessories) {
  background-color: #81fca0 !important;
}

@media screen and (max-width: 576px) {
  .row .mt-3 {
    display: block;
    width: 100%;
  }
  .col {
    display: block;
    width: 100%;
  }
  .col-4 {
    display: block;
    width: 100%;
  }
  .col-8 {
    display: block;
    width: 100%;
  }
}
</style>

<!--
  components/orders/forms/order.vue -> app/components/orderDetail/OrderForm.vue

  DOSYA YOLU: Nuxt 2'de `orderDetailOrderForm` adiyla global kayitli.

  Mekanik donusumler (tools/codemods/vue2-to-vue3.mjs):
  [1] 2x  :x + @update:x -> v-model:x
  [2] 1x  <productCards> -> <ProductCards>
          camelCase etiketler Nuxt auto-import tarafindan COZULMUYOR;
          karsiligi olmayan ad sessizce yok sayilir (bkz. order/Table.vue)
  [3] 2x  AutoComplete field= -> optionLabel=
  [4] 6x  p-button-* -> severity

  Store gecisi (tools/codemods/map-store-refs.mjs):
  [5] 6x  this.$store.dispatch(...) -> Pinia action'lari
  [6] store computed'leri (orderStore/modelsStore/sharedStore) EKLENDI.
      Bu dosyada mapGetters yoktu, yalnizca dispatch vardi; aracin ilk
      hali o durumda computed eklemiyor ve `this.orderStore` tanimsiz
      kaliyordu -- derleme gecer, calisma aninda patlar. Arac duzeltildi.

  ELLE yapilanlar:
  [7] prop `model` -> `sourceModel` + yerel `data.model` (gerekcesi prop
      bildiriminin yanindaki notta; Vue 3'te prop'a atama basarisiz olur
      ve urun secimi formu doldurmazdi)
  [8] 2x this.$toast -> useAppToast()

  DIKKAT: components/orders/forms/detail2.vue de bu bileseni kullaniyor ve
  HENUZ TASINMADI. Tasinirken :model= -> :sourceModel= yapilmali.
-->
