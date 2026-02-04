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
      <div class="col-sm-1">
        <Button
          class="mb-5 p-button-info pi pi-file-excel"
          type="button"
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
      <div class="col-sm-1">
        <Button
          class="pi pi-file-excel mb-5 p-button-info"
          type="button"
          @click="excel_strip_output_moloz"
        />
      </div>
      <div class="col-sm-3">
        <Button
          class="w-100 mb-5 p-button-success"
          type="button"
          label="Yeni Nakliye"
          @click="newFormNakliye"
        />
      </div>
      <div class="col-sm-1">
        <Button
          class="pi pi-file-excel mb-5 p-button-info"
          type="button"
          @click="excel_strip_output_nakliye"
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
      <div class="col-4">
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
          :filters.sync="filteredStrips"
          filterDisplay="row"
          @filter="stripsFiltered($event)"
          scrollable
          scrollHeight="500px"
        >
          <template #header>STRIPLER</template>
          <Column
            field="Date"
            header="Tarih"
            :showFilterMenu="false"
            :showClearButton="false"
          >
            <template #body="slotProps">
              {{ slotProps.data.Date | dateToString }}
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
            field="DocumentNo"
            header="İrsaliye No"
            :showFilterMenu="false"
            :showClearButton="false"
          >
            <template #body="slotProps">
              {{ slotProps.data.DocumentNo }}
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
            field="SupplierName"
            header="Tedarikçi Adı"
            :showFilterMenu="false"
            :showClearButton="false"
          >
            <template #body="slotProps">
              {{ slotProps.data.SupplierName }}
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
            field="QuarryName"
            header="Ocak Adı"
            :showFilterMenu="false"
            :showClearButton="false"
          >
            <template #body="slotProps">
              {{ slotProps.data.QuarryName }}
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
          <Column field="StripName" header="Strip Adı">
            <template #body="slotProps">
              {{ slotProps.data.StripName }}
            </template>
          </Column>
          <Column
            field="Invoice"
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
      <div class="col-4">
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
          :filters.sync="filteredMoloz"
          filterDisplay="row"
          @filter="molozFiltered($event)"
          scrollable
          scrollHeight="500px"
        >
          <template #header>MOLOZLAR</template>
          <Column
            field="Date"
            header="Tarih"
            :showFilterMenu="false"
            :showClearButton="false"
          >
            <template #body="slotProps">
              {{ slotProps.data.Date | dateToString }}
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
            field="İrsaliyeNo"
            header="İrsaliye No"
            :showFilterMenu="false"
            :showClearButton="false"
          >
            <template #body="slotProps">
              {{ slotProps.data.İrsaliyeNo }}
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
            field="SupplierName"
            header="Tedarikçi Adı"
            :showFilterMenu="false"
            :showClearButton="false"
          >
            <template #body="slotProps">
              {{ slotProps.data.SupplierName }}
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
            <template #body="slotProps">
              {{ slotProps.data.FaturaNo }}
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
            field="QuarryName"
            header="Ocak Adı"
            :showFilterMenu="false"
            :showClearButton="false"
          >
            <template #body="slotProps">
              {{ slotProps.data.QuarryName }}
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
            field="StripName"
            header="Ürün Adı"
            :showFilterMenu="false"
            :showClearButton="false"
          >
            <template #body="slotProps">
              {{ slotProps.data.StripName }}
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
      <div class="col-4">
        <DataTable
          :value="nakliyeList"
          responsiveLayout="scroll"
          class="p-datatable-sm"
          :resizableColumns="true"
          columnResizeMode="fit"
          showGridlines
          :selection.sync="selectedNakliye"
          selectionMode="single"
          @row-click="nakliyeDatatableSelected($event)"
          :filters.sync="filteredNakliye"
          filterDisplay="row"
          @filter="nakliyeFiltered($event)"
          scrollable
          scrollHeight="500px"
        >
          <template #header>Nakliye</template>
          <Column
            field="Tarih"
            header="Tarih"
            :showFilterMenu="false"
            :showClearButton="false"
          >
            <template #body="slotProps">
              {{ slotProps.data.Tarih | dateToString }}
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
            field="PlakaNo"
            header="Plaka No"
            :showFilterMenu="false"
            :showClearButton="false"
          >
            <template #body="slotProps">
              {{ slotProps.data.PlakaNo }}
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
            field="İrsaliyeNo"
            header="İrsaliye No"
            :showFilterMenu="false"
            :showClearButton="false"
          >
            <template #body="slotProps">
              {{ slotProps.data.İrsaliyeNo }}
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
            <template #body="slotProps">
              {{ slotProps.data.FaturaNo }}
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
            header="Firma Adı"
            :showFilterMenu="false"
            :showClearButton="false"
          >
            <template #body="slotProps">
              {{ slotProps.data.FirmaAdi }}
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
            field="KimdenAdi"
            header="Kimden"
            :showFilterMenu="false"
            :showClearButton="false"
          >
            <template #body="slotProps">
              {{ slotProps.data.KimdenAdi }}
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

          <Column field="Ton" header="Ton">
            <template #body="slotProps">
              {{ slotProps.data.Ton | formatDecimal }}
            </template>
            <template #footer>
              {{ nakliyeTotal.ton | formatDecimal }}
            </template>
          </Column>
          <Column field="BirimFiyatTL" header="Fiyat (TL)">
            <template #body="slotProps">
              {{ slotProps.data.BirimFiyatTL | formatPriceTl }}
            </template>
          </Column>
          <Column field="BirimFiyatDolar" header="Fiyat ($)">
            <template #body="slotProps">
              {{ slotProps.data.BirimFiyatDolar | formatPriceUsd }}
            </template>
          </Column>
          <Column field="Currency" header="Kur">
            <template #body="slotProps">
              {{ slotProps.data.Kur | formatPriceUsd }}
            </template>
          </Column>
          <Column field="ToplamTl" header="Toplam (₺)">
            <template #body="slotProps">
              {{ slotProps.data.ToplamTl | formatPriceTl }}
            </template>
            <template #footer>
              {{ nakliyeTotal.total_tl | formatPriceTl }}
            </template>
          </Column>
          <Column field="ToplamDolar" header="Toplam ($)">
            <template #body="slotProps">
              {{ slotProps.data.ToplamDolar | formatPriceUsd }}
            </template>
            <template #footer>
              {{ nakliyeTotal.total_usd | formatPriceUsd }}
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
                <span class="p-float-label">
                  <InputText
                    id="irsaliye"
                    type="text"
                    v-model="model.irsaliye_no"
                    :disabled="!model.currency"
                  />
                  <label for="irsaliye">İrsaliye</label>
                </span>
              </span>
            </div>
            <div class="col-3">
              <span class="p-float-label">
                <InputText
                  id="fatura"
                  type="text"
                  v-model="model.invoice"
                  :disabled="!model.currency"
                />
                <label for="fatura">Fatura No</label>
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
            :disabled="!moloz_model.currency"
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
    <Dialog
      :visible.sync="nakliye_dialog_visible"
      :header="nakliye_dialog_header"
      modal
    >
      <div class="row mt-3">
        <div class="col-6">
          <currencyApi
            @dateSelectedEmit="dateNakliyeSelected($event)"
            @rateFetchedEmit="rateFetchedNakliye($event)"
          />
        </div>
        <div class="col-6">
          <div class="row gap-1">
            <div class="col-3">
              <span class="p-float-label">
                <InputText
                  class="w-100"
                  id="plate_no"
                  v-model="modelNakliye.plate_no"
                  :disabled="!modelNakliye.currency"
                />
                <label for="plate_no">Plaka No</label>
              </span>
            </div>
            <div class="col-3">
              <span class="p-float-label">
                <InputText
                  class="w-100"
                  id="document_no"
                  v-model="modelNakliye.document_no"
                  :disabled="!modelNakliye.currency"
                />
                <label for="document_no">İrsaliye No</label>
              </span>
            </div>
            <div class="col-3">
              <span class="p-float-label">
                <InputText
                  class="w-100"
                  id="invoice_no"
                  v-model="modelNakliye.invoice_no"
                  :disabled="!modelNakliye.currency"
                />
                <label for="invoice_no">Fatura No</label>
              </span>
            </div>
            <div class="col-3">
              <span class="p-float-label">
                <AutoComplete
                  id="supplier"
                  v-model="selectedNakliyeFirma"
                  :suggestions="filteredNakliyeFirma"
                  @complete="searchNakliyeFirma($event)"
                  field="FirmaAdi"
                  @item-select="nakliyeSelectedFirma($event)"
                  @input="supplierInputFirma($event)"
                  :disabled="!modelNakliye.currency"
                />
                <label for="supplier">Firma</label>
              </span>
            </div>
            <div class="col-3">
              <span class="p-float-label">
                <AutoComplete
                  id="supplier"
                  v-model="selectedNakliyeKimden"
                  :suggestions="filteredNakliyeKimden"
                  @complete="searchNakliyeKimden($event)"
                  field="KimdenAdi"
                  @item-select="nakliyeSelectedKimden($event)"
                  @input="supllierInputKimden($event)"
                  :disabled="!modelNakliye.currency"
                />
                <label for="supplier">Kimden</label>
              </span>
            </div>
            <div class="col-3">
              <CustomInput
                :value="modelNakliye.ton"
                text="Ton"
                @onInput="modelNakliye.ton = $event"
                :disabled="!modelNakliye.currency"
              />
            </div>
            <div class="col-3">
              <CustomInput
                :value="modelNakliye.price_tl"
                text="Fiyat (₺)"
                @onInput="modelNakliye.price_tl = $event"
                :disabled="!modelNakliye.currency"
              />
            </div>
            <div class="col-3">
              <CustomInput
                :value="modelNakliye.price_usd"
                text="Fiyat ($)"
                @onInput="modelNakliye.price_usd = $event"
                :disabled="true"
              />
            </div>
            <div class="col-3">
              <CustomInput
                :value="modelNakliye.total_tl"
                text="Toplam (₺)"
                @onInput="modelNakliye.total_tl = $event"
                :disabled="true"
              />
            </div>
            <div class="col-3">
              <CustomInput
                :value="modelNakliye.total_usd"
                text="Toplam ($)"
                @onInput="modelNakliye.total_usd = $event"
                :disabled="true"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              <Button
                class="w-100 p-button-secondary"
                type="button"
                label="Hesapla"
                @click="calculateNakliyeUsdTl"
                :disabled="!modelNakliye.currency"
              />
            </div>
            <div :class="new_button_status_nakliye ? 'col-6' : 'col-4'">
              <Button
                :class="
                  new_button_status_nakliye
                    ? 'w-100 p-button-success'
                    : 'w-100 p-button-warning'
                "
                type="button"
                :label="new_button_status_nakliye ? 'Kaydet' : 'Güncelle'"
                :disabled="!modelNakliye.currency"
                @click="processNakliye"
                :loading="nakliye_save_button_loading"
              />
            </div>
            <div class="col-4" v-if="!new_button_status_nakliye">
              <Button
                class="w-100 p-button-danger"
                type="button"
                label="Sil"
                @click="deleteNakliye"
                :loading="nakliye_delete_button_loading"
              />
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  </div>
</template>
<script>
import date from "../../../plugins/date";
import { mapGetters } from "vuex";
import { FilterMatchMode } from "primevue/api";

