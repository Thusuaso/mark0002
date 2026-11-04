<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <Button
          type="button"
          severity="success" class="w-100"
          label="New"
          @click="newForm"
        />
      </div>
      <div class="col">
        <Select
          v-model="selectedYear"
          :options="sampleStore.getSampleYearList"
          optionLabel="Yil"
          @change="yearSelected($event)"
          class="w-100"
        />
      </div>
    </div>
    <SampleList
      :list="sampleStore.getSampleList"
      @sample_selected_list="sampleSelectedList($event)"
    />
    <Dialog
      v-model:visible="sample_form_dialog"
      :header="''"
      modal
      :style="{ width: '100%' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <SampleForm
        :model="model"
        :customers="sharedStore.getCustomersOfferList"
        :country="sharedStore.getCountryList"
        :users="sharedStore.getUserList"
        :category="sharedStore.getSampleCategoryList"
        :unit="sharedStore.getSampleUnitList"
        :sending="sharedStore.getSampleSendingList"
        :bank="sharedStore.getSampleBankAccountTypeList"
        :paid="sampleStore.getSamplePaidList"
        @process="process($event)"
        :status="sampleStore.getSampleButtonStatus"
        @delete_process="deleteProcess($event)"
      />
    </Dialog>
  </div>
</template>
<script>
import { useSharedStore } from "~/stores/shared"
import { useModelsStore } from "~/stores/models"
import { useSampleStore } from "~/stores/sample"
export default {
  middleware: ["authority"],
  computed: {
    modelsStore() {
      return useModelsStore()
    },
    sampleStore() {
      return useSampleStore()
    },
    sharedStore() {
      return useSharedStore()
    },
  },
  /*
   * beforeCreate() -> mounted(): SAYFA 500 VERIYORDU.
   *
   * Kaynakta `beforeCreate() { this.$store.dispatch("setSampleList") }`
   * yaziyordu ve Vuex'te calisiyordu, cunku $store bilesene ENJEKTE
   * edilmis bir ozellik -- beforeCreate'te hazir. Pilotta store bir
   * COMPUTED (`sampleStore()`), computed'lar ise beforeCreate'te HENUZ
   * KURULMAMIS olur: this.sampleStore undefined.
   *
   * Ustelik beforeCreate SSR'da da calistigi icin hata sunucuda firliyor
   * ve sayfa hic acilmiyordu:
   *     500  Cannot read properties of undefined (reading 'setSampleList')
   *
   * mounted() hem sunucuda hic calismaz (legacy API SSR'da kullanilamiyor,
   * bkz. server/middleware/1.legacy-api.ts) hem de computed'lar hazirdir.
   * Ayni duzeltme pages/reports/mekmar/gu.vue'da yapilmisti, bu sayfa
   * atlanmis.
   */
  mounted() {
    this.sampleStore.setSampleList();
  },
  data() {
    return {
      selectedYear: { Yil: new Date().getFullYear() },
      sample_form_dialog: false,
      model: {},
    };
  },
  methods: {
    sampleSelectedList(event) {
      this.model = event.data;
      this.sampleStore.setSampleButtonStatus(false);
      this.sampleStore.setSampleDetailPaidList(this.model.NumuneNo);
      this.sample_form_dialog = true;
    },
    deleteProcess(event) {
      this.sampleStore.setSampleDelete(event);
      this.sample_form_dialog = false;
    },
    process(event) {
      if (this.sampleStore.getSampleButtonStatus) {
        this.save(event);
      } else {
        this.update(event);
      }
    },
    save(event) {
      this.sampleStore.setSampleSave(event);
      this.sample_form_dialog = false;
    },
    update(event) {
      



      this.sampleStore.setSampleUpdate(event);
      this.sample_form_dialog = false;
    },
    yearSelected(event) {
      this.sampleStore.setSampleListYear(event.value.Yil);
    },
    newForm() {
      this.modelsStore.setSampleModel();
      this.sampleStore.setSampleButtonStatus(true);
      this.model = this.modelsStore.getSampleModel;
      this.sample_form_dialog = true;
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
 * (bkz. commit 5fc77edb1).
 */
definePageMeta({ middleware: ["authority"] })

/*
 * REFERANS LISTESI -- NUMUNE FORMUNUN ALTI LISTESI
 *
 * Nuxt 2'de layouts/default.vue'nun created()'i cekiyordu; pilotun
 * layout'u o 25 liste cagrisini bilerek erteledi, ama bu sayfa
 * tasinirken kendi ihtiyaci eklenmedi -- numune formuna `:customers`, `:country`,
 * `:category`, `:unit`, `:sending`, `:bank` olarak gecen ALTI liste
 * BOS geliyordu, yani form fiilen doldurulamiyordu.
 * Hata/uyari yok: getter bos dizi donuyor.
 */
const sampleSharedStore = useSharedStore()

await useReferenceData("sample-form", [
  ["customersOfferList", () => sampleSharedStore.setCustomersOfferList()],
  ["countryList", () => sampleSharedStore.setCountryList()],
  ["sampleCategoryList", () => sampleSharedStore.setSampleCategoryList()],
  ["sampleUnitList", () => sampleSharedStore.setSampleUnitList()],
  ["sampleSendingList", () => sampleSharedStore.setSampleSendingTypeList()],
  ["sampleBankAccountTypeList", () => sampleSharedStore.setSampleBankAccountTypeList()],
])
</script>
