<template>
  <!--
    `container-fluid` ZORUNLU -- KOK <div> CIPLAK OLAMAZ.

    Bootstrap'in `.row`'u negatif kenar boslugu tasir
    (margin-inline: calc(-.5 * var(--bs-gutter-x)) = -12px) ve bunun
    `.container` / `.container-fluid` dolgusuyla dengelenmesi gerekir.
    Ciplak bir <div> icinde dengelenmiyordu: satir her iki yana 12px
    tasip SAYFAYA yatay kaydirma cubugu aciyordu.

    Olculdu (503px, mobil): gorunum alani 503px, `div.row` sag kenari
    515px -- tam 12px tasma. Genis ekranda da tasma vardi, yalnizca
    sayfa genis oldugu icin goze carpmiyordu.
  -->
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <Button
          type="button"
          severity="success"
          label="New"
          @click="newForm"
        />
      </div>
    </div>
    <MekmarCostList @cost_selected_emit="costSelected($event)" />

    <Dialog
      v-model:visible="cost_control_visible"
      :header="cost_control_header"
      modal
    >
      <MekmarCostForm :status="status" />
    </Dialog>
  </div>
</template>

<script>
import {
  useMekmarCostStore,
  createMekmarCostModel,
} from "~/stores/mekmarCost"

export default {
  computed: {
    mekmarCostStore() {
      return useMekmarCostStore()
    },
  },
  data() {
    return {
      cost_control_visible: false,
      cost_control_header: "Cost Control",
      status: false,
    }
  },
  methods: {
    costSelected(event) {
      this.mekmarCostStore.setMekmarCostModel(event)
      this.cost_control_visible = true
      this.status = false
      this.cost_control_header = "Update Cost Control"
    },
    newForm() {
      this.mekmarCostStore.setMekmarCostModel(createMekmarCostModel())
      this.cost_control_visible = true
      this.status = true
      this.cost_control_header = "New Cost Control"
    },
  },
  /*
   * created() -> mounted(): created() SSR'da da calisir, icindeki async
   * is BEKLENMEZ ve liste BOS serialize edilir; hydration onu devralir,
   * created() bir daha calismadigi icin tablo bos kalir (bkz. commit
   * 2afc877e3). mounted() sunucuda hic calismaz.
   */
  async mounted() {
    const legacyApi = useLegacyApi()
    const toast = useAppToast()
    try {
      const res = await legacyApi.get("/reports/mekmar/cost/control/list")
      if (res.data.status) {
        this.mekmarCostStore.setMekmarCostList(res.data.data)
      } else {
        toast.error(res.data.message)
      }
    } catch (err) {
      /*
       * Kaynakta da yalnizca console'a yaziliyordu -- kullaniciya hicbir
       * sey gosterilmiyordu. Davranis KORUNDU (toast EKLENMEDI: istek
       * patladiginda bugune kadar sessiz kaliyordu ve bunu degistirmek
       * tasima kapsami disinda bir karar).
       */
      console.error("API Error:", err)
    }
  },
}
</script>

<!--
  pages/operation/cost-control.vue -> app/pages/operation/cost-control.vue

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] created() -> mounted()  (yukaridaki nota bak)
  [x] this.$axios -> useLegacyApi() / this.$toast -> useAppToast()
  [x] this.$store.dispatch("setMekmarCostX", p) -> useMekmarCostStore()
  [x] :visible + @update:visible -> v-model:visible  (Vue 2 .sync ciktisi)
  [x] class="p-button-success" -> severity="success"  (PrimeVue 4)
  [x] <mekmarCostList> -> <MekmarCostList>,
      <mekmarCostForm>  -> <MekmarCostForm>
      Nuxt 2'de bu adlar plugins/components.js icinde ELLE global
      kaydediliyordu (satir 159/161). Pilotta otomatik ice alma var ve
      ad dosya yolundan uretiliyor: app/components/mekmarCost/List.vue
      -> MekmarCostList.

  [x] newForm()'daki dokuz alanli model nesnesi ->
      createMekmarCostModel(). Ayni varsayilan kaynakta UC YERDE
      (store state, bu metot, Form.vue reset()) harfi harfine
      kopyalanmisti; artik tek yerde: stores/mekmarCost.ts.

  definePageMeta EKLENMEDI -- KAYNAKTA DA MIDDLEWARE YOKTU:
  kaynak sayfada `middleware` anahtari hic yazili degil (digerlerinde
  `middleware: ["authority"]` var). Yani bu ekran authority
  kisitlamasina TABI DEGIL ve oyle BIRAKILDI; global
  auth-check.global.ts oturum kontrolunu zaten yapiyor.
  Uydurma bir yetki eklemek davranis degisikligi olurdu.
-->
