<template>
  <div class="row mt-3">
    <div class="col w-100">
      <span class="p-float-label">
        <InputText
          id="supplier"
          type="text"
          v-model="supplier"
          @input="inputSupplier($event)"
        />
        <label for="supplier">Supplier</label>
      </span>
    </div>
    <div class="col w-100">
      <Button
        type="button"
        class="p-button-success"
        label="Save"
        @click="saveProcess"
      />
    </div>
    <div class="col w-100" v-if="!status">
      <Button
        type="button"
        class="p-button-danger"
        label="Delete"
        @click="deleteForm"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    status: {
      type: Boolean,
      required: true,
    },
    model: {
      type: Object,
      required: true,
    },
    suppliers: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      supplier: null,
    };
  },
  created() {
    if (!this.status) {
      this.supplier = this.model.FirmaAdi;
    }
  },
  methods: {
    inputSupplier(event) {
      const control = this.suppliers.find(
        (item) => item.FirmaAdi.toLowerCase() === event.toLowerCase()
      );
      if (control) {
        this.$toast.error("This supplier already exists.");
      }
    },
    saveProcess() {
      if (this.status) {
        this.save();
      } else {
        this.update();
      }
    },
    save() {
      const control = this.suppliers.find(
        (item) => item.FirmaAdi.toLowerCase() === this.supplier.toLowerCase()
      );
      if (control) {
        this.$toast.error("This supplier already exists.");
        return;
      }
      this.model.FirmaAdi = this.supplier;
      this.$store.dispatch("setSupplierSave", this.model);
      this.$emit("supplier_dialog_close_emit");
      // this.$socket.socketIO.emit('supplier_list_emit');
    },
    update() {
      this.model.FirmaAdi = this.supplier;
      this.$store.dispatch("setSupplierUpdate", this.model);
      this.$emit("supplier_dialog_close_emit");
      // this.$socket.socketIO.emit('supplier_list_emit');
    },
    deleteForm() {
      this.$store.dispatch("setSupplierDelete", this.model.ID);
      this.$emit("supplier_dialog_close_emit");
      // this.$socket.socketIO.emit('supplier_list_emit');
    },
  },
};
</script>
