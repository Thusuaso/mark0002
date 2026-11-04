<template>
  <div>
    <Button severity="success" class="w-100" label="Add" @click="newForm" />

    <SalesImportantLinksList
      :list="importantLinkStore.getImportantLinkList"
      @link_list_selected_emit="linkListSelected($event)"
    />

    <Dialog v-model:visible="important_link_dialog" :header="header" modal>
      <SalesImportantLinksForm
        :status="status"
        :model="model"
        @set_status_button="setStatusButton"
      />
    </Dialog>
  </div>
</template>

<script>
import { useImportantLinkStore } from "~/stores/importantLink"

/*
 * Bos form nesnesi. Nuxt 2'de ayni nesne IKI YERDE (data() ve newForm())
 * birebir tekrar ediliyordu; tek yerde toplandi.
 *
 * Cerezler her cagrida yeniden okunuyor: kullanici degisirse (ya da
 * data() calistigi anda cerez henuz yazilmamissa) dogru deger gelsin.
 * Nuxt 2'de data() icindeki kopya SAYFA ILK OLUSURKEN bir kez
 * okunuyordu.
 */
function emptyLink() {
  return {
    ID: 0,
    Description: "",
    Link: "",
    SaveDate: new Date(),
    UpdatedUserID: useCookie("userId").value,
    Username: useCookie("username").value,
  }
}

export default {
  computed: {
    importantLinkStore() {
      return useImportantLinkStore()
    },
  },

  data() {
    return {
      important_link_dialog: false,
      header: "",
      status: false,
      model: emptyLink(),
    }
  },

  /*
   * [x] created() KALDIRILDI -- veri cekimi asagidaki <script setup>
   * blogunda useAsyncData ile. Gerekcesi orada.
   */

  methods: {
    setStatusButton() {
      this.status = false
      this.important_link_dialog = false
    },

    newForm() {
      this.important_link_dialog = true
      this.header = "Add New Important Link"
      this.status = true
      this.model = emptyLink()
    },

    linkListSelected(event) {
      this.important_link_dialog = true
      this.header = "Update Important Link"
      this.status = false
      this.model = event.data
    },
  },
}
</script>

<script setup>
/*
 * Veri cekimi NEDEN created() icinde degil: SSR created() icindeki async
 * isi BEKLEMEZ -- liste bos serialize edilir, client hydration onu
 * devralir ve created() bir daha calismadigi icin tablo bos kalir.
 *
 * server: false ZORUNLU -- legacy Express API'si SSR'in IC fetch yolunda
 * calismiyor (bkz. server/middleware/1.legacy-api.ts).
 */
const importantLinkStore = useImportantLinkStore()

await useAsyncData(
  "sales-important-links",
  () => importantLinkStore.setImportantLinkListAction(),
  { server: false },
)
</script>

<!--
  pages/sales/important-links.vue

  Navbar bu yola link veriyordu ama sayfa pilotta YOKTU.

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] mapGetters(['getImportantLinkList']) -> importantLinkStore
  [x] this.$store.dispatch('setImportantLinkListAction')
         -> importantLinkStore.setImportantLinkListAction()
  [x] <importantLinksList> -> <SalesImportantLinksList>
      <importantLinksForm> -> <SalesImportantLinksForm>
  [x] :visible + @update:visible -> v-model:visible
  [x] class="p-button-success w-100" -> severity="success" class="w-100"
      (PrimeVue 4'te p-button-<severity> siniflari kaldirildi.)
  [x] `import Cookies from 'js-cookie'` -> useCookie
  [x] created() -> <script setup> + useAsyncData({ server: false })
  [x] Iki kez tekrar eden bos model nesnesi -> emptyLink()

  DIKKAT -- BU SAYFADA `authority` MIDDLEWARE'I YOK.
      Nuxt 2'de de yoktu, bu yuzden definePageMeta EKLENMEDI. Kardes
      sayfalar (sales/todo, sales/maintodo, sales/representative)
      middleware: ["authority"] yaziyordu, bu yazmiyordu -- fark bilincli
      mi yoksa atlanmis mi belli degil, ama eklemek Nuxt 2'de olmayan bir
      kisitlama getirmek olurdu.
-->
