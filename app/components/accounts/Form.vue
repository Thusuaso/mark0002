<template>
  <div>
    <div class="row mt-3">
      <div class="col">
        <FloatLabel>
          <InputText id="loginName" type="text" v-model="model.LoginName" />
          <label for="loginName">Login Name</label>
        </FloatLabel>
      </div>
      <div class="col">
        <FloatLabel class="p-input-icon-right">
          <InputText
            id="loginPassword"
            :type="show_password ? 'text' : 'password'"
            v-model="model.LoginPassword"
          />
          <i class="pi pi-eye-slash" @click="showPassword" />

          <label for="loginPassword">Login Password</label>
        </FloatLabel>
      </div>
      <div class="col">
        <FloatLabel>
          <InputText id="platform" type="text" v-model="model.Platform" />
          <label for="platform">Platform</label>
        </FloatLabel>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <Button
          type="button"
          :class="!status ? 'p-button-warning w-100' : 'p-button-success w-100'"
          :label="!status ? 'Update' : 'Save'"
          @click="process"
        />
      </div>
      <div class="col" v-if="!status">
        <Button
          type="button"
          severity="danger" class="w-100"
          label="Sil"
          @click="$emit('accounts_deleted_emit', model.ID)"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show_password: false,
    };
  },
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
  methods: {
    showPassword() {
      this.show_password = !this.show_password;
    },
    process() {
      this.$emit("process", this.model);
    },
  },
};
</script>
