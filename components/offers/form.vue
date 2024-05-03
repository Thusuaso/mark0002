<template>
  <div class="row" style="padding:0px 100px;">
    <div class="col-9">
      <div class="row">
        <div class="col">
          <div class="p-float-label mb-4">
            <Dropdown v-model="selectedSource" inputId="source" :options="sources" optionLabel="source" class="w-100"
              @change="sourceSelected($event)" />
            <label for="source">Source</label>
          </div>
          <div class="p-float-label mb-4">
            <Dropdown v-model="selectedOfferType" inputId="type" :options="offerTypes" optionLabel="type" class="w-100"
              @change="offerTypeSelected($event)" />
            <label for="type">Quote Type</label>
          </div>
          <div class="p-float-label mb-4">
            <Dropdown v-model="selectedPriority" inputId="priority" :options="priorities" optionLabel="priority"
              class="w-100" @change="prioritySelected($event)" />
            <label for="priority">Priority</label>
          </div>
        </div>
        <div class="col">
          <TabView>
            <TabPanel header="Description">
              <Textarea v-model="model.Aciklama" autoResize rows="5" cols="30" class="w-100" />
            </TabPanel>
            <TabPanel header="Reminder">
              <div class="row">
                <div class="col">
                  <Calendar v-model="reminder_date" @date-select="reminderDateSelected($event)" placeholder="Date" />
                </div>
                <div class="col">
                  <FileUpload mode="basic" @select="uploadReminder($event)" />
                </div>
                <div class="col">
                  <a :href="offerFileLink" ref="cloudReminder"> </a>
                  <Button @click="$refs.cloudReminder.click()" :disabled="!model.Teklif_Cloud"
                    class="btn btn-success h-100"><i class="pi pi-download"></i></Button>
                </div>
              </div>
            </TabPanel>
            <TabPanel header="Sample Invoice">
              <div class="row">
                <div class="col">
                  <Button class="p-button-primary" label="Proforma" @click="proforma_dialog_form = true" />
                  <Dialog :visible.sync="proforma_dialog_form" header="Proforma" modal>
                    <offerProforma :id="id" :model="model" />
                  </Dialog>
                </div>
                <div class="col">
                  <Button class="p-button-secondary" label="Sample" @click="sample_dialog_form = true" />
                  <Dialog :visible.sync="sample_dialog_form" header="Sample" modal>
                    <offerSample :id="id" :model="model" />
                  </Dialog>
                </div>
              </div>
            </TabPanel>
          </TabView>
        </div>
      </div>
      <div>
        <div class="row">
          <div class="col">
            <span class="p-float-label">
              <Calendar v-model="offerProductDate" inputId="offer_product_date"
                @date-select="offerProductDateSelected($event)" :disabled="id == 0" style="z-index: 99" />
              <label for="offer_product_date">Date of Quote</label>
            </span>
          </div>
          <div class="col">
            <span class="p-float-label">
              <AutoComplete v-model="selectedCategory" inputId="category" :suggestions="filteredCategoryList"
                @complete="searchCategory($event)" field="KategoriAdi" @item-select="categoryListSelected($event)"
                :disabled="id == 0" @input="inputCategory($event)" />
              <label for="category">Category</label>
            </span>
          </div>
          <div class="col">
            <span class="p-float-label">
              <AutoComplete v-model="selectedProduct" inputId="product" :suggestions="filteredProductList"
                @complete="searchProduct($event)" field="UrunAdi" @item-select="productListSelected($event)"
                :disabled="id == 0" @input="inputProduct($event)" />
              <label for="product">Product</label>
            </span>
          </div>
          <div class="col">
            <span class="p-float-label">
              <AutoComplete v-model="selectedSize" inputId="size" :suggestions="filteredSizeList"
                @complete="searchSize($event)" field="EnBoy" @item-select="sizeListSelected($event)" :disabled="id == 0"
                @input="inputSize($event)" />
              <label for="size">Width x Lenght</label>
            </span>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col">
            <span class="p-float-label">
              <AutoComplete v-model="selectedThickness" inputId="thickness" :suggestions="filteredThicknessList"
                @complete="searchThickness($event)" field="Kalinlik" @item-select="thicknessListSelected($event)"
                :disabled="id == 0" @input="inputThickness($event)" />
              <label for="thickness">Thickness</label>
            </span>
          </div>
          <div class="col">
            <span class="p-float-label">
              <AutoComplete v-model="selectedSurface" inputId="surface" :suggestions="filteredSurfaceList"
                @complete="searchSurface($event)" field="IslemAdi" @item-select="surfaceListSelected($event)"
                :disabled="id == 0" @input="inputSurface($event)" />
              <label for="surface">Surface</label>
            </span>
          </div>
          <div class="col">
            <div class="p-float-label">
              <Dropdown v-model="selectedUnit" inputId="unit" :options="unit" optionLabel="Birim"
                @change="unitSelected($event)" :disabled="id == 0" />
              <label for="unit">Select a Unit</label>
            </div>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col">
            <CustomInput :value="modelProduct.FobFiyat" text="Fob" @onInput="modelProduct.FobFiyat = $event"
              :disabled="id == 0" />
            <!-- <span class="p-float-label">
              <InputText
                id="fob"
                v-model="modelProduct.FobFiyat"
                @input="modelProduct.FobFiyat = formatPoint($event)"
                :disabled="id == 0"
              />
              <label for="fob">Fob</label>
            </span> -->
          </div>
          <div class="col">
            <CustomInput :value="modelProduct.FcaFiyat" text="Fca" @onInput="modelProduct.FcaFiyat = $event"
              :disabled="id == 0" />
            <!-- <span class="p-float-label">
              

              <InputText
                id="fca"
                v-model="modelProduct.FcaFiyat"
                @input="modelProduct.FcaFiyat = formatPoint($event)"
                :disabled="id == 0"
              />
              <label for="fca">Fca</label>
            </span> -->
          </div>
          <div class="col">
            <CustomInput :value="modelProduct.CFiyat" text="C" @onInput="modelProduct.CFiyat = $event"
              :disabled="id == 0" />
            <!-- <span class="p-float-label">
              <InputText
                id="c"
                v-model="modelProduct.CFiyat"
                @input="modelProduct.CFiyat = formatPoint($event)"
                :disabled="id == 0"
              />
              <label for="c">C</label>
            </span> -->
          </div>
          <div class="col">
            <CustomInput :value="modelProduct.DFiyat" text="D" @onInput="modelProduct.DFiyat = $event"
              :disabled="id == 0" />
            <!-- <span class="p-float-label">
              <InputText
                id="d"
                v-model="modelProduct.DFiyat"
                @input="modelProduct.DFiyat = formatPoint($event)"
                :disabled="id == 0"
              />
              <label for="d">D</label>
            </span> -->
          </div>
        </div>
        <div class="row mt-3">
          <div class="col">
            <Button type="button" class="p-button-success w-100" label="Add" @click="addProduct" :disabled="id == 0" />
          </div>
          <div class="col">
            <Button type="button" class="p-button-warning w-100" label="Update" @click="updateProduct"
              :disabled="id == 0" />
          </div>
          <div class="col">
            <Button type="button" class="p-button-danger w-100" label="Delete" @click="deleteProduct"
              :disabled="id == 0" />
          </div>
        </div>
        <div class="row mt-3">
          <div class="col">
            <DataTable :value="productsList" :selection.sync="selectedProductsList" selectionMode="single"
              @row-click="productsListSelected($event)">
              <Column field="Tarih" header="Date">
                <template #body="slotProps">
                  {{ slotProps.data.Tarih | dateToString }}
                </template>
              </Column>
              <Column field="KategoriAdi" header="Category"></Column>
              <Column field="UrunAdi" header="Product"></Column>
              <Column field="IslemAdi" header="Surface"></Column>
              <Column field="EnBoy" header="Size"></Column>
              <Column field="Kalinlik" header="Thickness"></Column>
              <Column field="Birim" header="Unit"></Column>

              <Column field="FobFiyat" header="Fob">
                <template #body="slotProps">
                  {{ slotProps.data.FobFiyat | formatPriceUsd }}
                </template>
              </Column>
              <Column field="FcaFiyat" header="Fca">
                <template #body="slotProps">
                  {{ slotProps.data.FcaFiyat | formatPriceUsd }}
                </template>
              </Column>
              <Column field="CFiyat" header="C">
                <template #body="slotProps">
                  {{ slotProps.data.CFiyat | formatPriceUsd }}
                </template>
              </Column>
              <Column field="DFiyat" header="D">
                <template #body="slotProps">
                  {{ slotProps.data.DFiyat | formatPriceUsd }}
                </template>
              </Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
    <div class="col-3">
      <div class="">
        <div class="row">
          <div class="col">
            <Button type="button" class="p-button-success w-100 mb-4" label="Save" @click="process"
              :disabled="offer_disabled_button" />
          </div>
          <div class="col" v-if="!status">
            <Button type="button" class="p-button-danger w-100" label="Delete" @click="deleteProcess" />
          </div>
        </div>
        <div class="flex flex-wrap justify-content-center gap-3 mb-4">
          <div class="flex align-items-center">
            <Checkbox v-model="model.TakipEt" inputId="follow" binary />
            <label for="follow" class="ml-2"> Track </label>
          </div>
          <div class="flex align-items-center">
            <Checkbox v-model="model.BList" inputId="follow" binary />
            <label for="follow" class="ml-2"> B List </label>
          </div>
        </div>
        <span class="p-float-label mb-4">
          <Calendar v-model="offerDate" inputId="offer_date" style="width: 100%"
            @date-select="offerDateSelected($event)" />
          <label for="offer_date">Date</label>
        </span>
        <span class="p-float-label mb-4">
          <AutoComplete v-model="selectedCustomer" inputId="customer" :suggestions="filteredCustomer"
            @complete="searchCustomer($event)" field="MusteriAdi" @item-select="customerSelected($event)"
            @input="customerInput($event)" :disabled="offer_customer_disabled" />
          <label for="customer">Customer</label>
        </span>
        <span class="p-float-label mb-4">
          <AutoComplete v-model="selectedCountry" inputId="country" :suggestions="filteredCountry"
            @complete="searchCountry($event)" field="UlkeAdi" @item-select="countrySelected($event)"
            :disabled="offer_customer_disabled" />
          <label for="country">Country</label>
        </span>
        <span class="p-float-label mb-4">
          <InputText id="company" v-model="customerModel.Company" />
          <label for="company">Company</label>
        </span>
        <span class="p-float-label mb-4">
          <InputText id="mail" v-model="customerModel.Mail" />
          <label for="mail">Mail</label>
        </span>
        <span class="p-float-label mb-4">
          <InputText id="phone" v-model="customerModel.Phone" />
          <label for="phone">Phone</label>
        </span>
        <span class="p-float-label mb-4">
          <InputText id="adress" v-model="customerModel.Adress" />
          <label for="adress">Address</label>
        </span>
        <span class="p-float-label mb-4">
          <Textarea v-model="customerModel.Description" rows="5" class="w-100" />
          <label>Description</label>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import date from "../../plugins/date";
