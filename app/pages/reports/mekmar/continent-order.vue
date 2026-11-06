<template>
  <div class="row">
    <Button severity="secondary" label="Excel" @click="excel_output" />
    <ReportsMekmarGuContinentOrders
      v-for="item in list"
      :key="item"
      :values="item"
    />
  </div>
</template>

<script>
export default {
    data() {
    return {
      list: [],
    };
  },
  /*
   * created() -> mounted(): created() SSR'da da calisir, icindeki async is
   * BEKLENMEZ ve liste BOS serialize edilir; hydration onu devralir,
   * created() bir daha calismadigi icin ekran bos kalir
   * (bkz. commit 2afc877e3). mounted() sunucuda hic calismaz.
   */
  mounted() {
    useLegacyApi()
      .get("/reports/continent/order/list")
      .then((res) => {
        this.list = res.data.list;
      });
  },
  methods: {
    /*
     * ARTIK EXCEL SUNUCUSUNDAN DEGIL, NITRO'DAN:
     *   eski: POST + GET {excelServerBase}/maliyet/dosyalar/continent
     *   yeni: POST /excel-api/reports/continents   (tek istek)
     *         server/routes/excel-api/reports/continents.post.ts
     *
     * Cikti uretimdekiyle ornek veriyle KARSILASTIRILDI: deger, sayi
     * bicimi, hucre stili, sutun genisligi ve birlestirme farki 0.
     *
     * `if (response.status)` DUSTU: HTTP durumunu (daima 200) okuyordu,
     * govdedeki {"status": false}'u DEGIL -- uretim patlasa bile
     * indirme tetikleniyordu.
     */
    async excel_output() {
      try {
        await exportExcel("/excel-api/reports/continents", this.list, "continents.xlsx");
      } catch (err) {
        console.error("continents excel ciktisi basarisiz:", err);
        useAppToast().error("Excel olusturulamadi.");
      }
    },
  },
};
</script>

<!--
  pages/reports/mekmar/continent-order.vue

  Bagimlilik: components/reports/mekmar/gu/continent.vue
    (`guContinentOrders`) -> app/components/reports/mekmar/GuContinentOrders.vue
    auto-import adi: ReportsMekmarGuContinentOrders

  ELLE:
  [x] this.$axios -> useLegacyApi(),  this.$excelApi -> useExcelApi()
  [x] Elle <a download> -> downloadFromExcelServer()
      Eski kod <a> ogesini DOM'dan HIC KALDIRMIYORDU.
  [x] mapGetters(["getLocalUrl"]) dustu (tek kullanim yeri o <a> blogaydi)
  [x] created() -> mounted()
  [x] <guContinentOrders> -> <ReportsMekmarGuContinentOrders>
      DIKKAT: codemod bunu yalnizca <GuContinentOrders> yapiyor ve O AD
      COZULEMEZ -- sablon sessizce bos render edilir. Artik
      tools/codemods/check-component-tags.mjs bu sinifi yakaliyor.

  TASIMA YOLU: elle yeniden yazilmadi; tools/codemods/vue2-to-vue3.mjs
  uygulandi, sonra codemod'un "ELLE YAPILACAK" diye listeledigi maddeler
  kapatildi. Kaynak: mark0002 deposunun codemod-vue3-prep dali (filtreler
  ve .sync orada zaten cevrilmisti).
-->
