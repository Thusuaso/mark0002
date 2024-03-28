<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col">
          <Button
            type="button"
            class="p-button-primary w-100"
            label="Collection"
            @click="collection"
          />
        </div>
        <div class="col">
          <Button
            type="button"
            class="p-button-secondary w-100"
            label="Pre-Payment"
            @click="advancedPayment"
          />
        </div>
        <div class="col">
          <Button class="p-button-warning" label="Excel" @click="excel_output" />
          <!-- <JsonExcel
            class="w-100"
            :data="getfinanceList"
            :fields="financeListExcelFields"
            worksheet="Finance"
            name="finans.xls"
          >
            <Button
              type="button"
              class="p-button-info w-100"
              icon="pi pi-file-excel"
              label="Excel"
            />
          </JsonExcel> -->
        </div>
        <div class="col">
          <Button
            type="button"
            class="p-button-warning w-100"
            :label="buttonAllStatus ? 'Unpaid Po' : 'All'"
            @click="buttonAllStatus = !buttonAllStatus"
          />
        </div>
      </div>
    </div>

    <financeList
      :list="getfinanceList"
      :total="getFinanceListTotal"
      :expiry="getFinanceExpiryList"
      :allStatus="buttonAllStatus"
      :allList="getFinanceListAll"
      @finance_list_selected_emit="financeListSelected($event)"
      :loading="getLoading"
      :maya="getFinanceListMaya"
    />
    <Dialog
      :visible.sync="finance_collection_list_form"
      header=""
      modal
      :maximizable="true"
    >
      <financeCollectionList
        :list="getFinanceCollectionList"
        :years="getFinanceCollectionYearList"
        :months="getFinanceCollectionMonthList"
        :total="getFinanceCollectionTotal"
        :loading="getLoading"
        :sample="getFinanceCollectionSampleList"
        :sampleTotal="getFinanceCollectionSampleTotal"
      />
    </Dialog>
    <Dialog :visible.sync="finance_advanced_payment_form" header="" modal>
      <financeAdvancedPaymentForm
        :list="getFinanceAdvancedPaymentList"
        :model="getFinancePaymentModel"
        @advanced_payment_save_emit="advancesPaymentSave($event)"
      />
    </Dialog>
    <Dialog :visible.sync="finance_po_list_form" header="" modal>
      <financePoList
        :poList="getFinancePoList"
        :paidList="getFinancePaidList"
        :poListTotal="getFinancePoListTotal"
        :paidListTotal="getFinancePaidListTotal"
        @po_list_selected_emit="poListSelected($event)"
        @po_paid_detail_list_selected_emit="poPaidDetailListSelected($event)"
        :loading="getLoading"
      />
    </Dialog>
    <Dialog :visible.sync="finance_po_detail_form" header="" modal>
      <financePoForm
        :model="getFinancePoModel"
        :po="finance_po_list_detail"
        @po_paid_process_emit="poPaidProcess($event)"
        :poPaidList="getFinancePoPaidList"
        @po_paid_delete_emit="poPaidDelete($event)"
      />
    </Dialog>
    <Dialog :visible.sync="finance_po_paid_detail_form" header="" modal>
      <FinancePaidList :list="getFinancePoPaidDetailList" />
    </Dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import date from "../../plugins/date";
