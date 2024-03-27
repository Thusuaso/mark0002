<template>
  <div>
    <DataTable
      :value="list"
      paginator
      :rows="15"
      :filters.sync="filters1"
      filterDisplay="row"
      @filter="mekmerProductionFilter($event)"
      :loading="loading"
      class="p-datatable-sm"
    >
      <Column
        field="Tarih"
        header="Date"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ slotProps.data.Tarih | dateToString }}
        </template>
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @keyup.enter="filterDate(filterModel.value)"
            @input="filterDateInput(filterModel.value)"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column
        field="FirmaAdi"
        header="Supplier"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @keyup.enter="filterSupplier(filterModel.value)"
            @input="filterSupplierInput(filterModel.value)"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column
        field="KategoriAdi"
        header="Category"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @keyup.enter="filterCategory(filterModel.value)"
            @input="filterCategoryInput(filterModel.value)"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column
        field="KasaNo"
        header="Crate No"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @keyup.enter="filterCrate(filterModel.value)"
            @input="filterCrateInput(filterModel.value)"
            class="p-column-filter"
          />
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
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @keyup.enter="filterProduct(filterModel.value)"
            @input="filterProductInput(filterModel.value)"
            class="p-column-filter"
          />
        </template>
        <template #footer>
          {{ total.crate | formatDecimal }}
        </template>
      </Column>
      <Column
        field="OcakAdi"
        header="Mine"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @keyup.enter="filterMine(filterModel.value)"
            @input="filterMineInput(filterModel.value)"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column
        field="YuzeyIslemAdi"
        header="Surface"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @keyup.enter="filterSurface(filterModel.value)"
            @input="filterSurfaceInput(filterModel.value)"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column
        field="En"
        header="Width"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @keyup.enter="filterWidth(filterModel.value)"
            @input="filterWidthInput(filterModel.value)"
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
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @keyup.enter="filterHeight(filterModel.value)"
            @input="filterHeightInput(filterModel.value)"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column
        field="Kenar"
        header="Edge"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @keyup.enter="filterEdge(filterModel.value)"
            @input="filterEdgeInput(filterModel.value)"
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
          {{ total.amount | formatDecimal }}
        </template>
      </Column>
      <Column field="Adet" header="Piece" headerClass="tableHeader" bodyClass="tableBody">
        <template #body="slotProps">
          {{ slotProps.data.Adet | formatDecimal }}
        </template>
        <template #footer>
          {{ total.piece | formatDecimal }}
        </template>
      </Column>
      <Column
        field="BirimAdi"
        header="Unit"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @keyup.enter="filterUnit(filterModel.value)"
            @input="filterUnitInput(filterModel.value)"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column
        field="SiparisAciklama"
        header="Po"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @keyup.enter="filterPo(filterModel.value)"
            @input="filterPoInput(filterModel.value)"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column
        field="Aciklama"
        header="Description"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @keyup.enter="filterDescription(filterModel.value)"
            @input="filterDescriptionInput(filterModel.value)"
            class="p-column-filter"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script>
