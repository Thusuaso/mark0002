<template>
  <div>
    <div>
      <DataTable
        :value="list"
        rowGroupMode="rowspan"
        :groupRowsBy="['SiparisTarihi', 'SiparisNo', 'FirmaAdi', 'PI']"
        :selection.sync="selectedProduction"
        selectionMode="multiple"
        @row-click="$emit('production_selected_emit', $event.data)"
        class="p-datatable-sm"
        :paginator="true"
        :rows="25"
        :loading="loading"
        style="font-size: 70%; border: 2px solid gray"
        filterDisplay="row"
        :filters.sync="filtersOrders"
        v-if="status == 'Shipped'"
        sortField="YuklemeTarihi"
        :sortOrder="-1"
        :rowClass="rowClass2"
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
            {{ slotProps.data.YuklemeTarihi | dateToString }}
          </template>
          <template #filter="{ filterModel }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @keyup.enter="filterShipmentLoadDate(filterModel.value)"
              @input="filterShipmentLoadDateInput(filterModel.value)"
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
              @keyup.enter="filterShipmentCompany(filterModel.value)"
              @input="filterShipmentCompanyInput(filterModel.value)"
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
              @keyup.enter="filterShipmentPo(filterModel.value)"
              @input="filterShipmentPoInput(filterModel.value)"
              class="p-column-filter"
            />
          </template>
        </Column>
        <Column field="PI" header="PI" headerClass="tableHeader" bodyClass="tableBody">
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
              @keyup.enter="filterShipmentProduct(filterModel.value)"
              @input="filterShipmentProductInput(filterModel.value)"
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
              @keyup.enter="filterShipmentWidth(filterModel.value)"
              @input="filterShipmentWidthInput(filterModel.value)"
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
              @keyup.enter="filterShipmentHeight(filterModel.value)"
              @input="filterShipmentHeightInput(filterModel.value)"
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
              @keyup.enter="filterShipmentEdge(filterModel.value)"
              @input="filterShipmentEdgeInput(filterModel.value)"
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
              @keyup.enter="filterShipmentSupplier(filterModel.value)"
              @input="filterShipmentSupplierInput(filterModel.value)"
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
            {{ slotProps.data.Miktar | formatDecimal }}
          </template>
          <template #filter="{ filterModel }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @keyup.enter="filterShipmentAmount(filterModel.value)"
              @input="filterShipmentAmountInput(filterModel.value)"
              class="p-column-filter"
            />
          </template>
          <template #footer>
            {{ total.order | formatDecimal }}
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
        <Column field="Ton" header="Ton" headerClass="tableHeader" bodyClass="tableBody">
          <template #body="slotProps">
            {{ slotProps.data.Ton | formatDecimal }}
          </template>
          <template #footer>
            {{ total.ton | formatDecimal }}
          </template>
        </Column>
        <Column
          field="SatisFiyati"
          header="Price"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ slotProps.data.SatisFiyati | formatPriceUsd }}
          </template>
        </Column>
        <Column
          field="SatisToplam"
          header="Total"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ slotProps.data.SatisToplam | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.price | formatPriceUsd }}
          </template>
        </Column>
      </DataTable>

      <DataTable
        :value="list"
        rowGroupMode="rowspan"
        :groupRowsBy="['SiparisTarihi', 'SiparisNo', 'FirmaAdi', 'PI']"
        :selection.sync="selectedProduction"
        selectionMode="multiple"
        @row-click="$emit('production_selected_emit', $event.data)"
        class="p-datatable-sm"
        :loading="loading"
        filterDisplay="row"
        :filters.sync="filtersOrders"
        :rowClass="rowClass2"
        @filter="ordersFilter($event)"
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
            {{ slotProps.data.SiparisTarihi | dateToString }}
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
        <Column field="PI" header="PI" headerClass="tableHeader" bodyClass="tableBody">
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
                  slotProps.data.AlisFiyati == null || slotProps.data.AlisFiyati == 0
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
            <div :style="{ backgroundColor: slotProps.data.Isf ? '' : 'red' }">
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
            {{ slotProps.data.Miktar | formatDecimal }}
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
            {{ total.order | formatDecimal }}
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
              v-if="slotProps.data.Uretim == slotProps.data.Miktar"
              style="background-color: green; color: white"
            >
              {{ slotProps.data.Uretim | formatDecimal }}
            </div>
            <div
              v-else-if="slotProps.data.Uretim > slotProps.data.Miktar"
              style="background-color: black; color: white"
            >
              {{ slotProps.data.Uretim | formatDecimal }}
            </div>
            <div
              v-else-if="slotProps.data.Uretim < slotProps.data.Miktar"
              style="background-color: yellow; color: black"
            >
              {{ slotProps.data.Uretim | formatDecimal }}
            </div>

            <div v-else>
              {{ slotProps.data.Uretim | formatDecimal }}
            </div>
          </template>
          <template #footer>
            {{ total.production | formatDecimal }}
          </template>
        </Column>
        <Column field="Ton" header="Ton" headerClass="tableHeader" bodyClass="tableBody">
          <template #body="slotProps">
            {{ slotProps.data.Ton | formatDecimal }}
          </template>
          <template #footer>
            {{ total.ton | formatDecimal }}
          </template>
        </Column>
        <Column
          field="SatisFiyati"
          header="Price"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ slotProps.data.SatisFiyati | formatPriceUsd }}
          </template>
        </Column>
        <Column
          field="SatisToplam"
          header="Total"
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ slotProps.data.SatisToplam | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.price | formatDecimal }}
          </template>
        </Column>
      </DataTable>
    </div>

    <DataTable
      :value="list"
      rowGroupMode="rowspan"
      :groupRowsBy="['SiparisTarihi', 'SiparisNo', 'FirmaAdi', 'PI']"
      :selection.sync="selectedProduction"
      selectionMode="multiple"
      @row-click="$emit('production_selected_emit', $event.data)"
      class="p-datatable-sm"
      :paginator="true"
      :rows="25"
      :loading="loading"
      style="font-size: 70%; border: 2px solid gray"
      filterDisplay="row"
      :filters.sync="filtersShipped"
      v-if="status == 'Shipped 2'"
      sortField="YuklemeTarihi"
      :sortOrder="-1"
      :rowClass="rowClass2"
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
          {{ slotProps.data.YuklemeTarihi | dateToString }}
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
      <Column field="PI" header="PI" headerClass="tableHeader" bodyClass="tableBody">
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
          {{ slotProps.data.Miktar | formatDecimal }}
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
          {{ total.order | formatDecimal }}
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
      <Column field="Ton" header="Ton" headerClass="tableHeader" bodyClass="tableBody">
        <template #body="slotProps">
          {{ slotProps.data.Ton | formatDecimal }}
        </template>
        <template #footer>
          {{ total.ton | formatDecimal }}
        </template>
      </Column>
      <Column
        field="SatisFiyati"
        header="Price"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ slotProps.data.SatisFiyati | formatPriceUsd }}
        </template>
      </Column>
      <Column
        field="SatisToplam"
        header="Total"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ slotProps.data.SatisToplam | formatPriceUsd }}
        </template>
        <template #footer>
          {{ total.price | formatPriceUsd }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script>
import { FilterMatchMode } from "primevue/api";
import Cookies from "js-cookie";
export default {
  props: {
    list: {
      type: Array,
      required: false,
    },
    loading: {
      type: Boolean,
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
  methods: {
    ordersFilter(event) {
      this.$store.dispatch("setOrderProductionTotal", event.filteredValue);
    },
    rowClass2(event) {
      const userId = Cookies.get("userId");
      if (event.SiparisSahibi == userId || event.Operasyon == userId)
        return "row-accessories";
      else return "row-accessories-border";
    },
    globalSearchFilterInput(event) {
      if (!event) {
        this.$store.dispatch("setOrderShippedList");
      }
    },
    globalSearchFilter(event) {
      if (event.target._value) {
        this.$store.dispatch("setFilterShipmentGlobal", event.target._value);
      } else {
        this.$store.dispatch("setOrderShippedList");
      }
    },
    filterShipmentAmountInput(event) {
      if (event) {
        this.filterModel.amount = event;
      } else {
        this.filterModel.amount = "";
      }
    },
    filterShipmentSupplierInput(event) {
      if (event) {
        this.filterModel.supplier = event;
      } else {
        this.filterModel.supplier = "";
      }
    },
    filterShipmentEdgeInput(event) {
      if (event) {
        this.filterModel.edge = event;
      } else {
        this.filterModel.edge = "";
      }
    },
    filterShipmentHeightInput(event) {
      if (event) {
        this.filterModel.height = event;
      } else {
        this.filterModel.height = "";
      }
    },
    filterShipmentWidthInput(event) {
      if (event) {
        this.filterModel.width = event;
      } else {
        this.filterModel.width = "";
      }
    },
    filterShipmentProductInput(event) {
      if (event) {
        this.filterModel.product = event;
      } else {
        this.filterModel.product = "";
      }
    },
    filterShipmentPoInput(event) {
      if (event) {
        this.filterModel.po = event;
      } else {
        this.filterModel.po = "";
      }
    },
    filterShipmentCompanyInput(event) {
      if (event) {
        this.filterModel.company = event;
      } else {
        this.filterModel.company = "";
      }
    },

    filterShipmentLoadDateInput(event) {
      if (event) {
        this.filterModel.loaddate = event;
      } else {
        this.filterModel.loaddate = "";
      }
    },

    filterShipmentAmount(event) {
      if (event) {
        this.filterModel.amount = event;
      } else {
        this.filterModel.amount = "";
      }

      if (this.__controlFilter()) {
        this.$store.dispatch("setOrderShippedList");
      } else {
        this.$store.dispatch("filterShipment", this.filterModel);
      }
    },
    filterShipmentSupplier(event) {
      if (event) {
        this.filterModel.supplier = event;
      } else {
        this.filterModel.supplier = "";
      }

      if (this.__controlFilter()) {
        this.$store.dispatch("setOrderShippedList");
      } else {
        this.$store.dispatch("filterShipment", this.filterModel);
      }
    },
    filterShipmentEdge(event) {
      if (event) {
        this.filterModel.edge = event;
      } else {
        this.filterModel.edge = "";
      }
      if (this.__controlFilter()) {
        this.$store.dispatch("setOrderShippedList");
      } else {
        this.$store.dispatch("filterShipment", this.filterModel);
      }
    },
    filterShipmentHeight(event) {
      if (event) {
        this.filterModel.height = event;
      } else {
        this.filterModel.height = "";
      }
      if (this.__controlFilter()) {
        this.$store.dispatch("setOrderShippedList");
      } else {
        this.$store.dispatch("filterShipment", this.filterModel);
      }
    },
    filterShipmentWidth(event) {
      if (event) {
        this.filterModel.width = event;
      } else {
        this.filterModel.width = "";
      }
      if (this.__controlFilter()) {
        this.$store.dispatch("setOrderShippedList");
      } else {
        this.$store.dispatch("filterShipment", this.filterModel);
      }
    },
    filterShipmentProduct(event) {
      if (event) {
        if (event.split(" ").length == 1) {
          this.filterModel.product = event.charAt(0).toUpperCase() + event.slice(1);
        } else {
          this.filterModel.product = "";
          event.split(" ").forEach((x) => {
            this.filterModel.product += x.charAt(0).toUpperCase() + x.slice(1) + " ";
          });
          this.filterModel.product = this.filterModel.product.trim();
        }
      } else {
        this.filterModel.product = "";
      }
      if (this.__controlFilter()) {
        this.$store.dispatch("setOrderShippedList");
      } else {
        this.$store.dispatch("filterShipment", this.filterModel);
      }
    },
    filterShipmentPo(event) {
      if (event) {
        this.filterModel.po = event;
      } else {
        this.filterModel.po = "";
      }
      if (this.__controlFilter()) {
        this.$store.dispatch("setOrderShippedList");
      } else {
        this.$store.dispatch("filterShipment", this.filterModel);
      }
    },
    filterShipmentCompany(event) {
      if (event) {
        this.filterModel.company = event;
      } else {
        this.filterModel.company = "";
      }
      this.__controlFilter();
      if (this.__controlFilter()) {
        this.$store.dispatch("setOrderShippedList");
      } else {
        this.$store.dispatch("filterShipment", this.filterModel);
      }
    },
    filterShipmentLoadDate(event) {
      if (event) {
        this.filterModel.loaddate = event;
      } else {
        this.filterModel.loaddate = "";
      }
      if (this.__controlFilter()) {
        this.$store.dispatch("setOrderShippedList");
      } else {
        this.$store.dispatch("filterShipment", this.filterModel);
      }
    },

    __controlFilter() {
      if (
        this.filterModel.loaddate == "" &&
        this.filterModel.company == "" &&
        this.filterModel.po == "" &&
        this.filterModel.product == "" &&
        this.filterModel.width == "" &&
        this.filterModel.height == "" &&
        this.filterModel.edge == "" &&
        this.filterModel.supplier == "" &&
        this.filterModel.amount == ""
      ) {
        return true;
      }
    },
    productSupplierNull(event) {
      const vm = document.getElementById("productSupplier" + event.UrunId);
      vm.innerHTML = event.UrunFirmaAdi;
      vm.className = "";
    },
    productSupplier(event) {
      const vm = document.getElementById("productSupplier" + event.UrunId);
      if (event.Isf == 0) {
        vm.innerHTML = "Isf Eksik";
        vm.className = "colorChange";
      }
    },
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
