<template>
  <div class="row">
    <div class="col">
      <ReportsMekmarAyoListForm
        :list="list"
        @mekmar_ayo_selected_emit="mekmarAyoSelected($event)"
      />
      <!-- <DataTable
        :value="list"
        tableStyle="font-size:90%"
        class="p-datatable-sm"
        v-model:filters="filters"
        filterDisplay="row"
        @filter="mekmarAyoFilter($event)"
        v-model:selection="selectedMekmarAyo"
        selectionMode="single"
        @row-click="mekmarAyoSelected($event)"
        scrollable
        scrollHeight="500px"
        :resizableColumns="true"
        showGridlines
        responsiveLayout="scroll"
      >
        <Column
          field="siparisci"
          header="Seller"
          :showFilterMenu="false"
          :showFilterOperator="false"
          :showClearButton="false"
          :showApplyButton="false"
          :showFilterMatchModes="false"
          :showAddButton="false"
          :headerStyle="{ width: '1200px' }"
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
          field="musteri_adi"
          header="Customer"
          :showFilterMenu="false"
          :showFilterOperator="false"
          :showClearButton="false"
          :showApplyButton="false"
          :showFilterMatchModes="false"
          :showAddButton="false"
          :headerStyle="{ width: '600px' }"
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
          field="siparis_no"
          header="Po"
          :showFilterMenu="false"
          :showFilterOperator="false"
          :showClearButton="false"
          :showApplyButton="false"
          :showFilterMatchModes="false"
          :showAddButton="false"
          style="width: 100%"
        >
          <template #body="slotProps">
            <div
              :style="{
                backgroundColor:
                  slotProps.data.dosya_kapanma_date == '-' ? '#fae8b3' : '',
              }"
            >
              {{ slotProps.data.siparis_no }}
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
          field="siparis_tarihi"
          header="O. Date"
          :showFilterMenu="false"
          :showFilterOperator="false"
          :showClearButton="false"
          :showApplyButton="false"
          :showFilterMatchModes="false"
          :showAddButton="false"
          style="width: 100%"
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
          field="yukleme_tarihi"
          header="F. Date"
          :showFilterMenu="false"
          :showFilterOperator="false"
          :showClearButton="false"
          :showApplyButton="false"
          :showFilterMatchModes="false"
          :showAddButton="false"
          style="width: 100%"
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
          field="ulke_adi"
          header="Country"
          :showFilterMenu="false"
          :showFilterOperator="false"
          :showClearButton="false"
          :showApplyButton="false"
          :showFilterMatchModes="false"
          :showAddButton="false"
          style="width: 100%"
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
          field="teslim_sekli"
          header="Delivery Term"
          :showFilterMenu="false"
          :showFilterOperator="false"
          :showClearButton="false"
          :showApplyButton="false"
          :showFilterMatchModes="false"
          :showAddButton="false"
          :headerStyle="{ width: '50px', 'overflow-wrap': 'break-word' }"
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
        <Column field="toplam_bedel" header="Proforma">
          <template #body="slotProps">
            {{ formatPriceUsd(slotProps.data.toplam_bedel) }}
          </template>
          <template #footer>
            {{ formatPriceUsd(reportsStore.getReportsMekmarAyoListTotal.proforma) }}
          </template>
        </Column>
        <Column field="kar_zarar" header="Profit / USD">
          <template #body="slotProps">
            {{ formatPriceUsd(slotProps.data.kar_zarar) }}
          </template>
          <template #footer>
            {{ formatPriceUsd(reportsStore.getReportsMekmarAyoListTotal.profitUsd) }}
          </template>
        </Column>
        <Column field="kar_zarar_tl" header="Profit / TRY">
          <template #body="slotProps">
            {{ formatPriceTl(slotProps.data.kar_zarar_tl) }}
          </template>
          <template #footer>
            {{ formatPriceTl(reportsStore.getReportsMekmarAyoListTotal.profitTl) }}
          </template>
        </Column>
        <Column field="kar_zarar_tl_yuzdesi" header="Profit (%)">
          <template #body="slotProps">
            % {{ slotProps.data.kar_zarar_tl_yuzdesi }}
          </template>
        </Column>
        <Column field="mekmar_alim" header="Production (Mekmer)">
          <template #body="slotProps">
            <div
              :style="{
                'background-color':
                  slotProps.data.mekmer_alim_alis_kontrol > 0 ? '#F1948A' : '',
              }"
            >
              {{ formatPriceUsd(slotProps.data.mekmar_alim) }}
            </div>
          </template>
          <template #footer>
            {{ formatPriceUsd(reportsStore.getReportsMekmarAyoListTotal.mekmerProduction) }}
          </template>
        </Column>

        <Column field="dis_alim" header="Production (Others)">
          <template #body="slotProps">
            <div
              :style="{
                'background-color':
                  slotProps.data.dis_alim_alis_kontrol > 0 ? '#F1948A' : '',
              }"
            >
              {{ formatPriceUsd(slotProps.data.dis_alim) }}
            </div>
          </template>
          <template #footer>
            {{ formatPriceUsd(reportsStore.getReportsMekmarAyoListTotal.outerProduction) }}
          </template>
        </Column>

        <Column field="nakliye" header="Logistics">
          <template #body="slotProps">
            <div
              :style="{
                'background-color':
                  slotProps.data.nakliye_evrak.length == 0 &&
                  slotProps.data.nakliye > 0
                    ? '#F1948A'
                    : '',
              }"
            >
              {{ formatPriceUsd(slotProps.data.nakliye) }}
            </div>
          </template>
          <template #footer>
            {{ formatPriceUsd(reportsStore.getReportsMekmarAyoListTotal.transport) }}
          </template>
        </Column>
        <Column field="gumruk" header="Custom">
          <template #body="slotProps">
            <div
              :style="{
                'background-color':
                  slotProps.data.gumruk_evrak.length == 0 &&
                  slotProps.data.gumruk > 0
                    ? '#F1948A'
                    : '',
              }"
            >
              {{ formatPriceUsd(slotProps.data.gumruk) }}
            </div>
          </template>
          <template #footer>
            {{ formatPriceUsd(reportsStore.getReportsMekmarAyoListTotal.duty) }}
          </template>
        </Column>
        <Column field="ilaclama" header="Fumigation">
          <template #body="slotProps">
            <div
              :style="{
                'background-color':
                  slotProps.data.ilaclama_evrak.length == 0 &&
                  slotProps.data.ilaclama > 0
                    ? '#F1948A'
                    : '',
              }"
            >
              {{ formatPriceUsd(slotProps.data.ilaclama) }}
            </div>
          </template>
          <template #footer>
            {{ formatPriceUsd(reportsStore.getReportsMekmarAyoListTotal.spraying) }}
          </template>
        </Column>
        <Column field="liman" header="Port">
          <template #body="slotProps">
            <div
              :style="{
                'background-color':
                  slotProps.data.liman_evrak.length == 0 &&
                  slotProps.data.liman > 0
                    ? '#F1948A'
                    : '',
              }"
            >
              {{ formatPriceUsd(slotProps.data.liman) }}
            </div>
          </template>
          <template #footer>
            {{ formatPriceUsd(reportsStore.getReportsMekmarAyoListTotal.port) }}
          </template>
        </Column>
        <Column field="sigorta" header="Insurance">
          <template #body="slotProps">
            <div
              :style="{
                'background-color':
                  slotProps.data.sigorta_id == 1 && slotProps.data.sigorta == 0
                    ? '#F1948A'
                    : '',
              }"
            >
              {{ formatPriceUsd(slotProps.data.sigorta) }}
            </div>
          </template>
          <template #footer>
            {{ formatPriceUsd(reportsStore.getReportsMekmarAyoListTotal.insuranceBuyes) }}
          </template>
        </Column>
        <Column field="navlun" header="Freight">
          <template #body="slotProps">
            <div
              :style="{
                'background-color':
                  slotProps.data.navlun > 0 &&
                  slotProps.data.navlun_evrak.length <= 0
                    ? '#F1948A'
                    : '',
              }"
            >
              {{ formatPriceUsd(slotProps.data.navlun) }}
            </div>
          </template>
          <template #footer>
            {{ formatPriceUsd(reportsStore.getReportsMekmarAyoListTotal.freightBuyes) }}
          </template>
        </Column>
        <Column field="lashing" header="Lashing">
          <template #body="slotProps">
            <div
              :style="{
                'background-color':
                  slotProps.data.lashing > 0 &&
                  slotProps.data.lashing_evrak.length <= 0
                    ? '#F1948A'
                    : '',
              }"
            >
              {{ formatPriceUsd(slotProps.data.lashing) }}
            </div>
          </template>
          <template #footer>
            {{ formatPriceUsd(reportsStore.getReportsMekmarAyoListTotal.lashing) }}
          </template>
        </Column>

        <Column field="spazlet" header="Spanzlet">
          <template #body="slotProps">
            <div
              :style="{
                'background-color':
                  slotProps.data.spazlet > 0 &&
                  slotProps.data.spazlet_evrak.length <= 0
                    ? '#F1948A'
                    : '',
              }"
            >
              {{ formatPriceUsd(slotProps.data.spazlet) }}
            </div>
          </template>
          <template #footer>
            {{ formatPriceUsd(reportsStore.getReportsMekmarAyoListTotal.spanzlet) }}
          </template>
        </Column>
        <Column field="detay_1" header="Detail(Sum)">
          <template #body="slotProps">
            {{ formatPriceUsd((slotProps.data.detay_1 + slotProps.data.detay_2)) }}
          </template>
          <template #footer>
            {{ formatPriceUsd(reportsStore.getReportsMekmarAyoListTotal.detailBuyes1) }}
          </template>
        </Column>
        <Column field="ozel_iscilik" header="Manual Labour Cost">
          <template #body="slotProps">
            <div
              :style="{
                'background-color':
                  slotProps.data.ozel_iscilik > 0 &&
                  slotProps.data.ozel_iscilik_evrak.length <= 0
                    ? '#F1948A'
                    : '',
              }"
            >
              {{ formatPriceUsd(slotProps.data.ozel_iscilik) }}
            </div>
          </template>
          <template #footer>
            {{ formatPriceUsd(reportsStore.getReportsMekmarAyoListTotal.specialwork) }}
          </template>
        </Column>
        <Column field="banka_masrafi" header="Office Cost">
          <template #body="slotProps">
            {{ formatPriceUsd((slotProps.data.banka_masrafi + slotProps.data.kurye_masrafi)) }}
          </template>
          <template #footer>
            {{ formatPriceUsd(reportsStore.getReportsMekmarAyoListTotal.bankCost) }}
          </template>
        </Column>

        <Column field="masraf_toplam" header="Total">
          <template #body="slotProps">
            {{ formatPriceUsd(slotProps.data.masraf_toplam) }}
          </template>
          <template #footer>
            {{ formatPriceUsd(reportsStore.getReportsMekmarAyoListTotal.costTotal) }}
          </template>
        </Column>

        <Column field="dosya_kapanma_date" header="Date of Closure"></Column>
      </DataTable> -->
    </div>
  </div>
</template>
<script>
import { useReportsStore } from "~/stores/reports"
import { FilterMatchMode } from "@primevue/core/api";
export default {
  computed: {
    reportsStore() {
      return useReportsStore()
    },
  },
  props: {
    list: {
      type: Array,
      required: false,
    },
    total: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      selectedMekmarAyo: null,
      filters: {
        siparisci: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        operasyon: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        musteri_adi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        siparis_no: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        marketing: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        faturatur: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        siparis_tarihi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        yukleme_tarihi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        ulke_adi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        teslim_sekli: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
    };
  },
  methods: {
    mekmarAyoFilter(event) {
      this.reportsStore.setReportsMekmarAyoListTotal(event.filteredValue);
    },
    mekmarAyoSelected(event) {
      this.$emit("mekmar_ayo_selected_emit", event);
    },
  },
};
</script>

<style scoped></style>
