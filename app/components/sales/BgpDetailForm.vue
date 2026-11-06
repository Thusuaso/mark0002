<template>
  <div class="container" style="padding: 100px">
    <div class="row">
      <div class="col">
        <div class="flex flex-column gap-2">
          <label for="customer">Customer</label>
          <InputText id="customer" v-model="formData.FirmaAdi" />
        </div>
      </div>
      <div class="col">
        <div class="flex flex-column gap-2">
          <label for="email">Mail</label>
          <InputText id="email" v-model="formData.Email" />
        </div>
      </div>
      <div class="col">
        <div class="flex flex-column gap-2">
          <label for="phone">Phone</label>
          <InputText id="phone" v-model="formData.PhoneNumber" />
        </div>
      </div>
    </div>

    <div class="flex flex-wrap gap-3 m-auto">
      <div
        v-for="opt of CALL_RESULTS"
        :key="opt.value"
        class="flex align-items-center"
      >
        <RadioButton
          v-model="ingredient"
          :inputId="`callResult_${opt.value}`"
          :value="opt.value"
        />
        <label :for="`callResult_${opt.value}`" class="ml-2">
          {{ opt.label }}
        </label>
      </div>
    </div>

    <div class="flex flex-wrap gap-3 m-auto">
      <div
        v-for="opt of CUSTOMER_DEGREES"
        :key="opt.value"
        class="flex align-items-center"
      >
        <RadioButton
          v-model="customerDegree"
          :inputId="`degree_${opt.value}`"
          :value="opt.value"
        />
        <label :for="`degree_${opt.value}`" class="ml-2">
          {{ opt.label }}
        </label>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <div class="flex flex-column gap-2">
          <label for="title">Title</label>
          <InputText id="title" v-model="formData.Baslik" />
        </div>
      </div>
      <div class="col">
        <div class="flex flex-column gap-2">
          <label for="reminderdate">Reminder Time</label>
          <DatePicker
            inputId="reminderdate"
            v-model="reminderdate"
            dateFormat="dd/mm/yy"
          />
        </div>
      </div>
    </div>

    <div class="row mt-2">
      <div class="col">
        <FloatLabel>
          <Textarea
            id="explanation"
            v-model="formData.Aciklama"
            class="w-100 h-75"
            rows="5"
          />
          <label for="explanation">Explanation</label>
        </FloatLabel>
      </div>
      <div class="col">
        <FloatLabel>
          <Textarea
            id="reminder"
            v-model="formData.HatirlatmaAciklama"
            class="w-100 h-75"
            rows="5"
          />
          <label for="reminder">Reminder</label>
        </FloatLabel>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <Button
          type="button"
          severity="success"
          class="w-100"
          label="Save"
          @click="saveProcess"
        />
      </div>
      <div class="col" v-if="!bgpStore.getBgpDetailButtonStatus">
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
import { useBgpStore } from "~/stores/bgp"
import { toIsoDate, fromIsoDate } from "~/utils/dates"

/*
 * Arama sonucu secenekleri.
 *
 * NEDEN TABLO: Nuxt 2'de bu dort secenek UC AYRI yerde ELLE tekrar
 * ediliyordu -- save(), update() ve createdProcess(). save() ve
 * update() icindeki 4 dalli if/else zincirleri BIREBIR AYNI 16 satirdi
 * (her dal dort bool'u tek tek yaziyordu), createdProcess() ise ters
 * yonde ayni esleme.
 *
 * Uc kopya birbirinden bagimsiz degisebildigi icin sessizce ayrisabilir:
 * yeni bir secenek eklenip yalnizca save()'e yazilsa, kayit dogru olur
 * ama form tekrar acildiginda hicbir radyo secili gelmez.
 *
 * `value` degerleri Nuxt 2'deki radyo value'lariyla BIREBIR AYNI, `field`
 * ise sunucuya giden bool alan adlari -- ikisi de degistirilmedi.
 */
const CALL_RESULTS = [
  { value: "WrongNumber", field: "WrongNumber", label: "Wrong Number" },
  { value: "NotResponse", field: "NotResponse", label: "No Answer" },
  { value: "Interested", field: "Interested", label: "Interested" },
  { value: "NotInterested", field: "NotInterested", label: "Not Interested" },
]

