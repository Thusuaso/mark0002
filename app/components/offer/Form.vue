<template>
  <div class="row" style="padding: 0px 100px">
    <div class="col-9">
      <div class="row">
        <div class="col mt-3">
          <FloatLabel class="mb-4">
            <Dropdown
              v-model="selectedSource"
              inputId="source"
              :options="sources"
              optionLabel="source"
              class="w-100"
              @change="sourceSelected($event)"
            />
            <label for="source">Source</label>
          </FloatLabel>
          <FloatLabel class="mb-4">
            <Dropdown
              v-model="selectedOfferType"
              inputId="offer_type"
              :options="offerTypes"
              optionLabel="type"
              class="w-100"
              @change="offerTypeSelected($event)"
            />
            <label for="offer_type">Quote Type</label>
          </FloatLabel>
          <FloatLabel class="mb-4">
            <Dropdown
              v-model="selectedPriority"
              inputId="priority"
              :options="priorities"
              optionLabel="priority"
              class="w-100"
              @change="prioritySelected($event)"
            />
            <label for="priority">Priority</label>
          </FloatLabel>
          <FloatLabel class="mb-4">
            <Dropdown
              v-model="selectedShippedType"
              inputId="shipped_type"
              :options="shippedType"
              optionLabel="type"
              class="w-100"
            />
            <label for="shipped_type">Type</label>
          </FloatLabel>
          <Button
            severity="secondary"
            class="w-100"
            label="Proforma Excel"
            @click="proforma_excel_output"
          />
        </div>
        <div class="col">
          <TabView>
            <TabPanel header="Description">
              <Textarea
                v-model="model.Aciklama"
                autoResize
                rows="5"
                cols="30"
                class="w-100"
              />
            </TabPanel>
            <TabPanel header="Reminder">
              <div class="row">
                <div class="col">
                  <Calendar
                    v-model="reminder_date"
                    placeholder="Date"
                    dateFormat="dd/mm/yy"
                  />
                </div>
                <div class="col">
                  <FileUpload
                    mode="basic"
                    :auto="false"
                    customUpload
                    @select="uploadReminder($event)"
                  />
                </div>
                <div class="col">
                  <a :href="offerFileLink" ref="cloudReminder"> </a>
                  <Button
                    @click="$refs.cloudReminder.click()"
                    :disabled="!model.Teklif_Cloud"
                    severity="success"
                    class="h-100"
                    ><i class="pi pi-download"></i
                  ></Button>
                </div>
              </div>
            </TabPanel>
            <TabPanel header="Sample Invoice">
              <div class="row">
                <div class="col">
                  <Button
                    severity="primary"
                    label="Proforma"
                    @click="proforma_dialog_form = true"
                  />
                  <Dialog
                    v-model:visible="proforma_dialog_form"
                    header="Proforma"
                    modal
                  >
                    <OfferProforma :id="id" :model="model" />
                  </Dialog>
                </div>
                <div class="col">
                  <Button
                    severity="secondary"
                    label="Sample"
                    @click="sample_dialog_form = true"
                  />
                  <Dialog
                    v-model:visible="sample_dialog_form"
                    header="Sample"
                    modal
                  >
                    <OfferSample :id="id" :model="model" />
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
            <FloatLabel>
              <Calendar
                v-model="offerProductDate"
                inputId="offer_product_date"
                @date-select="offerProductDateSelected($event)"
                :disabled="id == 0"
                style="z-index: 99"
                dateFormat="dd/mm/yy"
              />
              <label for="offer_product_date">Date of Quote</label>
            </FloatLabel>
          </div>
          <div class="col">
            <FloatLabel>
              <AutoComplete
                v-model="selectedCategory"
                inputId="category"
                :suggestions="filteredCategoryList"
                @complete="searchCategory($event)"
                optionLabel="KategoriAdi"
                @item-select="categoryListSelected($event)"
                :disabled="id == 0"
                @update:modelValue="inputCategory($event)"
              />
              <label for="category">Category</label>
            </FloatLabel>
          </div>
          <div class="col">
            <FloatLabel>
              <AutoComplete
                v-model="selectedProduct"
                inputId="product"
                :suggestions="filteredProductList"
                @complete="searchProduct($event)"
                optionLabel="UrunAdi"
                @item-select="productListSelected($event)"
                :disabled="id == 0"
                @update:modelValue="inputProduct($event)"
              />
              <label for="product">Product</label>
            </FloatLabel>
          </div>
          <div class="col">
            <FloatLabel>
              <AutoComplete
                v-model="selectedSize"
                inputId="size"
                :suggestions="filteredSizeList"
                @complete="searchSize($event)"
                optionLabel="EnBoy"
                @item-select="sizeListSelected($event)"
                :disabled="id == 0"
                @update:modelValue="inputSize($event)"
              />
              <label for="size">Width x Lenght</label>
            </FloatLabel>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col">
            <FloatLabel>
              <AutoComplete
                v-model="selectedThickness"
                inputId="thickness"
                :suggestions="filteredThicknessList"
                @complete="searchThickness($event)"
                optionLabel="Kalinlik"
                @item-select="thicknessListSelected($event)"
                :disabled="id == 0"
                @update:modelValue="inputThickness($event)"
              />
              <label for="thickness">Thickness</label>
            </FloatLabel>
          </div>
          <div class="col">
            <FloatLabel>
              <AutoComplete
                v-model="selectedSurface"
                inputId="surface"
                :suggestions="filteredSurfaceList"
                @complete="searchSurface($event)"
                optionLabel="IslemAdi"
                @item-select="surfaceListSelected($event)"
                :disabled="id == 0"
                @update:modelValue="inputSurface($event)"
              />
              <label for="surface">Surface</label>
            </FloatLabel>
          </div>
          <div class="col">
            <FloatLabel>
              <Dropdown
                v-model="selectedUnit"
                inputId="unit"
                :options="unit"
                optionLabel="Birim"
                @change="unitSelected($event)"
                :disabled="id == 0"
              />
              <label for="unit">Select a Unit</label>
            </FloatLabel>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col">
            <CustomInput
              :value="modelProduct.FobFiyat"
              text="Fob"
              @onInput="modelProduct.FobFiyat = $event"
              :disabled="id == 0"
            />
          </div>
          <div class="col">
            <CustomInput
              :value="modelProduct.FcaFiyat"
              text="Fca"
              @onInput="modelProduct.FcaFiyat = $event"
              :disabled="id == 0"
            />
          </div>
          <div class="col">
            <CustomInput
              :value="modelProduct.CFiyat"
              text="C"
              @onInput="modelProduct.CFiyat = $event"
              :disabled="id == 0"
            />
          </div>
          <div class="col">
            <CustomInput
              :value="modelProduct.DFiyat"
              text="D"
              @onInput="modelProduct.DFiyat = $event"
              :disabled="id == 0"
            />
          </div>
        </div>
        <div class="row mt-3">
          <div class="col">
            <Button
              type="button"
              severity="success"
              class="w-100"
              label="Add"
              @click="addProduct"
              :disabled="id == 0"
            />
          </div>
          <div class="col">
            <Button
              type="button"
              severity="warn"
              class="w-100"
              label="Update"
              @click="updateProduct"
              :disabled="id == 0"
            />
          </div>
          <div class="col">
            <Button
              type="button"
              severity="danger"
              class="w-100"
              label="Delete"
              @click="deleteProduct"
              :disabled="id == 0"
            />
          </div>
        </div>
        <div class="row mt-3">
          <div class="col">
            <DataTable
              :value="productsList"
              v-model:selection="selectedProductsList"
              selectionMode="single"
              @row-click="productsListSelected($event)"
              dataKey="Id"
            >
              <template #empty> No products found. </template>
              <Column headerStyle="width: 3rem">
                <template #body="slotProps">
                  <Checkbox
                    v-model="slotProps.data.selected"
                    :inputId="`cb_${slotProps.data.Id}`"
                    binary
                    @change="productsCheckbox(slotProps.data)"
                  />
                </template>
              </Column>

              <Column field="Tarih" header="Date">
                <template #body="slotProps">
                  {{ dateToString(slotProps.data.Tarih) }}
                </template>
              </Column>
              <Column field="KategoriAdi" header="Category" />
              <Column field="UrunAdi" header="Product" />
              <Column field="IslemAdi" header="Surface" />
              <Column field="EnBoy" header="Size" />
              <Column field="Kalinlik" header="Thickness" />
              <Column field="Birim" header="Unit" />

              <Column field="FobFiyat" header="Fob">
                <template #body="slotProps">
                  {{ formatPriceUsd(slotProps.data.FobFiyat) }}
                </template>
              </Column>
              <Column field="FcaFiyat" header="Fca">
                <template #body="slotProps">
                  {{ formatPriceUsd(slotProps.data.FcaFiyat) }}
                </template>
              </Column>
              <Column field="CFiyat" header="C">
                <template #body="slotProps">
                  {{ formatPriceUsd(slotProps.data.CFiyat) }}
                </template>
              </Column>
              <Column field="DFiyat" header="D">
                <template #body="slotProps">
                  {{ formatPriceUsd(slotProps.data.DFiyat) }}
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
            <Button
              type="button"
              severity="success"
              class="w-100 mb-4"
              label="Save"
              @click="process"
              :disabled="disabled_button_status"
            />
          </div>
          <div class="col" v-if="!status">
            <Button
              type="button"
              severity="danger"
              class="w-100"
              label="Delete"
              @click="deleteProcess"
            />
          </div>
        </div>
        <div class="flex flex-wrap justify-content-center gap-3 mb-4">
          <div class="flex align-items-center">
            <Checkbox v-model="follow_it" inputId="follow" binary />
            <label for="follow" class="ml-2"> Track </label>
          </div>
          <div class="flex align-items-center">
            <Checkbox v-model="model.BList" inputId="b_list" binary />
            <label for="b_list" class="ml-2"> B List </label>
          </div>
        </div>
        <FloatLabel class="mb-4">
          <Calendar
            v-model="offerDate"
            inputId="offer_date"
            style="width: 100%"
            @date-select="offerDateSelected($event)"
            dateFormat="dd/mm/yy"
          />
          <label for="offer_date">Date</label>
        </FloatLabel>
        <FloatLabel class="mb-4">
          <AutoComplete
            v-model="selectedCustomer"
            inputId="customer"
            :suggestions="filteredCustomer"
            @complete="searchCustomer($event)"
            optionLabel="MusteriAdi"
            @item-select="customerSelected($event)"
            @update:modelValue="customerInput($event)"
            :disabled="offer_customer_disabled"
          />
          <label for="customer">Customer</label>
        </FloatLabel>
        <FloatLabel class="mb-4">
          <AutoComplete
            v-model="selectedCountry"
            inputId="country"
            :suggestions="filteredCountry"
            @complete="searchCountry($event)"
            optionLabel="UlkeAdi"
            @item-select="countrySelected($event)"
            :disabled="offer_customer_disabled"
          />
          <label for="country">Country</label>
        </FloatLabel>
        <FloatLabel class="mb-4">
          <InputText id="company" v-model="customerModel.Company" />
          <label for="company">Company</label>
        </FloatLabel>
        <FloatLabel class="mb-4">
          <InputText id="mail" v-model="customerModel.Mail" />
          <label for="mail">Mail</label>
        </FloatLabel>
        <FloatLabel class="mb-4">
          <InputText id="phone" v-model="customerModel.Phone" />
          <label for="phone">Phone</label>
        </FloatLabel>
        <FloatLabel class="mb-4">
          <InputText id="adress" v-model="customerModel.Adress" />
          <label for="adress">Address</label>
        </FloatLabel>
        <FloatLabel class="mb-4">
          <Textarea
            id="description"
            v-model="customerModel.Description"
            rows="5"
            class="w-100"
          />
          <label for="description">Description</label>
        </FloatLabel>
      </div>
    </div>
  </div>
