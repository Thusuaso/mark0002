<template>
  <div>
    <TcmbCurrency
      @dateSelectedEmit="dateSelected($event)"
      @rateFetchedEmit="rateFetched($event)"
    />

    <div class="row mt-3">
      <div class="col">
        <FloatLabel>
          <AutoComplete
            v-model="selectedCompany"
            inputId="company"
            :suggestions="filteredCompany"
            optionLabel="FirmaAdi"
            @complete="searchCompany($event)"
            :disabled="!currency"
          />
          <label for="company">Company</label>
        </FloatLabel>
      </div>
      <div class="col">
        <FloatLabel>
          <AutoComplete
            v-model="selectedPo"
            inputId="po"
            :suggestions="filteredPo"
            optionLabel="SiparisNo"
            @complete="searchPo($event)"
            :disabled="!currency"
          />
          <label for="po">Po</label>
        </FloatLabel>
      </div>
      <div class="col">
        <Select
          v-model="selectedInvoice"
          :options="invoice"
          optionLabel="name"
          placeholder="Kind of Invoice"
          :disabled="!currency"
          @change="invoiceSelected($event)"
        />
      </div>
      <div class="col">
        <FloatLabel>
          <InputText id="invoiceno" v-model="invoiceno" :disabled="!currency" />
          <label for="invoiceno">Invoice No</label>
        </FloatLabel>
      </div>
    </div>

    <div class="row mt-3">
      <div class="col">
        <CustomInput
          :value="tl"
          text="₺"
          @onInput="inputTl($event)"
          :disabled="!currency"
        />
      </div>
      <div class="col">
        <CustomInput
          :value="usd"
          text="$"
          @onInput="inputUsd($event)"
          :disabled="!currency"
        />
      </div>
    </div>

    <div class="row mt-3">
      <div class="col">
        <FloatLabel>
          <Textarea
            id="description"
            v-model="description"
            rows="5"
            class="w-100"
            :disabled="!currency"
          />
          <label for="description">Description</label>
        </FloatLabel>
      </div>
    </div>

    <div class="row mt-3">
      <div class="col">
        <Button
          type="button"
          severity="secondary"
          class="w-100"
          label="New"
          @click="newForm"
          :disabled="disabledNewForm"
        />
      </div>
      <div class="col">
        <Button
          type="button"
          severity="success"
          class="w-100"
          label="Save"
          @click="save"
          :disabled="disabledSaveForm"
        />
      </div>
    </div>

    <div class="row mt-3">
      <div class="col">
        <FileUpload
          mode="basic"
          accept=".pdf"
          :maxFileSize="1000000"
          :disabled="!containerStore.getContainerResults"
          @select="onUpload($event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useContainerStore } from "~/stores/container"
import { useLogsStore } from "~/stores/logs"
import { toIsoDate } from "~/utils/dates"