import { FilterMatchMode } from "primevue/api";
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
    loading: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      filterModel: {
        date: "",
        supplier: "",
        category: "",
        crate: "",
        product: "",
        mine: "",
        surface: "",
        width: "",
        height: "",
        edge: "",
        amount: "",
        unit: "",
        po: "",
        description: "",
      },
      filters1: {
        Tarih: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        FirmaAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        KategoriAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        KasaNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        UrunAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        OcakAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        YuzeyIslemAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        En: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Boy: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Kenar: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        BirimAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        SiparisAciklama: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Aciklama: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Miktar: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
    };
  },
  methods: {
    filterDescriptionInput(event) {
      if (event) {
        this.filterModel.description = event;
      } else {
        this.filterModel.description = "";
      }
    },
    filterDescription(event) {
      if (event) {
        this.filterModel.description = event;
        this.$store.dispatch("setProductionFilterList", this.filterModel);
      } else {
        if (this.resetFilter()) {
          this.$store.dispatch("setReportsMekmerProductionList");
        } else {
          this.$store.dispatch("setProductionFilterList", this.filterModel);
        }
      }
    },

    filterPoInput(event) {
      if (event) {
        this.filterModel.po = event;
      } else {
        this.filterModel.po = "";
      }
    },
    filterPo(event) {
      if (event) {
        this.filterModel.po = event;
        this.$store.dispatch("setProductionFilterList", this.filterModel);
      } else {
        if (this.resetFilter()) {
          this.$store.dispatch("setReportsMekmerProductionList");
        } else {
          this.$store.dispatch("setProductionFilterList", this.filterModel);
        }
      }
    },

    filterUnitInput(event) {
      if (event) {
        this.filterModel.unit = event;
      } else {
        this.filterModel.unit = "";
      }
    },
    filterUnit(event) {
      if (event) {
        this.filterModel.unit = event;
        this.$store.dispatch("setProductionFilterList", this.filterModel);
      } else {
        if (this.resetFilter()) {
          this.$store.dispatch("setReportsMekmerProductionList");
        } else {
          this.$store.dispatch("setProductionFilterList", this.filterModel);
        }
      }
    },

    filterEdgeInput(event) {
      if (event) {
        this.filterModel.edge = event;
      } else {
        this.filterModel.edge = "";
      }
    },
    filterEdge(event) {
      if (event) {
        this.filterModel.edge = event;
        this.$store.dispatch("setProductionFilterList", this.filterModel);
      } else {
        if (this.resetFilter()) {
          this.$store.dispatch("setReportsMekmerProductionList");
        } else {
          this.$store.dispatch("setProductionFilterList", this.filterModel);
        }
      }
    },

    filterHeightInput(event) {
      if (event) {
        this.filterModel.height = event;
      } else {
        this.filterModel.height = "";
      }
    },
    filterHeight(event) {
      if (event) {
        this.filterModel.height = event;
        this.$store.dispatch("setProductionFilterList", this.filterModel);
      } else {
        if (this.resetFilter()) {
          this.$store.dispatch("setReportsMekmerProductionList");
        } else {
          this.$store.dispatch("setProductionFilterList", this.filterModel);
        }
      }
    },

    filterWidthInput(event) {
      if (event) {
        this.filterModel.width = event;
      } else {
        this.filterModel.width = "";
      }
    },
    filterWidth(event) {
      if (event) {
        this.filterModel.width = event;
        this.$store.dispatch("setProductionFilterList", this.filterModel);
      } else {
        if (this.resetFilter()) {
          this.$store.dispatch("setReportsMekmerProductionList");
        } else {
          this.$store.dispatch("setProductionFilterList", this.filterModel);
        }
      }
    },

    filterSurfaceInput(event) {
      if (event) {
        this.filterModel.surface = event;
      } else {
        this.filterModel.surface = "";
      }
    },
    filterSurface(event) {
      if (event) {
        this.filterModel.surface = event;
        this.$store.dispatch("setProductionFilterList", this.filterModel);
      } else {
        if (this.resetFilter()) {
          this.$store.dispatch("setReportsMekmerProductionList");
        } else {
          this.$store.dispatch("setProductionFilterList", this.filterModel);
        }
      }
    },

    filterMineInput(event) {
      if (event) {
        this.filterModel.mine = event;
      } else {
        this.filterModel.mine = "";
      }
    },
    filterMine(event) {
      if (event) {
        this.filterModel.mine = event;
        this.$store.dispatch("setProductionFilterList", this.filterModel);
      } else {
        if (this.resetFilter()) {
          this.$store.dispatch("setReportsMekmerProductionList");
        } else {
          this.$store.dispatch("setProductionFilterList", this.filterModel);
        }
      }
    },

    filterProductInput(event) {
      if (event) {
        this.filterModel.product = event;
      } else {
        this.filterModel.product = "";
      }
    },
    filterProduct(event) {
      if (event) {
        this.filterModel.product = event;
        this.$store.dispatch("setProductionFilterList", this.filterModel);
      } else {
        if (this.resetFilter()) {
          this.$store.dispatch("setReportsMekmerProductionList");
        } else {
          this.$store.dispatch("setProductionFilterList", this.filterModel);
        }
      }
    },

    filterCrateInput(event) {
      if (event) {
        this.filterModel.crate = event;
      } else {
        this.filterModel.crate = "";
      }
    },
    filterCrate(event) {
      if (event) {
        this.filterModel.crate = event;
        this.$store.dispatch("setProductionFilterList", this.filterModel);
      } else {
        if (this.resetFilter()) {
          this.$store.dispatch("setReportsMekmerProductionList");
        } else {
          this.$store.dispatch("setProductionFilterList", this.filterModel);
        }
      }
    },

    filterCategoryInput(event) {
      if (event) {
        this.filterModel.category = event;
      } else {
        this.filterModel.category = "";
      }
    },
    filterCategory(event) {
      if (event) {
        this.filterModel.category = event;
        this.$store.dispatch("setProductionFilterList", this.filterModel);
      } else {
        if (this.resetFilter()) {
          this.$store.dispatch("setReportsMekmerProductionList");
        } else {
          this.$store.dispatch("setProductionFilterList", this.filterModel);
        }
      }
    },

    filterSupplierInput(event) {
      if (event) {
        this.filterModel.supplier = event;
      } else {
        this.filterModel.supplier = "";
      }
    },
    filterSupplier(event) {
      if (event) {
        this.filterModel.supplier = event;
        this.$store.dispatch("setProductionFilterList", this.filterModel);
      } else {
        if (this.resetFilter()) {
          this.$store.dispatch("setReportsMekmerProductionList");
        } else {
          this.$store.dispatch("setProductionFilterList", this.filterModel);
        }
      }
    },

    filterDateInput(event) {
      if (event) {
        this.filterModel.date = event;
      } else {
        this.filterModel.date = "";
      }
    },
    filterDate(event) {
      if (event) {
        this.filterModel.date = event;
        this.$store.dispatch("setProductionFilterList", this.filterModel);
      } else {
        if (this.resetFilter()) {
          this.$store.dispatch("setReportsMekmerProductionList");
        } else {
          this.$store.dispatch("setProductionFilterList", this.filterModel);
        }
      }
    },

    resetFilter() {
      if (
        this.filterModel.date == "" &&
        this.filterModel.supplier == "" &&
        this.filterModel.category == "" &&
        this.filterModel.crate == "" &&
        this.filterModel.product == "" &&
        this.filterModel.mine == "" &&
        this.filterModel.surface == "" &&
        this.filterModel.width == "" &&
        this.filterModel.height == "" &&
        this.filterModel.edge == "" &&
        this.filterModel.amount == "" &&
        this.filterModel.unit == "" &&
        this.filterModel.po == "" &&
        this.filterModel.description == ""
      ) {
        return true;
      } else {
        return false;
      }
    },

    mekmerProductionFilter(event) {
      this.$store.dispatch("setReportsMekmerProductionTotal", event.filteredValue);
    },
  },
};
</script>
