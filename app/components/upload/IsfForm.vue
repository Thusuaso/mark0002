<template>
  <div class="row">
    <div class="col">
      <Select
        v-model="selectedSupplier"
        :options="isf"
        optionLabel="TedarikciAdi"
        placeholder="Select a Supplier"
        style="margin-top: 5px; margin-bottom: 100px"
        @change="supplierChange($event)"
      />
    </div>
    <div class="col">
      <Button icon="pi pi-download" class="p-button" @click="download" />
      <a :href="link" ref="link_id" />
    </div>
  </div>
</template>
<script>
/*
 * components/upload/isfform.vue karsiligi.
 *
 * "Ic Siparis" evraki icin tedarikci secip o tedarikcinin PDF'ini
 * indirme. Link tedarikci secildiginde kuruluyor.
 *
 * PrimeVue 4: <Dropdown> -> <Select>.
 *
 * DIKKAT -- PROP TIPI KAYNAKTA YANLIS: `isf` Object olarak
 * bildirilmisti ama hem store'daki deger (`documentSupplierList`) hem
 * de `:options` beklentisi DIZI. Vue tip uyusmazliginda yalnizca
 * konsola uyari basar, calismayi engellemez; bu yuzden Nuxt 2'de
 * sessizce yanlis duruyordu. Array'e cevrildi.
 */
export default {
  props: {
    isf: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data() {
    return {
      link: null,
      selectedSupplier: null,
    }
  },
  methods: {
    supplierChange(event) {
      const docName = `${event.value.TedarikciAdi}-${event.value.SiparisNo}.pdf`
      this.link = `https://file-service.mekmar.com/file/download/3/${docName}`
    },
    download() {
      this.$refs.link_id?.click()
    },
  },
}
</script>
