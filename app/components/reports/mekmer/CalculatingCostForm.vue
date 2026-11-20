<template>
  <div class="mc-form surface-card p-4 shadow-2 border-round">
    <div class="text-900 font-medium text-xl mb-4">
      <i class="pi pi-wallet mr-2 text-blue-500"></i>Yeni Maliyet Girişi
    </div>

    <!--
      ADIM 1 -- KUR. Kendi basina bir satir: bileşen kendi basligini
      ("TCMB Dolar Kuru Sorgulama"), tarih seciciyi, bir dugmeyi ve sonuc
      kutusunu birden tasiyor; ucte bir sutuna sikistirilinca yanindaki
      tek satirlik alanlarla hizasi tutmuyordu. Ustelik sirada da ONCE
      geliyor: kur gelmeden asagidaki alanlarin hepsi pasif.
    -->
    <div class="mc-step">
      <TcmbCurrency
        @dateSelectedEmit="dateSelected($event)"
        @rateFetchedEmit="rateFetched($event)"
      />
    </div>

    <!--
      ADIM 2 -- ALANLAR.  BOOTSTRAP izgarasi, PrimeFlex DEGIL.

      Burada `grid formgrid` + `col-12 md:col-4` yaziliydi ve alanlar
      YAN YANA DIZILMIYORDU. Nedeni: iki izgara cakisiyor. PrimeFlex ile
      Bootstrap'in ikisi de `.col-12` tanimliyor, Bootstrap SONRA
      yukleniyor (nuxt.config.ts: "primeflex once, bootstrap sonra") ve
      esit ozgulluklu kurallarda SONRAKI kazaniyor. Yani her alan
      Bootstrap'in `.col-12 { width: 100% }` kuralini aliyor; PrimeFlex'in
      `md:col-4` kurali bir medya sorgusu icinde oldugu ve medya sorgusu
      OZGULLUK EKLEMEDIGI icin onu geri alamiyor. Sonuc: alanlar tek
      sutun halinde alt alta.

      `p-fluid` de ise yaramiyordu: o sinif PrimeVue 3'un kendi
      CSS'indendi ve PrimeVue 4'te KALDIRILDI (PrimeFlex'te hic yok).
      Girdilerin tam genislige yayilmasi artik asagidaki <style> blogunda.
    -->
    <div class="row g-3">
      <div class="col-12 col-md-6">
        <FloatLabel>
          <AutoComplete
            v-model="selectedCostType"
            :inputId="ids.costType"
            :suggestions="filteredCostType"
            @complete="searchCostType($event)"
            optionLabel="MaliyetTuru"
            @item-select="costTypeSelected($event)"
            @input="costTypeInput($event)"
            :disabled="!model.Kur"
            :inputProps="{ tabindex: '1' }"
            autofocus
          />
          <label :for="ids.costType">Maliyet Türü</label>
        </FloatLabel>
      </div>

      <div class="col-12 col-md-6">
        <FloatLabel>
          <AutoComplete
            v-model="selectedCompany"
            :inputId="ids.company"
            :suggestions="filteredCompany"
            @complete="searchCompany($event)"
            optionLabel="MaliyetFirma"
            @item-select="companySelected($event)"
            @input="companyInput($event)"
            :disabled="!model.Kur"
            :inputProps="{ tabindex: '2' }"
          />
          <label :for="ids.company">Fatura Şirketi / Tedarikçi</label>
        </FloatLabel>
      </div>

      <div class="col-12 col-md-6 col-xl-3">
        <FloatLabel>
          <IconField>
            <InputIcon class="pi pi-hashtag" />
            <InputText
              :id="ids.invoiceNo"
              :disabled="!model.Kur"
              v-model="model.FaturaNo"
              type="text"
              tabindex="3"
            />
          </IconField>
          <label :for="ids.invoiceNo">Fatura No</label>
        </FloatLabel>
      </div>

      <div class="col-12 col-md-6 col-xl-3">
        <FloatLabel>
          <InputNumber
            :inputId="ids.totalTl"
            v-model="model.Fiyat"
            mode="currency"
            currency="TRY"
            locale="tr-TR"
            :minFractionDigits="2"
            :maxFractionDigits="2"
            :disabled="!model.Kur"
            @update:modelValue="calculatedTl($event)"
            :tabindex="4"
          />
          <label :for="ids.totalTl">Fiyat (₺)</label>
        </FloatLabel>
      </div>

      <div class="col-12 col-md-6 col-xl-3">
        <FloatLabel>
          <InputNumber
            :inputId="ids.rate"
            v-model="model.Kur"
            mode="currency"
            currency="TRY"
            locale="tr-TR"
            :minFractionDigits="2"
            :maxFractionDigits="2"
            :tabindex="5"
          />
          <label :for="ids.rate">Kur (TL)</label>
        </FloatLabel>
      </div>

      <div class="col-12 col-md-6 col-xl-3">
        <FloatLabel>
          <InputNumber
            :inputId="ids.price"
            v-model="model.FiyatUsd"
            mode="currency"
            currency="USD"
            locale="en-US"
            :minFractionDigits="2"
            :disabled="!model.Kur"
            class="filled-input"
            @update:modelValue="calculatedUsd($event)"
            :tabindex="6"
          />
          <label :for="ids.price">Fiyat ($)</label>
        </FloatLabel>
      </div>
    </div>

    <div class="flex justify-content-end mt-3 gap-2">
      <Button
        label="Temizle"
        icon="pi pi-refresh"
        text
        severity="secondary"
        @click="resetForm"
      />
      <Button
        :label="status ? 'Kaydet' : 'Güncelle'"
        icon="pi pi-check"
        class="px-5"
        :loading="saving"
        :disabled="saving"
        @click="saveForm"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    costTypes: { type: Array, required: true },
    companies: { type: Array, required: true },
    model: { type: Object, required: true },
    status: { type: Boolean, required: true },
  },

  emits: ["cost_saved_update_emit"],

  setup() {
    /*
     * Sabit id'ler (costType, company, invoiceNo, ...) yerine useId():
     * sabit id ayni sayfada iki form olursa belgede yinelenen id uretir ve
     * <label for> ilk ornege baglanir. CustomInput.vue'da birebir bu hata
     * vardi (orada id="freight" sabitti).
     */
    const base = useId()

    return {
      ids: {
        costType: `${base}-costType`,
        company: `${base}-company`,
        invoiceNo: `${base}-invoiceNo`,
        totalTl: `${base}-totalTl`,
        rate: `${base}-rate`,
        price: `${base}-price`,
      },
    }
  },

  data() {
    return {
      selectedCompany: null,
      selectedCostType: null,
      filteredCompany: [],
      filteredCostType: [],
      saving: false,
    }
  },

  /*
   * created() -> mounted(): sunucuda calismasina gerek yok, yalnizca
   * mevcut kaydi forma yerlestiriyor. (created() SSR'da da calisir.)
   */
  mounted() {
    if (this.status) return

    this.selectedCompany =
      this.companies.find((item) => item.ID == this.model.FaturaFirmaId) || null
    this.selectedCostType =
      this.costTypes.find((item) => item.ID == this.model.MaliyetTurId) || null

    /*
     * Kur 0 iken bolme Infinity/NaN uretiyordu ve o deger forma yazilip
     * kaydedilebiliyordu. Orijinalde kontrol YOKTU:
     *     if (!this.model.FiyatUsd) this.model.FiyatUsd = Fiyat / Kur
     */
    if (!this.model.FiyatUsd) {
      const kur = Number(this.model.Kur)
      this.model.FiyatUsd = kur ? Number(this.model.Fiyat) / kur : 0
    }
  },

  methods: {
    /*
     * AutoComplete'in @input'u PrimeVue 4'te NATIVE InputEvent veriyor,
     * duz metin DEGIL. Orijinal kod `typeof event != "object"` diye
     * bakip else dalinda `model.MaliyetFirma = event` yapiyordu -- yani
     * modele bir InputEvent NESNESI yaziliyordu. O deger sunucuya gidince
     * maliyet turu adi olarak anlamsiz bir sey kaydedilirdi.
     * Burada her iki bicim de metne indirgeniyor.
     */
    typedText(event) {
      if (typeof event === "string") return event
      return (event && event.target && event.target.value) || ""
    },

    searchCompany(event) {
      const query = (event.query || "").toLowerCase()
      this.filteredCompany = this.companies.filter(
        (item) =>
          item.MaliyetFirma && item.MaliyetFirma.toLowerCase().includes(query)
      )
    },

    companyInput(event) {
      this.model.FaturaFirma = this.typedText(event)
      this.model.FaturaFirmaId = null
    },

    companySelected(event) {
      this.model.FaturaFirma = event.value.MaliyetFirma
      this.model.FaturaFirmaId = event.value.ID
    },

    searchCostType(event) {
      const query = (event.query || "").toLowerCase()
      this.filteredCostType = this.costTypes.filter(
        (item) =>
          item.MaliyetTuru && item.MaliyetTuru.toLowerCase().includes(query)
      )
    },

    /*
     * !!! model.MaliyetFirma, MALIYET TURU ADINI tasiyor -- yazim hatasi
     * DEGIL, dokunulmamali.
     *
     * Alan adi "Firma" olmasina ragmen sunucu onu maliyet TURU adi olarak
     * kullaniyor: yeni bir tur olusturulurken
     *     INSERT INTO MekmerMaliyetTurTB(MaliyetTuru) VALUES(@ad)
     * ve @ad = body.MaliyetFirma  (api/index.js:16030).
     * Fatura sirketi ise ayri alanlarda: FaturaFirma / FaturaFirmaId.
     *
     * Adi duzeltmek istemci ile sunucuyu ayirir ve YENI MALIYET TURU
     * OLUSTURMAYI bozar; ikisi ayni anda degistirilmeli. Gecis sirasinda
     * bilerek korundu.
     */
    costTypeInput(event) {
      const text = this.typedText(event)

      const exists = this.costTypes.some(
        (item) =>
          item.MaliyetTuru &&
          item.MaliyetTuru.toLowerCase() === text.toLowerCase()
      )

      if (text && exists) {
        /*
         * Orijinalde alert() vardi. Toast'a cevrildi: alert() tarayici
         * modal'i, odagi calip formu kilitliyor.
         *
         * NOT: Nuxt 2'de bu dal yalnizca `typeof event != "object"`
         * oldugunda calisiyordu; PrimeVue 4'te @input her zaman nesne
         * verdigi icin UYARI HIC CIKMIYORDU.
         */
        useAppToast().warn("Zaten bu isimde bir maliyet türü var.")
        return
      }

      this.model.MaliyetFirma = text
      this.model.MaliyetTurId = null
    },

    costTypeSelected(event) {
      this.model.MaliyetFirma = event.value.MaliyetTuru
      this.model.MaliyetTurId = event.value.ID
    },

    dateSelected(event) {
      this.model.Tarih = event
    },

    rateFetched(event) {
      /*
       * TCMB kuru METIN olarak geliyor ("34,1234" -- ondalik ayraci
       * virgul). InputNumber sayi bekliyor; metin verilince alan bos
       * gorunuyor ve hesaplamalar (Fiyat / Kur) NaN uretiyordu.
       */
      const rate = parseFloat(String(event.rate).replace(",", "."))
      this.model.Kur = isNaN(rate) ? 0 : rate
    },

    calculatedTl(value) {
      const kur = Number(this.model.Kur)
      this.model.FiyatUsd = value && kur ? value / kur : 0
    },

    calculatedUsd(value) {
      const kur = Number(this.model.Kur)
      this.model.Fiyat = value && kur ? value * kur : 0
    },

    saveForm() {
      this.saving = true

      /*
       * DIKKAT -- useApi() bir OFETCH ORNEGI, axios degil: .post / .put
       * METOTLARI YOKTUR (ayrinti: stores/order.ts icindeki setDivide
       * notu). Burada once api.post(...) / api.put(...) yaziliyordu ve
       * senkron TypeError atiyordu: asagidaki .then/.catch/.finally
       * zinciri HIC kurulmadigi icin saving=true takili kaliyor, dugme
       * sonsuza kadar doniyordu. Yazma yolu oldugu icin (readonly-guard
       * 403) ekranda hic denenememisti.
       */
      const api = useApi()
      const request = this.status
        ? api("/reports/mekmer/calculating/cost/save", {
            method: "POST",
            body: this.model,
          })
        : api("/reports/mekmer/calculating/cost/update", {
            method: "PUT",
            body: this.model,
          })

      request
        .then((res) => {
          /*
           * Orijinalde `if (res)` yaziliyordu -- axios yanit nesnesi her
           * zaman dogru oldugu icin HATA DALI HIC CALISMIYORDU: kayit
           * basarisiz olsa bile "Başarıyla kaydedildi." gosteriliyordu.
           * Artik sunucunun status alanina bakiliyor.
           */
          if (!res || res.status === false) {
            useAppToast().error(
              (res && res.message) || "Kayıt sırasında bir hata oluştu."
            )
            return
          }

          this.$emit("cost_saved_update_emit", this.model.Tarih)
          useAppToast().success("Başarıyla kaydedildi.")

          /* Guncellemede form acik kalir (orijinal davranis). */
          if (this.status) this.resetForm()
        })
        .catch((err) => {
          console.error("maliyet kaydi basarisiz:", err)
          useAppToast().error(
            `Kayıt sırasında bir hata oluştu: ${err?.data?.message || err?.message || "bilinmeyen"}`
          )
        })
        .finally(() => {
          this.saving = false
        })
    },

    /*
     * Alanlar YERINDE sifirlaniyor, `this.model = {...}` ILE DEGISTIRILMIYOR.
     *
     * Orijinal once alanlari tek tek sifirliyor, sonra `this.model = {...}`
     * yapiyordu. Bu bir PROP'A ATAMA: Vue 3'te sessizce basarisiz olur ve
     * "Set operation on key 'model' failed" uyarisi basar. Uyarinin
     * ardinda duran gercek sorun ise FiyatUsd'un tek tek sifirlanan
     * alanlar arasinda OLMAMASIYDI -- yani eski dolar tutari formda
     * kaliyor, bir sonraki kayda tasiniyordu.
     */
    resetForm() {
      Object.assign(this.model, {
        FaturaFirma: null,
        FaturaFirmaId: null,
        FaturaNo: null,
        Fiyat: 0,
        FiyatUsd: 0,
        ID: 0,
        Kur: 0,
        MaliyetTurId: null,
        MaliyetFirma: null,
        Tarih: null,
      })

      this.selectedCompany = null
      this.selectedCostType = null
    },
  },
}
</script>

