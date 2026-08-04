<template>
  <div>
    <div class="row m-auto">
      <div class="col-3">
        <Calendar
          v-model="date"
          view="month"
          dateFormat="mm/yy"
          @date-select="MonthlySelected($event)"
        />
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
          <Column
            field="Tarih"
            header="Tarih"
            :showFilterMenu="false"
            :showClearButton="false"
            style="min-width: 120px"
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
          <Column
            field="MaliyetTuru"
            header="Maliyet Türü"
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
          <Column
            field="MaliyetFirma"
            header="Fatura Şirketi"
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
          <Column
            field="FaturaNo"
            header="Fatura No"
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
          <Column
            field="Fiyat"
            header="Fiyat (TL)"
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
          <Column
            field="Kur"
            header="Kur"
            :showFilterMenu="false"
            :showClearButton="false"
          >
            <template #body="slotProps">
              {{ formatPriceTl(slotProps.data.Kur) }}
            </template>
          </Column>
          <Column
            header="Dolar"
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
          :selection.sync="selectedRatio"
          selectionMode="single"
          @row-click="ratioSelected($event)"
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
    <Dialog
      :visible.sync="ratio_detail_dialog_visible"
      :header="ratio_detail_dialog_header"
      modal
    >
      deneme
    </Dialog>
  </div>
</template>

