<template>
  <div>
    <div class="row m-auto mt-4" style="height: 150px; width: 1000px">
      <div class="col">
        <div class="flex flex-column gap-2">
          <label for="projectname">Project Name</label>
          <InputText
            id="projectname"
            v-model="bgp.ProjectName"
            aria-describedby="username-help"
          />
        </div>
      </div>
      <div class="col">
        <div class="flex flex-column gap-2">
          <label for="country">Country</label>
          <AutoComplete
            id="country"
            v-model="selectedCountry"
            :suggestions="filteredCountryList"
            field="UlkeAdi"
            @complete="searchCountry($event)"
            @item-select="countrySelected($event)"
          >
            <template #option="slotProps">
              <div>{{ slotProps.option.UlkeAdi }}</div>
            </template>
          </AutoComplete>
        </div>
      </div>
    </div>
    <Button
      type="button"
      class="p-button-success w-100"
      label="Save"
      @click="save"
    ></Button>
  </div>
</template>
<script>
import date from "../../../plugins/date";
import Cookies from "js-cookie";

export default {
  props: {
    countryList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      bgp: {
        ProjectName: null,
        Temsilci: null,
        UlkeAdi: null,
        UlkeLogo: null,
        DateofRegistiration: null,
      },
      selectedCountry: null,
      filteredCountryList: null,
    };
  },
  methods: {
    countrySelected(event) {
      this.bgp.UlkeAdi = event.value.UlkeAdi;
      this.bgp.UlkeLogo = event.value.Png_Flags;
    },
    searchCountry(event) {
      let results;
      if (event.query.length == 0) {
        results = this.countryList;
      } else {
        results = this.countryList.filter((x) => {
          return x.UlkeAdi.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
      this.filteredCountryList = results;
    },
    save() {
      this.bgp.DateofRegistiration = date.dateToString(new Date());
      this.bgp.Temsilci = Cookies.get("userId");
      this.$store.dispatch("setBgpSave", this.bgp);
      this.$emit("closed_bgp_dialog");
    },
  },
};
</script>
