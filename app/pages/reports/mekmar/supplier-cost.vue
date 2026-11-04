<template>
  <div>
    <Button
      type="button"
      severity="secondary"
      label="Excel"
      @click="excel_output"
    />
    <div class="row">
      <ReportsMekmarGuSupplierCost
        v-for="item in list"
        :list="item"
        :key="item"
      />
    </div>
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
      .get("/reports/supplier/cost/list")
      .then((res) => {
        this.list = res.data.list;
      });
  },

  methods: {
    excel_output() {
      useExcelApi()
        .post("/reports/excel/supplier/cost", this.list)
        .then((response) => {
          if (response.status) {
            downloadFromExcelServer(
              "reports/excel/supplier/cost",
              "mekamer_supplier_cost_excel.xlsx"
            );
          }
        });
    },
  },
};
</script>

<!--
  pages/reports/mekmar/supplier-cost.vue

  Bagimlilik: components/reports/mekmar/gu/supplier.vue (`guSupplierCost`)
    -> app/components/reports/mekmar/GuSupplierCost.vue
       (auto-import adi: ReportsMekmarGuSupplierCost)

  ELLE YAPILAN DEGISIKLIKLER:
  [x] this.$axios -> useLegacyApi()   (axios sozlesmesi, res.data korunur)
  [x] this.$excelApi -> useExcelApi()
  [x] mapGetters(["getLocalUrl"]) KALDIRILDI -- tek kullanim yeri asagidaki
      <a download> blogaydi; downloadFromExcelServer adresi kendisi
      uretiyor (runtimeConfig.public.excelServerBase).
  [x] Elle <a> olusturma -> downloadFromExcelServer()
      Eski kod <a> ogesini DOM'dan HIC KALDIRMIYORDU (link.remove() yok):
      her Excel tiklamasi sayfada olu bir <a> birakiyordu.
  [x] created() -> mounted()  (gerekcesi mounted()'in ustunde)
  [x] <guSupplierCost> -> <ReportsMekmarGuSupplierCost>
      Nuxt 2'de plugins/components.js ile global kayitliydi; Nuxt
      auto-import adi dosya yolundan uretiliyor.
      DIKKAT: vue2-to-vue3 codemod'u bunu yalnizca <GuSupplierCost>
      yapiyor (ilk harfi buyutuyor) -- o ad auto-import ile COZULMEZ ve
      sablon sessizce bos render edilir. Codemod ciktisi her zaman pilot
      dosya yoluyla karsilastirilmali.
  [x] class="p-button-secondary" -> severity="secondary" (codemod)

  BICIM: dosya 1-3 bosluk karisik girintiliydi (projenin geri kalani 2),
  Prettier kalibina getirildi. Mantik degismedi.
-->
