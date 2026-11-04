<template>
  <div class="container">
    <Button
      type="button"
      severity="success" class="w-100"
      label="New Project"
      @click="newForm"
    />
    <CustomerBgpList
      :list="customerStore.getBgpCustomerList"
      @bgp_customer_emit="bgpCustomerSelected($event)"
    />
    <Dialog v-model:visible="bgp_customer_dialog_form" modal header="">
      <CustomerBgpForm
        :model="model"
        :country="sharedStore.getCountryList"
        :button="customerStore.getBgpCustomerButtonStatus"
        @bgp_customer_process_emit="process($event)"
        @bgp_customer_delete_emit="deleteForm($event)"
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
      bgp_customer_dialog_form: false,
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
    this.customerStore.setBgpCustomerList();
  },
  methods: {
    deleteForm(event) {
      this.customerStore.setBgpCustomerDelete(event);
      this.bgp_customer_dialog_form = false;
    },
    save(event) {
      event.KullaniciId = useCookie("userId").value;
      this.customerStore.setBgpCustomerSave(event);
      this.bgp_customer_dialog_form = false;
    },
    update(event) {
      this.customerStore.setBgpCustomerUpdate(event);
      this.bgp_customer_dialog_form = false;
    },
    process(event) {
      if (this.customerStore.getBgpCustomerButtonStatus) {
        this.save(event);
      } else {
        this.update(event);
      }
    },
    bgpCustomerSelected(event) {
      this.model = event.data;
      this.bgp_customer_dialog_form = true;
      this.customerStore.setBgpCustomerButtonStatus(false);
    },
    newForm() {
      this.modelsStore.setBgpCustomerModel();
      this.model = this.modelsStore.getBgpCustomerModel;
      this.bgp_customer_dialog_form = true;
      this.customerStore.setBgpCustomerButtonStatus(true);
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
const bgpSharedStore = useSharedStore()

await useReferenceData("customer-bgp", [
  ["countryList", () => bgpSharedStore.setCountryList()],
])
</script>
