<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-6">
          <Button severity="primary" class="w-100" label="Excel" @click="excelCheckList" />
        </div>
        <div class="col-6">
          <Button severity="primary" class="w-100" label="Etiket Excel" @click="excelLabels" />
        </div>
      </div>

      <DataTable
        :value="list"
        filterDisplay="row"
        v-model:filters="filtersCheck"
        scrollable
        scrollHeight="var(--app-table-height)"
        @filter="checkFilters($event)"
        rowGroupMode="rowspan"
        :groupRowsBy="['Sira']"
        :rowClass="crateGroupRowClass"
      >
        <Column
          v-for="col in columns"
          :key="col.header"
          :field="col.field"
          :header="col.header"
          :showFilterMenu="false"
          :showClearButton="false"
          headerClass="tableHeader"
          :bodyClass="col.groupCell ? 'crateGroupCell' : 'tableBody'"
        >
          <template v-if="col.net" #body="slotProps">
            {{ formatDecimal(crateGroupNet(slotProps.data)) }}
          </template>

          <template v-else-if="col.gross" #body="slotProps">
            {{ formatDecimal(crateGroupNet(slotProps.data) + crateTare) }}
          </template>

          <template v-else-if="col.decimal" #body="slotProps">
            {{ formatDecimal(slotProps.data[col.field]) }}
          </template>

          <template v-if="col.grossFooter" #footer>
            {{ formatDecimal(grossTotal) }}
          </template>

          <template v-else-if="col.footer" #footer>
            {{ formatDecimal(total?.[col.footer]) }}
          </template>

          <template v-if="col.filter" #filter="{ filterModel, filterCallback }">
            <InputText
              type="text"
              v-model="filterModel.value"
              class="p-column-filter"
              @input="filterCallback()"
            />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script>
// [1] DEGISTI: "primevue/api" -> "@primevue/core/api"
import { FilterMatchMode } from "@primevue/core/api"
import { useOrderStore } from "~/stores/order"

/*
 * 15 kolon, 250 satir sablon -- ucu disinda hepsi birebir ayniydi.
 * Tek bir v-for'a indirildi; SIRA KORUNDU (kolon sirasi ekranda anlamli).
 *   filter  : satir filtresi olan kolonlar (13 tane)
 *   decimal : govdesi formatDecimal ile basilanlar
 *   footer  : alt toplam gosterenler -> `total` prop'undaki alan adi
 */
const COLUMNS = [
  /*
   * groupCell: ortak kasa gruplamasinda hucresi kasa boyunca DIKEY
   *   BIRLESEN kolonlar (#, Net KG, Gross KG) -- bodyClass bu yuzden
   *   tableBody degil crateGroupCell.
   * net / gross: deger satirin degil KASANIN; govde crateGroupNet()'ten
   *   geliyor.
   * grossFooter: alt toplam `total` alanindan degil grossTotal
   *   computed'inden okunuyor.
   */
  { field: "Sira", header: "#", groupCell: true },
  /* TOTAL CASES buraya tasindi (upstream 8fbf9a8c6): kasa adedi
     "Crate No" kolonunun altinda anlamli, "Product" altinda degil. */
  { field: "KasaNo", header: "Crate No", filter: true, footer: "crate" },
  { field: "TedarikciAdi", header: "Supplier", filter: true },
  { field: "KategoriAdi", header: "Category", filter: true },
  { field: "UrunAdi", header: "Product", filter: true },
  { field: "YuzeyIslem", header: "Surface", filter: true },
  { field: "En", header: "Width", filter: true },
  { field: "Boy", header: "Height", filter: true },
  { field: "Kenar", header: "Thickness", filter: true },
  { field: "BirimAdi", header: "Unit", filter: true },
  { field: "KutuAdet", header: "Box", filter: true, decimal: true, footer: "box" },
  { field: "Adet", header: "Piece", filter: true, decimal: true, footer: "piece" },
  { field: "Miktar", header: "Amount", filter: true, decimal: true, footer: "amount" },
  /*
   * TEK "Ton" KOLONU IKIYE AYRILDI: Net KG ve Gross KG. Ikisi de
   * field="Sira" uzerinden gruplanir -- deger artik SATIRIN degil
   * KASANIN, dolayisiyla hucreler kasa boyunca birlesmeli.
   *
   * AGIRLIK FILTRESI KALDIRILDI: filtre satir degerine bakiyordu, oysa
   * gosterilen deger grubun toplami; kolonun gruplama alani uzerinden
   * calismasi gerekiyordu (upstream ayni karari verdi).
   */
  { field: "Sira", header: "Net KG", groupCell: true, net: true, footer: "ton" },
  { field: "Sira", header: "Gross KG", groupCell: true, gross: true, grossFooter: true },
  { field: "KasaOlcusu", header: "C.Size" },
]

