<template>
  <div class="col-4">
    <div class="card w-100 h-100">
      <div class="card-header">
        <div class="row m-auto">
          <div class="col text-center">{{ bgp.Temsilci }}</div>
          <div class="col text-center">
            {{ dateToString(bgp.DateofRegistiration) }}
          </div>
        </div>
      </div>
      <div class="card-body">
        <p class="card-text text-center">{{ bgp.ProjectName }}</p>
      </div>
      <div class="card-footer text-body-secondary">
        <div class="row">
          <div class="col">
            <Button
              type="button"
              class="w-100"
              label="Detail"
              @click="detail"
            />
          </div>
          <div class="col">
            <Button
              type="button"
              severity="danger"
              class="w-100"
              label="Delete"
              @click="deleteForm"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useBgpStore } from "~/stores/bgp"

export default {
  props: {
    bgp: {
      type: Object,
      required: true,
    },
  },

  computed: {
    bgpStore() {
      return useBgpStore()
    },
  },

  methods: {
    detail() {
      this.$emit("bgp_detail_dialog_form", this.bgp)
    },

    deleteForm() {
      /*
       * confirm() TARAYICI MODAL'I -- Nuxt 2'den birebir korundu.
       * Silme geri alinamaz oldugu icin onay adimi kaldirilmadi.
       */
      if (confirm("Are you sure you want to perform this action?")) {
        this.bgpStore.setBgpDelete(this.bgp.ID)
      }
    },
  },
}
</script>

<!--
  components/sales/BgpCard.vue   (Nuxt 2: components/sales/bgp/list.vue)

  Etiket adi <SalesBgpCard>. Nuxt 2'de ad `bgpList` idi
  (plugins/components.js:233, ELLE kayit). Ad secimi: bkz.
  BgpCardGroup.vue sonundaki not.

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] class="p-button-primary w-100" -> class="w-100"
      PrimeVue 4'te p-button-<severity> siniflari KALDIRILDI. "primary"
      zaten Button'un VARSAYILANI, yani severity yazmak da gereksiz --
      sinif silindi, gorunum ayni kaldi.

  [x] class="p-button-danger w-100" -> severity="danger" class="w-100"
      Sinif olarak birakilsa Delete dugmesi Detail ile AYNI (varsayilan)
      renkte olurdu: hata vermez, sessizce yanlis.

  [x] this.$store.dispatch("setBgpDelete", id)
         -> bgpStore.setBgpDelete(id)
      Store pilota BU COMMIT'TE eklendi (app/stores/bgp.ts).

  [x] <Button ...></Button> -> <Button ... />  (ic icerik yok)

  [x] props.bgp required:false -> required:true
      Sablon kosulsuz `bgp.Temsilci` okuyor; prop gelmezse patlar.
      Ebeveyn (BgpCardGroup) v-for icinde her zaman veriyor, yani
      davranis degismiyor -- sozlesme dogru yazildi.

  NOT: dateToString global (app/plugins/formatters.ts), GOSTERIM bicimi
  uretiyor -> "02-10-2026". Burada yalnizca gosteriliyor, dogru olan bu.
-->
