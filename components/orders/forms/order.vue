<template>
  <div>
    <div class="row mt-3">
      <div class="col-4">
        <div class="row mb-4">
          <div class="col-9">
            <span class="p-float-label">
              <InputText
                class="w-100"
                id="productId"
                v-model="model.UrunKartID"
                disabled
              />
              <label for="productId">Ürün Kart Id</label>
            </span>
          </div>
          <div class="col">
            <Button
              type="button"
              class="p-button-secondary"
              label="@"
              @click="product_cards_form_dialog = true"
              :disabled="product_form_disabled"
            />
          </div>
        </div>
        <span class="p-float-label mb-4">
          <InputText class="w-100" id="category" v-model="categoryName" disabled />
          <label for="category">Kategori</label>
        </span>
        <span class="p-float-label mb-4">
          <InputText class="w-100" id="product" v-model="productName" disabled />
          <label for="product">Ürün Adı</label>
        </span>
        <span class="p-float-label mb-4">
          <InputText class="w-100" id="surface" v-model="surfaceName" disabled />
          <label for="surface">Yüzey</label>
        </span>
        <span class="p-float-label mb-4">
          <InputText class="w-100" id="size" v-model="sizeName" disabled />
          <label for="size">Ölçü</label>
        </span>
        <span class="p-float-label mb-4 w-100">
          <AutoComplete
            v-model="selectedSupplier"
            inputId="supplier"
            :suggestions="filteredSupplier"
            @complete="searchSupplier($event)"
            @item-select="supplierSelected($event)"
            field="FirmaAdi"
            class="w-100"
            :disabled="product_form_disabled"
          />
          <label for="supplier">Tedarikçi</label>
        </span>
        <div class="row mb-4">
          <div class="col">
            <CustomInput
              :value="model.AlisFiyati"
              text="Alış Fiyatı"
              @onInput="model.AlisFiyati = $event"
              :disabled="product_form_disabled"
            />
          </div>
          <div class="col">
            <CustomInput
              :value="model.SatisFiyati"
              text="Satış Fiyatı"
              @onInput="model.SatisFiyati = $event"
              :disabled="product_form_disabled"
            />
          </div>
        </div>
        <div class="row mb-4">
          <div class="col">
            <span class="p-float-label w-100">
              <AutoComplete
                v-model="selectedUnit"
                inputId="unit"
                :suggestions="filteredUnit"
                @complete="searchUnit($event)"
                @item-select="unitSelected($event)"
                field="BirimAdi"
                class="w-100"
                :disabled="product_form_disabled"
              />
              <label for="unit">Birim</label>
            </span>
          </div>
          <div class="col">
            <CustomInput
              :value="model.Miktar"
              text="Miktar"
              @onInput="model.Miktar = $event"
              :disabled="product_form_disabled"
            />
          </div>
          <div class="col">
            <CustomInput
              :value="model.Adet"
              text="Adet"
              @onInput="model.Adet = $event"
              :disabled="product_form_disabled"
            />
          </div>
        </div>
        <div class="row mb-4">
          <div class="col">
            <span class="p-float-label">
              <InputText
                class="w-100"
                id="queue"
                v-model="model.SiraNo"
                :disabled="product_form_disabled"
              />
              <label for="queue">Sıra</label>
            </span>
          </div>
          <div class="col">
            <CustomInput
              :value="model.OzelMiktar"
              text="Ö.M"
              @onInput="model.OzelMiktar = $event"
              :disabled="product_form_disabled"
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
        </div>
        <div class="row mb-4">
          <div class="col">
            <Button
              type="button"
              class="p-button-info w-100"
              label="İşçilik"
              @click="$emit('workerman_selected_emit', model.UrunKartID)"
              :disabled="workerman_button_disabled"
            />
          </div>
        </div>
      </div>
      <div class="col-8">
        <span class="p-float-label mb-4">
          <Textarea
            v-model="model.MusteriAciklama"
            rows="10"
            class="w-100"
            :disabled="product_form_disabled"
          />
          <label>Açıklama(EN)</label>
        </span>
        <span class="p-float-label">
          <Textarea
            v-model="model.UretimAciklama"
            rows="10"
            class="w-100"
            :disabled="product_form_disabled"
          />
          <label>Açıklama(TR)</label>
        </span>
        <div class="row mt-4" v-if="po">
          <div class="col">
            <Button
              type="button"
              class="p-button-primary w-100"
              label="Yeni"
              :disabled="new_button_disabled"
              @click="newForm"
            />
          </div>
          <div class="col">
            <Button
              type="button"
              class="p-button-secondary w-100"
              label="Vazgeç"
              :disabled="cancel_button_disabled"
              @click="cancelForm"
            />
          </div>
          <div class="col">
            <Button
              type="button"
              class="p-button-success w-100"
              label="Ekle"
              :disabled="add_button_disabled"
              @click="add"
            />
          </div>
          <div class="col">
            <Button
              type="button"
              class="p-button-warning w-100"
              label="Değiştir"
              :disabled="update_button_disabled"
              @click="update"
            />
          </div>
          <div class="col">
            <Button
              type="button"
              class="p-button-danger w-100"
              label="Sil"
              :disabled="delete_button_disabled"
              @click="deleteItem"
            />
          </div>
        </div>
      </div>
    </div>
    <DataTable
      :value="products"
      :selection.sync="selectedOrderProducts"
      selectionMode="single"
      @row-click="orderProductsSelected($event)"
      :sortField="'SiraNo'"
      sortOrder="1"
    >
      <Column field="SiraNo" header="#"></Column>
      <Column field="FirmaAdi" header="Kimden"></Column>
      <Column field="UrunAdi" header="Ürün"></Column>
      <Column field="YuzeyIslemAdi" header="Yüzey"></Column>
      <Column field="En" header="En"></Column>
      <Column field="Boy" header="Boy"></Column>
      <Column field="Kenar" header="Kenar"></Column>
      <Column header="M2">
        <template #body="slotProps">
          <div v-if="slotProps.data.UrunBirimID == 1">
            {{ slotProps.data.Miktar | formatDecimal }}
          </div>
          <div v-else>
            {{ 0 | formatDecimal }}
          </div>
        </template>
        <template #footer>
          {{ detailProductTotal.m2 | formatDecimal }}
        </template>
      </Column>
      <Column header="Adet">
        <template #body="slotProps">
          <div v-if="slotProps.data.UrunBirimID == 2">
            {{ slotProps.data.Miktar | formatDecimal }}
          </div>
          <div v-else>
            {{ 0 | formatDecimal }}
          </div>
        </template>
        <template #footer>
          {{ detailProductTotal.piece | formatDecimal }}
        </template>
      </Column>
      <Column header="MT">
        <template #body="slotProps">
          <div v-if="slotProps.data.UrunBirimID == 3">
            {{ slotProps.data.Miktar | formatDecimal }}
          </div>
          <div v-else>
            {{ 0 | formatDecimal }}
          </div>
        </template>
        <template #footer>
          {{ detailProductTotal.mt | formatDecimal }}
        </template>
      </Column>
      <Column field="Ton" header="Ton">
        <template #body="slotProps">
          {{ slotProps.data.Ton | formatDecimal }}
        </template>
        <template #footer>
          {{ detailProductTotal.ton | formatDecimal }}
        </template>
      </Column>
      <Column field="SatisFiyati" header="S.Fiyat">
        <template #body="slotProps">
          {{ slotProps.data.SatisFiyati | formatPriceUsd }}
        </template>
      </Column>
      <Column header="Toplam">
        <template #body="slotProps">
          {{ (slotProps.data.Miktar * slotProps.data.SatisFiyati) | formatPriceUsd }}
        </template>
        <template #footer>
          {{ detailProductTotal.total | formatPriceUsd }}
        </template>
      </Column>
    </DataTable>

    <Dialog :visible.sync="product_cards_form_dialog" header="Ürün Kartları" modal>
      <productCards @cards_selected_emit="productCardsSelected($event)" />
    </Dialog>
  </div>
