<template>
  <div class="container" style="height: 230px">
    <div class="row">
      <div class="col">
        <Dropdown
          v-model="selectedRepresentative"
          :options="users"
          optionLabel="KullaniciAdi"
          class="w-full md:w-14rem"
        />
      </div>
      <div class="col">
        <Dropdown
          v-model="selectedOperation"
          :options="users"
          optionLabel="KullaniciAdi"
          class="w-full md:w-14rem"
        />
      </div>
      <Button
        type="button"
        class="p-button-warning w-100 mt-5"
        label="Change"
        @click="change"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
    users: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      cities: [],
      selectedRepresentative: null,
      selectedOperation: null,
    };
  },
  created() {
    this.selectedRepresentative = this.users.find(
      (x) => x.KullaniciAdi == this.data.SiparisSahibi
    );
    this.selectedOperation = this.users.find(
      (x) => x.KullaniciAdi == this.data.Operasyon
    );
  },
  methods: {
    change() {
      const data = {
        siparisSahibiId: this.selectedRepresentative.ID,
        SiparisSahibi: this.selectedRepresentative.KullaniciAdi,
        operasyonId: this.selectedOperation.ID,
        Operasyon: this.selectedOperation.KullaniciAdi,
        SiparisNo: this.data.SiparisNo,
      };
      this.$store.dispatch("setRepresentativeChange", data);
    },
  },
};
</script>
