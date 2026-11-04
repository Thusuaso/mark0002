<template>
  <div class="container">
    <SalesRepresentativeList
      :list="representativeStore.getRepresentativeList"
      :orderer="representativeStore.getTotalRepresentative"
      :operation="representativeStore.getTotalOperation"
      @representative_form_emit="representativeFormEmit($event)"
    />
    <Dialog
      v-model:visible="representative_form_dialog"
      modal
      :header="representativeOrderNo"
    >
      <!--
        v-if ZORUNLU: SalesRepresentativeForm created() icinde
        this.data.SiparisSahibi okuyor. Dialog kapaliyken
        representativeModelData null oldugu icin bilesen olusturulursa
        "Cannot read properties of null" firlatir.

        Nuxt 2'de de ayni risk vardi ama orada Dialog icerigi
        gorunurlukle birlikte olusuyordu; burada acik tutmak yerine
        kosulu ACIKCA yaziyoruz -- `data` prop'u required:true.
      -->
      <SalesRepresentativeForm
        v-if="representativeModelData"
        :data="representativeModelData"
        :users="sharedStore.getUserList"
      />
    </Dialog>
  </div>
</template>

<script>
import { useRepresentativeStore } from "~/stores/representative"
import { useSharedStore } from "~/stores/shared"

export default {
  computed: {
    representativeStore() {
      return useRepresentativeStore()
    },
    sharedStore() {
      return useSharedStore()
    },
  },

  data() {
    return {
      representative_form_dialog: false,
      representativeModelData: null,
      representativeOrderNo: null,
    }
  },

  /*
   * [x] created() KALDIRILDI -- veri cekimi asagidaki <script setup>
   * blogunda useAsyncData ile. Gerekcesi orada.
   */

  methods: {
    representativeFormEmit(event) {
      this.representativeModelData = event
      this.representativeOrderNo = event.SiparisNo
      this.representative_form_dialog = true
    },
  },
}
</script>

<script setup>
/*
 * definePageMeta yalnizca <script setup> icinde cagrilabilir ->
 * Options API sayfalarinda ikinci bir script blogu gerekiyor.
 * Options API'deki `middleware: [...]` anahtari Nuxt 3+'ta YOK SAYILIR:
 * hata vermez, kisitlama sessizce kalkar (bu tuzak commit 5fc77edb1'de
 * iki mali rapor sayfasinda yakalandi).
 *
 * Veri cekimi NEDEN created() icinde degil: SSR created() icindeki async
 * isi BEKLEMEZ -- liste bos serialize edilir, client hydration onu
 * devralir ve created() bir daha calismadigi icin tablo bos kalir.
 *
 * server: false ZORUNLU -- legacy Express API'si SSR'in IC fetch yolunda
 * calismiyor (bkz. server/middleware/1.legacy-api.ts).
 *
 * Kullanici listesi burada cekilmiyor: SalesRepresentativeForm'un
 * `users` prop'u shared store'dan geliyor ve onu layouts/default.vue
 * dolduruyor (useAsyncData("layout-user-list")). Nuxt 2'de de layout'tan
 * geliyordu.
 */
const representativeStore = useRepresentativeStore()

definePageMeta({ middleware: ["authority"] })

await useAsyncData(
  "sales-representative",
  () => representativeStore.setRepresentativeList(),
  { server: false },
)
</script>

<!--
  pages/sales/representative.vue

  Navbar bu yola link veriyordu ama sayfa pilotta YOKTU.

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] middleware: ["authority"] -> definePageMeta (gerekcesi yukarida)

  [x] mapGetters([...4 getter]) -> representativeStore / sharedStore
      getUserList representative store'unda DEGIL, shared store'unda.

  [x] this.$store.dispatch("setRepresentativeList")
         -> representativeStore.setRepresentativeList()
      Store pilota BU COMMIT'TE eklendi (app/stores/representative.ts).

  [x] <representativeList> -> <SalesRepresentativeList>
      <representativeForm> -> <SalesRepresentativeForm>
      (Nuxt auto-import adlari dosya yolundan gelir.)

  [x] :visible + @update:visible -> v-model:visible

  [x] created() -> <script setup> + useAsyncData({ server: false })

  [x] Form'a v-if="representativeModelData" EKLENDI (gerekcesi sablonda).
-->
