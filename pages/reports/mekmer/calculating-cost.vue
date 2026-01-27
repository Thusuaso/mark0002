<template>
  <div>
    <div class="row m-auto">
      <div class="col-3">
        <Calendar v-model="date" view="month" dateFormat="mm/yy" />
      </div>
      <div class="col-3">
        <Button label="Yeni Maliyet" @click="newCalculatingCost" />
      </div>
      <div class="col-3">
        <Button
          class="p-button-primary"
          :label="yearly_cost_header"
          @click="yearlyMaliyet"
          :loading="yearly_cost_loading"
        />
      </div>
      <div class="col-3">
        <Button
          class="w-100 mb-5 p-button-info"
          type="button"
          label="Excel Maliyetler"
          @click="excel_maliyet_output"
        />
      </div>
    </div>

    <calculatingCost
      :cost="cost"
      :costLabour="costWork"
      :production="productionSqm"
      :costUnitPerson="costMain"
    />
    <div class="row">
      <div class="col-9">
        <DataTable
          :value="costs"
          :selection.sync="selectedCost"
          selectionMode="single"
          @row-click="costSelected($event)"
          :filters.sync="filteredCosts"
          filterDisplay="row"
          @filter="costFiltered($event)"
          scrollable
          scrollHeight="500px"
          sortField="Tarih"
          :sortOrder="-1"
        >
          <Column field="Tarih" header="Tarih"
                    :showFilterMenu="false"
          :showClearButton="false"
          >
            <template #body="slotProps">
              {{ formatDateTR(slotProps.data.Tarih) }}
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
          <Column field="MaliyetTuru" header="Maliyet Türü"
                    :showFilterMenu="false"
          :showClearButton="false"
          
          >
            <template #body="slotProps">
              {{ slotProps.data.MaliyetTuru }}
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
          <Column field="MaliyetFirma" header="Fatura Şirketi"
          
                    :showFilterMenu="false"
          :showClearButton="false"
          >
            <template #body="slotProps">
              {{ slotProps.data.MaliyetFirma }}
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
          <Column field="FaturaNo" header="Fatura No"
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
          <Column field="Fiyat" header="Fiyat (TL)"
                    :showFilterMenu="false"
          :showClearButton="false"
          >
            <template #body="slotProps">
              {{ formatPriceTl(slotProps.data.Fiyat) }}
            </template>
            <template #footer>
              {{ formatPriceTl(total.priceTl) }}
            </template>
          </Column>
          <Column field="Kur" header="Kur"
          
                    :showFilterMenu="false"
          :showClearButton="false"
          >
            <template #body="slotProps">
              {{ formatPriceTl(slotProps.data.Kur) }}
            </template>
          </Column>
          <Column header="Dolar"
                    :showFilterMenu="false"
          :showClearButton="false"
          >
            <template #body="slotProps">
              {{ formatPriceUsd(slotProps.data.Fiyat / slotProps.data.Kur) }}
            </template>
            <template #footer>
              {{ formatPriceUsd(total.priceUsd) }}
            </template>
          </Column>
          <Column header="#">
            <template #body="slotProps">
              <Button
                class="p-button-danger"
                label="Sil"
                @click="deletePost(slotProps.data.ID, slotProps.data.Tarih)"
              />
            </template>
          </Column>
        </DataTable>
      </div>
      <div class="col-3">
        <DataTable
          :value="calculate_ratio_list"
          sortField="Oran"
          :sortOrder="-1"
          scrollable
          scrollHeight="500px"
        >
          <Column field="MaliyetTuru" header="Maliyet Türü">
            <template #body="slotProps">
              {{ slotProps.data.MaliyetTuru }}
            </template>
          </Column>
          <Column field="Total" header="Toplam">
            <template #body="slotProps">
              {{ slotProps.data.Total | formatPriceUsd }}
            </template>
          </Column>

          <Column field="Oran" header="Oran (%)">
            <template #body="slotProps">
              {{ slotProps.data.Oran | formatDecimal }}
              %
            </template>
          </Column>
        </DataTable>
      </div>
    </div>

    <Dialog
      :visible.sync="calculatingCostFormVisible"
      header="Yeni Maliyet Girişi"
      modal
      blockScroll
      focusOnShow
    >
      <calculatingCostForm
        :status="status"
        :model="model"
        :costTypes="costTypes"
        :companies="companies"
        @cost_saved_update_emit="costSavedUpdate($event)"
      />
    </Dialog>
    <Dialog
      :visible.sync="calculatingCostFormVisible"
      header="Maliye Güncelleme"
      modal
    >
      <calculatingCostForm
        :status="status"
        :model="model"
        :costTypes="costTypes"
        :companies="companies"
        @cost_saved_update_emit="costSavedUpdate($event)"
      />
    </Dialog>
  </div>
</template>

