<template>
  <div>
    <DataTable
      :value="marketing"
      responsiveLayout="scroll"
      :filters.sync="filtersMarketing"
      filterDisplay="row"
      @filter="filteredMarketing($event)"
      :loading="loading"
    >
      <Column
        field="marketing"
        header="Marketing"
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
        field="fobToplam"
        header="Fob ($)"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ slotProps.data.fobToplam | formatPriceUsd }}
        </template>
        <template #footer>
          {{ marketingFob | formatPriceUsd }}
        </template>
      </Column>
      <Column
        field="cfrToplam"
        header="Ddp ($)"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ slotProps.data.cfrToplam | formatPriceUsd }}
        </template>
        <template #footer>
          {{ marketingDdp | formatPriceUsd }}
        </template>
      </Column>
    </DataTable>
    <br />

    <div class="row m-auto mt-3">
      <div class="col" v-if="mekmarlist.length > 0">
        <DataTable :value="mekmarlist" style="font-size: 85%" :loading="loading">
          <template #header> Mekmar Shipped </template>
          <Column
            field="musteri"
            header="Customer"
            headerClass="tableHeader"
            bodyClass="tableBody"
          ></Column>
          <Column
            field="toplamFob"
            header="Fob"
            headerClass="tableHeader"
            bodyClass="tableBody"
          >
            <template #body="slotProps">
              {{ slotProps.data.toplamFob | formatPriceUsd }}
            </template>
            <template #footer>
              {{ totalDetail.mekmarFob | formatPriceUsd }}
            </template>
          </Column>
          <Column
            field="toplamCfr"
            header="Ddp"
            headerClass="tableHeader"
            bodyClass="tableBody"
          >
            <template #body="slotProps">
              {{ slotProps.data.toplamCfr | formatPriceUsd }}
            </template>
            <template #footer>
              {{ totalDetail.mekmarDdp | formatPriceUsd }}
            </template>
          </Column>
        </DataTable>
      </div>
      <div class="col" v-if="mekmerlist.length > 0">
        <DataTable :value="mekmerlist" style="font-size: 85%" :loading="loading">
          <template #header>Mekmer Shipped </template>
          <Column
            field="musteri"
            header="Customer"
            headerClass="tableHeader"
            bodyClass="tableBody"
          ></Column>
          <Column
            field="toplamFob"
            header="Fob"
            headerClass="tableHeader"
            bodyClass="tableBody"
          >
            <template #body="slotProps">
              {{ slotProps.data.toplamFob | formatPriceUsd }}
            </template>
            <template #footer>
              {{ totalDetail.mekmerFob | formatPriceUsd }}
            </template>
          </Column>
          <Column
            field="toplamCfr"
            header="Ddp"
            headerClass="tableHeader"
            bodyClass="tableBody"
          >
            <template #body="slotProps">
              {{ slotProps.data.toplamCfr | formatPriceUsd }}
            </template>
            <template #footer>
              {{ totalDetail.mekmerDdp | formatPriceUsd }}
            </template>
          </Column>
        </DataTable>
      </div>
      <div class="col" v-if="icpiyasalist.length > 0">
        <DataTable :value="icpiyasalist" style="font-size: 85%" :loading="loading">
          <template #header>Local Shipped </template>
          <Column
            field="musteri"
            header="Customer"
            headerClass="tableHeader"
            bodyClass="tableBody"
          ></Column>
          <Column
            field="toplamFob"
            header="Fob"
            headerClass="tableHeader"
            bodyClass="tableBody"
          >
            <template #body="slotProps">
              {{ slotProps.data.toplamFob | formatPriceUsd }}
            </template>
            <template #footer>
              {{ totalDetail.icpiyasaFob | formatPriceUsd }}
            </template>
          </Column>
          <Column
            field="toplamCfr"
            header="Ddp"
            headerClass="tableHeader"
            bodyClass="tableBody"
          >
            <template #body="slotProps">
              {{ slotProps.data.toplamCfr | formatPriceUsd }}
            </template>
            <template #footer>
              {{ totalDetail.icpiyasaDdp | formatPriceUsd }}
            </template>
          </Column>
        </DataTable>
      </div>
      <div class="col" v-if="imperial.length > 0">
        <DataTable :value="imperial" style="font-size: 85%" :loading="loading">
          <template #header>Imperial Homes Shipped </template>
          <Column
            field="musteri"
            header="Customer"
            headerClass="tableHeader"
            bodyClass="tableBody"
          ></Column>
          <Column
            field="toplamFob"
            header="Fob"
            headerClass="tableHeader"
            bodyClass="tableBody"
          >
            <template #body="slotProps">
              {{ slotProps.data.toplamFob | formatPriceUsd }}
            </template>
            <template #footer>
              {{ totalDetail.imperialFob | formatPriceUsd }}
            </template>
          </Column>
          <Column
            field="toplamCfr"
            header="Ddp"
            headerClass="tableHeader"
            bodyClass="tableBody"
          >
            <template #body="slotProps">
              {{ slotProps.data.toplamCfr | formatPriceUsd }}
            </template>
            <template #footer>
              {{ totalDetail.imperialDdp | formatPriceUsd }}
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>
<script>
import { FilterMatchMode } from "primevue/api";

