<template>
  <div class="card">
    <div class="row">
      <div class="col">
        <DataTable :value="products" class="p-datatable-sm" paginator :rows="10" :selection="selectedProduct"
          selectionMode="single" @row-select="$emit('product_selected_emit', $event)" :filters.sync="filters1"
          filterDisplay="row" @filter="filteredProductsList($event)" 
          columnResizeMode="fit" showGridlines responsiveLayout="scroll">
          <template #header>
            <Button type="button" icon="pi pi-filter-slash" label="Filtreleri Temizle" outlined
              @click="clearFilter()" />
          </template>
          <Column field="KasaNo" header="Crate No" :showFilterMenu="false" :showClearButton="false" sortable>
            <template #filter="{ filterModel, filterCallback }">
              <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                style="width: 50px" />
            </template>
          </Column>
          <Column field="Tarih" header="Date" :showFilterMenu="false" :showClearButton="false" sortable
            headerClass="tableHeader" bodyClass="tableBody">
            <template #body="slotProps">
              {{ slotProps.data.Tarih | dateToString }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                style="width: 80px" />
            </template>
          </Column>
          <Column field="KategoriAdi" header="Category" :showFilterMenu="false" :showClearButton="false" sortable>
            <template #filter="{ filterModel, filterCallback }">
              <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                style="width: 80px" />
            </template>
          </Column>
          <Column field="OcakAdi" header="Quarry" :showFilterMenu="false" :showClearButton="false" sortable>
            <template #filter="{ filterModel, filterCallback }">
              <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                style="width: 80px" />
            </template>
          </Column>
          <Column field="UrunAdi" header="Product"  :showClearButton="false" sortable>
            <template #footer>
              {{ total.kasaadedi }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                style="width: 80px" />
            </template>
          </Column>
          <Column field="YuzeyIslemAdi" header="Surface" :showFilterMenu="false" :showClearButton="false" sortable>
            <template #filter="{ filterModel, filterCallback }">
              <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                style="width: 80px" />
            </template>
          </Column>
          <Column field="En" header="Width" :showFilterMenu="false" :showClearButton="false" sortable>
            <template #filter="{ filterModel, filterCallback }">
              <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                style="width: 50px" />
            </template>
          </Column>
          <Column field="Boy" header="Height" :showFilterMenu="false" :showClearButton="false" sortable>
            <template #filter="{ filterModel, filterCallback }">
              <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                style="width: 50px" />
            </template>
          </Column>
          <Column field="Kenar" header="Thickness" :showFilterMenu="false" :showClearButton="false" sortable>
            <template #filter="{ filterModel, filterCallback }">
              <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                style="width: 50px" />
            </template>
          </Column>
          <Column field="Adet" header="Pcs in Box" :showFilterMenu="false" :showClearButton="false" sortable>
            <template #footer>
              {{ total.kutuiciadet | formatDecimal2 }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                style="width: 50px" />
            </template>
          </Column>
          <Column field="KutuAdet" header="Box Amount" :showFilterMenu="false" :showClearButton="false" sortable>
            <template #footer>
              {{ total.kutu | formatDecimal2 }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                style="width: 50px" />
            </template>
          </Column>
          <Column field="Miktar" header="Amount" :showFilterMenu="false" :showClearButton="false" sortable>
            <template #body="slotProps">
              {{ slotProps.data.Miktar | formatDecimal }}
            </template>
            <template #footer>
              {{ total.miktar | formatDecimal2 }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                style="width: 50px" />
            </template>
          </Column>
          <Column field="Kutu" header="Box" sortable>
            <template #body="slotProps">
              <div v-if="slotProps.data.Kutu == true">✓</div>
              <div v-else>x</div>
            </template>
          </Column>
          <Column field="Bagli" header="Binded" sortable>
            <template #body="slotProps">
              <div v-if="slotProps.data.Bagli == true">✓</div>
              <div v-else>x</div>
            </template>
          </Column>
          <Column field="SiparisAciklama" header="Po" :showFilterMenu="false" :showClearButton="false" sortable>
            <template #filter="{ filterModel, filterCallback }">
              <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                style="width: 80px" />
            </template>
          </Column>
          <Column field="Aciklama" header="Expl." :showFilterMenu="false" :showClearButton="false" sortable>
            <template #filter="{ filterModel, filterCallback }">
              <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                style="width: 80px" />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>



</template>
<script>
import { FilterMatchMode } from "primevue/api";
export default {
  props: {
    products: {
      type: Array,
      required: false,
    },
    total: {
      type: Object,
      required: false,
    },

  },
  data() {
    return {
      selectedProduct: null,
      filters1: {
        KasaNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Tarih: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        KategoriAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        OcakAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        UrunAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        YuzeyIslemAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        En: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Boy: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Kenar: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        SiparisAciklama: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Aciklama: { value: null, matchMode: FilterMatchMode.STARTS_WITH },

        Adet: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        KutuAdet: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Miktar: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
    };
  },
  methods: {
    clearFilter(event) {
      this.filters1 = {
        KasaNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Tarih: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        KategoriAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        OcakAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        UrunAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        YuzeyIslemAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        En: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Boy: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Kenar: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        SiparisAciklama: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Aciklama: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      };
    },
    filteredProductsList(event) {
      this.$store.commit("setSelectionProductTotalList", event.filteredValue);
      this.$store.dispatch("setSelectionProductFilteredList",event.filteredValue);
    },
  },
};
</script>
<style scoped>
  .p-datatable{
    clear:both;
    display:block;
    overflow: auto;
  }
  .p-datatable-table .p-datatable-wrapper{
    clear:both;
    display:block;
  }

  .customContainer{
    clear:both;
    display:block;
    width:100%;
    overflow: auto;
  }
    @media (max-width: 767px) {
      #dt-responsive-table table {
        width: 100% !important;
      }
  
      /* Styles for the table header */
      #dt-responsive-table table thead {
        display: none !important;
        /* Hide the table header on mobile */
      }
  
      /* Styles for the table rows */
      #dt-responsive-table table tbody {
        display: flex !important;
        flex-direction: column !important;
        align-items: stretch !important;
        min-height: auto !important;
        /* Adjust the min-height as needed */
      }
  
      /* Styles for individual table rows (cards) */
      #dt-responsive-table table tbody tr {
        border: 1px solid #ccc !important;
        border-radius: 8px !important;
        margin-bottom: 1rem !important;
        background-color: #fff !important;
        padding: 1rem !important;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
      }
  
      /* Styles for table cells within rows */
      #dt-responsive-table table tbody td {
        margin: 0.5rem 0 !important;
      }
  
      /* Hide individual table rows (cards) on mobile */
      #dt-responsive-table table tbody tr {
        display: table-row !important;
      }
  
      /* Set the display of table cells to be block-level elements */
      #dt-responsive-table table tbody td {
        display: block !important;
        margin: 0.5rem 0 !important;
      }
    }
</style>