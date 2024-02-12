<template>
  <div class="container">
    <JsonExcel
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
    </JsonExcel>
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
    };
  },
  created() {
    this.$store.dispatch("setReportsMekmerMineList");
  },
  methods: {},
};
</script>
