<template>
  <div class="container">
    <Button
      type="button"
      severity="success"
      class="w-100"
      label="New"
      @click="newForm"
    />

    <SalesBgpCardGroup
      :bgpLists="bgpStore.getBgpLists"
      @bgp_detail_dialog_form="bgpDetailList($event)"
    />

    <Dialog
      v-model:visible="bgp_new_dialog"
      modal
      header="New Bgp"
      :contentStyle="{ overflow: 'visible' }"
    >
      <SalesBgpNewForm
        :countryList="sharedStore.getCountryList"
        @closed_bgp_dialog="bgp_new_dialog = false"
      />
    </Dialog>

    <Dialog
      v-model:visible="bgp_detail_list_dialog"
      modal
      :header="bgp_project_name"
    >
      <SalesBgpDetailList @bgp_detail_form_dialog="bgpDetailForm($event)" />
    </Dialog>

    <Dialog v-model:visible="bgp_detail_form_dialog_vis" modal>
      <!--
        v-if ZORUNLU: SalesBgpDetailForm sablonu kosulsuz
        formData.FirmaAdi okuyor ve created() icinde formData'nin bool
        alanlarina bakiyor. Dialog `modal` ama v-if DEGIL, yani Nuxt
        2'de bilesen bgpDetailFormData henuz dolmadan da olusabiliyordu.
      -->
      <SalesBgpDetailForm
        v-if="bgpDetailFormData"
        :formData="bgpDetailFormData"
        :projectName="bgp_project_name"
        @bgp_detail_form_dialog_closed="bgp_detail_form_dialog_vis = false"
      />
    </Dialog>
  </div>
</template>

<script>
import { useBgpStore } from "~/stores/bgp"
import { useSharedStore } from "~/stores/shared"

export default {
  computed: {
    bgpStore() {
      return useBgpStore()
    },
    sharedStore() {
      return useSharedStore()
    },
  },

  data() {
    return {
      bgp_new_dialog: false,
      bgp_detail_list_dialog: false,
      bgp_project_name: null,
      bgp_detail_form_dialog_vis: false,
      /*
       * Nuxt 2'de bu alan `[]` (BOS DIZI) ile baslatilmisti, ama her
       * zaman bir NESNE tutuyor (secilen satir ya da yeni kayit modeli).
       * Dizi bir nesne oldugu icin `v-if` testini de GECIYORDU, yani
       * form bos bir diziyle olusabiliyordu: formData.FirmaAdi undefined,
       * created() icindeki bool kontrolleri hepsi false. null dogru
       * baslangic -- v-if artik gercekten koruyor.
       */
      bgpDetailFormData: null,
    }
  },

  /*
   * [x] created() KALDIRILDI -- veri cekimi asagidaki <script setup>
   * blogunda useAsyncData ile. Gerekcesi orada.
   */

  methods: {
    bgpDetailForm(event) {
      this.bgpDetailFormData = event
      this.bgp_detail_form_dialog_vis = true
    },

    bgpDetailList(event) {
      this.bgp_project_name = event.ProjectName
      this.bgp_detail_list_dialog = true
      this.bgpStore.setBgpDetailList(event.ProjectName)
    },

    newForm() {
      this.bgp_new_dialog = true
      this.sharedStore.setCountryList()
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
 * devralir ve created() bir daha calismadigi icin kartlar hic gorunmez.
 *
 * server: false ZORUNLU -- legacy Express API'si SSR'in IC fetch yolunda
 * calismiyor (bkz. server/middleware/1.legacy-api.ts).
 *
 * Ulke listesi BURADA CEKILMIYOR: Nuxt 2'de de yalnizca "New"e
 * basildiginda cekiliyordu (newForm -> setCountryList). Davranis
 * korundu; liste 200+ satir oldugu icin sayfa acilisinda cekmemek
 * mantikli.
 */
const bgpStore = useBgpStore()

definePageMeta({ middleware: ["authority"] })

await useAsyncData("sales-bgp", () => bgpStore.setBgpList(), {
  server: false,
})
</script>

<!--
  pages/sales/bgp.vue

  Navbar bu yola link veriyordu ama sayfa pilotta YOKTU.

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] middleware: ["authority"] -> definePageMeta (gerekcesi yukarida)

  [x] mapGetters(["getCountryList", "getBgpLists"]) -> bgpStore / sharedStore
      DIKKAT: getCountryList bgp store'unda DEGIL, shared store'unda
      (shared.ts:107). Vuex'te tum moduller tek isim uzayini paylastigi
      icin bu ayrim gorunmuyordu.

  [x] Uc dispatch -> ilgili Pinia eylemi:
        setBgpList / setBgpDetailList -> bgpStore
        setCountryList                -> sharedStore
      bgp store'u pilota BU COMMIT'TE eklendi.

  [x] <bgpLists>      -> <SalesBgpCardGroup>
      <bgpNewForm>    -> <SalesBgpNewForm>
      <bgpDetailList> -> <SalesBgpDetailList>
      <bgpDetailForm> -> <SalesBgpDetailForm>
      Nuxt 2'deki `bgpLists` / `bgpList` ad cifti arasindaki tek fark
      sondaki "s" idi; hangisinin sarmalayici hangisinin kart oldugu
      anlasilmiyordu. Auto-import adlari dosya yolundan gelecegi icin
      adlar zaten degismek zorundaydi (gerekcesi BgpCardGroup.vue
      sonundaki notta).

  [x] :visible + @update:visible -> v-model:visible  (dort Dialog)

  [x] class="p-button-success w-100" -> severity="success" class="w-100"

  [x] created() -> <script setup> + useAsyncData({ server: false })

  DUZELTILDI:

  [x] bgpDetailFormData: [] -> null   (gerekcesi data() icinde)
  [x] SalesBgpDetailForm'a v-if eklendi (gerekcesi sablonda)
-->
