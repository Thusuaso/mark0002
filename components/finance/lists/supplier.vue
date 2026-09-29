<template>
  <div class="container">
    <DataTable
      :value="purchaseList"
      :filters.sync="filters"
      filterDisplay="row"
      @filter="filterSelected($event)"
      :globalFilterFields="['FirmaAdi', 'SiparisNo']"
      scrollable
      scrollHeight="550px"
      :selection.sync="selectedPurchase"
      selectionMode="single"
      @row-click="purchaseSelected($event)"
    >
      <template #empty>Kayıt bulunamadı.</template>

      <Column
        field="FirmaAdi"
        header="Firma"
        :sortable="true"
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
        header="Sipariş No"
        :sortable="true"
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
        field="SiparisTarihi"
        header="Sipariş Tarihi"
        :sortable="true"
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
        <template #body="slotProps">
          {{ formatDate(slotProps.data.SiparisTarihi) }}
        </template>
      </Column>

      <Column
        field="YuklemeTarihi"
        header="Yükleme Tarihi"
        :sortable="true"
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
        <template #body="slotProps">
          {{ formatDate(slotProps.data.YuklemeTarihi) }}
        </template>
      </Column>

      <Column
        field="KalanTutar"
        header="Kalan Tutar"
        :sortable="true"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ formatCurrency(slotProps.data.KalanTutar) }}
        </template>
        <template #footer>
          {{ formatCurrency(total) }}
        </template>
      </Column>
    </DataTable>

    <Dialog :visible.sync="purchase_detail_list_visible" modal>
      <financePurchaseDetailList />
    </Dialog>
  </div>
</template>

<script>
import { FilterMatchMode } from "primevue/api";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      purchase_detail_list_visible: false,
      selectedPurchase: {},
      // null = henüz filtre uygulanmadı, tam liste geçerli
      filteredList: null,
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        FirmaAdi: { value: null, matchMode: FilterMatchMode.CONTAINS },
        SiparisNo: { value: null, matchMode: FilterMatchMode.CONTAINS },
        SiparisTarihi: { value: null, matchMode: FilterMatchMode.CONTAINS },
        YuklemeTarihi: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
    };
  },

  computed: {
    ...mapGetters([
      "getFinancePurchaseMainList",
      "getFinancePurchaseDetailList",
    ]),

    purchaseList() {
      const list = this.getFinancePurchaseMainList;
      return Array.isArray(list) ? list : [];
    },

    // Toplamın kaynağı: filtre varsa filtrelenmiş liste, yoksa tam liste
    visibleList() {
      return Array.isArray(this.filteredList)
        ? this.filteredList
        : this.purchaseList;
    },

    total() {
      return this.visibleList.reduce(
        (sum, r) => sum + Number(r.KalanTutar || 0),
        0
      );
    },
  },

  watch: {
    // Store'dan liste yenilenirse eski filtre sonucu bayatlamasın
    getFinancePurchaseMainList() {
      this.filteredList = null;
    },
  },

  mounted() {
    this.$store.dispatch("setFinancePurchaseMainList");
  },

  methods: {
    filterSelected(event) {
      this.filteredList = event.filteredValue;
    },

    purchaseSelected(event) {
      const data = {
        po: event.data.SiparisNo,
        supplier: event.data.MusteriId,
      };
      this.$store.dispatch("setFinancePurchaseDetail", data);
      this.purchase_detail_list_visible = true;
    },

    formatCurrency(value) {
      return new Intl.NumberFormat("tr-TR", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      }).format(Number(value || 0));
    },

    formatDate(value) {
      if (!value) return "";
      const d = new Date(value);
      if (isNaN(d)) return "";
      return new Intl.DateTimeFormat("tr-TR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(d);
    },
  },
};
</script>

<style scoped></style>
