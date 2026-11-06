<template>
  <div>
    <div class="row container">
      <div class="col">
        <Dropdown
          v-model="selectedYear"
          :options="reportsStore.getReportsMekmarGuYearList"
          optionLabel="Year"
          @change="yearSelected($event)"
        />
      </div>
    </div>
    <TabView>
      <TabPanel header="Container (Mekmar)">
        <ReportsMekmarGuContList
          :contCountList="reportsStore.getReportsMekmarGuContList"
          :contCustList="reportsStore.getReportsMekmarGuContByCustList"
        />
      </TabPanel>
      <!-- Mekus sekmesi kaynakta da YORUMDA; bileşeni yine tasindi ki
           yeniden acilabilsin (bkz. gu/MekusList.vue alt notu).
           Acilacaksa: <ReportsMekmarGuMekusList
             :list="reportsStore.getReportsMekmarGuMekusList" /> -->
      <TabPanel header="Logs">
        <ReportsMekmarGuLogsList
          :list="reportsStore.getReportsMekmarGuLogsList"
        />
      </TabPanel>
      <TabPanel header="Shipment Summary (Yearly)">
        <Button
          type="button"
          label="Excel"
          severity="secondary"
          @click="forwarding_excel_output"
        />
        <div class="row">
          <ReportsMekmarGuForwardingList
            v-for="(item, index) in reportsStore.getReportsMekmarGuForwList"
            :key="index"
            :list="item"
          />
        </div>
      </TabPanel>
      <TabPanel header="Order Summary (Yearly)">
        <Button
          type="button"
          label="Excel"
          severity="secondary"
          @click="forwarding_excel_output_2"
        />
        <div class="row">
          <ReportsMekmarGuForwardingList
            v-for="(item, index) in reportsStore.getReportsMekmarGuOrderList"
            :key="index"
            :list="item"
          />
        </div>
      </TabPanel>
      <!-- Ayo sekmesi kaynakta da YORUMDA. Icindeki tablo
           getReportsMekmarGuAyoList ile ayoUsdTotal / ayoTlTotal
           alanlarini kullaniyordu; o uc parca da bu dosyada korundu
           (bkz. alt not). -->
      <TabPanel header="Seller Orders">
        <ReportsMekmarGuOrdererOperation />
      </TabPanel>
      <TabPanel header="Seller Shipped">
        <ReportsMekmarGuShippedOperation />
      </TabPanel>
      <TabPanel header="Seller Shipped Profit">
        <ReportsMekmarGuProfit
          :thisyear="ayoListThisYear"
          :oneyear="ayoListOneYearAgo"
          :twoyear="ayoListTwoYearAgo"
        />
      </TabPanel>
      <TabPanel header="Offer Source">
        <ReportsMekmarGuOfferSource />
      </TabPanel>
      <TabPanel header="Offer Country">
        <ReportsMekmarGuOfferCountry />
      </TabPanel>
    </TabView>
  </div>
</template>

<script>
import { useReportsStore } from "~/stores/reports"

