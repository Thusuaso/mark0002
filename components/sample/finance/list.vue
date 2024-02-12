<template>
  <div class="row">
    <div class="col-9">
      <DataTable
        :value="list"
        responsiveLayout="scroll"
        :selection.sync="selectedFinanceList"
        selectionMode="single"
        @row-click="financeListSelected($event)"
        :loading="loading"
      >
        <Column field="MusteriAdi" header="Müşteri"> </Column>
        <Column field="AlisUsd" header="Alış Usd">
          <template #body="slotProps">
            {{ slotProps.data.AlisUsd | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.getUsd | formatPriceUsd }}
          </template>
        </Column>
        <Column field="SatisUsd" header="Satış Usd">
          <template #body="slotProps">
            {{ slotProps.data.SatisUsd | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.setUsd | formatPriceUsd }}
          </template>
        </Column>
        <Column field="AlisEuro" header="Alış Euro">
          <template #body="slotProps">
            {{ slotProps.data.AlisEuro | formatPriceEuro }}
          </template>
          <template #footer>
            {{ total.getEuro | formatPriceEuro }}
          </template>
        </Column>
        <Column field="SatisEuro" header="Satış Euro">
          <template #body="slotProps">
            {{ slotProps.data.SatisEuro | formatPriceEuro }}
          </template>
          <template #footer>
            {{ total.setEuro | formatPriceEuro }}
          </template>
        </Column>
        <Column field="AlisTl" header="Alış Tl">
          <template #body="slotProps">
            {{ slotProps.data.AlisTl | formatPriceTl }}
          </template>
          <template #footer>
            {{ total.getTl | formatPriceTl }}
          </template>
        </Column>
        <Column field="SatisTl" header="Satış Tl">
          <template #body="slotProps">
            {{ slotProps.data.SatisTl | formatPriceTl }}
          </template>
          <template #footer>
            {{ total.setTl | formatPriceTl }}
          </template>
        </Column>
      </DataTable>
    </div>
    <div class="col-3">
      <DataTable :value="bank" :loading="loading">
        <Column field="Banka" header="Banka"> </Column>
        <Column field="Tutar" header="Tutar">
          <template #body="slotProps">
            {{ slotProps.data.Tutar | formatPriceUsd }}
          </template>
          <template #footer>
            {{ total.bank | formatPriceUsd }}
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>
<script>
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
    bank: {
      type: Array,
      required: false,
    },
    loading: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      selectedFinanceList: null,
    };
  },
  methods: {
    financeListSelected(event) {
      this.$emit("finance_list_selected_emit", event.data);
    },
  },
};
</script>