export default {
  props: {
    marketing: {},
    marketingByDetail: {},
    loading: {},
  },
  data() {
    return {
      filtersMarketing: {
        marketing: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      marketingFob: 0,
      marketingDdp: 0,
      mekmarlist: [],
      mekmerlist: [],
      icpiyasalist: [],
      imperial: [],
      totalDetail: {
        mekmarFob: 0,
        mekmarDdp: 0,
        icpiyasaFob: 0,
        icpiyasaDdp: 0,
        mekmerFob: 0,
        mekmerDdp: 0,
        imperialFob: 0,
        imperialDdp: 0,
      },
    };
  },
  methods: {
    filteredMarketing(event) {
      this.marketingFob = 0;
      this.marketingDdp = 0;
      event.filteredValue.forEach((x) => {
        this.marketingFob += x.fobToplam;
        this.marketingDdp += x.cfrToplam;
      });
    },
  },
  watch: {
    marketing() {
      this.marketingFob = 0;
      this.marketingDdp = 0;
      this.marketing.forEach((x) => {
        this.marketingFob += x.fobToplam;
        this.marketingDdp += x.cfrToplam;
      });
    },
    marketingByDetail() {
      this.totalDetail = {
        mekmarFob: 0,
        mekmarDdp: 0,
        icpiyasaFob: 0,
        icpiyasaDdp: 0,
        mekmerFob: 0,
        mekmerDdp: 0,
        imperialFob: 0,
        imperialDdp: 0,
      };
      this.mekmarlist = this.marketingByDetail.filter((x) => x.marketing == "Mekmar");
      this.mekmerlist = this.marketingByDetail.filter((x) => x.marketing == "Mekmer");
      this.icpiyasalist = this.marketingByDetail.filter(
        (x) => x.marketing == "İç Piyasa"
      );
      this.imperial = this.marketingByDetail.filter(
        (x) => x.marketing == "Imperial Homes"
      );

      this.mekmarlist.forEach((x) => {
        this.totalDetail.mekmarFob += x.toplamFob;
        this.totalDetail.mekmarDdp += x.toplamCfr;
      });
      this.mekmerlist.forEach((x) => {
        this.totalDetail.mekmerFob += x.toplamFob;
        this.totalDetail.mekmerDdp += x.toplamCfr;
      });
      this.icpiyasalist.forEach((x) => {
        this.totalDetail.icpiyasaFob += x.toplamFob;
        this.totalDetail.icpiyasaDdp += x.toplamCfr;
      });
      this.imperial.forEach((x) => {
        this.totalDetail.imperialFob += x.toplamFob;
        this.totalDetail.imperialDdp += x.toplamCfr;
      });
    },
  },
};
</script>
