<template>
  <div class="row m-auto">
    <div class="col">
      <DataTable
        :value="list"
        tableStyle="font-size:80%"
        class="p-datatable-sm"
        :filters.sync="filters1"
        filterDisplay="row"
        @filter="reportsMekmarAyoFiltered($event)"
        :loading="loading"
      >
        <Column field="SiparisSahibi" header="Salesman" :showFilterMenu="false">
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              class="p-column-filter"
              style="width: 80px"
            />
          </template>
        </Column>
        <Column field="Operasyon" header="Operation" :showFilterMenu="false">
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              class="p-column-filter"
              style="width: 80px"
            />
          </template>
        </Column>
        <Column field="FirmaAdi" header="Customer" :showFilterMenu="false">
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              class="p-column-filter"
              style="width: 80px"
            />
          </template>
        </Column>
        <Column field="SiparisNo" header="Po" :showFilterMenu="false">
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              class="p-column-filter"
              style="width: 80px"
            />
          </template>
        </Column>
        <Column field="FaturaAdi" header="Invoice" :showFilterMenu="false">
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              class="p-column-filter"
              style="width: 80px"
            />
          </template>
        </Column>
        <Column field="SiparisTarihi" header="O. Date" :showFilterMenu="false">
          <template #body="slotProps">
            {{ slotProps.data.SiparisTarihi | dateToString }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              class="p-column-filter"
              style="width: 80px"
            />
          </template>
        </Column>
        <Column field="YuklemeTarihi" header="S.Tarih" :showFilterMenu="false">
          <template #body="slotProps">
            {{ slotProps.data.YuklemeTarihi | dateToString }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              class="p-column-filter"
              style="width: 80px"
            />
          </template>
        </Column>
        <Column field="UlkeAdi" header="Country" :showFilterMenu="false">
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              class="p-column-filter"
              style="width: 80px"
            />
          </template>
        </Column>
        <Column field="TeslimTur" header="Delivery" :showFilterMenu="false">
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              class="p-column-filter"
              style="width: 80px"
            />
          </template>
        </Column>
        <Column field="Proforma" header="Proforma">
          <template #body="slotProps">
            {{ slotProps.data.Proforma | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.proforma | formatPriceUsd }}
          </template>
        </Column>
        <Column field="MekmerUretim" header="Mekmer P.">
          <template #body="slotProps">
            {{ slotProps.data.MekmerUretim | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.mekmerProduction | formatPriceUsd }}
          </template>
        </Column>
        <Column field="MekmozSatis" header="Mekmoz P.">
          <template #body="slotProps">
            {{ slotProps.data.MekmozUretim | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.mekmozProduction | formatPriceUsd }}
          </template>
        </Column>
        <Column field="DisSatis" header="Outer P.">
          <template #body="slotProps">
            {{ slotProps.data.DisUretim | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.outerProduction | formatPriceUsd }}
          </template>
        </Column>
        <Column field="Nakliye" header="Transport">
          <template #body="slotProps">
            {{ slotProps.data.Nakliye | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.transport | formatPriceUsd }}
          </template>
        </Column>
        <Column field="Gumruk" header="Duty">
          <template #body="slotProps">
            {{ slotProps.data.Gumruk | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.duty | formatPriceUsd }}
          </template>
        </Column>
        <Column field="Ilaclama" header="Spraying">
          <template #body="slotProps">
            {{ slotProps.data.Ilaclama | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.spraying | formatPriceUsd }}
          </template>
        </Column>
        <Column field="Liman" header="Port">
          <template #body="slotProps">
            {{ slotProps.data.Liman | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.port | formatPriceUsd }}
          </template>
        </Column>
        <Column field="SigortaAlis" header="Buying Insurance">
          <template #body="slotProps">
            {{ slotProps.data.SigortaAlis | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.insuranceBuyes | formatPriceUsd }}
          </template>
        </Column>
        <Column field="SigortaSatis" header="Selling Insurance">
          <template #body="slotProps">
            {{ slotProps.data.SigortaSatis | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.insuranceSales | formatPriceUsd }}
          </template>
        </Column>
        <Column field="NavlunAlis" header="Buying Freight">
          <template #body="slotProps">
            {{ slotProps.data.NavlunAlis | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.freightBuyes | formatPriceUsd }}
          </template>
        </Column>
        <Column field="Lashing" header="Lashing">
          <template #body="slotProps">
            {{ slotProps.data.Lashing | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.lashing | formatPriceUsd }}
          </template>
        </Column>
        <Column field="Booking" header="Booking">
          <template #body="slotProps">
            {{ slotProps.data.Booking | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.booking | formatPriceUsd }}
          </template>
        </Column>
        <Column field="Spanzlet" header="Spanzlet">
          <template #body="slotProps">
            {{ slotProps.data.Spanzlet | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.spanzlet | formatPriceUsd }}
          </template>
        </Column>
        <Column field="DetayAlis1" header="Buying Detail 1">
          <template #body="slotProps">
            {{ slotProps.data.DetayAlis1 | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.detailBuyes1 | formatPriceUsd }}
          </template>
        </Column>
        <Column field="DetayAlis2" header="Buying Detail 2">
          <template #body="slotProps">
            {{ slotProps.data.DetayAlis2 | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.detailBuyes2 | formatPriceUsd }}
          </template>
        </Column>
        <Column field="DetayAlis3" header="Buying Detail 3">
          <template #body="slotProps">
            {{ slotProps.data.DetayAlis3 | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.detailBuyes3 | formatPriceUsd }}
          </template>
        </Column>
        <Column field="Mekus" header="Mekus">
          <template #body="slotProps">
            {{ slotProps.data.Mekus | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.mekus | formatPriceUsd }}
          </template>
        </Column>
        <Column field="Komisyon" header="Commision">
          <template #body="slotProps">
            {{ slotProps.data.Komisyon | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.commision | formatPriceUsd }}
          </template>
        </Column>
        <Column field="OzelIscilik" header="Workerman">
          <template #body="slotProps">
            {{ slotProps.data.OzelIscilik | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.specialwork | formatPriceUsd }}
          </template>
        </Column>
        <Column field="BankaMasraf" header="Bank">
          <template #body="slotProps">
            {{ slotProps.data.BankaMasraf | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.bankCost | formatPriceUsd }}
          </template>
        </Column>
        <Column field="Kurye" header="Courier">
          <template #body="slotProps">
            {{ slotProps.data.Kurye | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.fregileCost | formatPriceUsd }}
          </template>
        </Column>
        <Column field="MasrafToplam" header="Cost Total">
          <template #body="slotProps">
            {{ slotProps.data.MasrafToplam | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.costTotal | formatPriceUsd }}
          </template>
        </Column>
        <Column field="ProfitUsd" header="Profit($)">
          <template #body="slotProps">
            {{ slotProps.data.ProfitUsd | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.profitUsd | formatPriceUsd }}
          </template>
        </Column>
        <Column field="ProfitTl" header="Profit(₺)">
          <template #body="slotProps">
            {{ slotProps.data.ProfitTl | formatPriceTl }}
          </template>
          <template #footer>
            {{ total.profitTl | formatPriceTl }}
          </template>
        </Column>
        <Column header="Profit-Loss (%)">
          <template #body="slotProps">
            {{ ((slotProps.data.ProfitUsd / slotProps.data.Proforma) * 100).toFixed(2) }}
          </template>
        </Column>
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
    loading: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      filters1: {
        SiparisSahibi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Operasyon: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        FirmaAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        SiparisNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        FaturaAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        SiparisTarihi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        YuklemeTarihi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        UlkeAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        TeslimTur: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
    };
  },
  methods: {
    reportsMekmarAyoFiltered(event) {
      this.$store.dispatch("setReportsMekmarAyoListTotal", event.filteredValue);
    },
  },
};
</script>
