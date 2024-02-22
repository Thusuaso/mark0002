<template>
  <div class="col-4">
    <div class="card w-100 h-100">
      <div class="card-header">
        <div class="row m-auto">
          <div class="col text-center">{{ bgp.Temsilci }}</div>
          <div class="col text-center">{{ bgp.DateofRegistiration | dateToString }}</div>
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
              class="p-button-primary w-100"
              label="Detail"
              @click="detail"
            ></Button>
          </div>
          <div class="col">
            <Button
              type="button"
              class="p-button-danger w-100"
              label="Delete"
              @click="deleteForm"
            ></Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    bgp: {
      type: Object,
      required: false,
    },
  },
  methods: {
    detail() {
      this.$emit("bgp_detail_dialog_form", this.bgp);
    },
    deleteForm() {
      if (confirm("Silme işlemini onaylıyor musunuz?")) {
        this.$store.dispatch("setBgpDelete", this.bgp.ID);
      }
    },
  },
};
</script>
