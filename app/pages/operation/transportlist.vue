<template>
  <div class="container">
    <TransportList
      :list="transportStore.getTransportList"
      @selected_transport_emit="selectedTransport($event)"
    />

    <Dialog v-model:visible="transport_dialog_form" modal header="">
      <div class="row mt-3 mb-3">
        <div class="col">
          <FloatLabel>
            <DatePicker
              inputId="transportDate"
              v-model="selectedDate"
              @date-select="dateSelected($event)"
              dateFormat="dd/mm/yy"
              :showIcon="true"
            />
            <label for="transportDate">Date</label>
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
              @item-select="poSelected($event)"
            />
            <label for="po">Order No</label>
          </FloatLabel>
        </div>
        <div class="col">
          <FloatLabel>
            <InputText id="invoice" type="text" v-model="model.invoice" />
            <label for="invoice">Invoice</label>
          </FloatLabel>
        </div>
      </div>

      <div class="row" style="height: 150px">
        <div class="col">
          <CustomInput
            :value="model.tl"
            text="TL"
            @onInput="model.tl = $event"
          />
        </div>
        <div class="col">
          <CustomInput
            :value="model.usd"
            text="USD"
            @onInput="model.usd = $event"
          />
        </div>
        <div class="col">
          <CustomInput
            :value="model.currency"
            text="Currency"
            @onInput="model.currency = $event"
          />
        </div>
      </div>

      <div class="row">
        <div class="col">
          <Button
            severity="warn"
            class="w-100"
            label="Update"
            :disabled="saving"
            @click="updateTransport"
          />
        </div>
        <div class="col">
          <Button
            severity="danger"
            class="w-100"
            label="Delete"
            :disabled="saving"
            @click="deleteTransport"
          />
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script>
import { useTransportStore } from "~/stores/transport"
import { useSharedStore } from "~/stores/shared"
import { toIsoDate, fromIsoDate } from "~/utils/dates"

