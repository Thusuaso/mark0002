<template>
  <div>
    <div class="row container">
      <div class="col">
        <Dropdown v-model="selectedYear" :options="getReportsMekmarGuYearList" optionLabel="Year"
          @change="yearSelected($event)" />
      </div>
    </div>
    <TabView>
      <TabPanel header="Container (Mekmar)">
        <reportsMekmarGuContList :contCountList="getReportsMekmarGuContList"
          :contCustList="getReportsMekmarGuContByCustList" />
      </TabPanel>
      <TabPanel header="Mekus">
        <reportsMekmarGuMekusList :list="getReportsMekmarGuMekusList" />
      </TabPanel>
      <TabPanel header="Logs">
        <reportsMekmarGuLogsList :list="getReportsMekmarGuLogsList" />
      </TabPanel>
      <TabPanel header="Shipment Summary (Yıl)">
        <div class="row">
          <reportsMekmarGuForwardingList v-for="item of getReportsMekmarGuForwList" :key="item" :list="item" />
        </div>
      </TabPanel>
      <TabPanel header="Ayo">
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
      "getReportsMekmarGuAyoList"
    ]),
  },
  data() {
    return {
      selectedYear: null,
      ayoUsdTotal:0,
      ayoTlTotal:0
    };
  },
  beforeCreate() {
    this.$store.dispatch("setReportsMekmarGuList");
  },
  created() {
    this.selectedYear = { Year: 2024 };

  },

  methods: {
    yearSelected(event) {
      this.$store.dispatch("setReportsMekmarGuListYear", event.value.Year);
    },
  },
  watch: {
    getReportsMekmarGuAyoList() {
      this.ayoUsdTotal = 0;
      this.ayoTlTotal = 0;
      this.getReportsMekmarGuAyoList.forEach(x => {
        this.ayoUsdTotal += x.Usd;
        this.ayoTlTotal += x.Tl;
      });
    }
  }
};
</script>
