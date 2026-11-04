<template>
  <div class="paid-form">
    <!-- Ust ozet: firma, PO, tedarikci -->
    <header class="summary">
      <div class="summary__main">
        <h3 class="summary__company">{{ model.companyName || "—" }}</h3>
        <span class="summary__po">{{ model.po }}</span>
      </div>
      <div class="summary__supplier" v-if="model.supplier">
        <span class="summary__label">Tedarikçi</span>
        <span>{{ model.supplier }}</span>
      </div>
    </header>

    <!-- Kur / tarih secimi -->
    <section class="block">
      <TcmbCurrency
        @dateSelectedEmit="dateSelected($event)"
        @rateFetchedEmit="rateFetched($event)"
      />
    </section>

    <!-- Kur secilmeden form kilitli -->
    <p v-if="!hasCurrency" class="hint">
      Ödeme girmek için önce tarih seçip kuru getirin.
    </p>

    <!-- Form alanlari -->
    <section class="block fields" :class="{ 'fields--locked': !hasCurrency }">
      <div class="field field--amount">
        <CustomInput
          :value="model.paid"
          text="Ödenen tutar"
          @onInput="model.paid = Number($event) || 0"
          :disabled="!hasCurrency"
        />
      </div>

      <div class="field field--desc">
        <FloatLabel class="w-100">
          <InputText
            id="paid-description"
            type="text"
            class="w-100"
            v-model="model.description"
            :disabled="!hasCurrency"
          />
          <label for="paid-description">Açıklama</label>
        </FloatLabel>
      </div>

      <div class="field field--rate">
        <FloatLabel class="w-100">
          <InputText
            id="paid-rate"
            type="text"
            class="w-100"
            :modelValue="formattedCurrency"
            disabled
          />
          <label for="paid-rate">Kur</label>
        </FloatLabel>
      </div>
    </section>

    <!-- Hesap ozeti -->
    <section class="totals">
      <div class="totals__row">
        <span>Kalan tutar</span>
        <strong>{{ formatMoney(remaining) }}</strong>
      </div>
      <div class="totals__row">
        <span>Ödenen</span>
        <strong>{{ formatMoney(model.paid) }}</strong>
      </div>
      <div class="totals__row totals__row--result">
        <span>Ödeme sonrası kalan</span>
        <strong :class="{ 'is-negative': afterPayment < 0 }">
          {{ formatMoney(afterPayment) }}
        </strong>
      </div>
      <div class="totals__row totals__row--try" v-if="hasCurrency">
        <span>TL karşılığı</span>
        <strong>{{ formatMoney(paidInTry, "₺") }}</strong>
      </div>
    </section>

    <!-- Aksiyonlar -->
    <footer class="actions">
      <Button label="Vazgeç" text @click="$emit('cancel')" />
      <Button
        label="Ödemeyi kaydet"
        icon="pi pi-check"
        :disabled="!canSave"
        @click="save"
      />
    </footer>
  </div>
</template>

<script>
import { toIsoDate } from "~/utils/dates"

export default {
  name: "FinancePaidForm",

  props: {
    financePaid: {
      type: Object,
      required: true,
    },
    userId: {
      type: [Number, String],
      default: 0,
    },
  },

  emits: ["save", "cancel"],

  data() {
    return {
      model: {
        companyName: "",
        po: "",
        companyId: 0,
        supplier: "",
        supplierId: 0,
        paid: 0,
        description: "",
        currency: 0,
        date: "",
      },
    }
  },

  computed: {
    hasCurrency() {
      return Number(this.model.currency) > 0
    },

    remaining() {
      return Number(this.financePaid.KalanTutar) || 0
    },

    afterPayment() {
      return this.remaining - (Number(this.model.paid) || 0)
    },

    paidInTry() {
      return (Number(this.model.paid) || 0) * Number(this.model.currency)
    },

    formattedCurrency() {
      return this.formatMoney(this.model.currency, "₺")
    },

    canSave() {
      return this.hasCurrency && Number(this.model.paid) > 0 && !!this.model.date
    },
  },

  watch: {
    financePaid: {
      immediate: true,
      handler(val) {
        if (!val) return
        this.model.companyName = val.FirmaAdi
        this.model.po = val.SiparisNo
        this.model.companyId = val.MusteriID
        this.model.supplier = val.TedarikciAdi
        this.model.supplierId = val.TedarikciID
      },
    },
  },

  methods: {
    dateSelected(event) {
      this.model.date = toIsoDate(event)
    },

    rateFetched(event) {
      this.model.currency = Number(event.rate) || 0
    },

    formatMoney(value, symbol = "$") {
      const n = Number(value) || 0
      return (
        symbol +
        n.toLocaleString("tr-TR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      )
    },

    save() {
      if (!this.canSave) return
      this.$emit("save", {
        ...this.model,
        toplam: this.paidInTry,
        kullaniciId: this.userId,
      })
    },
  },
}
</script>

<style scoped>
.paid-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 4px 2px;
}

/* --- Ozet baslik --- */
.summary {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  padding-bottom: 14px;
  border-bottom: 1px solid #e6e8eb;
  flex-wrap: wrap;
}

.summary__main {
  display: flex;
  align-items: baseline;
  gap: 10px;
  min-width: 0;
}

.summary__company {
  margin: 0;
  font-size: 17px;
  font-weight: 600;
  color: #1f2933;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.summary__po {
  font-size: 13px;
  font-weight: 500;
  color: #4b5563;
  background: #f1f3f5;
  border-radius: 4px;
  padding: 2px 8px;
  white-space: nowrap;
}

.summary__supplier {
  display: flex;
  align-items: baseline;
  gap: 6px;
  font-size: 13px;
  color: #4b5563;
}

.summary__label {
  color: #9aa3ad;
}

/* --- Bolumler --- */
.block {
  margin: 0;
}

.hint {
  margin: -6px 0 0;
  font-size: 13px;
  color: #8a94a0;
}

.fields {
  display: flex;
  gap: 14px;
  align-items: flex-end;
  flex-wrap: wrap;
  padding-top: 6px;
}

.fields--locked {
  opacity: 0.55;
}

.field {
  min-width: 0;
}

.field--amount {
  flex: 1 1 160px;
}

.field--desc {
  flex: 2 1 240px;
}

.field--rate {
  flex: 0 1 140px;
}

/* --- Toplamlar --- */
.totals {
  background: #f8f9fa;
  border: 1px solid #edf0f2;
  border-radius: 6px;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.totals__row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 13px;
  color: #57606a;
}

.totals__row strong {
  font-variant-numeric: tabular-nums;
  color: #1f2933;
  font-weight: 600;
}

.totals__row--result {
  border-top: 1px solid #e6e8eb;
  padding-top: 8px;
  margin-top: 2px;
  font-size: 14px;
}

.totals__row--result strong {
  font-size: 15px;
}

.totals__row--try strong {
  font-weight: 500;
  color: #57606a;
}

.is-negative {
  color: #c0392b;
}

/* --- Aksiyonlar --- */
.actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding-top: 4px;
}