export default {
  computed: {
    transportStore() {
      return useTransportStore()
    },
    sharedStore() {
      return useSharedStore()
    },
  },

  data() {
    return {
      transport_dialog_form: false,
      saving: false,
      model: {
        date: "",
        po: "",
        company: "",
        invoice: "",
        tl: 0,
        usd: 0,
        currency: 0,
        transportId: 0,
        productInvoiceId: 0,
      },
      selectedDate: new Date(),
      selectedPo: null,
      filteredPo: null,
    }
  },

  /*
   * [x] created() KALDIRILDI -- veri cekimi asagidaki <script setup>
   * blogunda useAsyncData ile. Gerekcesi orada.
   */

  methods: {
    /*
     * DUZELTILDI -- YUKLEME KATMANI EBEDIYEN ACIK KALABILIYORDU.
     *
     * Nuxt 2'de iki metot da soyle yaziliyordu:
     *
     *     dispatch('setBeginLoadingAction')
     *     dispatch('setDeleteTransport', model).then(response => {
     *       if (response) { dispatch('setEndLoadingAction'); ... }
     *       else          { dispatch('setEndLoadingAction'); ... }
     *     })                                    // <-- .catch() YOK
     *
     * Store tarafindaki eylemler elle `new Promise` ile sarilmisti ve
     * .catch() icermiyordu (ayrinti: app/stores/transport.ts icindeki
     * setUpdateTransport notu). Istek hata verirse dis promise NE
     * resolve NE reject oluyordu, yani bu .then() HIC calismiyor ve
     * endLoading HIC cagrilmiyordu. Pilotta yukleme BOOLEAN DEGIL SAYAC,
     * yani eksik kalan her endLoading KALICI: tam ekran katman acik
     * kaliyor ve kullanici sayfayi yenilemek zorunda kaliyor.
     *
     * Store artik duz async ve hatayi false'a ceviriyor; burada da
     * endLoading finally icinde. Ayrica istek surerken iki dugme PASIF
     * (saving), yani ust uste tiklama ile mukerrer istek gonderilemiyor.
     */
    async deleteTransport() {
      /* Yikici islem -- onay. Metin: app/utils/confirm.ts */
      if (!confirmAction()) return

      const toast = useAppToast()
      this.saving = true
      this.sharedStore.beginLoading()
      try {
        const ok = await this.transportStore.setDeleteTransport(this.model)
        if (ok) {
          /*
           * Metin Nuxt 2'den BIREBIR korundu ("Updated", silme olmasina
           * ragmen). Kullaniciya gorunen metni degistirmek ayri bir
           * karar.
           */
          toast.success("Successfully Updated")
          this.transport_dialog_form = false
        } else {
          toast.error("Error Updated")
        }
      } finally {
        this.sharedStore.endLoading()
        this.saving = false
      }
    },

    async updateTransport() {
      /* Yikici islem -- onay. Metin: app/utils/confirm.ts */
      if (!confirmAction()) return

      const toast = useAppToast()
      this.saving = true
      this.sharedStore.beginLoading()
      try {
        const ok = await this.transportStore.setUpdateTransport(this.model)
        if (ok) {
          toast.success("Successfully Updated")
          this.transport_dialog_form = false
        } else {
          toast.error("Error Updated")
        }
      } finally {
        this.sharedStore.endLoading()
        this.saving = false
      }
    },

    /*
     * Secilen tarihin TCMB USD satis kurunu getirir.
     *
     * ARTIK EXCEL SUNUCUSUNDAN DEGIL: kaynak Nitro'nun kendi ucu
     * (server/routes/tcmb-api/usd/[kind]/[year]/[month]/[day].get.ts) --
     * Python tarafindan kurtulma planinin 2. adimi.
     *
     * year/month/day hesabi KALKTI: useTcmb() tarihi kendisi parcaliyor
     * ve hafta sonu/tatil icin geriye yurume de sunucuda yapiliyor.
     *
     * .catch() KORUNDU -- Nuxt 2'de yoktu: kur kaynagi ulasilamazsa
     * kullanici hicbir sey gormuyor ve kur ESKI degerinde kaliyordu,
     * sonra "Update"e basarsa YANLIS kurla kayit yapiyordu.
     */
    dateSelected(event) {
      useTcmb()
        .getUSDRate(event, "banknote")
        .then(({ rate }) => {
          this.model.currency = parseFloat(rate)
        })
        .catch((err) => {
          console.error("doviz kuru alinamadi:", err)
          useAppToast().error("Döviz kuru alınamadı, kur değeri güncellenmedi.")
        })
    },

    poSelected(event) {
      this.model.po = event.value.SiparisNo
    },

    searchPo(event) {
      const all = this.sharedStore.getOrdersAllList

      if (event.query.length == 0) {
        this.filteredPo = all
        return
      }

      this.filteredPo = all.filter((x) =>
        x.SiparisNo.toLowerCase().startsWith(event.query.toLowerCase()),
      )
    },

    selectedTransport(event) {
      this.transport_dialog_form = true
      this.selectedDate = fromIsoDate(event.Tarih)
      this.model.po = event.SiparisNo
      this.model.company = event.firma_adi
      this.model.invoice = event.FaturaNo
      this.model.tl = event.Tutar * event.Kur
      this.model.usd = event.Tutar
      this.model.currency = event.Kur
      this.model.date = toIsoDate(event.Tarih)
      this.model.transportId = event.NakliyeID
      this.model.productInvoiceId = event.SiparisFaturaID
      this.selectedPo = this.sharedStore.getOrdersAllList.find(
        (x) => x.SiparisNo == event.SiparisNo,
      )
    },
  },
}
</script>

<script setup>
/*
 * definePageMeta yalnizca <script setup> icinde cagrilabilir; Options
 * API'deki `middleware: [...]` anahtari Nuxt 3+'ta YOK SAYILIR
 * (bkz. commit 5fc77edb1).
 *
 * Veri cekimi NEDEN created() icinde degil: SSR created() icindeki async
 * isi BEKLEMEZ -- liste bos serialize edilir, client hydration onu
 * devralir ve created() bir daha calismadigi icin tablo bos kalir.
 *
 * server: false ZORUNLU -- legacy Express API'si SSR'in IC fetch yolunda
 * calismiyor (bkz. server/middleware/1.legacy-api.ts).
 *
 * ---------------------------------------------------------------------
 * setOrderAllList EKLENDI -- NUXT 2'DE HIC CAGRILMIYORDU
 * ---------------------------------------------------------------------
 * Sayfa `getOrdersAllList`i okuyor (dialogdaki "Order No" autocomplete'i
 * ve satir secildiginde selectedPo'yu bulmak icin), ama onu DOLDURAN
 * `setOrderAllList`i ne bu sayfa ne layouts/default.vue cagiriyordu.
 *
 * Sonuc: siparis listesi BOS geliyordu -- autocomplete hicbir oneri
 * gostermiyor ve satira tiklandiginda selectedPo undefined kaliyordu
 * (yani alan bos goruntuleniyordu). Liste yalnizca daha once onu
 * yukleyen baska bir sayfa gezildiyse dolu oluyordu, yani davranis
 * gezinme sirasina bagliydi.
 *
 * Burada acikca cekiliyor.
 */
