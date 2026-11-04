<template>
  <div class="container">
    <TransportInputForm
      :company="transportStore.getCompanyList"
      :orders="sharedStore.getOrdersAllList"
      @new-company-form-dialog="new_form_dialog = true"
    />

    <Dialog v-model:visible="new_form_dialog" header="New Company" modal>
      <TransportCompanyForm :company="transportStore.getCompanyList" />
    </Dialog>
  </div>
</template>

<script>
import { useTransportStore } from "~/stores/transport"
import { useSharedStore } from "~/stores/shared"

export default {
  computed: {
    transportStore() {
      return useTransportStore()
    },
    sharedStore() {
      return useSharedStore()
    },
  },

  data() {
    return {
      new_form_dialog: false,
    }
  },

  /*
   * [x] created() KALDIRILDI -- veri cekimi asagidaki <script setup>
   * blogunda useAsyncData ile. Gerekcesi orada.
   */
}
</script>

<script setup>
/*
 * definePageMeta yalnizca <script setup> icinde cagrilabilir; Options
 * API'deki `middleware: [...]` anahtari Nuxt 3+'ta YOK SAYILIR
 * (bkz. commit 5fc77edb1).
 *
 * Veri cekimi NEDEN created() icinde degil: SSR created() icindeki async
 * isi BEKLEMEZ -- listeler bos serialize edilir, client hydration onu
 * devralir ve created() bir daha calismadigi icin alanlar bos kalir.
 *
 * server: false ZORUNLU -- legacy Express API'si SSR'in IC fetch yolunda
 * calismiyor (bkz. server/middleware/1.legacy-api.ts).
 *
 * setOrderAllList EKLENDI -- NUXT 2'DE HIC CAGRILMIYORDU: sayfa
 * `getOrdersAllList`i okuyup forma `orders` prop'u olarak geciriyor ama
 * onu dolduran eylemi NE sayfa NE layout cagiriyordu (yalnizca
 * setCompanyList). Sonuc: "Order No" autocomplete'i hicbir oneri
 * gostermiyordu ve PO secilemedigi icin kayit da yapilamiyordu.
 * Ayni eksik /operation/container ve /operation/transportlist
 * sayfalarinda da vardi.
 */
const transportStore = useTransportStore()
const sharedStore = useSharedStore()

definePageMeta({ middleware: ["authority"] })

await useAsyncData(
  "operation-transport",
  async () => {
    await Promise.all([
      transportStore.setCompanyList(),
      sharedStore.setOrderAllList(),
    ])
    return true
  },
  { server: false },
)
</script>

<!--
  pages/operation/transport.vue

  Navbar bu yola link veriyordu ama sayfa pilotta YOKTU. Bu commit'le
  operation/* grubundaki nakliye-konteyner ucgeni tamamlandi
  (container, transport, transportlist).

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] middleware: ["authority"] -> definePageMeta (gerekcesi yukarida)

  [x] mapGetters(["getCompanyList", "getOrdersAllList"])
         -> transportStore / sharedStore
      DIKKAT: ikisi AYRI store'da. getCompanyList transport store'unda,
      getOrdersAllList shared store'unda (shared.ts:110). Vuex'te tum
      moduller tek isim uzayini paylastigi icin bu ayrim gorunmuyordu.

  [x] this.$store.dispatch("setCompanyList")
         -> transportStore.setCompanyList()

  [x] <transportInput>       -> <TransportInputForm>
      <transportCompanyForm> -> <TransportCompanyForm>

  [x] :visible + @update:visible -> v-model:visible

  [x] created() -> <script setup> + useAsyncData({ server: false })

  DUZELTILDI -- NUXT 2'DE SESSIZCE EKSIK OLAN:
  [x] setOrderAllList hic cagrilmiyordu (gerekcesi <script setup>
      icinde).
-->
