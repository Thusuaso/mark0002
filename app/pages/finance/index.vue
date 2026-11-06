<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col">
          <Button
            type="button"
            severity="primary"
            class="w-100"
            label="Collection"
            @click="collection"
          />
        </div>
        <div class="col">
          <Button
            type="button"
            severity="secondary"
            class="w-100"
            label="Pre-Payment"
            @click="advancedPayment"
          />
        </div>
        <div class="col">
          <Button severity="warn" label="Excel" @click="excel_output" />
          <!-- <JsonExcel
            class="w-100"
            :data="financeStore.getfinanceList"
            :fields="financeListExcelFields"
            worksheet="Finance"
            name="finans.xls"
          >
            <Button
              type="button"
              severity="info"
              class="w-100"
              icon="pi pi-file-excel"
              label="Excel"
            />
          </JsonExcel> -->
        </div>
        <div class="col">
          <Button
            type="button"
            severity="warn"
            class="w-100"
            :label="buttonAllStatus ? 'Unpaid Po' : 'All'"
            @click="buttonAllStatus = !buttonAllStatus"
          />
        </div>
        <div class="col">
          <div class="field-checkbox">
            <Checkbox
              id="binary"
              v-model="mekmarMekmerList"
              :binary="true"
              @change="checkedMekmarMekmer($event)"
            />
            <label for="binary">{{ checked }}</label>
          </div>
        </div>
      </div>
    </div>

    <FinanceList
      :list="financeStore.getfinanceList"
      :total="financeStore.getFinanceListTotal"
      :expiry="financeStore.getFinanceExpiryList"
      :allStatus="buttonAllStatus"
      :allList="financeStore.getFinanceListAll"
      :maya="financeStore.getFinanceListMaya"
      :status="true"
      :expiryTotal="financeStore.getFinanceExpiryListTotal"
      @finance_list_selected_emit="financeListSelected($event)"
    />
    <FinancePurchaseList />

    <Dialog
      v-model:visible="finance_collection_list_form"
      header=""
      modal
      :maximizable="true"
    >
      <FinanceCollectionList
        :list="financeStore.getFinanceCollectionList"
        :years="financeStore.getFinanceCollectionYearList"
        :months="financeStore.getFinanceCollectionMonthList"
        :total="financeStore.getFinanceCollectionTotal"
        :sample="financeStore.getFinanceCollectionSampleList"
        :sampleTotal="financeStore.getFinanceCollectionSampleTotal"
      />
    </Dialog>

    <Dialog v-model:visible="finance_advanced_payment_form" header="" modal>
      <FinanceAdvancedPaymentForm
        :list="financeStore.getFinanceAdvancedPaymentList"
        :model="modelsStore.getFinancePaymentModel"
        @advanced_payment_save_emit="advancesPaymentSave($event)"
      />
    </Dialog>

    <Dialog v-model:visible="finance_po_list_form" header="" modal>
      <FinancePoList
        :poList="financeStore.getFinancePoList"
        :paidList="financeStore.getFinancePaidList"
        :poListTotal="financeStore.getFinancePoListTotal"
        :paidListTotal="financeStore.getFinancePaidListTotal"
        :loading="sharedStore.isLoading"
        :insurance="financeStore.getFinanceDetailInsuranceList"
        @po_list_selected_emit="poListSelected($event)"
        @po_paid_detail_list_selected_emit="poPaidDetailListSelected($event)"
      />
    </Dialog>

    <Dialog v-model:visible="finance_po_detail_form" header="" modal>
      <FinancePoForm
        :model="modelsStore.getFinancePoModel"
        :po="finance_po_list_detail"
        :poPaidList="financeStore.getFinancePoPaidList"
        @po_paid_process_emit="poPaidProcess($event)"
        @po_paid_delete_emit="poPaidDelete($event)"
      />
    </Dialog>

    <Dialog v-model:visible="finance_po_paid_detail_form" header="" modal>
      <FinancePaidList :list="financeStore.getFinancePoPaidDetailList" />
    </Dialog>
  </div>
