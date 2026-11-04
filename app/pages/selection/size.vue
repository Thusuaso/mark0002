<template>
  <div class="container">
    <Button type="button" severity="success" class="w-100" label="New" @click="newForm" />
    <CrateList
      :list="selectionStore.getProductionCrateSizeList"
      @size_selected_model_emit="sizeSelectedModel($event)"
    />
    <Dialog v-model:visible="production_crate_size_dialog_form" header="" modal>
      <CrateForm
        :supplier="sharedStore.getSupplierList"
        :model="model"
        :status="selectionStore.getProductionCrateSizeButtonStatus"
        @selection_production_crate_size_dialog_close="
          production_crate_size_dialog_form = false
        "
      />
    </Dialog>
  </div>
</template>
<script>
import { useSharedStore } from "~/stores/shared"
import { useSelectionStore } from "~/stores/selection"
export default {
  middleware: ["authority"],
  computed: {
    selectionStore() {
      return useSelectionStore()
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
    this.selectionStore.setSelectionProductionCrateSizeList();
  },
  data() {
    return {
      production_crate_size_dialog_form: false,
      model: null,
    };
  },
  methods: {
    newForm() {
      const data = {
        Ebat: null,
        KasaOlculeri: null,
        Adet: null,
      };
      this.model = data;
      this.selectionStore.setSelectionProductionCrateSizeButtonStatus(true);
      this.production_crate_size_dialog_form = true;
    },
    sizeSelectedModel(event) {
      this.model = event;
      this.production_crate_size_dialog_form = true;
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
 * REFERANS LISTESI -- TEDARIKCILER
 *
 * Nuxt 2'de layouts/default.vue'nun created()'i cekiyordu; pilotun
 * layout'u o 25 liste cagrisini bilerek erteledi, ama bu sayfa
 * tasinirken kendi ihtiyaci eklenmedi -- forma `:supplier` olarak gecen liste BOS
 * geliyordu.
 * Hata/uyari yok: getter bos dizi donuyor.
 */
const sizeSharedStore = useSharedStore()

await useReferenceData("selection-size", [
  ["supplierList", () => sizeSharedStore.setSupplierList()],
])
</script>
