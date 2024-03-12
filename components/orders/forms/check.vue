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
    </div>
    <DataTable :value="list">
      <Column field="Sira" header="#"></Column>
      <Column field="KasaNo" header="Crate No"></Column>
      <Column field="TedarikciAdi" header="Supplier"></Column>
      <Column field="KategoriAdi" header="Category"></Column>
      <Column field="UrunAdi" header="Product">
        <template #footer>
          {{ total.crate | formatDecimal }}
        </template>
      </Column>
      <Column field="YuzeyIslem" header="Surface"></Column>
      <Column field="En" header="Width">
        <template #body="slotProps">
          {{ slotProps.data.En }}
        </template>
      </Column>
      <Column field="Boy" header="Height">
        <template #body="slotProps">
          {{ slotProps.data.Boy }}
        </template>
      </Column>
      <Column field="Kenar" header="Edge">
        <template #body="slotProps">
          {{ slotProps.data.Kenar }}
        </template>
      </Column>
      <Column field="BirimAdi" header="Unit">
        <template #body="slotProps">
          {{ slotProps.data.BirimAdi }}
        </template>
      </Column>
      <Column field="KutuAdet" header="Box">
        <template #body="slotProps">
          {{ slotProps.data.KutuAdet | formatDecimal }}
        </template>
        <template #footer>
          {{ total.box | formatDecimal }}
        </template>
      </Column>
      <Column field="Adet" header="Piece">
        <template #body="slotProps">
          {{ slotProps.data.Adet | formatDecimal }}
        </template>
        <template #footer>
          {{ total.piece | formatDecimal }}
        </template>
      </Column>
      <Column field="Miktar" header="Amount">
        <template #body="slotProps">
          {{ slotProps.data.Miktar | formatDecimal }}
        </template>
        <template #footer>
          {{ total.amount | formatDecimal }}
        </template>
      </Column>
      <Column field="Ton" header="Ton">
        <template #body="slotProps">
          {{ slotProps.data.Ton | formatDecimal }}
        </template>
        <template #footer>
          {{ total.ton | formatDecimal }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script>
import api from "../../../plugins/excel.server.js";
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
  },
  data() {
    return {
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
    excel_test() {
      api.post("/excel/check/list", this.list).then((response) => {
        if (response) {
          const link = document.createElement("a");
          link.href = "https://excel-server-mark0002.mekmar.com" + "/excel/check/list";

          link.setAttribute("download", "check_list.xlsx");
          document.body.appendChild(link);
          link.click();
        }
      });
    },
  },
};
</script>
