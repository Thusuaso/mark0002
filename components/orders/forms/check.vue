<template>
  <div>
    <div class="container">
      <JsonExcel
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
      </JsonExcel>
    </div>
    <DataTable :value="list">
      <Column field="Sira" header="#"></Column>
      <Column field="KasaNo" header="Kasa No"></Column>
      <Column field="TedarikciAdi" header="Tedarikçi"></Column>
      <Column field="KategoriAdi" header="Kategori"></Column>
      <Column field="UrunAdi" header="Ürün">
        <template #footer>
          {{ total.crate | formatDecimal }}
        </template>
      </Column>
      <Column field="YuzeyIslem" header="Yüzey"></Column>
      <Column field="En" header="En">
        <template #body="slotProps">
          {{ slotProps.data.En }}
        </template>
      </Column>
      <Column field="Boy" header="Boy">
        <template #body="slotProps">
          {{ slotProps.data.Boy }}
        </template>
      </Column>
      <Column field="Kenar" header="Kenar">
        <template #body="slotProps">
          {{ slotProps.data.Kenar }}
        </template>
      </Column>
      <Column field="BirimAdi" header="Birim">
        <template #body="slotProps">
          {{ slotProps.data.BirimAdi }}
        </template>
      </Column>
      <Column field="KutuAdet" header="Kutu">
        <template #body="slotProps">
          {{ slotProps.data.KutuAdet | formatDecimal }}
        </template>
        <template #footer>
          {{ total.box | formatDecimal }}
        </template>
      </Column>
      <Column field="Adet" header="Adet">
        <template #body="slotProps">
          {{ slotProps.data.Adet | formatDecimal }}
        </template>
        <template #footer>
          {{ total.piece | formatDecimal }}
        </template>
      </Column>
      <Column field="Miktar" header="Miktar">
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
};
</script>
