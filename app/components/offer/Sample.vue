<template>
  <div>
    <div class="row mt-3">
      <div class="col">
        <FloatLabel>
          <Calendar
            v-model="selectedSampleEntryDate"
            inputId="sample_entry_date"
            @date-select="sampleEntryDateSelected($event)"
          />
          <label for="sample_entry_date">Date of Entry</label>
        </FloatLabel>
      </div>
      <div class="col">
        <FloatLabel>
          <Calendar
            v-model="selectedSampleReminderDate"
            inputId="sample_reminder_date"
            @date-select="sampleReminderDateSelected($event)"
            dateFormat="dd/mm/yy"
          />
          <label for="sample_reminder_date">Reminder Date</label>
        </FloatLabel>
      </div>
      <div class="col">
        <FloatLabel>
          <InputText id="followno" type="text" v-model="sample.followno" />
          <label for="followno">Follow No</label>
        </FloatLabel>
      </div>
    </div>

    <div class="row mt-7">
      <div class="col">
        <CustomInput
          :value="sample.paid"
          text="Paid"
          @onInput="sample.paid = $event"
          :disabled="false"
        />
      </div>
      <div class="col">
        <CustomInput
          :value="sample.received"
          text="Received"
          @onInput="sample.received = $event"
          :disabled="false"
        />
      </div>
      <div class="col">
        <FloatLabel>
          <InputText id="desc" type="text" v-model="sample.description" />
          <label for="desc">Description</label>
        </FloatLabel>
      </div>
    </div>
    <div class="row mt-7">
      <div class="col">
        <FileUpload
          class="w-100"
          mode="basic"
          :auto="false"
          customUpload
          @select="sampleUpload($event)"
          chooseLabel="Upload"
        />
      </div>
      <div class="col">
        <a :href="sampleLink" ref="sample_link"></a>
        <Button
          severity="success"
          class="h-100"
          @click="$refs.sample_link.click()"
          :disabled="sample_link_disabled"
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
    id: {
      type: Number,
      required: true,
    },
    model: {
      type: Object,
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
      /*
       * KORUNDU: false ile basliyor, yani henuz dosya yoklken de
       * indirme butonu ETKIN. Proforma.vue'da ayni alan true ile
       * basliyor ve `Proforma_Cloud` ile aciliyor -- burada boyle bir
       * kontrol kaynakta YOK. Dosya yoksa baglanti 404'e gidiyor.
       * Davranis degisikligi olacagi icin dokunulmadi.
       */
      sample_link_disabled: false,
      sampleLink: null,
      selectedSampleReminderDate: null,
      selectedSampleEntryDate: null,
      sample: {
        entrydate: null,
        reminderdate: null,
        lastreminderdate: null,
        followno: null,
        paid: 0,
        received: 0,
        description: null,
      },
    }
  },
  /* created() KORUNDU -- Proforma.vue'daki ayni gerekce (senkron govde,
   * bilesen SSR'da mount edilmiyor). */
  created() {
    this.selectedSampleEntryDate = fromIsoDate(this.model.Numune_Giris_Tarihi)
    this.selectedSampleReminderDate = fromIsoDate(
      this.model.Numune_Hatirlatma_Tarihi
    )
    this.sampleLink = `${this.fileBase}/file/download/teklif/teklifNumune/${this.id}/${this.model.Numune_Cloud_Dosya}`
    this.sample.followno = this.model.Numune_Tracking_No
    this.sample.paid = this.model.Numune_Odenen_Tutar
    this.sample.received = this.model.Numune_Musteriden_Alinan
    this.sample.description = this.model.NumuneNot
  },
  methods: {
    sampleUpload(event) {
      const toast = useAppToast()
      const fileService = useFileService()

      fileService.sendSampleFile(event.files[0], this.id).then((response) => {
        if (response.Status) {
          this.offerStore
            .setOfferSampleUpload({
              ...this.sample,
              cloud: 1,
              name: event.files[0].name,
              id: this.id,
            })
            .then((ok) => {
              if (ok) {
                toast.success("Başarıyla Kaydedildi")
                this.sampleLink = `${this.fileBase}/file/download/teklif/teklifNumune/${this.id}/${event.files[0].name}`
              } else {
                toast.error("Kaydetme Başarısız")
              }
            })
            /* .catch EKLENDI -- bkz. alt nottaki "ULASILAMAYAN ELSE". */
            .catch(() => {
              toast.error("Kaydetme Başarısız")
            })
        } else {
          toast.error("Dosya Yükleme Başarısız")
        }
      })
    },
    sampleReminderDateSelected(event) {
      this.sample.reminderdate = toIsoDate(event)

      /*
       * Hatirlatma tarihinden 3 gun sonrasi -- bkz. alt nottaki
       * "GECERSIZ TARIH" maddesi. Date aritmetigi ay/yil tasmasini da
       * halleder, toIsoDate sifir dolgusunu da yapar.
       */
      const last = new Date(event)
      last.setDate(last.getDate() + 3)
      this.sample.lastreminderdate = toIsoDate(last)
    },
    sampleEntryDateSelected(event) {
      this.sample.entrydate = toIsoDate(event)
    },
  },
}
</script>

