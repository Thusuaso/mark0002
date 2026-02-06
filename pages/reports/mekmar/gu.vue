<template>
  <div>
    <div class="row container">
      <div class="col">
        <Dropdown
          v-model="selectedYear"
          :options="getReportsMekmarGuYearList"
          optionLabel="Year"
          @change="yearSelected($event)"
        />
      </div>
    </div>
    <TabView>
      <TabPanel header="Container (Mekmar)">
        <reportsMekmarGuContList
          :contCountList="getReportsMekmarGuContList"
          :contCustList="getReportsMekmarGuContByCustList"
        />
      </TabPanel>
      <!-- <TabPanel header="Mekus">
        <reportsMekmarGuMekusList :list="getReportsMekmarGuMekusList" />
      </TabPanel> -->
      <TabPanel header="Logs">
        <reportsMekmarGuLogsList :list="getReportsMekmarGuLogsList" />
      </TabPanel>
      <TabPanel header="Shipment Summary (Yearly)">
        <Button
          type="button"
          label="Excel"
          class="p-button-secondary"
          @click="forwarding_excel_output"
        />
        <div class="row">
          <reportsMekmarGuForwardingList
            v-for="item of getReportsMekmarGuForwList"
            :key="item"
            :list="item"
          />
        </div>
      </TabPanel>
      <TabPanel header="Order Summary (Yearly)">
        <Button
          type="button"
          label="Excel"
          class="p-button-secondary"
          @click="forwarding_excel_output_2"
        />
        <div class="row">
          <reportsMekmarGuForwardingList
            v-for="item of getReportsMekmarGuOrderList"
            :key="item"
            :list="item"
          />
        </div>
      </TabPanel>
      <!-- <TabPanel header="Ayo">
        <DataTable :value="getReportsMekmarGuAyoList">
          <Column field="Yil" header="Year"></Column>
          <Column field="Usd" header="Usd">
            <template #body="slotProps">
              {{ slotProps.data.Usd | formatPriceUsd }}
            </template>
            <template #footer>
              {{ ayoUsdTotal | formatPriceUsd }}
            </template>
          </Column>
          <Column field="Tl" header="Tl">
            <template #body="slotProps">
              {{ slotProps.data.Tl | formatPriceTl }}
            </template>
            <template #footer>
              {{ ayoTlTotal | formatPriceTl }}
            </template>
          </Column>
        </DataTable>



      </TabPanel> -->
      <TabPanel header="Seller Orders">
        <ordererOperation />
      </TabPanel>
      <TabPanel header="Seller Shipped">
        <shippedOperation />
      </TabPanel>
      <TabPanel header="Seller Shipped Profit">
        <profitGu
          :thisyear="ayoListThisYear"
          :oneyear="ayoListOneYearAgo"
          :twoyear="ayoListTwoYearAgo"
        />
      </TabPanel>
      <TabPanel header="Offer Source">
        <guOfferSource />
      </TabPanel>
      <TabPanel header="Offer Country">
        <guOfferCountry />
      </TabPanel>
    </TabView>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  middleware: ["authority"],
  computed: {
    ...mapGetters([
      "getReportsMekmarGuYearList",
      "getReportsMekmarGuAyoCostList",
      "getReportsMekmarGuContList",
      "getReportsMekmarGuContByCustList",
      "getReportsMekmarGuMekusList",
      "getReportsMekmarGuLogsList",
      "getReportsMekmarGuForwList",
      "getReportsMekmarGuAyoList",
      "getLocalUrl",
      "getReportsMekmarGuOrderList",
    ]),
  },
  data() {
    return {
      selectedYear: null,
      ayoUsdTotal: 0,
      ayoTlTotal: 0,
      ayoListThisYear: [],
      ayoListOneYearAgo: [],
      ayoListTwoYearAgo: [],
    };
  },
  beforeCreate() {
    this.$store.dispatch("setReportsMekmarGuList");
  },
  created() {
    this.selectedYear = { Year: 2026 };
    this.$excelApi
      .get(`/maliyet/listeler/maliyetListesi/${this.selectedYear.Year}`)
      .then((res) => {
        this.ayoListThisYear = res.data;
      });

    this.$excelApi
      .get(`/maliyet/listeler/maliyetListesi/${this.selectedYear.Year - 1}`)
      .then((res) => {
        this.ayoListOneYearAgo = res.data;
      });
    this.$excelApi
      .get(`/maliyet/listeler/maliyetListesi/${this.selectedYear.Year - 2}`)
      .then((res) => {
        this.ayoListTwoYearAgo = res.data;
      });
  },

  methods: {
    forwarding_excel_output() {
      this.$excelApi
        .post("/reports/gu/forwarding", this.getReportsMekmarGuForwList)
        .then((response) => {
          if (response.status) {
            const link = document.createElement("a");
            link.href = this.getLocalUrl + "/reports/gu/forwarding";

            link.setAttribute("download", "gu_excel.xlsx");
            document.body.appendChild(link);
            link.click();
          }
        });
    },
    forwarding_excel_output_2() {
      this.$excelApi
        .post("/reports/gu/forwarding", this.getReportsMekmarGuOrderList)
        .then((response) => {
          if (response.status) {
            const link = document.createElement("a");
            link.href = this.getLocalUrl + "/reports/gu/forwarding";

            link.setAttribute("download", "gu_excel.xlsx");
            document.body.appendChild(link);
            link.click();
          }
        });
    },
    yearSelected(event) {
      this.$store.dispatch("setReportsMekmarGuListYear", event.value.Year);
    },
  },
  watch: {
    getReportsMekmarGuAyoList() {
      this.ayoUsdTotal = 0;
      this.ayoTlTotal = 0;
      this.getReportsMekmarGuAyoList.forEach((x) => {
        this.ayoUsdTotal += x.Usd;
        this.ayoTlTotal += x.Tl;
      });
    },
  },
};
</script>
