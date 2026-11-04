<template>
  <div>
    <DataTable
      ref="dt"
      :value="list"
      :paginator="true"
      :rows="10"
      v-model:filters="filteredOldOffers"
      filterDisplay="row"
      :selection="selectedOldOffer"
      selectionMode="single"
      @value-change="onValueChange"
      @row-click="$emit('old_offers_selected_emit', $event)"
    >
      <template #header>
        <div class="table-header">
          <span class="record-count">{{ exportRows.length }} kayıt</span>
          <Button
            icon="pi pi-file-excel"
            label="Excel'e Aktar"
            severity="success"
            size="small"
            :disabled="!exportRows.length"
            @click="exportExcel"
          />
        </div>
      </template>

      <Column
        field="Sira"
        header="Id"
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
        field="Tarih"
        header="Date"
        :showFilterMenu="false"
        :showClearButton="false"
      >
        <template #body="slotProps">
          {{ dateToString(slotProps.data.Tarih) }}
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

      <!-- Sira ile Price ARASINDAKI sekiz ardisik kolon: ucu de birebir
           ayni (yalnizca filtre girisi, body slot'u yok). -->
      <Column
        v-for="col in middleColumns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
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
        field="Price"
        header="Price"
        :showFilterMenu="false"
        :showClearButton="false"
      >
        <template #body="slotProps">
          {{ formatPriceUsd(slotProps.data.Price) }}
        </template>
      </Column>

      <!-- Price'tan SONRAKI iki kolon. -->
      <Column
        v-for="col in tailColumns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
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
    </DataTable>
  </div>
</template>

<script>
import { FilterMatchMode } from "@primevue/core/api"
/*
 * GOSTERIM bicimi ("02-10-2026") -- ACIK IMPORT.
 * Bu dosyada DOGRU olan formatters.js surumu, utils/dates.ts'teki ISO
 * surumu DEGIL: hem tablodaki Date kolonu hem de Excel'deki Date
 * kolonu kullaniciya gosterilen metin. Auto-import de zaten
 * formatters.js'i seciyor, ama hangi surumun kullanildigi burada
 * belirleyici oldugu icin acikca yaziliyor (bkz. alt not).
 */
import { dateToString as displayDate } from "~/utils/formatters"

export default {
  props: {
    list: {
      type: Array,
      required: false,
      default: () => [],
    },
    fileName: {
      type: String,
      required: false,
      default: "eski-teklifler",
    },
  },
  emits: ["old_offers_selected_emit"],
  data() {
    return {
      selectedOldOffer: null,
      // DataTable @value-change ile doldurulur (filtre + siralama sonrasi tum satirlar)
      filteredList: null,
      filteredOldOffers: {
        Sira: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Tarih: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Customer: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Country: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Category: { value: null, matchMode: FilterMatchMode.STARTS_WITH },

        Product: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Surface: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Size: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Edge: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Birim: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Username: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Mail: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      /* Sablondaki iki v-for -- KOLON SIRASI kaynaktakiyle birebir. */
      middleColumns: [
        { field: "Customer", header: "Customer" },
        { field: "Country", header: "Country" },
        { field: "Category", header: "Category" },
        { field: "Product", header: "Product" },
        { field: "Surface", header: "Surface" },
        { field: "Size", header: "Size" },
        { field: "Edge", header: "Thickness" },
        { field: "Birim", header: "Unit" },
      ],
      tailColumns: [
        { field: "Username", header: "Representative" },
        { field: "Mail", header: "Mail" },
      ],
      // Excel kolon sirasi ve basliklari -- tablodaki header'larla birebir
      exportColumns: [
        { field: "Sira", header: "Id" },
        { field: "Tarih", header: "Date", type: "date" },
        { field: "Customer", header: "Customer" },
        { field: "Country", header: "Country" },
        { field: "Category", header: "Category" },
        { field: "Product", header: "Product" },
        { field: "Surface", header: "Surface" },
        { field: "Size", header: "Size" },
        { field: "Edge", header: "Thickness" },
        { field: "Birim", header: "Unit" },
        { field: "Price", header: "Price", type: "number" },
        { field: "Username", header: "Representative" },
        { field: "Mail", header: "Mail" },
      ],
    }
  },
  computed: {
    // Filtre uygulanmissa filtrelenmis satirlar, yoksa tum liste
    exportRows() {
      if (this.filteredList) return this.filteredList
      const dt = this.$refs.dt
      if (dt && (dt.processedData || dt.filteredValue)) {
        return dt.processedData || dt.filteredValue
      }
      return this.list || []
    },
  },
  methods: {
    onValueChange(value) {
      this.filteredList = value
    },

    /*
     * KAYNAKTAKI HALI VUE 3'TE SESSIZCE BASKA BICIM URETIYORDU --
     * bkz. alt nottaki "[1] $options.filters".
     */
    formatDate(value) {
      if (!value) return ""
      return displayDate(value)
    },

    buildSheetData(rows) {
      return rows.map((row) => {
        const item = {}
        this.exportColumns.forEach((col) => {
          const raw = row[col.field]
          if (col.type === "date") {
            item[col.header] = this.formatDate(raw)
          } else if (col.type === "number") {
            item[col.header] =
              raw === null || raw === undefined || raw === ""
                ? null
                : Number(raw)
          } else {
            item[col.header] = raw === null || raw === undefined ? "" : raw
          }
        })
        return item
      })
    },

    async exportExcel() {
      const rows = this.exportRows
      if (!rows || !rows.length) return

      /*
       * DINAMIK IMPORT: xlsx paketi diskte 7.2 MB ve yalnizca bu butona
       * basildiginda gerekiyor. Statik import, sayfayi acan HERKESE
       * indiriyordu. Pilotun geri kalani zaten boyle yapiyor
       * (order/ShippedList.vue, reports/mekmer/{by-buying-production,
       * calculating-cost,finance}.vue).
       */
      const XLSX = await import("xlsx")

      const headers = this.exportColumns.map((c) => c.header)
      const data = this.buildSheetData(rows)

      const worksheet = XLSX.utils.json_to_sheet(data, { header: headers })

      // Price hucrelerine para formati
      const priceIndex = headers.indexOf("Price")
      if (priceIndex > -1) {
        for (let r = 1; r <= data.length; r++) {
          const ref = XLSX.utils.encode_cell({ r: r, c: priceIndex })
          if (worksheet[ref] && worksheet[ref].t === "n") {
            worksheet[ref].z = '"$"#,##0.00'
          }
        }
      }

      // Kolon genislikleri
      worksheet["!cols"] = headers.map((header) => {
        const lengths = data.map((row) => String(row[header] || "").length)
        return {
          wch: Math.min(40, Math.max(header.length + 2, ...lengths) + 2),
        }
      })

      // Baslik satirini dondur
      worksheet["!freeze"] = { xSplit: "0", ySplit: "1" }

      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, "Teklifler")

      const stamp = new Date().toISOString().slice(0, 10)

      /*
       * XLSX.write + file-saver'in saveAs'i -> XLSX.writeFile.
       * file-saver pilota KURULMADI (package.json'da yok) ve import'u
       * derlemeyi dusuruyor. writeFile indirmeyi kendisi tetikliyor,
       * cikan dosya ayni. (reports/mekmar/country-order.vue ile ayni
       * karar.)
       */
      XLSX.writeFile(workbook, `${this.fileName}-${stamp}.xlsx`)
    },
  },
}
</script>

<style scoped>
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.record-count {
  font-size: 0.875rem;
  color: #6b7280;
}
</style>

<!--
  components/offers/old.vue -> app/components/offer/Old.vue

  Otomatik ice alma adi `OfferOld` -- Nuxt 2'deki global kayit adiyla
  AYNI (plugins/components.js:76).

  ============================================================
  [1] $options.filters -- VUE 3'TE YOK, EXCEL TARIHI BOZULUYORDU
  ============================================================
  Kaynak formatDate():
      const filter = this.$options.filters && this.$options.filters.dateToString
      if (filter) return filter(value)
      const d = new Date(value)
      return isNaN(d.getTime()) ? value : d.toLocaleDateString("tr-TR")

  Vue 2'de `$options.filters.dateToString` VARDI (plugins/components.js
  Vue.filter ile kaydediyor) ve "02-10-2026" donduruyordu.

  Vue 3'te FILTRE API'SI TAMAMEN KALDIRILDI -> `this.$options.filters`
  undefined. Yani `if (filter)` HIC dogru olmaz ve kod sessizce yedek
  dala duser:
      toLocaleDateString("tr-TR")  ->  "02.10.2026"
  Derleme hatasi YOK, uyari YOK: yalnizca Excel'deki Date kolonu
  noktali bicime donerdi -- ve tablodaki ayni kolon tireli kalirdi,
  yani ayni ekranda iki farkli tarih bicimi.

  Dogrudan `~/utils/formatters`ten dateToString import edildi; cikti
  Nuxt 2'dekiyle birebir ayni ("02-10-2026") ve tablo ile Excel artik
  ayni fonksiyonu kullaniyor.

  (Bu dosyada DOGRU olan formatters.js surumu; utils/dates.ts'teki
  toIsoDate API'ye YAZARKEN kullaniliyor -- burada hicbir sey
  yazilmiyor, yalnizca gosteriliyor. Ayrim offer/Form.vue'nun alt
  notunda ayrintili.)

  == DIGER ZORUNLU DEGISIKLIKLER ==

  [x] import { FilterMatchMode } from "primevue/api/"
         -> "@primevue/core/api"
      (Kaynakta yol SONDA EGIK CIZGIYLE yaziliydi -- "primevue/api/".
       Alt paket v4'te zaten TAMAMEN kaldirildi.)
  [x] file-saver / saveAs -> XLSX.writeFile  (yukaridaki nota bak)
  [x] import * as XLSX from "xlsx" -> exportExcel() icinde
      `await import("xlsx")`. Paket diskte 7.2 MB ve yalnizca Excel
      butonuna basildiginda gerekiyor; statik import onu ilk pakete
      sokuyordu. Pilotun diger dort xlsx cagri yeri zaten dinamik --
      bu dosya tasinirken kaynaktaki statik yazim oldugu gibi
      birakilmisti (commit 74bf590b7).
  [x] :filters + @update:filters -> v-model:filters
  [x] responsiveLayout="scroll" KALDIRILDI (prop v4'te YOK; v3'teki
      davranis artik varsayilan)
  [x] class="p-button-success p-button-sm"
         -> severity="success" size="small"   (v4 karsiliklari)
  [x] `list` prop'una `default: () => []`
  [x] `emits: ["old_offers_selected_emit"]` bildirildi

  [x] On ardisik ayni <Column> blogu IKI v-for'a indi
      (middleColumns 8 + tailColumns 2). SIRA kaynaktakiyle birebir:
          Sira · Tarih · [middle 8] · Price · [tail 2]
      Sira/Tarih/Price donguye ALINMADI cunku ucu de farkli:
      Tarih'in #body'si var, Price'in #body'si var ama FILTRESI YOK,
      Sira ise dongunun basladigi yerden once.

  == KORUNAN DAVRANISLAR (bilincli) ==

  1) `:selection="selectedOldOffer"` TEK YONLU BIRAKILDI (v-model
     YAPILMADI). Kaynakta da @update:selection yoktu, yani secilen
     satir hicbir zaman geri yazilmiyor ve satir vurgulanmiyor; secim
     isi tamamen @row-click ile yuruyor. v-model'e cevirmek satirlarin
     artik vurgulanmasi demek olurdu -- gorunur degisiklik.
     (Kardes bilesenlerde @update:selection VARDI ve orada v-model'e
     cevrildi; buradaki eksiklik kaynakta da vardi.)

  2) `exportRows` computed'i `this.$refs.dt`e bakiyor. Bir computed
     icinde ref okumak REAKTIF DEGIL: ref degistiginde computed
     yeniden hesaplanmaz. Pratikte sorun cikmiyor cunku birincil yol
     `filteredList` ve o @value-change ile guncelleniyor (reaktif);
     ref dali yalnizca ilk render'da, henuz hic value-change
     gelmemisken yedek. Kaynakta da aynen boyle; duzeltmek
     (ornegin watch'a tasimak) davranis degisikligi riski tasiyor.

  3) `worksheet["!freeze"]` BIRAKILDI ama ETKISI YOK: dondurulmus
     bolme (freeze panes) SheetJS'in topluluk surumunde
     DESTEKLENMIYOR, ozellik sessizce yok sayiliyor. Kaynakta da
     etkisizdi; silmek yerine korundu cunku niyet belli ve ileride
     Pro surume gecilirse anlam kazanir.
-->
