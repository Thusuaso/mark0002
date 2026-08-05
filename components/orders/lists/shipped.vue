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
        :selection.sync="selectedProduction"
        :selectionMode="userId != 48 ? 'multiple' : ''"
        @row-click="$emit('production_selected_emit', $event.data)"
        class="p-datatable-sm"
        :paginator="true"
        :rows="25"
        style="font-size: 70%; border: 2px solid gray; cursor: pointer"
        filterDisplay="row"
        :filters.sync="filtersShipped"
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
            <Calendar
              v-model="selectedYear"
              view="year"
              dateFormat="yy"
              showIcon
              @date-select="yearSelected($event)"
            />
            <Button
              class="p-button-success p-button-sm ml-2"
              icon="pi pi-file-excel"
              label="Excel'e Aktar"
              :loading="excelLoading"
              @click="excelOutput"
            />
          </div>
          Alış Fiyatı - {{ totals | formatPriceUsd }}
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
            {{ slotProps.data.YuklemeTarihi | dateToString }}
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
            {{ slotProps.data.Miktar | formatDecimal }}
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
            {{ totalamount | formatDecimal }}
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
            {{ slotProps.data.Ton | formatDecimal }}
          </template>
          <template #footer>
            {{ totalton | formatDecimal }}
          </template>
        </Column>
        <Column
          field="SatisFiyati"
          header="Price (Selling)"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ slotProps.data.SatisFiyati | formatPriceUsd }}
          </template>
        </Column>
        <Column
          header="Total (Selling)"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{
              (slotProps.data.SatisFiyati * slotProps.data.Miktar)
                | formatPriceUsd
            }}
          </template>
          <template #footer>
            {{ totalsPurchase | formatPriceUsd }}
          </template>
        </Column>
        <Column
          field="AlisFiyati"
          header="Price (Puchase)"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ slotProps.data.AlisFiyati | formatPriceUsd }}
          </template>
          <template #footer>
            {{ totalbuying | formatPriceUsd }}
          </template>
        </Column>
        <Column
          header="Total (Puchase)"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{
              (slotProps.data.AlisFiyati * slotProps.data.Miktar)
                | formatPriceUsd
            }}
          </template>
          <template #footer>
            {{ totals | formatPriceUsd }}
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>
<script>
import { FilterMatchMode } from "primevue/api";
import Cookies from "js-cookie";
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
      filterModel: {
        loaddate: "",
        company: "",
        po: "",
        product: "",
        width: "",
        height: "",
        edge: "",
        supplier: "",
        amount: "",
      },
    };
  },
  computed: {
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
    this.userId = Cookies.get("userId");
  },
  methods: {
    /* ---------------- EXCEL ---------------- */
    async excelOutput() {
      const rows = this.exportRows;
      if (!rows.length) {
        this.$toast && this.$toast.warning("Aktarılacak kayıt bulunamadı.");
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

        this.$toast &&
          this.$toast.success(`${sorted.length} kayıt Excel'e aktarıldı.`);
      } catch (e) {
        console.error("excelOutput", e);
        this.$toast && this.$toast.error("Excel oluşturulurken hata oluştu.");
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
      this.$store.dispatch("setOrderShippedMekmer2ListYears", year);
    },
    shippedFiltered(event) {
      this.$store.dispatch(
        " shipped setOrderProductionTotal",
        event.filteredValue
      );
    },
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
      this.$store.dispatch("setOrderProductionTotal", event.filteredValue);
    },
    rowClass2(event) {
      const userId = Cookies.get("userId");
      if (event.SiparisSahibi == userId || event.Operasyon == userId)
        return "row-accessories";
      else return "row-accessories-border";
    },
    globalSearchFilterInput(event) {
      if (!event) {
        this.$store.dispatch("setOrderShippedList");
      }
    },
    globalSearchFilter(event) {
      if (event.target._value) {
        this.$store.dispatch("setFilterShipmentGlobal", event.target._value);
      } else {
        this.$store.dispatch("setOrderShippedList");
      }
    },
    filterShipmentAmountInput(event) {
      this.filterModel.amount = event ? event : "";
    },
    filterShipmentSupplierInput(event) {
      this.filterModel.supplier = event ? event : "";
    },
    filterShipmentEdgeInput(event) {
      this.filterModel.edge = event ? event : "";
    },
    filterShipmentHeightInput(event) {
      this.filterModel.height = event ? event : "";
    },
    filterShipmentWidthInput(event) {
      this.filterModel.width = event ? event : "";
    },
    filterShipmentProductInput(event) {
      this.filterModel.product = event ? event : "";
    },
    filterShipmentPoInput(event) {
      this.filterModel.po = event ? event : "";
    },
    filterShipmentCompanyInput(event) {
      this.filterModel.company = event ? event : "";
    },
    filterShipmentLoadDateInput(event) {
      this.filterModel.loaddate = event ? event : "";
    },
    filterShipmentAmount(event) {
      this.filterModel.amount = event ? event : "";
      this.__dispatchFilter();
    },
    filterShipmentSupplier(event) {
      this.filterModel.supplier = event ? event : "";
      this.__dispatchFilter();
    },
    filterShipmentEdge(event) {
      this.filterModel.edge = event ? event : "";
      this.__dispatchFilter();
    },
    filterShipmentHeight(event) {
      this.filterModel.height = event ? event : "";
      this.__dispatchFilter();
    },
    filterShipmentWidth(event) {
      this.filterModel.width = event ? event : "";
      this.__dispatchFilter();
    },
    filterShipmentProduct(event) {
      if (event) {
        if (event.split(" ").length == 1) {
          this.filterModel.product =
            event.charAt(0).toUpperCase() + event.slice(1);
        } else {
          this.filterModel.product = "";
          event.split(" ").forEach((x) => {
            this.filterModel.product +=
              x.charAt(0).toUpperCase() + x.slice(1) + " ";
          });
          this.filterModel.product = this.filterModel.product.trim();
        }
      } else {
        this.filterModel.product = "";
      }
      this.__dispatchFilter();
    },
    filterShipmentPo(event) {
      this.filterModel.po = event ? event : "";
      this.__dispatchFilter();
    },
    filterShipmentCompany(event) {
      this.filterModel.company = event ? event : "";
      this.__dispatchFilter();
    },
    filterShipmentLoadDate(event) {
      this.filterModel.loaddate = event ? event : "";
      this.__dispatchFilter();
    },
    __dispatchFilter() {
      if (this.__controlFilter()) {
        this.$store.dispatch("setOrderShippedList");
      } else {
        this.$store.dispatch("filterShipment", this.filterModel);
      }
    },
    __controlFilter() {
      return (
        this.filterModel.loaddate == "" &&
        this.filterModel.company == "" &&
        this.filterModel.po == "" &&
        this.filterModel.product == "" &&
        this.filterModel.width == "" &&
        this.filterModel.height == "" &&
        this.filterModel.edge == "" &&
        this.filterModel.supplier == "" &&
        this.filterModel.amount == ""
      );
    },
    productSupplierNull(event) {
      const vm = document.getElementById("productSupplier" + event.UrunId);
      vm.innerHTML = event.UrunFirmaAdi;
      vm.className = "";
    },
    productSupplier(event) {
      const vm = document.getElementById("productSupplier" + event.UrunId);
      if (event.Isf == 0) {
        vm.innerHTML = "Isf Eksik";
        vm.className = "colorChange";
      }
    },
  },
  mounted() {
    setTimeout(() => {
      this.isRendering = true;
    }, 150);
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