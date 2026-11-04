<template>
  <div class="row mt-3">
    <div class="col">{{ month }}</div>

    <div class="col">
      <CustomInput
        :value="currencyValue"
        text="Currency"
        @onInput="currencyValue = $event"
        :disabled="false"
      />
    </div>
    <!-- <div class="col">
      <Button
        severity="success" class="w-100"
        label="Save"
        @click="save"
        :disabled="save_button_disabled"
      />
    </div>
    <div class="col">
      <Button
        severity="warn" class="w-100"
        label="Update"
        @click="update"
        :disabled="update_button_disabled"
      />
    </div> -->
    <div class="col">
      <Button
        severity="secondary" class="w-100"
        label="Get Currency"
        @click="getCurrency(month_id)"
        :loading="currency_loading"
        :disabled="currency_loading"
      />
    </div>
    <hr />
  </div>
</template>
<script>

export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    currency: {
      type: Number,
      required: true,
    },
    month_id: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      /*
       * DUZELTILDI -- PROP'A YAZILIYORDU (Vue 3'te TypeError).
       *
       * `currency` bir PROP ve kod iki yerde ona yaziyordu: sablondaki
       * CustomInput'un @onInput'u ve getCurrency()'nin sonucu.
       *
       * Vue 2 bunu yalnizca UYARIYORDU; Vue 3'te prop'lar readonly
       * proxy oldugu icin calisma aninda patliyor:
       *   TypeError: proxy set handler returned false for property "currency"
       * "ortalama kur alinamadi" hatasinin sebebi buydu -- istek
       * BASARILI donuyor, sonucu yazmaya calisirken patliyordu.
       * Ayrica kutuya elle deger yazmak da ayni sebeple kiriliyordu.
       *
       * Artik yerel kopya tutuluyor; prop degisirse watch esliyor,
       * emit'ler yerel degeri gonderiyor.
       */
      currencyValue: this.currency,
      save_button_disabled: true,
      update_button_disabled: true,
      currency_list: [],
      currency_total: 0,
      currency_loading: false,
    };
  },
  /*
   * created() -> mounted(): created() SSR'da da calisir, icindeki async
   * is BEKLENMEZ ve liste BOS serialize edilir; hydration onu devralir,
   * created() bir daha calismadigi icin tablo bos kalir (bkz. commit
   * 2afc877e3). mounted() sunucuda hic calismaz.
   */
  mounted() {
    if (
      this.currencyValue == 0 ||
      this.currencyValue == null ||
      this.currencyValue == undefined ||
      this.currencyValue == ""
    ) {
      this.save_button_disabled = false;
      this.update_button_disabled = true;
    } else {
      this.save_button_disabled = true;
      this.update_button_disabled = false;
    }
  },
  methods: {
    save() {
      const data = {
        month: this.month_id,
        currency: this.currencyValue,
        year: this.year,
      };
      this.$emit("cost_save_emit", data);
      this.save_button_disabled = true;
      this.update_button_disabled = false;
    },
    update() {
      const data = {
        id: this.id,
        month: this.month_id,
        currency: this.currencyValue,
        year: this.year,
      };
      this.$emit("cost_update_emit", data);
    },
    /*
     * Aylik ORTALAMA kur. Artik EXCEL SUNUCUSUNDAN DEGIL, Nitro'dan:
     * server/routes/tcmb-api/usd-average/[year]/[month]/[day].get.ts
     * (Python tarafindan kurtulma planinin 2. adimi).
     *
     * `days` = ayin kac gun oldugu. Uc 1'den o gune kadar her gunun
     * kurunu okuyup veri BULUNAN gunlerin ortalamasini aliyor (eksik
     * gunler atlaniyor, geriye yurunmuyor -- yoksa hafta sonu icin cuma
     * kuru birkac kez sayilip ortalama kayardi).
     *
     * DIKKAT -- BU UC VERITABANINA YAZIYOR: sonuc AyoCurrency
     * tablosuna UPSERT ediliyor (Python'da da oyleydi). Yani bu dugmeye
     * basmak salt okuma degil.
     */
    getCurrency(month_) {
      this.currency_loading = true;

      const date = new Date(this.year, month_, 0);
      const days = date.getDate();

      $fetch(`/tcmb-api/usd-average/${this.year}/${month_}/${days}`, {
        baseURL: "/",
      })
        .then((response) => {
          this.currencyValue = response.average;

          /*
           * Python ciplak bir sayi donduruyordu, yani "hic veri
           * bulunamadi" ile "ortalama gercekten 0" ayirt edilemiyordu.
           * Yeni uc dayCountWithData da veriyor.
           */
          if (!response.dayCountWithData) {
            useAppToast().warn(
              "Bu ay icin TCMB kuru bulunamadi, ortalama hesaplanamadi.",
            );
          }
        })
        .catch((err) => {
          /*
           * DUZELTILDI -- .catch() YOKTU: istek basarisiz olursa
           * currency_loading TRUE takili kaliyor ve gosterge sonsuza
           * kadar doniyordu; kullanici hicbir hata gormuyordu.
           */
          console.error("ortalama kur alinamadi:", err);
          useAppToast().error("Ortalama kur alınamadı.");
        })
        .finally(() => {
          this.currency_loading = false;
        });
    },
  },
  watch: {
    /* Ebeveyn listeyi yenilerse yerel kopya prop'la eslesir. */
    currency(value) {
      this.currencyValue = value;
    },
  },
};
</script>
