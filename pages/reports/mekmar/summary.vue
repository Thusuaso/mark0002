<template>
  <div class="container">
    <div class="row">
      <reportsMekmarSummaryList
        v-for="(item, index) of getReportsMekmarSummaryOrderList"
        :key="item.Month"
        :list="item"
        :year="new Date().getFullYear() - index"
        :total="getReportsMekmarSummaryOrderListTotal[index]"
        @order_selected_list_emit="orderSelectedList($event, true)"
        :loading="getLoading"
        :status="'Order'"
      />
      <reportsMekmarSummaryList
        v-for="(item, index) of getReportsMekmarSummaryOrderListByRepresentative"
        :key="item.Month"
        :list="item"
        :year="new Date().getFullYear() - index"
        :total="getReportsMekmarSummaryOrderListByRepresentativeTotal[index]"
        @order_selected_list_emit="orderSelectedList($event, true)"
        :loading="getLoading"
        :status="'Representative'"
      />
    </div>
    <div class="row">
      <reportsMekmarSummaryList
        v-for="(item, index) of getReportsMekmarSummaryForwardingList"
        :key="item.Month"
        :list="item"
        :year="new Date().getFullYear() - index"
        :total="getReportsMekmarSummaryForwardingListTotal[index]"
        @order_selected_list_emit="orderSelectedList($event, false)"
        :loading="getLoading"
        :status="'Shipment'"
      />
    </div>
    <Dialog :visible.sync="reports_mekmar_summary_list_detail_dialog" header="" modal>
      <reportsMekmarSummaryDetailList
        :list="getReportsMekmarSummaryOrderDetail"
        :total="getReportsMekmarSummaryOrderDetailTotal"
        :loading="getLoading"
      />
    </Dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Cookies from "js-cookie";
export default {
  middleware: ["authority"],
  computed: {
    ...mapGetters([
      "getReportsMekmarSummaryOrderList",
      "getReportsMekmarSummaryOrderListTotal",
      "getReportsMekmarSummaryOrderDetail",
      "getReportsMekmarSummaryOrderDetailTotal",
      "getReportsMekmarSummaryForwardingList",
      "getReportsMekmarSummaryForwardingListTotal",

      "getReportsMekmarSummaryOrderListByRepresentative",
      "getReportsMekmarSummaryOrderListByRepresentativeTotal",

      "getLoading",
    ]),
  },
  data() {
    return {
      reports_mekmar_summary_list_detail_dialog: false,
      userId: null,
    };
  },
  created() {
    this.$store.dispatch("setReportsMekmarSummaryOrderList");
    this.$store.dispatch("setReportsMekmarSummaryForwardingList");
    this.userId = Cookies.get("userId");
  },
  methods: {
    orderSelectedList(event, status) {
      if (status) {
        this.$store.dispatch("setReportsMekmarSummaryOrderDetail", event);
        this.reports_mekmar_summary_list_detail_dialog = true;
      } else {
        this.$store.dispatch("setReportsMekmarSummaryForwardingDetail", event);
        this.reports_mekmar_summary_list_detail_dialog = true;
      }
    },
  },
  watch: {
    userId() {
      this.$store.dispatch(
        "setReportsMekmarSummaryOrderListByRepresentative",
        this.userId
      );
    },
  },
};
</script>
