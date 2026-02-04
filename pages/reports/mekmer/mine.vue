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
    <Button type="button" class="p-button-secondary" @click="excel_output" label="Excel"/>
    <reportsMekmerMineList :list="getReportsMekmerMineList" :loading="getLoading" />
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getReportsMekmerMineList", "getLoading","getLocalUrl"]),
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
  methods: {
    excel_output(){
      this.$excelApi.post("/reports/excel/mine", this.getReportsMekmerMineList).then((response) => {
        if (response.status) {
          const link = document.createElement("a");
          link.href = this.getLocalUrl + "reports/excel/mine";

          link.setAttribute("download", "mekamer_mine_excel.xlsx");
          document.body.appendChild(link);
          link.click();
        }
      });
    }

  },
};
</script>
