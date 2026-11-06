<template>
  <div>
    <div class="row m-auto">
      <div class="col-3">
        <DatePicker
          v-model="date"
          view="month"
          dateFormat="mm/yy"
          @date-select="monthlySelected($event)"
        />
      </div>
      <div class="col-3">
        <Button label="Yeni Maliyet" @click="newCalculatingCost" />
      </div>
      <div class="col-3">
        <Button
          :label="yearly_cost_header"
          @click="yearlyMaliyet"
          :loading="yearly_cost_loading"
        />
      </div>
      <div class="col-3">
        <Button
          class="w-100 mb-5"
          severity="info"
          type="button"
          label="Excel Maliyetler"
          @click="excel_maliyet_output"
        />
      </div>
    </div>

    <ReportsMekmerCalculatingCostSummary
      :cost="cost"
      :costLabour="costWork"
      :production="productionSqm"
      :costUnitPerson="costMain"
    />

    <div class="row">
      <div class="col-9">
        <DataTable
          :value="costs"
          v-model:selection="selectedCost"
          selectionMode="single"
          @row-click="costSelected($event)"
          v-model:filters="filteredCosts"
          filterDisplay="row"
          @filter="costFiltered($event)"
          scrollable
          scrollHeight="500px"
          sortField="Tarih"
          :sortOrder="-1"
        >
          <Column
            field="Tarih"
            header="Tarih"
            :showFilterMenu="false"
            :showClearButton="false"
            style="min-width: 120px"
          >
            <template #body="slotProps">
              {{ formatDateTR(slotProps.data.Tarih) }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                v-model="filterModel.value"
                type="text"
                @input="filterCallback()"
                class="p-column-filter"
              />
            </template>
          </Column>
          <Column
            field="MaliyetTuru"
            header="Maliyet Türü"
            :showFilterMenu="false"
            :showClearButton="false"
          >
            <template #body="slotProps">
              {{ slotProps.data.MaliyetTuru }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                v-model="filterModel.value"
                type="text"
                @input="filterCallback()"
                class="p-column-filter"
              />
            </template>
          </Column>
          <Column
            field="MaliyetFirma"
            header="Fatura Şirketi"
            :showFilterMenu="false"
            :showClearButton="false"
          >
            <template #body="slotProps">
              {{ slotProps.data.MaliyetFirma }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                v-model="filterModel.value"
                type="text"
                @input="filterCallback()"
                class="p-column-filter"
              />
            </template>
          </Column>
          <Column
            field="FaturaNo"
            header="Fatura No"
            :showFilterMenu="false"
            :showClearButton="false"
          >
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                v-model="filterModel.value"
                type="text"
                @input="filterCallback()"
                class="p-column-filter"
              />
            </template>
          </Column>
          <Column
            field="Fiyat"
            header="Fiyat (TL)"
            :showFilterMenu="false"
            :showClearButton="false"
          >
            <template #body="slotProps">
              {{ formatPriceTl(slotProps.data.Fiyat) }}
            </template>
            <template #footer>
              {{ formatPriceTl(total.priceTl) }}
            </template>
          </Column>
          <Column
            field="Kur"
            header="Kur"
            :showFilterMenu="false"
            :showClearButton="false"
          >
            <template #body="slotProps">
              {{ formatPriceTl(slotProps.data.Kur) }}
            </template>
          </Column>
          <Column header="Dolar" :showFilterMenu="false" :showClearButton="false">
            <template #body="slotProps">
              {{ formatPriceUsd(usdOf(slotProps.data)) }}
            </template>
            <template #footer>
              {{ formatPriceUsd(total.priceUsd) }}
            </template>
          </Column>
          <Column header="#">
            <template #body="slotProps">
              <Button
                severity="danger"
                label="Sil"
                @click="deletePost(slotProps.data.ID, slotProps.data.Tarih)"
              />
            </template>
          </Column>
        </DataTable>
      </div>

      <div class="col-3">
        <DataTable
          :value="calculate_ratio_list"
          sortField="Oran"
          :sortOrder="-1"
          scrollable
          scrollHeight="500px"
        >
          <Column field="MaliyetTuru" header="Maliyet Türü">
            <template #body="slotProps">
              {{ slotProps.data.MaliyetTuru }}
            </template>
          </Column>
          <Column field="Total" header="Toplam">
            <template #body="slotProps">
              {{ formatPriceUsd(slotProps.data.Total) }}
            </template>
          </Column>
          <Column field="Oran" header="Oran (%)">
            <template #body="slotProps">
              {{ formatDecimal(slotProps.data.Oran) }}
              %
            </template>
          </Column>
        </DataTable>
      </div>
    </div>

    <!--
      TEK diyalog. Nuxt 2'de AYNI `calculatingCostFormVisible` degerine
      BAGLI IKI Dialog vardi ("Yeni Maliyet Girişi" ve "Maliye Güncelleme")
      -- ikisi de ayni anda aciliyordu, yani form ekranda IKI KEZ
      gorunuyordu ve iki kopya ayni `model` nesnesini paylasiyordu.
      Baslik artik status'a gore degisiyor.
    -->
    <Dialog
      v-model:visible="calculatingCostFormVisible"
      :header="status ? 'Yeni Maliyet Girişi' : 'Maliyet Güncelleme'"
      modal
      blockScroll
      focusOnShow
    >
      <ReportsMekmerCalculatingCostForm
        :status="status"
        :model="model"
        :costTypes="costTypes"
        :companies="companies"
        @cost_saved_update_emit="costSavedUpdate($event)"
      />
    </Dialog>
  </div>
</template>

<script>
import { FilterMatchMode } from "@primevue/core/api"

/*
 * Maliyet hesabina giren maliyet turu ID'leri.
 *
 * Nuxt 2'de bu 18 elemanli dizi UC AYRI YERDE elle tekrarlaniyordu
 * (calculateCost icinde bir, getCalculateRatio icinde iki kez). Uc
 * kopyanin ayrisma riski gercekti: yeni bir maliyet turu eklenip
 * yalnizca birine yazilsa, ozet kartlari onu sayar ama oran tablosu
 * saymaz -- toplamlar birbirini tutmaz ve sebebi gorunmez.
 */
const COST_TYPE_IDS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
]

/* Iscilik + SGK: ozet kartlarinda ayrica gosterilen iki tur. */
const WAGE_AND_INSURANCE_IDS = [1, 2]

const emptyCostModel = () => ({
  FaturaFirma: null,
  FaturaFirmaId: null,
  FaturaNo: null,
  Fiyat: 0,
  FiyatUsd: 0,
  ID: 0,
  Kur: 0,
  MaliyetTurId: null,
  MaliyetFirma: null,
  Tarih: null,
})

/*
 * useApi() BIR $fetch ORNEGI -- `.get` / `.post` / `.delete` METOTLARI YOK.
 *
 * useApi() govdesi `return $fetch.create({...})` (app/composables/useApi.ts).
 * $fetch.create CAGRILABILIR bir fonksiyon dondurur; axios gibi metot
 * tasiyan bir nesne DEGIL. Bu yuzden `useApi().get(url)` cagrisi
 *     TypeError: (intermediate value)().get is not a function
 * firlatiyordu -- sayfa acilisinda, mounted() icinde.
 *
 * Dogru kullanim:
 *     useApi()(url)                               // GET
 *     useApi()(url, { method: "POST", body })     // POST
 *     useApi()(url, { method: "DELETE" })         // DELETE
 *
 * Yanit sekli DEGISMIYOR: $fetch govdeyi dogrudan donduruyor, yani
 * cagri yerlerindeki `res.list` / `res.status` okumalari aynen gecerli.
 * (useLegacyApi() ise axios'u taklit edip `{ data, status }` sariyor --
 * bu sayfalar o sarmalayiciyi beklemiyor, dolayisiyla ona cevirmek
 * `res.list` okumalarini bozardi.)
 */
export default {
  data() {
    return {
      calculate_ratio_list: [],
      filteredCosts: {
        Tarih: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        MaliyetTuru: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        MaliyetFirma: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        FaturaNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      status: false,
      selectedCost: null,
      yearly_cost_loading: false,
      yearly_cost_header: "Yıllık",
      date: new Date(),
      calculatingCostFormVisible: false,
      companies: [],
      costTypes: [],
      costs: [],
      production: [],
      total: {
        priceTl: 0,
        priceUsd: 0,
      },
      costTypeTotal: 0,
      wageAndInsuranceTotal: 0,
      productionSqm: 0,
      productionPiece: 0,
      cost: 0,
      costWork: 0,
      costMain: 0,
      model: emptyCostModel(),
    }
  },

  /*
   * created() -> mounted(): created() SSR'da da calisir, icindeki async
   * isi beklenmez ve liste BOS serialize edilir; hydration onu devralir,
   * created() bir daha calismadigi icin tablo bos kalir
   * (bkz. commit 2afc877e3). mounted() sunucuda HIC calismaz.
   *
   * Veri bu sayfada store'da degil bileşenin kendi data()'sinda durdugu
   * icin useAsyncData'li kalip (bkz. reports/mekmer/stock.vue)
   * kullanilmadi -- ayni gerekce reports/mekmer/new-mekmer-finance.vue'da
   * da yazili.
   */
  mounted() {
    const now = new Date()
    this.loadCosts(now.getFullYear(), now.getMonth() + 1)
  },

  methods: {
    /* Bir maliyet satirinin dolar karsiligi; Kur 0 iken Infinity uretmez. */
    usdOf(row) {
      const kur = Number(row.Kur)
      return kur ? Number(row.Fiyat) / kur : 0
    },

    /*
     * TEK VERI YUKLEME YOLU.
     *
     * Nuxt 2'de ayni blok DORT KEZ kopyalanmisti: getList(),
     * MonthlySelected(), yearlyMaliyet() ve costSavedUpdate(). Dordu de
     * "istek at -> costs/companies/costTypes/production ata -> toplamlari
     * sifirla -> topla -> calculateCost -> getCalculateRatio -> yukleme
     * bayragini indir" yapiyordu, ufak farklarla: ucu `await
     * list.forEach(...)` yaziyordu (forEach Promise dondurmez, await
     * anlamsiz), biri calculateCost'u toplamlardan ONCE, ucu SONRA
     * cagiriyordu. Tek yola indirildi.
     *
     * month verilmezse yillik uc kullanilir.
     */
    loadCosts(year, month) {
      this.yearly_cost_loading = true

      const url = month
        ? `/reports/mekmer/calculating/cost/${year}/${month}`
        : `/reports/mekmer/calculating/cost/${year}`

      return useApi()(url)
        .then((res) => {
          this.costs = res.list || []
          this.companies = res.companies || []
          this.costTypes = res.costTypes || []
          this.production = res.production || []

          this.total.priceTl = 0
          this.total.priceUsd = 0
          for (const row of this.costs) {
            this.total.priceTl += Number(row.Fiyat) || 0
            this.total.priceUsd += this.usdOf(row)
          }

          this.calculateCost(this.costs, this.production)
          this.calculate_ratio_list = this.buildRatioList(
            this.costs,
            this.costTypes
          )

          this.yearly_cost_header = month ? "Yıllık" : "Aylık"
        })
        .catch((err) => {
          console.error("maliyet listesi alinamadi:", err)
          useAppToast().error(
            `Maliyet listesi alınamadı: ${err?.data?.message || err?.message || "bilinmeyen hata"}`
          )
        })
        .finally(() => {
          this.yearly_cost_loading = false
        })
    },

    monthlySelected(event) {
      const date = new Date(event)
      this.loadCosts(date.getFullYear(), date.getMonth() + 1)
    },

    /*
     * Dugme ETIKETI, basildiginda NE OLACAGINI soyluyor: "Yıllık" yazarken
     * basilirsa yillik veriyi getirir ve etiket "Aylık"a doner.
     *
     * Nuxt 2'deki hali bunun TERSINI yapiyordu: etiket "Aylık" iken yillik
     * veri cekiyor ve etiketi "Yıllık" yapiyordu, "Yıllık" iken ise aylik
     * listeye donuyordu -- yani etiket her zaman o anda GORUNTULENEN
     * donemi degil, bir sonraki tiklamanin tersini gosteriyordu. Baslangic
     * degeri de "Yıllık"ti, yani ilk tiklama aylik veri getiriyordu.
     * Etiketin anlami tek yonde sabitlendi.
     */
    yearlyMaliyet() {
      const now = new Date()

      if (this.yearly_cost_header === "Yıllık") {
        this.loadCosts(now.getFullYear())
      } else {
        this.loadCosts(now.getFullYear(), now.getMonth() + 1)
      }
    },

    costSavedUpdate(savedDate) {
      const date = new Date(savedDate)
      this.calculatingCostFormVisible = false
      this.loadCosts(date.getFullYear(), date.getMonth() + 1)
    },

    costFiltered(event) {
      this.total.priceTl = 0
      this.total.priceUsd = 0

      for (const row of event.filteredValue) {
        this.total.priceTl += Number(row.Fiyat) || 0
        this.total.priceUsd += this.usdOf(row)
      }
    },

    newCalculatingCost() {
      this.model = emptyCostModel()
      this.status = true
      this.calculatingCostFormVisible = true
    },

    costSelected(event) {
      /*
       * Kopya veriliyor, satirin KENDISI degil. Nuxt 2'de
       * `this.model = event.data` ile tablo satirinin ta kendisi forma
       * baglaniyordu: formda yazilan her karakter arkadaki TABLOYU da
       * aninda degistiriyor, kullanici "Temizle"ye basarsa veya kaydetmeden
       * cikarsa tablo ekranda bozuk kaliyordu (veritabani degismemis olsa
       * bile ekrandaki deger yanlis).
       */
      this.model = { ...event.data }
      this.status = false
      this.calculatingCostFormVisible = true
    },

    deletePost(id, date) {
      if (!confirm("Silmek istediğinize emin misiniz?")) return

      useApi()(`/reports/mekmer/calculating/cost/delete/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          /*
           * Orijinalde `if (res)` vardi -- axios yanit nesnesi her zaman
           * dogru oldugu icin hata dali OLU KODTU: silme basarisiz olsa
           * da "Başarıyla Silindi." gosteriliyordu.
           */
          if (!res || res.status === false) {
            useAppToast().error(
              (res && res.message) || "Silme sırasında bir hata oluştu."
            )
            return
          }

          useAppToast().success("Başarıyla Silindi.")
          const parsed = new Date(date)
          this.loadCosts(parsed.getFullYear(), parsed.getMonth() + 1)
        })
        .catch((err) => {
          console.error("maliyet silinemedi:", err)
          useAppToast().error(
            `Silme sırasında bir hata oluştu: ${err?.data?.message || err?.message || "bilinmeyen hata"}`
          )
        })
    },

    /*
     * ============================================================
     *  MALIYET HESABI -- FORMUL BIREBIR KORUNDU
     * ============================================================
     *
     * !!! DIKKAT -- ICINDE KESIN BIR HATA VAR, BILEREK DUZELTILMEDI !!!
     *
     * Adet (UrunBirimID == 2) kaleminin metrekareye cevrilmesi su kosula
     * bagli ve kosul Nuxt 2'de de boyleydi:
     *
     *     if (x.En.split(",") == 2 && x.Boy.split(",") == 0)
     *
     * split() bir DIZI dondurur. Dizi sayiyla karsilastirilinca once
     * metne cevrilir, yani kosul ancak En TAM OLARAK "2" ve Boy TAM
     * OLARAK "0" oldugunda dogru olur (["2"] -> "2" -> 2). Olcu
     * degerleri icin bu pratikte hic gerceklesmez; yazarin niyeti
     * muhtemelen ondalik basamak kontroluydu (orn. split(",").length).
     *
     * SONUC: adet kalemleri metrekareye neredeyse HIC eklenmiyor,
     * yalnizca productionPiece'e yaziliyor. productionSqm eksik kaldigi
     * icin cost / costWork / costMain -- yani ozet kartlarindaki UC ANA
     * SAYI -- oldugundan BUYUK cikiyor.
     *
     * Gecis sirasinda is kurali DEGISTIRILMEDI: dogru kosulun ne oldugunu
     * bilmiyorum ve bu sayilar muhasebeye giriyor. Duzeltilmesi gerekiyor
     * ama bu, gecisten ayri ve sahibiyle konusulmasi gereken bir karar.
     * Davranis birebir ayni tutuldu ki gecisin kendisi dogrulanabilsin.
     */
    calculateCost(costs, production) {
      this.costTypeTotal = 0
      this.wageAndInsuranceTotal = 0
      this.productionSqm = 0
      this.productionPiece = 0

      const customCosts = costs.filter((x) =>
        COST_TYPE_IDS.includes(x.MaliyetTurId)
      )

      for (const x of customCosts) {
        const usd = this.usdOf(x)
        this.costTypeTotal += usd

        if (WAGE_AND_INSURANCE_IDS.includes(x.MaliyetTurId)) {
          this.wageAndInsuranceTotal += usd
        }
      }

      for (const x of production) {
        if (x.UrunBirimID == 1) {
          this.productionSqm += x.Miktar
          continue
        }

        if (x.UrunBirimID == 2) {
          /* Kosul yukaridaki DIKKAT notunda aciklandi -- aynen korundu. */
          if (x.En.split(",") == 2 && x.Boy.split(",") == 0) {
            const type1 = parseFloat(x.En.replace(",", "."))
            const type2 = parseFloat(x.Boy.replace(",", "."))
            this.productionSqm += (type1 * type2 * x.Miktar) / 10000
          }
        }

        this.productionPiece += x.Miktar
      }

      /*
       * Uretim 0 iken bolme Infinity uretiyordu ve o deger hem ozet
       * kartlarinda ("$∞") hem Excel ciktisinda gorunuyordu; costMain
       * hesabi da Infinity'yi tasiyordu. Uretimsiz bir ay (ya da henuz
       * veri girilmemis ay) bunu her seferinde tetikliyor.
       */
      const sqm = this.productionSqm

      this.cost = sqm ? this.costTypeTotal / sqm : 0
      this.costWork = sqm ? this.wageAndInsuranceTotal / sqm : 0
      this.costMain = (this.cost - this.costWork) / 1.2 + this.costWork
    },

    /*
     * Maliyet turu basina toplam ve oran.
     *
     * Nuxt 2'deki getCalculateRatio async idi ve `customTypes.forEach(
     * async (x) => { ... await this._getCalculateCost(...) })` yaziyordu;
     * _getCalculateCost ise async DEGILDI. forEach async callback'i
     * beklemedigi icin satirlarin listeye hangi sirada girecegi
     * belirsizdi. Hesap tamamen senkron -- map ile dondu.
     *
     * Ayrica _getCalculateCost, liste bos oldugunda nesne degil SAYI (0)
     * donduruyordu; cagiran taraf `const { ratio, value } = ...` ile
     * destructure ettigi icin ikisi de undefined oluyor ve tabloya bos
     * Oran/Total satirlari giriyordu.
     */
    buildRatioList(costs, types) {
      const customCosts = costs.filter((x) =>
        COST_TYPE_IDS.includes(x.MaliyetTurId)
      )
      const customTypes = types.filter((x) => COST_TYPE_IDS.includes(x.ID))

      const total = customCosts.reduce((sum, x) => sum + this.usdOf(x), 0)

      return customTypes.map((type) => {
        const value = customCosts
          .filter((x) => x.MaliyetTurId == type.ID)
          .reduce((sum, x) => sum + this.usdOf(x), 0)

        return {
          MaliyetID: type.ID,
          MaliyetTuru: type.MaliyetTuru,
          Oran: total ? (value / total) * 100 : 0,
          Total: value,
        }
      })
    },

    formatDateTR(dateInput) {
      if (!dateInput) return ""

      // 1) Önce "12.05.2026" Türkçe formatını yakala (new Date'e sokmadan!)
      if (typeof dateInput === "string") {
        const m = dateInput.match(/^(\d{2})\.(\d{2})\.(\d{4})/)
        if (m) return `${m[1]}.${m[2]}.${m[3]}` // zaten istenen format

        // 2) ISO "2026-05-12..." formatı — Safari için T'li dene
        const iso = dateInput.match(/^(\d{4})-(\d{2})-(\d{2})/)
        if (iso) return `${iso[3]}.${iso[2]}.${iso[1]}`
      }

      // 3) Date objesi veya diğer durumlar
      const d = dateInput instanceof Date ? dateInput : new Date(dateInput)
      if (isNaN(d.getTime())) return ""
      return new Intl.DateTimeFormat("tr-TR").format(d)
    },

    formatPriceTl(value) {
      if (value === null || value === undefined || value === "") return "0,00 ₺"

      const val = parseFloat(value)
      if (isNaN(val)) return "0,00 ₺"

      return new Intl.NumberFormat("tr-TR", {
        style: "currency",
        currency: "TRY",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(val)
    },

    // Dolar Formatlayıcı (Örn: $1,250.50)
    formatPriceUsd(value) {
      if (value === null || value === undefined || value === "") return "$0.00"

      const val = parseFloat(value)
      if (isNaN(val)) return "$0.00"

      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(val)
    },

    async excel_maliyet_output() {
      const XLSX = await import("xlsx")

      const num = (v) => {
        const n = parseFloat(v)
        return isNaN(n) || !isFinite(n) ? 0 : n
      }

      const d = new Date(this.date)
      const isYearly = this.yearly_cost_header === "Aylık"
      const donem = isYearly
        ? `${d.getFullYear()} (Yıllık)`
        : `${String(d.getMonth() + 1).padStart(2, "0")}.${d.getFullYear()}`

      // Hücre formatı uygulayıcı: { kolonIndex: format }
      const applyFormat = (ws, colFormats, startRow) => {
        const range = XLSX.utils.decode_range(ws["!ref"])
        for (let R = startRow; R <= range.e.r; R++) {
          Object.entries(colFormats).forEach(([C, z]) => {
            const cell = ws[XLSX.utils.encode_cell({ r: R, c: Number(C) })]
            if (cell && cell.t === "n") cell.z = z
          })
        }
      }

      const TL = '#,##0.00" ₺"'
      const USD = '"$"#,##0.00'
      const DEC = "#,##0.00"

      const wb = XLSX.utils.book_new()

      /* ---------- 1) ÖZET ---------- */
      const ozetAoa = [
        ["MALİYET ÖZETİ"],
        ["Dönem", donem],
        [],
        ["Toplam Maliyet (TL)", num(this.total.priceTl)],
        ["Toplam Maliyet (USD)", num(this.total.priceUsd)],
        ["Toplam Üretim (m²)", num(this.productionSqm)],
        [],
        ["Birim Maliyet (USD/m²)", num(this.cost)],
        ["İşçilik + SGK Maliyeti (USD/m²)", num(this.costWork)],
        ["Ana Maliyet (USD/m²)", num(this.costMain)],
        [],
        ["Kayıt Sayısı", this.costs.length],
      ]
      const wsOzet = XLSX.utils.aoa_to_sheet(ozetAoa)
      wsOzet["!cols"] = [{ wch: 32 }, { wch: 20 }]
      if (wsOzet["B4"]) wsOzet["B4"].z = TL
      ;["B5", "B8", "B9", "B10"].forEach((a) => {
        if (wsOzet[a]) wsOzet[a].z = USD
      })
      if (wsOzet["B6"]) wsOzet["B6"].z = DEC
      XLSX.utils.book_append_sheet(wb, wsOzet, "Özet")

      /* ---------- 2) MALİYETLER ---------- */
      const costAoa = [
        [
          "Tarih",
          "Maliyet Türü",
          "Fatura Şirketi",
          "Fatura No",
          "Fiyat (TL)",
          "Kur",
          "Dolar",
        ],
      ]
      this.costs.forEach((x) => {
        costAoa.push([
          this.formatDateTR(x.Tarih),
          x.MaliyetTuru || "",
          x.MaliyetFirma || "",
          x.FaturaNo || "",
          num(x.Fiyat),
          num(x.Kur),
          num(x.Kur) ? num(x.Fiyat) / num(x.Kur) : 0,
        ])
      })
      costAoa.push([])
      costAoa.push([
        "TOPLAM",
        "",
        "",
        "",
        num(this.total.priceTl),
        "",
        num(this.total.priceUsd),
      ])

      const wsCost = XLSX.utils.aoa_to_sheet(costAoa)
      wsCost["!cols"] = [
        { wch: 12 },
        { wch: 28 },
        { wch: 28 },
        { wch: 16 },
        { wch: 16 },
        { wch: 10 },
        { wch: 14 },
      ]
      wsCost["!autofilter"] = { ref: `A1:G${this.costs.length + 1}` }
      wsCost["!freeze"] = { xSplit: 0, ySplit: 1 }
      applyFormat(wsCost, { 4: TL, 5: DEC, 6: USD }, 1)
      XLSX.utils.book_append_sheet(wb, wsCost, "Maliyetler")

      /* ---------- 3) ORANLAR ---------- */
      const ratios = [...this.calculate_ratio_list].sort(
        (a, b) => num(b.Oran) - num(a.Oran)
      )
      const ratioAoa = [["Maliyet Türü", "Toplam (USD)", "Oran (%)"]]
      ratios.forEach((x) => {
        ratioAoa.push([x.MaliyetTuru || "", num(x.Total), num(x.Oran)])
      })
      ratioAoa.push([])
      ratioAoa.push([
        "TOPLAM",
        ratios.reduce((s, x) => s + num(x.Total), 0),
        ratios.reduce((s, x) => s + num(x.Oran), 0),
      ])

      const wsRatio = XLSX.utils.aoa_to_sheet(ratioAoa)
      wsRatio["!cols"] = [{ wch: 30 }, { wch: 16 }, { wch: 12 }]
      applyFormat(wsRatio, { 1: USD, 2: '0.00"%"' }, 1)
      XLSX.utils.book_append_sheet(wb, wsRatio, "Oranlar")

      /* ---------- İNDİR ---------- */
      const fileName = `maliyet_${donem.replace(/[.\s()]/g, "_")}.xlsx`
      XLSX.writeFile(wb, fileName)

      useAppToast().success("Excel oluşturuldu.")
    },
  },
}
</script>

<!--
  pages/reports/mekmer/calculating-cost.vue

  BAGIMLILIK ZINCIRI (hepsi bu adimda tasindi):
    calculatingCost/cost.vue  -> components/reports/mekmer/CalculatingCostSummary.vue
    calculatingCost/form.vue  -> components/reports/mekmer/CalculatingCostForm.vue
    tcmb/currency.vue         -> components/tcmb/Currency.vue   (`currencyApi`)
    plugins/tcmb-service.js   -> composables/useTcmb.ts         (`$tcmb`)
    api/tcmb.js               -> server/routes/tcmb-api/kurlar/[...path].get.ts

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] import { FilterMatchMode } from "primevue/api" -> "@primevue/core/api"
      PrimeVue 4'te `primevue/api` alt paketi KALDIRILDI; eski yol Vite'ta
      "Failed to resolve import" ile build'i dusuruyor.

  [x] :selection.sync / :filters.sync / :visible.sync
         -> v-model:selection / v-model:filters / v-model:visible

  [x] <Calendar> -> <DatePicker>. `Calendar` adi v4.5'te hala CALISIYOR
      (DatePicker'i extends eden, mount'ta "Deprecated since v4" uyarisi
      basan takma ad) -- yani ekran bozulmazdi; degistirme sebebi konsol
      kirliligi ve takma adin v5'te kalkacak olmasi.

  [x] class="p-button-danger" / "p-button-info" / "p-button-primary"
         -> severity="danger" / "info" / (varsayilan)
      PrimeVue 4'te p-button-<severity> siniflari kaldirildi; sinif olarak
      birakilsa dugmeler hata vermeden varsayilan mavi renkte kalirdi --
      "Sil" dugmesi kirmizi gorunmezdi.

  [x] <calculatingCost> / <calculatingCostForm>
         -> <ReportsMekmerCalculatingCostSummary> /
            <ReportsMekmerCalculatingCostForm>   (Nuxt auto-import adlari;
      plugins/components.js'teki elle kayit kalkti.)

  [x] this.$axios -> useApi()  (govde DOGRUDAN donuyor: res.list,
      res.companies ... `res.data.` yok). this.$toast -> useAppToast().

  [x] created() -> mounted()  (gerekcesi mounted()'in ustunde)

  [x] mapGetters(["getLocalUrl"]) KALDIRILDI -- sayfada HIC kullanilmiyordu
      (tek gecis yeri mapGetters satirinin kendisiydi). Excel ciktisi
      xlsx paketini dogrudan kullaniyor, uzak bir Excel sunucusuna
      gitmiyor; bu sayfada local store'a hic ihtiyac yok.

  DUZELTILDI -- NUXT 2'DE BOZUK OLAN:

  [x] AYNI degere bagli IKI Dialog ("Yeni Maliyet Girişi" ve "Maliye
      Güncelleme") -- ikisi birden aciliyor, form ekranda IKI KEZ
      gorunuyor ve iki kopya ayni `model` nesnesini paylasiyordu. Tek
      diyaloga indirildi, baslik status'a gore.

  [x] costSelected() formu tablo satirinin TA KENDISINE bagliyordu
      (`this.model = event.data`): formda yazilan her karakter arkadaki
      tabloyu da degistiriyordu. Artik kopya veriliyor.

  [x] deletePost() `if (res)` ile basari kontrolu -- axios yanit nesnesi
      her zaman dogru oldugu icin hata dali olu kodtu; silme basarisiz
      olsa da "Başarıyla Silindi." cikiyordu. .catch() de eklendi.

  [x] Uretim 0 iken cost/costWork Infinity oluyordu -> ozet kartlarinda
      "$∞", Excel'de de ayni. Artik 0.

  [x] Dolar kolonu ve toplamlar Kur 0 iken Infinity uretiyordu (usdOf).

  [x] buildRatioList: eski surum async forEach kullaniyordu (sira
      belirsiz) ve bos listede nesne yerine sayi donduruyordu -> tabloya
      undefined Oran/Total satirlari giriyordu.

  [x] "Yıllık/Aylık" dugmesinin etiketi ters anlam tasiyordu
      (ayrinti yearlyMaliyet()'in ustunde).

  KALDIRILDI -- OLU KOD:

  [x] Icerigi dumduz "deneme" yazan ucuncu Dialog ve onu acan
      ratioSelected() + ratio_detail_dialog_header /
      ratio_detail_dialog_visible / selectedRatio durumu. Oran tablosunda
      bir satira tiklamak kullaniciya "deneme" yazan bir pencere
      aciyordu. Satir secimi de kaldirildi (tiklaninca artik hicbir sey
      olmuyor); oran DETAYI gercekten gerekiyorsa ayri bir is olarak
      yapilmali.

  [x] getCostType() / getCompanyType() -- ikisi de sablonda ve
      metotlarda HIC cagrilmiyordu.

  [x] excel_maliyet_output() icindeki `this.$toast &&` korumasi -- artik
      useAppToast() her zaman var.

  [x] deletePost() icindeki console.log, _getCalculateCost() icindeki
      console.log("oran", ...) ve calculateCost() icindeki
      console.log("various").

  [x] Bos `computed: {}` blogu (icerigi tamamen yorumdu) ve 18 elemanli
      maliyet turu dizisinin uc kopyasi (-> COST_TYPE_IDS).

  DIKKAT -- BILEREK DEGISTIRILMEDI:

  [!] calculateCost() icindeki `x.En.split(",") == 2` kosulu KESIN bir
      hata ama is kurali oldugu icin dokunulmadi. Ayrinti o metodun
      ustundeki uzun notta: adet kalemleri metrekareye eklenmiyor,
      dolayisiyla ozet kartlarindaki uc ana sayi oldugundan buyuk.
      Sahibiyle konusulup ayri bir adimda duzeltilmeli.

  [!] BICIM DEGISIKLIGI -- oran tablosu. Nuxt 2'de sayfanin KENDI
      formatPriceUsd metodu (Intl, "$1,250.50") ile GLOBAL formatPriceUsd
      filtresi ("$1.250,50") ayni ekranda birlikte kullaniliyordu:
      maliyet tablosunda metot, oran tablosunda `| formatPriceUsd`
      filtresi. Vue 3'te filter olmadigi icin ikisi de fonksiyon
      cagrisina dondu ve Options API'de METOT globalProperties'i
      golgeledigi icin oran tablosu da artik Intl bicimini kullaniyor.
      Yani iki tablo ARTIK AYNI bicimde; oran tablosundaki gorunum
      "$1.250,50" -> "$1,250.50" olarak degisti. Sayilar ayni.

  [!] Silme (DELETE) ve kaydetme (POST/PUT) pilotta 403 alir --
      server/middleware/0.readonly-guard.ts yazma isteklerini durduruyor.
      Beklenen davranis; hata mesaji artik sebebi soyluyor.
-->
