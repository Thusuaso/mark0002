<template>
  <div class="container">
    <Button
      label="Yeni Firma"
      @click="container_company_dialog_form = true"
    />

    <ContainerInputForm
      :company="transportStore.getCompanyList"
      :orders="sharedStore.getOrdersAllList"
      :invoice="invoiceKindList"
    />

    <Dialog
      v-model:visible="container_company_dialog_form"
      header="Yeni Firma"
      modal
    >
      <TransportCompanyForm :company="transportStore.getCompanyList" />
    </Dialog>
  </div>
</template>

<script>
import { useTransportStore } from "~/stores/transport"
import { useSharedStore } from "~/stores/shared"

/*
 * Fatura turleri SABIT KODLU -- Nuxt 2'den birebir korundu.
 *
 * ID'ler sunucudaki fatura turu kayitlarina karsilik geliyor ve
 * ContainerInputForm bunlardan birini (7 = Gumruk) ayrica
 * invoice_document_id eslemesinde kullaniyor. Bir uca tasimak ayri bir
 * karar; degerlerin hicbiri degistirilmedi.
 */
const INVOICE_KINDS = [
  { id: 73, name: "İlaçlama" },
  { id: 7, name: "Gümrük" },
  { id: 13, name: "Navlun" },
  { id: 9, name: "Liman" },
  { id: 100, name: "Lashing" },
  { id: 101, name: "Booking" },
  { id: 102, name: "Spanzet" },
]

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
      container_company_dialog_form: false,
      invoiceKindList: INVOICE_KINDS,
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
 * ---------------------------------------------------------------------
 * setOrderAllList EKLENDI -- NUXT 2'DE HIC CAGRILMIYORDU
 * ---------------------------------------------------------------------
 * Sayfa `getOrdersAllList`i okuyup ContainerInputForm'a `orders` prop'u
 * olarak geciriyor, ama onu DOLDURAN `setOrderAllList`i NE bu sayfa NE
 * layouts/default.vue cagiriyordu. Yalnizca `setCompanyList` dispatch
 * ediliyordu.
 *
 * Sonuc: formdaki "Po" autocomplete'i HICBIR oneri gostermiyordu, yani
 * fatura girisi icin PO secilemiyordu -- ve PO olmadan save() zaten
 * calismiyor. Liste yalnizca daha once onu yukleyen baska bir sayfa
 * gezildiyse dolu oluyordu, yani davranis GEZINME SIRASINA bagliydi.
 *
 * (Ayni eksik /operation/transportlist sayfasinda da vardi -- commit
 *  bir onceki.)
 */
const transportStore = useTransportStore()
const sharedStore = useSharedStore()

definePageMeta({ middleware: ["authority"] })

await useAsyncData(
  "operation-container",
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
  pages/operation/container.vue

  Navbar bu yola link veriyordu ama sayfa pilotta YOKTU.

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] middleware: ["authority"] -> definePageMeta (gerekcesi yukarida)

  [x] mapGetters(["getCompanyList", "getOrdersAllList"])
         -> transportStore / sharedStore
      DIKKAT: ikisi AYRI store'da. getCompanyList transport store'unda
      (commit bir onceki), getOrdersAllList shared store'unda
      (shared.ts:110). Vuex'te tum moduller tek isim uzayini paylastigi
      icin bu ayrim gorunmuyordu.

  [x] this.$store.dispatch("setCompanyList")
         -> transportStore.setCompanyList()

  [x] <containerInputForm>    -> <ContainerInputForm>
      <transportCompanyForm>  -> <TransportCompanyForm>
      (Nuxt auto-import adlari dosya yolundan gelir; eski adlar
       plugins/components.js'te ELLE kayitliydi.)

  [x] :visible + @update:visible -> v-model:visible

  [x] class="p-button-primary" KALDIRILDI
      PrimeVue 4'te p-button-<severity> siniflari kaldirildi; "primary"
      zaten Button'un VARSAYILANI, yani sinif silindi ve gorunum ayni
      kaldi.

  [x] created() -> <script setup> + useAsyncData({ server: false })

  [x] invoiceKindList data icinden modul duzeyi INVOICE_KINDS sabitine
      alindi -- her bilesen ornegi icin yeniden kurulmasina gerek yok.
      Degerler degismedi.

  DUZELTILDI -- NUXT 2'DE SESSIZCE EKSIK OLAN:
  [x] setOrderAllList hic cagrilmiyordu (gerekcesi <script setup>
      icinde).
-->
