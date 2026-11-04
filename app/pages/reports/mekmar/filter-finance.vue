<template>
  <div>
    <div class="row">
      <div class="col-9">
        <h3>
          FOB, CFR, DAP, DDP ve CIF yüklemelerinin evrak masrafı olması
          gerekiyor.(İstinai durumlarda el ile silinmesi gerekiyor.)
        </h3>
      </div>
      <div class="col-3">
        <Button class="w-100" label="Purchase Price" @click="purchasePrices" />
      </div>
    </div>

    <FinanceList
      :list="filterFinanceList"
      :total="financeStore.getFinanceListTotal"
      :expiry="financeStore.getFinanceExpiryList"
      :allStatus="buttonAllStatus"
      :allList="financeStore.getFinanceListAll"
      :maya="financeStore.getFinanceListMaya"
      :status="true"
    />
    <Dialog
      v-model:visible="finance_collection_list_form"
      header=""
      modal
      :maximizable="true"
    >
      <FinanceCollectionList
        :list="financeStore.getFinanceCollectionList"
        :years="financeStore.getFinanceCollectionYearList"
        :months="financeStore.getFinanceCollectionMonthList"
        :total="financeStore.getFinanceCollectionTotal"
        :sample="financeStore.getFinanceCollectionSampleList"
        :sampleTotal="financeStore.getFinanceCollectionSampleTotal"
      />
    </Dialog>
    <Dialog v-model:visible="finance_advanced_payment_form" header="" modal>
      <FinanceAdvancedPaymentForm
        :list="financeStore.getFinanceAdvancedPaymentList"
        :model="modelsStore.getFinancePaymentModel"
        @advanced_payment_save_emit="advancesPaymentSave($event)"
      />
    </Dialog>
    <Dialog v-model:visible="finance_po_list_form" header="" modal>
      <!--
        :insurance EKLENDI -- DAVRANIS DEGISIKLIGI, bilerek.

        FinancePoList `insurance`i `required: true` olarak bildiriyor ve
        sablonunda "Insurance Cost" tablosunu ondan besliyor. Nuxt 2'de bu
        prop HIC GECILMIYORDU: Vue her acilista "Missing required prop:
        insurance" uyarisi basiyor ve o tablo BOS kaliyordu.

        Veri zaten yukleniyor: financeDetailInsuranceList,
        MUT_setFinancePoList icinde payload.insuranceList'ten doluyor
        (app/stores/finance.ts) -- yani PO listesiyle AYNI istekte geliyor,
        sadece bileşene ulasmiyordu.

        check-component-props denetcisi bu eksigi yakaladi. Bagladim cunku
        niyet tartismasiz: bileşen alani zorunlu bildiriyor, store veriyi
        tutuyor. SONUCU: daha once bos gorunen tablo artik dolu gelecek --
        istenmiyorsa bu satiri kaldirmak yeterli (o zaman prop'u
        `required: false` yapmak ya da tabloyu kaldirmak gerekir).
      -->
      <FinancePoList
        :poList="financeStore.getFinancePoList"
        :paidList="financeStore.getFinancePaidList"
        :poListTotal="financeStore.getFinancePoListTotal"
        :paidListTotal="financeStore.getFinancePaidListTotal"
        :insurance="financeStore.getFinanceDetailInsuranceList"
        @po_list_selected_emit="poListSelected($event)"
        @po_paid_detail_list_selected_emit="poPaidDetailListSelected($event)"
        :loading="sharedStore.isLoading"
      />
    </Dialog>
    <Dialog v-model:visible="finance_po_detail_form" header="" modal>
      <FinancePoForm
        :model="modelsStore.getFinancePoModel"
        :po="finance_po_list_detail"
        @po_paid_process_emit="poPaidProcess($event)"
        :poPaidList="financeStore.getFinancePoPaidList"
        @po_paid_delete_emit="poPaidDelete($event)"
      />
    </Dialog>
    <Dialog v-model:visible="finance_po_paid_detail_form" header="" modal>
      <FinancePaidList :list="financeStore.getFinancePoPaidDetailList" />
    </Dialog>
    <Dialog v-model:visible="purchase_price_dialog_form" header="" modal>
      <DataTable
        :value="purchasePriceList"
        class="p-datatable-sm"
        v-model:filters="filters"
        filterDisplay="row"
        @filter="filterSelected($event)"
      >
        <Column
          field="SiparisTarihi"
          header="Order Date"
          :showFilterMenu="false"
          :showFilterOperator="false"
          :showClearButton="false"
          :showApplyButton="false"
          :showFilterMatchModes="false"
          :showAddButton="false"
        >
          <template #body="slotProps">
            {{ dateToString(slotProps.data.SiparisTarihi) }}
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
        <Column
          field="FirmaAdi"
          header="Customer"
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
        <Column
          field="SiparisNo"
          header="Po"
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
        <Column
          field="Tedarikci"
          header="Supplier"
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
        <Column field="Purchase" header="Purchase Total">
          <template #body="slotProps">
            {{ formatPriceUsd(slotProps.data.Purchase) }}
          </template>
          <template #footer>
            {{ formatPriceUsd(purchase_price_total) }}
          </template>
        </Column>
      </DataTable>
    </Dialog>
  </div>