<script>
import { FilterMatchMode } from "primevue/api";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getLocalUrl"]),
  },
  data() {
    return {
      ratio_detail_dialog_header: "",
      ratio_detail_dialog_visible: false,
      selectedRatio: null,
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
    ratioSelected(event) {
      this.ratio_detail_dialog_header = event.data.MaliyetTuru + " Detayları";
      this.ratio_detail_dialog_visible = true;
    },
    MonthlySelected(event) {
      const date = new Date(event);
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      this.yearly_cost_loading = true;
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
    async excel_maliyet_output() {
      const XLSX = await import("xlsx");

      const num = (v) => {
        const n = parseFloat(v);
        return isNaN(n) || !isFinite(n) ? 0 : n;
      };

      const d = new Date(this.date);
      const isYearly = this.yearly_cost_header === "Yıllık";
      const donem = isYearly
        ? `${d.getFullYear()} (Yıllık)`
        : `${String(d.getMonth() + 1).padStart(2, "0")}.${d.getFullYear()}`;

      // Hücre formatı uygulayıcı: { kolonIndex: format }
      const applyFormat = (ws, colFormats, startRow) => {
        const range = XLSX.utils.decode_range(ws["!ref"]);
        for (let R = startRow; R <= range.e.r; R++) {
          Object.entries(colFormats).forEach(([C, z]) => {
            const cell = ws[XLSX.utils.encode_cell({ r: R, c: Number(C) })];
            if (cell && cell.t === "n") cell.z = z;
          });
        }
      };

      const TL = '#,##0.00" ₺"';
      const USD = '"$"#,##0.00';
      const DEC = "#,##0.00";

      const wb = XLSX.utils.book_new();

      /* ---------- 1) ÖZET ---------- */
      const ozetAoa = [
        ["MALİYET ÖZETİ"],
        ["Dönem", donem],
        [],
        ["Toplam Maliyet (TL)", num(this.total.priceTl)],
        ["Toplam Maliyet (USD)", num(this.total.priceUsd)],
        ["Toplam Üretim (m²)", num(this.productionSqm)],
        [],
        ["Birim Maliyet (USD/m²)", num(this.cost)],
        ["İşçilik + SGK Maliyeti (USD/m²)", num(this.costWork)],
        ["Ana Maliyet (USD/m²)", num(this.costMain)],
        [],
        ["Kayıt Sayısı", this.costs.length],
      ];
      const wsOzet = XLSX.utils.aoa_to_sheet(ozetAoa);
      wsOzet["!cols"] = [{ wch: 32 }, { wch: 20 }];
      if (wsOzet["B4"]) wsOzet["B4"].z = TL;
      ["B5", "B8", "B9", "B10"].forEach((a) => {
        if (wsOzet[a]) wsOzet[a].z = USD;
      });
      if (wsOzet["B6"]) wsOzet["B6"].z = DEC;
      XLSX.utils.book_append_sheet(wb, wsOzet, "Özet");

      /* ---------- 2) MALİYETLER ---------- */
      const costAoa = [
        [
          "Tarih",
          "Maliyet Türü",
          "Fatura Şirketi",
          "Fatura No",
          "Fiyat (TL)",
          "Kur",
          "Dolar",
        ],
      ];
      this.costs.forEach((x) => {
        costAoa.push([
          this.formatDateTR(x.Tarih),
          x.MaliyetTuru || "",
          x.MaliyetFirma || "",
          x.FaturaNo || "",
          num(x.Fiyat),
          num(x.Kur),
          num(x.Kur) ? num(x.Fiyat) / num(x.Kur) : 0,
        ]);
      });
      costAoa.push([]);
      costAoa.push([
        "TOPLAM",
        "",
        "",
        "",
        num(this.total.priceTl),
        "",
        num(this.total.priceUsd),
      ]);

      const wsCost = XLSX.utils.aoa_to_sheet(costAoa);
      wsCost["!cols"] = [
        { wch: 12 },
        { wch: 28 },
        { wch: 28 },
        { wch: 16 },
        { wch: 16 },
        { wch: 10 },
        { wch: 14 },
      ];
      wsCost["!autofilter"] = { ref: `A1:G${this.costs.length + 1}` };
      wsCost["!freeze"] = { xSplit: 0, ySplit: 1 };
      applyFormat(wsCost, { 4: TL, 5: DEC, 6: USD }, 1);
      XLSX.utils.book_append_sheet(wb, wsCost, "Maliyetler");

      /* ---------- 3) ORANLAR ---------- */
      const ratios = [...this.calculate_ratio_list].sort(
        (a, b) => num(b.Oran) - num(a.Oran)
      );
      const ratioAoa = [["Maliyet Türü", "Toplam (USD)", "Oran (%)"]];
      ratios.forEach((x) => {
        ratioAoa.push([x.MaliyetTuru || "", num(x.Total), num(x.Oran)]);
      });
      ratioAoa.push([]);
      ratioAoa.push([
        "TOPLAM",
        ratios.reduce((s, x) => s + num(x.Total), 0),
        ratios.reduce((s, x) => s + num(x.Oran), 0),
      ]);

      const wsRatio = XLSX.utils.aoa_to_sheet(ratioAoa);
      wsRatio["!cols"] = [{ wch: 30 }, { wch: 16 }, { wch: 12 }];
      applyFormat(wsRatio, { 1: USD, 2: '0.00"%"' }, 1);
      XLSX.utils.book_append_sheet(wb, wsRatio, "Oranlar");

      /* ---------- İNDİR ---------- */
      const fileName = `maliyet_${donem.replace(/[.\s()]/g, "_")}.xlsx`;
      XLSX.writeFile(wb, fileName);

      this.$toast && this.$toast.success("Excel oluşturuldu.");
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

      // 1) Önce "12.05.2026" Türkçe formatını yakala (new Date'e sokmadan!)
      if (typeof dateInput === "string") {
        const m = dateInput.match(/^(\d{2})\.(\d{2})\.(\d{4})/);
        if (m) return `${m[1]}.${m[2]}.${m[3]}`; // zaten istediğin format, direkt bas

        // 2) ISO "2026-05-12..." formatı — Safari için T'li dene
        const iso = dateInput.match(/^(\d{4})-(\d{2})-(\d{2})/);
        if (iso) return `${iso[3]}.${iso[2]}.${iso[1]}`;
      }

      // 3) Date objesi veya diğer durumlar
      const d = dateInput instanceof Date ? dateInput : new Date(dateInput);
      if (isNaN(d.getTime())) return "";
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
        return [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
        ].includes(x.MaliyetTurId);
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
        return [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
        ].includes(x.ID);
      });
      let customCosts = await _costs.filter((x) => {
        return [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
        ].includes(x.MaliyetTurId);
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
          MaliyetID: x.ID,
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
