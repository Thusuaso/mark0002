<template>
  <div>
    <DataTable
      :value="finance_list"
      tableStyle="min-width: 50rem"
      :selection.sync="selectedFinance"
      selectionMode="single"
      @row-click="financeSelection"
      :sortOrder="-1"
      sortField="Toplam"
      :filters.sync="filteredFinanceList"
      filterDisplay="row"
      @filter="financeFiltered($event)"
    >
      <Column
        field="Musteri"
        header="Müşteri"
        :showFilterMenu="false"
        :showClearButton="false"
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
      <Column field="Toplam" header="Toplam Tutar">
        <template #body="slotProps">
          {{ slotProps.data.Toplam | formatPriceUsd }}
        </template>
        <template #footer>
          {{ finance_list_total.total | formatPriceUsd }}
        </template>
      </Column>
    </DataTable>
    <Dialog
      :visible.sync="visible_finance_dialog"
      :header="header_finance_dialog"
      modal
    >
      <DataTable
        :value="finance_list_detail"
        tableStyle="min-width: 50rem"
        :filters.sync="filteredDetailList"
        filterDisplay="row"
        @filter="financeDetailFiltered($event)"
        :sortOrder="1"
        sortField="Durum"
        :selection="selectedDetail"
        selectionMode="single"
        @row-click="detailSelected($event)"
      >
        <Column field="SiparisTarihi" header="Sipariş Tarihi">
          <template #body="slotProps">
            {{ slotProps.data.SiparisTarihi | dateToString }}
          </template>
        </Column>
        <Column field="YuklemeTarihi" header="Yükleme Tarihi">
          <template #body="slotProps">
            {{ slotProps.data.YuklemeTarihi | dateToString }}
          </template>
        </Column>
        <Column
          field="SiparisNo"
          header="Sipariş No"
          :showFilterMenu="false"
          :showClearButton="false"
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
        <Column field="Alis" header="Toplam Bedel">
          <template #body="slotProps">
            {{ slotProps.data.Alis | formatPriceUsd }}
          </template>
        </Column>

        <Column header="Ödeme Durumu">
          <template #body="slotProps">
            <Button
              :class="
                slotProps.data.Durum ? 'p-button-success' : 'p-button-danger'
              "
              :label="slotProps.data.Durum ? 'Ödendi' : 'Ödenmedi'"
              :disabled="slotProps.data.Durum"
              :loading="paid_button_loading"
              @click="savePaid(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
    </Dialog>

    <Dialog
      :visible.sync="finance_order_detail_visible"
      :header="finance_order_detail_header"
      modal
    >
      <DataTable
        :value="finance_list_order_detail"
        tableStyle="min-width: 50rem"
      >
        <Column field="KategoriAdi" header="Kategori"></Column>
        <Column field="UrunAdi" header="Ürün"></Column>
        <Column field="YuzeyIslemAdi" header="Yüzey"></Column>
        <Column field="En" header="En"></Column>
        <Column field="Boy" header="Boy"></Column>

        <Column field="Kenar" header="Kenar"></Column>
        <Column field="Miktar" header="Miktar">
          <template #body="slotProps">
            {{ slotProps.data.Miktar | formatDecimal }}
          </template>
        </Column>
        <Column field="AlisFiyati" header="Fiyat">
          <template #body="slotProps">
            {{ slotProps.data.AlisFiyati | formatPriceUsd }}
          </template>
        </Column>
        <Column field="Toplam" header="Toplam">
          <template #body="slotProps">
            {{ slotProps.data.Toplam | formatPriceUsd }}
          </template>
          <template #footer>
            {{ finance_list_detail_order_total | formatPriceUsd }}
          </template>
        </Column>
      </DataTable>
    </Dialog>
  </div>
</template>

<script>
import { FilterMatchMode } from "primevue/api";

import date from "../../../plugins/date";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      finance_list_detail_order_total: 0,
      finance_order_detail_header: "",
      finance_order_detail_visible: false,
      selectedDetail: null,
      filteredDetailList: {
        SiparisNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      filteredFinanceList: {
        Musteri: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      paid_button_loading: false,
      visible_finance_dialog: false,
      header_finance_dialog: "Finance",
      selectedFinance: null,

      finance_list: [],
      finance_list_total: {
        total: 0,
      },
      finance_list_detail: [],
      finance_list_detail_total: {},
      finance_list_order_detail: [],
    };
  },
  created() {
    this.fetchData();
  },
  mounted() {},
  methods: {
    detailSelected(event) {
      this.finance_order_detail_header = event.data.SiparisNo;
      this.finance_list_detail_order_total = 0;
      this.$axios
        .post("/mekmer/new/finance/detail/order", { Po: event.data.SiparisNo })
        .then((res) => {
          this.finance_list_order_detail = res.data.list;
          res.data.list.forEach((x) => {
            this.finance_list_detail_order_total += x.Toplam;
          });
          this.finance_order_detail_visible = true;
        });
    },
    financeDetailFiltered(event) {},
    financeFiltered(event) {
      this.finance_list_total.total = 0;
      event.filteredValue.forEach((x) => {
        this.finance_list_total.total += x.Toplam;
      });
    },
    async savePaid(event) {
      if (confirm("Gerçekten Kaydetmek İstiyor musunuz?")) {
        this.paid_button_loading = true;
        const newdate = new Date();

        this.$axios
          .post("/mekmer/new/finance/paid/status", {
            Tarih: date.dateToString(newdate),
            KullaniciId: Cookies.get("userId"),
            ...event,
          })
          .then((res) => {
            if (res.data.status) {
              this.$toast.success("Başarıyla Kaydedildi.");
              this.$axios
                .get(`/mekmer/new/finance/list/detail/${event.MusteriID}`)
                .then((res) => {
                  this.finance_list_detail = res.data.list;
                  this.fetchData();
                  this.paid_button_loading = false;
                });
            } else {
              this.$toast.error("Hata Oluştu.");
              this.paid_button_loading = false;
            }
          });
      }
    },
    async financeSelection(event) {
      this.$axios
        .get(`/mekmer/new/finance/list/detail/${event.data.ID}`)
        .then((res) => {
          this.finance_list_detail = res.data.list;
        });
      this.header_finance_dialog = event.data.Musteri;
      this.visible_finance_dialog = true;
    },
    fetchData() {
      this.finance_list_total = {
        total: 0,
      };
      this.$axios.get("/mekmer/new/finance/list").then((res) => {
        this.finance_list = res.data.list;
        res.data.list.forEach((x) => {
          this.finance_list_total.total += x.Toplam;
        });
      });
    },
  },
};
</script>
