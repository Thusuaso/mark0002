<template>
  <div class="row w-100 h-100" style="height: 500px; padding: 75px 50px">
    <div class="col-6">
      <div class="flex flex-column gap-2">
        <label for="savedate">Date</label>
        <DatePicker
          id="savedate"
          v-model="saveDate"
          dateFormat="dd/mm/yy"
          @date-select="saveDateSelected($event)"
        />
      </div>
      <div class="flex flex-column gap-2">
        <label for="customer">Customer</label>
        <InputText id="customer" v-model="followDetail.MusteriAdi" />
      </div>
      <FloatLabel class="mt-4">
        <Textarea
          id="explanation"
          v-model="followDetail.Aciklama"
          rows="5"
          cols="66"
        />
        <label for="explanation">Explanation</label>
      </FloatLabel>
    </div>

    <div class="col-6">
      <div class="flex flex-column gap-2">
        <label for="reminderdate">Reminder Time</label>
        <DatePicker
          id="reminderdate"
          v-model="reminderDate"
          dateFormat="dd/mm/yy"
          @date-select="reminderDateSelected($event)"
        />
      </div>
      <div class="flex flex-column gap-2">
        <label for="text">Title</label>
        <InputText id="text" v-model="followDetail.Baslik" />
      </div>
      <FloatLabel class="mt-4">
        <Textarea
          id="reminder"
          v-model="followDetail.Hatirlatma_Notu"
          rows="5"
          cols="66"
        />
        <label for="reminder">Reminder</label>
      </FloatLabel>
    </div>

    <div class="row">
      <div class="col w-100">
        <Button
          type="button"
          severity="success"
          class="w-100"
          label="Save"
          @click="saveProcess"
        />
      </div>
      <div v-if="!salesStore.getFollowDetailNewButton" class="col w-100">
        <Button
          type="button"
          severity="danger"
          class="w-100"
          label="Delete"
          @click="deleteForm"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useSalesStore } from "~/stores/sales"
import { toIsoDate, fromIsoDate } from "~/utils/dates"

export default {
  props: {
    followDetail: {
      type: Object,
      required: true,
    },
  },

  computed: {
    salesStore() {
      return useSalesStore()
    },
  },

  data() {
    return {
      saveDate: null,
      reminderDate: null,
    }
  },

  created() {
    if (!this.salesStore.getFollowDetailNewButton) {
      this.saveDate = fromIsoDate(this.followDetail.Tarih)
      this.reminderDate = fromIsoDate(this.followDetail.Hatirlatma_Tarih)
    } else {
      this.reset()
    }
  },

  methods: {
    reminderDateSelected() {
      this.followDetail.Hatirlatma_Tarih = toIsoDate(this.reminderDate)
    },

    saveDateSelected(event) {
      this.followDetail.Tarih = toIsoDate(event)
    },

    saveProcess() {
      if (this.salesStore.getFollowDetailNewButton) {
        this.save()
      } else {
        this.update()
      }
    },

    save() {
      this.followDetail.Temsilci = useCookie("userId").value
      this.salesStore.setFollowDetailSave(this.followDetail)
      this.reset()
    },

    update() {
      this.salesStore.setFollowDetailUpdate(this.followDetail)
    },

    deleteForm() {
      /* Yikici islem -- onay. Metin: app/utils/confirm.ts */
      if (!confirmAction()) return

      this.salesStore.setFollowDetailDelete(this.followDetail.ID)
      this.$emit("closed_follow_dialog")
      this.reset()
    },

    reset() {
      this.saveDate = null
      this.reminderDate = null
      this.followDetail.Aciklama = null
      this.followDetail.Baslik = null
      this.followDetail.Hatirlatma_Notu = null
    },
  },
}
</script>

<!--
  components/sales/FollowDetailForm.vue
  (Nuxt 2: components/sales/follow/formDetail.vue)

  Etiket adi <SalesFollowDetailForm>. Nuxt 2'de ad `followFormDetail`
  idi (plugins/components.js:230, ELLE kayit).

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] import convertDate from "../../../plugins/date"
         -> import { toIsoDate, fromIsoDate } from "~/utils/dates"

      ESLEME BIREBIR: plugins/date.js'teki dateToString yil-ay-gun
      ("2026-10-02") uretiyor = toIsoDate; stringToDate ayni bicimi
      parse ediyor = fromIsoDate. Ciktilari ayni.

      DIKKAT -- KARISTIRILMASI KOLAY: app/plugins/formatters.ts ile gelen
      GLOBAL `dateToString` BASKA bir sey, gun-ay-yil ("02-10-2026")
      uretiyor ve GOSTERIM icindir. Burada API'ye YAZILAN deger
      uretiliyor, bu yuzden toIsoDate sart. utils/dates.ts'in basindaki
      uyari tam bu ikilik yuzunden yazilmis.

  [x] `import Cookies from "js-cookie"` -> useCookie
      Cookies.get("userId") -> useCookie("userId").value
      (js-cookie pilota kurulmadi.)

  [x] mapGetters(["getFollowDetailNewButton"]) -> salesStore
      this.$store.dispatch(...) -> salesStore.*  (uc yerde)

  [x] <Calendar> -> <DatePicker>   (iki yerde)
      PrimeVue 4'te bilesenin adi DatePicker; `calendar` alt paketi hala
      geriye donuk uyumluluk icin duruyor ama pilot genelinde DatePicker
      kullaniliyor (33 kullanim / 11 Calendar).

  [x] <span class="p-float-label mt-4"> -> <FloatLabel class="mt-4">
      (iki yerde) p-float-label SINIFI PrimeVue 4'te tamamen kaldirildi;
      stilsiz span olarak render edilip <label> input'un uzerine yuzmek
      yerine akista kaliyordu.

  [x] class="p-button-success w-100" -> severity="success" class="w-100"
      class="p-button-danger w-100"  -> severity="danger" class="w-100"
      PrimeVue 4'te p-button-<severity> siniflari KALDIRILDI; sinif
      olarak birakilsa Save ve Delete AYNI (varsayilan) renkte olurdu.

  [x] IKI <label> ETIKETINE `for` HEDEFI VERILDI.
      Nuxt 2'de iki Textarea'nin label'i `for` ICERMIYORDU ve
      Textarea'larin da `id`si yoktu -- yani etiket hicbir alana
      BAGLI DEGILDI: etikete tiklamak alani odaklamiyor, ekran
      okuyucular alani adlandiramiyordu. id/for cifti eklendi
      (explanation, reminder). Gorunum degismiyor.

  DIKKAT -- KASITLI OLARAK DEGISTIRILMEDI:

      reset() ve saveDateSelected/reminderDateSelected, `followDetail`
      PROP'UNUN alanlarini YERINDE degistiriyor. Vue 3 nesne
      prop'larinin ic alanlarina yazmayi engellemez ve uyarmaz.
      Ebeveyn (pages/sales/follow.vue) ya store'daki nesneyi ya da kendi
      data'sindaki followFormModel'i geciriyor, yani yazmalar oraya
      gidiyor -- tasarim olarak yanlis ama Nuxt 2'deki akis bu ve
      degistirmek formun calisma bicimini degistirmek olurdu.
-->
