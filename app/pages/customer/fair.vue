<template>
  <div class="container">
    <Button type="button" severity="success" class="w-100" label="New" @click="newForm" />
    <CustomerFairList
      :list="customerStore.getFairCustomerList"
      @fair_customer_selected_emit="fairCustomerSelected($event)"
    />
    <Dialog v-model:visible="fair_customer_dialog_form" header="" modal>
      <CustomerFairForm
        :model="model"
        :country="sharedStore.getCountryList"
        :button="customerStore.getFairCustomerButtonStatus"
        @fair_customer_process_emit="process($event)"
        @fair_customer_delete_emit="fairCustomerDelete($event)"
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
  data() {
    return {
      fair_customer_dialog_form: false,
      model: null,
    };
  },
  /*
   * created() -> mounted(): created() SSR'da da calisir, icindeki async
   * is BEKLENMEZ ve liste BOS serialize edilir; hydration onu devralir,
   * created() bir daha calismadigi icin tablo bos kalir (bkz. commit
   * 2afc877e3). mounted() sunucuda hic calismaz.
   */
  mounted() {
    this.customerStore.setFairCustomerList();
  },
  methods: {
    fairCustomerDelete(id) {
      this.fair_customer_dialog_form = false;
      this.customerStore.setFairCustomerDelete(id);
    },
    update(event) {
      this.fair_customer_dialog_form = false;
      if (event.Fuar == null) {
        event.Fuar = false;
      }
      if (event.Ziyaret == null) {
        event.Ziyaret = false;
      }
      this.customerStore.setFairCustomerUpdate(event);
    },
    save(event) {
      event.Kullanici = useCookie("userId").value;
      if (event.Fuar == null) {
        event.Fuar = false;
      }
      if (event.Ziyaret == null) {
        event.Ziyaret = false;
      }
      this.customerStore.setFairCustomerSave(event);
      this.fair_customer_dialog_form = false;
    },
    process(event) {
      if (this.customerStore.getFairCustomerButtonStatus) {
        this.save(event);
      } else {
        this.update(event);
      }
    },
    newForm() {
      this.modelsStore.setFairCustomerModel();
      this.customerStore.setFairCustomerButtonStatus(true);
      this.model = this.modelsStore.getFairCustomerModel;
      this.fair_customer_dialog_form = true;
    },
    fairCustomerSelected(event) {
      this.customerStore.setFairCustomerButtonStatus(false);
      this.model = event.data;
      this.fair_customer_dialog_form = true;
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
const fairSharedStore = useSharedStore()

await useReferenceData("customer-fair", [
  ["countryList", () => fairSharedStore.setCountryList()],
])
</script>
