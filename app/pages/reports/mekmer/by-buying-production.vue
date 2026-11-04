<template>
  <div>
    <div class="row m-auto text-center">
      <div class="col-sm-6">
        <Select
          v-model="selectedYear"
          :options="years"
          optionLabel="year"
          placeholder="Select a Year"
          @change="yearSelected($event)"
          class="w-100"
        />
      </div>
      <div class="col-sm-6">
        <Button
          type="button"
          severity="info"
          class="w-100"
          icon="pi pi-file-excel"
          label="Excel"
          :loading="excelLoading"
          @click="excelOutput"
        />
      </div>
    </div>

    <DataTable
      :value="list"
      responsiveLayout="scroll"
      class="p-datatable-sm"
      :paginator="true"
      :rows="15"
      v-model:filters="filters1"
      filterDisplay="menu"
      @filter="filterSelected($event)"
    >
      <Column field="Month" header="Ay">
        <template #filter="{ filterModel }">
          <InputText type="text" v-model="filterModel.value" class="p-column-filter" />
        </template>
      </Column>
      <Column field="OcakAdi" header="Ocak">
        <template #filter="{ filterModel }">
          <InputText type="text" v-model="filterModel.value" class="p-column-filter" />
        </template>
      </Column>
      <Column field="KasaNo" header="Kasa">
        <template #filter="{ filterModel }">
          <InputText type="text" v-model="filterModel.value" class="p-column-filter" />
        </template>
      </Column>
      <Column field="FirmaAdi" header="Firma">
        <template #filter="{ filterModel }">
          <InputText type="text" v-model="filterModel.value" class="p-column-filter" />
        </template>
      </Column>
      <Column field="SiparisAciklama" header="Po">
        <template #filter="{ filterModel }">
          <InputText type="text" v-model="filterModel.value" class="p-column-filter" />
        </template>
      </Column>
      <Column field="UrunAdi" header="Ürün">
        <template #filter="{ filterModel }">
          <InputText type="text" v-model="filterModel.value" class="p-column-filter" />
        </template>
      </Column>
      <Column field="BirimAdi" header="Birim">
        <template #filter="{ filterModel }">
          <InputText type="text" v-model="filterModel.value" class="p-column-filter" />
        </template>
      </Column>
      <Column field="AlisFiyati" header="Alış Fiyatı">
        <template #body="slotProps">
          {{ formatPriceUsd(slotProps.data.AlisFiyati) }}
        </template>
      </Column>
      <Column field="Miktar" header="Miktar">
        <template #body="slotProps">
          {{ formatDecimal(slotProps.data.Miktar) }}
        </template>
        <template #footer>
          {{ formatDecimal(listTotal.miktar) }}
        </template>
      </Column>
      <Column field="AlisToplam" header="Alış Toplam">
        <template #body="slotProps">
          {{ formatPriceUsd(slotProps.data.AlisToplam) }}
        </template>
        <template #footer>
          {{ formatPriceUsd(listTotal.alisToplam) }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { FilterMatchMode } from "@primevue/core/api"

/*
 * Excel sutunlari: [baslik, okunacak alan].
 *
 * Nuxt 2'de bu, <JsonExcel>'in `:fields` nesnesiydi ({ Baslik: "alan" }).
 * JsonExcel kalktigi icin (asagidaki nota bakin) ayni esleme artik
 * dogrudan xlsx cikisini besliyor -- sutun sirasi ve basliklar BIREBIR
 * ayni kaldi.
 */
const EXCEL_COLUMNS = [
  ["Month", "Month"],
  ["OcakAdi", "OcakAdi"],
  ["KasaNo", "KasaNo"],
  ["FirmaAdi", "FirmaAdi"],
  ["SiparisAciklama", "SiparisAciklama"],
  ["UrunAdi", "UrunAdi"],
  ["BirimAdi", "BirimAdi"],
  ["AlisFiyati", "AlisFiyati"],
  ["Miktar", "Miktar"],
  ["AlisToplam", "AlisToplam"],
]

const list = ref([])
const listTotal = ref({ alisToplam: 0, miktar: 0 })
const excelLoading = ref(false)

/* Yil listesi: 2020'den bu yila kadar (Nuxt 2'deki created() ile ayni) */
const thisYear = new Date().getFullYear()
const years = ref(
  Array.from({ length: thisYear - 2020 + 1 }, (_, i) => ({ year: 2020 + i })),
)
const selectedYear = ref({ year: thisYear })

const filters1 = ref({
  Month: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  OcakAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  KasaNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  FirmaAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  SiparisAciklama: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  UrunAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  BirimAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
})

/*
 * Toplamlari verilen satirlardan yeniden hesaplar.
 *
 * NEDEN AYRI FONKSIYON: Nuxt 2'de ayni dort satirlik toplama dongusu UC
 * YERDE (created, yearSelected, filterSelected) ayri ayri yaziliydi; ucu
 * de listTotal'i once sifirlayip sonra forEach ile topluyordu.
 */
function recalcTotal(rows) {
  const total = { alisToplam: 0, miktar: 0 }
  rows.forEach((x) => {
    total.alisToplam += x.AlisToplam
    total.miktar += x.Miktar
  })
  listTotal.value = total
}

function yearSelected(event) {
  useLegacyApi()
    .get(`/production/buying/price/list/yearly/${event.value.year}`)
    .then((res) => {
      list.value = res.data.list
      recalcTotal(res.data.list)
    })
}

function filterSelected(event) {
  recalcTotal(event.filteredValue)
}

async function excelOutput() {
  if (!list.value.length) {
    useAppToast().warn("Aktarılacak kayıt bulunamadı.")
    return
  }

  excelLoading.value = true
  try {
    const XLSX = await import("xlsx")

    const headers = EXCEL_COLUMNS.map(([header]) => header)
    const rows = list.value.map((row) => EXCEL_COLUMNS.map(([, field]) => row[field]))

    const ws = XLSX.utils.aoa_to_sheet([headers, ...rows])
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Çeki")
    XLSX.writeFile(wb, "Uretim.xlsx")

    useAppToast().success(`${rows.length} kayıt Excel'e aktarıldı.`)
  } catch (e) {
    console.error("excelOutput", e)
    useAppToast().error("Excel oluşturulurken hata oluştu.")
  } finally {
    excelLoading.value = false
  }
}

/*
 * Veri cekimi NEDEN created() icinde degil: SSR created() icindeki async
 * isi BEKLEMEZ -- liste BOS serialize edilir, client hydration onu
 * devralir ve created() bir daha calismadigi icin tablo bos kalir
 * (bkz. commit 2afc877e3).
 *
 * server: false ZORUNLU -- legacy Express API'si SSR'in IC fetch yolunda
 * calismiyor (bkz. server/middleware/1.legacy-api.ts).
 */
await useAsyncData(
  "reports-mekmer-by-buying-production",
  async () => {
    const res = await useLegacyApi().get("/production/buying/price/list")
    list.value = res.data.list
    recalcTotal(res.data.list)
    return true
  },
  { server: false },
)
</script>

<!--
  pages/reports/mekmer/by-buying-production.vue

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] import { FilterMatchMode, FilterOperator } from "primevue/api/"
         -> import { FilterMatchMode } from "@primevue/core/api"
      PrimeVue 4'te "primevue/api" yolu YOK (orijinalde sondaki egik
      cizgi de vardi: "primevue/api/"). FilterMatchMode undefined kalirsa
      yedi kolonun matchMode'u da undefined olur ve filtreler sessizce
      calismaz.
      FilterOperator BIRLIKTE KALDIRILDI: ice aktariliyordu ama dosyada
      HIC KULLANILMIYORDU.

  [x] this.$axios -> useLegacyApi()
      Bu sayfa (store degil) DOGRUDAN $axios kullaniyordu. useLegacyApi
      axios sozlesmesini taklit ettigi icin `res.data.list` oldugu gibi
      kaldi. Ayrinti: app/composables/useLegacyApi.ts

  [x] created() -> useAsyncData({ server: false })
  [x] <Dropdown> -> <Select>        (PrimeVue 4'te yeniden adlandirildi)
  [x] :filters + @update:filters -> v-model:filters
      Nuxt 2'deki hali, Vue 2'nin :filters.sync'ini acan codemod
      ciktisiydi (bkz. mark0002 commit c569066e5).
  [x] class="p-button-info" -> severity="info"
      PrimeVue 4'te p-button-<severity> siniflari KALDIRILDI; sinif olarak
      birakilsa dugme varsayilan gorunurde kalirdi -- sessizce yanlis renk.
      (class="w-100" ayni birakildi, o bir yerlesim sinifi.)

  [x] <JsonExcel> -> xlsx ile uretilen Excel (excelOutput)
      vue-json-excel@0.3.0 YALNIZCA Vue 2 icin; Vue 3 surumu yok, pilota
      kurulamaz. Bu sayfadaki JsonExcel YORUMDA DEGILDI -- gercekten
      kullaniliyordu, yani tasimamak islev kaybi olurdu. Yerine
      app/components/order/ShippedList.vue'de kurulan desen kullanildi:
      dinamik `import("xlsx")` + aoa_to_sheet. Sutun basliklari, sirasi ve
      sayfa adi ("Çeki") birebir korundu.
      DEGISEN: dosya adi "Üretim.xls" -> "Uretim.xlsx". Eski ad
      yanilticiydi: JsonExcel .xls uzantisiyla aslinda HTML tablosu
      yaziyordu ve Excel bunu her acilista "bicim uyusmuyor" uyarisiyla
      aciyordu. Artik gercek bir xlsx uretiliyor.

  NEDEN TEK <script setup> (digier tasinan sayfalar Options API + ek
  setup blogu kullaniyor):
      O sayfalarin verisi Pinia store'larinda; setup blogu yalnizca store
      eylemini cagiriyor, durum bilesende tutulmuyor. BU sayfanin verisi
      ise tamamen YEREL (list / listTotal / years / filters1 -- store'a
      hic ugramiyor). Options API korunup veri setup blogunda cekilseydi,
      setup'in data()'ya yazmasi gerekirdi; bunun tek yolu
      getCurrentInstance().proxy gibi kirilgan bir kacamak olurdu.
      Yerel durumu ref'e cevirmek hem Vue 3 deyimi hem de daha az kod.

  DIKKAT -- NUXT 2'DE DE VAR OLAN DAVRANIS (korundu):
      Yil secimi ilk yuklemeyi ETKILEMEZ: created() yilsiz
      /production/buying/price/list ucunu cagirir (yani TUM yillar) ama
      selectedYear'i bu yila ayarlar. Yani ekran bu yil secili gorunurken
      icerik tum yillarin toplamidir; kullanici yili DEGISTIRENE kadar
      oyle kalir. Birebir korundu -- duzeltmek raporun ilk ekranda
      gosterdigi veriyi degistirir, bu ayri bir karar.

      filterSelected toplami YALNIZCA filtre olayinda yeniden hesaplar;
      sayfa degistirmek (paginator) toplami etkilemez. Bu da ayni kaldi.
-->