</template>
<script>
export default {
  props: {
    model: {
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
  methods: {
    deleteItem() {
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
      this.$store.dispatch("setOrderProductDeleted", this.model);
    },
    add() {
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
      this.$store.dispatch("setOrderProductAdded", this.model);
    },
    update() {
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
      this.$store.dispatch("setOrderProductUpdated", this.model);
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
      this.$store.dispatch("setOrderProductModel");
    },
    newForm() {
      this.new_button_disabled = true;
      this.cancel_button_disabled = false;
      this.add_button_disabled = false;
      this.product_form_disabled = false;
      this.model.SiraNo = this.products.length + 1;
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
      this.selectedSupplier = this.supplier.find((x) => x.ID == event.data.TedarikciID);
      this.categoryName = event.data.KategoriAdi;
      this.productName = event.data.UrunAdi;
      this.surfaceName = event.data.YuzeyIslemAdi;
      this.sizeName = event.data.En + "x" + event.data.Boy + "x" + event.data.Kenar;
    },
    unitSelected(event) {
      this.model.UrunBirimID = event.value.ID;
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
    productCardsSelected(event) {
      this.product_cards_form_dialog = false;
      this.model.UrunKartID = event.ID;
      this.categoryName = event.KategoriAdi;
      this.productName = event.UrunAdi;
      this.surfaceName = event.YuzeyIslemAdi;
      this.sizeName = event.En + "x" + event.Boy + "x" + event.Kenar;
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
