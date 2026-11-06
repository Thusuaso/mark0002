<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <Select
          v-model="selectedYear"
          :options="sharedStore.getYearList"
          optionLabel="Year"
          placeholder="Select a Year"
          class="w-full md:w-14rem"
          @change="yearSelected($event)"
        />
      </div>
      <div class="col">
        <Button severity="success" @click="excel_output" label="Excel" />
      </div>
    </div>
    <TabView>
      <TabPanel header="Yearly By Po">
        <ReportsMekmarMkYearByPoOrdersList
          :list="reportsStore.getReportsMekmarMkList.byPo"
        />
      </TabPanel>
      <TabPanel header="Up To Date Orders">
        <ReportsMekmarMkYearByMarketingOrdersList
          :customer="reportsStore.getReportsMekmarMkList.byCustomer"
          :marketing="reportsStore.getReportsMekmarMkList.byMarketing"
        />
      </TabPanel>
      <TabPanel header="Shipment Reports">
        <ReportsMekmarMkYearByMarketingForwardingList
          :marketing="reportsStore.getReportsMekmarMkList.byMarketingYukleme"
          :marketingByDetail="reportsStore.getReportsMekmarMkList.byMarketingDetayYukleme"
        />
      </TabPanel>
      <TabPanel header="Customers Reports">
        <ReportsMekmarMkByCustomerList
          :list="reportsStore.getReportsMekmarMkList.byCustomerOrder"
        />
      </TabPanel>
    </TabView>
  </div>
</template>
<script>
import { useReportsStore } from "~/stores/reports"
import { useSharedStore } from "~/stores/shared"
export default {
  data() {
    return {
      /*
       * [!] ESKIDEN `{ Year: 2026 }` DIYE GOMULUYDU.
       *
       * Veri mounted() icinde `loadMkReports(new Date().getFullYear())`
       * ile cekiliyor, yani her zaman ICINDE BULUNULAN yil. Secici ise
       * sabit 2026 yaziyordu: bugun tesadufen ortusuyor, 2027'de
       * secici 2026 gosterirken tablo 2027 verisini gosterecekti.
       *
       * Ayni sinif hata sample/finance sayfasinda GORUNUR haldeydi
       * (secici 2024, veri 2026) ve oradan buraya bakildi.
       *
       * Deger artik veriyle AYNI kaynaktan geliyor; bugunku davranis
       * birebir ayni.
       */
      selectedYear: { Year: new Date().getFullYear() },
    };
  },
  computed: {
    reportsStore() {
      return useReportsStore()
    },
    sharedStore() {
      return useSharedStore()
    },
  },
  /*
   * created() -> mounted(): created() SSR'da da calisir, icindeki async
   * is BEKLENMEZ ve liste BOS serialize edilir; hydration onu devralir,
   * created() bir daha calismadigi icin tablo bos kalir (bkz. commit
   * 2afc877e3). mounted() sunucuda hic calismaz.
   */
  mounted() {
    this.loadMkReports(new Date().getFullYear());
  },
  methods: {
    /*
     * MK raporlari. Artik EXCEL SUNUCUSUNDAN DEGIL, Nitro'dan:
     * server/routes/mk-api/reports/[year].get.ts
     * (Python tarafindan kurtulma planinin 2. adimi.)
     *
     * [x] IKI AYNI BLOK TEK YERE ALINDI: mounted ve yil secimi ayni
     *     istegi ve ayni store cagrisini kopyaliyordu.
     *
     * [x] .catch() EKLENDI: yoktu. beginLoading() cagrilip istek
     *     patlarsa endLoading() HIC cagrilmiyor ve yukleme durumu
     *     shared store'da SAYAC oldugu icin bir eksilmemis kaliyor --
     *     gosterge o oturum boyunca bir daha kapanmiyordu.
     */
    loadMkReports(year) {
      this.sharedStore.beginLoading();

      $fetch(`/mk-api/reports/${year}`, { baseURL: "/" })
        .then((data) => {
          this.reportsStore.setReportsMekmarMkList(data);
        })
        .catch((err) => {
          console.error("mk raporlari alinamadi:", err);
          useAppToast().error("MK raporları alınamadı.");
        })
        .finally(() => {
          this.sharedStore.endLoading();
        });
    },

    /*
     * MK raporlari Excel ciktisi. Artik Python'daki excel sunucusundan
     * DEGIL, Nitro'dan: server/routes/excel-api/reports/mk.post.ts
     *
     * [x] IKI ADIMLI SOZLESME DUSTU (POST uret + GET indir). Eskisi
     *     paylasilan diskteki tek bir dosyaya yaziyordu: iki kullanici
     *     ayni anda ciktisini alirsa ikincinin POST'u birincinin
     *     dosyasini ezer ve birinci BASKASININ raporunu indirirdi.
     *     Tek istek, govdesinde dosya -> yaris yok.
     *
     * [x] `if (response.status)` DUSTU: HTTP durumunu (daima 200)
     *     okuyordu, govdedeki {"status": false}'u DEGIL. Python bir
     *     istisnada False donup 200 ile yanitladigi icin kosul yine
     *     dogru oluyor ve istemci BOS SABLONU indiriyordu -- hatasiz,
     *     sessiz. exportExcel artik HTTP hatasinda firlatiyor.
     *
     * [x] .catch() ICINDE endLoading() TEKRARI DUSTU -> finally.
     *     Eskisinde basarili yolda endLoading() `if` BLOGUNUN ICINDE
     *     idi: `response.status` false gelirse yukleme gostergesi hic
     *     kapanmiyordu (sayac bir eksilmemis kalip o oturum boyunca
     *     acik duruyordu).
     */
    async excel_output() {
      this.sharedStore.beginLoading();

      try {
        await exportExcel(
          "/excel-api/reports/mk",
          this.reportsStore.getReportsMekmarMkList,
          "mkRaporlari.xlsx"
        );
      } catch (err) {
        console.error("mk excel ciktisi basarisiz:", err);
        useAppToast().error("Excel oluşturulamadı.");
      } finally {
        this.sharedStore.endLoading();
      }
    },
    yearSelected(event) {
      this.loadMkReports(event.value.Year);
    },
  },
};
</script>

