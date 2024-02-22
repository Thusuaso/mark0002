<template>
  <div class="row">
    <div class="col">
      <DataTable
        :value="products"
        class="p-datatable-sm"
        paginator
        :rows="10"
        :selection="selectedProduct"
        selectionMode="single"
        @row-select="$emit('product_selected_emit', $event)"
        :filters.sync="filters1"
        filterDisplay="row"
        @filter="filteredProductsList($event)"
        :loading="loading"
      >
        <template #header>
          <Button
            type="button"
            icon="pi pi-filter-slash"
            label="Filtreleri Temizle"
            outlined
            @click="clearFilter()"
          />
        </template>
        <Column field="KasaNo" header="Crate No" :showFilterMenu="false">
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              type="text"
              v-model="filterModel.value"
              @input="filterCallback()"
              class="p-column-filter"
              style="width: 50px"
            />
          </template>
        </Column>
        <Column field="Tarih" header="Date" :showFilterMenu="false">
          <template #body="slotProps">
            {{ slotProps.data.Tarih | dateToString }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              type="text"
              v-model="filterModel.value"
              @input="filterCallback()"
              class="p-column-filter"
              style="width: 80px"
            />
          </template>
        </Column>
        <Column field="KategoriAdi" header="Category" :showFilterMenu="false">
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              type="text"
              v-model="filterModel.value"
              @input="filterCallback()"
              class="p-column-filter"
              style="width: 80px"
            />
          </template>
        </Column>
        <Column field="OcakAdi" header="Mine" :showFilterMenu="false">
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              type="text"
              v-model="filterModel.value"
              @input="filterCallback()"
              class="p-column-filter"
              style="width: 80px"
            />
          </template>
        </Column>
        <Column field="UrunAdi" header="Product" :showFilterMenu="false">
          <template #footer>
            {{ total.kasaadedi }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              type="text"
              v-model="filterModel.value"
              @input="filterCallback()"
              class="p-column-filter"
              style="width: 80px"
            />
          </template>
        </Column>
        <Column field="YuzeyIslemAdi" header="Surface" :showFilterMenu="false">
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              type="text"
              v-model="filterModel.value"
              @input="filterCallback()"
              class="p-column-filter"
              style="width: 80px"
            />
          </template>
        </Column>
        <Column field="En" header="Width" :showFilterMenu="false">
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              type="text"
              v-model="filterModel.value"
              @input="filterCallback()"
              class="p-column-filter"
              style="width: 50px"
            />
          </template>
        </Column>
        <Column field="Boy" header="Height" :showFilterMenu="false">
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              type="text"
              v-model="filterModel.value"
              @input="filterCallback()"
              class="p-column-filter"
              style="width: 50px"
            />
          </template>
        </Column>
        <Column field="Kenar" header="Edge" :showFilterMenu="false">
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              type="text"
              v-model="filterModel.value"
              @input="filterCallback()"
              class="p-column-filter"
              style="width: 50px"
            />
          </template>
        </Column>
        <Column field="Adet" header="Pieces in Box">
          <template #footer>
            {{ total.kutuiciadet | formatDecimal }}
          </template>
        </Column>
        <Column field="KutuAdet" header="Box Piece">
          <template #footer>
            {{ total.kutu | formatDecimal }}
          </template>
        </Column>
        <Column field="Miktar" header="Amount">
          <template #body="slotProps">
            {{ slotProps.data.Miktar | formatDecimal }}
          </template>
          <template #footer>
            {{ total.miktar | formatDecimal }}
          </template>
        </Column>
        <Column field="Kutu" header="B">
          <template #body="slotProps">
            <div v-if="slotProps.data.Kutu == true">✓</div>
            <div v-else>x</div>
          </template>
        </Column>
        <Column field="Bagli" header="C">
          <template #body="slotProps">
            <div v-if="slotProps.data.Bagli == true">✓</div>
            <div v-else>x</div>
          </template>
        </Column>
        <Column field="SiparisAciklama" header="Po" :showFilterMenu="false">
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              type="text"
              v-model="filterModel.value"
              @input="filterCallback()"
              class="p-column-filter"
              style="width: 80px"
            />
          </template>
        </Column>
        <Column field="Aciklama" header="Desc" :showFilterMenu="false">
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              type="text"
              v-model="filterModel.value"
              @input="filterCallback()"
              class="p-column-filter"
              style="width: 80px"
            />
          </template>
        </Column>
      </DataTable>
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
    loading: {
      type: Boolean,
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
    },
  },
};
</script>
