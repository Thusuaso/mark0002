<template>
  <div>
    <Button
      type="button"
      severity="success"
      class="w-100"
      label="New"
      @click="newForm"
    />

    <SalesConsiderList
      :list="salesStore.getSalesPointsOfConsiderList"
      @points_of_consider_selected_emit="pointsOfConsiderSelected($event)"
    />

    <Dialog
      v-model:visible="points_of_consider_dialog"
      header="New Points of Consider"
      modal
    >
      <!--
        v-if ZORUNLU: SalesConsiderForm sablonu `model.Hata` okuyor ve
        `model` bu sayfada null ile baslatiliyor. Dialog `modal` ama
        v-if DEGIL, yani Nuxt 2'de bilesen model null iken de
        olusabiliyor ve "Cannot read properties of null" firlatiyordu.
      -->
      <SalesConsiderForm
        v-if="model"
        :model="model"
        :status="salesStore.getSalesPointsOfConsiderButtonStatus"
        @point_of_consider_process_emit="process($event)"
        @point_of_consider_delete_emit="deleteForm($event)"
      />
    </Dialog>
  </div>
</template>

<script>
import { useSalesStore } from "~/stores/sales"
import { useModelsStore } from "~/stores/models"

export default {
  computed: {
    salesStore() {
      return useSalesStore()
    },
    modelsStore() {
      return useModelsStore()
    },
  },

  data() {
    return {
      points_of_consider_dialog: false,
      model: null,
    }
  },

  /*
   * [x] created() KALDIRILDI -- veri cekimi asagidaki <script setup>
   * blogunda useAsyncData ile. Gerekcesi orada.
   */

  methods: {
    deleteForm(event) {
      this.salesStore.setSalesPointsOfConsiderDelete(event.ID)
      this.points_of_consider_dialog = false
    },

    pointsOfConsiderSelected(event) {
      this.salesStore.setSalesPointsOfConsiderButtonStatus(false)
      this.points_of_consider_dialog = true
      this.model = event.data
    },

    save(event) {
      this.salesStore.setSalesPointsOfConsiderSave(event)
    },

    update(event) {
      this.salesStore.setSalesPointsOfConsiderUpdate(event)
    },

    process(event) {
      if (this.salesStore.getSalesPointsOfConsiderButtonStatus) {
        this.save(event)
      } else {
        this.update(event)
      }
    },

    newForm() {
      this.modelsStore.setSalesPointsOfConsiderModel()
      this.salesStore.setSalesPointsOfConsiderButtonStatus(true)
      this.points_of_consider_dialog = true
      this.model = this.modelsStore.getSalesPointOfConsiderModel
    },
  },
}
</script>

<script setup>
/*
 * definePageMeta yalnizca <script setup> icinde cagrilabilir ->
 * Options API sayfalarinda ikinci bir script blogu gerekiyor. Options
 * API'deki `middleware: [...]` anahtari Nuxt 3+'ta YOK SAYILIR: hata
 * vermez, kisitlama sessizce kalkar (bkz. commit 5fc77edb1).
 *
 * Veri cekimi NEDEN created() icinde degil: SSR created() icindeki async
 * isi BEKLEMEZ -- liste bos serialize edilir, client hydration onu
 * devralir ve created() bir daha calismadigi icin tablo bos kalir.
 *
 * server: false ZORUNLU -- legacy Express API'si SSR'in IC fetch yolunda
 * calismiyor (bkz. server/middleware/1.legacy-api.ts).
 */
const salesStore = useSalesStore()

definePageMeta({ middleware: ["authority"] })

await useAsyncData(
  "sales-consider",
  () => salesStore.setSalesPointsOfConsiderList(),
  { server: false },
)
</script>

<!--
  pages/sales/consider.vue

  Navbar bu yola link veriyordu ama sayfa pilotta YOKTU.

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] middleware: ["authority"] -> definePageMeta (gerekcesi yukarida)

  [x] mapGetters([...3 getter]) -> salesStore / modelsStore
      DIKKAT: getSalesPointOfConsiderModel sales store'unda DEGIL,
      models store'unda. Vuex'te tum moduller tek isim uzayini
      paylastigi icin bu ayrim gorunmuyordu; Pinia'da iki ayri store.

  [x] Alti dispatch -> ilgili Pinia eylemi.
      setSalesPointsOfConsiderModel models store'una, geri kalani sales
      store'una gidiyor. sales store'u pilota BU COMMIT'TE eklendi.

  [x] <salesConsiderList> -> <SalesConsiderList>
      <salesConsiderForm> -> <SalesConsiderForm>

  [x] :visible + @update:visible -> v-model:visible

  [x] class="p-button-success w-100" -> severity="success" class="w-100"

  [x] created() -> <script setup> + useAsyncData({ server: false })

  [x] <style scoped></style> KALDIRILDI -- bostu.

  [x] Form'a v-if="model" EKLENDI (gerekcesi sablonda).
-->