</template>
<script>
import { useSharedStore } from "~/stores/shared"
import { useModelsStore } from "~/stores/models"
import { useFinanceStore } from "~/stores/finance"
import { toIsoDate, fromIsoDate } from "~/utils/dates"
import { FilterMatchMode } from "@primevue/core/api";

export default {
  /*
   * [x] middleware: ["authority"] BURADAN KALDIRILDI -> definePageMeta
   * (dosyanin sonundaki <script setup> blogunda). Options API'deki
   * middleware anahtari Nuxt 3+'ta YOK SAYILIR: hata vermez, kisitlama
   * sessizce kalkar -- bu sayfada oyle olmustu.
   */
  computed: {
    financeStore() {
      return useFinanceStore()
    },
    modelsStore() {
      return useModelsStore()
    },
    sharedStore() {
      return useSharedStore()
    },
  },
  data() {
    return {
      filters: {
        SiparisTarihi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        SiparisNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Tedarikci: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        FirmaAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      purchase_price_total: 0,
      purchase_price_button_loading: false,
      purchasePriceList: [],
      purchase_price_dialog_form: false,
      filterFinanceList: [],
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
    };
  },
  /*
   * created() -> mounted(): created() SSR'da da calisir, icindeki async
   * is BEKLENMEZ ve liste BOS serialize edilir; hydration onu devralir,
   * created() bir daha calismadigi icin tablo bos kalir (bkz. commit
   * 2afc877e3). mounted() sunucuda hic calismaz.
   */
  mounted() {
    this.financeStore.setFinanceList();
  },
  methods: {
    filterSelected(event) {
      this.purchase_price_total = 0;
      event.filteredValue.forEach((x) => {
        this.purchase_price_total += x.Purchase;
      });
    },
    purchasePrices() {
      this.purchase_price_button_loading = true;
      this.purchase_price_total = 0;
      useLegacyApi().get("/gu/reports/finance/purchase-prices").then((res) => {
        if (res.data.list) {
          this.purchase_price_button_loading = false;
          this.purchasePriceList = res.data.list;
          res.data.list.forEach((x) => {
            this.purchase_price_total += x.Purchase;
          });
          this.purchase_price_dialog_form = true;
        }
      });
    },
    checkedMekmarMekmer(event) {
      if (this.mekmarMekmerList) {
        this.checked = "Mekmar";

        this.financeStore.setFinanceListFilter();
      } else {
        this.checked = "Mekmer";

        this.financeStore.setFinanceList();
      }
    },
    excel_output() {
      useExcelApi()
        .post("/finance/reports/test/excel", this.financeStore.getfinanceList)
        .then((response) => {
          if (response.status) {
            downloadFromExcelServer(
              "finance/reports/test/excel",
              "finans_test_list.xlsx"
            );
          }
        });
    },
    poPaidDetailListSelected(event) {
      const data = {
        Tarih: toIsoDate(event.data.Tarih),
        MusteriID: this.customerId,
      };
      this.financeStore.setPoPaidDetailList(data);
      this.finance_po_paid_detail_form = true;
    },
    poPaidDelete(event) {
      if (confirm("Silme İşlemini Onaylıyor musunuz?")) {
        this.financeStore.setPoPaidDelete(event);
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
      if (this.financeStore.getFinancePoButtonStatus) {
        this.save(event);
      } else {
        this.update(event);
      }
    },
    save(event) {
      this.financeStore.setPoPaidSave(event);
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
      this.financeStore.setPoPaidUpdate(event);
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
      this.financeStore.setFinancePoPaidList(event.data.SiparisNo);
    },
    financeListSelected(event) {
      this.customerId = event.data.customer_id;
      this.financeStore.setFinancePoList(event.data.customer_id);
      this.finance_po_list_form = true;
    },
    advancesPaymentSave(event) {
      this.financeStore.setAdvancedPaymentSave(event);
    },
    advancedPayment() {
      this.financeStore.setFinanceAdvancedPaymentList();
      this.modelsStore.setFinancePaymentModel();
      this.finance_advanced_payment_form = true;
    },
    collection() {
      this.financeStore.setFinanceCollectionList();
      this.finance_collection_list_form = true;
    },
  },
  watch: {
    "financeStore.getfinanceList"() {
      this.filterFinanceList = this.financeStore.getfinanceList.filter((x) => {
        return (
          x.customer_id != 37 &&
          x.customer_id != 7653 &&
          x.customer_id != 6519 &&
          x.customer_id != 2385 &&
          x.customer_id != 2386 &&
          x.customer_id != 162 &&
          x.customer_id != 7540 &&
          x.customer_id != 7687 &&
          x.customer_id != 7590 &&
          x.customer_id != 7622
        );
      });
      this.financeStore.setFinanceTotalList(this.filterFinanceList);
    },
  },
};
</script>

<script setup>
/*
 * definePageMeta yalnizca <script setup> icinde kullanilabilir ->
 * Options API sayfalarinda IKINCI bir script blogu gerekiyor
 * (ayni cozum app/pages/operation/supplier.vue icinde de var).
 *
 * BU SAYFADA KISITLAMA DUSMUSTU: export default icinde
 * `middleware: ["authority"]` yaziyordu ve Nuxt 3+ bunu yok sayiyor.
 * Yani app/middleware/authority.ts ile engellenmesi gereken dort
 * kullanici (48, 54, 56, 62) bu mali rapor sayfasini acabiliyordu.
 */
definePageMeta({ middleware: ["authority"] })
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
