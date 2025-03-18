<template>
    <div>
      <div class="row">
        <div class="col-9">
          <h3>FOB, CFR, DAP, DDP ve CIF yüklemelerinin evrak masrafı olması gerekiyor.(İstinai durumlarda el ile silinmesi gerekiyor.)</h3>

        </div>
        <div class="col-3">
          <Button class="w-100" label="Purchase Price" @click="purchasePrices"/>
        </div>
      </div>
  
      <financeList :list="filterFinanceList" :total="getFinanceListTotal" :expiry="getFinanceExpiryList"
        :allStatus="buttonAllStatus" :allList="getFinanceListAll"
         :maya="getFinanceListMaya" :status="true" />
      <Dialog :visible.sync="finance_collection_list_form" header="" modal :maximizable="true">
        <financeCollectionList :list="getFinanceCollectionList" :years="getFinanceCollectionYearList"
          :months="getFinanceCollectionMonthList" :total="getFinanceCollectionTotal"
          :sample="getFinanceCollectionSampleList" :sampleTotal="getFinanceCollectionSampleTotal" />
      </Dialog>
      <Dialog :visible.sync="finance_advanced_payment_form" header="" modal>
        <financeAdvancedPaymentForm :list="getFinanceAdvancedPaymentList" :model="getFinancePaymentModel"
          @advanced_payment_save_emit="advancesPaymentSave($event)" />
      </Dialog>
      <Dialog :visible.sync="finance_po_list_form" header="" modal>
        <financePoList :poList="getFinancePoList" :paidList="getFinancePaidList" :poListTotal="getFinancePoListTotal"
          :paidListTotal="getFinancePaidListTotal" @po_list_selected_emit="poListSelected($event)"
          @po_paid_detail_list_selected_emit="poPaidDetailListSelected($event)" :loading="getLoading" />
      </Dialog>
      <Dialog :visible.sync="finance_po_detail_form" header="" modal>
        <financePoForm :model="getFinancePoModel" :po="finance_po_list_detail"
          @po_paid_process_emit="poPaidProcess($event)" :poPaidList="getFinancePoPaidList"
          @po_paid_delete_emit="poPaidDelete($event)" />
      </Dialog>
      <Dialog :visible.sync="finance_po_paid_detail_form" header="" modal>
        <FinancePaidList :list="getFinancePoPaidDetailList" />
      </Dialog>
      <Dialog :visible.sync="purchase_price_dialog_form" header="" modal>
        <DataTable :value="purchasePriceList" class="p-datatable-sm"
        :filters.sync="filters"
        filterDisplay="row"
        @filter="filterSelected($event)"
        >
          <Column field="SiparisTarihi" header="Order Date"
          :showFilterMenu="false"
          :showFilterOperator="false"
          :showClearButton="false"
          :showApplyButton="false"
          :showFilterMatchModes="false"
          :showAddButton="false"
          >
            <template #body="slotProps">
              {{ slotProps.data.SiparisTarihi | dateToString }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              class="p-column-filter"
            />
          </template>
          </Column>
          <Column field="FirmaAdi" header="Customer"
          :showFilterMenu="false"
          :showFilterOperator="false"
          :showClearButton="false"
          :showApplyButton="false"
          :showFilterMatchModes="false"
          :showAddButton="false"
          >
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              class="p-column-filter"
            />
          </template>
        </Column>
          <Column field="SiparisNo" header="Po"
          :showFilterMenu="false"
          :showFilterOperator="false"
          :showClearButton="false"
          :showApplyButton="false"
          :showFilterMatchModes="false"
          :showAddButton="false"
          >
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              class="p-column-filter"
            />
          </template>
        </Column>
          <Column field="Tedarikci" header="Supplier"
          :showFilterMenu="false"
          :showFilterOperator="false"
          :showClearButton="false"
          :showApplyButton="false"
          :showFilterMatchModes="false"
          :showAddButton="false"
          >
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              class="p-column-filter"
            />
          </template>
        </Column>
          <Column field="Purchase" header="Purchase Total"

          >
            <template #body="slotProps">
              {{ slotProps.data.Purchase | formatPriceUsd }}
            </template>
            <template #footer>
              {{ purchase_price_total | formatPriceUsd }}
            </template>

          </Column>
      </DataTable>
      </Dialog>
    </div>
  </template>
  <script>
  import { mapGetters } from "vuex";
  import date from "../../../plugins/date";
  import api from "../../../plugins/excel.server.js";
  import { FilterMatchMode } from "primevue/api";

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
        "getFinanceListMaya",
        "getFinanceCollectionSampleList",
        "getFinanceCollectionSampleTotal",
        "getLocalUrl",
        "getLoading"
      ]),
    },
    data() {
      return {
        filters: {
          SiparisTarihi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          SiparisNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          Tedarikci: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          FirmaAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },

      },
        purchase_price_total:0,
        purchase_price_button_loading:false,
        purchasePriceList:[],
        purchase_price_dialog_form:false,
        filterFinanceList:[],
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
      this.$store.dispatch("setFinanceList");

    },
    methods: {
      filterSelected(event){
        this.purchase_price_total = 0;
        event.filteredValue.forEach(x=>{
          this.purchase_price_total += x.Purchase;

        });
      },
      purchasePrices(){
        this.purchase_price_button_loading = true;
        this.purchase_price_total = 0;
        this.$axios.get('/gu/reports/finance/purchase-prices').then(res=>{
          if(res.data.list){
            this.purchase_price_button_loading = false;
            this.purchasePriceList = res.data.list;
            res.data.list.forEach(x=>{
              this.purchase_price_total += x.Purchase;
            });
            this.purchase_price_dialog_form = true;

          }
        });

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
    watch:{

        getfinanceList(){

              this.filterFinanceList = this.getfinanceList.filter(x=>{
                return (x.customer_id != 37) && (x.customer_id != 7653) && (x.customer_id != 6519) && (x.customer_id != 2385) && (x.customer_id !=2386) && (x.customer_id!= 162) && (x.customer_id != 7540) && (x.customer_id != 7687) && (x.customer_id != 7590);
              });
              this.$store.dispatch('setFinanceTotalList',this.filterFinanceList)
        }
    }
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
  