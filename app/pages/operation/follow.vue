<template>
  <div class="container">
    <ContainerFollowList
      :list="containerStore.getContainerFollowList"
      @follow-selected-dialog-emit="followSelectedDialogEmit($event)"
    />

    <Dialog v-model:visible="follow_dialog_form" header="" modal>
      <!--
        v-if ZORUNLU: ContainerFollowForm created() icinde kosulsuz
        model.KonteynerNo okuyor ve followModel burada null ile
        baslatiliyor. Dialog `modal` ama v-if DEGIL.
      -->
      <ContainerFollowForm v-if="followModel" :model="followModel" />
    </Dialog>
  </div>
</template>

<script>
import { useContainerStore } from "~/stores/container"

export default {
  computed: {
    containerStore() {
      return useContainerStore()
    },
  },

  data() {
    return {
      follow_dialog_form: false,
      followModel: null,
    }
  },

  /*
   * [x] created() KALDIRILDI -- veri cekimi asagidaki <script setup>
   * blogunda useAsyncData ile. Gerekcesi orada.
   */

  methods: {
    followSelectedDialogEmit(event) {
      this.follow_dialog_form = true
      this.followModel = event
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
const containerStore = useContainerStore()

definePageMeta({ middleware: ["authority"] })

/*
 * ACENTE LISTESI DE CEKILIYOR -- upstream f22fe601b ile geldi.
 * Formdaki acente dropdown'i ve listedeki takip linki buna bagli;
 * cekilmezse dropdown bos acilir ve link hic gorunmez.
 *
 * Ayni useAsyncData icinde Promise.all ile: iki istek paralel gider
 * ve ikinci bir hidrasyon adimi olusmaz.
 */
await useAsyncData(
  "operation-container-follow",
  () =>
    Promise.all([
      containerStore.setContainerFollowList(),
      containerStore.setContainerAgencyList(),
    ]),
  { server: false },
)
</script>

<!--
  pages/operation/follow.vue

  Navbar bu yola link veriyordu ama sayfa pilotta YOKTU.

  === BU EKRANDAKI DIALOG NUXT 2'DE BOS ACILIYORDU ===

  Sablondaki `<containerFollowForm />` adi plugins/components.js'te
  KAYITLI DEGILDI (ayrinti: components/container/FollowForm.vue sonundaki
  not). Nuxt 2'de cozulemeyen etiket yalnizca konsol uyarisi olur, bilesen
  SESSIZCE yok olur -- yani satira tiklayinca acilan dialog BOSTU ve takip
  bilgisi bu ekrandan hic kaydedilemiyordu.

  Nuxt 3+ auto-import adi dosya yolundan urettigi icin form artik
  cozuluyor.

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] middleware: ["authority"] -> definePageMeta (gerekcesi yukarida)
  [x] mapGetters(["getContainerFollowList"]) -> containerStore
  [x] this.$store.dispatch("setContainerFollowList")
         -> containerStore.setContainerFollowList()
      Store pilota BU COMMIT'TE eklendi (app/stores/container.ts).
  [x] <containerFollowList> -> <ContainerFollowList>
      <containerFollowForm> -> <ContainerFollowForm>
  [x] :visible + @update:visible -> v-model:visible
  [x] created() -> <script setup> + useAsyncData({ server: false })
  [x] Form'a v-if="followModel" eklendi (gerekcesi sablonda).
-->
