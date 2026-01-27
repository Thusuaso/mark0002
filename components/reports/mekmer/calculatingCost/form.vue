<template>
  <div class="surface-card p-4 shadow-2 border-round">
    <div class="text-900 font-medium text-xl mb-4">
      <i class="pi pi-wallet mr-2 text-blue-500"></i>Yeni Maliyet Girişi
    </div>

    <div class="p-fluid grid formgrid">
      <div class="field col-12 md:col-4">
        <currencyApi
          @dateSelectedEmit="dateSelected($event)"
          @rateFetchedEmit="rateFetched($event)"
        />
      </div>
      <div class="field col-12 md:col-4">
        <span class="p-float-label">
          <AutoComplete
            v-model="selectedCostType"
            inputId="costType"
            :suggestions="filteredCostType"
            @complete="searchCostType($event)"
            field="MaliyetTuru"
            @item-select="costTypeSelected($event)"
            @input="costTypeInput($event)"
            :disabled="!model.Kur"
            :inputProps="{ tabindex: '1' }"
            autofocus
          />
          <label for="costType">Maliyet Türü</label>
        </span>
      </div>
      <div class="field col-12">
        <span class="p-float-label">
          <AutoComplete
            v-model="selectedCompany"
            inputId="company"
            :suggestions="filteredCompany"
            @complete="searchCompany($event)"
            field="MaliyetFirma"
            @item-select="companySelected($event)"
            @input="companyInput($event)"
            :disabled="!model.Kur"
            :inputProps="{ tabindex: '2' }"
          />
          <label for="company">Fatura Şirketi / Tedarikçi</label>
        </span>
      </div>
      <div class="field col-12 md:col-4">
        <span class="p-float-label p-input-icon-left">
          <i class="pi pi-hashtag" />
          <InputText
            id="invoiceNo"
            :disabled="!model.Kur"
            v-model="model.FaturaNo"
            type="text"
            :inputProps="{ tabindex: '3' }"
          />
          <label for="invoiceNo">Fatura No</label>
        </span>
      </div>

      <div class="field col-12 md:col-4">
        <span class="p-float-label">
          <InputNumber
            id="totalTl"
            v-model="model.Fiyat"
            mode="currency"
            currency="TRY"
            locale="tr-TR"
            :minFractionDigits="2"
            :maxFractionDigits="2"
            :disabled="!model.Kur"
            @input="calculatedTl($event)"
            :tabindex="4"
          />
          <label for="totalTl">Fiyat (₺)</label>
        </span>
      </div>

      <div class="field col-12 md:col-4">
        <span class="p-float-label">
          <InputNumber
            id="rate"
            v-model="model.Kur"
            mode="currency"
            currency="TRY"
            locale="tr-TR"
            :minFractionDigits="2"
            :maxFractionDigits="2"
            :disabled="!model.Kur"
            :tabindex="5"
          />
          <label for="rate">Kur (TL)</label>
        </span>
      </div>

      <div class="field col-12 md:col-4">
        <span class="p-float-label">
          <InputNumber
            id="price"
            v-model="model.FiyatUsd"
            mode="currency"
            currency="USD"
            locale="en-US"
            :minFractionDigits="2"
            :disabled="!model.Kur"
            class="filled-input"
            @input="calculatedUsd($event)"
            :tabindex="6"
          />
          <label for="price">Fiyat ($)</label>
        </span>
      </div>
    </div>

    <div class="flex justify-content-end mt-3 gap-2">
      <Button
        label="Temizle"
        icon="pi pi-refresh"
        class="p-button-text p-button-secondary"
        @click="resetForm"
      />
      <Button
        :label="status ? 'Kaydet' : 'Güncelle'"
        icon="pi pi-check"
        class="p-button-primary px-5"
        @click="saveForm"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "CostForm",
  props: {
    costTypes: {
      type: Array,
      required: true,
    },
    companies: {
      type: Array,
      required: true,
    },
    model: {
      type: Object,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      getCurrencyDisable: true,
      selectedCompany: null,
      filteredCompany: null,
      selectedCostType: null,
      filteredCostType: null,
      // model: {
      //   date: null,
      //   costTypeId: null,
      //   costType: null,
      //   invoiceNo: "",
      //   company: "",
      //   companyId: null,
      //   price: 0,
      //   rate: 0,
      //   total: 0,
      // },
      // Örnek maliyet türleri
    };
  },
  computed: {
    // Fiyat ve Kur girildikçe TL tutarını otomatik hesaplar
    // calculatedTl() {
    //   if (this.model.Fiyat && this.model.Kur) {
    //     return this.model.Fiyat / this.model.Kur;
    //   }
    //   return 0;
    // },
  },
  methods: {
    searchCompany(event) {
      console.log(event);
      const query = event.query.toLowerCase();
      this.filteredCompany = this.companies.filter((company) =>
        company.MaliyetFirma.toLowerCase().includes(query)
      );
    },
    companyInput(event) {
      this.model.FaturaFirma = event;
      this.model.FaturaFirmaId = null;
    },
    companySelected(event) {
      this.model.FaturaFirma = event.value.MaliyetFirma;

      this.model.FaturaFirmaId = event.value.ID;
    },
    costTypeInput(event) {
      if (typeof event != "object") {
        const index = this.costTypes.findIndex((x) => {
          return x.MaliyetTuru.toLowerCase() == event.toLowerCase();
        });
        if (index > -1) {
          alert("Zaten Bu İsimde Bir Maliyet Türü Var");
          return;
        } else {
          this.model.MaliyetFirma = event;
          this.model.MaliyetTurId = null;
        }
      } else {
        this.model.MaliyetFirma = event;
        this.model.MaliyetTurId = null;
      }
    },
    costTypeSelected(event) {
      this.model.MaliyetFirma = event.value.MaliyetTuru;

      this.model.MaliyetTurId = event.value.ID;
    },
    searchCostType(event) {
      console.log(event);
      const query = event.query.toLowerCase();
      this.filteredCostType = this.costTypes.filter((costType) =>
        costType.MaliyetTuru.toLowerCase().includes(query)
      );
    },

    dateSelected(event) {
      this.model.Tarih = event;
    },
    rateFetched(event) {
      this.model.Kur = event.rate;
    },
    onDateSelect(dateValue) {
      // SENİN KODLARIN BURAYA GELECEK
      // Örnek: this.$tcmb.getRate(dateValue).then(rate => this.model.rate = rate);
      console.log("Tarih seçildi, kur fonksiyonun tetiklenebilir:", dateValue);

      // Şimdilik test için rastgele bir kur atıyorum (Sen burayı kaldıracaksın)
      // this.model.rate = 34.50;

      // Bu eventi parent'a da gönderebiliriz
      this.$emit("date-selected", dateValue);
    },
    saveForm() {
      if (this.status) {
        console.log("Kaydedilecek Veri:", {
          ...this.model,
          totalTl: this.calculatedTl,
        });
        this.$axios
          .post("/reports/mekmer/calculating/cost/save", this.model)
          .then((res) => {
            if (res) {
              this.$emit("cost_saved_update_emit", this.model.Tarih);
              this.resetForm();
              this.$toast.success("Başarıyla kaydedildi.");
            } else {
              this.$toast.error("Kayıt sırasında bir hata oluştu.");
            }
          });
      } else {
        console.log("Kaydedilecek Veri:", {
          ...this.model,
          totalTl: this.calculatedTl,
        });
        this.$axios
          .put("/reports/mekmer/calculating/cost/update", this.model)
          .then((res) => {
            if (res) {
              this.$emit("cost_saved_update_emit", this.model.Tarih);
              this.$toast.success("Başarıyla kaydedildi.");
            } else {
              this.$toast.error("Kayıt sırasında bir hata oluştu.");
            }
          });
      }
    },
    resetForm() {
      this.model.FaturaFirma = null;
      this.model.FaturaFirmaId = null;
      this.model.FaturaNo = null;
      this.model.Fiyat = 0;
      this.model.ID = 0;
      this.model.Kur = 0;
      this.model.MaliyetTurId = null;
      this.model.MaliyetFirma = null;
      this.model.Tarih = null;
      this.model = {
        FaturaFirma: null,
        FaturaFirmaId: null,
        FaturaNo: null,
        Fiyat: 0,
        ID: 0,
        Kur: 0,
        MaliyetTurId: null,
        MaliyetFirma: null,
        Tarih: null,
      };
      this.selectedCompany = null;
      this.selectedCostType = null;
    },
    calculatedUsd(event) {
      if (event && this.model.Kur) {
        this.model.Fiyat = event * this.model.Kur;
      } else {
        this.model.Fiyat = 0;
      }
    },
    calculatedTl(event) {
      if (event && this.model.Kur) {
        this.model.FiyatUsd = event / this.model.Kur;
      } else {
        this.model.FiyatUsd = 0;
      }
    },
  },
  created() {
    if (!this.status) {
      this.selectedCompany = this.companies.find((x) => {
        return x.ID == this.model.FaturaFirmaId;
      });
      this.selectedCostType = this.costTypes.find((x) => {
        return x.ID == this.model.MaliyetTurId;
      });
      if (!this.model.FiyatUsd) {
        this.model.FiyatUsd = this.model.Fiyat / this.model.Kur;
      }
    }
  },
};
</script>

<style scoped>
/* Kart Tasarımı */
.surface-card {
  background-color: #ffffff;
  border-radius: 12px;
  /* Hafif gölge efekti */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

/* Inputların arasındaki boşlukları düzenle */
.field {
  margin-bottom: 1.5rem;
}

/* Readonly olan inputun arka planını biraz koyulaştırarak ayırt edilmesini sağla */
.filled-input >>> .p-inputtext {
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