</template>

<script>
import { toIsoDate, fromIsoDate } from "~/utils/dates"
import { useLogsStore } from "~/stores/logs"

export default {
  props: {
    model: { type: Object, required: true },
    category: { type: Array, required: true },
    product: { type: Array, required: true },
    size: { type: Array, required: true },
    thickness: { type: Array, required: true },
    surface: { type: Array, required: true },
    unit: { type: Array, required: true },
    productsList: { type: Array, required: false, default: () => [] },
    modelProduct: { type: Object, required: false, default: () => ({}) },
    status: { type: Boolean, required: true },
    customer: { type: Array, required: true },
    country: { type: Array, required: true },
    customerModel: { type: Object, required: true },
    id: { type: Number, required: false, default: 0 },
    disabled_button_status: { type: Boolean, required: true },
  },
  computed: {
    logsStore() {
      return useLogsStore()
    },
    fileBase() {
      return useRuntimeConfig().public.fileServiceBase.replace(/\/+$/, "")
    },
  },
  data() {
    return {
      follow_it: false,
      selectedCheckedProductList: [],
      selectedShippedType: null,
      shippedType: [
        { id: 1, type: "FOB" },
        { id: 2, type: "FCA" },
        { id: 3, type: "C" },
        { id: 4, type: "D" },
      ],
      offer_customer_disabled: false,
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
        { id: 9, source: "Shopify" },
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
      selectedPriority: null,
      priorities: [
        { id: 1, priority: "A" },
        { id: 2, priority: "B" },
        { id: 3, priority: "C" },
        { id: 5, priority: "D" },

        { id: 4, priority: "Toplantı" },
      ],
      selectedCustomer: null,
      filteredCustomer: null,
    }
  },
  /*
   * created() KORUNDU: govde senkron (istek atmiyor, yalnizca prop'lari
   * yerel secim state'ine esliyor) ve bu bilesen SSR'da HIC mount
   * edilmiyor -- her iki kullanicisi da (offers/index.vue ve
   * customer/offer.vue) onu v-model:visible=false ile baslayan bir
   * <Dialog> icinde render ediyor.
   */
  created() {
    if (!this.status) {
      this.createdProcess()
    } else {
      this.selectedPriority = { id: 4, priority: "Toplantı" }
      this.model.TeklifOncelik = "Toplantı"

      this.offer_customer_disabled = false
    }
  },
  methods: {
    productsCheckbox(event) {
      if (event.selected) {
        this.selectedCheckedProductList.push(event)
      } else {
        const index = this.selectedCheckedProductList.findIndex(
          (x) => x.Id == event.Id
        )
        if (index != -1) {
          this.selectedCheckedProductList.splice(index, 1)
        }
      }
    },
    async proforma_excel_output() {
      const toast = useAppToast()

      if (this.selectedShippedType == null) {
        toast.error("Please select a shipped type.")
      } else {
        if (this.selectedCheckedProductList.length === 0) {
          toast.error("Please select a product.")
        } else {
          const data = {
            data: this.selectedCheckedProductList,
            shipped: this.selectedShippedType,
            model: this.model,
            customer: this.customerModel,
          }

          /*
           * `api` TANIMSIZDI -- bkz. alt nottaki "TANIMSIZ api".
           *
           * Artik Python'daki excel sunucusundan DEGIL, Nitro'dan:
           * server/routes/excel-api/offer/proforma.post.ts
           *
           * [x] IKI ADIMLI SOZLESME DUSTU (POST uret + GET indir).
           *     Eskisi paylasilan diskteki TEK bir dosyaya yaziyordu:
           *     iki satisci ayni anda proforma alirsa ikincinin POST'u
           *     birincinin dosyasini ezer ve birinci MUSTERISININ
           *     DEGIL, baskasinin faturasini indirirdi.
           *
           * [x] `if (res.status)` DUSTU: Python bir istisnada
           *     {"status": false} + HTTP 200 donuyordu; bu kosul onu
           *     yakaliyordu ama HICBIR SEY yapmiyordu -- ne hata, ne
           *     uyari. Kullanici "indir"e basiyor ve hicbir sey
           *     olmuyordu. Artik HTTP hatasinda firlatiyor ve
           *     kullaniciya bildiriliyor.
           */
          try {
            await exportExcel(
              "/excel-api/offer/proforma",
              data,
              "proforma_invoice.xlsx"
            )
          } catch (err) {
            console.error("proforma ciktisi basarisiz:", err)
            toast.error("Proforma could not be created.")
          }
        }
      }
    },
    inputSurface(event) {
      /* Yalnizca SERBEST METIN -- bkz. alt nottaki "@update:modelValue". */
      if (typeof event !== "string") return
      this.modelProduct.IslemAdi = event
    },
    inputThickness(event) {
      /* Yalnizca SERBEST METIN -- bkz. alt nottaki "@update:modelValue". */
      if (typeof event !== "string") return
      this.modelProduct.Kalinlik = event
    },
    inputSize(event) {
      /* Yalnizca SERBEST METIN -- bkz. alt nottaki "@update:modelValue". */
      if (typeof event !== "string") return
      this.modelProduct.EnBoy = event
    },
    inputProduct(event) {
      /* Yalnizca SERBEST METIN -- bkz. alt nottaki "@update:modelValue". */
      if (typeof event !== "string") return
      this.modelProduct.UrunAdi = event
    },
    inputCategory(event) {
      /* Yalnizca SERBEST METIN -- bkz. alt nottaki "@update:modelValue". */
      if (typeof event !== "string") return
      this.modelProduct.KategoriAdi = event
    },
    uploadReminder(event) {
      const toast = useAppToast()
      const fileService = useFileService()
      const offerStore = useOfferStore()
      const file = event.files[0]

      fileService.offerFile(file, this.id).then((response) => {
        if (response.Status) {
          /*
           * ALAN ADLARI DUZELTILDI -- bkz. alt nottaki
           * "YANLIS HARF BUYUKLUGU". Kaynak `teklifCloud` yaziyordu,
           * sutun adi `Teklif_Cloud`.
           */
          this.model.Teklif_Cloud = true
          this.model.Teklif_Cloud_Dosya = file.name

          const data = {
            cloud: "1",
            name: file.name,
            date: toIsoDate(this.reminder_date),
            id: this.id,
          }
          offerStore
            .setOfferReminderCloudUpload(data)
            .then((ok) => {
              this.offerFileLink = `${this.fileBase}/file/download/teklif/teklifDosya/${this.id}/${file.name}`
              if (ok) {
                toast.success("Başarıyla Kaydedildi.")
              } else {
                toast.error("Kaydetme Başarısız.")
              }
            })
            /* .catch EKLENDI -- store reject(false) ediyor, alt nota bak. */
            .catch(() => {
              toast.error("Kaydetme Başarısız.")
            })
        }
      })
    },
    __undefinedControl(value) {
      if (
        value === undefined ||
        value === null ||
        value == "" ||
        value == " " ||
        value == 0
      ) {
        return false
      } else {
        return true
      }
    },
    deleteProcess() {
      if (confirm("Are you sure you want to delete?")) {
        const data = {
          offer: this.model,
          customer: this.customerModel,
          id: this.model.Id,
        }
        this.$emit("offer_delete_emit", data)
      }
    },
    customerInput(event) {
      /*
       * Yalnizca SERBEST METIN: listeden secimde @item-select ->
       * customerSelected() zaten dogru alanlari yaziyor. Nesne gelirse
       * MusteriAdi'na nesne atanir ve Id null'a cekilerek mevcut
       * musteri YENI musteri gibi kaydedilirdi.
       */
      if (typeof event !== "string") return
      this.customerModel.MusteriAdi = event
      this.customerModel.Id = null
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
        return true
      } else {
        return false
      }
    },
    process() {
      if (this.__saveControl()) {
        alert("Hatalı Giriş")
      } else {
        this.customerModel.Kullanici = useCookie("userId").value
        this.customerModel.Company = this.__nullControl(
          this.customerModel.Company
        )
        this.customerModel.Mail = this.__nullControl(this.customerModel.Mail)
        this.customerModel.Phone = this.__nullControl(this.customerModel.Phone)
        this.customerModel.Adress = this.__nullControl(
          this.customerModel.Adress
        )
        this.customerModel.Description = this.__nullControl(
          this.customerModel.Description
        )
        this.model.TakipEt = this.follow_it

        if (this.status) {
          this.model.TakipEt = true
        }
        this.model.Id = this.id

        this.model.Tarih = toIsoDate(this.offerDate)
        const data = { offer: this.model, customer: this.customerModel }

        this.$emit("offer_process_emit", data)
      }
    },
    countrySelected(event) {
      this.customerModel.UlkeId = event.value.Id
    },
    customerSelected(event) {
      this.selectedCountry = this.country.find(
        (x) => x.Id == event.value.UlkeId
      )
      this.model.MusteriId = event.value.Id
      this.customerModel.Id = event.value.Id
      this.customerModel.UlkeId = event.value.UlkeId
      this.customerModel.MusteriAdi = event.value.MusteriAdi
      this.customerModel.Company = event.value.Company
      this.customerModel.Mail = event.value.Mail
      this.customerModel.Phone = event.value.Phone
      this.customerModel.Adress = event.value.Adress
      this.customerModel.Description = event.value.Description
    },
    searchCountry(event) {
      let results
      if (event.query.length == 0) {
        results = this.country
      } else {
        results = this.country.filter((x) => {
          return x.UlkeAdi.toLowerCase().startsWith(event.query.toLowerCase())
        })
      }
      this.filteredCountry = results
    },
    searchCustomer(event) {
      let results
      if (event.query.length == 0) {
        results = this.customer
      } else {
        results = this.customer.filter((x) => {
          return x.MusteriAdi.toLowerCase().startsWith(
            event.query.toLowerCase()
          )
        })
      }
      this.filteredCustomer = results
    },
    offerDateSelected(event) {
      this.model.Tarih = toIsoDate(event)
    },
    prioritySelected(event) {
      this.model.TeklifOncelik = event.value.priority
    },
    offerTypeSelected(event) {
      this.model.TeklifYeri = event.value.type
    },
    sourceSelected(event) {
      this.model.KaynakYeri = event.value.source
    },
    __nullControl(value) {
      if (value == "null" || value == null || value == undefined) {
        return ""
      } else {
        return value
      }
    },
    createdProcess() {
      this.offer_customer_disabled = true
      this.offerFileLink = this.model.cloudLink
      this.selectedSource = this.sources.find(
        (x) => x.source == this.model.KaynakYeri
      )
      this.selectedOfferType = this.offerTypes.find(
        (x) => x.type == this.model.TeklifYeri
      )
      this.selectedPriority = this.priorities.find(
        (x) => x.priority == this.model.TeklifOncelik
      )
      this.offerDate = fromIsoDate(this.model.Tarih)
      if (this.__undefinedControl(this.model.MusteriId)) {
        this.selectedCustomer = this.customer.find(
          (x) => x.Id == this.model.MusteriId
        )
        if (this.__undefinedControl(this.selectedCustomer.UlkeId)) {
          this.selectedCountry = this.country.find(
            (x) => x.Id == this.selectedCustomer.UlkeId
          )
          this.customerModel.UlkeId = this.selectedCustomer.UlkeId
        }
      }

      /*
       * KORUNAN KIRILGANLIK: `selectedCustomer` yalnizca yukaridaki
       * if icinde atandigi halde asagida KOSULSUZ okunuyor. MusteriId
       * bos bir teklif acilirsa burada
       *   "TypeError: Cannot read properties of undefined (reading 'Id')"
       * aliniyor -- kaynakta da aynen boyle. Guard eklemek, bugune kadar
       * patlayan bir akisi sessizce yarim veriye cevirirdi (musteri
       * panelinin bos acilmasi); davranis degisikligi oldugu icin
       * kapsama alinmadi.
       */
      this.customerModel.Id = this.selectedCustomer.Id
      this.customerModel.MusteriAdi = this.selectedCustomer.MusteriAdi

      this.customerModel.Company = this.__nullControl(
        this.selectedCustomer.Company
      )
      this.customerModel.Mail = this.__nullControl(this.selectedCustomer.Mail)
      this.customerModel.Phone = this.__nullControl(
        this.selectedCustomer.Phone
      )
      this.customerModel.Adress = this.__nullControl(
        this.selectedCustomer.Adress
      )
      this.customerModel.Description = this.__nullControl(
        this.selectedCustomer.Description
      )
      if (this.model.TakipEt) {
        this.follow_it = true
      } else {
        this.follow_it = false
      }
    },
    productReset() {
      this.offerProductDate = null
      this.selectedCategory = null
      this.selectedProduct = null
      this.selectedSize = null
      this.selectedThickness = null
      this.selectedSurface = null
      this.selectedUnit = null
      this.selectedProductsList = null
    },
    /* `x == null || x == 0 ? 0 : x` -- kaynaktaki dort ayni if/else. */
    __priceOrZero(value) {
      return value == null || value == 0 ? 0 : value
    },
    productsListSelected(event) {
      this.selectedProductsList = null
      this.offerProductDate = fromIsoDate(event.data.Tarih)
      this.selectedCategory = this.category.find(
        (x) => x.Id == event.data.KategoriId
      )
      this.selectedProduct = this.product.find((x) => x.Id == event.data.UrunId)
      this.selectedSize = this.size.find((x) => x.id == event.data.EnBoyId)
      this.selectedThickness = this.thickness.find(
        (x) => x.id == event.data.KalinlikId
      )
      this.selectedSurface = this.surface.find(
        (x) => x.Id == event.data.YuzeyIslemId
      )
      this.selectedUnit = this.unit.find((x) => x.Birim == event.data.Birim)

      /*
       * `this.modelProduct = event.data` YERINE Object.assign --
       * bkz. alt nottaki "PROP'A ATAMA". Vue 3'te prop'a atama hata
       * veriyor; alan alan kopyalamak ise bu bileşenin geri kalaninin
       * zaten yaptigi sey (`this.modelProduct.X = ...`).
       */
      Object.assign(this.modelProduct, event.data, {
        FobFiyat: this.__priceOrZero(event.data.FobFiyat),
        FcaFiyat: this.__priceOrZero(event.data.FcaFiyat),
        CFiyat: this.__priceOrZero(event.data.CFiyat),
        DFiyat: this.__priceOrZero(event.data.DFiyat),
      })
    },
    offerProductDateSelected(event) {
      this.modelProduct.Tarih = toIsoDate(event)
    },
    /*
     * Uc log metninin paylastigi "gg-aa-yyyy ss:dd" damgasi.
     * Kaynakta addProduct/updateProduct/deleteProduct ucunde de AYNI
     * yedi satir vardi; ustelik yerel degiskenin adi `date` idi ve
     * dosyanin tepesindeki `import date from "plugins/date"` modulunu
     * GOLGELIYORDU (o uc metotta date.dateToString cagrilmadigi icin
     * tesadufen patlamiyordu).
     */
    __logStamp() {
      const d = new Date()
      const month = this.__zeroControl(d.getMonth() + 1)
      const day = this.__zeroControl(d.getDate())
      const hour = this.__zeroControl(d.getHours())
      const minute = this.__zeroControl(d.getMinutes())
      return `${day}-${month}-${d.getFullYear()} ${hour}:${minute}`
    },
    __productSizeText() {
      return `${this.modelProduct.KategoriAdi}  /  ${this.modelProduct.UrunAdi}  /  ${this.modelProduct.IslemAdi} /  ${this.modelProduct.EnBoy}  /  ${this.modelProduct.Kalinlik}`
    },
    __saveLog(verb) {
      const username = useCookie("username").value
      this.logsStore.setLogs({
        description: `${username}  adlı kullanıcı  ${this.__logStamp()}  tarihinde  ${
          this.customerModel.MusteriAdi
        }  teklif müşterisin${verb}`,
        po: "",
        color: "",
      })
    },
    deleteProduct() {
      this.__saveLog(`in  ${this.__productSizeText()} cm ürününü sildi.`)
      if (confirm("Are you sure you want to delete?")) {
        useOfferStore().setOfferDetailProductsDelete(this.modelProduct.Id)
        this.productReset()
      }
    },
    updateProduct() {
      this.__saveLog(`in  ${this.__productSizeText()} cm ürününü güncelledi.`)
      useOfferStore().setOfferDetailProductsUpdate(this.modelProduct)
      this.productReset()
    },
    __zeroControl(event) {
      if (event.toString().length == 1) {
        return "0" + event.toString()
      } else {
        return event.toString()
      }
    },
    addProduct() {
      const toast = useAppToast()

      if (
        this.selectedUnit == null ||
        this.selectedUnit == undefined ||
        this.selectedUnit == ""
      ) {
        toast.error("Please select a unit.")
        return
      }
      if (
        this.selectedSurface == null ||
        this.selectedSurface == undefined ||
        this.selectedSurface == ""
      ) {
        toast.error("Please select a surface.")
        return
      }
      if (
        this.selectedThickness == null ||
        this.selectedThickness == undefined ||
        this.selectedThickness == ""
      ) {
        toast.error("Please select a thickness.")
        return
      }
      if (
        this.selectedSize == null ||
        this.selectedSize == undefined ||
        this.selectedSize == ""
      ) {
        toast.error("Please select a size.")
        return
      }
      if (
        this.selectedProduct == null ||
        this.selectedProduct == undefined ||
        this.selectedProduct == ""
      ) {
        toast.error("Please select a product.")
        return
      }
      if (
        this.selectedCategory == null ||
        this.selectedCategory == undefined ||
        this.selectedCategory == ""
      ) {
        toast.error("Please select a category.")
        return
      }

      this.__saveLog(`e  ${this.__productSizeText()} cm ürününü girdi.`)
      this.modelProduct.TeklifId = this.id
      useOfferStore().setOfferDetailProductsAdd(this.modelProduct)
      this.productReset()
    },
    unitSelected(event) {
      this.modelProduct.Birim = event.value.Birim
    },
    surfaceListSelected(event) {
      this.modelProduct.YuzeyIslemId = event.value.Id
      this.modelProduct.IslemAdi = event.value.IslemAdi
    },
    thicknessListSelected(event) {
      this.modelProduct.KalinlikId = event.value.id
      this.modelProduct.Kalinlik = event.value.Kalinlik
    },
    sizeListSelected(event) {
      this.modelProduct.EnBoyId = event.value.id
      this.modelProduct.EnBoy = event.value.EnBoy
    },
    productListSelected(event) {
      this.modelProduct.UrunId = event.value.Id
      this.modelProduct.UrunAdi = event.value.UrunAdi
    },
    categoryListSelected(event) {
      this.modelProduct.KategoriId = event.value.Id
      this.modelProduct.KategoriAdi = event.value.KategoriAdi
    },
    searchSurface(event) {
      let results
      if (event.query.length == 0) {
        results = this.surface
      } else {
        results = this.surface.filter((x) => {
          return x.IslemAdi.toLowerCase().startsWith(event.query.toLowerCase())
        })
      }
      this.filteredSurfaceList = results
    },
    searchThickness(event) {
      let results
      if (event.query.length == 0) {
        results = this.thickness
      } else {
        results = this.thickness.filter((x) => {
          return x.Kalinlik.toLowerCase().startsWith(event.query.toLowerCase())
        })
      }
      this.filteredThicknessList = results
    },
    searchSize(event) {
      let results
      if (event.query.length == 0) {
        results = this.size
      } else {
        results = this.size.filter((x) => {
          return x.EnBoy.toLowerCase().startsWith(event.query.toLowerCase())
        })
      }
      this.filteredSizeList = results
    },
    searchProduct(event) {
      let results
      if (event.query.length == 0) {
        results = this.product
      } else {
        results = this.product.filter((x) => {
          return x.UrunAdi.toLowerCase().startsWith(event.query.toLowerCase())
        })
      }
      this.filteredProductList = results
    },
    searchCategory(event) {
      let results
      if (event.query.length == 0) {
        results = this.category
      } else {
        results = this.category.filter((x) => {
          return x.KategoriAdi.toLowerCase().startsWith(
            event.query.toLowerCase()
          )
        })
      }
      this.filteredCategoryList = results
    },
  },
}
</script>