<script setup>
/*
 * definePageMeta yalnizca <script setup> icinde kullanilabilir ->
 * Options API sayfalarinda IKINCI bir script blogu gerekiyor.
 * Nuxt 2'deki sayfa secenegi `middleware: ["authority"]` karsiligi;
 * ara katman app/middleware/authority.ts olarak tasinmis durumda.
 */
definePageMeta({ middleware: ["authority"] })

/*
 * REFERANS LISTESI -- YIL
 *
 * Nuxt 2'de layouts/default.vue'nun created()'i cekiyordu; pilotun
 * layout'u o 25 liste cagrisini bilerek erteledi, ama bu sayfa
 * tasinirken kendi ihtiyaci eklenmedi -- yil Select'i BOS geliyordu.
 * Hata/uyari yok: getter bos dizi donuyor.
 */
const mkSharedStore = useSharedStore()

await useReferenceData("reports-mk", [
  ["yearList", () => mkSharedStore.setYearList()],
])
</script>

<!--
  pages/reports/mekmar/mk.vue

  Bagimliliklar (dordunde de elle duzeltme gerekmedi):
    mk/byCustomer.vue                -> MkByCustomerList.vue
    mk/yearByMarketingForwarding.vue -> MkYearByMarketingForwardingList.vue
    mk/yearByMarketingOrders.vue     -> MkYearByMarketingOrdersList.vue
    mk/yearByPoOrders.vue            -> MkYearByPoOrdersList.vue

  ELLE:
  [x] mapGetters -> reportsStore + sharedStore (getLoading -> isLoading)
  [x] 8 dispatch -> reportsStore / sharedStore.beginLoading() / endLoading()
      Vuex loading modulu pilotta shared store'a tasindi ve artik BOOLEAN
      degil SAYAC (bkz. app/stores/shared.ts).
  [x] 3x this.$excelApi -> useExcelApi(); elle <a download> -> yardimci
  [x] middleware: ["authority"] -> definePageMeta
  [x] created() -> mounted()

  Veri artik NITRO'DAN geliyor: server/routes/mk-api/reports/[year].get.ts
  (Nuxt 2'de ve pilotun ilk halinde Excel sunucusundaydi.) Excel CIKTISI
  hala Excel sunucusunda -- excel_output() degismedi.

  TASIMA YOLU: elle yeniden yazilmadi; tools/codemods/vue2-to-vue3.mjs
  uygulandi, sonra codemod'un "ELLE YAPILACAK" diye listeledigi maddeler
  kapatildi. Kaynak: mark0002 deposunun codemod-vue3-prep dali (filtreler
  ve .sync orada zaten cevrilmisti).
-->
