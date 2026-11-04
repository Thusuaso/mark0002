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
        class="p-datatable-sm customShipped"
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
        :loading="loading"
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
        <Column
          header="#"
          headerClass="col-rowno"
          filterHeaderClass="col-rowno"
          bodyClass="col-rowno"
        >
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
            {{ formatDecimal2(total.order) }}
          </template>
        </Column>
        <Column
          field="BirimAdi"
          header="Unit"
          headerClass="tableHeader"
          bodyClass="tableBody"
          :showFilterMenu="false"
          :showClearButton="false"
        >
          <template #body="slotProps">
            {{ slotProps.data.BirimAdi }}
          </template>
          <template #filter="{ filterModel }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @keyup.enter="filterApply('unit', filterModel.value)"
              @input="filterSet('unit', filterModel.value)"
              class="p-column-filter"
            />
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
            {{ formatDecimal2(total.ton) }}
          </template>
        </Column>
        <Column
          field="SatisFiyati"
          header="Price"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ formatPriceUsd(slotProps.data.SatisFiyati) }}
          </template>
        </Column>
        <Column
          field="SatisToplam"
          header="Total"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ formatPriceUsd(slotProps.data.SatisToplam) }}
          </template>
          <template #footer>
            {{ formatPriceUsd(total.price) }}
          </template>
        </Column>
      </DataTable>
      <DataTable
        :value="list"
        rowGroupMode="rowspan"
        :groupRowsBy="['YuklemeTarihi', 'SiparisNo', 'FirmaAdi', 'PI']"
        v-model:selection="selectedProduction"
        selectionMode="multiple"
        @row-click="$emit('production_selected_emit', $event.data)"
        class="p-datatable-sm customShipped2"
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
        :loading="loading"
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
              @blur="filterApply('loaddate', filterModel.value)"
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
              @blur="filterApply('company', filterModel.value)"
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
              @blur="filterApply('po', filterModel.value)"
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
              @blur="filterApply('product', filterModel.value)"
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
              @blur="filterApply('width', filterModel.value)"
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
              @blur="filterApply('height', filterModel.value)"
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
              @blur="filterApply('edge', filterModel.value)"
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
              @blur="filterApply('supplier', filterModel.value)"
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
              @blur="filterApply('amount', filterModel.value)"
            />
          </template>
          <template #footer>
            {{ formatDecimal2(total.order) }}
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
            {{ formatDecimal2(total.ton) }}
          </template>
        </Column>
        <Column
          field="SatisFiyati"
          header="Price"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ formatPriceUsd(slotProps.data.SatisFiyati) }}
          </template>
        </Column>
        <Column
          field="SatisToplam"
          header="Total"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ formatPriceUsd(slotProps.data.SatisToplam) }}
          </template>
          <template #footer>
            {{ formatPriceUsd(total.price) }}
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
        v-else
      >
        <Column
          header="#"
          headerClass="col-rowno"
          filterHeaderClass="col-rowno"
          bodyClass="col-rowno"
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
          style="width: 3%"
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
          style="width: 5%"
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
          style="width: 5%"
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
        <Column field="PI" header="PI" style="width: 5%">
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
          style="width: 5%"
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
        <Column field="UrunUretimAciklama" header="Details" style="width: 5%">
        </Column>
        <Column
          field="En"
          header="Width"
          :showFilterMenu="false"
          :showClearButton="false"
          style="width: 5%"
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
          style="width: 5%"
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
          style="width: 5%"
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
          style="width: 5%"
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
          style="width: 5%"
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
            {{ formatDecimal2(total.order) }}
          </template>
        </Column>
        <Column
          field="BirimAdi"
          header="Unit"
          style="width: 5%"
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
        <Column field="Uretim" header="Produced" style="width: 5%">
          <template #body="slotProps">
            <div
              v-if="
                (__amountControl(slotProps.data.Out) &&
                  __amountControl(slotProps.data.Uretim)) ==
                __amountControl(slotProps.data.Miktar)
              "
              style="background-color: blue; color: white"
            >
              {{ formatDecimal(slotProps.data.Uretim) }}
            </div>
            <div :style="slotProps.data.style" v-else>
              {{ formatDecimal(slotProps.data.Uretim) }}
            </div>
          </template>
          <template #footer>
            {{ formatDecimal2(total.production) }}
          </template>
        </Column>
        <Column field="Ton" header="Ton" style="width: 5%">
          <template #body="slotProps">
            {{ formatDecimal(slotProps.data.Ton) }}
          </template>
          <template #footer>
            {{ formatDecimal2(total.ton) }}
          </template>
        </Column>
        <Column field="SatisFiyati" header="Price" style="width: 5%">
          <template #body="slotProps">
            {{ formatPriceUsd(slotProps.data.SatisFiyati) }}
          </template>
        </Column>
        <Column field="SatisToplam" header="Total" style="width: 5%">
          <template #body="slotProps">
            {{ formatPriceUsd(slotProps.data.SatisToplam) }}
          </template>
          <template #footer>
            {{ formatPriceUsd(total.price) }}
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
      z
      sortField="YuklemeTarihi"
      :sortOrder="-1"
      :rowClass="rowClass2"
      columnResizeMode="fit"
      showGridlines
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
      <Column
        header="#"
        headerClass="col-rowno"
        filterHeaderClass="col-rowno"
        bodyClass="col-rowno"
      >
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
          {{ formatDecimal2(total.order) }}
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
          {{ formatDecimal2(total.ton) }}
        </template>
      </Column>
      <Column
        field="SatisFiyati"
        header="Price"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ formatPriceUsd(slotProps.data.SatisFiyati) }}
        </template>
      </Column>
      <Column
        field="SatisToplam"
        header="Total"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ formatPriceUsd(slotProps.data.SatisToplam) }}
        </template>
        <template #footer>
          {{ formatPriceUsd(total.price) }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script>
import { FilterMatchMode } from "@primevue/core/api"
import { useOrderStore } from "~/stores/order"

export default {
  emits: ["production_selected_emit"],

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
    loading: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    orderStore() {
      return useOrderStore()
    },
  },

  data() {
    return {
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
        BirimAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
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
        BirimAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
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
        unit: "",
      },
    };
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
        return parseFloat(val).toFixed(2);
      }
    },
    ordersFilter(event) {
      this.orderStore.setOrderProductionTotal(event.filteredValue)
    },
    /*
     * Siparis sahibinin veya operasyon sorumlusunun kendi satirlarini
     * yesil arka planla isaretler (bkz. <style> icindeki .row-accessories).
     *
     * [x] Cookies.get("userId") (js-cookie) -> useCookie
     * Karsilastirma == ile birakildi: cerez DIZE, SiparisSahibi SAYI
     * geliyor. === yapmak esitligi daima false yapar ve hicbir satir
     * isaretlenmez -- "renkler kayboldu" diye aranacak bir hata olurdu.
     */
    rowClass2(event) {
      const userId = useCookie("userId").value
      if (event.SiparisSahibi == userId || event.Operasyon == userId) {
        return "row-accessories"
      }
      return "row-accessories-border"
    },
    /*
     * ISLEVSIZ -- ama BILEREK duruyor.
     *
     * `event` burada her zaman bir DOM input olayi, yani `!event` ASLA
     * dogru olmuyor; bu metot Nuxt 2'de de hicbir sey yapmiyordu.
     * Niyet belli: arama kutusu temizlenince listeyi bastan cekmek.
     * Calisir hale getirmek (orn. `if (!this.globalSearch)`) bir DAVRANIS
     * DEGISIKLIGI olurdu -- kutuyu silmek simdi sunucuya yeni bir istek
     * atmaya baslardi. Bu yuzden gecis sirasinda dokunulmadi; ayrica
     * karar verilmeli.
     */
    globalSearchFilterInput(event) {
      if (!event) {
        this.orderStore.setOrderShippedList()
      }
    },

    /*
     * [x] event.target._value -> this.globalSearch
     * `_value`, Vue'nun v-model direktifinin DOM ogesine yazdigi IC bir
     * alan. Vue 3'te hala yaziliyor (runtime-dom patchDOMProp), yani
     * birebir tasinsa calisirdi -- ama cerceve icine uzanan bir okuma.
     * Kutu zaten v-model ile `globalSearch`e bagli; ayni deger, genel
     * API.
     */
    globalSearchFilter() {
      if (this.globalSearch) {
        this.orderStore.setFilterShipmentGlobal(this.globalSearch)
      } else {
        this.orderStore.setOrderShippedList()
      }
    },
    /*
     * BURADA 20 METOT VARDI.
     *
     * filterShipmentAmountInput / filterShipmentUnitInput / ... (10 tane)
     *   hepsi birebir ayniydi: `filterModel.<alan> = event || ""`
     * filterShipmentAmount / filterShipmentUnit / ... (10 tane)
     *   hepsi birebir ayniydi: alani yaz, sonra tum filtreler bos mu diye
     *   bak; bossa listeyi bastan cek, degilse sunucu tarafi filtreyi
     *   cagir.
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
     * sablonunda boyle bir id var, ne de metotlar HICBIR YERDEN
     * cagriliyor -- cagrilsalardi getElementById null donecegi icin
     * "Cannot set properties of null" ile patlarlardi.
     *
     * Ayni olu cift components/orders/lists/list2.vue ve
     * components/orders/lists/shipped.vue dosyalarina da kopyalanmis;
     * oralar tasinirken ayni sekilde dusurulebilir.
     */
  },
}
</script>
<style scoped>
.customShipped2 {
  display: none;
}
.customShipped {
  display: block;
}
@media screen and (max-width: 576px) {
  .customShipped2 {
    display: block;
  }
  .customShipped {
    display: none;
  }
}

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
  components/orders/lists/list.vue -> app/components/order/Table.vue

  DOSYA ADI NEDEN "Table" -- OLCULDU, VARSAYIM DEGIL:
  Nuxt 2'de bu bilesen `orderList` adiyla global kayitliydi. Ilk denemede
  order/List.vue yoluna konuldu ki auto-import adi <OrderList> olsun ve
  kullanan 5 sayfa degismesin. SONUC: sayfa acildi ama tablo YERINE bos
  bir PrimeVue bileseni render edildi --

      <div class="p-orderlist p-component" status="Production" loading="false">

  cunku PrimeVue 4'un de `OrderList` adli bir bileseni var ve
  @primevue/nuxt-module onu GLOBAL kaydediyor. Nuxt'un components.d.ts'i
  OrderList'i bu dosyaya baglamis olsa bile, calisma aninda global kayit
  kazaniyor. Etiketi PascalCase'e cevirmek de yetmedi.
  Hata vermiyor, uyari vermiyor: prop'lar attribute olarak dusuyor ve
  tablo sessizce yok oluyor.

  Bu yuzden ad OrderTable yapildi (PrimeVue'da karsiligi yok) ve
  tools/codemods/check-name-collisions.mjs yazildi -- artik her bilesen
  adi PrimeVue'nun 144 global adina karsi denetlenebiliyor.

  Mekanik donusumler tools/codemods/vue2-to-vue3.mjs ile yapildi
  (dogrulanabilir sayilar):
  [1] 1x  import ... "primevue/api" -> "@primevue/core/api"
  [2] 8x  :filters/:selection + @update:X -> v-model:X

  ELLE yapilanlar:
  [3] 24x this.$store.dispatch(...) -> useOrderStore() action'lari
      (setOrderProductionTotal, setOrderShippedList,
       setFilterShipmentGlobal, filterShipment)
  [4] Cookies.get("userId") -> useCookie. Karsilastirma BILEREK == kaldi;
      ayrinti rowClass2 ustundeki notta.
  [5] event.target._value -> this.globalSearch (ayrinti metot ustunde)
  [6] emits: ["production_selected_emit"] bildirildi.

  SADELESTIRILDI -- 20 metot 3'e indi (davranis ayni):
      filterShipment<Alan>Input  x10  -> filterSet(field, value)
      filterShipment<Alan>       x10  -> filterApply(field, value)
      __controlFilter                 -> isFilterEmpty()
  Sablondaki 47 cagri yeri de birlikte guncellendi (@input, @keyup.enter
  ve @blur bicimleri). Urun adini Basliga Cevirme ozel durumu korundu.

  KALDIRILDI -- OLU KOD:
      productSupplier() / productSupplierNull()  (ayrinti yerinde)

  DOKUNULMADI ama DIKKAT -- ikisi de Nuxt 2'den gelen tuhafliklar:

  A) DORT DataTable var ve v-if zinciri sasirtici:
       #1 v-if="status == 'Shipped'"    class="customShipped"
       #2 v-if="status == 'Shipped'"    class="customShipped2"
       #3 v-else                        (yani #2'nin else'i)
       #4 v-if="status == 'Shipped 2'"  (.card div'inin DISINDA)
     #1 ve #2 ayni kosulla render ediliyor -- bu KASITLI: <style> icinde
     customShipped2 varsayilan olarak display:none, <=576px'te tersi.
     Yani #1 masaustu, #2 mobil tablosu. Ikizler hata DEGIL.
     Ama #3 (#2'nin v-else'i) ile #4 ayni anda gorunur hale geliyor:
     status === "Shipped 2" oldugunda IKI tablo birden render ediliyor.
     Bu yalnizca pages/mekmer/products/shipped.vue'yu etkiliyor (tek
     'Shipped 2' cagri yeri); siparis ekranlarinin ucu 'Production' veya
     'Shipped' geciyor. Birebir korundu -- duzeltmek o sayfanin
     gorunumunu degistirir, ayrica karar verilmeli.

  B) "Produced" kolonundaki kosul:
       (__amountControl(Out) && __amountControl(Uretim)) == __amountControl(Miktar)
     && sayisal degil MANTIKSAL operator: Out sifirsa ifade `0 == Miktar`,
     degilse `Uretim == Miktar` oluyor. Muhtemelen `Out == Miktar &&
     Uretim == Miktar` yazilmak istenmis. Yalnizca mavi vurguyu
     etkiliyor; davranisi degistirmemek icin OLDUGU GIBI birakildi.
-->
