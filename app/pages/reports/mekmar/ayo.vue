<template>
  <div>
    <div class="row container">
      <div class="col">
        <Select
          v-model="selectedYear"
          :options="reportsStore.getReportsMekmarAyoYearList"
          optionLabel="Yil"
          class="w-100"
          @change="yearSelected($event)"
          :disabled="date_disabled"
        />
      </div>
      <div class="col">
        <Select
          v-model="selectedMonth"
          :options="reportsStore.getReportsMekmarAyoMonthList"
          optionLabel="Ay"
          class="w-100"
          @change="monthSelected($event)"
          :disabled="date_disabled"
        />
      </div>
      <div class="col">
        <!-- <JsonExcel
          :data="reportsStore.getReportsMekmarAyoList"
          :fields="reportsMekmarAyoListExcelField"
          worksheet="Ayo"
          name="ayo.xls"
          :stringifyLongNum="true"
          escapeCsv
          type="csv"
        >
          <Button
            type="button"
            severity="info" class="w-100"
            icon="pi pi-file-excel"
            label="Excel"
          />
        </JsonExcel> -->

        <!-- <vue-excel-xlsx
          :data="reportsStore.getReportsMekmarAyoList"
          :columns="reportsMekmarAyoListExcelField2"
          :file-name="'Ayo'"
          :file-type="'xlsx'"
          :sheet-name="'sheetname'"
          style="border: none; background-color: white; width: 100%"
        >
          <Button
            type="button"
            severity="info" class="w-100"
            icon="pi pi-file-excel"
            label="Excel"
          />
        </vue-excel-xlsx> -->
        <Button
          type="button"
          severity="info" class="w-100"
          icon="pi pi-file-excel"
          label="Excel"
          @click="excel_output"
        />
      </div>
      <div class="col">
        <span>
          <Checkbox
            v-model="checked"
            :binary="true"
            @change="allAyoList($event)"
          />
        </span>
        <span style="padding-top: 25px"> Hepsi </span>
      </div>
      <div class="col">
        <table class="table caption-top">
          <caption style="font-weight: bold">
            <b>Turnover (Cari)</b>
          </caption>
          <tbody>
            <tr>
              <th scope="row">Total</th>
              <td>
                {{ formatPriceUsd(reportsStore.getReportsMekmarAyoListTotal.proforma) }}
              </td>
              <td>{{ formatPriceTl(profitProformaTl) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col">
        <table class="table caption-top">
          <caption style="font-weight: bold">
            <b>Profit</b>
          </caption>

          <tbody>
            <tr>
              <th scope="row">Total</th>
              <td>
                {{ formatPriceUsd(reportsStore.getReportsMekmarAyoListTotal.profitUsd) }}
              </td>
              <td>
                {{ formatPriceTl(reportsStore.getReportsMekmarAyoListTotal.profitTl) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col">
        <table class="table caption-top">
          <caption style="font-weight: bold">
            <b>Real Profit</b>
          </caption>

          <tbody>
            <tr>
              <th scope="row">Total</th>
              <td>
                {{ formatPriceUsd((reportsStore.getReportsMekmarAyoListTotal.profitUsd - cost_usd)) }}
              </td>
              <td>
                {{ formatPriceTl((reportsStore.getReportsMekmarAyoListTotal.profitTl - cost_tl)) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="container row">
      <div class="col">
        <Select
          class="w-100"
          v-model="selectedQuarter"
          :options="quarters"
          optionLabel="quarter"
          placeholder="Select a Quarter"
          @change="quarterSelected($event)"
        />
      </div>
      <div class="col">
        <Select
          class="w-100"
          v-model="selectedHalfMonths"
          :options="halfmonths"
          optionLabel="month"
          placeholder="Select a Month"
          @change="halfMonthsSelected($event)"
        />
      </div>
      <div class="col">
        <Button
          type="button"
          severity="warn" class="w-100"
          label="Credit Card"
          @click="creditCardToggle"
        />
        <Dialog
          v-model:visible="credit_card_form_visible"
          header="Credit Card Cost"
          modal
        >
          <ReportsMekmarAyoCreditCardForm
            style="margin-bottom: 5px"
            v-for="item in creditCardCostList"
            :key="item"
            :month="item.month"
            :value="item.value"
            :month_id="item.month_id"
            :currency="item.currency"
            :year="selectedYear.Yil"
            :usd="item.usd"
            :id="item.id"
            @credit_card_cost_list_updated_emit="creditCardCostListUpdated"
            @cost_save_emit="creditCardCostSave($event)"
            @cost_update_emit="creditCardCostUpdate($event)"
          />
        </Dialog>
      </div>
      <div class="col">
        <Button
          type="button"
          severity="info" class="w-100"
          label="Travel Cost"
          @click="travelCost"
        />
        <Dialog
          v-model:visible="travel_cost_form_visible"
          header="Travel Cost"
          modal
        >
          <ReportsMekmarAyoCreditCardForm
            style="margin-bottom: 5px"
            v-for="item in travelCostList"
            :key="item"
            :month="item.month"
            :value="item.value"
            :month_id="item.month_id"
            :currency="item.currency"
            :year="selectedYear.Yil"
            :usd="item.usd"
            :id="item.id"
            @credit_card_cost_list_updated_emit="travelCostListUpdated"
            @cost_save_emit="travelCostSave($event)"
            @cost_update_emit="travelCostUpdate($event)"
          />
        </Dialog>
      </div>
      <div class="col">
        <Button
          type="button"
          severity="secondary" class="w-100"
          label="Wage Cost"
          @click="wageCost"
        />
        <Dialog v-model:visible="wage_cost_form_visible" header="Wage Cost" modal>
          <ReportsMekmarAyoCreditCardForm
            style="margin-bottom: 5px"
            v-for="item in wageCostList"
            :key="item"
            :month="item.month"
            :value="item.value"
            :month_id="item.month_id"
            :currency="item.currency"
            :year="selectedYear.Yil"
            :usd="item.usd"
            :id="item.id"
            @credit_card_cost_list_updated_emit="wageCostListUpdated"
            @cost_save_emit="wageCostSave($event)"
            @cost_update_emit="wageCostUpdate($event)"
          />
        </Dialog>
      </div>
      <!-- <div class="col">
        <Button type="button" severity="danger" class="w-100" label="Abroad Cost" @click="abroadCost"/>
        <Dialog v-model:visible="abroad_cost_form_visible" header="Abroad Cost" modal >
          <ReportsMekmarAyoCreditCardForm style="margin-bottom:5px;" v-for="item in abroadCostList" :key="item" :month="item.month" :value="item.value"
          :month_id="item.month_id" :currency="item.currency" :year="selectedYear.Yil" :usd="item.usd" :id="item.id"
          @credit_card_cost_list_updated_emit="abroadCostListUpdated"
          @cost_save_emit="abroadCostSave($event)"
          @cost_update_emit="abroadCostUpdate($event)"
          />

        </Dialog>
      </div> -->
      <div class="col">
        <Button
          type="button"
          severity="help" class="w-100"
          label="Sample Cost"
          @click="sampleCost"
        />
        <Dialog
          v-model:visible="sample_cost_form_visible"
          header="Sample Cost"
          modal
        >
          <ReportsMekmarAyoCreditCardForm
            style="margin-bottom: 5px"
            v-for="item in sampleCostList"
            :key="item"
            :month="item.month"
            :value="item.value"
            :month_id="item.month_id"
            :currency="item.currency"
            :year="selectedYear.Yil"
            :usd="item.usd"
            :id="item.id"
            @credit_card_cost_list_updated_emit="sampleCostListUpdated"
            @cost_save_emit="sampleCostSave($event)"
            @cost_update_emit="sampleCostUpdate($event)"
          />
        </Dialog>
      </div>
      <div class="col">
        <Button
          type="button"
          severity="success" class="w-100"
          label="Fuil Cost"
          @click="otherCost"
        />

        <Dialog
          v-model:visible="other_cost_form_visible"
          header="Fuil Cost"
          modal
        >
          <ReportsMekmarAyoCreditCardForm
            style="margin-bottom: 5px"
            v-for="item in otherCostList"
            :key="item"
            :month="item.month"
            :value="item.value"
            :month_id="item.month_id"
            :currency="item.currency"
            :year="selectedYear.Yil"
            :usd="item.usd"
            :id="item.id"
            @credit_card_cost_list_updated_emit="otherCostListUpdated"
            @cost_save_emit="otherCostSave($event)"
            @cost_update_emit="otherCostUpdate($event)"
          />
        </Dialog>
      </div>

      <div class="col">
        <Button
          type="button"
          class="p-button w-100"
          label="Meal Cost"
          @click="mekmerCost"
          style="background-color: blueviolet; color: white"
        />

        <Dialog
          v-model:visible="mekmer_cost_form_visible"
          header="Meal Cost"
          modal
        >
          <ReportsMekmarAyoCreditCardForm
            style="margin-bottom: 5px"
            v-for="item in mekmerCostList"
            :key="item"
            :month="item.month"
            :value="item.value"
            :month_id="item.month_id"
            :currency="item.currency"
            :year="selectedYear.Yil"
            :usd="item.usd"
            :id="item.id"
            @credit_card_cost_list_updated_emit="mekmerCostListUpdated"
            @cost_save_emit="mekmerCostSave($event)"
            @cost_update_emit="mekmerCostUpdate($event)"
          />
        </Dialog>
      </div>

      <div class="col">
        <Button label="Currency" severity="danger" @click="currency" />
        <Dialog v-model:visible="currency_form_visible" modal>
          <ReportsMekmarAyoFormCurrency
            v-for="cur in currency_list"
            :key="cur"
            :month="cur.month"
            :id="cur.id"
            :month_id="cur.month_id"
            :currency="cur.currency"
            @cost_save_emit="saveCurrency($event)"
            @cost_update_emit="updateCurrency($event)"
            :year="selectedYear.Yil"
          />
        </Dialog>
      </div>

      <div class="col">
        <Button
          icon="pi pi-file-excel"
          @click="cost_excel"
          class="p-button-raised p-button-rounded"
          style="font-size: 2rem"
        />
      </div>
    </div>

    <ReportsMekmarAyoList
      :list="reportsStore.getReportsMekmarAyoList"
      :total="reportsStore.getReportsMekmarAyoListTotal"
      @mekmar_ayo_selected_emit="mekmarAyoSelected($event)"
    />

    <Dialog
      v-model:visible="mekmar_ayo_detail_dialog"
      :header="detail_header"
      modal
    >
      <DataTable :value="orderStore.getOrderProductionDocumentList">
        <Column field="Tarih" header="Upload Date">
          <template #body="slotProps">
            {{ dateToString(slotProps.data.Tarih) }}
          </template>
        </Column>
        <Column field="Evrak" header="Document Name"></Column>
        <Column field="Link" header="Link">
          <template #body="slotProps">
            <a :href="slotProps.data.Link">
              <i class="pi pi-download"></i>
            </a>
          </template>
        </Column>
        <Column field="kullanici" header="Document Rep"> </Column>
      </DataTable>
    </Dialog>
  </div>
</template>
<script>
import { useOrderStore } from "~/stores/order"
import { useSharedStore } from "~/stores/shared"
import { useReportsStore } from "~/stores/reports"

/*
 * [x] `import currency from "../../../plugins/currency"` KALDIRILDI.
 *
 * OLU IMPORT'TU: sablondaki `@click="currency"` (satir 339) bu modulu
 * DEGIL, asagidaki `currency()` METODUNU cagiriyor -- Options API
 * sablonlari isimleri bilesen ornegi uzerinden cozer, modul
 * kapsamindan degil. Modulun kendisi dosyada hicbir yerde
 * kullanilmiyordu (`currency.getDateCurrency(...)` cagrisi yok).
 *
 * Ama bedeli vardi: o dosya `axios` ve `xml2js`'i (dolayisiyla `sax`)
 * ISTEMCI paketine sokuyordu. Derlemedeki
 *     Module "timers"/"stream" has been externalized for browser
 *     compatibility ... imported by xml2js/sax
 * uyarilarinin ve
 *     plugins/currency.js: Duplicate key "Content-Type"
 * uyarisinin kaynagi buydu.
 *
 * DOSYANIN KENDISI SILINMEDI -- api/index.js:4205 onu GERCEKTEN
 * kullaniyor (currency.getDateCurrency). Orasi SUNUCU tarafi, yani
 * axios/xml2js sorun degil ve TCMB'ye dogrudan istek atmak CORS'a
 * takilmaz (CORS yalnizca tarayici kisitlamasidir).
 *
 * Kaldirilan sey yalnizca BU SAYFADAKI olu import; boylece ayni modul
 * sunucuda calismaya devam ederken tarayici paketine girmiyor.
 *
 * NOT: istemcide kur okumanin dogru yolu bu modul degil,
 * app/composables/useTcmb.ts + server/routes/tcmb-api/... proxy'si --
 * tarayici TCMB'ye dogrudan gidemez.
 */
export default {
  /*
   * [x] middleware: ["authority"] BURADAN KALDIRILDI -> definePageMeta
   * (asagidaki <script setup> blogunda). Options API'deki middleware
   * anahtari Nuxt 3+'ta YOK SAYILIR: hata vermez, kisitlama sessizce
   * kalkar. Bu sayfada oyle olmustu.
   */
  computed: {
    orderStore() {
      return useOrderStore()
    },
    reportsStore() {
      return useReportsStore()
    },
    sharedStore() {
      return useSharedStore()
    },
  },
  data() {
    return {
      profitProformaTl: 0,
      detail_header: "",
      mekmar_ayo_detail_dialog: false,
      mekmer_cost_form_visible: false,
      mekmerCostList: [],

      currency_list: [],
      currency_form_visible: false,
      cost_tl: 0,
      cost_usd: 0,
      other_cost_form_visible: false,
      otherCostList: [],
      sampleCostList: [],
      sample_cost_form_visible: false,
      abroadCostList: [],
      abroad_cost_form_visible: false,
      wage_cost_form_visible: false,
      wageCostList: [],
      travelCostList: [],
      travel_cost_form_visible: false,
      creditCardCostList: [],
      credit_card_form_visible: false,
      selectedHalfMonths: null,
      halfmonths: [
        { month: "This Month", id: 2 },
        { month: "First 6 Months", id: 0 },
        { month: "Last 6 Months", id: 1 },
      ],
      quarters: [
        { quarter: "This Month", id: 0 },

        { quarter: "Q1", id: 1 },
        { quarter: "Q2", id: 2 },
        { quarter: "Q3", id: 3 },
        { quarter: "Q4", id: 4 },
      ],
      selectedQuarter: null,
      checked: false,
      selectedYear: null,
      selectedMonth: null,
      reportsMekmarAyoListExcelField: {
        Temsilci: "SiparisSahibi",
        Operasyon: "Operasyon",
        "Firma Adi": "FirmaAdi",
        "Siparis No": "SiparisNo",
        "Fatura Adi": "FaturaAdi",
        "Siparis Tarihi": "SiparisTarihi",
        "Yukleme Tarihi": "YuklemeTarihi",
        "Ulke Adi": "UlkeAdi",
        "Teslim Tur": "TeslimTur",
        Proforma: "Proforma",
        "Mekmer Satis": "MekmerSatis",
        "Mekmoz Satis": "MekmozSatis",
        "Dis Satis": "DisSatis",
        Nakliye: "Nakliye",
        Gumruk: "Gumruk",
        Ilaclama: "Ilaclama",
        Liman: "Liman",
        "Sigorta Alış": "SigortaAlis",
        "Sigorta Satış": "SigortaSatis",
        "Navlun Alış": "NavlunAlis",
        Lashing: "Lashing",
        Booking: "Booking",
        Spanzlet: "Spanzlet",
        "Detay Alış 1": "DetayAlis1",
        "Detay Alış 2": "DetayAlis2",
        "Detay Alış 3": "DetayAlis3",
        Mekus: "Mekus",
        "Özel İşçilik": "OzelIscilik",
        "Banka Masraf": "BankaMasraf",
        Kurye: "Kurye",
        "Masraf Toplam": "MasrafToplam",
        "Profit Usd": "ProfitUsd",
        "Profit Tl": "ProfitTl",
      },
      reportsMekmarAyoListExcelField2: [
        { label: "Temsilci", field: "siparisci" },
        { label: "Operasyon", field: "operasyon" },
        { label: "Firma Adi", field: "musteri_adi" },
        { label: "Siparis No", field: "siparis_no" },
        { label: "Fatura Adi", field: "faturatur" },
        { label: "Siparis Tarihi", field: "siparis_tarihi" },
        { label: "Yukleme Tarihi", field: "yukleme_tarihi" },
        { label: "Ulke Adi", field: "ulke_adi" },
        { label: "Teslim Tur", field: "teslim_sekli" },
        {
          label: "Proforma",
          field: "toplam_bedel",
          dataFormat: this.formatDecimal,
        },
        {
          label: "Mekmer Satis",
          field: "mekmar_alim",
          dataFormat: this.formatDecimal,
        },
        {
          label: "Mekmoz Satis",
          field: "mekmoz_alim",
          dataFormat: this.formatDecimal,
        },
        {
          label: "Dis Satis",
          field: "dis_alim",
          dataFormat: this.formatDecimal,
        },
        { label: "Nakliye", field: "nakliye", dataFormat: this.formatDecimal },
        { label: "Gumruk", field: "gumruk", dataFormat: this.formatDecimal },
        {
          label: "Ilaclama",
          field: "ilaclama",
          dataFormat: this.formatDecimal,
        },
        { label: "Liman", field: "liman", dataFormat: this.formatDecimal },
        {
          label: "Sigorta Alış",
          field: "sigorta",
          dataFormat: this.formatDecimal,
        },
        {
          label: "Sigorta Satış",
          field: "sigorta_tutar_satis",
          dataFormat: this.formatDecimal,
        },
        {
          label: "Navlun Alış",
          field: "navlun",
          dataFormat: this.formatDecimal,
        },
        { label: "Lashing", field: "lashing", dataFormat: this.formatDecimal },
        { label: "Booking", field: "booking", dataFormat: this.formatDecimal },
        { label: "Spanzlet", field: "spazlet", dataFormat: this.formatDecimal },
        {
          label: "Detay Alış 1",
          field: "detay_1",
          dataFormat: this.formatDecimal,
        },
        {
          label: "Detay Alış 2",
          field: "detay_2",
          dataFormat: this.formatDecimal,
        },
        {
          label: "Detay Alış 3",
          field: "detay_3",
          dataFormat: this.formatDecimal,
        },
        {
          label: "Mekus",
          field: "mekus_masraf",
          dataFormat: this.formatDecimal,
        },
        {
          label: "Özel İşçilik",
          field: "ozel_iscilik",
          dataFormat: this.formatDecimal,
        },
        {
          label: "Banka Masraf",
          field: "banka_masrafi",
          dataFormat: this.formatDecimal,
        },
        {
          label: "Kurye",
          field: "kurye_masrafi",
          dataFormat: this.formatDecimal,
        },
        {
          label: "Masraf Toplam",
          field: "masraf_toplam",
          dataFormat: this.formatDecimal,
        },
        {
          label: "Profit Usd",
          field: "kar_zarar",
          dataFormat: this.formatDecimal,
        },
        {
          label: "Profit Tl",
          field: "kar_zarar_tl",
          dataFormat: this.formatDecimal,
        },
      ],

      json_meta: [
        {
          key: "charset",
          value: "utf-8",
        },
      ],
      date_disabled: false,
    };
  },
  /*
   * created() -> mounted(): created() SSR'da da calisir, icindeki async
   * is BEKLENMEZ ve liste BOS serialize edilir; hydration onu devralir,
   * created() bir daha calismadigi icin tablo bos kalir (bkz. commit
   * 2afc877e3). mounted() sunucuda hic calismaz.
   */
  mounted() {
    this.reportsStore.setReportsMekmarAyoYearList();

    const date = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
    };

    this.fetchMonthCost(date.year, date.month)
      .then((response) => {
        this.reportsStore.MUT_setReportsMekmarAyoList(response.data);
        this.reportsStore.MUT_setReportsMekmarAyoListTotal(response.data);
        this.__getMonthlyCostList(date.year, date.month);
        this.sharedStore.endLoading();
      });
  },
  methods: {
    /**
     * Yil secili mi?
     *
     * Bu sayfadaki sekiz maliyet dialogu da adresini
     * `this.selectedYear.Yil` uzerinden kuruyor. selectedYear null
     * oldugunda eski kod TypeError atiyor, metot o satirda kesiliyor
     * ve `..._form_visible = true` satirina HIC gelinmiyordu: dialog
     * acilmiyor, kullaniciya da hicbir sey soylenmiyordu.
     *
     * selectedYear normalde yil listesi geldiginde izleyici tarafindan
     * doluyor (yukarida), ama iki durumda null kalabiliyor:
     *   - liste HENUZ gelmemisken kullanici butona basarsa,
     *   - yil listesi BOS donerse.
     *
     * Artik sessiz patlamak yerine sebebi soyluyor.
     */
    requireYear() {
      if (this.selectedYear?.Yil) return true;

      useAppToast().warn("Please select a year first.");
      return false;
    },
    /*
     * YILLIK maliyet listesi. Artik EXCEL SUNUCUSUNDAN DEGIL, Nitro'dan:
     * server/routes/maliyet-api/yillik/[year].get.ts
     * (Python tarafindan kurtulma planinin 2. adimi.)
     *
     * NEDEN KOPRU METOT: bu uc sayfada SEKIZ yerden cagriliyor ve her
     * cagrinin .then govdesi farkli (filtreleme, yari yil, ceyrek...).
     * Govdeler `response.data` bekliyor; hepsini tek tek degistirmek
     * sekiz ayri risk demekti. Burada yalnizca CAGRI degisti,
     * govdelere HIC dokunulmadi -- {data} sarmalayicisi o sozlesmeyi
     * koruyor.
     *
     * AYLIK uc de artik Nitro'da (fetchMonthCost, hemen asagida).
     *
     * [x] HATA ARTIK YUTULMUYOR: eski kodda .catch() yoktu; istek
     *     patlarsa sayfa sessizce bos/eski veriyle kaliyordu ve
     *     yukleme gostergesi -- shared store'da SAYAC -- bir
     *     eksilmemis kaliyordu. Hata halinde bos liste donuyor, yani
     *     cagri govdeleri calisip endLoading()'i yine cagiriyor.
     */
    fetchYearCost(year) {
      return $fetch(`/maliyet-api/yillik/${year}`, { baseURL: "/" })
        .then((data) => ({ data }))
        .catch((err) => {
          console.error("yillik maliyet listesi alinamadi:", err)
          useAppToast().error("Maliyet listesi alınamadı.")
          return { data: [] }
        })
    },

    /*
     * AYLIK maliyet listesi. Artik EXCEL SUNUCUSUNDAN DEGIL, Nitro'dan:
     * server/routes/maliyet-api/aylik/[year]/[month].get.ts
     *
     * Bu, Python Excel sunucusuna VERI OKUMA tarafinda kalan SON
     * bagimlilikti; bundan sonra o sunucuya yalnizca Excel URETIMI icin
     * gidiliyor.
     *
     * fetchYearCost ile AYNI KOPRU KALIBI: bu sayfada alti ayri yerden
     * cagriliyor ve her cagrinin .then govdesi farkli (ceyrek, yil
     * secimi, ay secimi, izleyici...). Govdeler `response.data`
     * bekliyor; {data} sarmalayicisi o sozlesmeyi koruyor, yani
     * yalnizca CAGRI degisti, govdelere HIC dokunulmadi.
     *
     * Hata halinde bos liste donuyor ki cagri govdeleri calisip
     * endLoading()'i yine cagirsin -- aksi halde yukleme gostergesi
     * (shared store'da SAYAC) bir eksilmemis kalirdi.
     */
    fetchMonthCost(year, month) {
      return $fetch(`/maliyet-api/aylik/${year}/${month}`, { baseURL: "/" })
        .then((data) => ({ data }))
        .catch((err) => {
          console.error("aylik maliyet listesi alinamadi:", err)
          useAppToast().error("Maliyet listesi alınamadı.")
          return { data: [] }
        })
    },

    reloadCurrency() {},
    mekmarAyoSelected(event) {
      this.orderStore.setOrderProductionDocumentList(event.siparis_no);
      this.detail_header = event.siparis_no;
      this.mekmar_ayo_detail_dialog = true;
    },

    /* */
    mekmerCost() {
      /* Yil yoksa dialogu acmayi DENEME -- gerekcesi requireYear(). */
      if (!this.requireYear()) return;

      useLegacyApi()
        .get(`/reports/ayo/mekmer/cost/list/${this.selectedYear.Yil}`)
        .then((res) => {
          this.mekmerCostList = res.data.list;
          this.mekmer_cost_form_visible = true;
        });
    },
    mekmerCostListUpdated() {
      useLegacyApi()
        .get(`/reports/ayo/mekmer/cost/list/${this.selectedYear.Yil}`)
        .then((res) => {
          this.mekmerCostList = res.data.list;
        });
    },
    mekmerCostUpdate(event) {
      useLegacyApi().put("/reports/ayo/mekmer/cost/update", event).then((res) => {
        useAppToast().success("Başarıyla Güncellendi.");
      });
    },
    mekmerCostSave(event) {
      useLegacyApi().post("/reports/ayo/mekmer/cost/save", event).then((res) => {
        useAppToast().success("Başarıyla Kaydedildi.");
        this.mekmerCostListUpdated();
      });
    },

    /* */

    cost_excel() {
      useLegacyApi()
        .get(`/reports/ayo/other/cost/list/${this.selectedYear.Yil}`)
        .then((other) => {
          useLegacyApi()
            .get(`/reports/ayo/sample/cost/list/${this.selectedYear.Yil}`)
            .then((sample) => {
              useLegacyApi()
                .get(`/reports/ayo/wage/cost/list/${this.selectedYear.Yil}`)
                .then((wage) => {
                  useLegacyApi()
                    .get(
                      `/reports/ayo/travel/cost/list/${this.selectedYear.Yil}`
                    )
                    .then((travel) => {
                      useLegacyApi()
                        .get(
                          `/reports/ayo/credit/card/cost/list/${this.selectedYear.Yil}`
                        )
                        .then((credit) => {
                          useLegacyApi()
                            .get(
                              `/reports/ayo/mekmer/cost/list/${this.selectedYear.Yil}`
                            )
                            .then((meal) => {
                              const data = {
                                other: other.data.list,
                                sample: sample.data.list,
                                wage: wage.data.list,
                                travel: travel.data.list,
                                credit: credit.data.list,
                                meal: meal.data.list,
                              };

                              /*
                               * ARTIK EXCEL SUNUCUSUNDAN DEGIL, NITRO'DAN:
                               *   eski: POST + GET
                               *         {excelServerBase}/reports/mekmar/ayo/cost/excel
                               *   yeni: POST /excel-api/reports/ayo-cost  (tek istek)
                               *         server/routes/excel-api/reports/ayo-cost.post.ts
                               *
                               * Cikti uretimdekiyle KARSILASTIRILDI: sablonun
                               * ALTI sayfasinin (creditcard, travel, wage,
                               * sample, fuil, meal) hepsinde deger, sayi
                               * bicimi ve hucre stili farki 0.
                               *
                               * Elle <a> kurmak da dustu: adres tek yerden
                               * geliyor ve olusturulan <a> DOM'dan
                               * kaldiriliyor (eski kod kaldirmiyordu).
                               *
                               * `if (response.status)` DUSTU -- HTTP durumunu
                               * (daima 200) okuyordu, govdedeki
                               * {"status": false}'u DEGIL.
                               */
                              exportExcel(
                                "/excel-api/reports/ayo-cost",
                                data,
                                "ayo_cost_excel.xlsx"
                              ).catch((err) => {
                                console.error(
                                  "ayo maliyet excel ciktisi basarisiz:",
                                  err
                                );
                                useAppToast().error("Excel olusturulamadi.");
                              });
                            });
                        });
                    });
                });
            });
        });
    },
    updatedCurrencyList() {
      useLegacyApi()
        .get(`/reports/ayo/currency/list/${this.selectedYear.Yil}`)
        .then((res) => {
          this.currency_list = res.data.list;
        });
    },
    updateCurrency(event) {
      useLegacyApi().put("/reports/ayo/currency/update", event).then((res) => {
        useAppToast().success("Başarıyla Güncellendi.");
      });
    },
    saveCurrency(event) {
      useLegacyApi().post("/reports/ayo/currency/save", event).then((res) => {
        this.updatedCurrencyList();
        useAppToast().success("Başarıyla Kaydedildi.");
      });
    },
    currency() {
      /* Yil yoksa dialogu acmayi DENEME -- gerekcesi requireYear(). */
      if (!this.requireYear()) return;

      useLegacyApi()
        .get(`/reports/ayo/currency/list/${this.selectedYear.Yil}`)
        .then((res) => {
          this.currency_list = res.data.list;
          this.currency_form_visible = true;
        });
    },
    __getHalfCostList(month_1, month_2, year) {
      useLegacyApi()
        .get(`/reports/ayo/costs/half/${month_1}/${month_2}/${year}`)
        .then((res) => {
          this.cost_tl = res.data.tl;
          this.cost_usd = res.data.usd;
        });
    },
    __getQuarterCostList(quarter_1, quarter_2, year) {
      useLegacyApi()
        .get(`/reports/ayo/costs/quarter/${quarter_1}/${quarter_2}/${year}`)
        .then((res) => {
          this.cost_tl = res.data.tl;
          this.cost_usd = res.data.usd;
        });
    },
    __getMonthlyCostList(year, month) {
      useLegacyApi()
        .get(`/reports/ayo/costs/list/${year}/${month}`)
        .then((res) => {
          this.cost_tl = res.data.tl;
          this.cost_usd = res.data.usd;
        });
    },
    __getYearlyCostList(year) {
      useLegacyApi().get(`/reports/ayo/costs/yearly/${year}`).then((res) => {
        this.cost_tl = res.data.tl;
        this.cost_usd = res.data.usd;
      });
    },

    otherCostListUpdated() {
      useLegacyApi()
        .get(`/reports/ayo/other/cost/list/${this.selectedYear.Yil}`)
        .then((res) => {
          this.otherCostList = res.data.list;
        });
    },
    otherCostUpdate(event) {
      useLegacyApi().put("/reports/ayo/other/cost/update", event).then((res) => {
        useAppToast().success("Başarıyla Güncellendi.");
      });
    },
    otherCostSave(event) {
      useLegacyApi().post("/reports/ayo/other/cost/save", event).then((res) => {
        useAppToast().success("Başarıyla Kaydedildi.");
        this.otherCostListUpdated();
      });
    },
    otherCost() {
      /* Yil yoksa dialogu acmayi DENEME -- gerekcesi requireYear(). */
      if (!this.requireYear()) return;

      useLegacyApi()
        .get(`/reports/ayo/other/cost/list/${this.selectedYear.Yil}`)
        .then((res) => {
          this.otherCostList = res.data.list;
          this.other_cost_form_visible = true;
        });
    },

    sampleCostListUpdated() {
      useLegacyApi()
        .get(`/reports/ayo/sample/cost/list/${this.selectedYear.Yil}`)
        .then((res) => {
          this.sampleCostList = res.data.list;
        });
    },
    sampleCostUpdate(event) {
      useLegacyApi().put("/reports/ayo/sample/cost/update", event).then((res) => {
        useAppToast().success("Başarıyla Güncellendi.");
      });
    },
    sampleCostSave(event) {
      useLegacyApi().post("/reports/ayo/sample/cost/save", event).then((res) => {
        useAppToast().success("Başarıyla Kaydedildi.");
        this.sampleCostListUpdated();
      });
    },
    sampleCost() {
      /* Yil yoksa dialogu acmayi DENEME -- gerekcesi requireYear(). */
      if (!this.requireYear()) return;

      useLegacyApi()
        .get(`/reports/ayo/sample/cost/list/${this.selectedYear.Yil}`)
        .then((res) => {
          this.sampleCostList = res.data.list;
          this.sample_cost_form_visible = true;
        });
    },
    abroadCostListUpdated() {
      useLegacyApi()
        .get(`/reports/ayo/abroad/cost/list/${this.selectedYear.Yil}`)
        .then((res) => {
          this.abroadCostList = res.data.list;
        });
    },
    abroadCostUpdate(event) {
      useLegacyApi().put("/reports/ayo/abroad/cost/update", event).then((res) => {
        useAppToast().success("Başarıyla Güncellendi.");
      });
    },
    abroadCostSave(event) {
      useLegacyApi().post("/reports/ayo/abroad/cost/save", event).then((res) => {
        useAppToast().success("Başarıyla Kaydedildi.");
        this.abroadCostListUpdated();
      });
    },
    abroadCost() {
      /* Yil yoksa dialogu acmayi DENEME -- gerekcesi requireYear(). */
      if (!this.requireYear()) return;

      useLegacyApi()
        .get(`/reports/ayo/abroad/cost/list/${this.selectedYear.Yil}`)
        .then((res) => {
          this.abroadCostList = res.data.list;
          this.abroad_cost_form_visible = true;
        });
    },

    wageCostUpdate(event) {
      useLegacyApi().put("/reports/ayo/wage/cost/update", event).then((res) => {
        useAppToast().success("Başarıyla Güncellendi.");
      });
    },
    wageCostSave(event) {
      useLegacyApi().post("/reports/ayo/wage/cost/save", event).then((res) => {
        this.wageCostList = res.data.list;
        useAppToast().success("Başarıyla Kaydedildi.");
        this.wageCostListUpdated();
      });
    },
    wageCostListUpdated() {
      useLegacyApi()
        .get(`/reports/ayo/wage/cost/list/${this.selectedYear.Yil}`)
        .then((res) => {
          this.wageCostList = res.data.list;
        });
    },
    wageCost() {
      /* Yil yoksa dialogu acmayi DENEME -- gerekcesi requireYear(). */
      if (!this.requireYear()) return;

      useLegacyApi()
        .get(`/reports/ayo/wage/cost/list/${this.selectedYear.Yil}`)
        .then((res) => {
          this.wageCostList = res.data.list;
          this.wage_cost_form_visible = true;
        });
    },
    travelCostUpdate(event) {
      useLegacyApi().put("/reports/ayo/travel/cost/update", event).then((res) => {
        useAppToast().success("Başarıyla Güncellendi.");
      });
    },
    travelCostSave(event) {
      useLegacyApi().post("/reports/ayo/travel/cost/save", event).then((res) => {
        useAppToast().success("Başarıyla Kaydedildi.");
        this.travelCostListUpdated();
      });
    },
    creditCardCostUpdate(event) {
      useLegacyApi()
        .put("/reports/ayo/credit/card/cost/update", event)
        .then((res) => {
          useAppToast().success("Başarıyla Güncellendi.");
        });
    },
    creditCardCostSave(event) {
      useLegacyApi()
        .post("/reports/ayo/credit/card/cost/save", event)
        .then((res) => {
          useAppToast().success("Başarıyla Kaydedildi.");
          this.creditCardCostListUpdated();
        });
    },
    travelCostListUpdated() {
      useLegacyApi()
        .get(`/reports/ayo/travel/cost/list/${this.selectedYear.Yil}`)
        .then((res) => {
          this.travelCostList = res.data.list;
        });
    },
    creditCardCostListUpdated() {
      useLegacyApi()
        .get(`/reports/ayo/credit/card/cost/list/${this.selectedYear.Yil}`)
        .then((res) => {
          this.creditCardCostList = res.data.list;
        });
    },
    travelCost() {
      /* Yil yoksa dialogu acmayi DENEME -- gerekcesi requireYear(). */
      if (!this.requireYear()) return;

      useLegacyApi()
        .get(`/reports/ayo/travel/cost/list/${this.selectedYear.Yil}`)
        .then((res) => {
          this.travelCostList = res.data.list;
          this.travel_cost_form_visible = true;
        });
    },
    creditCardToggle() {
      /* Yil yoksa dialogu acmayi DENEME -- gerekcesi requireYear(). */
      if (!this.requireYear()) return;

      useLegacyApi()
        .get(`/reports/ayo/credit/card/cost/list/${this.selectedYear.Yil}`)
        .then((res) => {
          this.creditCardCostList = res.data.list;
          this.credit_card_form_visible = true;
        });
    },
    halfMonthsSelected(event) {
      if (event.value.id == 0) {
        this.sharedStore.beginLoading();

        this.fetchYearCost(this.selectedYear.Yil)
          .then((response) => {
            if (response) {
              const data = response.data.filter((x) => {
                return x.yukleme_month >= 1 && x.yukleme_month <= 6;
              });
              this.__getHalfCostList(1, 6, this.selectedYear.Yil);
              this.reportsStore.MUT_setReportsMekmarAyoList(data);
              this.reportsStore.MUT_setReportsMekmarAyoListTotal(data);
              this.sharedStore.endLoading();
              useLegacyApi()
                .get(
                  `/maliyet/proforma/currency/half/${
                    this.selectedYear.Yil
                  }/${1}/${6}`
                )
                .then((res) => {
                  this.profitProformaTl =
                    this.reportsStore.getReportsMekmarAyoListTotal.proforma *
                    res.data.currency;
                });
            }
          })
          .catch((err) => {
            console.error("if basarisiz:", err)
            this.sharedStore.endLoading()
          });
      } else if (event.value.id == 1) {
        this.sharedStore.beginLoading();
        this.fetchYearCost(this.selectedYear.Yil)
          .then((response) => {
            if (response) {
              const data = response.data.filter((x) => {
                return x.yukleme_month >= 7 && x.yukleme_month <= 12;
              });
              this.__getHalfCostList(7, 12, this.selectedYear.Yil);

              this.reportsStore.MUT_setReportsMekmarAyoList(data);
              this.reportsStore.MUT_setReportsMekmarAyoListTotal(data);
              this.sharedStore.endLoading();
              useLegacyApi()
                .get(
                  `/maliyet/proforma/currency/half/${
                    this.selectedYear.Yil
                  }/${7}/${12}`
                )
                .then((res) => {
                  this.profitProformaTl =
                    this.reportsStore.getReportsMekmarAyoListTotal.proforma *
                    res.data.currency;
                });
            }
          })
          .catch((err) => {
            console.error("if basarisiz:", err)
            this.sharedStore.endLoading()
          });
      } else if (event.value.id == 2) {
        this.sharedStore.beginLoading();
        this.fetchYearCost(this.selectedYear.Yil)
          .then((response) => {
            this.reportsStore.MUT_setReportsMekmarAyoList(response.data);
            this.reportsStore.MUT_setReportsMekmarAyoListTotal(response.data);
            this.sharedStore.endLoading();
            this.__getYearlyCostList(this.selectedYear.Yil);
            this.selectedQuarter = { quarter: "All", id: 0 };
            useLegacyApi()
              .get(`/maliyet/proforma/all/currency/${this.selectedYear.Yil}`)
              .then((res) => {
                this.profitProformaTl =
                  this.reportsStore.getReportsMekmarAyoListTotal.proforma *
                  res.data.currency;
              });
          })
          .catch((err) => {
            console.error("if basarisiz:", err)
            this.sharedStore.endLoading()
          });
      }
    },
    quarterSelected(event) {
      if (event.value.id == 0) {
        this.sharedStore.beginLoading();
        this.fetchMonthCost(this.selectedYear.Yil, this.reportsStore.getReportsMekmarAyoMonthList[0].Ay)
          .then((response) => {
            this.reportsStore.MUT_setReportsMekmarAyoList(response.data);
            this.reportsStore.MUT_setReportsMekmarAyoListTotal(response.data);
            this.sharedStore.endLoading();
            this.__getMonthlyCostList(
              this.selectedYear.Yil,
              this.reportsStore.getReportsMekmarAyoMonthList[0].Ay
            );
            this.selectedMonth = this.reportsStore.getReportsMekmarAyoMonthList[0];
            useLegacyApi()
              .get(
                `/maliyet/proforma/currency/${this.selectedYear.Yil}/${this.reportsStore.getReportsMekmarAyoMonthList[0].Ay}`
              )
              .then((res) => {
                this.profitProformaTl =
                  this.reportsStore.getReportsMekmarAyoListTotal.proforma *
                  res.data.currency;
              });
          })
          .catch((err) => {
            console.error("if basarisiz:", err)
            this.sharedStore.endLoading()
          });
      } else if (event.value.id == 1) {
        this.sharedStore.beginLoading();
        this.fetchYearCost(this.selectedYear.Yil)
          .then((response) => {
            if (response) {
              const data = response.data.filter((x) => {
                return x.yukleme_month >= 1 && x.yukleme_month <= 3;
              });
              this.reportsStore.MUT_setReportsMekmarAyoList(data);
              this.reportsStore.MUT_setReportsMekmarAyoListTotal(data);
              this.__getQuarterCostList(1, 3, this.selectedYear.Yil);
              this.sharedStore.endLoading();
              useLegacyApi()
                .get(
                  `/maliyet/proforma/currency/quarter/${
                    this.selectedYear.Yil
                  }/${1}/${3}`
                )
                .then((res) => {
                  this.profitProformaTl =
                    this.reportsStore.getReportsMekmarAyoListTotal.proforma *
                    res.data.currency;
                });
            }
          })
          .catch((err) => {
            console.error("if basarisiz:", err)
            this.sharedStore.endLoading()
          });
      } else if (event.value.id == 2) {
        this.sharedStore.beginLoading();
        this.fetchYearCost(this.selectedYear.Yil)
          .then((response) => {
            if (response) {
              const data = response.data.filter((x) => {
                return x.yukleme_month >= 4 && x.yukleme_month <= 6;
              });
              this.reportsStore.MUT_setReportsMekmarAyoList(data);
              this.reportsStore.MUT_setReportsMekmarAyoListTotal(data);
              this.sharedStore.endLoading();
              this.__getQuarterCostList(4, 6, this.selectedYear.Yil);
              useLegacyApi()
                .get(
                  `/maliyet/proforma/currency/quarter/${
                    this.selectedYear.Yil
                  }/${4}/${6}`
                )
                .then((res) => {
                  this.profitProformaTl =
                    this.reportsStore.getReportsMekmarAyoListTotal.proforma *
                    res.data.currency;
                });
            }
          })
          .catch((err) => {
            console.error("if basarisiz:", err)
            this.sharedStore.endLoading()
          });
      } else if (event.value.id == 3) {
        this.sharedStore.beginLoading();
        this.fetchYearCost(this.selectedYear.Yil)
          .then((response) => {
            if (response) {
              const data = response.data.filter((x) => {
                return x.yukleme_month >= 7 && x.yukleme_month <= 9;
              });
              this.reportsStore.MUT_setReportsMekmarAyoList(data);
              this.reportsStore.MUT_setReportsMekmarAyoListTotal(data);
              this.sharedStore.endLoading();
              this.__getQuarterCostList(7, 9, this.selectedYear.Yil);
              useLegacyApi()
                .get(
                  `/maliyet/proforma/currency/quarter/${
                    this.selectedYear.Yil
                  }/${7}/${9}`
                )
                .then((res) => {
                  this.profitProformaTl =
                    this.reportsStore.getReportsMekmarAyoListTotal.proforma *
                    res.data.currency;
                });
            }
          })
          .catch((err) => {
            console.error("if basarisiz:", err)
            this.sharedStore.endLoading()
          });
      } else if (event.value.id == 4) {
        this.sharedStore.beginLoading();
        this.fetchYearCost(this.selectedYear.Yil)
          .then((response) => {
            if (response) {
              const data = response.data.filter((x) => {
                return x.yukleme_month >= 10 && x.yukleme_month <= 12;
              });
              this.reportsStore.MUT_setReportsMekmarAyoList(data);
              this.reportsStore.MUT_setReportsMekmarAyoListTotal(data);
              this.sharedStore.endLoading();
              this.__getQuarterCostList(10, 12, this.selectedYear.Yil);
              useLegacyApi()
                .get(
                  `/maliyet/proforma/currency/quarter/${
                    this.selectedYear.Yil
                  }/${10}/${12}`
                )
                .then((res) => {
                  this.profitProformaTl =
                    this.reportsStore.getReportsMekmarAyoListTotal.proforma *
                    res.data.currency;
                });
            }
          })
          .catch((err) => {
            console.error("if basarisiz:", err)
            this.sharedStore.endLoading()
          });
      }
    },
    /*
     * ARTIK EXCEL SUNUCUSUNDAN DEGIL, NITRO'DAN:
     *   eski: POST + GET
     *         {excelServerBase}/maliyet/dosyalar/maliyetRaporExcelListe
     *   yeni: POST /excel-api/reports/ayo-maliyet   (tek istek)
     *         server/routes/excel-api/reports/ayo-maliyet.post.ts
     *
     * Cikti uretimdekiyle GERCEK VERIYLE karsilastirildi (44 satir x
     * 30 sutun): deger, sayi bicimi, hucre stili, sutun genisligi ve
     * 312 satir yuksekligi farki 0.
     *
     * `if (response.status)` DUSTU -- HTTP durumunu (daima 200)
     * okuyordu, govdedeki {"status": false}'u DEGIL.
     */
    async excel_output() {
      try {
        await exportExcel(
          "/excel-api/reports/ayo-maliyet",
          this.reportsStore.getReportsMekmarAyoList,
          "ayo_maliyet_listesi.xlsx"
        );
      } catch (err) {
        console.error("ayo maliyet listesi ciktisi basarisiz:", err);
        useAppToast().error("Excel olusturulamadi.");
      }
    },
    allAyoList(event) {
      if (this.checked) {
        this.date_disabled = true;
        this.sharedStore.beginLoading();
        this.fetchYearCost(this.selectedYear.Yil)
          .then((response) => {
            this.reportsStore.MUT_setReportsMekmarAyoList(response.data);
            this.reportsStore.MUT_setReportsMekmarAyoListTotal(response.data);
            this.sharedStore.endLoading();
            this.__getYearlyCostList(this.selectedYear.Yil);
            this.selectedQuarter = { quarter: "All", id: 0 };
            useLegacyApi()
              .get(`/maliyet/proforma/all/currency/${this.selectedYear.Yil}`)
              .then((res) => {
                this.profitProformaTl =
                  this.reportsStore.getReportsMekmarAyoListTotal.proforma *
                  res.data.currency;
              });
          })
          .catch((err) => {
            console.error("if basarisiz:", err)
            this.sharedStore.endLoading()
          });
      } else {
        this.reportsStore.setReportsMekmarAyoMonthList(this.selectedYear.Yil);
        this.date_disabled = false;
        this.sharedStore.beginLoading();
        this.fetchMonthCost(this.selectedYear.Yil, this.reportsStore.getReportsMekmarAyoMonthList[0].Ay)
          .then((response) => {
            this.reportsStore.MUT_setReportsMekmarAyoList(response.data);
            this.reportsStore.MUT_setReportsMekmarAyoListTotal(response.data);
            this.sharedStore.endLoading();
            this.__getMonthlyCostList(
              this.selectedYear.Yil,
              this.reportsStore.getReportsMekmarAyoMonthList[0].Ay
            );
            this.selectedMonth = this.reportsStore.getReportsMekmarAyoMonthList[0];
            this.selectedQuarter = { quarter: "All", id: 0 };
            useLegacyApi()
              .get(
                `/maliyet/proforma/currency/${this.selectedYear.Yil}/${this.reportsStore.getReportsMekmarAyoMonthList[0].Ay}`
              )
              .then((res) => {
                this.profitProformaTl =
                  this.reportsStore.getReportsMekmarAyoListTotal.proforma *
                  res.data.currency;
              });
          })
          .catch((err) => {
            console.error("if basarisiz:", err)
            this.sharedStore.endLoading()
          });
      }
    },
    formatDecimal(value) {
      if (value == null || value == undefined || value == "" || value == " ") {
        return 0;
      } else {
        const data = value.toString().replace(".", ",");
        return data;
      }
    },
    yearSelected(event) {
      this.sharedStore.beginLoading();
      this.fetchMonthCost(event.value.Yil, 12)
        .then((response) => {
          this.reportsStore.setReportsMekmarAyoMonthList(event.value.Yil);
          this.reportsStore.MUT_setReportsMekmarAyoList(response.data);
          this.reportsStore.MUT_setReportsMekmarAyoListTotal(response.data);
          this.sharedStore.endLoading();
          this.selectedMonth = this.reportsStore.getReportsMekmarAyoMonthList[0];
          this.selectedQuarter = { quarter: "All", id: 0 };
          useLegacyApi()
            .get(`/maliyet/proforma/currency/${event.value.Yil}/${12}`)
            .then((res) => {
              this.profitProformaTl =
                this.reportsStore.getReportsMekmarAyoListTotal.proforma * res.data.currency;
            });
        })
        .catch((err) => {
          console.error("yearSelected basarisiz:", err)
          this.sharedStore.endLoading()
        });
    },
    monthSelected(event) {
      let date = {
        year: this.selectedYear.Yil,
        month: event.value.Ay,
      };
      this.sharedStore.beginLoading();

      this.fetchMonthCost(date.year, date.month)
        .then((response) => {
          this.reportsStore.MUT_setReportsMekmarAyoList(response.data);
          this.reportsStore.MUT_setReportsMekmarAyoListTotal(response.data);
          this.__getMonthlyCostList(date.year, date.month);
          this.sharedStore.endLoading();
          this.selectedQuarter = { quarter: "All", id: 0 };
          useLegacyApi()
            .get(`/maliyet/proforma/currency/${date.year}/${date.month}`)
            .then((res) => {
              this.profitProformaTl =
                this.reportsStore.getReportsMekmarAyoListTotal.proforma * res.data.currency;
            });
        })
        .catch((err) => {
          console.error("monthSelected basarisiz:", err)
          this.sharedStore.endLoading()
        });
    },
  },
  watch: {
    "reportsStore.getReportsMekmarAyoYearList"() {
      /*
       * [!] BOS LISTE KORUMASI.
       *
       * Eskiden burada dogrudan `[0]` alinip hemen `.Yil` okunuyordu.
       * Yil listesi bos donerse (uc hata verir ya da gercekten kayit
       * yoksa) `undefined.Yil` TypeError atiyor; izleyici yarida
       * kesiliyor ve `selectedYear` undefined KALIYOR.
       *
       * Sonucu sayfanin her yerine yayiliyordu: sekiz maliyet
       * dialogunun hepsi `this.selectedYear.Yil` okudugu icin
       * butonlara basildiginda HICBIR SEY olmuyordu (dialog acilmiyor,
       * uyari da cikmiyor).
       */
      this.selectedYear =
        this.reportsStore.getReportsMekmarAyoYearList[0] ?? null;

      if (!this.selectedYear) return;

      this.reportsStore.setReportsMekmarAyoMonthList(this.selectedYear.Yil);
    },
    "reportsStore.getReportsMekmarAyoMonthList"() {
      this.selectedMonth = this.reportsStore.getReportsMekmarAyoMonthList[0];
      this.sharedStore.beginLoading();
      this.fetchMonthCost(this.selectedYear.Yil, this.selectedMonth.Ay)
        .then((response) => {
          this.reportsStore.MUT_setReportsMekmarAyoList(response.data);
          this.reportsStore.MUT_setReportsMekmarAyoListTotal(response.data);
          this.__getMonthlyCostList(
            this.selectedYear.Yil,
            this.selectedMonth.Ay
          );
          useLegacyApi()
            .get(
              `/maliyet/proforma/currency/${this.selectedYear.Yil}/${this.selectedMonth.Ay}`
            )
            .then((res) => {
              this.profitProformaTl =
                this.reportsStore.getReportsMekmarAyoListTotal.proforma * res.data.currency;
            });

          this.sharedStore.endLoading();
        })
        .catch((err) => {
          console.error("monthSelected basarisiz:", err)
          this.sharedStore.endLoading()
        });
    },
  },
};
</script>

<script setup>
/*
 * definePageMeta yalnizca <script setup> icinde kullanilabilir ->
 * Options API sayfalarinda IKINCI bir script blogu gerekiyor
 * (ayni cozum app/pages/operation/supplier.vue icinde de var).
 *
 * BU SAYFADA KISITLAMA DUSMUSTU: yukaridaki export default icinde
 * `middleware: ["authority"]` yaziyordu ve Nuxt 3+ bunu yok sayiyor.
 * Yani app/middleware/authority.ts ile engellenmesi gereken dort
 * kullanici (48, 54, 56, 62) bu AYO rapor sayfasini acabiliyordu.
 */
definePageMeta({ middleware: ["authority"] })
</script>

<!--
  pages/reports/mekmar/ayo.vue

  BAGIMLILIK ZINCIRI:
    ayo/list.vue      (`reportsMekmarAyoList`) -> AyoList.vue
      -> ayo/listForm.vue (`ayoListForm`)      -> AyoListForm.vue  (729 satir)
    ayo/formc.vue        (`creditCardForm`)    -> AyoCreditCardForm.vue
    ayo/formcurrency.vue (`formCurrency`)      -> AyoFormCurrency.vue
  (hepsi app/components/reports/mekmar/ altinda; auto-import adlari
   ReportsMekmarAyo* oluyor.)

  Bu zincire ERISILMEYEN iki dosya BILEREK tasinmadi: ayo/formq.vue
  (`quarterAyoForm`) ve ayo/form.vue -- bu sayfadan cagrilmiyorlar.

  ELLE KAPATILANLAR (sayfa):
  [x] 55x this.$axios -> useLegacyApi()
      useApi() DEGIL: dosyada cok sayida `res.data.X` erisimi var ve
      useApi() govdeyi dogrudan dondurdugu icin hepsinin `res.X` olmasi
      gerekirdi; birini kacirmak derleme hatasi vermez, calisma aninda
      undefined uretir. useLegacyApi() axios sozlesmesini koruyor.
  [x] 16x this.$toast -> useAppToast()
  [x] 16x this.$excelApi -> useExcelApi()
  [x] 32x $store.dispatch -> ilgili Pinia eylemi
  [x] 28x $store.commit  -> MUT_ ONEKLI eylem
      BU AYRIM ONEMLIYDI: `setReportsMekmarAyoListTotal` hem action hem
      mutation olarak var. Vuex'te ayri isim uzaylariydi; Pinia'da ikisi
      de action oldugu icin codemod mutation'lara MUT_ oneki verdi
      (bkz. vuex-to-pinia.mjs). commit'i action'a yonlendirmek SESSIZCE
      yanlis olurdu: commit senkron state yazimi, ayni adli action ise
      AYRI BIR ISTEK atiyor.
  [x] mapGetters(6 getter) -> UC store: reports.ts (4),
      order.ts (getOrderProductionDocumentList -- CAPRAZ MODUL) ve
      yukleme sayaci icin shared.ts.
  [x] mapGetters([... "getLocalUrl"]) dustu; elle <a download> ->
      downloadFromExcelServer()
  [x] created() -> mounted()
  [x] IZLEYICI ANAHTARLARI TIRNAKLANDI (2 yer):
      `watch: { reportsStore.getReportsMekmarAyoYearList() {} }` GECERSIZ
      sozdizimidir -- nesne anahtarinda nokta olamaz. Vue 3 noktali yol
      anahtarlarini dizgi olarak destekliyor. Bu hatayi
      tools/codemods/check-script-syntax.mjs yakaladi; sablon denetcisi
      yakalamaz (o yalnizca <template> derliyor).
  [x] 5 bilesen etiketi pilot adlarina cevrildi. Codemod yalnizca ilk
      harfi buyutuyor (<creditCardForm> -> <CreditCardForm>) ve O AD
      COZULEMEZ; dort kacagi da check-component-tags.mjs yakaladi
      (onsuz uc diyalog ve AyoList icindeki form sessizce bos gelirdi).

  CODEMOD'UN YAPTIKLARI:
      9x :x + @update:x -> v-model:x,  4x <Dropdown> -> <Select>,
     10x p-button-* -> severity

  DOKUNULMADI ama DIKKAT:
  [!] Sablondaki <vue-excel-xlsx> blogu Nuxt 2'de ZATEN YORUM ICINDEYDI
      ve yerine duz bir <Button> konmustu; oldugu gibi birakildi.
  [!] Veri buyuk olcude EXCEL SUNUCUSUNDAN geliyor (useExcelApi), normal
      API'den degil. Nuxt 2'de de boyleydi. Ekran bos gelirse ilk
      bakilacak yer burasi.
  [!] Yazma uclari pilotta 403 alir (server/middleware/0.readonly-guard.ts).
  [!] EKRANDA GORULMEDI.
-->
