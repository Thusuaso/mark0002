<template>
  <div>
    <div class="row mt-3 mb-8">
      <div class="col">
        <FloatLabel>
          <InputText id="po" type="text" v-model="proforma.po" />
          <label for="po">Po</label>
        </FloatLabel>
      </div>
      <div class="col">
        <FloatLabel>
          <Calendar
            v-model="selectedProformaDate"
            inputId="proforma_date"
            @date-select="proformatDateSelected($event)"
            dateFormat="dd/mm/yy"
          />
          <label for="proforma_date">Proforma Date</label>
        </FloatLabel>
      </div>
    </div>
    <div class="row mt-3 mb-8">
      <div class="col">
        <CustomInput
          :value="proforma.amount"
          text="Amount"
          @onInput="proforma.amount = $event"
          :disabled="false"
        />
      </div>
      <div class="col">
        <FloatLabel>
          <InputText id="desc" type="text" v-model="proforma.description" />
          <label for="desc">Description</label>
        </FloatLabel>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <FileUpload
          class="w-100"
          mode="basic"
          :auto="false"
          customUpload
          @select="proformaUpload($event)"
          chooseLabel="Upload"
        />
      </div>
      <div class="col">
        <a :href="proformaLink" ref="proforma_link"></a>
        <Button
          severity="success"
          class="h-100"
          @click="$refs.proforma_link.click()"
          :disabled="proforma_link_disabled"
        >
          <i class="pi pi-download"></i>
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import { toIsoDate, fromIsoDate } from "~/utils/dates"
import { useOfferStore } from "~/stores/offer"

