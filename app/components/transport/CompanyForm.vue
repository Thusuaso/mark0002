<template>
  <div>
    <div class="row mt-4">
      <div class="col">
        <FloatLabel>
          <InputText id="company" v-model="companyData.companyname" />
          <label for="company">Company</label>
        </FloatLabel>
      </div>
      <div class="col">
        <FloatLabel>
          <InputText id="mail" v-model="companyData.mail" />
          <label for="mail">Mail</label>
        </FloatLabel>
      </div>
      <div class="col">
        <FloatLabel>
          <InputText id="phone" v-model="companyData.phone" />
          <label for="phone">Phone</label>
        </FloatLabel>
      </div>
      <div class="col">
        <FloatLabel>
          <InputText id="description" v-model="companyData.description" />
          <label for="description">Description</label>
        </FloatLabel>
      </div>
    </div>

    <Button
      type="button"
      severity="success"
      class="w-100"
      label="Save"
      @click="save"
    />

    <DataTable :value="company" paginator :rows="15">
      <Column
        field="ID"
        header="Id"
        headerClass="tableHeader"
        bodyClass="tableBody"
      />
      <Column
        field="FirmaAdi"
        header="Company"
        headerClass="tableHeader"
        bodyClass="tableBody"
      />
      <Column
        field="Telefon"
        header="Phone"
        headerClass="tableHeader"
        bodyClass="tableBody"
      />
      <Column
        field="MailAdresi"
        header="Mail"
        headerClass="tableHeader"
        bodyClass="tableBody"
      />
      <Column
        field="Notlar"
        header="Description"
        headerClass="tableHeader"
        bodyClass="tableBody"
      />
    </DataTable>
  </div>
</template>

<script>
import { useTransportStore } from "~/stores/transport"

export default {
  props: {
    company: {
      type: Array,
      required: true,
    },
  },

  computed: {
    transportStore() {
      return useTransportStore()
    },
  },

  data() {
    return {
      companyData: {
        companyname: null,
        mail: null,
        phone: null,
        description: null,
      },
    }
  },

  methods: {
    save() {
      this.transportStore.setCompanySave(this.companyData)
    },
  },
}
</script>

<!--
  components/transport/CompanyForm.vue
  (Nuxt 2: components/transport/company.vue)

  Etiket adi <TransportCompanyForm>. Nuxt 2'de ad `transportCompanyForm`
  idi (plugins/components.js:255, ELLE kayit) -- ayni ada cikiyor ama bu
  sefer DOSYA YOLUNDAN uretiliyor.

  Dosya adi `company.vue` -> `CompanyForm.vue`: yol `transport/company`
  olsaydi auto-import adi `TransportCompany` olurdu ve bilesenin bir FORM
  oldugu kaybolurdu (icinde hem form hem liste var, ama birincil isi
  kayit).

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] <span class="p-float-label"> -> <FloatLabel>   (dort yerde)
      p-float-label SINIFI PrimeVue 4'te tamamen kaldirildi; stilsiz bir
      span olarak render edilip <label> girdinin uzerine yuzmek yerine
      akista kaliyordu -- dort alanin basligi da kaymis gorunuyordu.

  [x] class="p-button-success w-100" -> severity="success" class="w-100"
      PrimeVue 4'te p-button-<severity> siniflari KALDIRILDI; sinif
      olarak birakilsa dugme varsayilan (mavi) gorunurde kalirdi.

  [x] this.$store.dispatch("setCompanySave", ...)
         -> transportStore.setCompanySave(...)
      Store pilota BU COMMIT'TE eklendi (app/stores/transport.ts).

  [x] <Column ...></Column> -> <Column ... />  (bes kolon)

  DIKKAT -- KASITLI OLARAK DEGISTIRILMEDI:

      Kaydetmeden sonra form ALANLARI TEMIZLENMIYOR: companyData aynen
      kaliyor, yani kullanici ayni degerlerle tekrar "Save"e basarsa
      MUKERRER kayit olusur. Nuxt 2'deki davranis bu; temizleme eklemek
      akisa yeni bir kural getirmek olurdu.

      Ayrica dogrulama da yok: tum alanlar null olsa bile kayit
      gonderiliyor.
-->