const transportStore = useTransportStore()
const sharedStore = useSharedStore()

definePageMeta({ middleware: ["authority"] })

await useAsyncData(
  "operation-transport-list",
  async () => {
    await Promise.all([
      transportStore.setTransportList(),
      sharedStore.setOrderAllList(),
    ])
    return true
  },
  { server: false },
)
</script>

<!--
  pages/operation/transportlist.vue

  Navbar bu yola link veriyordu ama sayfa pilotta YOKTU.

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] middleware: ["authority"] -> definePageMeta (gerekcesi yukarida)

  [x] mapGetters(["getTransportList","getOrdersAllList"])
         -> transportStore / sharedStore
      DIKKAT: getOrdersAllList transport store'unda DEGIL, shared
      store'unda (shared.ts:110). Vuex'te tum moduller tek isim uzayini
      paylastigi icin bu ayrim gorunmuyordu.

  [x] import date from '../../plugins/date'
         -> import { toIsoDate, fromIsoDate } from "~/utils/dates"
      ESLEME BIREBIR: date.dateToString = toIsoDate (yil-ay-gun),
      date.stringToDate = fromIsoDate.

  [x] this.$excelApi -> useExcelApi()
      (axios sozlesmesini koruyor; response.data aynen duruyor)

  [x] this.$toast -> useAppToast()

  [x] <Calendar> -> <DatePicker>  +  id yerine inputId
      PrimeVue'da `id` kok sarmalayiciya gider, ic <input> ogesine
      DEGIL. Nuxt 2'de Calendar'in hic id'si yoktu ama etiket
      `for="username"` yaziyordu -- yani etiket BU SAYFADA OLMAYAN bir
      ogeye isaret ediyordu (kopyala-yapistir kalintisi). inputId
      "transportDate" verildi, etiket artik dogru alani odakliyor.

  [x] AutoComplete: field="SiparisNo" -> optionLabel="SiparisNo"
      PrimeVue 4'un AutoComplete'inde `field` prop'u YOK; secim
      yapildiginda input "[object Object]" gosterirdi.

  [x] <span class="p-float-label"> -> <FloatLabel>   (uc yerde)

  [x] p-button-warning -> severity="warn"  (v4'te ad "warning" DEGIL)
      p-button-danger  -> severity="danger"

  [x] :visible + @update:visible -> v-model:visible

  [x] created() -> <script setup> + useAsyncData({ server: false })

  DUZELTILDI -- NUXT 2'DE SESSIZCE BOZUK OLAN:

  [x] setOrderAllList hic cagrilmiyordu (gerekcesi <script setup>
      icinde).

  [x] Yukleme katmani ebediyen acik kalabiliyordu (gerekcesi
      deleteTransport'un basinda). Ayrica iki dugme istek surerken artik
      PASIF, yani ust uste tiklama ile mukerrer istek gonderilemiyor.

  [x] dateSelected()'de .catch() yoktu: Excel sunucusu ulasilamazsa
      kullanici hicbir sey gormuyor ve kur ESKI degerde kaliyordu --
      sonra "Update"e basarsa YANLIS kurla kayit yapiyordu. Artik hata
      toast'i cikiyor.

  [x] Basarili islemden sonra dialog KAPANIYOR. Nuxt 2'de acik
      kaliyordu; liste arkada yenilendigi icin kullanici ayni (artik
      eski) verilerle tekrar Update/Delete'e basabiliyordu.

  DIKKAT -- KASITLI OLARAK DEGISTIRILMEDI:
      Toast metinleri BIREBIR korundu, silme basarisinda da
      "Successfully Updated" yaziyor. Kullaniciya gorunen metin;
      duzeltmek ayri bir karar.
-->
