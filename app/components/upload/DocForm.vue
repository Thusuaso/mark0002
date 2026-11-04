<template>
  <div>
    <Button icon="pi pi-download" class="p-button" @click="download" />
    <a :href="link" ref="link_id" />
  </div>
</template>
<script>
/*
 * components/upload/docform.vue karsiligi.
 *
 * Evrak indirme dugmesi. Gorunmeyen bir <a> etiketinin click'ini
 * programatik olarak tetikliyor -- indirmeyi tarayiciya birakmanin en
 * kisa yolu. Kaynakta sablonun icinde `$refs.link_id.click()` yaziyordu;
 * burada metoda alindi, davranis ayni.
 *
 * `link` bos oldugunda tiklama bir ise yaramaz (ayni sayfaya gider);
 * ebeveyn bu bileseni yalnizca link belirledikten sonra aciyor
 * (pages/operation/uploadform.vue).
 */
export default {
  props: {
    link: {
      type: String,
      default: "",
    },
  },
  methods: {
    download() {
      this.$refs.link_id?.click()
    },
  },
}
</script>