<!--
  components/offers/form.vue -> app/components/offer/Form.vue

  Otomatik ice alma adi `OfferForm` -- Nuxt 2'deki global kayit adiyla
  AYNI (plugins/components.js:307), yani IKI cagri yeri de (offers/index.vue
  ve customer/offer.vue) etiketi degistirmeden kullaniyor.

  ============================================================
  [1] PROP'A ATAMA -- VUE 3'TE KIRILIR (zorunlu duzeltme)
  ============================================================
  productsListSelected() icinde:
      this.modelProduct = event.data;

  `modelProduct` bir PROP (ebeveyn onu store'dan
  `:modelProduct="getOfferProductModel"` ile veriyor). Vue 2'de bu
  sessizce calisiyordu; Vue 3'te prop'lar readonly, atama HATA veriyor
  (find-prop-mutations bu kalibi "KIRILIR" olarak isaretliyor -- ayni
  sinif commit eaafb9e18'de de kullanici testinde ortaya cikmisti).

  Object.assign(this.modelProduct, event.data, {...}) oldu: nesnenin
  KIMLIGI korunuyor (ebeveyn ayni store nesnesini tutmaya devam ediyor)
  ve alanlar uzerine yaziliyor -- bu bileşenin geri kalani zaten
  `this.modelProduct.X = ...` seklinde alan alan yaziyor.

  TEK INCE FARK: eskiden atama sonrasi modelProduct, TABLODAKI SATIR
  NESNESINI isaret ediyordu; dolayisiyla formda bir fiyat degistirince
  alt tablodaki satir da aninda degisiyordu (ayni nesne). Artik satir
  nesnesi DEGISMIYOR, yalnizca store modeli degisiyor. Tablo, kaydetme
  sonrasi listenin yeniden cekilmesiyle guncelleniyor (zaten oyle
  calisiyordu).

  ============================================================
  [1b] @input PrimeVue 4'TE YOK -- ALTI AutoComplete (sonradan duzeltildi)
  ============================================================
  Bu dosya ilk tasindiginda (commit d894de06c) alti AutoComplete'in
  serbest metin girisi kaynaktaki gibi `@input` ile birakilmisti:

      @input="inputCategory($event)"

  YANLISTI. PrimeVue 4'un AutoComplete'i `input` ADINDA BIR EMIT
  TANIMLAMIYOR (emits: change, focus, blur, item-select, item-unselect,
  option-select, option-unselect, dropdown-click, clear, complete,
  before-show, before-hide, show, hide).

  Bildirilmeyen bir olay adi Vue'da NATIVE DOM dinleyicisine duser:
  handler'a dizge DEGIL, bir `Event` nesnesi gelir. Yani
      this.modelProduct.KategoriAdi = event
  alana bir Event NESNESI yaziyordu. Kaynakta calisiyordu, cunku
  PrimeVue 2'nin AutoComplete'i `input` ile DEGERI (dizge) emit
  ediyordu -- kaynak PrimeVue 2.10, pilot 4.5.5.

  Belirtisi: listede OLMAYAN bir kategori/urun/olcu/kalinlik/yuzey elle
  yazilip "Add" ile kaydedilince o alan bozuk gidiyordu. Hata vermez.

  Dogru karsilik `@update:modelValue`: deger yazilirken DIZGE, listeden
  secilirken NESNE, temizlenince null olur. Alti handler'a
  `typeof event !== "string"` korumasi eklendi -- kaynaktaki `@input`
  semantigi yalnizca SERBEST METIN demekti; nesne dali zaten
  @item-select ile isleniyor.

  Ayni hata sinifi ve ayni cozum cards/Form.vue'da belgelenmis
  ("EN ONEMLI: @input PrimeVue 4'TE YOK"); bu dosya ilk tasimada o notu
  atlamisti.

  NOT -- PILOTTA AYNI HATA BASKA BIR DOSYADA DA DURUYOR:
  app/components/customer/selection/Form.vue:48 hala
  `@input="inputSurface($event)"` yaziyor ve handler event'i dogrudan
  model.Surface'a atiyor. Baska bir ekran oldugu icin bu commit'in
  kapsamina alinmadi.

  ============================================================
  [2] TANIMSIZ `api` -- CALISMA ANI HATASI (zorunlu duzeltme)
  ============================================================
  proforma_excel_output() su satiri iceriyordu:
      api.post("/offer/proforma/output", data).then(...)
  ama bu dosyada `api` diye bir sey IMPORT EDILMEMIS ve tanimlanmamis
  (import satirlari yalnizca: date, Cookies, fileService). Yani "Proforma
  Excel" butonuna her basista
      ReferenceError: api is not defined
  aliniyordu ve excel HIC uretilmiyordu.

  Hedefin excel sunucusu oldugu indirme satirindan belli:
      link.href = this.getLocalUrl + "offer/proforma/output"
  ve pilotta getLocalUrl = runtimeConfig.public.excelServerBase
  (stores/local.ts:21). Bu yuzden useExcelApi() kullanildi.

  Indirme ucu de elle <a> kurmak yerine downloadFromExcelServer()'a
  verildi -- o yardimci cift egik cizgiyi normalize ediyor ve olusturdugu
  <a>'yi DOM'dan kaldiriyor (kaynak kaldirmiyordu: her indirmede body'ye
  bir olu link daha ekleniyordu).

  ============================================================
  [3] "Track" ONAY KUTUSU HIC CALISMIYORDU (zorunlu duzeltme)
  ============================================================
  Kaynak:
      <Checkbox v-model="follow_it" binary
                @update:modelValue="followChange($event)" />
      ...
      followChange(event) { this.follow_it = !this.follow_it; }

  Ayni olay IKI kez isleniyordu: v-model `follow_it`'i yeni degere
  yaziyor, hemen ardindan followChange onu TERSINE ceviriyor. Net
  sonuc: deger HIC degismiyor, kutu her tiklamada eski haline donuyor.

  `@update:modelValue` ve `followChange` KALDIRILDI; v-model tek
  basina dogru isi yapiyor. Artik "Track" isaretlenebiliyor ve
  process() icindeki `this.model.TakipEt = this.follow_it` anlamli
  hale geldi (eskiden daima baslangic degerini gonderiyordu).

  ============================================================
  [4] YANLIS HARF BUYUKLUGU -- INDIRME BUTONU ACILMIYORDU
  ============================================================
  uploadReminder() basarili yuklemede sunlari yaziyordu:
      this.model.teklifCloud      = true
      this.model.teklifCloudDosya = event.files[0].name
  Sablon ise sunu okuyor:
      :disabled="!model.Teklif_Cloud"

  Gercek sutun adlari `Teklif_Cloud` / `Teklif_Cloud_Dosya`
  (api/index.js:6640-6641). Yani yukleme BASARILI olsa bile yerel model
  guncellenmiyordu ve indirme butonu, liste yeniden cekilene kadar
  DEVRE DISI kaliyordu. Alan adlari duzeltildi.

  == ULASILAMAYAN ELSE + .catch ==
  stores/offer.ts -> setOfferReminderCloudUpload basarisizlikta
  reject(false) ediyor (resolve(false) degil), dolayisiyla cagri
  yerindeki `else { toast.error }` HIC calismiyor ve promise islenmemis
  ret olarak dusuyordu. .catch() eklendi. (Ayni kalip Proforma.vue ve
  Sample.vue'da da var.)

  == PRIMEVUE 4 / VUE 3 ZORUNLU DEGISIKLIKLERI ==

  [x] <span|div class="p-float-label"> -> <FloatLabel>  (sinif v4'te YOK)
  [x] p-button-success/warning/danger/primary/secondary -> :severity
      ("warning" severity'sinin v4'teki adi "warn")
  [x] AutoComplete `field=` -> `optionLabel=`  (v4'te field prop'u YOK;
      yoksa oneri listesi [object Object] gosterir) -- 8 AutoComplete
  [x] :visible + @update:visible -> v-model:visible  (2 Dialog)
  [x] :selection + @update:selection -> v-model:selection
  [x] bos <Column ...></Column> -> self-closing
  [x] <offerProforma>/<offerSample> -> <OfferProforma>/<OfferSample>
  [x] FileUpload'a customUpload + :auto="false" (v4'te url'siz basic
      mode secimden sonra kendi kendine yuklemeye calisiyor)
  [x] import date from "plugins/date" -> { toIsoDate, fromIsoDate }
      ACIK IMPORT ZORUNLU: ciplak `dateToString` auto-import tarafinda
      utils/formatters.js'e ("02-10-2026", GOSTERIM) cozuluyor, oysa
      bu cagrilar API'ye YAZIYOR ("2026-10-02"). Ayrinti Proforma.vue'da.
      SABLONDAKI `dateToString` ise OLDUGU GIBI BIRAKILDI -- orada
      gosterim bicimi DOGRU olan ve Nuxt 2'de de Vue.mixin uzerinden
      ayni formatters.js fonksiyonu geliyordu (plugins/components.js:418).
  [x] Cookies.get(...) -> useCookie(...).value
  [x] this.$logs.save -> useLogsStore().setLogs
  [x] this.$toast -> useAppToast()
  [x] this.$store.dispatch(...) -> useOfferStore()

  KORUNDU: confirm() ve alert() ile onay/uyari. PrimeVue'nun
  ConfirmDialog'u daha uygun olurdu ama akisi degistirir
  (orderDetail/DocumentForm.vue ile ayni karar).

  Dropdown / Calendar / TabView ADLARI KORUNDU: PrimeVue 4'te ucu de
  hala pakette (node_modules/primevue/{dropdown,calendar,tabview}) ve
  pilotun 19/18/6 dosyasi zaten bu adlari kullaniyor. Select/DatePicker/
  Tabs'a gecmek, ozellikle TabView -> Tabs'ta cocuk yapisinin tamamen
  degismesi (Tabs > TabList > Tab + TabPanels > TabPanel) demek; tasima
  degil yeniden yazim olurdu, ayri bir adima birakildi.

  == AYNI ID'YE BAGLI ETIKETLER DUZELTILDI ==
  [x] Iki Dropdown da inputId="type" tasiyordu -> "offer_type" /
      "shipped_type". Ayni belgede iki ayni id oldugu icin
      <label for="type"> ikisinden yalnizca ILKINI odakliyordu.
  [x] Iki Checkbox da inputId="follow" tasiyordu -> "follow" / "b_list".
      "B List" etiketine tiklayinca "Track" kutusu degisiyordu.
  [x] Tablodaki Checkbox inputId="cb1" SABITTI -- her satirda ayniydi;
      :inputId="`cb_${data.Id}`" oldu.
  [x] <Textarea> + etiketsiz <label>Description</label> ciftine id/for
      eklendi (etiket hicbir alana bagli degildi).

  == KALDIRILAN OLU KOD ==
  [x] `formatPoint()` -- yalnizca YORUM ICINDEKI dort <InputText>
      blogunda geciyordu (CustomInput onlarin yerini almis). Canli
      sablonda hic kullanilmiyor.
  [x] Yorumda kalan o dort <InputText> blogu da silindi (CustomInput
      ile ayni isi yapan, artik olu sablon).
  [x] `width`, `height`, `inputWidth()`, `inputHeight()`,
      `saveWidthHeight()` -- hicbiri sablonda GECMIYOR. saveWidthHeight
      `setOfferAddSize` dispatch ediyordu; o action pilotta DURUYOR
      (stores/offer.ts:78), yalnizca bu olu cagri yeri kalkti.
      ("En x Boy ekle" ozelligi yarim kalmis: arayuz hic baglanmamis.)
  [x] `__stringCharacterChange()` -- SQL tirnak kacislama yardimcisi,
      bu dosyada hicbir yerden cagrilmiyor.
  [x] `selectedOrderProducts` -- hic okunmayan bos dizi.
  [x] `process_button_disabled` -- DORT yerde atanıyor ama data()'da
      TANIMLI DEGIL ve sablonda hic okunmuyor. (Butonun disabled'i
      `disabled_button_status` PROP'undan geliyor.) Vue 3'te data()'da
      olmayan bir alana atama reaktif de olmaz; tamamen olu.
  [x] `offer_disabled_button` -- data()'da var ama sablonda hic
      okunmuyor; process() basinda true, sonunda false yapiyordu.
  [x] `reminderDateSelected()` -- govdesi BOS. Calendar'daki
      @date-select baglantisi da kaldirildi; `reminder_date` v-model
      ile zaten guncelleniyor ve uploadReminder onu okuyor.
  [x] process() icindeki yorumlanmis 15 satirlik "if (this.status)"
      blogu (modelProduct'i sifirlayip setOfferDetailProductsAdd
      dispatch ediyordu).

  == TEKRAR AZALTMA ==
  addProduct/updateProduct/deleteProduct ucunun de basinda AYNI yedi
  satirlik tarih damgasi + ayni log nesnesi vardi -> __logStamp(),
  __productSizeText(), __saveLog(). Log METINLERI birebir korundu
  (yalnizca fiil kismi degisiyor: "...müşterisine girdi" /
  "...müşterisinin güncelledi" / "...müşterisinin sildi").

  O uc metottaki yerel `const date = new Date()` ayni zamanda dosyanin
  tepesindeki `date` MODULUNU golgeliyordu; artik o import hic yok
  (yerine toIsoDate/fromIsoDate) ve yerel ad `d`.

  Dort ayni if/else blogu (FobFiyat/FcaFiyat/CFiyat/DFiyat icin
  "null ya da 0 ise 0") -> __priceOrZero().
-->