<style scoped>
/* Kart Tasarımı */
.surface-card {
  background-color: #ffffff;
  border-radius: 12px;
  /* Hafif gölge efekti */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

/*
 * GIRDILER SUTUNU DOLDURUYOR.
 *
 * Eskiden bunu `p-fluid` yapiyordu ama o sinif PrimeVue 3'un kendi
 * CSS'indeydi ve PrimeVue 4'te KALDIRILDI; sablonda duruyor olmasi
 * yanlis bir guven veriyordu. Girdiler kendi dogal genisliklerinde
 * duruyor, yani ayni satirdaki iki alan farkli boyda goruluyordu.
 *
 * SARMALAYICILAR DA GEREKLI, sadece .p-inputtext yetmez: AutoComplete,
 * InputNumber ve IconField girdinin etrafina kendi kabini koyuyor;
 * yalnizca ic girdi %100 yapilirsa kap dar kalir ve girdi onu tasar.
 * FloatLabel de blok olmak zorunda, yoksa etiket yuzdugu kutu kayar.
 */
.mc-form :deep(.p-floatlabel),
.mc-form :deep(.p-autocomplete),
.mc-form :deep(.p-inputnumber),
.mc-form :deep(.p-iconfield),
.mc-form :deep(.p-inputtext),
.mc-form :deep(.p-datepicker) {
  width: 100%;
}

/*
 * Adim 1 (kur sorgusu) gorsel olarak AYRILIYOR.
 *
 * Bileşenin kendi basligi var; alt alta gelen alanlarin arasinda
 * basliksiz bir blok gibi duruyordu. Hafif zemin + kenarlik, "once
 * burayi doldur" sirasini gosteriyor -- asagidaki alanlarin hepsi
 * :disabled="!model.Kur" ile buraya bagli.
 */
.mc-step {
  padding: 0.75rem 1rem;
  margin-bottom: 1.25rem;
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
}

/* TCMB bileşeninin kendi basligi kart basligiyla yarismasin. */
.mc-step :deep(h3) {
  margin: 0 0 0.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: #4b5563;
}

/*
 * Satir arasi dikey bosluk Bootstrap'in `g-3`undan geliyor
 * (`.row > * { padding-top: var(--bs-gutter-y) }`). Buraya bir
 * `padding-top` YAZMAYIN: daha ozgul bir secici o kurali ezer ve
 * satirlar birbirine girer -- FloatLabel'in yuzen etiketi de ustteki
 * alanin kenarligina deger.
 */

/*
  Readonly olan inputun arka planini ayirt et.
  `>>>` -> `:deep()`: Vue 3'te `>>>` ve `/deep/` KALDIRILDI, derleyici
  uyari verip secicinin tamamini atiyor -- yani kural hic uygulanmiyordu.
*/
.filled-input :deep(.p-inputtext) {
  background-color: #f8f9fa;
  font-weight: bold;
  color: #2c3e50;
}

/* Başlık stili */
.text-xl {
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 1rem;
}
</style>

<!--
  components/reports/mekmer/calculatingCost/form.vue
    -> app/components/reports/mekmer/CalculatingCostForm.vue

  Auto-import adi: ReportsMekmerCalculatingCostForm (kardeslerinin kalibi).
  Nuxt 2'de `calculatingCostForm` adiyla global kayitliydi.

  ZORUNLU degisiklikler:
  [1] <span class="p-float-label"> -> <FloatLabel>
      PrimeVue 4'te p-float-label SINIFI KALDIRILDI (node_modules'da hic
      gecmiyor); stilsiz span olarak render edilip etiket input'un
      uzerine yuzmek yerine yanina dusuyordu. Hata vermez, yalnizca
      yerlesim bozulur -- bkz. tools/codemods/codemod-float-label.mjs.
  [2] class="p-input-icon-left" + <i> -> <IconField><InputIcon/>
      Bu sinif da PrimeVue 4'te KALDIRILDI; ikon input'un icine
      konumlanmak yerine akista kaliyordu.
  [3] <currencyApi> -> <TcmbCurrency>  (auto-import adi)
  [4] this.$axios -> useApi()  (govde dogrudan donuyor, `.data` yok)
  [5] this.$toast -> useAppToast()
  [6] AutoComplete `field="X"` -> `optionLabel="X"`
      PrimeVue 4'te `field` prop'u KALDIRILDI; birakilsa oneri listesinde
      her satir "[object Object]" gorunurdu.
  [7] InputNumber @input -> @update:modelValue
      PrimeVue 4'te InputNumber'in @input'u {originalEvent, value} nesnesi
      veriyor; hesaplamalar o nesneyi sayi sanip NaN uretirdi.
  [8] class="p-button-text p-button-secondary" -> text + severity
      ve class="p-button-primary" kaldirildi (varsayilan severity).
      PrimeVue 4'te p-button-<severity> siniflari kaldirildi.
  [9] <style>: `>>>` -> `:deep()`. Vue 3'te `>>>` kaldirildi; kural
      sessizce hic uygulanmiyordu.
  [10] created() -> mounted()

  DUZELTILDI -- NUXT 2'DE BOZUK OLAN:
  [11] saveForm() `if (res)` ile basari kontrolu yapiyordu. Axios yanit
       nesnesi HER ZAMAN dogru oldugu icin hata dali olu kodtu: kayit
       basarisiz olsa da "Başarıyla kaydedildi." cikiyordu. Artik
       sunucunun status alanina bakiliyor, .catch() de eklendi.
  [12] resetForm() sonunda `this.model = {...}` -> PROP'A ATAMA.
       Vue 3'te basarisiz olur. Asil zarar: FiyatUsd tek tek sifirlanan
       alanlar arasinda yoktu, yani eski dolar tutari formda kalip bir
       sonraki kayda tasiniyordu. Artik Object.assign ile yerinde ve
       FiyatUsd dahil sifirlaniyor.
  [13] mounted()'ta FiyatUsd = Fiyat / Kur, Kur=0 iken Infinity/NaN
       uretiyordu; o deger kaydedilebiliyordu. Kontrol eklendi.
  [14] rateFetched() TCMB kurunu METIN olarak ("34,1234") modele
       yaziyordu. InputNumber sayi bekliyor -> alan bos gorunuyor,
       Fiyat/Kur hesaplari NaN. Artik parseFloat + virgul/nokta.
  [15] costTypeInput() modele InputEvent NESNESI yaziyordu (ayrinti
       typedText()'in ustunde). Ayrica "zaten bu isimde tur var" uyarisi
       PrimeVue 4'te HIC CIKMIYORDU; alert() yerine toast.
  [16] "Kur (TL)" alani :disabled="!model.Kur" ile KENDI DEGERINE bagliydi:
       Kur 0 iken alan kapali, kapali oldugu icin de elle Kur girilemiyor.
       TCMB sorgusu basarisiz olursa form tamamen kullanilamaz hale
       geliyordu (diger alanlarin hepsi de !Kur'a bagli). O alandan
       :disabled KALDIRILDI -- digerlerindeki kasitli, cunku kur
       girilmeden tutar hesaplanamaz.

  KALDIRILDI -- OLU KOD:
  [17] onDateSelect() -- sablonda hicbir yere bagli degildi; govdesi
       yorum, console.log ve `this.$emit("date-selected")` idi (o olayi
       da kimse dinlemiyor).
  [18] data().getCurrencyDisable -- hicbir yerde okunmuyor.
  [19] Yorum icine alinmis model / computed calculatedTl bloklari.
  [20] saveForm() icindeki iki console.log -- ikisi de
       `totalTl: this.calculatedTl` yaziyordu; calculatedTl bir METOT
       oldugu icin konsola fonksiyonun kendisi basiliyordu (computed
       surumu yorumdaydi).
  [21] name: "CostForm" -- auto-import adiyla celisiyordu, gereksiz.
-->
