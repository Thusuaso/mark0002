<template>
  <div class="container" style="height: 230px">
    <div class="row">
      <div class="col">
        <Select
          v-model="selectedRepresentative"
          :options="users"
          optionLabel="KullaniciAdi"
          class="w-full md:w-14rem"
        />
      </div>
      <div class="col">
        <Select
          v-model="selectedOperation"
          :options="users"
          optionLabel="KullaniciAdi"
          class="w-full md:w-14rem"
        />
      </div>
      <Button
        type="button"
        severity="warn"
        class="w-100 mt-5"
        label="Change"
        :disabled="!selectedRepresentative || !selectedOperation"
        @click="change"
      />
    </div>
  </div>
</template>

<script>
import { useRepresentativeStore } from "~/stores/representative"

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

  computed: {
    representativeStore() {
      return useRepresentativeStore()
    },
  },

  data() {
    return {
      selectedRepresentative: null,
      selectedOperation: null,
    }
  },

  created() {
    this.selectedRepresentative = this.users.find(
      (x) => x.KullaniciAdi == this.data.SiparisSahibi,
    )
    this.selectedOperation = this.users.find(
      (x) => x.KullaniciAdi == this.data.Operasyon,
    )
  },

  methods: {
    change() {
      this.representativeStore.setRepresentativeChange({
        siparisSahibiId: this.selectedRepresentative.ID,
        SiparisSahibi: this.selectedRepresentative.KullaniciAdi,
        operasyonId: this.selectedOperation.ID,
        Operasyon: this.selectedOperation.KullaniciAdi,
        SiparisNo: this.data.SiparisNo,
      })
    },
  },
}
</script>

<!--
  components/sales/RepresentativeForm.vue
  (Nuxt 2: components/sales/representative/form.vue)

  Etiket adi <SalesRepresentativeForm>. Nuxt 2'de ad `representativeForm`
  idi (plugins/components.js:240, ELLE kayit).

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] <Dropdown> -> <Select>
      PrimeVue 4'te bilesenin adi Select; pilot genelinde de Select
      kullaniliyor.

  [x] class="p-button-warning w-100 mt-5" -> severity="warn" + class
      PrimeVue 4'te p-button-<severity> siniflari KALDIRILDI ve severity
      adi "warning" DEGIL "warn". Sinif olarak birakilsa dugme varsayilan
      (mavi) gorunurde kalirdi: hata vermez, sessizce yanlis renk.

  [x] this.$store.dispatch("setRepresentativeChange", data)
         -> representativeStore.setRepresentativeChange(...)

  KALDIRILDI -- OLU KOD:
  [x] data.cities = []  -- sablonda ve hicbir metotta GECMIYOR.

  DUZELTILDI -- NUXT 2'DE PATLIYORDU:

  [x] :disabled EKLENDI.
      change(), `this.selectedRepresentative.ID` ve
      `this.selectedOperation.ID` okuyor. Bu iki deger created() icinde
      users listesinde ARAMAYLA bulunuyor:

          this.users.find((x) => x.KullaniciAdi == this.data.SiparisSahibi)

      Eslesme bulunamazsa find() `undefined` dondurur -- ve o durumda
      "Change" dugmesine basmak
          TypeError: Cannot read properties of undefined (reading 'ID')
      firlatiyordu. Hicbir toast, hicbir aciklama yok; dugme olu
      gorunuyordu.

      Bu gercekci bir durum: siparisin SiparisSahibi/Operasyon degeri
      kullanici listesinde olmayan biri olabilir (silinmis/pasif
      kullanici, ya da ad degisikligi). `users` prop'u da layout'tan
      geliyor, yani henuz dolmamis olabilir.

      Simdi iki secim de dolu degilken dugme PASIF. Davranis farki:
      eskiden tiklanip sessizce patliyordu, simdi tiklanamiyor.
-->
