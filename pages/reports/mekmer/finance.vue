<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col">
          <Button
            class="p-button-warning"
            label="Excel"
            @click="excel_output"
          />
        </div>
        <div class="col">
          <Button
            class="p-button-info"
            label="Collection"
            @click="collectionClick"
          />
        </div>
      </div>
    </div>

    <financeListMekmer
      :list="getFinanceListFilter"
      :total="getFinanceTotalListMekmer"
      :expiry="getFinanceExpiryList"
      :allStatus="buttonAllStatus"
      :allList="getFinanceListAll"
      @finance_list_selected_mekmer_emit="financeListSelected($event)"
      :loading="getLoading"
      :maya="getFinanceListMaya"
      :status="false"
    />

    <div class="row">
      <div class="row">
        <div class="col-sm-6">
          <Dropdown
            class="w-100"
            v-model="selectedMonth"
            :options="months"
            optionLabel="name"
            @change="monthSelected($event)"
          />
        </div>
        <div class="col-sm-6">
          <vue-excel-xlsx
            :data="monthly_mekmar_finance_list"
            :columns="getFinanceMekmerToMekmarFields"
            :file-name="'Finance'"
            :file-type="'xlsx'"
            :sheet-name="'sheetname'"
            style="border: none; background-color: white; width: 100%"
          >
            <Button
              type="button"
              class="p-button-info w-100"
              icon="pi pi-file-excel"
              label="Excel"
            />
          </vue-excel-xlsx>
        </div>
      </div>
      <div class="col-12">
        <DataTable
          :value="monthly_mekmar_finance_list"
          scrollable
          scrollHeight="600px"
          :selection.sync="selectedMonthlyFinance"
          selectionMode="single"
          @row-select="financeMonthlySelected($event)"
          sortField="yuklemetarihi"
          :sortOrder="-1"
        >
          <template #header>
            MEKMAR => MEKMER DEN SATIN ALDIĞI ÜRÜNLERİN BEDELLERİ
          </template>
          <Column
            field="siparisno"
            header="Purchase Order"
            headerClass="tableHeader"
            bodyClass="tableBody"
          >
            <template #body="slotProps">
              {{ slotProps.data.siparisno }}
            </template>
          </Column>

          <Column
            field="yuklemetarihi"
            header="Shipment Date"
            headerClass="tableHeader"
            bodyClass="tableBody"
          >
            <template #body="slotProps">
              {{ slotProps.data.yuklemetarihi | dateToString }}
            </template>
          </Column>
          <Column
            field="toplam"
            header="Order Total USD"
            headerClass="tableHeader"
            bodyClass="tableBody"
          >
            <template #body="slotProps">
              {{ slotProps.data.toplam | formatPriceUsd }}
            </template>
            <template #footer>
              {{ mekmarListTotal.order | formatPriceUsd }}
            </template>
          </Column>

          <Column
            field="iscilik"
            header="Labour"
            headerClass="tableHeader"
            bodyClass="tableBody"
          >
            <template #body="slotProps">
              {{ slotProps.data.iscilik | formatPriceUsd }}
            </template>
            <template #footer>
              {{ mekmarListTotal.labour | formatPriceUsd }}
            </template>
          </Column>
          <Column
            field="kalan"
            header="Balance"
            headerClass="tableHeader"
            bodyClass="tableBody"
          >
            <template #body="slotProps">
              <div
                :style="{
                  backgroundColor:
                    slotProps.data.kalan > 8 ? 'green' : 'transparent',
                  color: slotProps.data.kalan > 8 ? 'white' : 'black',
                }"
              >
                {{ slotProps.data.kalan | formatPriceUsd }}
              </div>
            </template>
            <template #footer>
              {{ mekmarListTotal.balanced | formatPriceUsd }}
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
    <Dialog
      :visible.sync="finance_collection_list_form"
      header=""
      modal
      :maximizable="true"
    >
      <financeCollectionListMekmer
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
      <financeAdvancedPaymentFormMekmer
        :list="getFinanceAdvancedPaymentList"
        :model="getFinancePaymentModel"
        @advanced_payment_save_emit="advancesPaymentSave($event)"
      />
    </Dialog>
    <Dialog :visible.sync="finance_po_list_form" header="" modal>
      <financePoListMekmer
        :poList="getFinancePoList"
        :paidList="getFinancePaidList"
        :poListTotal="getFinancePoListTotal"
        :paidListTotal="getFinancePaidListTotal"
        @po_list_selected_emit="poListSelected($event)"
        @po_paid_detail_list_selected_emit="poPaidDetailListSelected($event)"
        :loading="getLoading"
        @paid_selected_emit="paidDetailSelected($event)"
      />
    </Dialog>
    <Dialog :visible.sync="finance_po_detail_form" header="" modal>
      <financePoFormMekmer
        :model="getFinancePoModelMekmer"
        :po="finance_po_list_detail"
        @po_paid_process_emit="poPaidProcess($event)"
        :poPaidList="getFinancePoPaidListMekmer"
        @po_paid_delete_emit="poPaidDelete($event)"
      />
    </Dialog>
    <Dialog :visible.sync="finance_po_paid_detail_form" header="" modal>
      <FinancePaidListMekmer :list="getFinancePoPaidDetailList" />
    </Dialog>
    <Dialog
      :visible.sync="finance_mekmar_form"
      header=""
      modal
      contentStyle="width:1200px;height:700px"
    >
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div class="row m-auto text-center">
        <div class="col-sm-6">
          <CustomInput
            :value="model.balanced"
            text="Balanced"
            @onInput="model.balanced = $event"
            :disabled="true"
          />
        </div>
        <div class="col-sm-6">
          <span class="p-float-label">
            <Calendar
              v-model="paid_date"
              inputId="date"
              @date-select="paidDateSelected($event)"
              dateFormat="dd/mm/yy"
            />
            <label for="date">Date</label>
          </span>
        </div>
      </div>
      <br />
      <br />
      <br />
      <div class="row m-auto text-center">
        <div class="col-sm-3">
          <CustomInput
            :value="model.paid"
            text="Paid Amount"
            @onInput="model.paid = $event"
            :disabled="false"
          />
        </div>
        <div class="col-sm-3">
          <CustomInput
            :value="model.cost"
            text="Cost"
            @onInput="model.cost = $event"
            :disabled="false"
          />
        </div>
        <div class="col-sm-3">
          <CustomInput
            :value="model.currency"
            text="Rate"
            @onInput="model.currency = $event"
            :disabled="false"
          />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <Button
            type="button"
            class="p-button-success w-100"
            label="Save"
            @click="saveFinanceMekmar"
          />
        </div>
      </div>
    </Dialog>
    <Dialog :visible.sync="po_paid_detail_list_dialog_visible" header="" modal>
      <DataTable
        :value="poPaidDetailList"
        responsiveLayout="scroll"
        :selection.sync="selectedPoPaidDetailList"
        selectionMode="single"
        @row-click="poPaidDetailListSelectedDataTable($event)"
      >
        <Column field="Tarih" header="Date">
          <template #body="slotProps">
            {{ slotProps.data.Tarih | dateToString }}
          </template>
        </Column>
        <Column field="SiparisNo" header="Po"></Column>
        <Column field="Aciklama" header="Desc."></Column>
        <Column field="Tutar" header="Paid">
          <template #body="slotProps">
            {{ slotProps.data.Tutar | formatPriceUsd }}
          </template>
        </Column>
        <Column field="Masraf" header="Currency">
          <template #body="slotProps">
            {{ slotProps.data.Masraf | formatPriceUsd }}
          </template>
        </Column>
        <Column field="Kur" header="Currency">
          <template #body="slotProps">
            {{ slotProps.data.Kur | formatPriceUsd }}
          </template>
        </Column>
      </DataTable>
    </Dialog>
    <Dialog
      :visible.sync="po_paid_detail_list_detail_dialog_visible"
      header=""
      modal
    >
      <div class="row m-auto text-center mt-5 mb-5">
        <div class="col">
          <Calendar v-model="modelPaidPo.Tarih" />
        </div>
        <div class="col">
          <CustomInput
            :value="modelPaidPo.Tutar"
            text="Paid"
            @onInput="model.Tutar = $event"
          />
        </div>
        <div class="col">
          <CustomInput
            :value="modelPaidPo.Masraf"
            text="Cost"
            @onInput="model.Masraf = $event"
          />
        </div>
        <div class="col">
          <CustomInput
            :value="modelPaidPo.Kur"
            text="Currency"
            @onInput="model.Currency = $event"
          />
        </div>
        <div class="col">
          <Textarea v-model="modelPaidPo.Aciklama" rows="5" cols="30" />
        </div>
      </div>
      <div class="row m-auto text-center mt-5">
        <div class="col">
          <Button
            class="p-button-success w-100"
            label="Update"
            @click="updatePoPaid"
          />
        </div>
        <div class="col">
          <Button
            class="p-button-danger w-100"
            label="Delete"
            @click="deletePoPaid"
          />
        </div>
      </div>
    </Dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import date from "@/plugins/date";
