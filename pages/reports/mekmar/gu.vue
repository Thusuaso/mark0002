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
      <TabPanel header="Ayo Maliyet">
        <reportsMekmarGuAyoCostList
          :list="getReportsMekmarGuAyoCostList"
          :loading="getLoading"
        />
      </TabPanel>
      <TabPanel header="Konteynır (Mekmar)">
        <reportsMekmarGuContList
          :contCountList="getReportsMekmarGuContList"
          :contCustList="getReportsMekmarGuContByCustList"
          :loading="getLoading"
        />
      </TabPanel>
      <TabPanel header="Mekus">
        <reportsMekmarGuMekusList
          :list="getReportsMekmarGuMekusList"
          :loading="getLoading"
        />
      </TabPanel>
      <TabPanel header="Loglar">
        <reportsMekmarGuLogsList
          :list="getReportsMekmarGuLogsList"
          :loading="getLoading"
        />
      </TabPanel>
      <TabPanel header="Sevkiyat Özet (Yıl)">
        <div class="row">
          <reportsMekmarGuForwardingList
            v-for="item of getReportsMekmarGuForwList"
            :key="item"
            :list="item"
            :loading="getLoading"
          />
        </div>
      </TabPanel>
    </TabView>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters([
      "getReportsMekmarGuYearList",
      "getReportsMekmarGuAyoCostList",
      "getReportsMekmarGuContList",
      "getReportsMekmarGuContByCustList",
      "getReportsMekmarGuMekusList",
      "getReportsMekmarGuLogsList",
      "getReportsMekmarGuForwList",
      "getLoading",
    ]),
  },
  data() {
    return {
      selectedYear: null,
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
};
</script>