<!--
  components/offers/sample.vue -> app/components/offer/Sample.vue

  Otomatik ice alma adi `OfferSample` -- Nuxt 2'deki global kayit adiyla
  AYNI (plugins/components.js:75).

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] import date from "../../plugins/date.js"
         -> import { toIsoDate, fromIsoDate } from "~/utils/dates"
      ACIK IMPORT ZORUNLU -- ciplak `dateToString` auto-import tarafinda
      utils/formatters.js'e (GOSTERIM bicimi "02-10-2026") coozuluyor,
      oysa bu degerler API'ye YAZILIYOR ("2026-10-02"). Ayrintisi
      Proforma.vue'nun alt notunda.
  [x] <span class="p-float-label"> -> <FloatLabel>
  [x] class="p-button-success" -> severity="success"
  [x] upload.sendSampleFile -> useFileService().sendSampleFile
      (metot bu commit'te useFileService'e eklendi)
  [x] this.$store.dispatch("setOfferSampleUpload") -> useOfferStore()
  [x] this.$toast -> useAppToast()
  [x] SABIT "https://file-service.mekmar.com" -> runtimeConfig
      (iki yerde gomuluydu)
  [x] FileUpload'a customUpload + :auto="false" (v4'te url'siz basic
      mode kendi kendine yuklemeye calisiyor)

  [x] UC ETIKET DE YANLIS ALANI ISARET EDIYORDU: iki <Calendar>'in
      label'i `for="po"` yaziyordu -- oysa bu bileşende id="po" diye bir
      alan HIC YOK (o id Proforma.vue'da). Yani iki etiket hicbir seye,
      ustelik ayni seye bagliydi. inputId eklenip duzeltildi.

  ============================================================
  DAVRANIS DEGISIKLIGI -- GECERSIZ TARIH URETILIYORDU
  ============================================================
  Kaynak:
      const new_date = new Date(event);
      const day   = new_date.getDate() + 3;
      const month = new_date.getMonth() + 1;
      const year  = new_date.getFullYear();
      this.sample.lastreminderdate = year + "-" + month + "-" + day;

  Iki ayri kusur:

  1) AY/YIL TASMASI YOK. Gune dogrudan +3 ekleniyor, takvim
     hesaplanmiyor:
         29 Ekim  -> "2026-10-32"
         30 Ekim  -> "2026-10-33"
         30 Aralik -> "2026-12-33"
     Bunlar GECERSIZ tarih; SQL Server'a boyle bir dizge gidince
     donusum hatasi veriyor. Yani ayin son uc gununde numune
     hatirlatma kaydi KAYDEDILEMIYOR.

  2) SIFIR DOLGUSU YOK. Diger iki alan toIsoDate ile "2026-01-05"
     uretirken bu alan "2026-1-5" uretiyordu -- ayni kolona iki farkli
     bicim yaziliyordu.

  Ikisi de Date aritmetigi + toIsoDate ile duzeltildi:
      const last = new Date(event); last.setDate(last.getDate() + 3)
  setDate() tasmayi kendisi dogru hesaplar (29 Ekim + 3 -> 1 Kasim).

  == ULASILAMAYAN ELSE + .catch EKLENDI ==

  stores/offer.ts -> setOfferSampleUpload basarisizlikta reject(false)
  ediyor, resolve(false) DEGIL. Cagri yeri yalnizca .then(...) yazdigi
  icin `else { toast.error }` dali HIC calismiyor, promise islenmemis
  ret olarak dusuyordu -- yukleme basarisiz oldugunda kullanici hicbir
  uyari gormuyordu. .catch() eklendi. Ayni kalip Proforma.vue'da da var.
-->
