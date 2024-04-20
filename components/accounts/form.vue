<template>
  <div>
    <div class="row mt-3">
      <div class="col">
        <span class="p-float-label">
          <InputText id="loginName" type="text" v-model="model.LoginName" />
          <label for="loginName">Login Name</label>
        </span>
      </div>
      <div class="col">
        <span class="p-input-icon-right p-float-label">
          <InputText
            id="loginPassword"
            :type="show_password ? 'text' : 'password'"
            v-model="model.LoginPassword"
          />
          <i class="pi pi-eye-slash" @click="showPassword" />

          <label for="loginPassword">Login Password</label>
        </span>
      </div>
      <div class="col">
        <span class="p-float-label">
          <InputText id="platform" type="text" v-model="model.Platform" />
          <label for="platform">Platform</label>
        </span>
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
          class="p-button-danger w-100"
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
