<template>
  <div class="container">

    <div class="row">
      <div class="col">
        <Button type="button" severity="success" class="w-100" label="New" @click="newForm" />

      </div>
      <div class="col">
        <Button class="w-100 p-button-primary" @click="customer_excel_output" label="Excel"/>

      </div>

      </div>
    <CustomerMekmarList
      :list="customerStore.getMekmarList"
      @customer_mekmar_selected_emit="customerMekmarSelected($event)"
    />
    <Dialog v-model:visible="customer_mekmar_dialog_form" header="" modal>
      <CustomerMekmarForm
        :model="model"
        :country="sharedStore.getCountryList"
        :status="customerStore.getMekmarButtonStatus"
        :users="sharedStore.getUserList"
        :orders="customerStore.getMekmarButtonStatus ? [] : customerStore.getMekmarDetailOrdersList"
        @customer_mekmar_order_po_emit="customerMekmarOrderPo($event)"
        @customer_mekmar_dialog="customer_mekmar_dialog_form = $event"
      />
    </Dialog>
    <Dialog v-model:visible="custommer_mekmar_orders_dialog_form" header="" modal>
      <CustomerMekmarOrdersPoForm
        :po="customerStore.getMekmarDetailOrdersPoList"
        @customer_order_po_selected_emit="customerOrderPoSelectedEmit($event)"
      />
    </Dialog>
    <Dialog v-model:visible="cusomer_mekmar_orders_products_dialog_form" header="" modal>
      <CustomerMekmarOrdersPoProductsForm
        :products="customerStore.getSetMekmarDetailOrdersPoProductsList"
      />
    </Dialog>
  </div>
</template>
<script>
import { useSharedStore } from "~/stores/shared"
import { useModelsStore } from "~/stores/models"
import { useCustomerStore } from "~/stores/customer"

export default {
  middleware: ["authority"],
  computed: {
    customerStore() {
      return useCustomerStore()
    },
    modelsStore() {
      return useModelsStore()
    },
    sharedStore() {
      return useSharedStore()
    },
  },
  /*
   * created() -> mounted(): created() SSR'da da calisir, icindeki async
   * is BEKLENMEZ ve liste BOS serialize edilir; hydration onu devralir,
   * created() bir daha calismadigi icin tablo bos kalir (bkz. commit
   * 2afc877e3). mounted() sunucuda hic calismaz.
   */
  mounted() {
    this.customerStore.setMekmarList();
  },
  data() {
    return {
      customer_mekmar_dialog_form: false,
      model: null,
      custommer_mekmar_orders_dialog_form: false,
      cusomer_mekmar_orders_products_dialog_form: false,
      excelColumnsField: [
        {
          label: "Firma Adı",
          field: "FirmaAdi",
        },
        {
          label: "Unvan",
          field: "Unvan",
        },
        {
          label: "Adres",
          field: "Adres",
        },
        {
          label: "Ulke",
          field: "Ulke",
        },
        {
          label: "Marketing",
          field: "Marketing",
        },
        {
          label: "Temsilci",
          field: "Temsilci",
        },
        {
          label: "Satisci Adi",
          field: "SatisciAdi",
        },
        {
          label: "Mail Adresi",
          field: "MailAdresi",
        },
        {
          label: "Telefon",
          field: "Telefon",
        },
        {
          label: "Musteri Yeri",
          field: "MusteriYeri",
        },

      ],
    };
  },
  methods: {
    customer_excel_output(){
      useExcelApi()
        .post("/customer/mekmar/excel", this.customerStore.getMekmarList)
        .then((response) => {
          if (response.status) {
            downloadFromExcelServer(
              "customer/mekmar/excel",
              "Customers.xlsx"
            );
          }
        });
    },
    customerOrderPoSelectedEmit(po) {
      this.customerStore.setMekmarDetailOrdersPoProductsList(po);
      this.cusomer_mekmar_orders_products_dialog_form = true;
    },
    customerMekmarOrderPo(event) {
      this.custommer_mekmar_orders_dialog_form = true;
      this.customerStore.setMekmarDetailOrdersPoList(event);
    },
    newForm() {
      this.modelsStore.setCustomerModel();
      this.model = this.modelsStore.getCustomerModel;
      this.customerStore.setMekmarButtonStatus(true);
      this.customer_mekmar_dialog_form = true;
    },
    customerMekmarSelected(event) {
      this.model = event.data;
      this.customerStore.setMekmarButtonStatus(false);
      this.customer_mekmar_dialog_form = true;
    },
  },
};
</script>
<script setup>
/*
 * definePageMeta yalnizca <script setup> icinde cagrilabilir -> Options
 * API sayfalarinda ikinci bir script blogu gerekiyor.
 *
 * ZORUNLU: Options API'deki `middleware: [...]` anahtari Nuxt 3+'ta YOK
 * SAYILIR -- hata vermez, yetki kisitlamasi SESSIZCE kalkar
 * (bkz. commit 5fc77edb1). Yukaridaki Options blogunda duran anahtar
 * belge olarak birakildi, isi yapan BU satir.
 */
definePageMeta({ middleware: ["authority"] })

/*
 * REFERANS LISTESI -- ULKELER
 *
 * Nuxt 2'de layouts/default.vue'nun created()'i cekiyordu; pilotun
 * layout'u o 25 liste cagrisini bilerek erteledi, ama bu sayfa
 * tasinirken kendi ihtiyaci eklenmedi -- forma `:country` olarak gecen liste BOS geliyordu
 * (Country acilir menusu hic oneri vermiyordu).
 * Hata/uyari yok: getter bos dizi donuyor.
 */
const mekmarSharedStore = useSharedStore()

await useReferenceData("customer-mekmar", [
  ["countryList", () => mekmarSharedStore.setCountryList()],
])
</script>
