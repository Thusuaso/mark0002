<template>
  <div class="container">
    <!-- <JsonExcel
      class="w-100"
      :data="getReportsMekmerMineList"
      :fields="getReportsMekmerMineExcelFields"
      worksheet="Mine"
      name="Mine.xls"
    >
      <Button
        type="button"
        class="p-button-info w-100"
        icon="pi pi-file-excel"
        label="Excel"
      />
    </JsonExcel> -->
    <vue-excel-xlsx
      :data="getReportsMekmerMineList"
      :columns="getReportsMekmerMineExcelFields2"
      :file-name="'Mine'"
      :file-type="'xlsx'"
      :sheet-name="'sheetname'"
      style="border: none; background-color: white; width: 100%"
    >
      <Button
        type="button"
        class="p-button-info w-100"
        icon="pi pi-file-excel"
        label="Excel"
      />
    </vue-excel-xlsx>
    <reportsMekmerMineList :list="getReportsMekmerMineList" :loading="getLoading" />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getReportsMekmerMineList", "getLoading"]),
  },
  data() {
    return {
      getReportsMekmerMineExcelFields: {
        "Ocak Adı": "OcakAdi",
        M2: "M2",
        MT: "MT",
        Adet: "Adet",
        "Kasa Adedi": "KasaAdedi",
      },
      getReportsMekmerMineExcelFields2: [
        { label: "Ocak Adı", field: "OcakAdi" },
        { label: "M2", field: "M2" },
        { label: "MT", field: "MT" },
        { label: "Adet", field: "Adet" },
        { label: "Kasa Adedi", field: "KasaAdedi" },
      ],
    };
  },
  created() {
    this.$store.dispatch("setReportsMekmerMineList");
  },
  methods: {},
};
</script>
