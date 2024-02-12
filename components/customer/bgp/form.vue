<template>
  <div class="mt-3">
    <div class="row mb-3">
      <div class="col">
        <span class="p-float-label">
          <InputText id="customer" v-model="model.Customer" />
          <label for="customer">Müşteri</label>
        </span>
      </div>
      <div class="col">
        <span class="p-float-label">
          <InputText id="company" v-model="model.Company" />
          <label for="company">Şirket</label>
        </span>
      </div>
      <div class="col">
        <span class="p-float-label">
          <InputText id="mail" v-model="model.Email" />
          <label for="mail">Mail</label>
        </span>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col">
        <div class="p-float-label">
          <Dropdown
            v-model="selectedCountry"
            inputId="country"
            :options="country"
            optionLabel="UlkeAdi"
            class="w-full md:w-14rem"
            @change="countrySelected($event)"
          />
          <label for="country">Şehir Seçiniz</label>
        </div>
      </div>
      <div class="col">
        <span class="p-float-label">
          <InputText id="phone" v-model="model.Phone" />
          <label for="phone">Telefon</label>
        </span>
      </div>
      <div class="col">
        <span class="p-float-label">
          <InputText id="representative" v-model="model.KullaniciAdi" />
          <label for="representative">Satışçı</label>
        </span>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col">
        <span class="p-float-label">
          <Textarea v-model="model.Adress" rows="5" cols="30" class="w-100" />
          <label>Adres</label>
        </span>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col">
        <Button
          type="button"
          class="p-button-success w-100"
          @click="$emit('bgp_customer_process_emit', model)"
          label="Kaydet"
        />
      </div>
      <div class="col" v-if="!button">
        <Button
          type="button"
          class="p-button-danger w-100"
          @click="$emit('bgp_customer_delete_emit', model.ID)"
          label="Sil"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    model: {
      type: Object,
      required: true,
    },
    country: {
      type: Array,
      required: true,
    },
    button: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      selectedCountry: null,
    };
  },
  created() {
    if (!this.button) {
      this.selectedCountry = this.country.find((x) => x.UlkeAdi == this.model.Ulke);
    }
  },
  methods: {
    countrySelected(event) {
      this.model.UlkeAdi = event.value.UlkeAdi;
      this.model.UlkeId = event.value.Id;
    },
  },
};
</script>
