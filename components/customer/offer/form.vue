<template>
  <div>
    <div class="row m-auto mb-3 mt-3">
      <div class="col">
        <span class="p-float-label">
          <InputText class="w-100" id="customer" type="text" v-model="model.MusteriAdi" />
          <label for="customer">Customer</label>
        </span>
      </div>
      <div class="col">
        <span class="p-float-label">
          <InputText class="w-100" id="company" type="text" v-model="model.Company" />
          <label for="company">Company</label>
        </span>
      </div>
      <div class="col">
        <span class="p-float-label">
          <AutoComplete
            v-model="selectedCountry"
            inputId="country"
            :suggestions="filteredCountry"
            field="UlkeAdi"
            @complete="searchCountry($event)"
            class="w-100"
          />
          <label for="country">Country</label>
        </span>
      </div>
    </div>
    <div class="row m-auto mb-3">
      <div class="col">
        <span class="p-float-label">
          <InputText class="w-100" id="email" type="text" v-model="model.Mail" />
          <label for="email">Mail</label>
        </span>
      </div>
      <div class="col">
        <span class="p-float-label">
          <InputText class="w-100" id="phone" type="text" v-model="model.Phone" />
          <label for="phone">Phone</label>
        </span>
      </div>
    </div>
    <div class="row m-auto mb-3">
      <div class="col">
        <span class="p-float-label">
          <Textarea v-model="model.Adress" rows="5" cols="30" class="w-100" />
          <label>Address</label>
        </span>
      </div>
      <div class="col">
        <span class="p-float-label">
          <Textarea v-model="model.Description" rows="5" cols="30" class="w-100" />
          <label>Description</label>
        </span>
      </div>
    </div>
    <div class="row m-auto mb-3">
      <div class="col">
        <Button
          text="button"
          class="p-button-success w-100"
          label="Save"
          @click="process"
        />
      </div>
      <div class="col" v-if="!button">
        <Button
          text="button"
          class="p-button-danger w-100"
          label="Delete"
          @click="deleteForm"
        />
      </div>
    </div>
  </div>
</template>
<script>
import Cookies from "js-cookie";
export default {
  computed: {},
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
      filteredCountry: null,
    };
  },
  created() {
    this.selectedCountry = this.country.find((x) => x.Id == this.model.UlkeId);
  },
  methods: {
    deleteForm() {
      this.$store.dispatch("setOfferCustomerDelete", this.model.Id);
      this.$emit("offer_customer_dialog_close");
    },
    save() {
      this.model.UlkeId = this.selectedCountry.Id;
      this.model.UlkeAdi = this.selectedCountry.UlkeAdi;
      this.model.Kullanici = Cookies.get("userId");
      this.model.KullaniciAdi = Cookies.get("username");
      this.$store.dispatch("setOfferCustomerSave", this.model);
      this.$emit("offer_customer_dialog_close");
    },
    update() {
      this.model.UlkeId = this.selectedCountry.Id;
      this.model.UlkeAdi = this.selectedCountry.UlkeAdi;
      this.$store.dispatch("setOfferCustomerUpdate", this.model);
      this.$emit("offer_customer_dialog_close");
    },
    process() {
      if (this.button) {
        this.save();
      } else {
        this.update();
      }
    },
    searchCountry(event) {
      let results;
      if (event.query.length == 0) {
        results = this.country;
      } else {
        results = this.country.filter((x) => {
          return x.UlkeAdi.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
      this.filteredCountry = results;
    },
  },
};
</script>
