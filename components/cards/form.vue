<template>
  <div class="container mt-3">
    <div class="row m-auto mb-3">
      <div class="col">
        <span class="p-float-label">
          <AutoComplete
            v-model="selectedCategory"
            inputId="category"
            :suggestions="filteredCategory"
            @complete="searchCategory($event)"
            field="KategoriAdi"
            @item-select="categorySelected($event)"
            @input="categoryChange($event)"
          />
          <label for="category">Category</label>
        </span>
      </div>
      <div class="col">
        <span class="p-float-label">
          <AutoComplete
            v-model="selectedProduct"
            inputId="product"
            :suggestions="filteredProduct"
            @complete="searchProduct($event)"
            field="UrunAdi"
            @item-select="productSelected($event)"
            @input="productChange($event)"
          />
          <label for="product">Product</label>
        </span>
      </div>
      <div class="col">
        <span class="p-float-label">
          <AutoComplete
            v-model="selectedSurface"
            inputId="surface"
            :suggestions="filteredSurface"
            @complete="searchSurface($event)"
            field="YuzeyIslemAdi"
            @item-select="surfaceSelected($event)"
            @input="surfaceChange($event)"
          />
          <label for="surface">Surface</label>
        </span>
      </div>
    </div>
    <div class="row m-auto mb-5">
      <div class="col">
        <span class="p-float-label">
          <AutoComplete
            v-model="selectedWidth"
            inputId="width"
            :suggestions="filteredWidth"
            @complete="searchWidth($event)"
            field="En"
            @item-select="widthSelected($event)"
            @input="widthSurface($event)"
          />
          <label for="width">Width</label>
        </span>
      </div>
      <div class="col">
        <span class="p-float-label">
          <AutoComplete
            v-model="selectedHeight"
            inputId="height"
            :suggestions="filteredHeight"
            @complete="searchHeight($event)"
            field="Boy"
            @item-select="heightSelected($event)"
            @input="heightChange($event)"
          />
          <label for="height">Height</label>
        </span>
      </div>
      <div class="col">
        <span class="p-float-label">
          <AutoComplete
            v-model="selectedEdge"
            inputId="edge"
            :suggestions="filteredEdge"
            @complete="searchEdge($event)"
            field="Kenar"
            @item-select="edgeSelected($event)"
            @input="edgeChange($event)"
          />
          <label for="edge">Thickness</label>
        </span>
      </div>
    </div>
    <div class="row m-auto mb-5">
      <div class="col">
        <Button
          type="button"
          class="p-button-success w-100"
          label="Save"
          @click="saveProcess"
        />
      </div>
      <div class="col" v-if="!status">
        <Button
          type="button"
          class="p-button-danger w-100"
          label="Delete"
          @click="deleteForm"
        />
      </div>
    </div>

    <DataTable :value="orders">
      <Column field="FirmaAdi" header="Customer"></Column>
      <Column field="SiparisNo" header="Po"></Column>
      <Column field="SatisFiyati" header="Price">
        <template #body="slotProps">
          {{ slotProps.data.SatisFiyati | formatPriceUsd }}
        </template>
      </Column>
      <Column field="Miktar" header="Amount">
        <template #body="slotProps">
          {{ slotProps.data.Miktar | formatDecimal }}
        </template>
      </Column>
      <Column field="BirimAdi" header="Unit"></Column>
      <Column field="Toplam" header="Total">
        <template #body="slotProps">
          {{ slotProps.data.SatisFiyati | formatPriceUsd }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script>
import Cookies from "js-cookie";
// import { io } from "socket.io-client";
export default {
  props: {
    status: {
      type: Boolean,
      required: false,
    },
    model: {
      type: Object,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
    products: {
      type: Array,
      required: true,
    },
    surfaces: {
      type: Array,
      required: true,
    },
    sizes: {
      type: Array,
      required: true,
    },
    orders: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      selectedCategory: null,
      filteredCategory: null,
      selectedProduct: null,
      filteredProduct: null,
      selectedSurface: null,
      filteredSurface: null,
      selectedWidth: null,
      filteredWidth: null,
      selectedHeight: null,
      filteredHeight: null,
      selectedEdge: null,
      filteredEdge: null,
      socket:null
    };
  },
  created() {
    if (!this.status) {
      this.createdProcess();
    };
    // this.socket = io("http://localhost:3001",{
    //   reconnectionDelayMax: 10000,
    // })
  },
  methods: {
    reset() {
      this.selectedCategory = null;
      this.selectedProduct = null;
      this.selectedSurface = null;
      this.selectedWidth = null;
      this.selectedHeight = null;
      this.selectedEdge = null;
      this.model = {};
    },
    deleteForm() {
      this.$store.dispatch("setCardsDelete", this.model.ID);
      this.$emit("card_dialog_form_emit", false);
    },
    update() {
      this.model.userId = Cookies.get("userId");
      this.model.date = new Date();
      this.$store.dispatch("setCardsUpdate", this.model);
      this.$emit("card_dialog_form_emit", false);
      this.reset();
    },
    save() {
      this.model.userId = Cookies.get("userId");
      this.model.date = new Date();
      this.$store.dispatch("setCardsSave", this.model);
      this.reset();
    },
    saveProcess() {
      if (this.status) {
        this.save();
      } else {
        this.update();
      }
    },
    createdProcess() {
      this.selectedCategory = this.categories.find((x) => x.ID == this.model.KategoriId);
      this.selectedProduct = this.products.find((x) => x.ID == this.model.UrunId);
      this.selectedSurface = this.surfaces.find((x) => x.ID == this.model.YuzeyId);
      this.selectedWidth = this.sizes.find((x) => x.ID == this.model.OlcuId);
      this.selectedHeight = this.sizes.find((x) => x.ID == this.model.OlcuId);
      this.selectedEdge = this.sizes.find((x) => x.ID == this.model.OlcuId);
    },
    edgeChange(event) {
      if(typeof (event) == 'string'){
        this.model.OlcuId = null;
      this.model.Kenar = event.replace('.',',');
      this.selectedEdge = event.replace('.',',');
      }


    },
    heightChange(event) {
      if(typeof (event) == 'string'){
        this.model.OlcuId = null;
      this.model.Boy = event.replace('.',',');
      this.selectedHeight = event.replace('.',',');
      }


    },
    widthSurface(event) {
      if(typeof (event) == 'string'){
      this.model.OlcuId = null;
      this.model.En = event.replace('.',',');
      this.selectedWidth = event.replace('.',',');
      }


    },
    surfaceChange(event) {
      this.model.YuzeyId = null;
      this.model.YuzeyIslemAdi = event;
    },
    productChange(event) {
      this.model.UrunId = null;
      this.model.UrunAdi = event;
    },
    categoryChange(event) {
      this.model.KategoriAdi = event;
      this.model.KategoriId = null;
    },
    edgeSelected(event) {
      this.model.OlcuId = event.value.ID;
      this.model.Kenar = event.value.Kenar;
    },
    heightSelected(event) {
      this.model.OlcuId = event.value.ID;
      this.model.Boy = event.value.Boy;
    },
    widthSelected(event) {
      this.model.OlcuId = event.value.ID;
      this.model.En = event.value.En;
    },
    surfaceSelected(event) {
      this.model.YuzeyId = event.value.ID;
      this.model.YuzeyIslemAdi = event.value.YuzeyIslemAdi;
    },
    productSelected(event) {
      this.model.UrunId = event.value.ID;
      this.model.UrunAdi = event.value.UrunAdi;
    },
    categorySelected(event) {
      this.model.KategoriId = event.value.ID;
      this.model.KategoriAdi = event.value.KategoriAdi;
    },
    searchEdge(event) {
      let results;
      if (event.query == 0) {
        results = this.sizes;
      } else {
        results = this.sizes.filter((edge) =>
          edge.Kenar.toLowerCase().startsWith(event.query.toLowerCase())
        );
      }
      this.filteredEdge = results;
    },
    searchHeight(event) {
      let results;
      if (event.query == 0) {
        results = this.sizes;
      } else {
        results = this.sizes.filter((height) =>
          height.Boy.toLowerCase().startsWith(event.query.toLowerCase())
        );
      }
      this.filteredHeight = results;
    },
    searchWidth(event) {
      let results;
      if (event.query == 0) {
        results = this.sizes;
      } else {
        results = this.sizes.filter((width) =>
          width.En.toLowerCase().startsWith(event.query.toLowerCase())
        );
      }
      this.filteredWidth = results;
    },
    searchSurface(event) {
      let results;
      if (event.query == 0) {
        results = this.surfaces;
      } else {
        results = this.surfaces.filter((surface) =>
          surface.YuzeyIslemAdi.toLowerCase().startsWith(event.query.toLowerCase())
        );
      }
      this.filteredSurface = results;
    },
    searchProduct(event) {
      let results;
      if (event.query == 0) {
        results = this.products;
      } else {
        results = this.products.filter((product) =>
          product.UrunAdi.toLowerCase().startsWith(event.query.toLowerCase())
        );
      }
      this.filteredProduct = results;
    },
    searchCategory(event) {
      let results;
      if (event.query == 0) {
        results = this.categories;
      } else {
        results = this.categories.filter((category) =>
          category.KategoriAdi.toLowerCase().startsWith(event.query.toLowerCase())
        );
      }
      this.filteredCategory = results;
    },
  },
};
</script>
<style scoped>
@media screen and (max-width:575px) {
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
}
</style>