import api from "@/plugins/excel.server.js";
import server from "@/plugins/excel.server";

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
      "getLoading",
    ]),
  },
  data() {
    return {
      poPaidDetailSelectedList: {},
      po_paid_detail_list_detail_dialog_visible: false,
      selectedPoPaidDetailList: {},
      po_paid_detail_list_dialog_visible: false,
      poPaidDetailList: [],
      getFinanceMekmerToMekmarFields: [
        { label: "Po", field: "siparisno" },
        { label: "Shipped Date", field: "yuklemetarihi" },
        { label: "Order", field: "toplam" },
        { label: "Labour", field: "iscilik" },
        { label: "Balanced", field: "kalan" },
      ],
      paid_date: null,
      selectedMonthlyFinance: null,
      monthly_mekmar_finance_list: [],
      finance_collection_list_form: false,
      checked: "Mekmer",
      mekmarMekmerList: false,
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
      months: [
        { id: 1, name: "January" },
        { id: 2, name: "February" },
        { id: 3, name: "March" },
        { id: 4, name: "April" },
        { id: 5, name: "May" },
        { id: 6, name: "June" },
        { id: 7, name: "July" },
        { id: 8, name: "August" },
        { id: 9, name: "September" },
        { id: 10, name: "October" },
        { id: 11, name: "November" },
        { id: 12, name: "December" },
      ],
      selectedMonth: {},
      mekmarListTotal: {
        order: 0,
        labour: 0,
        balanced: 0,
      },
      finance_mekmar_form: false,
      model: {
        balanced: 0,
        paid: 0,
        cost: 0,
        currency: 0,
        date: "",
        po: "",
        customer: 0,
      },
      modelPaidPo: {
        ID: 0,
        Tarih: "",
        Aciklama: "",
        Tutar: 0,
        Masraf: 0,
        Kur: 0,
      },
    };
  },
  created() {
    this.$store.dispatch("setFinanceListFilter");
    const date = new Date();
    const month = date.getMonth() + 1;
    this.selectedMonth = this.months.find((x) => x.id == month);
    this.mekmarListTotal = {
      order: 0,
      labour: 0,
      balanced: 0,
    };
    api.get("/finance/po/list/mekmer/month/" + month).then((res) => {
      this.monthly_mekmar_finance_list = res.data.ayrinti_list;
      res.data.ayrinti_list.forEach((x) => {
        this.mekmarListTotal.order += x.toplam;
        this.mekmarListTotal.labour += x.iscilik;
        this.mekmarListTotal.balanced += x.kalan;
      });
    });
  },
  methods: {
    deletePoPaid() {
      if (confirm("Are you sure you want to delete")) {
        this.$axios
          .delete(
            `/finance/mekmer/paid/detail/list/delete/${this.modelPaidPo.ID}`
          )
          .then((res) => {
            if (res.data.status) {
              this.$toast.success("Silme işlemi başarıyla gerçekleştirildi.");
            } else {
              this.$toast.error("Silme işlemi başarısız.");
            }
          });
      }
    },
    updatePoPaid() {
      this.$axios
        .put("/finance/mekmer/paid/detail/list/update", this.modelPaidPo)
        .then((res) => {
          if (res.data.status) {
          }
        });
    },
    poPaidDetailListSelectedDataTable(event) {
      this.poPaidDetailSelectedList = event.data;
      this.modelPaidPo.ID = event.data.ID;
      this.modelPaidPo.Tarih = date.dateToString(event.data.Tarih);
      this.modelPaidPo.Aciklama = event.data.Aciklama;
      this.modelPaidPo.Tutar = event.data.Tutar;
      this.modelPaidPo.Masraf = event.data.Masraf;
      this.modelPaidPo.Kur = event.data.Kur;

      this.po_paid_detail_list_detail_dialog_visible = true;
    },
    paidDetailSelected(event) {
      this.$axios
        .get(
          `/finance/mekmer/paid/detail/list/${event.tarih}/${this.customerId}`
        )
        .then((res) => {
          this.poPaidDetailList = res.data.list;
          this.po_paid_detail_list_dialog_visible = true;
        });
    },
    saveFinanceMekmar() {
      api.post("/finance/mekmar/po/paid/save", this.model).then((res) => {
        if (res) {
          this.$toast.success("Success");
          api
            .get("/finance/po/list/mekmer/month/" + this.selectedMonth.id)
            .then((res) => {
              this.monthly_mekmar_finance_list = res.data.ayrinti_list;
              res.data.ayrinti_list.forEach((x) => {
                this.mekmarListTotal.order += x.toplam;
                this.mekmarListTotal.labour += x.iscilik;
                this.mekmarListTotal.balanced += x.kalan;
              });
            });
        } else {
          this.$toast.error("Error");
        }
      });
    },
    paidDateSelected(event) {
      this.model.date = date.dateToString(event);
      const year = event.getFullYear();
      const month = event.getMonth() + 1;
      const day = event.getDate();
      server
        .get("/finance/doviz/liste/" + year + "/" + month + "/" + day)
        .then((response) => {
          this.model.currency = parseFloat(response.data);
        });
    },
    monthSelected(event) {
      api.get("/finance/po/list/mekmer/month/" + event.value.id).then((res) => {
        this.mekmarListTotal.order = 0;
        this.mekmarListTotal.labour = 0;
        this.mekmarListTotal.balanced = 0;
        this.monthly_mekmar_finance_list = res.data.ayrinti_list;
        res.data.ayrinti_list.forEach((x) => {
          this.mekmarListTotal.order += x.toplam;
          this.mekmarListTotal.labour += x.iscilik;
          this.mekmarListTotal.balanced += x.kalan;
        });
      });
    },
    collectionClick() {
      this.$store.dispatch("setFinanceCollectionListMekmer");
      this.finance_collection_list_form = true;
    },
    checkedMekmarMekmer(event) {
      if (this.mekmarMekmerList) {
        this.checked = "Mekmar";
        this.$store.dispatch("setFinanceListFilter");
      } else {
        this.checked = "Mekmer";
        this.$store.dispatch("setFinanceList");
      }
    },
    excel_output() {
      api
        .post("/finance/reports/test/excel/mekmer", this.getFinanceListFilter)
        .then((response) => {
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
      this.$store.dispatch("setAdvancedPaymentSaveMekmer", event);
    },
    advancedPayment() {
      this.$store.dispatch("setFinanceAdvancedPaymentListMekmer");
      this.$store.dispatch("setFinancePaymentModel");
      this.finance_advanced_payment_form = true;
    },
    financeMonthlySelected(event) {
      this.finance_mekmar_form = true;
      this.model.customer = event.data.musteri_id;
      this.model.po = event.data.siparisno;
      this.model.balanced = event.data.kalan;
    },
  },
};
</script>
<style scoped>
@media screen and (max-width: 576px) {
  .row {
    clear: both;
    display: block;
    width: 100%;
  }
  .col {
    clear: both;
    display: block;
    width: 100%;
  }
}
</style>
