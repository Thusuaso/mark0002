<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <Dropdown
          v-model="selectedYear"
          :options="getYearList"
          optionLabel="Year"
          placeholder="Select a Year"
          class="w-full md:w-14rem"
          @change="yearSelected($event)"
        />
      </div>
      <div class="col">
        <Button class="p-button-success" @click="excel_output" label="Excel" />
      </div>
    </div>
    <TabView>
      <TabPanel header="Yearly By Po">
        <reportsMekmarMkYearByPoOrdersList
          :list="getReportsMekmarMkList.byPo"
          :loading="getLoading"
        />
      </TabPanel>
      <TabPanel header="Up To Date Orders">
        <reportsMekmarMkYearByMarketingOrdersList
          :customer="getReportsMekmarMkList.byCustomer"
          :marketing="getReportsMekmarMkList.byMarketing"
          :loading="getLoading"
        />
      </TabPanel>
      <TabPanel header="Shipment Reports">
        <reportsMekmarMkYearByMarketingForwardingList
          :marketing="getReportsMekmarMkList.byMarketingYukleme"
          :marketingByDetail="getReportsMekmarMkList.byMarketingDetayYukleme"
          :loading="getLoading"
        />
      </TabPanel>
      <TabPanel header="Customers Reports">
        <reportsMekmarMkByCustomerList
          :list="getReportsMekmarMkList.byCustomerOrder"
          :loading="getLoading"
        />
      </TabPanel>
    </TabView>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import api from "../../../plugins/excel.server";
export default {
  middleware: ["authority"],
  data() {
    return {
      selectedYear: { Year: 2024 },
    };
  },
  computed: {
    ...mapGetters(["getReportsMekmarMkList", "getLocalUrl", "getLoading", "getYearList"]),
  },
  created() {
    const year = new Date().getFullYear();
    this.$store.dispatch("setBeginLoadingAction");
    api.get(`/raporlar/listeler/mkraporlari/${year}`).then((response) => {
      this.$store.dispatch("setReportsMekmarMkList", response.data);
      this.$store.dispatch("setEndLoadingAction");
    });
  },
  methods: {
    excel_output() {
      this.$store.dispatch("setBeginLoadingAction");
      api
        .post("/raporlar/listeler/mkraporlari/excel", this.getReportsMekmarMkList)
        .then((response) => {
          if (response.status) {
            const link = document.createElement("a");
            link.href = this.getLocalUrl + "raporlar/listeler/mkraporlari/excel";
            link.setAttribute("download", "mkRaporlari.xlsx");
            document.body.appendChild(link);
            link.click();
            this.$store.dispatch("setEndLoadingAction");
          }
        });
    },
    yearSelected(event) {
      this.$store.dispatch("setBeginLoadingAction");
      api.get(`/raporlar/listeler/mkraporlari/${event.value.Year}`).then((response) => {
        this.$store.dispatch("setReportsMekmarMkList", response.data);
        this.$store.dispatch("setEndLoadingAction");
      });
    },
  },
};
</script>
