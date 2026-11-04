<template>
  <div class="container">
    <Button type="button" severity="success" label="New" @click="newForm" />
    <CustomerSelectionList
      :list="customerStore.getSelectionCustomerList"
      @selection_customer_selected_emit="selectionCustomerSelected($event)"
    />
    <Dialog v-model:visible="customer_selection_dialog_form" header="" modal>
      <CustomerSelectionForm
        :model="model"
        :surface="sharedStore.getSelectionSurfaces"
        :button="customerStore.getSelectionCustomerButtonStatus"
        :country="sharedStore.getCountryList"
        @surface_customer_process_emit="process($event)"
        @surface_customer_delete_emit="deleteForm($event)"
      />
    </Dialog>
  </div>
</template>

<script>
import { useSharedStore } from "~/stores/shared"
import { useModelsStore } from "~/stores/models"
import { useCustomerStore } from "~/stores/customer"
export default {
  middleware: ["authority", "selectionCustomer"],
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
  data() {
    return {
      surfacesList: [],
      customer_selection_dialog_form: false,
      model: null,
    };
  },
  mounted() {
    this.customerStore.setSelectionCustomerList(useCookie('userId').value);

  },
  methods: {
    deleteForm(id) {
      this.customerStore.setSelectionCustomerDelete(id);
      this.customer_selection_dialog_form = false;
    },
    update(event) {
      this.customerStore.setSelectionCustomerUpdate(event);
      this.customer_selection_dialog_form = false;
    },
    save(event) {
      event.UserId = useCookie("userId").value;
      this.customerStore.setSelectionCustomerSave(event);
      this.customer_selection_dialog_form = false;
    },
    process(event) {
      if (this.customerStore.getSelectionCustomerButtonStatus) {
        this.save(event);
      } else {
        this.update(event);
      }
    },
    newForm() {
      this.modelsStore.setSelectionCustomerModel();
      this.customerStore.setSelectionCustomerButtonStatus(true);
      this.model = this.modelsStore.getSelectionCustomerModel;
      this.customer_selection_dialog_form = true;
    },
    selectionCustomerSelected(event) {
      this.customerStore.setSelectionCustomerButtonStatus(false);
      this.model = event.data;
      this.customer_selection_dialog_form = true;
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
 * REFERANS LISTESI -- ULKELER + YUZEY ISLEMLERI
 *
 * Nuxt 2'de layouts/default.vue'nun created()'i cekiyordu; pilotun
 * layout'u o 25 liste cagrisini bilerek erteledi, ama bu sayfa
 * tasinirken kendi ihtiyaci eklenmedi -- forma `:country` ve `:surface` olarak gecen iki
 * liste BOS geliyordu.
 * Hata/uyari yok: getter bos dizi donuyor.
 */
const custSelSharedStore = useSharedStore()

await useReferenceData("customer-selection", [
  ["countryList", () => custSelSharedStore.setCountryList()],
  ["selectionSurfaces", () => custSelSharedStore.setSelectionSurfaces()],
])
</script>
