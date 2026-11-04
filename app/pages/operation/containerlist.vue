<template>
  <div class="container">
    <ContainerInputList :list="containerStore.getContainerInputList" />
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
 * isi BEKLEMEZ -- liste bos serialize edilir, client hydration onu
 * devralir ve created() bir daha calismadigi icin tablo bos kalir.
 *
 * server: false ZORUNLU -- legacy Express API'si SSR'in IC fetch yolunda
 * calismiyor (bkz. server/middleware/1.legacy-api.ts).
 */
const containerStore = useContainerStore()

definePageMeta({ middleware: ["authority"] })

await useAsyncData(
  "operation-container-input-list",
  () => containerStore.setContainerInputList(),
  { server: false },
)
</script>

<!--
  pages/operation/containerlist.vue

  Navbar bu yola link veriyordu ama sayfa pilotta YOKTU.

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] middleware: ["authority"] -> definePageMeta
  [x] mapGetters(["getContainerInputList"]) -> containerStore
  [x] this.$store.dispatch("setContainerInputList")
         -> containerStore.setContainerInputList()
      Store pilota BU COMMIT'TE eklendi (app/stores/container.ts).
  [x] <containerInputList> -> <ContainerInputList>
  [x] created() -> <script setup> + useAsyncData({ server: false })

  NOT: bu sayfa Nuxt 2'de de yalnizca listeyi gosteriyordu; girdi
  KAYDETME ekrani ayri (components/container/input/form.vue, 335 satir)
  ve onu kullanan pages/operation/container.vue henuz tasinmadi --
  `transport` store'una (setCompanyList) bagli oldugu icin ayri bir
  commit'e kaldi.
-->
