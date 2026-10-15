<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-6">
          <Button
            class="p-button-primary w-100"
            label="Excel"
            @click="excel_test"
          />
        </div>
        <div class="col-6">
          <Button
            class="p-button-primary w-100"
            label="Etiket Excel"
            @click="excel_labels"
          />
        </div>
      </div>

      <!-- Ortak kasalar siparis listelerindeki gibi gruplanir: urun satirlari
           ayri kalir, #/net/gross hucreleri kasa boyunca dikey birlesir
           (rowspan). Gruplama alani Sira'dir: kasa basina tekil, grup
           uyelerinde ayni (bkz. api kasaGruplariniUygula). -->
      <DataTable
        :value="list"
        rowGroupMode="rowspan"
        :groupRowsBy="['Sira']"
        filterDisplay="row"
        :filters.sync="filtersCheck"
        :rowClass="crateGroupRowClass"
        @filter="checkFilters($event)"
      >
        <Column field="Sira" header="#" bodyClass="crateGroupCell"></Column>
        <Column
          field="KasaNo"
          header="Crate No"
          :showFilterMenu="false"
          :showClearButton="false"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #footer>
            {{ total.crate | formatDecimal }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              type="text"
              v-model="filterModel.value"
              @input="filterCallback()"
              class="p-column-filter"
            />
          </template>
        </Column>
        <Column
          field="TedarikciAdi"
          header="Supplier"
          :showFilterMenu="false"
          :showClearButton="false"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              type="text"
              v-model="filterModel.value"
              @input="filterCallback()"
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
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              type="text"
              v-model="filterModel.value"
              @input="filterCallback()"
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
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              type="text"
              v-model="filterModel.value"
              @input="filterCallback()"
              class="p-column-filter"
            />
          </template>
        </Column>
        <Column
          field="YuzeyIslem"
          header="Surface"
          :showFilterMenu="false"
          :showClearButton="false"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              type="text"
              v-model="filterModel.value"
              @input="filterCallback()"
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
          <template #body="slotProps">
            {{ slotProps.data.En }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              type="text"
              v-model="filterModel.value"
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
          <template #body="slotProps">
            {{ slotProps.data.Boy }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              type="text"
              v-model="filterModel.value"
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
          <template #body="slotProps">
            {{ slotProps.data.Kenar }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              type="text"
              v-model="filterModel.value"
              @input="filterCallback()"
              class="p-column-filter"
            />
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
          <template #body="slotProps">
            {{ slotProps.data.BirimAdi }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              type="text"
              v-model="filterModel.value"
              @input="filterCallback()"
              class="p-column-filter"
            />
          </template>
        </Column>
        <Column
          field="KutuAdet"
          header="Box"
          :showFilterMenu="false"
          :showClearButton="false"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ slotProps.data.KutuAdet | formatDecimal }}
          </template>
          <template #footer>
            {{ total.box | formatDecimal }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              type="text"
              v-model="filterModel.value"
              @input="filterCallback()"
              class="p-column-filter"
            />
          </template>
        </Column>
        <Column
          field="Adet"
          header="Piece"
          :showFilterMenu="false"
          :showClearButton="false"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ slotProps.data.Adet | formatDecimal }}
          </template>
          <template #footer>
            {{ total.piece | formatDecimal }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              type="text"
              v-model="filterModel.value"
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
          <template #footer>
            {{ total.amount | formatDecimal }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              type="text"
              v-model="filterModel.value"
              @input="filterCallback()"
              class="p-column-filter"
            />
          </template>
        </Column>
        <!-- Net ve gross kasa basina tek degerdir, bu yuzden ikisi de Sira
             uzerinden gruplanir (field="Sira") ve hucreleri kasa boyunca
             birlesir; gosterilen deger body sablonundan gelir. Agirliga gore
             filtreleme kaldirildi: deger artik satirin degil kasanin. -->
        <Column
          field="Sira"
          header="Net KG"
          headerClass="tableHeader"
          bodyClass="crateGroupCell"
        >
          <template #body="slotProps">
            {{ crateGroupNet(slotProps.data) | formatDecimal }}
          </template>
          <template #footer>
            {{ total.ton | formatDecimal }}
          </template>
        </Column>
        <Column
          field="Sira"
          header="Gross KG"
          headerClass="tableHeader"
          bodyClass="crateGroupCell"
        >
          <template #body="slotProps">
            {{ (crateGroupNet(slotProps.data) + crateTare) | formatDecimal }}
          </template>
          <template #footer>
            {{ grossTotal | formatDecimal }}
          </template>
        </Column>
        <Column field="KasaOlcusu" header="C.Size"></Column>
      </DataTable>
    </div>
  </div>
</template>
<script>
import { FilterMatchMode } from "primevue/api";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters([
      "getLocalUrl",
      "getOrderProductionPo",
      "getOrderProductionCustomer",
    ]),
    /* Gross, kasa basina sabit dara ile hesaplanir; ortak kasalar tek kasa
       sayildigi icin dara da grup basina bir kez eklenir. */
    grossTotal() {
      return (this.total.ton || 0) + (this.total.crate || 0) * this.crateTare;
    },
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
      /* Ceki Excel'iyle ayni dara (bkz. socket/web.py ceki_listesi_excel). */
      crateTare: 30,
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
    crateGroupRowClass(row) {
      return row.Ortak ? "crateGroupRow" : null;
    },
    /* Gruplama kapaliysa (SQL script calistirilmadiysa) alanlar gelmez; her
       satir kendi basina bir kasadir ve kendi degeri kullanilir. */
    crateGroupNet(row) {
      return row.GrupTon === undefined || row.GrupTon === null
        ? row.Ton
        : row.GrupTon;
    },
    checkFilters(event) {
      this.$store.dispatch(
        "setOrderProductionCheckListTotal",
        event.filteredValue
      );
    },
    excel_test() {
      const data = {
        list: this.list,
        po: this.getOrderProductionPo,
      };
      this.$excelApi.post("/excel/check/list", data).then((response) => {
        if (response) {
          const link = document.createElement("a");
          link.href = this.getLocalUrl + "excel/check/list";

          link.setAttribute("download", "check_list.xlsx");
          document.body.appendChild(link);
          link.click();
        }
      });
    },
    excel_labels() {
      const data = {
        list: this.list,
        po: this.getOrderProductionPo,
        customer: this.getOrderProductionCustomer,
      };
      console.log(data);
      this.$excelApi.post("/excel/labels/list", data).then((response) => {
        if (response) {
          const link = document.createElement("a");
          link.href = this.getLocalUrl + "/excel/labels/list";
          link.setAttribute("download", "check_list.xlsx");
          document.body.appendChild(link);
          link.click();
        }
      });
    },
  },
};
</script>
<style scoped>
/* Ayni fiziksel kasayi paylasan satirlar listede birlikte duruyor; hafif
   zemin hangi satirlarin tek kasa oldugunu bakista gosterir. */
::v-deep .crateGroupRow {
  background: #fff8e1;
}
/* Dikey birlesen hucreler (#, net, gross) icerigi ortada dursun. */
::v-deep .crateGroupCell {
  vertical-align: middle;
  text-align: center;
}
</style>
