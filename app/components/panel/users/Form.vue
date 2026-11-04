<template>
  <div>
    <div class="row mt-3">
      <div class="col">
        <FloatLabel>
          <InputText id="name" v-model="model.adi" />
          <label for="name">Customer</label>
        </FloatLabel>
      </div>
      <div class="col">
        <FloatLabel>
          <InputText id="username" v-model="model.kullaniciadi" />
          <label for="username">Username</label>
        </FloatLabel>
      </div>
      <div class="col">
        <FloatLabel>
          <InputText id="mail" v-model="model.mailadres" />
          <label for="mail">Mail</label>
        </FloatLabel>
      </div>
      <div class="col">
        <FloatLabel>
          <InputText id="phone" v-model="model.telefon" />
          <label for="phone">Phone</label>
        </FloatLabel>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col">
        <Button
          type="button"
          class="w-100"
          severity="success"
          label="Save"
          @click="$emit('process', model)"
        />
      </div>
      <div class="col" v-if="!status">
        <Button
          type="button"
          class="w-100"
          severity="danger"
          label="Delete"
          @click="$emit('deleteForm', model.Id)"
        />
      </div>
    </div>
  </div>
</template>
<script>
/*
 * components/panel/users/form.vue karsiligi.
 *
 * PrimeVue 4 degisiklikleri:
 *   <span class="p-float-label"> -> <FloatLabel>
 *       O sinif PrimeVue 4'te TAMAMEN kaldirildi; birakilsa stilsiz bir
 *       span olur ve <label> input'un uzerine "yuzmek" yerine yanina
 *       duser (bkz. tools/codemods/codemod-float-label.mjs).
 *   class="p-button-success" -> severity="success"
 *   class="p-button-danger"  -> severity="danger"
 *
 * DUZELTILDI -- PROP TIPI KAYNAKTA YANLISTI: `model` Array olarak
 * bildirilmisti ama govde onu NESNE gibi kullaniyor (model.adi,
 * model.kullaniciadi, model.Id) ve ebeveyn de nesne geciriyor
 * (models store'undaki panelUsersModel). Vue tip uyusmazliginda
 * yalnizca konsola uyari basar, calismayi engellemez -- bu yuzden
 * Nuxt 2'de sessizce yanlis duruyordu. Object'e cevrildi.
 *
 * `status` = "yeni kayit mi": true ise Delete dugmesi gizleniyor.
 * Ad yaniltici ama ebeveyn de ayni adi kullaniyor, korundu.
 */
export default {
  props: {
    model: {
      type: Object,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["process", "deleteForm"],
}
</script>
