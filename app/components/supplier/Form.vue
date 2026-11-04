<template>
  <div>
    <div class="row mt-3">
      <div class="col w-100">
        <FloatLabel>
          <InputText
            id="supplier"
            type="text"
            v-model="supplier"
            @update:modelValue="inputSupplier($event)"
          />
          <label for="supplier">Supplier</label>
        </FloatLabel>
      </div>
      <div class="col w-100">
        <FloatLabel>
          <InputText type="text" v-model="model.Telefon" id="phone" />
          <label for="phone">Phone</label>
        </FloatLabel>
      </div>
      <div class="col w-100">
        <FloatLabel>
          <InputText type="text" v-model="model.MailAdres" id="email" />
          <label for="email">Email</label>
        </FloatLabel>
      </div>
      <div class="col w-100">
        <FloatLabel>
          <InputText type="text" v-model="model.Il" id="City" />
          <label for="City">City</label>
        </FloatLabel>
      </div>
      <div class="col w-100">
        <FloatLabel>
          <InputText type="text" v-model="model.Notlar" id="Notlar" />
          <label for="Notlar">Notes</label>
        </FloatLabel>
      </div>
    </div>

    <div class="row">
      <div class="col w-100">
        <Button type="button" severity="success" label="Save" @click="saveProcess" />
      </div>
      <div class="col w-100" v-if="!status">
        <Button type="button" severity="danger" label="Delete" @click="deleteForm" />
      </div>
    </div>
  </div>
</template>

<script>
import { useSupplierStore } from "~/stores/supplier"

export default {
  props: {
    status: { type: Boolean, required: true },
    model: { type: Object, required: true },
    suppliers: { type: Array, required: true },
  },
  data() {
    return {
      supplier: null,
    }
  },
  computed: {
    // [1] this.$store.dispatch(...) -> Pinia store
    supplierStore() {
      return useSupplierStore()
    },
    // [2] this.$toast -> @nuxtjs/toast yok, PrimeVue Toast sarmalayicisi
    toast() {
      return useAppToast()
    },
  },
  created() {
    if (!this.status) {
      this.supplier = this.model.FirmaAdi
    }
  },
  methods: {
    inputSupplier(event) {
      const control = this.suppliers.find(
        (item) => item.FirmaAdi.toLowerCase() === (event ?? "").toLowerCase(),
      )
      if (control) {
        this.toast.error("This supplier already exists.")
      }
    },
    saveProcess() {
      if (this.status) {
        this.save()
      } else {
        this.update()
      }
    },
    save() {
      const control = this.suppliers.find(
        (item) => item.FirmaAdi.toLowerCase() === (this.supplier ?? "").toLowerCase(),
      )
      if (control) {
        this.toast.error("This supplier already exists.")
        return
      }
      this.model.FirmaAdi = this.supplier
      this.supplierStore.setSupplierSave(this.model)
      this.$emit("supplier_dialog_close_emit")
    },
    update() {
      this.model.FirmaAdi = this.supplier
      this.supplierStore.setSupplierUpdate(this.model)
      this.$emit("supplier_dialog_close_emit")
    },
    deleteForm() {
      this.supplierStore.setSupplierDelete(this.model.ID)
      this.$emit("supplier_dialog_close_emit")
    },
  },
}
</script>

<!--
  Bu dosyada ZORUNLU degisiklikler:
  [1] this.$store.dispatch("setSupplierSave", x) -> useSupplierStore().setSupplierSave(x)
  [2] this.$toast.error(...) -> useAppToast().error(...)  (@nuxtjs/toast Nuxt3+'ta yok)
  [3] <span class="p-float-label"> -> <FloatLabel>  (PrimeVue 4'te .p-float-label
      CSS sinifi kaldirildi, component'e donustu)
  [4] class="p-button-success" -> severity="success"
      class="p-button-danger"  -> severity="danger"   (severity CSS siniflari kaldirildi)
  [5] SESSIZ KIRILMA: @input="inputSupplier($event)"
      PrimeVue 2'de InputText @input DEGERI (string) emit ediyordu.
      PrimeVue 4+'ta native input Event'i geliyor -> event.toLowerCase() patlardi.
      -> @update:modelValue kullanildi.
      Bu tur hatalar derleme hatasi VERMEZ, calisma aninda ortaya cikar.
  [6] v-model="model.Telefon" -> prop'un icine yazmak (Vue 2'de de kotuydu,
      Vue 3'te de calisiyor) -- parite icin oldugu gibi birakildi.
-->