export default {
  props: {
    company: {
      type: Array,
      required: false,
      default: () => [],
    },
    orders: {
      type: Array,
      required: false,
      default: () => [],
    },
    invoice: {
      type: Array,
      required: false,
      default: () => [],
    },
  },

  computed: {
    containerStore() {
      return useContainerStore()
    },
    logsStore() {
      return useLogsStore()
    },
  },

  data() {
    return {
      selectedCompany: null,
      filteredCompany: null,
      selectedPo: null,
      filteredPo: null,
      selectedInvoice: null,
      invoiceno: null,
      containerdate: new Date(),
      tl: 0.0,
      currency: 0.0,
      usd: 0.0,
      description: "",
      disabledNewForm: false,
      disabledSaveForm: true,
      containerdata: {},
      invoice_document_id: 0,
    }
  },

  methods: {
    /* <TcmbCurrency> kur getirdiginde. Kur gelmeden tum alanlar pasif. */
    rateFetched(event) {
      this.currency = event.rate
    },

    dateSelected(event) {
      this.containerdate = toIsoDate(event)
    },

    invoiceSelected(event) {
      this.invoice_document_id = event.value.id == 7 ? 70 : 50
    },

    inputUsd(event) {
      this.usd = event
      this.tl = event * this.currency
    },

    inputTl(event) {
      this.tl = event
      this.usd = event / this.currency
    },

    /*
     * DUZELTILDI -- KAYIT YAPILMADAN DOSYA SECILIRSE PATLIYORDU.
     *
     * Bu metot getContainerResults'in UC alanini okuyor (FirmaID,
     * FaturaNo, ID). O deger yalnizca setContainerInputSave BASARIYLA
     * dondukten sonra doluyor; baslangic degeri null.
     *
     * Nuxt 2'de FileUpload her zaman etkindi, yani kullanici "Save"e
     * basmadan bir PDF secerse
     *     TypeError: Cannot read properties of null (reading 'FirmaID')
     * aliyordu -- hicbir mesaj gormeden. Akis "once kaydet, sonra
     * faturayi yukle" oldugu icin bu gercekci bir sira hatasi.
     *
     * Iki katmanli koruma: FileUpload artik kayit olmadan PASIF
     * (sablonda :disabled) ve metot yine de kontrol ediyor.
     */
    onUpload(event) {
      const results = this.containerStore.getContainerResults

      if (!results) {
        console.warn(
          "InputForm.onUpload(): henuz kayit yok (getContainerResults " +
            "null), dosya gonderilmedi.",
        )
        useAppToast().error("Önce faturayı kaydetmelisiniz.")
        return
      }

      useFileService().sendInvoiceShipping(
        event.files[0],
        results.FirmaID,
        results.FaturaNo + ".pdf",
      )

      this.containerStore.setContainerInputFileSave({
        invoicedocumentid: this.invoice_document_id,
        invoiceid: results.ID,
        ...this.containerdata,
      })
    },

    reset() {
      this.selectedCompany = null
      this.selectedPo = null
      this.selectedInvoice = null
      this.invoiceno = null
      this.containerdate = new Date()
      this.tl = 0.0
      this.currency = 0.0
      this.usd = 0.0
      this.description = ""
      this.disabledSaveForm = true
      this.disabledNewForm = false
    },

    /*
     * DUZELTILDI -- EKSIK SECIMLE "Save" PATLIYORDU.
     *
     * Govde kurulurken uc secim KOSULSUZ okunuyordu:
     *     this.selectedCompany.ID
     *     this.selectedPo.SiparisNo
     *     this.selectedInvoice.id
     *
     * Ucu de null baslatiliyor ve "New"e basildiktan sonra Save ETKIN
     * oluyor -- yani kullanici hicbir sey secmeden Save'e basabiliyordu
     * ve
     *     TypeError: Cannot read properties of null (reading 'ID')
     * aliyordu. Hicbir mesaj yok, dugme olu gorunuyordu.
     *
     * Ayrica log metni de ayni null'lari okuyor, yani oradan da
     * patliyordu.
     */
    save() {
      if (!this.selectedCompany || !this.selectedPo || !this.selectedInvoice) {
        useAppToast().error("Firma, PO ve fatura türü seçilmelidir.")
        return
      }

      this.containerdata = {
        companyid: this.selectedCompany.ID,
        companyname: this.selectedCompany.FirmaAdi,
        po: this.selectedPo.SiparisNo,
        invoiceno: this.invoiceno,
        date: this.containerdate,
        tl: this.tl,
        usd: this.usd,
        currency: this.currency,
        description: this.description,
        userId: useCookie("userId").value,
        nowDate: toIsoDate(new Date()),
        invoicekindid: this.selectedInvoice.id,
      }

      this.containerStore.setContainerInputSave(this.containerdata)

      this.logsStore.setLogs({
        description:
          this.selectedPo.SiparisNo +
          " po ya " +
          this.invoiceno +
          " fatura no ile " +
          this.selectedInvoice.name +
          " faturası $" +
          this.usd.toFixed(4) +
          " ve $" +
          this.currency +
          " kur girilmiştir.",
        po: this.selectedPo.SiparisNo,
        color: "#ffec31",
      })

      this.reset()
    },

    newForm() {
      this.disabledNewForm = true
      this.disabledSaveForm = false
    },

    searchPo(event) {
      if (event.query.length == 0) {
        this.filteredPo = this.orders
        return
      }

      this.filteredPo = this.orders.filter((x) =>
        x.SiparisNo.toLowerCase().startsWith(event.query.toLowerCase()),
      )
    },

    searchCompany(event) {
      if (event.query.length == 0) {
        this.filteredCompany = this.company
        return
      }

      this.filteredCompany = this.company.filter((x) =>
        x.FirmaAdi.toLowerCase().startsWith(event.query.toLowerCase()),
      )
    },
  },
}
</script>

<style scoped>
@media screen and (max-width: 576px) {
  .row {
    clear: both;
    display: block;
    width: 100%;
  }
  .col {
    clear: both;
    display: block;
    width: 100%;
  }
  .col-3 {
    clear: both;
    display: block;
    width: 100%;
  }
}
</style>

