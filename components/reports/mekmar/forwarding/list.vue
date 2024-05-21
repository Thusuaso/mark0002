<template>
  <div>
    <DataTable :value="list" paginator :rows="15" :filters.sync="filters1" filterDisplay="row"
      @filter="reportsMekmarForwardingFiltered($event)" class="p-datatable-sm" style="font-size: 70%" :loading="loading"
      v-if="!dates">
      <Column field="Tarih" header="Date" :showFilterMenu="false" :showClearButton="false" headerClass="tableHeader"
        bodyClass="tableBody">
        <template #body="slotProps">
          {{ slotProps.data.Tarih | dateToString }}
        </template>
        <template #filter="{ filterModel }">
          <InputText v-model="filterModel.value" type="text" @keyup.enter="filterDate(filterModel.value)"
            @keyup.stop="filterDate(filterModel.value)" @input="filterDateInput(filterModel.value)"
            class="p-column-filter" />
        </template>
      </Column>
      <Column field="FirmaAdi" header="Customer" :showFilterMenu="false" :showClearButton="false"
        headerClass="tableHeader" bodyClass="tableBody">
        <template #filter="{ filterModel }">
          <InputText v-model="filterModel.value" type="text" @keyup.enter="filterTo(filterModel.value)"
            @keyup.stop="filterTo(filterModel.value)" @input="filterToInput(filterModel.value)"
            class="p-column-filter" />
        </template>
      </Column>
      <Column field="TedarikciAdi" header="Supplier" :showFilterMenu="false" :showClearButton="false"
        headerClass="tableHeader" bodyClass="tableBody">
        <template #filter="{ filterModel }">
          <InputText v-model="filterModel.value" type="text" @keyup.enter="filterFromWho(filterModel.value)"
            @keyup.stop="filterFromWho(filterModel.value)" @input="filterFromWhoInput(filterModel.value)"
            class="p-column-filter" />
        </template>
      </Column>
      <Column field="UrunKartId" header="Product Id" :showFilterMenu="false" :showClearButton="false"
        headerClass="tableHeader" bodyClass="tableBody">
        <template #filter="{ filterModel }">
          <InputText v-model="filterModel.value" type="text" @keyup.enter="filterProductId(filterModel.value)"
            @keyup.stop="filterProductId(filterModel.value)" @input="filterProductIdInput(filterModel.value)"
            class="p-column-filter" />
        </template>
      </Column>
      <Column field="KasaNo" header="Crate" :showFilterMenu="false" :showClearButton="false" headerClass="tableHeader"
        bodyClass="tableBody">
        <template #filter="{ filterModel }">
          <InputText v-model="filterModel.value" type="text" @keyup.enter="filterCrate(filterModel.value)"
            @keyup.stop="filterCrate(filterModel.value)" @input="filterCrateInput(filterModel.value)"
            class="p-column-filter" />
        </template>
      </Column>
      <Column field="OcakAdi" header="Quarry" :showFilterMenu="false" :showClearButton="false" headerClass="tableHeader"
        bodyClass="tableBody">
        <template #filter="{ filterModel }">
          <InputText v-model="filterModel.value" type="text" @keyup.enter="filterMine(filterModel.value)"
            @keyup.stop="filterMine(filterModel.value)" @input="filterMineInput(filterModel.value)"
            class="p-column-filter" />
        </template>
      </Column>
      <Column field="KategoriAdi" header="Category" :showFilterMenu="false" :showClearButton="false"
        headerClass="tableHeader" bodyClass="tableBody">
        <template #filter="{ filterModel }">
          <InputText v-model="filterModel.value" type="text" @keyup.enter="filterCategory(filterModel.value)"
            @keyup.stop="filterCategory(filterModel.value)" @input="filterCategoryInput(filterModel.value)"
            class="p-column-filter" />
        </template>
      </Column>
      <Column field="UrunAdi" header="Product" :showFilterMenu="false" :showClearButton="false"
        headerClass="tableHeader" bodyClass="tableBody">
        <template #footer>
          {{ total.crate | formatDecimal }}
        </template>
        <template #filter="{ filterModel }">
          <InputText v-model="filterModel.value" type="text" @keyup.enter="filterProduct(filterModel.value)"
            @keyup.stop="filterProduct(filterModel.value)" @input="filterProductInput(filterModel.value)"
            class="p-column-filter" />
        </template>
      </Column>
      <Column field="YuzeyIslemAdi" header="Surface" :showFilterMenu="false" :showClearButton="false"
        headerClass="tableHeader" bodyClass="tableBody">
        <template #filter="{ filterModel }">
          <InputText v-model="filterModel.value" type="text" @keyup.enter="filterSurface(filterModel.value)"
            @keyup.stop="filterSurface(filterModel.value)" @input="filterSurfaceInput(filterModel.value)"
            class="p-column-filter" />
        </template>
      </Column>
      <Column field="En" header="Width" :showFilterMenu="false" :showClearButton="false" headerClass="tableHeader"
        bodyClass="tableBody">
        <template #filter="{ filterModel }">
          <InputText v-model="filterModel.value" type="text" @keyup.enter="filterWidth(filterModel.value)"
            @keyup.stop="filterWidth(filterModel.value)" @input="filterWidthInput(filterModel.value)"
            class="p-column-filter" />
        </template>
      </Column>
      <Column field="Boy" header="Height" :showFilterMenu="false" :showClearButton="false" headerClass="tableHeader"
        bodyClass="tableBody">
        <template #filter="{ filterModel }">
          <InputText v-model="filterModel.value" type="text" @keyup.enter="filterHeight(filterModel.value)"
            @keyup.stop="filterHeight(filterModel.value)" @input="filterHeightInput(filterModel.value)"
            class="p-column-filter" />
        </template>
      </Column>
      <Column field="Kenar" header="Thickness" :showFilterMenu="false" :showClearButton="false"
        headerClass="tableHeader" bodyClass="tableBody">
        <template #filter="{ filterModel }">
          <InputText v-model="filterModel.value" type="text" @keyup.enter="filterEdge(filterModel.value)"
            @keyup.stop="filterEdge(filterModel.value)" @input="filterEdgeInput(filterModel.value)"
            class="p-column-filter" />
        </template>
      </Column>
      <Column field="KutuAdet" header="Box in Crate" :showFilterMenu="false" :showClearButton="false"
        headerClass="tableHeader" bodyClass="tableBody">
        <template #footer>
          {{ total.box | formatDecimal }}
        </template>
        <template #filter="{ filterModel }">
          <InputText v-model="filterModel.value" type="text" @keyup.enter="filterBox(filterModel.value)"
            @keyup.stop="filterBox(filterModel.value)" @input="filterBoxInput(filterModel.value)"
            class="p-column-filter" />
        </template>
      </Column>
      <Column field="Adet" header="Piece in Crate" :showFilterMenu="false" :showClearButton="false"
        headerClass="tableHeader" bodyClass="tableBody">
        <template #body="slotProps">
          {{ slotProps.data.Adet | formatDecimal }}
        </template>
        <template #footer>
          {{ total.piece | formatDecimal }}
        </template>
        <template #filter="{ filterModel }">
          <InputText v-model="filterModel.value" type="text" @keyup.enter="filterPiece(filterModel.value)"
            @keyup.stop="filterPiece(filterModel.value)" @input="filterPieceInput(filterModel.value)"
            class="p-column-filter" />
        </template>
      </Column>
      <Column field="Miktar" header="Amount" :showFilterMenu="false" :showClearButton="false" headerClass="tableHeader"
        bodyClass="tableBody">
        <template #body="slotProps">
          {{ slotProps.data.Miktar | formatDecimal }}
        </template>
        <template #footer>
          {{ total.amount | formatDecimal }}
        </template>
        <template #filter="{ filterModel }">
          <InputText v-model="filterModel.value" type="text" @keyup.enter="filterAmount(filterModel.value)"
            @keyup.stop="filterAmount(filterModel.value)" @input="filterAmountInput(filterModel.value)"
            class="p-column-filter" />
        </template>
      </Column>
      <Column field="BirimAdi" header="Unit" :showFilterMenu="false" :showClearButton="false" headerClass="tableHeader"
        bodyClass="tableBody">
        <template #filter="{ filterModel }">
          <InputText v-model="filterModel.value" type="text" @keyup.enter="filterUnit(filterModel.value)"
            @keyup.stop="filterUnit(filterModel.value)" @input="filterUnitInput(filterModel.value)"
            class="p-column-filter" />
        </template>
      </Column>
      <Column field="SiparisAciklama" header="Po" :showFilterMenu="false" :showClearButton="false"
        headerClass="tableHeader" bodyClass="tableBody">
        <template #filter="{ filterModel }">
          <InputText v-model="filterModel.value" type="text" @keyup.enter="filterPo(filterModel.value)"
            @keyup.stop="filterPo(filterModel.value)" @input="filterPoInput(filterModel.value)"
            class="p-column-filter" />
        </template>
      </Column>
      <Column field="BirimFiyat" header="Price" headerClass="tableHeader" bodyClass="tableBody">
        <template #body="slotProps">
          {{ slotProps.data.BirimFiyat | formatPriceUsd }}
        </template>
      </Column>
      <Column field="Toplam" header="Total" headerClass="tableHeader" bodyClass="tableBody" v-if="!getAuthorityStatus">
        <template #body="slotProps">
          {{ slotProps.data.Toplam | formatPriceUsd }}
        </template>
        <template #footer>
          {{ total.total | formatPriceUsd }}
        </template>
      </Column>
    </DataTable>

    <DataTable :value="list" paginator :rows="15" :filters.sync="filters2" filterDisplay="row"
      @filter="reportsMekmarForwardingFiltered($event)" class="p-datatable-sm" style="font-size: 70%" :loading="loading"
      v-if="dates">
      <Column field="Tarih" header="Date" :showFilterMenu="false" :showClearButton="false" headerClass="tableHeader"
        bodyClass="tableBody">
        <template #body="slotProps">
          {{ slotProps.data.Tarih | dateToString }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="FirmaAdi" header="Customer" :showFilterMenu="false" :showClearButton="false"
        headerClass="tableHeader" bodyClass="tableBody">
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="TedarikciAdi" header="Supplier" :showFilterMenu="false" :showClearButton="false"
        headerClass="tableHeader" bodyClass="tableBody">
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="UrunKartId" header="Product Id" :showFilterMenu="false" :showClearButton="false"
        headerClass="tableHeader" bodyClass="tableBody">
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="KasaNo" header="Crate" :showFilterMenu="false" :showClearButton="false" headerClass="tableHeader"
        bodyClass="tableBody">
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="OcakAdi" header="Quarry" :showFilterMenu="false" :showClearButton="false" headerClass="tableHeader"
        bodyClass="tableBody">
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="KategoriAdi" header="Category" :showFilterMenu="false" :showClearButton="false"
        headerClass="tableHeader" bodyClass="tableBody">
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="UrunAdi" header="Product" :showFilterMenu="false" :showClearButton="false"
        headerClass="tableHeader" bodyClass="tableBody">
        <template #footer>
          {{ total.crate | formatDecimal }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="YuzeyIslemAdi" header="Surface" :showFilterMenu="false" :showClearButton="false"
        headerClass="tableHeader" bodyClass="tableBody">
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="En" header="Width" :showFilterMenu="false" :showClearButton="false" headerClass="tableHeader"
        bodyClass="tableBody">
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="Boy" header="Height" :showFilterMenu="false" :showClearButton="false" headerClass="tableHeader"
        bodyClass="tableBody">
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="Kenar" header="Thickness" :showFilterMenu="false" :showClearButton="false"
        headerClass="tableHeader" bodyClass="tableBody">
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="KutuAdet" header="Box in Crate" :showFilterMenu="false" :showClearButton="false"
        headerClass="tableHeader" bodyClass="tableBody">
        <template #footer>
          {{ total.box | formatDecimal }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="Adet" header="Piece in Crate" :showFilterMenu="false" :showClearButton="false"
        headerClass="tableHeader" bodyClass="tableBody">
        <template #body="slotProps">
          {{ slotProps.data.Adet | formatDecimal }}
        </template>
        <template #footer>
          {{ total.piece | formatDecimal }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="Miktar" header="Amount" :showFilterMenu="false" :showClearButton="false" headerClass="tableHeader"
        bodyClass="tableBody">
        <template #body="slotProps">
          {{ slotProps.data.Miktar | formatDecimal }}
        </template>
        <template #footer>
          {{ total.amount | formatDecimal }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="BirimAdi" header="Unit" :showFilterMenu="false" :showClearButton="false" headerClass="tableHeader"
        bodyClass="tableBody">
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="SiparisAciklama" header="Po" :showFilterMenu="false" :showClearButton="false"
        headerClass="tableHeader" bodyClass="tableBody">
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
        </template>
      </Column>
      <Column field="BirimFiyat" header="Price" headerClass="tableHeader" bodyClass="tableBody"
        v-if="!getAuthorityStatus">
        <template #body="slotProps">
          {{ slotProps.data.BirimFiyat | formatPriceUsd }}
        </template>
      </Column>
      <Column field="Toplam" header="Total" headerClass="tableHeader" bodyClass="tableBody" v-if="!getAuthorityStatus">
        <template #body="slotProps">
          {{ slotProps.data.Toplam | formatPriceUsd }}
        </template>
        <template #footer>
          {{ total.total | formatPriceUsd }}
        </template>
      </Column>
    </DataTable>




  </div>
</template>
<script>
import { FilterMatchMode } from "primevue/api";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getAuthorityStatus"]),
  },
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
    dates:{
      
    }
  },
  data() {
    return {
      filterModel: {
        date: "",
        to: "",
        fromWho: "",
        productId: "",
        crate: "",
        mine: "",
        category: "",
        product: "",
        surface: "",
        width: "",
        height: "",
        edge: "",
        box: "",
        piece: "",
        amount: "",
        unit: "",
        po: "",
      },

      filters1: {
        Tarih: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        FirmaAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        TedarikciAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        UrunKartId: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        KasaNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        OcakAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        KategoriAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        UrunAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        YuzeyIslemAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        En: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Boy: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Kenar: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        SiparisAciklama: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        KutuAdet: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Adet: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Miktar: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        BirimAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      filters2:{
        Tarih: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        FirmaAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        TedarikciAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        UrunKartId: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        KasaNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        OcakAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        KategoriAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        UrunAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        YuzeyIslemAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        En: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Boy: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Kenar: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        SiparisAciklama: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        KutuAdet: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Adet: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Miktar: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        BirimAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      }
    };
  },
  methods: {
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
        this.$store.dispatch("setForwardingFilterList", this.filterModel);
      } else {
        if (this.resetFilter()) {
          this.$store.dispatch("setReportsMekmarForwardingList");
        } else {
          this.$store.dispatch("setForwardingFilterList", this.filterModel);
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
        this.$store.dispatch("setForwardingFilterList", this.filterModel);
      } else {
        if (this.resetFilter()) {
          this.$store.dispatch("setReportsMekmarForwardingList");
        } else {
          this.$store.dispatch("setForwardingFilterList", this.filterModel);
        }
      }
    },

    filterAmountInput(event) {
      if (event) {
        this.filterModel.amount = event;
      } else {
        this.filterModel.amount = "";
      }
    },
    filterAmount(event) {
      if (event) {
        this.filterModel.amount = event;
        this.$store.dispatch("setForwardingFilterList", this.filterModel);
      } else {
        if (this.resetFilter()) {
          this.$store.dispatch("setReportsMekmarForwardingList");
        } else {
          this.$store.dispatch("setForwardingFilterList", this.filterModel);
        }
      }
    },

    filterPieceInput(event) {
      if (event) {
        this.filterModel.piece = event;
      } else {
        this.filterModel.piece = "";
      }
    },
    filterPiece(event) {
      if (event) {
        this.filterModel.piece = event;
        this.$store.dispatch("setForwardingFilterList", this.filterModel);
      } else {
        if (this.resetFilter()) {
          this.$store.dispatch("setReportsMekmarForwardingList");
        } else {
          this.$store.dispatch("setForwardingFilterList", this.filterModel);
        }
      }
    },

    filterBoxInput(event) {
      if (event) {
        this.filterModel.box = event;
      } else {
        this.filterModel.box = "";
      }
    },
    filterBox(event) {
      if (event) {
        this.filterModel.box = event;
        this.$store.dispatch("setForwardingFilterList", this.filterModel);
      } else {
        if (this.resetFilter()) {
          this.$store.dispatch("setReportsMekmarForwardingList");
        } else {
          this.$store.dispatch("setForwardingFilterList", this.filterModel);
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
        this.$store.dispatch("setForwardingFilterList", this.filterModel);
      } else {
        if (this.resetFilter()) {
          this.$store.dispatch("setReportsMekmarForwardingList");
        } else {
          this.$store.dispatch("setForwardingFilterList", this.filterModel);
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
        this.$store.dispatch("setForwardingFilterList", this.filterModel);
      } else {
        if (this.resetFilter()) {
          this.$store.dispatch("setReportsMekmarForwardingList");
        } else {
          this.$store.dispatch("setForwardingFilterList", this.filterModel);
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
        this.$store.dispatch("setForwardingFilterList", this.filterModel);
      } else {
        if (this.resetFilter()) {
          this.$store.dispatch("setReportsMekmarForwardingList");
        } else {
          this.$store.dispatch("setForwardingFilterList", this.filterModel);
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
        this.$store.dispatch("setForwardingFilterList", this.filterModel);
      } else {
        if (this.resetFilter()) {
          this.$store.dispatch("setReportsMekmarForwardingList");
        } else {
          this.$store.dispatch("setForwardingFilterList", this.filterModel);
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
        this.$store.dispatch("setForwardingFilterList", this.filterModel);
      } else {
        if (this.resetFilter()) {
          this.$store.dispatch("setReportsMekmarForwardingList");
        } else {
          this.$store.dispatch("setForwardingFilterList", this.filterModel);
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
        this.$store.dispatch("setForwardingFilterList", this.filterModel);
      } else {
        if (this.resetFilter()) {
          this.$store.dispatch("setReportsMekmarForwardingList");
        } else {
          this.$store.dispatch("setForwardingFilterList", this.filterModel);
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
        this.$store.dispatch("setForwardingFilterList", this.filterModel);
      } else {
        if (this.resetFilter()) {
          this.$store.dispatch("setReportsMekmarForwardingList");
        } else {
          this.$store.dispatch("setForwardingFilterList", this.filterModel);
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
        this.$store.dispatch("setForwardingFilterList", this.filterModel);
      } else {
        if (this.resetFilter()) {
          this.$store.dispatch("setReportsMekmarForwardingList");
        } else {
          this.$store.dispatch("setForwardingFilterList", this.filterModel);
        }
      }
    },

    filterProductIdInput(event) {
      if (event) {
        this.filterModel.productId = event;
      } else {
        this.filterModel.productId = "";
      }
    },
    filterProductId(event) {
      if (event) {
        this.filterModel.productId = event;
        this.$store.dispatch("setForwardingFilterList", this.filterModel);
      } else {
        if (this.resetFilter()) {
          this.$store.dispatch("setReportsMekmarForwardingList");
        } else {
          this.$store.dispatch("setForwardingFilterList", this.filterModel);
        }
      }
    },

    filterFromWhoInput(event) {
      if (event) {
        this.filterModel.fromWho = event;
      } else {
        this.filterModel.fromWho = "";
      }
    },
    filterFromWho(event) {
      if (event) {
        this.filterModel.fromWho = event;
        this.$store.dispatch("setForwardingFilterList", this.filterModel);
      } else {
        if (this.resetFilter()) {
          this.$store.dispatch("setReportsMekmarForwardingList");
        } else {
          this.$store.dispatch("setForwardingFilterList", this.filterModel);
        }
      }
    },

    filterToInput(event) {
      if (event) {
        this.filterModel.to = event;
      } else {
        this.filterModel.to = "";
      }
    },
    filterTo(event) {
      if (event) {
        this.filterModel.to = event;
        this.$store.dispatch("setForwardingFilterList", this.filterModel);
      } else {
        if (this.resetFilter()) {
          this.$store.dispatch("setReportsMekmarForwardingList");
        } else {
          this.$store.dispatch("setForwardingFilterList", this.filterModel);
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
        this.$store.dispatch("setForwardingFilterList", this.filterModel);
      } else {
        if (this.resetFilter()) {
          this.$store.dispatch("setReportsMekmarForwardingList");
        } else {
          this.$store.dispatch("setForwardingFilterList", this.filterModel);
        }
      }
    },

    resetFilter() {
      if (
        this.filterModel.date == "" &&
        this.filterModel.to == "" &&
        this.filterModel.fromWho == "" &&
        this.filterModel.crate == "" &&
        this.filterModel.mine == "" &&
        this.filterModel.category == "" &&
        this.filterModel.product == "" &&
        this.filterModel.surface == "" &&
        this.filterModel.width == "" &&
        this.filterModel.height == "" &&
        this.filterModel.edge == "" &&
        this.filterModel.box == "" &&
        this.filterModel.piece == "" &&
        this.filterModel.amount == "" &&
        this.filterModel.unit == "" &&
        this.filterModel.po == ""
      ) {
        return true;
      } else {
        return false;
      }
    },

    reportsMekmarForwardingFiltered(event) {
      this.$store.dispatch("setReportsMekmarForwardingListTotal", event.filteredValue);
    },
  },
};
</script>
