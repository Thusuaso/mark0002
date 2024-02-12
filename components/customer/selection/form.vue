<template>
  <div>
    <div class="row mb-3 mt-3">
      <div class="col">
        <span class="p-float-label">
          <InputText id="firstname" v-model="model.FirstName" class="w-100" />
          <label for="firstname">Müşteri Adı</label>
        </span>
      </div>
      <div class="col">
        <span class="p-float-label">
          <InputText id="email" v-model="model.Email" class="w-100" />
          <label for="email">Email</label>
        </span>
      </div>
      <div class="col">
        <span class="p-float-label">
          <InputText id="phone" v-model="model.Phone" class="w-100" />
          <label for="phone">Telefon</label>
        </span>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-4">
        <span class="p-float-label">
          <AutoComplete
            v-model="selectedCountry"
            inputId="country"
            :suggestions="filteredCountry"
            field="UlkeAdi"
            @complete="searchCountry($event)"
            class="w-100"
            @item-select="countrySelected($event)"
          />
          <label for="country">Ülke</label>
        </span>
      </div>
      <div class="col-4">
        <span class="p-float-label">
          <AutoComplete
            v-model="selectedSurface"
            inputId="surface"
            :suggestions="filteredSurface"
            field="Surface"
            @complete="searchSurface($event)"
            class="w-100"
            @item-select="surfaceSelected($event)"
          />
          <label for="surface">Ürünler</label>
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
    <div class="row">
      <div class="col">
        <Button
          type="button"
          class="p-button-success w-100"
          @click="$emit('surface_customer_process_emit', model)"
          label="Kaydet"
        />
      </div>
      <div class="col" v-if="!button">
        <Button
          type="button"
          class="p-button-danger w-100"
          @click="$emit('surface_customer_delete_emit', model.ID)"
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
    button: {
      type: Boolean,
      required: true,
    },
    country: {
      type: Array,
      required: true,
    },
    surface: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedSurface: null,
      filteredSurface: null,
      selectedCountry: null,
      filteredCountry: null,
    };
  },
  created() {
    if (!this.button) {

      this.selectedCountry = this.country.find(
        (x) => x.UlkeAdi.toLowerCase().trim() == this.model.City.toLowerCase().trim()
      );
      this.selectedSurface = this.surface.find((x) => x.ID == this.model.SurfaceId);
    }
  },
  methods: {
    surfaceSelected(event) {
      this.model.Surface = event.value.Surface;
      this.model.SurfaceId = event.value.ID;
    },
    countrySelected(event) {
      this.model.City = event.value.UlkeAdi;
    },
    searchSurface(event) {
      let results;
      if (event.query.length == 0) {
        results = this.surface;
      } else {
        results = this.surface.filter((x) => {
          return x.Surface.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
      this.filteredSurface = results;
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
