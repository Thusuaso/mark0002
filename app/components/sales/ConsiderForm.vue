<template>
  <div class="mt-4 mb-4">
    <FloatLabel>
      <Textarea id="consider" v-model="model.Hata" rows="5" class="w-100" />
      <label for="consider">Point of Consider</label>
    </FloatLabel>

    <div class="row">
      <div class="col">
        <Button
          type="button"
          severity="success"
          class="w-100"
          label="Save"
          @click="$emit('point_of_consider_process_emit', model)"
        />
      </div>
      <div class="col" v-if="!status">
        <Button
          type="button"
          severity="danger"
          class="w-100"
          label="Delete"
          @click="$emit('point_of_consider_delete_emit', model)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    model: {
      type: Object,
      required: false,
      default: () => ({ ID: 0, Hata: "" }),
    },
    status: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<!--
  components/sales/ConsiderForm.vue
  (Nuxt 2: components/sales/consider/form.vue)

  Etiket adi <SalesConsiderForm>. Nuxt 2'de ad `salesConsiderForm` idi
  (plugins/components.js:333, ELLE kayit).

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] <span class="p-float-label"> -> <FloatLabel>
      p-float-label SINIFI PrimeVue 4'te tamamen kaldirildi; stilsiz bir
      span olarak render edilip <label> Textarea'nin uzerine yuzmek
      yerine akista kaliyordu.

  [x] class="p-button-success w-100" -> severity="success" class="w-100"
      class="p-button-danger w-100"  -> severity="danger" class="w-100"
      PrimeVue 4'te p-button-<severity> siniflari KALDIRILDI; sinif
      olarak birakilsa Save ve Delete AYNI (varsayilan) renkte olurdu.

  KALDIRILDI -- OLU KOD:
  [x] data() { return {} }  ve  methods: {}  -- ikisi de bostu.

  DUZELTILDI -- NUXT 2'DE PATLIYORDU:

  [x] props.model -> default: () => ({ ID: 0, Hata: "" })
      Prop required:false'ti ve DEFAULT'u YOKTU, ama sablon
      `v-model="model.Hata"` okuyor. Ebeveyn (pages/sales/consider.vue)
      `model`i data'da `null` ile baslatiyor ve yalnizca newForm() /
      satir secimi sonrasi doldurur.

      Dialog `modal` ama v-if DEGIL, yani Nuxt 2'de bilesen model null
      iken de olusabiliyordu -> "Cannot read properties of null (reading
      'Hata')". Sayfada ayrica v-if eklendi; default burada ikinci
      guvence.
-->