<!--
  components/container/InputForm.vue
  (Nuxt 2: components/container/input/form.vue)

  Etiket adi <ContainerInputForm>. Nuxt 2'de ad `containerInputForm` idi
  (plugins/components.js:257, ELLE kayit).

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] <currencyApi> -> <TcmbCurrency>
      Nuxt 2'de `currencyApi` adi components/tcmb/currency.vue dosyasina
      ELLE baglanmisti (plugins/components.js:146 + :167) -- yani ad ile
      dosya arasinda hicbir iliski yoktu. O dosya pilota
      app/components/tcmb/Currency.vue olarak tasinmis durumda (commit
      864302344) ve emit adlari BIREBIR ayni: dateSelectedEmit,
      rateFetchedEmit.

  [x] AutoComplete: field -> optionLabel   (iki yerde)
      PrimeVue 4'un AutoComplete'inde `field` prop'u YOK; secim
      yapildiginda input "[object Object]" gosterirdi.

  [x] <Dropdown> -> <Select>               (PrimeVue 4 adi)

  [x] <span class="p-float-label"> -> <FloatLabel>   (dort yerde)
      Sinif PrimeVue 4'te tamamen kaldirildi; stilsiz span olarak render
      edilip etiketler girdilerin uzerine yuzmek yerine akista kaliyordu.

  [x] Textarea'da inputId="description" -> id="description"
      Textarea duz bir <textarea> render ediyor, PrimeVue'nun inputId
      sarmalayici prop'una ihtiyaci yok -- `inputId` BU bilesende
      taninmadigi icin etiket hicbir alana baglanmiyordu.

  [x] p-button-secondary / p-button-success -> severity
      Sinif ailesi v4'te kaldirildi; birakilsa New ve Save AYNI
      (varsayilan) renkte olurdu.

  [x] plugins/date -> utils/dates (toIsoDate)
      ESLEME BIREBIR: date.dateToString = toIsoDate (yil-ay-gun).
      Burada API'ye YAZILAN tarihler uretiliyor (date, nowDate).

  [x] plugins/upload -> useFileService()
      `upload.sendInvoiceShipping` -> useFileService().sendInvoiceShipping
      Bu metot BU COMMIT'TE useFileService'e eklendi (daha once yalnizca
      "tasinacaklar" listesinde duruyordu).

  [x] this.$logs.save(log) -> logsStore.setLogs(log)
      plugins/logs.js yalnizca dispatch('setLogs')'u saran bir katmandi;
      logs store'u BU COMMIT'TE eklendi (app/stores/logs.ts).

  [x] `import Cookies from "js-cookie"` -> useCookie
  [x] this.$store.dispatch(...) -> containerStore.*  (iki yerde)

  DUZELTILDI -- NUXT 2'DE SESSIZCE PATLIYORDU:

  [x] Eksik secimle "Save" TypeError firlatiyordu (gerekcesi save()
      icinde).
  [x] Kayit yapilmadan dosya secilirse onUpload TypeError firlatiyordu
      (gerekcesi onUpload icinde). FileUpload artik kayit olmadan pasif.

  KALDIRILDI -- OLU KOD:

  [x] `import currency from "../../../plugins/currency"`
      HIC KULLANILMIYORDU -- tek referansi containerDateSelected icindeki
      YORUMLU blokta. Ayni olu import ayo.vue'da da vardi ve orada
      `axios` + `xml2js`'i ISTEMCI paketine sokuyordu (commit 5fc77edb1).
      Burada da ayni bedeli oduyordu.

  [x] methods.containerDateSelected
      Yalnizca YORUMLU <Calendar> blogundan cagriliyordu; sablonda
      etkin hicbir referansi yok. Icinde $excelApi cagrisi vardi, yani
      kaldirmak o bagimliligi da dusurdu.

  [x] methods.usdInput ve methods.tlInput
      Hicbir yerden cagrilmiyor. Etkin olanlar inputUsd/inputTl
      (adlari BENZER ama farkli); bu ikisi eski bir surumden kalmis.

  [x] data.disabled ve data.disabled_input
      Sablonda yalnizca YORUMLU bloklarda geciyorlardi. `disabled`
      newForm()/reset() icinde yazilyordu ama OKUYAN kimse yoktu.
      Etkin alanlarin pasifligi `!currency` ile belirleniyor.

  [x] Yorum icine alinmis iki <div class="col"> blogu (Calendar ve
      Currency CustomInput'u) -- ikisi de Vue 2 donemine ait ve
      kaldirilan alanlara bagli.

  DIKKAT -- KASITLI OLARAK DEGISTIRILMEDI:

      onUpload, dosya yuklemesini BEKLEMIYOR: sendInvoiceShipping'in
      promise'i ne await ediliyor ne .catch()'leniyor, hemen ardindan
      setContainerInputFileSave cagriliyor. Yukleme basarisiz olsa bile
      veritabanina kayit dusuyor. Nuxt 2'deki akis bu; siralamayi
      degistirmek davranis degisikligi.

      `invoice_document_id` yalnizca fatura turu ID'si 7 ise 70, aksi
      halde 50. Bu esleme (7 -> Gumruk) sayfadaki invoiceKindList'ten
      geliyor; sabit degerler birebir korundu.
-->