<script>
import { FilterMatchMode } from "primevue/api";
import { mapGetters } from "vuex";
import server from "../../../plugins/excel.server";

export default {
  computed: {
    ...mapGetters(["getLocalUrl"]),
  },
  data() {
    return {
      calculate_ratio_list: [],
      filteredCosts: {
        Tarih: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        MaliyetTuru: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        MaliyetFirma: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        FaturaNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      status: false,
      selectedCost: null,
      yearly_cost_loading: false,
      yearly_cost_header: "Yıllık",
      date: new Date(),
      calculatingCostFormVisible: false,
      companies: [],
      costTypes: [],
      costs: [],
      production: [],
      total: {
        priceTl: 0,
        priceUsd: 0,
      },
      costTypeTotal: 0,
      wageAndInsuranceTotal: 0,
      productionSqm: 0,
      productionPiece: 0,
      cost: 0,
      costWork: 0,
      costMain: 0,
      model: {
        FaturaFirma: null,
        FaturaFirmaId: null,
        FaturaNo: null,
        Fiyat: 0,
        ID: 0,
        Kur: 0,
        MaliyetTurId: null,
        MaliyetFirma: null,
        Tarih: null,
        FiyatUsd: 0,
      },
    };
  },
  methods: {
    excel_maliyet_output() {
      const data = {
        costs: this.costs,
        ratios: this.calculate_ratio_list,
        costCalculate: {
          cost: this.cost,
          costWork: this.costWork,
          productionSqm: this.productionSqm,
          costMain: this.costMain,
        },
      };
      server.post("/reports/mekmer/muhasebe/excel", data).then((res) => {
        if (res.status) {
          const link = document.createElement("a");
          link.href = this.getLocalUrl + "reports/mekmer/muhasebe/excel";

          link.setAttribute("download", "muhasebe_maliyet_excel.xlsx");
          document.body.appendChild(link);
          link.click();
        }
      });
    },
    costFiltered(value) {
      this.total.priceTl = 0;
      this.total.priceUsd = 0;
      value.filteredValue.forEach((x) => {
        this.total.priceTl += x.Fiyat;
        this.total.priceUsd += x.Fiyat / x.Kur;
      });
    },
    deletePost(_id, _date) {
      if (confirm("Silmek istediğinize emin misiniz?")) {
        console.log("deletePost", _id);
        this.$axios
          .delete(`/reports/mekmer/calculating/cost/delete/${_id}`)
          .then((res) => {
            if (res) {
              this.costSavedUpdate(_date);
              this.$toast.success("Başarıyla Silindi.");
            } else {
              this.$toast.error("Silme sırasında bir hata oluştu.");
            }
          });
      }
    },
    newCalculatingCost() {
      this.model = {
        FaturaFirma: null,
        FaturaFirmaId: null,
        FaturaNo: null,
        Fiyat: 0,
        ID: 0,
        Kur: 0,
        MaliyetTurId: null,
        MaliyetFirma: null,
        Tarih: null,
      };
      this.status = true;
      this.calculatingCostFormVisible = true;
    },
    costSelected(event) {
      this.model = event.data;
      this.status = false;

      this.calculatingCostFormVisible = true;
    },
    yearlyMaliyet() {
      if (this.yearly_cost_header == "Aylık") {
        this.yearly_cost_loading = true;
        const newDate = new Date();
        const year = newDate.getFullYear();
        this.$axios
          .get(`/reports/mekmer/calculating/cost/${year}`)
          .then((res) => {
            this.costs = res.data.list;
            this.companies = res.data.companies;
            this.costTypes = res.data.costTypes;
            this.production = res.data.production;
            this.total.priceTl = 0;
            this.total.priceUsd = 0;
            this.calculateCost(this.costs, this.production);
            res.data.list.forEach((x) => {
              this.total.priceTl += x.Fiyat;
              this.total.priceUsd += x.Fiyat / x.Kur;
            });
            this.getCalculateRatio(res.data.list, res.data.costTypes);

            this.yearly_cost_header = "Yıllık";
            this.yearly_cost_loading = false;
          });
      } else if (this.yearly_cost_header == "Yıllık") {
        this.getList();
      }
    },
    costSavedUpdate(_date) {
      this.yearly_cost_loading = true;
      const newDate = new Date(_date);
      const year = newDate.getFullYear();
      const month = newDate.getMonth() + 1;
      this.$axios
        .get(`/reports/mekmer/calculating/cost/${year}/${month}`)
        .then((res) => {
          this.costs = res.data.list;
          this.companies = res.data.companies;
          this.costTypes = res.data.costTypes;
          this.production = res.data.production;
          this.total.priceTl = 0;
          this.total.priceUsd = 0;
          this.calculateCost(this.costs, this.production);
          res.data.list.forEach((x) => {
            this.total.priceTl += x.Fiyat;
            this.total.priceUsd += x.Fiyat / x.Kur;
          });
          this.getCalculateRatio(res.data.list, res.data.costTypes);

          this.yearly_cost_loading = false;
          this.yearly_cost_header = "Aylık";
        });
    },
    formatDateTR(dateInput) {
      if (!dateInput) return "";
      const d = new Date(dateInput);

      return new Intl.DateTimeFormat("tr-TR").format(d);
    },
    getCostType(id) {
      const costType = this.costTypes.find((cost) => cost.ID === id);
      return costType ? costType.MaliyetTuru : "";
    },
    getCompanyType(id) {
      const company = this.companies.find((company) => company.ID === id);
      return company ? company.MaliyetFirma : "";
    },

    formatPriceTl(value) {
      if (value === null || value === undefined || value === "")
        return "0,00 ₺";

      // Gelen değer string ise önce sayıya çevir
      const val = parseFloat(value);
      if (isNaN(val)) return "0,00 ₺";

      return new Intl.NumberFormat("tr-TR", {
        style: "currency",
        currency: "TRY",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(val);
    },

    // Dolar Formatlayıcı (Örn: $1,250.50)
    formatPriceUsd(value) {
      if (value === null || value === undefined || value === "") return "$0.00";

      const val = parseFloat(value);
      if (isNaN(val)) return "$0.00";

      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(val);
    },
    getList() {
      this.yearly_cost_loading = true;
      const newDate = new Date();
      const month = newDate.getMonth() + 1;
      const year = newDate.getFullYear();
      this.$axios
        .get(`/reports/mekmer/calculating/cost/${year}/${month}`)
        .then(async (res) => {
          this.costs = res.data.list;
          this.companies = res.data.companies;
          this.costTypes = res.data.costTypes;
          this.production = res.data.production;
          this.total.priceTl = 0;
          this.total.priceUsd = 0;
          await res.data.list.forEach((x) => {
            this.total.priceTl += x.Fiyat;
            this.total.priceUsd += x.Fiyat / x.Kur;
          });

          this.calculateCost(this.costs, this.production);
          this.getCalculateRatio(res.data.list, res.data.costTypes);

          this.yearly_cost_loading = false;
          this.yearly_cost_header = "Aylık";
        });
    },
    calculateCost(costs, production) {
      this.costTypeTotal = 0;
      this.wageAndInsuranceTotal = 0;
      this.productionSqm = 0;
      this.productionPiece = 0;
      const customCosts = costs.filter((x) => {
        return (
          x.MaliyetTurId in
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
        );
      });
      customCosts.forEach((x) => {
        this.costTypeTotal += x.Fiyat / x.Kur;
        if (x.MaliyetTurId == 1 || x.MaliyetTurId == 2) {
          this.wageAndInsuranceTotal += x.Fiyat / x.Kur;
        }
      });
      production.forEach((x) => {
        if (x.UrunBirimID == 1) {
          this.productionSqm += x.Miktar;
        } else {
          if (x.UrunBirimID == 2) {
            if (x.En.split(",") == 2 && x.Boy.split(",") == 0) {
              const type1 = parseFloat(x.En.replace(",", "."));
              const type2 = parseFloat(x.Boy.replace(",", "."));
              const sqm = (type1 * type2 * x.Miktar) / 10000;
              this.productionSqm += sqm;
            } else {
              console.log("various");
            }
          }
          this.productionPiece += x.Miktar;
        }
      });

      this.cost = this.costTypeTotal / this.productionSqm;
      this.costWork = this.wageAndInsuranceTotal / this.productionSqm;
      this.costMain = (this.cost - this.costWork) / 1.2 + this.costWork;
    },
    async getCalculateRatio(_costs, _types) {
      let customTypes = _types.filter((x) => {
        return (
          x.ID in
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
        );
      });
      let customCosts = _costs.filter((x) => {
        return (
          x.MaliyetTurId in
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
        );
      });
      this.calculate_ratio_list = [];
      let total = 0;
      await customCosts.forEach((x) => {
        total += x.Fiyat / x.Kur;
      });
      customTypes.forEach(async (x) => {
        const { ratio, value } = await this._getCalculateCost(
          customCosts,
          x.ID,
          total
        );
        this.calculate_ratio_list.push({
          MaliyetTuru: x.MaliyetTuru,
          Oran: ratio,
          Total: value,
        });
      });
    },
    _getCalculateCost(_costs, _id, total) {
      let __value = 0;
      if (_costs.length == 0) {
        return 0;
      }
      _costs
        .filter((x) => {
          return x.MaliyetTurId == _id;
        })
        .forEach((y) => {
          __value += y.Fiyat / y.Kur;
        });
      console.log("oran", (__value / total) * 100);
      return { ratio: (__value / total) * 100, value: __value };
    },
  },
  created() {
    this.getList();
  },
};
</script>