@media (max-width: 640px) {
  .fields {
    flex-direction: column;
    align-items: stretch;
  }

  .actions {
    flex-direction: column-reverse;
  }
}
</style>

<!--
  components/finance/forms/supplierPaid.vue
     -> app/components/finance/PurchaseForm.vue

  Otomatik ice alma adi `FinancePurchaseForm` -- Nuxt 2'deki global kayit
  adiyla AYNI (plugins/components.js:157). (Bileşenin `name` secenegi
  kaynakta "FinancePaidForm"; o ad yalnizca devtools'ta gorunuyor,
  etiket adini belirlemiyor -- korundu.)

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] <currencyApi> -> <TcmbCurrency>
      Kaynakta `currencyApi` adiyla ELLE global kaydediliyordu
      (plugins/components.js:167 -> components/tcmb/currency.vue).
      Pilotta dosya app/components/tcmb/Currency.vue, otomatik ice alma
      adi TcmbCurrency. Emit adlari (dateSelectedEmit / rateFetchedEmit)
      pilotta da AYNEN bildirilmis (tcmb/Currency.vue:43), yani
      dinleyiciler degismedi. (container/InputForm.vue ile ayni karar.)

  [x] <span class="p-float-label w-100"> -> <FloatLabel class="w-100">
      (iki yerde; sinif v4'te YOK)

  [x] class="p-button-text" -> `text` prop
      v4'te metin butonu `text` prop'u ile kuruluyor; eski sinif artik
      hicbir stile bagli degil (buton dolgulu gorunurdu).

  [x] InputText `:value="formattedCurrency"` -> `:modelValue="..."`
      PrimeVue 4 InputText'in prop'u `modelValue`; `value` bir prop
      DEGIL, dolayisiyla kok ogeye DOM attribute'u olarak duser.
      Alan `disabled` ve yalnizca gosterim oldugu icin gorunurde
      fark olmayabilirdi, ama dogru API bu.

  [x] import date from "../../../plugins/date" -> { toIsoDate }
      ACIK IMPORT ZORUNLU: ciplak `dateToString` auto-import'ta
      utils/formatters.js'e ("02-10-2026", GOSTERIM) cozuluyor, oysa
      `model.date` API'ye GIDEN bir deger ("2026-10-02") ve ustelik
      `canSave` da onu kontrol ediyor. Ayrinti offer/Form.vue'nun alt
      notunda.

  [x] `emits: ["save", "cancel"]` bildirildi -- Vue 3'te bildirilmeyen
      emit'ler DOM attribute'u olarak kok ogeye dusuyor ve uyari veriyor.

  ============================================================
  BILINMESI GEREKEN -- "ODEMEYI KAYDET" HICBIR YERE BAGLI DEGIL
  ============================================================
  Bu bileşen kaydetmeyi KENDISI yapmiyor, `$emit("save", {...})` ile
  ebeveynine birakiyor. Ama tek kullanicisi
  FinancePurchaseDetailList.vue ve o sunu yaziyor:

      <FinancePurchaseForm :financePaid="financePaid" />

  yani NE @save NE @cancel dinleyicisi var. Sonuc: "Ödemeyi kaydet"
  butonu calisiyor, dogrulamadan geciyor, olayi yayiyor -- ve olay
  HICBIR YERDE yakalanmadigi icin ODEME KAYDEDILMIYOR. "Vazgeç" de
  diyalogu kapatmiyor.

  KAYNAKTA DA AYNEN BOYLE: satin alma odeme akisi YARIM KALMIS.
  Dinleyici uydurmak (orn. bir store action'ina baglamak) yeni ozellik
  yazmak olurdu ve hangi ucun cagrilacagi belli degil -- store'da bu
  payload'i (companyId/supplierId/paid/currency/toplam) alan bir action
  YOK. Bu yuzden kaynaktaki hali korundu.

  Ayni sebeple `userId` prop'u da ebeveyn tarafindan GECIRILMIYOR ->
  payload'daki `kullaniciId` daima 0.
-->
