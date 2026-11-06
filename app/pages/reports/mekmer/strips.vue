<template>
  <div class="row mt-4 m-auto ml-2 mr-2">
    <div class="row m-auto text-center">
      <div class="col-sm-3">
        <Button
          severity="success" class="w-100 mb-5"
          type="button"
          label="Yeni Strip"
          @click="newForm"
        />
      </div>
      <div class="col-sm-1">
        <Button
          severity="info" class="mb-5 pi pi-file-excel"
          type="button"
          @click="excel_strip_output"
        />
      </div>
      <div class="col-sm-3">
        <Button
          severity="success" class="w-100 mb-5"
          type="button"
          label="Yeni Moloz"
          @click="newFormMoloz"
        />
      </div>
      <div class="col-sm-1">
        <Button
          severity="info" class="pi pi-file-excel mb-5"
          type="button"
          @click="excel_strip_output_moloz"
        />
      </div>
      <div class="col-sm-3">
        <Button
          severity="success" class="w-100 mb-5"
          type="button"
          label="Yeni Nakliye"
          @click="newFormNakliye"
        />
      </div>
      <div class="col-sm-1">
        <Button
          severity="info" class="pi pi-file-excel mb-5"
          type="button"
          @click="excel_strip_output_nakliye"
        />
      </div>
    </div>
    <div class="col-sm-6">
      <FloatLabel>
        <Select
          class="w-100"
          id="year"
          v-model="selectedYear"
          :options="years"
          optionLabel="year"
          @change="yearSelected($event)"
        />
        <label for="year">Year</label>
      </FloatLabel>
    </div>
    <div class="col-sm-6">
      <FloatLabel>
        <Select
          class="w-100"
          id="month"
          v-model="selectedMonth"
          :options="months"
          optionLabel="month_name"
          @change="monthSelected($event)"
        />
        <label for="month">Month</label>
      </FloatLabel>
    </div>
    <div class="row m-auto text-center">
      <div class="col-4">
        <DataTable
          :value="list"
          class="p-datatable-sm table-scroll-x"
          :resizableColumns="true"
          columnResizeMode="fit"
          showGridlines
          v-model:selection="selectedStripData"
          selectionMode="single"
          @row-click="stripDataSelected($event)"
          v-model:filters="filteredStrips"
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
              {{ dateToString(slotProps.data.Date) }}
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
              {{ formatDecimal(slotProps.data.StripM2) }}
            </template>
            <template #footer>
              {{ formatDecimal(total.m2) }}
            </template>
          </Column>
          <Column field="StripPrice" header="Strip (₺)">
            <template #body="slotProps">
              {{ formatPriceTl(slotProps.data.StripPrice) }}
            </template>
          </Column>
          <Column field="StripCost" header="Strip Toplam (₺)">
            <template #body="slotProps">
              {{ formatPriceTl(slotProps.data.StripCost) }}
            </template>
            <template #footer>
              {{ formatPriceTl(total.cost) }}
            </template>
          </Column>
          <Column field="StripCostUsd" header="Strip Toplam ($)">
            <template #body="slotProps">
              {{ formatPriceUsd(slotProps.data.StripCostUsd) }}
            </template>
            <template #footer>
              {{ formatPriceUsd(total.costUsd) }}
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
          class="p-datatable-sm table-scroll-x"
          :resizableColumns="true"
          columnResizeMode="fit"
          showGridlines
          v-model:selection="selectedMolozData"
          selectionMode="single"
          @row-click="molozDatatableSelected($event)"
          v-model:filters="filteredMoloz"
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
              {{ dateToString(slotProps.data.Date) }}
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
              {{ formatDecimal(slotProps.data.Ton) }}
            </template>
            <template #footer>
              {{ formatDecimal(total_moloz.ton) }}
            </template>
          </Column>
          <Column field="PriceTl" header="Fiyat (TL)">
            <template #body="slotProps">
              {{ formatPriceTl(slotProps.data.PriceTl) }}
            </template>
          </Column>
          <Column field="PriceUsd" header="Fiyat ($)">
            <template #body="slotProps">
              {{ formatPriceUsd(slotProps.data.PriceUsd) }}
            </template>
          </Column>
          <Column field="Currency" header="Kur">
            <template #body="slotProps">
              {{ formatPriceUsd(slotProps.data.Currency) }}
            </template>
          </Column>
          <Column field="Total" header="Toplam (₺)">
            <template #body="slotProps">
              {{ formatPriceTl(slotProps.data.Total) }}
            </template>
            <template #footer>
              {{ formatPriceTl(total_moloz.total) }}
            </template>
          </Column>
          <Column field="Total" header="Toplam ($)">
            <template #body="slotProps">
              {{ formatPriceUsd(slotProps.data.TotalUsd) }}
            </template>
            <template #footer>
              {{ formatPriceUsd(total_moloz.total_usd) }}
            </template>
          </Column>
        </DataTable>
      </div>
      <div class="col-4">
        <DataTable
          :value="nakliyeList"
          class="p-datatable-sm table-scroll-x"
          :resizableColumns="true"
          columnResizeMode="fit"
          showGridlines
          v-model:selection="selectedNakliye"
          selectionMode="single"
          @row-click="nakliyeDatatableSelected($event)"
          v-model:filters="filteredNakliye"
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
              {{ dateToString(slotProps.data.Tarih) }}
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
              {{ formatDecimal(slotProps.data.Ton) }}
            </template>
            <template #footer>
              {{ formatDecimal(nakliyeTotal.ton) }}
            </template>
          </Column>
          <Column field="BirimFiyatTL" header="Fiyat (TL)">
            <template #body="slotProps">
              {{ formatPriceTl(slotProps.data.BirimFiyatTL) }}
            </template>
          </Column>
          <Column field="BirimFiyatDolar" header="Fiyat ($)">
            <template #body="slotProps">
              {{ formatPriceUsd(slotProps.data.BirimFiyatDolar) }}
            </template>
          </Column>
          <Column field="Currency" header="Kur">
            <template #body="slotProps">
              {{ formatPriceUsd(slotProps.data.Kur) }}
            </template>
          </Column>
          <Column field="ToplamTl" header="Toplam (₺)">
            <template #body="slotProps">
              {{ formatPriceTl(slotProps.data.ToplamTl) }}
            </template>
            <template #footer>
              {{ formatPriceTl(nakliyeTotal.total_tl) }}
            </template>
          </Column>
          <Column field="ToplamDolar" header="Toplam ($)">
            <template #body="slotProps">
              {{ formatPriceUsd(slotProps.data.ToplamDolar) }}
            </template>
            <template #footer>
              {{ formatPriceUsd(nakliyeTotal.total_usd) }}
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
    <Dialog
      :header="dialog_header"
      v-model:visible="cost_supplier_dialog"
      modal
      style="width: 100%"
    >
      <div class="row mt-5">
        <div class="col-4">
          <TcmbCurrency
            @dateSelectedEmit="dateSelected($event)"
            @rateFetchedEmit="rateFetched($event)"
          />
          <!-- <DatePicker
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
              <FloatLabel>
                <AutoComplete
                  id="supplier"
                  v-model="selectedSupplier"
                  :suggestions="filteredSupplier"
                  @complete="searchSupplier($event)"
                  optionLabel="FirmaAdi"
                  @item-select="supplierSelected($event)"
                  @input="supplierInput($event)"
                  :disabled="!model.currency"
                />
                <label for="supplier">Tedarikçi</label>
              </FloatLabel>
            </div>
            <div class="col-3">
              <FloatLabel>
                <AutoComplete
                  :disabled="!model.currency"
                  id="quarry"
                  v-model="selectedQuarry"
                  :suggestions="filteredQuarry"
                  @complete="searchQuarry($event)"
                  optionLabel="OcakAdi"
                  @item-select="quarrySelected($event)"
                  @input="quarryInput($event)"
                />
                <label for="quarry">Ocaklar</label>
              </FloatLabel>
            </div>
            <div class="col-3">
              <FloatLabel>
                <AutoComplete
                  :disabled="!model.currency"
                  id="strip"
                  v-model="selectedStrip"
                  :suggestions="filteredStrip"
                  @complete="searchStrip($event)"
                  optionLabel="Strips"
                  @item-select="stripSelected($event)"
                  @input="stripInput($event)"
                />
                <label for="strip">Stripler</label>
              </FloatLabel>
            </div>
            <div class="col-3">
              <FloatLabel>
                <FloatLabel>
                  <InputText
                    id="irsaliye"
                    type="text"
                    v-model="model.irsaliye_no"
                    :disabled="!model.currency"
                  />
                  <label for="irsaliye">İrsaliye</label>
                </FloatLabel>
              </FloatLabel>
            </div>
            <div class="col-3">
              <FloatLabel>
                <InputText
                  id="fatura"
                  type="text"
                  v-model="model.invoice"
                  :disabled="!model.currency"
                />
                <label for="fatura">Fatura No</label>
              </FloatLabel>
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
            severity="info" class="w-100"
            label="Hesapla"
            @click="calculate"
          />
        </div>
        <div class="col">
          <Button
            class="w-100"
            type="button"
            label="Kaydet"
            :disabled="button_disabled_2"
            @click="process"
          />
        </div>
        <div class="col" v-if="!new_button_status">
          <Button
            severity="danger" class="w-100"
            type="button"
            label="Sil"
            @click="deleteProcess"
          />
        </div>
      </div>
    </Dialog>
    <Dialog
      :header="dialog_header_moloz"
      v-model:visible="cost_supplier_dialog_moloz"
      modal
      style="width: 100%"
    >
      <!-- <Select
        class="mt-3"
        v-model="selectedCurrencyStatus"
        :options="currency_status"
        optionLabel="currency"
        placeholder="USD // TL"
        @change="molozPriceStatusSelected($event)"
      /> -->

      <div class="row mt-5">
        <div class="col-4">
          <TcmbCurrency
            @dateSelectedEmit="dateMolozSelected($event)"
            @rateFetchedEmit="rateFetchedMoloz($event)"
          />
        </div>
        <div class="col-8">
          <div class="row mt-5">
            <div class="col-4">
              <FloatLabel>
                <AutoComplete
                  id="supplier"
                  v-model="selectedSupplier"
                  :suggestions="filteredSupplier"
                  @complete="searchSupplier($event)"
                  optionLabel="FirmaAdi"
                  @item-select="supplierSelectedMoloz($event)"
                  @input="supplierInputMoloz($event)"
                  :disabled="!moloz_model.currency"
                />
                <label for="supplier">Tedarikçi</label>
              </FloatLabel>
            </div>
            <div class="col-4">
              <FloatLabel>
                <AutoComplete
                  :disabled="!moloz_model.currency"
                  id="quarry"
                  v-model="selectedQuarry"
                  :suggestions="filteredQuarry"
                  @complete="searchQuarry($event)"
                  optionLabel="OcakAdi"
                  @item-select="quarrySelectedMoloz($event)"
                  @input="quarryInputMoloz($event)"
                />
                <label for="quarry">Ocaklar</label>
              </FloatLabel>
            </div>
            <div class="col-4">
              <FloatLabel>
                <AutoComplete
                  :disabled="!moloz_model.currency"
                  id="strip"
                  v-model="selectedStrip"
                  :suggestions="filteredStrip"
                  @complete="searchStrip($event)"
                  optionLabel="Strips"
                  @item-select="stripSelectedMoloz($event)"
                  @input="stripInputMoloz($event)"
                />
                <label for="strip">Ürün Adı</label>
              </FloatLabel>
            </div>
          </div>
          <div class="row mt-5">
            <div class="col-4">
              <FloatLabel>
                <InputText
                  id="fatura_no"
                  v-model="moloz_model.fatura_no"
                  :disabled="!moloz_model.currency"
                />
                <label for="fatura_no">Fatura No</label>
              </FloatLabel>
            </div>
            <div class="col-4">
              <FloatLabel>
                <InputText
                  id="irsaliye_no"
                  v-model="moloz_model.irsaliye_no"
                  :disabled="!moloz_model.currency"
                />
                <label for="irsaliye_no">İrsaliye No</label>
              </FloatLabel>
            </div>
          </div>
          <div class="row mt-5">
            <div class="col">
              <FloatLabel>
                <InputNumber
                  v-model="moloz_model.ton"
                  mode="decimal"
                  :minFractionDigits="2"
                  :maxFracionDigits="2"
                  @input="molozTonInput($event)"
                  :disabled="!moloz_model.currency"
                />
                <label for="username">Ton</label>
              </FloatLabel>
            </div>
            <div class="col">
              <FloatLabel>
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
              </FloatLabel>
            </div>
            <div class="col">
              <FloatLabel>
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
              </FloatLabel>
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
            class="w-100"
            type="button"
            label="Kaydet"
            :disabled="!moloz_model.currency"
            @click="processMoloz"
          />
        </div>
        <div class="col" v-if="!new_button_status_moloz">
          <Button
            severity="danger" class="w-100"
            type="button"
            label="Sil"
            @click="deleteProcessMoloz"
          />
        </div>
      </div>
    </Dialog>
    <Dialog
      v-model:visible="nakliye_dialog_visible"
      :header="nakliye_dialog_header"
      modal
    >
      <div class="row mt-1" style="height: 400px">
        <div class="col-3">
          <TcmbCurrency
            @dateSelectedEmit="dateNakliyeSelected($event)"
            @rateFetchedEmit="rateFetchedNakliye($event)"
          />
        </div>
        <div class="col-9">
          <div class="row gap-1">
            <div class="col-3">
              <FloatLabel>
                <InputText
                  class="w-100"
                  id="plate_no"
                  v-model="modelNakliye.plate_no"
                  :disabled="!modelNakliye.currency"
                />
                <label for="plate_no">Plaka No</label>
              </FloatLabel>
            </div>
            <div class="col-3">
              <FloatLabel>
                <InputText
                  class="w-100"
                  id="document_no"
                  v-model="modelNakliye.document_no"
                  :disabled="!modelNakliye.currency"
                />
                <label for="document_no">İrsaliye No</label>
              </FloatLabel>
            </div>
            <div class="col-3">
              <FloatLabel>
                <InputText
                  class="w-100"
                  id="invoice_no"
                  v-model="modelNakliye.invoice_no"
                  :disabled="!modelNakliye.currency"
                />
                <label for="invoice_no">Fatura No</label>
              </FloatLabel>
            </div>
            <div class="col-3">
              <FloatLabel>
                <AutoComplete
                  id="supplier"
                  v-model="selectedNakliyeFirma"
                  :suggestions="filteredNakliyeFirma"
                  @complete="searchNakliyeFirma($event)"
                  optionLabel="FirmaAdi"
                  @item-select="nakliyeSelectedFirma($event)"
                  @input="supplierInputFirma($event)"
                  :disabled="!modelNakliye.currency"
                />
                <label for="supplier">Firma</label>
              </FloatLabel>
            </div>
            <div class="col-3">
              <FloatLabel>
                <AutoComplete
                  id="supplier"
                  v-model="selectedNakliyeKimden"
                  :suggestions="filteredNakliyeKimden"
                  @complete="searchNakliyeKimden($event)"
                  optionLabel="KimdenAdi"
                  @item-select="nakliyeSelectedKimden($event)"
                  @input="supllierInputKimden($event)"
                  :disabled="!modelNakliye.currency"
                />
                <label for="supplier">Kimden</label>
              </FloatLabel>
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
                severity="secondary" class="w-100"
                type="button"
                label="Hesapla"
                @click="calculateNakliyeUsdTl"
                :disabled="!modelNakliye.currency"
              />
            </div>
            <div :class="new_button_status_nakliye ? 'col-6' : 'col-4'">
              <Button
                class="w-100"
                :severity="new_button_status_nakliye ? 'success' : 'warn'"
                type="button"
                :label="new_button_status_nakliye ? 'Kaydet' : 'Güncelle'"
                :disabled="!modelNakliye.currency"
                @click="processNakliye"
                :loading="nakliye_save_button_loading"
              />
            </div>
            <div class="col-4" v-if="!new_button_status_nakliye">
              <Button
                severity="danger" class="w-100"
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
import { useSharedStore } from "~/stores/shared"
import { toIsoDate, fromIsoDate } from "~/utils/dates"
import { FilterMatchMode } from "@primevue/core/api";

