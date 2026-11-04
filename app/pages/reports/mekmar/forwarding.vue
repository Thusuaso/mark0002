<template>
  <div>
    <div class="container row">
      <div class="col">
        <DatePicker
          v-model="selectedDates"
          selectionMode="range"
          :manualInput="true"
          placeholder="Select a Date Range"
        />
      </div>
      <div class="col">
        <Button
          type="button"
          severity="secondary" class="w-100"
          label="Clear"
          @click="selectedDates = null"
        />
      </div>

      <div class="col">
        <Button
          type="button"
          severity="success" class="w-100"
          label="Search"
          @click="searchDateList"
        />
      </div>
      <div class="col">
        <!-- <JsonExcel
          :data="reportsStore.getreportsMekmarForwardingList"
          :fields="reportsMekmerForwardingListExcelFields"
          worksheet="Forwarding"
          name="Forwarding.xls"
        >
          <Button
            type="button"
            severity="info" class="w-100"
            icon="pi pi-file-excel"
            label="Excel"
          />
        </JsonExcel> -->
        <Button type="button" severity="secondary" label="Excel" @click="excel_output"/>

      </div>
    </div>
    <ReportsMekmarForwardingList
      :list="reportsStore.getreportsMekmarForwardingList"
      :total="reportsStore.getReportsMekmarForwardingListTotal"
      :dates="selectedDates"
    />
  </div>
</template>
<script>
import { useReportsStore } from "~/stores/reports"

export default {
  computed: {
    reportsStore() {
      return useReportsStore()
    },
  },
  data() {
    return {
      quarters: [
        { id: 1, quarter: "Q1" },
        { id: 2, quarter: "Q2" },
        { id: 3, quarter: "Q3" },
        { id: 4, quarter: "Q4" },
        { id: 5, quarter: "Q5" },
      ],
      selectedQuarter: { id: 1, quarter: "Q1" },
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
      reportsMekmerForwardingListExcelFields2: [
        { label: "Tarih", field: "Tarih" },
        { label: "Firma Adi", field: "FirmaAdi" },
        { label: "Tedarikci", field: "TedarikciAdi" },
        { label: "UrunKartId", field: "UrunKartId" },
        { label: "Kasa No", field: "KasaNo" },
        { label: "Ocak", field: "OcakAdi" },
        { label: "Kategori", field: "KategoriAdi" },
        { label: "Ürün", field: "UrunAdi" },
        { label: "Yuzey", field: "YuzeyIslemAdi" },
        { label: "En", field: "En" },
        { label: "Boy", field: "Boy" },
        { label: "Kenar", field: "Kenar" },
        { label: "Kutu Adet", field: "KutuAdet" },
        { label: "Adet", field: "Adet" },
        { label: "Miktar", field: "Miktar", dataFormat: this.formatDecimal },
        { label: "Birim", field: "BirimAdi" },
        { label: "Po", field: "SiparisAciklama" },
        { label: "Birim Fiyat", field: "BirimFiyat", dataFormat: this.formatDecimal },
        { label: "Toplam", field: "Toplam", dataFormat: this.formatDecimal },
      ],
    };
  },
  /*
   * created() -> mounted(): created() SSR'da da calisir, icindeki async
   * is BEKLENMEZ ve liste BOS serialize edilir; hydration onu devralir,
   * created() bir daha calismadigi icin tablo bos kalir (bkz. commit
   * 2afc877e3). mounted() sunucuda hic calismaz.
   */
  mounted() {
    this.reportsStore.setReportsMekmarForwardingList();
  },
  methods: {
    excel_output(){
      useExcelApi().post("/reports/excel/forwarding", this.reportsStore.getreportsMekmarForwardingList).then((response) => {
        if (response.status) {
          downloadFromExcelServer(
              "reports/excel/forwarding",
              "mekamer_forwarding_excel.xlsx"
            );
        }
      });
    },
    yearChange(event) {},
    formatDecimal(value) {
      if (value == null || value == undefined || value == "" || value == " ") {
        return 0;
      } else {
        let val = (value / 1).toFixed(4).replace(".", ",");
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      }
    },
    searchDateList() {
      // const date1 = this.selectedDates[0];
      // const date2 = this.selectedDates[1];
      if(this.selectedDates == null || this.selectedDates == '' || this.selectedDates == ' ' || this.selectedDates == undefined){
        this.reportsStore.setReportsMekmarForwardingList();

      }else{
        const _date1 = new Date(this.selectedDates[0]);
      const _date2 = new Date(this.selectedDates[1]);
      const _date_1_format = _date1.getFullYear() + '-' + (_date1.getMonth() + 1) + '-' + _date1.getDate();
      const _date_2_format = _date2.getFullYear() + '-' + (_date2.getMonth() + 1) + '-' + _date2.getDate();

      const payload = {
        date1: _date_1_format,
        date2: _date_2_format,
      };
      this.reportsStore.setReportsMekmarForwardingDate(payload);
      }
      
    },
  },
};
</script>

<!--
  pages/reports/mekmar/forwarding.vue

  Bagimlilik: components/reports/mekmar/forwarding/list.vue (1268 satir)
    (`reportsMekmarForwardingList`) -> app/components/reports/mekmar/ForwardingList.vue

  ELLE (sayfa):
  [x] mapGetters(2 getter) + 3 dispatch -> reportsStore
  [x] this.$excelApi -> useExcelApi(); elle <a download> -> yardimci
  [x] mapGetters(["getLocalUrl"]) dustu
  [x] created() -> mounted()

  ELLE (ForwardingList.vue):
  [x] 55 adet this.$store.dispatch -> reportsStore
      Yalnizca IKI ayri eylem var (setForwardingFilterList 36 kez,
      setReportsMekmarForwardingList 18 kez) -- her kolon filtresi kendi
      cagrisini yapiyor.
  [x] mapGetters(["getAuthorityStatus"]) -> authorityStore
      Bu getter arayuzu GIZLIYOR (v-if="!authorityStore.getAuthorityStatus",
      3 yer), yani yanlis baglanmasi yetkisiz kullaniciya alan acardi.
      Pilottaki authority.ts ile anlami birebir ayni dogrulandi.

  TASIMA YOLU: elle yeniden yazilmadi; tools/codemods/vue2-to-vue3.mjs
  uygulandi, sonra codemod'un "ELLE YAPILACAK" diye listeledigi maddeler
  kapatildi. Kaynak: mark0002 deposunun codemod-vue3-prep dali (filtreler
  ve .sync orada zaten cevrilmisti).
-->