export default {
  computed: {
    reportsStore() {
      return useReportsStore()
    },
  },
  data() {
    return {
      selectedYear: null,
      ayoUsdTotal: 0,
      ayoTlTotal: 0,
      ayoListThisYear: [],
      ayoListOneYearAgo: [],
      ayoListTwoYearAgo: [],
    }
  },
  /*
   * beforeCreate() + created() -> TEK mounted().
   *
   * Kaynakta liste cekimi beforeCreate()'te, uc excel istegi ise
   * created()'teydi; ikisi de SSR'da calisir ve icindeki async is
   * BEKLENMEZ -- veri bos serialize edilir, hydration onu devralir ve
   * kancalar bir daha calismadigi icin sekmeler bos kalir
   * (bkz. commit 2afc877e3). mounted() sunucuda hic calismaz.
   */
  async mounted() {
    this.reportsStore.setReportsMekmarGuList()

    /*
     * SABIT YIL: kaynakta `{ Year: 2026 }` gomuluydu. Dropdown'un
     * secenekleri store'dan geliyor ama baslangic degeri elle
     * yaziliydi; 2027'de bu deger listede olmayan bir yili gosterir.
     * KORUNDU (davranis degisikligi olmasin diye) ama bilinmeli.
     */
    this.selectedYear = { Year: 2026 }

    const year = this.selectedYear.Year

    /*
     * ARTIK EXCEL SUNUCUSUNDAN DEGIL, NITRO'DAN:
     *   eski: GET {excelServerBase}/maliyet/listeler/maliyetListesi/{yil}
     *   yeni: GET /maliyet-api/yillik/{yil}
     *         (server/routes/maliyet-api/yillik/[year].get.ts)
     *
     * Ayni uc ayo.vue'da zaten Nitro'dan okunuyordu (ayo.vue:685); burada
     * hala Python'a gidiyordu, yani AYNI RAPOR IKI AYRI KAYNAKTAN
     * besleniyordu.
     *
     * IKI CIKTI KARSILASTIRILDI (2026, uretim verisi, 44 satir x 84 alan
     * = 3696 hucre): 3678 hucre birebir ayni. Farkli olan 18 hucre, 3
     * satirda ve yalnizca su 6 alanda:
     *   dis_alim_evrak, dis_alim_evrak_sayisi, dis_alim_tedarikci,
     *   dis_alim_tedarikci_sayisi, tedarikci_sayisi, tedarikci_sayisi_evrak
     *
     * Bu fark BEKLENEN: cost-report.ts'teki [FIX-1] -- Python'da evrak
     * listeleri SINIF niteligi oldugu icin tum satirlar ayni listeyi
     * paylasiyor ve sayilar KUMULATIF cikiyor (orn. tedarikci_sayisi 53,
     * icinde ayni link onlarca kez). Nitro her satira kendi listesini
     * veriyor. Yani Nitro tarafi DOGRU olan.
     *
     * Ustelik bu 6 alan ARAYUZDE HIC KULLANILMIYOR (tum app/ tarandi:
     * sifir eslesme), dolayisiyla bu sayfada gorunur bir degisiklik yok.
     *
     * `.data` DUSTU: useExcelApi axios sozlesmesini taklit edip
     * `{ data, status }` donduruyordu; $fetch govdenin KENDISINI
     * donduruyor.
     */
    const costList = (y) => $fetch(`/maliyet-api/yillik/${y}`, { baseURL: "/" })

    /*
     * Uc yil PARALEL cekiliyor (kaynakta da ucu birbirini beklemiyordu).
     * Promise.allSettled: biri patlarsa digerleri yine yerine otursun --
     * kaynakta .catch YOKTU, patlayan istek ISLENMEMIS RET dusuruyordu.
     */
    const [bu, bir, iki] = await Promise.allSettled([
      costList(year),
      costList(year - 1),
      costList(year - 2),
    ])

    if (bu.status === "fulfilled") this.ayoListThisYear = bu.value ?? []
    else console.error("maliyetListesi (bu yil) cekilemedi:", bu.reason)

    if (bir.status === "fulfilled") this.ayoListOneYearAgo = bir.value ?? []
    else console.error("maliyetListesi (-1 yil) cekilemedi:", bir.reason)

    if (iki.status === "fulfilled") this.ayoListTwoYearAgo = iki.value ?? []
    else console.error("maliyetListesi (-2 yil) cekilemedi:", iki.reason)
  },

  methods: {
    forwarding_excel_output() {
      this.__forwardingExcel(this.reportsStore.getReportsMekmarGuForwList)
    },
    forwarding_excel_output_2() {
      this.__forwardingExcel(this.reportsStore.getReportsMekmarGuOrderList)
    },
    /*
     * Iki excel cikisi AYNI uca AYNI dosya adiyla gidiyor; yalnizca
     * gonderilen liste farkli. Tek yardimcida kaldi.
     *
     * ARTIK EXCEL SUNUCUSUNDAN DEGIL, NITRO'DAN:
     *   eski: POST + GET {excelServerBase}/reports/gu/forwarding
     *   yeni: POST /excel-api/gu/forwarding   (tek istek)
     *         server/routes/excel-api/gu/forwarding.post.ts
     *
     * Cikti uretimdekiyle KARSILASTIRILDI: deger, sayi bicimi, hucre
     * stili, sutun genisligi ve 11 birlestirme farki 0.
     *
     * [!] BU RAPORDA BILINEN BIR KUSUR VAR ve BILEREK TASINDI:
     *     yil basliklari (2024..2014) Python'da SABIT yazili, veriden
     *     turetilmiyor -- yani rapor hangi yillarla uretilirse
     *     uretilsin basliklar ayni kaliyor. Govdede yil alani
     *     olmadigi icin duzeltmek istemciyi de degistirmeyi
     *     gerektiriyor; ayrinti uc dosyasinda.
     *
     * `if (response.status)` DUSTU: HTTP durumunu (daima 200)
     * okuyordu, govdedeki {"status": false}'u DEGIL.
     */
    async __forwardingExcel(list) {
      try {
        await exportExcel("/excel-api/gu/forwarding", list, "gu_excel.xlsx")
      } catch (err) {
        console.error("gu forwarding excel ciktisi basarisiz:", err)
        useAppToast().error("Excel olusturulamadi.")
      }
    },
    yearSelected(event) {
      this.reportsStore.setReportsMekmarGuListYear(event.value.Year)
    },
  },
  watch: {
    /*
     * KORUNDU -- su an ETKISIZ: hesapladigi ayoUsdTotal / ayoTlTotal
     * yalnizca YORUMDAKI "Ayo" sekmesinin footer'larinda kullaniliyordu.
     * Sekme acilirsa gerekecegi icin silinmedi.
     */
    "reportsStore.getReportsMekmarGuAyoList"() {
      let usd = 0
      let tl = 0

      this.reportsStore.getReportsMekmarGuAyoList.forEach((x) => {
        usd += x.Usd
        tl += x.Tl
      })

      this.ayoUsdTotal = usd
      this.ayoTlTotal = tl
    },
  },
}
</script>

