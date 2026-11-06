<template>
  <div>
    <div
      class="row m-auto mt-4"
      style="max-width: 1000px; width: 100%; min-height: 150px"
    >
      <div class="col">
        <div class="flex flex-column gap-2">
          <label for="projectname">Project Name</label>
          <InputText id="projectname" v-model="bgp.ProjectName" />
        </div>
      </div>
      <div class="col">
        <div class="flex flex-column gap-2">
          <label for="country">Country</label>
          <AutoComplete
            inputId="country"
            v-model="selectedCountry"
            :suggestions="filteredCountryList"
            optionLabel="UlkeAdi"
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
      severity="success"
      class="w-100"
      label="Save"
      @click="save"
    />
  </div>
</template>

<script>
import { useBgpStore } from "~/stores/bgp"
import { toIsoDate } from "~/utils/dates"

export default {
  props: {
    countryList: {
      type: Array,
      required: true,
    },
  },

  computed: {
    bgpStore() {
      return useBgpStore()
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
    }
  },

  methods: {
    countrySelected(event) {
      this.bgp.UlkeAdi = event.value.UlkeAdi
      this.bgp.UlkeLogo = event.value.Png_Flags
    },

    searchCountry(event) {
      if (event.query.length == 0) {
        this.filteredCountryList = this.countryList
        return
      }

      this.filteredCountryList = this.countryList.filter((x) =>
        x.UlkeAdi.toLowerCase().startsWith(event.query.toLowerCase()),
      )
    },

    save() {
      this.bgp.DateofRegistiration = toIsoDate(new Date())
      this.bgp.Temsilci = useCookie("userId").value
      this.bgpStore.setBgpSave(this.bgp)
      this.$emit("closed_bgp_dialog")
    },
  },
}
</script>

<!--
  components/sales/BgpNewForm.vue
  (Nuxt 2: components/sales/bgp/newForm.vue)

  Etiket adi <SalesBgpNewForm>. Nuxt 2'de ad `bgpNewForm` idi
  (plugins/components.js:231, ELLE kayit).

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] AutoComplete: field="UlkeAdi" -> optionLabel="UlkeAdi"
      PrimeVue 4'un AutoComplete'inde `field` prop'u YOK -- paket
      kaynaginda o ad hic gecmiyor, yalnizca optionLabel var.
      Buradaki etkisi dar ama gercek: #option slot'u listedeki satirlari
      kendisi render ediyor, ama SECIMDEN SONRA input'a yazilan metin
      optionLabel'dan geliyor -- `field` ile secim yapildiginda input
      "[object Object]" gosterirdi.

  [x] AutoComplete: id -> inputId
      `id` kok sarmalayiciya gider, gercek <input> ogesine DEGIL; yani
      <label for="country"> hicbir girdiye baglanmiyordu. PrimeVue'nun
      inputId prop'u id'yi ic input'a tasiyor, etiket artik calisiyor.

  [x] import date from "../../../plugins/date" -> toIsoDate
      date.dateToString yil-ay-gun ("2026-10-02") uretiyordu = toIsoDate.
      Burada API'ye YAZILAN deger uretiliyor, bu yuzden toIsoDate dogru
      (global dateToString GOSTERIM icin olup gun-ay-yil uretir --
      karistirmak kayit tarihini bozar).

  [x] `import Cookies from "js-cookie"` -> useCookie
  [x] this.$store.dispatch("setBgpSave", ...) -> bgpStore.setBgpSave(...)
  [x] class="p-button-success w-100" -> severity="success" class="w-100"
  [x] <Button ...></Button> -> <Button ... />

  KALDIRILDI -- OLU KOD:
  [x] aria-describedby="username-help"  -- "username-help" ID'si bu
      dosyada (ve projede) HIC TANIMLI DEGIL. Var olmayan bir ogeye
      isaret eden aria-describedby, ekran okuyuculara hicbir aciklama
      vermez; kopyala-yapistir kalintisi.

  DIKKAT -- KASITLI OLARAK DEGISTIRILMEDI:
      save() dogrulama YAPMIYOR: ProjectName bos ya da ulke secilmemis
      olsa da kayit gonderiliyor (UlkeAdi/UlkeLogo null kalir). Nuxt
      2'deki davranis bu; dogrulama eklemek yeni bir kural getirmek
      olurdu.
-->