</template>

<script>
import { toIsoDate } from "~/utils/dates"
import { useFinanceStore } from "~/stores/finance"
import { useModelsStore } from "~/stores/models"
import { useSharedStore } from "~/stores/shared"
import { useLogsStore } from "~/stores/logs"

export default {
  computed: {
    financeStore() {
      return useFinanceStore()
    },

    /*
     * MODELS STORE EKLENDI -- DORT CAGRI YANLIS STORE'A GIDIYORDU.
     *
     * setFinancePoModel, setFinancePaymentModel, getFinancePoModel ve
     * getFinancePaymentModel'in DORDU DE models store'unda tanimli
     * (app/stores/models.ts), finance store'unda DEGIL. Bu dosya
     * dordunu de `financeStore` uzerinden cagiriyordu.
     *
     * BELIRTI: "Finans > musteri satirina tiklayinca acilan listede PO
     * satirina tiklandiginda detay dialogu ACILMIYOR" --
     *     Uncaught TypeError: this.financeStore.setFinancePoModel
     *                         is not a function
     * poListSelected() ilk satirinda patliyordu, bu yuzden hemen
     * altindaki `this.finance_po_detail_form = true` HIC CALISMIYOR ve
     * dialog acilmiyordu. Hatanin kendisi konsolda kaliyordu, kullanici
     * yalnizca "tiklama bir sey yapmiyor" goruyordu.
     *
     * Iki GETTER sessizce bozuktu: finance store'da olmadiklari icin
     * `undefined` donuyorlardi, yani PO ve odeme formlarina `:model`
     * olarak undefined gidiyordu (hata atmadan, bos form).
     *
     * NOT: app/stores/finance.ts bunlari ZATEN dogru sekilde
     * `modelsStore.setFinancePoModel()` diye cagiriyor (satir 522, 655,
     * 756) -- yani yanlis olan yalnizca bu bileşendi.
     */
    modelsStore() {
      return useModelsStore()
    },
    sharedStore() {
      return useSharedStore()
    },
    logsStore() {
      return useLogsStore()
    },
  },
  data() {
    return {
      checked: "Mekmer",
      mekmarMekmerList: false,
      buttonAllStatus: false,
      finance_collection_list_form: false,
      finance_advanced_payment_form: false,
      finance_po_detail_form: false,
      finance_po_list_detail: {},
      finance_po_list_form: false,
      finance_po_paid_detail_form: false,
      customerId: 0,
      /*
       * Yalnizca yukaridaki YORUMLU <JsonExcel> blogu icin duruyor.
       * vue-json-excel pilota KURULMADI; excel artik excel sunucusundan
       * aliniyor (excel_output). Blok ve bu harita, pilotun diger
       * ekranlarindaki ayni kararla korundu
       * (reports/mekmar/{ayo,forwarding}.vue).
       */
      financeListExcelFields: {
        "Firma Adı": "FirmaAdi",
        "Toplam Sipariş": "TotalOrder",
        "Üretimdeki Siparişler": "ProductOrder",
        "Yüklenen Siparişler": "ForwardingOrder",
        Peşinat: "AdvancedPayment",
        Ödenen: "Paid",
        Bakiye: "BalancedProduction",
        "Bakiye (Üretim Hariç)": "Balanced",
      },
    }
  },
  /*
   * created() -> mounted(): created() SSR'da da calisir, icindeki async
   * is BEKLENMEZ ve liste BOS serialize edilir; hydration onu devralir,
   * created() bir daha calismadigi icin tablo bos kalir (bkz. commit
   * 2afc877e3). mounted() sunucuda hic calismaz.
   */
  mounted() {
    this.financeStore.setFinanceList()
  },

  methods: {
    checkedMekmarMekmer() {
      if (this.mekmarMekmerList) {
        this.checked = "Mekmar"
        this.financeStore.setFinanceListFilter()
      } else {
        this.checked = "Mekmer"
        this.financeStore.setFinanceList()
      }
    },
    /*
     * ARTIK EXCEL SUNUCUSUNDAN DEGIL, NITRO'DAN:
     *   eski: POST {excelServerBase}/finance/reports/test/excel  (uret)
     *       + GET  {excelServerBase}/finance/reports/test/excel  (indir)
     *   yeni: POST /excel-api/finance/test                       (tek istek)
     *         server/routes/excel-api/finance/test.post.ts
     *
     * IKI ISTEK TEK ISTEGE INDI; gerekcesi (paylasilan dosya / yaris
     * durumu ve hic kontrol edilmeyen `if (response.status)`)
     * app/composables/useExcelExport.ts icinde.
     *
     * Cikti BIREBIR DOGRULANDI: ayni 22 satir hem uretimdeki Python
     * ucuna hem bu uca gonderildi, iki dosya 24 satir x 8 sutun = 192
     * hucre uzerinden karsilastirildi (degerler ve sayi bicimleri,
     * `cellStyles: true` ile) -- 0 fark, sayfa adi da ayni.
     *
     * Dosya adi artik Content-Disposition'dan geliyor, elle verilmiyor.
     */
    async excel_output() {
      try {
        await exportExcel(
          "/excel-api/finance/test",
          this.financeStore.getfinanceList,
          "finans_test_list.xlsx",
        )
      } catch (err) {
        /*
         * Eski kodda .catch YOKTU ve zaten hata gorunmuyordu: indirme
         * ayri bir <a> tiklamasiyla oldugu icin uretim patlasa bile
         * kullanici bos/eski dosya aliyordu. Artik basarisizlik
         * gercekten gorunur.
         */
        console.error("finans excel ciktisi basarisiz:", err)
        useAppToast().error("Excel olusturulamadi.")
      }
    },
    poPaidDetailListSelected(event) {
      const data = {
        Tarih: toIsoDate(event.data.Tarih),
        MusteriID: this.customerId,
      }
      this.financeStore.setPoPaidDetailList(data)
      this.finance_po_paid_detail_form = true
    },
    /*
     * Uc log metninin paylastigi govde. Kaynakta save/update/delete
     * ucunde de AYNI nesne elle kuruluyordu; yalnizca fiil degisiyor.
     */
    __paidLog(event, verb) {
      this.logsStore.setLogs({
        description: `${useCookie("username").value}, ${event.SiparisNo}${verb}`,
        po: event.SiparisNo,
        color: "#ffec31",
      })
    },
    poPaidDelete(event) {
      if (confirm("Silme İşlemini Onaylıyor musunuz?")) {
        this.financeStore.setPoPaidDelete(event)
        this.__paidLog(
          event,
          ` na sahip $${event.Tutar} tutar, $${event.Masraf} masraf ve $${event.Kur} sildi.`
        )
      }
    },
    poPaidProcess(event) {
      if (this.financeStore.getFinancePoButtonStatus) {
        this.save(event)
      } else {
        this.update(event)
      }
    },
    save(event) {
      this.financeStore.setPoPaidSave(event)
      this.__paidLog(
        event,
        ` ya  $${event.Tutar} tutar, $${event.Masraf} masraf ve $${event.Kur} kur girişi yaptı.`
      )
    },
    update(event) {
      this.financeStore.setPoPaidUpdate(event)
      this.__paidLog(
        event,
        ` nın $${event.Tutar} tutar, $${event.Masraf} masraf ve $${event.Kur} kurunu değiştirdi.`
      )
    },
    poListSelected(event) {
      this.modelsStore.setFinancePoModel()
      this.finance_po_list_detail = event.data
      this.finance_po_detail_form = true
      this.financeStore.setFinancePoPaidList(event.data.SiparisNo)
    },
    financeListSelected(event) {
      this.customerId = event.data.customer_id
      this.financeStore.setFinancePoList(event.data.customer_id)
      this.finance_po_list_form = true
    },
    advancesPaymentSave(event) {
      this.financeStore.setAdvancedPaymentSave(event)
    },
    advancedPayment() {
      this.financeStore.setFinanceAdvancedPaymentList()
      this.modelsStore.setFinancePaymentModel()
      this.finance_advanced_payment_form = true
    },
    collection() {
      this.financeStore.setFinanceCollectionList()
      this.finance_collection_list_form = true
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

<style scoped>
@media screen and (max-width: 576px) {
  .row {
    clear: both;
    display: block;
    width: 100%;
  }
  .col {
    clear: both;
    display: block;
    width: 100%;
  }
}
</style>

<!--
  pages/finance/index.vue -> app/pages/finance/index.vue

  Bu sayfanin DOKUZ ozel bileşeninden ALTISI zaten tasinmisti
  (FinanceList, FinanceCollectionList, FinancePaidList,
  FinanceAdvancedPaymentForm, FinancePoForm, FinancePoList); bu commit
  kalan UCUNU ekliyor:
      lists/supplier.vue     -> finance/PurchaseList.vue
      forms/supplier.vue     -> finance/PurchaseDetailList.vue
      forms/supplierPaid.vue -> finance/PurchaseForm.vue
  yani sayfanin eksik parcasi "satin alma" (purchase) alt-ekraniydi.

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] created() -> mounted()  (yukaridaki nota bak)
  [x] middleware: ["authority"] -> definePageMeta
  [x] mapGetters(25 getter) -> finance / loading store'lari.
      Hangi getter hangi store'dan geliyor artik ACIK: `getLoading`
      loading store'undan, geri kalan her sey finance'ten.
      `getLocalUrl` mapGetters'dan KALKTI -- asagidaki excel notuna bak.

  [x] getLoading -> sharedStore.isLoading
      Vuex'teki `loading` MODULU pilotta YOK: yukleme durumu shared
      store'una SAYAC olarak tasinmis (loading++/--) ve getter adi da
      degismis, cunku artik boolean degil sayac okuyor
      (stores/shared.ts:151 -- "cagri yerleri isLoading kullanmali").
      `useLoadingStore` diye bir store OLMADIGI icin eski adla birebir
      tasima derlemeyi dusururdu.
  [x] this.$store.dispatch(...) -> financeStore.<action>()
  [x] this.$logs.save -> useLogsStore().setLogs
  [x] this.$cookie.get("username") -> useCookie("username").value
      (DIKKAT: kaynakta `$cookie` -- `$cookies` DEGIL; iki ayri eklenti
       vardi, bu sayfa tekil olani kullaniyordu.)
  [x] :visible + @update:visible -> v-model:visible   (BES Dialog)
  [x] p-button-primary/secondary/warning -> :severity
      ("warning" severity'sinin v4'teki adi "warn" -- iki buton)
  [x] <financeList>/<financePurchaseList>/<financeCollectionList>/
      <financeAdvancedPaymentForm>/<financePoList>/<financePoForm>
         -> PascalCase (otomatik ice alma). Nuxt 2'de hepsi
      plugins/components.js'te ELLE global kaydediliyordu
      (satir 318-323 ve 155-157). <FinancePaidList> zaten PascalCase'di.
  [x] import date from "../../plugins/date" -> { toIsoDate }
      ACIK IMPORT ZORUNLU: `Tarih` degeri setPoPaidDetailList ile
      API'ye GIDIYOR ("2026-10-02"), ciplak `dateToString` ise
      auto-import tarafinda utils/formatters.js'e ("02-10-2026", GOSTERIM)
      cozuluyor. Ayrinti offer/Form.vue'nun alt notunda.

  == EXCEL CIKISI: EXCEL SUNUCUSU -> NITRO (tek istek) ==

  Nuxt 2 kaynagi:
      this.$excelApi.post("/finance/reports/test/excel", list).then(res => {
        if (res.status) {
          const link = document.createElement("a")
          link.href = this.getLocalUrl + "finance/reports/test/excel"
          link.setAttribute("download", "finans_test_list.xlsx")
          document.body.appendChild(link)
          link.click()
        }
      })

  Ara adim (bu dosyanin onceki surumu) useExcelApi() +
  downloadFromExcelServer() idi -- hala Python'daki excel sunucusuna
  gidiyordu ve IKI ISTEK atiyordu (once "uret", sonra "indir").

  SIMDI: exportExcel("/excel-api/finance/test", list, ad)
         -> server/routes/excel-api/finance/test.post.ts

  Neden tek istege indi (paylasilan dosya / yaris durumu ve hicbir sey
  kontrol etmeyen `if (res.status)`): app/composables/useExcelExport.ts
  ve server/utils/xlsx-response.ts.

  `if (res.status)` DUSTU: o kosul HTTP durumunu (daima 200) okuyordu,
  sunucunun govdede dondurdugu {"status": false}'u DEGIL -- yani uretim
  patlasa bile indirme tetikleniyordu. Artik basarisizlik try/catch'e
  dusuyor ve kullaniciya toast ile bildiriliyor.

  Cikti DOGRULANDI: ayni 22 satir hem uretimdeki Python ucuna hem yeni
  Nitro ucuna gonderildi; iki dosya 192 hucre uzerinden (deger, sayi
  bicimi, hucre stili) ve sutun genisligi bazinda karsilastirildi --
  0 fark.

  == KALDIRILAN OLU KOD ==
  [x] poPaidDetailListSelected() icindeki
          console.log("poPaidDetailListSelected", event)
      Birakilmis hata ayiklama satiri.
  [x] checkedMekmarMekmer(event) parametresi KALDIRILDI -- govdede hic
      kullanilmiyordu (karar `this.mekmarMekmerList` uzerinden
      veriliyor). Sablondaki `@change="checkedMekmarMekmer($event)"`
      cagrisi kaynaktaki gibi BIRAKILDI.

  == TEKRAR AZALTMA ==
  save/update/poPaidDelete ucu de AYNI log nesnesini elle kuruyordu
  (ayni po, ayni renk, ayni kullanici adi; yalnizca fiil cumlesi
  farkli) -> __paidLog(event, verb). Log METINLERI birebir korundu,
  kaynaktaki tuhaf bosluklar dahil (" na sahip", " ya  $" -- ikinci
  kelimede CIFT bosluk vardi).

  == KORUNAN DAVRANISLAR (bilincli) ==

  1) YORUMLU <JsonExcel> BLOGU ve `financeListExcelFields` KORUNDU.
     vue-json-excel pilota kurulmadi; blok kaynakta da yorumdaydi.
     Pilotun diger ekranlarinda ayni karar verilmis
     (reports/mekmar/ayo.vue ve forwarding.vue ikisini de yorumda
     tutuyor ve alan haritasini data()'da birakiyor).
     Blok icindeki `getfinanceList` ve `p-button-info` da pilot
     yazimina cevrildi ki blok ileride acilirsa calisir halde olsun.

  2) `getfinanceList` -- KUCUK HARFLI "f". Yazim hatasi gibi duruyor
     (kardesleri getFinanceListTotal, getFinanceListAll) ama store
     getter'inin GERCEK adi bu (stores/finance.ts). Degistirmek store'u
     ve diger cagri yerlerini de degistirmek olurdu.

  3) `:status="true"` FinanceList'e SABIT true geciyor; sayfada bu
     degeri degistiren hicbir sey yok. Kaynakta da sabitti.

  4) Checkbox etiketi `{{ checked }}` ile MEVCUT secimin adini
     gosteriyor: kutu isaretsizken "Mekmer", isaretliyken "Mekmar".
     Ilk bakista ters gibi duruyor ama tutarli -- etiket, hangi listenin
     GOSTERILDIGINI soyluyor. Dokunulmadi.
-->