export default {
  computed: {
    sharedStore() {
      return useSharedStore()
    },
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
  mounted() {
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

    this.sharedStore.beginLoading();

    useLegacyApi()
      .get(
        `/reports/mekmer/quarries/supplier/${this.selectedYear.year}/${this.selectedMonth.month_id}`
      )
      .then((res) => {
        this.suppliers = res.data.suppliers;
        this.list = res.data.list;
        this.strips = res.data.strips;
        this.quarries = res.data.quarries;
        this.totalStrips(res.data.list);
        useLegacyApi()
          .get(
            `/reports/mekmer/moloz/list/${this.selectedYear.year}/${this.selectedMonth.month_id}`
          )
          .then((res) => {
            this.moloz_list = res.data.list;
            this.suppliers = res.data.suppliers;
            this.strips = res.data.strips;
            this.quarries = res.data.quarries;
            this.__molozSumTotal(res.data.list);
            this.sharedStore.endLoading();
          });
      })
      .catch((err) => {
        console.error("strips raporu istegi basarisiz:", err);
        /* endLoading EKLENDI: hata dalinda sayac dusmuyordu, yukleme
           katmani tum tiklamalari yakaladigi icin ekran kilitli kaliyordu. */
        this.sharedStore.endLoading();
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
      // if (!this.modelNakliye.currency) {
      //   alert("Lütfen önce kuru seçiniz.");
      //   return;
      // }
      // if (!this.modelNakliye.ton || !this.modelNakliye.price_tl) {
      //   alert("Lütfen ton ve fiyat (₺) alanlarını doldurunuz.");
      //   return;
      // }
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
      useLegacyApi()
        .get(`/reports/mekmer/nakliye/deleted/${this.modelNakliye.id}`)
        .then((res) => {
          if (res.data.status) {
            this.nakliye_delete_button_loading = false;
            this.nakliye_dialog_visible = false;
            useAppToast().success("Silme Başarılı.");
            this.nakliyeReset();
          } else {
            useAppToast().error("Silme Başarısız.");
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
      await useLegacyApi()
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
      useLegacyApi().get("/reports/mekmer/nakliye/firma/list").then((res) => {
        this.nakliyeFirmaList = res.data.list;
      });
      useLegacyApi().get("/reports/mekmer/nakliye/kimden/list").then((res) => {
        this.nakliyeKimdenList = res.data.list;
      });
    },
    async processNakliye() {
      if (this.new_button_status_nakliye) {
        this.nakliye_save_button_loading = true;

        // await this.calculateNakliyeUsdTl();
        await useLegacyApi()
          .post("/reports/mekmer/nakliye/save", this.modelNakliye)
          .then((res) => {
            if (res.data.status) {
              this.nakliye_save_button_loading = false;
              useAppToast().success("Kayıt Başarılı.");

              this.nakliyeReset();
            } else {
              useAppToast().error("Kayıt Başarısız.");
            }
          });
      } else {
        this.nakliye_save_button_loading = true;

        await this.calculateNakliyeUsdTl();
        await useLegacyApi()
          .put("/reports/mekmer/nakliye/update", this.modelNakliye)
          .then((res) => {
            if (res.data.status) {
              this.nakliye_save_button_loading = false;
              useAppToast().success("Güncelleme Başarılı.");
              this.nakliyeCalculate();
            } else {
              useAppToast().error("Güncelleme Başarısız.");
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
      this.modelNakliye.date = toIsoDate(event);
    },
    /*
     * ARTIK EXCEL SUNUCUSUNDAN DEGIL, NITRO'DAN:
     *   eski: POST + GET {excelServerBase}/reports/mekmer/nakliye/excel
     *   yeni: POST /excel-api/mekmer/nakliye   (tek istek)
     *         server/routes/excel-api/mekmer/nakliye.post.ts
     *
     * Cikti uretimdekiyle ornek veriyle KARSILASTIRILDI: deger, sayi
     * bicimi, hucre stili, sutun genisligi ve birlestirme farki 0.
     *
     * `if (res.status)` DUSTU: HTTP durumunu (daima 200) okuyordu,
     * govdedeki {"status": false}'u DEGIL -- uretim patlasa bile
     * indirme tetikleniyordu.
     */
    async excel_strip_output_nakliye() {
      try {
        await exportExcel("/excel-api/mekmer/nakliye", this.nakliyeList, "reports_mekmer_nakliye.xlsx");
      } catch (err) {
        console.error("nakliye excel ciktisi basarisiz:", err);
        useAppToast().error("Excel olusturulamadi.");
      }
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
      this.moloz_model.date = toIsoDate(event);
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
      this.selectedDate = fromIsoDate(event.data.Date);
      this.selectedSupplier = this.suppliers.find((x) => {
        return x.ID == event.data.Supplier;
      });
      this.selectedQuarry = this.quarries.find((x) => {
        return x.ID == event.data.Quarry;
      });
      this.selectedStrip = this.strips.find((x) => {
        return x.ID == event.data.Strip;
      });
      /*
       * [!] BASLIK ARTIK DIALOGU ENGELLEYEMEZ.
       *
       * Yukaridaki uc `.find()` cagrisi ESLESME YOKSA undefined
       * donuyor -- kaydin Quarry/Strip id'si listede bulunmadiginda
       * (silinmis ocak/serit ya da liste henuz yuklenmemisken) olan
       * tam olarak bu. Eski kod bu durumda
       * `undefined.OcakAdi` uzerinde TypeError atiyor, metot orada
       * kesiliyor ve bir ALT SATIRDAKI
       * `cost_supplier_dialog_moloz = true` HIC calismiyordu:
       * kullanici satira tikliyor, hicbir sey olmuyordu.
       *
       * Baslik yalnizca GORSEL bir bilgi; dialogun acilmasini
       * engellememeli. Eksik parcalar artik bosluk olarak geciyor ve
       * ikisi de yoksa baslik bos kaliyor.
       */
      this.dialog_header_moloz = [
        this.selectedQuarry?.OcakAdi,
        this.selectedStrip?.Strips,
      ]
        .filter(Boolean)
        .join(" - ");

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
      this.sharedStore.beginLoading();

      useLegacyApi()
        .put("/reports/mekmer/moloz/update", this.moloz_model)
        .then((res) => {
          if (res.status) {
            this.__created();

            useAppToast().success("Güncelleme Başarılı.");
          } else {
            useAppToast().error("Güncelleme Başarısız.");
          }
        })
        .catch((err) => {
          console.error("updateMoloz basarisiz:", err);
          useAppToast().error("Güncelleme Başarısız.");
        })
        /* endLoading `if (res.status)` ICINDEYDI: istek basarili ama
           status false donerse ya da istek patlarsa sayac dusmuyor,
           ekran kilitli kaliyordu. finally her uc yolda da kapatir. */
        .finally(() => {
          this.sharedStore.endLoading();
        });
    },
    saveMoloz() {
      useLegacyApi()
        .post("/reports/mekmer/moloz/save", this.moloz_model)
        .then((res) => {
          if (res.status) {
            this.__created();
            this.reset();
            this.new_button_status_moloz = true;
            useAppToast().success("Kayıt Başarılı.");
          } else {
            useAppToast().error("Kayıt Başarısız.");
          }
        });
    },
    deleteProcessMoloz() {
      useLegacyApi()
        .delete(`/reports/mekmer/moloz/delete/${this.moloz_model.id}`)
        .then((res) => {
          if (res.status) {
            useAppToast().success("Silme İşlemi Başarılı");
            this.__created();
            this.cost_supplier_dialog_moloz = false;
            this.reset();
          } else {
            useAppToast().error("Silme İşlemi Başarısız");
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
      this.moloz_model.date = toIsoDate(event);

      this.disabled_1 = false;

      /*
       * Kur artik EXCEL SUNUCUSUNDAN DEGIL, Nitro'dan geliyor:
       * server/routes/tcmb-api/usd/[kind]/[year]/[month]/[day].get.ts
       * (Python tarafindan kurtulma planinin 2. adimi).
       *
       * year/month/day hesabi KALKTI -- useTcmb() tarihi kendisi
       * parcaliyor; hafta sonu/tatil icin geriye yurume de sunucuda.
       *
       * DUZELTILDI -- .catch() YOKTU: Excel sunucusu ulasilamazsa
       * kullanici hicbir sey gormuyor ve kur ESKI degerinde kaliyordu;
       * sonra kaydederse YANLIS kurla kayit olusuyordu.
       */
      useTcmb()
        .getUSDRate(event, "banknote")
        .then(({ rate }) => {
          this.moloz_model.currency = parseFloat(rate);
        })
        .catch((err) => {
          console.error("kur alinamadi:", err);
          useAppToast().error("Döviz kuru alınamadı.");
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
    /*
     * ARTIK EXCEL SUNUCUSUNDAN DEGIL, NITRO'DAN:
     *   eski: POST + GET {excelServerBase}/reports/mekmer/moloz/excel
     *   yeni: POST /excel-api/mekmer/moloz   (tek istek)
     *         server/routes/excel-api/mekmer/moloz.post.ts
     *
     * Cikti uretimdekiyle ornek veriyle KARSILASTIRILDI: deger, sayi
     * bicimi, hucre stili, sutun genisligi ve birlestirme farki 0.
     *
     * `if (res.status)` DUSTU: HTTP durumunu (daima 200) okuyordu,
     * govdedeki {"status": false}'u DEGIL -- uretim patlasa bile
     * indirme tetikleniyordu.
     */
    async excel_strip_output_moloz() {
      try {
        await exportExcel("/excel-api/mekmer/moloz", this.moloz_list, "reports_mekmer_moloz.xlsx");
      } catch (err) {
        console.error("moloz excel ciktisi basarisiz:", err);
        useAppToast().error("Excel olusturulamadi.");
      }
    },
    deleteProcess() {
      useLegacyApi()
        .delete(
          `/reports/mekmer/quarries/supplier/strips/delete/${this.model.Id}`
        )
        .then((res) => {
          if (res.status) {
            this.cost_supplier_dialog = false;
            useAppToast().success("Başarıyla Silindi");
            this.__created();
          } else {
            useAppToast().error("Silme Başarısız");
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
    /*
     * ARTIK EXCEL SUNUCUSUNDAN DEGIL, NITRO'DAN:
     *   eski: POST + GET {excelServerBase}/reports/mekmer/strips/excel
     *   yeni: POST /excel-api/mekmer/strips   (tek istek)
     *         server/routes/excel-api/mekmer/strips.post.ts
     *
     * Cikti uretimdekiyle ornek veriyle KARSILASTIRILDI: deger, sayi
     * bicimi, hucre stili, sutun genisligi ve birlestirme farki 0.
     *
     * `if (res.status)` DUSTU: HTTP durumunu (daima 200) okuyordu,
     * govdedeki {"status": false}'u DEGIL -- uretim patlasa bile
     * indirme tetikleniyordu.
     */
    async excel_strip_output() {
      try {
        await exportExcel("/excel-api/mekmer/strips", this.list, "reports_mekmer_strips.xlsx");
      } catch (err) {
        console.error("strips excel ciktisi basarisiz:", err);
        useAppToast().error("Excel olusturulamadi.");
      }
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
      this.selectedDate = fromIsoDate(event.data.Date);
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
      this.model.date = toIsoDate(event);
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
      this.sharedStore.beginLoading();

      useLegacyApi()
        .get(
          `/reports/mekmer/quarries/supplier/${this.selectedYear.year}/${this.selectedMonth.month_id}`
        )
        .then((res) => {
          this.suppliers = res.data.suppliers;
          this.list = res.data.list;
          this.strips = res.data.strips;
          this.quarries = res.data.quarries;
          this.totalStrips(res.data.list);
          useLegacyApi()
            .get(
              `/reports/mekmer/moloz/list/${this.selectedYear.year}/${this.selectedMonth.month_id}`
            )
            .then((res) => {
              this.moloz_list = res.data.list;
              this.suppliers = res.data.suppliers;
              this.strips = res.data.strips;
              this.quarries = res.data.quarries;
              this.__molozSumTotal(res.data.list);
              this.sharedStore.endLoading();
            });
        })
        .catch((err) => {
          console.error("strips raporu istegi basarisiz:", err);
          /* endLoading EKLENDI -- gerekcesi __created disindaki ikizinde. */
          this.sharedStore.endLoading();
        });
    },
    yearSelected(event) {},
    monthSelected(event) {
      useLegacyApi()
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
          console.error("strips raporu istegi basarisiz:", err);
        });
      useLegacyApi()
        .get(
          `/reports/mekmer/moloz/list/${this.selectedYear.year}/${this.selectedMonth.month_id}`
        )
        .then((res) => {
          this.moloz_list = res.data.list;

          /*
           * =============================================================
           * [!] ARAMA LISTELERI DE BURADAN DOLDURULUYOR -- YARIS VARDI
           * =============================================================
           * Bu metot IKI ISTEGI PARALEL atiyor:
           *   - /quarries/supplier/...  -> suppliers, strips, quarries
           *   - /moloz/list/...         -> moloz_list
           * Ikisi birbirini BEKLEMIYOR. Moloz yaniti once gelirse (ya da
           * ustteki istek patlarsa -- .catch'i yalnizca log basiyor)
           * tabloda satirlar gorunuyor ama `strips`/`quarries` HALA BOS
           * oluyor.
           *
           * O anda bir moloz satirina tiklanirsa
           * molozDatatableSelected icindeki
           *   this.quarries.find(...) -> undefined
           * ve dialog basligi `undefined.OcakAdi` uzerinde TypeError
           * atiyordu; metot orada kesildigi icin dialog HIC ACILMIYORDU.
           *
           * Bu uc zaten ucunu de donduruyor (api/index.js:17324-17330) --
           * ic ice cagri yapan __created() de boyle yapiyor
           * (satir 1316-1319). Burada atlanmis.
           *
           * Basliktaki koruma da duruyor (orada ayrica aciklandi), ama
           * asil cozum listelerin BOS KALMAMASI: aksi halde dialog
           * acilsa bile ocak/serit secicileri bos gelirdi.
           */
          this.suppliers = res.data.suppliers;
          this.strips = res.data.strips;
          this.quarries = res.data.quarries;

          this.__molozSumTotal(res.data.list);
        })
        .catch((err) => {
          /* .catch() YOKTU -- istek patlayinca liste ONCEKI ayda kaliyordu. */
          console.error("moloz listesi alinamadi:", err);
          this.moloz_list = [];
          useAppToast().error("Moloz listesi alınamadı.");
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
      this.sharedStore.beginLoading();
      useLegacyApi()
        .post("/reports/mekmer/quarries/supplier/strips/save", this.model)
        .then((status) => {
          if (status) {
            useAppToast().success("Başarıyla Kaydedildi.");
            this.sharedStore.endLoading();
            this.__created();
            this.reset();
          }
        })
        .catch((err) => {
          useAppToast().error("Kaydetme başarısız...");
          this.sharedStore.endLoading();
        });
    },
    update() {
      useLegacyApi()
        .put("/reports/mekmer/quarries/supplier/strips/update", this.model)
        .then((res) => {
          if (res.status) {
            useAppToast().success("Başarıyla Güncellendi.");
            this.__created();
          } else {
            useAppToast().error("Güncelleme başarısız...");
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

<!--
  pages/reports/mekmer/strips.vue

  Uc alt modul tek dosyada: Seritler (strips), Moloz ve Nakliye. Her
  birinin kendi formu, tablosu, toplamlari ve Excel ciktisi var.
  2155 satir -- pilota tasinan en buyuk tek sayfa.

  TASIMA YOLU: bu dosya ELLE yeniden yazilmadi; projenin kendi
  codemod'lari uygulandi, sonra codemod'un "ELLE YAPILACAK" diye
  listeledigi maddeler tek tek kapatildi. Kaynak olarak mark0002
  deposunun codemod-vue3-prep dali kullanildi (filtreler ve .sync orada
  zaten cevrilmisti).

  CODEMOD'UN YAPTIKLARI (tools/codemods/vue2-to-vue3.mjs):
     1x  primevue/api -> @primevue/core/api   (alt paket v4'te kaldirildi)
     9x  :x + @update:x -> v-model:x
     1x  <Calendar> -> <DatePicker>
     3x  <Dropdown> -> <Select>
     8x  AutoComplete field -> optionLabel   (v4'te `field` kaldirildi;
         birakilsa oneri listesinde her satir "[object Object]" olurdu)
    11x  p-button-* -> severity
    21x  class="p-float-label" -> <FloatLabel>
         (codemod-float-label.mjs; v4'te SINIF kaldirildi, etiket input'un
         uzerine yuzmek yerine yanina dusuyordu)

  ELLE KAPATILANLAR:
  [x] 18x this.$axios -> useLegacyApi()
      NEDEN useApi() DEGIL: bu dosyada 35 adet `res.data.X` erisimi var.
      useApi() govdeyi dogrudan donduruyor, yani hepsinin `res.X` olmasi
      gerekirdi; birini kacirmak DERLEME HATASI VERMEZ, calisma aninda
      undefined uretir ve sessizce yanlis davranir. useLegacyApi() axios
      sozlesmesini (.data) birebir korudugu icin donusum mekanik kaldi.
      (Ayni gerekce: app/composables/useLegacyApi.ts basindaki not.)
      Yeni yazilan kod dogrudan useApi() kullanmali.
  [x] 18x this.$toast -> useAppToast()
  [x]  4x this.$excelApi -> useExcelApi()
  [x]  3x elle <a download> olusturma -> downloadFromExcelServer()
      Eski kod <a> ogesini DOM'dan HIC KALDIRMIYORDU (link.remove() yok);
      her Excel tiklamasi sayfaya olu bir <a> birakiyordu. Adresi de
      getLocalUrl ile elle birlestiriyordu.
  [x]  9x $store.dispatch("setBegin/EndLoadingAction")
         -> sharedStore.beginLoading() / endLoading()
      Vuex'teki loading modulu pilotta shared store'a tasindi ve artik
      BOOLEAN degil SAYAC (bkz. app/stores/shared.ts).
  [x] mapGetters(["getLocalUrl"]) -> computed sharedStore
      getLocalUrl'in tek kullanim yeri yukaridaki uc <a> blogaydi;
      downloadFromExcelServer adresi kendisi urettigi icin gerek kalmadi.
  [x] plugins/date -> ~/utils/dates:
         date.dateToString -> toIsoDate   (4 yer)
         date.stringToDate -> fromIsoDate (2 yer)
      DIKKAT: created() icinde `const date = new Date()` var ve import islemi
      GOLGELIYOR; o satirdaki date.getMonth() bu degisiklige dahil DEGIL.
      Ayrica utils/dates.ts'teki toIsoDate "2026-10-08" (API'ye yazma
      bicimi) uretir; sablondaki dateToString ise GOSTERIM icin
      "08-10-2026" verir -- ikisi ayni sey degil, bkz. o dosyanin basi.
  [x] 3x <currencyApi> -> <TcmbCurrency>
      Nuxt 2'de plugins/components.js ile `currencyApi` adiyla global
      kayitliydi. (codemod <CurrencyApi> onermisti; auto-import adi
      dosya yolundan geldigi icin dogrusu TcmbCurrency.)
  [x] 3x console.log("err", err) -> console.error(aciklamali)
  [x] created() -> mounted()
      created() SSR'da da calisir, icindeki async is beklenmez ve liste
      BOS serialize edilir; hydration onu devralir, created() bir daha
      calismadigi icin tablo bos kalir (bkz. commit 2afc877e3).
      mounted() sunucuda hic calismaz. Veri store'da degil bileşenin
      kendi data()'sinda durdugu icin useAsyncData'li kalip
      kullanilmadi -- ayni gerekce new-mekmer-finance.vue'da da yazili.

  INCELENDI, SORUN CIKMADI:
  - save() icinde bir beginLoading'e karsi IKI endLoading var; ikisi
    basari ve hata dallarinda, yani dogru. Ayrica pilotun endLoading'i
    0'in altina inmiyor (`if (this.loading > 0)`), dolayisiyla olasi bir
    fazla cagri spinner'i kilitlemez.

  DOKUNULMADI ama DIKKAT:
  - update() ve bazi silme metotlari yukleme sayacini HIC kullanmiyor;
    o islemler sirasinda spinner gorunmuyor. Nuxt 2'de de boyleydi.
  - Yazma uclari (POST/PUT/DELETE) pilotta 403 alir --
    server/middleware/0.readonly-guard.ts. Beklenen davranis.
  - EKRANDA GORULMEDI: bu sayfa uc alt modulden olustugu ve hepsi yazma
    islemi icerdigi icin gercek dogrulama ancak giris yapilip
    denendiginde olur.
-->
