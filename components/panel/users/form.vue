<template>
  <div>
    <div class="row mt-3">
      <div class="col">
        <span class="p-float-label">
          <InputText id="name" v-model="model.adi" />
          <label for="name">Customer</label>
        </span>
      </div>
      <div class="col">
        <span class="p-float-label">
          <InputText id="username" v-model="model.kullaniciadi" />
          <label for="username">Username</label>
        </span>
      </div>
      <div class="col">
        <span class="p-float-label">
          <InputText id="mail" v-model="model.mailadres" />
          <label for="mail">Mail</label>
        </span>
      </div>
      <div class="col">
        <span class="p-float-label">
          <InputText id="phone" v-model="model.telefon" />
          <label for="phone">Phone</label>
        </span>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col">
        <Button type="button" class="p-button-success w-100" label="Save" @click="$emit('process',model)"/>
      </div>
      <div class="col" v-if="!status">
        <Button type="button" class="p-button-danger w-100" label="Delete" @click="$emit('deleteForm',model.Id)"/>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    model: {
      type: Array,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