export default {
  computed: {
    ...mapGetters(["getLocalUrl"]),
  },
  data() {
    return {
      selectedNakliye: null,
      nakliye_delete_button_loading: false,
      nakliyeTotal: {
        ton: 0,
        total_tl: 0,
        total_usd: 0,
      },
      nakliye_save_button_loading: false,
      filteredNakliyeKimden: null,
      selectedNakliyeKimden: null,
      nakliyeFirmaList: [],
      nakliyeKimdenList: [],
      filteredNakliyeFirma: null,
      selectedNakliyeFirma: null,
      filteredMoloz: {
        Date: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        İrsaliyeNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        SupplierName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        QuarryName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        FaturaNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        StripName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      filteredStrips: {
        Date: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        DocumentNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        SupplierName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        QuarryName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Invoice: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      filteredNakliye: {
        Tarih: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        PlakaNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        İrsaliyeNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        FaturaNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        FirmaAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        KimdenAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
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
        irsaliye_no: "",
      },
      modelNakliye: {
        id: 0,
        date: null,
        plate_no: "",
        document_no: "",
        invoice_no: "",
        company_name: "",
        company_id: "",
        supplier_name: "",
        supplier_id: "",
        ton: 0,
        price_tl: 0,
        price_usd: 0,
        total_tl: 0,
        total_usd: 0,
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
      new_button_status_nakliye: false,
      nakliye_dialog_header: "",
      nakliye_dialog_visible: false,
      nakliyeList: [],
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
    this.nakliyeCalculate();
  },
  methods: {
    nakliyeFiltered(event) {
      this.nakliyeTotal = {
        ton: 0,
        total_tl: 0,
        total_usd: 0,
      };

      event.filteredValue.forEach((x) => {
        this.nakliyeTotal.ton += x.Ton;
        this.nakliyeTotal.total_tl += x.ToplamTl;
        this.nakliyeTotal.total_usd += x.ToplamDolar;
      });
    },
    async calculateNakliyeUsdTl() {
      if (!this.modelNakliye.currency) {
        alert("Lütfen önce kuru seçiniz.");
        return;
      }
      if (!this.modelNakliye.ton || !this.modelNakliye.price_tl) {
        alert("Lütfen ton ve fiyat (₺) alanlarını doldurunuz.");
        return;
      }
      this.modelNakliye.total_tl = await parseFloat(
        this.modelNakliye.ton * this.modelNakliye.price_tl
      );
      this.modelNakliye.price_usd = await parseFloat(
        this.modelNakliye.price_tl / this.modelNakliye.currency
      );
      this.modelNakliye.total_usd = await parseFloat(
        this.modelNakliye.ton * this.modelNakliye.price_usd
      );
    },
    deleteNakliye() {
      this.nakliye_delete_button_loading = true;
      this.$axios
        .get(`/reports/mekmer/nakliye/deleted/${this.modelNakliye.id}`)
        .then((res) => {
          if (res.data.status) {
            this.nakliye_delete_button_loading = false;
            this.nakliye_dialog_visible = false;
            this.$toast.success("Silme Başarılı.");
            this.nakliyeReset();
          } else {
            this.$toast.error("Silme Başarısız.");
          }
        });
    },
    nakliyeDatatableSelected(event) {
      this.new_button_status_nakliye = false;
      this.nakliye_dialog_header = "Nakliye Düzenle";
      this.nakliye_dialog_visible = true;
      this.modelNakliye.id = event.data.ID;
      this.modelNakliye.date = event.data.Tarih;
      this.modelNakliye.plate_no = event.data.PlakaNo;
      this.modelNakliye.document_no = event.data.İrsaliyeNo;
      this.modelNakliye.invoice_no = event.data.FaturaNo;
      this.modelNakliye.company_name = event.data.FirmaAdi;
      this.modelNakliye.company_id = event.data.FirmaID;
      this.modelNakliye.supplier_name = event.data.KimdenAdi;
      this.modelNakliye.supplier_id = event.data.KimdenID;
      this.modelNakliye.ton = event.data.Ton;
      this.modelNakliye.price_tl = event.data.BirimFiyatTL;
      this.modelNakliye.price_usd = event.data.BirimFiyatDolar;
      this.modelNakliye.total_tl = event.data.ToplamTl;
      this.modelNakliye.total_usd = event.data.ToplamDolar;
      this.modelNakliye.currency = event.data.Kur;
      this.selectedNakliyeFirma = this.nakliyeFirmaList.find(
        (x) => x.ID === event.data.FirmaID
      );
      this.selectedNakliyeKimden = this.nakliyeKimdenList.find(
        (x) => x.ID === event.data.KimdenID
      );
    },
    async nakliyeCalculate() {
      await this.$axios
        .get(
          `/reports/mekmer/nakliye/listesi/${this.selectedYear.year}/${this.selectedMonth.month_id}`
        )
        .then(async (res) => {
          this.nakliyeList = await res.data.list;
          this.nakliyeTotal = {
            ton: 0,
            total_tl: 0,
            total_usd: 0,
          };

          res.data.list.forEach((x) => {
            this.nakliyeTotal.ton += x.Ton;
            this.nakliyeTotal.total_tl += x.ToplamTl;
            this.nakliyeTotal.total_usd += x.ToplamDolar;
          });
        });
      this.$axios.get("/reports/mekmer/nakliye/firma/list").then((res) => {
        this.nakliyeFirmaList = res.data.list;
      });
      this.$axios.get("/reports/mekmer/nakliye/kimden/list").then((res) => {
        this.nakliyeKimdenList = res.data.list;
      });
    },
    async processNakliye() {
      if (this.new_button_status_nakliye) {
        if (!this.modelNakliye.price_tl) {
          alert("Lütfen fiyat (₺) alanını doldurunuz.");
          return;
        }
        if (!this.modelNakliye.ton) {
          alert("Lütfen ton alanını doldurunuz.");
          return;
        }
        this.nakliye_save_button_loading = true;

        await this.calculateNakliyeUsdTl();
        await this.$axios
          .post("/reports/mekmer/nakliye/save", this.modelNakliye)
          .then((res) => {
            if (res.data.status) {
              this.nakliye_save_button_loading = false;
              this.$toast.success("Kayıt Başarılı.");

              this.nakliyeReset();
            } else {
              this.$toast.error("Kayıt Başarısız.");
            }
          });
      } else {
        this.nakliye_save_button_loading = true;

        await this.calculateNakliyeUsdTl();
        await this.$axios
          .put("/reports/mekmer/nakliye/update", this.modelNakliye)
          .then((res) => {
            if (res.data.status) {
              this.nakliye_save_button_loading = false;
              this.$toast.success("Güncelleme Başarılı.");
              this.nakliyeCalculate();
            } else {
              this.$toast.error("Güncelleme Başarısız.");
            }
          });
      }
    },
    nakliyeReset() {
      this.modelNakliye = {
        id: null,
        date: null,
        plate_no: "",
        document_no: "",
        invoice_no: "",
        company_name: "",
        company_id: "",
        supplier_name: "",
        supplier_id: "",
        ton: 0,
        price_tl: 0,
        price_usd: 0,
        total_tl: 0,
        total_usd: 0,
        currency: 0,
      };
      this.selectedNakliyeFirma = null;
      this.selectedNakliyeKimden = null;
      this.nakliyeCalculate();
    },
    supllierInputKimden(event) {
      this.modelNakliye.supplier_id = null;
      this.modelNakliye.supplier_name = event;
    },
    nakliyeSelectedKimden(event) {
      this.modelNakliye.supplier_id = event.value.ID;
      this.modelNakliye.supplier_name = event.value.KimdenAdi;
    },
    searchNakliyeKimden(event) {
      let results;
      if (event.query.length == 0) {
        results = this.nakliyeKimdenList;
      } else {
        results = this.nakliyeKimdenList
          .filter((x) => {
            return x.KimdenAdi.toUpperCase().startsWith(
              event.query.toUpperCase()
            );
          })
          .slice(0, 15);
      }
      this.filteredNakliyeKimden = results;
    },
    /*Firma */
    searchNakliyeFirma(event) {
      let results;
      if (event.query.length == 0) {
        results = this.nakliyeFirmaList;
      } else {
        results = this.nakliyeFirmaList
          .filter((x) => {
            return x.FirmaAdi.toUpperCase().startsWith(
              event.query.toUpperCase()
            );
          })
          .slice(0, 15);
      }
      this.filteredNakliyeFirma = results;
    },
    nakliyeSelectedFirma(event) {
      this.modelNakliye.company_id = event.value.ID;
      this.modelNakliye.company_name = event.value.FirmaAdi;
    },
    supplierInputFirma(event) {
      this.modelNakliye.company_id = null;
      this.modelNakliye.company_name = event;
    },

    rateFetchedNakliye(event) {
      this.modelNakliye.currency = event.rate;
    },
    dateNakliyeSelected(event) {
      this.modelNakliye.date = date.dateToString(event);
    },
    excel_strip_output_nakliye() {
      this.$excelApi
        .post("/reports/mekmer/nakliye/excel", this.nakliyeList)
        .then((res) => {
          if (res.status) {
            const link = document.createElement("a");
            link.href = this.getLocalUrl + "reports/mekmer/nakliye/excel";
            link.setAttribute("download", "reports_mekmer_nakliye.xlsx");
            document.body.appendChild(link);
            link.click();
          }
        });
    },
    newFormNakliye() {
      this.nakliyeReset();
      this.new_button_status_nakliye = true;
      this.nakliye_dialog_header = "Yeni Nakliye";
      this.nakliye_dialog_visible = true;
    },
    molozFiltered(event) {
      this.__molozSumTotal(event.filteredValue);
    },
    stripsFiltered(event) {
      this.totalStrips(event.filteredValue);
    },
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

      this.$excelApi
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
      this.$excelApi
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
      this.$excelApi
        .post("/reports/mekmer/strips/excel", this.list)
        .then((res) => {
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
      this.model.irsaliye_no = event.data.DocumentNo;
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
      if (isNaN(this.model.stripPiece) || !isFinite(this.model.stripPiece)) {
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

      this.nakliyeCalculate();
    },
    searchSupplier(event) {
      let results;
      if (event.query.length == 0) {
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
      if (event.query.length == 0) {
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
      if (event.query.length == 0) {
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
      this.model.stripName = event.value.Strips;
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
      return this._nullControl(name);
    },
    _getQuarryName(_id) {
      let name = this.quarries.find((x) => {
        return x.ID == _id;
      }).OcakAdi;
      return this._nullControl(name);
    },
    _getStripName(_id) {
      let name = this.strips.find((x) => {
        return x.ID == _id;
      }).Strips;
      return this._nullControl(name);
    },
    _nullControl(_value) {
      if (_value == null || _value == "null" || _value == undefined) {
        return "";
      } else {
        return _value;
      }
    },
  },
  watch: {},
};
</script>