/* Nuxt 2'deki esleme: radyo value -> sunucuya yazilan Unvan degeri. */
const CUSTOMER_DEGREES = [
  { value: "Contractor", unvan: "contractor", label: "Contractor" },
  { value: "Architech", unvan: "architect", label: "Architech" },
]

export default {
  props: {
    formData: {
      type: Object,
      required: true,
    },
    projectName: {
      type: String,
      required: false,
      default: null,
    },
  },

  computed: {
    bgpStore() {
      return useBgpStore()
    },
  },

  data() {
    return {
      CALL_RESULTS,
      CUSTOMER_DEGREES,
      ingredient: null,
      customerDegree: null,
      reminderdate: null,
    }
  },

  created() {
    if (!this.bgpStore.getBgpDetailButtonStatus) {
      this.createdProcess()
    }
  },

  methods: {
    /*
     * Nuxt 2'de save() ve update() icinde BIREBIR AYNI 16 satir olarak
     * duran bool atamalari. Secili olmayan her secenek false, secili olan
     * true -- davranis aynen korundu (hicbiri secili degilse Nuxt 2'de de
     * dort alanin hicbirine DOKUNULMUYORDU, burada da oyle).
     */
    applyCallResult() {
      if (!this.ingredient) return

      for (const opt of CALL_RESULTS) {
        this.formData[opt.field] = opt.value === this.ingredient
      }
    },

    /* Nuxt 2'de de secim yoksa Unvan'a DOKUNULMUYORDU. */
    applyCustomerDegree() {
      const match = CUSTOMER_DEGREES.find(
        (x) => x.value === this.customerDegree,
      )
      if (match) this.formData.Unvan = match.unvan
    },

    saveProcess() {
      if (this.bgpStore.getBgpDetailButtonStatus) {
        this.save()
      } else {
        this.update()
      }
    },

    save() {
      this.applyCallResult()
      this.applyCustomerDegree()

      this.formData.HatirlatmaTarihi = toIsoDate(this.reminderdate)
      this.formData.KayitTarihi = toIsoDate(new Date())
      this.formData.ProjectName = this.projectName
      this.formData.Temsilci = useCookie("userId").value

      this.bgpStore.setBgpDetailSave(this.formData)
      this.$emit("bgp_detail_form_dialog_closed")
    },

    update() {
      this.applyCallResult()
      this.applyCustomerDegree()

      this.formData.HatirlatmaTarihi = toIsoDate(this.reminderdate)

      this.bgpStore.setBgpDetailUpdate(this.formData)
    },

    deleteForm() {
      /*
       * confirm() TARAYICI MODAL'I -- Nuxt 2'den birebir korundu.
       * Silme geri alinamaz oldugu icin onay adimi kaldirilmadi.
       */
      if (confirm("Are you sure you want to perform this action?")) {
        this.bgpStore.setBgpDetailDelete(this.formData.ID)
        this.$emit("bgp_detail_form_dialog_closed")
      }
    },

    createdProcess() {
      const result = CALL_RESULTS.find((opt) => this.formData[opt.field] === true)
      this.ingredient = result ? result.value : null

      const degree = CUSTOMER_DEGREES.find(
        (x) => x.unvan === this.formData.Unvan,
      )
      this.customerDegree = degree ? degree.value : null

      this.reminderdate = fromIsoDate(this.formData.HatirlatmaTarihi)
    },
  },
}
</script>

