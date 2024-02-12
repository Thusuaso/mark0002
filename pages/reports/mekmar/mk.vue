<template>
  <div>
    <div class="row container">
      <div class="col">
        <Dropdown
          v-model="selectedYear"
          :options="getOrderYearList"
          optionLabel="Year"
          @change="yearSelected($event)"
        />
      </div>
    </div>
    <TabView>
      <TabPanel header="Yıllık Po Bazında Siparişler">
        <reportsMekmarMkYearByPoOrdersList
          :list="getReportsMekmarMkList.byOrderList"
          :total="getReportsMekmarMkListTotal.byOrders"
          :loading="getLoading"
        />
      </TabPanel>
      <TabPanel header="Güncel Üretim Sipariş Raporu">
        <reportsMekmarMkYearByMarketingOrdersList
          :list="getReportsMekmarMkList.byMarketingList"
          :total="getReportsMekmarMkListTotal.byMarketing"
          :loading="getLoading"
        />
      </TabPanel>
      <TabPanel header="Yükleme Raporu">
        <reportsMekmarMkYearByMarketingForwardingList
          :list="getReportsMekmarMkForwList"
          :total="getReportsMekmarMkListTotal.byMarketingForw"
          :loading="getLoading"
        />
      </TabPanel>
      <TabPanel header="Müşteri Raporları">
        <reportsMekmarMkByCustomerList
          :list="getReportsMekmarMkList.byCustomerList"
          :loading="getLoading"
        />
      </TabPanel>
    </TabView>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters([
      "getOrderYearList",
      "getReportsMekmarMkList",
      "getReportsMekmarMkListTotal",
      "getReportsMekmarMkForwList",
      "getLoading",
    ]),
  },

  data() {
    return {
      selectedYear: null,
    };
  },
  created() {
    this.$store.dispatch("setReportsMekmarMkList");
    this.selectedYear = { Year: 2024 };
  },
  methods: {
    yearSelected(event) {
      this.$store.dispatch("setReportsMekmarMkListYear", event.value.Year);
    },
  },
};
</script>
