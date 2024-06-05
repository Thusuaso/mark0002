<template>
  <div>
    <div class="container">
      <div class="row">


        <div class="col">
          <Button class="p-button-warning" label="Excel" @click="excel_output" />

        </div>
        <div class="col">
          <Button class="p-button-info" label="Collection" @click="collectionClick" />
        </div>

      </div>
    </div>

    <financeListMekmer :list="getFinanceListFilter" :total="getFinanceTotalListMekmer" :expiry="getFinanceExpiryList"
      :allStatus="buttonAllStatus" :allList="getFinanceListAll"
      @finance_list_selected_mekmer_emit="financeListSelected($event)" :loading="getLoading" :maya="getFinanceListMaya"
      :status="false" />
    <Dialog :visible.sync="finance_collection_list_form" header="" modal :maximizable="true">
      <financeCollectionListMekmer :list="getFinanceCollectionList" :years="getFinanceCollectionYearList"
        :months="getFinanceCollectionMonthList" :total="getFinanceCollectionTotal" :loading="getLoading"
        :sample="getFinanceCollectionSampleList" :sampleTotal="getFinanceCollectionSampleTotal" />
    </Dialog>
    <Dialog :visible.sync="finance_advanced_payment_form" header="" modal>
      <financeAdvancedPaymentFormMekmer :list="getFinanceAdvancedPaymentList" :model="getFinancePaymentModel"
        @advanced_payment_save_emit="advancesPaymentSave($event)" />
    </Dialog>
    <Dialog :visible.sync="finance_po_list_form" header="" modal>
      <financePoListMekmer :poList="getFinancePoList" :paidList="getFinancePaidList"
        :poListTotal="getFinancePoListTotal" :paidListTotal="getFinancePaidListTotal"
        @po_list_selected_emit="poListSelected($event)"
        @po_paid_detail_list_selected_emit="poPaidDetailListSelected($event)" :loading="getLoading" />
    </Dialog>
    <Dialog :visible.sync="finance_po_detail_form" header="" modal>
      <financePoFormMekmer :model="getFinancePoModelMekmer" :po="finance_po_list_detail"
        @po_paid_process_emit="poPaidProcess($event)" :poPaidList="getFinancePoPaidListMekmer"
        @po_paid_delete_emit="poPaidDelete($event)" />
    </Dialog>
    <Dialog :visible.sync="finance_po_paid_detail_form" header="" modal>
      <FinancePaidListMekmer :list="getFinancePoPaidDetailList" />
    </Dialog>
  </div>
</template>
  <script>
  import { mapGetters } from "vuex";
  import date from "@/plugins/date";
  import api from "@/plugins/excel.server.js";
  export default {
    computed: {
      ...mapGetters([
      "getFinanceTotalListMekmer",
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
        "getFinancePoButtonStatus",
        "getFinancePoPaidList",
        "getFinancePoPaidDetailList",
        "getFinanceListMaya",
        "getFinanceCollectionSampleList",
        "getFinanceCollectionSampleTotal",
        "getLocalUrl",
        "getFinancePoModelMekmer",
        "getFinancePoPaidListMekmer",
        "getFinanceListFilter",
        "getLoading"
      ]),
    },
    data() {
      return {
        finance_collection_list_form:false,
        checked:'Mekmer',
        mekmarMekmerList:false,
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
      this.$store.dispatch("setFinanceListFilter");
    },
    methods: {
      collectionClick() {
        this.$store.dispatch("setFinanceCollectionListMekmer");
        this.finance_collection_list_form = true;
      },
      checkedMekmarMekmer(event){
        if(this.mekmarMekmerList){
          this.checked = 'Mekmar';
  
          this.$store.dispatch('setFinanceListFilter');
        }else{
          this.checked = 'Mekmer';
  
            this.$store.dispatch('setFinanceList');
        }
      },
      excel_output() {
        api.post("/finance/reports/test/excel/mekmer", this.getFinanceListFilter).then((response) => {
          if (response.status) {
            const link = document.createElement("a");
            link.href = this.getLocalUrl + "/finance/reports/test/excel/mekmer";
  
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
          this.$store.dispatch("setPoPaidDeleteMekmer", event);
          const data = {
            description:
              this.$cookie.get("username") +
              ", " +
              event.siparisno +
              " na sahip $" +
              event.tutar +
              " tutar, $" +
              event.masraf +
              " masraf ve $" +
              event.kur +
              " sildi.",
            po: event.siparisno,
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
        this.$store.dispatch("setPoPaidMekmerSave", event);
        const data = {
          description:
            this.$cookie.get("username") +
            ", " +
            event.siparisno +
            " ya  $" +
            event.tutar +
            " tutar, $" +
            event.masraf +
            " masraf ve $" +
            event.kur +
            " kur girişi yaptı.",
          po: event.siparisno,
          color: "#ffec31",
        };
        this.$logs.save(data);
      },
      update(event) {
        this.$store.dispatch("setPoPaidUpdateMekmer", event);
        const data = {
          description:
            this.$cookie.get("username") +
            ", " +
            event.siparisno +
            " nın $" +
            event.tutar +
            " tutar, $" +
            event.masraf +
            " masraf ve $" +
            event.kur +
            " kurunu değiştirdi.",
          po: event.siparisno,
          color: "#ffec31",
        };
        this.$logs.save(data);
      },
      poListSelected(event) {
        this.finance_po_list_detail = event.data;
        this.finance_po_detail_form = true;
        this.$store.dispatch("setFinancePoPaidListMekmer", event.data.siparisno);
      },
      financeListSelected(event) {
        this.customerId = event.data.customer_id;
        this.$store.dispatch("setFinancePoMekmerList", event.data.customer_id);
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

    },
  };
  </script>
  <style scoped>
    @media screen and (max-width:576px) {
      .row{
        clear:both;
        display:block;
        width:100%;
      }
      .col{
        clear:both;
        display:block;
        width:100%;
      }
  
    }
  </style>
  