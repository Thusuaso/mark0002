<template>
  <div class="m-auto mt-3">
    <div class="row m-auto mb-3">
      <div class="col">
        <span class="p-float-label">
          <InputText id="customer" v-model="model.Customer" class="w-100" />
          <label for="customer">Müşteri</label>
        </span>
      </div>
      <div class="col">
        <span class="p-float-label">
          <InputText id="company" v-model="model.Company" class="w-100" />
          <label for="company">Şirket</label>
        </span>
      </div>
      <div class="col">
        <span class="p-float-label">
          <InputText id="mail" v-model="model.Email" class="w-100" />
          <label for="mail">Mail</label>
        </span>
      </div>
    </div>
    <div class="row m-auto mb-3">
      <div class="col">
        <span class="p-float-label">
          <InputText id="orderer" v-model="model.Orderer" class="w-100" />
          <label for="orderer">Satışçı</label>
        </span>
      </div>
      <div class="col">
        <div class="p-float-label">
          <Dropdown
            v-model="selectedCountry"
            inputId="country"
            :options="country"
            optionLabel="UlkeAdi"
            class="w-100"
            @change="countrySelected($event)"
          />
          <label for="country">Şehir Seçiniz</label>
        </div>
      </div>
      <div class="col">
        <vue-phone-number-input
          v-model="phone"
          style="width: 300px"
          @update="phoneInput($event)"
        />
      </div>
    </div>
    <div class="row m-auto mb-3">
      <div class="col-9">
        <span class="p-float-label">
          <Textarea v-model="model.Adress" rows="5" cols="30" class="w-100" />
          <label>Adres</label>
        </span>
      </div>
      <div class="col-3">
        <div class="flex align-items-center">
          <Checkbox v-model="model.Fuar" inputId="fair" :binary="true" />
          <label for="fair">Fuar</label>
        </div>
        <div class="flex align-items-center">
          <Checkbox v-model="model.Ziyaret" inputId="visit" :binary="true" />
          <label for="visit">Ziyaret</label>
        </div>
      </div>
    </div>
    <div class="row m-auto">
      <div class="col">
        <Button
          type="button"
          class="p-button-success w-100"
          label="Kaydet"
          @click="$emit('fair_customer_process_emit', model)"
        />
      </div>
      <div class="col" v-if="!button">
        <Button
          type="button"
          class="p-button-danger w-100"
          label="Sil"
          @click="$emit('fair_customer_delete_emit', model.ID)"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
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
      phone: null,
    };
  },
  created() {
    this.selectedCountry = this.country.find((x) => x.Id == this.model.Country);
    this.phone = this.model.Phone;
  },
  methods: {
    phoneInput(event) {
      this.model.Phone = event.formattedNumber;
    },
    countrySelected(event) {
      this.model.UlkeAdi = event.value.UlkeAdi;
      this.model.Country = event.value.Id;
    },
  },
};
</script>
