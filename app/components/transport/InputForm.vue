<template>
  <div class="container">
    <TcmbCurrency
      @dateSelectedEmit="dateSelected($event)"
      @rateFetchedEmit="rateFetched($event)"
    />

    <div class="row mb-3">
      <div class="col">
        <Button type="button" label="New Company" @click="newCompany" />
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-3">
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
      <div class="col-3">
        <FloatLabel>
          <InputText id="invoiceno" v-model="invoiceno" :disabled="!currency" />
          <label for="invoiceno">Invoice No</label>
        </FloatLabel>
      </div>
    </div>

    <div class="row">
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
          <label for="po">Order No</label>
        </FloatLabel>
      </div>
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

    <div class="row">
      <div class="col">
        <Button
          type="button"
          class="w-100"
          label="New"
          @click="newForm"
          :disabled="newButtonDisabled"
        />
      </div>
      <div class="col">
        <Button
          type="button"
          severity="success"
          class="w-100"
          label="Save"
          @click="save"
          :disabled="saveButtonDisabled"
        />
      </div>
      <div class="col">
        <Button
          type="button"
          severity="warn"
          class="w-100"
          label="Update"
          @click="update"
          :disabled="updateButtonDisabled"
        />
      </div>
      <div class="col">
        <Button
          type="button"
          severity="danger"
          class="w-100"
          label="Delete"
          @click="deleteForm"
          :disabled="deleteButtonDisabled"
        />
      </div>
    </div>

    <div class="row">
      <div class="col">
        <DataTable
          :value="transportList"
          v-model:selection="selectedTransport"
          selectionMode="single"
          @row-click="transportSelected($event)"
        >
          <Column field="companyName" header="Company" />
          <Column field="po" header="Po" />
          <Column field="invoiceno" header="Invoice No" />
          <Column field="date" header="Date" />
          <Column field="tl" header="Tl">
            <template #body="slotProps">
              {{ formatPriceTl(slotProps.data.tl) }}
            </template>
          </Column>
          <Column field="currency" header="Currency">
            <template #body="slotProps">
              {{ formatPriceUsd(slotProps.data.currency) }}
            </template>
          </Column>
          <Column field="usd" header="Usd">
            <template #body="slotProps">
              {{ formatPriceUsd(slotProps.data.usd) }}
            </template>
          </Column>
        </DataTable>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <Button
          type="button"
          severity="success"
          class="w-100"
          label="Save"
          :disabled="!transportList.length"
          @click="saveTransport"
        />
      </div>
    </div>

    <div class="row">
      <div class="col">
        <FileUpload
          mode="basic"
          accept=".pdf"
          :maxFileSize="1000000"
          :disabled="!selectedCompany || !transportList.length"
          @select="onUpload($event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useTransportStore } from "~/stores/transport"