import Cookies from "js-cookie";

import fileService from "~/plugins/upload.js";
export default {
  props: {
    model: {
      type: Object,
      required: true,
    },
    category: {
      type: Array,
      required: true,
    },
    product: {
      type: Array,
      required: true,
    },
    size: {
      type: Array,
      required: true,
    },
    thickness: {
      type: Array,
      required: true,
    },
    surface: {
      type: Array,
      required: true,
    },
    unit: {
      type: Array,
      required: true,
    },
    productsList: {
      type: Array,
      required: false,
    },
    modelProduct: {
      type: Object,
      required: false,
    },
    status: {
      type: Boolean,
      required: true,
    },
    customer: {
      type: Array,
      required: true,
    },
    country: {
      type: Array,
      required: true,
    },
    customerModel: {
      type: Object,
      required: true,
    },
    id: {
      type: Number,
      required: false,
    },
  },
  data() {
    return {
      width: null,
      height: null,
      offer_customer_disabled: false,
      offer_disabled_button: false,
      proforma_dialog_form: false,
      sample_dialog_form: false,
      offerFileLink: null,
      reminder_date: null,
      selectedCountry: null,
      filteredCountry: null,
      selectedProductsList: null,
      offerDate: null,
      selectedSource: null,
      sources: [
        { id: 1, source: "Portföy" },
        { id: 2, source: "Site" },
        { id: 3, source: "Stone Contact" },
        { id: 4, source: "Fuar" },
        { id: 5, source: "Email" },
        { id: 6, source: "BGP Network" },
        { id: 7, source: "Ziyaret" },
        { id: 8, source: "Stone Add" },
      ],
      selectedOfferType: null,
      offerTypes: [
        { id: 1, type: "Mail" },
        { id: 2, type: "WhatsApp" },
        { id: 3, type: "Mail-Efes" },
      ],
      offerProductDate: null,
      selectedCategory: null,
      selectedProduct: null,
      selectedSize: null,
      selectedThickness: null,
      selectedSurface: null,
      selectedUnit: null,
      filteredCategoryList: null,
      filteredProductList: null,
      filteredSizeList: null,
      filteredThicknessList: null,
      filteredSurfaceList: null,
      filteredUnitList: null,
      selectedPriority: null,
      priorities: [
        { id: 1, priority: "A" },
        { id: 2, priority: "B" },
        { id: 3, priority: "C" },
        { id: 4, priority: "Toplantı" },
      ],
      selectedCustomer: null,
      filteredCustomer: null,
    };
  },
  created() {
    if (!this.status) {
      this.createdProcess();
    } else {
      this.selectedPriority = { id: 4, priority: "Toplantı" };
      this.model.TeklifOncelik = "Toplantı";

      this.offer_customer_disabled = false;
    }
  },
  methods: {
    inputSurface(event) {
      this.modelProduct.IslemAdi = event;
    },
    inputThickness(event) {
      this.modelProduct.Kalinlik = event;
    },
    inputSize(event) {
      this.modelProduct.EnBoy = event;
    },
    inputProduct(event) {
      this.modelProduct.UrunAdi = event;
    },
    inputCategory(event) {
      this.modelProduct.KategoriAdi = event;
    },
    inputHeight(event) {
      this.height = event.replace(".", ",");
    },
    inputWidth(event) {
      this.width = event.replace(".", ",");
    },
    saveWidthHeight() {
      const size = this.width + "x" + this.height;
      this.$store.dispatch("setOfferAddSize", size);
      this.width = null;
      this.height = null;
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
    uploadReminder(event) {
      fileService.offerFile(event.files[0], this.id).then((response) => {
        if (response.Status) {
          this.model.teklifCloud = true;
          this.model.teklifCloudDosya = event.files[0].name;
          const data = {
            cloud: "1",
            name: event.files[0].name,
            date: date.dateToString(this.reminder_date),
            id: this.id,
          };
          this.$store.dispatch("setOfferReminderCloudUpload", data).then((response) => {
            this.offerFileLink = `https://file-service.mekmar.com/file/download/teklif/teklifDosya/${this.id}/${event.files[0].name}`;
            if (response) {
              this.$toast.success("Başarıyla Kaydedildi.");
            } else {
              this.$toast.error("Kaydetme Başarısız.");
            }
          });
        }
      });
    },
    reminderDateSelected(event) {},
    __undefinedControl(value) {
      if (
        value === undefined ||
        value === null ||
        value == "" ||
        value == " " ||
        value == 0
      ) {
        return false;
      } else {
        return true;
      }
    },
    deleteProcess() {
      if (confirm("Are you sure you want to delete?")) {
        this.$emit("offer_delete_emit", this.model.Id);
      }
    },
    customerInput(event) {
      this.customerModel.MusteriAdi = event;
      this.customerModel.Id = null;
    },
    __saveControl() {
      if (
        this.customerModel.MusteriAdi == null ||
        this.customerModel.MusteriAdi == "" ||
        this.customerModel.UlkeId == null ||
        this.customerModel.UlkeId == "" ||
        this.model.TeklifYeri == null ||
        this.model.TeklifYeri == "" ||
        this.model.KaynakYeri == null ||
        this.model.KaynakYeri == "" ||
        this.model.Tarih == null ||
        this.model.Tarih == ""
      ) {
        return true;
      } else {
        return false;
      }
    },
    process() {
      this.offer_disabled_button = true;
      if (this.__saveControl()) {
        alert("Hatalı Giriş");
        this.offer_disabled_button = false;
      } else {
        this.customerModel.Kullanici = Cookies.get("userId");
        this.model.KullaniciId = Cookies.get("userId");
        if (this.status) {
          this.model.TakipEt = true;
        }
        this.model.Id = this.id;

        this.model.Tarih = date.dateToString(this.offerDate);
        const data = { offer: this.model, customer: this.customerModel };
        this.$emit("offer_process_emit", data);
        this.offer_disabled_button = false;
      }
    },
    countrySelected(event) {
      this.customerModel.UlkeId = event.value.Id;
    },
    customerSelected(event) {
      this.selectedCountry = this.country.find((x) => x.Id == event.value.UlkeId);
      this.model.MusteriId = event.value.Id;
      this.customerModel.Id = event.value.Id;
      this.customerModel.UlkeId = event.value.UlkeId;
      this.customerModel.MusteriAdi = event.value.MusteriAdi;
      this.customerModel.Company = event.value.Company;
      this.customerModel.Mail = event.value.Mail;
      this.customerModel.Phone = event.value.Phone;
      this.customerModel.Adress = event.value.Adress;
      this.customerModel.Description = event.value.Description;
      this.process_button_disabled = false;
    },
    searchCountry(event) {
      let results;
      if (event.query.length == 0) {
        results = this.country;
      } else {
        results = this.country.filter((x) => {
          return x.UlkeAdi.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
      this.filteredCountry = results;
    },
    searchCustomer(event) {
      let results;
      if (event.query.length == 0) {
        results = this.customer;
      } else {
        results = this.customer.filter((x) => {
          return x.MusteriAdi.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
      this.filteredCustomer = results;
    },
    offerDateSelected(event) {
      this.model.Tarih = date.dateToString(event);
    },
    prioritySelected(event) {
      this.model.TeklifOncelik = event.value.priority;
      this.process_button_disabled = false;
    },
    offerTypeSelected(event) {
      this.model.TeklifYeri = event.value.type;
      this.process_button_disabled = false;
    },
    sourceSelected(event) {
      this.model.KaynakYeri = event.value.source;
      this.process_button_disabled = false;
    },
    __nullControl(value) {
      if (value == "null" || value == null || value == undefined) {
        return "";
      } else {
        return value;
      }
    },
    createdProcess() {
      this.offer_customer_disabled = true;
      this.offerFileLink = this.model.cloudLink;
      this.selectedSource = this.sources.find((x) => x.source == this.model.KaynakYeri);
      this.selectedOfferType = this.offerTypes.find(
        (x) => x.type == this.model.TeklifYeri
      );
      this.selectedPriority = this.priorities.find(
        (x) => x.priority == this.model.TeklifOncelik
      );
      this.offerDate = date.stringToDate(this.model.Tarih);
      if (this.__undefinedControl(this.model.MusteriId)) {
        this.selectedCustomer = this.customer.find((x) => x.Id == this.model.MusteriId);
        if (this.__undefinedControl(this.selectedCustomer.UlkeId)) {
          this.selectedCountry = this.country.find(
            (x) => x.Id == this.selectedCustomer.UlkeId
          );
          this.customerModel.UlkeId = this.selectedCustomer.UlkeId;
        }
      }

      this.customerModel.Id = this.selectedCustomer.Id;
      this.customerModel.MusteriAdi = this.selectedCustomer.MusteriAdi;

      this.customerModel.Company = this.__nullControl(this.selectedCustomer.Company);
      this.customerModel.Mail = this.__nullControl(this.selectedCustomer.Mail);
      this.customerModel.Phone = this.__nullControl(this.selectedCustomer.Phone);
      this.customerModel.Adress = this.__nullControl(this.selectedCustomer.Adress);
      this.customerModel.Description = this.__nullControl(
        this.selectedCustomer.Description
      );
    },
    productReset() {
      this.offerProductDate = null;
      this.selectedCategory = null;
      this.selectedProduct = null;
      this.selectedSize = null;
      this.selectedThickness = null;
      this.selectedSurface = null;
      this.selectedUnit = null;
      this.selectedProductsList = null;
    },
    productsListSelected(event) {
      this.offerProductDate = date.stringToDate(event.data.Tarih);
      this.selectedCategory = this.category.find((x) => x.Id == event.data.KategoriId);
      this.selectedProduct = this.product.find((x) => x.Id == event.data.UrunId);
      this.selectedSize = this.size.find((x) => x.id == event.data.EnBoyId);
      this.selectedThickness = this.thickness.find((x) => x.id == event.data.KalinlikId);
      this.selectedSurface = this.surface.find((x) => x.Id == event.data.YuzeyIslemId);
      this.selectedUnit = this.unit.find((x) => x.Birim == event.data.Birim);
      this.modelProduct = event.data;
      if (event.data.FobFiyat == null || event.data.FobFiyat == 0) {
        this.modelProduct.FobFiyat = 0;
      } else {
        this.modelProduct.FobFiyat = event.data.FobFiyat;
      }
      if (event.data.FcaFiyat == null || event.data.FcaFiyat == 0) {
        this.modelProduct.FcaFiyat = 0;
      } else {
        this.modelProduct.FcaFiyat = event.data.FcaFiyat;
      }
      if (event.data.CFiyat == null || event.data.CFiyat == 0) {
        this.modelProduct.CFiyat = 0;
      } else {
        this.modelProduct.CFiyat = event.data.CFiyat;
      }
      if (event.data.DFiyat == null || event.data.DFiyat == 0) {
        this.modelProduct.DFiyat = 0;
      } else {
        this.modelProduct.DFiyat = event.data.DFiyat;
      }
    },
    offerProductDateSelected(event) {
      this.modelProduct.Tarih = date.dateToString(event);
    },
    deleteProduct() {
      if (confirm("Are you sure you want to delete?")) {
        this.$store.dispatch("setOfferDetailProductsDelete", this.modelProduct.Id);
        this.productReset();
      }
    },
    updateProduct() {
      this.$store.dispatch("setOfferDetailProductsUpdate", this.modelProduct);

      this.productReset();
    },
    addProduct() {
      this.modelProduct.TeklifId = this.id;
      this.$store.dispatch("setOfferDetailProductsAdd", this.modelProduct);

      this.productReset();
    },
    formatPoint(value) {
      if (value == null || value == " ") {
        return 0;
      } else {
        return value.replace(",", ".");
      }
    },
    unitSelected(event) {
      this.modelProduct.Birim = event.value.Birim;
    },
    surfaceListSelected(event) {
      this.modelProduct.YuzeyIslemId = event.value.Id;
      this.modelProduct.IslemAdi = event.value.IslemAdi;
    },
    thicknessListSelected(event) {
      this.modelProduct.KalinlikId = event.value.id;
      this.modelProduct.Kalinlik = event.value.Kalinlik;
    },
    sizeListSelected(event) {
      this.modelProduct.EnBoyId = event.value.id;
      this.modelProduct.EnBoy = event.value.EnBoy;
    },
    productListSelected(event) {
      this.modelProduct.UrunId = event.value.Id;
      this.modelProduct.UrunAdi = event.value.UrunAdi;
    },
    categoryListSelected(event) {
      this.modelProduct.KategoriId = event.value.Id;
      this.modelProduct.KategoriAdi = event.value.KategoriAdi;
    },
    searchSurface(event) {
      let results;
      if (event.query.length == 0) {
        results = this.surface;
      } else {
        results = this.surface.filter((x) => {
          return x.IslemAdi.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
      this.filteredSurfaceList = results;
    },
    searchThickness(event) {
      let results;
      if (event.query.length == 0) {
        results = this.thickness;
      } else {
        results = this.thickness.filter((x) => {
          return x.Kalinlik.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
      this.filteredThicknessList = results;
    },
    searchSize(event) {
      let results;
      if (event.query.length == 0) {
        results = this.size;
      } else {
        results = this.size.filter((x) => {
          return x.EnBoy.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
      this.filteredSizeList = results;
    },
    searchProduct(event) {
      let results;
      if (event.query.length == 0) {
        results = this.product;
      } else {
        results = this.product.filter((x) => {
          return x.UrunAdi.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
      this.filteredProductList = results;
    },
    searchCategory(event) {
      let results;
      if (event.query.length == 0) {
        results = this.category;
      } else {
        results = this.category.filter((x) => {
          return x.KategoriAdi.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
      this.filteredCategoryList = results;
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
.col-3{
  clear:both;
  display:block;
  width:100%;
}
.col-9{
  clear:both;
  display:block;
  width:100%;
}
 }
</style>