export default {
  props: {
    list: {
      type: Array,
      required: false,
    },
    total: {
      type: Object,
      required: false,
    },
  },

  computed: {
    // [2] mapGetters([...]) -> Pinia store'lari
    orderStore() {
      return useOrderStore()
    },
    columns() {
      return COLUMNS
    },
    /*
     * Gross, kasa basina SABIT dara ile hesaplanir; ortak kasalar tek
     * kasa sayildigi icin dara da GRUP BASINA bir kez eklenir
     * (total.crate zaten grup basina 1 sayiyor -- bkz. stores/order.ts
     * MUT_setOrderProductionCheckListTotal).
     */
    grossTotal() {
      return (this.total?.ton || 0) + (this.total?.crate || 0) * this.crateTare
    },
  },

  data() {
    return {
      /* Ceki Excel'iyle AYNI dara (bkz. socket/web.py ceki_listesi_excel). */
      crateTare: 30,
      filtersCheck: Object.fromEntries(
        COLUMNS.filter((c) => c.filter).map((c) => [
          c.field,
          { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        ]),
      ),
    }
  },

  methods: {
    /* Ayni fiziksel kasayi paylasan satirlar hafif zeminle isaretlenir. */
    crateGroupRowClass(row) {
      return row.Ortak ? "crateGroupRow" : null
    },
    /*
     * Gruplama KAPALIYSA (api/sql/UretimTBKasaGrup.sql calistirilmadiysa)
     * GrupTon alani HIC GELMEZ; o durumda her satir kendi basina bir
     * kasadir ve kendi Ton degeri kullanilir -- davranis eskisiyle
     * birebir ayni kalir.
     */
    crateGroupNet(row) {
      return row.GrupTon === undefined || row.GrupTon === null
        ? row.Ton
        : row.GrupTon
    },
    checkFilters(event) {
      this.orderStore.setOrderProductionCheckListTotal(event.filteredValue)
    },

    async excelCheckList() {
      // [3] this.$excelApi -> useExcelApi()
      const excelApi = useExcelApi()
      const response = await excelApi.post("/excel/check/list", {
        list: this.list,
        po: this.orderStore.getOrderProductionPo,
      })
      if (response) {
        downloadFromExcelServer("excel/check/list", "check_list.xlsx")
      }
    },

    async excelLabels() {
      const excelApi = useExcelApi()
      const response = await excelApi.post("/excel/labels/list", {
        list: this.list,
        po: this.orderStore.getOrderProductionPo,
        customer: this.orderStore.getOrderProductionCustomer,
      })
      if (response) {
        downloadFromExcelServer("excel/labels/list", "check_list.xlsx")
      }
    },
  },
}
</script>

<style scoped>
/* Ayni fiziksel kasayi paylasan satirlar listede birlikte duruyor; hafif
   zemin hangi satirlarin tek kasa oldugunu bakista gosterir. */
:deep(.crateGroupRow) {
  background: #fff8e1;
}
/* Dikey birlesen hucreler (#, net, gross) icerigi ortada dursun. */
:deep(.crateGroupCell) {
  vertical-align: middle;
  text-align: center;
}
</style>

<!--
  components/orders/forms/check.vue -> app/components/orderDetail/CheckForm.vue

  DOSYA YOLU: Nuxt 2'de `orderDetailCheckForm` adiyla global kayitli; yol
  o adi uretecek sekilde secildi.

  ZORUNLU degisiklikler:
  [1] import { FilterMatchMode } from "primevue/api" -> "@primevue/core/api"
  [2] mapGetters(["getLocalUrl", "getOrderProductionPo",
      "getOrderProductionCustomer"]) -> Pinia store'lari.
      `getLocalUrl` artik hic gerekmiyor: indirme adresi
      useExcelApi.ts icindeki excelServerOrigin()'den geliyor, yani
      Excel sunucusunun adresi tek bir yerde (runtimeConfig).
  [3] this.$excelApi -> useExcelApi()  (app/composables/useExcelApi.ts)
      Nuxt 2 plugin'i enjekte edilen bir axios ornegiydi; pilotta plugin
      enjeksiyonu yok, composable var.
  [4] :filters + @update:filters -> v-model:filters
  [5] class="p-button-primary" -> severity="primary"

  DUZELTILEN HATALAR (Nuxt 2'de de vardi):
  [6] excel_test  : getLocalUrl + "excel/check/list"
      excel_labels: getLocalUrl + "/excel/labels/list"
      getLocalUrl sonda egik cizgiyle bittigi icin IKINCISI cift egik
      cizgi uretiyordu: ".../mekmar.com//excel/labels/list".
      downloadFromExcelServer() yolu normalize ediyor.
  [7] Olusturulan <a> ogesi DOM'dan hic kaldirilmiyordu; her indirmede
      body'ye bir olu dugum daha ekleniyordu. Artik link.remove().
  [8] Istek beklenmiyordu (.then icinde sonuc kontrolu vardi ama metot
      senkron bitiyordu) -> async/await.

  KALDIRILDI: excel_labels icindeki console.log(data) -- hata ayiklama
  artigi, her tiklamada tum liste konsola basiliyordu.

  SADELESTIRILDI: 15 kolonluk ~250 satirlik sablon tek v-for'a indirildi.
  Kolon sirasi, basliklar, hangi kolonda filtre/alt toplam/ondalik
  bicimleme oldugu birebir korundu (bkz. COLUMNS).

  ADLANDIRMA: excel_test -> excelCheckList, excel_labels -> excelLabels.
  "test" adi yanilticiydi; bu uc gercek check list excel'ini uretiyor.
  Yalnizca bu dosya icinde kullaniliyorlar (sablondaki @click), dis
  bagimlilik yok.

  EKLENDI: scrollable + scrollHeight (pilotun diger liste tablolariyla ayni)
-->
