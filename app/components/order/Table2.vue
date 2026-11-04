<template>
  <div>
    <div class="card">
      <DataTable
        :value="list"
        rowGroupMode="rowspan"
        :groupRowsBy="['YuklemeTarihi', 'SiparisNo', 'FirmaAdi', 'PI']"
        v-model:selection="selectedProduction"
        selectionMode="multiple"
        @row-click="$emit('production_selected_emit', $event.data)"
        class="p-datatable-sm"
        :paginator="true"
        :rows="25"
        style="font-size: 70%; border: 2px solid gray"
        filterDisplay="row"
        v-model:filters="filtersOrders"
        v-if="status == 'Shipped'"
        sortField="YuklemeTarihi"
        :sortOrder="-1"
        :rowClass="rowClass2"
        columnResizeMode="fit"
        showGridlines
        responsiveLayout="scroll"
      >
        <template #header>
          <div class="flex justify-content-between">
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText
                v-model="globalSearch"
                placeholder="Keyword Search"
                @keyup.enter="globalSearchFilter($event)"
                @input="globalSearchFilterInput($event)"
              />
            </span>
          </div>
        </template>
        <Column header="#" headerStyle="width:3rem;font-size:16px;">
          <template #body="slotProps">
            {{ slotProps.index + 1 }}
          </template>
        </Column>
        <Column
          field="YuklemeTarihi"
          header="Load Date"
          :showFilterMenu="false"
          :showClearButton="false"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ dateToString(slotProps.data.YuklemeTarihi) }}
          </template>
          <template #filter="{ filterModel }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @keyup.enter="filterApply('loaddate', filterModel.value)"
              @input="filterSet('loaddate', filterModel.value)"
              class="p-column-filter"
            />
          </template>
        </Column>
        <Column
          field="FirmaAdi"
          header="Customer"
          :showFilterMenu="false"
          :showClearButton="false"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #filter="{ filterModel }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @keyup.enter="filterApply('company', filterModel.value)"
              @input="filterSet('company', filterModel.value)"
              class="p-column-filter"
            />
          </template>
        </Column>
        <Column
          field="SiparisNo"
          header="Po"
          :showFilterMenu="false"
          :showClearButton="false"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #filter="{ filterModel }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @keyup.enter="filterApply('po', filterModel.value)"
              @input="filterSet('po', filterModel.value)"
              class="p-column-filter"
            />
          </template>
        </Column>
        <Column
          field="PI"
          header="PI"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            <div v-if="slotProps.data.EvrakDurum > 0">
              <a
                :href="
                  'https://file-service.mekmar.com/file/download/2/' +
                  slotProps.data.SiparisNo
                "
              >
                <i class="pi pi-download" />
              </a>
            </div>
            <div v-else>
              <a>
                <i class="pi pi-download" />
              </a>
            </div>
          </template>
        </Column>
        <Column
          field="UrunAdi"
          header="Product"
          :showFilterMenu="false"
          :showClearButton="false"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #filter="{ filterModel }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @keyup.enter="filterApply('product', filterModel.value)"
              @input="filterSet('product', filterModel.value)"
              class="p-column-filter"
            />
          </template>
        </Column>
        <Column
          field="UrunUretimAciklama"
          header="Details"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
        </Column>
        <Column
          field="En"
          header="Width"
          :showFilterMenu="false"
          :showClearButton="false"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #filter="{ filterModel }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @keyup.enter="filterApply('width', filterModel.value)"
              @input="filterSet('width', filterModel.value)"
              class="p-column-filter"
            />
          </template>
        </Column>

        <Column
          field="Boy"
          header="Height"
          :showFilterMenu="false"
          :showClearButton="false"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #filter="{ filterModel }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @keyup.enter="filterApply('height', filterModel.value)"
              @input="filterSet('height', filterModel.value)"
              class="p-column-filter"
            />
          </template>
        </Column>
        <Column
          field="Kenar"
          header="Thickness"
          :showFilterMenu="false"
          :showClearButton="false"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #filter="{ filterModel }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @keyup.enter="filterApply('edge', filterModel.value)"
              @input="filterSet('edge', filterModel.value)"
              class="p-column-filter"
            />
          </template>
        </Column>
        <Column
          field="UrunFirmaAdi"
          header="Supplier"
          :showFilterMenu="false"
          :showClearButton="false"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #filter="{ filterModel }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @keyup.enter="filterApply('supplier', filterModel.value)"
              @input="filterSet('supplier', filterModel.value)"
              class="p-column-filter"
            />
          </template>
        </Column>
        <Column
          field="Miktar"
          header="Amount"
          :showFilterMenu="false"
          :showClearButton="false"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ formatDecimal(slotProps.data.Miktar) }}
          </template>
          <template #filter="{ filterModel }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @keyup.enter="filterApply('amount', filterModel.value)"
              @input="filterSet('amount', filterModel.value)"
              class="p-column-filter"
            />
          </template>
          <template #footer>
            {{ formatDecimal(total.order) }}
          </template>
        </Column>
        <Column
          field="BirimAdi"
          header="Unit"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ slotProps.data.BirimAdi }}
          </template>
        </Column>
        <Column
          field="Ton"
          header="Ton"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ formatDecimal(slotProps.data.Ton) }}
          </template>
          <template #footer>
            {{ formatDecimal(total.ton) }}
          </template>
        </Column>
        <Column
          field="SatisFiyati"
          header="Price (Selling)"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ formatPriceUsd(slotProps.data.SatisFiyati) }}
          </template>
        </Column>
        <Column
          header="Total (Selling)"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ formatPriceUsd((slotProps.data.SatisFiyati * slotProps.data.Miktar)) }}
          </template>
          <template #footer>
            {{ formatDecimal(totals) }}
          </template>
        </Column>
        <Column
          field="AlisFiyati"
          header="Price (Puchase)"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ formatPriceUsd(slotProps.data.AlisFiyati) }}
          </template>
        </Column>
        <Column
          header="Total (Puchase)"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ formatPriceUsd((slotProps.data.AlisFiyati * slotProps.data.Miktar)) }}
          </template>
          <template #footer>
            {{ formatDecimal(totals) }}
          </template>
        </Column>
      </DataTable>

      <DataTable
        :value="list"
        rowGroupMode="rowspan"
        :groupRowsBy="['SiparisTarihi', 'SiparisNo', 'FirmaAdi', 'PI']"
        v-model:selection="selectedProduction"
        selectionMode="multiple"
        @row-click="$emit('production_selected_emit', $event.data)"
        class="p-datatable-sm table-fit-compact"
        filterDisplay="row"
        v-model:filters="filtersOrders"
        :rowClass="rowClass2"
        @filter="ordersFilter($event)"
        columnResizeMode="fit"
        showGridlines
        responsiveLayout="scroll"
        sortField="SiparisTarihi"
        :sortOrder="-1"
        v-else
      >
        <Column
          header="#"
          headerStyle="width:3rem"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ slotProps.index + 1 }}
          </template>
        </Column>
        <Column
          field="SiparisTarihi"
          header="Order Date"
          :showFilterMenu="false"
          :showClearButton="false"
          headerClass="tableHeader"
          bodyClass="tableBody"
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
          :showClearButton="false"
          headerClass="tableHeader"
          bodyClass="tableBody"
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
          :showClearButton="false"
          headerClass="tableHeader"
          bodyClass="tableBody"
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
          field="PI"
          header="PI"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            <div v-if="slotProps.data.EvrakDurum > 0">
              <a
                :href="
                  'https://file-service.mekmar.com/file/download/2/' +
                  slotProps.data.SiparisNo
                "
              >
                <i class="pi pi-download" />
              </a>
            </div>
            <div v-else>
              <a>
                <i class="pi pi-download" />
              </a>
            </div>
          </template>
        </Column>
        <Column
          field="UrunAdi"
          header="Product"
          :showFilterMenu="false"
          :showClearButton="false"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              class="p-column-filter"
            />
          </template>
          <template #body="slotProps">
            <div
              :style="{
                backgroundColor:
                  slotProps.data.AlisFiyati == null ||
                  slotProps.data.AlisFiyati == 0
                    ? '#81fca0'
                    : '',
              }"
            >
              {{ slotProps.data.UrunAdi }}
            </div>
          </template>
        </Column>
        <Column
          field="UrunUretimAciklama"
          header="Details"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
        </Column>
        <Column
          field="En"
          header="Width"
          :showFilterMenu="false"
          :showClearButton="false"
          headerClass="tableHeader"
          bodyClass="tableBody"
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
          field="Boy"
          header="Height"
          :showFilterMenu="false"
          :showClearButton="false"
          headerClass="tableHeader"
          bodyClass="tableBody"
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
          field="Kenar"
          header="Thickness"
          :showFilterMenu="false"
          :showClearButton="false"
          headerClass="tableHeader"
          bodyClass="tableBody"
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
          field="UrunFirmaAdi"
          header="Supplier"
          :showFilterMenu="false"
          :showClearButton="false"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            <div
              v-if="
                slotProps.data.TedarikciID == 1 ||
                slotProps.data.TedarikciID == 123
              "
            >
              {{ slotProps.data.UrunFirmaAdi }}
            </div>
            <div
              v-else-if="slotProps.data.TedarikciID == 32"
              style="background-color: #ffff05"
              :style="{ color: slotProps.data.Isf ? '' : 'red' }"
            >
              {{ slotProps.data.UrunFirmaAdi }}
            </div>
            <div v-else :style="{ color: slotProps.data.Isf ? '' : 'red' }">
              {{ slotProps.data.UrunFirmaAdi }}
            </div>
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
          field="Miktar"
          header="Amount"
          :showClearButton="false"
          :showFilterMenu="false"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ formatDecimal(slotProps.data.Miktar) }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              class="p-column-filter"
            />
          </template>
          <template #footer>
            {{ formatDecimal(total.order) }}
          </template>
        </Column>
        <Column
          field="BirimAdi"
          header="Unit"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
        </Column>
        <Column
          field="Uretim"
          header="Produced"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            <div
              v-if="
                __amountControl(slotProps.data.Uretim) ==
                __amountControl(slotProps.data.Miktar)
              "
              style="background-color: green; color: white"
            >
              {{ formatDecimal(slotProps.data.Uretim) }}
            </div>
            <div
              v-else-if="
                __amountControl(slotProps.data.Uretim) >
                __amountControl(slotProps.data.Miktar)
              "
              style="background-color: black; color: white"
            >
              {{ formatDecimal(slotProps.data.Uretim) }}
            </div>
            <div
              v-else-if="
                __amountControl(slotProps.data.Uretim) <
                __amountControl(slotProps.data.Miktar)
              "
              style="background-color: yellow; color: black"
            >
              {{ formatDecimal(slotProps.data.Uretim) }}
            </div>

            <div v-else>
              {{ formatDecimal(slotProps.data.Uretim) }}
            </div>
          </template>
          <template #footer>
            {{ formatDecimal(total.production) }}
          </template>
        </Column>
        <Column
          field="Kalan"
          header="Remainder"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            <div
              v-if="
                __amountControl(slotProps.data.Miktar) -
                  __amountControl(slotProps.data.Uretim) ==
                0
              "
              style="background-color: yellow; color: black"
            >
              {{ formatDecimal((__amountControl(slotProps.data.Miktar) -
                  __amountControl(slotProps.data.Uretim))) }}
            </div>
            <div
              v-else-if="
                __amountControl(slotProps.data.Miktar) -
                  __amountControl(slotProps.data.Uretim) >
                0
              "
              style="background-color: blue; color: white"
            >
              {{ formatDecimal((__amountControl(slotProps.data.Miktar) -
                  __amountControl(slotProps.data.Uretim))) }}
            </div>
            <div
              v-else-if="
                __amountControl(slotProps.data.Miktar) -
                  __amountControl(slotProps.data.Uretim) <
                0
              "
              style="background-color: black; color: white"
            >
              {{ formatDecimal((__amountControl(slotProps.data.Miktar) -
                  __amountControl(slotProps.data.Uretim))) }}
            </div>
          </template>
        </Column>
        <Column
          field="Ton"
          header="Ton"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ formatDecimal(slotProps.data.Ton) }}
          </template>
          <template #footer>
            {{ formatDecimal(total.ton) }}
          </template>
        </Column>
        <Column
          field="SatisFiyati"
          header="Price (Selling)"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ formatPriceUsd(slotProps.data.SatisFiyati) }}
          </template>
        </Column>
        <Column
          header="Total (Selling)"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ formatPriceUsd((slotProps.data.SatisFiyati * slotProps.data.Miktar)) }}
          </template>
          <template #footer>
            {{ formatPriceUsd(totals) }}
          </template>
        </Column>
        <Column
          field="AlisFiyati"
          header="Price (Puchase)"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ formatPriceUsd(slotProps.data.AlisFiyati) }}
          </template>
        </Column>
        <Column
          header="Total (Puchase)"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ formatPriceUsd((slotProps.data.AlisFiyati * slotProps.data.Miktar)) }}
          </template>
          <template #footer>
            {{ formatPriceUsd(totals) }}
          </template>
        </Column>
      </DataTable>
    </div>

    <DataTable
      :value="list"
      rowGroupMode="rowspan"
      :groupRowsBy="['YuklemeTarihi', 'SiparisNo', 'FirmaAdi', 'PI']"
      v-model:selection="selectedProduction"
      selectionMode="multiple"
      @row-click="$emit('production_selected_emit', $event.data)"
      class="p-datatable-sm"
      :paginator="true"
      :rows="25"
      style="font-size: 70%; border: 2px solid gray"
      filterDisplay="row"
      v-model:filters="filtersShipped"
      v-if="status == 'Shipped 2'"
      sortField="YuklemeTarihi"
      :sortOrder="-1"
      :rowClass="rowClass2"
      columnResizeMode="fit"
      showGridlines
      responsiveLayout="scroll"
      
    >
      <template #header>
        <div class="flex justify-content-between">
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              v-model="globalSearch"
              placeholder="Keyword Search"
              @keyup.enter="globalSearchFilter($event)"
              @input="globalSearchFilterInput($event)"
            />
          </span>
        </div>
      </template>
      <Column header="#" headerStyle="width:3rem;font-size:16px;">
        <template #body="slotProps">
          {{ slotProps.index + 1 }}
        </template>
      </Column>
      <Column
        field="YuklemeTarihi"
        header="Load Date"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ dateToString(slotProps.data.YuklemeTarihi) }}
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
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
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
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
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
        field="PI"
        header="PI"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          <div v-if="slotProps.data.EvrakDurum > 0">
            <a
              :href="
                'https://file-service.mekmar.com/file/download/2/' +
                slotProps.data.SiparisNo
              "
            >
              <i class="pi pi-download" />
            </a>
          </div>
          <div v-else>
            <a>
              <i class="pi pi-download" />
            </a>
          </div>
        </template>
      </Column>
      <Column
        field="UrunAdi"
        header="Product"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
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
        field="UrunUretimAciklama"
        header="Details"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
      </Column>
      <Column
        field="En"
        header="Width"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
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
        field="Boy"
        header="Height"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
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
        field="Kenar"
        header="Thickness"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
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
        field="UrunFirmaAdi"
        header="Supplier"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
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
        field="Miktar"
        header="Amount"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ formatDecimal(slotProps.data.Miktar) }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
        <template #footer>
          {{ formatDecimal(total.order) }}
        </template>
      </Column>
      <Column
        field="BirimAdi"
        header="Unit"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ slotProps.data.BirimAdi }}
        </template>
      </Column>
      <Column
        field="Ton"
        header="Ton"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ formatDecimal(slotProps.data.Ton) }}
        </template>
        <template #footer>
          {{ formatDecimal(total.ton) }}
        </template>
      </Column>
      <Column
        field="SatisFiyati"
        header="Price (Selling)"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ formatPriceUsd(slotProps.data.SatisFiyati) }}
        </template>
      </Column>
      <Column
        header="Total (Selling)"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ formatPriceUsd((slotProps.data.SatisFiyati * slotProps.data.Miktar)) }}
        </template>
        <template #footer>
          {{ formatPriceUsd(totals) }}
        </template>
      </Column>
      <Column
        field="AlisFiyati"
        header="Price (Puchase)"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ formatPriceUsd(slotProps.data.AlisFiyati) }}
        </template>
      </Column>
      <Column
        header="Total (Puchase)"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ formatPriceUsd((slotProps.data.AlisFiyati * slotProps.data.Miktar)) }}
        </template>
        <template #footer>
          {{ formatPriceUsd(totals) }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script>
import { useOrderStore } from "~/stores/order"
import { FilterMatchMode } from "@primevue/core/api";
export default {
  emits: ["production_selected_emit"],

  computed: {
    orderStore() {
      return useOrderStore()
    },
  },

  props: {
    list: {
      type: Array,
      required: false,
    },

    status: {
      type: String,
      required: true,
    },
    total: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      totals: 0,
      filtersShipped: {
        YuklemeTarihi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        FirmaAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        SiparisNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        UrunAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        En: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Boy: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Kenar: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        UrunFirmaAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Miktar: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      globalSearch: null,
      selectedProduction: null,
      filtersOrders: {
        SiparisTarihi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        YuklemeTarihi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        FirmaAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        SiparisNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        UrunAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        En: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Boy: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Kenar: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        UrunFirmaAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Miktar: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      filterModel: {
        loaddate: "",
        company: "",
        po: "",
        product: "",
        width: "",
        height: "",
        edge: "",
        supplier: "",
        amount: "",
      },
    };
  },
  created() {
    this.totals = 0;
    this.list.forEach((x) => {
      this.totals +=
        this.__noneControl(x.AlisFiyati) * this.__noneControl(x.Miktar);
    });
  },
  methods: {
    __amountControl(val) {
      if (
        val == 0 ||
        val == undefined ||
        val == "" ||
        val == " " ||
        val == null
      ) {
        return 0;
      } else {
        return +val.toFixed(2);
      }
    },
    __noneControl(val) {
      if (val == null || val == undefined || val == "") {
        return 0;
      } else {
        return val;
      }
    },
    ordersFilter(event) {
      this.orderStore.setOrderProductionTotal(event.filteredValue);
      this.totals = 0;
      event.filteredValue.forEach((x) => {
        this.totals +=
          this.__noneControl(x.AlisFiyati) * this.__noneControl(x.Miktar);
      });
    },
    /*
     * Siparis sahibinin veya operasyon sorumlusunun kendi satirlarini
     * isaretler (bkz. <style> icindeki .row-accessories).
     *
     * [x] Cookies.get("userId") (js-cookie) -> useCookie
     * Karsilastirma BILEREK == kaldi: cerez DIZE, SiparisSahibi SAYI
     * geliyor. === yapmak esitligi daima false yapar ve hicbir satir
     * isaretlenmez.
     */
    rowClass2(event) {
      const userId = useCookie("userId").value
      if (event.SiparisSahibi == userId || event.Operasyon == userId) {
        return "row-accessories"
      }
      return "row-accessories-border"
    },
    globalSearchFilterInput(event) {
      if (!event) {
        this.orderStore.setOrderShippedList();
      }
    },
    globalSearchFilter(event) {
      if (event.target._value) {
        this.orderStore.setFilterShipmentGlobal(event.target._value);
      } else {
        this.orderStore.setOrderShippedList();
      }
    },
    /*
     * BURADA 19 METOT VARDI.
     *
     * filterShipment<Alan>Input (9 tane) hepsi birebir ayniydi:
     *   `filterModel.<alan> = event || ""`
     * filterShipment<Alan> (9 tane) hepsi birebir ayniydi: alani yaz,
     *   sonra tum filtreler bos mu diye bak; bossa listeyi bastan cek,
     *   degilse sunucu tarafi filtreyi cagir.
     *
     * Tek fark filterShipmentProduct'ta: urun adini Basliga Cevirip
     * yaziyor. O ozel durum filterSet icinde korundu.
     *
     * Sablondaki cagrilar da birlikte degistirildi:
     *   @input="filterShipmentPoInput(filterModel.value)"
     *     -> @input="filterSet('po', filterModel.value)"
     *   @keyup.enter="filterShipmentPo(filterModel.value)"
     *     -> @keyup.enter="filterApply('po', filterModel.value)"
     */

    /* Yalnizca yerel filtre modelini gunceller (her tus vurusunda). */
    filterSet(field, value) {
      if (!value) {
        this.filterModel[field] = ""
        return
      }

      /*
       * Urun adi ozel: her kelimenin ilk harfi buyuk yazilir, cunku
       * sunucu tarafi filtre buyuk/kucuk harfe duyarli. Nuxt 2'deki
       * filterShipmentProduct mantigi birebir.
       */
      if (field === "product") {
        this.filterModel.product = String(value)
          .split(" ")
          .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
          .join(" ")
          .trim()
        return
      }

      this.filterModel[field] = value
    },

    /* Enter'a basildiginda filtreyi sunucuya gonderir. */
    filterApply(field, value) {
      this.filterSet(field, value)

      if (this.isFilterEmpty()) {
        this.orderStore.setOrderShippedList()
      } else {
        this.orderStore.filterShipment(this.filterModel)
      }
    },

    /*
     * Nuxt 2'deki __controlFilter(). Orada true veya UNDEFINED donuyordu
     * (else yok); burada duz boolean.
     */
    isFilterEmpty() {
      return Object.values(this.filterModel).every((v) => v === "")
    },

    /*
     * KALDIRILDI: productSupplier(event) ve productSupplierNull(event)
     *
     * Ikisi de document.getElementById("productSupplier" + UrunId) ile
     * bir ogeyi bulup innerHTML'ini degistiriyordu. Ne bu dosyanin
     * sablonunda boyle bir id var (0 eslesme), ne de metotlar hicbir
     * yerden cagriliyor -- cagrilsalardi getElementById null donecegi
     * icin "Cannot set properties of null" ile patlarlardi.
     * Ayni olu cift components/orders/lists/list.vue (-> order/Table.vue)
     * ve components/orders/lists/shipped.vue dosyalarinda da var.
     */
  },
};
</script>
<style scoped>
.colorChange {
  background-color: yellow;
}

:deep(.row-accessories) {
  border: 2px solid #414241 !important;
  background-color: #ccede2 !important;
}

:deep(.row-accessories-border) {
  border: 2px solid #313131 !important;
}
</style>

<!--
  components/orders/lists/list2.vue -> app/components/order/Table2.vue

  DOSYA ADI: Nuxt 2'de `orderList2` adiyla global kayitli. `OrderList2`
  PrimeVue ile cakismiyordu, yani teknik olarak zorunlu degildi; yine de
  kardesiyle tutarli olmasi icin OrderTable2 yapildi -- `OrderTable` ile
  `OrderList2` yan yana dururken ikisinin ayni isin iki varyanti oldugu
  gorunmuyor. Etiket eslemesi vue2-to-vue3.mjs'teki TAG_OVERRIDES'ta.

  NE FARKI VAR: list.vue ile %77 ayni. Fark: list2 iki DataTable
  tasiyor (v-if="status == 'Shipped'" ve v-else), list ise dort
  (masaustu/mobil ikizi + v-else + 'Shipped 2'). Ayrica list2'de
  filtre alani 9 (unit yok) ve fazladan bir __noneControl yardimcisi var.

  Mekanik donusumler (tools/codemods/vue2-to-vue3.mjs):
  [1] 1x  import ... "primevue/api" -> "@primevue/core/api"
  [2] 6x  :filters/:selection + @update:X -> v-model:X

  Store gecisi (tools/codemods/map-store-refs.mjs):
  [3] 22x  this.$store.dispatch(...) -> useOrderStore() action'lari
  [4] store computed'i EKLENDI -- bu dosyada mapGetters yoktu, yalnizca
      dispatch vardi; arac o durumda computed eklemezse `this.orderStore`
      tanimsiz kalir (derleme gecer, calisma aninda patlar).

  ELLE yapilanlar:
  [5] Cookies.get("userId") -> useCookie (karsilastirma == kaldi,
      gerekcesi rowClass2 ustunde)
  [6] emits: ["production_selected_emit"] bildirildi

  SADELESTIRILDI -- 19 metot 3'e indi (davranis ayni):
      filterShipment<Alan>Input  x9  -> filterSet(field, value)
      filterShipment<Alan>       x9  -> filterApply(field, value)
      __controlFilter                -> isFilterEmpty()
  Sablondaki 18 cagri yeri de birlikte guncellendi. Urun adini Basliga
  Cevirme ozel durumu korundu.

  KALDIRILDI -- OLU KOD:
      productSupplier() / productSupplierNull()
      Ikisi de document.getElementById("productSupplier" + UrunId)
      ariyordu; bu dosyada o id'ye sahip oge YOK (0 eslesme) ve metotlar
      hicbir yerden cagrilmiyor. Ayni olu cift order/Table.vue'dan da
      kaldirildi; components/orders/lists/shipped.vue'da hala var.

  KORUNDU: __amountControl ve __noneControl yardimcilari. Ikisi de
  sablondan cagriliyor (__amountControl 19, __noneControl 3 yer).
-->
