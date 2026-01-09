<template>
  <div class="container">
    <h3>TCMB Dolar Kuru Sorgulama</h3>

    <div class="form-group">
      <label>Tarih Seçiniz:</label>
      <Calendar v-model="selectedDate" dateFormat="dd.mm.yy" :showIcon="true" />
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
      <p v-if="isWeekendFallback" class="warning">
        <small
          >* Seçtiğiniz tarihte veri olmadığı için geçmişteki en yakın tarih
          getirildi.</small
        >
      </p>
    </div>

    <div v-if="error" class="error-box">
      {{ error }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedDate: new Date(), // Varsayılan bugün
      result: null,
      loading: false,
      error: null,
      isWeekendFallback: false,
    };
  },
  methods: {
    async fetchCurrency() {
      this.loading = true;
      this.error = null;
      this.result = null;
      this.isWeekendFallback = false;

      try {
        // Plugin üzerinden fonksiyonu çağırıyoruz
        const data = await this.$tcmb.getUSDRate(this.selectedDate);

        this.result = data;

        // Seçilen tarih ile gelen tarih aynı değilse uyarı gösterelim
        const requestDateStr = this.formatCompareDate(this.selectedDate);
        if (requestDateStr !== data.date) {
          this.isWeekendFallback = true;
        }
        this.$emit("dateSelectedEmit", this.selectedDate);
        this.$emit("rateFetchedEmit", data);
      } catch (err) {
        console.error(err);
        this.error =
          "Kur bilgisi çekilemedi. Lütfen bağlantınızı kontrol edin.";
      } finally {
        this.loading = false;
      }
    },
    // Karşılaştırma için basit formatlayıcı
    formatCompareDate(date) {
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = d.getFullYear();
      return `${day}${month}${year}`;
    },
  },
};
</script>

<style scoped>
.container {
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