export default {
  props: {
    model: {
      type: Object,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
  },
  computed: {
    offerStore() {
      return useOfferStore()
    },
    fileBase() {
      return useRuntimeConfig().public.fileServiceBase.replace(/\/+$/, "")
    },
  },
  data() {
    return {
      proforma_link_disabled: true,
      selectedProformaDate: null,
      proforma: {
        po: "",
        date: "",
        amount: 0,
        description: "",
      },
      proformaLink: "",
    }
  },
  /*
   * created() KORUNDU: govde tamamen senkron (yalnizca prop'lari yerel
   * state'e esliyor, istek atmiyor) ve bu bilesen SSR'da HIC mount
   * edilmiyor -- tek kullanicisi offer/Form.vue icindeki, v-model:visible
   * false ile baslayan <Dialog>.
   */
  created() {
    this.proforma.po = this.model.Proforma_Po_No
    this.selectedProformaDate = fromIsoDate(this.model.Proforma_Tarih)
    this.proforma.amount = this.model.Proforma_Tutar
    this.proforma.description = this.model.ProformaNot
    this.proformaLink = `${this.fileBase}/file/download/teklif/proforma/${this.id}/${this.model.Proforma_Cloud_Dosya}`
    if (this.model.Proforma_Cloud) {
      this.proforma_link_disabled = false
    }
  },
  methods: {
    proformaUpload(event) {
      const toast = useAppToast()
      const fileService = useFileService()

      fileService.sendOfferProforma(event.files[0], this.id).then((response) => {
        if (response.Status) {
          this.offerStore
            .setOfferProformaUpload({
              ...this.proforma,
              id: this.id,
              cloud: 1,
              name: event.files[0].name,
            })
            .then((ok) => {
              if (ok) {
                toast.success("Başarıyla Yüklendi")
                this.proformaLink = `${this.fileBase}/file/download/teklif/proforma/${this.id}/${event.files[0].name}`
                this.proforma_link_disabled = false
              } else {
                toast.error("Yükleme Başarısız")
              }
            })
            /*
             * .catch EKLENDI -- bkz. alt nottaki "ULASILAMAYAN ELSE".
             * Store action'i basarisizlikta reject(false) ediyor, yani
             * yukaridaki else'e HIC girilmiyordu.
             */
            .catch(() => {
              toast.error("Yükleme Başarısız")
            })
        } else {
          toast.error("Dosya Yükleme Başarısız.")
        }
      })
    },
    proformatDateSelected(event) {
      this.proforma.date = toIsoDate(event)
    },
  },
}
</script>

<!--
  components/offers/proforma.vue -> app/components/offer/Proforma.vue

  Otomatik ice alma adi `OfferProforma` -- Nuxt 2'deki global kayit adiyla
  AYNI (plugins/components.js:74), yani cagri yeri degismiyor.

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] import date from "../../plugins/date"
         -> import { toIsoDate, fromIsoDate } from "~/utils/dates"

      !!! BURADA AUTO-IMPORT KULLANILMAMALI !!!
      Pilotta `dateToString` adi IKI yerde tanimli ve auto-import
      CAKISMAYI utils/formatters.js lehine cozuyor (dev sunucusu bunu
      "Duplicated imports ... dates.ts has been ignored" diye
      uyariyor). Iki bicim FARKLI:
          utils/formatters.js dateToString -> "02-10-2026"  (GOSTERIM)
          utils/dates.ts      toIsoDate    -> "2026-10-02"  (API)
      Kaynaktaki plugins/date.js YYYY-MM-DD uretiyordu ve bu deger
      API'ye YAZILIYOR. Ciplak `dateToString` cagrilsa proforma tarihi
      sessizce ters bicimde kaydedilirdi. Bu yuzden acik import.

  [x] <span class="p-float-label"> -> <FloatLabel>   (sinif v4'te YOK)
  [x] class="p-button-success" -> severity="success"
  [x] upload.sendOfferProforma -> useFileService().sendOfferProforma
      (metot useFileService'e BU commit'te eklendi -- plugins/upload.js'in
      11 metodunun son ucu bu teklif ekranlariyla tamamlandi.)
  [x] this.$store.dispatch("setOfferProformaUpload") -> useOfferStore()
  [x] this.$toast -> useAppToast()

  [x] SABIT ADRES -> runtimeConfig.
      Kaynakta indirme adresi iki yerde
      "https://file-service.mekmar.com/..." olarak GOMULUYDU. Pilotta
      runtimeConfig.public.fileServiceBase var (useFileService de ayni
      degeri kullaniyor), yani ortam degistirmek icin kod degismiyor.

  [x] <Calendar> etiketinin label'i ONARILDI: kaynakta
      <label for="po"> yaziyordu -- yani Proforma Date etiketi yukarıdaki
      "Po" INPUT'unu isaret ediyordu (ayni belgede iki kez for="po").
      Etikete tiklayinca yanlis alan odaklaniyordu. inputId="proforma_date"
      eklenip label ona baglandi. (Ayni hata sinifi CustomInput'ta da
      vardi -- bkz. app/components/CustomInput.vue [1].)

  [x] FileUpload'a `customUpload` + `:auto="false"` eklendi.
      PrimeVue 4'te mode="basic" FileUpload, url verilmediginde ve
      customUpload bildirilmediginde secimden sonra kendi kendine
      yuklemeye calisip konsola hata basiyor. Burada yukleme isi
      @select icinde elle yapiliyor, yani dogru bildirim bu.

  KALDIRILDI:
  - proformaUpload() icindeki `const data = { id, cloud, name }` --
    tanimlaniyor ama KULLANILMIYOR; hemen altindaki dispatch kendi
    nesnesini satir icinde kuruyor.

  == ULASILAMAYAN ELSE + .catch EKLENDI ==

  stores/offer.ts -> setOfferProformaUpload basarisizlikta
      reject(false)
  ediyor (resolve(false) DEGIL). Cagri yeri ise yalnizca
      .then(r => { if (r) ... else toast.error(...) })
  yaziyordu; reject dalinda o `else` HIC calismiyor, promise
  ISLENMEMIS RET (unhandled rejection) olarak dusuyordu -- yani yukleme
  basarisiz oldugunda kullanici HICBIR uyari gormuyordu.

  `.catch()` eklenerek else'in zaten amaclanmis oldugu hata toast'i
  gosteriliyor. Bu GORUNUR bir degisiklik (eskiden sessizdi), ama
  kaynaktaki niyetin dogru okunusu. Ayni kalip Sample.vue'da da var.
-->
