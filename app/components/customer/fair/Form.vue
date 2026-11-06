<template>
  <div class="m-auto mt-3">
    <div class="row m-auto mb-3">
      <div class="col">
        <FloatLabel>
          <InputText id="customer" v-model="model.Customer" class="w-100" />
          <label for="customer">Customer</label>
        </FloatLabel>
      </div>
      <div class="col">
        <FloatLabel>
          <InputText id="company" v-model="model.Company" class="w-100" />
          <label for="company">Company</label>
        </FloatLabel>
      </div>
      <div class="col">
        <FloatLabel>
          <InputText id="mail" v-model="model.Email" class="w-100" />
          <label for="mail">Mail</label>
        </FloatLabel>
      </div>
    </div>
    <div class="row m-auto mb-3">
      <div class="col">
        <FloatLabel>
          <InputText id="orderer" v-model="model.Orderer" class="w-100" />
          <label for="orderer">Salesman</label>
        </FloatLabel>
      </div>
      <div class="col">
        <FloatLabel>
          <Select
            v-model="selectedCountry"
            inputId="country"
            :options="country"
            optionLabel="UlkeAdi"
            class="w-100"
            @change="countrySelected($event)"
          />
          <label for="country">Select a Country</label>
        </FloatLabel>
      </div>
      <div class="col">
        <!--
          [TEL-1] `<vue-phone-number-input>` YERINE DUZ INPUT.

          Nuxt 2 bu alanda `vue-phone-number-input@1` kullaniyordu
          (plugins/components.js:343). O surum VUE 2'YE OZGU ve pilotta
          kurulu DEGIL.

          NEDEN BOS BIRAKILMADI: cozulemeyen bir etiket Vue tarafindan
          bilinmeyen DOM elementi olarak render edilir -- alan EKRANDA
          HIC GORUNMEZ, yani telefon girilemez ve uretim derlemesinde
          uyari da cikmaz (bkz. tools/codemods/check-component-tags.mjs).
          Calisan duz bir alan, gorunmeyen bir alandan iyidir.

          BEDELI -- KULLANICI KARARI BEKLIYOR: ulke secici ve E.164
          bicimlemesi gitti. Kaynakta `phoneInput($event)` yalnizca
          `event.formattedNumber` degerini `model.Phone`a yaziyordu,
          yani kutuphanenin tek katkisi BICIMLEME ve ulke secimiydi.
          Simdi kullanici ne yazarsa o kaydediliyor.

          Geri kazanmak icin Vue 3 uyumlu bir paket gerekiyor (orn.
          `maz-ui`in telefon alani ya da vue-phone-number-input@2);
          bagimlilik eklemek bu gecisin tek tarafli alabilecegi bir
          karar degil, bu yuzden notla birakildi.
        -->
        <InputText
          v-model="model.Phone"
          placeholder="Phone"
          style="width: 300px"
        />
      </div>
    </div>
    <div class="row m-auto mb-3">
      <div class="col-9">
        <FloatLabel>
          <Textarea v-model="model.Adress" rows="5" cols="30" class="w-100" />
          <label>Address</label>
        </FloatLabel>
      </div>
      <div class="col-3">
        <div class="flex align-items-center">
          <Checkbox v-model="model.Fuar" inputId="fair" :binary="true" />
          <label for="fair">Fair</label>
        </div>
        <div class="flex align-items-center">
          <Checkbox v-model="model.Ziyaret" inputId="visit" :binary="true" />
          <label for="visit">Visit</label>
        </div>
      </div>
    </div>
    <div class="row m-auto">
      <div class="col">
        <Button
          type="button"
          severity="success" class="w-100"
          label="Save"
          @click="$emit('fair_customer_process_emit', model)"
        />
      </div>
      <div class="col" v-if="!button">
        <Button
          type="button"
          severity="danger" class="w-100"
          label="Delete"
          @click="confirmedDelete"
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
    };
  },
  /*
   * created() -> mounted(): created() SSR'da da calisir, icindeki async
   * is BEKLENMEZ ve liste BOS serialize edilir; hydration onu devralir,
   * created() bir daha calismadigi icin tablo bos kalir (bkz. commit
   * 2afc877e3). mounted() sunucuda hic calismaz.
   */
  mounted() {
    this.selectedCountry = this.country.find((x) => x.Id == this.model.Country);
  },
  methods: {
    /*
     * Dugme ONCE dogrudan $emit cagiriyordu. Onay sablondan
     * sorulamiyor: Options API sablonu yalnizca bilesen ornegini
     * gorur, Nuxt'un otomatik import ettigi confirmAction'i DEGIL.
     * Davranis ayni, yalnizca onaydan sonra yayiliyor.
     */
    confirmedDelete() {
      if (!confirmAction()) return
      this.$emit("fair_customer_delete_emit", this.model.ID)
    },

    /*
     * [TEL-1] phoneInput KALDIRILDI: tek isi
     * `event.formattedNumber`i model.Phone'a yazmakti ve o olay
     * yalnizca kaldirilan kutuphaneden geliyordu. Alan artik
     * model.Phone'a dogrudan bagli.
     */
    countrySelected(event) {
      this.model.UlkeAdi = event.value.UlkeAdi;
      this.model.Country = event.value.Id;
    },
  },
};
</script>
