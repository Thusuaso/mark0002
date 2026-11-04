<template>
  <div class="container">
    <ContainerFollowList
      :list="containerStore.getContainerUnfollowList"
      @follow-selected-dialog-emit="unfollowSelectedDialogEmit($event)"
    />

    <Dialog v-model:visible="unfollow_dialog_form" header="" modal>
      <!-- v-if gerekcesi: pages/operation/follow.vue icindeki ayni not. -->
      <ContainerFollowForm v-if="unfollowModel" :model="unfollowModel" />
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
      unfollow_dialog_form: false,
      unfollowModel: null,
    }
  },

  /*
   * [x] created() KALDIRILDI -- veri cekimi asagidaki <script setup>
   * blogunda useAsyncData ile. Gerekcesi orada.
   */

  methods: {
    unfollowSelectedDialogEmit(event) {
      this.unfollow_dialog_form = true
      this.unfollowModel = event
    },
  },
}
</script>

<script setup>
/*
 * definePageMeta yalnizca <script setup> icinde cagrilabilir; Options
 * API'deki `middleware: [...]` anahtari Nuxt 3+'ta YOK SAYILIR
 * (bkz. commit 5fc77edb1).
 *
 * useAsyncData + server: false gerekcesi pages/operation/follow.vue
 * icinde ayrintili yazildi -- bu sayfa onun ikizi, tek fark hangi
 * listenin cekildigi.
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
  "operation-container-unfollow",
  () =>
    Promise.all([
      containerStore.setContainerUnfollowList(),
      containerStore.setContainerAgencyList(),
    ]),
  { server: false },
)
</script>

<!--
  pages/operation/unfollow.vue

  Navbar bu yola link veriyordu ama sayfa pilotta YOKTU.

  Bu sayfa pages/operation/follow.vue'nun IKIZI: ayni iki bileseni
  kullaniyor, tek fark store'dan hangi listeyi aldigi
  (getContainerUnfollowList) ve hangi eylemi cagirdigi
  (setContainerUnfollowList).

  Nuxt 2'de buradaki dialog da BOS aciliyordu -- sebebi follow.vue'nun
  sonundaki notta (containerFollowForm hicbir yerde kayitli degildi).

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] middleware: ["authority"] -> definePageMeta
  [x] mapGetters(["getContainerUnfollowList"]) -> containerStore
  [x] this.$store.dispatch("setContainerUnfollowList")
         -> containerStore.setContainerUnfollowList()
  [x] <containerFollowList> -> <ContainerFollowList>
      <containerFollowForm> -> <ContainerFollowForm>
  [x] :visible + @update:visible -> v-model:visible
  [x] created() -> <script setup> + useAsyncData({ server: false })
  [x] Form'a v-if="unfollowModel" eklendi.

  NOT: Vuex state'inde bu listenin adi `containerUnollowList` idi
  (YAZIM HATASI, "f" eksik) ve getter da ayni hatali ada bakiyordu.
  Pilotta ad duzeltildi (containerUnfollowList); getter adi
  DEGISMEDI, yani bu sayfanin okudugu arayuz ayni.
-->
