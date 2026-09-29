<template>
  <div class="purchase-detail">
    <DataTable
      :value="getFinancePurchaseDetailList"
      :filters.sync="filters"
      :loading="loading"
      :paginator="true"
      :rows="20"
      :rows-per-page-options="[10, 20, 50, 100]"
      data-key="ID"
      sort-field="KalanTutar"
      :sort-order="-1"
      filter-display="row"
      responsive-layout="scroll"
      class="p-datatable-sm p-datatable-gridlines"
      current-page-report-template="{first} - {last} / {totalRecords}"
      paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :selection="selectedSupplierFinance"
      selectionMode="single"
      @row-click="supplierFinanceSelected($event)"
    >
      <template #header>
        <div class="table-header">
          <h3>Satın Alma Detayı</h3>
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText v-model="filters['global']" placeholder="Ara..." />
          </span>
        </div>
      </template>

      <template #empty>Kayıt bulunamadı.</template>
      <template #loading>Veriler yükleniyor...</template>

      <Column
        field="FirmaAdi"
        header="Firma"
        :sortable="true"
        filter
        filter-match-mode="contains"
        style="min-width: 200px"
      />

      <Column
        field="SiparisNo"
        header="Sipariş No"
        :sortable="true"
        filter
        filter-match-mode="contains"
        style="min-width: 130px"
      />

      <Column
        field="TedarikciAdi"
        header="Tedarikçi"
        :sortable="true"
        filter
        filter-match-mode="contains"
        style="min-width: 160px"
      />

      <Column
        field="Donem"
        header="Dönem"
        :sortable="true"
        filter
        filter-match-mode="contains"
        style="min-width: 110px"
      >
        <template #body="{ data }">
          {{ formatDonem(data) }}
        </template>
      </Column>

      <Column
        field="KalanTutar"
        header="Kalan Tutar"
        :sortable="true"
        header-class="col-right"
        body-class="col-right"
        style="min-width: 140px"
      >
        <template #body="{ data }">
          {{ formatCurrency(data.KalanTutar) }}
        </template>
      </Column>

      <ColumnGroup type="footer">
        <Row>
          <Column footer="Toplam" :colspan="4" footer-class="col-right" />
          <Column :footer="formatCurrency(total)" footer-class="col-right" />
        </Row>
      </ColumnGroup>
    </DataTable>
    <Dialog :visible.sync="finance_supplier_form_visible" header="" modal>
      <financePurchaseForm :financePaid="financePaid" />
    </Dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "PurchaseDetailTable",

  props: {
    // Dışarıdan da beslenebilsin diye; boş bırakılırsa store'dan alınır
    items: {
      type: Array,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      filters: {},
      finance_supplier_form_visible: false,
      financePaid: {},
    };
  },

  computed: {
    ...mapGetters(["getFinancePurchaseDetailList"]),

    rows() {
      const source = this.items || this.getFinancePurchaseDetailList;
      // Donem alanı global arama ve filtre için satıra ekleniyor
      return source.map((r) => ({
        ...r,
        Donem: this.formatDonem(r),
      }));
    },

    total() {
      return this.rows.reduce((sum, r) => sum + (Number(r.KalanTutar) || 0), 0);
    },
  },

  methods: {
    supplierFinanceSelected(event) {
      this.finance_supplier_form_visible = true;
      this.financePaid = event.data;
    },
    formatCurrency(value) {
      const n = Number(value) || 0;
      return n.toLocaleString("tr-TR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },

    formatDonem(row) {
      if (!row || !row.Year || !row.Month) return "";
      return `${String(row.Month).padStart(2, "0")}/${row.Year}`;
    },
  },
};
</script>

<style scoped>
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.table-header h3 {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
}

::v-deep .col-right {
  text-align: right !important;
}

::v-deep .p-column-footer {
  font-weight: 600;
}
</style>
