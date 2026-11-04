<template>
  <div class="container">
    <Button type="button" severity="success" class="w-100" label="New" @click="newForm" />

    <SupplierList :list="shared.getSupplierList" @supplier_model_emit="supplierModelEmit($event)" />

    <Dialog v-model:visible="supplier_form_dialog" modal header="">
      <SupplierForm
        :status="supplierStore.getSupplierButtonStatus"
        :model="model"
        :suppliers="shared.getSupplierList"
        @supplier_dialog_close_emit="supplier_form_dialog = false"
      />
    </Dialog>
  </div>
</template>

<script>
import { useSharedStore } from "~/stores/shared"
import { useSupplierStore } from "~/stores/supplier"

export default {
  // [1] middleware: ["authority"] -> definePageMeta gerekiyor (asagida)
  computed: {
    shared() {
      return useSharedStore()
    },
    supplierStore() {
      return useSupplierStore()
    },
  },
  data() {
    return {
      supplier_form_dialog: false,
      model: { FirmaAdi: null },
    }
  },
  // created() KALDIRILDI -- veri cekimi asagidaki <script setup> blogunda,
  // useAsyncData ile yapiliyor. Sebebi orada aciklandi.
  methods: {
    newForm() {
      this.model = { FirmaAdi: null }
      this.supplierStore.setSupplierButtonStatus(true)
      this.supplier_form_dialog = true
    },
    supplierModelEmit(event) {
      this.model = event
      this.supplierStore.setSupplierButtonStatus(false)
      this.supplier_form_dialog = true
    },
  },
}
</script>

<script setup>
// definePageMeta yalnizca <script setup> icinde kullanilabilir ->
// Options API sayfalarinda IKINCI bir script blogu gerekiyor.
definePageMeta({ middleware: ["authority"] })

/*
 * Veri cekimi NEDEN created() icinde degil:
 *
 * Vue, SSR sirasinda created() icindeki async isi BEKLEMEZ. Nuxt 2'de de
 * oyleydi (bkz. orijinal pages/operation/supplier.vue), ama orada sonucu
 * sadece "tablo ilk render'da bos gelir, client doldurur" oluyordu.
 * Pinia + Nuxt 3+'ta ayni desen iki ek soruna yol aciyor:
 *
 *  1) Yaris: render bitince Pinia state payload'a yazilir. Fetch henuz
 *     bitmediyse liste BOS serialize edilir, client hydration o bos
 *     listeyi devralir ve created() bir daha calismadigi icin tablo bos
 *     kalir.
 *  2) Takilan spinner: loading sayaci begin'den sonra, end'den once
 *     serialize edilir -> payload'da loading=1. Client bunu devralir,
 *     kendi created()'inda 2 yapar, fetch bitince 1'e doner ve orada
 *     KALIR. Veri gelmesine ragmen spinner hic durmaz.
 *
 * useAsyncData SSR tarafindan beklenir: fetch tamamlanmadan render
 * bitmez, dolayisiyla payload hem dolu listeyi hem loading=0'i tasir.
 * Ayni istek client'ta tekrar edilmez.
 */
const sharedStore = useSharedStore()

await useAsyncData(
  "operation-supplier-list",
  () => sharedStore.setSupplierList(),
  {
    /*
     * server: false ZORUNLU -- bkz. server/middleware/1.legacy-api.ts
     * Legacy Express API'si SSR'in IC fetch yolunda calismiyor:
     * event.node.res gercek bir ServerResponse olmadigi icin Express'in
     * res.json() -> res.get("content-type") cagrisi patliyor veya istek
     * asili kaliyor. Bu yuzden cagri yalnizca client tarafinda yapiliyor.
     *
     * Nuxt 2 de bu veriyi SSR'da getirmiyordu (created() beklenmiyordu),
     * dolayisiyla davranis kaybi yok. useAsyncData hala gerekli: loading
     * sayacinin payload'a 1 olarak yazilip spinner'i kilitlemesini
     * engelliyor.
     */
    server: false,
  },
)
</script>

<!--
  Bu dosyada ZORUNLU degisiklikler:
  [1] middleware: ["authority"] (Options API) -> definePageMeta({...}) ve bunun
      icin ayri bir <script setup> blogu. 40 sayfada ayni mudahale gerekiyor.
  [2] :visible.sync="supplier_form_dialog" -> v-model:visible="..."
  [3] class="p-button-success" -> severity="success"
  [4] <supplierList> / <supplierForm>: plugins/components.js'teki 541 satirlik
      elle kayit SILINDI; Nuxt auto-import klasor adindan PascalCase isim uretir
      -> components/supplier/List.vue = <SupplierList>. Tum sablonlarda etiket
      adlari bu kurala gore gozden gecirilmeli.
  [5] mapGetters -> Pinia store computed'leri.
-->
