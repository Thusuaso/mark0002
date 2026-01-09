<template>
  <div class="row mt-4 m-auto ml-2 mr-2">
    <div class="row m-auto text-center">
      <div class="col-sm-3">
        <Button
          class="w-100 mb-5 p-button-success"
          type="button"
          label="Yeni Strip"
          @click="newForm"
        />
      </div>
      <div class="col-sm-3">
        <Button
          class="w-100 mb-5 p-button-info"
          type="button"
          label="Excel Stripler"
          @click="excel_strip_output"
        />
      </div>
      <div class="col-sm-3">
        <Button
          class="w-100 mb-5 p-button-success"
          type="button"
          label="Yeni Moloz"
          @click="newFormMoloz"
        />
      </div>
      <div class="col-sm-3">
        <Button
          class="w-100 mb-5 p-button-info"
          type="button"
          label="Excel Molozlar"
          @click="excel_strip_output_moloz"
        />
      </div>
    </div>
    <div class="col-sm-6">
      <span class="p-float-label">
        <Dropdown
          class="w-100"
          id="year"
          v-model="selectedYear"
          :options="years"
          optionLabel="year"
          @change="yearSelected($event)"
        />
        <label for="year">Year</label>
      </span>
    </div>
    <div class="col-sm-6">
      <span class="p-float-label">
        <Dropdown
          class="w-100"
          id="month"
          v-model="selectedMonth"
          :options="months"
          optionLabel="month_name"
          @change="monthSelected($event)"
        />
        <label for="month">Month</label>
      </span>
    </div>
    <div class="row m-auto text-center">
      <div class="col-6">
        <DataTable
          :value="list"
          responsiveLayout="scroll"
          class="p-datatable-sm"
          :resizableColumns="true"
          columnResizeMode="fit"
          showGridlines
          :selection.sync="selectedStripData"
          selectionMode="single"
          @row-click="stripDataSelected($event)"
        >
          <template #header>STRIPLER</template>
          <Column field="Date" header="Tarih">
            <template #body="slotProps">
              {{ slotProps.data.Date | dateToString }}
            </template>
          </Column>
          <Column field="Supplier" header="Tedarikçi Adı">
            <template #body="slotProps">
              {{ _getSupplierName(slotProps.data.Supplier) }}
            </template>
          </Column>
          <Column field="Quarry" header="Ocak Adı">
            <template #body="slotProps">
              {{ _getQuarryName(slotProps.data.Quarry) }}
            </template>
          </Column>
          <Column field="Strip" header="Strip Adı">
            <template #body="slotProps">
              {{ _getStripName(slotProps.data.Strip) }}
            </template>
          </Column>
          <Column field="Invoice" header="Invoice"> </Column>
          <Column field="StripM2" header="Strip (M2)">
            <template #body="slotProps">
              {{ slotProps.data.StripM2 | formatDecimal }}
            </template>
            <template #footer>
              {{ total.m2 | formatDecimal }}
            </template>
          </Column>
          <Column field="StripPrice" header="Strip (₺)">
            <template #body="slotProps">
              {{ slotProps.data.StripPrice | formatPriceTl }}
            </template>
          </Column>
          <Column field="StripCost" header="Strip Toplam (₺)">
            <template #body="slotProps">
              {{ slotProps.data.StripCost | formatPriceTl }}
            </template>
            <template #footer>
              {{ total.cost | formatPriceTl }}
            </template>
          </Column>
          <Column field="StripCostUsd" header="Strip Toplam ($)">
            <template #body="slotProps">
              {{ slotProps.data.StripCostUsd | formatPriceUsd }}
            </template>
            <template #footer>
              {{ total.costUsd | formatPriceUsd }}
            </template>
          </Column>
          <Column field="StripWidth" header="En">
            <template #body="slotProps">
              {{ slotProps.data.StripWidth }}
            </template>
          </Column>
          <Column field="StripHeight" header="Boy">
            <template #body="slotProps">
              {{ slotProps.data.StripHeight }}
            </template>
          </Column>
          <Column field="StripThickness" header="Kalınlık">
            <template #body="slotProps">
              {{ slotProps.data.StripThickness }}
            </template>
          </Column>
          <Column field="StripPiece" header="Adet">
            <template #body="slotProps">
              {{ slotProps.data.StripPiece }}
            </template>
            <template #footer>
              {{ total.piece }}
            </template>
          </Column>
        </DataTable>
      </div>
      <div class="col-6">
        <DataTable
          :value="moloz_list"
          responsiveLayout="scroll"
          class="p-datatable-sm"
          :resizableColumns="true"
          columnResizeMode="fit"
          showGridlines
          :selection.sync="selectedMolozData"
          selectionMode="single"
          @row-click="molozDatatableSelected($event)"
        >
          <template #header>MOLOZLAR</template>
          <Column field="Date" header="Tarih">
            <template #body="slotProps">
              {{ slotProps.data.Date | dateToString }}
            </template>
          </Column>
          <Column field="Supplier" header="Tedarikçi Adı">
            <template #body="slotProps">
              {{ _getSupplierName(slotProps.data.Supplier) }}
            </template>
          </Column>
          <Column field="Quarry" header="Ocak Adı">
            <template #body="slotProps">
              {{ _getQuarryName(slotProps.data.Quarry) }}
            </template>
          </Column>
          <Column field="Strip" header="Ürün Adı">
            <template #body="slotProps">
              {{ _getStripName(slotProps.data.Strip) }}
            </template>
          </Column>

          <Column field="FaturaNo" header="Fatura No">
            <template #body="slotProps">
              {{ slotProps.data.FaturaNo }}
            </template>
          </Column>
          <Column field="İrsaliyeNo" header="İrsaliye No">
            <template #body="slotProps">
              {{ slotProps.data.İrsaliyeNo }}
            </template>
          </Column>
          <Column field="Ton" header="Ton">
            <template #body="slotProps">
              {{ slotProps.data.Ton | formatDecimal }}
            </template>
            <template #footer>
              {{ total_moloz.ton | formatDecimal }}
            </template>
          </Column>
          <Column field="PriceTl" header="Fiyat (TL)">
            <template #body="slotProps">
              {{ slotProps.data.PriceTl | formatPriceTl }}
            </template>
          </Column>
          <Column field="PriceUsd" header="Fiyat ($)">
            <template #body="slotProps">
              {{ slotProps.data.PriceUsd | formatPriceUsd }}
            </template>
          </Column>
          <Column field="Currency" header="Kur">
            <template #body="slotProps">
              {{ slotProps.data.Currency | formatPriceUsd }}
            </template>
          </Column>
          <Column field="Total" header="Toplam (₺)">
            <template #body="slotProps">
              {{ slotProps.data.Total | formatPriceTl }}
            </template>
            <template #footer>
              {{ total_moloz.total | formatPriceTl }}
            </template>
          </Column>
          <Column field="Total" header="Toplam ($)">
            <template #body="slotProps">
              {{ slotProps.data.TotalUsd | formatPriceUsd }}
            </template>
            <template #footer>
              {{ total_moloz.total_usd | formatPriceUsd }}
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
    <Dialog
      :header="dialog_header"
      :visible.sync="cost_supplier_dialog"
      modal
      style="width: 100%"
    >
      <div class="row mt-5">
        <div class="col-4">
          <currencyApi
            @dateSelectedEmit="dateSelected($event)"
            @rateFetchedEmit="rateFetched($event)"
          />
          <!-- <Calendar
            style="width: 500px"
            id="date"
            :inline="true"
            v-model="selectedDate"
            dateFormat="dd.mm.yy"
            @date-select="dateSelected($event)"
          /> -->
        </div>
        <div class="col-8">
          <div class="row mt-5">
            <div class="col-3">
              <span class="p-float-label">
                <AutoComplete
                  id="supplier"
                  v-model="selectedSupplier"
                  :suggestions="filteredSupplier"
                  @complete="searchSupplier($event)"
                  field="FirmaAdi"
                  @item-select="supplierSelected($event)"
                  @input="supplierInput($event)"
                  :disabled="!model.currency"
                />
                <label for="supplier">Tedarikçi</label>
              </span>
            </div>
            <div class="col-3">
              <span class="p-float-label">
                <AutoComplete
                  :disabled="!model.currency"
                  id="quarry"
                  v-model="selectedQuarry"
                  :suggestions="filteredQuarry"
                  @complete="searchQuarry($event)"
                  field="OcakAdi"
                  @item-select="quarrySelected($event)"
                  @input="quarryInput($event)"
                />
                <label for="quarry">Ocaklar</label>
              </span>
            </div>
            <div class="col-3">
              <span class="p-float-label">
                <AutoComplete
                  :disabled="!model.currency"
                  id="strip"
                  v-model="selectedStrip"
                  :suggestions="filteredStrip"
                  @complete="searchStrip($event)"
                  field="Strips"
                  @item-select="stripSelected($event)"
                  @input="stripInput($event)"
                />
                <label for="strip">Stripler</label>
              </span>
            </div>
            <div class="col-3">
              <span class="p-float-label">
                <InputText
                  id="invoice"
                  type="text"
                  v-model="model.invoice"
                  :disabled="!model.currency"
                />
                <label for="invoice">Invoice</label>
              </span>
            </div>
          </div>
          <div class="row mt-5">
            <div class="col">
              <CustomInput
                :value="model.stripM2"
                text="Strip M2"
                @onInput="model.stripM2 = $event"
                :disabled="!model.currency"
              />
            </div>
            <div class="col">
              <CustomInput
                :value="model.stripPrice"
                text="Strip Kesim Fiyatı"
                @onInput="model.stripPrice = $event"
                :disabled="!model.currency"
              />
            </div>
            <div class="col">
              <CustomInput
                :value="model.stripCost"
                text="Strip Maliyet Toplam (₺)"
                @onInput="model.stripCost = $event"
                :disabled="true"
              />
            </div>
            <div class="col">
              <CustomInput
                :value="model.stripCostUsd"
                text="Strip Maliyet Toplam($)"
                @onInput="model.stripCostUsd = $event"
                :disabled="true"
              />
            </div>
          </div>
          <div class="row mt-5">
            <div class="col">
              <CustomInput
                :value="model.stripWidth"
                text="Strip En"
                @onInput="model.stripWidth = $event"
                :disabled="!model.currency"
              />
            </div>
            <div class="col">
              <CustomInput
                :value="model.stripHeight"
                text="Strip Boy"
                @onInput="model.stripHeight = $event"
                :disabled="!model.currency"
              />
            </div>
            <div class="col">
              <CustomInput
                :value="model.stripThickness"
                text="Strip Kalınlık"
                @onInput="model.stripThickness = $event"
                :disabled="!model.currency"
              />
            </div>
            <div class="col">
              <CustomInput
                :value="model.stripPiece"
                text="Strip Adet"
                @onInput="model.stripPiece = $event"
                :disabled="true"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col">
          <Button
            type="button"
            class="p-button-info w-100"
            label="Hesapla"
            @click="calculate"
          />
        </div>
        <div class="col">
          <Button
            class="w-100 p-button-primary"
            type="button"
            label="Kaydet"
            :disabled="button_disabled_2"
            @click="process"
          />
        </div>
        <div class="col" v-if="!new_button_status">
          <Button
            class="w-100 p-button-danger"
            type="button"
            label="Sil"
            @click="deleteProcess"
          />
        </div>
      </div>
    </Dialog>
    <Dialog
      :header="dialog_header_moloz"
      :visible.sync="cost_supplier_dialog_moloz"
      modal
      style="width: 100%"
    >
      <!-- <Dropdown
        class="mt-3"
        v-model="selectedCurrencyStatus"
        :options="currency_status"
        optionLabel="currency"
        placeholder="USD // TL"
        @change="molozPriceStatusSelected($event)"
      /> -->

      <div class="row mt-5">
        <div class="col-4">
          <currencyApi
            @dateSelectedEmit="dateMolozSelected($event)"
            @rateFetchedEmit="rateFetchedMoloz($event)"
          />
        </div>
        <div class="col-8">
          <div class="row mt-5">
            <div class="col-4">
              <span class="p-float-label">
                <AutoComplete
                  id="supplier"
                  v-model="selectedSupplier"
                  :suggestions="filteredSupplier"
                  @complete="searchSupplier($event)"
                  field="FirmaAdi"
                  @item-select="supplierSelectedMoloz($event)"
                  @input="supplierInputMoloz($event)"
                  :disabled="!moloz_model.currency"
                />
                <label for="supplier">Tedarikçi</label>
              </span>
            </div>
            <div class="col-4">
              <span class="p-float-label">
                <AutoComplete
                  :disabled="!moloz_model.currency"
                  id="quarry"
                  v-model="selectedQuarry"
                  :suggestions="filteredQuarry"
                  @complete="searchQuarry($event)"
                  field="OcakAdi"
                  @item-select="quarrySelectedMoloz($event)"
                  @input="quarryInputMoloz($event)"
                />
                <label for="quarry">Ocaklar</label>
              </span>
            </div>
            <div class="col-4">
              <span class="p-float-label">
                <AutoComplete
                  :disabled="!moloz_model.currency"
                  id="strip"
                  v-model="selectedStrip"
                  :suggestions="filteredStrip"
                  @complete="searchStrip($event)"
                  field="Strips"
                  @item-select="stripSelectedMoloz($event)"
                  @input="stripInputMoloz($event)"
                />
                <label for="strip">Ürün Adı</label>
              </span>
            </div>
          </div>
          <div class="row mt-5">
            <div class="col-4">
              <span class="p-float-label">
                <InputText
                  id="fatura_no"
                  v-model="moloz_model.fatura_no"
                  :disabled="!moloz_model.currency"
                />
                <label for="fatura_no">Fatura No</label>
              </span>
            </div>
            <div class="col-4">
              <span class="p-float-label">
                <InputText
                  id="irsaliye_no"
                  v-model="moloz_model.irsaliye_no"
                  :disabled="!moloz_model.currency"
                />
                <label for="irsaliye_no">İrsaliye No</label>
              </span>
            </div>
          </div>
          <div class="row mt-5">
            <div class="col">
              <span class="p-float-label">
                <InputNumber
                  v-model="moloz_model.ton"
                  mode="decimal"
                  :minFractionDigits="2"
                  :maxFracionDigits="2"
                  @input="molozTonInput($event)"
                  :disabled="!moloz_model.currency"
                />
                <label for="username">Ton</label>
              </span>
            </div>
            <div class="col">
              <span class="p-float-label">
                <InputNumber
                  id="usd-input"
                  v-model="moloz_model.price_tl"
                  mode="currency"
                  currency="TRY"
                  locale="tr-TR"
                  :minFractionDigits="2"
                  @input="molozTlInput($event)"
                  :disabled="!moloz_model.currency"
                />

                <label for="username">TL</label>
              </span>
            </div>
            <div class="col">
              <span class="p-float-label">
                <InputNumber
                  id="usd-input"
                  v-model="moloz_model.price_usd"
                  mode="currency"
                  :minFractionDigits="2"
                  @input="molozUsdInput($event)"
                  :disabled="!moloz_model.currency"
                  currency="USD"
                  locale="en-US"
                />

                <label for="username">USD</label>
              </span>
            </div>
            <div class="col">
              <CustomInput
                :value="moloz_model.total"
                text="Toplam (₺)"
                @onInput="moloz_model.total = $event"
                :disabled="true"
              />
            </div>
            <div class="col">
              <CustomInput
                :value="moloz_model.total_usd"
                text="Toplam ($)"
                @onInput="moloz_model.total_usd = $event"
                :disabled="true"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col">
          <Button
            class="w-100 p-button-primary"
            type="button"
            label="Kaydet"
            :disabled="moloz_model.total > 0 ? false : true"
            @click="processMoloz"
          />
        </div>
        <div class="col" v-if="!new_button_status_moloz">
          <Button
            class="w-100 p-button-danger"
            type="button"
            label="Sil"
            @click="deleteProcessMoloz"
          />
        </div>
      </div>
    </Dialog>
  </div>