import api from "../../plugins/excel.server.js";
export default {
  middleware: ["authority"],
  computed: {
    ...mapGetters([
      "getfinanceList",
      "getFinanceListTotal",
      "getFinanceExpiryList",
      "getFinanceListAll",
      "getFinanceCollectionList",
      "getFinanceCollectionYearList",
      "getFinanceCollectionMonthList",
      "getFinanceCollectionTotal",
      "getFinanceAdvancedPaymentList",
      "getFinancePaymentModel",
      "getFinancePoList",
      "getFinancePaidList",
      "getFinancePoListTotal",
      "getFinancePaidListTotal",
      "getFinancePoModel",
      "getFinancePoButtonStatus",
      "getFinancePoPaidList",
      "getFinancePoPaidDetailList",
      "getLoading",
      "getFinanceListMaya",
      "getFinanceCollectionSampleList",
      "getFinanceCollectionSampleTotal",
      "getLocalUrl",
    ]),
  },
  data() {
    return {
      buttonAllStatus: false,
      finance_collection_list_form: false,
      finance_advanced_payment_form: false,
      finance_po_detail_form: false,
      finance_po_list_detail: {},
      finance_po_list_form: false,
      finance_po_paid_detail_form: false,
      customerId: 0,
      financeListExcelFields: {
        "Firma Adı": "FirmaAdi",
        "Toplam Sipariş": "TotalOrder",
        "Üretimdeki Siparişler": "ProductOrder",
        "Yüklenen Siparişler": "ForwardingOrder",
        Peşinat: "AdvancedPayment",
        Ödenen: "Paid",
        Bakiye: "BalancedProduction",
        "Bakiye (Üretim Hariç)": "Balanced",
      },
    };
  },
  created() {
    this.$store.dispatch("setFinanceList");
  },
  methods: {
    excel_output() {
      api.post("/finance/reports/test/excel", this.getfinanceList).then((response) => {
        if (response.status) {
          const link = document.createElement("a");
          link.href = this.getLocalUrl + "finance/reports/test/excel";

          link.setAttribute("download", "finans_test_list.xlsx");
          document.body.appendChild(link);
          link.click();
        }
      });
    },
    poPaidDetailListSelected(event) {
      const data = {
        Tarih: date.dateToString(event.data.Tarih),
        MusteriID: this.customerId,
      };
      this.$store.dispatch("setPoPaidDetailList", data);
      this.finance_po_paid_detail_form = true;
    },
    poPaidDelete(event) {
      if (confirm("Silme İşlemini Onaylıyor musunuz?")) {
        this.$store.dispatch("setPoPaidDelete", event);
        const data = {
          description:
            this.$cookie.get("username") +
            ", " +
            event.SiparisNo +
            " na sahip $" +
            event.Tutar +
            " tutar, $" +
            event.Masraf +
            " masraf ve $" +
            event.Kur +
            " sildi.",
          po: event.SiparisNo,
          color: "#ffec31",
        };
        this.$logs.save(data);
      }
    },
    poPaidProcess(event) {
      if (this.getFinancePoButtonStatus) {
        this.save(event);
      } else {
        this.update(event);
      }
    },
    save(event) {
      this.$store.dispatch("setPoPaidSave", event);
      const data = {
        description:
          this.$cookie.get("username") +
          ", " +
          event.SiparisNo +
          " ya  $" +
          event.Tutar +
          " tutar, $" +
          event.Masraf +
          " masraf ve $" +
          event.Kur +
          " kur girişi yaptı.",
        po: event.SiparisNo,
        color: "#ffec31",
      };
      this.$logs.save(data);
    },
    update(event) {
      this.$store.dispatch("setPoPaidUpdate", event);
      const data = {
        description:
          this.$cookie.get("username") +
          ", " +
          event.SiparisNo +
          " nın $" +
          event.Tutar +
          " tutar, $" +
          event.Masraf +
          " masraf ve $" +
          event.Kur +
          " kurunu değiştirdi.",
        po: event.SiparisNo,
        color: "#ffec31",
      };
      this.$logs.save(data);
    },
    poListSelected(event) {
      this.finance_po_list_detail = event.data;
      this.finance_po_detail_form = true;
      this.$store.dispatch("setFinancePoPaidList", event.data.SiparisNo);
    },
    financeListSelected(event) {
      this.customerId = event.data.customer_id;
      this.$store.dispatch("setFinancePoList", event.data.customer_id);
      this.finance_po_list_form = true;
    },
    advancesPaymentSave(event) {
      this.$store.dispatch("setAdvancedPaymentSave", event);
    },
    advancedPayment() {
      this.$store.dispatch("setFinanceAdvancedPaymentList");
      this.$store.dispatch("setFinancePaymentModel");
      this.finance_advanced_payment_form = true;
    },
    collection() {
      this.$store.dispatch("setFinanceCollectionList");
      this.finance_collection_list_form = true;
    },
  },
};
</script>
