<template>
  <div class="paid-form">
    <!-- Üst özet: firma, PO, tedarikçi -->
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

    <!-- Kur / tarih seçimi -->
    <section class="block">
      <currencyApi
        @dateSelectedEmit="dateSelected($event)"
        @rateFetchedEmit="rateFetched($event)"
      />
    </section>

    <!-- Kur seçilmeden form kilitli -->
    <p v-if="!hasCurrency" class="hint">
      Ödeme girmek için önce tarih seçip kuru getirin.
    </p>

    <!-- Form alanları -->
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
        <span class="p-float-label w-100">
          <InputText
            id="paid-description"
            type="text"
            class="w-100"
            v-model="model.description"
            :disabled="!hasCurrency"
          />
          <label for="paid-description">Açıklama</label>
        </span>
      </div>

      <div class="field field--rate">
        <span class="p-float-label w-100">
          <InputText
            id="paid-rate"
            type="text"
            class="w-100"
            :value="formattedCurrency"
            disabled
          />
          <label for="paid-rate">Kur</label>
        </span>
      </div>
    </section>

    <!-- Hesap özeti -->
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
      <Button label="Vazgeç" class="p-button-text" @click="$emit('cancel')" />
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
import date from "../../../plugins/date";

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
    };
  },

  computed: {
    hasCurrency() {
      return Number(this.model.currency) > 0;
    },

    remaining() {
      return Number(this.financePaid.KalanTutar) || 0;
    },

    afterPayment() {
      return this.remaining - (Number(this.model.paid) || 0);
    },

    paidInTry() {
      return (Number(this.model.paid) || 0) * Number(this.model.currency);
    },

    formattedCurrency() {
      return this.formatMoney(this.model.currency, "₺");
    },

    canSave() {
      return (
        this.hasCurrency && Number(this.model.paid) > 0 && !!this.model.date
      );
    },
  },

  watch: {
    financePaid: {
      immediate: true,
      handler(val) {
        if (!val) return;
        this.model.companyName = val.FirmaAdi;
        this.model.po = val.SiparisNo;
        this.model.companyId = val.MusteriID;
        this.model.supplier = val.TedarikciAdi;
        this.model.supplierId = val.TedarikciID;
      },
    },
  },

  methods: {
    dateSelected(event) {
      this.model.date = date.dateToString(event);
    },

    rateFetched(event) {
      this.model.currency = Number(event.rate) || 0;
    },

    formatMoney(value, symbol = "$") {
      const n = Number(value) || 0;
      return (
        symbol +
        n.toLocaleString("tr-TR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      );
    },

    save() {
      if (!this.canSave) return;
      this.$emit("save", {
        ...this.model,
        toplam: this.paidInTry,
        kullaniciId: this.userId,
      });
    },
  },
};
</script>

<style scoped>
.paid-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 4px 2px;
}

/* --- Özet başlık --- */
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

/* --- Bölümler --- */
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
 