</template>
<script>
import server from "../../../plugins/excel.server";
import date from "../../../plugins/date";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getLocalUrl"]),
  },
  data() {
    return {
      moloz_list: [],
      selectedMolozData: {},
      total_moloz: {
        ton: 0,
        total: 0,
        total_usd: 0,
      },
      tl_disabled: true,
      usd_disabled: true,
      disabled_calendar_moloz: true,
      selectedCurrencyStatus: null,
      dialog_header_moloz: "",
      cost_supplier_dialog_moloz: false,
      dialog_header: "",
      selectedStripData: {},
      button_disabled_2: true,
      years: [
        { year: new Date().getFullYear() },
        { year: new Date().getFullYear() - 1 },
      ],
      selectedYear: { year: new Date().getFullYear() },
      months: [],
      selectedMonth: null,
      suppliers: [],
      list: [],
      strips: [],
      quarries: [],
      cost_supplier_dialog: false,
      selectedSupplier: null,
      filteredSupplier: null,
      model: {
        quarryName: null,
        quarryId: null,
        supplierName: null,
        supplierId: null,
        stripId: null,
        stripName: null,
        stripPrice: 0,
        stripM2: 0,
        date: null,
        stripCost: 0,
        stripCostUsd: 0,
        stripWidth: 0,
        stripHeight: 0,
        stripThickness: 0,
        stripPiece: 0,
        invoice: "",
        currency: 0,
      },
      selectedQuarry: null,
      filteredQuarry: null,
      selectedStrip: null,
      filteredStrip: null,
      selectedDate: null,
      new_button_status: false,
      disabled_1: false,
      disabled_2: false,
      disabled_3: false,
      disabled_4: false,
      disabled_5: false,
      disabled_6: false,
      button_disabled: false,
      total: {
        m2: 0,
        cost: 0,
        piece: 0,
        costUsd: 0,
      },
      moloz_model: {
        id: 0,
        date: null,
        quarryId: null,
        quarryName: null,
        supplierId: null,
        supplierName: null,
        stripId: null,
        stripName: null,
        ton: 0,
        price_tl: 0,
        price_usd: 0,
        total: 0,
        total_usd: 0,
        currency: 0,
        irsaliye_no: "",
        fatura_no: "",
      },
      new_button_status_moloz: false,
      currency_status: [
        { id: 1, currency: "USD" },
        { id: 2, currency: "TL" },
      ],
    };
  },
  created() {
    const date = new Date();
    const month = date.getMonth();
    let _months = [];
    for (let i = 0; i <= month; i++) {
      _months.push({ month_id: i, month_name: "" });
    }
    const _months_name = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    _months = _months.map((item) => {
      const new_item = {};
      new_item.month_name = _months_name[item.month_id];
      new_item.month_id = item.month_id + 1;

      return new_item;
    });
    this.months = _months;
    this.selectedMonth = {
      month_id: _months.length,
      month_name: _months_name[_months.length - 1],
    };

    this.$store.dispatch("setBeginLoadingAction");

    this.$axios
      .get(
        `/reports/mekmer/quarries/supplier/${this.selectedYear.year}/${this.selectedMonth.month_id}`
      )
      .then((res) => {
        this.suppliers = res.data.suppliers;
        this.list = res.data.list;
        this.strips = res.data.strips;
        this.quarries = res.data.quarries;
        this.totalStrips(res.data.list);
        this.$axios
          .get(
            `/reports/mekmer/moloz/list/${this.selectedYear.year}/${this.selectedMonth.month_id}`
          )
          .then((res) => {
            this.moloz_list = res.data.list;
            this.suppliers = res.data.suppliers;
            this.strips = res.data.strips;
            this.quarries = res.data.quarries;
            this.__molozSumTotal(res.data.list);
            this.$store.dispatch("setEndLoadingAction");
          });
      })
      .catch((err) => {
        console.log("err", err);
      });
  },
  methods: {
    dateMolozSelected(event) {
      this.moloz_model.date = date.dateToString(event);
    },
    rateFetchedMoloz(event) {
      this.moloz_model.currency = event.rate;
    },
    rateFetched(event) {
      this.model.currency = event.rate;
    },
    molozTonInput(event) {
      this.moloz_model.total = parseFloat(this.moloz_model.price_tl * event);
      this.moloz_model.total_usd = parseFloat(
        this.moloz_model.price_usd * event
      );
    },
    molozDatatableSelected(event) {
      this.new_button_status_moloz = false;
      this.moloz_model.id = event.data.ID;
      this.moloz_model.date = event.data.Date;
      this.moloz_model.supplierId = event.data.Supplier;
      this.moloz_model.quarryId = event.data.Quarry;
      this.moloz_model.stripId = event.data.Strip;
      this.moloz_model.ton = event.data.Ton;
      this.moloz_model.price_tl = event.data.PriceTl;
      this.moloz_model.price_usd = event.data.PriceUsd;
      this.moloz_model.currency = event.data.Currency;
      this.moloz_model.total = event.data.Total;
      this.moloz_model.irsaliye_no = event.data.İrsaliyeNo;
      this.moloz_model.fatura_no = event.data.FaturaNo;
      this.selectedDate = date.stringToDate(event.data.Date);
      this.selectedSupplier = this.suppliers.find((x) => {
        return x.ID == event.data.Supplier;
      });
      this.selectedQuarry = this.quarries.find((x) => {
        return x.ID == event.data.Quarry;
      });
      this.selectedStrip = this.strips.find((x) => {
        return x.ID == event.data.Strip;
      });
      this.dialog_header_moloz =
        this.selectedQuarry.OcakAdi + " - " + this.selectedStrip.Strips;

      this.cost_supplier_dialog_moloz = true;
    },
    isInvalidNumber(value) {
      return !value || value === "" || isNaN(value);
    },
    __molozSumTotal(data) {
      this.total_moloz = {
        ton: 0,
        total: 0,
        total_usd: 0,
      };
      data.forEach((x) => {
        this.total_moloz.ton += x.Ton;
        this.total_moloz.total += x.Total;
        this.total_moloz.total_usd += x.TotalUsd;
      });
    },
    molozTlInput(event) {
      if (
        event == 0 ||
        event == null ||
        event == undefined ||
        event == "" ||
        isNaN(event)
      ) {
        this.moloz_model.price_tl = 0;

        this.moloz_model.price_usd = 0;
        this.moloz_model.total = 0;
        this.moloz_model.total_usd = 0;
      }
      this.moloz_model.price_usd = event / this.moloz_model.currency;
      this.moloz_model.total = event * this.moloz_model.ton;

      this.moloz_model.total_usd =
        this.moloz_model.price_usd * this.moloz_model.ton;
    },
    molozUsdInput(event) {
      if (
        event == 0 ||
        event == null ||
        event == undefined ||
        event == "" ||
        isNaN(event)
      ) {
        this.moloz_model.price_tl = 0;
        this.moloz_model.price_usd = 0;

        this.moloz_model.total = 0;
        this.moloz_model.total_usd = 0;
      }
      this.moloz_model.price_tl = event * this.moloz_model.currency;
      this.moloz_model.total = this.moloz_model.price_tl * this.moloz_model.ton;
      this.moloz_model.total_usd = event * this.moloz_model.ton;
    },
    molozPriceStatusSelected(event) {
      this.disabled_calendar_moloz = false;
      if (event.value.id == 1) {
        this.usd_disabled = false;
        this.tl_disabled = true;
      } else if (event.value.id == 2) {
        this.usd_disabled = true;
        this.tl_disabled = false;
      }
    },
    updateMoloz() {
      this.$store.dispatch("setBeginLoadingAction");

      this.$axios
        .put("/reports/mekmer/moloz/update", this.moloz_model)
        .then((res) => {
          if (res.status) {
            this.__created();

            this.$toast.success("Güncelleme Başarılı.");
            this.$store.dispatch("setEndLoadingAction");
          } else {
            this.$toast.error("Güncelleme Başarısız.");
          }
        });
    },
    saveMoloz() {
      this.$axios
        .post("/reports/mekmer/moloz/save", this.moloz_model)
        .then((res) => {
          if (res.status) {
            this.__created();
            this.reset();
            this.new_button_status_moloz = false;
            this.cost_supplier_dialog_moloz = false;
            this.$toast.success("Kayıt Başarılı.");
          } else {
            this.$toast.error("Kayıt Başarısız.");
          }
        });
    },
    deleteProcessMoloz() {
      this.$axios
        .delete(`/reports/mekmer/moloz/delete/${this.moloz_model.id}`)
        .then((res) => {
          if (res.status) {
            this.$toast.success("Silme İşlemi Başarılı");
            this.__created();
            this.cost_supplier_dialog_moloz = false;
            this.reset();
          } else {
            this.$toast.error("Silme İşlemi Başarısız");
          }
        });
    },
    processMoloz() {
      if (this.new_button_status_moloz) {
        this.saveMoloz();
      } else {
        this.updateMoloz();
      }
    },
    calculateMoloz() {
      this.moloz_model.total =
        parseFloat(this.moloz_model.ton) * parseFloat(this.moloz_model.price);
      this.button_disabled_2 = false;
    },
    stripInputMoloz(event) {
      this.moloz_model.stripId = null;
      this.moloz_model.stripName = event;
      this.disabled_4 = false;
    },
    stripSelectedMoloz(event) {
      this.moloz_model.stripId = event.value.ID;
      this.moloz_model.stripName = event.value.Strips;
    },
    quarryInputMoloz(event) {
      this.moloz_model.quarryId = null;
      this.moloz_model.quarryName = event;
      this.disabled_3 = false;
    },
    quarrySelectedMoloz(event) {
      this.moloz_model.quarryId = event.value.ID;
      this.moloz_model.quarryName = event.value.OcakAdi;
    },
    dateSelectedMoloz(event) {
      this.moloz_model.date = date.dateToString(event);

      this.disabled_1 = false;
      const year = event.getFullYear();
      const month = event.getMonth() + 1;
      const day = event.getDate();

      server
        .get("/finance/doviz/liste/" + year + "/" + month + "/" + day)
        .then((response) => {
          this.moloz_model.currency = parseFloat(response.data);
        });
    },
    supplierInputMoloz(event) {
      this.moloz_model.supplierId = null;
      this.moloz_model.supplierName = event;
      this.disabled_2 = false;
    },
    supplierSelectedMoloz(event) {
      this.moloz_model.supplierId = event.value.ID;
      this.moloz_model.supplierName = event.value.FirmaAdi;
    },
    newFormMoloz() {
      this.dialog_header_moloz = "Yeni Moloz Ekle";
      this.cost_supplier_dialog_moloz = true;
      this.reset();
      this.new_button_status_moloz = true;
    },
    excel_strip_output_moloz() {
      server
        .post("/reports/mekmer/moloz/excel", this.moloz_list)
        .then((res) => {
          if (res.status) {
            const link = document.createElement("a");
            link.href = this.getLocalUrl + "reports/mekmer/moloz/excel";

            link.setAttribute("download", "reports_mekmer_moloz.xlsx");
            document.body.appendChild(link);
            link.click();
          }
        });
    },
    deleteProcess() {
      this.$axios
        .delete(
          `/reports/mekmer/quarries/supplier/strips/delete/${this.model.Id}`
        )
        .then((res) => {
          if (res.status) {
            this.cost_supplier_dialog = false;
            this.$toast.success("Başarıyla Silindi");
            this.__created();
          } else {
            this.$toast.error("Silme Başarısız");
          }
        });
    },
    totalStrips(payload) {
      this.total = {
        m2: 0,
        cost: 0,
        piece: 0,
        costUsd: 0,
      };
      payload.forEach((x) => {
        this.total.m2 += x.StripM2;
        this.total.cost += x.StripCost;
        this.total.costUsd += x.StripCostUsd;
        this.total.piece += x.StripPiece;
      });
    },
    excel_strip_output() {
      server.post("/reports/mekmer/strips/excel", this.list).then((res) => {
        if (res.status) {
          const link = document.createElement("a");
          link.href = this.getLocalUrl + "reports/mekmer/strips/excel";

          link.setAttribute("download", "reports_mekmer_strips.xlsx");
          document.body.appendChild(link);
          link.click();
        }
      });
    },
    stripDataSelected(event) {
      this.new_button_status = false;
      this.cost_supplier_dialog = true;
      this.button_disabled_2 = true;
      this.model.Id = event.data.ID;
      this.model.date = event.data.Date;
      this.model.supplierId = event.data.Supplier;
      this.model.quarryId = event.data.Quarry;
      this.model.stripCost = event.data.StripCost;
      this.model.stripCostUsd = event.data.StripCostUsd;
      this.model.stripId = event.data.Strip;
      this.model.stripPrice = event.data.StripPrice;
      this.model.currency = event.data.Currency;
      this.model.stripM2 = event.data.StripM2;
      this.model.stripWidth = event.data.StripWidth;
      this.model.stripHeight = event.data.StripHeight;
      this.model.stripThickness = event.data.StripThickness;
      this.model.stripPiece = event.data.StripPiece;
      this.model.invoice = event.data.Invoice;
      this.selectedDate = date.stringToDate(event.data.Date);
      this.selectedSupplier = this.suppliers.find((x) => {
        return x.ID == event.data.Supplier;
      });
      this.selectedQuarry = this.quarries.find((x) => {
        return x.ID == event.data.Quarry;
      });
      this.selectedStrip = this.strips.find((x) => {
        return x.ID == event.data.Strip;
      });
      this.dialog_header =
        this.selectedQuarry.OcakAdi + " - " + this.selectedStrip.Strips;
    },
    dateSelected(event) {
      this.model.date = date.dateToString(event);
      this.disabled_1 = false;
    },
    calculate() {
      this.model.stripCost =
        parseFloat(this.model.stripM2) * parseFloat(this.model.stripPrice);
      if (isNaN(this.model.stripCost) || !isFinite(this.model.stripCost)) {
        this.model.stripCost = 0;
      }

      this.model.stripPiece = Math.ceil(
        parseFloat(this.model.stripM2) /
          (parseFloat(this.model.stripWidth) / 100) /
          (parseFloat(this.model.stripHeight) / 100)
      );
      if (this.model.stripPiece == NaN || !isFinite(this.model.stripPiece)) {
        this.model.stripPiece = 0;
      }
      this.model.stripCostUsd =
        parseFloat(this.model.stripM2) *
        (parseFloat(this.model.stripPrice) / this.model.currency);

      if (
        this.model.stripCostUsd == NaN ||
        !isFinite(this.model.stripCostUsd)
      ) {
        this.model.stripCostUsd = 0;
      }
      this.button_disabled_2 = false;
    },

    __created() {
      this.$store.dispatch("setBeginLoadingAction");

      this.$axios
        .get(
          `/reports/mekmer/quarries/supplier/${this.selectedYear.year}/${this.selectedMonth.month_id}`
        )
        .then((res) => {
          this.suppliers = res.data.suppliers;
          this.list = res.data.list;
          this.strips = res.data.strips;
          this.quarries = res.data.quarries;
          this.totalStrips(res.data.list);
          this.$axios
            .get(
              `/reports/mekmer/moloz/list/${this.selectedYear.year}/${this.selectedMonth.month_id}`
            )
            .then((res) => {
              this.moloz_list = res.data.list;
              this.suppliers = res.data.suppliers;
              this.strips = res.data.strips;
              this.quarries = res.data.quarries;
              this.__molozSumTotal(res.data.list);
              this.$store.dispatch("setEndLoadingAction");
            });
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
    yearSelected(event) {},
    monthSelected(event) {
      this.$axios
        .get(
          `/reports/mekmer/quarries/supplier/${this.selectedYear.year}/${this.selectedMonth.month_id}`
        )
        .then((res) => {
          this.suppliers = res.data.suppliers;
          this.list = res.data.list;
          this.strips = res.data.strips;
          this.quarries = res.data.quarries;
          this.totalStrips(res.data.list);
        })
        .catch((err) => {
          console.log("err", err);
        });
      this.$axios
        .get(
          `/reports/mekmer/moloz/list/${this.selectedYear.year}/${this.selectedMonth.month_id}`
        )
        .then((res) => {
          this.moloz_list = res.data.list;
          this.__molozSumTotal(res.data.list);
        });
    },
    searchSupplier(event) {
      let results;
      if (event.query.lenght == 0) {
        results = this.suppliers;
      } else {
        results = this.suppliers
          .filter((x) => {
            return x.FirmaAdi.toUpperCase().startsWith(
              event.query.toUpperCase()
            );
          })
          .slice(0, 15);
      }
      this.filteredSupplier = results;
    },
    supplierSelected(event) {
      this.model.supplierId = event.value.ID;
      this.model.supplierName = event.value.FirmaAdi;
    },
    supplierInput(event) {
      this.model.supplierId = null;
      this.model.supplierName = event;
      this.disabled_2 = false;
    },
    searchQuarry(event) {
      let results;
      if (event.query.lenght == 0) {
        results = this.quarries;
      } else {
        results = this.quarries
          .filter((x) => {
            return x.OcakAdi.toUpperCase().startsWith(
              event.query.toUpperCase()
            );
          })
          .slice(0, 15);
      }
      this.filteredQuarry = results;
    },
    quarrySelected(event) {
      this.model.quarryId = event.value.ID;
      this.model.quarryName = event.value.OcakAdi;
    },
    quarryInput(event) {
      this.model.quarryId = null;
      this.model.quarryName = event;
      this.disabled_3 = false;
    },
    searchStrip(event) {
      let results;
      if (event.query.lenght == 0) {
        results = this.strips;
      } else {
        results = this.strips
          .filter((x) => {
            return x.Strips.toUpperCase().startsWith(event.query.toUpperCase());
          })
          .slice(0, 15);
      }
      this.filteredStrip = results;
    },
    stripSelected(event) {
      this.model.stripId = event.value.ID;
      this.model.stripName = event.value.StripName;
    },
    stripInput(event) {
      this.model.stripId = null;
      this.model.stripName = event;
      this.disabled_4 = false;
    },

    newForm() {
      this.dialog_header = "New Form";
      this.new_button_status = true;
      this.cost_supplier_dialog = true;
      this.reset();
    },
    reset() {
      this.selectedSupplier = null;
      (this.model = {
        quarryName: null,
        quarryId: null,
        supplierName: null,
        supplierId: null,
        stripId: null,
        stripName: null,
        stripPrice: 0,
        stripM2: 0,
        date: null,
        stripCost: 0,
        stripCostUsd: 0,
        stripWidth: 0,
        stripHeight: 0,
        stripThickness: 0,
        stripPiece: 0,
        invoice: "",
        currency: 0,
      }),
        (this.selectedQuarry = null);
      this.selectedStrip = null;
      this.selectedDate = null;
      this.disabled_1 = false;
      this.disabled_2 = false;
      this.disabled_3 = false;
      this.disabled_4 = false;
      this.disabled_5 = false;
      this.disabled_6 = false;
      this.moloz_model = {
        id: 0,
        date: null,
        quarryId: null,
        quarryName: null,
        supplierId: null,
        supplierName: null,
        stripId: null,
        stripName: null,
        ton: 0,
        price_tl: 0,
        price_usd: 0,
        total: 0,
        total_usd: 0,
        currency: 0,
        irsaliye_no: "",
        fatura_no: "",
      };
    },
    process() {
      if (this.new_button_status) this.save();
      else this.update();
    },
    save() {
      this.$store.dispatch("setBeginLoadingAction");
      this.$axios
        .post("/reports/mekmer/quarries/supplier/strips/save", this.model)
        .then((status) => {
          if (status) {
            this.$toast.success("Başarıyla Kaydedildi.");
            this.$store.dispatch("setEndLoadingAction");
            this.__created();
            this.reset();
          }
        })
        .catch((err) => {
          this.$toast.error("Kaydetme başarısız...");
          this.$store.dispatch("setEndLoadingAction");
        });
    },
    update() {
      this.$axios
        .put("/reports/mekmer/quarries/supplier/strips/update", this.model)
        .then((res) => {
          if (res.status) {
            this.$toast.success("Başarıyla Güncellendi.");
            this.__created();
          } else {
            this.$toast.error("Güncelleme başarısız...");
          }
        });
    },
    __controlModel(val) {
      if (
        val == null ||
        val == "" ||
        val == "" ||
        val == undefined ||
        val == 0
      ) {
        return false;
      } else {
        return true;
      }
    },
    _getSupplierName(_id) {
      let name = this.suppliers.find((x) => {
        return x.ID == _id;
      }).FirmaAdi;
      return name;
    },
    _getQuarryName(_id) {
      let name = this.quarries.find((x) => {
        return x.ID == _id;
      }).OcakAdi;
      return name;
    },
    _getStripName(_id) {
      let name = this.strips.find((x) => {
        return x.ID == _id;
      }).Strips;
      return name;
    },
  },
  watch: {},
};
</script>
