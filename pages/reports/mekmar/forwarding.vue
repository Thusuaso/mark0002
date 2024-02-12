<template>
  <div>
    <div class="container row">
      <div class="col">
        <Calendar
          v-model="selectedDates"
          selectionMode="range"
          :manualInput="false"
          placeholder="Tarih Aralığı Seçiniz"
          class="w-100"
        />
      </div>
      <div class="col">
        <Button
          type="button"
          class="p-button-secondary w-100"
          label="Temizle"
          @click="selectedDates = null"
        />
      </div>

      <div class="col">
        <Button
          type="button"
          class="p-button-success w-100"
          label="Ara"
          @click="searchDateList"
        />
      </div>
      <div class="col">
        <JsonExcel
          :data="getreportsMekmarForwardingList"
          :fields="reportsMekmerForwardingListExcelFields"
          worksheet="Forwarding"
          name="Forwarding.xls"
        >
          <Button
            type="button"
            class="p-button-info w-100"
            icon="pi pi-file-excel"
            label="Excel"
          />
        </JsonExcel>
      </div>
    </div>
    <reportsMekmarForwardingList
      :list="getreportsMekmarForwardingList"
      :total="getReportsMekmarForwardingListTotal"
      :loading="getLoading"
    />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters([
      "getreportsMekmarForwardingList",
      "getReportsMekmarForwardingListTotal",
      "getLoading",
    ]),
  },
  data() {
    return {
      selectedDates: null,
      reportsMekmerForwardingListExcelFields: {
        Tarih: "Tarih",
        "Firma Adi": "FirmaAdi",
        Tedarikci: "TedarikciAdi",
        UrunKartId: "UrunKartId",
        "Kasa No": "KasaNo",
        Ocak: "OcakAdi",
        Kategori: "KategoriAdi",
        Ürün: "UrunAdi",
        Yuzey: "YuzeyIslemAdi",
        En: "En",
        Boy: "Boy",
        Kenar: "Kenar",
        "Kutu Adet": "KutuAdet",
        Adet: "Adet",
        Miktar: "Miktar",
        Birim: "BirimAdi",
        Po: "SiparisAciklama",
        "Birim Fiyat": "BirimFiyat",
        Toplam: "Toplam",
      },
    };
  },
  created() {
    this.$store.dispatch("setReportsMekmarForwardingList");
  },
  methods: {
    searchDateList() {
      const date1 = this.selectedDates[0];
      const date2 = this.selectedDates[1];
      const payload = {
        date1: date1,
        date2: date2,
      };
      this.$store.dispatch("setReportsMekmarForwardingDate", payload);
    },
  },
};
</script>
