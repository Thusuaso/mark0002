<template>
  <div class="tcmb-currency">
    <h3>TCMB Dolar Kuru Sorgulama</h3>

    <div class="form-group">
      <label :for="dateInputId">Tarih Seçiniz:</label>
      <DatePicker
        :inputId="dateInputId"
        v-model="selectedDate"
        dateFormat="dd.mm.yy"
        :showIcon="true"
      />
    </div>

    <div class="actions">
      <Button
        label="Kuru Getir"
        icon="pi pi-search"
        @click="fetchCurrency"
        :loading="loading"
      />
    </div>

    <div v-if="result" class="result-box">
      <p><strong>Bulunan Tarih:</strong> {{ result.date }}</p>
      <p><strong>USD Satış Kuru:</strong> {{ result.rate }} TL</p>
      <p v-if="result.isFallback" class="warning">
        <small>
          * Seçtiğiniz tarihte ({{ result.requestedDate }}) veri olmadığı için
          geçmişteki en yakın tarih getirildi.
        </small>
      </p>
    </div>

    <div v-if="error" class="error-box">
      {{ error }}
    </div>
  </div>
</template>

<script>
export default {
  emits: ["dateSelectedEmit", "rateFetchedEmit"],

  setup() {
    /*
     * Etiket-input baglantisi icin benzersiz id. Sabit bir id olsa, ayni
     * sayfada bu bileşen iki kez kullanildiginda <label for> ilk ornege
     * baglanirdi (CustomInput.vue'da birebir bu hata vardi).
     */
    return { dateInputId: useId() }
  },

  data() {
    return {
      selectedDate: new Date(), // Varsayılan bugün
      result: null,
      loading: false,
      error: null,
    }
  },

  methods: {
    async fetchCurrency() {
      this.loading = true
      this.error = null
      this.result = null

      try {
        const data = await useTcmb().getUSDRate(this.selectedDate)

        this.result = data
        this.$emit("dateSelectedEmit", this.selectedDate)
        this.$emit("rateFetchedEmit", data)
      } catch (err) {
        console.error("[TcmbCurrency] kur cekilemedi:", err)

        /*
         * Hatanin SEBEBI de yaziliyor. Orijinalde mesaj sabitti
         * ("Lütfen bağlantınızı kontrol edin") -- oysa en sik sebep
         * baglanti degil, secilen tarihten 10 gun geriye gidilip veri
         * bulunamamasi ya da TCMB'nin TLS'i. Sabit mesaj, bakilacak
         * yeri yanlis gosteriyordu.
         */
        this.error = `Kur bilgisi çekilemedi: ${err?.message || "bilinmeyen hata"}`
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
/*
  .container -> .tcmb-currency olarak yeniden adlandirildi.

  NEDEN: Bootstrap'in .container sinifi global olarak yukludur
  (assets/css/bootstrap.min.css) ve kendi max-width / padding kurallarini
  getiriyor. Bileşen onun UZERINE scoped kurallar biniyordu; yani gorunum
  Bootstrap'in o anki .container tanimina bagliydi. Scoped stil zaten
  yalnizca bu bileşene uygulandigi icin global bir ad kullanmanin faydasi
  yok, riski var.
*/
.tcmb-currency {
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
}
.form-group {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.result-box {
  margin-top: 2rem;
  padding: 1rem;
  border: 1px solid #ddd;
  background: #f9f9f9;
  border-radius: 8px;
}
.error-box {
  margin-top: 1rem;
  color: red;
}
.warning {
  color: orange;
  font-style: italic;
}
.actions {
  margin-top: 1rem;
}
</style>

<!--
  components/tcmb/currency.vue -> app/components/tcmb/Currency.vue

  Nuxt 2'de `currencyApi` adiyla global kayitliydi
  (plugins/components.js:167 -> Vue.component("currencyApi", currency)).
  Auto-import adi artik yoldan geliyor: TcmbCurrency. Cagiran taraf
  (CalculatingCostForm) ona gore guncellendi.

  ZORUNLU degisiklikler:
  [1] this.$tcmb.getUSDRate(...) -> useTcmb().getUSDRate(...)
      plugins/tcmb-service.js (inject) karsiligi app/composables/useTcmb.ts.
  [2] <Calendar> -> <DatePicker>
      PrimeVue 4'te Calendar, DatePicker olarak yeniden adlandirildi.
      DIKKAT -- `Calendar` adi HALA CALISIYOR: primevue/calendar v4.5'te
      duruyor, DatePicker'i `extends` ediyor ve mount'ta
      "Deprecated since v4. Use DatePicker component instead." uyarisini
      basiyor. Yani birakilsa ekran bozulmazdi; degistirme sebebi
      konsolu her mount'ta kirletmesi ve takma adin v5'te kaldirilacak
      olmasi. Ayni durum Dropdown -> Select icin de gecerli.
  [3] emits: [...] bildirildi -- Vue 3'te bildirilmeyen emit'ler
      attribute olarak dusup uyari veriyor. Olay ADLARI korundu
      (dateSelectedEmit / rateFetchedEmit), cagiran taraf degismesin.
  [4] <label> icin useId() tabanli inputId (bkz. setup()).

  DUZELTILDI -- NUXT 2'DE BOZUK OLAN:
  [5] isWeekendFallback HER ZAMAN true idi. Bileşen kendi tarihini
      "GGAAYYYY" bicimine cevirip plugin'in dondurdugu "GG-AA-YYYY" ile
      karsilastiriyordu -- iki bicim hicbir zaman esit olamaz. Sonuc:
      tarih TAM OLARAK BULUNDUGUNDA da "geçmişteki en yakın tarih
      getirildi" uyarisi cikiyor, yani uyari hicbir bilgi tasimiyordu.
      Karar artik useTcmb icinde, bicimi ureten tarafta veriliyor
      (TcmbRate.isFallback) ve uyari istenen tarihi de yaziyor.
  [6] formatCompareDate() KALDIRILDI -- tek isi yukaridaki hatali
      karsilastirmaydi.
  [7] Hata mesajina sebep eklendi; sabit "bağlantınızı kontrol edin"
      metni yanlis yere bakmaya yonlendiriyordu.
-->