<!--
  components/sales/BgpDetailForm.vue
  (Nuxt 2: components/sales/bgp/detailForm.vue)

  Etiket adi <SalesBgpDetailForm>. Nuxt 2'de ad `bgpDetailForm` idi
  (plugins/components.js:235, ELLE kayit).

  DUZELTILDI -- IKINCI RADYO GRUBU YANLIS RADYOYU SECIYORDU:

  [x] Nuxt 2'de iki radyo grubu AYNI inputId'leri paylasiyordu:

          1. grup (arama sonucu): ingredient1, ingredient2,
                                  ingredient3, ingredient4
          2. grup (musteri unvani): ingredient1, ingredient2   <-- TEKRAR

      HTML id'si BELGEDE TEK olmak zorundadir ve <label for=...> ILK
      eslesen ogeye baglanir. Sonuc: "Contractor" etiketine tiklamak
      "Wrong Number" radyosunu, "Architech" etiketine tiklamak "No
      Answer" radyosunu seciyordu. Yani kullanici unvan secmeye calisirken
      ARAMA SONUCUNU degistiriyordu -- ve bu deger sunucuya yaziliyor.

      Id'ler artik gruba gore uretiliyor: callResult_* ve degree_*.
      Radyo VALUE'lari degismedi, yani sunucuya giden veri ayni.

      (Ayni sinif hata pages/reports/mekmer/stock.vue'da da vardi ve
       orada da duzeltilmisti -- yedi radyodan dordu ayni id'yi
       paylasiyordu.)

  DUZELTILDI -- UC KOPYA ESLEME TEK TABLOYA INDI:

  [x] Dort secenegin bool alanlarina cevrilmesi Nuxt 2'de UC AYRI yerde
      ELLE tekrar ediliyordu: save(), update() ve createdProcess().
      save() ile update() icindeki 4 dalli if/else zincirleri BIREBIR
      AYNI 16 satirdi.

      Uc kopya bagimsiz degisebildigi icin sessizce ayrisabilirdi: yeni
      bir secenek eklenip yalnizca save()'e yazilsa kayit dogru olur ama
      form tekrar acildiginda hicbir radyo secili gelmezdi.

      CALL_RESULTS / CUSTOMER_DEGREES tablolari + applyCallResult() /
      applyCustomerDegree() / createdProcess() bunu yapisal olarak
      imkansiz kiliyor. Esleme Nuxt 2'den BIREBIR cikarildi; hicbir
      secenek eklenmedi veya cikarilmadi.

      DAVRANIS KORUNDU: hicbir radyo secili degilse Nuxt 2'de de ilgili
      alanlara DOKUNULMUYORDU (ne bool'lar ne Unvan) -- applyCallResult
      ve applyCustomerDegree ayni sekilde erken donuyor.

  DIGER ZORUNLU DEGISIKLIKLER:

  [x] import date from "../../../plugins/date"
         -> import { toIsoDate, fromIsoDate } from "~/utils/dates"
      ESLEME BIREBIR: date.dateToString = toIsoDate (yil-ay-gun),
      date.stringToDate = fromIsoDate. Burada API'ye YAZILAN tarihler
      uretiliyor (KayitTarihi, HatirlatmaTarihi), bu yuzden toIsoDate
      sart -- global dateToString GOSTERIM icin olup gun-ay-yil uretir ve
      karistirmak kayit tarihlerini bozar.

  [x] `import Cookies from "js-cookie"` -> useCookie
  [x] mapGetters(["getBgpDetailButtonStatus"]) -> bgpStore
  [x] this.$store.dispatch(...) -> bgpStore.*  (uc yerde)

  [x] <Calendar> -> <DatePicker>  (PrimeVue 4 adi; pilot 33/11 DatePicker)
  [x] DatePicker: id -> inputId
      `id` kok sarmalayiciya gider, ic <input> ogesine DEGIL; yani
      <label for="reminderdate"> hicbir girdiye baglanmiyordu.

  [x] <span class="p-float-label"> -> <FloatLabel>  (iki yerde)
      Sinif PrimeVue 4'te tamamen kaldirildi; stilsiz span olarak render
      edilip <label> Textarea'nin uzerine yuzmek yerine akista kaliyordu.

  [x] Iki <label>'a `for` hedefi + Textarea'lara `id` verildi
      (explanation, reminder). Nuxt 2'de ikisi de yoktu: etikete tiklamak
      alani odaklamiyor, ekran okuyucular alani adlandiramiyordu.

  [x] p-button-success/danger -> severity  (sinif ailesi v4'te kaldirildi;
      birakilsa Save ve Delete AYNI renkte olurdu)

  [x] props.formData required:false -> required:true
      Sablon kosulsuz formData.FirmaAdi okuyor; prop gelmezse patlar.
      Sayfada ayrica v-if var, yani davranis degismiyor.

  DIKKAT -- KASITLI OLARAK DEGISTIRILMEDI:
      Bu bilesen `formData` PROP'UNUN alanlarini YERINDE degistiriyor
      (bool'lar, Unvan, tarihler, ProjectName, Temsilci). Vue 3 nesne
      prop'larinin ic alanlarina yazmayi engellemez ve uyarmaz. Ebeveyn
      bu nesneyi kendi data'sinda tutuyor, yani pratikte calisiyor;
      tasarim olarak yanlis ama Nuxt 2'deki akis bu.
-->
