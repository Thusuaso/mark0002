<template>
  <div>
    <div v-if="!isRendering" class="text-center p-5">
      <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i> Tablo
      Yükleniyor...
    </div>
    <div v-if="isRendering">
      <DataTable
        :value="list"
        rowGroupMode="rowspan"
        :groupRowsBy="['YuklemeTarihi', 'SiparisNo', 'FirmaAdi', 'PI']"
        v-model:selection="selectedProduction"
        :selectionMode="userId != 48 ? 'multiple' : ''"
        @row-click="$emit('production_selected_emit', $event.data)"
        class="p-datatable-sm"
        :paginator="true"
        :rows="25"
        style="font-size: 70%; border: 2px solid gray; cursor: pointer"
        filterDisplay="row"
        v-model:filters="filtersShipped"
        v-if="status == 'Shipped 2'"
        sortField="YuklemeTarihi"
        :sortOrder="-1"
        :rowClass="rowClass2"
        @filter="filtersProduction($event)"
        columnResizeMode="fit"
        showGridlines
        responsiveLayout="scroll"
      >
        <template #header>
          <div class="flex justify-content-between align-items-center">
            <DatePicker
              v-model="selectedYear"
              view="year"
              dateFormat="yy"
              showIcon
              @date-select="yearSelected($event)"
            />
            <Button
              severity="success" class="p-button-sm ml-2"
              icon="pi pi-file-excel"
              label="Excel'e Aktar"
              :loading="excelLoading"
              @click="excelOutput"
            />
          </div>
          Alış Fiyatı - {{ formatPriceUsd(totals) }}
          <span class="ml-3" style="font-size: 90%; opacity: 0.7">
            ({{ exportRows.length }} kayıt{{ isFiltered ? " - filtreli" : "" }})
          </span>
        </template>
        <Column header="#" headerStyle="width:3rem;font-size:16px;">
          <template #body="slotProps">
            {{ slotProps.index + 1 }}
          </template>
        </Column>
        <Column
          field="YuklemeTarihi"
          header="Load Date"
          :showFilterMenu="false"
          :showClearButton="false"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ dateToString(slotProps.data.YuklemeTarihi) }}
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
          field="FirmaAdi"
          header="Customer"
          :showFilterMenu="false"
          :showClearButton="false"
          headerClass="tableHeader"
          bodyClass="tableBody"
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
          field="SiparisNo"
          header="Po"
          :showFilterMenu="false"
          :showClearButton="false"
          headerClass="tableHeader"
          bodyClass="tableBody"
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
          field="PI"
          header="PI"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            <div v-if="slotProps.data.EvrakDurum > 0">
              <!--
                [x] <a ACILIS ETIKETI EKSIKTI -- Nuxt 2 kaynaginda da yoktu.
                Bu satir BOSTU, dolayisiyla :href ortada kaliyor ve
                </a> eslesmiyordu. Vue 2 derleyicisi bunu TOLERE ediyor
                (verify-templates.mjs 215 sablonun tamaminda 0 hata
                raporluyor), Vue 3 ise "Invalid end tag" ile derlemeyi
                KESIYOR. Yani PI indirme linki Nuxt 2'de de bozuktu.
                order/Table.vue'daki (list.vue) dogru hali esas alindi.
              -->
              <a
                :href="
                  'https://file-service.mekmar.com/file/download/2/' +
                  slotProps.data.SiparisNo
                "
              >
                <i class="pi pi-download" />
              </a>
            </div>
            <div v-else>
              <a>
                <i class="pi pi-download" />
              </a>
            </div>
          </template>
        </Column>
        <Column
          field="UrunAdi"
          header="Product"
          :showFilterMenu="false"
          :showClearButton="false"
          headerClass="tableHeader"
          bodyClass="tableBody"
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
          field="UrunUretimAciklama"
          header="Details"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
        </Column>
        <Column
          field="En"
          header="Width"
          :showFilterMenu="false"
          :showClearButton="false"
          headerClass="tableHeader"
          bodyClass="tableBody"
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
          field="Boy"
          header="Height"
          :showFilterMenu="false"
          :showClearButton="false"
          headerClass="tableHeader"
          bodyClass="tableBody"
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
          field="Kenar"
          header="Thickness"
          :showFilterMenu="false"
          :showClearButton="false"
          headerClass="tableHeader"
          bodyClass="tableBody"
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
          field="UrunFirmaAdi"
          header="Supplier"
          :showFilterMenu="false"
          :showClearButton="false"
          headerClass="tableHeader"
          bodyClass="tableBody"
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
          field="Miktar"
          header="Amount"
          :showFilterMenu="false"
          :showClearButton="false"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ formatDecimal(slotProps.data.Miktar) }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              class="p-column-filter"
            />
          </template>
          <template #footer>
            {{ formatDecimal(totalamount) }}
          </template>
        </Column>
        <Column
          field="BirimAdi"
          header="Unit"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ slotProps.data.BirimAdi }}
          </template>
        </Column>
        <Column
          field="Ton"
          header="Ton"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ formatDecimal(slotProps.data.Ton) }}
          </template>
          <template #footer>
            {{ formatDecimal(totalton) }}
          </template>
        </Column>
        <Column
          field="SatisFiyati"
          header="Price (Selling)"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ formatPriceUsd(slotProps.data.SatisFiyati) }}
          </template>
        </Column>
        <Column
          header="Total (Selling)"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ formatPriceUsd((slotProps.data.SatisFiyati * slotProps.data.Miktar)) }}
          </template>
          <template #footer>
            {{ formatPriceUsd(totalsPurchase) }}
          </template>
        </Column>
        <Column
          field="AlisFiyati"
          header="Price (Puchase)"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ formatPriceUsd(slotProps.data.AlisFiyati) }}
          </template>
          <template #footer>
            {{ formatPriceUsd(totalbuying) }}
          </template>
        </Column>
        <Column
          header="Total (Puchase)"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ formatPriceUsd((slotProps.data.AlisFiyati * slotProps.data.Miktar)) }}
          </template>
          <template #footer>
            {{ formatPriceUsd(totals) }}
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>
<script>
import { useOrderStore } from "~/stores/order"
import { FilterMatchMode } from "@primevue/core/api";
export default {
  props: {
    list: {
      type: Array,
      required: false,
    },
    status: {
      type: String,
      required: true,
    },
    total: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isRendering: true,
      excelLoading: false,
      filteredList: null,
      selectedYear: null,
      totalbuying: 0,
      totalton: 0,
      totalamount: 0,
      userId: 0,
      totalsPurchase: 0,
      totals: 0,
      filtersShipped: {
        YuklemeTarihi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        FirmaAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        SiparisNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        UrunAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        En: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Boy: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Kenar: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        UrunFirmaAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Miktar: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      globalSearch: null,
      selectedProduction: null,
      filtersOrders: {
        SiparisTarihi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        YuklemeTarihi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        FirmaAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        SiparisNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        UrunAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        En: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Boy: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Kenar: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        UrunFirmaAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Miktar: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
    };
  },
  computed: {
    orderStore() {
      return useOrderStore()
    },
    isFiltered() {
      return Object.values(this.filtersShipped).some(
        (f) => f && f.value !== null && f.value !== ""
      );
    },
    exportRows() {
      if (this.isFiltered && Array.isArray(this.filteredList)) {
        return this.filteredList;
      }
      return this.list || [];
    },
  },
  watch: {
    list() {
      // Yeni veri geldiğinde eski filtre sonucu geçersiz
      this.filteredList = null;
    },
  },
  created() {
    this.__totalSum(this.list);
    this.userId = useCookie("userId").value;
  },
  methods: {
    /* ---------------- EXCEL ---------------- */
    async excelOutput() {
      const rows = this.exportRows;
      if (!rows.length) {
        useAppToast().warn("Aktarılacak kayıt bulunamadı.");
        return;
      }

      this.excelLoading = true;
      try {
        const XLSX = await import("xlsx");

        const USD = '"$"#,##0.00';
        const DEC = "#,##0.00";
        const DATE = "dd.mm.yyyy";

        const headers = [
          "#",
          "Load Date",
          "Customer",
          "PO",
          "PI",
          "Product",
          "Details",
          "Width",
          "Height",
          "Thickness",
          "Supplier",
          "Amount",
          "Unit",
          "Ton",
          "Price (Selling)",
          "Total (Selling)",
          "Price (Purchase)",
          "Total (Purchase)",
        ];

        const aoa = [headers];
        const links = []; // { r, c, target }

        let tAmount = 0,
          tTon = 0,
          tSelling = 0,
          tPurchase = 0;

        // Ekrandaki sıralamayla aynı: YuklemeTarihi DESC
        const sorted = [...rows].sort(
          (a, b) =>
            this.__toDate(b.YuklemeTarihi) - this.__toDate(a.YuklemeTarihi)
        );

        sorted.forEach((x, i) => {
          const miktar = this.__num(x.Miktar);
          const ton = this.__num(x.Ton);
          const satis = this.__num(x.SatisFiyati);
          const alis = this.__num(x.AlisFiyati);

          tAmount += miktar;
          tTon += ton;
          tSelling += satis * miktar;
          tPurchase += alis * miktar;

          const d = this.__toDate(x.YuklemeTarihi);

          aoa.push([
            i + 1,
            d ? d : this.__str(x.YuklemeTarihi),
            this.__str(x.FirmaAdi),
            this.__str(x.SiparisNo),
            x.EvrakDurum > 0 ? "PI İndir" : "-",
            this.__str(x.UrunAdi),
            this.__str(x.UrunUretimAciklama),
            this.__str(x.En),
            this.__str(x.Boy),
            this.__str(x.Kenar),
            this.__str(x.UrunFirmaAdi),
            miktar,
            this.__str(x.BirimAdi),
            ton,
            satis,
            satis * miktar,
            alis,
            alis * miktar,
          ]);

          if (x.EvrakDurum > 0 && x.SiparisNo) {
            links.push({
              r: aoa.length - 1,
              c: 4,
              target:
                "https://file-service.mekmar.com/file/download/2/" +
                x.SiparisNo,
            });
          }
        });

        const lastDataRow = aoa.length; // 1-indexed (header dahil)

        aoa.push([]);
        const totalRow = new Array(headers.length).fill("");
        totalRow[0] = "TOPLAM";
        totalRow[11] = tAmount;
        totalRow[13] = tTon;
        totalRow[15] = tSelling;
        totalRow[17] = tPurchase;
        aoa.push(totalRow);

        const ws = XLSX.utils.aoa_to_sheet(aoa, { cellDates: true });

        ws["!cols"] = [
          { wch: 5 },  { wch: 12 }, { wch: 26 }, { wch: 14 }, { wch: 10 },
          { wch: 30 }, { wch: 26 }, { wch: 10 }, { wch: 10 }, { wch: 11 },
          { wch: 24 }, { wch: 12 }, { wch: 8 },  { wch: 10 }, { wch: 14 },
          { wch: 16 }, { wch: 14 }, { wch: 16 },
        ];
        ws["!freeze"] = { xSplit: 0, ySplit: 1 };
        ws["!autofilter"] = { ref: `A1:R${lastDataRow}` };

        // Hücre formatları
        const fmt = {
          1: DATE,
          11: DEC,
          13: DEC,
          14: USD,
          15: USD,
          16: USD,
          17: USD,
        };
        const range = XLSX.utils.decode_range(ws["!ref"]);
        for (let R = 1; R <= range.e.r; R++) {
          Object.entries(fmt).forEach(([C, z]) => {
            const cell = ws[XLSX.utils.encode_cell({ r: R, c: Number(C) })];
            if (cell && (cell.t === "n" || cell.t === "d")) cell.z = z;
          });
        }

        // PI hyperlink'leri
        links.forEach((l) => {
          const addr = XLSX.utils.encode_cell({ r: l.r, c: l.c });
          if (ws[addr]) ws[addr].l = { Target: l.target, Tooltip: "PI İndir" };
        });

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Shipped");

        const yil = this.selectedYear
          ? new Date(this.selectedYear).getFullYear()
          : new Date().getFullYear();
        const suffix = this.isFiltered ? "_filtreli" : "";
        XLSX.writeFile(wb, `shipped_${yil}${suffix}.xlsx`);

        useAppToast().success(`${sorted.length} kayıt Excel'e aktarıldı.`);
      } catch (e) {
        console.error("excelOutput", e);
        useAppToast().error("Excel oluşturulurken hata oluştu.");
      } finally {
        this.excelLoading = false;
      }
    },
    __num(val) {
      if (val === null || val === undefined || val === "") return 0;
      if (typeof val === "number") return isFinite(val) ? val : 0;
      const n = parseFloat(String(val).replace(/\s/g, "").replace(",", "."));
      return isNaN(n) || !isFinite(n) ? 0 : n;
    },
    __str(val) {
      return val === null || val === undefined ? "" : String(val);
    },
    __toDate(val) {
      if (!val) return null;
      if (val instanceof Date) return isNaN(val.getTime()) ? null : val;
      if (typeof val === "string") {
        // 12.05.2026
        const tr = val.match(/^(\d{2})\.(\d{2})\.(\d{4})/);
        if (tr) return new Date(+tr[3], +tr[2] - 1, +tr[1]);
        // 2026-05-12...
        const iso = val.match(/^(\d{4})-(\d{2})-(\d{2})/);
        if (iso) return new Date(+iso[1], +iso[2] - 1, +iso[3]);
      }
      const d = new Date(val);
      return isNaN(d.getTime()) ? null : d;
    },
    /* --------------- /EXCEL ---------------- */

    yearSelected(event) {
      const date = new Date(event);
      const year = date.getFullYear();
      this.orderStore.setOrderShippedMekmer2ListYears(year);
    },
    /*
     * KALDIRILDI: shippedFiltered(event)
     *
     * Iki kere olu:
     *   1) Hicbir yerden cagrilmiyor (sablonda da yok).
     *   2) Cagrilsa da ise yaramazdi -- dispatch ettigi ad
     *        " shipped setOrderProductionTotal"
     *      yani BASINDA BOSLUK ve fazladan kelimeler var. store/modules
     *      altinda boyle bir action YOK; Vuex bunu "unknown action type"
     *      diye konsola yazip hicbir sey yapmazdi.
     * Bu yuzden map-store-refs.mjs de adi cozemedi ve `$store.dispatch`
     * olarak biraktı -- iyi oldu, aksi halde sessizce gecip giderdi.
     */
    filtersProduction(event) {
      this.filteredList = event.filteredValue || [];
      this.__totalSum(this.filteredList);
    },
    __totalSum(val) {
      this.totals = 0;
      this.totalsPurchase = 0;
      this.totalamount = 0;
      this.totalton = 0;
      this.totalbuying = 0;
      (val || []).forEach((x) => {
        this.totals +=
          this.__noneControl(x.AlisFiyati) * this.__noneControl(x.Miktar);
        this.totalsPurchase +=
          this.__noneControl(x.SatisFiyati) * this.__noneControl(x.Miktar);
        this.totalamount += this.__noneControl(x.Miktar);
        this.totalton += this.__noneControl(x.Ton);
        this.totalbuying += this.__noneControl(x.AlisFiyati);
      });
    },
    __noneControl(val) {
      if (val == null || val == undefined || val == "") {
        return 0;
      } else {
        return val;
      }
    },
    ordersFilter(event) {
      this.orderStore.setOrderProductionTotal(event.filteredValue);
    },
    rowClass2(event) {
      const userId = useCookie("userId").value;
      if (event.SiparisSahibi == userId || event.Operasyon == userId)
        return "row-accessories";
      else return "row-accessories-border";
    },
    globalSearchFilterInput(event) {
      if (!event) {
        this.orderStore.setOrderShippedList();
      }
    },
    globalSearchFilter(event) {
      if (event.target._value) {
        this.orderStore.setFilterShipmentGlobal(event.target._value);
      } else {
        this.orderStore.setOrderShippedList();
      }
    },
    /*
     * KALDIRILDI: 19 filtre metodu + __controlFilter + filterModel data'si
     *
     * filterShipment<Alan>Input / filterShipment<Alan> (9+9) ve
     * __controlFilter, list.vue'dan KOPYALANMIS ama bu dosyada HIC
     * BAGLANMAMISTI: sablon bu metotlarin hicbirini cagirmiyor
     * (Nuxt 2 kaynaginda da 0 eslesme).
     *
     * Ilk hamlede bunlari list.vue'da yaptigim gibi filterSet /
     * filterApply / isFilterEmpty'ye indirmistim -- ama o da yine olu
     * kod olurdu, sadece daha azi. Tamami kaldirildi.
     *
     * `filterModel` data alani da birlikte gitti: yalnizca o metotlar
     * okuyordu. DIKKAT -- sablondaki `filterModel` AYNI SEY DEGIL:
     *     <template #filter="{ filterModel, filterCallback }">
     * orada PrimeVue'nun Column'a verdigi SLOT PROP'u destructure
     * ediliyor ve component data'sini golgeliyor. Bu yuzden data alani
     * kullanilmiyor gorunmesine ragmen sablon calismaya devam ediyor.
     */

    /*
     * KALDIRILDI: productSupplier(event) ve productSupplierNull(event)
     *
     * Ikisi de document.getElementById("productSupplier" + UrunId) ile
     * bir ogeyi bulup innerHTML'ini degistiriyordu. Ne bu dosyanin
     * sablonunda boyle bir id var (0 eslesme), ne de metotlar hicbir
     * yerden cagriliyor -- cagrilsalardi getElementById null donecegi
     * icin "Cannot set properties of null" ile patlarlardi.
     * Ayni olu cift components/orders/lists/list.vue (-> order/Table.vue)
     * ve components/orders/lists/shipped.vue dosyalarinda da var.
     */
  },
};
</script>
<style scoped>
.colorChange {
  background-color: yellow;
}

:deep(.row-accessories) {
  border: 2px solid #414241 !important;
  background-color: #ccede2 !important;
}
:deep(.row-accessories-border) {
  border: 2px solid #313131 !important;
}
</style>
<!--
  components/orders/lists/shipped.vue -> app/components/order/ShippedList.vue

  DOSYA YOLU: Nuxt 2'de `orderShippedList` adiyla global kayitli;
  order/ShippedList.vue bunu uretiyor. (PrimeVue'da `OrderShippedList`
  diye bir bilesen yok -- check-name-collisions.mjs ile dogrulandi.)

  Mekanik donusumler:
  [1] 1x  import ... "primevue/api" -> "@primevue/core/api"
  [2] 2x  :x + @update:x -> v-model:x
  [3] 1x  <Calendar> -> <DatePicker>
  [4] 1x  p-button-* -> severity
  [5] 7x  dispatch -> Pinia action
  [6] store computed'i EKLENDI (mapGetters yoktu, yalnizca dispatch vardi)

  ELLE:
  [7] 2x Cookies.get -> useCookie
  [8] this.$toast -> useAppToast()
      `.warning(...)` -> `.warn(...)`: PrimeVue 4'te seviye adi "warn".
      Ayrica `this.$toast && this.$toast.x(...)` savunma kontrolleri
      kaldirildi -- useAppToast() her zaman bir nesne donuyor.

  KALDIRILAN OLU KOD (ayrintilar yerlerinde):
  [9]  19 filtre metodu + __controlFilter + `filterModel` data alani.
       list.vue'dan KOPYALANMIS ama bu dosyada HIC BAGLANMAMIS -- sablon
       hicbirini cagirmiyor (Nuxt 2 kaynaginda da 0 eslesme). Ilk hamlede
       list.vue'da yaptigim gibi 3 metoda indirmistim; fark ettim ki o da
       olu kod olurdu, tamami kaldirildi.
       DIKKAT: sablondaki `filterModel` AYNI SEY DEGIL -- PrimeVue'nun
       Column slot prop'u, component data'sini golgeliyor.
  [10] shippedFiltered(event). Iki kere olu: hic cagrilmiyor VE dispatch
       ettigi ad " shipped setOrderProductionTotal" -- basinda bosluk ve
       fazladan kelimeler, store'da boyle bir action yok. Vuex "unknown
       action type" yazip hicbir sey yapmazdi.
  [11] productSupplier() / productSupplierNull(). Ucuncu dosyada da ayni
       olu cift (order/Table.vue ve Table2.vue'dan da kaldirildi).
-->