<script setup>
/*
 * definePageMeta yalnizca <script setup> icinde cagrilabilir -> Options
 * API sayfalarinda ikinci bir script blogu gerekiyor.
 *
 * ZORUNLU: Options API'deki `middleware: [...]` anahtari Nuxt 3+'ta YOK
 * SAYILIR -- hata vermez, yetki kisitlamasi SESSIZCE kalkar
 * (bkz. commit 5fc77edb1). Kaynak sayfada `middleware: ["authority"]`
 * yaziliydi.
 */
definePageMeta({ middleware: ["authority"] })
</script>

<!--
  pages/reports/mekmar/gu.vue -> app/pages/reports/mekmar/gu.vue

  Son tasinan sayfa. Dokuz sekme bileşeninin yedisi onceki commit'te
  (53374ead8), iki buyuk operasyon bileşeni bu commit'te geldi.

  == STORE ISI YOK: "EKSIK 1" OLU BIR mapGetter CIKTI ==
  check-store-refs bu sayfa icin tek eksik uye gosteriyordu:
      getReportsMekmarGuAyoCostList
  Kaynakta dizge TEK KEZ geciyordu ve o da mapGetters listesinin
  KENDISIYDI -- ne sablonda, ne metotlarda, ne watch'ta. Olu girdi
  oldugu icin tasinmadi; store'a eklenecek bir sey yok.

  Ayni sekilde `getOrdersList`... (bu sayfada yok) -- ama
  `getReportsMekmarGuMekusList` yalnizca YORUMDAKI Mekus sekmesinde,
  `getReportsMekmarGuAyoList` ise yalnizca YORUMDAKI Ayo sekmesinde ve
  watch'ta kullaniliyor. Ikisi de store'da DURUYOR; sayfa artik
  mapGetters kullanmadigi icin sablonda nereden geldikleri acik.

  == ZORUNLU DEGISIKLIKLER ==

  [x] beforeCreate() + created() -> TEK async mounted()
      Kaynakta liste cekimi beforeCreate()'te, uc excel istegi
      created()'teydi. Ikisi de SSR'da calisir ve async is beklenmez ->
      sekmeler bos kalirdi.
  [x] middleware: ["authority"] -> definePageMeta
  [x] mapGetters(10 getter) -> useReportsStore()
      (`getLocalUrl` mapGetters'dan KALKTI -- excel notuna bak)
  [x] this.$store.dispatch(...) -> reportsStore.<action>()
  [x] this.$excelApi -> useExcelApi() + downloadFromExcelServer()
  [x] class="p-button-secondary" -> severity="secondary"  (iki buton)
  [x] Dokuz bileşen etiketi PascalCase'e. Nuxt 2'de hepsi
      plugins/components.js'te ELLE global kaydediliyordu; ucunun adi
      yol ile uyumsuzdu ve degisti:
          profitGu       -> ReportsMekmarGuProfit        (satir 132)
          guOfferSource  -> ReportsMekmarGuOfferSource   (satir 141)
          guOfferCountry -> ReportsMekmarGuOfferCountry  (satir 142)
      Digerleri birebir ayni kaldi (satir 63-66, 125-126).

  [x] `v-for="item of ..." :key="item"` -> `v-for="(item, index) in ..."`
      `:key="index"`.
      Kaynakta anahtar NESNENIN KENDISIYDI (`:key="item"`); item bir
      nesne oldugu icin Vue bunu anahtar olarak kullanabiliyor ama
      onerilmiyor ve liste guncellenirken ogeleri yanlis eslestirebilir.
      Liste yil basina sabit oldugu icin index guvenli bir anahtar.

  == EKLENEN HATA YAKALAMA ==
  Uc excel istegi kaynakta `.catch`SIZ ayri ayri zincirlenmisti; biri
  patlarsa ISLENMEMIS RET dusuyordu. Promise.allSettled ile PARALEL
  cekiliyor (kaynakta da birbirlerini beklemiyorlardi) ve her biri ayri
  ayri degerlendiriliyor -- biri patlasa digerleri yine yerine oturuyor.
  Kullaniciya gosterilen bir sey DEGISMEDI (console.error).

  == TEKRAR AZALTMA ==
  forwarding_excel_output ve forwarding_excel_output_2 AYNI uca AYNI
  dosya adiyla gidiyordu; yalnizca gonderilen liste farkliydi ->
  __forwardingExcel(list). Iki genel metot adi KORUNDU cunku sablondaki
  @click bagları onlara bakiyor.

  == KORUNAN DAVRANISLAR (bilincli) ==

  1) SABIT YIL: `this.selectedYear = { Year: 2026 }` kaynakta gomuluydu.
     Dropdown'un secenekleri store'dan geliyor ama BASLANGIC degeri elle
     yazili; 2027'de listede olmayan bir yili gosterir. Davranis
     degisikligi olmasin diye korundu, ama bilinmeli.

  2) IKI YORUMLU SEKME (Mekus ve Ayo) yorumda BIRAKILDI; pilotun
     yerlesik karari (reports/mekmar/{ayo,forwarding}.vue'daki
     <JsonExcel> bloklari, finance/index.vue'daki
     financeListExcelFields) yorumdaki blogu ve ihtiyaci olan parcalari
     korumak. Bu yuzden `ayoUsdTotal`/`ayoTlTotal` alanlari ve onlari
     hesaplayan watch da duruyor -- SU AN ETKISIZ.

  3) watch hedefi `"reportsStore.getReportsMekmarGuAyoList"` (DIZGE
     YOLU). Vuex'te mapGetters bir computed uretiyordu ve watch o ada
     bakiyordu; Pinia'da o ad artik computed DEGIL, bu yuzden dizge
     yolla izleniyor. (Ayni tuzak finance/PurchaseList.vue'da da
     cikmisti: orada watch sessizce OLU kalmisti -- commit 24ea0e55e.)

  4) `Dropdown` ve `TabView` ADLARI KORUNDU: ikisi de PrimeVue 4'te
     deprecated alias (mount'ta konsola uyari basiyor) ama bu dosyada
     onlari hedefleyen CSS YOK, yani gorunur kirilma yok. Ozellikle
     TabView -> Tabs gecisi cocuk yapisinin tamamen degismesi demek
     (Tabs > TabList > Tab + TabPanels > TabPanel); tasima degil
     yeniden yazim olurdu.
-->