import { useLogsStore } from "~/stores/logs"
import { toIsoDate, fromIsoDate } from "~/utils/dates"

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
  },

  computed: {
    transportStore() {
      return useTransportStore()
    },
    logsStore() {
      return useLogsStore()
    },
  },

  data() {
    return {
      filteredCompany: null,
      selectedCompany: null,
      transportdate: null,
      invoiceno: null,
      selectedPo: null,
      filteredPo: null,
      tl: 0.0,
      currency: 0,
      usd: 0.0,
      newButtonDisabled: false,
      transportList: [],
      saveButtonDisabled: true,
      updateButtonDisabled: true,
      deleteButtonDisabled: true,
      selectedTransport: {},
    }
  },

  methods: {
    /* <TcmbCurrency> kur getirdiginde. Kur gelmeden tum alanlar pasif. */
    rateFetched(event) {
      this.currency = event.rate
    },

    dateSelected(event) {
      this.transportdate = toIsoDate(event)
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
     * DUZELTILDI -- SECIM YOKKEN PATLIYORDU.
     *
     * `this.selectedCompany.ID` kosulsuz okunuyordu ve selectedCompany
     * null baslatiliyor. FileUpload da HER ZAMAN etkindi, yani firma
     * secmeden bir PDF secmek
     *     TypeError: Cannot read properties of null (reading 'ID')
     * firlatiyordu -- hicbir mesaj gormeden.
     *
     * Ayrica bos bir transportList gonderilmesinin de anlami yok.
     * FileUpload artik iki kosul saglanmadan PASIF; metot yine de
     * kontrol ediyor.
     */
    async onUpload(event) {
      if (!this.selectedCompany || !this.transportList.length) {
        console.warn(
          "transport/InputForm.onUpload(): firma secili degil ya da " +
            "liste bos, dosya gonderilmedi.",
        )
        useAppToast().error("Önce firma seçip en az bir satır eklemelisiniz.")
        return
      }

      await useFileService().sendTransport(
        event.files[0],
        this.selectedCompany.ID,
        this.invoiceno,
      )
      await this.transportStore.setTransportFileSave(this.transportList)
      this.reset()
    },

    /*
     * DUZELTILDI -- `find` ICINDE ATAMA VARDI (= yerine ==).
     *
     * Nuxt 2'deki hali:
     *
     *   this.selectedCompany = this.company.find(
     *     (x) => (x.ID = event.data.companyId))
     *   this.selectedPo = this.orders.find(
     *     (x) => (x.SiparisNo = event.data.po))
     *
     * Bunlar KARSILASTIRMA DEGIL ATAMA. Iki ayri sonucu vardi:
     *
     * [1] PROP DIZILERINI BOZUYORDU. `company` ve `orders` prop'lari
     *     store'dan geliyor (transport ve shared store'lari). Atama
     *     dizinin ILK ogesinin ID'sini / SiparisNo'sunu event'ten gelen
     *     degerle EZIYORDU -- yani bir satira tiklamak paylasilan firma
     *     ve siparis listelerini kalici olarak bozuyordu. Sonraki
     *     autocomplete aramalari ve save() bozulmus veriyi kullaniyordu.
     *
     * [2] HER ZAMAN ILK OGEYI DONDURUYORDU. Atama ifadesi atanan degeri
     *     dondurur; deger 0/null/"" olmadikca truthy oldugu icin find()
     *     ilk ogede duruyordu. Yani hangi satira tiklanirsa tiklansin
     *     formda LISTENIN ILK firmasi ve ILK siparisi seciliyordu.
     *
     * Ikisi birlikte: satira tiklayip "Update"e basmak, yanlis firma ve
     * yanlis PO ile guncelleme yapiyordu -- ve bunu sessizce.
     *
     * `==` oldu (`===` DEGIL: event.data.companyId sunucudan dizge
     * gelebiliyor, x.ID ise sayi; gevsek karsilastirma Nuxt 2'nin diger
     * yerlerindeki kuralla da tutarli).
     */
    transportSelected(event) {
      this.saveButtonDisabled = true
      this.updateButtonDisabled = false
      this.deleteButtonDisabled = false
      this.newButtonDisabled = true

      this.selectedCompany = this.company.find(
        (x) => x.ID == event.data.companyId,
      )
      this.transportdate = fromIsoDate(event.data.date)
      this.invoiceno = event.data.invoiceno
      this.selectedPo = this.orders.find((x) => x.SiparisNo == event.data.po)
      this.tl = event.data.tl
      this.usd = event.data.usd
      this.currency = event.data.currency
    },

    saveTransport() {
      this.transportStore.setTransportSave(this.transportList)
      this.newButtonDisabled = false
    },

    reset() {
      this.saveButtonDisabled = true
      this.updateButtonDisabled = true
      this.transportdate = null
      this.selectedPo = null
      this.tl = 0.0
      this.currency = 0.0
      this.usd = 0.0
      this.selectedTransport = {}
      this.selectedCompany = null
      this.invoiceno = null
    },

    newForm() {
      this.newButtonDisabled = true
      this.saveButtonDisabled = false
      this.updateButtonDisabled = true
      this.deleteButtonDisabled = true
    },

    /*
     * DUZELTILDI -- EKSIK SECIMLE PATLIYORDU.
     *
     * `this.selectedCompany.ID` ve `this.selectedPo.SiparisNo` kosulsuz
     * okunuyordu (hem govdede hem log metninde). Ikisi de null
     * baslatiliyor ve "New"e basildiktan sonra Save ETKIN oluyor, yani
     * kullanici hicbir sey secmeden Save'e basabiliyordu ->
     * TypeError, hicbir mesaj yok.
     */
    save() {
      if (!this.selectedCompany || !this.selectedPo) {
        useAppToast().error("Firma ve PO seçilmelidir.")
        return
      }

      this.transportList.push({
        /*
         * Yerel satir kimligi. Nuxt 2'de
         * `Math.random().toString(36).substr(2, 9)` idi; substr
         * kullanimdan kalkmis oldugu icin slice(2, 11) yazildi --
         * URETILEN DIZGE AYNI (2. karakterden 9 karakter).
         */
        id: Math.random().toString(36).slice(2, 11),
        companyId: this.selectedCompany.ID,
        companyName: this.selectedCompany.FirmaAdi,
        date: toIsoDate(this.transportdate),
        po: this.selectedPo.SiparisNo,
        tl: this.tl,
        currency: this.currency,
        usd: this.usd,
        invoiceno: this.invoiceno,
        nowDate: toIsoDate(new Date()),
        userId: useCookie("userId").value,
      })

      this.logsStore.setLogs({
        description:
          this.selectedPo.SiparisNo +
          " po ya " +
          this.invoiceno +
          " fatura no ile Nakliye Faturası $" +
          this.usd.toFixed(4) +
          " ve $" +
          this.currency +
          " kur girilmiştir.",
        po: this.selectedPo.SiparisNo,
        color: "#ffec31",
      })

      this.newButtonDisabled = false
    },

    /*
     * DUZELTILDI -- SATIR BULUNAMAZSA PATLIYORDU.
     *
     * Nuxt 2'de findIndex sonucu KONTROL EDILMIYORDU:
     *     const index = this.transportList.findIndex(...)
     *     this.transportList[index].companyId = ...
     * Bulunamazsa index -1 olur ve `transportList[-1]` undefined'dir ->
     *     TypeError: Cannot set properties of undefined
     *
     * deleteForm'da ise `splice(-1, 1)` dizinin SON satirini siliyordu --
     * yani silinmesi istenen satir yerine ALAKASIZ bir satir listeden
     * kayboluyordu.
     */
    update() {
      /* Yikici islem -- onay. Metin: app/utils/confirm.ts */
      if (!confirmAction()) return

      if (!this.selectedCompany || !this.selectedPo) {
        useAppToast().error("Firma ve PO seçilmelidir.")
        return
      }

      const index = this.transportList.findIndex(
        (x) => x.id == this.selectedTransport.id,
      )

      if (index < 0) {
        console.warn(
          "transport/InputForm.update(): secili satir listede yok, " +
            "guncelleme yapilmadi.",
        )
        return
      }

      const row = this.transportList[index]
      row.companyId = this.selectedCompany.ID
      row.companyName = this.selectedCompany.FirmaAdi
      row.date = toIsoDate(this.transportdate)
      row.po = this.selectedPo.SiparisNo
      row.tl = this.tl
      row.currency = this.currency
      row.usd = this.usd
      row.invoiceno = this.invoiceno

      this.reset()
      this.newButtonDisabled = false
    },

    deleteForm() {
      /* Yikici islem -- onay. Metin: app/utils/confirm.ts */
      if (!confirmAction()) return

      const index = this.transportList.findIndex(
        (x) => x.id == this.selectedTransport.id,
      )

      if (index < 0) {
        console.warn(
          "transport/InputForm.deleteForm(): secili satir listede yok, " +
            "silme yapilmadi.",
        )
        return
      }

      this.transportList.splice(index, 1)
      this.reset()
      this.newButtonDisabled = false
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

    newCompany() {
      this.$emit("new-company-form-dialog")
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
  components/transport/InputForm.vue
  (Nuxt 2: components/transport/input.vue)

  Etiket adi <TransportInputForm>. Nuxt 2'de ad `transportInput` idi
  (plugins/components.js:254, ELLE kayit). Dosya adi `input.vue` ->
  `InputForm.vue`: yol `transport/input` olsaydi auto-import adi
  `TransportInput` olurdu ve bir FORM oldugu kaybolurdu.

  === EN ONEMLI: `find` ICINDE ATAMA VARDI ===

  transportSelected() iki satirda `=` kullaniyordu, `==` degil:

      this.company.find((x) => (x.ID = event.data.companyId))
      this.orders.find((x) => (x.SiparisNo = event.data.po))

  Bunlar karsilastirma DEGIL ATAMA. Iki ayri sonucu vardi:

  [1] PROP DIZILERINI BOZUYORDU. `company` ve `orders` store'dan gelen
      diziler (transport + shared). Atama, dizinin ILK ogesinin ID'sini /
      SiparisNo'sunu event'ten gelen degerle EZIYORDU -- yani bir satira
      tiklamak PAYLASILAN firma ve siparis listelerini kalici olarak
      bozuyordu. Sonraki autocomplete aramalari ve kayitlar bozulmus
      veriyi kullaniyordu.

  [2] HER ZAMAN ILK OGEYI DONDURUYORDU. Atama ifadesi atanan degeri
      dondurur ve deger truthy oldugu icin find() ilk ogede duruyordu.
      Hangi satira tiklanirsa tiklansin formda LISTENIN ILK firmasi ve
      ILK siparisi seciliyordu.

  Ikisi birlikte: satira tiklayip "Update"e basmak YANLIS firma ve YANLIS
  PO ile guncelleme yapiyordu -- sessizce. `==` oldu (`===` degil:
  companyId sunucudan dizge gelebiliyor, x.ID sayi).

  DUZELTILDI -- DIGER SESSIZ PATLAMALAR:

  [x] save() eksik secimle TypeError firlatiyordu (gerekcesi metodun
      basinda). Ayni sorun log metninde de vardi.
  [x] update() ve deleteForm() findIndex sonucunu KONTROL ETMIYORDU:
      update'te `transportList[-1].companyId = ...` TypeError,
      deleteForm'da `splice(-1, 1)` SON satiri siliyordu.
  [x] onUpload() firma secili degilken TypeError firlatiyordu; FileUpload
      her zaman etkindi.

  [x] Sablonda `:disabled="!this.currency"` yaziyordu (ALTI yerde).
      Vue 3 sablon ifadelerinde `this` YOK -- Vue 2'de `with(this)`
      sayesinde calisiyordu. `!currency` oldu. (Pilotun geri kalaninda
      sablon icinde `this.` hic gecmiyor.)

  DIGER ZORUNLU DONUSUMLER:

  [x] <currencyApi> -> <TcmbCurrency>
      Nuxt 2'de `currencyApi` adi components/tcmb/currency.vue dosyasina
      ELLE baglanmisti; o dosya pilota app/components/tcmb/Currency.vue
      olarak tasindi (commit 864302344), emit adlari BIREBIR ayni.

  [x] AutoComplete field -> optionLabel   (iki yerde; v4'te `field` YOK)
  [x] <span class="p-float-label"> -> <FloatLabel>   (uc yerde)
  [x] p-button-primary SILINDI (Button'un varsayilani),
      p-button-success/warning/danger -> severity ("warning" DEGIL "warn")
  [x] :selection + @update:selection -> v-model:selection
  [x] plugins/date -> utils/dates (toIsoDate / fromIsoDate)
  [x] plugins/upload -> useFileService().sendTransport
      Bu metot BU COMMIT'TE useFileService'e eklendi.
  [x] this.$logs.save -> logsStore.setLogs
  [x] js-cookie Cookies.get -> useCookie
  [x] <Column ...></Column> -> <Column ... />
  [x] Math.random().toString(36).substr(2, 9) -> .slice(2, 11)
      substr kullanimdan kalkmis; URETILEN DIZGE AYNI.

  KALDIRILDI -- OLU KOD:

  [x] `import currency from "../../plugins/currency"`
      HIC KULLANILMIYORDU. Ayni olu import ayo.vue ve
      container/InputForm.vue'da da vardi; ayo.vue'da `axios` + `xml2js`'i
      ISTEMCI paketine sokuyordu (commit 5fc77edb1).

  [x] methods.transportDateSelected -- yalnizca YORUMLU <Calendar>
      blogundan cagriliyordu. Icinde $excelApi cagrisi vardi.
  [x] methods.usdInput / methods.tlInput -- hicbir yerden cagrilmiyor
      (etkin olanlar inputUsd/inputTl).
  [x] data.disabled / data.disabled_input -- yalnizca yorumlu bloklarda
      geciyorlardi; yaziliyor ama OKUNMUYORLARDI.
  [x] Yorum icine alinmis iki <div class="col-3"> / <div class="col">
      blogu (Calendar ve Currency CustomInput'u).
  [x] Date kolonundaki gereksiz #body slot'u -- icinde yalnizca
      `{{ slotProps.data.date }}` vardi, yani field ile ayni sey.

  DIKKAT -- KASITLI OLARAK DEGISTIRILMEDI:

      transportList YEREL bir dizi: "Save" (ust) satiri yalnizca listeye
      EKLIYOR, sunucuya gonderen ayri bir "Save" dugmesi var (alt).
      Ikisinin de etiketi "Save" -- kafa karistirici ama Nuxt 2 boyle.
      Alt dugme artik liste bosken PASIF (bos liste gondermenin anlami
      yok).

      onUpload yuklemeyi await EDIYOR ama .catch() YOK: file-service
      hata verirse yakalanmamis reddetme olusur ve reset() cagrilmaz.
      Nuxt 2'de de boyleydi.

      `transportdate` iki farkli tipte olabiliyor: dateSelected DIZGE
      (toIsoDate), transportSelected ise Date (fromIsoDate) yaziyor.
      save()/update() ikisini de toIsoDate'ten geciriyor, yani sonuc
      dogru -- ama tip tutarsizligi Nuxt 2'den devralindi.
-->
