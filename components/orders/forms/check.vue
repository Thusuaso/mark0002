<template>
  <div>
    <div class="container">
      <!-- <JsonExcel
        class="w-100"
        :data="list"
        :fields="checkListFields"
        worksheet="Çeki"
        name="Çeki.xls"
      >
        <Button
          type="button"
          class="p-button-info w-100"
          icon="pi pi-file-excel"
          label="Excel"
        />
      </JsonExcel> -->

      <Button class="p-button-primary w-100" label="Excel" @click="excel_test" />
      <DataTable :value="list" filterDisplay="row" :filters.sync="filtersCheck" @filter="checkFilters($event)"
        >
        <Column field="Sira" header="#"></Column>
        <Column field="KasaNo" header="Crate No" :showFilterMenu="false" :showClearButton="false"
          headerClass="tableHeader" bodyClass="tableBody">
          <template #filter="{ filterModel, filterCallback }">
            <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter" />
          </template>
        </Column>
        <Column field="TedarikciAdi" header="Supplier" :showFilterMenu="false" :showClearButton="false"
          headerClass="tableHeader" bodyClass="tableBody">
          <template #filter="{ filterModel, filterCallback }">
            <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter" />
          </template>
        </Column>
        <Column field="KategoriAdi" header="Category" :showFilterMenu="false" :showClearButton="false"
          headerClass="tableHeader" bodyClass="tableBody">
          <template #filter="{ filterModel, filterCallback }">
            <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter" />
          </template>
        </Column>
        <Column field="UrunAdi" header="Product" :showFilterMenu="false" :showClearButton="false"
          headerClass="tableHeader" bodyClass="tableBody">
          <template #footer>
            {{ total.crate | formatDecimal }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter" />
          </template>
        </Column>
        <Column field="YuzeyIslem" header="Surface" :showFilterMenu="false" :showClearButton="false"
          headerClass="tableHeader" bodyClass="tableBody">
          <template #filter="{ filterModel, filterCallback }">
            <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter" />
          </template>
        </Column>
        <Column field="En" header="Width" :showFilterMenu="false" :showClearButton="false" headerClass="tableHeader"
          bodyClass="tableBody">
          <template #body="slotProps">
            {{ slotProps.data.En }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter" />
          </template>
        </Column>
        <Column field="Boy" header="Height" :showFilterMenu="false" :showClearButton="false" headerClass="tableHeader"
          bodyClass="tableBody">
          <template #body="slotProps">
            {{ slotProps.data.Boy }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter" />
          </template>
        </Column>
        <Column field="Kenar" header="Thickness" :showFilterMenu="false" :showClearButton="false"
          headerClass="tableHeader" bodyClass="tableBody">
          <template #body="slotProps">
            {{ slotProps.data.Kenar }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter" />
          </template>
        </Column>
        <Column field="BirimAdi" header="Unit" :showFilterMenu="false" :showClearButton="false"
          headerClass="tableHeader" bodyClass="tableBody">
          <template #body="slotProps">
            {{ slotProps.data.BirimAdi }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter" />
          </template>
        </Column>
        <Column field="KutuAdet" header="Box" :showFilterMenu="false" :showClearButton="false" headerClass="tableHeader"
          bodyClass="tableBody">
          <template #body="slotProps">
            {{ slotProps.data.KutuAdet | formatDecimal }}
          </template>
          <template #footer>
            {{ total.box | formatDecimal }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter" />
          </template>
        </Column>
        <Column field="Adet" header="Piece" :showFilterMenu="false" :showClearButton="false" headerClass="tableHeader"
          bodyClass="tableBody">
          <template #body="slotProps">
            {{ slotProps.data.Adet | formatDecimal }}
          </template>
          <template #footer>
            {{ total.piece | formatDecimal }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter" />
          </template>
        </Column>
        <Column field="Miktar" header="Amount" :showFilterMenu="false" :showClearButton="false"
          headerClass="tableHeader" bodyClass="tableBody">
          <template #body="slotProps">
            {{ slotProps.data.Miktar | formatDecimal }}
          </template>
          <template #footer>
            {{ total.amount | formatDecimal }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter" />
          </template>
        </Column>
        <Column field="Ton" header="Ton" :showFilterMenu="false" :showClearButton="false" headerClass="tableHeader"
          bodyClass="tableBody">
          <template #body="slotProps">
            {{ slotProps.data.Ton | formatDecimal }}
          </template>
          <template #footer>
            {{ total.ton | formatDecimal }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter" />
          </template>
        </Column>
        <Column field="KasaOlcusu" header="C.Size"></Column>
      </DataTable>
    </div>
  </div>
</template>
<script>
import api from "../../../plugins/excel.server.js";
import { FilterMatchMode } from "primevue/api";
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters(['getLocalUrl','getOrderProductionPo'])
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
  },
  data() {
    return {
      filtersCheck: {
        KasaNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        TedarikciAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        KategoriAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        UrunAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        YuzeyIslem: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        En: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Boy: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Kenar: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        BirimAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        KutuAdet: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Adet: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Miktar: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Ton: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      checkListFields: {
        Sıra: "Sira",
        "Kasa No": "KasaNo",
        "Tedarikçi Adı": "TedarikciAdi",
        Kategori: "KategoriAdi",
        "Ürün Adi": "UrunAdi",
        Yüzey: "YuzeyIslem",
        En: "En",
        Boy: "Boy",
        Kenar: "Kenar",
        "Birim Adı": "BirimAdi",
        "Kutu Adet": "KutuAdet",
        Adet: "Adet",
        Miktar: "Miktar",
        Ton: "Ton",
      },
    };
  },
  methods: {
    checkFilters(event) {
      this.$store.dispatch("setOrderProductionCheckListTotal", event.filteredValue);
    },
    excel_test() {
      const data = {
        'list':this.list,
        'po':this.getOrderProductionPo
      }
      api.post("/excel/check/list", data).then((response) => {
        if (response) {
          const link = document.createElement("a");
          link.href = this.getLocalUrl + "excel/check/list";

          link.setAttribute("download", "check_list.xlsx");
          document.body.appendChild(link);
          link.click();
        }
      });
    },
  },
};
</script>
