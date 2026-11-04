<template>
  <div class="row m-auto">
    <SalesBgpCard
      v-for="bgp of bgpLists"
      :key="bgp.ID"
      :bgp="bgp"
      @bgp_detail_dialog_form="bgpDetailForm($event)"
    />
  </div>
</template>

<script>
export default {
  props: {
    bgpLists: {
      type: Array,
      required: false,
      default: () => [],
    },
  },

  methods: {
    bgpDetailForm(event) {
      this.$emit("bgp_detail_dialog_form", event)
    },
  },
}
</script>

<!--
  components/sales/BgpCardGroup.vue
  (Nuxt 2: components/sales/bgp/lists.vue)

  Etiket adi <SalesBgpCardGroup>. Nuxt 2'de ad `bgpLists` idi
  (plugins/components.js:232, ELLE kayit) ve ic etiket `bgpList`
  (plugins/components.js:233) -- iki ad arasindaki tek fark SONDAKI "s"
  idi, yani hangisinin sarmalayici hangisinin kart oldugu adlardan hic
  anlasilmiyordu. Auto-import adlari dosya yolundan gelecegi icin adlar
  zaten degismek zorundaydi; bu firsatla "CardGroup" / "Card" yazildi.

  Bu bilesen yalnizca bir SARMALAYICI: v-for ile kartlari kuruyor ve alt
  bilesenin olayini yukari geciriyor. Mantik yok, oldugu gibi tasindi.

  [x] props.bgpLists -> `default: () => []`
      Nuxt 2'de default YOKTU; veri gelene kadar v-for undefined uzerinde
      donmeye calisiyordu (Vue bunu sessizce atlar, ama tanimli olmasi
      dogru).
-->
