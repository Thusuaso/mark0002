<template>
  <div class="row">
    <div class="col-3">
      <DataTable :value="source_data.data_1" scrollable scrollHeight="450px">
        <template #header>
          <div style="margin: 0px auto; text-align: center">{{ date }}</div>
        </template>
        <Column field="KaynakYeri" header="Source"> </Column>
        <Column field="Num" header="Count">
          <template #footer>
            {{ data_1_total }}
          </template>
        </Column>
        <Column header="%">
          <template #body="slotProps">
            {{ ((slotProps.data.Num / data_1_total) * 100).toFixed(2) }}%
          </template>
        </Column>
      </DataTable>
    </div>
    <div class="col-3">
      <DataTable :value="source_data.data_2" scrollable scrollHeight="450px">
        <template #header>
          <div style="margin: 0px auto; text-align: center">{{ date - 1 }}</div>
        </template>
        <Column field="KaynakYeri" header="Source"> </Column>
        <Column field="Num" header="Count">
          <template #footer>
            {{ data_2_total }}
          </template>
        </Column>
        <Column header="%">
          <template #body="slotProps">
            {{ ((slotProps.data.Num / data_2_total) * 100).toFixed(2) }}%
          </template>
        </Column>
      </DataTable>
    </div>
    <div class="col-3">
      <DataTable :value="source_data.data_3" scrollable scrollHeight="450px">
        <template #header>
          <div style="margin: 0px auto; text-align: center">{{ date - 2 }}</div>
        </template>
        <Column field="KaynakYeri" header="Source"> </Column>
        <Column field="Num" header="Count">
          <template #footer>
            {{ data_3_total }}
          </template>
        </Column>
        <Column header="%">
          <template #body="slotProps">
            {{ ((slotProps.data.Num / data_3_total) * 100).toFixed(2) }}%
          </template>
        </Column>
      </DataTable>
    </div>
    <div class="col-3">
      <DataTable :value="source_data.data_4" scrollable scrollHeight="450px">
        <template #header>
          <div style="margin: 0px auto; text-align: center">{{ date - 3 }}</div>
        </template>
        <Column field="KaynakYeri" header="Source"> </Column>
        <Column field="Num" header="Count">
          <template #footer>
            {{ data_4_total }}
          </template>
        </Column>
        <Column header="%">
          <template #body="slotProps">
            {{ ((slotProps.data.Num / data_4_total) * 100).toFixed(2) }}%
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      /*
       * NESNE olarak baslatildi: sablon source_data.data_1 ... data_4
       * okuyor, yani bu bir DIZI DEGIL. Kaynakta `[]` idi ve veri
       * gelene kadar dort DataTable da :value="undefined" aliyordu.
       */
      source_data: {},
      date: new Date().getFullYear(),
      data_1_total: 0,
      data_2_total: 0,
      data_3_total: 0,
      data_4_total: 0,
    };
  },
  /*
   * created() -> mounted(): created() SSR'da da calisir, icindeki async
   * is BEKLENMEZ ve veri BOS serialize edilir (bkz. commit 2afc877e3).
   */
  async mounted() {
    try {
      const api = useLegacyApi()
      const res = await api.get("mekmar/reports/offer/source")
      this.source_data = res.data ?? {}
      /*
       * `?? []` KORUMASI: kaynak dort listenin de geldigini varsayiyordu;
       * biri eksik donerse .forEach TypeError atiyordu.
       */
      for (const key of ["data_1", "data_2", "data_3", "data_4"]) {
        const rows = this.source_data[key] ?? []
        const total = rows.reduce((sum, item) => sum + (Number(item.Num) || 0), 0)
        this[`${key}_total`] = total
      }
    } catch (err) {
      /* Kaynakta .catch YOKTU: istek patlarsa islenmemis ret dusuyordu. */
      console.error("offer/source cekilemedi:", err)
    }
  },
};
</script>

<!--
  components/reports/mekmar/gu/offerSource.vue
     -> app/components/reports/mekmar/gu/OfferSource.vue

  Bu bileşen pages/reports/mekmar/gu.vue'nun bir TabView sekmesini
  dolduruyor. Sayfa ve iki buyuk operasyon bileşeni
  (ordererOperation / shippedOperation) SONRAKI commit'te; bu commit
  sekmelerin hafif olanlarini getiriyor.

  Otomatik ice alma adi `ReportsMekmarGuOfferSource`. Nuxt 2'de ad
  `guOfferSource` idi (plugins/components.js:141); sayfadaki etiket
  <guOfferSource> -> <ReportsMekmarGuOfferSource> oldu.

  Dort yili yan yana gosteriyor (bu yil ve uc yil oncesi), her biri
  teklif kaynagi basina sayi + yuzde.

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] created() -> mounted(): created() SSR'da da calisir, icindeki
      async is BEKLENMEZ ve veri BOS serialize edilir; hydration onu
      devralir, created() bir daha calismadigi icin tablolar bos kalir
      (bkz. commit 2afc877e3).
  [x] this.$axios -> useLegacyApi()
  [x] `.catch` EKLENDI: kaynakta yoktu, istek patlarsa ISLENMEMIS RET
      dusuyordu. Kullaniciya gosterilen bir sey DEGISMEDI (console).

  [x] `source_data: []` -> `{}`
      Sablon `source_data.data_1` ... `data_4` okuyor, yani bu bir
      DIZI DEGIL NESNE. Kaynakta dizi olarak baslatiliyordu ve veri
      gelene kadar dort DataTable da :value="undefined" aliyordu.
      (Ayni ad/tip tutarsizligi selection store'undaki `productsList`te
      de vardi.)

  [x] DORT AYNI forEach BLOGU -> tek dongu + reduce.
      Ayrica `?? []` KORUMASI eklendi: kaynak dort listenin de
      geldigini varsayiyordu, biri eksik donerse
      `undefined.forEach` TypeError atiyordu.
      Toplamlar `+=` yerine reduce ile SIFIRDAN hesaplaniyor -- mounted
      bir kez calistigi icin sonuc ayni, ama istek tekrarlanirsa
      birikme olmuyor.
-->
