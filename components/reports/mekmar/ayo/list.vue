<template>
  <div class="row">

    <div class="col">
      <DataTable
        :value="list"
        tableStyle="font-size:70%"
        class="p-datatable-sm"
        :filters.sync="filters"
        filterDisplay="row"
        @filter="mekmarAyoFilter($event)"
        :selection.sync="selectedMekmarAyo"
        selectionMode="single"
        @row-click="mekmarAyoSelected($event)"
        scrollable
        scrollHeight="500px"
:resizableColumns="true" columnResizeMode="fit" showGridlines responsiveLayout="scroll"
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
          field="operasyon"
          header="Operation"
          :showFilterMenu="false"
          :showFilterOperator="false"
          :showClearButton="false"
          :showApplyButton="false"
          :showFilterMatchModes="false"
          :showAddButton="false"

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

        >
          <template #body="slotProps">
            <div :style="{ 'backgroundColor': slotProps.data.dosya_kapanma_date == '-' ? '#fae8b3':'' }">
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
          field="faturatur"
          header="Invoice"
          :showFilterMenu="false"
          :showFilterOperator="false"
          :showClearButton="false"
          :showApplyButton="false"
          :showFilterMatchModes="false"
          :showAddButton="false"

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
          field="siparis_tarihi"
          header="O. Date"
          :showFilterMenu="false"
          :showFilterOperator="false"
          :showClearButton="false"
          :showApplyButton="false"
          :showFilterMatchModes="false"
          :showAddButton="false"

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
          field="toplam_bedel"
          header="Proforma"

        >
          <template #body="slotProps">
            {{ slotProps.data.toplam_bedel | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.proforma | formatPriceUsd }}
          </template>
        </Column>
        <Column
          field="mekmar_alim"
          header="Production (Mekmer)"

        >
          <template #body="slotProps">
            <div
              :style="{
                'background-color':
                  slotProps.data.mekmer_alim_alis_kontrol > 0 
                    ? '#F1948A'
                    : '',
              }"
            >
              {{ slotProps.data.mekmar_alim | formatPriceUsd }}
            </div>
          </template>
          <template #footer>
            {{ total.mekmerProduction | formatPriceUsd }}
          </template>
        </Column>
        <Column
          field="mekmoz_alim"
          header="Production (Mek-Moz)"

        >
          <template #body="slotProps">
            <div
              :style="{
                'background-color':
                  slotProps.data.mekmoz_alim_alis_kontrol > 0 
                    ? '#F1948A'
                    : '',
              }"
            >
              {{ slotProps.data.mekmoz_alim | formatPriceUsd }}
            </div>
          </template>
          <template #footer>
            {{ total.mekmozProduction | formatPriceUsd }}
          </template>
        </Column>
        <Column
          field="dis_alim"
          header="External Purchase"

        >
          <template #body="slotProps">
            <div
              :style="{
                'background-color':
                  slotProps.data.dis_alim_alis_kontrol > 0 

                    ? '#F1948A'
                    : '',
              }"
            >
              {{ slotProps.data.dis_alim | formatPriceUsd }}
            </div>
          </template>
          <template #footer>
            {{ total.outerProduction | formatPriceUsd }}
          </template>
        </Column>

        <Column
          field="nakliye"
          header="Logistics"

        >
          <template #body="slotProps">
            <div
              :style="{
                'background-color':
                  slotProps.data.nakliye_evrak.length == 0 && slotProps.data.nakliye > 0
                    ? '#F1948A'
                    : '',
              }"
            >
              {{ slotProps.data.nakliye | formatPriceUsd }}
            </div>
          </template>
          <template #footer>
            {{ total.transport | formatPriceUsd }}
          </template>
        </Column>
        <Column
          field="gumruk"
          header="Custom"

        >
          <template #body="slotProps">
            <div
              :style="{
                'background-color':
                  slotProps.data.gumruk_evrak.length == 0 && slotProps.data.gumruk > 0
                    ? '#F1948A'
                    : '',
              }"
            >
              {{ slotProps.data.gumruk | formatPriceUsd }}
            </div>
          </template>
          <template #footer>
            {{ total.duty | formatPriceUsd }}
          </template>
        </Column>
        <Column
          field="ilaclama"
          header="Fumigation"

        >
          <template #body="slotProps">
            <div
              :style="{
                'background-color':
                  slotProps.data.ilaclama_evrak.length == 0 && slotProps.data.ilaclama > 0
                    ? '#F1948A'
                    : '',
              }"
            >
              {{ slotProps.data.ilaclama | formatPriceUsd }}
            </div>
          </template>
          <template #footer>
            {{ total.spraying | formatPriceUsd }}
          </template>
        </Column>
        <Column
          field="liman"
          header="Port"

        >
          <template #body="slotProps">
            <div
              :style="{
                'background-color':
                  slotProps.data.liman_evrak.length == 0 && slotProps.data.liman > 0
                    ? '#F1948A'
                    : '',
              }"
            >
              {{ slotProps.data.liman | formatPriceUsd }}
            </div>
          </template>
          <template #footer>
            {{ total.port | formatPriceUsd }}
          </template>
        </Column>
        <Column
          field="sigorta"
          header="Insurance"

        >
          <template #body="slotProps">
            <div
              :style="{
                'background-color':
                  slotProps.data.sigorta_id == 1 && slotProps.data.sigorta == 0
                    ? '#F1948A'
                    : '',
              }"
            >
              {{ slotProps.data.sigorta | formatPriceUsd }}
            </div>
          </template>
          <template #footer>
            {{ total.insuranceBuyes | formatPriceUsd }}
          </template>
        </Column>
        <Column
          field="navlun"
          header="Freight"

        >
          <template #body="slotProps">
            <div
              :style="{
                'background-color':
                  slotProps.data.navlun > 0 && slotProps.data.navlun_evrak.length <= 0
                    ? '#F1948A'
                    : '',
              }"
            >
              {{ slotProps.data.navlun | formatPriceUsd }}
            </div>
          </template>
          <template #footer>
            {{ total.freightBuyes | formatPriceUsd }}
          </template>
        </Column>
        <Column
          field="lashing"
          header="Lashing"

        >
          <template #body="slotProps">
            <div
              :style="{
                'background-color':
                  slotProps.data.lashing > 0 && slotProps.data.lashing_evrak.length <= 0
                    ? '#F1948A'
                    : '',
              }"
            >
              {{ slotProps.data.lashing | formatPriceUsd }}
            </div>
          </template>
          <template #footer>
            {{ total.lashing | formatPriceUsd }}
          </template>
        </Column>
        <Column
          field="booking"
          header="Booking"

        >
          <template #body="slotProps">
            <div
              :style="{
                'background-color':
                  slotProps.data.booking > 0 && slotProps.data.booking_evrak.length <= 0
                    ? '#F1948A'
                    : '',
              }"
            >
              {{ slotProps.data.booking | formatPriceUsd }}
            </div>
          </template>
          <template #footer>
            {{ total.booking | formatPriceUsd }}
          </template>
        </Column>
        <Column
          field="spazlet"
          header="Spanzlet"

        >
          <template #body="slotProps">
            <div
              :style="{
                'background-color':
                  slotProps.data.spazlet > 0 && slotProps.data.spazlet_evrak.length <= 0
                    ? '#F1948A'
                    : '',
              }"
            >
              {{ slotProps.data.spazlet | formatPriceUsd }}
            </div>
          </template>
          <template #footer>
            {{ total.spanzlet | formatPriceUsd }}
          </template>
        </Column>
        <Column
          field="detay_1"
          header="Detail 1"

        >
          <template #body="slotProps">
            {{ slotProps.data.detay_1 | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.detailBuyes1 | formatPriceUsd }}
          </template>
        </Column>
        <Column
          field="detay_2"
          header="Detail 2"

        >
          <template #body="slotProps">
            {{ slotProps.data.detay_2 | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.detailBuyes2 | formatPriceUsd }}
          </template>
        </Column>


        <Column
          field="pazarlama"
          header="Marketing Cost"

        >
          <template #body="slotProps">
            {{ slotProps.data.pazarlama | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.commision | formatPriceUsd }}
          </template>
        </Column>
        <Column
          field="ozel_iscilik"
          header="Manual Labour Cost"

        >
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
              {{ slotProps.data.ozel_iscilik | formatPriceUsd }}
            </div>
          </template>
          <template #footer>
            {{ total.specialwork | formatPriceUsd }}
          </template>
        </Column>
        <Column
          field="banka_masrafi"
          header="Bank"

        >
          <template #body="slotProps">
            {{ slotProps.data.banka_masrafi | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.bankCost | formatPriceUsd }}
          </template>
        </Column>
        <Column
          field="kurye_masrafi"
          header="Courier"

        >
          <template #body="slotProps">
            {{ slotProps.data.kurye_masrafi | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.fregileCost | formatPriceUsd }}
          </template>
        </Column>
        <Column
          field="masraf_toplam"
          header="Total"

        >
          <template #body="slotProps">
            {{ slotProps.data.masraf_toplam | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.costTotal | formatPriceUsd }}
          </template>
        </Column>
        <Column
          field="kar_zarar"
          header="Profit / USD"

        >
          <template #body="slotProps">
            {{ slotProps.data.kar_zarar | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.profitUsd | formatPriceUsd }}
          </template>
        </Column>
        <Column
          field="kar_zarar_tl"
          header="Profit / TRY"

        >
          <template #body="slotProps">
            {{ slotProps.data.kar_zarar_tl | formatPriceTl }}
          </template>
          <template #footer>
            {{ total.profitTl | formatPriceTl }}
          </template>
        </Column>
        <Column
          field="kar_zarar_tl_yuzdesi"
          header="Profit (%)"

        >
          <template #body="slotProps">
            % {{ slotProps.data.kar_zarar_tl_yuzdesi }}
          </template>
        </Column>
        <Column
          field="dosya_kapanma_date"
          header="Date of Closure"

        ></Column>
      </DataTable>
    </div>
  </div>
</template>
<script>
import { FilterMatchMode } from "primevue/api";
export default {
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
      this.$store.dispatch("setReportsMekmarAyoListTotal", event.filteredValue);
    },
    mekmarAyoSelected(event) {
      this.$emit('mekmar_ayo_selected_emit',event.data);

    },
  },
};
</script>

<style scoped>

</style>
