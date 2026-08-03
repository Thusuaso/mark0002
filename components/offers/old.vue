<template>
  <div>
    <DataTable
      ref="dt"
      :value="list"
      responsiveLayout="scroll"
      :paginator="true"
      :rows="10"
      :filters.sync="filteredOldOffers"
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
            class="p-button-success p-button-sm"
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
          {{ slotProps.data.Tarih | dateToString }}
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
        field="Customer"
        header="Customer"
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
        field="Country"
        header="Country"
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
        field="Category"
        header="Category"
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
        field="Product"
        header="Product"
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
        field="Surface"
        header="Surface"
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
        field="Size"
        header="Size"
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
        field="Edge"
        header="Thickness"
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
        field="Birim"
        header="Unit"
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
          {{ slotProps.data.Price | formatPriceUsd }}
        </template>
      </Column>

      <Column
        field="Username"
        header="Representative"
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
        field="Mail"
        header="Mail"
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
import { FilterMatchMode } from "primevue/api/";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default {
  props: {
    list: {
      type: Array,
      required: false,
    },
    fileName: {
      type: String,
      required: false,
      default: "eski-teklifler",
    },
  },
  data() {
    return {
      selectedOldOffer: null,
      // DataTable @value-change ile doldurulur (filtre + sıralama sonrası tüm satırlar)
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
      // Excel kolon sırası ve başlıkları — tablodaki header'larla birebir
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
    };
  },
  computed: {
    // Filtre uygulanmışsa filtrelenmiş satırlar, yoksa tüm liste
    exportRows() {
      if (this.filteredList) return this.filteredList;
      const dt = this.$refs.dt;
      if (dt && (dt.processedData || dt.filteredValue)) {
        return dt.processedData || dt.filteredValue;
      }
      return this.list || [];
    },
  },
  methods: {
    onValueChange(value) {
      this.filteredList = value;
    },

    formatDate(value) {
      if (!value) return "";
      const filter =
        this.$options.filters && this.$options.filters.dateToString;
      if (filter) return filter(value);
      const d = new Date(value);
      return isNaN(d.getTime()) ? value : d.toLocaleDateString("tr-TR");
    },

    buildSheetData(rows) {
      return rows.map((row) => {
        const item = {};
        this.exportColumns.forEach((col) => {
          const raw = row[col.field];
          if (col.type === "date") {
            item[col.header] = this.formatDate(raw);
          } else if (col.type === "number") {
            item[col.header] =
              raw === null || raw === undefined || raw === ""
                ? null
                : Number(raw);
          } else {
            item[col.header] = raw === null || raw === undefined ? "" : raw;
          }
        });
        return item;
      });
    },

    exportExcel() {
      const rows = this.exportRows;
      if (!rows || !rows.length) return;

      const headers = this.exportColumns.map((c) => c.header);
      const data = this.buildSheetData(rows);

      const worksheet = XLSX.utils.json_to_sheet(data, { header: headers });

      // Price hücrelerine para formatı
      const priceIndex = headers.indexOf("Price");
      if (priceIndex > -1) {
        for (let r = 1; r <= data.length; r++) {
          const ref = XLSX.utils.encode_cell({ r: r, c: priceIndex });
          if (worksheet[ref] && worksheet[ref].t === "n") {
            worksheet[ref].z = '"$"#,##0.00';
          }
        }
      }

      // Kolon genişlikleri
      worksheet["!cols"] = headers.map((header) => {
        const lengths = data.map((row) => String(row[header] || "").length);
        return {
          wch: Math.min(40, Math.max(header.length + 2, ...lengths) + 2),
        };
      });

      // Başlık satırını dondur
      worksheet["!freeze"] = { xSplit: "0", ySplit: "1" };

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Teklifler");

      const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      const stamp = new Date().toISOString().slice(0, 10);

      saveAs(
        new Blob([buffer], { type: "application/octet-stream" }),
        `${this.fileName}-${stamp}.xlsx`
      );
    },
  },
};
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
