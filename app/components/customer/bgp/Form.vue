<template>
  <div class="mt-3">
    <div class="row mb-3">
      <div class="col">
        <FloatLabel>
          <InputText id="customer" v-model="model.Customer" />
          <label for="customer">Customer</label>
        </FloatLabel>
      </div>
      <div class="col">
        <FloatLabel>
          <InputText id="company" v-model="model.Company" />
          <label for="company">Company</label>
        </FloatLabel>
      </div>
      <div class="col">
        <FloatLabel>
          <InputText id="mail" v-model="model.Email" />
          <label for="mail">Mail</label>
        </FloatLabel>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col">
        <FloatLabel>
          <Select
            v-model="selectedCountry"
            inputId="country"
            :options="country"
            optionLabel="UlkeAdi"
            class="w-full md:w-14rem"
            @change="countrySelected($event)"
          />
          <label for="country">Select a Country</label>
        </FloatLabel>
      </div>
      <div class="col">
        <FloatLabel>
          <InputText id="phone" v-model="model.Phone" />
          <label for="phone">Phone</label>
        </FloatLabel>
      </div>
      <div class="col">
        <FloatLabel>
          <InputText id="representative" v-model="model.KullaniciAdi" />
          <label for="representative">Salesman</label>
        </FloatLabel>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col">
        <FloatLabel>
          <Textarea v-model="model.Adress" rows="5" cols="30" class="w-100" />
          <label>Address</label>
        </FloatLabel>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col">
        <Button
          type="button"
          severity="success" class="w-100"
          @click="$emit('bgp_customer_process_emit', model)"
          label="Save"
        />
      </div>
      <div class="col" v-if="!button">
        <Button
          type="button"
          severity="danger" class="w-100"
          @click="$emit('bgp_customer_delete_emit', model.ID)"
          label="Delete"
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
  /*
   * created() -> mounted(): created() SSR'da da calisir, icindeki async
   * is BEKLENMEZ ve liste BOS serialize edilir; hydration onu devralir,
   * created() bir daha calismadigi icin tablo bos kalir (bkz. commit
   * 2afc877e3). mounted() sunucuda hic calismaz.
   */
  mounted() {
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
